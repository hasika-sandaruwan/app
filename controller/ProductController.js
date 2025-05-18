const ProductSchema = require('../model/ProductSchema');

const create = async (req, resp) => {
    try {
        const {productName, unitPrice, description, qtyOnHand} = req.body;
        if (!productName || !unitPrice || !description || !qtyOnHand) {
            return resp.status(400).json({'message': 'all fields are required!'});
        }
        const product = new ProductSchema({
            productName,
            unitPrice: unitPrice,
            description,
            image:{
                resourceUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LzKwSbcToa8ALFneDRyfjVPf_Agm-9tIFQ&s',
                hash:'sdkfjlkjdslkfldsjfldsf',
                directory:'/products/images',
                fileName:'product name'
            },
            status:true,
            qtyOnHand
        });
       const savedProduct = await product.save();
       return resp.status(201).json({message:'product saved', data:savedProduct});
    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
};
const findAll = async (req, resp) => {
    try{
       const products = await ProductSchema.find();
       return resp.status(200).json({data:products});
    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
};
const findById = async (req, resp) => {
    try{
        const {id} = req.params;
        const product = await ProductSchema.findById(id);
        if(!product){
            resp.status(404).json({'message':'product not found'});
        }
        return resp.status(200).json({data:product});
    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
};
const updateProduct = async (req, resp) => {
    try{
        const {id} = req.params;
        const {updateData} = req.body;
        const product = await ProductSchema.findByIdAndUpdate(id, updateData,{new:true});
        if(!product){
            resp.status(404).json({'message':'product not found'});
        }
        return resp.status(200).json({message:'updated!', data:product});
    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
};
const deleteProduct = async (req, resp) => {
    try{
        const {id} = req.params;
        const deletedProduct = await ProductSchema.findOneAndDelete(id);
        if(!deletedProduct){
            resp.status(404).json({'message':'product not found'});
        }
        return resp.status(204).json({message:'deleted!', data:deletedProduct});
    }catch (e) {
        resp.status(500).json({'message':'try again', error:e});
    }
};

module.exports = {
    create,
    findAll,
    findById,
    updateProduct,
    deleteProduct
}