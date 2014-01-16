Template.tasksNew.events({
    'submit form': function(event, template) {
        event.preventDefault();

        var subject = _.trim(template.find('input#subject').value),
            assigneeId = _.trim(template.find('select#assignee-id').value),
            status = template.find('select#status').value;
            priority = template.find('select#priority').value;
            description = template.find('textarea#description').value;

        var taskAttributes = {
            subject: subject,
            assignee_id: assigneeId,
            status: status,
            priority: priority,
            description: description,
            createdBy_id: Meteor.userId()
        };

        var task = new Task(taskAttributes);

        task.project_id = this.project._id;

        if (task.isValid()) {
            Meteor.call('createTask', task, function(error) {
                if (error) {

                } else {
                    $('.close-reveal-modal').click();
                }
            })
        } else {
            Session.set('errors', task.errors);
        }

        return false;
    }
});