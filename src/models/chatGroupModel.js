import mongoose from "mongoose"

let Schema = mongoose.Schema

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 177 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  member: [{ userId: String }],
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  editedAt: { type: Number, default: null },
})

module.exports = mongoose.model("chat-group", ChatGroupSchema)
