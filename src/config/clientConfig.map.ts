export interface ApolloConfig {
  HOST: string
  PORT: string
  QUERY: {
    POLL_INTERVAL: number
  }
}

export interface ClientConfig {
  readonly APOLLO: ApolloConfig
}
