import useHttp from "@/hooks/use-http";
import {ISessionProfile} from "@/hooks/use-session";

export const useProfileApi = () => {
    const {http} = useHttp()
    const BASE_URL = '/auth'

    const getProfile = (): AsyncResponseContainer<ISessionProfile> => {
        return http.get(`${BASE_URL}/user`)
    }

    return {
        getProfile
    }
}