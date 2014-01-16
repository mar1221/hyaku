Template.tasksForm.errors = function() {
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

Template.tasksForm.users = function() {
    return User.all();
}

Template.tasksForm.statuses = function() {
    return Task.statuses();
};

Template.tasksForm.priorities = function() {
    return Task.priorities();
};
