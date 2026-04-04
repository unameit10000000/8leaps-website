let userConfig = undefined;
// try {
//   // try to import ESM first
//   userConfig = await import("./user-next.config.mjs");
// } catch (e) {
//   try {
//     // fallback to CJS import
//     userConfig = await import("./user-next.config");
//   } catch (innerError) {
//     // ignore error
//   }
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
      { source: "/cases", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/guide", destination: "/", permanent: false },
      { source: "/mvp", destination: "/", permanent: false },
      { source: "/pricing", destination: "/", permanent: false },
      { source: "/resources", destination: "/", permanent: false },
      { source: "/resources/:id", destination: "/", permanent: false },
      { source: "/resources/:id/src", destination: "/", permanent: false },
      { source: "/solutions", destination: "/", permanent: false },
      { source: "/spa", destination: "/", permanent: false },
    ];
  },
};

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig;

  for (const key in config) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

export default nextConfig;
