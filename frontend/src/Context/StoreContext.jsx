import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([])

    // add to cart
    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }))
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { Authorization: `Bearer ${token}` } })
        }
    }

    // remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            const updated = { ...prev }
            if (updated[itemId] == 1) {
                delete updated[itemId]
            } else {
                updated[itemId] -= 1
            }
            return updated

        })
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { Authorization: `Bearer ${token}` } })
        }
    }

    // cart total
    const foodMap = Object.fromEntries(
        food_list.map(item => [item._id, item])
    )
    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, qty]) => {
            const item = foodMap[id]
            return total + (item ? item.price * qty : 0)
        }, 0)
    }

    // fetch food list
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.food)
    }
    const loadCart = async (token) => {
        const response = await axios.get(
            `${url}/api/cart/get`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                setToken(storedToken);
                await loadCart(storedToken);
            }
        }

        loadData();
    }, []);

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