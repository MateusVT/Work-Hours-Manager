import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState, useContext, useEffect } from 'react';
import CustomInput from "../shared/CustomInput";
import { User, ActivityRecord } from "../types/Types";
import Http from "../utils/Http";
import { ComponentContext } from "../shared/ComponentContext";
import { nowLocale } from "../utils/Moment";
import Cookies from "js-cookie";
import { useWorkRecords } from "../utils/WorkRecordsProvider";

export type PropsGuest = {
    login: (user: User) => void
};



function LoginCard(props: PropsGuest) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComponentContext)

    function handleLogin(accessToken?: string) {
        if (username.trim().length > 0 && password.trim().length > 0) {

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

                            props.login(user)
                            context.user = user
                            enqueueSnackbar('Welcome ' + user.name + '!', { variant: 'success' })
                            context.workRecords = activities
                        }
                    })
                }
            })
        }
    }

    return (
        <Paper elevation={1} style={{ width: "30%", height: "60%", borderRadius: "15px", padding: 15 }}>

            <>
                <div style={{ height: "10%" }}>
                    <Typography style={{ fontSize: "1.7vw", textAlign: "center", fontWeight: "bold", color: "black" }}>
                        {"Access Panel"}
                    </Typography>
                </div>
                <Grid container style={{ height: "60%" }}>
                    <Grid item style={{ width: "90%", display: "flex", margin: "auto", height: "40%" }}>

                        <CustomInput
                            id={"username"}
                            label="Username"
                            key={"username"}
                            required
                            value={username}
                            name={"username"}
                            onChange={(attribute, value) => { setUsername(value) }}
                            maxLength={100}
                            inputType={"string"}
                            variant="outlined"
                            style={{ display: "flex", margin: "auto" }}
                        />
                    </Grid>
                    <Grid item style={{ width: "90%", display: "flex", margin: "auto", height: "40%" }}>
                        <CustomInput
                            id={"password"}
                            key={"password"}
                            label="Password"
                            required
                            value={password}
                            name={"password"}
                            type={"password"}
                            onChange={(attribute, value) => {
                                setPassword(value)
                            }}
                            maxLength={100}
                            inputType={"string"}
                            variant="outlined"
                            style={{ display: "flex", margin: "auto" }}
                            inputProps={{
                                onKeyPress: (event: any) => {
                                    if (event.key === 'Enter' && password != null && password.trim().length > 0) {
                                        handleLogin();
                                    }
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <div style={{ height: '30%', display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <div style={{ height: "70%" }}>
                        <Button color="primary"
                            style={{
                                fontSize: "1.4vw",
                                borderRadius: "5px", width: "80%", height: "90%"
                            }}
                            variant="contained"
                            onClick={() => {
                                handleLogin()
                            }}
                        >
                            {"Log In"}
                        </Button>
                    </div>
                </div>
            </>
        </Paper>
    );
}

const Guest = (props: PropsGuest) => {

    function TopLetter() {

        return (
            <div style={{ height: "30%", display: "flex" }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography style={{ textAlign: "center", marginTop: "3%", lineHeight: "3vw", fontSize: "2.5vw", fontWeight: "bold", color: "white", fontFamily: 'Playfair Display, sans-serif' }}>
                            Welcome
                            <br />
                            Oowlish collaborator!
                    </Typography>
                        <Typography style={{ textAlign: "center", marginTop: "1%", fontSize: "1.2vw", color: "white" }}>
                            {"We will help you to manage and register your workday."}<br />
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        );
    }

    function GuestHome() {

        return (
            <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>

                <div style={{
                    background: "url(/imgs/guest-background.jpg) no-repeat center ",
                    backgroundSize: "100% 100%", width: "100%", height: "100%"
                }}>
                    <TopLetter />
                    <Grid container style={{ display: "flex", textAlign: "center", width: "100%", height: "70%" }}>
                        <Grid item lg={12} style={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100%", width: "50%" }} >
                            <LoginCard login={props.login} />
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }

    return (
        <>
            <GuestHome />
        </>
    );
}

export default React.memo(Guest);
