declare global {
    interface ISignInResponse {
        token: string
        profile: ISessionProfile
    }

}

export class NativeSignIn {
    password: string = ''
    pin: string = ''
}

export {}