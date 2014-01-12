Migrations = new Meteor.Collection('migrations');

Meteor.startup(function() {

    if (!Migrations.findOne({name: 'createSampleUsers'})) {
        console.log("//-----------------------------------------------------------------------//")
        console.log("//------------//    Starting createSampleUsers Migration    //-----------//")
        console.log("//-----------------------------------------------------------------------//")

        Accounts.createUser({
            email: 'takacmarek1221@gmail.com',
            password: '123456',
            profile: {
                firstName: 'Marek',
                lastName: 'Takáč'
            }
        });

        Migrations.insert({name: "createSampleUsers"});
        console.log("//------------------------------------------------------------------------//")
        console.log("//------------//     Ending createSampleUsers Migration     //-----------//")
        console.log("//-----------------------------------------------------------------------//")
    }

    if (!Migrations.findOne({name: "createSampleProjects"})) {
        console.log("//--------------------------------------------------------------------------//")
        console.log("//------------//    Starting createSampleProjects Migration    //-----------//")
        console.log("//--------------------------------------------------------------------------//")
        var projects = [];

        projects.push({
            title: 'Hyaku',
            description: 'Project managment system for small - medium bussinesses.',
            slug: 'hyaku',
            tasksNum: {
                open: 0,
                close: 0,
                total: 0
            },
            membersNum: 0
        });
        projects.push({
            title: 'Climbing Mount Everest',
            description: "Don't forget your sweater!",
            slug: 'climbing-mount-everest',
            tasksNum: {
                open: 0,
                close: 0,
                total: 0
            },
            membersNum: 0
        });
        projects.push({
            title: 'Realestate Assistant',
            description: 'Content managment and administration system for realestate agencies',
            slug: 'realestate-assistant',
            tasksNum: {
                open: 4,
                close: 0,
                total: 4
            },
            membersNum: 0
        });

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

    if (!Migrations.findOne({name: "createSampleTasks"})) {
        console.log("//--------------------------------------------------------------------------//")
        console.log("//------------//    Starting createSampleTasks Migration    //-----------//")
        console.log("//--------------------------------------------------------------------------//")
        var project = Project.first({slug: 'realestate-assistant'});

        var tasks = [
            {
                subject: 'Automation of deployement',
                description: 'We need to find some way to automate as many deploy tasks as we can. ' +
                    'Try take a look on http://gruntjs.com/. Seems pretty promising.',
                priority: 3,
                project_id: project._id,
                createdAt: new Date(),
                updatedAt: null,
                closedAt: null,
                status: null,
                progress: 80
            },
            {
                subject: 'Setup the template',
                description: '',
                priority: 2,
                project_id: project._id,
                createdAt: new Date(),
                updatedAt: null,
                closedAt: null,
                status: null,
                progress: 35
            },
            {
                subject: 'Write tests for user roles',
                description: 'Users roles module should be well tested.',
                priority: 3,
                project_id: project._id,
                createdAt: new Date(),
                updatedAt: null,
                closedAt: null,
                status: null,
                progress: 50
            },
            {
                subject: 'Lorem ipsum',
                description: 'Lorem ipsum dolor sit amet consecetur elis.',
                priority: 1,
                project_id: project._id,
                createdAt: new Date(),
                updatedAt: null,
                closedAt: null,
                status: null,
                progress: 75
            }
        ];

        _.each(tasks, function(task, index) {
            task = new Task(task);
            task.save(task);
            console.log("---------------------");
            console.log("Creating task #" + (index + 1) + ': ' + task.subject);
        });

        Migrations.insert({name: "createSampleTasks"});
        console.log("//--------------------------------------------------------------------------//")
        console.log("//------------//     Ending createSampleTasks Migration     //--------------//")
        console.log("//--------------------------------------------------------------------------//")
    }
});