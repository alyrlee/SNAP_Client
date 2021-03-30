export default {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    // API_ENDPOINT: process.env.API_ENDPOINT || 'https://murmuring-shore-59851.herokuapp.com/api',
    API_ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8000/api',
    TOKEN_KEY: process.env.TOKEN_KEY || 'snap-client-auth-login'
}