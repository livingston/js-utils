/*	safeMail - AntiSpam Email with Unobtrusive Javascript
	Version : 2.0 (4th July, 2009)
	Author  : Livingston Samuel (http://delivi.info/)
	URL     : http://blog.delivi.info/javascript/safemail
	Livingston Samuel <livingston@xatre.info>
*/
;(function($) {
	$.fn.safeMail = function() {
		var regex = {
			at: /(( ?)\[at\]( ?))/i,
			dot: /(( ?)\[dot\]( ?))/i,
			full: /(\s\[at\]\s).*(\s\[dot\]\s)/i
		};
		
		//var options = $.extend(defaults, options);
		return this.each(function() {
			var mail = $(this).text();
			if( mail.indexOf("[at]") === -1 || mail.indexOf("[dot]") === -1 ) {
				$("<span>Invalid safeMail syntax: </span>").css("color", "#f00").prependTo(this);
				return;
			} else {
				var email = mail.replace(regex.at,"\@").replace(regex.dot,"\.");
				$(this).html($("<a></a>").attr("href", "mailto:" + email).text(email));
			}
		});
	};
})(jQuery);

$(document).ready(function(){
	$(".safemail").safeMail();
});