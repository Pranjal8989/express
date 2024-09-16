const http = require("http");
const expressAsyncHandler = require('express-async-handler');
const userModel = require('../model/userModel')

// const getUser = async (req, res) => {
//   try{
//   // set the status code, and content-type
//   res.writeHead(200, { "Content-Type": "application/json" });
//   // send the data
//   res.end(JSON.stringify(users));}
//   catch(e){
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Error fetching users" }));
//   }
// };

const getUser = expressAsyncHandler(async(req ,res) => {
const results = await userModel.getAllUsers();
res.status(200).json(results);
});

const getUserById = expressAsyncHandler(async(req,res) => {
const userId = req.params.id;
const results  = await userModel.getUserById(userId);
if (!results) {
  res.status(404).json({ error: 'User not found' });
  return;
}
res.status(200).json(results);
});

const deleteUser = expressAsyncHandler(async(req,res) => {
  const userId = req.params.id;
  const results = await userModel.deleteUser(userId);
  console.log(results)
  if(!results){
    return res.status(404).json({error : "something went wrong"});
  }  
  res.status(200).json({ message: "user delete successful "});

});

const updateUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id; // Ensure 'id' matches the route parameter
  const userData = req.body;

  // Await the result of the updateUser function
  const result = await userModel.updateUser(userId, userData);

  if (!result) {
      return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json({ message: 'User updated successfully', result });
});

const createUser = expressAsyncHandler(async(req,res) => {
const userData = req.body;
const result = userModel.createUser(userData);
if(!result) {
  res.status(404).json({error : "something went wrong"});
}
res.status(200).json({message:"user inserted successfully"});

});

module.exports = {
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  createUser
};
