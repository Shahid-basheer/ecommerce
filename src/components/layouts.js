import GlobalProvider from "@/context/globalProvider";
import Header from "./layouts/header";

export default function Layouts({children}){
    return <div>
        <GlobalProvider>
        <Header/>
        <main>{children}</main>
        </GlobalProvider>
    </div>
}