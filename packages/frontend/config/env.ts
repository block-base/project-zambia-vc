const getEnv = () => {
  if (!process.env.NEXT_PUBLIC_BACKEND_URI_BASE) {
    throw new Error("backend uri base invalid");
  }
  return {
    backendUriBase: process.env.NEXT_PUBLIC_BACKEND_URI_BASE,
  };
};
export const env = getEnv();
