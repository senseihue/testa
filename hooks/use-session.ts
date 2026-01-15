import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


// Atoms
export const sessionTokenAtom = atomWithStorage<string>("token", "")
export const sessionLoadedAtom = atom<boolean>(false)
export const sessionLoadingAtom = atom<boolean>(false)
export const sessionProfileAtom = atom<ISessionProfile | undefined>(undefined)

// Derived Atoms
export const sessionLoggedInAtom = atom((get) => {
    const token = get(sessionTokenAtom)
    const profile = get(sessionProfileAtom)
    return !!(token && profile?.id)
})

// Hook
export const useSession = () => {
    const router = useRouter()

    const [token, setToken] = useAtom(sessionTokenAtom)
    const [loaded, setLoaded] = useAtom(sessionLoadedAtom)
    const [loading, setLoading] = useAtom(sessionLoadingAtom)
    const [profile, setProfile] = useAtom(sessionProfileAtom)
    const loggedIn = useAtomValue(sessionLoggedInAtom)

    // Watch for logout state
    useEffect(() => {
        // If not logged in but we have some partial state, clear it to ensure consistency
        // This replicates the Nuxt watch(loggedIn) logic: if (!value) { clear }
        // However, since loggedIn depends on token/profile, we need to be careful not to create loops.
        // The original logic was: whenever loggedIn becomes false, clear token and profile.
        // Here, if loggedIn is false, it means one of them is missing.
        // If we want to strictly enforce "if loggedIn becomes false", we can't easily detect the transition without a ref or previous value.
        // But the original code was likely "if the USER logs out or state becomes invalid, ensure everything is wiped".
        // A specific case is better handled by the clear function itself.
        // The original logic: watch(loggedIn, (value) => { if (!value) ... })

        // We'll trust the manual clear() for user-initiated actions, but if we need to react to state changes:
        if (!loggedIn && (token || profile)) {
            // If we are theoretically "logged out" (computationally) but still hold data (e.g. invalid token?),
            // we might want to wipe it. But `loggedIn` is derived FROM them.
            // So `loggedIn` is false implies (token is empty OR profile is empty).
            // If token is empty, profile should be undefined.
            // If profile is undefined, correct.

            // Let's implement this logic: If token is cleared explicitly, ensure profile is gone.
            if (!token && profile) {
                setProfile(undefined)
            }
        }
    }, [loggedIn, token, profile, setProfile])

    const clear = () => {
        setToken("")
        setLoading(false)
        setProfile(undefined)
        router.replace("/auth/sign-in")
    }

    return {
        token,
        setToken,
        loaded,
        setLoaded,
        loading,
        setLoading,
        profile,
        setProfile,
        loggedIn,
        clear,
    }
}
