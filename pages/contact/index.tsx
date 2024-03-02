import React from "react";
import Link from "next/link";

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface ContactProps {
  contacts: Contact[];
}

export default function Contact({ contacts }: ContactProps) {
  return (
    <div className="full-screen h-screen grid grid-rows-template grid-cols-6 gap-6 place-content-center">
      <h1 className="text-xl md:text-3xl text-bold h-10 col-start-2 col-span-2">
        Contact List
      </h1>
      <div className="h-10 col-start-5 col-span-1">
        <Link href="/home">Home</Link>
      </div>
      <div className="h-min-80 h-[60vh] col-start-2 col-span-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test</td>
              <td>test@mail.com</td>
              <td>33443553423</td>
            </tr>
            {contacts?.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
