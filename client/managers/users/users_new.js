Template.usersNew.events({
    'submit form': function(e, t) {
        e.preventDefault();

        var user = {
            email: t.find('input#email').value,
            password: t.find('input#password').value,
            profile: {
                firstName: t.find('input#first-name').value,
                lastName: t.find('input#last-name').value
            }
        };

        // Trim and validate

        Meteor.call('addUser', user, function(error) {
            if (error) {
                // account creation failed
            } else {
                Router.go('/users');
            }
        });
        return false;
    }
});