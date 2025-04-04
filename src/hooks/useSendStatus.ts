import { useState } from "react";

export type SendStatus = "idle" | "sending" | "sent" | "error";

export const useSendStatus = (resetAfter = 4000) => {
  const [status, setStatus] = useState<SendStatus>("idle");

  const send = async (callback: () => Promise<void>) => {
    setStatus("sending");
    try {
      await callback();
      setStatus("sent");

      setTimeout(() => {
        setStatus("idle");
      }, resetAfter);
    } catch (error) {
      setStatus("error");
      console.log(error);
      setTimeout(() => {
        setStatus("idle");
      }, resetAfter);
    }
  };

  return { status, send };
};
