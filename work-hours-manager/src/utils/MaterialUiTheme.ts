import { createMuiTheme } from "@material-ui/core"


const MainTheme = createMuiTheme({

    spacing: 5,
    palette: {
        primary: {
            main: "#e6e6e6"
        }
    },
    typography: {
        fontFamily: 'Playfair Display, sans-serif',
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
                fontFamily: "Playfair Display, sans-serif",
                fontWeight: "normal"

            }
        }
    }
})



export { MainTheme }

