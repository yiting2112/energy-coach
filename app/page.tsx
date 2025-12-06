// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type QuoteData = {
  quote: string;
  time: string;
  weather: string;
};

export default function Home() {
  const [data, setData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    setError(null);
    setShowQuote(false);
    try {
      const response = await fetch("/api/energy-quote?city=taipei");
      if (!response.ok) {
        throw new Error("無法取得小語");
      }
      const result: QuoteData = await response.json();
      setData(result);
      // Trigger fade-in animation
      setTimeout(() => setShowQuote(true), 100);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("發生未知錯誤");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial quote on component mount
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="Energy Coach Logo"
              width={180}
              height={54}
              priority
            />
          </div>
          {data && (
            <div className={styles.infoBar}>
              <span className={styles.infoChip}>時間: {data.time}</span>
              <span className={styles.infoChip}>天氣: {data.weather}</span>
            </div>
          )}
        </header>

        <div className={styles.quoteDisplay}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!error && !loading && data && (
            <p className={`${styles.quoteText} ${showQuote ? styles.visible : ''}`}>
              {data.quote}
            </p>
          )}
          {!error && !loading && !data && (
            <p>點擊按鈕來索取你的今日小語。</p>
          )}
          {loading && <p>正在為你生成小語...</p>}
        </div>

        <button
          className={styles.ctaButton}
          onClick={getQuote}
          disabled={loading}
        >
          {loading ? "讀取中..." : "索取小語"}
        </button>
      </div>
    </main>
  );
}
