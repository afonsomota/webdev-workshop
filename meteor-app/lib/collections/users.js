Meteor.methods({
  addProfilePictureToUser: function(user){
    var fb = new Facebook(user.services.facebook.accessToken);
    var photoUrl = fb.getPictureUrl();
    user.services.facebook.profilePicture = photoUrl;
    return user;
  }
});
