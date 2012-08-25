$.fn.fbgallery = function(options) {
	var albums = [];
	var albumid;
	var imglink;
	var defaults = {
		user: 'facebook'
	};
	var options = $.extend(defaults, options);
	return this.each(function() {
		var element = $(this);
		$.getJSON('https://graph.facebook.com/'+options.user+'/albums', function(json) {
			$(json.data).each(function(i){
				albumid = json.data[i].id;
				albums.push(albumid);
				$('<div/>').addClass(albumid+' album').appendTo(element);
		 		$('<h4>'+json.data[i].name+' ('+json.data[i].count+')'+'</h4>').appendTo('.'+albumid);
			});
			$(albums).each(function(i){
				$.getJSON('https://graph.facebook.com/'+albums[i]+'/photos', function(json) {
					$(json.data).each(function(c){
						imglink = $('<a/>')
							.attr('href', json.data[c].source)
							.attr('rel', albums[i])
							.css('background-image', 'url('+json.data[c].images[5].source+')')
							.addClass('thumb');
						imglink.appendTo('.'+albums[i]);
					});
				});
			});
			$(element).find('.thumb').fancybox();
		});
	});
}