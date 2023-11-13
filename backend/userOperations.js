var config = require('./dbconfig.js');
const sql = require('mssql');


//if using a .input() defined input parameter, the values are sanitized by this method, build in SQL injection protection

async function getUserIDs() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");

        return users.recordsets;
    }
    catch (err) {
        console.log(err);
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
    }
}


async function addUser(newUser) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
        .input('input_id', sql.Int, newUser.id)
        .input('input_username', sql.NVarChar(20), newUser.username)
        .input('input_password', sql.NVarChar(20), newUser.password)
        .input('input_email', sql.NVarChar(50), newUser.email)
        .input('input_firstname', sql.NVarChar(20), newUser.firstName)
        .input('input_lastname', sql.NVarChar(30), newUser.lastName)
        .query("INSERT INTO Users (id, email, username, password, firstName, lastName) VALUES (@input_id, @input_email, @input_username, @input_password, @input_firstname, @input_lastname)");
        return insertUser.recordsets;
    }
    catch(err) {
        console.log(err);
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
        .input('input_experience', sql.Int, newUserDetails.experience)
        .input('input_location', sql.NVarChar(50), newUserDetails.location)
        .input('input_worklink', sql.NVarChar(50), newUserDetails.worklink)
        .input('input_pubemail', sql.NVarChar(50), newUserDetails.pubemail)
        .input('input_description', sql.NVarChar(200), newUserDetails.description)
        .input('input_achievements', sql.NVarChar(100), newUserDetails.achievements)
        .query("INSERT INTO userDetails (id, username, birthdate, occupation, experience, location, worklink, pubemail, description, achievements) VALUES (@input_id, @input_username, @input_birthdate, @input_occupation, @input_experience, @input_location, @input_worklink, @input_pubemail, @input_description, @input_achievements)");
        return insterUserDetails.recordsets;
    }
    catch(err) {
        console.log(err);
    }

}



async function getNewUserID() {
    let pool = await sql.connect(config);
    let highestUserID = await pool.request().query("SELECT MAX(id) as maxID FROM users");
    return highestUserID.recordset[0].maxID+1;
}


module.exports = {
    getUserIDs: getUserIDs,
    getUserByID: getUserByID,
    addUser: addUser,
    getNewUserID: getNewUserID,
    getPassFromLogin: getPassFromLogin,
    getUserByUsername: getUserByUsername,
    checkUserExists: checkUserExists,
    addUserDetails: addUserDetails
}