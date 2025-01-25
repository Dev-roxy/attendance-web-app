/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true, // Enable WebAssembly
      };
      return config;
    },
  };
  
  export default nextConfig;
  