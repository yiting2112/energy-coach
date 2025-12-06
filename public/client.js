// public/client.js
document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('cta-button');
  const quoteDisplay = document.getElementById('quote-display');
  const infoBar = document.getElementById('info-bar');

  const getQuote = async () => {
    // --- UI Update: Loading state ---
    ctaButton.disabled = true;
    ctaButton.textContent = '讀取中...';
    const quoteParagraph = quoteDisplay.querySelector('p');
    if (quoteParagraph) {
      quoteParagraph.style.opacity = 0;
    }

    try {
      const response = await fetch('/api/energy-quote');
      if (!response.ok) {
        throw new Error('無法取得小語');
      }
      const data = await response.json();

      // --- UI Update: Success state ---
      // Update quote
      setTimeout(() => { // Short delay for fade-out/fade-in effect
        quoteDisplay.innerHTML = `<p>${data.quote}</p>`;
        const newQuoteParagraph = quoteDisplay.querySelector('p');
        if (newQuoteParagraph) {
            newQuoteParagraph.style.opacity = 1;
        }
      }, 300);

      // Update info bar
      infoBar.innerHTML = `
        <span class="info-chip">時間: ${data.time}</span>
        <span class="info-chip">天氣: ${data.weather}</span>
      `;

    } catch (error) {
      // --- UI Update: Error state ---
      quoteDisplay.innerHTML = `<p style="color: red;">${error.message}</p>`;
    } finally {
      // --- UI Update: Reset button ---
      setTimeout(() => {
        ctaButton.disabled = false;
        ctaButton.textContent = '索取小語';
      }, 500);
    }
  };

  // Add click event listener to the button
  ctaButton.addEventListener('click', getQuote);

  // Fetch initial quote on page load
  getQuote();
});
