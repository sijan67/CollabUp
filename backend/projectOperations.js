const { query } = require('express');
var config = require('./dbconfig.js');
const sql = require('mssql');
const util = require('util');


async function addProject(newProj) {
    try {
        console.log("Safe Endpoint")
        let newProjID = await getNextPrimaryID("projects");

        let newUserProjID = await getNextPrimaryID("userProjects");
        
        let pool = await sql.connect(config);
        let insertProject = await pool.request()
        .input('input_id', sql.Int, newProjID)
        .input('input_ownerID', sql.Int, newProj.ownerID)
        .input('input_title', sql.NVarChar(100), newProj.title)
        .input('input_idea', sql.NVarChar(300), newProj.idea)
        .input('input_time', sql.DateTime, newProj.timeCreated)
        .query("INSERT INTO projects (id, ownerID, title, idea, timeCreated) VALUES (@input_id, @input_ownerID, @input_title, @input_idea, @input_time)")
        
        let insertUserProj = await pool.request()
        .input('input_id', sql.Int, newUserProjID)
        .input('input_userID', sql.Int, newProj.ownerID)
        .input('input_projectID', sql.Int, newProjID)
        .input('input_created', sql.Int, 1)
        .query("INSERT INTO userProjects (id, userID, projID, created) VALUES (@input_id, @input_userID, @input_projectID, @input_created)")
        return newProjID;

    } catch (err) {
        console.log(err)
        return null;
    }
}


async function addProjectUnsafe(newProj) {
    try {
        console.log("Unsafe Endpoint")
        let newProjID = await getNextPrimaryID("projects");

        let newUserProjID = await getNextPrimaryID("userProjects");
        
        let queryString = "INSERT INTO projects (id, ownerID, title, idea, timeCreated) VALUES (" + (newProjID) + ", " + (newProj.ownerID) + ", '" + (newProj.title) + "', '" + (newProj.idea) + "', '" + (newProj.timeCreated) + "')"
        console.log(queryString)
        let pool = await sql.connect(config);
        let insertProject = await pool.request()
        .query(queryString)
        
        let insertUserProj = await pool.request()
        .input('input_id', sql.Int, newUserProjID)
        .input('input_userID', sql.Int, newProj.ownerID)
        .input('input_projectID', sql.Int, newProjID)
        .input('input_created', sql.Int, 1)
        .query("INSERT INTO userProjects (id, userID, projID, created) VALUES (@input_id, @input_userID, @input_projectID, @input_created)")
        return newProjID;

    } catch (err) {
        console.log(err)
        return null;
    }
}


