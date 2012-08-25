$(function(){
	var albums = [];
	var albumid;
	var imglink;
	$.getJSON('https://graph.facebook.com/mrbunnycreations/albums', function(json) {
		$(json.data).each(function(i){
			albumid = json.data[i].id;
			albums.push(albumid);
			$('<div/>').addClass(albumid+' well').appendTo('.albums');
	 		$('<h2>'+json.data[i].name+' ('+json.data[i].count+')'+'</h2>').appendTo('.'+albumid);
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
		$(".albums a").fancybox();
	});
});