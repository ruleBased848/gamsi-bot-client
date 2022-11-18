import './App.css';
import AddRequest from './components/AddRequest';
import LoginDialog from './components/LoginDialog';
import RequestList from './components/RequestList';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <AddRequest />
      <RequestList />
      <LoginDialog />
    </div>
  );
}

export default App;