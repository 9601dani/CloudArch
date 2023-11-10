const Shared = require('../models/Shared');

const addShared =async (req, res) => {
    const insertShared = new Shared(
        {
            name: req.body.name,
            type: req.body.type,
            path: req.body.path,
            user_shared: req.body.user_shared,
            content: req.body.content,
            fecha_compartido: req.body.fecha_compartido,
            hora_compartido: req.body.hora_compartido,
            user: req.body.user,
        }
    );
    const result = await insertShared.save();
    //verificare si se inserto el archivo
    if(result){
        res.json({insert: 'yes'});
    }else{
        res.json({insert: 'not'});
    }
}

const getAllSharedByUser = async (req, res) => {
    const shared = await Shared.find({user_shared: req.query.user});
    if(shared){
        res.json(shared);
    }else{
        console.log('no hay archivos compartidos')
        res.json('')
    }
}

const deleteShared = async (req, res) => {
    console.log(req.query)
    const remove = await Shared.deleteOne({user_shared: req.query.user, path: req.query.path, name: req.query.name});
    if(remove){
        res.json({remove: 'yes'});
    }else{
        res.json({remove: 'not'});
    }
}

module.exports = {
    addShared,
    getAllSharedByUser,
    deleteShared
}
