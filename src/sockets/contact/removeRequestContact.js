import { pushSocketIdToArray, emitNotifySocketIdToArray, removeSocketIdToArray } from "../../helpers/socketHelper";

/**
 *
 * @param io from socket.io library
 */
let removeRequestContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    // Push socket to array
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("remove-request-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
      };

      // Emit notification
      if (clients[data.contactId]) {
        emitNotifySocketIdToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser);
      }
    });

    socket.on("disconnect", () => {
      // Remove socket id when socket disconnect
      clients = removeSocketIdToArray(clients, socket.request.user._id, socket);
    });
  });
};

module.exports = removeRequestContact;
