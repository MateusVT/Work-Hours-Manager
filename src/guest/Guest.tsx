import React, { useContext, useState } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { ComponentContext } from '../shared/ComponentContext';
import CustomInput from '../shared/CustomInput';
import { User } from '../types/Types';
import OwlParticle from './OwlParticle';
import Http from '../utils/Http';

type Props = {
    login: (user: User, keepConnected: boolean) => void
}

const Guest: React.FC<Props> = ({ login }) => {

    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComponentContext);



    function Header() {
        return <>
            <Typography variant="h4" style={{ textAlign: "center", lineHeight: "3rem", fontWeight: "bold", color: "white", fontFamily: 'Playfair Display, sans-serif' }}>
                {"Welcome collaborator!"}
            </Typography>
            <Typography variant="h6" style={{ textAlign: "center", marginTop: "1%", color: "white" }}>
                {"We will help you to manage and register your workday."}<br />
            </Typography>
        </>
    }

    function AuthInputs(props: Props) {
        const [username, setUsername] = useState<string>("");
        const [password, setPassword] = useState<string>("");
        const { login } = props

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

        return <>
            <Box display="flex" flex={2} flexDirection="column" justifyContent="space-around">
                <CustomInput
                    id={"username"}
                    label="Username"
                    key={"username"}
                    required
                    value={username}
                    name={"username"}
                    onChange={(_, value) => { setUsername(value) }}
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
                    onChange={(_, value) => {
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
                        width: "85%",
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
        </>
    }

    return (
        <Box component={'div'} display="flex" flex={1} height="100%" width="100%"
            style={{
                backgroundColor: "#04010e", overflow: "hidden"
            }}>
            <Container maxWidth="sm" component={'div'}>
                <Box display="flex" height="100%" width="100%" flex={1} flexDirection="column" marginBottom={10}>
                    <Box display="flex" flexDirection="column" flex={2} justifyContent="center" textAlign="center">
                        <Header />
                        <Box display="flex" flex={1} flexDirection="row" position="relative">
                            <OwlParticle />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flex={3} textAlign="center">
                        <Box display="flex" flex={1} flexDirection="column" justifyContent="space-around" marginBottom={30} padding={1}>
                            <AuthInputs login={login} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Guest