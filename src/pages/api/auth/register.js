import dbConnect from "@/backend/config";
import { registerUser } from "@/backend/controllers/authControllers";
import onError from "@/backend/middleware/error";
import {createRouter} from 'next-connect';

const router = createRouter();
dbConnect();



router.post(registerUser);
export default router.handler({onError})