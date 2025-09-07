import React, { useState } from "react";
import Navbar from "../components/components_lite/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/auth/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Save user info for voice greeting
        localStorage.setItem("renteeId", res.data._id);
        localStorage.setItem("fullname", res.data.fullname); // save fullname

        // Voice Welcome
        const utterance = new SpeechSynthesisUtterance(
          `Welcome ${res.data.fullname}`
        );
        utterance.pitch = 1.2;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);

        toast.success(res.data.message);
        navigate("/home");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
      const errormessage = error.response
        ? error.response.data.message
        : "Email or password not matched!!";
      toast.error(errormessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#f83002] mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-black">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-black"
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={input.password}
              onChange={changeEventHandler}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-md bg-[#f83002] text-white hover:bg-[#cc2800] transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#f83002] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
