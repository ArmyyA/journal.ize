"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { motion } from "framer-motion";

type User = {
  image: string;
  name: string;
  //absolute top-full right-0 mt-2
  //relative z-50
};

export default function SignedIn({ image, name }: User) {
  return (
    <li className="flex align-middle gap-5 overflow-hidden">
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none drop-shadow-md">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 2 }}
            >
              <Image
                width={64}
                height={64}
                src={image}
                alt=""
                className="scale-90 w-10 rounded-full hover:opacity-70"
              />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard">
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link onClick={() => signOut({ callbackUrl: "/" })} href="">
              <DropdownMenuItem className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
