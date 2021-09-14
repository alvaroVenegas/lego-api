const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }else {
        return res.status(401).json('No estas logueado')
    }
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.role === 'admin'){
            return next();
        }else{
            return res.status(403).json('No es admin')
        }
    }else{
        return res.status(401).json('No estas logueado')
    }
}

module.exports = {
    isAuth,
    isAdmin,
}