/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.https = false;
    }

    return config;
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  env: {
    baseApiUrl:'https://localhost:3001',
    allCategoriesApiUrl: 'https://localhost:3001/categoriesAll',
    allCitiesApiUrl: 'https://localhost:3001/citiesAll',
    allProvincesApiUrl: 'https://localhost:3001/provincesAll',
    insertOrderApiUrl: 'https://localhost:3001/insertOrder',
    getOrderDetailsApiUrl: 'https://localhost:3001/orderByOrderId?orderId=',
    insertServiceProviderUrl: 'https://localhost:3001/insertProvider',
    getAllOrdersUrl:'https://localhost:3001/ordersFilter',
    getAllProvidersUrl:'https://localhost:3001/providersFilter',
    getAllEducationUrl:'https://localhost:3001/educationsAll',
    TWILIO_ACCOUNT_SID:"AC3e19c2e32c6c3586798e7a42d473d37b",
    TWILIO_AUTH_TOKEN:"ecec5c6dc4a3f9b1f5fce99e02aee9f2",
  },
}


module.exports = nextConfig
