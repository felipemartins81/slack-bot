'use strict';

// requires
let http    = require('http'),
    request = require('request'),
    spotify = require('./spotify'),
    phrases = require('./random-phrases');

// global vars
let appUrl  = 'http://vast-stream-13353.herokuapp.com',
    waitFor = null,
    msg     = '';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
** CHATBOT
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
(function(){
    let SlackBot = require('slackbots');

    let bot = new SlackBot({
        token: '',
        name: 'The Monster Bot'
    });

    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    let msgParams = {
        icon_url: appUrl +'/images/bot.jpg'
    };

    bot.on('start', function() {
        // bot.postMessageToUser('felipemartins81', 'init bot...', msgParams);
        console.log('init bot...');

        // console local tests
        // setInterval(()=>{
        //     console.log( getPhraseInviteToLunch() );
        // }, 5000);
    });

    // listen messages
    bot.on('message', function(dataMsg) {
        let msgFromBot = dataMsg.bot_id;

        if(dataMsg.type === 'message'){
            // console.log(dataMsg);

            // let c = bot.getChannels();
            // console.log(c._value.channels);

            /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            ** 'D'irect msg
            /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
            if(dataMsg.channel[0] === 'D' && !msgFromBot){
                msg = phrases.getRandomEmogi() + phrases.getRandomMessage();

                // busca userName e envia msg no retorno da promisse
                getUserInfo(dataMsg.user).then(
                    (userInfo) => { 
                        userInfo.ok ? setTimeout(()=>{bot.postMessageToUser(userInfo.user.name, msg, msgParams)}, 5000) : null;
                        return;
                    }
                );
            }

            /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            ** 'C'hannel msg
            /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -- - - -*/
            if(dataMsg.channel[0] === 'C' && !msgFromBot){
                // mencionado o Bot
                if( isMentioningBot(dataMsg.text) ){
                    console.log('Wow, message to Bot...');

                    console.log(dataMsg);
                    
                    msg = phrases.getRandomEmogi() + phrases.getRandomMessage();

                    bot.getChannelById(dataMsg.channel).then(
                        (channel) => {
                            setTimeout(()=>{ bot.postMessageToChannel(channel.name, msg, msgParams) }, 5000);
                        }
                    );
                }
                // sem mencionar o Bot
                else{

                    bot.getChannelById(dataMsg.channel).then(
                        (channel) => {
                            switch(channel.name){
                                case 'music':
                                    // get spotify remmendation by tracj id
                                    if(dataMsg.text.indexOf('spotify.com/track/') >= 0){
                                        let trackId = defineSpotifyTrackId(dataMsg.text);
                                        /*
                                        * ADD TRACK IN MKTP-PLAYLIST
                                        */
                                        sendRecommendationByTrack(trackId, 'music');
                                    }
                                    break;
                                case 'front':
                                    console.log('msg in front...', dataMsg.text);
                                    if(dataMsg.text.indexOf('build quebrou') >= 0){
                                        let msg = phrases.getBugImage();
                                        setTimeout(()=>{ bot.postMessageToChannel(channel.name, msg, msgParams) }, 5000);
                                    }
                                    break;
                                default:
                                    break;
                            }
                            // all channels
                            if(!waitFor && termsToRespond(dataMsg)){
                                console.log('bot know this message...');
                                msg = termsToRespond(dataMsg);
                                setTimeout(()=>{ bot.postMessageToChannel(channel.name, msg, msgParams) }, 5000);
                                
                                // wait to respond again
                                waitFor = 1200000;
                                setTimeout(()=>{ waitFor = null; console.log('no waitFor more'); }, waitFor);
                            }
                        }
                    );
                }
            }
        }
    });

    function termsToRespond(_dataMsg){
        let msgResponse = null;

        if(!_dataMsg.text) return null;

        if(_dataMsg.text.toLowerCase() === 'bot' ){
            return msgResponse = getRandomNumber(10) % 2 === 0 ? 'Iiiiii, la vem!\nNum mexe com quem ta quieto' : 'Fala Mlk Doido!\nO que péga?';
        }
        if(_dataMsg.text.toLowerCase().indexOf('kkk') >= 0 ) return msgResponse = ' :joy: hahaha';
        if(_dataMsg.text.toLowerCase().indexOf('kaka') >= 0 ) return msgResponse = 'heheh :joy:';
        if(_dataMsg.text.toLowerCase().indexOf('haha') >= 0 ) return msgResponse = ' :joy: kkk';
        if(_dataMsg.text.toLowerCase().indexOf(':joy:') >= 0 ) return msgResponse = 'kkk :joy:';
        if(_dataMsg.text.toLowerCase().indexOf('bom dia') >= 0 ) return msgResponse = 'Bom dia? Só se for pra vc!';
        if(_dataMsg.text.toLowerCase().indexOf('boa tarde') >= 0 ) return msgResponse = 'Boa tarde!';
        if(_dataMsg.text.toLowerCase().indexOf('boa noite') >= 0 ) return msgResponse = ':sleeping: ';

        if(_dataMsg.text.toLowerCase() === 'teste' ){ return msgResponse = '<@'+ _dataMsg.user +'>'; }

        return msgResponse;
    }

    function defineSpotifyTrackId(msgText){
        console.log('Spotify getting track id...');
        let trackLink = {};
        trackLink.array = msgText.split('/');
        trackLink.id    = trackLink.array[ trackLink.array.length - 1 ].replace('>',''); 
        return trackLink.id;
    }

    function sendRecommendationByTrack(_trackId, _channel){
        console.log('Spotify get recommendation...');
        spotify.getRecommendationByTrack(_trackId).then(
            (resolveData) => {
                console.log('Spotify send recommendation...');
                let intro = ':headphones:\nBuscando recomendação do Spotify com base nessa musica :point_up:\n...\n';
                msg = intro + resolveData.body.tracks[ getRandomNumber(20) ].external_urls.spotify;
                setTimeout(()=>{ bot.postMessageToChannel(_channel, msg, msgParams) }, 7000);
            },
            (rejectError) => {
                if(rejectError.statusCode == 401){
                    setTimeout(()=>{ sendRecommendationByTrack(_trackId, _channel) }, 5000);
                }
            }
        );
    }

    function getArtistGenreByTrack(_trackId){
        spotify.getArtistGenreByTrack(_trackId).then( // '2piZbk6XWisF6vSKOmkLcl' track id test
            (resolveData) => { 
                let msg = resolveData.body.name +' - '+ resolveData.body.genres[0];
                // bot.postMessageToUser('felipemartins81', msg, msgParams); //#dev
            },
            (rejectError) => {
                if(rejectError.statusCode == 401){
                    setTimeout(()=>{ getArtistGenreByTrack(_trackId) }, 5000);
                }
            }
        );
    }

    function isMentioningBot(_text){
        if(!_text) return false;

        if(_text.toLowerCase().indexOf('bot ') >= 0 ) return true;
        if(_text.toLowerCase().indexOf('bot.') >= 0 ) return true;
        if(_text.toLowerCase().indexOf('bot,') >= 0 ) return true;
        if(_text.toLowerCase().indexOf('bot?') >= 0 ) return true;
        if(_text.toLowerCase().indexOf(' bot') >= 0 && _text.toLowerCase()[ _text.length - 1 ] === 't' ) return true;
        if(_text.toLowerCase().indexOf('the_monster_bot') >= 0 ) return true;
        if(_text.indexOf('<@U5KLF2X7Z>') >= 0 ) return true; //text converted @the_monster_bot
        return false;
    }

    function getUserInfo(_userId){
        return bot._api('users.info', {user: _userId});
    }

    function getRandomNumber(_size){
        return Math.floor(Math.random() * _size);
    }

    function searchPlaceToLunch(){
        let placesApi    = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        let placeSearch  = phrases.getSearchTermsToLunch() +'+vila+olimpia+sao+paulo';
        let googleApiKey = '';
        let endpoint     = placesApi +'?query='+ placeSearch +'&key='+ googleApiKey;

        request( endpoint, (error, response, body) => {
            console.log('google api requesting... status:'+ response.statusCode);
            if (!error && response.statusCode == 200) {
                let objApi = JSON.parse(body);
                let randomItem = objApi.results[ getRandomNumber(objApi.results.length) ];
                if(!randomItem){
                    console.log('google api undefined item... ', objApi);
                    setTimeout(function(){
                        console.log('google api recalling ...');
                        searchPlaceToLunch(); // call again if undefined
                    }, 5000);
                }
                else{
                    console.log('google api success...');
                    let phrase = phrases.getPhraseInviteToLunch();
                    let txtRating = randomItem.rating ? '\n_Avaliado com '+ randomItem.rating +' estrelas_' : '';
                    let msg = phrase +' *'+
                        randomItem.name +'*\n'+ 
                        randomItem.formatted_address +
                        txtRating;
                    
                    let link        = {}
                    link.host       = 'https://www.google.com.br/maps/place';
                    link.placeName  = randomItem.name.split(' ').join('-');
                    link.location   = randomItem.geometry.location.lat +','+ randomItem.geometry.location.lng;
                    link.finalUrl   = link.host +'/'+ link.placeName +'/@'+ link.location;
                    link.finalMsg   = ':round_pushpin: <'+ link.finalUrl +'|Link do Maps>' 

                    bot.postMessageToChannel('general', msg +'\n\n'+ link.finalMsg, msgParams);
                    // bot.postMessageToUser('felipemartins81', msg +'\n\n'+ link.finalMsg, msgParams);  //#dev
                }
            }
            else{ 
                setTimeout(function(){
                    console.log('google api recalling (error)...');
                    searchPlaceToLunch(); // call again if error
                }, 5000);
             }
        });
    }

    function sendFridayMessage() {
        let msg = phrases.getPhraseToFriday();
        bot.postMessageToChannel('general', msg, msgParams);
    }
    
    function sendMondayMessage() {
        let msg = phrases.getPhraseToMonday();
        bot.postMessageToChannel('general', msg, msgParams);
    }

    function recurringTasks(){

        let now = new Date();

        /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /* Weekend lunch invites - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        */
        if(
          (now.getDay() !== 0 && now.getDay() !== 6) &&   // ignore weekend
          now.getHours() === 14 &&                        // hora US = hora BR + 3
          (now.getMinutes() > 40 && now.getMinutes() <= 50) ){
        // if( now.getHours() === 16 ){ //#dev
            
            console.log('yes, is time to lunch');
            searchPlaceToLunch();
        }
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
         - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

         /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /* Friday Msgs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        */
        if(
          now.getDay() === 5 &&     // ignore weekend
          now.getHours() === 20 &&  // hora US = hora BR + 3
          (now.getMinutes() > 40 && now.getMinutes() <= 50) ){
        // if( now.getHours() === 16 ){ //#dev
            
            console.log('yes, is friday time');
            sendFridayMessage();
        }
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
         - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


         /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /* Monday Msgs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        */
        // if(
        //   now.getDay() === 0 &&   // sunday only
        //   now.getHours() === 23 &&  // hora US = hora BR + 3
        //   (now.getMinutes() > 35 && now.getMinutes() <= 55) ){
        // // if( now.getHours() === 16 ){ //#dev
            
        //     console.log('yes, is monday time');
        //     sendMondayMessage();
        // }
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
         - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    }

    function appInterval(){
        // app infinit loop... 
        let each_20_min = 1200000,
            each_10_min = 600000,
            each_5_sec = 5000;

        setInterval(function() {
        // setTimeout(function() { //#dev
            console.log('...');

            recurringTasks();

            http.get(appUrl); // keep server awake

        // }, each_5_sec); //#dev
        }, each_10_min);
    }

    appInterval();
    
})();

/*
** heroku logs --source app -n 100
*/
