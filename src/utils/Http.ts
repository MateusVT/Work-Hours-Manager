import Cookies from "./Cookies"

type RequestOptions<E> = {
    body?: any
    external?: boolean
    onError?: (error: any) => void
    onFinish?: () => void
    onSuccess?: (data: E) => void
    path: string
    headers?: Record<string, string>
}


class Http {
    private static readonly port = 8000
    private static readonly apiUrl = `http://localhost:${Http.port}`


    static call<E>(method: string, options: RequestOptions<E>) {
        const callbacks = {
            onError: options.onError || console.error,
            onFinish: options.onFinish || (() => { }),
            onSuccess: options.onSuccess || (() => { })
        }

        const url = options.external ? options.path : `${Http.apiUrl}${options.path}`

        fetch(url, {
            body: options.body && JSON.stringify(options.body),
            headers: this.mountHeaders(options.headers),
            method: method
        })
            .then(response => {
                const status = response.status
                const re = /(\btext\/plain\b)/
                if (response.headers && response.headers.has('Content-Type')
                    && re.test(response.headers.get('Content-Type')!)) {
                    response.text().then(text => {
                        if (status === 200 || status === 201)
                            callbacks.onSuccess(text as any)
                        else
                            callbacks.onError(text as any)
                    }).catch(reason => {
                        callbacks.onError(reason)
                    })
                } else {
                    response
                        .text()
                        .then(text => {
                            let json: any

                            try {
                                json = JSON.parse(text)
                            } catch (error) {
                                callbacks.onError(`${error} (body: ${text})`)

                                return
                            }

                            if (status === 200 || status === 201) {
                                callbacks.onSuccess(json as E)
                            } else {
                                callbacks.onError(json.message !== undefined ? json.message : json)
                            }
                        })
                        .catch(reason => {
                            callbacks.onError(reason)
                        })
                }
            })
            .catch(reason => {
                callbacks.onError(reason)
            })
            .finally(() => {
                callbacks.onFinish()
                console.debug(`${method} ${options.path} FINISHED`)
            })
    }

    static delete<E>(options: RequestOptions<E>) {
        return this.call("DELETE", options)
    }

    static get<E>(options: RequestOptions<E>) {
        return this.call("GET", options)
    }

    static post<E>(options: RequestOptions<E>) {
        return this.call("POST", options)
    }

    static put<E>(options: RequestOptions<E>) {
        return this.call("PUT", options)
    }

    private static mountHeaders(headerParams?: Record<string, string>): Record<string, string> {
        const accessToken = Cookies.get("accessToken")

        if (accessToken != null) {
            return {
                Authorization: accessToken,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                ...headerParams
            }
        }

        return {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            ...headerParams
        }
    }

}

export default Http
