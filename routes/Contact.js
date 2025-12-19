import express from "express";

const router = express.Router();

import {
  getAllContact,
  getContactById,
  updateContactById,
  addContact,
  deleteContact,
  getContactByUserId
} from "../controllers/Contact.js";
import { Authenticate } from "../Middlewares/Auth.js";

// get all Contact
router.get("/", getAllContact);

// get contact by id
router.get("/:id", getContactById);

// add Contact

router.post("/add", Authenticate, addContact);

// update contact

router.put("/:id", Authenticate, updateContactById);

// delete contact
router.delete("/:id", Authenticate, deleteContact);

router.get("/userId/:id",getContactByUserId);

export default router;
