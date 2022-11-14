import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function Login({ finishSuccessfulLogin }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = event => setUser({ ...user, [event.target.name]: event.target.value });

  const tryLoginSecondPhase = async jwt => {
    const response = await fetch(process.env.REACT_APP_REQUEST_ENDPOINT, {
      headers: { Authorization: jwt },
    });
    return response.ok ? finishSuccessfulLogin(jwt, response) : alert('아이디 또는 비밀번호를 잘못 입력했습니다');
  };

  const tryLogin = async user => {
    const response = await fetch(process.env.REACT_APP_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const jwt = response.headers.get('Authorization');
    return jwt ? tryLoginSecondPhase(jwt) : alert('아이디 또는 비밀번호를 잘못 입력했습니다');
  };

  const handleLogin = () => {
    if (user.username.trim().length === 0) return alert('아이디는 필수 항목입니다');
    if (user.password.trim().length === 0) return alert('비밀번호는 필수 항목입니다');
    tryLogin(user);
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <Button color="inherit" onClick={handleClickOpen}>로그인</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>로그인</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="아이디"
              name="username"
              variant="standard"
              value={user.username}
              onChange={handleChange}
            />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              variant="standard"
              value={user.password}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          <Button onClick={handleLogin}>로그인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;