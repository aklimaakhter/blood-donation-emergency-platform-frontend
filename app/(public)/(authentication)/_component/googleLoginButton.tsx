"use client";

import { useTransition } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { googleLoginAction } from "../_actions/authAction";

export default function GoogleLoginButton() {
  const [pending, startTransition] = useTransition();

  return (
    <div className={pending ? "pointer-events-none opacity-60" : "flex justify-center"}>
      <GoogleLogin
        text="continue_with"
        onSuccess={(res) => {
          const idToken = res.credential;
          if (!idToken) return toast.error("Google credential paoa jayni");
          startTransition(async () => {
            const result = await googleLoginAction(idToken);
            if (result && !result.success) toast.error(result.message);
          });
        }}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
}