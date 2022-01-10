function Card(props){
    const classes = props.className+" shadow-lg p-3 rounded bg-light box container"
       return(
           <span className= {classes}>
               {props.children}
            </span>
       )
}

export default Card;