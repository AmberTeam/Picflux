const UserModel = require("../models/user.model")
const mongoose = require("mongoose")

class FileService {

    async removeWillReadFilm(userid, fid) {
        try {
            const user = await UserModel.findById(userid)
            await user.watchLater.remove(fid)
            await user.save() 
            return {status: "ok"}    
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }

    async addWillReadFilm(userid, fid) {
        try {
            const user = await UserModel.findById(userid)
            await user.watchLater.push(fid)
            await user.save() 
            return {status: "ok"}
        } catch(e) {
            console.log(e)
            return {status: "err"}
        }
    }
}

module.exports = new FileService()