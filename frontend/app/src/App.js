import './App.css';
import Login from './componentes/Login'; // Supondo que você tenha esse componente
import Cadastro from './componentes/Cadastro'; // Supondo que você tenha esse componente
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login />;
      case 'cadastro':
        return <Cadastro />;
      default:
        return (
          <div>
            <h1>My Ponto</h1>
            <h3>Seu sistema de ponto</h3>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderPage()}
        {page === 'home' && (
          <div className="buttons-container">
            <button className="btn-app" onClick={() => setPage('login')}>Login</button>
            <button className="btn-app" onClick={() => setPage('cadastro')}>Cadastrar</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
