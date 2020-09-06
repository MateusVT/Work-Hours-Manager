import React, { useState, useMemo, useContext } from 'react';
import InternalPageHeader from '../shared/InternalPageHeader';
import { User, Pair } from '../types/Types';
import UserImg from "../assets/imgs/user.jpg";
import { Button, Avatar, Grid, Typography, IconButton } from '@material-ui/core';
import { AlarmOn, LocalCafe } from '@material-ui/icons';
import { AccessTime } from '@material-ui/icons';
import Clock from '../utils/Clock';
import Table from '../shared/Table';
import { Doughnut } from 'react-chartjs-2';
import Http from '../utils/Http';
import { now } from 'moment';
import { loadAbsoluteMoment, loadMoment } from '../utils/Moment';
import { useSnackbar } from 'notistack';
import registerActivity from '../shared/RegistryHandler';
import { ComponentContext } from '../shared/ComponentContext';



export type PropsHome = {
    logout: () => void
};

function UserInfo() {

    const context = useContext(ComponentContext)
    return <Grid container style={{ width: "100%" }} >
        <Grid item xs={4}>
            <Avatar alt="Oowlish User" style={{ width: "100px", height: "100px", boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)" }} src={UserImg} />
        </Grid>
        <Grid item xs={8}>
            <Typography variant="h5">
                {context.user?.name}
            </Typography>
            <Typography variant="h6">
                {context.user?.occupation}
            </Typography>
            <Typography variant="subtitle1">
                <AccessTime /> Working - Started at 12:25 AM
                </Typography>
        </Grid>
        <Grid item xs={12}>
            <Clock />
        </Grid>
    </Grid>

}


function Actions() {
    const { enqueueSnackbar } = useSnackbar();

    function handleCheckin() {
        registerActivity("Arriving")
    }

    function handleCheckout() {
        registerActivity("Exiting")
    }

    function handleLunchBreak() {
        registerActivity("Lunch Break")
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

function ActivityTable() {

    const context = useContext(ComponentContext)
    if (!context.workRecords) return <></>
    const columns = [
        { title: 'Activity', field: 'activityType' },
        { title: 'Date', field: 'date' },
        { title: 'Time', field: 'time' }
    ]
    return <Table title={"Today's Records"} pageSize={10} columns={columns} items={context.workRecords} />
}

function DailyDoughnutChart() {
    // const pairs = useMemo<Pair<E>[]>(
    //     () =>
    //         items
    //             .map((item, index) => ({ key: item, value: fetchValue(item, index) }))
    //             .filter(pair => showZeros || pair.value > 0),
    //     [fetchValue, items, showZeros]
    // )
    // const colors = useMemo(() => pairs.map((pair, index) => fetchColor(pair.key, index)), [fetchColor, pairs])
    // const keys = useMemo(() => pairs.map((pair, index) => fetchLegend(pair.key, index)), [fetchLegend, pairs])

    // const values = useMemo(
    //     () =>
    //         pairs
    //             .map(pair => pair.value)
    //             .sort((a, b) => {
    //                 if (props.orderBy) {
    //                     switch (props.orderBy) {
    //                         case "desc":
    //                             if (a < b) {
    //                                 return 1
    //                             }
    //                             if (a > b) {
    //                                 return -1
    //                             }
    //                             return 0
    //                             break
    //                         case "asc":
    //                             if (a < b) {
    //                                 return -1
    //                             }
    //                             if (a > b) {
    //                                 return 1
    //                             }
    //                             return 0
    //                             break
    //                         default:
    //                             return 0
    //                     }
    //                 } else {
    //                     return 0
    //                 }
    //             }),
    //     [pairs, props.orderBy]
    // )


    return <></>
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



function Home(props: PropsHome) {

    return (
        <div style={{ width: "100%", height: "100%", overflowY: "hidden" }}>
            <InternalPageHeader logout={() => { props.logout() }} />
            <div style={{ width: "100%", height: "90%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LeftPanel />
                <RightPanel />
            </div>
        </div>
    );
}

export default React.memo(Home);
