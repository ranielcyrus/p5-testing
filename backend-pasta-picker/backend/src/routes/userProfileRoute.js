import express from 'express'
import user_model from '../models/userModel.js';
import hashedPassword from '../utils/hashPassword.js';

const router = express.Router();

//edit user
router.patch('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const userDetailsToUpdate = req.body;
    try {
      const userProfile = await user_model.findOne({ _id: id });
  
      // Check if user is not found
      if (!userProfile) {
          return res.status(404).json({
              message: 'User not found',
          });
      }
  
      // Check if username is already existing
      if(userDetailsToUpdate.username) {
        const existingUser = await user_model.findOne({username: userDetailsToUpdate.username})
        if(existingUser){
          return res.status(400).json({ message: 'error: username is already taken!'})
        }
      }
  
      // Check if a new password is provided and hash it
      if (userDetailsToUpdate.password) {
        userDetailsToUpdate.password = hashedPassword(userDetailsToUpdate.password);
      }
  
      const updateSuccess = await user_model.findByIdAndUpdate(id, userDetailsToUpdate);
  
      if (updateSuccess) {
          res.status(200).json(updateSuccess);
      } else {
      res.status(404).json({ message: "update unsuccessful"});
      }
    } catch (error) {
      // Handle any other errors
      console.error(error);
      return res.status(500).json({
          message: 'Something went wrong',
      });
    }
  })

export default router