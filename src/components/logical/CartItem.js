import { useEffect, useState } from 'react';
import { API } from '../../backend.js';
import Image from './Image.js';

const CartItem = (props) => {
    const [book, setBook] = useState({
        id: "",
        name: "",
        description: "",
        image: "",
        price: ""
    });
    useEffect(() => {
        fetch(API + `/product/${props.id}`)
            .then(res => {
                res.json().then(data => setBook({ id: data._id, name: data.name, description: data.description, price: data.price, image: data.image }))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            {book.image && <Image id={book.id}></Image>}
            <h4>{book.name}</h4>
            <p>{book.description}</p>
            <h5>{book.price}</h5>
        </div>
    )
}

export default CartItem;