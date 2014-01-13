Template.usersNew.errors = function() {
    var errors = Session.get('errors');
    var validationErrors = {};

    _.each(errors, function(error) {
        for (property in error) {
            validationErrors[property] = validationErrors[property] || []
            validationErrors[property].push(error[property]);
        };
    });

    return validationErrors;
};

Template.usersNew.events({
    'submit form': function(event, template) {
        event.preventDefault();

        var email = _.trim(template.find('input#email').value),
            firstName = _.trim(template.find('input#first-name').value),
            lastName = _.trim(template.find('input#last-name').value);

        var user = template.data.user;
        user.errors = [];

        user.emails = [{ address: email }];
        user.profile.firstName = firstName;
        user.profile.lastName = lastName;

        if (user.isValid()) {
            Meteor.call('addUser', user, function(error) {
                if (error) {
                    // account creation failed
                } else {
                    Router.go('/users');
                }
            });
        } else {
            Session.set('errors', user.errors);
        }

        return false;
    }
});