"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";
import useUnsubscribe from "../../../hooks/useUnsubscribe";
import { getRecipientByToken } from "../../../http-client";

type Params = {
  params: {
    slug: string;
  };
};

interface Recipient {
  name: string;
  email: string;
  isSubscribed: boolean;
}

interface SubscribedTextProps {
  name: string;
}

const SubscribedText = ({ name }: SubscribedTextProps) => {
  return (
    <>
      <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-emerald-500">{name}.&nbsp;</span>
        {`Are you sure you want to cancel your subscription?`}
      </h2>
      <p>
        This action can not be undone. If you are sure you want to cancel your
        subscription, please click the button below.
      </p>
    </>
  );
};

const UnsubscribedText = ({ name }: SubscribedTextProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center content-center items-center">
      <h1 className="text-3xl md:text-5xl text-indigo-700">{name ?? ""}</h1>
      <h2 className="text-center text-xl md:text-2xl text-indigo-700">
        You have successfully unsubscribed!
      </h2>
      <ThumbUpIcon
        className="text-3xl md:text-5xl text-sky-500"
        fontSize="large"
      />
    </div>
  );
};

export default function Page({ params }: Params) {
  const requestRef = useRef(false);
  const [subscribe, setSubscribe] = useState(false);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const { isSubscribed, isLoading, setIsSubscribed } = useUnsubscribe(
    subscribe,
    params.slug
  );

  useEffect(() => {
    const getRecipient = async () => {
      const recipient = await getRecipientByToken(params.slug);
      setRecipient(recipient);
      setIsSubscribed(recipient.isSubscribed);
    };
    if (requestRef.current === false) {
      requestRef.current = true;
      getRecipient();
    }
  }, []);

  const handleUnsubscribe = useCallback(() => {
    setSubscribe(true);
  }, [subscribe]);

  return (
    <main className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-screen flex flex-row justify-center items-center content-center">
      <div className="bg-slate-200 p-8 rounded-xl shadow-2xl col-span-full w-3/4 sm:w-2/4 lg:w-2/4 xl:w-2/4 h-5/6 flex flex-col justify-evenly content-center items-center">
        {isSubscribed === true && (
          <SubscribedText name={recipient?.name ?? ""} />
        )}
        {isSubscribed === true && (
          <Button
            disabled={isLoading}
            variant="contained"
            className="bg-red-700"
            color="error"
            onClick={handleUnsubscribe}
          >
            {isLoading ? "Unsubscribing..." : "Unsubscribe"}
          </Button>
        )}
        {isSubscribed === false && (
          <UnsubscribedText name={recipient?.name ?? ""} />
        )}
        {isSubscribed === null && <CircularProgress />}
      </div>
    </main>
  );
}
