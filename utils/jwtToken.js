// const sendToken = (user, statusCode, res, destroyToken = false) => {
//   // Create Jwt token
//   const token = user ? user.getJwtToken() : "";

//   // Options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   // Set cookie
//   if (destroyToken) {
//     options.expires = new Date(0); // Expire immediately
//     options.httpOnly = true;

//     console.log("destroyed");
//     res.cookie("token", "", options);
//   } else {
//     console.log("created");
//     res.cookie("token", token, options);
//   }

//   res.status(statusCode).json({
//     success: true,
//     token: user ? token : null,
//     user: user ? user : null,
//   });
// };

// module.exports = sendToken;


const sendToken = (user, statusCode, res) => {

  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
      expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
  }
  res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
      user
  })
}
module.exports = sendToken;