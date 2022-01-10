import { useState } from "react";
import Base from "../UI/Base";
import { API } from '../../backend';
import { Link } from "react-router-dom";
import Card from "../UI/Card";

const Signup = () => {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        error: "",
        success: false
    });


    const { firstName, lastName, email, password, phoneNumber, error, success } = values;

    const firstNameChangeHandler = event => {
        setValues({ ...values, firstName: event.target.value });
    }

    const lastNameChangeHandler = event => {
        setValues({ ...values, lastName: event.target.value });
    }
    const emailChangeHandler = event => {
        setValues({ ...values, email: event.target.value });
    }
    const passwordChangeHandler = event => {
        setValues({ ...values, password: event.target.value });
    }
    const phoneNumberChangeHandler = event => {
        setValues({ ...values, phoneNumber: event.target.value });
    }

    const successMessage = () => {
        return (<div style={{ display: success ? "" : "none" }}>Successfully Registered. Please Login <Link to="/signin">Here</Link>
        </div>)
    }
    const errorMessage = () => {
        return (<div style={{ display: error ? "" : "none" }}>{
            error
        }
        </div>)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false }) 

        return fetch(API + '/signup', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                phoneNumber
            })
        }).then(res => {
            res.json().then(data => {
                if ('error' in data) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        phoneNumber: "",
                        error: "",
                        success: true
                    })
                }
            }).catch(e => {
                setValues({ ...values, error: e.error });
            })
        }).catch(e => {
            console.log('outer catch');
        });
    }

    return (
        <Base>
            <div className="row">
                {successMessage()}
                {errorMessage()}
                <Card className = "col-md-5">

                    <form className="row signup-form" onSubmit={submitHandler}>
                        <div className="signup-form-input" >
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" name="firstName" onChange={firstNameChangeHandler} value={firstName} className="form-control border border-secondary"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" name="lastName" onChange={lastNameChangeHandler} value={lastName} className="form-control border border-secondary"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" onChange={emailChangeHandler} value={email} className="form-control border border-secondary"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="password" className="form-label">password</label>
                        <input type="password" name="password" onChange={passwordChangeHandler} value={password} className="form-control border border-secondary"></input>
                    </div>
                    <div className="signup-form-input">
                        <label htmlFor="phoneNumber" className="form-label">Phone</label>
                        <input type="tel" name="phoneNumber" onChange={phoneNumberChangeHandler} value={phoneNumber} className="form-control border border-secondary"></input>
                    </div>
                    <button type="submit" className="btn-gradient signup-form-input-button font-weight-bold text-white col-4">
                            Submit</button>
                    
                    </form>
                
                </Card>
                
                <Card className="col-md-6 signup-img diagonal-bg">
                </Card>
            
            </div>
        
        </Base>
    )
}

export default Signup;