async function addProjectPic(newPic) {
    try {
        let newPicID = await getNextPrimaryID("projectPics");
        let buf = Buffer.from(newPic.projPic, 'base64');

        let pool = await sql.connect(config);
        let insertPic = await pool.request()
        .input('input_id', sql.Int, newPicID)
        .input('input_projID', sql.Int, newPic.projID)
        .input('input_projPic', sql.VarBinary(sql.MAX), buf)
        .query("INSERT INTO projectPics (id, projID, projPic) VALUES (@input_id, @input_projID, @input_projPic)")
        return insertPic.recordsets;
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function addProjectSkill(newSkill) {
    try {
        let newSkillID = await getNextPrimaryID("projectSkills");

        let pool = await sql.connect(config);
        let insertSkill = await pool.request()
        .input('input_id', sql.Int, newSkillID)
        .input('input_projID', sql.Int, newSkill.projID)
        .input('input_relatedSkill', sql.NVarChar(30), newSkill.relatedSkill)
        .query("INSERT INTO projectSkills (id, projID, relatedSkill) VALUES (@input_id, @input_projID, @input_relatedSkill)")
        return insertSkill.recordsets;
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function likeProject(newUserProj) {
    try {
        let newLikeID = await getNextPrimaryID("userProjects");

        let pool = await sql.connect(config);
        let insertLike = await pool.request()
        .input('input_id', sql.Int, newLikeID)
        .input('input_userID', sql.Int, newUserProj.userID)
        .input('input_projID', sql.Int, newUserProj.projID)
        .input('input_created', sql.Int, newUserProj.created)
        .query("INSERT INTO userProjects (id, userID, projID, created) VALUES (@input_id, @input_userID, @input_projID, @input_created)")
        return insertLike.recordsets;
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function updateProject(request) {
    try {

        console.log("Safe endpoint")
        if (request.body.hasOwnProperty('newTitle') && request.body.hasOwnProperty('newIdea')) {
            let pool = await sql.connect(config);
            let projUpdate = await pool.request()
            .input('input_projID', sql.Int, request.body.projectID)
            .input('input_newTitle', sql.NVarChar(100), request.body.newTitle)
            .input('input_newIdea', sql.NVarChar(300), request.body.newIdea)
            .query("UPDATE projects SET title = @input_newTitle, idea = @input_newIdea WHERE id = @input_projID")
            return projUpdate.recordsets;
        } else if (request.body.hasOwnProperty('newTitle')) {
            let pool = await sql.connect(config);
            let projUpdate = await pool.request()
            .input('input_projID', sql.Int, request.body.projectID)
            .input('input_newTitle', sql.NVarChar(100), request.body.newTitle)
            .query("UPDATE projects SET title = @input_newTitle WHERE id = @input_projID")
            return projUpdate.recordsets;
        } else if (request.body.hasOwnProperty('newIdea')) {
            let pool = await sql.connect(config);
            let projUpdate = await pool.request()
            .input('input_projID', sql.Int, request.body.projectID)
            .input('input_newIdea', sql.NVarChar(300), request.body.newIdea)
            .query("UPDATE projects SET idea = @input_newIdea WHERE id = @input_projID")
            return projUpdate.recordsets;
        }

        return null;

    } catch (err) {
        console.log(err)
        return null;
    }
}



async function updateProjectUnSafe(request) {
    try {
        console.log("using unsafe endpoint")
        let queryString = ""

        if (request.body.hasOwnProperty('newTitle') && request.body.hasOwnProperty('newIdea')) {
            queryString = "UPDATE projects SET title = " + (request.body.newTitle) + ", idea = " + (request.body.newIdea) + " WHERE id = " + (request.body.projectID);
        } else if (request.body.hasOwnProperty('newTitle')) {
            //queryString = "UPDATE projects SET title = " + (request.body.newTitle) + " WHERE id = " + (request.body.projectID);
            queryString = util.format("UPDATE projects SET title = '%s' WHERE id = %s", request.body.newTitle, request.body.projectID);
            console.log(queryString)
        } else if (request.body.hasOwnProperty('newIdea')) {
            queryString = "UPDATE projects SET idea = " + (request.body.newIdea) + " WHERE id = " + (request.body.projectID);
        }

        console.log(queryString)
        let pool = await sql.connect(config);
        let projUpdate = await pool.request()
        .query(queryString)
        return projUpdate.recordsets;

    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getProjectList() {
    try {
        let pool = await sql.connect(config);

        let projectList = await pool.request()
        .query("SELECT * FROM projects")
        return projectList.recordsets[0];
    } catch (err) {
        console.log(err)
        return null;
    }
}



async function getProjectByID(projID) {
    try {
        let pool = await sql.connect(config);

        let projectList = await pool.request()
        .input('input_projID', sql.Int, projID)
        .query("SELECT * FROM projects where id = @input_projID")
        return projectList.recordsets[0];

    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getLikeCount(projID) {
    try {
        let pool = await sql.connect(config);
        let likeCount = await pool.request()
        .input('input_projID', sql.Int, projID)
        .query("SELECT COUNT(*) AS likeCount FROM userProjects WHERE projID = @input_projID")
        return likeCount.recordsets[0];
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getProjectSkills(projID) {
    try {
        let pool = await sql.connect(config);
        let projectSkills = await pool.request()
        .input('input_projID', sql.Int, projID)
        .query("SELECT relatedSkill FROM projectSkills WHERE projID = @input_projID")
        return projectSkills.recordsets[0];
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getProjectPic(projID) {
    try {
        let pool = await sql.connect(config);
        let projectSkills = await pool.request()
        .input('input_projID', sql.Int, projID)
        .query("SELECT projPic FROM projectPics WHERE projID = @input_projID")
        return projectSkills.recordsets[0];
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getUserProjects(userID) {
    try {
        let pool = await sql.connect(config);
        let userProjs = await pool.request()
        .input('input_userID', sql.Int, userID)
        .query("SELECT projID, created FROM userProjects WHERE userID = @input_userID")
        return userProjs.recordsets[0];
    } catch (err) {
        console.log(err)
        return null;
    }
}


async function getNextPrimaryID(tableName) {
    const queryString = "SELECT MAX(id) as maxID FROM " + tableName + ";"
    let pool = await sql.connect(config);
    let highestNextID = await pool.request()
    .query(queryString);
    return highestNextID.recordset[0].maxID+1;
}


module.exports = {
    addProject: addProject,
    addProjectPic: addProjectPic,
    addProjectSkill: addProjectSkill,
    likeProject: likeProject,
    getProjectList: getProjectList,
    getProjectSkills: getProjectSkills,
    getProjectPic: getProjectPic,
    getUserProjects: getUserProjects,
    getProjectByID: getProjectByID,
    getLikeCount: getLikeCount,
    updateProject: updateProject,
    updateProjectUnSafe: updateProjectUnSafe,
    addProjectUnsafe: addProjectUnsafe
}