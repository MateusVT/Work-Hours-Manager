import DateFnsUtils from "@date-io/date-fns";
import { Button } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MaterialTable, { Column, MTableToolbar } from 'material-table';
import React, { useEffect, useState } from 'react';
import { loadAbsoluteMoment, loadMoment, nowLocale } from '../utils/Moment';
import tableIcons from '../utils/TableIcons';
import { useWorkRecords } from '../utils/WorkRecordsProvider';

type TableProps = {
    items: any[]
    columns: Array<Column<any>>
    pageSize: number
    title: string
}

export default function CustomTable(props: TableProps) {
    const { title, pageSize } = props
    const [date, setDate] = useState<Date>(new Date());
    const { loadWorkRecordsByDate } = useWorkRecords()


    useEffect(() => {
        loadWorkRecordsByDate(loadMoment(date.getTime()))
    }, [date])

    function handleDateChange(dateChanged: Date | null, value?: string | null | undefined) {
        if (dateChanged) {
            setDate(dateChanged)
        }
    }

    function TableDatePicker() {
        return <div
            style={{
                position: "absolute",
                top: "0",
                display: "flex",
                width: "100%",
                justifyContent: "center"
            }}
        >
            <Button
                variant="outlined"
                style={{ border: "none", zIndex: 100 }}
                onClick={() => {
                    setDate(new Date(
                        loadAbsoluteMoment(date.getTime())
                            .subtract(1, "day")
                            .valueOf()
                    ))
                }}
            >
                <ArrowBack />
            </Button>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    maxDate={loadMoment(nowLocale().valueOf())}
                    format="yyyy/MM/dd"
                    margin="normal"
                    style={{
                        marginTop: "8px",
                        color: "black",
                        width: "90px",
                        position: "relative",
                        zIndex: 100
                    }}
                    id="date-picker-inline"
                    value={date}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>

            <Button
                variant="outlined"
                disabled={date.getDate() == nowLocale().date()}
                style={{ border: "none", zIndex: 100 }}
                onClick={() => {
                    setDate(new Date(
                        loadAbsoluteMoment(date.getTime())
                            .add(1, "day")
                            .valueOf()
                    ))

                }}
            >
                <ArrowForward />
            </Button>
        </div>
    }

    return (
        <MaterialTable

            options={{ pageSize: pageSize }}
            components={{
                Toolbar: props => (
                    <div
                        style={{
                            display: "block",
                            flexDirection: "row-reverse",
                            justifyContent: "flex-end !important"
                        }}
                    >
                        <TableDatePicker />
                        <MTableToolbar {...props} />
                    </div>)
            }}
            style={{
                width: "100%", minHeight: "100%"
            }}
            title={title}
            columns={props.columns}
            data={props.items}
            icons={tableIcons as any}

        />
    );
}