const uuid = require('uuid')
const path = require('path')
const fs = require("fs")

class FileService {
    saveFile(file) { 
        try { 
            const fileName = uuid.v4() + ".png"

            const filePath = path.resolve('static', fileName)

            file.mv(filePath)

            return fileName
        } catch(e) {
            console.log(e)
            return path.resolve('static', "user64.png")
        }
    }

    async saveFileFromUrl(url) {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const arr_buf = await blob.arrayBuffer()
            const buf = Buffer.from(arr_buf)
            const fname = uuid.v4() + ".png"
            const fpath = path.resolve('static', fname)
            await fs.writeFile(fpath, buf, (err) => err && console.error(err))
            return fname
        } catch(e) {
            console.log(e)
            return path.resolve('static', "user64.png")
        }
    }
}

module.exports = new FileService()