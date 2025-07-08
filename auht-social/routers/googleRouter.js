import express from 'express'
const Router = express.Router()
const app = express()
import Users from '../modules/usersSC.js'
import tryCatch from '../middleware/tryCatch.js'
import passport  from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import cookie from 'cookie-session'

let userProfile;

//session cookie side
app.use(cookie({
  maxAge: 24*60*60*1000,
  keys:['secret']
}))

app.use(passport.initialize())
app.use(passport.session())


//serialize
passport.serializeUser((user, done) => {
  done(null, user.googleid)
})

passport.serializeUser((id, done) => {
  Users.findOne({googleid: id}).then(data => {
    done(null, data)
  })
})


//check user
passport.use(new GoogleStrategy({
    clientID: '1093096367227-ffiajbtmibm9iufg035bhmlife2a1975.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/api/google/auth/redirect"
  },(accessToken, refreshToken, profile, done) => {
      Users.findOne({googleid: profile.id}).then(data => {
        if(data){
          userProfile = data
          return done(null, data);
        } else {
          const newUser = new Users({
            googleid: profile.id,
            name: profile.displayName
          })
          newUser.save()
          userProfile = newUser
          return done(null, userProfile);
        }
      })
  })
)

//auth with google
Router.get('/auth/google', passport.authenticate('google',
  { scope : ['profile', 'email'] }
))
 
Router.get('/auth/redirect', passport.authenticate('google'),(req, res) => {
  res.redirect('/googleprofile')
})

Router.get('/user-profile', tryCatch(async(req, res) =>{
  res.json(userProfile)
}))

export default Router