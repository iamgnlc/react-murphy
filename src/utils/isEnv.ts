export const isEnv = (env: string | undefined): boolean =>
  [env].includes(import.meta.env.MODE);
