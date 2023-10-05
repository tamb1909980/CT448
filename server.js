const app = require("./app"); // đây là lệnh để required module app được export từ file app.js(tại dòng 36 trong file app.js)
const config = require("./app/config"); //Vì có file index.js nên không cần chỉ ra cụ thể file nào như code ở dòng 3(xem slide ServerSidejs trang 137 để rõ hơn), đây là lệnh để required module config trong file app/config/index.js tại dòng 10
const MongoDB = require("./app/utils/mongodb.util")
//start server
async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);//connect này là property của lớp MongoDB trong file mongodb.util.js, sẽ trả về client
        console.log("Connect to the database");

        //định nghĩa hằng PORT là số hiệu cổng được cấu hình trong app/config/index.js
        const PORT = config.app.port;

        //Hàm được chạy khi server bắt đầu lắng nghe yêu cầu
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(err){
        console.log("Cannot connect to the database", err);
        process.exit();
    }
}

startServer();