const bcrypt = require('bcryptjs');
const UserSchema = require('../model/UserSchema');
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