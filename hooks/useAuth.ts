import {
  resetPassword,
  sendResetPassword,
  signInWithPassword,
  signOut,
  signUpWithPassword,
  sendMagicLink,
} from "@/lib/auth/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = (formData: FormData) => {
    startTransition(() =>
      signInWithPassword(formData).catch(() => {
        setError("Mot de passe ou email incorrect");
      })
    );
  };

  const handleSignUp = (formData: FormData) => {
    startTransition(() =>
      signUpWithPassword(formData).catch(() => {
        setError("Une erreur est survenue. Veuillez réssayer.");
      })
    );
  };

  const handleSendResetPassword = (formData: FormData) => {
    const email = formData.get("email") as string;
    startTransition(() =>
      sendResetPassword(email)
        .catch(() => {
          toast.error("Une erreur est survenue.");
        })
        .then(() => {
          toast.success("Un email de réinitialisation vous a été envoyé.");
        })
    );
  };

  const handleResetPassword = (formData: FormData) => {
    const email = formData.get("password") as string;

    startTransition(() =>
      resetPassword(email)
        .catch(() => {
          toast.error("Une erreur est survenue.");
        })
        .then(() => {
          toast.success("Votre mot de passe a été modifié avec succès");
          router.replace("/");
        })
    );
  };

  const handleSendMagicLink = (formData: FormData) => {
    const email = formData.get("email") as string;
    startTransition(() =>
      sendMagicLink(email)
        .catch((error) => {
          toast.error(error);
        })
        .then(() => {
          toast.success(
            "Un lien de connexion a été envoyé à votre adresse mail."
          );
        })
    );
  };

  const handleSignOut = () => {
    startTransition(() => signOut());
  };

  return {
    isPending,
    error,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    handleSendResetPassword,
    handleResetPassword,
    handleSendMagicLink,
  };
};
