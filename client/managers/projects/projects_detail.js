Template.projectsDetail.tasksNum = function() {
    return this.project.openTasksNum + this.project.closedTasksNum;
}

Template.projectsDetail.helpers({
    buildActivityMessage: function(activity) {
        return '<em>' + activity.message.replace('%s', '</em><strong><a href="' + activity.resources[0].path + '">' + activity.resources[0].name + '</a></strong>');
    },
    formatDateTime: function(dateTime) {
        return moment(dateTime).format('D. M. YYYY HH:mm');
    }
})