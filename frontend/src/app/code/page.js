"use client";

import { useEffect, useState } from "react";
import { API } from "../../lib/api";

export default function CodeHome() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const res = await API.get("/");
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">All Links</h1>

      <ul className="mt-4">
        {links.map((l) => (
          <li key={l.code}>
            <a href={`/code/${l.code}`} className="text-blue-400 underline">
              {l.code}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
