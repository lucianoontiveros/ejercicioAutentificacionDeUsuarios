const express = require('express')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { expressjwt: jwt } = require("express-jwt");
const User= require('./user.model')

require('dotenv').config()
const validateJwt = jwt({ secret: process.env.STRINGSECRET, algorithms: ["HS256"]})
const signToken = _id => jsonwebtoken.sign({ _id }, process.env.STRINGSECRET)
const findAndAssignUser = async (req, res, next) => {
    try { 
        const user = await User.findOne(req.user_id)
        if(!user) {
            return res.status(401).end
        }
        req.user = user
        next()
    } catch (e) {
        next(e)
    }
}

const autentificacion = express.Router().use(validateJwt, findAndAssignUser)
const Auth = {
    login: async (req, res) => { 
        const {body} = req 
        try { 
            const user = await User.findOne({ email: body.email})
            if(!user){
                res.status(401).send('usuario y/o contraseña incorrectas')
            } else {
                const isMatch = await bcrypt.compare(body.password, user.password)
                if (isMatch){
                    const signed = signToken(user._id)
                    res.status(200).send(signed)
                } else {
                    res.status(401).send('usuario y/o contraseña incorrectas')
                }
            }
        } catch (e) {
            res.send(e.message)
        }
    },

    
    register: async (req, res) =>{
        const {body} = req
        try { 
            const isUser = await User.findOne({email: body.email})
            if(isUser){
                res.send('usuario ya existe')
            } else {
                const salt = await bcrypt.genSalt()
                const hashed = await bcrypt.hash(body.password, salt)
                const user = await User.create({ email: body.email, password: hashed, salt})
                const signed = signToken(user._id)
                res.send(signed)

            }
        } catch (err) {
            res.status(500).send(err.message)
        }

    }
}

module.exports = { Auth, autentificacion}