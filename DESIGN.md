# Energy Coach - UI/UX 設計規範

這份文件定義了 Energy Coach 專案的視覺設計、元件規格與使用者體驗流程。

## ① 使用者流程 (User Flow)

```
1. 使用者進入頁面
   - 看到主視覺、歡迎詞、天氣與時間提示。
   - 「索取小語」按鈕處於可點擊狀態。
   |
   v
2. 點擊「索取小語」按鈕
   - 按鈕顯示讀取中狀態 (e.g., loading spinner)。
   - 向後端 API (GET /api/energy-quote) 發出請求。
   |
   v
3. 系統回應
   - 後端根據時間、天氣、工作週期生成小語。
   - 前端接收到小語文字。
   |
   v
4. 顯示小語
   - 讀取中狀態結束。
   - 小語區塊以動畫效果（如淡入）顯示新的句子。
   - 按鈕恢復可點擊狀態，供使用者再次索取。
```

## ② 色票 (Color Palette)

風格以溫暖、輕盈、中性的色系為主。

- **主色 (Primary):** `#FFDDBB` (柔和的橘色，用於按鈕、重點提示)
- **背景色 (Background):** `#FDF6F0` (極淺的米色，營造溫暖感)
- **文字主色 (Text Primary):** `#4A4A4A` (深灰色，確保可讀性)
- **文字輔色 (Text Secondary):** `#888888` (中灰色，用於提示性文字)
- **卡片/元件背景 (Card Background):** `#FFFFFF` (白色，用於凸顯內容區塊)
- **點綴色 (Accent):** `#B2C8DF` (柔和的藍色，用於天氣等資訊提示，與主色形成對比)

## ③ 主要字型 (Typography)

選用開源、易於閱讀的無襯線字體。

- **主要字體:** `Noto Sans TC` (思源黑體)，兼具現代感與可讀性。
- **備用字體:** `sans-serif`

## ④ 元件規格 (Component Specs)

#### 按鈕 (Button)
- **名稱:** `CtaButton`
- **尺寸:**
  - 手機版: `width: 80%`, `height: 50px`, `font-size: 16px`
  - 桌機版: `width: 250px`, `height: 60px`, `font-size: 18px`
- **樣式:**
  - 圓角: `border-radius: 30px`
  - 背景色: `var(--primary-color)`
  - 文字顏色: `var(--text-primary-color)`
  - 陰影: `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)`
- **互動:**
  - Hover: 輕微放大 (`transform: scale(1.05)`)
  - Active: 輕微內縮 (`transform: scale(0.98)`)
  - Disabled/Loading: 透明度降低 (`opacity: 0.7`)，顯示 loading 圖示。

#### 小語卡片 (Quote Card)
- **名稱:** `QuoteDisplay`
- **尺寸:**
  - 手機版: `width: 90%`, `padding: 20px`
  - 桌機版: `width: 600px`, `padding: 40px`
- **樣式:**
  - 背景色: `var(--card-bg-color)`
  - 圓角: `border-radius: 20px`
  - 陰影: `box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08)`
- **動畫:** 內容更新時有淡入 (fade-in) 效果。

#### 天氣提示 (Info Chip)
- **名稱:** `InfoChip`
- **樣式:**
  - 類藥丸形狀: `border-radius: 20px`
  - `padding: 5px 15px`
  - 背景色: `var(--accent-color)`
  - 文字顏色: `var(--text-primary-color)`
  - `font-size: 12px`

## ⑤ 響應式版型 (Responsive Layout)

採用 Mobile-First 設計。

#### 手機版 (Mobile - < 768px)
- 垂直佈局。
- 元件寬度多為 `80% ~ 90%`，置中對齊。
- 主視覺佔據螢幕上半部。
- 小語卡片在主視覺下方。
- 按鈕在最下方，固定或隨頁面滾動。

#### 桌機版 (Desktop - >= 768px)
- 水平與垂直置中的佈局。
- 主視覺可在左側或上方，佔據更大空間。
- 小語卡片與按鈕排列在視覺右側或下方。
- 整體內容區塊最大寬度約 `1000px`，避免在大螢幕上過度拉伸。
