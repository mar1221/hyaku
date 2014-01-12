TasksListController = RouteController.extend({
    template: 'tasksList',
    data: function() {
        var project = Project.first({slug: this.params.slug});
        return {
            project: project,
            tasks: project.tasks()
        };
    }
});