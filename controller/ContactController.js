const { ContactRequest } = require('../model/ContactRequest');

exports.submitContactForm = async (req, res) => {
  const { fullName, email, message } = req.body;

  // Validate form fields
  if (!fullName || !email || !message) {
    return res.status(400).send('Please fill in all required fields.');
  }

  try {
    // Create a new contact request in the database
    const newContactRequest = await ContactRequest.create({
      fullName,
      email,
      message,
      status: 'pending',
      createdAt: new Date(),
    });

    // Send a success response
    res.status(201).json({ message: 'Contact request submitted successfully', request: newContactRequest });
  } catch (error) {
    console.error('Error submitting contact request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOpenRequests = async (req, res) => {
  try {
    const openRequests = await ContactRequest.find({ status: 'pending' });
    res.status(200).json({ message: 'Open requests fetched successfully', requests: openRequests });
  } catch (error) {
    console.error('Error fetching open requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
