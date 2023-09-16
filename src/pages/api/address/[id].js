import dbConnect from "@/backend/config";
import { deleteAddress, getAddress, updateAddress } from "@/backend/controllers/addressController";
// import { isAuthenticatedUser } from "@/backend/middleware/auth";
import {createRouter} from 'next-connect';
import onError from "@/backend/middleware/error";
const router = createRouter();
dbConnect();



router.get(getAddress).put(updateAddress).delete(deleteAddress);
export default router.handler({onError})