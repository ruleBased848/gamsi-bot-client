import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { loginOpenState } from '../states/loginOpen';

function Login() {
  const setOpen = useSetRecoilState(loginOpenState);

  const handleClickOpen = () => setOpen(true);

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button color="inherit" onClick={handleClickOpen}>로그인</Button>
    </div>
  );
}

export default Login;