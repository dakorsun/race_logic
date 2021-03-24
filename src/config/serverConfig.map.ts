interface PostgressSqlConfig {
  readonly URL: string;
  readonly USER: string;
  readonly PORT: number;
  readonly PASSWORD: string;
  readonly DB: string;
  readonly DIALECT: 'postgres';
}

interface SmtpEmailConfig {
  readonly HOST: string,
  readonly PORT: string,
  readonly USER: string,
  readonly PASSWORD: string,
  readonly FROM_EMAIL: string,
  readonly FROM_NAME: string,
  readonly API_KEY: string,
  readonly MESSAGE_FROM: string,
}

interface JWTConfig {
  readonly EXPIRES_IN: string,
  readonly SECRET: string,
}

export interface ServerConfig {
  readonly NODE_ENV: string;
  readonly HOST: string;
  readonly PORT: string | number;
  readonly APOLLO: {
    PORT: string| number
  };
  readonly APP_SECRET_KEY: string;
  readonly POSTGRESQL: PostgressSqlConfig;
  readonly EMAIL: SmtpEmailConfig
  readonly JWT: JWTConfig
}
