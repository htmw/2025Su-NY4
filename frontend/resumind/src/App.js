import logo from '../src/ResuMind_Logo.png';
import './App.css';
import CardDeck from './components/CardDeck';
import './styles.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       ResuMind
    //     </p>
    //   </header>
    // </div>
    <div>
      <CardDeck />
    </div>
  );
}

export default App;