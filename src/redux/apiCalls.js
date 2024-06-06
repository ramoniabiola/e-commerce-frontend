import { loginFailure, loginStart, loginSuccess,
addUserStart, addUserSuccess, addUserFailure, logout, fetchUserCartOnLogin } from "./userRedux";
import { addProductToCart, removeFromCart,fetchUserCartFailure, fetchUserCartStart, fetchUserCartSuccess, clearCart } from "./cartRedux";
import { publicRequest, userRequest } from "../requestMethod";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
 

 //// USER AUTHORIZATION AND AUTHENTICATION SECTION -------------------------------------------------------------------

//  "Login" CUSTOMIZED HOOK
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  
    const login = async (dispatch, user) => {
        dispatch(loginStart());
        setIsLoading(true);
    
        try {
            const response = await userRequest.post("/auth/login", user);
            if (response.status >= 200 && response.status < 300) {
                dispatch(loginSuccess(response.data));
                setError(null);
                setIsLoading(false);
                navigate('/');
                const userId = response.data._id;

                 // FETCH USER-CART ACTION    
                dispatch(fetchUserCartOnLogin(userId))
            } else { 
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Something went wrong...');
            }
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || error.message); 
            setIsLoading(false);
            dispatch(loginFailure(error.response?.data?.error || error.message))
        }      
     };
    
    return { login, error, isLoading };
};




// "Logout"  HOOK 
export const useLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // Dispatch logout and clear cart-store action 
        dispatch(logout());
        dispatch(clearCart());

        // Clear local storage
        localStorage.removeItem('user'); // Clear user data
        localStorage.removeItem('cart'); // Clear cart data
    };

    return { handleLogout };
};



// "Add User" CUSTOMIZED HOOK
export const useAddUser = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    const addUser = async (user, dispatch) => {
       dispatch(addUserStart());
       setIsLoading(true)


        try {
            const response = await publicRequest.post("/auth/register", user);
            if (response.status >= 200 && response.status < 300) {
                dispatch(addUserSuccess(response.data));
                setError(null);
                setIsLoading(false)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
                navigate('/');
    


            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            dispatch(addUserFailure(error.response.data.error))
            setIsLoading(false)
        }      
    }

    return { addUser, error, success, isLoading };
}




//// CRUD OPERATIONS FOR CART  -------------------------------------------------------------------


// "Remove product from cart" CUSTOMIZED HOOK

export const useRemoveProductFromCart = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [isLoading, setIsLoading] = useState(false)



    const removeProductFromCart = async (uuid, dispatch) => {
        setIsLoading(true);
        setSuccess(false); // Clear success state
     
        try {
            const response = await userRequest.delete(`/carts/${uuid}`);
            if (response.status >= 200 && response.status < 300) {
                dispatch(removeFromCart({ uuid }));
                setError(null);
                setIsLoading(false);
                setSuccess(response.data);
                setTimeout(() => setSuccess(false), 4000); // Hide success message after 4 seconds
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            setTimeout(() => setError(null), 8000); // Hide error message after 8 seconds
            dispatch(addUserFailure(error.response.data.error));
            setIsLoading(false);
         }
    };
    

    return { removeProductFromCart, error, success, isLoading };
}



// "Add product to cart"  HOOK
export const useAddProductToCart = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const productToCart = async (cartProduct, dispatch) => {
        setIsLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await userRequest.post("/carts", cartProduct);
            if (response.status >= 200 && response.status < 300) {   
                // Extract only the newly added product
                const newProduct = response.data.products[response.data.products.length - 1];
                dispatch(addProductToCart({ product: newProduct }));
                setError(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 4000);
            } else {
                throw new Error(response.data?.error || 'Something went wrong...');
            }
        } catch (error) {
            console.error("Error response:", error.response); // Debug log
            setError(error.response?.data?.error || error.message);
            setTimeout(() => setError(null), 8000);
            dispatch(addUserFailure(error.response?.data?.error || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return { productToCart, error, success, isLoading };
}




// "Fetch user cart item" CUSTOMIZED HOOK
export const useFetchUserCart = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)


    const fetchUserCart = async (userId, dispatch) => {
        dispatch(fetchUserCartStart());
        setIsLoading(true)

        try {
            const response = await userRequest.get(`/carts/find/${userId}`);
            if (response.status >= 200 && response.status < 300) {
                dispatch(fetchUserCartSuccess(response.data));
                setError(null);
                setIsLoading(false);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            setTimeout(() => setError(null), 8000); // Hide error message after 8 seconds
            dispatch(fetchUserCartFailure(error.response.data.error));
            setIsLoading(false);
            
        }
    };

    return { fetchUserCart, error, isLoading };

}

