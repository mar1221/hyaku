Meteor.methods({
    createProject: function(project, leaderId) {
        var project = Project.create(project);
        Roles.addUsersToRoles(leaderId, ['leader', 'manager'], project._id);
        Roles.addUsersToRoles(Meteor.userId(), ['manager'], project._id);
        return project;
    }
});
