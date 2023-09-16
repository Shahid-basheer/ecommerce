import {
    authorizeRoles,
  } from "@/backend/middleware/auth";
  import upload from "@/backend/utils/multer";
  import {uploadProductImages } from "@/backend/controllers/productControllers";
  import onError from "@/backend/middleware/error";
  import {createRouter} from 'next-connect';
  import dbConnect from "@/backend/config";
  
  const router = createRouter();
  dbConnect();

  export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  const uploadMiddleware = upload.array("image");
  
  router.use(uploadMiddleware).post(uploadProductImages)
  export default router.handler({onError})