import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [cartItems,setCartItems]=useState({});
    const [food_list,setFoodList] = useState([])

    // add to cart
    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev => ({...prev,[itemId]:1}));
        } else {

            setCartItems((prev)=>{
                return {
                    ...prev,
                    [itemId]: prev[itemId]+1
                }
            })
        }
    }

    // remove from cart
    const removeFromCart = (itemId) =>{
        setCartItems(prev => {
            const updated = {...prev}
            if(updated[itemId] == 1 ) {
                delete updated[itemId]
            }else{
                updated[itemId] -=1
            }
            return updated            

        })
    }

    // cart total
    const getTotalCartAmount = (item_list) =>{
        let total = 0
        for (const item in cartItems){
            if(cartItems[item] >0){
                let item_info = item_list.find(product => product._id === item)
                total += item_info.price * cartItems[item]
            }
        }
        return total
    }

    // fetch food list
    const fetchFoodList = async () =>{
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.food)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider