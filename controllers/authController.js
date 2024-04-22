import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail, generateVerificationCode } from "./Functions/VerificationCodeFunctions.js";

//user registration
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      role: req.body.role,
      is_email_verified: false,
      email_verification_code: verificationCode,
      accountType: req.body.accountType,
    });

    await sendVerificationEmail(req.body.email, verificationCode);
    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error });
  }
};

// Controller to verify user account using verification code
export const verifyAccount = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email address",
      });
    }

    if (user.email_verification_code !== verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
      });
    }

    user.is_email_verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to verify account",
    });
  }
};


//user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    //if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //if user exist check or compare the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    //create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "successfully login",
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
