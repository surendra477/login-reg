const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
// const data = {
//     type: String,
//     min: [5],
//     required: [true, 'Password required']
//   }
const UserSchema = new Schema({
    username:String,
    password:String,
    phone:Number,
    telephone:Number
}) ;
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);