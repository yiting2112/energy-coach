// app/lib/quoteLogic.ts

// --- 型別定義 ---
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
type WeatherCondition = 'clear' | 'rainy' | 'humid';
type WorkCycle = 'monday' | 'wednesday' | 'friday' | 'other';

// --- 規則資料 ---
const reasons = {
  clear: "天氣晴朗，陽光正好",
  rainy: "窗外下著雨，節奏似乎也慢了下來",
  humid: "空氣有點悶熱，體力消耗可能會比較快",
  default: "無論天氣如何",
};

const states = {
  morning: "需要一點時間來暖機、啟動",
  afternoon: "專注力可能有些下滑",
  evening: "是時候開始收斂與整理思緒",
  night: "身心都需要好好放鬆",
  monday: "剛從週末切換過來，心情可能還有些慵懶",
  wednesday: "到了週三，容易感到一點疲乏",
  friday: "終於是週五了，心情雖然鬆散但仍需要好好收尾",
  default: "感到一絲平靜",
};

const suggestions = {
  morning: "先從一杯溫水或簡單的伸展開始，為新的一天注入活力",
  afternoon: "不妨起身走動一下，或者看看遠方，讓眼睛和思緒都休息片刻",
  evening: "列出今天完成的事項，給自己一點肯定，並規劃明天最重要的一件事",
  night: "放下工作與手機，讀幾頁書或聽點輕柔的音樂，準備進入夢鄉",
  monday: "先處理一些簡單的任務，讓自己平緩地進入工作狀態",
  wednesday: "給自己一個小小的獎勵，比如一杯喜歡的飲料，幫自己充充電",
  friday: "專心完成最後的任務，然後就可以期待一個美好的週末了",
  default: "深呼吸幾次，感受當下的片刻",
};

// --- 核心邏輯函式 ---

/**
 * 根據當前小時判斷時間區段
 */
function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

/**
 * 根據星期幾判斷工作週期
 */
function getWorkCycle(): WorkCycle {
  const day = new Date().getDay();
  if (day === 1) return 'monday';
  if (day === 3) return 'wednesday';
  if (day === 5) return 'friday';
  return 'other';
}

/**
 * 模擬天氣狀況
 * 在真實應用中，這裡會呼叫天氣 API
 * @param city - The city for which to get the weather.
 */
function getMockWeather(city: string): { condition: WeatherCondition; description: string } {
  // 為了演示，我們用 city 的長度來做一個簡單的偽隨機
  const cityFactor = city.length % 3;
  if (cityFactor === 0) {
    return { condition: 'clear', description: '晴天 28°C' };
  } else if (cityFactor === 1) {
    return { condition: 'rainy', description: '雨天 22°C' };
  } else {
    return { condition: 'humid', description: '悶熱 32°C' };
  }
}

/**
 * 生成能量小語
 * @param city - The user's city.
 */
export function generateEnergyQuote(city: string = 'taipei'): { quote: string; time: string; weather: string } {
  const timeOfDay = getTimeOfDay();
  const workCycle = getWorkCycle();
  const weather = getMockWeather(city);

  let reason = reasons[weather.condition] || reasons.default;
  let state = states.default;
  let suggestion = suggestions.default;

  // 規則優先級：工作週期 > 時間 > 天氣
  // 這樣可以讓小語更有針對性
  if (workCycle !== 'other' && states[workCycle] && suggestions[workCycle]) {
    // 如果是特殊的週一/三/五，優先使用工作週期的狀態和建議
    state = states[workCycle];
    suggestion = suggestions[workCycle];
  } else if (states[timeOfDay] && suggestions[timeOfDay]) {
    // 否則，使用時間區段的狀態和建議
    state = states[timeOfDay];
    suggestion = suggestions[timeOfDay];
  }

  const quote = `因為${reason}，你可能會覺得${state}。現在更適合${suggestion}。`;

  const timeString = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

  return {
    quote,
    time: timeString,
    weather: weather.description,
  };
}
