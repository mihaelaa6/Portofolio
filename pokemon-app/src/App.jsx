import './App.css';
import Image from './components/Image';

// If using local images:
import pikachu from './assets/pikachu.jpg';
import Eevee from './assets/Eevee.jpg';
import charmander from './assets/charmander.jpg';
import gengar from './assets/gengar.png';
import raiolu from './assets/raiolu.jpg'
import Luxray from './assets/Luxray.png'
import leafeon from './assets/leafeon.jpg'
import bulbasaur from './assets/bulbasaur.png'


function App() {
  return (
    <div className="container">
      
      <div className="pokemon-grid">
        <h1>Pokemon Characters</h1>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Image src={pikachu} width="150px" />
        <Image src={Eevee} width="150px" />
        <Image src={charmander} width="150px" />
        <Image src={gengar} width="150px" />
        <Image src={raiolu} width="150px" />
        <Image src={Luxray} width="150px" />
        <Image src={leafeon} width="150px" />
        <Image src={bulbasaur} width="150px" />
      </div>
      </div>
      
    </div>
  );
}

export default App;
