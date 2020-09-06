
export type User = {
    id: number
    username: string
    password: string
    name: string
    workload: string //in minutes = 8 hours
    accessToken: string
}

// export type WorkloadConfig = {
//     id: number
//     username: string
//     password: string
//     name: string
//     workload: string //in minutes = 8 hours
//     accessToken: string
// }


export type WorkShifts = {
    enteringTime: string
    exitTime: string
}