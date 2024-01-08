import { combine, createEffect } from "effector";
import { activateUserApi, loginUserApi, registerUserApi } from "../api";

const registerFx = createEffect(registerUserApi);
const loginFx = createEffect(loginUserApi);
// TODO: delete this
const activateFx = createEffect(activateUserApi);

const $isLoading = combine(registerFx.pending, loginFx.pending, (register, login) => register || login);

export const auth = {
    registerFx,
    loginFx,
    activateFx,
    $isLoading,
};
