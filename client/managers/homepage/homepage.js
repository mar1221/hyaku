Template.homepage.rendered = function() {
    console.log('Welcome to the Meteor starter app!');
}

Template.homepage.events({
    'click button': function() {
        alert('You clicked button.');
    }
})