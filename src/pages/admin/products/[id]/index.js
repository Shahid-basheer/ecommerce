import React from "react";
import axios from "axios";

import UpdateProducts from "@/components/admin/updateProducts";
import AdminLayout from "../../layout";

export const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(`${process.env.API_URL}/api/products/${params.id}`);
    return {
        props: { data }
    }
}

const HomePage = ({ data }) => {
    return <AdminLayout><UpdateProducts data={data} /></AdminLayout>;
};

export default HomePage;