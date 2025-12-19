import mongoose from "mongoose";
import { Contact } from "../Models/Contact.js";

/* =========================
   GET ALL CONTACTS
========================= */
export const getAllContact = async (req, res) => {
  try {
    const userContact = await Contact.find();

    if (userContact.length === 0) {
      return res.status(404).json({
        message: "No contacts found in database"
      });
    }

    res.json({
      message: "Contacts fetched successfully",
      userContact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================
   GET CONTACT BY ID
========================= */
export const getContactById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid contact ID format"
    });
  }

  try {
    const userContact = await Contact.findById(id);

    if (!userContact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.json({
      message: "Contact fetched successfully",
      userContact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================
   ADD CONTACT
========================= */
export const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email and phone are required"
    });
  }

  try {
    const saveContact = await Contact.create({
      name,
      email,
      phone,
      type,
      user: req.user   // ✅ FIXED
    });

    res.status(201).json({
      message: "Contact created successfully",
      saveContact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================
   UPDATE CONTACT BY ID
========================= */
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid contact ID"
    });
  }

  try {
    const updateContact = await Contact.findOneAndUpdate(
      { _id: id, user: req.user._id },   // ✅ ownership check
      { name, email, phone, type },
      { new: true }
    );

    if (!updateContact) {
      return res.status(404).json({
        message: "Contact not found or unauthorized access"
      });
    }

    res.json({
      message: "Contact updated successfully",
      updateContact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================
   DELETE CONTACT
========================= */
export const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid contact ID"
    });
  }

  try {
    const deleteContact = await Contact.findOneAndDelete({
      _id: id,
      user: req.user._id   // ✅ ownership check
    });

    if (!deleteContact) {
      return res.status(404).json({
        message: "Contact not found or unauthorized access"
      });
    }

    res.json({
      message: "Contact deleted successfully",
      deleteContact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =========================
   GET CONTACTS BY USER ID
========================= */
export const getContactByUserId = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  try {
    const contact = await Contact.find({ user: id });

    if (contact.length === 0) {
      return res.status(404).json({
        message: "No contacts found for this user"
      });
    }

    res.json({
      message: "User-specific contacts fetched successfully",
      contact
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
