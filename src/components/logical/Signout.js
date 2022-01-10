//import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
function Signout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return (<Signin />);
}

export default Signout;