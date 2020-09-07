import loadable from '@loadable/component';
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from 'notistack';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComponentContextData, ComponentContextProvider } from './shared/ComponentContext';
import { User } from "./types/Types";
import Cookies from "./utils/Cookies";
import FontsLoader from "./utils/GoogleFontLoader";
import LoginHOC from './utils/LoginHOC';



import { MainTheme } from "./utils/MaterialUiTheme";
const Guest = loadable(() => import('./guest/Guest'));
const GuestTest = loadable(() => import('./guest/GuestTest'));
const Home = loadable(() => import('./main/home/Home'));
const HomeTest = loadable(() => import('./main/home/HomeTest'));

function App() {
  const [connected, setConnected] = useState(Cookies.get("accessToken") != null);
  const [data, setData] = useState<Partial<ComponentContextData>>({})


  function handleUponLogin(user: User, keepConnected: boolean) {
    Cookies.set("accessToken", user.accessToken, !keepConnected)
    if (user) {
      setConnected(true)
    }
  }
  function handleUponLogout() {
    Cookies.set("accessToken", null)
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
              <LoginHOC >
                {/* <Home logout={handleUponLogout} /> */}
                <HomeTest logout={handleUponLogout} />
              </LoginHOC>
              : <GuestTest login={(user) => {
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
