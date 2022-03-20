export const config = {
  bcryptSaltOrRound: process.env.BCRYPT_SALT_OR_ROUND || 10,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  accessTokenLifetimeInMinutes: Number(process.env.ACCESS_TOKEN_LIFETIME_IN_MINUTES),
  refreshTokenLifetimeInDays: Number(process.env.REFRESH_TOKEN_LIFETIME_IN_DAYS),
  isProduction: process.env.NODE_ENV === 'production',
  baseDomain: process.env.BASE_DOMAIN!,
  clientUrl: process.env.CLIENT_URL!,
};
