
import {useAuthApi} from "@features/auth/auth.api";
import {redirect, useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useToast} from "@/hooks/use-toast";
import {useSession} from "@/hooks/use-session";
import { useCookies} from "@/hooks/use-cookie";
import {ACCESS_TOKEN} from "@shared/const";

export const useAuthService = () => {
    const route = useSearchParams();
    const toast = useToast()
    const $session = useSession()
    const {get, set} = useCookies()

    const authApi = useAut¡hApi()

    const signIn = () => {

        try {
            const code = <string>route.get('code')
            const state = <string>route.get('state')

            // if (!code) return redirect('/')

            $session.setLoading(true)

            authApi
                .signInNative({
                    pin: '20000000000000',
                    password: '20000000000000'
                })
                .then(async ({ content }) => {
                    if (!content) {
                        // modal.show("auth-error-modal")

                        return redirect('/')
                    }
                    set(ACCESS_TOKEN, content.token)
                    $session.setProfile(content.profile)

                    if (state) {
                        try {
                            const url = new URL(state)
                            url.searchParams.append("token", content.token)
                            location.replace(url)
                        } catch (error) {
                            console.error("Invalid URL in state parameter:", error)
                            redirect('/')
                        }
                    } else {
                        redirect('/')
                    }
                })
                .catch((error) => {
                    console.log('error' , error)
                })
                .finally(() => ($session.setLoading(false)))
        } catch (e) {
            console.log(e)
        }
    }

    const getRedirectUrl = () => {
        authApi.getRedirectUrl().then((res) => {

        })
    }

    return {
        signIn
    }
}