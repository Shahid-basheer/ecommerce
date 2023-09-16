import dbConnect from "@/backend/config";
import {getSingleAddress, newAddress } from "@/backend/controllers/addressController";
// import { isAuthenticatedUser } from "@/backend/middleware/auth";
import {createRouter} from 'next-connect';
import onError from "@/backend/middleware/error";
const router = createRouter();
dbConnect();



router.get(getSingleAddress).post(newAddress);
export default router.handler({onError})