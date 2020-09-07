import { Box, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import { useInterval } from "react-use"
import { now } from "../utils/Moment"

function Clock() {
    const moment = () => now().local()
    const currentDate = useMemo(() => moment().format('dddd, MMMM Do YYYY'), [moment().dayOfYear()])
    const [date, setDate] = useState(currentDate)
    const [time, setTime] = useState(moment().format("HH:mm:ss"))

    useEffect(() => setDate(currentDate), [currentDate])
    useInterval(() => setTime(moment().format("HH:mm:ss")), 1000)

    return (
        <>
            <Typography style={{ letterSpacing: "0.25rem" }} variant="h3">
                {time}
            </Typography>
            <Typography style={{ fontFamily: 'Playfair Display, sans-serif' }} variant="subtitle1">
                {date}
            </Typography>
        </>
    )
}

export default React.memo(Clock)