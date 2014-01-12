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
        { name: 'project' }, { name: 'user' }
    ];

    // Task.defaults = {
    //     title: '',
    //     description: '',
    //     openTasksNum: 0,
    //     closedTasksNum: 0
    // };

    Task.prototype.validate = function() {
        if (!(this.subject && this.subject.length > 0)) {
            return this.error('subject', 'Task subject is required.');
        }
    };

    return Task;

})(Minimongoid);