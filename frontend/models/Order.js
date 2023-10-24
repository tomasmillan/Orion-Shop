import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items: [
    {
      title: String,
      unit_price: Number,
      quantity: Number,
    }
  ],
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);