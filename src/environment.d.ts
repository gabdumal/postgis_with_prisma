export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DATABASE_URL_WITH_SCHEMA: string;
    }
  }
}
