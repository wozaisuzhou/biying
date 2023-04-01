/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env: {
    allCategoriesApiUrl: 'http://localhost:3001/categoriesAll',
    allCitiesApiUrl: 'http://localhost:3001/citiesAll',
    allProvincesApiUrl: 'http://localhost:3001/provincesAll',
    insertOrderApiUrl: 'http://localhost:3001/insertOrder',
    getOrderDetailsApiUrl: 'http://localhost:3001/orderByOrderId?orderId=',
    insertServiceProviderUrl: 'http://localhost:3001/insertProvider',
    TWILIO_ACCOUNT_SID:"AC3e19c2e32c6c3586798e7a42d473d37b",
    TWILIO_AUTH_TOKEN:"ecec5c6dc4a3f9b1f5fce99e02aee9f2",
  },
   httpOptions : {
    // when using this code in production, for high throughput you should not read
    //   from the filesystem for every call, it can be quite expensive. Instead
    //   consider storing these in memory
    cert: fs.readFileSync(
      path.resolve(__dirname, '~/server/ssl/cert.pem'),
      `utf-8`,
    ),
    key: fs.readFileSync(
      path.resolve(__dirname, '~/server/ssl/key.pem'),
      'utf-8',
    ),
    // passphrase:
    //   '',
    // in test, if you're working with self-signed certificates
    rejectUnauthorized: false,


  }

}

module.exports = nextConfig
