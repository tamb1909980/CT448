// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query; //Query parameters
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (err) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);// lấy Route parameters id
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, `Error retrieving contact with id = ${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) { //Object cung cấp các chức năng chung cho tất cả các đối tượng JavaScript
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (err) {
        return next(new ApiError(500, `Error updating contact with id = ${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    }catch(err){
        return next(new ApiError(500, `Could not delete contact with id = ${req.params.id}`));
    }
};

exports.deleteAll = async (_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    }catch(err){
        return next(new ApiError(500, "An error occured while removing all contacts"));
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    }catch(err){
        return next(new ApiError(500, "An error occured while retrieving favorite contacts"));
    }
}

//Create and save a new contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {//hoặc dùng lệnh: (!req.body?.name)
        return next(new ApiError(400, "Name can not be empty"));//đã đúng
    }

    try {
        const contactService = new ContactService(MongoDB.client);//MongoDb.client truy xuất đến thuộc tính client của class MongoDB trong file mongodb.util.js, câu lệnh này tạo 1 đối tượng ContactService để kết nối tới collection contacts
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (err) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
}