import onError from "@/backend/middleware/error";
import { createRouter } from 'next-connect';
import dbConnect from "@/backend/config";
import { getOrders } from "@/backend/controllers/orderControllers";

const router = createRouter();
dbConnect();



router.get(getOrders)
export default router.handler({ onError })