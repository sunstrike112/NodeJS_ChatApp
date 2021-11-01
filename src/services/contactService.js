import ContactModel from "../models/contactModel";
import UserModel from "../models/userModel";
import _ from "lodash";

let findUsersContact = async (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
    let contactsByUser = await ContactModel.findAllByUser(currentUserId);
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId);
      deprecatedUserIds.push(contact.contactId);
    });

    deprecatedUserIds = _.uniqBy(deprecatedUserIds);
    let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
    resolve(users);
  });
};

let addNew = async (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let contactExists = await ContactModel.checkExists(currentUserId, contactId);
    if (contactExists) {
      return reject(false);
    }

    let newContactItem = {
      userId: currentUserId,
      contactId: contactId,
    };

    let newContact = await ContactModel.create(newContactItem);
    resolve(newContact);
  });
};

let removeRequestContact = async (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
    if (removeReq.result.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
};

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact,
};
