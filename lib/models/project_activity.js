var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

// project_activities
//     _id: String
//     id: String
//     project_id: String
//     actor: {
//         _id: String
//         name: String
//         url: String
//     }
//     message: String
//     resources: [
//         { _id: String, name: String, url: String }
//     ]
//     timestamp: Date

this.ProjectActivity = (function(_super) {
    __extends(ProjectActivity, _super);

    function ProjectActivity() {
        _ref = Project.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    ProjectActivity._collection = new Meteor.Collection('project_activities');

    ProjectActivity.belongs_to = [
        {
            name: 'project'
        }
    ];

    // ProjectActivity.defaults = {
    // };

    ProjectActivity.projectCreated = function(actor, project) {
        var activityAttributes = {
            project_id: project._id,
            actor: {
                _id: actor._id,
                name: actor.profile.firstName + ' ' + actor.profile.lastName,
                path: '/users/' + actor._id
            },
            message: "created project %s",
            resources: [
                { _id: project._id, name: project.title, path: '/projects/' + project.slug }
            ]
        };

        return ProjectActivity.create(activityAttributes);
    };

    ProjectActivity.taskCreated = function(actor, projectId, task) {
        var activityAttributes = {
            project_id: projectId,
            actor: {
                _id: actor._id,
                name: actor.profile.firstName + ' ' + actor.profile.lastName,
                path: '/users/' + actor._id
            },
            message: "created task %s",
            resources: [
                { _id: task._id, name: task.subject, path: '/tasks/' + task._id }
            ]
        };

        return ProjectActivity.create(activityAttributes);
    };

    // ProjectActivity.prototype.validate = function() {
    // };

    // ProjectActivity.prototype.something = function() {
    // };

    return ProjectActivity;

})(Minimongoid);