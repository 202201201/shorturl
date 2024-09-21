const { v4: uuidv4 } = require( "uuid" );
const User = require( "../models/user" );
const {setUser,getUser } = require( "../service/auth" );

async function handleUserSignUp( req, res ) {
    const {name,email,password} = req.body;
    await User.create( { name, email, password, } );
    return res.redirect( "/" );
}

async function handleUserLogIn( req, res ) {
    const {email,password} = req.body;
    const user = await User.findOne( { email, password } );
    if ( !user )
    {
        return res.render( "login.ejs", {
            error: "Invalid Username Or Password"
        } );
    }
    // const sessionID = uuidv4();
    // setUser( sessionID, user );
    const token=setUser( user );
    // res.cookie( 'uid', sessionID );
    res.cookie( 'token', token);
    // return res.redirect( "/" );
    // res.json( { token:token } );
    return res.redirect( "/" );
}

module.exports = { handleUserSignUp, handleUserLogIn };