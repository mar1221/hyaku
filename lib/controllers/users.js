UsersListController = RouteController.extend({
    template: 'usersList',
    data: function() {
        return {
            users: User.all()
        };
    }
});

UsersNewController = RouteController.extend({
    template: 'usersNew'
});