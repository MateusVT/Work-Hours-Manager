import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, {
  useContext,
  useEffect, useState
} from 'react';
import { ComponentContext } from '../shared/ComponentContext';
import { User } from '../types/Types';
import Http from './Http';

const LoginHOC = ({ children }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(ComponentContext)
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    async function auth(): Promise<void> {
      Http.get({
        path: `/users?accessToken=${Cookies.get("accessToken")}`,
        onError: (error: string) => {
          console.log(error)
          enqueueSnackbar('Invalid username', { variant: 'error' })
        },
        onSuccess: (users: User[]) => {
          const user = users[0]
          context.user = user
          setLogged(true)
        }
      })
    }
    auth();
  }, []);

  return logged ? children : <></>
}
export default LoginHOC;

