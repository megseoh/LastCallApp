// current problems: 
// - there is a ghost space at the top of the page created by the javascript; um, not sure where it went; seems to be related to (updating) the city-name h1
// - i only want to show the stores that are currently open & all stores are showing
// - i'd only like to show the closest 5 stores to start, with the option of showing an additional 5 stores if the person wants to see them
// - need to add clear & reset fucntions to submit button
// - make submit work when you press enter

var lastCall = {};

var $fullDate = new Date();
var $dayOfWeek = $fullDate.getDay();
var $minutes = $fullDate.getMinutes();
var $hours = $fullDate.getHours();
var $time = ($hours * 60) + $minutes;


lastCall.init = function(){
	$('#location').on('submit', function(e){
		e.preventDefault();
		var location = $('.address').val();
		lastCall.query(location);
	});
}

lastCall.query = function(location){

	$.ajax({
		url: 'http://lcboapi.com/stores',
		type: 'GET',
		data: {
			per_page: 10,
			geo: location
		},
		dataType: 'jsonp',
		success: function(data){

			lastCall.storeClosed(data.result);
			
			var $cityFull = data.result[0].city;
			
			if ($cityFull.indexOf('-') !== -1) {
				var $cityName = $cityFull.slice(0,$cityFull.indexOf('-'));
			} else {
				var $cityName = $cityFull;
			}
			
			lastCall.updateTitle($cityName);
		}
	});
}

lastCall.updateTitle = function(city){
    $('#city-name').find('#page-title').text(city);
};

lastCall.storeClosed = function(data){

	$.each(data, function(i, store){
		if ($dayOfWeek === 0 && store.sunday_open !== null) {
			console.log('store is open sunday sometime');
		} 
		if ($dayOfWeek === 0 && store.sunday_open < $time && $time < store.sunday_close) {
			console.log('store is open sunday');
		}
		if ($dayOfWeek === 1 && store.monday_open < $time && $time< store.monday_close) {
			console.log('store is open monday');
		} 
		if ($dayOfWeek === 2 && store.tuesday_open < $time && $time < store.tuesday_close) {
			console.log('store is open tuesday');
		} 
		if ($dayOfWeek === 3 && store.wednesday_open < $time && $time < store.wednesday_close) {
			console.log('store is open wednesday');
		} 
		if ($dayOfWeek === 4 && store.thursday_open < $time && $time < store.thursday_close) {
			console.log('store is open thursday');
		} 
		if ($dayOfWeek === 5 && store.friday_open < $time  && $time< store.friday_close) {
			console.log('store is open friday');
		} 
		if ($dayOfWeek === 6 && store.saturday_open < $time && $time< store.saturday_close) {
			console.log('store is open saturday');
		}

	})

	lastCall.displayStores(data);
}


lastCall.displayStores = function(data){

	$.each(data, function(i, store){

		var $name = $('<h2>').text(store.name);
		var $address = $('<h3>').text(store.address_line_1);
		var $distance = $('<h4>').text((store.distance_in_meters / 1000).toFixed(1) + " km away");
		
		if ($dayOfWeek === 0 && (store.sunday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.sunday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 0) {
			var $openTil = $('<p>').text('Open until ' + (store.sunday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 1 && (store.monday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.monday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 1) {
			var $openTil = $('<p>').text('Open until ' + (store.monday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 2 && (store.tuesday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.tuesday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 2) {
			var $openTil = $('<p>').text('Open until ' + (store.tuesday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 3 && (store.wednesday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.wednesday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 3) {
			var $openTil = $('<p>').text('Open until ' + (store.wednesday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 4 && (store.thursday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.thursday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 4) {
			var $openTil = $('<p>').text('Open until ' + (store.thursday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 5 && (store.friday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.friday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 5) {
			var $openTil = $('<p>').text('Open until ' + (store.friday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 6 && (store.saturday_close-$time < 60)) {
			var $openTil = $('<p>').text('Hurry! Only open until ' + (store.saturday_close/60-12) + ' p.m.');
		} else if ($dayOfWeek === 6) {
			var $openTil = $('<p>').text('Open until ' + (store.saturday_close/60-12) + ' p.m.');
		}
		
		// goes through list & sees if store is open & if so prints data
			$('.stores').append($name);
			$('.stores').append($address).append($distance);
			$('.stores').append($openTil);
	});

}


$(function(){
	lastCall.init();
});

