export.create = (req, res) =>{
    res.send({ message: "create handler"});
};

export.findAll = (req, res) => {
    res.send({ message: "findAll handler"});
};

export.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};

export.update = (req, res) => {
    res.send({ message: "update handler"});
};

export.delete = (req, res) => {
    res.send({ message: "delete handler"});
};

export.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

export.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler"});
};