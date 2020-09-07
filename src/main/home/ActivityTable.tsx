import React, { useEffect } from 'react';
import CustomTable from '../../shared/CustomTable';
import { useWorkRecords } from '../../utils/WorkRecordsProvider';

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

    return <CustomTable title={"Today's Records"} pageSize={10} columns={columns} items={workRecords} />
}

