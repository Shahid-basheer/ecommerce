import { checkoutSession } from "@/backend/controllers/orderControllers";
import dbConnect from "@/backend/config";
import {createRouter} from 'next-connect';
import onError from "@/backend/middleware/error";
const router = createRouter();
dbConnect();



router.post(checkoutSession)

export default router.handler({onError});