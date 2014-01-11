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

  Project.defaults = {
    title: '',
    description: '',
    openTasksNum: 0,
    closedTasksNum: 0
  };

  Project.prototype.validate = function() {
    if (!(this.title && this.title.length > 0)) {
      return this.error('title', 'Project title is required.');
    }
  };

  return Project;

})(Minimongoid);