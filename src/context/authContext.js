import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState, createContext, useContext, useEffect } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(null);
  
  const router = useRouter();
  const registerUser = async ({name,email,password})=>{
    try{

        const {data} = await axios.post(`
        ${process.env.API_URL}/api/auth/register`,
        {
            name,
            email,
            password
        })
        if(data.user) router.push('/') 
    } catch(e){
        setError(e.response?.data?.message)
    }
  }
  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/auth/session?update");

      if (data?.user) {
        setUser(data.user);
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProfile = async (formData)=>{
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me/update?id=${formData.get('userId')}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.user) {
        loadUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  }

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me/update_password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data?.success) {
        router.replace("/me");
      }
    } catch (error) {
      console.log(error.response);
      setError(error?.response?.data?.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/users/${id}`,
        {
          userData,
        }
      );

      if (data?.success) {
        setUpdated(true);
        router.replace(`/admin/users/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/users/${id}`
      );

      if (data?.success) {
        router.replace(`/admin/users`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };


  const addNewAddress = async (address,data)=>{
   address.user = data.user._id;
    try{

        const {data} = await axios.post(`
        ${process.env.API_URL}/api/address`,
        address
        )
        if(data) router.push('/') 
    } catch(e){
        setError(e.response?.data?.message)
    }
  }
  const updateAddress = async (id,address)=>{
    try{

        const {data} = await axios.put(`
        ${process.env.API_URL}/api/address/${id}`,
        address
        )
        if(data?.address){
          setUpdated(true)
          router.push(`/me`) 
        } 
    } catch(e){
        setError(e.response?.data?.message)
    }
  }
  const clearErrors = ()=>{
    setError(null)
  }
  return <AuthContext.Provider value={{
    user,
    setUser,
    error,
    setError,
    loading,
    updated,
    registerUser,
    updateProfile,
    updateUser,
    updatePassword,
    deleteUser,
    addNewAddress,
    updateAddress,
    setUpdated,
    clearErrors
   }}>
    {children}
  </AuthContext.Provider>
}
export default AuthProvider;

export const useAuthStateValue = () => {
  return useContext(AuthContext)
}
