Template.topMenu.events({
    'click a#logout' : function(e) {
        e.preventDefault();

        if (Meteor.user()) {
            Meteor.logout(function(error) {
                if (error) {
                    // user isn't log in etc...
                } else {
                    Router.go('/login');
                }
            })
        }
    }
})