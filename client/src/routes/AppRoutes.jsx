import { BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

function App(){
    return (


        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element = {<Login />}/>
            </Routes>
        </Router>
    )}

