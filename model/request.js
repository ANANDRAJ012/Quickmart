const mongoose = require('mongoose');
const {Schema} = mongoose;


const requestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref:"User" },
  orderId: { type: Schema.Types.ObjectId, required: true, ref:"Order" },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: 'pending', enum:['open','pending','closed'] },
  createdAt: { type: Date, default: Date.now() },
})

exports.Request = mongoose.model('Request',requestSchema)