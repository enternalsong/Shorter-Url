const ShorterUrl = {
  randomURL(){
      const characterpick = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let randomNum = "";
      //console.log(characterpick[0]);
      for(let i= 0 ; i < 5 ; i++){
        randomNum = randomNum.concat(characterpick[Math.floor(Math.random()*61)]);
      }
      console.log(randomNum);
      return(randomNum);
  },
  checkUrlRepeat(list,url){
    if (typeof (list) !== 'object' || typeof (url) !== 'string') return console.error('type wrong');
    // check url existing
    const urlIndex = list.findIndex(item => item.LongUrl === url)
    // existing 
    if (urlIndex !== -1) return [true, list[urlIndex].shortUrl];
    // no existing 
    console.log('there is no existing');
    return [false, '']
  },
  CreateNoRepeatUrl(list){
    if (typeof (list) !== 'object') return console.error('type wrong');   
    let randomUrl = this.randomURL();
    while(list.some(item=>item.shortUrl === randomUrl)){
      randomUrl = this.randomURL();
    }
      return randomUrl;
    }
}


module.exports = ShorterUrl;