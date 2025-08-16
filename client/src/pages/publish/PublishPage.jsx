// src/pages/PublishPage.jsx
import React from "react";
import PublishVideoForm from "../../components/PublishVideoForm";

export default function PublishPage() {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Publish a New Video</h1>
      <PublishVideoForm onPublished={() => console.log("Refresh video list")} />
    </div>
  );
}
