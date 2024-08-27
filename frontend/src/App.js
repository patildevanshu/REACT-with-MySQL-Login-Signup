import Login from './Login';
import Signup from './Signup';
// import Home from './Home';
import Student from './pages/Student';
import Admin from './pages/Admin';
import Organizer from './pages/Organizer';
import Coordinator from './pages/Coordinator';
import Teacher from './pages/Teacher';
import {BrowserRouter , Routes , Route } from  'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Login/>} > </Route>
       <Route path='/signup' element={<Signup/>} > </Route>
       <Route path='/student' element={<Student/>} > </Route>
       <Route path='/admin' element={<Admin/>} > </Route>
       <Route path='/organizer' element={<Organizer/>} > </Route>
       <Route path='/coordinator' element={<Coordinator/>} > </Route>
       <Route path='/teacher' element={<Teacher/>} > </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
