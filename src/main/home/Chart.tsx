import React from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import { Menu, MoveToInbox, Mail } from '@material-ui/icons/';

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
                        <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
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


export default Chart