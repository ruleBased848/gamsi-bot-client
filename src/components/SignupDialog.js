import { useRecoilState } from 'recoil';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { signupInfoState } from '../states/signupInfo';
import { signupOpenState } from '../states/signupOpen';

function SignupDialog() {
  const [open, setOpen] = useRecoilState(signupOpenState);
  const [signupInfo, setSignupInfo] = useRecoilState(signupInfoState);

  const handleClose = () => setOpen(false);

  const handleChange = event => setSignupInfo(signupInfo => ({ ...signupInfo, [event.target.name]: event.target.value }));

  const finishSuccessfulSignup = () => {
    setSignupInfo({
      username: '',
      password: '',
      passwordConfirm: '',
    });
    setOpen(false);
    alert('성공적으로 가입했습니다');
  };

  const trySignup = async ({ username, password }) => {
    const response = await fetch(process.env.REACT_APP_SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.ok ? finishSuccessfulSignup() : alert('사용 중인 아이디입니다');
  };

  const handleSignup = () => {
    if (signupInfo.username.trim().length === 0) return alert('아이디는 필수 항목입니다');
    if (signupInfo.password.trim().length === 0) return alert('비밀번호는 필수 항목입니다');
    if (signupInfo.password.length < 8) return alert('비밀번호는 8자 이상이어야 합니다');
    if (!/^[^_\W]+$/.test(signupInfo.password)) return alert('알파벳 대소문자 및 숫자 이외의 문자는 비밀번호에 포함될 수 없습니다');
    if (!/[A-Z]/.test(signupInfo.password)) return alert('비밀번호는 알파벳 대문자를 포함해야 합니다');
    if (!/[a-z]/.test(signupInfo.password)) return alert('비밀번호는 알파벳 소문자를 포함해야 합니다');
    if (!/\d/.test(signupInfo.password)) return alert('비밀번호는 숫자를 포함해야 합니다');
    if (signupInfo.passwordConfirm.trim().length === 0) return alert('비밀번호를 한 번 더 입력해주시기 바랍니다');
    if (signupInfo.password !== signupInfo.passwordConfirm) return alert('비밀번호가 일치하지 않습니다');
    trySignup(signupInfo);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회원가입</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="아이디"
            name="username"
            variant="standard"
            value={signupInfo.username}
            onChange={handleChange}
          />
          <TextField
            label="비밀번호"
            type="password"
            name="password"
            variant="standard"
            value={signupInfo.password}
            onChange={handleChange}
          />
          <TextField
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            variant="standard"
            value={signupInfo.passwordConfirm}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSignup}>회원가입</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignupDialog;