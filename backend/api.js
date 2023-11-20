//import User from './dbSchema/users.js'

let db = require('./userOperations');
let setup = require('./dbSetup');
let {User} = require('./dbSchema/users');
let {UserDetails} = require('./dbSchema/userDetails');
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
    console.log('middleware');
    next();
});


router.route('/setupDB').get((req, res) => {
    console.log('Setup DB Started');

    setup.addUsersTable().then(
        setup.addUserDetailsTable()).then(
            setup.addUserSkillsTable()).then(
                setup.addUserPicsTable()).then((data) => {
                    res.status(201).send('DB Setup Successfully');
                })
    
})


//TODO: encrypt password
router.route('/createUser').post((req, res) => {
    db.checkUserExists(req.body.email, req.body.username).then((userExists) => {
        if (userExists == 0) { 
            db.getNewUserID().then((newID) => {
            console.log(newID)
            console.log(req.body.email)
            const newUser = new User();
            newUser.id = newID;
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
            })
        } else if (userExists == 1) {
            res.status(401).send('User already exists with this email')
        } else if (userExists == 2) {
            res.status(400).send('Username taken')
        }
    })

})


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


//TODO: Encrypt password
router.route('/login').get((req, res) => {
    let loginUsername = req.body.loginName;
    let loginPassword = req.body.password;  

    db.getPassFromLogin(loginUsername).then((pass) => {
        if ((pass != null) && (pass == loginPassword)) {
            res.status(200).send('User Login Successful');
        } else {
            res.status(403).send('Bad Credentials, login unsuccessful');
        }
    })   
})




router.route('/users').get((req, res) => {
    db.getUserIDs().then((data) => {
        if (data != null) {
        res.status(200).json(data[0]);
        } else {
            res.status(404).send("Error");
        }
    })
})
 


router.route('/user').get((req, res) => {
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

 
app.listen(port);
console.log('Order API is running at ' + port);