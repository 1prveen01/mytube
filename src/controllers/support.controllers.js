import { apiResponse } from "../../utils/apiResponse.js";
import { SupportMessage } from "../models/support.model.js";



 const submitSupportMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB
    const newMessage = new SupportMessage({ name, email, message });
    await newMessage.save();

    // Response
    return res.status(201).json(new apiResponse(
        201, null , "Message Submitted Successfully"
    ));
  } catch (error) {
    console.error("Error saving support message:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

export {submitSupportMessage};