const Router = require('express')
const MarketController = require('../Controllers/MarketController')
const router = Router()

router.post('/createlot', MarketController.CreateLot)
router.post('/createlots', MarketController.CreateLots)
router.get('/createtype', MarketController.Types)
router.get('/lots', MarketController.Lots)
router.get('/types', MarketController.Types)




module.exports = router;