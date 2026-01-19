import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    name:String,
    description:String,
    host:String,
    type:String,
    latitude:Number,
    longitude:Number,
    timeUpto:Number
})

const Event = mongoose.models.events || mongoose.model("events",eventSchema);

export default Event 