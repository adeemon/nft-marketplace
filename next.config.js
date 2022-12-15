/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'loremflickr.com',
            port: '',
            pathname: '640/480',
        }, ],
    },
}

module.exports = nextConfig