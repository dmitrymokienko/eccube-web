import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { currentUser } from "../../../entities/currentUser/model";
import { checkLoggedInUserApi, refreshTokenApi } from "../../../entities/auth/api";
import { useUnit } from "effector-react";
import { Nullable } from "../../types";
import { IUser } from "../../../entities/currentUser/types";
import { createEvent, createStore } from "effector";
import persist from "effector-localstorage";
import { jwtDecode } from "jwt-decode";
import { useInterval } from "../../hooks/useInterval";

export interface IBackendTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

const defaultAuthContext: {
    userInfo: Nullable<Partial<IUser>>;
    loggedIn: Nullable<boolean>;
    checkLoginState: () => void;
} = {
    userInfo: null,
    loggedIn: null,
    checkLoginState: () => {
        // noop
    },
};

const INTERVAL = 60 * 1000; // 1 minute

// EFFECTOR
// TODO on the backend: generate new refresh-token via `checkLoggedInUserApi()` request
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

export const AuthContext = createContext(defaultAuthContext);

export interface IAuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const userInfo = useUnit(currentUser.$info);
    const refreshToken = useUnit($refreshToken);
    const expiresIn = useUnit($tokenExpiresIn);

    const [loggedIn, setLoggedIn] = useState<Nullable<boolean>>(null);

    const checkLoginState = useCallback(async () => {
        try {
            const { user, backendTokens } = await checkLoggedInUserApi();
            setLoggedIn(true);
            if (user && backendTokens) {
                currentUser.setInfo(user);
                setRefreshToken(backendTokens.refreshToken);
                const { exp } = jwtDecode(backendTokens.accessToken);
                if (exp) setExpiresIn(exp);
            }
        } catch (err) {
            console.error(err);
            setLoggedIn(false);
            currentUser.setInfo(null);
            setRefreshToken(null);
            setExpiresIn(null);
        }
    }, []);

    const refresh = async () => {
        try {
            if (!expiresIn || !refreshToken) {
                throw new Error("No tokens");
            }
            if (new Date().getTime() < expiresIn * 1000) {
                return;
            }
            const res = await refreshTokenApi(refreshToken);
            setRefreshToken(res.refreshToken);
            const { exp } = jwtDecode(res.accessToken);
            if (exp) setExpiresIn(exp);
        } catch (err) {
            console.error(err);
            setLoggedIn(false);
            currentUser.setInfo(null);
            setRefreshToken(null);
            setExpiresIn(null);
        }
    };

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    // check access-token's expiration every minute
    useInterval(() => {
        if (!loggedIn) return;
        refresh();
    }, INTERVAL);

    return <AuthContext.Provider value={{ loggedIn, checkLoginState, userInfo }}>{children}</AuthContext.Provider>;
}
