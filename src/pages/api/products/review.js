import dbConnect from "@/backend/config";
import {createProductReview }  from "@/backend/controllers/productControllers";
import {createRouter} from 'next-connect';

const router = createRouter();
dbConnect();



router.put(createProductReview);
export default router.handler()