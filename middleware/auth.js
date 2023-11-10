import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** auth middleware */
// const Auth1 = asyncHandler (async (req ,res ,next) => {
//   try {
//     const token = req.header.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
//     req.user = decodedToken;

//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Authentication Failed...!" });
//   }
// });
export default async function Auth(req, res, next) {
  try {
    //access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];
    // retrive the user details for the loggend in user
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed...!" });
  }
}
// export default async function Autha(req, res, next) {
//   try {
//     // access authorize header to validate request
//     const token = req.headers.authorization.split(" ")[1];

//     // retrive the user details fo the logged in user
//     const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

//     req.user = decodedToken;

//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Authentication Failed!" });
//   }
// }

export function localVariables(req, res, next) {
  req.app.locals = {
    OPT: null,
    resetSession: false,
  };
  next();
}

// export {
//   Auth1,
// }
