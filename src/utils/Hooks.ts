import { DependencyList, useEffect, Dispatch, useState, useCallback } from "react"
import Http from "../utils/Http"
import { Moment } from "./Moment"
type Endpoint = {
    callback: (data: any) => void
    onError?: (error: any) => void
    path: string
}

export function useFetchAll(endpoints: Endpoint[], deps: DependencyList) {
    useEffect(() => {
        const refetchTimeouts: number[] = []

        for (const endpoint of endpoints) {
            const onError = (error: string) => {
                console.error(error)
            }
            const fetch = (refetch: boolean) => {
                refetchTimeouts.push(
                    window.setTimeout(
                        () => {
                            Http.get({
                                path: endpoint.path,
                                onError:
                                    endpoint.onError ||
                                    (error => {
                                        onError(error)
                                        fetch(true)
                                    }),
                                onSuccess: endpoint.callback
                            })
                        },
                        refetch ? 2500 : 0
                    )
                )
            }

            fetch(false)
        }

        return () => refetchTimeouts.forEach(timeout => window.clearTimeout(timeout))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export function useDelayedState<S>(initialState: S | (() => S), delay: number): [S, Dispatch<S>, S, Dispatch<S>] {
    const [value, set] = useState<S>(initialState)
    const [delayedValue, setDelayed] = useState<S>(initialState)
    const [timeout, setTimeout] = useState<number | null>(null)
    const setDelayedValue = useCallback(
        (newValue: S) => {
            timeout && window.clearTimeout(timeout)
            setDelayed(newValue)
            setTimeout(window.setTimeout(() => set(newValue), delay))
        },
        [delay, timeout]
    )
    const setValue = useCallback((newValue: S) => {
        set(newValue)
        setDelayed(newValue)
    }, [])

    return [value, setValue, delayedValue, setDelayedValue]
}

export function useFromNow(moment: Moment, updateInterval?: number) {
    const [str, setStr] = useState(moment.fromNow())

    useEffect(() => {
        const interval = window.setInterval(() => setStr(moment.fromNow()), (updateInterval || 30) * 1000)

        return () => window.clearInterval(interval)
    }, [moment, updateInterval])

    return str
}
