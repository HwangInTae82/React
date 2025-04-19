import './App.css'
import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <div>
      <ProfileCard name="황인태" age={26} isOnline={true} />
      <ProfileCard name="함가연" age={27} isOnline={false} />
    </div>
  );
}

export default App;
