import React, { useContext, useEffect } from 'react';
import { Grid, Toolbar, Avatar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
// import Image from 'material-ui-image'
import Image from '../utils/Image';


export type PropsInternalPageHeader = {
    logout: () => void
};

function InternalPageHeader(props: PropsInternalPageHeader) {
    // const context = useContext(ComponentContext)

    return (
        <div style={{ width: "100%", height: "10%", background: "#cecece", display: "flex", alignItems: "center" }}>

            <Grid container style={{ width: "100%" }}>
                <Grid item xs={6} style={{ width: "100%", display: "flex", alignItems: "center", padding: "2%", justifyContent: "flex-start" }} >
                    <Image
                        src="imgs/logo-text.png"
                        width="50%"
                        height="50%"
                    />

                    {/* <AccountCircle style={{ color: "black", marginRight: "5px" }} fontSize="large" />
                    <Typography style={{ color: "black" }} variant="h6">
                        Mateus Vieira Torres    
                    </Typography> */}
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
