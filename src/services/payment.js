import { failToast, successToast } from "../components/ToastComponent.js";
import firebaseInstance from "../firebase/firebase.js";

const handlePayment = (amount, cartItems, setCartItems) => {
  if (typeof window.Razorpay === "undefined") {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: "rzp_test_TNEcCYqxdstfpH",
    amount: amount ,
    currency: "INR",
    name: "Shopit",
    description: "Pay to Shopit",
    image:
      "https://c8.alamy.com/comp/2A10TY5/shopping-bag-logo-design-icon-online-shop-symbol-vector-illustrations-2A10TY5.jpg",
    handler: function (response) {
      successToast(
        `Payment successful!`
      );
      firebaseInstance.saveOrderHistory({
        id: firebaseInstance.auth.currentUser.uid,
        name:firebaseInstance.auth.currentUser.displayName,
        paymentId:response.razorpay_payment_id,
        items: [...cartItems],
        total:(amount/100).toFixed(2),
        date: new Date().toDateString()+" "+new Date().toLocaleTimeString(),
      });
      firebaseInstance.logEvent("purchased_item",{items:[...cartItems]});
      setCartItems([]);
    },
    prefill: {
      // name: "Shubham",
      email: "email@example.com",
      // contact: "9454355011",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
    modal: {
      ondismiss: function () {
        failToast("Payment Cancelled !!");
      },
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

export { handlePayment };
