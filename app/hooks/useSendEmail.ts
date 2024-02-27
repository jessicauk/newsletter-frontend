import { useEffect, useState } from "react";
import { sendEmail } from "../http-client";

export interface Response {
  status: number;
  message: string;
  result: string;
}

export interface SendEmail {
  formData: any;
  jsonData: string;
  sent: boolean;
}
export default function useSendEmail({ formData, sent }: SendEmail) {
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const sendEmailAsync = async () => {
      setIsLoading(true);
      const res = await sendEmail(formData);
      setIsLoading(false);
      setResponse(res);
    };
    if (sent) sendEmailAsync();
  }, [sent]);
  return { response, isLoading };
}
