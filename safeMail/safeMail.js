/* safeMail - AntiSpam Email with Unobtrusive Javascript
Version : 1.1 (1st Dec, 2007)
Author  : Livingston Samuel (http://delivi.info/)
URL     : http://blog.delivi.info/javascript/safemail
(c) 2007 Livingston Samuel <livingston@xatre.info>
*/

function safeMail() {
	var rAt = /(( ?)\[at\]( ?))/i,
		rDot = /(( ?)\[dot\]( ?))/i,
		as = document.getElementsByTagName('span'),
		i;
	var replace = function( srting
	for(i in as) {
		cls = as[i].className;
		clsnme = cls.toString().indexOf('safemail');
		if(cls && clsnme !== -1){
			var email = as[i].innerHTML.replace(rAt,"\@").replace(rDot,"\.");
			as[i].innerHTML = "<a href='mailto:"+email+"'>"+email+"</a>";
		}
	}
}

window.onload =safeMail;