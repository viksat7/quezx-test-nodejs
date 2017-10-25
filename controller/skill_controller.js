/*************************************
    Skill Controller File
    Created by Vikrant on 25/10/17.
 *************************************/

class Skills{

    /********************
     	Constructors
    *********************/
    constructor() {
        this.skillModel = require('../model/skill_model');
        this.skill= new this.skillModel;
    }
    
    /**************************************************************************************************************
     * GET ALL SKILLS
     **************************************************************************************************************/

    getallskills(req,res){

        this.skill.getallskills({},function(error,data){
            if (error)
            {
                console.log(error);
                res.status(400).send(error);

            }
            else
            {
                console.log('done');
                res.status(200).send(data);

            }
        });
    };

    /**************************************************************************************************************
     * FIND BY SKILL NAME
     **************************************************************************************************************/

    searchbyskillname(req,res){
		let _data = req.headers.query;
        this.skill.searchbyskillname(_data,function(error,data){
            if (error)
            {
                console.log(error);
                res.status(400).send(error);

            }
            else
            {
                console.log('done');
                res.status(200).send(data);

            }
        });
    };

    /**************************************************************************************************************
     * ADD NEW SKILL
     **************************************************************************************************************/

    addnewskill(req,res){
    	let _data = req.body;
        this.skill.addnewskill(_data,function(error,data){
            if (error)
            {
                console.log(error);
                res.status(400).send(error);

            }
            else
            {
                console.log('done');
                res.status(200).send(data);

            }
        });
    };


    /**************************************************************************************************************
     * EDIT EXISTING SKILL NAME
     **************************************************************************************************************/

    editskillname(req,res){
    	let _data = req.body;
        this.skill.editskillname(_data,function(error,data){
            if (error)
            {
                console.log(error);
                res.status(400).send(error);

            }
            else
            {
                console.log('done');
                res.status(200).send(data);

            }
        });
    };

    /**************************************************************************************************************
     * CHANGE STATUS OF EXISTING SKILL
     **************************************************************************************************************/

    changestatus(req,res){
    	let _data = req.body;
        this.skill.changestatus(_data,function(error,data){
            if (error)
            {
                console.log(error);
                res.status(400).send(error);

            }
            else
            {
                console.log('done');
                res.status(200).send(data);

            }
        });
    };
}

module.exports = Skills;