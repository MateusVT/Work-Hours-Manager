import React, { useState, useContext } from 'react'
import { Box, Container, Typography, Paper, Grid, Button } from '@material-ui/core'
import CustomInput from '../shared/CustomInput';
import { useSnackbar } from 'notistack';
import { ComponentContext } from '../shared/ComponentContext';
import Http from '../utils/Http';
import { User } from '../types/Types';
import Cookies from 'js-cookie';

type Props = {
    login: (user: User, keepConnected: boolean)=>void
}

const GuestTest: React.FC<Props> = ({login}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComponentContext);

    function handleLogin(accessToken?: string) {
        if (username.trim().length > 0 && password.trim().length > 0) {

            Http.get({
                path: accessToken ? `/users?accessToken=${Cookies.get("accessToken")}` : `/users?username=${username}&password=${password}`,
                onError: (error: string) => {
                    console.log(error)
                    enqueueSnackbar('Invalid username', { variant: 'error' })
                },
                onSuccess: (users: User[]) => {
                    const user = users[0]
                    login(user, true)
                    context.user = user
                    enqueueSnackbar('Welcome ' + user.name + '!', { variant: 'success' })
                }
            })
        }
    }

    return (
        <Box component={'div'} display="flex" flex={1} height="100%" width="100%" bgcolor="black"
            style={{
                backgroundImage: 'url(/imgs/guest-background.jpg)', 
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <Container maxWidth="sm" component={'div'}>
                <Box display="flex" height="100%" width="100%" flex={1}  flexDirection="column" marginBottom={20}>
                    <Box display="flex" flexDirection="column" flex={2} justifyContent="center" textAlign="center">
                        <Typography style={{ textAlign: "center", marginTop: "3%", lineHeight: "3rem", fontSize: 32, fontWeight: "bold", color: "white", fontFamily: 'Playfair Display, sans-serif' }}>
                            {"Welcome collaborator!"}
                        </Typography>
                        <Typography style={{ textAlign: "center", marginTop: "1%", fontSize: 18, color: "white" }}>
                            {"We will help you to manage and register your workday."}<br />
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" flex={3} textAlign="center">
                        <Box component={Paper} display="flex" flex={1} flexDirection="column" justifyContent="space-around" marginBottom={30} padding={1}>
                            <Box display="flex" flex={1} flexDirection="row" alignItems="center" justifyContent="center">
                                <Typography style={{ fontSize: '2rem', textAlign: "center", fontWeight: "bold", color: "black" }}>
                                    {"Access Panel"}
                                </Typography>
                            </Box>
                            <Box display="flex" flex={2} flexDirection="column" justifyContent="space-around">
                                <CustomInput
                                    id={"username"}
                                    label="Username"
                                    key={"username"}
                                    required
                                    value={username}
                                    name={"username"}
                                    onChange={(attribute, value) => { setUsername(value) }}
                                    maxLength={100}
                                    inputType={"string"}
                                    variant="outlined"
                                    style={{ display: "flex", margin: "auto" }}
                                />
                                <CustomInput
                                    id={"password"}
                                    key={"password"}
                                    label="Password"
                                    required
                                    value={password}
                                    name={"password"}
                                    type={"password"}
                                    onChange={(attribute, value) => {
                                        setPassword(value)
                                    }}
                                    maxLength={100}
                                    inputType={"string"}
                                    variant="outlined"
                                    style={{ display: "flex", margin: "auto" }}
                                    inputProps={{
                                        onKeyPress: (event: any) => {
                                            if (event.key === 'Enter' && password != null && password.trim().length > 0) {
                                                handleLogin();
                                            }
                                        }
                                    }}
                                />
                            </Box>
                            <Box display="flex" flex={1} flexDirection="row" alignItems="center" justifyContent="center">
                                <Button color="primary"
                                    style={{
                                        fontSize: 20,
                                        borderRadius: "5px", 
                                        width: "80%",
                                        padding: 15
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                        handleLogin()
                                    }}
                                >
                                    {"Log In"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default GuestTest