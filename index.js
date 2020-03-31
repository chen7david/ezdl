const fs = require('fs')
const path = require('path')
const axios = require('axios')
const dd = (val) => console.log(val)

class Downloader {

    constructor(options = {}){
        const {folder, baseURL} = options
        this.folder = folder ? folder : __dirname + '/../../'
        this._baseURL = baseURL ? baseURL : ''
        this._params = ''
        this._force = false
        this._name = null
    }

    baseURL(url){
        this._baseURL = url
        return this
    }

    params(params){
        this._params = path.join(...params)
        return this
    }

    url(){
        return this._baseURL + this._params
    }

    force(bool){
        this._force = bool ? bool : false
        return this
    }

    async exists(filePath){
        try {
            await fs.promises.access(filePath)
            return true
        } catch (err) {
            return false
        }
    }

    name(name){
        this._name = name
        return this
    }

    async start(subfolders = []){
        try {
            if(!this._name) throw('please set file name')
            const dir = path.join(this.folder, ...subfolders)
            const filePath = path.join(dir, this._name)

            await fs.promises.mkdir(dir, {recursive: true})

            if(!await this.exists(filePath) || this._force){

                const { data } = await axios({
                    url: this.url(),
                    responseType: 'stream',
                })

                data.pipe(fs.createWriteStream(filePath))

                return new Promise((resolve, reject) => {
                    data.on('end', () => { resolve(true) })
                    data.on('error', () => { reject(err)})
                })
            }
            return true
        } catch (err) {
            dd(err)
        }
    }

}

exports = module.exports = (options = {}) => new Downloader(options)

exports.Downloader = Downloader