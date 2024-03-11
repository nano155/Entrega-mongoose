import { messageModel } from "./models/messages.js";



export class MessageService {

    static async addMessage (user){
        try {
            const userMessage = await messageModel.create(user)
            return userMessage
        } catch (error) {
            throw error
        }
    }

    static async getMessage (){
        try {
            const usersMessage = await messageModel.find()
            return usersMessage     
        } catch (error) {
            throw error
        }
    }

    static async getMessageForUser(userDb){
        try {
            const {user} = userDb
            const messageForUser = await messageModel.find({user:user})
            return messageForUser
        } catch (error) {
            throw error
        }
    }

    static async getUsersUnique (){
        try {
            const users = await messageModel.aggregate([
                {
                    $group: {
                      _id: "$user",
                      firstDoc: { $first: "$$ROOT" }
                    }
                  },
                  {
                    $replaceRoot: { newRoot: "$firstDoc" }
                  }
                ]);
                return users;
              } catch (error) {
                throw error;
              }

    }
}