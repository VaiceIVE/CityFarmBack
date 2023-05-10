const jwt = require('jsonwebtoken')
const TokenModel = require('../Models/Token')

class TokenService{
    
    generateTokens(payload)
    {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET , {expiresIn: "24h"})

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "24d"})

        return {accessToken, refreshToken}
    }

    async saveToken(id, refreshToken)
    {
        db()

        const tokenData = await TokenModel.findOne({user: id})
        if (tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({user: id, refreshToken});
        return token;
    }

    validateAccessToken(token)
    {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET );
            return userData
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token)
    {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET );
            return userData
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken)
    {
        db()

        const token = await TokenModel.deleteOne({refreshToken})
        return token;
    }

    async findToken(refreshToken)
    {
        db()

        const token = await TokenModel.findOne({refreshToken})
        return token;
    }

}

module.exports = new TokenService();