var vows = require('vows'),
	assert = require('assert'),
	geocoder = require('../index.js');

// Geocoder Test Suite
vows.describe('Geocoding').addBatch({
	'A valid, full address': {
		topic: geocoder.geocode('525 Market St, Philadelphia, PA 19106'),

		'does not throw an exception': function (response) {
			assert.doesNotThrow(response, Error);
		},
		'returns coords': function (response) {
			assert.instanceOf(response, geocoder.Coords);
		}
	},
	'A valid, partial address': {
		topic: geocoder.geocode('525 Market 19106')
	},
	'A US zip code (as a string)': {
		topic: geocoder.geocode('19106')
	},
	'A US zip code (as a Number)': {
		topic: geocoder.geocode(19106)
	},
	'A Canadian postal code (with space)': {
		topic: geocoder.geocode('M4A 2L7')
	},
	'A Canadian postal code (without space)': {
		topic: geocoder.geocode('M4A2L7')
	},
	'An invalid address': {
		topic: geocoder.geocode('999999 Market St Philadelphia PA 19147')
	},
	'An empty string': {
		topic: geocoder.geocode('')
	},
	'A non-string value': {
		topic: geocoder.geocode(false)
	}
}).run();