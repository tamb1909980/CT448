const { ObjectId } = require("mongodb"); //nếu muốn thao tác với _id trong mongo thì phải dùng tới đối tượng đặc biệt này

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts"); //kết nối đến collection contacts, Contact là 1 property của lớp ContactService
    }
    //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractcontactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        //Remove undefined fields - 2 dòng code bên dưới giúp xóa các trường được định nghĩa dư khi truyền dữ liệu vào body để tạo contact
        //Object cung cấp các chức năng chung cho tất cả các đối tượng JavaScript
        Object.keys(contact).forEach((key) => contact[key] === undefined && delete contact[key]);
        return contact;
    }

    async create(payload) {
        const contact = this.extractcontactData(payload);//trích xuất dữ liệu contact để lưu vào CSDL
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $option: "i" },
        });
    }

    async findById(id){
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractcontactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id){
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value; //hàm này có thể trả về document trước khi delete vì không có { returnDocument: "after"} nên mặc định là Return the original
    }

    async findFavorite(){
        return await this.find({favorite: true});
    }

    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ContactService;