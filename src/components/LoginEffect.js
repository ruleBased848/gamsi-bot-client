import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../states/login';
import { requestsState } from '../states/requests';

function LoginEffect() {
  const setLogin = useSetRecoilState(loginState);
  const setRequests = useSetRecoilState(requestsState);

  const whenLoginSucceeds = useCallback(async response => {
    setLogin(1);
    const personalRequests = await response.json();
    setRequests(personalRequests.reverse());
  }, [setLogin, setRequests]);

  const whenLoginFails = useCallback(() => {
    sessionStorage.removeItem('jwt');
    setLogin(0);
  }, [setLogin]);

  const whenJwtExists = useCallback(async jwt => {
    const response = await fetch(process.env.REACT_APP_REQUEST_ENDPOINT, {
      headers: { Authorization: jwt },
    });
    response.ok ? whenLoginSucceeds(response) : whenLoginFails();
  }, [whenLoginSucceeds, whenLoginFails]);

  const effect = useCallback(() => {
    const jwt = sessionStorage.getItem('jwt');
    return jwt ? whenJwtExists(jwt) : setLogin(0);
  }, [setLogin, whenJwtExists]);

  useEffect(() => {
    effect();
  }, [effect]);
}

export default LoginEffect;