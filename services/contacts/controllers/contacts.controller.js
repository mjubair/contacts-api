import Contact from '../models/contact.model.js';

export const list = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json({ status: 'ok', data: contacts });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      email,
      user: req.user.id,
    });
    const response = await contact.save();

    res.status(201).json({
      status: 'ok',
      data: {
        _id: response._id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, email },
      { new: true }
    );

    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', error: 'Contact not found' });
    }

    res.json({
      status: 'ok',
      data: {
        _id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', error: 'Contact not found' });
    }

    res.json({
      status: 'ok',
      data: {
        _id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};
