$(document).ready(function() {
  $('.content').fitVids();

  $("div.highlight").each(function(){
    var contentwidth = $("code", this).width();
    var blockwidth = $(this).width();
    if(contentwidth > blockwidth) {
      $(this).hover(function() {
        $(this).animate({ width: (contentwidth + 20) + "px"}, 250, function() { $(this).css('overflow-x', 'auto'); });
      }, function() {
        $(this).css('overflow-x', 'hidden').animate({ width: blockwidth }, 250);
      });
    }
  });

  $('.signup-form .btn').click(function(e) {
    e.preventDefault();
    var url = "http://nameless-chamber-5311.herokuapp.com/email"
      , email = $('.signup-form #email').val();

    if(email) {
      $.post(url, { email: email }).done(function(data) {
        $('.signup-form').html("<h3>Thanks for signing up!</h3>");
      });
    }
  });

});
