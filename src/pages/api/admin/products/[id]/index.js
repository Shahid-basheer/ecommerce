import {
    authorizeRoles,
  } from "@/backend/middleware/auth";
  import { deleteProduct, updateProduct } from "@/backend/controllers/productControllers";
  import onError from "@/backend/middleware/error";
  import {createRouter} from 'next-connect';
  import dbConnect from "@/backend/config";
  
  const router = createRouter();
  dbConnect();
  
  
  
  router.put(updateProduct).delete(deleteProduct)
  export default router.handler({onError})