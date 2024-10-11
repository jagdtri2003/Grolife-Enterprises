import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signOut, sendPasswordResetEmail, updatePassword, updateEmail, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc,getDocs, getDoc, updateDoc, orderBy, startAfter, limit, query, where,deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import {getAnalytics,logEvent} from "firebase/analytics";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);

    this.auth = getAuth();
    this.db = getFirestore();
    this.storage = getStorage();
    this.analytics = getAnalytics(app);
  }

  // AUTH ACTIONS ------------

  // createAccount = (email, password) =>
  //   createUserWithEmailAndPassword(this.auth, email, password);

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
          address: '',
          role:'user', // Default role: user
          phoneNumber:'',
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

  signInWithFacebook = () =>
    signInWithPopup(this.auth, new FacebookAuthProvider());

  signInWithGithub = () =>
    signInWithPopup(this.auth, new GithubAuthProvider());

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
    const q = query(orderRef, where("ordId", "==", uid), orderBy("date")
    );
    return getDocs(q);
  };

    // Log Event (Custom function for logging events)
  logEvent = (eventName, eventParams) => logEvent(this.analytics, eventName, eventParams);

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

  getAllOrderHistory = async () => {
    const orderRef = collection(this.db, "orders");
    const q = query(orderRef, orderBy("date", "desc"));

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

//   reauthenticate = (currentPassword) => {
//     const user = this.auth.currentUser;
//     const cred = EmailAuthProvider.credential(user.email, currentPassword);

//     return user.reauthenticateWithCredential(cred);
//   };

  updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          updateEmail(user, newEmail)
            .then(() => {
              resolve("Email Successfully updated");
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

//   storeImage = async (id, folder, imageFile) => {
//     const snapshot = await put(ref(this.storage, `${folder}/${id}`), imageFile);
//     const downloadURL = await getDownloadURL(snapshot.ref);

//     return downloadURL;
//   };

  deleteImage = (id) => deleteObject(ref(this.storage, `products/${id}`));

  editProduct = (id, updates) =>
    updateDoc(doc(this.db, "products", id), updates);

  // Remove a product by its ID
  removeProduct = async (id) => {
    try {
      deleteDoc(doc(this.db, "products", id));
      console.log(`Product with ID ${id} has been removed.`);
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
