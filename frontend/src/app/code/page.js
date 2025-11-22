"use client";

import { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    const res = await API.get("/links");
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const create = async () => {
    setLoading(true);
    try {
      await API.post("/links", { url, code });
      setUrl("");
      setCode("");
      fetchLinks();
    } catch (err) {
      alert(err.response.data.error);
    }
    setLoading(false);
  };

  const remove = async (c) => {
    await API.delete(`/links/${c}`);
    fetchLinks();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      <div className="mb-6 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={create}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {/* Updated Table */}
<table className="w-full border-separate border-spacing-x-10 border-spacing-y-3 mt-8">
  <thead>
    <tr className="bg-gray-800">
      <th className="px-4 py-3 text-left">Code</th>
      <th className="px-4 py-3 text-left">URL</th>
      <th className="px-4 py-3 text-center">Clicks</th>
      <th className="px-4 py-3 text-left">Last Clicked</th>
      <th className="px-4 py-3 text-center">Actions</th>
    </tr>
  </thead>

  <tbody>
    {links.map((l) => (
      <tr key={l.code} className="hover:bg-gray-900 rounded-lg">
        <td className="px-4 py-3">{l.code}</td>

        <td className="px-4 py-3 max-w-[350px] truncate">
          <a
            href={`http://localhost:8000/${l.code}`}
            target="_blank"
            className="text-blue-400 underline"
          >
            {l.url.length > 40 ? l.url.substring(0, 40) + "..." : l.url}
          </a>
        </td>

        <td className="px-4 py-3 text-center">{l.clicks}</td>

        <td className="px-4 py-3">{l.lastClicked || "—"}</td>

        <td className="px-4 py-3 text-center">
          <button
            className="text-red-400 hover:underline"
            onClick={() => remove(l.code)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}
