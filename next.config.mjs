import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Custom Webpack configuration

    // Example: Add a custom alias
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    // Example: Modify existing rules
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Example: Add a custom loader
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // Ensure optimization settings are modified instead of replaced
    if (config.optimization && config.optimization.splitChunks) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }

    // Modify output settings
    if (!isServer) {
      config.output.publicPath = '/_next/';
    }

    return config;
  },
};

export default nextConfig;
