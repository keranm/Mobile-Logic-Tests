    window.addEventListener('load', function(){
    	// Wait for PhoneGap to load
   		document.addEventListener("deviceready", onDeviceReady, false);
    }, false);
    

    // PhoneGap is ready
    function onDeviceReady() {
    	var stopWatchBtn = $('#stopWatch');
    	var startWatchBtn = $('#startWatch');
    	
    	var watchID = null;
  		var watchMove = null;

        var width = window.innerWidth
        var height = window.innerHeight // use native JS not any plugin to get the right sizes
        var loadingOffset = 1000
    	
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError); 

        $('#obj_wall').css('width', width-20)  
        $('#obj_wall').css('height', height-20)     
        
        // Start Watch Button
        startWatch();
        
    }
    
    // Start moving the object
    var startMove = $('#startMove');
    startMove.live("click",function(){
    	startMoving();
    	$(this).hide();
    });
    
    // Start watching the acceleration
    function startMoving(){

        var options = { frequency: 1 };

        watchMove = navigator.accelerometer.watchAcceleration(moveObject, onError, options);
    }
 
    // moveObject
    function moveObject(acceleration) {
    	var myObj = $('#obj');
    	var wall = $('#obj_wall');
    	var objPosition = myObj.position();
    	var leftBoundary = 0;
    	var topBoundary = 0;
    	var rightBoundary = wall.width() - myObj.width() - 10; // 10 represents the 10px for the margin
    	var bottomBoundary = wall.height() - myObj.height() - 10; // 10 represents the 10px for the margin
    	
    	if( acceleration.x < 0 && objPosition.left <= rightBoundary ) {
    		myObj.animate({
    			left:'+=2'
    		},10);
    	} else if( acceleration.x > 0 && objPosition.left > leftBoundary ) {
    		myObj.animate({
    			left:'-=2'
    		},10);
    	}
    	if( acceleration.y < 0 && objPosition.top > topBoundary ) {
    		myObj.animate({
    			top:'-=2'
    		},10);
    	} else if(acceleration.y > 0 && objPosition.top <= bottomBoundary ) {
    		myObj.animate({
    			top:'+=2'
    		},10);
    	}
    }

    // Start watching the acceleration
    function startWatch() {

        // Update acceleration every 2 seconds
        var options = { frequency: 500 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // Stop watching the acceleration
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Display the current acceleration
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' + 
                            'Timestamp: '      + acceleration.timestamp + '<br />';
    }

    // onError: Failed to get the acceleration
    function onError() {
        alert('onError!');
    }