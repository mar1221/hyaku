Template.sessionsNew.events({
    'submit #login-form': function(e, t) {
        e.preventDefault();

        var email = t.find('#email').value,
            password = t.find('#password').value;

        // Trim and validate!

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                // user not found or password incorect
            } else {
                Router.go('/');
            }
        });
        return false;
    }
});