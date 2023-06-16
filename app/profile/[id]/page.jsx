"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Profile from "@/components/Profile";
const OtherProfile = ({ params }) => {
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  const name = useSearchParams().get("name");
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (params?.id) fetchPrompts();
  }, [params?.id]);
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPrompts((prevPrompts) =>
            prevPrompts.filter((p) => p._id !== prompt._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={name}
      desc={`Welcome to ${name} personalized profile page`}
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default OtherProfile;
