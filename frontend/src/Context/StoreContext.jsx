import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{


    const [cartItems,setCartItems]=useState({});

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

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContextProvider