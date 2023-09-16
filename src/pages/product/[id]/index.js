import ProductDetails from "@/components/product/productDetails";
import axios from "axios";

export default function ProductDetailsPage({data}){
    return <div>
        <ProductDetails product={data}/>
    </div>
}

export const getServerSideProps = async({params})=>{
    const {data} = await axios.get(`${process.env.API_URL}/api/products/${params.id}`);
    return {
        props:{data}
    }
}