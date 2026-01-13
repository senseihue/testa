declare global {
    interface ISignInResponse {
        token: string
        profile: ISessionProfile
    }
}

export {}