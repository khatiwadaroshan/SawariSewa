import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    vehicleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehcile",
        required:true,
    },

    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
     status:{
        type:String,
        enum:["Pending, Accepted","Rejected","Cancelled","Completed"],
        required:true,
     },
     totalAmount:{
        type:Number,
        required:true,
     },
     paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment"
     },

     CitizenshipPhoto:{
        type:String,
        required:true,
     },

     licensePhoto:{
        type:String,
        required:true,
     },
     selfiewithCitizenship:{
        type:String,
        required:true,
     },
     contactNumber:{
        type:Number,
        required:true,
     },
    },
    {


    timestamps:true,
    collection:"bookings",


}
);

const Booking  = new mongoose.model("Booking",bookingSchema);

export default Booking;