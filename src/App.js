import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RequestList from './components/RequestList';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gamsi Bot</Typography>
        </Toolbar>
      </AppBar>
      <RequestList />
    </div>
  );
}

export default App;