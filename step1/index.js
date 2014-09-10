$(function(){
  $(".vote-up").click(function(event){
    var el = $(event.target);
    if(el.hasClass("active")){
      el.removeClass("active");
    }else{
      el.addClass("active");
      var down = el.parent().children(".vote-down");
      if(down.hasClass("active")){
        down.removeClass("active");
      }
    }
  });

  $(".vote-down").click(function(event){
    var el = $(event.target);
    if(el.hasClass("active")){
      el.removeClass("active");
    }else{
      el.addClass("active");
      var up = el.parent().children(".vote-up");
      if(up.hasClass("active")){
        up.removeClass("active");
      }
    }
  });
})
