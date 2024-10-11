import { successToast } from "../components/ToastComponent.js";
import firebaseInstance from "../firebase/firebase.js";

const handlePayment = (amount, cartItems, setCartItems) => {
  firebaseInstance.saveOrderHistory({
    ordId:firebaseInstance.auth.currentUser.uid, 
    name:firebaseInstance.auth.currentUser.displayName,
    items: [...cartItems],
    total:(amount/100).toFixed(2),
    date: new Date().toDateString()+" "+new Date().toLocaleTimeString(),
    address: localStorage.getItem("address"),
    phoneNumber: localStorage.getItem("phoneNumber"),
    status: "Pending",
  });
  setCartItems([]);
  successToast("Order placed successfully");
};

export { handlePayment };
