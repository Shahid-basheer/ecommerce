
import UpdateAddress from "@/components/user/updateAddress";
import Layout from "@/pages/me/layout/layout";
import axios from "axios";

export const getServerSideProps = async (params)=>{
const {data} = await axios.get(`${process.env.API_URL}/api/address?id=${params.query.id}`);
return{
    props:{data}
}
}
export default function ProfilePage({data}){
    return <Layout>
        <UpdateAddress id={data.addresses[0]?._id} address={data.addresses[0]}/>
        </Layout>
}
