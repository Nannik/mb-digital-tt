export type User = {
  email: `${string}@${string}`
}

export type UserState = {
  user: User | null
}
