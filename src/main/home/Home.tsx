import { AppBar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@material-ui/core";
import { AlarmOn, LocalCafe } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import last from "array-last";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { Doughnut } from 'react-chartjs-2';
import { ComponentContext } from "../../shared/ComponentContext";
import { ActivityRecord } from "../../types/Types";
import Clock from "../../utils/Clock";
import Image from '../../utils/Image';
import { useWorkRecords, WorkRecordsProvider } from "../../utils/WorkRecordsProvider";
import { PropsHome } from "./HomeOld";



function UserInfo() {
    const { workRecords } = useWorkRecords()

    const context = useContext(ComponentContext)
    const lastWorkRecord = last(workRecords || []) as ActivityRecord


    return <Box display="flex" flexDirection="row" overflow="hidden">
        <Box borderRadius="50%" overflow="hidden" p={0} >
            <Image
                src="imgs/user.svg"
                width="100%"
                height="100%"
            />
        </Box>
        <Box p={1} flex={1} style={{ display: "flex", marginLeft: "10px" }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>{context.user?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">{context.user?.occupation}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"> {lastWorkRecord && `Last Registry: ${lastWorkRecord.activityType} at ${lastWorkRecord.time}`}</Typography>
                </Grid>
            </Grid>
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

    return <Box display="flex" flexDirection="row" flex={2} justifyContent="center" alignItems="flex-end" padding={3}>
        <Button
            variant="contained"
            style={{ backgroundColor: "green", fontWeight: "bold", width: '150px', marginRight:10 }}
            title="Check-In"
            endIcon={<AlarmOn />}
            onClick={handleCheckin}
        >
            {"Check-In"}
        </Button>
        <Button
            style={{ width: "150px", backgroundColor: "red", fontWeight: "bold", marginLeft:10 }}
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
    return <TableContainer component={'div'} style={{ maxHeight: '50vh' }}>
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

    return <Toolbar style={{ backgroundColor: "#04010e" }}>
        <IconButton edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <MenuIcon style={{ color: "white" }} />
        </IconButton>

        <Box component="div" display="flex" width="100%" justifyContent="space-between">

        </Box>
        <IconButton edge="end" onClick={() => {
            props.logout()
        }} style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <Typography style={{ marginRight: "5px", color: "white" }}>Exit</Typography>
            <ExitToAppIcon style={{ color: "white" }} />
        </IconButton>
    </Toolbar>
}


function Chart() {

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



    return <>
        <Doughnut data={data} options={{}} legend={{ legendPosition: 'bottom' }} />
        <Typography>Month worked hours</Typography>
    </>
}

export type PropsHomeTeste = {
    logout: () => void
}
const Home = (props: PropsHome) => {

    return <WorkRecordsProvider>
        <Box component={"div"} bgcolor="rgba(0,0,0,0.5)" style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <AppBar position="static">
                
            <HomeToolbar logout={() => { props.logout() }} />
            </AppBar>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" height={'100%'} justifyContent={'space-around'} m={2}>
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
                                {/* <Box justifyContent="space-around" display="flex" flex={1} flexDirection="column" marginTop={5}>
                                </Box> */}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" height={'100%'} m={2}>
                                <Box display="flex" flex={1} component={Paper} margin={1}>
                                    <Clock></Clock>
                                </Box>
                                <Box display="flex" flex={2} p={1} flexDirection="column" justifyContent="center" component={Paper} margin={1}>
                                    <ActivityTable />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
        </Box>
    </WorkRecordsProvider>

}

export default Home