HomepageController = RouteController.extend({
    template: 'homepage'
});

ProjectsListController = RouteController.extend({
    template: 'projectsList',
    data: function() {
        return {
            projects: Project.all()
        };
    }
});