import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, sendPasswordResetEmail, updatePassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc,getDocs, getDoc, updateDoc, orderBy, startAfter, limit, query, where,deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    initializeApp(firebaseConfig);

    this.auth = getAuth();
    this.db = getFirestore();
    this.storage = getStorage();
  }

  // AUTH ACTIONS ------------

  createAccount = async (email, password) => {
    try {
      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Step 2: Add user details to Firestore
      await setDoc(doc(this.db, 'users', user.uid), {
        email: user.email,
        address: '',
        role: 'user', // Default role: user
        phoneNumber: '',
        createdAt: new Date(),
      });
      return user;
    } catch (error) {
      console.error('Error creating account:', error.message);
      throw error;
    }
  };
  searchProducts = async (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = collection(this.db, "products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = query(productsRef,
            orderBy("Name"),
            where("Name", ">=", searchKey),
            where("Name", "<=", `${searchKey}\uf8ff`),
            limit(12)
          );
          const categoryQuery = query(
            productsRef, 
            where('Category', '>=', searchKey), 
            where('Category', '<=', searchKey + '\uf8ff')
          );

          const [nameSnaps, keywordsSnaps] = await Promise.all([
            getDocs(searchedNameRef),
            getDocs(categoryQuery)
          ]);

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts = nameSnaps.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const searchedKeywordsProducts = keywordsSnaps.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // MERGE PRODUCTS
            const mergedProducts = [
              ...searchedNameProducts,
              ...searchedKeywordsProducts,
            ];
          // Use a hash to remove duplicates by id
          const uniqueProducts = [];
          const hash = {};

          mergedProducts.forEach((product) => {
            if (!hash[product.id]) {
              hash[product.id] = true;  // Mark as seen
              uniqueProducts.push(product);  // Add unique product to array
            }
          });
          resolve(uniqueProducts);  
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  signIn = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      // Check if the user already has a document in Firestore
      const userDocRef = doc(this.db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      // If user does not exist in Firestore, create a new document
      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role:'user', // Default role: user
          createdAt: new Date(),
        });
        console.log('User signed in with Google and Firestore document created');
      } else {
        console.log('User already exists in Firestore');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      throw error;
    }
  };  

  signOut = () => signOut(this.auth);

  passwordReset = (email) => sendPasswordResetEmail(this.auth, email);

  addUser = (id, user) => setDoc(doc(this.db, "users", id), user);

  getUser = (id) => getDoc(doc(this.db, "users", id));

  // Save Order History
  saveOrderHistory = (order) => {
    const orderRef = doc(collection(this.db, "orders"));
    return setDoc(orderRef, order);
  };
  // Get Order History
  getOrderHistory = (uid) => {
    const orderRef = collection(this.db, "orders");
    const q = query(orderRef, where("ordId", "==", uid), orderBy("timestamp","desc")
    );
    return getDocs(q);
  };

  // Upload Profile Picture
  uploadProfilePic = (file,uid) => {
    const fileRef = ref(this.storage, `profilePictures/${uid}`);
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };
  uploadProductPic = (file,id) => {
    const fileRef = ref(this.storage, `productPictures/${id}`);
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };

  getAllOrderHistory = async () => {
    const orderRef = collection(this.db, "orders");
    const q = query(orderRef, orderBy("timestamp", "desc"));

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().id,
      ...doc.data(),
    }));
    return orders;
  }; 
  updateOrderStatus = (orderId, newStatus) => {
    const orderRef = doc(this.db, "orders", orderId);
    return updateDoc(orderRef, { status: newStatus });
  };

  fetchProductsByCategory = async () => {
    try {
      const productsRef = collection(this.db, "products");
      const productsSnapshot = await getDocs(productsRef);
  
      const categories = {};
  
      // Group products by category
      productsSnapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        const category = product.Category;
  
        if (!categories[category]) {
          categories[category] = [];
        }

        categories[category].push(product);
      });
  
      const groupedProducts = Object.keys(categories).map((category) => ({
        category,
        items: categories[category],
      }));
  
      return groupedProducts;
    } catch (error) {
      console.error("Error fetching products: ", error);
      return [];
    }
  };
  

  passwordUpdate = (password) => updatePassword(this.auth.currentUser, password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          updatePassword(user, newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });


  updateProfile = (id, updates) =>
    updateDoc(doc(this.db, "users", id), updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) =>
    updateDoc(doc(this.db, "users", userId), { basket: items });

  // PRODUCT ACTIONS --------------

  getSingleProduct = (id) => getDoc(doc(this.db, "products", id));

  fetchProducts = async () => {
    try {
      const productsCollection = collection(this.db, "products");
  
      const productsSnapshot = await getDocs(productsCollection);

      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,        // Product ID
        ...doc.data()      // Product data
      }));
  
      return productsList;
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };  

  // Example Firebase methods
  addProduct = async (productData) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id;
      id = characters[Math.floor(Math.random() * 26)];
      // Generate the remaining 9 characters (can be letters or numbers)
      for (let i = 0; i < 15; i++) {
        id += characters[Math.floor(Math.random() * characters.length)];
      }
    await setDoc(doc(this.db, "products", id), productData);
  };

  updateProduct = async(productId, productData) => {
    // Update logic in Firebase
    await updateDoc(doc(this.db, "products", productId), productData);
  }; 

  searchProductByKey = async (key, value) => {
    try {
      // Create the Firestore query based on the key and value
      const q = query(
        collection(this.db, "products"),
        where(key, "==", value)
      );
  
      // Fetch the documents matching the query
      const querySnapshot = await getDocs(q);
  
      // Extract and return the product data
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return products; // Return the matching products
    } catch (error) {
      console.error("Error searching for product: ", error);
      return [];
    }
  };

  getFeaturedProducts = async (itemsCount = 12) => {
    try {
      // Create the Firestore query
      const q = query(
        collection(this.db, "products"),
        where("Featured", "==", true),
        limit(itemsCount)
      );
      const querySnapshot = await getDocs(q);
      const imageList = querySnapshot.docs.map(doc => [doc.data().Image,doc.id]);
      return imageList; 
    } catch (error) {
      console.error("Error fetching featured products: ", error);
      return [];
    }
  };

  getRecommendedProducts = (itemsCount = 12) =>
    query(collection(this.db, "products"),
      where("isRecommended", "==", true),
      limit(itemsCount)
    );

  generateKey = () => doc(this.db, "products").id;

  deleteImage = (id) => deleteObject(ref(this.storage, `products/${id}`));

  editProduct = (id, updates) =>
    updateDoc(doc(this.db, "products", id), updates);

  // Remove a product by its ID
  removeProduct = async (id) => {
    try {
      deleteDoc(doc(this.db, "products", id));
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
