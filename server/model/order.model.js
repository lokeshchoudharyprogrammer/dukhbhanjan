const mongoose = require("mongoose");



const orderSchema = mongoose.Schema({
  title:{type:"string", required:true},
  price:{type:"Number", required:true},
  image:{type:"string", required:true},
  quantity:{type:"Number",required:true},
  quality:{type:"String", required:true},
UserId:{type:"String", required:true},
  user:{type:"String", required:true}
 },{
    versionKey:false
 });

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel
};
