import React, { useState, useContext } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MuiThemeProvider, Box, AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Container, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Image from '../../utils/Image';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Doughnut, ChartData } from 'react-chartjs-2';
import { WorkRecordsProvider, useWorkRecords } from "../../utils/WorkRecordsProvider";
import { ComponentContext } from "../../shared/ComponentContext";
import last from "array-last";
import { ActivityRecord } from "../../types/Types";
import Clock from "../../utils/Clock";
import { LocalCafe, AlarmOn } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { PropsHome } from "./Home";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    toolbar: theme.mixins.toolbar,
    table: {
        // minWidth: 650,
    },
}));

function UserInfo() {
    const { workRecords } = useWorkRecords()

    const context = useContext(ComponentContext)
    const lastWorkRecord = last(workRecords || []) as ActivityRecord


    return <Box display="flex" flexDirection="row" overflow="hidden">
        <Box borderRadius="50%" overflow="hidden" p={0} >
            <Image
                src="http://scclinicamedica.com.br/img/equipe/user.png"
                width="130px"
                height="100%"
            />
        </Box>
        <Box p={1} flex={1} >
            <Typography>{context.user?.name}</Typography>
            <Typography> {context.user?.occupation}</Typography>
            <Box display="flex" flexDirection="row">
                <AccessTimeIcon />
                <Typography> {lastWorkRecord && `Last Status: ${lastWorkRecord.activityType} - at ${lastWorkRecord.time}`}</Typography>
            </Box>
        </Box>
    </Box>
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

    return <Box display="flex" flexDirection="column" flex={1} justifyContent="space-around" alignItems="center">
        <Button
            variant="contained"
            style={{ width: "200px", backgroundColor: "green", marginBottom:10 }}
            title="Check-In"
            endIcon={<AlarmOn />}
            onClick={handleCheckin}
        >
            {"Check-In"}
        </Button>
        <Button
            style={{ width: "200px", backgroundColor: "red" }}
            variant="contained"
            title="Lunch"
            endIcon={<LocalCafe />}
            onClick={handleLunchBreak}
        >
            {"Lunch"}
        </Button>
    </Box>
}

function ActivityTable() {
    const { workRecords } = useWorkRecords()
    return <TableContainer component={'div'} style={{maxHeight: '50vh'}}>
        <Table aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {workRecords.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.activityType}
                        </TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

}
function HomeToolbar(props: { logout: () => void }) {
    const { workRecords } = useWorkRecords()

    const context = useContext(ComponentContext)
    const lastWorkRecord = last(workRecords || []) as ActivityRecord


    return <Toolbar>
        <IconButton edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>

        <Box component="div" display="flex" width="100%" justifyContent="space-between">
            <Image
                src="imgs/logo-text.png"
                width="150px"
                height="50%"
            />
        </Box>
        <IconButton edge="end" onClick={() => {
            props.logout()
        }} style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <Typography style={{ marginRight: "5px" }}>Exit</Typography>
            <ExitToAppIcon />
        </IconButton>
    </Toolbar>
}


export type PropsHomeTeste = {
    logout: () => void
}
const HomeTeste = (props: PropsHome) => {
    const classes = useStyles();

    function createData(name: string, calories: string, fat: string, carbs: string) {
        return { name, calories, fat, carbs };
    }

    const rows = [
        createData('Work', "08:00 AM", "11:00 AM", "04:00"),
        createData('Launch', "11:00 AM", "02:00 PM", "03:00"),
        createData('Work', "08:00 AM", "08:00 AM", "08:00")
    ];

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const data = {
        labels: [
            'Pending',
            'Progress'
        ],
        datasets: [{
            data: [300, 50],
            backgroundColor: [
                'rgb(96, 179, 247)',
                'green'
            ],
            hoverBackgroundColor: [
                'rgb(96, 179, 247)',
                'green'
            ]
        }]
    };

    return <WorkRecordsProvider>
        <Box component={"div"} style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'row', flex: 1 }}>
            <AppBar position="static">
                <HomeToolbar logout={() => { props.logout() }} />

                <Container fixed style={{ display: 'flex', flex: 1 }}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" height={'100%'} justifyContent={'space-around'} p={5}>
                                <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
                                    <UserInfo />
                                </Box>
                                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" marginTop={5}>
                                    <Box textAlign="center">
                                        <Clock />
                                    </Box>
                                </Box>
                                <Box justifyContent="space-around" display="flex" flex={1} flexDirection="column" marginTop={5}>
                                    <Actions />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" height={'100%'}>
                                <Box display="flex" flex={1} p={5}>
                                    <Grid container>
                                        <Grid xs={12} md={6} item>
                                            <Box display="flex" height="100%" justifyContent="center" flexDirection="column" alignItems="center">
                                                <Doughnut data={data} options={{}} legend={{}} />
                                                <Typography>Daily worked hours</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={12} md={6} item>
                                            <Box display="flex" height="100%" justifyContent="center" flexDirection="column" alignItems="center">
                                                <Doughnut data={data} options={{}} legend={{ legendPosition: 'bottom' }} />
                                                <Typography>Month worked hours</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box display="flex" flex={1} flexDirection="column" justifyContent="center" p={1}>
                                    <ActivityTable />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Box>
    </WorkRecordsProvider>

}

export default HomeTeste