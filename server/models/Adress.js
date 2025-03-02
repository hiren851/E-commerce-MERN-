const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId : String , 
    address : String,
    city : String ,
    state : String ,
    country : String ,
    pincode : String ,
    phone : String ,
    notes : String
},{timestamps: true});

module.exports = mongoose.model("Address" , AddressSchema);