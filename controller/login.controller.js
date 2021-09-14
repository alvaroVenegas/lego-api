const passport = require('passport')

const postLogin = (req, res, next) => {
    const {userName, password} = req.body;
    if (!userName || !password) {
        const error = 'Completa todos los campos'
        //return res.render('register', { error });
        return next(error)
    }
    const done = (error, user) => {
        if (error) return next(error);

        req.logIn(user, (error, u) => {
            if (error) {
                return next(error);
            };
            //console.log('usuario logeado')
            return res.status(200).json(user)
            //return res.redirect('/');
        });
    };

    passport.authenticate('login', done)(req);
}

const postLogOut = (req, res, next) => {
    if(req.user){
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid')
            return res.status(200).json('¡Hasta Pronto!')
        })

    }else {
        return res.status(401).json('No hay ningun usuario logueado')
    }
}


module.exports = {
    postLogin,
    postLogOut
}