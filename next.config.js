/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                // This is the asset module.
                type: 'asset/source',
            }
        );
      return config;

    }
}

module.exports = nextConfig
