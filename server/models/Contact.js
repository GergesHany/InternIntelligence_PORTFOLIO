const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Anonymous",
        },
        message: {
            type: String,
            required: true,
            maxlength: 1000
        }
    }, 
    {
      timestamps: true, 
    }
)

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;