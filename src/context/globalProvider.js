import { Fragment } from "react";
import AuthProvider from "./authContext";
import CartProvider from "./cartContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import ProductProvider from "./productContext";
import { OrderProvider } from "./orderContext";

export default function GlobalProvider({ children }) {
    return <Fragment>
        <ToastContainer position="bottom-right" />
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                <ProductProvider>
                <SessionProvider>{children}</SessionProvider>
                </ProductProvider>
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    </Fragment>
}