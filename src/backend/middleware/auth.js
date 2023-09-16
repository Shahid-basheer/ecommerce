import { ErrorHandler } from "../utils/errorHandler";
import {getSession} from 'next-auth/react'

const isAuthenticatedUser = async(req,res,next)=>{
   const session = await getSession({req})
   if(!session){
      return next(new ErrorHandler("Login first to access this route",401))
   }
req.user =  session.user;
next();

};

const authorizeRoles = (req,res,next) => {
     if ('admin' !== req.body.user.role) {
       return next(
         new ErrorHandler(
           `Role (${req.user.role}) is not allowed to access this resource.`
         )
       );
     }
 
     next();
 };
 
export {isAuthenticatedUser,authorizeRoles}