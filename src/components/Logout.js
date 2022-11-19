import { useResetRecoilState, useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { loginState } from '../states/login';
import { requestState } from '../states/request';
import { requestsState } from '../states/requests';
import { userState } from '../states/user';

function Logout() {
  const setLogin = useSetRecoilState(loginState);
  const resetRequest = useResetRecoilState(requestState);
  const resetRequests = useResetRecoilState(requestsState);
  const resetUser = useResetRecoilState(userState);

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setLogin(0);
    resetRequest();
    resetRequests();
    resetUser();
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
    </div>
  );
}

export default Logout;