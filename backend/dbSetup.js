var config = require('./dbconfig.js');
const sql = require('mssql');
let bcrypt = require('bcrypt');


async function addUserRelatedTables() {
    try {
        let usersTable = await addUsersTable();
        let userDetTable = await addUserDetailsTable();
        let userSkillsTable = await addUserSkillsTable();
        let userPicsTable = await addUserPicsTable();
        if (usersTable == null || userDetTable == null || userSkillsTable == null || userPicsTable == null) {
            return null;
        } else {
            return 1;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

//creates the USERS table and adds the admin account
async function addUsersTable() {
    try {
        const table = new sql.Table('users')
        table.create = true
        table.columns.add('id', sql.Int, {nullable: false, primary: true})
        table.columns.add('email', sql.NVarChar(50), {nullable: false})
        table.columns.add('username', sql.NVarChar(20), {nullable:false})
        table.columns.add('password', sql.NVarChar(100), {nullable:false})
        table.columns.add('firstName', sql.NVarChar(20), {nullable: false})
        table.columns.add('lastName', sql.NVarChar(30), {nullable: false})

        const salt = await bcrypt.genSalt(10)
        let adminPass = await bcrypt.hash('adminpass', salt)
        console.log(adminPass)
        table.rows.add(1, 'admin@gmail.com', 'admin', adminPass, 'Admin', 'Account')

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('users created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}


//creates the USERDETAILS table and adds the admin account
async function addUserDetailsTable() {
    try {
        const table = new sql.Table('userDetails')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('username', sql.NVarChar(20), {nullable:false})
        table.columns.add('birthdate', sql.DateTime, {nullable:false})
        table.columns.add('occupation', sql.NVarChar(50), {nullable:false})
        table.columns.add('skill', sql.NVarChar(30), {nullable:false})
        table.columns.add('experience', sql.Int, {nullable: false})
        table.columns.add('location', sql.NVarChar(50), {nullable:false})
        table.columns.add('worklink', sql.NVarChar(50), {nullable:true})
        table.columns.add('pubemail', sql.NVarChar(50), {nullable:true})
        table.columns.add('description', sql.NVarChar(200), {nullable:false})
        table.columns.add('achievements', sql.NVarChar(100), {nullable:true})

        table.rows.add(1, 'admin', '2000-11-08 00:00:00', 'CollabUp Backend Developer', 'Web Development', 2, 'Vancouver, BC', 'https://linkedin.com/collabUp', 'collabUpAdmin@gmail.com',
                        'CollabUp Head Developer and Admin Account', '2023 Developer of the Year at CollabUp')
        
        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userDetails created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

/*
//creates USERSKILLS table and adds the admin account
async function addUserSkillsTable() {
    try {
        const table = new sql.Table('userSkills')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('userID', sql.Int, {nullable:false})
        table.columns.add('skill', sql.NVarChar(30), {nullable:false})
        table.columns.add('experience', sql.Int, {nullable:false})

        table.rows.add(1, 1, 'Javascript', 2)
        table.rows.add(2, 1, 'Web Development', 3)
        table.rows.add(3, 1, 'SQL', 1)

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userSkills created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}
*/

//creats USERPICS table and adds the admin account
async function addUserPicsTable() {
    try {
        const table = new sql.Table('userPics')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('userID', sql.Int, {nullable:false})
        table.columns.add('profPic', sql.VarBinary(sql.MAX), {nullable:true})

        table.rows.add(1, 1, null)

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userPics created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}



async function addProjectRelatedTables() {
    try {
        let userProjects = await addUserProjectsTable();
        let projects = await addProjectsTable();
        let projectSkills = await addProjectSkillsTable();
        let projectPics = await addProjectPicsTable();
        if (userProjects == null || projects == null || projectSkills == null || projectPics == null) {
            return null;
        } else {
            return 1;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}



//creats userProjects table and adds the inital project 
async function addUserProjectsTable() {
    try {
        const table = new sql.Table('userProjects')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('userID', sql.Int, {nullable:false})
        table.columns.add('projID', sql.Int, {nullable:false})
        table.columns.add('created', sql.Int, {nullable: false})

        table.rows.add(1, 1, 1, 1)

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userProjects created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}

//creats projects table and adds the inital project 
async function addProjectsTable() {
    try {
        const table = new sql.Table('projects')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('ownerID', sql.Int, {nullable:false})
        table.columns.add('title', sql.NVarChar(100), {nullable:false})
        table.columns.add('idea', sql.NVarChar(500), {nullable: false})
        table.columns.add('timeCreated', sql.DateTime, {nullable:false})

        table.rows.add(1, 1, "CollabUp Discussion", "A project designated for discussions about Collab Up!", "2023-11-15 09:30:00.000")

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('projects created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}


//creats userProjects table and adds the inital project 
async function addProjectSkillsTable() {
    try {
        const table = new sql.Table('projectSkills')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('projID', sql.Int, {nullable:false})
        table.columns.add('relatedSkill', sql.NVarChar(30), {nullable: false})

        table.rows.add(1, 1, "Web Development")
        table.rows.add(2, 1, "SQL")

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('projectSkills created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}


//creats projects table and adds the inital project 
async function addProjectPicsTable() {
    try {
        const table = new sql.Table('projectPics')
        table.create = true

        table.columns.add('id', sql.Int, {nullable:false, primary:true})
        table.columns.add('projID', sql.Int, {nullable:false})
        table.columns.add('projPic', sql.VarBinary(sql.MAX), {nullable:true})

        table.rows.add(1, 1, null)

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('projectPics created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
        return null;
    }

}


module.exports = {
    addUserRelatedTables: addUserRelatedTables,
    addProjectRelatedTables: addProjectRelatedTables
}