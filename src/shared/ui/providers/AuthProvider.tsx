import { ReactNode, createContext, useCallback, useEffect, useRef, useState } from 'react'
import { currentUser } from '../../../entities/currentUser/model'
import { useUnit } from 'effector-react'
import { Nullable } from '../../types/utilities'
import { ILoginUserResponse, IUser } from '../../../entities/currentUser/types'
import { useInterval } from '../../hooks/useInterval'
import { auth } from '../../../entities/auth/model'

export interface IBackendTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

const defaultAuthContext: {
  userInfo: Nullable<Partial<IUser>>
  loggedIn: Nullable<boolean>
  checkLoginState: () => Promise<Nullable<IUser>>
  setLoggedIn: (loggedIn: boolean) => void
  login: (pair: { email: string; password: string }) => Promise<ILoginUserResponse>
} = {
  userInfo: null,
  loggedIn: null,
  checkLoginState: () => Promise.resolve(null),
  setLoggedIn: () => {},
  login: () =>
    Promise.resolve({ user: null, backendTokens: null } as unknown as ILoginUserResponse),
}

const INTERVAL = 60 * 1000 // 1 minute

export const AuthContext = createContext(defaultAuthContext)

export interface IAuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const userInfo = useUnit(currentUser.$info)
  const expiresIn = useUnit(auth.$tokenExpiresIn)

  const [loggedIn, setLoggedIn] = useState<Nullable<boolean>>(null)

  const called = useRef(false)

  const login = useCallback(async (pair: { email: string; password: string }) => {
    try {
      const res = await auth.loginFx(pair)
      setLoggedIn(true)
      currentUser.setInfo(res.user)
      return res
    } catch (err) {
      console.error(err)
      setLoggedIn(false)
      currentUser.setInfo(null)
      auth.reset()
      return { user: null, backendTokens: null } as unknown as ILoginUserResponse
    }
  }, [])

  const checkLoginState = useCallback(async () => {
    try {
      const { user, backendTokens } = await auth.refreshUserAndTokensFx()
      setLoggedIn(true)
      if (user && backendTokens) {
        currentUser.setInfo(user)
        return user
      }
      return null
    } catch (err) {
      console.error(err)
      setLoggedIn(false)
      currentUser.setInfo(null)
      auth.reset()
      return null
    }
  }, [])

  const refresh = async () => {
    if (!expiresIn) {
      throw new Error('No tokens')
    }
    if (new Date().getTime() > expiresIn * 1000) {
      await checkLoginState()
    }
  }

  useEffect(() => {
    if (called.current) return // prevent rerender caused by StrictMode
    called.current = true
    checkLoginState()
  }, [])

  // check access-token's expiration every minute
  useInterval(() => {
    if (!loggedIn) return
    refresh()
  }, INTERVAL)

  return (
    <AuthContext.Provider value={{ login, loggedIn, setLoggedIn, checkLoginState, userInfo }}>
      {children}
    </AuthContext.Provider>
  )
}
