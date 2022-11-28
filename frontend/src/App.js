
import Navbar from './components/navigator/navbar';
import Home from './pages/home/home';
import Follow from './pages/follow/Follow'
import Write from './pages/write/Write'
import Login from './pages/login/Login'
import Shop from './pages/shop/Shop'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'
import WrappedRegistrationForm from './pages/login/register'
import SinglePost from './pages/postpage/postpage'
import PostProduct from './components/Product/postProduct';
import Comment from './components/comment/comment';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import SingleIdea from './components/Idea/SingleIdea';
import Product from './components/Product/product';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/follow" element={<Follow />} />
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path="/write" element={<Write />} />
                <Route exact path="/chat" element={<Chat />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path='/register' element={<WrappedRegistrationForm />} />
                <Route exact path='/postpage' element={<SinglePost />} />
                <Route exact path='/profile/:name' element={<Profile />} />
                <Route exact path='/singleidea' element={<SingleIdea />} />
                <Route exact path='/product/:id' element={<Product />} />
                <Route exact path='/postProduct' element={<PostProduct />} />
                <Route exact path='/comment' element={<Comment />} />
            </Routes>
        </Router>
    );
}


export default App;