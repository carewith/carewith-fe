import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default withPWA({
  ...nextConfig,
  dest: "build",
});
