import Header from "./Header";
import Footer from "./Footer";
import { Fragment } from "react/cjs/react.production.min";
import '../../global.css';

const Base = (props) => {
    return (
        <Fragment>
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </Fragment>
    );
}

export default Base;