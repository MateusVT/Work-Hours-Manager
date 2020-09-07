import Http from "../utils/Http"
import Cookies from "js-cookie"
import { User, ActivityRecord } from "../types/Types"
import { nowLocale } from "../utils/Moment"
import React, { useContext } from "react"
import { useSnackbar } from "notistack"
import { ComponentContext } from "./ComponentContext"

type LoginProps = {
    username: string
    password: string
    accessToken: string
}

function Login(props: LoginProps) {
    const { username, password, accessToken } = props
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComponentContext)

    // if (username.trim().length > 0 && password.trim().length > 0) {
    Http.get({
        path: accessToken ? `/users?accessToken=${Cookies.get("accessTokenOowlish")}` : `/users?username=${username}&password=${password}`,
        onError: (error: string) => {
            console.log(error)
            enqueueSnackbar('Invalid username', { variant: 'error' })
        },
        onSuccess: (users: User[]) => {
            const user = users[0]
            console.log(user)
            Http.get({
                path: `/work-records?userId=${user.id}&date=${nowLocale().format("YYYY/MM/DD")}`,
                onError: (error: string) => {
                    console.log(error)
                    enqueueSnackbar('Invalid username', { variant: 'error' })
                },
                onSuccess: (activities: ActivityRecord[]) => {

                    // props.login(user)
                    context.user = user
                    enqueueSnackbar('Welcome ' + user.name + '!', { variant: 'success' })
                    context.workRecords = activities
                }
            })
        }
    })
    // }

}

// export default React.memo(Login);