const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
    .then(res => {
        console.log("connection Successful");
    }).catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wander_lust')
}

app.listen(8080, (req, res) => {
    console.log("working well");
});



//Root ROute
app.get("/", (req, res) => {
    res.send("Hi , i am root")
});

//Index ROute
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({})
    res.render("\listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
    res.render("\listings/new.ejs");
})

//show info of particular place
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("\listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
    // let {title,descrition,image,price,location,country}=req.body;  OR
   const newListing= new Listing(req.body.listing);
  await newListing.save();
   res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("\listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let { id } = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
    });

    //Delete Route
 app.delete("/listings/:id",async(req,res)=>{
    let { id } = req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   res.redirect("/listings");
 })   

// app.get("/testListing",async(req,res)=>{
//     let samplaListing1= new Listing({
//         title:"My home",
//         discription:"by the beach",
//         price:1200,
//         location:"Calangat,Goa",
//         country:"India"
//     });
//     await samplaListing1.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// });

