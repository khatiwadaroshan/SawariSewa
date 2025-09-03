import { instance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => (
    {
        authUser: null,

        checkAuth: async()=>{
            try{
                const res = await instance.get("/auth/checkauth");
                set({authUser:res.data})

            }
            catch(err){
                console.log("Error checking authentication: ", err.message);
                
            }
        }

        
    }
))