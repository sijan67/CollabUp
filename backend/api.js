let userdb = require('./userOperations');
let projdb = require('./projectOperations')
let setup = require('./dbSetup');
let {User} = require('./dbSchema/users');
let {UserDetails} = require('./dbSchema/userDetails');
let {UserPics} = require('./dbSchema/userPics');
//let {UserSkills} = require('./dbSchema/userSkills');
let {UserProject} = require('./dbSchema/userProjects');
let {Project} = require('./dbSchema/projects');
let {ProjectPic} = require('./dbSchema/projectPics');
let {ProjectSkill} = require('./dbSchema/projectSkills')

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let router = express.Router();


app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
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

    setup.addUserRelatedTables().then((userTables) => {
        if (userTables == null) {
            res.status(500).send("User tables failed");
        } else {
            setup.addProjectRelatedTables().then((projectTables) => {
                if (projectTables == null) {
                    res.status(500).send("Project tables failed");
                } else {
                    res.status(201).send('DB Setup Successfully');
                }
            })
        }
    })
    
})


router.route('/resetDB').get((req, res) => {
    console.log('Resetting DB');

    setup.resetdb().then((tables) => {
        if (tables == null) {
            res.status(500).send("DB Reset Error");
        } else {
            res.status(201).send("DB Reset Successfully");
        }
    })
})

//will return a list of all users in the system, including their passwords
router.route('/users').get((req, res) => {
    userdb.getUserIDs().then((data) => {
        if (data != null) {
        res.status(200).json(data[0]);
        } else {
            res.status(404).send("Error");
        }
    })
})



///////////////////////////// User Creation and Login ///////////////////////////////

