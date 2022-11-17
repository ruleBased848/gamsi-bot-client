import { useRecoilValue } from 'recoil';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';
import RequestList from './components/RequestList';
import { loginState } from './states/login';

function App() {
  const login = useRecoilValue(loginState);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gamsi Bot</Typography>
          {login ? null : <Login />}
        </Toolbar>
      </AppBar>
      <RequestList />
    </div>
  );
}

export default App;