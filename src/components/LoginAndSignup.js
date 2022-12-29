import { useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { loginOpenState } from '../states/loginOpen';
import { signupOpenState } from '../states/signupOpen';

function LoginAndSignup() {
  const setLoginOpen = useSetRecoilState(loginOpenState);
  const setSignupOpen = useSetRecoilState(signupOpenState);

  const handleLoginOpen = () => setLoginOpen(true);

  const handleSignupOpen = () => setSignupOpen(true);

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button color="inherit" onClick={handleLoginOpen}>로그인</Button>
      <Button color="inherit" onClick={handleSignupOpen}>회원가입</Button>
    </div>
  );
}

export default LoginAndSignup;