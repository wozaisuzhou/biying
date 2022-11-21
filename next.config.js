/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    allCategoriesApiUrl: 'http://47.74.37.101:3001/categoriesAll',
    allCitiesApiUrl: 'http://47.74.37.101:3001/citiesAll',
    allProvincesApiUrl: 'http://47.74.37.101:3001/provincesAll',
    insertOrderApiUrl: 'http://47.74.37.101:3001/insertOrder',
    getOrderDetailsApiUrl: 'http://47.74.37.101:3001/orderByOrderId?orderId='
  }
}

module.exports = nextConfig
