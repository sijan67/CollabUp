var config = require('./dbconfig.js');
const sql = require('mssql');


//creates the USERS table and adds the admin account
async function addUsersTable() {
    try {
        const table = new sql.Table('users')
        table.create = true
        table.columns.add('id', sql.Int, {nullable: false, primary: true})
        table.columns.add('email', sql.NVarChar(50), {nullable: false})
        table.columns.add('username', sql.NVarChar(20), {nullable:false})
        table.columns.add('password', sql.NVarChar(20), {nullable:false})
        table.columns.add('firstName', sql.NVarChar(20), {nullable: false})
        table.columns.add('lastName', sql.NVarChar(30), {nullable: false})

        table.rows.add(1, 'admin@gmail.com', 'admin', 'adminpass', 'Admin', 'Account')
        
        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('users created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
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
        table.columns.add('experience', sql.Int, {nullable: false})
        table.columns.add('location', sql.NVarChar(50), {nullable:false})
        table.columns.add('worklink', sql.NVarChar(50), {nullable:true})
        table.columns.add('pubemail', sql.NVarChar(50), {nullable:true})
        table.columns.add('description', sql.NVarChar(200), {nullable:false})
        table.columns.add('achievements', sql.NVarChar(100), {nullable:true})

        table.rows.add(1, 'admin', '2000-11-08 00:00:00', 'App Developer', 2, 'Vancouver, BC', 'https://linkedin.com/collabUp', 'collabUpAdmin@gmail.com',
                        'CollabUp Head Developer and Admin Account', '2023 Developer of the Year at CollabUp')
        
        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userDetails created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
    }
}

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
        table.rows.add(2, 1, 'Backend Development', 3)
        table.rows.add(3, 1, 'SQL', 1)

        let pool = await sql.connect(config)
        let createTable = await pool.request().bulk(table, (err, result) => {
            console.log('userSkills created')
        });
        return createTable;
    }
    catch(err) {
        console.log(err);
    }
}

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
    }

}


module.exports = {
    addUsersTable: addUsersTable,
    addUserDetailsTable: addUserDetailsTable,
    addUserSkillsTable: addUserSkillsTable,
    addUserPicsTable: addUserPicsTable
}