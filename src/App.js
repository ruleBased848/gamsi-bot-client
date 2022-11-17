import './App.css';
import AddRequest from './components/AddRequest';
import RequestList from './components/RequestList';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <AddRequest />
      <RequestList />
    </div>
  );
}

export default App;