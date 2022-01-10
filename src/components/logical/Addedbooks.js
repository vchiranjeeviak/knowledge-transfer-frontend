import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import Base from "../UI/Base"
import Image from "./Image";

const Addedbooks = () => {
    let navigate = useNavigate();
    const [addedBooks, setAddedBooks] = useState([]);
    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    useEffect(() => {
        let isMounted = true;
        fetch(API + `/product/postedUser/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error("Cant get added books")
            }
            if (isMounted) setAddedBooks(data);
        }).catch(e => console.log(e))).catch(e => console.log(e))
        return () => { isMounted = false; }
    }, [addedBooks, token, userId])

    const addBookHandler = event => {
        navigate('/sellbooks');
    }

    const removeHandler = item => {
        fetch(API + `/product/${item._id}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json().then(data => {
            if (data.error) {
                throw new Error(data.error)
            }
            setAddedBooks(addedBooks.filter(book => book._id !== item._id))
        }).catch(e => console.log(e))).catch(e => console.log(e))
    }

    return (
        <Base>
            <button className="cardbutton text-white button-shadow col-sm-3" onClick={addBookHandler}>Add more books</button>
            <div className="between-header-footer rowc row grid ">
                {addedBooks.length > 0 && addedBooks.map(book =>
                    <div className='card text-center button-shadow column' key={book.description + book.price} >
                        {book.image && <Image id={book._id}></Image>}
                        <h4>{book.name}</h4>
                        <h5>{book.description}</h5>
                        <h5>{book.price}</h5>
                        <button className="cardbutton text-white button-shadow" onClick={() => removeHandler(book)}>Remove</button>
                    </div>)}
            </div>
            {addedBooks.length === 0 && <h2>You haven't added any books yet</h2>}
        </Base>
    )
}

export default Addedbooks;