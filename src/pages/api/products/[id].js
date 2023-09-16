import dbConnect from "@/backend/config";
import {getProductById}  from "@/backend/controllers/productControllers";
import {createRouter} from 'next-connect';

const router = createRouter();
dbConnect();


router.get(getProductById);
export default router.handler()