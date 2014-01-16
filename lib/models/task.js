var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Task = (function(_super) {
    __extends(Task, _super);

    function Task() {
        _ref = Task.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    Task._collection = new Meteor.Collection('tasks');

    Task.belongs_to = [
        { name: 'project' },
        { name: 'assignee', class_name: 'User' }
    ];

    Task.defaults = {
        updatedAt: null,
        updatedById: null,
        progress: 0,
        status: 1,
        priority: 2
    };

    Task.statuses = function() {
        return [
            { id: 1, name: 'New' },
            { id: 2, name: 'Accepted' },
            { id: 3, name: 'Closed' }
        ];
    };

    Task.priorities = function() {
        return [
            { id: 1, name: 'Low' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'High' }
        ];
    };

    Task.prototype.validate = function() {
        if (!(this.subject && this.subject.length > 0)) {
            return this.error('subject', 'Task subject is required.');
        }
    };

    return Task;

})(Minimongoid);