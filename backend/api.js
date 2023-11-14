//import User from './dbSchema/users.js'

let db = require('./userOperations');
let setup = require('./dbSetup');
let {User} = require('./dbSchema/users');
let {UserDetails} = require('./dbSchema/userDetails');
let {UserPics} = require('./dbSchema/userPics');
let {UserSkills} = require('./dbSchema/userSkills');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

let port = process.env.PORT || 8090;

//will be called before any other routes
//can add authentication, authorization, logging options here
router.use((req, res, next) => {
    //console.log('middleware');
    next();
});


///////////////////////////////// DEV METHODS /////////////////////////////////////////

//Used to set up the database with the necessary tables and the admin account info
router.route('/setupDB').get((req, res) => {
    console.log('Setup DB Started');

    setup.addUsersTable().then((userTable) => {
        if (userTable != null) {
            setup.addUserDetailsTable().then((userDetsTable) => {
                if (userDetsTable != null) {
                    setup.addUserSkillsTable().then((userSkillsTable) => {
                        if (userSkillsTable != null) {
                            setup.addUserPicsTable().then((userPicsTable) => {
                                if (userPicsTable != null) {
                                    res.status(201).send('DB Setup Successfully');
                                } else {
                                    res.status(500).send('User Pics table failed')
                                }
                            })
                        } else {
                            res.status(500).send("User Skills table failed")
                        }
                    })
                } else {
                    res.status(500).send("User Details table failed")
                }
            })
        } else {
            res.status(500).send("Users table failed");
        }
    })
    
})

//will return a list of all users in the system, including their passwords
router.route('/users').get((req, res) => {
    db.getUserIDs().then((data) => {
        if (data != null) {
        res.status(200).json(data[0]);
        } else {
            res.status(404).send("Error");
        }
    })
})



///////////////////////////// User Creation and Login ///////////////////////////////

//Login method
router.route('/login').get((req, res) => {
    let loginUsername = req.body.loginName;
    let loginPassword = req.body.password;  

    db.getPassFromLogin(loginUsername).then((digest) => {
        if ((digest != null)) {
            db.comparePass(loginPassword, digest).then((isValid) => {
                if (isValid) {
                    res.status(200).send('User Login Successful');
                } else {
                    res.status(403).send('Bad Credentials, login unsuccessful');
                }
            })
        } else {
            res.status(403).send('Bad Credentials, login unsuccessful');
        }
    })   
})


//Creates a user
router.route('/createUser').post((req, res) => {
    db.checkUserExists(req.body.email, req.body.username).then((userExists) => {
        if (userExists == 0) { 
            const newUser = new User();
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            db.addUser(newUser).then((data) => {
                if (data != null) {
                    res.status(201).send('User successfully created');
                } else {
                    res.status(500).send('User Creation Failed');
                }
            })
        } else if (userExists == 1) {
            res.status(401).send('User already exists with this email')
        } else if (userExists == 2) {
            res.status(400).send('Username taken')
        }
    })

})


// Creates the user's details
router.route('/addUserDets').post((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if(user.length != 0) {
            const newUserDets = new UserDetails();
            newUserDets.id = user[0].id;
            newUserDets.username = user[0].username;
            newUserDets.birthdate = req.body.birthdate;
            newUserDets.occupation = req.body.occupation;
            newUserDets.experience = req.body.experience;
            newUserDets.location = req.body.location;
            newUserDets.worklink = req.body.worklink;
            newUserDets.pubemail = req.body.pubemail;
            newUserDets.description = req.body.description;
            newUserDets.achievements = req.body.achievements;
            db.addUserDetails(newUserDets).then((data) => {
                if (data != null) {
                    res.status(201).send('User Details successfully created');
                } else {
                    res.status(400).send('User Detail creation failed, malformatted request');
                }
            })
        } else {
            res.status(404).send("No user found");
        }
    })
})


//Creates the user's profile pic
router.route('/addUserPic').post((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if(user.length != 0) {
            const newUserPic = new UserPics();
            newUserPic.userID = user[0].id;
            newUserPic.profPic = req.body.profPic;
            db.addUserPic(newUserPic).then((data) => {
                if (data != null) {
                    res.status(201).send('User Pic successfully stored');
                } else {
                    res.status(400).send('User Pic creation failed, malformatted request');
                }
            })
        } else {
            res.status(404).send("No user found");
        }
    })
})


/////////////////////////////////// User profile POST/PATCH Endpoints /////////////////////////

//Adds a user's skills to the db
router.route('/addUserSkill').post((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if(user.length != 0) {
            const newUserSkill = new UserSkills();
            newUserSkill.userID = user[0].id;
            newUserSkill.skill = req.body.skill;
            newUserSkill.experience = req.body.experience;
            db.addUserSkill(newUserSkill).then((data) => {
                if (data != null) {
                    res.status(201).send('User Skill successfully stored');
                } else {
                    res.status(400).send('User Skill creation failed, malformatted request');
                }
            })
        } else {
            res.status(404).send("No user found");
        }
    })
})




////////////////////////////// User GET Endpoints //////////////////////////

//Gets a user's info by their username, will not return password
router.route('/getUser').get((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if (user.length != 0) {
            res.status(200).json({
                id: user[0].id,
                email: user[0].email,
                username: user[0].username,
                firstName: user[0].firstName,
                lastName: user[0].lastName
            });
        } else {
            res.status(404).send("User not found");
        }
    })
})

 

//Gets a user's info by their userID, will not return password
router.route('/getUserByID').get((req, res) => {
    db.getUserByID(req.body.id).then((data) => {
        if (data.length != 0) {
            res.status(200).json({
                id: data[0].id,
                email: data[0].email,
                username: data[0].username,
                firstName: data[0].firstName,
                lastName: data[0].lastName
            });
        } else {
            res.status(404).send("User does not Exist");
        }
    })
})



//Gets a user's user details by their username
router.route('/getUserDets').get((req, res) => {
    db.getUserDetsByUsername(req.body.username).then((userDets) => {
        if (userDets.length != 0 ) {
            res.status(200).json(userDets[0]);
        } else {
            res.status(404).send("User not found");
        }
    })
})


//Gets a user's list of skills
router.route('/getUserSkills').get((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if (user.length != 0) {
            db.getUserSkills(user[0].id).then((userSkills) => {
                if (userSkills.length != 0) {
                    res.status(200).json(userSkills);
                } else {
                    res.status(404).send("No user skills found")
                }
            })
        } else {
            res.status(404).send("User not found")
        }
    })
})


//Gets a user's profile pic
router.route('/getUserPic').get((req, res) => {
    db.getUserByUsername(req.body.username).then((user) => {
        if (user.length != 0) {
            db.getUserPic(user[0].id).then((userPic) => {
                if (userPic.length != 0) {
                    res.status(200).json(userPic[0].profPic);
                } else {
                    res.status(404).send("No user pic found")
                }
            })
        } else {
            res.status(404).send("User not found")
        }
    })
})

 
app.listen(port);
console.log('Order API is running at ' + port);