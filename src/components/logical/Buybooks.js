import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../backend";
import Base from "../UI/Base";
import isAuthenticated from "./Auth";
import Card from "../UI/Card";
import Image from "./Image";

const Buybooks = () => {
    let navigate = useNavigate();
    const [books, setBooks] = useState([{
        id: "",
        name: "",
        description: "",
        price: "",
        image: "",
        postedUser: "",
        addedToCart: false
    }]);

    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        let isMounted = true;
        if (searchTerm === "") {
            fetch(API + `/product/search/0`, {
                method: 'GET'
            }).then(res => res.json().then(data => {
                let booksArr = data.products.map(product => { product.addedToCart = false; return product })
                if (isMounted) setBooks(booksArr);
            }).catch(e => console.log(e))).catch(e => console.log(e))
        }
        else {
            fetch(API + `/product/search/${searchTerm}`, {
                method: 'GET'
            }).then(res => res.json().then(data => { if (isMounted) setBooks(data.products) }).catch(e => console.log(e))).catch(e => console.log(e))
        }
        return () => { isMounted = false; }
    }, [searchTerm]);

    const searchTermHandler = event => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }
    const addToCartHandler = (book) => {
        if (isAuthenticated()) {
            fetch(API + `/user/${userId}/${book._id}/0`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json().then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }
                let otherBooks = books.filter(eachBook => eachBook._id !== book._id);
                book.addedToCart = true;
                setBooks([...otherBooks, book]);
            }).catch(e => console.log(e))).catch(e => console.log(e))
        }
        else {
            navigate('/signin');
        }
    }
    return (
        <Base>
            <Card className="search-card col-sm-4 container">
                <form>
                    <input className="form-control border border-secondary rounded input-lg"
                        placeholder="Search Books..." type='text' name="searchTerm" value={searchTerm}
                        onChange={searchTermHandler}></input>
                </form>
            </Card>
           
            <div className="between-header-footer rowc row grid">
                {books && books.map(book => <div key={book.description + book.price + Math.random()}>
                    <div className='card text-center button-shadow column'>
                        {book.image && <Image id={book._id}></Image>}
                        <h4>{book.name}</h4>
                        <p>{book.description}</p>
                        <h5>{book.price}</h5>
                        {!book.addedToCart && <button className="cardbutton text-white button-shadow" onClick={() => addToCartHandler(book)}>Add to cart</button>}
                        {book.addedToCart && <span>Added to cart</span>}
                    </div>
                </div>)}
            </div>
            
        </Base>
    )


}

export default Buybooks;
