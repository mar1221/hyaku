var global;

global = this;

this.Minimongoid = (function() {
  Minimongoid.prototype.id = void 0;

  Minimongoid.prototype.errors = false;

  function Minimongoid(attr, parent) {
    var belongs_to, class_name, embeds_many, foreign_key, habtm, has_many, identifier, name, relation, selector, self, val, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _name, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if (attr == null) {
      attr = {};
    }
    if (parent == null) {
      parent = null;
    }
    if (attr._id) {
      if (this.constructor._object_id) {
        this.id = attr._id._str;
      } else {
        this.id = attr._id;
      }
      this._id = this.id;
    }
    _ref = this.constructor.has_and_belongs_to_many;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      habtm = _ref[_i];
      identifier = "" + (_.singularize(habtm.name)) + "_ids";
      this[identifier] || (this[identifier] = []);
    }
    _ref1 = this.constructor.embeds_many;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      embeds_many = _ref1[_j];
      this[_name = embeds_many.name] || (this[_name] = []);
    }
    if (this.constructor.embedded_in && parent) {
      this[this.constructor.embedded_in] = parent;
    }
    for (name in attr) {
      value = attr[name];
      if (name.match(/^_id/)) {
        continue;
      }
      if (name.match(/_id$/) && (value instanceof Meteor.Collection.ObjectID)) {
        this[name] = value._str;
      } else if ((embeds_many = _.findWhere(this.constructor.embeds_many, {
        name: name
      }))) {
        class_name = embeds_many.class_name || _.classify(_.singularize(name));
        this[name] = global[class_name].modelize(value, this);
      } else {
        this[name] = value;
      }
    }
    _ref2 = this.constructor.defaults;
    for (attr in _ref2) {
      val = _ref2[attr];
      if (typeof this[attr] === 'undefined') {
        this[attr] = val;
      }
    }
    self = this;
    _ref3 = this.constructor.belongs_to;
    for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
      belongs_to = _ref3[_k];
      relation = belongs_to.name;
      identifier = belongs_to.identifier || ("" + relation + "_id");
      class_name = belongs_to.class_name || _.titleize(relation);
      this[relation] = (function(relation, identifier, class_name) {
        return function(options) {
          if (options == null) {
            options = {};
          }
          if (global[class_name] && self[identifier]) {
            return global[class_name].find(self[identifier], options);
          } else {
            return false;
          }
        };
      })(relation, identifier, class_name);
    }
    _ref4 = this.constructor.has_many;
    for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
      has_many = _ref4[_l];
      relation = has_many.name;
      selector = {};
      if (!(foreign_key = has_many.foreign_key)) {
        foreign_key = "" + (_.singularize(this.constructor.to_s().toLowerCase())) + "_id";
      }
      if (this.constructor._object_id) {
        selector[foreign_key] = new Meteor.Collection.ObjectID(this.id);
      } else {
        selector[foreign_key] = this.id;
      }
      class_name = has_many.class_name || _.titleize(_.singularize(relation));
      this[relation] = (function(relation, selector, class_name) {
        return function(mod_selector, options) {
          if (mod_selector == null) {
            mod_selector = {};
          }
          if (options == null) {
            options = {};
          }
          mod_selector = _.extend(mod_selector, selector);
          if (global[class_name]) {
            return global[class_name].where(mod_selector, options);
          }
        };
      })(relation, selector, class_name);
    }
    _ref5 = this.constructor.has_and_belongs_to_many;
    for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
      habtm = _ref5[_m];
      relation = habtm.name;
      identifier = "" + (_.singularize(relation)) + "_ids";
      class_name = habtm.class_name || _.titleize(_.singularize(relation));
      this[relation] = (function(relation, identifier, class_name) {
        return function(mod_selector, options) {
          if (mod_selector == null) {
            mod_selector = {};
          }
          if (options == null) {
            options = {};
          }
          selector = {
            _id: {
              $in: self[identifier]
            }
          };
          mod_selector = _.extend(mod_selector, selector);
          if (global[class_name] && self[identifier] && self[identifier].length) {
            return global[class_name].where(mod_selector, options);
          } else {
            return [];
          }
        };
      })(relation, identifier, class_name);
    }
  }

  Minimongoid.prototype.r = function(relation) {
    return this.related(relation);
  };

  Minimongoid.prototype.related = function(relation, options) {
    var belongs_to, foreign_key, habtm, has_many, identifier, selector, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (options == null) {
      options = {};
    }
    _ref = this.constructor.belongs_to;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      belongs_to = _ref[_i];
      if (relation === belongs_to.name) {
        identifier = "" + belongs_to.name + "_id";
        if (!belongs_to.class_name) {
          belongs_to.class_name = _.titleize(belongs_to.name);
        }
        if (this[identifier]) {
          return global[belongs_to.class_name].find(this[identifier], options);
        } else {
          return false;
        }
      }
    }
    _ref1 = this.constructor.has_many;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      has_many = _ref1[_j];
      if (relation === has_many.name) {
        selector = {};
        if (!(foreign_key = has_many.foreign_key)) {
          foreign_key = "" + (_.singularize(this.constructor.to_s().toLowerCase())) + "_id";
        }
        if (this.constructor._object_id) {
          selector[foreign_key] = new Meteor.Collection.ObjectID(this.id);
        } else {
          selector[foreign_key] = this.id;
        }
        if (!has_many.class_name) {
          has_many.class_name = _.titleize(_.singularize(has_many.name));
        }
        return global[has_many.class_name].where(selector, options);
      }
    }
    _ref2 = this.constructor.has_and_belongs_to_many;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      habtm = _ref2[_k];
      if (relation === habtm.name) {
        identifier = "" + (_.singularize(habtm.name)) + "_ids";
        if (!habtm.class_name) {
          habtm.class_name = _.titleize(_.singularize(habtm.name));
        }
        if (this[identifier] && this[identifier].length) {
          return global[habtm.class_name].where({
            _id: {
              $in: this[identifier]
            }
          }, options);
        } else {
          return [];
        }
      }
    }
    return console.warn("Method " + relation + " does not exist for " + (this.constructor.to_s()) + ".");
  };

  Minimongoid.prototype.error = function(field, message) {
    var obj;
    this.errors || (this.errors = []);
    obj = {};
    obj[field] = message;
    return this.errors.push(obj);
  };

  Minimongoid.prototype.isValid = function(attr) {
    if (attr == null) {
      attr = {};
    }
    this.validate();
    return !this.errors;
  };

  Minimongoid.prototype.validate = function() {
    return true;
  };

  Minimongoid.prototype.save = function(attr) {
    var k, v;
    console.log(attr);
    if (attr == null) {
      attr = {};
    }
    this.errors = false;
    for (k in attr) {
      v = attr[k];
      this[k] = v;
    }
    if (!this.isValid()) {
      return this;
    }
    if (this.id != null) {
      this.constructor._collection.update(this.id, {
        $set: attr
      });
    } else {
      this.id = this._id = this.constructor._collection.insert(attr);
    }
    if (this.constructor.after_save) {
      this.constructor.after_save(this);
    }
    return this;
  };

  Minimongoid.prototype.update = function(attr) {
    return this.save(attr);
  };

  Minimongoid.prototype.push = function(data) {
    return this.constructor._collection.update(this.id, {
      $addToSet: data
    });
  };

  Minimongoid.prototype.pull = function(data) {
    return this.constructor._collection.update(this.id, {
      $pull: data
    });
  };

  Minimongoid.prototype.del = function(field) {
    var unset;
    unset = {};
    unset[field] = "";
    return this.constructor._collection.update(this.id, {
      $unset: unset
    });
  };

  Minimongoid.prototype.destroy = function() {
    if (this.id != null) {
      this.constructor._collection.remove(this.id);
      return this.id = this._id = null;
    }
  };

  Minimongoid.prototype.reload = function() {
    if (this.id != null) {
      return this.constructor.find(this.id);
    }
  };

  Minimongoid._object_id = false;

  Minimongoid._collection = void 0;

  Minimongoid._type = void 0;

  Minimongoid._debug = false;

  Minimongoid.defaults = [];

  Minimongoid.belongs_to = [];

  Minimongoid.has_many = [];

  Minimongoid.has_and_belongs_to_many = [];

  Minimongoid.embedded_in = null;

  Minimongoid.embeds_many = [];

  Minimongoid.init = function(attr, parent) {
    if (parent == null) {
      parent = null;
    }
    return new this(attr, parent);
  };

  Minimongoid.to_s = function() {
    if (this._collection) {
      return this._collection._name;
    } else {
      return "embedded";
    }
  };

  Minimongoid.create = function(attr) {
    var doc;
    attr.createdAt || (attr.createdAt = new Date());
    if (this.before_create) {
      attr = this.before_create(attr);
    }
    doc = this.init(attr);
    doc = doc.save(attr);
    if (doc && this.after_create) {
      return this.after_create(doc);
    } else {
      return doc;
    }
  };

  Minimongoid.where = function(selector, options) {
    var result;
    if (selector == null) {
      selector = {};
    }
    if (options == null) {
      options = {};
    }
    if (this._debug) {
      console.info(" --- WHERE ---");
      console.info("  " + (_.singularize(_.classify(this.to_s()))) + ".where(" + (JSON.stringify(selector)) + (!_.isEmpty(options) ? ',' + JSON.stringify(options) : '') + ")");
    }
    result = this.modelize(this.find(selector, options));
    if (this._debug && result) {
      console.info("  > found " + result.length);
    }
    return result;
  };

  Minimongoid.first = function(selector, options) {
    var doc;
    if (selector == null) {
      selector = {};
    }
    if (options == null) {
      options = {};
    }
    if (this._debug) {
      console.info(" --- FIRST ---");
      console.info("  " + (_.singularize(_.classify(this.to_s()))) + ".first(" + (JSON.stringify(selector)) + (!_.isEmpty(options) ? ',' + JSON.stringify(options) : '') + ")");
    }
    if (doc = this._collection.findOne(selector, options)) {
      return this.init(doc);
    }
  };

  Minimongoid.last = function(selector, options) {
    var doc;
    if (selector == null) {
      selector = {};
    }
    if (options == null) {
      options = {};
    }
    options.sort = {
      createdAt: -1
    };
    if (doc = this._collection.findOne(selector, options)) {
      return this.init(doc);
    }
  };

  Minimongoid.all = function(options) {
    return this.where({}, options);
  };

  Minimongoid.find = function(selector, options) {
    if (selector == null) {
      selector = {};
    }
    if (options == null) {
      options = {};
    }
    if (typeof selector !== 'object') {
      if (this._object_id) {
        selector = new Meteor.Collection.ObjectID(selector);
      }
      return this.first({
        _id: selector
      }, options);
    } else if (selector instanceof Meteor.Collection.ObjectID) {
      return this.first({
        _id: selector
      }, options);
    } else {
      if (this._object_id) {
        if (selector && selector._id) {
          if (typeof selector._id === 'string') {
            selector._id = new Meteor.Collection.ObjectID(selector._id);
          } else if (selector._id['$in']) {
            selector._id['$in'] = _.map_object_id(selector._id['$in']);
          }
        }
        if (selector && selector._ids) {
          selector._ids = _.map(selector._ids, function(id) {
            return new Meteor.Collection.ObjectID(id);
          });
        }
      }
      return this._collection.find(selector, options);
    }
  };

  Minimongoid.count = function(selector, options) {
    if (selector == null) {
      selector = {};
    }
    if (options == null) {
      options = {};
    }
    return this.find(selector, options).count();
  };

  Minimongoid.destroyAll = function(selector) {
    if (selector == null) {
      selector = {};
    }
    return this._collection.remove(selector);
  };

  Minimongoid.modelize = function(cursor, parent) {
    var self;
    if (parent == null) {
      parent = null;
    }
    self = this;
    return cursor.map(function(i) {
      return self.init(i, parent);
    });
  };

  return Minimongoid;

})();

_.singularize = function(s) {
  return s = s.replace(/s$/, "");
};