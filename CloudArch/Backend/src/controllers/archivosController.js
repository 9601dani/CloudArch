const Archivo = require('../models/Archivo');


const addArchivo =async (req, res) => {
    const insertArchivo = new Archivo(
        {
            name: req.body.name,
            type: req.body.type,
            path: req.body.path,
            user: req.body.user,
            createdDate: new Date(req.body.createdDate),
            content: req.body.content
        }
    );
    const result = await insertArchivo.save();
    //verificare si se inserto el archivo
    if(result){
        res.json({insert: 'yes'});
    }else{
        res.json({insert: 'not'});
    }
}

const getAllArchivosUser = async (req, res) => {
    const archivos = await Archivo.find({user: req.query.username, path: req.query.path});
    if(archivos){
        res.json(archivos);
    }else{
        res.json('')
    }
}

const getOneFile = async (req, res) => {
    const archivo = await Archivo.findOne({user: req.query.username, path: req.query.path, name: req.query.name});
    if(archivo){
        res.json(archivo);
    }else{
        res.json('')
    }
}

module.exports = {
    addArchivo,
    getAllArchivosUser,
    getOneFile
};