const collection = require('../models/Collection');
const Recipe = require('../models/Recipe');
exports.createCollection=async(req,res)=>{
    const {name}=req.body;
    try{
        const collect = await collection.create({where:{name , userId: req.user.id}});
        res.status(201).json({message:'collection created successfully!',collect});
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error});
    }
};

exports.addToCollection = async(req,res)=>{
    try{
        const {collectionId , recipeId}=req.body;
        const collect = await collection.findOne({where:{id:collectionId , userId:req.user.id}});
        if(!collect){
            return res.status(404).json({message:"collection not found"});
        }
        await collection.create({ collectionId, recipeId });
        res.json({messgae:"Recipe added to successfully"});
    }
    catch(err){
        res.status(500).json({message:"Failed to add recipe in collection",err});
    }
};

exports.removeFromCollection=async(req,res)=>{
    try{
        const {collectedId , recipeId}=req.body;
        const collect = await collection.findOne({where:{id:collectedId , userId:req.user.id}});
        if(!collect){
            return res.status(404).json({message:"collection not found"});
        }
        await collection.destroy({ where: { collectedId, recipeId } });
        res.json({ message: 'Recipe removed from collection' });

    }
    catch(err){
        res.status(500).json({ message: 'Failed to remove recipe from collection', error });
    }
};
