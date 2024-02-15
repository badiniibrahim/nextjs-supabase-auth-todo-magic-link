"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth/actions";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const { isPending, handleSignIn } = useAuth();

  return (
    <div className="flex w-full bg-slate-500">
      <form>
        <Button formAction={signOut}>
          Logout
          <Loader className={cn("animate-spin", { hidden: !isPending })} />
        </Button>
      </form>
    </div>
  );
};

export default NavBar;
