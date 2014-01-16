Template.tasksList.rendered = function() {
    $(document).foundation();
};

Template.tasksList.helpers({
    humanizeStatus: function(id) {
        return _.findWhere(Task.statuses(), {id: parseInt(id)}).name;
    },
    humanizePriority: function(id) {
        return _.findWhere(Task.priorities(), {id: parseInt(id)}).name;
    }
});

Template.tasksList.events({
    'click a#show-new-task-form' : function(){
        Session.set('errors', null);
    }
});