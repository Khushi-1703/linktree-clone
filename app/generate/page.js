"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const Generate = () => {
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addLink = () => {
    setLinks((prev) => [...prev, { link: "", linktext: "" }]);
  };

  const removeLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    handle.trim() &&
    pic.trim() &&
    desc.trim() &&
    links.some((item) => item.link.trim() && item.linktext.trim());

  const submitLinks = async () => {
    if (!isFormValid) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle,
          pic,
          desc,
          links,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linktext: "" }]);
        setHandle("");
        setPic("");
        setDesc("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen px-6 md:px-12 pt-24 md:pt-30 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center items-center text-gray-900 px-15">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <h1 className="font-bold text-4xl">Create your Bittree</h1>

          <div>
            <h2 className="font-semibold text-2xl">
              Step 1: Claim your Handle
            </h2>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-4 py-3 mt-3 focus:outline-pink-500 border border-pink-400 rounded-full"
              type="text"
              placeholder="Choose a Handle"
            />
          </div>

          <div>
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 mt-3">
                <input
                  value={item.linktext}
                  onChange={(e) =>
                    handleChange(index, "linktext", e.target.value)
                  }
                  className="flex-1 px-4 py-3 rounded-full focus:outline-pink-500 border border-pink-400"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full focus:outline-pink-500 border border-pink-400"
                  type="text"
                  placeholder="Enter link"
                />
                {links.length > 1 && (
                  <button
                    onClick={() => removeLink(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addLink}
              className="mt-4 px-5 py-2 bg-slate-900 text-white font-bold rounded-3xl hover:opacity-90 cursor-pointer"
            >
              + Add Link
            </button>
          </div>

          <div>
            <h2 className="font-semibold text-2xl">
              Step 3: Add Picture and Description
            </h2>

            <div className="flex flex-col gap-3 mt-3">
              <input
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                className="px-4 py-3 rounded-full focus:outline-pink-500 border border-pink-400"
                type="text"
                placeholder="Enter link to your Picture"
              />
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-3 rounded-full focus:outline-pink-500 border border-pink-400"
                type="text"
                placeholder="Enter description"
              />

              <button
                disabled={!isFormValid || loading}
                onClick={submitLinks}
                className="disabled:bg-slate-500 w-fit px-6 py-3 bg-slate-900 text-white font-bold rounded-3xl hover:opacity-90 cursor-pointer"
              >
                {loading ? "Creating..." : "Create your BitTree"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center w-full h-full min-h-125">
        <Image
          src="/generate.png"
          alt="Generate your links"
          fill
          className="object-contain scale-100"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Generate;
