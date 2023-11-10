const User = require('../models/User');

const addUser =async (req, res) => {
    const insertUser = new User(
        {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            rol: req.body.rol
        }
    );
    const result = await insertUser.save();
    //verificare si se inserto el usuario
    if(result){
        res.json({insert: 'yes'});
    }else{
        res.json({insert: 'not'});
    }
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const updateUser = async (req, res) => {
    const update = await User.updateOne({username: req.body.username}, 
        {$set: {name: req.body.name,password: req.body.password,rol: req.body.rol}});
    if(update){    
        res.json({update: 'yes'});
    }else{
        res.json({update: 'not'});
    }
};

const deleteUser = async (req, res) => {
    const remove = await User.deleteOne({username: req.params.username});
    res.json(remove)
};

const authUser= async (req, res) => {
    const auth = await User.findOne({username: req.body.username, password: req.body.password});
    console.log( auth)
    if(auth){
        res.json(auth);
    }else{
        res.json({null: 'null'});
    }
}
const getOneUser= async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(user){
        res.json({find: 'yes'});
    }else{
        res.json({find: 'not'});
    }
}
const getByUsername= async (req, res) => {
    const user = await User.findOne({username: req.params.username});
    if(user){
        res.json(user);
    }else{
        res.json({find: 'not'});
    }
}


module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    authUser,
    getOneUser,
    getByUsername
};