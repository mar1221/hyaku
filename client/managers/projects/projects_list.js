Template.projectsList.rendered = function() {
    $(document).foundation();
};

Template.projectsList.events({
    'click a#show-new-project-form' : function(){
        Session.set('errors', null);
    }
});