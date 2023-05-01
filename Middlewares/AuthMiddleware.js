const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const ApiError = require('../Exceptions/ApiError')
const TokenService = require('../Services/TokenService')

module.exports = function(req, res, next)
{
    if (req.method == 'OPTIONS')
    {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token)
        {
            console.log("No token")
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(token);

        if (!userData)
        {
            console.log("No User data")
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next()
    } catch (e) {
        console.log(e)
        return next(ApiError.UnauthorizedError())
    }
}