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
	
	function getRandWord() {
		reset();
	    var randNum = Math.floor(Math.random() * lines.length);
		word = lines[randNum];
		console.log(word);
		showWord(word);
	}
	
	$.get('words/words.txt', function(txt) {
	    lines = txt.split("\n");
	})
	.done(function(lines) {
	});
	
	$("#repeatWordButton").click(function() {
		if (word != "") {
			reset();
			showWord(word);
		}
	});
	
	$("#newWordButton").click(function() {
		reset();
		getRandWord();
	});
	
	function doCheck() {
		$("#letterImg").clearQueue();
		if ($("#guessWord").val() == word) {
			$("#letterImg").attr("src", "img/check.png");
		}
		else {
			$("#letterImg").attr("src", "img/x.png");
		}
		$("#resultText").html(word);
	}
	
	$("#checkButton").click(function() {
		doCheck();
	});
	
	$(document).keypress(function (e) {
		if (e.which == 13) {
			doCheck();
		}
	});
	
});