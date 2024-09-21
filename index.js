const express = require( "express" );
const path = require( "path" );
const { connectMongoDB } = require( "./connection" );
const URL = require( './models/url' );
// const { restrictToLoggedUserOnly, checkAuth } = require("./middlewares/auth");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const cookieParser = require( "cookie-parser" );

const urlRoute = require( "./routes/url" );
const staticRoute = require( "./routes/staticRouter" );
const userRoute = require( "./routes/user" );

const app = express();
const PORT = 8001;

connectMongoDB( "mongodb://localhost:27017/short-url" )
    .then( () => {console.log( "MongoDB Connected" );} )
    .catch( ( err ) => console.log( "Error Detect ", err ) );
    
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );   
app.use( checkForAuthentication() );

// app.use("/user",userRoute);
// app.use("/", checkAuth, staticRoute);
// app.use("/url", restrictToLoggedUserOnly, urlRoute);

app.use("/user",userRoute);
app.use("/",  staticRoute);
app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);

app.set( "View engine", "ejs" );
app.set( "views", path.resolve( "./views" ) );



// app.get( "/test", async ( req, res ) => {
//     const allUrls = await URL.find( {} );
//     return res.render( "home.ejs", {
//         urls: allUrls,
//         name:"Zeel"
//     } );
// })



app.get( "/url/:shortid", async ( req, res ) => {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate( { shortid }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    } );
    res.redirect( entry.redirectURL );
} );

app.listen( PORT, () => console.log( `Server Started at PORT : 
${PORT}` ) );