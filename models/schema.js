const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
        LongUrl:{
            type:String,
            require:true
        },
        ShortUrl : String
});
module.exports = mongoose.model('Urll',urlSchema);
//const UrlData = mongoose.model('urll',urlSchema);

// const newUrl = new UrlData({
//     LongUrl: "https://abdfsafasfjfasdo.com"
// });
// newUrl.save().then(()=>{
//     console.log("successful!!!")
// }).catch((err)=>{
//     console.log(err);
// }).finally(()=>{
//     mongoose.disconnect();
// })
