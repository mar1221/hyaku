var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.User = (function(_super) {
    __extends(User, _super);

    function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    User._collection = Meteor.users;

    User.has_many = [
        { name: 'assignedTasks', class_name: 'Task', foreign_key: 'assignee_id' }
    ];

    User.prototype.fullName = function() {
        return this.profile.firstName + ' ' + this.profile.lastName;
    }

    User.prototype.email = function() {
        if (this.emails && this.emails.length) {
            return this.emails[0].address;
        } else {
            return '';
        }
    };

    return User;

})(Minimongoid);