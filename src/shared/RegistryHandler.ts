import { ActivityRecord, ActivityTypes } from "../types/Types";
import Http from "../utils/Http";
import { nowLocale } from "../utils/Moment";


export default function registerActivity(activityType: ActivityTypes, userId: number, response: (activities: ActivityRecord[]) => void) {
    Http.post({
        path: `/work-records`,
        body: {
            "userId": userId,
            "date": nowLocale().format("YYYY/MM/DD"),
            "time": nowLocale().format("LT"),
            "activityType": activityType
        },
        onError: (error: string) => {
            console.log(error)
        },
        onSuccess: (response: any) => {
            console.log(response)
            Http.get({
                path: `/work-records?userId=${userId}&date=${nowLocale().format("YYYY/MM/DD")}`,
                onError: (error: string) => {
                    console.log(error)
                },
                onSuccess: (activities: ActivityRecord[]) => {
                    response(activities)
                }
            })
        }
    })


}