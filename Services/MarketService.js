const Lot = require("../Models/Lot")
const Type = require("../Models/Type")
const mongoose = require("mongoose")

class MarketService
{
    async CreateLot(userid, name, price, description, type, farm, icon)
    {
        db()
        
        const newLot = await Lot.create(
            {
                userid: userid,
                name: name,
                price: price, 
                description: description, 
                type: type, 
                farm: farm, 
                icon: icon
            }
            )

        return {lot: newLot};
    }

    async CreateLots(objects)
    {
        db()

        for(const object of objects)
        {
            const {userid, name, price, description, type, farm, icon} = object

            const newLot = await Lot.create(
                {
                    userid: userid,
                    name: name,
                    price: price, 
                    description: description, 
                    type: type, 
                    farm: farm, 
                    icon: icon
                }
                )
        }
        return {objects: objects};
    }

    async CreateType(name, icon)
    {
        db()

        const newType = await Type.create(
            {
                name: name,
                icon: icon
            }
            )

        return {type: newType};
    }

    async Lots()
    {
        db()

        const lots = await Lot.find()

        return lots
    }

    async Lot(id)
    {
        //console.log(id)
        
        const lots = await Lot.findOne({"_id": id})

        return lots
    }

    async Types()
    {
        db()

        const types = await Type.find()

        return types
    }
}

module.exports = new MarketService();