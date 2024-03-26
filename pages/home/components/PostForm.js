import React, { useState } from "react";

function PostForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf ?"
        rows={4}
        className="w-full border rounded p-2 mb-2"
      />
      <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded">
        Publier
      </button>
    </form>
  );
}

export default PostForm;