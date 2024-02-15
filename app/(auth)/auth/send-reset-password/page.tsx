"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const SendResetPasswordPage = () => {
  const { isPending, error, handleSendResetPassword } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2>Réinitialisation du mot de passe</h2>

      <fieldset className="w-full lg:w-1/2 md:w-2/3 mt-2" disabled={isPending}>
        <form
          className="grid grid-flow-col-1 gap-3 w-full"
          action={handleSendResetPassword}
        >
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="test@test.fr"
            required
          />

          {error && <p className=" text-red-500">{error}</p>}

          <Button className="flex gap-2">
            Envoyer
            <Loader className={cn("animate-spin", { hidden: !isPending })} />
          </Button>
        </form>
      </fieldset>
    </div>
  );
};

export default SendResetPasswordPage;
