import dbConnect from "@/backend/config";
import { createRouter } from 'next-connect';
import onError from "@/backend/middleware/error";
import { canReview} from "@/backend/controllers/orderControllers";
const router = createRouter();
dbConnect();


router.get(canReview)

export default router.handler({ onError });