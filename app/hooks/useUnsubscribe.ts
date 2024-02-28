import { useEffect, useState } from "react";
import { unsubscribeRecipient } from "../http-client";

export default function useUnsubscribe(unsubscribe: boolean, token: string) {
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribeAsync = async () => {
      setIsLoading(true);
      const result = await unsubscribeRecipient(token);
      setIsSubscribed(result.isSubscribed);
      setIsLoading(false);
    };
    if (unsubscribe) {
      unsubscribeAsync();
    }
  }, [unsubscribe, token]);
  return {
    isSubscribed,
    isLoading,
    setIsSubscribed
  };
}
