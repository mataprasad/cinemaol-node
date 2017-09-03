module.exports = {
    static_file_dir: "www",
    view_dir: "views",
    session_storage_secret: "keyboard cat",
    upload_dest: "./www/images/movieImages/",
    database_file_path: "./db_cinema_ol.db",
    crypto_algorithm: "aes-256-ctr",
    crypto_password: "d6F3Efeq",
    server_port: 3500,
    platform: process.platform,
    isWin: function() {
        var isWin = /^win/.test(process.platform);
        return isWin;
    }
};