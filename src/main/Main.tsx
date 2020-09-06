import React, { useState } from 'react';
import InternalPageHeader from '../shared/InternalPageHeader';
import { User } from '../types/Types';
import UserImg from "../assets/imgs/user.jpg";
import { Button, Avatar, Grid, Typography, IconButton } from '@material-ui/core';
import { AlarmOn, LocalCafe } from '@material-ui/icons';
import { AccessTime } from '@material-ui/icons';

export type PropsMain = {
    logout: () => void
};

function UserInfo() {

    return <Grid container style={{ width: "100%" }} >
        <Grid item xs={4}>
            <Avatar alt="Oowlish User" style={{ width: "100px", height: "100px", boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)" }} src={UserImg} />
        </Grid>
        <Grid item xs={8}>
            <Typography variant="h5">
                Mateus Torres
                </Typography>
            <Typography variant="h6">
                Software Engineering
                </Typography>
            <Typography variant="subtitle1">
                <AccessTime /> Working - Started at 12:25 AM
                </Typography>
        </Grid>
    </Grid>

}


function Actions() {

    return <Grid container style={{ width: "100%" }}>
        <Grid item xs={6}>
            <Button
                variant="contained"
                style={{ width: "200px" }}
                title="Check-In"
                endIcon={<AlarmOn />}
                onClick={() => {
                }}
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
                onClick={() => {
                }}
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

    </div>
}



function Main(props: PropsMain) {

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

export default React.memo(Main);
