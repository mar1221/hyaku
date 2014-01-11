Template.projectsDetail.tasksNum = function() {
    return this.project.openTasksNum + this.project.closedTasksNum;
}