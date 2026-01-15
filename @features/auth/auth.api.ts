import useHttp from "@app/plugins/http";
import {NativeSignIn} from "@entities/auth";

export const useAuthApi = () => {
    const http = useHttp()
    const BASE_URL = '/auth'

    const getRedirectUrl = (origin?: string, state?: string): AsyncResponseContainer<string> => {
        return http.$get(`${BASE_URL}/one-id/redirect`, { params: { origin, state } })
    }

    const signInNative = (data: NativeSignIn): AsyncResponseContainer<ISignInResponse> => {
        return http.$post(`${BASE_URL}/login`, data)
    }

    const signIn = (code: string): AsyncResponseContainer<ISignInResponse> => {
        return http.$post(`${BASE_URL}/one-id/callback`, { params: { code } })
    }

    return {
        signIn,
        signInNative,
        getRedirectUrl
    }
}