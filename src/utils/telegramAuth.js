const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const isTelegramMiniApp = () => {
  return Boolean(window.Telegram?.WebApp);
};

export const loginWithTelegram = async () => {
  if (!window.Telegram?.WebApp) {
    throw new Error("Telegram Mini App is not available");
  }

  const tg = window.Telegram.WebApp;

  // Tell Telegram that the Mini App is ready.
  tg.ready();

  // Expand the Mini App UI.
  tg.expand();

  const initData = tg.initData;

  if (!initData) {
    throw new Error(
      "Telegram authentication data is unavailable"
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/auth/telegram`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        initData,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success || !data.token) {
    throw new Error(
      data.message || "Telegram login failed"
    );
  }

  localStorage.setItem("token", data.token);

  return data;
};