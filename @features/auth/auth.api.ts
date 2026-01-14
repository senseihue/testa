import useHttp from "@app/plugins/http";

export const useAuthApi = () => {
    const http = useHttp()
    const BASE_URL = '/auth'

    const getRedirectUrl = () => {}

    const signIn = () => {
        return http.get(`${BASE_URL}/signin`)
    }

    return {
        signIn
    }
}