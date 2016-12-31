var jq = document.createElement("script");
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
document.head.appendChild(jq);
var orig = document.title;
var animeTitle = orig.substring(0, orig.indexOf("|") - 7);
var start = parseInt(prompt("Starting episode number: "));
var end = parseInt(prompt("Ending episode number: "));
var quality = prompt("Enter quality. Default: 1280x720.mp4");
var arr = new Array();
if (quality == null || quality.trim() == "") {
	quality = "1280x720.mp4";
}
for (var i = start; i <= end; i++) {
	var title = `Watch anime ${animeTitle} Episode ${formatNum(i)} online in high quality`;
	var epLink  = window.location.origin + $("a[title='" + title + "']").attr("href");
	$.ajax({
		url: epLink,
		success: function(data) {
			var dom = document.createElement("div");
			dom.id = "tempDOM" + i;
			dom.innerHTML = data;
			document.body.appendChild(dom);
			$("#divDownload").children().each(function(index) {
				if ($(this).html() == quality) {
					arr.push($(this).attr("href"));
					console.log(`Retrieved link for Episode ${formatNum(i)}`);
				}	
			});
			$("#tempDOM" + i).remove();
		},
		async: false
	});
}
var css = `
* {
	font-family: Ubuntu, sans-serif;
}
#links {
	margin-left: auto;
	margin-right: auto;
	width: 60%;
	margin-top: 3%;
	padding: 3%;
	text-align: center;
}

a {
	display: block;
	color: black;
	text-decoration: none;
	transition: color 0.3s;
	margin-top: 1%;
}

a:hover {
	color: green;
}
`;
document.write(`<html><head><link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"></head><body><div id='links'></div></body></html>`);
var style = document.createElement("style");
style.innerHTML = css;
document.head.appendChild(style);
for (var i = start; i <= end; i++) {
	var link = document.createElement("a");
	link.target = "_new";
	link.href = arr[i - start];
	link.innerHTML = `Download ${animeTitle} Episode ${formatNum(i)}`;
	$("#links").append(link);
}

function formatNum(i) {
	if (i < 10) {
		return "00" + i;
	} else if (i < 100) {
		return "0" + i;
	} else {
		return "" + i;
	}
}