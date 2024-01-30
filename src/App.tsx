import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DeliveryFee from './components/DeliveryFee';

function App() {
  return (
    <div className="body">
      <Header />
      <div id="container">
        <DeliveryFee />
      </div>
      <Footer />
    </div>
  );
}

export default App;
