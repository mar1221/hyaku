Meteor.methods({
    addUser: function(user) {
        var userId = Accounts.createUser(user);
        if (!user.password) {
            Accounts.emailTemplates.siteName = 'Hyaku';
            Accounts.emailTemplates.from = 'Support <support@hyaku.com>';
            Accounts.emailTemplates.enrollAccount.subject = function(user) {
                return "You have been invited to join Hyaku!";
            };
            Accounts.emailTemplates.enrollAccount.text = function(user, url) {
                return 'Welcome ' + user.profile.firstName + ' ' + user.profile.lastName +
                    '\n\n To ativate your account, please follow the link bellow:\n' +
                    url;
            }
            Accounts.sendEnrollmentEmail(userId);
        }
        return userId;
    }
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})