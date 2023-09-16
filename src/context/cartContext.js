import { useRouter } from 'next/navigation'
import { useState, createContext, useEffect, useContext } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const router = useRouter();
  useEffect(() => {
    setCartToState()
  }, [])
 const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    )
  }
  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1
  }) => {
    const items = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity
    }
    const isItemExist = cart?.cartItems?.find((i) => i.product === items.product)
    let newCartItems;
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) => i.product === isItemExist.product ? items : i)
    } else {
      newCartItems = [...(cart?.cartItems || []), items]
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
    setCartToState()
  }
  const deleteItemFromCart = (productId)=>{
    const newCartItems = cart?.cartItems?.filter((pro)=>pro.product !== productId)
    localStorage.setItem("cart",JSON.stringify({cartItems:newCartItems}))
    setCartToState()
  }
  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };
  return <CartContext.Provider value={{ cart, addItemToCart,saveOnCheckout,deleteItemFromCart,clearCart }}>
    {children}
  </CartContext.Provider>
}
export default CartProvider;

export const useCartStateValue = () => {
  return useContext(CartContext)
}