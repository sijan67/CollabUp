class UserDetails{
    construtor(id, username, birthdate, occupation, experience, location, worklink, pubemail, description, achievements){
        this.id = id;
        this.username = username;
        this.birtdate = birthdate;
        this.occupation = occupation;
        this.experience = experience;
        this.location = location;
        this.worklink = worklink;
        this.pubemail = pubemail;
        this.description = description;
        this.achievements = achievements;
    }
};

module.exports = { UserDetails };