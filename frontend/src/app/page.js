"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const API = axios.create({
    baseURL:'https://url-shortner-3u3d.onrender.com/api/links',
  });

  const fetchLinks = async () => {
    try {
      const res = await API.get("/links");
      setLinks(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const create = async () => {
    if (!url) return alert("Enter a valid URL");

    setLoading(true);
    try {
      await API.post("/links", { url, code });
      setUrl("");
      setCode("");
      fetchLinks();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create link");
    }
    setLoading(false);
  };

  const remove = async (c) => {
    await API.delete(`/links/${c}`);
    fetchLinks();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        TinyLink Dashboard
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />

        <input
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ padding: "10px", width: "200px", marginRight: "10px" }}
        />

        <button
          onClick={create}
          disabled={loading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code}>
              <td>{l.code}</td>
              <td>
                <a href={`/code/${l.code}`} style={{ color: "blue" }}>
                  {l.url}
                </a>
              </td>
              <td>{l.clicks}</td>
              <td>{l.lastClicked || "Never"}</td>
              <td>
                <button
                  onClick={() => remove(l.code)}
                  style={{ color: "red", cursor: "pointer" }}
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
