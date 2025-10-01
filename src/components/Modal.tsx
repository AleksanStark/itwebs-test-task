"use client";
import { useState } from "react";

export default function Modal() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Please provide both a title and a file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await fetch(
        "itwebs-test-task-server-production.up.railway.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to upload file. Server responded with " + response.status
        );
      }

      const result = await response.json();
      console.log("Upload successful:", result);

      setIsOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Upload error:", err);
        setError(err.message || "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className="bg-[#FCF8F1] p-4 text-black font-bold"
          onClick={() => setIsOpen(true)}
        >
          Show Modal
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-black/50" : "bg-transparent"
        }`}
        style={{
          // Use opacity for a fade effect
          opacity: isOpen ? 1 : 0,
          // Control pointer events to prevent clicking when modal is hidden
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          className={`bg-amber-50 w-[300px] p-4 rounded-3xl transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <h2 className="text-black text-center font-bold">Upload File</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="title" className="text-black font-medium">
              Title
            </label>
            <input
              className="text-white bg-black placeholder-white p-2"
              id="title"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              required
            />

            <label htmlFor="file" className="text-black font-medium">
              File
            </label>
            <input
              className="text-white bg-black p-2"
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={isLoading}
              required
            />

            <button className="text-black" type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Submit"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <button
            className=" absolute top-5 right-5 text-black text-2xl"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
