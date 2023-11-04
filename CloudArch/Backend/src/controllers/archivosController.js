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

const updateFile = async (req, res) => {
    const update = await Archivo.updateOne({user: req.body.user, path: req.body.path, name: req.body.name},
        {$set: {content: req.body.content}});
    if(update){
        res.json({update: 'yes'});
    }else{
        res.json({update: 'not'});
    }
}

const deleteFile = async (req, res) => {
    const remove = await Archivo.deleteOne({user: req.query.user, path: req.query.path, name: req.query.name});
    if(remove){
        res.json({remove: 'yes'});
    }else{
        res.json({remove: 'not'});
    }
}

module.exports = {
    addArchivo,
    getAllArchivosUser,
    getOneFile,
    updateFile,
    deleteFile
};