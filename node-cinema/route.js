var express = require('express');
var publicController = require("./controllers/public-controller");
var adminController = require("./controllers/admin-controller");
var serviceController = require("./controllers/service-controller");
var multer = require('multer')
var upload = multer({ dest: './www/images/movieImages/' })
var router = express.Router();

function checkSignIn(req, res, next) {
    if (req.session.user) {
        next(); //If session exists, proceed to page
    } else {
        // var err = new Error("Not logged in!");
        //console.log(req.session.user);
        //next(err); //Error, trying to access unauthorized page!
        publicController.login(req, res);
    }
}


router.get('/', publicController.index);
router.get('/index', publicController.index);

router.get('/login', publicController.login);

router.get('/register', publicController.register);

router.get('/movies', checkSignIn, publicController.movies);

router.get('/movies-up', checkSignIn, publicController.movies_up);

router.get('/about', publicController.about);

router.get('/contact', publicController.contact);

router.get('/manage-show', publicController.manageShow);
router.post('/manage-show', publicController.addShow);
router.get('/manage-movie', publicController.manageMovie);
router.post('/manage-movie', upload.single('fuPoster'), publicController.addMovie);



router.get('/admin/login', adminController.login);


router.post('/service/fill-time-list', serviceController.fill_time_list);

router.post('/service/fill-date-list', serviceController.fill_date_list);

module.exports = router;