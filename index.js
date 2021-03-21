const express = require('express');
const mongoose = require('mongoose');
const key = require('./config/key');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
require('./models/Servey');
const cookieSession = require('cookie-session');
const passport = require('passport')

mongoose.connect(key.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
).catch(error => console.log(error));

const app = express();

app.use(bodyParser.json())

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [key.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());





require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
 

if (process.env.NODE_ENV === 'production') {
    //  Express will serve up production assets like our main.js files,
    // or main.css files !
 
    app.use(express.static('client/build'));

    //Express will serve up the index.html files if it doesn't 
    // recognize the router !
 
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

// if (process.env.NODE_ENV === "production"){
//     app.use(express.static("build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//     });
//   }


const PROT = process.env.PORT || 5000
app.listen(PROT)



