Migrations = new Meteor.Collection('migrations');

Meteor.startup(function() {

  if (!Migrations.findOne({name: "createSampleProjects"})) {
    console.log("//--------------------------------------------------------------------------//")
    console.log("//------------//    Starting createSampleProjects Migration    //-----------//")
    console.log("//--------------------------------------------------------------------------//")
    var projects = [];

    projects.push(
        { title: 'Hyaku', description: 'Project managment system for small - medium bussinesses.' },
        { title: 'Realestate Assistant', description: 'Content managment and administration system for realestate agencies' },
        { title: 'Climbing Mount Everest', description: "Don't forget your sweater!" }
    );

    _.each(projects, function(project, index) {
        project = new Project(project);
        project.save(project);
        console.log("---------------------");
        console.log("Creating project #" + (index + 1) + ': ' + project.title);
    });

    Migrations.insert({name: "createSampleProjects"});
    console.log("//--------------------------------------------------------------------------//")
    console.log("//------------//     Ending createSampleProjects Migration     //-----------//")
    console.log("//--------------------------------------------------------------------------//")
  }
});