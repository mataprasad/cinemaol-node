module.exports = {
    config: require("./config"),
    initModel: function initModel(req) {
        var rIp = req.connection.remoteAddress;
        return { ip: rIp, data: null, message: null };
    }
};