const { MongoClient } = require("mongodb"); //Lớp {MongoClient} là lớp cho phép tạo Kết nối với MongoDB. Tương đương với require('mongodb').MongoClient

class MongoDB {
    static connect = async (uri) => { //connect là 1 property
        if(this.client) return this.client; //client cũng là 1 property
        this.client = await MongoClient.connect(uri);
        return this.client;
    };
}

module.exports = MongoDB;
//đây là lớp trợ giúp kết nối tới mongodb