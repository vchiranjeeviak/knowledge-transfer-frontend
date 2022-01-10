import { useEffect, useState } from "react";
import { API } from "../../backend";
import Base from "../UI/Base";
import Card from "../UI/Card";

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        cartItems: [],
        edit: false
    });
    const [postedItems, setPostedItems] = useState([]);
    const [userIdAndToken, setUserIdAndToken] = useState({
        userId: "",
        token: ""
    })

    useEffect(() => {
        let userId = localStorage.getItem('user')
        let token = localStorage.getItem('token')
        setUserIdAndToken({ token: token, userId: userId })
        fetch(API + `/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json().then(data => { setProfile(data) }).catch(e => console.log(e))).catch(e => console.log(e))
    }, [])

    const firstNameChangeHandler = event => {
        setProfile({ ...profile, firstName: event.target.value });
    }

    const lastNameChangeHandler = event => {
        setProfile({ ...profile, lastName: event.target.value });
    }

    const phoneNumberChangeHandler = event => {
        setProfile({ ...profile, phoneNumber: event.target.value });
    }
    const editHandler = event => {
        setProfile({ ...profile, edit: true });
    }


    const submitHandler = event => {
        event.preventDefault();
        return fetch(API + `/user/${userIdAndToken.userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userIdAndToken.token}`
            },
            body: JSON.stringify({
                firstName: profile.firstName,
                lastName: profile.lastName,
                phoneNumber: profile.phoneNumber
            })
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            setProfile({ ...profile, firstName: data.user.firstName, lastName: data.user.lastName, phoneNumber: data.user.phoneNumber, edit: false });
        }).catch(e => console.log(e))).catch(e => console.log(e))
    }

    return (
        <Base>
            {!profile.edit && <div>
                <Card className="list-group list-group-flush signin-card col-sm-6">
                    <h2 className="list-group-item"><div>UserName:</div>{profile.firstName}_{profile.lastName}</h2>
                    <h6 className="list-group-item"><div>E-mail:</div>{profile.email}</h6>
                    <h6 className="list-group-item"><div>phoneNumber:</div> {profile.phoneNumber}</h6>
                    <button className="signup-form-input-button text-white button-shadow col-3" onClick={editHandler}>Edit</button>
                </Card>
            </div>}
            {
                profile.edit && <div>
                    <Card className='signin-card col-sm-7'>
                        <form className="col-md-5 row signup-form" onSubmit={submitHandler}>
                            <div className="signup-form-input">
                                <label htmlFor="firstName" className="form-label"><h5>First Name</h5></label>
                                <input type="text" name="firstName" onChange={firstNameChangeHandler} defaultValue={profile.firstName} className="form-control border border-secondary"></input>
                            </div>
                            <div className="signup-form-input">
                                <label htmlFor="lastName" className="form-label"><h5>Last Name</h5></label>
                                <input type="text" name="lastName" onChange={lastNameChangeHandler} defaultValue={profile.lastName} className="form-control border border-secondary"></input>
                            </div>
                            <div className="signup-form-input">
                                <label htmlFor="email" className="form-label"><h5>Email</h5></label>
                                <input type="email" name="email" value={profile.email} className="form-control border border-secondary" readOnly></input>
                            </div>
                            <div className="signup-form-input">
                                <label htmlFor="phoneNumber" className="form-label"><h5>Phone</h5></label>
                                <input type="tel" name="phoneNumber" onChange={phoneNumberChangeHandler} defaultValue={profile.phoneNumber} className="form-control border border-secondary"></input>
                            </div>
                            <button type="submit" className="btn signup-form-input-button col-6 text-white">Submit</button>
                        </form>
                    </Card>
                </div>
            }
        </Base>
    )
}

export default Profile;