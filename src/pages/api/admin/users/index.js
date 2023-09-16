import onError from "@/backend/middleware/error";
import { createRouter } from 'next-connect';
import dbConnect from "@/backend/config";
import { getUsers } from "@/backend/controllers/authControllers";

const router = createRouter();
dbConnect();



router.get(getUsers)
export default router.handler({ onError })