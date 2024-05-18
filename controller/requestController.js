// requestController.js

// Import any necessary modules, like a database model
const { Order } = require('../model/Order');
const {Request} = require('../model/request'); // assuming you have a Request model

exports.raiseRequest = async (req, res) => {
  try {
    // Extract data from the request body
    const { description, priority,orderId } = req.body;
    const { id } = req.user;

    // Validate the input data
    if (!id || !orderId || !description || !priority) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const requestExists = await Request.findOne({
      orderId,
      $or:[{status:'open'},{status:'pending'}]
    })

    if(requestExists){
      return res.status(402).json({message:'Request is already present'})
    }

    // Create a new request in the database
    const newRequest = await Request.create({
      userId:id,
      orderId,
      description,
      priority,
      status: 'pending', // default status
      createdAt: new Date(),
    });

    // update latestRequest in order
    await Order.findByIdAndUpdate(orderId,{
      "latestRequest":newRequest.id
    });

    // Send a success response
    res.status(201).json({ message: 'Request raised successfully', request: newRequest });
  } catch (error) {
    console.error('Error raising request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOpenRequestByOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { orderId } = req.params;

    // Validate the input data
    if ( !orderId ) {
      return res.status(400).json({ message: 'Order Id is required' });
    }

    const requestFound = await Request.findOne({
      orderId,
      $or:[{status:'open'},{status:'pending'}]
    })

    // Send a success response
    res.status(200).json({ message: 'Requests fetched successfully', request: requestFound });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
