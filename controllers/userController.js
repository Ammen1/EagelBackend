import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Errror" });
  }
}

/** POST: http://localhost:5000/api/users/register
 * @param : {
 *   "username" : "amenabush",
 *   "password" : "admin123",
 *   "email": "example@gmail.com",
 *   "firstName" : "Amen",
 *   "lastName": "Abush",
 *   "mobile": 0944365493,
 *   "address" : "Addis Ethiopia,
 *   "profile": ""
 * }
 */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    // Check if the username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .send({ error: "Please use a unique username this already taken" });
    }

    //Chck if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ error: "Please use a unique Email this Email has been Taken" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create new user and save it to database
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });
    // save the user to data base
    await newUser.save();
    // Return the succes respone
    res.status(201).send({ mgs: "User Register SuccesFully" });
  } catch (error) {
    res.status(500).send({ error: "Not Register try again " });
  }
}

/** POST: http://localhost:5000/api/users/login 
 * @param: {
  "username" : "amenabush",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username }).then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck)
            return res.status(400).send({ error: "Don't Have Password" });

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            ENV.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );
          return res.status(200).send({
            mgs: "Login Successful...! ",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          return res.status(400).send({ error: "Password does not Match" });
        });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:5000/api/users/user/amenabush */
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) return res.status(501).send({ error: "Invslid Username" });
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(501).send({ error: "Couldn't find the User" });
    // remove password from the user object
    const { password, ...userData } = user.toJSON();
    return res.status(201).send(userData);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT:http://localhost:5000/api/users/updateuser 
 * @param: {
  "header": '<token>'
 }
 body: {
  firstName: '',
  address: '',
  profile: ''
 }
  */
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const body = req.user;
      await UserModel.findByIdAndUpdate(userId, body);
      return res.status(201).send({ mgs: "Record Updated...!" });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:5000/api/users/generateOTP */
export async function generateOTP(req, res) {
  try {
    // Generate a random OTP OF 6 digits
    const OTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // Store the generated OTP in the app.locals so it can accessed later
    req.app.locals.OTP = OTP;
    // Send teh OTP as a response in JSON format
    res.status(201).send({ code: OTP });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate OTP" });
  }
}

/** GET: http://localhost:5000/api/users/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = NULL;
    req.app.locals.resetPassword = true;
    return res.status(201).send({ mgs: "Verify SuccessFully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:5000/api/users/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(201).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:5000/api/users/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(404).send({ error: "Session expired!" });
    const { username, password } = req.body;
    try {
      UserModel.findOne({ username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              UserModel.updateOne(
                { username: user.username },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  req.app.locals.resetSession = false;
                  return res.status(201).send({ msg: "Resord Udated...!" });
                }
              );
            })
            .catch((e) => {
              return res
                .status(500)
                .send({ error: "Enable to hashed password" });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Username not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
