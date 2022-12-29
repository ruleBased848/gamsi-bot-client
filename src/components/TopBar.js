import { useRecoilValue } from 'recoil';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginAndSignup from './LoginAndSignup';
import Logout from './Logout';
import { loginState } from '../states/login';

function TopBar() {
  const login = useRecoilValue(loginState);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Gamsi Bot</Typography>
        {login === 1 ? <Logout /> : <LoginAndSignup />}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;