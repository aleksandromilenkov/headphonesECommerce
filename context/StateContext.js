import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  setShowCart: () => {},
  toggleCartItemQuantity: () => {},
  onRemove: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
});

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => {
      return prevTotalQuantities + quantity;
    });
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the cart`);
    } else {
      product.quantity = quantity;
      setCartItems((prevState) => [...prevState, product]);
    }
  };

  const onRemove = (product) => {
    const removedItem = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    setCartItems((prevState) => {
      return prevState.filter((cartItem) => cartItem._id !== product._id);
    });
    setTotalPrice((prevTotalPrice) => {
      return prevTotalPrice - removedItem.quantity * removedItem.price;
    });
    setTotalQuantities((prevTotalQuantities) => {
      return prevTotalQuantities - removedItem.quantity;
    });
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((cartItem) => cartItem._id === id);
    index = cartItems.findIndex((cartItem) => cartItem._id === id);
    if (value === "inc") {
      foundProduct.quantity += 1;
      setCartItems((prevState) => {
        const updatedItems = [...prevState];
        updatedItems[index] = foundProduct;
        return updatedItems;
      });
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        setCartItems((prevState) => {
          const updatedItems = [...prevState];
          updatedItems[index] = foundProduct;
          return updatedItems;
        });
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevState) => {
      return prevState + 1;
    });
  };

  const decQty = () => {
    setQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
