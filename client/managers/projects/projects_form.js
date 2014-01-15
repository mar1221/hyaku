Template.projectsForm.errors = function() {
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

Template.projectsForm.users = function() {
    return User.all();
}

Template.projectsForm.clients = function() {
    return [{_id: 1, name: 'eLock Technologies'}, {_id: 2, name: 'Osobní makléři'}]
}