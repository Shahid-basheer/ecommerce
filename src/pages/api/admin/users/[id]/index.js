import onError from "@/backend/middleware/error";
import { createRouter } from 'next-connect';
import dbConnect from "@/backend/config";
import { deleteUser, getUser, updateUser } from "@/backend/controllers/authControllers";

const router = createRouter();
dbConnect();



router.get(getUser).put(updateUser).delete(deleteUser)
export default router.handler({ onError })