export interface OAuthUser {
  data?: any;
  localUser: string;
  tokens: {
    accessToken: string
    refreshToken: string
    expiresAt: Date
  }
  provider: string;
}