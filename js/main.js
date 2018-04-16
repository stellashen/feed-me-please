// credit: code from Eduonix's Udemy video:
// https://www.udemy.com/projects-in-html5/learn/v4/t/lecture/1293122?start=60

// fix error: jQuery 1.9 .live() is not a function
// https://stackoverflow.com/questions/14354040/jquery-1-9-live-is-not-a-function

$(document).ready(function(){
  const items = $('#gallery li');
  const itemsByTags = {};

  items.each(function(i) {
    const el = $(this),
    tags = el.data('tags').split(',');
    el.attr('data-id', i);

    $.each(tags, function(key, value){
      value = $.trim(value);

      if(!(value in itemsByTags)) {
        itemsByTags[value] = [];
      }

      itemsByTags[value].push(el);
    });
  });

  createList('All', items);
  $.each (itemsByTags, function(k, v){
    createList(k, v);
  });

  $('#navbar').on('click', 'a', function(e){
    const link = $(this);
    link.addClass('active').siblings().removeClass('active');

    $('#gallery').quicksand(link.data('list').find('li'));
    e.preventDefault();
  });

  $('#navbar a:first').click();

  function createList(text, listitems) {
    const ul = $('<ul>', {'class':'hidden'});

    $.each(listitems, function(){
      $(this).clone().appendTo(ul);
    });

    ul.appendTo('#gallery');

    var a = $('<a>', {
      html:text,
      href:'#',
      data:{list:ul}
    }).appendTo('#navbar');
  }
});
