export enum TOKEN_TYPES {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface TokenPayload {
  /**
   * ID of the user.
   */
  sub: number;

  /**
   * The time at which the JWT was issued.
   */
  iat: number;

  /**
   * The time at which the JWT will expire.
   */
  expires: number;

  /**
   * Type of the token.
   */
  type: TOKEN_TYPES;
}
