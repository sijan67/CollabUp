class User {
    construtor(id, email, username, password, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
};

module.exports = { User }
