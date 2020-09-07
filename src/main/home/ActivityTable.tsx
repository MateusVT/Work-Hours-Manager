import React, { useEffect } from 'react';
import Table from '../../shared/Table'
import { useWorkRecords, WorkRecordsProvider } from '../../utils/WorkRecordsProvider';

export default function ActivityTable() {
    const { workRecords } = useWorkRecords()

    const columns = [
        { title: 'Activity', field: 'activityType' },
        { title: 'Date', field: 'date' },
        { title: 'Time', field: 'time' }
    ]

    useEffect(() => {
        console.log(workRecords.length)
    }, [])

    return <Table title={"Today's Records"} pageSize={10} columns={columns} items={workRecords} />
}

