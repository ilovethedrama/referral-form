'use client'
import Link from "next/link";
import styles from "./page.module.css";
import ReferralForm from "@/components/referral-form/referral-form";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Welcome home!</h1>
        <h3><Link href={"/organisations/"}>Organisations</Link></h3>
        <h3><Link href={"/parents/"}>Parents/Care-Givers</Link></h3>
      </div>
    </main>
  );
}
