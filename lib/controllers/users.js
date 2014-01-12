UsersListController = RouteController.extend({
    template: 'usersList',
    data: function() {
        return {
            users: User.all()
        };
    }
});