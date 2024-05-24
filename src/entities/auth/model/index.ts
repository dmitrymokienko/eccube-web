import { combine, createEffect, createEvent, createStore } from 'effector'
import { activateUserApi, loginUserApi, refreshUserAndTokensApi, registerUserApi } from '../api'
import { Nullable } from '../../../shared/types/utilities'

const reset = createEvent()

const registerFx = createEffect(registerUserApi)
const loginFx = createEffect(loginUserApi)
const refreshUserAndTokensFx = createEffect(refreshUserAndTokensApi)

// TODO: delete this
const activateFx = createEffect(activateUserApi)

// access token
const setAccessToken = createEvent<Nullable<string>>()
const $accessToken = createStore<Nullable<string>>(null)
$accessToken
  .on(setAccessToken, (_, v) => v)
  .on(loginFx.doneData, (_, v) => v.backendTokens.accessToken)
  .on(refreshUserAndTokensFx.doneData, (_, v) => v.backendTokens.accessToken)
  .reset(reset)

// refresh token
const setRefreshToken = createEvent<Nullable<string>>()
const $refreshToken = createStore<Nullable<string>>(null)
$refreshToken
  .on(setRefreshToken, (_, v) => v)
  .on(loginFx.doneData, (_, v) => v.backendTokens.refreshToken)
  .on(refreshUserAndTokensFx.doneData, (_, v) => v.backendTokens.refreshToken)
  .reset(reset)

// expires in
const setExpiresIn = createEvent<Nullable<number>>()
const $tokenExpiresIn = createStore<Nullable<number>>(null)
$tokenExpiresIn
  .on(setExpiresIn, (_, payload) => payload)
  .on(loginFx.doneData, (_, v) => v.backendTokens.expiresIn)
  .on(refreshUserAndTokensFx.doneData, (_, v) => v.backendTokens.expiresIn)
  .reset(reset)

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
  reset,
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
