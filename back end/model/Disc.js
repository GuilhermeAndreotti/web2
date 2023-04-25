const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../helpers/mysql")

const DiscModel = sequelize.define('disciplinas', 
    {
        nome: DataTypes.STRING,
        prof: DataTypes.STRING,
        periodo: DataTypes.INTEGER
    }
)

DiscModel.sync()

module.exports = {

    list: async function() {
        const disc = await DiscModel.findAll()
        return disc
    },
    
    save: async function(nome, prof, periodo) {
        const disc = await DiscModel.create({
            nome: nome,
            prof: prof,
            periodo: periodo
        })
        return disc
    },

    update: async function(id, obj) {
        
        let disc = await DiscModel.findByPk(id)
        if (!disc) {
            return false
        }
        // que que isso faz?
        Object.keys(obj).forEach(key => disc[key] = obj[key])
        await disc.save()
        return disc;
    },

    delete: async function(id) {
        const disc = await DiscModel.findByPk(id)
        return disc.destroy()
    },

    getById: async function(id) {
        return await DiscModel.findByPk(id)
    }
}