import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { currentUser } from '../../../entities/currentUser/model'
import { checkLoggedInUserApi, refreshTokenApi } from '../../../entities/auth/api'
import { useUnit } from 'effector-react'
import { Nullable } from '../../types/utilities'
import { IUser } from '../../../entities/currentUser/types'
import { jwtDecode } from 'jwt-decode'
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
} = {
  userInfo: null,
  loggedIn: null,
  checkLoginState: () => Promise.resolve(null),
}

const INTERVAL = 60 * 1000 // 1 minute

export const AuthContext = createContext(defaultAuthContext)

export interface IAuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const userInfo = useUnit(currentUser.$info)
  const refreshToken = useUnit(auth.$refreshToken)
  const expiresIn = useUnit(auth.$tokenExpiresIn)

  const [loggedIn, setLoggedIn] = useState<Nullable<boolean>>(null)

  const checkLoginState = useCallback(async () => {
    try {
      const { user, backendTokens } = await checkLoggedInUserApi()
      setLoggedIn(true)
      if (user && backendTokens) {
        currentUser.setInfo(user)
        auth.setRefreshToken(backendTokens.refreshToken)
        const { exp } = jwtDecode(backendTokens.accessToken)
        if (exp) {
          auth.setExpiresIn(exp)
        }
        return user
      }
      return null
    } catch (err) {
      console.error(err)
      setLoggedIn(false)
      currentUser.setInfo(null)
      auth.setRefreshToken(null)
      auth.setExpiresIn(null)
      return null
    }
  }, [])

  const refresh = async () => {
    try {
      if (!expiresIn || !refreshToken) {
        throw new Error('No tokens')
      }
      if (new Date().getTime() > expiresIn * 1000) {
        const res = await refreshTokenApi(refreshToken)
        auth.setRefreshToken(res.refreshToken)
        const { exp } = jwtDecode(res.accessToken)
        if (exp) {
          auth.setExpiresIn(exp)
        }
      }
    } catch (err) {
      console.error(err)
      setLoggedIn(false)
      currentUser.setInfo(null)
      auth.setRefreshToken(null)
      auth.setExpiresIn(null)
    }
  }

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  // check access-token's expiration every minute
  useInterval(() => {
    if (!loggedIn) return
    refresh()
  }, INTERVAL)

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, userInfo }}>
      {children}
    </AuthContext.Provider>
  )
}
