$(document).ready(function() {

	$('.project__link').hover(
		function() {
			$(this).parents('.showcase-list__project').find('.sidebar').addClass('is-visible');
		}, 
		function() {
			$(this).parents('.showcase-list__project').find('.sidebar').removeClass('is-visible');
		}
	);

});