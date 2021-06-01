$(document).ready(function() {
	
	word = "";
	
	function reset() {
		$("#letterImg").clearQueue();
		$("#resultText").html("");
		$("#guessWord").val("");
		$("#letterImg").attr("src", "img/white.png");
	}
	
	function showWord(word) {
		var letters = word.split("");
		letters.forEach(function(item) { 
			$("#letterImg").delay($("#waitTime").val() * 1000)
			.queue( function(next){ 
			$(this).attr("src", "img/"+item+".jpg"); 
				next(); 
			});
		});
	}
	
	$(document).keypress(function (e) {
		//if user presses enter
		if (e.which == 13) {	
			reset();
			showWord($("#wordToSign").val());
		}
	});
	
	$("#signButton").click(function() {
		reset();
		showWord($("#wordToSign").val());
	});
	
});