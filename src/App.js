import './App.css';
import RequestList from './components/RequestList';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <RequestList />
    </div>
  );
}

export default App;