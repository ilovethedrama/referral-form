'use client'
import styles from "./page.module.css";
import ReferralForm from "@/components/referral-form/referral-form";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ReferralForm />
      </div>
    </main>
  );
}
