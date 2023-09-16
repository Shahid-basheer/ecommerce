import dbConnect from "@/backend/config";
import {newProduct,getProducts }  from "@/backend/controllers/productControllers";
import {createRouter,expressWrapper} from 'next-connect';

const router = createRouter();
dbConnect();


router.get(getProducts);
router.post(newProduct);
export default router.handler()