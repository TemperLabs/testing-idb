/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Здесь ты можешь добавить все переменные окружения, которые ты используешь
    VITE_APP_BASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  