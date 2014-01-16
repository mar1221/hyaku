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
            client_id: clientId,
            createdBy_id: Meteor.userId()
        };

        // add current user (project creator) and project leader to project members
        projectAttributes.member_ids = _.unique([Meteor.userId(), leaderId]);

        var project = new Project(projectAttributes);

        if (project.isValid()) {
            Meteor.call('createProject', project, leaderId, function(error) {
                if (error) {

                } else {
                    $('.close-reveal-modal').click();
                }
            })
        } else {
            Session.set('errors', project.errors);
        }

        return false;
    }
});