import { Contact } from "../Models/Contact.js";

export const getAllContact = async (req, res) => {
  const userContact = await Contact.find();
  if (!userContact) return res.status(404).json({ message: "no Contact find" });
  else res.json({ message: "Contact fetched Successfully", userContact });
};

export const getContactById = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.findById(id);
  if (!userContact) return res.json({ message: "no Contact find" });
  else res.json({ message: "Contact fetched Successfully", userContact });
};

export const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (name == "" || email == "" || phone == "")
    return res.status(400).json({ message: "all field are required" });
  const saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
   user: req.user
  });
  saveContact.save()
  res.json({ message: "contact save Successfully", saveContact });
};
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );

  if (!updateContact)
    return res.status(404).json({ message: "No Contact find" });
  res.json({ message: "Contact Updated Successfully", updateContact });
};
export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const deleteContact = await Contact.findByIdAndDelete(id);

  if (!deleteContact)
    return res.status(404).json({ message: "No Contact find" });
  res.json({ message: "Contact deleted Successfully", deleteContact });
};


export const getContactByUserId=async (req,res)=>{
  const id=req.params.id;
  let contact=await Contact.find({user:id})
  if(!contact) return res.json({message:"not found"})
    res.json({message:"User specific contact",contact})

}