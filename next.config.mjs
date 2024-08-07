import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLOUD_VISION_API_KEY: process.env.GOOGLE_CLOUD_VISION_API_KEY,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
};

const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
};

export default withPWA(pwaConfig)(nextConfig);
