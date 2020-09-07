import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import { AccessTime, AlarmOn, LocalCafe } from '@material-ui/icons';
import last from 'array-last';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { ComponentContext } from '../../shared/ComponentContext';
import InternalPageHeader from '../../shared/InternalPageHeader';
import { ActivityRecord, User } from '../../types/Types';
import Clock from '../../utils/Clock';
import Http from '../../utils/Http';
import { nowLocale } from '../../utils/Moment';
import { useWorkRecords, WorkRecordsProvider } from '../../utils/WorkRecordsProvider';
import UserImg from "../../assets/imgs/user.jpg";
import ActivityTable from './ActivityTable';


function UserInfo() {
    const { workRecords } = useWorkRecords()

    const context = useContext(ComponentContext)
    const lastWorkRecord = last(workRecords || []) as ActivityRecord

    return <Grid container style={{ width: "100%" }} >
        <Grid item xs={4}>
            <Avatar alt="User" style={{ width: "100px", height: "100px", boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)" }} src={UserImg} />
        </Grid>
        <Grid item xs={8}>
            <Typography variant="h5">
                {context.user?.name}
            </Typography>
            <Typography variant="h6">
                {context.user?.occupation}
            </Typography>
            <Typography variant="subtitle1">
                <AccessTime />
                {lastWorkRecord && `Last Status: ${lastWorkRecord.activityType} - at ${lastWorkRecord.time}`}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Clock />
        </Grid>
    </Grid>

}

function Actions() {
    const context = useContext(ComponentContext)
    const { enqueueSnackbar } = useSnackbar();
    const { addWorkRecord } = useWorkRecords()
    // const [, updateState] = useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);

    function handleCheckin() {
        addWorkRecord("Arriving")
    }

    function handleCheckout() {
        addWorkRecord("Exiting")

    }

    function handleLunchBreak() {
        addWorkRecord("Lunch Break")

    }

    return <Grid container style={{ width: "100%" }}>
        <Grid item xs={6}>
            <Button
                variant="contained"
                style={{ width: "200px" }}
                title="Check-In"
                endIcon={<AlarmOn />}
                onClick={handleCheckin}
            >
                Check-In
            </Button>
        </Grid>
        <Grid item xs={6} >
            <Button
                style={{ width: "200px" }}
                variant="contained"
                title="Lunch"
                endIcon={<LocalCafe />}
                onClick={handleLunchBreak}
            >
                Lunch
            </Button>
        </Grid>
    </Grid>
}

function LeftPanel() {

    return <div style={{ width: "50%", height: "100%", backgroundColor: "red" }}>
        <UserInfo />
        <Actions />
    </div>
}

function RightPanel() {

    return <div style={{ width: "50%", height: "100%", backgroundColor: "blue" }}>
        <ActivityTable />
    </div>
}

export type PropsHome = {
    logout: () => void
}

function Home(props: PropsHome) {
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComponentContext)
    const [, updateState] = useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);


    useEffect(() => {
        if (context.user) {
            enqueueSnackbar('Welcome ' + context.user.name + '!', { variant: 'success' })
        }
    }, [])


    return (
        <WorkRecordsProvider>
            <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
                <InternalPageHeader logout={() => { props.logout() }} />
                <div style={{ width: "100%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LeftPanel />
                    <RightPanel />
                </div>
            </div>
        </WorkRecordsProvider>
    );
}

export default React.memo(Home);
