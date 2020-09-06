import loadable from '@loadable/component';
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from 'notistack';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { User } from "./types/Types";
import Cookies from "./utils/Cookies";
import FontsLoader from "./utils/GoogleFontLoader";
import { MainTheme } from "./utils/MaterialUiTheme";
const Guest = loadable(() => import('./guest/Guest'));
const Main = loadable(() => import('./main/Main'));

function App() {
  const [connected, setConnected] = useState(Cookies.get("acessTokenOowlish") != null);
  const [userInfos, setUserInfos] = useState<User | null>(null);


  const handleUponLogin = async (user: User, keepConnected: boolean) => {
    Cookies.set("acessTokenOowlish", user.accessToken, !keepConnected)
    if (user) {
      // context.userInfos = user
      setConnected(true)
    }
  }

  const handleUponLogout = () => {
    Cookies.set("acessTokenOowlish", null)
    window.location.reload()
    setConnected(false)
  }



  return (
    // <ComponentContextProvider value={data}>
    <>
      <MuiThemeProvider theme={MainTheme}>
        <FontsLoader />
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} >
          <Main logout={handleUponLogout} />
          {/* <Guest login={(user) => {
            handleUponLogin(user, true)
          }} /> */}
          {/* {connected ? <Main logout={handleUponLogout} /> : <Guest login={(user) => {
            handleUponLogin(user, true)
          }} />} */}
        </SnackbarProvider>
      </MuiThemeProvider>
    </>
  )
}

export default React.memo(App)
ReactDOM.render(<App />, document.getElementById("root"))
