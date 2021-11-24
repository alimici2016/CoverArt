import { useSelector } from "react-redux";

function Wishlist () {

   const apiMovie =  useSelector(store => store.singleSearchMovie)

   return(
   <h3>{apiMovie.title}</h3>
   )
}

export default Wishlist;