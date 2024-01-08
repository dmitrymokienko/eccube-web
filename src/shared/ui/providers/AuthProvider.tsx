import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { currentUser } from "../../../entities/currentUser/model";
import { checkLoggedInUserApi } from "../../../entities/auth/api";
import { useUnit } from "effector-react";
import { Nullable } from "../../types";
import { IUser } from "../../../entities/currentUser/types";

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

    const checkLoginState = useCallback(async () => {
        try {
            const { user } = await checkLoggedInUserApi();
            setLoggedIn(true);
            if (user) {
                currentUser.setInfo(user);
            }
        } catch (err) {
            console.error(err);
            setLoggedIn(false);
            currentUser.setInfo(null);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return <AuthContext.Provider value={{ loggedIn, checkLoginState, userInfo }}>{children}</AuthContext.Provider>;
}
