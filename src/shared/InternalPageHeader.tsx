import React, { useContext, useEffect } from 'react';
import { Grid, Toolbar, Avatar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
// import { ComponentContext } from './ComponentContext';


export type PropsInternalPageHeader = {
    logout: () => void
};

function InternalPageHeader(props: PropsInternalPageHeader) {
    // const context = useContext(ComponentContext)

    return (
        <div style={{ width: "100%", height: "10%", background: "#cecece", display: "flex", alignItems: "center" }}>

            <Grid container style={{ width: "100%" }}>
                <Grid item xs={6} style={{ width: "100%", display: "flex", alignItems: "center", padding: "2%", justifyContent: "flex-start" }} >
                    <AccountCircle style={{ color: "black", marginRight: "5px" }} fontSize="large" />
                    <Typography style={{ color: "black" }} variant="h6">
                        João da Silva
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{ width: "100%", display: "flex", alignItems: "center", padding: "2%", justifyContent: "flex-end" }} >
                    <IconButton
                        title="Sair"
                        onClick={() => {
                            props.logout()
                        }}
                    >
                        <Typography style={{ color: "black", marginRight: "5px" }} variant="h6">Sair</Typography>
                        <ExitToApp style={{ color: "black" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </div >
    );
}

export default InternalPageHeader