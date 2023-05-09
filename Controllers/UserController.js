const db = require('../DB')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {secret} = require('../config')
const UserService = require('../Services/UserService')
const MailService = require('../Services/MailService')
const {validationResult} = require('express-validator')
const ApiError = require('../Exceptions/ApiError')


class UserController
{
    async CreateUser(req, res, next)
    {
      try {
        db()

        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
          return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
        } 


        const {name, email, phone, password, nickname} = req.body;

        const userData = await UserService.registration(name, email, phone, password, nickname)

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*60*60*24*1000, httpOnly: true, secure: true})

        return res.json(userData)
      } catch (e) {
        next(e)
      }
    }


    async Login(req, res, next)
    {
        try
        {
            db()

            const {email, password} = req.body

            const userData = await UserService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*60*60*24*1000, httpOnly: true, secure: true})

            return res.json(userData)
        }
        catch(e)
        {
          next(e)
        }
    }

    async logout(req, res, next)
    {
      try {
          const {refreshToken} = req.cookies;
          const token = await UserService.logout(refreshToken);
          res.clearCookie('refreshToken')
          return res.json(token)
      } catch (e) {
        next(e)
      }
    }

    async refresh(req, res, next)
    {
      try{
        console.log(req.cookies)

        const {refreshToken} = req.cookies

        const userData = await UserService.refresh(refreshToken)

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*60*60*24*1000, httpOnly: true, secure: true})

        return res.json(userData)
      }
      catch(e)
      {
        next(e)
      }
    }

    async VerifyUser(req, res)
    {
      try{
        const activationLink = await MailService.verifyUser(req.params.confirmationCode)
        return res.redirect(process.env.CLIENT_URL)
      }
      catch(e)
      {
        next(e)
      } 
    }

    async GetUsers(req, res, next)
    {
      try {
        const users = await UserService.getAllUsers();
        return res.json(users);
      } catch (e) {
        next(e)
      }
    }
}


module.exports = new UserController()