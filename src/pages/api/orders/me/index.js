import dbConnect from "@/backend/config";
import { createRouter } from 'next-connect';
import onError from "@/backend/middleware/error";
import { myOrders } from "@/backend/controllers/orderControllers";
const router = createRouter();
dbConnect();


router.get(myOrders)

export default router.handler({ onError });