const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const loginStrategy = new LocalStrategy(
    {
        usernameField: "userName",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, userName, password, done) => {
        try {

            const userExists = await User.findOne({ userName })

            if (!userExists) {
                const error = new Error("Este nombre de usuario no corresponde a ningún usuario");
                error.status = 401;
                return done(error, null);
            }

            const validPassword = await bcrypt.compare(password, userExists.password);
            if (!validPassword) {
                const error = new Error("La contraseña es incorrecta");
                return done(error, null);
            }
            userExists.password = null;
            return done(null, userExists);

        } catch {
            console.log("Error en loginStrategy")
            return done(error, null);
        }
    }
);

module.exports = loginStrategy;