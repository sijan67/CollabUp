class UserDetails{
    construtor(id, username, birthdate, occupation, skill, experience, location, worklink, pubemail, description, achievements){
        this.id = id;
        this.username = username;
        this.birtdate = birthdate;
        this.occupation = occupation;
        this.skill = skill;
        this.experience = experience;
        this.location = location;
        this.worklink = worklink;
        this.pubemail = pubemail;
        this.description = description;
        this.achievements = achievements;
    }
};

module.exports = { UserDetails };