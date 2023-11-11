const Carpeta = require('../models/Carpeta');
const Archivo = require('../models/Archivo');

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
    const directoryUpdate = await Carpeta.updateMany({user: username, path: oldPath},
        {$set: {path: newPath}});

    const oldDirectoryPath = `${directoryUpdate.path}/${directoryUpdate.name}`;
    const newDirectoryPath = `${newPath}/${directoryUpdate.name}`;

    const files = await Archivo.find({user: username, path: oldDirectoryPath});

    for(let i =0; i<files.length; i++){

        const fileUpdated = await Archivo.findOneAndUpdate({user: username, path: oldDirectoryPath, name: files[i].name},
            {$set: {path: newDirectoryPath}});

    }    

    const carpetas = await Carpeta.find({user: username, path: newPath});

    for( let i=0; i<carpetas.length; i++){
        moveAllCarpetasUser(username, carpetas[i].name, oldDirectoryPath, newDirectoryPath);
    }
};






module.exports = {
    addCarpeta,
    getAllCarpetasUser,
    moveCarpeta,
    moveAllCarpetasUser
};