import React from "react";
import UploadImages from "@/components/admin/uploadImages";
import { useRouter } from "next/router";
import AdminLayout from "@/pages/admin/layout";

const HomePage = () => {
  const router = useRouter()
  return <AdminLayout><UploadImages id={router.query.id} /></AdminLayout>;
};

export default HomePage;