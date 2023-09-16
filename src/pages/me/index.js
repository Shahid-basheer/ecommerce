import Profile from "@/components/auth/profile";
import { useAuthStateValue } from "@/context/authContext";
import Layout from "@/pages/me/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ProfilePage() {
    const { user } = useAuthStateValue();


    const [data, setData] = useState(null)
    useEffect(() => {
        getAddress()
    }, [user?._id])


    const getAddress = async () => {
        try {
            const { data } = await axios.get(`${process.env.API_URL}/api/address/${user?._id}`)
            setData(data)

        } catch (e) {
            console.log(e, 'e');
        }
    }

    return <Layout>
        <Profile addresses={data?.address} />
    </Layout>
}