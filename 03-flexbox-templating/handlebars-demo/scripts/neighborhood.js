'use strict';

let neighborhoods = [];

function Neighborhood(rawDataObj) {
  this.name = rawDataObj.name;
  this.city = rawDataObj.city;
  this.population = rawDataObj.population;
  this.founded = rawDataObj.founded;
  this.body = rawDataObj.body;
}

Neighborhood.prototype.toHtml = function() {
  // get the template from the html doc
  const $template = $('#neighborhood-template').html();
  // compile the template to regular HTML
  const $source = Handlebars.compile($template);
  // return the compiled HTML
  return $source(this);
}

neighborhoodsDataSet.forEach(function(neighborhoodObject) {
  neighborhoods.push(new Neighborhood(neighborhoodObject))
});

neighborhoods.forEach(city => {
  $('#neighborhoods').append(city.toHtml());
})

