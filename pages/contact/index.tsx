import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { getAllContacts } from "../../app/http-client/contact";

interface Contact {
  name: string;
  email: string;
  phone: string;
}

export default function Contact() {
  const [contacts, setContacts] = useState<Partial<Contact[]>>([]);
  const isMounted = useRef(true);
  useEffect(() => {
    const fetchData = async () => {
      isMounted.current = true;
      const response = await getAllContacts();

      setContacts(response);
    };
    if (isMounted.current) {
      fetchData();
    }
  }, []);
  return (
    <div className="full-screen h-screen grid grid-rows-template grid-cols-6 gap-6 place-content-center">
      <h1 className="text-indigo-800 text-xl md:text-3xl text-bold h-10 col-start-2 col-span-2">
        Contact List
      </h1>
      <div className="h-10 col-start-5 col-span-1 text-end">
        <Link
          href="/home"
          className="text-md text-center text-white bg-indigo-500 hover:bg-indigo-700 hover:shadow-xl p-3 rounded-full size-14 text-center shadow-md"
        >
          <HomeIcon />
        </Link>
      </div>
      <div className="h-min-80 h-[60vh] col-start-2 col-span-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-indigo-500">Name</th>
              <th className="text-indigo-500">Email</th>
              <th className="text-indigo-500">Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact, index) => (
              <tr key={index} className="border-b-indigo-300 border-b-2">
                <td className="py-1.5">{contact?.name}</td>
                <td className="py-1.5">{contact?.email}</td>
                <td className="py-1.5">{contact?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
