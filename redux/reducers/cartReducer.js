import { createReducer } from "@reduxjs/toolkit";

export const cartReducer=createReducer({
    cartItems:[]
},(builder)=>{

    builder.addCase("addToCart",(state,action)=>{
        const item=action.payload;
        const isExistVal=state.cartItems.find(i=>i.product===item.product);

        const existingItemIndex = state.cartItems.findIndex(i => i.product === item.product);
        if (existingItemIndex !== -1) {
            state.cartItems[existingItemIndex].quantity = item.quantity;
        }
      
        if(isExistVal){
         state.cartItems= state.cartItems.filter(i=>i.product===isExistVal.product?item:i)
        }else{
            state.cartItems.push(item);
        }

    }).addCase("removeFromCart",(state,action)=>{
        const id=action.payload;
        state.cartItems=state.cartItems.filter(i=>i.product!==id);

    })
    .addCase("clearCart",(state,action)=>{
        state.cartItems=[];
    });
   

});