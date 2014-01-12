ProjectsListController = RouteController.extend({
    template: 'projectsList',
    data: function() {
        return {
            projects: Project.all()
        };
    }
});

ProjectsDetailController = RouteController.extend({
    template: 'projectsDetail',
    data: function() {
        var project = Project.first({slug: this.params.slug});
        return {
            project: project,
            tasks: project.tasks()
        };
    }
});