const { query } = require('express');
var config = require('./dbconfig.js');
const sql = require('mssql');
let bcrypt = require('bcrypt');


//if using a .input() defined input parameter, the values are sanitized by this method, build in SQL injection protection


async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
        
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function comparePass(password, digest) {
    try {
        return await bcrypt.compare(password, digest);
    } catch (err) {
        console.log(err)
        return false;
    }
}


async function getUserIDs() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");

        return users.recordsets;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function getUserByID(userID){
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_parameter', sql.Int, userID)
        .query('SELECT * FROM Users where ID = @input_parameter');
        return user.recordsets[0];
    }
    catch(err) {
        console.log(err);
        return null;
    }
}


async function getUserByUsername(username){
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_parameter', sql.NVarChar(20), username)
        .query('SELECT * FROM Users where username = @input_parameter');
        return user.recordsets[0];
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

async function getUserByEmail(email){
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_parameter', sql.NVarChar(50), email)
        .query('SELECT * FROM Users where email = @input_parameter');
        return user.recordsets[0];
    }
    catch(err) {
        console.log(err);
        return null;
    }
}


async function getUserDetsByUsername(username) {
    try {
        let pool = await sql.connect(config);
        let userDets = await pool.request()
        .input('input_param', sql.NVarChar(20), username)
        .query("SELECT * FROM userDetails where username = @input_param");
        return userDets.recordsets[0];

    } catch (err) {
        console.log(err);
        return null;
    }
}

/*
async function getUserSkills(userID) {
    try {
        let pool = await sql.connect(config);
        let userSkills = await pool.request()
        .input('input_param', sql.Int, userID)
        .query("SELECT * FROM userSkills WHERE userID = @input_param");
        return userSkills.recordsets[0];
    } catch (err) {
        console.log(err);
    }
}
*/

async function getUserPic(userID) {
    try {
        let pool = await sql.connect(config);
        let userPic = await pool.request()
        .input('input_param', sql.Int, userID)
        .query("SELECT * FROM userPics WHERE userID = @input_param");
        return userPic.recordsets[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}


//returns 1 if email already exists in system
//returns 2 if username already exists in system
//returns 0 if neither in system
async function checkUserExists(email, username) {
    try {
        euser = await getUserByEmail(email);
        if (euser.length != 0) {
            return 1;
        } else {
            uuser = await getUserByUsername(username);
            if (uuser.length != 0) {
                return 2;
            } else {
                return 0;
            }
        }
    } catch(err) {
        console.log(err);
    }
}


//Checks if a password exists for the loginName
//Checks if either username or email match loginName
async function getPassFromLogin(loginName){
    try {
        let pool = await sql.connect(config);
        let username = await pool.request()
        .input('input_parameter', sql.NVarChar(20), loginName)
        .query('SELECT password FROM Users where username = @input_parameter');
        if (username.recordsets[0].length != 0) {
            return username.recordsets[0][0].password;
        } else {
            let email = await pool.request()
            .input('input_parameter', sql.NVarChar(50), loginName)
            .query('SELECT password FROM Users where email = @input_parameter');
            if (email.recordsets[0].length != 0) {
                return email.recordsets[0][0].password;
            } else {
                return null;
            }
        }
    }
    catch(err) {
        console.log(err);
        return null;
    }
}


async function addUser(newUser) {
    try {
        let newUserID = await getNextPrimaryID("users");
        let hashedPassword = await hashPassword(newUser.password)
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
        .input('input_id', sql.Int, newUserID)
        .input('input_username', sql.NVarChar(20), newUser.username)
        .input('input_password', sql.NVarChar(100), hashedPassword)
        .input('input_email', sql.NVarChar(50), newUser.email)
        .input('input_firstname', sql.NVarChar(20), newUser.firstName)
        .input('input_lastname', sql.NVarChar(30), newUser.lastName)
        .query("INSERT INTO Users (id, email, username, password, firstName, lastName) VALUES (@input_id, @input_email, @input_username, @input_password, @input_firstname, @input_lastname)");
        return insertUser.recordsets;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}



async function addUserDetails(newUserDetails) {
    try {
        let pool = await sql.connect(config);
        let insterUserDetails = await pool.request()
        .input('input_id', sql.Int, newUserDetails.id)
        .input('input_username', sql.NVarChar(20), newUserDetails.username)
        .input('input_birthdate', sql.DateTime, newUserDetails.birthdate)
        .input('input_occupation', sql.NVarChar(50), newUserDetails.occupation)
        .input('input_skill', sql.NVarChar(30), newUserDetails.skill)
        .input('input_experience', sql.Int, newUserDetails.experience)
        .input('input_location', sql.NVarChar(50), newUserDetails.location)
        .input('input_worklink', sql.NVarChar(50), newUserDetails.worklink)
        .input('input_pubemail', sql.NVarChar(50), newUserDetails.pubemail)
        .input('input_description', sql.NVarChar(200), newUserDetails.description)
        .input('input_achievements', sql.NVarChar(100), newUserDetails.achievements)
        .query("INSERT INTO userDetails (id, username, birthdate, occupation, skill, experience, location, worklink, pubemail, description, achievements) VALUES (@input_id, @input_username, @input_birthdate, @input_occupation, @input_skill, @input_experience, @input_location, @input_worklink, @input_pubemail, @input_description, @input_achievements)");
        return insterUserDetails.recordsets;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}

async function addUserPic(newUserPic) {
    try {
        let newPicID = await getNextPrimaryID("userPics");
        let buf = Buffer.from(newUserPic.profPic, 'base64');

        let pool = await sql.connect(config);
        let insterUserPic = await pool.request()
        .input('input_id', sql.Int, newPicID)
        .input('input_userID', sql.Int, newUserPic.userID)
        .input('input_profpic', sql.VarBinary(sql.MAX), buf)
        .query("INSERT INTO userPics (id, userID, profPic) VALUES (@input_id, @input_userID, @input_profpic)");
        return insterUserPic.recordsets;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

/*
async function addUserSkill(newUserSkill) {
    try {
        let newSkillID = await getNextPrimaryID("userSkills");

        let pool = await sql.connect(config);
        let insertUserSkill = await pool.request()
        .input('input_id', sql.Int, newSkillID)
        .input('input_userID', sql.Int, newUserSkill.userID)
        .input('input_skill', sql.NVarChar(30), newUserSkill.skill)
        .input('input_experience', sql.Int, newUserSkill.experience)
        .query("INSERT INTO userSkills (id, userID, skill, experience) VALUES (@input_id, @input_userID, @input_skill, @input_experience)");
        return insertUserSkill.recordsets;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}
*/

async function getNextPrimaryID(tableName) {
    const queryString = "SELECT MAX(id) as maxID FROM " + tableName + ";"
    let pool = await sql.connect(config);
    let highestNextID = await pool.request()
    .query(queryString);
    return highestNextID.recordset[0].maxID+1;
}


module.exports = {
    getUserIDs: getUserIDs,
    getUserByID: getUserByID,
    addUser: addUser,
    getPassFromLogin: getPassFromLogin,
    getUserByUsername: getUserByUsername,
    checkUserExists: checkUserExists,
    addUserDetails: addUserDetails,
    getNextPrimaryID: getNextPrimaryID,
    addUserPic: addUserPic,
    //addUserSkill: addUserSkill,
    getUserDetsByUsername: getUserDetsByUsername,
    //getUserSkills: getUserSkills,
    getUserPic: getUserPic,
    comparePass: comparePass
}