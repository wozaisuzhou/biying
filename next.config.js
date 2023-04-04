/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env: {
    allCategoriesApiUrl: 'https://localhost:3001/categoriesAll',
    allCitiesApiUrl: 'https://localhost:3001/citiesAll',
    allProvincesApiUrl: 'https://localhost:3001/provincesAll',
    insertOrderApiUrl: 'https://localhost:3001/insertOrder',
    getOrderDetailsApiUrl: 'https://localhost:3001/orderByOrderId?orderId=',
    insertServiceProviderUrl: '/insertProvider',
    TWILIO_ACCOUNT_SID:"AC3e19c2e32c6c3586798e7a42d473d37b",
    TWILIO_AUTH_TOKEN:"ecec5c6dc4a3f9b1f5fce99e02aee9f2",
  },
}

module.exports = nextConfig
