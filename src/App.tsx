import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CartValue from './components/CartValue';

function App() {
  return (
    <div className="body">
      <Header />
      <div id="container">
        <CartValue />
      </div>
      <Footer />
    </div>
  );
}

export default App;
