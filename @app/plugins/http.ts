import axios, { type AxiosRequestConfig } from "axios"
import type { AxiosResponse, AxiosError } from "axios"
import { toast } from "@/hooks/use-toast";
import {useCookies as cookies} from "@/hooks/use-cookie";
import i18n from "@app/i18n"
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

const useHttp = () => {
    const options: AxiosRequestConfig = {
        baseURL: '/gateway',
        withCredentials: true,
        headers: {
            accept: "*/*",
            contentType: "application/json"
        },
        adapter: "fetch"
    }


    const http = axios.create(options)
    addExtraMethods(http)

    http.interceptors.request.use(async (config) => {
            const useCookies = cookies()
            config.headers = config.headers || {}

            config.headers["Accept-Language"] = i18n.language

            const headerToken = config.headers["Authorization"]
            const token = useCookies.get("token")
                if (!headerToken && token) config.headers["Authorization"] = `Bearer ${token}`
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
                if (result?.length > 1) toast({
                    title: i18n.t(`messages.error.${description}`)
                })
                else toast({
                    title: description
                })
                return Promise.reject(response)
            }

            return response
        },
        (error: AxiosError) => {
            const code: Record<number, string> = {
                401: i18n.t("messages.error.unauthorized"),
                403: i18n.t("messages.error.forbidden")
            }

            if (error.response?.status) toast({
                title: code[error.response.status]
            })

            return Promise.reject(error.response)
        }
    )

    return http
}


export default useHttp

