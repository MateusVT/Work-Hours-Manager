import Http from "../utils/Http"
import { loadMoment, nowLocale, loadAbsoluteMoment } from "../utils/Moment"
import { useSnackbar } from "notistack";
import { ActivityTypes } from "../types/Types";

// const { enqueueSnackbar } = useSnackbar();

export default function registerActivity(activityType: ActivityTypes) {

    Http.post({
        path: `/work-records`,
        body: {
            // "id": 5,
            "userId": 1,
            "date": nowLocale().format("YYYY/MM/DD"),
            "time": nowLocale().format("LT"),
            "activityType": activityType
        },
        onError: (error: string) => {
            console.log(error)
            // enqueueSnackbar('Invalid Checkin!', { variant: 'error' })
        },
        onSuccess: (response: any) => {
            // props.login(user)
            console.log(response)
            // enqueueSnackbar('Checkin!', { variant: 'success' })
        }
    })

}