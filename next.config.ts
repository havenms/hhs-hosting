import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		// This ignores TypeScript errors during the build process
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
