import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { currentUser } from "../../../entities/currentUser/model";
import { checkLoggedInUserApi, refreshTokenApi } from "../../../entities/auth/api";
import { useUnit } from "effector-react";
import { Nullable } from "../../types";
import { IUser } from "../../../entities/currentUser/types";

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

export const AuthContext = createContext(defaultAuthContext);

export interface IAuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const userInfo = useUnit(currentUser.$info);

    const [loggedIn, setLoggedIn] = useState<Nullable<boolean>>(null);
    const [tokens, setTokens] = useState<Nullable<IBackendTokens>>(null);

    const checkLoginState = useCallback(async () => {
        try {
            const { user, backendTokens } = await checkLoggedInUserApi();
            setLoggedIn(true);
            if (user && backendTokens) {
                currentUser.setInfo(user);
                setTokens(backendTokens);
            }
        } catch (err) {
            console.error(err);
            setLoggedIn(false);
            currentUser.setInfo(null);
            setTokens(null);
        }
    }, []);

    const refresh = async () => {
        try {
            const { expiresIn, refreshToken } = tokens || {};
            if (!expiresIn || !refreshToken) {
                throw new Error("No tokens");
            }
            if (new Date().getTime() < expiresIn) {
                return;
            }
            const res = await refreshTokenApi(refreshToken);
            setTokens(res);
        } catch (err) {
            console.error(err);
            setLoggedIn(false);
            currentUser.setInfo(null);
            setTokens(null);
        }
    };

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    // check it every minute
    useEffect(() => {
        const interval = setInterval(refresh, 60 * 1000);
        return () => clearInterval(interval);
    });

    return <AuthContext.Provider value={{ loggedIn, checkLoginState, userInfo }}>{children}</AuthContext.Provider>;
}
