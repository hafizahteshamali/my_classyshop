import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action)=>{
            state.items = action.payload.items || []
        },
        addItem: (state, action)=>{
            const existingItem = state.items.find((item)=>item.product === action.payload.product);
            if(existingItem){
                existingItem.quantity += action.payload.quantity;
            }else{
                state.items.push(action.payload)
            }
        },
        increaseQty: (state, action)=>{
            const item = state.items.find((i)=>i.product === action.payload);
            if(item){
                item.quantity += 1;
            }
        },
        decreaseQty: (state, action)=>{
            const item = state.items.find((i)=>i.product === action.payload);
            if(item && item.quantity > 1){
                item.quantity -= 1
            }
        },
        removeItem: (state, action) =>{
            state.items = state.items.filter((item)=>item.product !== action.payload);
        },
        clearCart: (state) =>{
            state.items = []
        }
    }
})

export const {setCart, addItem, increaseQty, decreaseQty, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;