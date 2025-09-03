
import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ChevronDown, LogOut, User2 } from 'lucide-react'
import { useAuthStore } from '@/Store/useAuthStore'



const Navbar = () => {


  const {authUser} = useAuthStore()
  const user = authUser

  


    

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center mx-auto justify-between max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Sawari <span className="text-[#f83002]">Sewa</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-6">
            <Link to="/Home">Home</Link>

            {/* Vehicles Dropdown */}
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#00809D] transition-colors">
                    Vehicles
                    <ChevronDown className="w-4 h-4 mt-1" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  sideOffset={8}
                  className="w-48 p-2 rounded-lg shadow-xl border border-gray-200"
                >
                  <ul className="flex flex-col text-sm text-gray-800 font-medium">
                    <li>
                      <Link
                        to="/stores"
                        className="block px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
                      >
                        Vehicle Stores
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/individual"
                        className="block px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
                      >
                        Individual Owners Vehicle
                      </Link>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </li>

            <Link to="/registerrentee">Rent Your Vehicle</Link>
            <Link to={"/aboutus"} className="hover:text-[#00809D]">
              About Us
            </Link>
            <Link to={"/contactUs"} className="hover:text-[#00809D]">
              Contact Us
            </Link>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link to="/register">
                <Button className="bg-red-400 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">User </h3>
                    <p className="text-sm text-muted-foreground">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col my-2 text-gray-600 ">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Link to="/profile">
                        <Button variant="link">Profile</Button>
                      </Link>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut></LogOut>

                      <Link to="/logout">
                        <Button variant="link">Logout</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar

