import {createSlice} from "@reduxjs/toolkit";

export const CartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:[],
    },

    reducers:{
        addToCart:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            //checking if the item is present in cart
            //if it is present then increase quantity of the itme by 1

            if(itemPresent){
                itemPresent.quantity++;
            }else{//if item not present, then add it to the cart, and initialize quantity to 1
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart:(state,action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;
        },

        incrementQuantity:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            itemPresent.quantity++;
        },

        decrementQuantity:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);//check if item is present
            
            //item quanity is 1, make it zero
            if(itemPresent.quantity == 1){
                itemPresent.quantity = 0;
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            }else{//if quantity is more than 1, decrese by 1
                itemPresent.quantity--;
            }
        },
        cleanCart:(state) => {
            state.cart = [];
        }
    },
});

export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity, cleanCart} = CartSlice.actions;

export default CartSlice.reducer;
