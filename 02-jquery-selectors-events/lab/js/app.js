'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  keyArr.push(this.keyword);
}

Horn.allHorns = [];
console.log(Horn.allHorns);
let keyArr = [];
console.log(keyArr);
Horn.prototype.render = function() {
  $('main').append('<div class= "clone"></div>');
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  // hornClone.find('p').text(this.horns);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
};
let selectRend = () => {
  keyArr.forEach( element => {
    $('select').append('<option class="optClone"></option>');
    console.log(element);
    let optionClone = $('option[class="optClone"]');
    optionClone.text(element);
    optionClone.removeClass('optClone');
  });
};
//var page = 'data/page-1.json';


Horn.readJson = (page) => {
  $.get(page, 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
    .then(Horn.loadHorns).then(selectRend);
};

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render());
};

$(() => Horn.readJson('data/page-1.json'));

$('select').on('change',selShow);
function selShow(){
  let selItem=$(this).val();
  $('div').show();
  if(selItem!==''){
    $('div').not('[class*="'+selItem+'"]').hide();
  }
}

$('#pg2').click(function(){
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  keyArr = [];
  $(() => Horn.readJson('data/page-2.json'));
});

$('#pg1').click(function(){
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  keyArr = [];
  $(() => Horn.readJson('data/page-1.json'));
});

//page = 'data/page-2.json';