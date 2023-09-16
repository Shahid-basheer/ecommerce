import Address from "../models/address"
import { ErrorHandler } from "../utils/errorHandler";

export const newAddress = async(req,res)=>{
    const address = await Address(req.body)
    const savedAddress = await address.save()
    res.status(200).json({
        address:savedAddress
    })
}

export const getSingleAddress = async(req,res)=>{
    const addresses = await Address.find({_id:req.query.id});
    res.status(200).json({addresses:addresses})
}

export const getAddress = async(req,res,next)=>{
    const address = await Address.find({user:req.query.id});
    if(!address) return next(new ErrorHandler("Address not found ",404))
    res.status(200).json({address:address})
}

export const updateAddress = async(req,res,next)=>{
    let address = await Address.findById(req.query.id);
    address = await Address.findByIdAndUpdate(req.query.id,req.body)
    res.status(200).json({address:address})
}
export const deleteAddress = async(req,res,next)=>{
    let address = await Address.findById(req.query.id);
    address.remove();
    res.status(200).json({success:true})
}