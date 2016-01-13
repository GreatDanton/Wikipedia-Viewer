$(document).ready(function() {
var searchTerm = '';
// get searchTerm
$('.search').change(function() {
    searchTerm = $('.search').val();
  console.log(searchTerm);
});

var term = '&titles=Main%20Page';
var baseUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&callback=?&redirects=resolve&search=';

function changeSpaces(sentence) {
  sentence = sentence.split(' ');
  return sentence.join('%20');
}

// search function
function search() {
  $('.data').html('');
  searchTerm = $('.search').val();
  term = changeSpaces(searchTerm);

  $.getJSON(baseUrl+term, function(data) {
    $.each(data, function(key, val) {
      if (key > 0) {
        if (key==1) {
          titles = val;
        } else if (key == 2) {
          content = val;
        } else if (key == 3) {
          links = val;
        }
    }
      });
      for (i = 0; i < titles.length; i++) {
        $('.data').append("<a target='_blank' class='card-link' href='" + links[i] + "'><div class='card-container'><div class='card'><div class='title'>" + titles[i] + "</div><div class='content'>" + content[i] + "</div></div></div></a>");
      }

    });
}
var titles = [];
var content = [];
var links = [];
var suggestions = [];
$('.search').keyup(function(event) {
  $('.suggestions').html('');
  searchTerm = $('.search').val();
  term = changeSpaces(searchTerm);

  $.getJSON(baseUrl+term, function(data){
    $.each(data, function(key, val){
      if(key == 1) {
        suggestions = val;
      }
    });
  });

  if (searchTerm.length == 0) {
    $('.suggestions').css("display", "block");
  }

  if (suggestions.length > 0) {
    if (suggestions.length > 5) {
      $('.suggestions').css("display", "block");
      for (i = 0; i < 5; i++) {
        $('.suggestions').append("<p>" + suggestions[i] + "</p>");
      }
      } else {
        $('.suggestions').css("display", "block");
        for (i = 0; i < suggestions.length; i++) {
        $('.suggestions').append("<p>" + suggestions[i] + "</p>");
      }
    }
  } else {
    $('.suggestions').css("display", 'none');
  }

// search term and add it into search box on clicked suggestion
  $('.suggestions > p').click(function(){
    var suggestion = $(this).text();
    $('.search').val(suggestion);
    $('#searchBtn').click();
    $('.suggestions').css('display', 'none');
  });

//search on enter press
  if (event.keyCode === 13) {
    $('#searchBtn').click();
  }
});

$('#searchBtn').click(function() {
  search();
});


});
