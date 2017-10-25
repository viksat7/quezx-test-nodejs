
/*************************************
    Skill Model File
    Created by Vikrant on 25/10/17.
 *************************************/

"use strict";

module.exports = (function() {
    const self = this;
    const _dbPath = 'db.json';
    const fs = require('fs');
    const shortid = require('shortid');
    const lodash = require('lodash');


    /**************************************************************************************************************
     * Constructor
     **************************************************************************************************************/
    function Skills() {
        //console.log("User Model Constructor");
    }


    /**************************************************************************************************************
     * GET ALL SKILLS
     **************************************************************************************************************/
    Skills.prototype.getallskills=
        function(query,callback) {
            fs.readFile(_dbPath, function (err, data) {
                if(err){
                    let output = { 'status':'false', 'error':err};
                    callback(err,output);
                }        
                let json = JSON.parse(data);
                if(json!=null){
                    let output = { 'status':'true', 'data':json};
                    callback(null,output);
                }
                else{
                    let output = { 'status':'false', 'error':'Data not Found'};
                    callback(null,output);
                }
            })
            
        };

    /**************************************************************************************************************
     * ADD NEW SKILL
     **************************************************************************************************************/
    Skills.prototype.addnewskill=
        function(new_skill_json,callback){
            fs.readFile(_dbPath, function (err, data) {
                if(err){
                    let output = { 'status':'false', 'error':err};
                    callback(err,output);
                }    

                let json = JSON.parse(data);
                const new_data_json ={
                    "skillid": shortid.generate(),
                    "skillname": new_skill_json.skillname,
                    "status":"approve"
                }

                json.push(new_data_json);
                fs.writeFile(_dbPath, JSON.stringify(json), function(err){
                    if (err){
                        let output = { 'status':'false', 'error':err};
                        callback(err,output);
                    }
                    let output = { 'status':'true', 'message':'New Skill Added Sucessfully'};
                    callback(null,output)  
                });
            });
        };

    /**************************************************************************************************************
     * EDIT EXISTING SKILL NAME
     **************************************************************************************************************/
    Skills.prototype.editskillname=
        function(edit_skill_json,callback){
            const _findSkillID = edit_skill_json.skillid;
            const _updateSkillName = edit_skill_json.skillname;            
            fs.readFile(_dbPath, function (err, data) {
                if(err){
                    let output = { 'status':'false', 'error':err};
                    callback(err,output);
                }    

                let json = JSON.parse(data);

                const _indeX = lodash.findIndex(json, x => x.skillid === _findSkillID);
                const _existingSkillStatus = json[_indeX].status;
                if(_indeX>=0){
                    json.splice(_indeX,1);
                    const new_data_json ={
                        "skillid":_findSkillID,
                        "skillname": _updateSkillName,
                        "status":_existingSkillStatus
                    }

                    json.push(new_data_json);
                    fs.writeFile(_dbPath, JSON.stringify(json), function(err){
                        if (err){
                            let output = { 'status':'false', 'error':err};
                            callback(err,output);
                        }
                        let output = { 'status':'true', 'message':'SkillName Updated Sucessfully'};
                        callback(null,output)  
                    });
                }
                else {
                    let output = { 'status':'false', 'message':'Entered data not found'};
                    callback(err,output);
                }
            });
        };


    /**************************************************************************************************************
     * CHANGE STATUS OF EXISTING SKILL
     **************************************************************************************************************/
    Skills.prototype.changestatus=
        function(edit_skill_json,callback){
            const _findSkillID = edit_skill_json.skillid;
            const _updateSkillStatus = edit_skill_json.status;
            fs.readFile(_dbPath, function (err, data) {
                if(err){
                    let output = { 'status':'false', 'error':err};
                    callback(err,output);
                }    

                let json = JSON.parse(data);

                const _indeX = lodash.findIndex(json, x => x.skillid === _findSkillID);
                const _existingSkillName = json[_indeX].skillname;
                if(_indeX>=0){
                    json.splice(_indeX,1);
                    const new_data_json ={
                        "skillid":_findSkillID,
                        "skillname": _existingSkillName,
                        "status":_updateSkillStatus
                    }

                    json.push(new_data_json);
                    fs.writeFile(_dbPath, JSON.stringify(json), function(err){
                        if (err){
                            let output = { 'status':'false', 'error':err};
                            callback(err,output);
                        }
                        let output = { 'status':'true', 'message':'SkillName Updated Sucessfully'};
                        callback(null,output)  
                    });
                }
                else {
                    let output = { 'status':'false', 'message':'Entered data not found'};
                    callback(err,output);
                }
            });
        };


    /**************************************************************************************************************
     * FIND /SEARCH SKILL
     **************************************************************************************************************/
    Skills.prototype.searchbyskillname=
        function(searchby,callback){
            const _searchbyword = searchby.toString().toLowerCase();
            fs.readFile(_dbPath, function (err, data) {
                if(err){
                    let output = { 'status':'false', 'error':err};
                    callback(err,output);
                }    

                let json = JSON.parse(data);
                var results=lodash.filter(json,function(item){
                    return item.skillname.toLowerCase().indexOf(_searchbyword)>-1;
                });

                if(results!=null && results.length>0){
                    let output = { 'status':'true', 'data':results};
                    callback(null,output);
                }
                else {
                    let output = { 'status':'false', 'message':'Data not found..Please Try with Different Name'};
                    callback(err,output);
                }
            });
        };

    /******************************************************************
     *  Main Function( ie Class) Return
     ******************************************************************/
    return Skills;
})();

