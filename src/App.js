import { useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';
import RequestList from './components/RequestList';

function App() {
  const [login, setLogin] = useState(false);
  const [requests, setRequests] = useState([]);

  const finishSuccessfulLogin = async (jwt, response) => {
    sessionStorage.setItem('jwt', jwt);
    setLogin(true);
    const personalRequests = await response.json();
    setRequests(personalRequests.reverse());
  };

  const deleteRequest = (id, success) => {
    if (!success) {
      alert('존재하지 않는 요청입니다');
    }
    setRequests(requests.filter(request => request.id !== id));
  };

  const finishSuccessfulRequest = request => {
    alert('요청이 정상적으로 수락되었습니다');
    setRequests([request, ...requests]);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gamsi Bot</Typography>
          {login ? null : <Login finishSuccessfulLogin={finishSuccessfulLogin} />}
        </Toolbar>
      </AppBar>
      <RequestList
        requests={requests}
        login={login}
        deleteRequest={deleteRequest}
        finishSuccessfulRequest={finishSuccessfulRequest}
      />
    </div>
  );
}

export default App;