const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports= function(roles)
{
    return function(req, res, next)
    {
        if (req.method == 'OPTIONS')
    {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token)
        {
            return res.status(403).json("Пользователь не авторизован")
        }
        const {roles: user_roles} = jwt.verify(token, secret)
        let hasRole = false
        user_roles.forEach(element => {
            if (roles.includes(element))
            {
                hasRole = true
            } 
        });
        if(!hasRole)
        {
            return res.status(403).json("Нет доступа к функции")
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json("Пользователь не авторизован")
    }
    }
}