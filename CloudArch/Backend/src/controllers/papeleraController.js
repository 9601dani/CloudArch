const Papelera = require('../models/Papelera');

const addPapelera =async (req, res) => {
    const insertPapelera = new Papelera(
        {
            name: req.body.name,
            type: req.body.type,
            path: req.body.path,
            user: req.body.user,
            content: req.body.content,
            tipo_eliminacion: req.body.tipo_eliminacion
        }
    );
    const result = await insertPapelera.save();
    //verificare si se inserto el archivo
    if(result){
        res.json({insert: 'yes'});
    }else{
        res.json({insert: 'not'});
    }
}

const getAllPapelera = async (req, res) => {
    const papelera = await Papelera.find({path: req.query.path});
    if(papelera){
        res.json(papelera);
        
    }else{
        res.json('')
    }
}

module.exports = {
    addPapelera,
    getAllPapelera
}