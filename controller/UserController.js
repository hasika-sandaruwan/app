const bcrypt = require('bcryptjs');
const UserSchema = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
// register
const register = async (req, resp)=>{
    try{
        const {username, password, fullName, address, city}=req.body;
        if(!username || !password || !fullName || !address || !city){
            return resp.status(400).json({'message':'some fields are missing!..'});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new UserSchema({
            username:username,
            password:hash,
            fullName:fullName,
            address:address,
            status:true,
            city:city
        });

       const saveData =  await user.save();
       return resp.status(201).json({'message':'success!', data:saveData});

    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
}
// login
const login = async (req, resp)=>{
    try{
        const {username, password}= req.body;
        if(!username || !password){
            return resp.status(400).json({'message':'some fields are missing!..'});
        }

        const user = await UserSchema.findOne({username});
        if(!user){
            return resp.status(404).json({'message':'User not found!..'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return resp.status(401).json({'message':'password is wrong!..'});
        }

        const token  = jwt.sign({id:user._id, username:user.username},
            process.env.JWT_SECRET || 'kljsadjashfroiewqrhnfdkadsnfasjdliajdiasjdoiasjdsakjndasjdoajdoiajdoisd',
            {expiresIn: '24h'}
        );
        return resp.status(200).json({message:'Success!', token})

    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
}

module.exports ={
    register, login
}