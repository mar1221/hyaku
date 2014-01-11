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
        return {
            project: Project.first({slug: this.params.slug})
        };
    }
});