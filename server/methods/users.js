Meteor.methods({
    addUser: function(user) {
        return Accounts.createUser(user);
    }
});