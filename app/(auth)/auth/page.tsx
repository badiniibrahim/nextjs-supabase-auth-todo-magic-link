"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AuthPage = () => {
  const { isPending, error, handleSignIn, handleSignUp } = useAuth();
  const query = useSearchParams().get("query");

  const signin = query == "signin";

  const handleSubmit = (data: FormData) => {
    signin ? handleSignIn(data) : handleSignUp(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2>{signin ? "Connexion" : "Inscription"}</h2>
      <fieldset className="w-full lg:w-1/2 md:w-2/3 mt-2" disabled={isPending}>
        <form
          className="grid grid-flow-col-1 gap-3 w-full"
          action={handleSubmit}
        >
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="test@test.fr"
            required
          />
          <Input name="password" type="password" id="password" required />

          <Link
            className="flex justify-center items-end hover:underline"
            href={"/auth/send-reset-password"}
          >
            Mot de passe oublié
          </Link>

          {error && <p className=" text-red-500">{error}</p>}

          <Button className="flex gap-2">
            {signin ? "Se connecter" : "S'inscrire"}
            <Loader className={cn("animate-spin", { hidden: !isPending })} />
          </Button>
        </form>
        <Link
          href={signin ? "/auth?query=signup" : "/auth?query=signin"}
          className="flex justify-center items-center mt-2 hover:underline"
        >
          {signin ? "Pas de compte ? " : "Déjà un compte ?"}
        </Link>

        {signin && (
          <Link
            href={"/auth/send-magic-link"}
            className="flex justify-center items-center mt-2 hover:underline"
          >
            Connexion avec Magic link
          </Link>
        )}
      </fieldset>
    </div>
  );
};

export default AuthPage;
