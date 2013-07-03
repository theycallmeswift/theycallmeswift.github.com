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


});
