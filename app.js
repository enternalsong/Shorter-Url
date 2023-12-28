const express = require('express');
const mongoose = require('mongoose')
const Url = require('./models/schema');
const { engine } = require('express-handlebars');
const UrlShroter = require('./public/javascript/randomURL');

require('./config/mongoose');

//require('./models/seeds/urlSeeder')
console.log(UrlShroter );
const app = express();
const port = 3000;
app.engine('.hbs',engine({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine','.hbs');
app.set('views','./views');
let saveLink = {};
app.use(express.urlencoded({ extended: true }));
// 將 request 導入路由器

app.use(express.static('public'));
console.log("hello world");
app.listen(port,()=>{
    console.log("server is listening");
})
app.get('/' , (req,res)=>{
    res.render('index');
})
app.post('/shortUrl',(req,res)=>{
    const originalUrl = req.body.inputURL;
    let shortUrl = "";
    //console.log(req.body);
    import('url-exist').then(module => {
        const urlExist = module.default;
        console.log(urlExist);
    urlExist(originalUrl)
          .then(exists => {
            console.log(`URL exists: ${exists}`);
            // url-exist check the url whenever it is exist if url is exist 
            if(exists){
                console.log(originalUrl);
                Url.find().lean().then(urls=>{
                 const IsUrlRepeat = UrlShroter.checkUrlRepeat(urls,originalUrl)
                 if(IsUrlRepeat[0]){
                    shortUrl = IsUrlRepeat[1];
                    console.log(shortUrl);
                    console.log(`it is exisint in database`);
                    res.render('index', { url_msg: shortUrl});
                 }
                else{
                    console.log('db no exisiting');
                    shortUrl = UrlShroter.CreateNoRepeatUrl(urls);
                    console.log(`shortUrl is ${shortUrl}`);
                    const newUrl = new Url({
                        LongUrl:originalUrl,
                        ShortUrl:shortUrl,
                    })
                    newUrl.save().then(()=>{
                    console.log("successful!!!")
                    res.render('index', { url_msg: shortUrl});             
                    }).catch((err)=>{
                        console.log(err);
                    }).finally(()=>{
                        mongoose.disconnect();
                    })
                        }
                })
                //save shortUrl in local Data Storage

                // shortUrl = `${UrlShroter.randomURL()}`;
                // console.log(`shortUrl: ${shortUrl}`);
                // saveLink[shortUrl] = originalUrl; 
                // console.log(saveLink);
            }
            else{
                console.log(`this url is not exist`);
                error_msg = `this url is not exist`;
                res.json({error_msg});
            }
          })
          .catch(error => {
            console.error(error);
          });
      }).catch(error => {
        console.error(error);
      });
});
app.get('/:shortLink',(req,res)=>{
    //local 端
    // const shortLink = req.params.shortLink;
    // const originalLink = saveLink[shortLink];
    // if(originalLink){
    //     res.redirect(originalLink);
    // }
    // else{
    //     res.status(404).send('NotFound');
    // }
    // database 
    const shortLink = req.params.shortLink;
    Url.find().lean().then(urls=>{
        const findIndex = urls.findIndex(item=> item.ShortUrl === shortLink);
        console.log(findIndex);
        if (findIndex !== -1)
        {
            let longLink = urls[findIndex].LongUrl;
            res.redirect(longLink);
        }
        else{
            res.status(404).send('NotFound');
        }
    })
})