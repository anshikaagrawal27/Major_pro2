const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{
       type: String,
        required:true
    },
    description:String,
    image:{
        type:String,
        // default:
        // "https://pixabay.com/photos/flowers-petals-flower-head-orange-8334774/",
        // set:(v)=>
        // v===""? 
        // "https://pixabay.com/photos/flowers-petals-flower-head-orange-8334774/" : v,      //ternary operator
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;