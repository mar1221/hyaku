Template.projectsNew.events({
    'submit form': function(event, template) {
        event.preventDefault();

        var title = _.trim(template.find('input#title').value),
            description = _.trim(template.find('textarea#description').value),
            leaderId = template.find('select#leader-id').value;
            clientId = template.find('select#client-id').value;

        var projectAttributes = {
            title: title,
            description: description,
            leader_id: leaderId,
            client_id: clientId,
            createdBy_id: Meteor.userId()
        };

        var project = Project.create(projectAttributes)

        if (project.errors) {
            Session.set('errors', project.errors);
        } else {
            $('.close-reveal-modal').click();
        }

        return false;
    }
});