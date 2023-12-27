const mongoose = require('mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

let mongoDB = "mongodb://localhost:27017/try_test";

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

mongoose.connect(mongoDB);

// 取得資料庫連線狀態
const db = mongoose.connection;

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
module.exports = db;
// const urlSchema = new mongoose.Schema({
//         LongUrl:{
//             type:String,
//             require:true
//         },
//         ShortUrl : String
// });
// const UrlData = mongoose.model('urll',urlSchema);
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
