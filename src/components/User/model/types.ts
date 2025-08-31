export type UserState = {
  isAuth: boolean
  email: string | null // I don't even need this value in state. I never show it. But just in case :)

  formError: {
    email: string | null,
    password: string | null
  }
}
