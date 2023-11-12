const Carpeta = require('../models/Carpeta');
const Archivo = require('../models/Archivo');
const Papelera = require('../models/Papelera');

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
    //verificare si se inserto la carpeta
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

const moveCarpeta = async (req, res) => {
    const username = req.query.username;
    const name= req.body.name;
    const oldPath = req.body.path;
    const newPath = req.query.pathn;

    await moveAllCarpetasUser(username,name, oldPath, newPath);

    res.json({move: 'yes'});
}


const moveAllCarpetasUser = async (username, name, oldPath, newPath) => {
    const directoryUpdate = await Carpeta.findOneAndUpdate({user: username, path: oldPath, name:name},
        {$set: {path: newPath}});

    const oldDirectoryPath = `${directoryUpdate.path}/${directoryUpdate.name}`;
    const newDirectoryPath = `${newPath}/${directoryUpdate.name}`;

    const files = await Archivo.find({user: username, path: oldDirectoryPath});
    files.forEach(async (file) => {
       const archivoActualizado= await Archivo.findOneAndUpdate({user: username, path: oldDirectoryPath, name: file.name},
            {$set: {path: newDirectoryPath}});
    });

    const carpetas = await Carpeta.find({user: username, path: oldDirectoryPath});

    carpetas.forEach(async (carpeta) => {
        await moveAllCarpetasUser(username, carpeta.name, oldDirectoryPath, newDirectoryPath);
    });

};




const copyCarpeta = async (req, res) => {
    const username = req.query.username;
    const name= req.body.name;
    const oldPath = req.body.path;
    const newPath = req.query.pathn;

    await copyAllCarpetasUser(username,name, oldPath, newPath);

    res.json({copy: 'yes'});
}

const copyAllCarpetasUser = async (username, name, oldPath, newPath) => {
    const carpeta = await Carpeta.findOne({user: username, path: oldPath, name:name});
    const copy = new Carpeta({
        user: username,
        path: newPath,
        name: 'copia_'+carpeta.name,
        createdDate: obtenerFechaActual()
    });

    const guardado = await copy.save();

    const oldChildrenPath = `${carpeta.path}/${carpeta.name}`;
    const newChildrenPath = `${newPath}/${guardado.name}`;

    const files = await Archivo.find({user: username, path: oldChildrenPath});

    files.forEach(async (file) => {
        const copyFile = new Archivo({
            user: username,
            path: newChildrenPath,
            name: 'copia_'+file.name,
            createdDate: obtenerFechaActual()
        });
        await copyFile.save();
    });

    const carpetas = await Carpeta.find({user: username, path: oldChildrenPath});
    carpetas.forEach(async (carpeta) => {
        await copyAllCarpetasUser(username, carpeta.name, oldChildrenPath, newChildrenPath);
    });
}

const obtenerFechaActual = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}





module.exports = {
    addCarpeta,
    getAllCarpetasUser,
    moveCarpeta,
    moveAllCarpetasUser,
    copyCarpeta,
    copyAllCarpetasUser
};