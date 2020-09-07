import { createMuiTheme } from "@material-ui/core"


const MainTheme = createMuiTheme({

    spacing: 5,
    palette: {
        primary: {
            main: "#e6e6e6"
        }
    },

    overrides: {
        MuiDrawer: {
            paper:
            {
                position: "unset"
            }
        },
        MuiButton: {
            label: {
                fontWeight: "normal"
            }
        }
    }
})



export { MainTheme }

