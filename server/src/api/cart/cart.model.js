const mongoose = require('mongoose');
const jwt = require("../../libs/jwToken")

const Schema = mongoose.Schema;
var ItemSchema = new Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: [1, 'Minimum qty is 1']
  },
  name : {
    type: String,
    required: true,
  },
  price : {
    type: Number,
    required: true,
  }
});

const CartSchema = new Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  items: [ItemSchema],  
}, {timestamps : true});

CartSchema.statics = {
  
    async get(id) {
      const cart = await this.findById(id).exec()
      return cart
    },
    async getWithProducts(id) {
      const cartProducts = await this.aggregate([
          {$match : {"_id" : mongoose.Types.ObjectId(id)}},
          {
          $lookup:{
                from: "products",
                localField: "items._id",
                foreignField: "_id",
                as: "productInfo"
            }
       }
      ])
      return cartProducts[0]
    }
};
module.exports = mongoose.model('cart', CartSchema);
