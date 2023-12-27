import axios from "axios"
import {CART_PRODUCT_FAILURE, CART_DELETE_PRODUCT_SUCCESS, CART_PRODUCT_REQUEST, CART_GET_PRODUCT_SUCCESS, CART_ADD_PRODUCT_SUCCESS } from "./actionType"

export const addCartProduct = (product) => (dispatch) => {
   console.log("action", product)
   dispatch({ type: CART_PRODUCT_REQUEST })
  return  axios.post("https://wicked-cowboy-hat-pike.cyclic.app/cart/create", product,{
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
 })
      .then((res) => {
         console.log(res.data)
         dispatch({ Type: CART_ADD_PRODUCT_SUCCESS })
      })
      .catch(() => {
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}

export const getCartProduct = () => (dispatch) => {

   dispatch({ type: CART_PRODUCT_REQUEST })
  return axios.get("https://wicked-cowboy-hat-pike.cyclic.app/cart",{
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
       }
   })
      .then((res) => {
         dispatch({ type: CART_GET_PRODUCT_SUCCESS, payload: res.data })
      })
      .catch((err) => {
         console.log(err)
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}


// export const editProduct = (dataobj, id) => (dispatch) => {
//    dispatch({ type: PRODUCT_REQUEST })
//   return axios.patch(`https://wicked-cowboy-hat-pike.cyclic.app/product/${id}`, dataobj)
//       .then((res) => {
//          dispatch({ Type: EDIT_PRODUCT_SUCCESS, payload: res.data })
//       })
//       .catch(() => {
//          dispatch({ type: PRODUCT_FAILURE })
//       })
// }
 
 export const handleCartDelete = (id) => (dispatch) => {
   dispatch({type:CART_PRODUCT_REQUEST})
  return  axios.delete(`https://wicked-cowboy-hat-pike.cyclic.app/cart/delete${id}`)
   .then((res) => {
      dispatch({type:CART_DELETE_PRODUCT_SUCCESS})
   })
   .catch((err)=> {
      dispatch({type:CART_PRODUCT_FAILURE})
   })
 }