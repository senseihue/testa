import useHttp from "@/hooks/use-http";

export const useProfileApi = () => {
    const {http} = useHttp()
    const BASE_URL = '/auth'

    const getProfile = () => {
        return http.get(`${BASE_URL}/profile`)
    }

    return {
        getProfile
    }
}