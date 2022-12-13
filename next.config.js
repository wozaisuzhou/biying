/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    allCategoriesApiUrl: 'http://47.74.37.101:3001/categoriesAll',
    allCitiesApiUrl: 'http://47.74.37.101:3001/citiesAll',
    allProvincesApiUrl: 'http://47.74.37.101:3001/provincesAll',
    insertOrderApiUrl: 'http://47.74.37.101:3001/insertOrder',
    getOrderDetailsApiUrl: 'http://47.74.37.101:3001/orderByOrderId?orderId=',
    insertServiceProviderUrl: 'http://47.74.37.101:3001/insertProvider',
    TWILIO_ACCOUNT_SID:"AC3e19c2e32c6c3586798e7a42d473d37b",
    TWILIO_AUTH_TOKEN:"ecec5c6dc4a3f9b1f5fce99e02aee9f2",
  }
}

module.exports = nextConfig
