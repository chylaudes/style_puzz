function loadContent(section){ // Beginning of loadContent
  $.getJSON("https://cdn.rawgit.com/tobiaslei/c5c186ea75d05de6a195/raw/f40a5c0e4eb6106fa650dee82478999a65010ab9/feed.json", function(data) {
    var feed = data.feed;
      feed.forEach(function(x, i){
        var fashionista = x.fashionista;
        var brand = x.brand;
        var price = Math.round(x.sale_price);
        var images = x.images;
        var description = x.sale_description;
        var todayDate = new Date();
        var dateClosed = new Date(x.closed_at);
        var timeDiff = Math.abs(dateClosed.getTime() - todayDate.getTime());
        var date = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (date > 7){
         date = ""+Math.round(date / 7)+"w";
        } else{
          date = ""+date+"d";
        }
      $('.main').append('<div class="panel"><div class="panel-header"><img class="profile" src='+ fashionista.profile_image +' alt=""><div class="small-8 columns"><a href=""> '+ fashionista.full_name +'</a><h5>   has just found: '+ x.name +'</h5><span class="text"><h4><i class="fi-marker"></i>  '+ fashionista.location +'</h4></span></div><div class="small-2 medium-1 medium-offset-2 columns"><h5><i class="fi-clock"></i> '+ date +'</h5></div></div><div class="panel-body"><div id="carousel-'+i+ section+'" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators" id= "car-indicators'+i+ section+'"></ol><div class="carousel-inner" id="car-inner'+i+ section+'" role="listbox"></div><a class="left carousel-control" href="#carousel-'+i+ section+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#carousel-'+i+ section+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div><div class="panel-footer"><h4>' +brand+' | CN &#165 '+ price+'</h4><p>'+description+'</p></div></div>');
      var thisCarousel = $('#car-inner'+i+section+'');
      var thisIndicator = $('#car-indicators'+i+section+'');
      $.each(images, function(i, image) {
      thisCarousel.append('<div class="item"><img src="'+ image.image +'" alt="" /></div>');
      thisIndicator.append('<li data-target="#carousel-example-generic" data-slide-to="'+i+ section+'"></li>');
        });
      $('#car-inner'+i+ section+' > div').first().addClass("active");
      $('#car-indicators'+i+ section+' > li').first().addClass("active");
      });
      $('.loading').remove();
   });
  } //End of loadContent
function loadingDiv(){
  $('.main').append('<div class="small-6 small-centered large-6 large-centered columns loading"><img src="loading_spinner.gif" alt=""> </div>');
}
$(document).on('ready',function(){ //Doc Ready
  $('.carousel').carousel();
  loadContent(0);
  var section = 0;
$(window).scroll(function(){
  if($(window).scrollTop() == ($(document).height() - $(window).height()))
{
  loadingDiv();
  section = section + 15;
  window.setTimeout(loadContent(section), 6000);
}
});
});