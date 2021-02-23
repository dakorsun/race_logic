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

export interface AppConfig {
  readonly NODE_ENV: string;
  readonly HOST: string;
  readonly PORT: string | number;
  readonly APOLLO_PORT: string | number;
  readonly POSTGRESQL: PostgressSqlConfig;
  readonly JWT_SECRET: string;
  readonly JWT_EXPIRATION_TIME: string;
  readonly EMAIL: SmtpEmailConfig
}
