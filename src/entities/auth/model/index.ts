import { combine, createEffect, createEvent, createStore } from 'effector'
import { activateUserApi, loginUserApi, refreshUserAndTokensApi, registerUserApi } from '../api'
// import persist from 'effector-localstorage'
import { Nullable } from '../../../shared/types/utilities'

const registerFx = createEffect(registerUserApi)
const loginFx = createEffect(loginUserApi)
const refreshUserAndTokensFx = createEffect(refreshUserAndTokensApi)

// TODO: delete this
const activateFx = createEffect(activateUserApi)

// access token
const setAccessToken = createEvent<Nullable<string>>()
const $accessToken = createStore<Nullable<string>>(null)
$accessToken.on(setAccessToken, (_, payload) => payload)

// refresh token
const setRefreshToken = createEvent<Nullable<string>>()
const $refreshToken = createStore<Nullable<string>>(null)
$refreshToken.on(setRefreshToken, (_, payload) => payload)
// persist({ key: 'refresh', store: $refreshToken })

// expires in
const setExpiresIn = createEvent<Nullable<number>>()
const $tokenExpiresIn = createStore<Nullable<number>>(null)
$tokenExpiresIn.on(setExpiresIn, (_, payload) => payload)
// persist({ key: 'expires', store: $tokenExpiresIn })

const $isLoading = combine(
  registerFx.pending,
  loginFx.pending,
  activateFx.pending,
  refreshUserAndTokensFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

export const auth = {
  $isLoading,
  registerFx,
  loginFx,
  activateFx,
  refreshUserAndTokensFx,
  // access token
  setAccessToken,
  $accessToken,
  // refresh token
  setRefreshToken,
  $refreshToken,
  // expires in
  setExpiresIn,
  $tokenExpiresIn,
}
