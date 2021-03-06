const { getUser } = require('../shared/user-utils');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { QueueClient } = require("@azure/storage-queue");
const uuidv1 = require("uuid/v1");

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // // Get the pre-order from the request
  let order = {
    Id: uuidv1(),
    User: user.userDetails,
    Date: new Date(),
    IcecreamId: req.body.id,
    Status: "New",
    DriverId: null,
    FullAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
    LastPosition: null
  }

  // // TODO: add the pre-order JSON document in a queue
  const queueClient = new QueueClient(AZURE_STORAGE_CONNECTION_STRING, "orders");
  console.log("\nAdding messages to the queue...");

  // // Send several messages to the queue
  const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(order));
  
  console.log("Messages added, requestId:", sendMessageResponse.requestId);

  context.res.status(201);
};
 