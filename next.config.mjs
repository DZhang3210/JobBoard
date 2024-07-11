/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'david-job-board.s3.amazonaws.com',
    //       },
    //     ],
    //   },
      images: {
        domains: ['david-job-board.s3.amazonaws.com'],
      },
};

export default nextConfig;
