import { createContext,useState,useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState(0);
    const [cartItems, setCartItems] = useState(() => {
        // Retrieve cart items from localStorage on initial load
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
      });
    
      // Update localStorage whenever cartItems changes
      useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setCart(cartItems.length);
      }, [cartItems]);

    const addToCart = (id, item, count) => {
        setCartItems((prevCartItems) => {
          const existingItem = prevCartItems.find((i) => i.id === id);
          if (existingItem) {
            return prevCartItems.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + count } : i
            );
          } else {
            setCart((prevCount) => prevCount + 1);
            return [
              ...prevCartItems,
              { id, name: item.name, quantity: count, price: item.price, image: item.image, sku:`Sku-${id}`,added:item.added},
            ];
          }
        });
      };

    return(
        <CartContext.Provider value={{cart, setCart, cartItems, setCartItems,addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext,CartProvider};