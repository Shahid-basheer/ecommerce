import onError from "@/backend/middleware/error";
import { createRouter } from 'next-connect';
import dbConnect from "@/backend/config";
import { deleteOrder, getOrder, updateOrder} from "@/backend/controllers/orderControllers";

const router = createRouter();
dbConnect();



router.get(getOrder).put(updateOrder).delete(deleteOrder)
export default router.handler({ onError })