ProjectsListController = RouteController.extend({
    template: 'projectsList',
    data: function() {
        return {
            projects: Project.all({sort: { createdAt : -1, title: 1 }})
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