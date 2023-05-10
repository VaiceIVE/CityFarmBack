const MarketService = require("../Services/MarketService")
const db = require("../DB")
class MarketController
{
    async CreateLot(req, res, next)
    {
        try{
            const {userid, name, price, description, type, farm, icon} = req.body
    
            const lot = await MarketService.CreateLot(userid, name, price, description, type, farm, icon)
    
            return res.json(lot)
        }
        catch(e)
        {
            next(e)
        }
    }

    async CreateLots(req, res, next)
    {
        try{
            const {objects} = req.body
    
            const lot = await MarketService.CreateLots(objects)
    
            return res.json(lot)
        }
        catch(e)
        {
            next(e)
        }
    }

    async CreateType(req, res, next)
    {
        try{
            const {name, icon} = req.body
    
            const type = await MarketService.CreateType(name, icon)
    
            return res.json(type)
        }
        catch(e)
        {
            next(e)
        }
    }

    async Lots(req, res, next)
    {
        try {
            const lots = await MarketService.Lots();

            res.json(lots)
        } catch (e) {
            next(e)
        }
    }
    async Lot(req, res, next)
    {
        try {
            const id = req.params.id

            const lots = await MarketService.Lot(id);

            res.json(lots)
        } catch (e) {
            next(e)
        }
    }

    async Types(req, res, next)
    {
        try {
            const types = await MarketService.Types();

            res.json(types)
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new MarketController();