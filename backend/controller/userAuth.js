import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import Otp from "../models/otpVerification.js";
import { GenerateMail } from "../services/Nodemailer.js";
import { findUser, findUserWithEmail } from "../services/User.js";
import Workspace from "../models/workSpaceModal.js";
import jwt from "jsonwebtoken";

// create  and send token
const successresponse = async (res, statusCode, data) => {
  let token = await Jwt.sign(
    { id: data._id, email: data.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXP_JWT,
    }
  );
  console.log(token);
  res.status(statusCode).json({
    status: "success",
    data,
    token,
  });
};

// send error response
const errorResponse = async (res, statusCode, error) => {
  res.status(statusCode).json({
    status: "fail",
    error,
  });
};

// user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await findUserWithEmail(email);
    console.log(newUser);
    if (!newUser) return errorResponse(res, 401, "user doesnot exist");
    const comparePassword = await bcrypt.compare(password, newUser.password);
    if (!comparePassword) return errorResponse(res, 401, "incorrect password");
    const workspace = await Workspace.findOne({ Lead: newUser._id });
    console.log({ workspace });
    const data = {
      user: {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
        plan: newUser.Plan,
        block: newUser.block,
        memberOf: newUser.memberOf,
      },
      workspace: newUser.memberOf,
      _id: newUser._id,
    };
    successresponse(res, 200, data);
  } catch (err) {
    errorResponse(res, 401, `error ${err}`);
  }
};

// user signup
export const signup = async (req, res) => {
  const { email, password, name, mobile } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email,
    name,
    password: bcryptPassword,
    mobile,
  });
  try {
    await newUser.save();
    successresponse(res, 201, newUser);
  } catch (error) {
    errorResponse(res, 404, error);
  }
};

// generate otp
export const sendEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log(otp);
  try {
    // const Otps = new Otp({ email, otp })
    // const user = await User.findOne({ email })
    const [Otps, user] = await Promise.all([
      Otp({ email, otp }),
      User.findOne({ email }),
    ]);
    if (user) return errorResponse(res, 406, "already have an account");
    GenerateMail(email, otp);
    // successresponse(res, 201, { email })
    res.status(200).json({
      status: "success",
    });
    Otps.save();
  } catch (error) {
    errorResponse(res, 404, error);
  }
};

// email otp verification
export const emailVerifiction = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;
    const bcryptPassword = await bcrypt.hash(password, 12);
    const emailOtp = await Otp.find({ email });
    if (!emailOtp.length) return errorResponse(res, 401, "invalid otp");
    let length = emailOtp.length;
    if (!(otp == emailOtp[length - 1].otp))
      return errorResponse(res, 401, "invalid otp");
    // const user = await User.create();
    const user = new User({ name, email, password: bcryptPassword });
    successresponse(res, 200, user);
    user.save();
    await Otp.deleteMany({ email });
  } catch (error) {
    errorResponse(res, 404, error);
  }
};

// forgot password
export const generateOtpForOtpLogin = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await findUser(email);
    if (!user) return errorResponse(res, 406, "user not found");
    const otp = otpGenerator.generate(5, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp);
    const Otps = new Otp({ email, otp });
    GenerateMail(email, otp);
    res.status(200).json({ status: "success" });
    Otps.save();
  } catch (error) {
    errorResponse(res, 404, `${error}`);
  }
};

// verify otp for otp login
export const verifyOtp = async (req, res) => {
  try {
    console.time("main");
    console.log(req.body);
    const { otp, email } = req.body;
    const [emailOtp, user] = await Promise.all([
      Otp.find({ email }),
      findUser(email),
    ]);
    console.log({ emailOtp, user });
    if (!emailOtp.length) return errorResponse(res, 401, "invalid otp");
    let length = emailOtp.length;
    if (!(otp == emailOtp[length - 1].otp))
      return errorResponse(res, 401, "invalid otp");
    console.timeEnd("main");
    successresponse(res, 200, user);
    await Otp.deleteMany({ email });
  } catch (error) {
    errorResponse(res, 404, `${error}`);
  }
};

// get user Details
export const userDetails = async (req, res) => {
  try {
    console.log({ details: req.headers.authorization });
    const decode = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    console.log({ decode });
    const response = await Workspace.findOne({ Lead: decode.id });
    successresponse(res, 200, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, 404, `${error}`);
  }
};
