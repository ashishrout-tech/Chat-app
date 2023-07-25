import Room from './Components/Room';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleRoom from './Components/SingleRoom';
import Navbar from './Components/Navbar';


function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Room />}></Route>
        <Route path="/room/:id" element={<SingleRoom />} />
      </Routes>
    </Router>
  )
}

export default App
