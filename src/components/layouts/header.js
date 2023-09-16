import React, { useEffect } from "react";
import Link from "next/link";
import Search from "./search";
import Image from "next/image";
import { useCartStateValue } from "@/context/cartContext";
import { useSession } from "next-auth/react";
import { useAuthStateValue } from "@/context/authContext";
export default function Header(){
  const {user,setUser} = useAuthStateValue();
  const {data} = useSession()
  
  useEffect(()=>{
  if(data) setUser(data.user)
  if(data)localStorage.setItem("user",JSON.stringify(data.user))
  },[data])
  
  const {cart} = useCartStateValue()
    return <div><header className="bg-white py-2 border-b">
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex flex-wrap items-center">
        <div className="flex-shrink-0 mr-5">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dnvykpdlo/image/upload/v1693583495/logo_pqerun.jpg"
              height="40"
              width="120"
              alt="BuyItNow"
            />
          </Link>
        </div>
        <Search />

        <div className="flex items-center space-x-2 ml-auto">
          <Link
            href="/cart"
            className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
          >
            <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
            <span className="hidden lg:inline ml-1">
              Cart (<b>{cart?.cartItems?.length || 0}</b>)
            </span>
          </Link>
          {!user ? (
          <Link
            href="/login"
            className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
          >
            <i className="text-gray-400 w-5 fa fa-user"></i>
            <span className="hidden lg:inline ml-1">Sign in</span>
          </Link>
          ):(
          <Link href="/me">
            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar ? user?.avatar?.url :"https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"}
              />
              <div className="space-y-1 font-medium">
                <p>
                  {user.name}
                  <time className="block text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </time>
                </p>
              </div>
            </div>
          </Link>
          )}
        </div>

        <div className="lg:hidden ml-2">
          <button
            type="button"
            className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
          >
            <span className="sr-only">Open menu</span>
            <i className="fa fa-bars fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </header></div>
}