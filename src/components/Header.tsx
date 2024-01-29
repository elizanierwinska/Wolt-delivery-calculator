import './header.css';

function Header() {
  console.log('I am a header');
  return (
    <header className="App-header">
      <img id="logo" src="wolt-logo.png" alt="wolt company logo" />
      <h2 id="title">Delivery fee calculator</h2>
    </header>
  );
}

export default Header;
