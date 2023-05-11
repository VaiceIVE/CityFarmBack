const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const MailService = require('./MailService')
const TokenService = require('./TokenService')
const UserDto = require('../dtos/UserDTO')
const ApiError = require('../Exceptions/ApiError')
const Token = require('../Models/Token')
const db = require('../DB')


class UserService{
    async registration(name, email, phone, pass, nickname)
    {
        db()

        const roles = ["User"]
        const candidate = await User.findOne({email: email})

        if(candidate)
        {
            throw ApiError.BadRequest("Email already taken")
        }

        const hashpass = await bcrypt.hash(pass, 5)

        console.log(hashpass)

        const code = uuid.v4()

        const newUser = await User.create({
            name: name,
            email: email,
            phone: phone,
            roles: roles,
            hash: hashpass,
            nickname: nickname,
            confirmationCode: code,
            cash: 0})

        MailService.sendConfirmationEmail(name, email, code)
        
        const userDto = new UserDto(newUser)

        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(email, password)
    {
        db()

        const user = await User.findOne({email})

        if (!user)
        {
            throw ApiError.BadRequest("Нет пользователя с таким еmail")
        }
        const IsPassEquals = await bcrypt.compare(password, user.hash)
        
        if(!IsPassEquals)
        {
            throw ApiError.BadRequest("Неверный Пароль")
        }

        if (user.status != "Active") 
        {
            throw ApiError.BadRequest("Аккаунт не подтвержден")
        }

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}

    }

    async refresh(refreshToken)
    {
        db()

        if (!refreshToken)
        {
            console.log("no refresh token")
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenfromdb = await TokenService.findToken(refreshToken)

        if (!userData || !tokenfromdb)
        {
            console.log("no user in db or token in db")
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken)
    {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async getAllUsers()
    {
        db()

        const users = await User.find();
        return users;
    }
}

module.exports = new UserService();