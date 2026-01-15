import {useSession} from "@/hooks/use-session";


export function AuthButtonsGroup() {

    const session = useSession()

    const { loggedIn } = session

    return (
        <div className="flex items-center">
            { loggedIn ? <button>Logout</button> : <button>Login</button> }
        </div>
    )
}