//Login method
router.route('/login/:loginName/pswd/:password').get((req, res) => {
    if(req.params.hasOwnProperty('loginName') && req.params.hasOwnProperty('password')) {
    let loginUsername = req.params.loginName;
    let loginPassword = req.params.password;  

    userdb.getPassFromLogin(loginUsername).then((digest) => {
        if ((digest != null)) {
            userdb.comparePass(loginPassword, digest).then((isValid) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})


//Creates a user
router.route('/createUser').post((req, res) => {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password') && req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')) {
    userdb.checkUserExists(req.body.email, req.body.username).then((userExists) => {
        if (userExists == 0) { 
            const newUser = new User();
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            userdb.addUser(newUser).then((data) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})


// Creates the user's details
router.route('/addUserDets').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('birthdate') && req.body.hasOwnProperty('occupation') && req.body.hasOwnProperty('skill') && req.body.hasOwnProperty('experience') 
        && req.body.hasOwnProperty('location') && req.body.hasOwnProperty('worklink') && req.body.hasOwnProperty('pubemail') && req.body.hasOwnProperty('description') && req.body.hasOwnProperty('achievements')) {
    userdb.getUserByUsername(req.body.username).then((user) => {
        
        if(user.length != 0) {
            const newUserDets = new UserDetails();
            newUserDets.id = user[0].id;
            newUserDets.username = user[0].username;
            newUserDets.birthdate = req.body.birthdate;
            newUserDets.occupation = req.body.occupation;
            newUserDets.skill = req.body.skill;
            newUserDets.experience = req.body.experience;
            newUserDets.location = req.body.location;
            newUserDets.worklink = req.body.worklink;
            newUserDets.pubemail = req.body.pubemail;
            newUserDets.description = req.body.description;
            newUserDets.achievements = req.body.achievements;
            userdb.addUserDetails(newUserDets).then((data) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})


//Creates the user's profile pic
router.route('/addUserPic').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('profPic')) {
    userdb.getUserByUsername(req.body.username).then((user) => {
        if(user.length != 0) {
            const newUserPic = new UserPics();
            newUserPic.userID = user[0].id;
            newUserPic.profPic = req.body.profPic;
            userdb.addUserPic(newUserPic).then((data) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})


/////////////////////////////////// User profile POST/PATCH Endpoints /////////////////////////

/*
//Adds a user's skills to the db
router.route('/addUserSkill').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('skill') && req.body.hasOwnProperty('experience')) {
    userdb.getUserByUsername(req.body.username).then((user) => {
        if(user.length != 0) {
            const newUserSkill = new UserSkills();
            newUserSkill.userID = user[0].id;
            newUserSkill.skill = req.body.skill;
            newUserSkill.experience = req.body.experience;
            userdb.addUserSkill(newUserSkill).then((data) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})
*/



////////////////////////////// User GET Endpoints //////////////////////////

//Gets a user's info by their username, will not return password
router.route('/getUser/:username').get((req, res) => {
    if (req.params.hasOwnProperty('username')) {
    userdb.getUserByUsername(req.params.username).then((user) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})

 

//Gets a user's info by their userID, will not return password
router.route('/getUserByID/:id').get((req, res) => {
    if (req.params.hasOwnProperty('id')) {
    userdb.getUserByID(req.params.id).then((data) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})



//Gets a user's user details by their username
router.route('/getUserDets/:username').get((req, res) => {
    if (req.params.hasOwnProperty('username')) {
    userdb.getUserDetsByUsername(req.params.username).then((userDets) => {
        if (userDets.length != 0 ) {
            res.status(200).json(userDets[0]);
        } else {
            res.status(404).send("User not found");
        }
    })
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})

/*
//Gets a user's list of skills
router.route('/getUserSkills').get((req, res) => {
    if (req.body.hasOwnProperty('username')) {
    userdb.getUserByUsername(req.body.username).then((user) => {
        if (user.length != 0) {
            userdb.getUserSkills(user[0].id).then((userSkills) => {
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
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})
*/

//Gets a user's profile pic
router.route('/getUserPic/:username').get((req, res) => {
    if (req.params.hasOwnProperty('username')) {
    userdb.getUserByUsername(req.params.username).then((user) => {
        if (user.length != 0) {
            userdb.getUserPic(user[0].id).then((userPic) => {
                if (userPic.length != 0 && userPic[0].profPic != null) {
                    let base64 = userPic[0].profPic.toString('base64');
                    res.status(200).json({ "profPic": base64});
                } else {
                    res.status(404).send("No user pic found")
                }
            })
        } else {
            res.status(404).send("User not found")
        }
    })
    } else {
        res.status(400).send('Malformatted Request. Improper request body.');
    }
})




///////////////////////////////// PROJECT Endpoints //////////////////////////////////

//adds the project to the projects table and the project as created by the owner to the userProjects table
//returns the projectID
router.route('/addNewProject').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('projTitle') && req.body.hasOwnProperty('projIdea') && req.body.hasOwnProperty('timeCreated')) {
        userdb.getUserByUsername(req.body.username).then((user) => {
            if (user.length != 0) {
                const newProj = new Project();
                newProj.ownerID = user[0].id;
                newProj.title = req.body.projTitle;
                newProj.idea = req.body.projIdea;
                newProj.timeCreated = req.body.timeCreated;
                projdb.addProject(newProj).then((data) => {
                    if (data != null) {
                        res.status(201).json({"projectID" : data})
                    } else {
                        res.status(500).send("Project creation failed")
                    }
                })
            } else {
                res.status(404).send("User not found")
            }
        })
    } else {
        res.status(400).send('Malformatted Request. Improper request body')
    }
})


router.route('/addProjectPic').post((req, res) => {
    if (req.body.hasOwnProperty('projectID') && req.body.hasOwnProperty('projPic')) {
        const newPic = new ProjectPic();
        newPic.projID = req.body.projectID;
        newPic.projPic = req.body.projPic;
        projdb.addProjectPic(newPic).then((data) => {
            if (data != null) {
                res.status(201).send("Project Pic successfully added")
            } else {
                res.status(500).send("Project Pic Creation Failed")
            }
        })
    } else {
        res.status(400).send('Malformatted Request. Improper request body')
    }
})



router.route('/addProjectSkill').post((req, res) => {
    if (req.body.hasOwnProperty('projectID') && req.body.hasOwnProperty('relatedSkill')) {
        const newSkill = new ProjectSkill();
        newSkill.projID = req.body.projectID;
        newSkill.relatedSkill = req.body.relatedSkill;
        projdb.addProjectSkill(newSkill).then((data) => {
            if (data != null) {
                res.status(201).send("Project Skill successfully added")
            } else {
                res.status(500).send("Project Skill Creation Failed")
            }
        })
    } else {
        res.status(400).send('Malformatted Request. Improper request body')
    }
})
 

//TODO: check that they haven't already liked it
router.route('/likeProject').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('projectID')) {
        userdb.getUserByUsername(req.body.username).then((user) => {
            if (user.length != 0) {
                const newUserProj = new UserProject();
                newUserProj.userID = user[0].id;
                newUserProj.projID = req.body.projectID;
                newUserProj.created = 0;
                projdb.likeProject(newUserProj).then((data) => {
                    if (data != null) {
                        res.status(201).send("Project Successfully liked")
                    } else {
                        res.status(500).send("Project Like Failed")
                    }
                })
            } else {
                res.status(404).send("User not found")
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})



router.route('/updateProject').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('projectID') && (req.body.hasOwnProperty('newTitle') || req.body.hasOwnProperty('newIdea'))) {
        projdb.getProjectByID(req.body.projectID).then((project) => {
            if (project == null) {
                res.status(500).send("Project Update Failed")
            } else if (project.length == 0) {
                res.status(404).send("Project Not Found")
            } else {
                userdb.getUserByUsername(req.body.username).then((user) => {
                    if (user == null || user.length == 0) {
                        res.status(404).send("User not Found")
                    } else if (user[0].id != project[0].ownerID) {
                        res.status(400).send("User is not the owner of this project")
                    } else {
                        projdb.updateProject(req).then((data) => {
                            if (data != null) {
                                res.status(200).send("Project Successfully Updated")
                            } else {
                                res.status(500).send("Issue updating project")
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})



router.route('/updateProjectUnsafe').post((req, res) => {
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('projectID') && (req.body.hasOwnProperty('newTitle') || req.body.hasOwnProperty('newIdea'))) {
        projdb.getProjectByID(req.body.projectID).then((project) => {
            if (project == null) {
                res.status(500).send("Project Update Failed")
            } else if (project.length == 0) {
                res.status(404).send("Project Not Found")
            } else {
                userdb.getUserByUsername(req.body.username).then((user) => {
                    if (user == null || user.length == 0) {
                        res.status(404).send("User not Found")
                    } else if (user[0].id != project[0].ownerID) {
                        res.status(400).send("User is not the owner of this project")
                    } else {
                        projdb.updateProjectUnSafe(req).then((data) => {
                            if (data != null) {
                                res.status(200).send("Project Successfully Updated")
                            } else {
                                res.status(500).send("Issue updating project")
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})



//TODO: make this sorted by something, maybe sort reverse by project id?
router.route('/getProjectList').get((req, res) => {
    projdb.getProjectList().then((projects) => {
        if (projects != null) {
            if (projects.length != 0) {
                res.status(200).json(projects);
            } else {
                res.status(404).send("No projects found")
            }
        } else {
            res.status(500).send("Error getting Project List")
        }
    })
})


router.route('/getProjectByID/:projectID').get((req, res) => {
    if (req.params.hasOwnProperty('projectID')) {
        projdb.getProjectByID(req.params.projectID).then((project) => {
            if (project != null) {
                if (project.length != 0) {
                    res.status(200).json(project[0]);
                } else {
                    res.status(404).send("Project not Found")
                }
            } else {
                res.status(500).send("Error getting Project")
            }
        })

    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
    
})



router.route('/getProjLikeCount/:projectID').get((req, res) => {
    if (req.params.hasOwnProperty('projectID')) {
        projdb.getLikeCount(req.params.projectID).then((likeCount) => {
            if (likeCount != null) {
                res.status(200).json(likeCount[0]);
            } else {
                res.status(500).send("Error retreiving like count")
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})


router.route('/getProjectSkills/:projectID').get((req, res) => {
    if (req.params.hasOwnProperty('projectID')) {
        projdb.getProjectSkills(req.params.projectID).then((projSkills) => {
            if (projSkills != null) {
                if (projSkills.length != 0) {
                    res.status(200).json(projSkills);
                } else {
                    res.status(404).send("No Project Skills Found")
                }
            } else {
                res.status(500).send("Error getting Project Skills")
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})


router.route('/getProjectPic/:projectID').get((req, res) => {
    if(req.params.hasOwnProperty('projectID')){
        projdb.getProjectPic(req.params.projectID).then((projPic) => {
            if (projPic != null) {
                if (projPic.length != 0 && projPic[0].projPic != null) {
                    let base64 = projPic[0].projPic.toString('base64');
                    res.status(200).json({ "projPic": base64 });
                } else {
                    res.status(404).send("No Project Pic Found")
                }
            } else {
                res.status(500).send("Error getting Project Pic")
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
}) 


router.route('/getUserProjects/:username').get((req, res) => {
    if (req.params.hasOwnProperty('username')) {
        userdb.getUserByUsername(req.params.username).then((user) => {
            if (user.length != 0) {
                projdb.getUserProjects(user[0].id).then((userProjects) => {
                    if (userProjects != null) {
                        if (userProjects.length != 0) {
                            res.status(200).json(userProjects);
                        } else {
                            res.status(404).send("No User Projects Found")
                        }
                    } else {
                        res.status(500).send("Error getting User Projects")
                    }
                })
            } else {
                res.status(404).send("No User Projects Found")
            }
        })
    } else {
        res.status(400).send("Malformatted Request. Improper request body")
    }
})


app.listen(port);
console.log('Order API is running at ' + port);