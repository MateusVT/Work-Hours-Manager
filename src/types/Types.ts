export type Pair<E> = {
    key: E
    value: number
}

export type User = {
    id: number
    username: string
    password: string
    name: string
    occupation: string
    workload: string //in minutes = 8 hours
    accessToken: string
}

export type UserCredentials = {
    username: string
    password: string
}

export type ActivityRecord = {
    id: number
    userId: number
    date: string
    time: string
    activityType: ActivityTypes
}

export type DayWorkReport = {
    userId: number
    date: string
    totalHoursWorked: string
}


export type ActivityTypes = "Arriving" | "Exiting" | "Lunch Started" | "Finished Lunch"


