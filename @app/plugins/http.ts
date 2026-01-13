import axios, { type AxiosRequestConfig } from "axios"
import type { AxiosResponse, AxiosError } from "axios"

const addExtraMethods = (axiosInstance: Record<string, any>) => {
  const methods = ["request", "delete", "get", "head", "options", "post", "put", "patch"]
  const axiosExtra: Record<string, any> = {}

  for (const method of methods) {
    axiosExtra["$" + method] = function (...args: any[]) {
      return this[method](...args).then((res: AxiosResponse) => res && res.data)
    }
  }

  for (const key in axiosExtra) axiosInstance[key] = axiosExtra[key].bind(axiosInstance)
}

export default const useHttp = () => {
    const options: AxiosRequestConfig = {
        baseURL: process.env.APP_API_URL,
        withCredentials: true,
        headers: {
            accept: "*/*",
            contentType: "application/json"
        },
        adapter: "fetch"
    }


    const http = axios.create(options)
    addExtraMethods(http)

    http.interceptors.request.use(
        (config) => {
            config.headers = config.headers || {}

            if (import.meta.server) {
                config.baseURL = runtimeConfig.public.apiUrl.replace("**", "")
            }

            config.headers["Accept-Language"] = $i18n.locale.value

            const headerToken = config.headers["Authorization"]
            const token = useCookie("token")
            if (import.meta.client && !config.url?.includes("public"))
                if (!headerToken && token.value) config.headers["Authorization"] = `Bearer ${token.value}`

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    http.interceptors.response.use(
        (response) => {
            const { code, description } = response?.data?.result || {}
            if (code && code.toLowerCase() !== "ok") {
                const result = description?.split("_")
                if (result?.length > 1) $toast.error($i18n.t(`messages.error.${description}`))
                else $toast.error(description)
                return Promise.reject(response)
            }

            return response
        },
        (error: AxiosError) => {
            const code: Record<number, string> = {
                401: $i18n.t("messages.error.unauthorized"),
                403: $i18n.t("messages.error.forbidden")
            }

            if (error.response?.status) $toast.error(code[error.response.status])

            return Promise.reject(error.response)
        }
    )

}

