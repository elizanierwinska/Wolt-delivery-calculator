import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CartValue from './components/CartValue';
import DeliveryDistance from './components/DeliveryDistance';
import AmountOfItems from './components/AmountOfItems';

function App() {
  return (
    <div className="App">
      <Header />
      <div id="container">
        <CartValue />
        <DeliveryDistance />
        <AmountOfItems />
      </div>
      <Footer />
    </div>
  );
}

export default App;
