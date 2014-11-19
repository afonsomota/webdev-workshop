Facebook = function (accessToken) {
  this.fb = Meteor.require('fbgraph');
  this.accessToken = accessToken;
  this.fb.setAccessToken(this.accessToken);
  this.options = {
    timeout: 3000,
    pool: {maxSockets: Infinity},
    headers: {connection: "keep-alive"}
  }
  this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  var data = Meteor.sync(function(done) {
    self.fb[method](query, function(err, res) {
      done(null, res);
    });
  });
  return data.result;
}

Facebook.prototype.getPictureUrl = function(){
  var result = this.query('/me/picture?redirect=false&width=75&height=75');
  return result.data.url;
}
