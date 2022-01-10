import { useEffect, useState } from "react";
import Base from "../UI/Base";
import { API } from "../../backend";
import { useNavigate } from 'react-router-dom'
import Card from "../UI/Card";
import isAuthenticated from "./Auth";

function Signin() {
    let navigate = useNavigate();

    if (isAuthenticated()) {
        navigate('/buybooks');
    }
    useEffect(() => navigate('/signin'), []);


    const [values, setValues] = useState({
        email: "",
        password: "",
        error: ""
    });

    const { email, password, error } = values;

    const emailChangeHandler = event => {
        setValues({ ...values, email: event.target.value });
    }
    const passwordChangeHandler = event => {
        setValues({ ...values, password: event.target.value });
    }

    const errorMessage = () => {
        return (<div style={{ display: error ? "" : "none" }}>{
            error
        }
        </div>)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        return fetch(API + '/signin', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            res.json().then(data => {
                if ('error' in data) {
                    setValues({ ...values, error: data.error })
                } else {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', data.user._id);
                    navigate('/buybooks');
                }
            }).catch(e => console.log(e));
        }).catch(e => {
            console.log('outer catch');
        });
    }
    return (
        <Base>
            <Card className="signin-card col-sm-7">
                <div className="row justify-content-md-center">
                    {errorMessage()}
                    <form className="col-md-5 row signup-form" onSubmit={submitHandler}>
                        <div className="signup-form-input">
                            <label htmlFor="email" className="form-label"><h5>Email</h5></label>
                            <input type="email" name="email" onChange={emailChangeHandler} value={email} className="form-control border border-secondary"></input>
                        </div>
                        <div className="signup-form-input">
                            <label htmlFor="password" className="form-label"><h5>password</h5></label>
                            <input type="password" name="password" onChange={passwordChangeHandler} value={password} className="form-control border border-secondary"></input>
                        </div>
                        {error && <div>{error}</div>}
                        <button type="submit" className="btn-gradient signup-form-input-button col-4 text-white">Submit</button>
                    </form>
                </div>
            </Card>
        </Base>
    )
}

export default Signin;