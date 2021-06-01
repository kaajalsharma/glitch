//slider
	$(function() {

        var $document   = $(document),
            selector    = '[data-rangeslider]',
            $element    = $(selector);
	
		function valueOutput(element) {
            var value = element.value;
            $("#intLength").html(value);
        }
		
		$document.on('change', 'input[type="range"]', function(e) {
            valueOutput(e.target);
        });
	
		 // Basic rangeslider initialization
        $element.rangeslider({

            // Deactivate the feature detection
            polyfill: false,

            // Callback function
            onInit: function() {},

            // Callback function
            onSlide: function(position, value) {
            },

            // Callback function
            onSlideEnd: function(position, value) {
            }
        });
	});