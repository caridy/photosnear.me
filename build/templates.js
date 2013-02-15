YUI.add('pnm-templates', function (Y) {

    var Templates = Y.namespace('PNM').Templates = {};

  
    Templates['grid-photo'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<li class=\"photo\">\n    <a href='";
  stack1 = depth0.undefined;
  foundHelper = helpers.pathTo;
  stack1 = foundHelper ? foundHelper.call(depth0, "photo", stack1, {hash:{}}) : helperMissing.call(depth0, "pathTo", "photo", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "'>\n        <img title=\"";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" src=\"";
  foundHelper = helpers.thumbURL;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.thumbURL; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"\n            alt=\"Thumbnail of a photo with title: ";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n    </a>\n</li>\n";
  return buffer;});
  
    Templates['grid'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['grid-photo'], 'grid-photo', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;}

  buffer += "<ul class=\"layout\">\n  ";
  stack1 = depth0.photos;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<p class=\"loading\"></p>\n";
  return buffer;});
  
    Templates['header'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <a href='";
  stack1 = depth0.place;
  foundHelper = helpers.pathTo;
  stack1 = foundHelper ? foundHelper.call(depth0, "place", stack1, {hash:{}}) : helperMissing.call(depth0, "pathTo", "place", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "'>\n        Photos Near <span id=\"location\">";
  stack1 = depth0.place;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.text;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>\n    </a>\n  ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n    Photos Near <span id=\"location\">Me</span>\n  ";}

  buffer += "<h1>\n    <a href='";
  foundHelper = helpers.pathTo;
  stack1 = foundHelper ? foundHelper.call(depth0, "index", {hash:{}}) : helperMissing.call(depth0, "pathTo", "index", {hash:{}});
  buffer += escapeExpression(stack1) + "' id=\"logo\">\n        <span class=\"pin-shadow\"></span>\n        <span class=\"pin\"></span>\n    </a>\n\n  ";
  stack1 = depth0.place;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</h1>\n";
  return buffer;});
  
    Templates['lightbox'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"lightbox-nav layout\">\n  ";
  stack1 = depth0.nav;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.prev;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = depth0.nav;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.next;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <li class=\"prev\"><a href='";
  stack1 = depth0.nav;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.prev;
  foundHelper = helpers.pathTo;
  stack1 = foundHelper ? foundHelper.call(depth0, "photo", stack1, {hash:{}}) : helperMissing.call(depth0, "pathTo", "photo", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "'>Â« Previous</a></li>\n  ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <li class=\"next\"><a href='";
  stack1 = depth0.nav;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.next;
  foundHelper = helpers.pathTo;
  stack1 = foundHelper ? foundHelper.call(depth0, "photo", stack1, {hash:{}}) : helperMissing.call(depth0, "pathTo", "photo", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "'>Next Â»</a></li>\n  ";
  return buffer;}

  stack1 = depth0.nav;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"photo\">\n    <img src=\"";
  stack1 = depth0.photo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.largeURL;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" alt=\"A photo titled: ";
  stack1 = depth0.photo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.title;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" />\n\n    <div class=\"photo-info\">\n        <h2 class=\"photo-title\">\n            <a href=\"";
  stack1 = depth0.photo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pageURL;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" title=\"View on Flickr\">";
  stack1 = depth0.photo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.title;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a>\n        </h2>\n    </div>\n</div>\n";
  return buffer;});
  
    Templates['no-location'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<p>Unable to determine your location :(</p>\n<p>Check out some photos near <a href=\"/boston\">Boston</a>!</p>\n";});
  
    Templates['title'] = Y.Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  Photos Near: ";
  stack1 = depth0.place;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.text;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n  Photos Near Me\n";}

  stack1 = depth0.place;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
  

}, '0.7.2', {
    requires: ['handlebars-base']
});