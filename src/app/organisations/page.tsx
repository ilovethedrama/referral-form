"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to organisations home!</h1>
      <h3>
        <Link href={"/organisations/profile/"}>Organisation Profile</Link>
      </h3>
      <h3>
        <Link href={"/organisations/referrals/"}>Referral Form</Link>
      </h3>
    </main>
  );
}
