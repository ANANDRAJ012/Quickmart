const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  
  fullName: { type: String, required: true,
  },
  email: { type: String, required: true,
  },
  message: { type: String, required: true,
  },
  status: { type: String, default: 'pending', enum:['open','pending','closed'] },
  createdAt: { type: Date, default: Date.now,
  },
});


exports.ContactRequest = mongoose.model('ContactRequest', contactRequestSchema)