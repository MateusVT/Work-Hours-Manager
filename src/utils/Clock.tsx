import { Box, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useMemo, useState } from "react"
import { useInterval } from "react-use"
import { now } from "../utils/Moment"

function Clock() {

    const moment = () => now().local()
    const currentDate = useMemo(() => moment().format("dddd, DD [de] MMMM [de] YYYY"), [moment().dayOfYear()])
    const [date, setDate] = useState(currentDate)
    const [time, setTime] = useState(moment().format("HH:mm:ss"))

    useEffect(() => setDate(currentDate), [currentDate])
    useInterval(() => setTime(moment().format("HH:mm:ss")), 1000)

    return (
        <Box alignItems="center" display="flex" height={64} marginBottom={1} width="100%">

            <Box marginLeft="auto" marginTop={4}>
                <Box textAlign="right">
                    <Typography style={{ color: "white", letterSpacing: "0.25rem" }} variant="h3">
                        {time}
                    </Typography>
                    <Typography style={{ color: "white" }} variant="subtitle1">
                        {date}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(Clock)