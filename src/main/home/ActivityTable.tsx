import React, { useEffect } from 'react';
import { ArrowDownward, ArrowUpward, LocalCafe } from "@material-ui/icons"
import CustomTable from '../../shared/CustomTable';
import { useWorkRecords } from '../../utils/WorkRecordsProvider';
import { ActivityTypes, ActivityRecord } from '../../types/Types';

export default function ActivityTable() {
    const { workRecords } = useWorkRecords()
    const headerStyle: any = {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        borderBottom: "1px solid rgba(224, 224, 224, 0.4)"
    }
    function handleRecordIcon(record: ActivityTypes) {
        switch (record) {
            case "Arriving":
                return <ArrowDownward style={{ color: "#00802b" }} />
            case "Exiting":
                return <ArrowUpward style={{ color: "#fb0e0e" }} />
            case "Lunch Started":
                return <LocalCafe style={{ color: "#00802b" }} />
            case "Finished Lunch":
                return <LocalCafe style={{ color: "#fb0e0e" }} />
            default:
                return <></>
        }
    }

    const columns = [
        {
            title: '', cellStyle: { width: "10%" }, render: (data: ActivityRecord) => (
                handleRecordIcon(data.activityType)
            )
        },
        { title: 'Activity', headerStyle: headerStyle, field: 'activityType' },
        { title: 'Date', headerStyle: headerStyle, field: 'date' },
        { title: 'Time', headerStyle: headerStyle, field: 'time' }
    ]

    return <CustomTable title={"Today's Records"} pageSize={8} columns={columns} items={workRecords} />
}

