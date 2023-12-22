const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(res=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Wander_lust')
    }    

    const intiDB=async()=>{
        try{
            await Listing.deleteMany({});
         await Listing.insertMany(initData.data);
         console.log("data was initialized");
        }
        catch(error) {
            console.error("Error initializing data:", error);
          }
        
    };

    intiDB();