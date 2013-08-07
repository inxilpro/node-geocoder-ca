var vows = require('vows'),
	assert = require('assert'),
	geo = require('../index.js'),
	Coords = geo.Coords,
	geocoder = new geo.Geocoder(),
	simple_distance = require('./simple_distance.js')
	specReporter = require("vows/lib/vows/reporters/spec");

// Geocoder Test Suite
vows.describe('When geocoding').addBatch({
	'A valid, full US address': {
		topic: function() {
			geocoder.geocode('525 Market St, Philadelphia, PA 19106', this.callback);
		},

		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 39.950598, lon: -75.149274 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'A valid, partial address': {
		topic: function() {
			geocoder.geocode('525 Market 19106', this.callback);
		},

		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 39.950598, lon: -75.149274 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'An ambiguous address': {
		topic: function() {
			geocoder.geocode('Market St Philadelphia PA 19106', this.callback);
		},

		'returns an error': function (err, coords) {
			assert.isNotNull(err);
			assert.instanceOf(err, Error);
		}
	},
	'A US zip code (as a string)': {
		topic: function() {
			geocoder.geocode('19106', this.callback);
		},


		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 39.947420, lon: -75.147271 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'A US zip code (as a Number)': {
		topic: function() {
			geocoder.geocode(19106, this.callback);
		},

		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 39.947420, lon: -75.147271 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'A Canadian postal code (with space)': {
		topic: function() {
			geocoder.geocode('M4A 2L7', this.callback);
		},

		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 43.718971, lon: -79.300228 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'A Canadian postal code (without space)': {
		topic: function() {
			geocoder.geocode('M4A2L7', this.callback);
		},

		'does not return an error': function (err, coords) {
			assert.isNull(err);
		},
		'returns coords': function (err, coords) {
			assert.instanceOf(coords, Coords);
		},
		'coords are within 1/2 km of pre-calculated coords': function(err, coords) {
			var precalcd = { lat: 43.718971, lon: -79.300228 },
				distance = simple_distance(coords, precalcd);

			assert(distance < 0.5);
		}
	},
	'An invalid address': {
		topic: function() {
			geocoder.geocode('999999 Market St Philadelphia PA 19147', this.callback);
		},

		'returns an error': function (err, coords) {
			assert.isNotNull(err);
			assert.instanceOf(err, Error);
		}
	},
	'An empty string': {
		topic: function() {
			geocoder.geocode('', this.callback);
		},

		'returns an error': function (err, coords) {
			assert.isNotNull(err);
			assert.instanceOf(err, Error);
		}
	},
	'A non-String/non-Number value': {
		topic: function() {
			geocoder.geocode(false, this.callback);
		},

		'returns an error': function (err, coords) {
			assert.isNotNull(err);
			assert.instanceOf(err, Error);
		}
	}
}).run({
	reporter: specReporter
});