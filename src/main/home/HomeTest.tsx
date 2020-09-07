import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MuiThemeProvider, Box, AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Container, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Image from '../../utils/Image';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Doughnut, ChartData } from 'react-chartjs-2';

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

const HomeTeste = () => {
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

    return (
        <Box component={"div"} style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'row', flex:1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="expand">
                        <ExpandLessIcon />
                    </IconButton>
                    <Box component="div" display="flex" width="100%" justifyContent="space-between">
                        <Image
                            src="imgs/logo-text.png"
                            width="150px"
                            height="50%"
                        />
                        <Typography>Work Hours Manager</Typography>
                    </Box>
                    {/* <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
                        <ExitToAppIcon />
                    </IconButton> */}
                </Toolbar>
                <Container fixed style={{ display:'flex', flex:1 }}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" flexDirection="column" height={'100%'} justifyContent={'space-around'}  p={5}>
                                <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
                                    <Box display="flex" flexDirection="row" overflow="hidden">
                                        <Box borderRadius="50%" overflow="hidden" p={0}>
                                            <Image
                                                src="http://scclinicamedica.com.br/img/equipe/user.png"
                                                width="130px"
                                                height="100%"
                                            />
                                        </Box>
                                        <Box p={1} >
                                            <Typography>James Olsen</Typography>
                                            <Typography>Software Enginhering</Typography>
                                            <Box display="flex" flexDirection="row">
                                                <AccessTimeIcon />
                                                <Typography>Working Started at 13:00</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
                                    <Box textAlign="center">
                                        <Typography style={{ fontSize: 28, fontWeight: 'bold' }}>15:45:00 PM</Typography>
                                        <Typography>Wednesday, 1st November 2020</Typography>
                                    </Box>
                                </Box>
                                <Box justifyContent="space-around" display="flex" flex={1} flexDirection="column">
                                    <Button style={{ backgroundColor: 'green', color: 'white', margin:3 }} variant="contained">{"Entry register"}</Button>
                                    <Button style={{ backgroundColor: 'rgb(96, 179, 247)', color: 'white', margin:3 }} variant="contained">Entry register</Button>
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
                                            <Box display="flex" height="100%" justifyContent="center" flexDirection="column">
                                                <Doughnut data={data} options={{}} legend={{legendPosition : 'bottom'}} />
                                                <Typography>Month worked hours</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box display="flex" flex={1} flexDirection="column" justifyContent="center" p={1}>
                                    {/*TABLE*/}
                                    <TableContainer component={'div'}>
                                        <Table className={classes.table} aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Activity</TableCell>
                                                    <TableCell align="right">Start at</TableCell>
                                                    <TableCell align="right">Finish at</TableCell>
                                                    <TableCell align="right">Duration</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Box>
    )
}

export default HomeTeste