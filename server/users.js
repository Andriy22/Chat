class Users {
    constructor() {
        this.users = [];
    }

    add(user) {
        this.users.push(user);
    }

    getById(id) {
        return this.users.find(user => user.id ===id);
    }

    remove(id) {
        const user = this.getById(id);

        if (user) {
            this.users = this.users.filter(user => user !==id);
        }
        return user;
    }
    getByRoom(room) {
        return this.users.filter(user => user.room === room);
    }
}


module.exports = function() {
    return new Users()
}