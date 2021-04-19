import mongoose from "mongoose"

const cardSchema = mongoose.Schema({
    name:String,
    imagUrl:String
})

export default mongoose.model("cards", cardSchema)