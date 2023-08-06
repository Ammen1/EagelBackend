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
    return res.status(404).send({ error: "Authentication Error" });
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
      return res.status(400).send({ error: "Please use a unique username" });
    }

    // Check if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique Email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return res.status(201).send({ msg: "User Register Successfully" });
  } catch (error) {
    // Handle any errors that occurred during the registration process
    return res.status(500).send({ error: "Failed to register user" });
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
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:5000/api/users/user/amenabush */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username });

    if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

    // Remove password from the user object
    const { password, ...userData } = user.toJSON();

    return res.status(201).send(userData);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT: http://localhost:5000/api/users/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // Update the data using UserModel.findByIdAndUpdate()
      await UserModel.findByIdAndUpdate(userId, body);

      return res.status(201).send({ msg: "Record Updated...!" });
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
    // Generate a random OTP of 6 digits
    const OTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Store the generated OTP in the app.locals so it can be accessed later
    req.app.locals.OTP = OTP;

    // Send the OTP as a response in JSON format
    res.status(201).send({ code: OTP });
  } catch (error) {
    // Handle any errors that might occur during OTP generation
    res.status(500).send({ error: "Failed to generate OTP" });
  }
}

/** GET: http://localhost:5000/api/users/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:5000/api/users/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:5000/api/users/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

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
                  req.app.locals.resetSession = false; // reset session
                  return res.status(201).send({ msg: "Record Updated...!" });
                }
              );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
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
