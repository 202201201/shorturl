const { getUser } = require( "../service/auth" ); 
 
function checkForAuthentication( req, res, next ) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser( token );
    req.user = user;
    next();
}

// ADMIN,NORMAL
function restrictTo( roles = []) {
    return function ( req, res, next ) {
        if ( !req.user ) return res.redirect( "/login" );
        if ( !roles.includes( req.user.role ) ) return res.end( "Unauthorized" );
        return next();
    }
}
// async function restrictToLoggedUserOnly( req, res, next ) {
//     // const userId = req.cookies?.uid;
//     const userId = req.headers[ "authorization" ];

//     if ( !userId ) return res.redirect( "/login" );
//     const token = userId.split( "Bearer " )[ 1 ]; 
//     const user = getUser( token );
//     // const user = getUser( userId );
    
//     if ( !user ) return res.redirect( "/login" );
//     req.user = user;

//     next();
// }

// async function checkAuth(req,res,next) {
//     // const userId = req.cookies?.uid;
//     const userId = req.headers[ "authorization" ];
//     const token = userId.split( "Bearer " )[ 1 ];
//     const user = getUser( token );
//     // const user = getUser(userId);
//     req.user = user;
//     next();
// }

module.exports = {
//   restrictToLoggedUserOnly,
//   checkAuth,
  restrictTo,
  checkForAuthentication,
 };