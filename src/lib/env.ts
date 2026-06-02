export class EnvError extends Error {
  readonly name = "EnvError";

  constructor(message: string) {
    super(message);
  }
}

export type ServerEnv = {
  metalsApiKey: string;
  metalsApiBaseUrl: string;
  fxApiUrl: string;
};

const requireEnv = (key: string): string => {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new EnvError(`${key} is required`);
  }
  return value;
};

/** Read and validate server-side environment variables */
export const getServerEnv = (): ServerEnv => ({
  metalsApiKey: requireEnv("METALS_API_KEY"),
  metalsApiBaseUrl: requireEnv("METALS_API_BASE_URL"),
  fxApiUrl: requireEnv("FX_API_URL"),
});
