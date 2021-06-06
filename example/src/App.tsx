import './App.css';
import {RouterOutlet} from 'react-auth-router';
import routes from './routes';

function App() {
  return (
    <div className="App">
        <RouterOutlet routes={routes} />
    </div>
  );
}

export default App;
