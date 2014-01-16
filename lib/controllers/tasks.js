TasksListController = RouteController.extend({
    template: 'tasksList',
    data: function() {
        var project = Project.first({slug: this.params.slug});
        return {
            project: project,
            tasks: Task.where({project_id: project._id}, {sort: { createdAt : -1, subject: 1 }})
        };
    }
});