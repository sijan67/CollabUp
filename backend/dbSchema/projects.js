class Project{
    construtor(id, ownerID, title, idea, timeCreated) {
        this.id = id;
        this.ownerID = ownerID;
        this.title = title;
        this.idea = idea;
        this.timeCreated = timeCreated;
    }
};

module.exports = { Project };