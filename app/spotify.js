'use strict';

let SpotifyWebApi 	= require('spotify-web-api-node'),
	Vow 			= require('vow');

// credentials are optional
let spotifyApi = new SpotifyWebApi({
	clientId : '74fe907eef6f4b37b9426c24453178ef',
	clientSecret : 'ae3ec3588fed4be5b822bd160dc2ff14',
	redirectUri : 'http://vast-stream-13353.herokuapp.com'
});

let getToken = () => {
	console.log('Spotify getting token...');

	spotifyApi.clientCredentialsGrant().then(
		(data) => {
		    console.warn('Spotify token success! It expires in ' + data.body['expires_in']);

	    	spotifyApi.setAccessToken(data.body['access_token']);

	  	}, 
	  	(error) => {
	    	console.error('Spotify access token error: ', error.message);
	  	}
  	);
};

let resolveErrors = (error) => {
	console.error(error.name, error.message);
	if(error.statusCode === 401){
		getToken();
	}
};  

let moduleExports = {

	start: () => {
		console.log('Spotify starting module...');
	},

	getArtistGenreByTrack: (_trackId) => {
		// step 1: get track by id
		return new Vow.Promise(function(resolve, reject) {
			spotifyApi.getTrack(_trackId).then(
				(data) => {
					// step 2: get artist by track id
			    	spotifyApi.getArtist(data.body.artists[0].id).then(
			    		(data) => {
			    			resolve(data);
			    			// console.warn(data.body.name, data.body.genres[0]);
			    		}, 
					  	(error) => { resolveErrors(error); reject(error); }
		    		);
			  	}, 
			  	(error) => { resolveErrors(error); reject(error); }
		  	);
		});
	},

	getRecommendationByTrack: (_trackId) => {
		return new Vow.Promise(function(resolve, reject) {
			spotifyApi.getRecommendations({'seed_tracks': [_trackId]}).then(
				(data) => {
					resolve(data);
			  	}, 
			  	(error) => { resolveErrors(error); reject(error); }
		  	);
		});
	},


	//getArtistRelatedArtists

	// spotifyApi.getPlaylistsForCategory('party', {
 //      country: 'BR',
 //      limit : 2,
 //      offset : 0
 //    })

}

module.exports = moduleExports;

