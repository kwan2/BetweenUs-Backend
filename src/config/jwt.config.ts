import 'dotenv/config';

export default () => ({
  jwt: {
    accessTokenSecret : process.env.JWT_ACCESS_TOKEN_SECRET,
    tokenSecret : process.env.JWT_SECRET,
    refreshToken : process.env.JWT_REFRESH_TOKEN_SECRET,
    accessExpiration_time : process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refreshExpiration_time : process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    normalExpiration_time : process.env.JWT_EXPIRATION_TIME,
  },
});
