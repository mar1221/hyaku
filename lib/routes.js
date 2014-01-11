Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.map(function() {
    this.route('homepage', {
        path: '/',
        controller: HomepageController
    });

    this.route('projectsList', {
        path: '/projects',
        controller: ProjectsListController
    });
});