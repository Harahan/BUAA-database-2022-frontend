
import Navbar from './components/navigator/navbar';
import Home from './pages/home/home';
import Follow from './pages/follow/Follow'
import Write from './pages/write/Write'
import Login from './pages/login/Login'
import WrappedRegistrationForm from './pages/login/register'
import SinglePost from './pages/postpage/postpage'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/follow" element={<Follow />} />
                <Route exact path="/write" element={<Write />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path='/register' element={<WrappedRegistrationForm/>} />
                <Route exact path='/postpage' element={<SinglePost/>} />
            </Routes>
        </Router>
    );
}


export default App;