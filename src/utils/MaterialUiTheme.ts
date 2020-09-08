import { createMuiTheme } from "@material-ui/core"


const MainTheme = createMuiTheme({

    spacing: 5,
    palette: {
        primary: {
            main: "#e6e6e6"
        }
    },

    overrides: {
        // MuiFormHelperText: {
        //     // root: {
        //     //     WebkitBoxShadow: "0 0 0 1000px green inset",
        //     //     color: "red"
        //     // }
        // },
        MuiInputLabel: {
            root: {
                color: "white",
                borderColor: "white"
            },
            outlined: { color: "white" },
            formControl: {
                color: "white"
            },
            shrink: {
                color: "white"
            }
        },
        MuiTextField: {

            root: {
                color: "white",
                borderColor: "white",
                "& .MuiOutlinedInput-root": {
                    color: "white"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    color: "white"
                },
            }

        },
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

