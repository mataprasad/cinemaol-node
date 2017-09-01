var express = require('express');
var publicController=require("./controllers/public-controller");
var adminController=require("./controllers/admin-controller");
var serviceController=require("./controllers/service-controller");
var router = express.Router();


router.get('/', publicController.index);
router.get('/index', publicController.index);

router.get('/login', publicController.login);

router.get('/register', publicController.register);

router.get('/movies', publicController.movies);

router.get('/movies-up', publicController.movies_up);

router.get('/about', publicController.about);

router.get('/contact', publicController.contact);



router.get('/admin/login', adminController.login);


router.post('/service/fill-time-list', serviceController.fill_time_list);

router.post('/service/fill-date-list', serviceController.fill_date_list);

module.exports = router;