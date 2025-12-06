// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { generateEnergyQuote } from "./lib/quoteLogic"; // 直接引入函式

type QuoteData = {
  quote: string;
  time: string;
  weather: string;
};

export default function Home() {
  const [data, setData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const getQuote = () => {
    setLoading(true);
    setShowQuote(false);
    
    // 模擬一個短暫的讀取延遲，讓使用者有回饋感
    setTimeout(() => {
      try {
        // 直接呼叫函式，不再使用 fetch
        const result = generateEnergyQuote("taipei");
        setData(result);
        // 觸發淡入動畫
        setTimeout(() => setShowQuote(true), 100);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms 延遲
  };

  // 元件掛載時取得初始小語
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
          {!loading && data && (
            <p className={`${styles.quoteText} ${showQuote ? styles.visible : ''}`}>
              {data.quote}
            </p>
          )}
          {!loading && !data && (
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
