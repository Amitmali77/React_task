
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Demo from './components/Demo';
import UserPosts from './components/Demo';

function App() {
  return (
    <div className="App">
       <h1>User Posts Task </h1>
       <UserPosts />
    </div>
  );
}

export default App;
