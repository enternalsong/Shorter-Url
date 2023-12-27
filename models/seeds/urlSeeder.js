const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const Url = require('../schema')
const UrlShorter = require('../../public/javascript/randomURL')
const originalUrls = [
  { LongUrl: 'https://www.google.com/' },
  { LongUrl: 'https://enternalsong.github.io/personal_webwall/' },
  { LongUrl: 'https://www.wikipedia.org/' },
  { LongUrl: 'https://leetcode.com/studyplan/top-sql-50/' },
  { LongUrl: 'https://www.plurk.com/' },
  { LongUrl: 'https://www.youtube.com/' }
]

db.once('open', () => {
  console.log('[seeder]mongodb connected!')
  originalUrls.forEach(item => {
    item.ShortUrl=UrlShorter.randomURL();
    console.log(item);
  })
  originalUrls.forEach(item => Url.create(item))
  console.log('[seeder]done!')
})