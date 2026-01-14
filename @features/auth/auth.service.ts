import {useAuthApi} from "@features/auth/auth.api";


export const useAuthService = () => {
    const authApi = useAuthApi()

    const signIn = () => {
        return authApi.signIn()

    }

    return {
        signIn
    }
}