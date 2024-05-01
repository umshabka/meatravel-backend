import User from "../models/User.js";
import TravelAgentEmailVerificationFunction from "./Functions/TravelAgentEmailVerificationFunction.js";
import { sendVerificationEmail, generateVerificationCode } from "./Functions/VerificationCodeFunctions.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

//Update User
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.accountType === 'TravelAgent' &&
      user.travelAgent_Verification == false &&
      req.body.travelAgent_Verification == 'true'
    ) TravelAgentEmailVerificationFunction(user.email)
    console.log('User:', user.travelAgent_Verification);
    console.log('req.body.travelAgent_Verification:', req.body.travelAgent_Verification);


    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

//Delete User
export const daleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

//Get Single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Found Successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//Get All Users
export const getAllUser = async (req, res) => {
  //   // for pagination
  //   const page = parseInt(req.query.page);

  try {
    const users = await User.find({});
    //   .skip(page * 8)
    //   .limit(8);

    res.status(200).json({
      success: true,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

// Controller to send verification code to a user's email
export const sendVerificationCodeByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email address",
      });
    }

    const verificationCode = generateVerificationCode();
    user.email_verification_code = verificationCode;
    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
};

// Controller to change user password
export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    // Update the user's password
    user.password = hash;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};