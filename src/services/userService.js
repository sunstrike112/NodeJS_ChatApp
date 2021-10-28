import UserModel from "../models/userModel";
import { transErrors } from "../../lang/vi";
import bcrypt from "bcrypt";

const saltRounds = 8;

/**
 * Update user information
 * @param {userId} id
 * @param {dataUpdate} item
 */

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

/**
 * Update password user
 * @param {userId} id
 * @param {dataUpdate} dataUpdate
 */
let updatePassword = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    let currentUser = await UserModel.findUserById(id);
    if (!currentUser) {
      reject(transErrors.account_undefined);
    }

    let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
    if (!checkCurrentPassword) {
      reject(transErrors.user_current_password_failed);
    }

    let salt = bcrypt.genSaltSync(saltRounds);
    await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));
    resolve(true);
  });
};

module.exports = {
  updateUser: updateUser,
  updatePassword: updatePassword,
};
