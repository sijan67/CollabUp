class UserProject{
    //if created = 1, the user is the creator of the project
    //if created = 0, the user is a follwer of the project
    construtor(id, userID, projID, created) {
        this.id = id;
        this.userID = userID;
        this.projID = projID;
        this.created = created;
    }
};

module.exports = { UserProject };