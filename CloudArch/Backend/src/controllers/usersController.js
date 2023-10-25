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
    res.json(result);
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const updateUser = async (req, res) => {
    const update = await User.updateOne({username: req.body.username}, 
        {$set: {name: req.body.name,password: req.body.password,rol: req.body.rol}});
    res.json(update);
};

const deleteUser = async (req, res) => {
    const remove = await User.deleteOne({username: req.body.username});
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


module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    authUser
};