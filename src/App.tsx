import loadable from '@loadable/component';
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { User, ActivityRecord } from "./types/Types";
import Cookies from "./utils/Cookies";
import FontsLoader from "./utils/GoogleFontLoader";
import { MainTheme } from "./utils/MaterialUiTheme";
import { ComponentContextProvider, ComponentContextData, ComponentContext } from './shared/ComponentContext';
import Http from './utils/Http';
import { nowLocale } from './utils/Moment';
const Guest = loadable(() => import('./guest/Guest'));
const Home = loadable(() => import('./main/Home'));

function App() {
  const [connected, setConnected] = useState(Cookies.get("accessTokenOowlish") != null);
  const [userInfos, setUserInfos] = useState<User | null>(null);
  const [data, setData] = useState<Partial<ComponentContextData>>({})
  // const { enqueueSnackbar } = useSnackbar();
  // const context = useContext(ComponentContext)

  // useEffect(() => {
  //   const accessToken = Cookies.get("accessTokenOowlish")
  //   if (accessToken != null) {
  //     handleLogin(accessToken)
  //   }
  // }, [])

  // function handleLogin(accessToken: string) {
  //   Http.get({
  //     path: `/users?accessToken=${accessToken}`,
  //     onError: (error: string) => {
  //       console.log(error)
  //     },
  //     onSuccess: (users: User[]) => {
  //       const user = users[0]
  //       console.log(user)
  //       Http.get({
  //         path: `/work-records?userId=${user.id}&date=${nowLocale().format("YYYY/MM/DD")}`,
  //         onError: (error: string) => {
  //           console.log(error)
  //         },
  //         onSuccess: (activities: ActivityRecord[]) => {
  //           // context.user = user
  //           // context.workRecords = activities
  //           // enqueueSnackbar('Welcome ' + user.name + '!', { variant: 'success' })
  //         }
  //       })
  //     }
  //   })

  // }

  function handleUponLogin(user: User, keepConnected: boolean) {
    Cookies.set("accessTokenOowlish", user.accessToken, !keepConnected)
    if (user) {
      setConnected(true)
    }
  }
  function handleUponLogout() {
    Cookies.set("accessTokenOowlish", null)
    window.location.reload()
    setConnected(false)
  }

  return (
    <>
      <ComponentContextProvider value={data}>
        <MuiThemeProvider theme={MainTheme}>
          <FontsLoader />
          <CssBaseline />
          <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
            {connected ?
              <Home logout={handleUponLogout} />
              : <Guest login={(user) => {
                handleUponLogin(user, true)
              }} />}
          </SnackbarProvider>
        </MuiThemeProvider>
      </ComponentContextProvider>
    </>
  )
}

export default React.memo(App)
ReactDOM.render(<App />, document.getElementById("root"))
