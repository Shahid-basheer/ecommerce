import dbConnect from "@/backend/config";
import { createRouter } from 'next-connect';
import onError from "@/backend/middleware/error";
import { webhook } from "@/backend/controllers/orderControllers";
const router = createRouter();
dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

router.post(webhook)

export default router.handler({ onError });