Posts = new Meteor.Collection("posts");

var userHasVote = function(voter){
  return voter == Meteor.user()._id;
};

Meteor.methods({
  postStatus: function(status){
    var user = Meteor.user();
    if(user){
      Posts.insert({
        status: status,
        upVotes: [],
        downVotes: [],
        owner: user._id
      });
    }
  },
  upVote: function(postId){
    var post = Posts.findOne(postId);
    post.downVotes = _.reject(post.downVotes,userHasVote);
    var upVoted = _.find(post.upVotes,userHasVote);
    if(!upVoted) post.upVotes.push(Meteor.user()._id);
  },
  downVote: function(postId){
    var post = Posts.findOne(postId);
    post.upVotes = _.reject(post.upVotes,userHasVote);
    var downVote = _.find(post.downVotes,userHasVote);
    if(downVote) post.downVotes.push(Meteor.user()._id);
  },
  unVote: function(postId,vote){
    var post = Posts.findOne(postId);
    if(vote=="up"){
      post.upVotes = _.reject(post.upVotes,userHasVote);
    }else if(vote=="down"){
      post.downVotes = _.reject(post.downVotes,userHasVote);
    }
  }
})
