// const sessionIDToUserMap = new Map();
const jwt = require( "jsonwebtoken" );
const secret = "Zeel@21";
// function setUser( id, user ) {
//     sessionIDToUserMap.set( id, user );
// }
function setUser( user ) {
    return jwt.sign( {
        _id: user._id,
        email:user.email
    }, secret );
}

// function getUser( id ) {
//     return sessionIDToUserMap.get( id );
// }
function getUser( token ) {
    if ( !token ) return null;
    try {
        return jwt.verify( token, secret );
    }
    catch ( err )
    {
        return null; 
    }
}

module.exports = { setUser, getUser };