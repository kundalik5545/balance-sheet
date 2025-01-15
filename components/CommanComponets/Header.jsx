import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { checkUser } from "@/actions/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <div className="fixed top-0 border-b z-50 bg-white/80 backdrop-blur-md w-full ">
      <nav className="flex items-center justify-between px-4 py-3">
        <div className="logo container mx-auto text-2xl w-1/2">
          <Link href="/">Balance Sheet</Link>
        </div>
        <div className="menu flex items-center justify-end space-x-4 md:space-x-14 w-1/2 ">
          <div className="flex menu-item space-x-2">
            <Link href="/income" className="hidden sm:block">
              <Button className="bg-green-50 text-green-500" variant="outline">
                <CircleArrowUp color="green" size={20} />
                <span className="hidden md:inline">Income</span>
              </Button>
            </Link>

            <Link href="/expense" className="hidden sm:block">
              <Button className="bg-red-50 text-red-500" variant="outline">
                <CircleArrowDown color="red" size={20} />
                <span className="hidden md:inline">Expense</span>
              </Button>
            </Link>
          </div>
          <div className="user-avatar">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex flex-row space-x-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10", // Avatar size
                    },
                  }}
                />
                <div className="w-40 hidden md:block">
                  <p className="text-sm">Kundalik Jadhav</p>
                  <p className="text-[11px] w-36 break-all text-blue-500">
                    kundalikjadhav@gmail.com
                  </p>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
