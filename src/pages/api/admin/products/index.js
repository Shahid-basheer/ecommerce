import {
  authorizeRoles,
} from "@/backend/middleware/auth";
import { newProduct } from "@/backend/controllers/productControllers";
import onError from "@/backend/middleware/error";
import {createRouter} from 'next-connect';
import dbConnect from "@/backend/config";

const router = createRouter();
dbConnect();



router.use(authorizeRoles).post(newProduct)
export default router.handler({onError})