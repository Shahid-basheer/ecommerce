import axios from "axios";
import React from "react";
import queryString from "query-string";
import AdminLayout from "../layout";
import Users from "@/components/admin/users";

export const getServerSideProps = async ({query}) => {
  const urlParams = {
    page:query.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users?${searchQuery}`
  );

  return {props:{data}};
};

const AdminUsersPage = ({ data }) => {
  return <AdminLayout><Users data={data}/></AdminLayout>;
};

export default AdminUsersPage;