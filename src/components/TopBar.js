import { useRecoilValue } from 'recoil';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login';
import { loginState } from '../states/login';

function TopBar() {
  const login = useRecoilValue(loginState);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Gamsi Bot</Typography>
        {login ? null : <Login />}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;