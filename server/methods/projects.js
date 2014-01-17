Meteor.methods({
    createProject: function(project, leaderId) {
        var project = Project.create(project);
        Roles.addUsersToRoles(leaderId, ['leader', 'manager'], project._id);
        Roles.addUsersToRoles(Meteor.userId(), ['manager'], project._id);
        ProjectActivity.projectCreated(Meteor.user(), project);
        return project;
    },
    createTask: function(task) {
        var task = Task.create(task);
        ProjectActivity.taskCreated(Meteor.user(), task.project_id, task);
        return task;
    }
});
