/*************************************
    Skill Router File
    Created by Vikrant on 25/10/17.
 *************************************/

let express = require('express');
let router = express.Router();


/*****************************
 Controller References
 *****************************/
let skillController = require('../controller/skill_controller');
let Skills = new skillController();


/*****************************
 Routers
 *****************************/


// getallskills
router.get('/getallskills', function (req, res) {
    Skills.getallskills(req,res);
});

// searchbyskillname
router.get('/searchbyskillname', function (req, res) {
    Skills.searchbyskillname(req,res);
});

// addnewskill
router.post('/addnewskill', function (req, res) {
    Skills.addnewskill(req,res);
});

// editskillname
router.put('/editskillname', function (req, res) {
    Skills.editskillname(req,res);
});

// changestatus
router.put('/changestatus', function (req, res) {
    Skills.changestatus(req,res);
});

module.exports = router;
