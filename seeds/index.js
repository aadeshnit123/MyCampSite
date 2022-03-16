const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/MyCampSite');

const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB  = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '620a2fb6762bc653e091f32e',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
           // image:"https://images.unsplash.com/photo-1496559346440-a8e13f897fe6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem debitis facilis iure molestias quod perspiciatis nobis maiores! Doloribus recusandae, sed ipsum quasi inventore, delectus eius, et aliquid omnis dolorem id?',
            price,
            geometry:{
                type: "Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/duf4kus5w/image/upload/v1646739125/MyCampSite/jpjo1emmectaqohyc0my.jpg',
                  filename: 'MyCampSite/gbex7wun2qfnzhljxnip',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});

