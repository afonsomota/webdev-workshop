if (Meteor.isClient) {
  Template.feed.helpers({
    posts: function(){
      return _.map(Posts.find().fetch(),function(post){
        post.upVotesCount = post.upVotes.length;
        post.downVotesCount = post.downVotes.length;
        var owner = Meteor.users.findOne(post.owner);
        post.photo = owner.services.facebook.profilePicture;
        post.name = owner.services.facebook.name;
        post.statusLines = post.status.split(/\r?\n/);
        return post;
      }).reverse();       
    } 
  });

  Template.feed.events({
    'click .js-upvote': function(event,template){
      var el = $(event.target);
      var postId = event.target.dataset.id;
      Meteor.call('upVote',postId,function(err,res){
        if(!err){
          var el = $(event.target);

        }
      });
    }
  });

  Template.postForm.events({
    "click #submit": function(event,template){
      var status = document.getElementById("new-status").value;
      console.log(status.split("/n"));
      Meteor.call('postStatus',status);
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
