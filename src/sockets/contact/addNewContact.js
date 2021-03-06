import { pushSocketIdToArray, emitNotifySocketIdToArray, removeSocketIdToArray } from "../../helpers/socketHelper";

/**
 *
 * @param io from socket.io library
 */
let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    // Push socket id to array
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar,
      };

      // Emit notification
      if (clients[data.contactId]) {
        emitNotifySocketIdToArray(clients, data.contactId, io, "response-add-new-contact", currentUser);
      }
    });

    socket.on("disconnect", () => {
      // Remove socket id when socket disconnect
      clients = removeSocketIdToArray(clients, socket.request.user._id, socket);
    });
  });
};

module.exports = addNewContact;
