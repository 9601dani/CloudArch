const Carpeta = require('../models/Carpeta');

const addCarpeta =async (req, res) => {
    const insertCarpeta = new Carpeta(
        {
            user: req.body.user,
            path: req.body.path,
            name: req.body.name,
            createdDate: new Date(req.body.createdDate)
        }
    );
    const result = await insertCarpeta.save();
    //verificare si se inserto el usuario
    if(result){
        res.json({insert: 'yes'});
    }else{
        res.json({insert: 'not'});
    }
}

const getAllCarpetasUser = async (req, res) => {
    const carpetas = await Carpeta.find({user: req.query.username, path: req.query.path});
    if(carpetas){
        res.json(carpetas);
    }else{
        res.json('')
    }
    
}

module.exports = {
    addCarpeta,
    getAllCarpetasUser
};