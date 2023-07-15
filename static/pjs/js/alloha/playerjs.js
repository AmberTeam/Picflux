<!DOCTYPE html>
<html lang="ru" dir="ltr">
    <head>
        <meta charset="UTF-8"/>
        <meta name="robots" content="nofollow,noindex,noarchive"/>
        <meta name="referrer" content="always"/>
        <meta name="viewport" content="user-scalable=0, initial-scale=1.0, maximum-scale=1.0, width=device-width"/>
        <title>VB</title>
        <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-nice-select@1.1.0/js/jquery.nice-select.min.js"></script>
        <script src="https://unpkg.com/playerjsdev@1.0.13/index.js"></script>
        <style>
            html, body {
                background: transparent;
                height: 100%;
                margin: 0;
                overflow: hidden;
                padding: 0;
                width: 100%;
            }

            body {
                color: inherit;
                font: 14px Arial,'Helvetica Neue',Helvetica,sans-serif;
                line-height: 1;
                min-height: 0;
                text-align: left;
                text-align: start;
                -webkit-tap-highlight-color: rgba(255,255,255,0);
            }

            .video_selectors {
                display: none;
                position: absolute;
                z-index: 100;
            }

            .video_selectors .nice-select {
                font-family: Arial,'Helvetica Neue',Helvetica,sans-serif;
                margin: 3px 4px;
                color: #fff;
                -webkit-tap-highlight-color: transparent;
                background-color: #172322;
                border-radius: 3px;
                border: none;
                box-sizing: border-box;
                clear: both;
                cursor: pointer;
                display: inline-block;
                float: none;
                font-size: 14px;
                font-weight: normal;
                height: 36px;
                line-height: 36px;
                outline: none;
                padding-left: 18px;
                padding-right: 30px;
                position: relative;
                text-align: left !important;
                -webkit-transition: all .25s ease-in-out;
                transition: all .25s ease-in-out;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: auto;
            }

            .video_selectors .nice-select:after {
                background: url(/app/views/images/select-icon.svg) no-repeat;
                background-size: 9px 6px;
                right: 12px;
                top: 50%;
                content: '';
                display: block;
                margin-top: -3px;
                pointer-events: none;
                position: absolute;
                -webkit-transform: rotate(0);
                -ms-transform: rotate(0);
                transform: rotate(0);
                -webkit-transition: all 0.15s ease-in-out;
                transition: all 0.15s ease-in-out;
                width: 9px;
                height: 6px;
            }

            .video_selectors .nice-select .list {
                background-color: #172322;
                border-radius: 3px;
                box-shadow: 0 0 0 1px rgba(68, 68, 68, 0.11);
                box-sizing: border-box;
                margin-top: 3px;
                opacity: 0;
                overflow: hidden;
                padding: 0;
                pointer-events: none;
                position: absolute;
                top: 100%;
                -webkit-transform-origin: 50% 0;
                -ms-transform-origin: 50% 0;
                transform-origin: 50% 0;
                /*    -webkit-transform: scale(0.75) translateY(-21px);
    -ms-transform: scale(0.75) translateY(-21px);
    transform: scale(0.75) translateY(-21px);*/
                -webkit-transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;
                transition: all 0.2s cubic-bezier(0.5, 0, 0, 1.25), opacity 0.15s ease-out;
                z-index: 9;
                max-height: 200px;
                overflow-y: auto;
            }

            .video_selectors .nice-select .option {
                cursor: pointer;
                font-weight: 400;
                line-height: 36px;
                list-style: none;
                min-height: 36px;
                outline: none;
                padding-left: 18px;
                padding-right: 29px;
                text-align: left;
                -webkit-transition: all 0.2s;
                transition: all 0.2s;
            }

            .video_selectors .nice-select.open {
                box-shadow: 0 0 0 2px #00adef;
            }

            .video_selectors .nice-select.open:after {
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            .video_selectors .nice-select.open .list {
                opacity: 1;
                pointer-events: auto;
                /*    -webkit-transform: scale(1) translateY(0);
    -ms-transform: scale(1) translateY(0);
    transform: scale(1) translateY(0);*/
            }

            .video_selectors .nice-select:hover {
                box-shadow: 0 0 0 2px #00adef;
            }

            .video_selectors .nice-select .option:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }

            .video_selectors .nice-select .option.focus, .video_selectors .nice-select .option.selected.focus {
                background-color: rgba(255, 255, 255, 0.1);
            }

            .video_selectors select {
                font-family: Arial,'Helvetica Neue',Helvetica,sans-serif;
                display: inline-block;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                border: none;
                background: #172322 url(/app/views/images/select-icon.svg) no-repeat top 50% right 12px;
                background-size: 9px 6px;
                color: #fff;
                cursor: pointer;
                margin: 3px 4px;
                color: #fff;
                border-radius: 3px;
                font-size: 14px;
                font-weight: normal;
                height: 36px;
                line-height: 36px;
                outline: none;
                padding-left: 18px;
                padding-right: 30px;
                transition: box-shadow .25s ease-out;
            }

            .video_selectors select:focus {
                box-shadow: 0 0 0 2px #00adef;
            }

            .save_holder {
                display: block;
                position: absolute;
                bottom: 60px;
                text-align: center;
                z-index: 100;
            }

            .save_holder a {
                display: inline-block;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                border: none;
                background: #172322;
                color: #fff;
                cursor: pointer;
                color: #fff;
                border-radius: 3px;
                font-size: 14px;
                font-weight: normal;
                height: 36px;
                line-height: 36px;
                outline: none;
                padding-left: 18px;
                padding-right: 18px;
                text-decoration: none;
                transition: box-shadow .25s ease-out;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .save_holder a:hover {
                box-shadow: 0 0 0 2px #00adef;
            }

            .save_holder_sting {
                color: #fff;
                font-size: 14px;
                margin-top: 4px;
                text-shadow: 1px 1px 2px #000, 0 0 2px #000, 0 0 2px #000;
            }

            @media only screen and (max-width: 767px) {
                .video_selectors {
                    margin: -2px -2px;
                }

                .video_selectors .nice-select {
                    margin: 2px 2px;
                    line-height: 30px;
                    height: 30px;
                    padding-left: 14px;
                    padding-right: 24px;
                }

                .video_selectors .nice-select:after {
                    width: 8px;
                    height: 5px;
                    background-size: 8px 5px;
                    right: 9px;
                    margin-top: -2px;
                }

                .video_selectors .nice-select .list {
                    max-height: 136px;
                    overflow-y: auto;
                }

                .video_selectors .nice-select .option {
                    line-height: 30px;
                    min-height: 30px;
                    padding-left: 14px;
                    padding-right: 24px;
                }

                .video_selectors select {
                    background: #172322 url(/app/views/images/select-icon.svg) no-repeat top 50% right 9px;
                    background-size: 8px 5px;
                    margin: 2px 2px;
                    height: 30px;
                    line-height: 30px;
                    padding-left: 14px;
                    padding-right: 24px;
                }
            }

            .player {
                width: 100%;
                height: 100%;
                overflow: hidden;
                outline: 0;
                font-size: 100%;
                font-family: Arial,'Helvetica Neue',Helvetica,sans-serif;
                background-color: #000;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                touch-action: manipulation;
                /*    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);*/
                z-index: 1;
            }

            .vb-in-process-quality {
                background: url(/app/views/images/inprocess-quality-icon.svg) no-repeat center right;
                background-size: 10px;
                color: #5f5f5f;
                padding-right: 15px;
            }

            .video_selectors {
                top: 7px !important;
            }

            .video_selectors {
                left: 6px !important;
            }

            .video_selectors .nice-select .list {
                left: 0;
            }
        </style>
    </head>
    <body>
        <script>
            var page_in_frame = false;

            try {
                page_in_frame = (window != window.top || document != top.document || self.location != top.location);
            } catch (e) {
                page_in_frame = true;
            }

            // if (!page_in_frame) {
            //     document.querySelectorAll('body')[0].remove();
            //     document.querySelectorAll('html')[0].innerHTML = '<div><span>!</span><h1>Ошибка 1005</h1><p>Контент не найден или недоступен в вашем регионе</p></div><style>body{margin:0;padding:0;background:#1E1E24;color:#fff;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:36px;text-align:center;min-height:100vh;}div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-height:100vh;padding:50px 0;box-sizing:border-box;max-width:900px;margin:0 auto;}span{width:100px;height:100px;border:2px solid #d8942f;color:#d8942f;line-height:100px;font-size:26px;text-align:center;border-radius:50%;}h1{font-size:48px;margin:0;padding:35px 0 0;}p{margin:0;padding:35px 0 0;}@media only screen and (max-width: 767px){body{font-size:28px;}span{font-size:18px;width:60px;height:60px;line-height:60px;}h1{font-size:36px;}p{padding:20px 0 0;}}</style>';
            // }
        </script>
        <div id="selectors" class="video_selectors" style="display: block;">
            <span style="display: inline-block;">
                <select name="season" id="season-number" data-select="1">
                    <option value="1" selected="selected" readonly="readonly">Сезон 1</option>
                    <option value="2">Сезон 2</option>
                    <option value="3">Сезон 3</option>
                    <option value="4">Сезон 4</option>
                </select>
            </span>
            <span style="display: inline-block;">
                <select name="episode" id="episode-number" data-select="1">
                    <option value="1" selected="selected" readonly="readonly">Серия 1</option>
                    <option value="2">Серия 2</option>
                    <option value="3">Серия 3</option>
                    <option value="4">Серия 4</option>
                    <option value="5">Серия 5</option>
                    <option value="6">Серия 6</option>
                    <option value="7">Серия 7</option>
                    <option value="8">Серия 8</option>
                    <option value="9">Серия 9</option>
                    <option value="10">Серия 10</option>
                </select>
            </span>
            <select name="translator" id="translator-name" data-select="1">
                <option data-token="" data-d="" value="0">Перевод</option>
                <option data-token="f7b57d9e0582fe01f40f01153896798c" data-d="" value="1120">HDrezka Studio</option>
                <option data-token="14fa6f3fd515d7788ba5697f121142b0" data-d="" value="210">Дубляж</option>
                <option data-token="e44590d83c738688f8a181f2f1afc935" data-d="" value="1310">TVShows</option>
                <option data-token="b4c49f68440468e6a82260c826c6720a" data-d="" value="20">LostFilm</option>
                <option data-token="4b15c2df8eafc99b19e81dd64840a56a" data-d="" value="30">Newstudio</option>
                <option data-token="4628d7c0690296658430d90281240d92" data-d="" value="70">Alexfilm</option>
                <option data-token="910d1630eeaac6d6756a4873c1660907" data-d="" value="5640">Украинский многоголосый</option>
                <option data-token="9f1ca76c5414d764eb68d790940d55ca" data-d="" value="200">Субтитры</option>
            </select>
        </div>
        <div id="player" class="player"></div>
        <script>
            var cdn = cdn || {};

            window.abc = false;

            cdn.player = (function() {
                var pub = {};

                var CDNplayer = null
                  , CDNautoplay = 0
                  , CDNstart = 0
                  , CDNquality = null
                  , durationVideo = 4100
                  , currentTime = 0
                  , durationTime = null
                  , iframeHostname = window.location.hostname
                  , iframeVastKey = ''
                  , iframeVastValue = {
                    'p': 0,
                    'm': 0
                }
                  , iframeReferer = 'voidboost.net';

                var getCDNplayerCUID = function() {
                    // return '54474--1-1';
                    return '54474';
                }

                pub.controlSelectors = function(event) {
                    var is_hidden = 0;

                    if (is_hidden == 1)
                        return;

                    if (event == 'show') {
                        $('#selectors').stop(true, true).fadeIn(100);
                    } else {
                        $('#selectors').stop(true, true).fadeOut(100);
                    }
                }

                pub.is_touch = function() {
                    return 'ontouchstart'in document.documentElement;
                }

                pub.getIframeReferer = function() {
                    return iframeReferer;
                }

                pub.getIframeHostname = function() {
                    return iframeHostname;
                }

                var setSave = function() {
                    var _key = "save-" + getCDNplayerCUID()
                      , _value = {
                        p: 54474,
                        t: 0,
                        d: 0,
                        tn: null,
                        s: 1,
                        e: 1,
                        time: Math.floor(currentTime),
                        duration: durationTime
                    };

                    try {
                        localStorage.setItem(_key, JSON.stringify(_value));

                        return true;
                    } catch (e) {}
                    ;
                    return false;
                }

                var removeSave = function() {
                    var _key = "save-" + getCDNplayerCUID();

                    try {
                        return localStorage.removeItem(_key);
                    } catch (e) {}
                    ;
                    return true;
                }

                var getSave = function() {
                    var is_hidden = 0;

                    if (is_hidden == 1)
                        return;

                    var _key = "save-" + getCDNplayerCUID();

                    try {
                        return localStorage.getItem(_key);
                    } catch (e) {}
                    ;
                    return null;
                }

                var setItem = function(k, v) {
                    try {
                        localStorage.setItem(k, v);

                        return true;
                    } catch (e) {}
                    ;
                    return false;
                }

                var getItem = function(k) {
                    try {
                        return localStorage.getItem(k);
                    } catch (e) {}
                    ;
                    return null;
                }

                var toFormattedTime = function(input, withHours, roundSeconds) {
                    if (roundSeconds) {
                        input = Math.ceil(input);
                    }

                    var hoursString = '00';
                    var minutesString = '00';
                    var secondsString = '00';
                    var hours = 0;
                    var minutes = 0;
                    var seconds = 0;

                    hours = Math.floor(input / (60 * 60));
                    input = input % (60 * 60);

                    minutes = Math.floor(input / 60);
                    input = input % 60;

                    seconds = input;

                    hoursString = (hours >= 10) ? hours.toString() : '0' + hours.toString();
                    minutesString = (minutes >= 10) ? minutes.toString() : '0' + minutes.toString();
                    secondsString = (seconds >= 10) ? seconds.toString() : '0' + seconds.toString();

                    return ((withHours) ? hoursString + ':' : '') + minutesString + ':' + secondsString;
                }

                pub.setVBR = function(v) {
                    setItem('vbr', v);
                }

                pub.getVBR = function() {
                    var _vbr = getItem('vbr');

                    return ((_vbr !== null) ? _vbr : iframeReferer);
                }

                pub.buildCDNplayer = function() {
                    iframeReferer = 'cimber.website';

                    pub.setVBR(iframeReferer);

                    try {
                        if (localStorage.getItem('pljsvolume_updated') === null) {
                            localStorage.setItem('pljsvolume', 1);
                            localStorage.setItem('pljsvolume_updated', 1);
                        }
                    } catch (e) {}
                    ;
                    if (CDNplayer === null) {
                        // console.log(CDNplayerConfig);
                        CDNplayer = new Playerjs(CDNplayerConfig);
                    }
                }

                var lns = [];

                PlayerjsEvents = function(event, id, info) {

                    if (event == "init") {
                        if (CDNplayer.api('adblock')) {
                            window.abc = true;
                        }

                    }

                    if (event == 'subtitle') {
                        var cc = document.getElementById('player_control_cc_icon0'), cl = 'none', arr, ln = ((lns[info] !== undefined) ? lns[info] : "");

                        if (ln == '') {
                            arr = cc.className.split(" ");

                            if (arr.indexOf(cl) == -1) {
                                cc.className += ' ' + cl;
                            }
                        } else {
                            cc.className = cc.className.replace(/\bnone\b/g, "");
                        }

                        cc.setAttribute('data-content', ln.replace(/\-\d+/i, ''));
                    }

                    if (event == "play") {//
                    }

                    if (event == "play" || event == "start" || event == "vast_init") {
                        pub.controlSelectors('hide');

                        $('#save-holder').remove();
                    }

                    if (event == "start") {
                        $.ajax({
                            type: "get",
                            url: '/s',
                            data: 'd=' + pub.getVBR(),
                            dataType: "html",
                            cache: false,
                            success: function(response) {}
                        });
                    }

                    if (event == "pause" || event == "end") {
                        pub.controlSelectors('show');
                    }

                    if (event == "end") {}

                    if (event == "new") {//
                    }

                    if (event == "time") {
                        if (info > 0 && CDNplayer.api('duration') > 0) {
                            currentTime = info;
                            durationTime = CDNplayer.api('duration');

                            setSave();
                        }
                    }

                    if (event == "reload") {//
                    }

                    if (event == "vast_load") {
                        if (info == "preroll") {
                            iframeVastKey = 'p';
                        } else if (info == "midroll") {
                            iframeVastKey = 'm';
                        }

                        if (typeof iframeVastValue[iframeVastKey] != 'undefined') {
                            iframeVastValue[iframeVastKey]++;
                        }
                    }

                    if (event == "vast_complete" || event == "vast_skip") {
                        if (typeof iframeVastValue[iframeVastKey] != 'undefined') {
                            $.ajax({
                                type: "get",
                                url: '/sa',
                                data: 'd=' + pub.getVBR() + '&' + iframeVastKey + '=' + iframeVastValue[iframeVastKey] + '&hash=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2YWxpZCI6IjNjNWY0YmFlZjA5NDdjNDY5OTg5ODY4Mjc1MDU2ZmU2In0.qWnqj_V8zEuhpWRDGkpGHx5hHmg3PhxuUCodR7q7SuE',
                                dataType: "html",
                                cache: false,
                                success: function(response) {}
                            });
                        }
                    }
                }

                PlayerReady = function() {
                    if (CDNautoplay == 0) {
                        var _save = getSave();

                        if (_save) {
                            try {
                                _save = JSON.parse(_save);

                                if (_save.t !== 0 && _save.tn !== null && $('#translator-name option[value="' + _save.t + '"]').length < 1) {
                                    return false;
                                }

                                var _allowed = 1
                                  , _cmod = '';

                                switch (_cmod) {
                                case 'translator':
                                    if (_save.t != '0') {
                                        _allowed = 0;
                                    }

                                    break;

                                case 'season':
                                    if (_save.s != 1) {
                                        _allowed = 0;
                                    }

                                    break;

                                case 'episode':
                                    if (_save.s != 1 || _save.e != 1) {
                                        _allowed = 0;
                                    }

                                case 'single':
                                    if (_save.t != '0' || _save.s != 1 || _save.e != 1) {
                                        _allowed = 0;
                                    }

                                    break;
                                }

                                var _cstop = 0;

                                if (_cstop > 0 && durationVideo > 0 && Math.ceil(_save.time * 100 / durationVideo) >= _cstop) {
                                    _allowed = 0;
                                }

                                if (_allowed == 1) {
                                    var _url_params = []
                                      , _url_type = 'movie';

                                    if (_save.s != null) {
                                        _url_params.push('s=' + _save.s);
                                    }

                                    if (_save.e != null) {
                                        _url_params.push('e=' + _save.e);
                                    }

                                    if (_url_params.length > 0) {
                                        _url_type = 'serial';
                                    }

                                    if (_save.d == 1) {
                                        _url_params.push('d=1');
                                    }

                                    _url_params.push('h=' + pub.getVBR());

                                    if (_save.t === 0 && _save.tn === null) {
                                        _url_params = '/embed/195523?autoplay=1&start=' + _save.time + ((_url_params.length > 0) ? '&' + _url_params.join('&') : '');
                                    } else {
                                        _url_params = '/' + _url_type + '/' + $('#translator-name option[value="' + _save.t + '"]').data('token') + '/iframe?autoplay=1&start=' + _save.time + ((_url_params.length > 0) ? '&' + _url_params.join('&') : '');
                                    }

                                    var _html = '<div id="save-holder" class="save_holder" style="display: none;"><a id="continue-play" href="javascript:void(0)" data-url="' + _url_params + '">продолжить просмотр с ' + toFormattedTime(_save.time, true, true) + '</a>' + ((_save.e != null) ? '<div class="save_holder_sting">' + ((_save.s != null) ? 'сезон ' + _save.s + ' ' : '') + ((_save.e != null) ? 'серия ' + _save.e : '') + '</div>' : '') + ((_save.tn != null) ? '<div class="save_holder_sting"><b>' + _save.tn + ((_save.d == 1) ? ' (расшир. версия)' : '') + '</b></div>' : '') + '</div>';

                                    $(_html).appendTo('body');

                                    $('#save-holder').css({
                                        'margin-left': -1 * $('#save-holder').width() / 2,
                                        'left': '50%'
                                    }).show();
                                }
                            } catch (e) {}
                            ;
                        }
                    }
                }

                /* player config */
                CDNquality = getItem('pljsquality');

                var CDNplayerConfig = {
                    'id': 'player',
                    'cuid': getCDNplayerCUID(),
                    'lang': 'ru',
                    'poster': null,
                    'file': '#2WzI0MHBdaHR0cHM6Ly9zdHJlYW0udm9pZGJvb3N0LmNjLzEvMS84LzgvOC8yLzAzNDQxNzEwNGU5OG//_//JCQkIyMjIyEhISEhISE=EyYjFhYWM4MDllYTVkNmIwMjkzOjIwMjMwNjIwMDE6VmtaMVRtaGFZMWRWY0VjMmMzVjVOMHRrWmtsUWVXTnlZbmxHU0dWcmNXOXFWemQ0Ym13d//_//QCMhQEBAIyMkJEBA2MwOU5aemgwV0ZaTU5EaFZNM0V3TjFwTVp6bFNiemRvUm1WcU5WUkNhRzVaYXpOTVptWnBiVzl2UlRaR09UaG5VSGc0T1RCR05qbDFUbU5WVkhaQk0zWm5ka2s5L3ZlNHpmLm1wNDpobHM6bWFuaWZlc3QubTN1OCBvciBodHRwczovL3N0cmVhbS52b2lkYm9vc3QuY2MvMGY0ZTlhMDAyYjY4ODMzOTM2Mzg2YzExZjg3NjM1ZWE6MjAyMzA2MjAwMTpWa1oxVG1oYVkxZFZjRWMyYzNWNU4wdGtaa2xRZVdOeVlubEdTR1ZyY1c5cVZ6ZDRibXd3YzA5Tlp6aDBXRlpNTkRoVk0zRXdOMXBNWnpsU2J6ZG9SbVZxTlZSQ2FHNVphek5NWm1acGJXOXZSVFpHT1RoblVIZzRPVEJHTmpsMVRtTlZWSFpCTTNabmRrazkvMS8xLzgvOC84LzIvdmU0emYubXA0LFszNjBwXWh0dHBzOi8vc3RyZWFtLnZvaWRib29zdC5jYy8xLzEvOC84LzgvMi8wMzQ0MTcxMDRlOThhMmIxYWFjODA5ZWE1ZDZiMDI5MzoyMDIzMDYyMDAxOlZrWjFUbWhhWTFkVmNFYzJjM1Y1TjB0a1prbFFlV055WW5sR1NHVnJjVzlxVnpkNGJtd3djMDlOWnpoMFdGWk1ORGhWTTNFd04xcE1aemxTYnpkb1JtVnFOVlJDYUc1WmF6Tk1abVpwYlc5dlJUWkdPVGhuVUhnNE9UQkdOamwxVG1OVlZIWkJNM1puZGtrOS92ZTR6Zi5tcDQ6aGxzOm1hbmlmZXN0Lm0zdTggb3IgaHR0cHM6Ly9zdHJlYW0udm9pZGJvb3N0LmNjLzBmNGU5YTAwMmI2ODgzMzkzNjM4NmMxMWY4NzYzNWVhOjIwMjMwNjIwMDE6VmtaMVRtaGFZMWRWY0VjMmMzVjVOMHRrWmtsUWVXTnlZbmxHU0dWcmNXOXFWemQ0Ym13d2MwOU5aemgwV0ZaTU5EaFZNM0V3TjFwTVp6bFNiemRvUm1WcU5WUkNhRzVaYXpOTVptWnBiVzl2UlRaR09UaG5VSGc0T1RCR05qbDFUbU5WVkhaQk0zWm5ka//_//Xl4jQEAhIUAjISQ=2s5LzEvMS84LzgvOC8yL3ZlNHpmLm1wNCxbNDgwcF1odHRwczovL3N0cmVhbS52b2lkYm9vc3QuY2MvMS8xLzgvOC84LzIvMDM0NDE3MTA0ZTk4YTJiMWFhYzgwOWVhNWQ2YjAyOTM6MjAyMzA2MjAwMTpWa1oxVG1oYVkxZFZjRWMyYzNWNU4wdGtaa2xRZVdOeVlubEdTR1ZyY1c5cVZ6ZDRibXd3YzA5Tlp6aDBXRlpNTkRoVk0zRXdOMXBNWnpsU2J6ZG9SbVZxTlZSQ2FHNVphek5NWm1acGJXOXZSVFpHT1RoblVIZzRPVEJHTmpsMVRtTlZWSFpCTTNabmRrazkvcXpjNTkubXA0OmhsczptYW5pZmVzdC5tM3U4IG9yIGh0dHBzOi8vc3RyZWFtLnZvaWRib29zdC5jYy8wYjJmY2NiYTQ2ZGEwMmZmYzQ5ZDQ4Y2NjODc5OTBlMDoyMDIzMDYyMDAxOlZrWjFUbWhhWTFkVmNFYzJjM1Y1TjB0a1prbFFlV055WW5sR1NHVnJjVzlxVnpkNGJtd3djMDlOWnpoMFdGWk1ORGhWTTNFd04xcE1aemxTYnpkb1JtVnFOVlJDYUc1WmF6Tk1abVpwYlc5dlJUWkdPVGhuVUhnNE9UQkdOamwxVG1OVlZIWkJNM1puZGtrOS8xLzEvOC84LzgvMi9xemM1OS5tcDQsWzcyMHBdaHR0cHM6Ly9zdHJlYW0udm9pZGJvb3N0LmNjLzEvMS84LzgvOC8yLzAzNDQxNzEwNGU5OGEyYjFhYWM4MDllYTVkNmIwMjkzOjIwMjMwNjIwMDE6VmtaMVRtaGFZMWRWY0VjMmMzVjVOMHRrWmtsUWVXTnlZbmxHU0dWcmNXOXFWemQ0Ym13d2MwOU5aemgwV0ZaTU5EaFZNM0V3TjFwTVp6bFNiemRvUm1WcU5WUkNhRzVaYXpOTVptWnBiVzl2UlRaR09//_//QCFeXiFAI0BAJCQkJCQ=UaG5VSGc0T1RCR05qbDFUbU5WVkhaQk0zWm5ka2s5LzAyM2RsLm1wNDpobHM6bWFuaWZlc3QubTN1OCBvciBodHRwczovL3N0cmVhbS52b2lkYm9vc3QuY2MvYzc3ZjdlYzY5ZTA3NzRmZWUzMzI4MDkwODNmNTIzNDM6MjAyMzA2MjAwMTpWa1oxVG1oYVkxZFZjRWMyYzNWNU4wdGtaa2xRZVdOeVlubEdTR1ZyY1c5cVZ6ZDRibXd3YzA5Tlp6aDBXRlpNTkRoVk0zRXdOMXBNWnpsU2J6ZG9SbVZ//_//Xl5eXl5eIyNAxTlZSQ2FHNVphek5NWm1acGJXOXZSVFpHT1RoblVIZzRPVEJHTmpsMVRtTlZWSFpCTTNabmRrazkvMS8xLzgvOC84LzIvMDIzZGwubXA0LFsxMDgwcF1odHRwczovL3N0cmVhbS52b2lkYm9vc3QuY2MvMS8xLzgvOC84LzIvMDM0NDE3MTA0ZTk4YTJiMWFhYzgwOWVhNWQ2YjAyOTM6MjAyMzA2MjAwMTpWa1oxVG1oYVkxZFZjRWMyYzNWNU4wdGtaa2xRZVdOeVlubEdTR1ZyY1c5cVZ6ZDRibXd3YzA5Tlp6aDBXRlpNTkRoVk0zRXdOMXBNWnpsU2J6ZG9SbVZxTlZSQ2FHNVphek5NWm1acGJXOXZSVFpHT1RoblVIZzRPVEJHTmpsMVRtTlZWSFpCTTNabmRrazkvZWJlb3cubXA0OmhsczptYW5pZmVzdC5tM3U4IG9yIGh0dHBzOi8vc3RyZWFtLnZvaWRib29zdC5jYy9kMjY5ZGU3NjdiYjE1MjI3YTc0ZGJhODZiZmM0NWQ4MzoyMDIzMDYyMDAxOlZrWjFUbWhhWTFkVmNFYzJjM1Y1TjB0a1prbFFlV055WW5sR1NHVnJjVzlxVnpkNGJtd3djMDlOWnpoMFdGWk1ORGhWTTNFd04xcE1aemxTYnpkb1JtVnFOVlJDYUc1WmF6Tk1abVpwYlc5dlJUWkdPVGhuVUhnNE9UQkdOamwxVG1OVlZIWkJNM1puZGtrOS8xLzEvOC84LzgvMi9lYmVvdy5tcDQ=',
                    'default_quality': ((CDNquality !== null) ? CDNquality : '480p'),
                    'subtitle': false,
                    'thumbnails': '/thumbnails/ed3fa81d4c01db565bf4d2436c14f62e/1687191606',
                    'preroll': 'https://franecki.net/assets/vendor/bd01f9fd2f98c883c2c1656c64eaa488.xml?v=3.0&amp;external_subid=(host) or https://www.serv01001.xyz/z66OALCS1XXLfjgBtcwqJ78he8tEim2pO58Yy6T52vPZ7FUkDdFFm2yJUV4nhhcEQQp5B8z1rn0NUtq-Ka-Sw-Vgg9puib04?ch=(host) or https://z.cdn.trafficbass.com/load?o=v&amp;z=1785653839&amp;random=1687191606 and https://franecki.net/assets/vendor/4859887760136393cb6cfdd25a79cab2.xml?v=3.0&amp;external_subid=(host) or https://www.serv01001.xyz/z66OALCS1XXLfjgBtcwqJ78he8tEim2pO58Yy6T52vPZ7FUkDdFFm2yJUV4nhhcEQQp5B8z1rn0NUtq-Ka-Sw-Vgg9puib04?ch=(host) or https://z.cdn.trafficbass.com/load?o=v&amp;z=1451135570&amp;random=1687191606',
                    'hlsconfig': {
                        'maxBufferLength': 60,
                        // 180
                        'maxBufferSize': 33554432000
                    },
                    'hlsdebug': 0,
                    'debug': 0,
                    'ready': PlayerReady(),
                    'autoplay': CDNautoplay,
                    'start': CDNstart
                }

                return pub;
            }());

            $(function() {
                if (!cdn.player.is_touch()) {
                    $('#selectors select[data-select="1"]').niceSelect();

                    setTimeout(function() {
                        $('.nice-select ul').each(function() {
                            var _dropdown = $(this)
                              , _selected = null
                              , _pos = 0;

                            // _dropdown.find('li[data-value="0"]').hide();

                            _selected = _dropdown.find('.selected');
                            _pos = _selected.position().top;

                            if (_pos > 0) {
                                _dropdown.animate({
                                    scrollTop: _selected.position().top - _selected.height() / 2
                                }, 0);
                            }
                        });
                    }, 0);
                }

                $('#translator-name option[value="0"]').hide();

                cdn.player.controlSelectors('show');

                cdn.player.buildCDNplayer();

                $('#continue-play').on('click', function(e) {
                    e.preventDefault();

                    window.location.href = $(this).data('url');
                });

                var p_id = 54474
                  , type = 'serial'
                  , m_s = 'auto'
                  , m_s_set = 1;

                $('#translator-name').change(function() {
                    var _translator_id = $(this).val()
                      , _season = $('#season-number').val()
                      , _episode = $('#episode-number').val();

                    $.ajax({
                        url: '/serial/data',
                        type: "POST",
                        data: 'p=' + p_id + '&t=' + _translator_id.substring(0, _translator_id.length - 1) + '&s=' + _season + '&e=' + _episode,
                        dataType: "json",
                        success: function(response) {
                            m_s = 'manual';
                            m_s_set = 0;

                            var _seasons_select = $('#season-number')
                              , _episodes_select = $('#episode-number')
                              , _selected = '';

                            _seasons_select.empty();
                            _episodes_select.empty();

                            for (var i = 0; i < response.seasons.length; i++) {
                                _selected = (response.seasons[i].selected) ? ' selected="selected"' : '';

                                _seasons_select.append('<option value="' + response.seasons[i].value + '"' + _selected + '>' + response.seasons[i].name + '</option>');
                            }

                            for (var i = 0; i < response.episodes.length; i++) {
                                _selected = (response.episodes[i].selected) ? ' selected="selected"' : '';

                                _episodes_select.append('<option value="' + response.episodes[i].value + '"' + _selected + '>' + response.episodes[i].name + '</option>');
                            }

                            _episodes_select.change();
                        }
                    });
                });

                var seasons_episodes = {
                    "1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    "2": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    "3": [1, 2, 3, 4, 5, 6, 7, 8],
                    "4": [1, 2, 3, 4, 5, 6, 7, 8]
                };

                $('#season-number').change(function() {
                    var _season = $(this).val()
                      , _episodes_select = $('#episode-number');

                    _episodes_select.empty();

                    var _len = seasons_episodes[_season].length
                      , _selected = '';

                    for (var i = 0; i < _len; i++) {
                        _selected = (i == 0) ? ' selected="selected"' : '';

                        _episodes_select.append('<option value="' + seasons_episodes[_season][i] + '"' + _selected + '>Серия ' + seasons_episodes[_season][i] + '</option>');
                    }

                    _episodes_select.change();
                })

                $('#episode-number').change(function() {
                    var _episode = $(this).val()
                      , _season = $('#season-number').val()
                      , _token = $('#translator-name').find(':selected').attr('data-token')
                      , _url_params = '';

                    if (m_s == 'auto') {
                        window.location.href = '?s=' + _season + '&e=' + _episode + '&h=' + cdn.player.getVBR() + _url_params;
                    } else if (m_s_set == 1) {
                        window.location.href = '/serial/' + _token + '/iframe?h=' + cdn.player.getVBR() + _url_params;
                    } else {
                        window.location.href = '/serial/' + _token + '/iframe?s=' + _season + '&e=' + _episode + '&h=' + cdn.player.getVBR() + _url_params;
                    }
                });
            });
        </script>
        <script type="text/javascript">
            (function(m, e, t, r, i, k, a) {
                m[i] = m[i] || function() {
                    (m[i].a = m[i].a || []).push(arguments)
                }
                ;
                m[i].l = 1 * new Date();
                k = e.createElement(t),
                a = e.getElementsByTagName(t)[0],
                k.async = 1,
                k.src = r,
                a.parentNode.insertBefore(k, a)
            }
            )(window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");
            ym(89722888, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        </script>
        <noscript>
            <div>
                <img src="https://mc.yandex.ru/watch/89722888" style="position:absolute; left:-9999px;" alt=""/>
            </div>
        </noscript>
    </body>
</html>
