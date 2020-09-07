import { AddBox, ArrowDownward, Clear, DeleteOutline, Edit, ViewColumn } from "@material-ui/icons"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import React from "react"

const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref as any} />),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref as any} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref as any} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref as any} />),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref as any} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref as any} />),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref as any} />),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref as any} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref as any} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref as any} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref as any} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref as any} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref as any} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref as any} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref as any} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref as any} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref as any} />)
}

export default tableIcons