import dbConnect from "@/backend/config";
import {updateProfile } from "@/backend/controllers/authControllers";
import onError from "@/backend/middleware/error";
import upload from "@/backend/utils/multer";
import {createRouter} from 'next-connect';

const router = createRouter();
dbConnect();


export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  const uploadMiddleware = upload.array("image");
  
  router.use(uploadMiddleware).put(updateProfile);
  

export default router.handler({onError})