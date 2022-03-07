const express = require('express');
const logger = require('morgan'); // HTTP request logger middleware for node js


const cookieParser = require('cookie-parser') // To parse the cookies

const session = require('express-session'); // This one for session 


const db = require('./database/mongodbConn');
const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');



const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

/**
 * express.json() is a body parser for post request except html post form and
 * 
 * express.urlencoded({extended: false}) is a body parser for html post form to JSON
 */


/**
 * 
 * app.use(express.urlencoded({ extended: true}))
 * 
 * extended[boolean]: This option allows to choose between parsing the URL-encoded
 * data with the querystring library (when false) or
 * the qs library (when true). 
 * 
 * The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format,
 * allowing for a JSON-like experience with URL-encoded
 */



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * To parse cookies 
 */

app.use(cookieParser());


/**
 * secret: A random unique string key used to authenticate a session.
 * It is stored in an environment variable and can’t be exposed to the public.
 * The key is usually long and randomly generated in a production environment.
 * 
 * resave: takes a Boolean value. 
 * 
 * It enables the session to be stored back to the session store, even if the session was never modified during the request.
 * This can result in a race situation in case a client makes two parallel requests to the server.
 * Thus modification made on the session of the first request may be overwritten when the second request ends.
 * The default value is true. However, this may change at some point. false is a better alternative.
 * 
 * saveUninitialized: this allows any uninitialized session to be sent to the store.
 * When a session is created but not modified, it is referred to as uninitialized.
 * 
 * 
 * cookie: { maxAge: oneDay } - this sets the cookie expiry time.
 * The browser will delete the cookie after the set duration elapses.
 * The cookie will not be attached to any of the requests in the future.
 * In this case, we’ve set the maxAge to a single day as computed by the following arithmetic.
 * 
 */

 // To initialize the session, we will set the session middleware


 const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "1lPKzKlvT1JTSTNKyA7TfwT6Um&hVJ4Aq08xl7deMimU8c6CORF",
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    },
    resave: false 
}));


app.use(function(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});



http://localhost:3000/users/123/todo

app.use('/users', usersRouter);
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
    console.log(req.session);
    res.send('Hello World!')
});


/**
 * 
 */

app.post('/login', (req ,res) => {
    const {username, password} = req.body;
    if(username === 'amar' && password === '123'){

        const session = req.session;
        // get user details from backend.

        session.userDetails = {
            name: 'amar',
            address: 'bangalore'
        };

        console.log(session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    } else {
        res.send('Invalid username or password');
    }
})

app.get('/session', (req, res) => {
    const session = req.session;
    console.log(session);
    res.json(session.userDetails);
})

app.get('/logout', (req,res) => {
    Object.keys(req.cookies).forEach(key => {
        res.clearCookie(key);
    })
    req.session.destroy();
    res.json({
        messsage: 'Log out'
    }); 
});
/**
 * 
 */


app.get('/setcookie', (req, res) => {
    res.setHeader('Set-Cookie','visited=true; Max-Age=3000; HttpOnly, Secure');
    res.cookie('testView', true);
    res.send('Cookie have been saved successfully');
});
app.get('/getcookie', (req, res) => {
    console.log(req)
    res.send(req.cookies);
});



/**
 * 
 *  sameSite was initially set to none (sameSite = None). This allowed third parties to track users across sites
 * 
 * Currently, it is set to Lax (sameSite = Lax) meaning a cookie is only set when the domain in the URL of the 
 * browser matches the domain of the cookie, thus eliminating third party’s domains.
 * 
 * 
 * sameSite can also be set to Strict (sameSite = Strict). This will restrict cross-site sharing even between 
 * different domains that the same publisher owns.
 * 
 * https://www.section.io/engineering-education/what-are-cookies-nodejs/
 * 
 */

app.get('/setsecurecookie', (req, res) => {
    res.cookie(`Manual-cookies`,`someTestValue`, {
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date(),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});

app.get('/deletecookie', (req, res) => {
    Object.keys(req.cookies).forEach(key => {
        res.clearCookie(key);
    })
    res.send('Cookie has been deleted successfully');
    res.end();
});










app.post('/test', function(req,res) {
    // Without `express.json()`, `req.body` is undefined.
    console.log(req.body);
    const data = { ...req.query };
    Object.assign(data, req.body);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});




















// https://masteringjs.io/express
