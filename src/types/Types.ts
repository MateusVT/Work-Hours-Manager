export type Pair<E> = {
    key: E
    value: number
}

export type User = {
    id: number
    username: string
    password: string
    name: string
    workload: string //in minutes = 8 hours
    accessToken: string
}

export type ActivityRecord = {
    activityType: ActivityTypes
    startedAt: string
    endedAt: string
    duration: string
}

export type ActivityTypes = "Arriving" | "Exiting" | "Lunch Break"

export type WorkShifts = {
    enteringTime: string
    exitTime: string
}