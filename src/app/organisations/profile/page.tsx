"use client";

import React from "react";
import { fetchProfile } from "@/components/submitHandler";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return <span>Loading son!...</span>;
  }

  if (isError) {
    return <span>Hmmm there&apos;s been an error son!...</span>;
  }

  return (
    <main>
      <div>
        <h1>Welcome to profile home!</h1>
        <main>
          <h3>{data?.body?.firstName || "No record found"}</h3>
        </main>
      </div>
    </main>
  );
}
