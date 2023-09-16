import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/products";
import AdminLayout from "../layout";

export const getServerSideProps = async (req,res) => {
  const urlParams = {
    page: req.query.page || 1,
  };
  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return {props:{data:data}};
};

const HomePage = ({ data }) => {
  return <AdminLayout><Products data={data} /></AdminLayout>;
};

export default HomePage;