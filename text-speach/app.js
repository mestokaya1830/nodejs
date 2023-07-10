//install dep = sudo apt-get install festival festvox-kallpc16k
const say = require('say')
const text = 'Hello guys! my name is Mesto'

//not sported on linux
// say.export(text, "voice_kal_diphone", 0.75, './guys.vaw', function(err) {
//   if(!err){
//     console.log('Done')
//   }
//   console.log(err)
// })

say.speak(text, 'Alex', 0.5)