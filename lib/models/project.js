var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Project = (function(_super) {
    __extends(Project, _super);

    function Project() {
        _ref = Project.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    Project._collection = new Meteor.Collection('projects');

    Project.has_many = [
        {
            name: 'tasks',
            foreign_key: 'project_id'
        }
    ];

    Project.has_and_belongs_to_many = [
        {
            name: 'members',
            class_name: 'User'
        }
    ];

    Project.defaults = {
        updatedAt: null,
        updatedById: null
    };

    Project.before_create = function(attr) {
        attr.slug = _.slugify(attr.title);
        return attr;
    };

    Project.prototype.validate = function() {
        if (!this.title || this.title.length === 0) {
            this.error('title', 'Title is required.');
        }
        if (!this.description || this.description.length === 0) {
            this.error('description', 'Description is required.');
        }
    };

    Project.prototype.leader = function() {
        _.each(this.members(), function(member) {
            if (_.indexOf(member.roles[this._id], 'leader') !== -1) {
                return member;
            }
        }, this);
    }

    return Project;

})(Minimongoid);