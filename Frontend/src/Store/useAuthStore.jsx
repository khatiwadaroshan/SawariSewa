import { instance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,

  
  setAuthUser: (user) => {
    set({ authUser: user });
    localStorage.setItem("authUser", JSON.stringify(user));
  },

  checkAuth: async () => {
    try {
      const res = await instance.get("/auth/checkauth");
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (err) {
      console.log("Error checking authentication: ", err.message);
      
      set({ authUser: null });
      localStorage.removeItem("authUser");
    }
  },
}));
