import { combine, createEffect, createEvent, createStore } from "effector";
import { activateUserApi, loginUserApi, registerUserApi } from "../api";
import persist from "effector-localstorage";
import { Nullable } from "../../../shared/types";

const registerFx = createEffect(registerUserApi);
const loginFx = createEffect(loginUserApi);
// TODO: delete this
const activateFx = createEffect(activateUserApi);

// EFFECTOR
// TODO on the backend: generate new refresh-token via `checkLoggedInUserApi()` request
// storing refresh-token in localStorage is possible, but better
// to avoid store sensitive data in localStorage
// think about this solution or find better one

// refresh token
const setRefreshToken = createEvent<Nullable<string>>();
const $refreshToken = createStore<Nullable<string>>(null);
$refreshToken.on(setRefreshToken, (_, payload) => payload);
persist({ key: "refresh", store: $refreshToken });
// expires in
const setExpiresIn = createEvent<Nullable<number>>();
const $tokenExpiresIn = createStore<Nullable<number>>(null);
$tokenExpiresIn.on(setExpiresIn, (_, payload) => payload);
persist({ key: "expires", store: $tokenExpiresIn });

const $isLoading = combine(registerFx.pending, loginFx.pending, (register, login) => register || login);

export const auth = {
    registerFx,
    loginFx,
    activateFx,
    $isLoading,
    // refresh token
    setRefreshToken,
    $refreshToken,
    // expires in
    setExpiresIn,
    $tokenExpiresIn,
};
