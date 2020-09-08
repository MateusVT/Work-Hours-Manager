import { AppBar, Box, Button, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { AlarmOn, LocalCafe } from "@material-ui/icons";
import { ExitToApp, Work, Menu, QueryBuilder } from '@material-ui/icons';
import last from "array-last";
import React, { useContext, useState } from "react";
import { ComponentContext } from "../../shared/ComponentContext";
import { ActivityRecord } from "../../types/Types";
import Clock from "../../utils/Clock";
import moment from "moment"
import Image from '../../utils/Image';
import { useWorkRecords, WorkRecordsProvider } from "../../utils/WorkRecordsProvider";
import ActivityTable from "./ActivityTable";
import Chart from "./Chart";
import { nowLocale, loadAbsoluteMoment } from "../../utils/Moment";



function UserInfo() {
    const { lastWorkRecord } = useWorkRecords()
    const context = useContext(ComponentContext)
    return <Box display="flex" flexDirection="row" overflow="hidden">
        <Box overflow="hidden" p={1} >
            <Image
                src="imgs/avatar.svg"
                width="100%"
                height="100%"
            />
        </Box>
        <Box p={1} flex={1} style={{ display: "flex", marginLeft: "10px" }}>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>{context.user?.name}</Typography>
                    <Typography style={{ fontStyle: "italic" }} variant="h6">{context.user?.occupation}</Typography>
                    <Typography variant="h6"> {lastWorkRecord && <span>
                        <b>Last Status:</b> {lastWorkRecord.activityType} at {lastWorkRecord.time}
                    </span>
                    }</Typography>
                </Grid>
            </Grid>
        </Box>
    </Box>
}

function UserHoursReport() {
    const { todayWorkRecords, todayWorkReport } = useWorkRecords()

    let totalWorkedTime = "00:00"
    if (todayWorkRecords[0]) {
        console.log(loadAbsoluteMoment(todayWorkRecords[0].time, "HH:mm").format("HH:mm"))
        console.log(nowLocale().format("HH:mm"))
        totalWorkedTime = moment.utc(moment.duration(
            moment().diff(moment(todayWorkRecords[0].time, "HH:mm"))
        ).asMilliseconds()).format("HH:mm")

    }
    return <Grid container style={{ width: "100%", padding: "10px" }}>
        <Grid item xs={6}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>Started Working</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Work style={{ marginRight: "5px" }} />
                <Typography variant="h6" >{todayWorkRecords[0] ? loadAbsoluteMoment(todayWorkRecords[0].time, "HH:mm").format("LT") : "--:--"}</Typography>
            </div>
        </Grid>
        <Grid item xs={6} >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>Today Total Worked Time</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
                <QueryBuilder style={{ marginRight: "5px" }} />
                <Typography variant="h6" >{todayWorkReport?.totalHoursWorked || "00:00"}</Typography>
            </div>
        </Grid>
    </Grid>
}


function Actions() {
    const { workRecords, addWorkRecord } = useWorkRecords()
    const lastWorkRecord = last(workRecords || []) as ActivityRecord
    const [, updateState] = useState<{}>();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function handleCheckin() {
        addWorkRecord("Arriving")
        forceUpdate()
    }

    function handleCheckout() {
        addWorkRecord("Exiting")
        forceUpdate()
    }

    function handleLunchStarted() {
        addWorkRecord("Lunch Started")
        forceUpdate()
    }

    function handleLunchFinished() {
        addWorkRecord("Finished Lunch")
        forceUpdate()
    }

    return <Box display="flex" flexDirection="row" flex={2} justifyContent="center" alignItems="flex-end" padding={2}>
        <Button
            variant="contained"
            disabled={lastWorkRecord && lastWorkRecord.activityType == "Lunch Started"}
            style={{ backgroundColor: "#00802b", fontWeight: "bold", width: '170px', marginRight: 5 }}
            title="Check-In"
            endIcon={<AlarmOn />}
            onClick={lastWorkRecord && lastWorkRecord.activityType == "Arriving" ? handleCheckout : handleCheckin}
        >
            {lastWorkRecord && lastWorkRecord.activityType == "Arriving" ? "Check-Out" : "Check-In"}
        </Button>
        <Button
            style={{ width: "170px", backgroundColor: "#fb0e0e", fontWeight: "bold", marginLeft: 5 }}
            disabled={lastWorkRecord && lastWorkRecord.activityType == "Exiting"}
            variant="contained"
            title="Lunch"
            endIcon={<LocalCafe />}
            onClick={lastWorkRecord && lastWorkRecord.activityType == "Lunch Started" ? handleLunchFinished : handleLunchStarted}
        >
            {lastWorkRecord && lastWorkRecord.activityType == "Lunch Started" ? "Stop Lunch" : "Start Lunch"}
        </Button>
    </Box>
}

function HomeToolbar(props: { logout: () => void }) {

    return <Toolbar style={{ backgroundColor: "#04010e" }}>
        <IconButton edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <Menu style={{ color: "white" }} />
        </IconButton>

        <Box component="div" display="flex" width="100%" justifyContent="space-between">
            <Typography variant="h6" style={{ color: "white" }}>Work Hours Manager</Typography>
        </Box>
        <IconButton edge="end" onClick={() => {
            props.logout()
        }} style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <Typography style={{ marginRight: "5px", color: "white" }}>Exit</Typography>
            <ExitToApp style={{ color: "white" }} />
        </IconButton>
    </Toolbar>
}


export type PropsHome = {
    logout: () => void
}
const Home = (props: PropsHome) => {

    return <WorkRecordsProvider>
        <Box component={"div"} bgcolor="#6c677ba3" style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', flex: 1, height: "100%" }}>
            <AppBar position="static">
                <HomeToolbar logout={() => { props.logout() }} />
            </AppBar>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" height={'100%'} justifyContent={'space-around'} >
                        <Box component={Paper} margin={1} flex={1} display="flex" flexDirection="column" justifyContent="center">
                            <UserInfo />
                        </Box>
                        <Box component={Paper} margin={1} flex={1} display="flex" flexDirection="column" justifyContent="center">
                            <Box textAlign="center">
                                <Clock />
                                <Actions />
                            </Box>
                        </Box>
                        <Box component={Paper} margin={1} display="flex" flex={1} p={5}>
                            <Grid container>
                                <Grid xs={12} md={6} item>
                                    <Box display="flex" height="100%" justifyContent="center" flexDirection="column" alignItems="center">
                                        <Chart />
                                    </Box>
                                </Grid>
                                <Grid xs={12} md={6} item>
                                    <Box display="flex" height="100%" justifyContent="center" flexDirection="column" alignItems="center">
                                        <Chart />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" height={'100%'} >
                        <Box display="flex" flex={1} component={Paper} margin={1}>
                            <UserHoursReport />
                        </Box>
                        <Box display="flex" flex={9} p={1} flexDirection="column" justifyContent="center" component={Paper} margin={1}>
                            <ActivityTable />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </WorkRecordsProvider>

}

export default Home