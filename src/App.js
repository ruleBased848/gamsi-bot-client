import './App.css';
import AddRequest from './components/AddRequest';
import LoadingSpinner from './components/LoadingSpinner';
import LoginDialog from './components/LoginDialog';
import LoginEffect from './components/LoginEffect';
import RequestList from './components/RequestList';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <LoadingSpinner />
      <TopBar />
      <AddRequest />
      <RequestList />
      <LoginDialog />
      <LoginEffect />
    </div>
  );
}

export default App;