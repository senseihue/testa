import {useProfileApi} from "@features/profile/profile.api";
import {useSession} from "@/hooks/use-session";


export const useProfileService = () => {
    const profileApi = useProfileApi()
    const session = useSession()

    const getProfile = () => {
        return profileApi.getProfile().then(({content}) => {
            session.setProfile(content)
            return Promise.resolve(content)
        })
    }

    return {
        getProfile
    }
}
