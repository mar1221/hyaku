Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});


var filters = {
    isLoggedIn: function() {
        if (!Meteor.user()) {
            Router.go('/login');
        }
    }
};

Router.before(filters.isLoggedIn, {except: ['login']});

Router.map(function() {
    this.route('homepage', {
        path: '/',
        controller: HomepageController
    });

    this.route('login', {
        path: '/login',
        controller: SessionsNewController
    });

    this.route('projectsList', {
        path: '/projects',
        controller: ProjectsListController
    });
    this.route('projectsDetail', {
        path: '/projects/:slug',
        controller: ProjectsDetailController
    });

    this.route('tasksList', {
        path: '/projects/:slug/tasks',
        controller: TasksListController
    })
});