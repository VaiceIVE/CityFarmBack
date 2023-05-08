const Lot = require("../Models/Lot")
const Type = require("../Models/Type")


class MarketService
{
    async CreateLot(userid, name, price, description, type, farm, icon)
    {
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

    async Lots()
    {
        const lots = await Lot.find()

        return lots
    }

    async Types()
    {
        const types = await Type.find()

        return types
    }
}

module.exports = new MarketService();