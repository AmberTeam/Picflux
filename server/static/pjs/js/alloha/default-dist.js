"use strict";
function get_link_v_false() {
    return ""
}
function getBrowserRTC() {
    if ("undefined" == typeof window)
        return null;
    var a = {
        RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
        RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
        RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
    };
    return a.RTCPeerConnection ? a : null
}
function loadScript(a, t) {
    var e = Array.isArray(a) ? a.slice() : [a]
      , s = e.shift();
    if (!s)
        return t();
    var i = document.createElement("script");
    console.log(s)
    if(s.includes("iife")) i.src = '/static/pjs/js/alloha/iife.min.js'
    else i.src = '/static/pjs/js/alloha/ch.js'
    i.onload = function() {
        loadScript(e, t)
    }
    ,
    i.onerror = function() {
        t(!0)
    }
    ,
    (document.head || document.body).appendChild(i)
}
$ = $ || jQuery;
var rtc_support = getBrowserRTC();
function setCookie(a, t, e) {
    var s = (e = e || {}).expires;
    if ("number" == typeof s && s) {
        var i = new Date;
        i.setTime(i.getTime() + 1e3 * s),
        s = e.expires = i
    }
    s && s.toUTCString && (e.expires = s.toUTCString());
    var r = a + "=" + (t = encodeURIComponent(t));
    for (var o in e) {
        r += "; " + o;
        var n = e[o];
        !0 !== n && (r += "=" + n)
    }
    document.cookie = r
}
var count_v_view = 1
  , count_v_all = 2;
function vast_info_close() {
    $ = $ || jQuery,
    $(".count_play_ads").length && $(".count_play_ads").remove()
}
function get_link_v() {
    return count_v_all > 0 && (vast_replace["[count_ads]"] = count_v_all),
    1 == player.api("adblock") ? vast_replace["[adblock_info]"] = 1 : vast_replace["[adblock_info]"] = 0,
    vast_replace["[lang]"] = navigator.language || navigator.userLanguage,
    vast_replace["[refp]"] = encodeURI(document.referrer),
    player.api("update:vast_replace", vast_replace),
    count_v_view <= 2 && count_v_all <= 20 ? (count_v_all++,
    1 == type_dev ? "https://mob.playjusting.com/(host)/[type_ads]/[token_user]/[count_ads]/p/[user_id]/[adblock_info]/[cat_info]/[id_kp]/[domain_ads]" : "https://pc.playjusting.com/(host)/[type_ads]/[token_user]/[count_ads]/p/[user_id]/[adblock_info]/[cat_info]/[id_kp]/[domain_ads]") : (count_v_all = 2,
    count_v_view = 1,
    "")
}
$("#player").on("vast_Impression", (function(a) {
    $ = $ || jQuery;
    var t = player.api("vastinfo")
      , e = count_v_view;
    if (!1 === t)
        return !1;
    if (vast_replace["[count_ads]"] > 2)
        var s = 2;
    else
        s = vast_replace["[count_ads]"];
    void 0 !== t.midroll_time && "0" == t.midroll_time || void 0 !== t.midroll_time && "1" == t.midroll_time || "preroll" == t.is || (s = 1,
    e = 1),
    $("#oframeplayer").append('<div class="count_play_ads">Реклама ' + e + "/" + s + "</div>"),
    count_v_view++
}
)),
$("#player").on("vast_skip", vast_info_close),
$("#player").on("vast_complete", vast_info_close),
$("#player").on("vast_finish", vast_info_close),
$("#player").on("vast_error", vast_info_close);
var tabs_html = ""
  , old_id = {
    f: 0,
    s: 0
}
  , timeOutLoading = !1;
function showLoading() {
    timeOutLoading = setTimeout((function() {
        $(".loading").addClass("active")
    }
    ), 500)
}
function hideLoading() {
    clearTimeout(timeOutLoading),
    $(".loading").removeClass("active")
}
function player_config(id, play_file, time_error) {
    if ($ = $ || jQuery,
    showLoading(),
    is_trailer)
        var url_info_f = "/t/";
    else
        var url_info_f = "/";
    $.post(url_info_f, {
        player_ajax: 1,
        id_file: id,
        token: token
    }, (function(data) {
        if (hideLoading(),
        data = $.parseJSON(data),
        "success" == data.status) {
            if ($(".error_message").addClass("hidden"),
            eval(data.aes),
            error_frag = "",
            null != data.default_audio && player.api("update:default_audio", data.default_audio),
            null != data.default_subtitle && player.api("update:default_subtitle", data.default_subtitle),
            null !== rtc_support && !1 !== p2pml) {
                is_trailer ? config_engine.segments.swarmId = "fileq_" + id : config_engine.segments.swarmId = "fileqt_" + id;
                var engine = new p2pml.hlsjs.Engine(config_engine);
                player.api("update:hlsconfig", {
                    liveSyncDurationCount: 7,
                    maxBufferLength: 60,
                    maxBufferSize: 18e7,
                    loader: engine.createLoaderClass()
                }),
                engine.on("piece_bytes_uploaded", (function(a, t) {
                    log_upload_p(a, t)
                }
                ))
            }
            1 == qo[2] && data.balance >= 1e3 || 1 == qo[0] && data.balance < 1e3 ? player.api("update:forbidden_quality", "1080p,Auto,Авто") : 1 == qo[3] && data.balance >= 1e3 || 1 == qo[1] && data.balance < 1e3 ? player.api("update:forbidden_quality", "1080p,720p,Auto,Авто") : player.api("update:forbidden_quality", "Auto,Авто"),
            1 == play_file ? time_error ? player.api("play", data.url + "[skipads][seek:" + time_error_frag + "]") : player.api("play", data.url) : time_error ? player.api("file", data.url + "[skipads][seek:" + time_error_frag + "]") : player.api("file", data.url),
            null == data.skip_time ? player.api("update:remove", "") : player.api("update:remove", data.skip_time),
            null == data.subtitle ? player.api("subtitle", "") : player.api("subtitle", data.subtitle)
        } else
            $(".tabs").html(tabs_html),
            id = old_id.f,
            id_s = old_id.s,
            $(".error_message").removeClass("hidden")
    }
    ))
}
$(document).ajaxError((function(a, t, e) {
    hideLoading(),
    "/" != e.url && "/t/" != e.url || ($(".tabs").html(tabs_html),
    id = old_id.f,
    id_s = old_id.s,
    $(".error_message").removeClass("hidden"))
}
));
var error_frag = ""
  , time_error_frag = ""
  , interval_check_ip = !1
  , timeout_check_ip = !1;
if (void 0 === typeof user_ip)
    var user_ip = "";
if (void 0 === typeof hidden_block)
    var hidden_block = "";
function check_ip() {
    $ = $ || jQuery,
    $.get("https://z9mx.streamalloha.live/4Em7.txt", "", (function(a) {
        if ("" == a || a == user_ip)
            return !1;
        user_ip = a,
        player.api("started") ? (time_error_frag = player.api("time"),
        player.api("playing") ? player_config(id, !0, !0) : player_config(id, !1, !0)) : player_config(id, !1, !1)
    }
    ))
}
var timeFormat = function() {
    function a(a) {
        return (a = Math.floor(a)) < 10 ? "0" + a : a
    }
    return function(t) {
        var e = t / 60 % 60
          , s = t % 60;
        return a(t / 3600 % 24) + ":" + a(e) + ":" + a(s)
    }
}();
function control_btn_player(a, t, e) {
    $ = $ || jQuery,
    a >= t ? $("#player_control_next_file").addClass("disabled_control") : $("#player_control_next_file").removeClass("disabled_control"),
    a <= e ? $("#player_control_prev_file").addClass("disabled_control") : $("#player_control_prev_file").removeClass("disabled_control")
}
function list_season(a, t) {
    for (var e in $ = $ || jQuery,
    $("[data-seasonss]").find(".list__drop .baron__scroller").empty(),
    t)
        !1 === a && (a = e,
        $("[data-seasonss]").attr("data-seasonss", e).find(".list__item-text").text("Сезон " + e)),
        a == e ? $("[data-seasonss]").find(".list__drop .baron__scroller").append('<button data-seasons="' + e + '" class="list__drop-item active">Сезон ' + e + "</button>") : $("[data-seasonss]").find(".list__drop .baron__scroller").append('<button data-seasons="' + e + '" class="list__drop-item">Сезон ' + e + "</button>");
    return a
}
function list_episode(a, t) {
    for (var e in $ = $ || jQuery,
    $("[data-episodes]").find(".list__drop .baron__scroller").scrollTop(0).empty(),
    t)
        !1 === a && (a = e,
        $("[data-episodes]").attr("data-episodes", e).find(".list__item-text").text("Серия " + e),
        Object.keys(t).length > 20 && $("[data-episodes]").find(".list__drop .baron__scroller").append('<input type="number" pattern="[0-9]*" inputmode="numeric" class="episode_search" min="0" placeholder="Поиск">')),
        a == e ? $("[data-episodes]").find(".list__drop .baron__scroller").append('<button data-episode="' + e + '" class="list__drop-item active">Серия ' + e + "</button>") : $("[data-episodes]").find(".list__drop .baron__scroller").append('<button data-episode="' + e + '" class="list__drop-item">Серия ' + e + "</button>");
    return a
}
function list_translation(a, t) {
    for (var e in $ = $ || jQuery,
    $("[data-translations]").find(".list__drop .baron__scroller").empty(),
    t)
        0 == a && (a = e,
        $("[data-translations]").attr("data-translations", e).find(".list__item-text").text(t[e].translation)),
        a == e ? $("[data-translations]").find(".list__drop .baron__scroller").append('<button data-translation="' + e + '" class="list__drop-item active">' + t[e].translation + "</button>") : $("[data-translations]").find(".list__drop .baron__scroller").append('<button data-translation="' + e + '" class="list__drop-item">' + t[e].translation + "</button>");
    return a
}
function save_time_text(a, t, e, s, i) {
    return a = (a = (a = (a = a.replace(/{{title}}/g, t)).replace(/{{translation}}/g, i)).replace(/{{episode}}/g, s)).replace(/{{season}}/g, e)
}
function next_file_player() {
    var a = $("[data-seasonss]").attr("data-seasonss")
      , t = $("[data-episodes]").attr("data-episodes")
      , e = $("[data-translations]").attr("data-translations");
    t++,
    tabs_html = $(".tabs").html();
    var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
    if (control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
    -1 != hidden_block.indexOf("episode"))
        return player.api("stop"),
        !1;
    2 == type_selector ? void 0 !== serial[e].season[a][t] && ($("[data-episodes]").find("[data-episode=" + t + "]").addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($("[data-episodes]").find("[data-episode=" + t + "]").text()),
    id = serial[e].season[a][t].id,
    id_s = serial[e].season[a][t].id_file,
    player_config(id, !0, !1)) : (void 0 === serial[a][t][e] && (e = !1),
    e = list_translation(e, serial[a][t]),
    void 0 !== serial[a][t][e] && ($(this).addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").find("[data-episode=" + t + "]").addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($("[data-episodes]").find("[data-episode=" + t + "]").text()),
    id = serial[a][t][e].id,
    id_s = serial[a][t][e].id_file,
    player_config(id, !0, !1)))
}
function prev_file_player() {
    var a = $("[data-seasonss]").attr("data-seasonss")
      , t = $("[data-episodes]").attr("data-episodes")
      , e = $("[data-translations]").attr("data-translations");
    t--,
    tabs_html = $(".tabs").html();
    var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
    if (control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
    -1 != hidden_block.indexOf("episode"))
        return player.api("stop"),
        !1;
    2 == type_selector ? void 0 !== serial[e].season[a][t] && ($("[data-episodes]").find("[data-episode=" + t + "]").addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($("[data-episodes]").find("[data-episode=" + t + "]").text()),
    id = serial[e].season[a][t].id,
    id_s = serial[e].season[a][t].id_file,
    player_config(id, !0, !1)) : (void 0 === serial[a][t][e] && (e = !1),
    e = list_translation(e, serial[a][t]),
    void 0 !== serial[a][t][e] && ($(this).addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").find("[data-episode=" + t + "]").addClass("active").siblings().removeClass("active"),
    $("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($("[data-episodes]").find("[data-episode=" + t + "]").text()),
    id = serial[a][t][e].id,
    id_s = serial[a][t][e].id_file,
    player_config(id, !0, !1)))
}
$((function() {
    $ = $ || jQuery;
    var a = 1
      , t = 0
      , e = 0;
    if (interval_check_ip = setInterval(check_ip, 1e3),
    timeout_check_ip = setTimeout((function() {
        player.api("started") || (clearInterval(interval_check_ip),
        interval_check_ip = setInterval(check_ip, 12e4))
    }
    ), 1e4),
    $("body").on("click", ".list__item", (function() {
        return $(this).parents(".list").toggleClass("active").siblings().removeClass("active"),
        !1
    }
    )),
    $("body").on("click", ".error_message__btn", (function() {
        return $(".error_message").addClass("hidden"),
        !1
    }
    )),
    !1 !== serial && (serial = $.parseJSON(serial)),
    2 == type_selector ? ($("body").on("click", "[data-translation]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = !1
          , t = !1
          , e = $(this).attr("data-translation");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-translations]").attr("data-translations", e).find(".list__item-text").text($(this).text()),
        a = list_season(a, serial[e].season),
        t = list_episode(t, serial[e].season[a]);
        var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
        control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
        setCookie("translation_save", e, {
            secure: !0,
            "max-age": 6048e3
        }),
        id = serial[e].season[a][t].id,
        id_s = serial[e].season[a][t].id_file,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-seasons]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $(this).attr("data-seasons")
          , t = !1
          , e = $("[data-translations]").attr("data-translations");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-seasonss]").attr("data-seasonss", a).find(".list__item-text").text($(this).text()),
        t = list_episode(t, serial[e].season[a]);
        var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
        control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
        id = serial[e].season[a][t].id,
        id_s = serial[e].season[a][t].id_file,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-episode]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $("[data-seasonss]").attr("data-seasonss")
          , t = $(this).attr("data-episode")
          , e = $("[data-translations]").attr("data-translations");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($(this).text());
        var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
        control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
        id = serial[e].season[a][t].id,
        id_s = serial[e].season[a][t].id_file,
        player_config(id, auto_play_change, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    ))) : ($("body").on("click", "[data-translation]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $("[data-seasonss]").attr("data-seasonss")
          , t = $("[data-episodes]").attr("data-episodes")
          , e = $(this).attr("data-translation")
          , s = player.api("started")
          , i = player.api("playing");
        save_time_translate ? time_error_frag = player.api("time") : player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-translations]").attr("data-translations", e).find(".list__item-text").text($(this).text()),
        setCookie("translation_save", e, {
            secure: !0,
            "max-age": 6048e3
        }),
        id = serial[a][t][e].id,
        id_s = serial[a][t][e].id_file,
        player_config(id, s ? i : auto_play_change, save_time_translate),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-episode]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $("[data-seasonss]").attr("data-seasonss")
          , t = $(this).attr("data-episode")
          , e = $("[data-translations]").attr("data-translations");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-episodes]").attr("data-episodes", t).find(".list__item-text").text($(this).text()),
        void 0 === serial[a][t][e] && (e = !1),
        e = list_translation(e, serial[a][t]);
        var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
        control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
        id = serial[a][t][e].id,
        id_s = serial[a][t][e].id_file,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-seasons]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $(this).attr("data-seasons")
          , t = !1
          , e = $("[data-translations]").attr("data-translations");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-seasonss]").attr("data-seasonss", a).find(".list__item-text").text($(this).text()),
        t = list_episode(t, serial[a]),
        void 0 === serial[a][t][e] && (e = !1),
        e = list_translation(e, serial[a][t]);
        var s = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
        control_btn_player(t, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), s),
        id = serial[a][t][e].id,
        id_s = serial[a][t][e].id_file,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    ))),
    $("body").on("click", "[data-translation-t]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $("[data-seasons-t]").attr("data-seasons-t")
          , t = $("[data-numbers]").attr("data-numbers")
          , e = $(this).attr("data-translation-t");
        player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-translations-t]").attr("data-translations-t", e).find(".list__item-text").text($(this).text()),
        id = serial[a][t][e].id,
        id_s = id,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-number]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $("[data-seasons-t]").attr("data-seasons-t")
          , t = $(this).attr("data-number")
          , e = $("[data-translations-t]").attr("data-translations-t");
        for (var s in player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-numbers]").attr("data-numbers", t).find(".list__item-text").text($(this).text()),
        void 0 === serial[a][t][e] && (e = !1),
        $("[data-translations-t]").find(".list__drop .baron__scroller").empty(),
        serial[a][t])
            0 == e && (e = s,
            $("[data-translations-t]").attr("data-translations-t", s).find(".list__item-text").text(serial[a][t][s].translation)),
            e == s ? $("[data-translations-t]").find(".list__drop .baron__scroller").append('<button data-translation-t="' + s + '" class="list__drop-item active">' + serial[a][t][s].translation + "</button>") : $("[data-translations-t]").find(".list__drop .baron__scroller").append('<button data-translation-t="' + s + '" class="list__drop-item">' + serial[a][t][s].translation + "</button>");
        var i = Number($("[data-numbers] .list__drop-item:first-child").attr("data-number"));
        control_btn_player(t, Number($("[data-numbers] .list__drop-item:last-child").attr("data-number")), i),
        id = serial[a][t][e].id,
        id_s = id,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("body").on("click", "[data-season-t]", (function() {
        if ($(".list").removeClass("active"),
        tabs_html = $(".tabs").html(),
        old_id.f = id,
        old_id.s = id_s,
        $(this).hasClass("active"))
            return !1;
        var a = $(this).attr("data-season-t")
          , t = !1
          , e = $("[data-translations-t]").attr("data-translations-t");
        for (var s in player.api("stop"),
        $(this).addClass("active").siblings().removeClass("active"),
        $(this).parents("[data-seasons-t]").attr("data-seasons-t", a).find(".list__item-text").text($(this).text()),
        $("[data-numbers]").find(".list__drop .baron__scroller").empty(),
        serial[a])
            !1 === t && (t = s,
            $("[data-numbers]").attr("data-numbers", s).find(".list__item-text").text("Трейлер №" + s)),
            t == s ? $("[data-numbers]").find(".list__drop .baron__scroller").append('<button data-number="' + s + '" class="list__drop-item active">Трейлер №' + s + "</button>") : $("[data-numbers]").find(".list__drop .baron__scroller").append('<button data-number="' + s + '" class="list__drop-item">Трейлер №' + s + "</button>");
        for (var s in void 0 === serial[a][t][e] && (e = !1),
        $("[data-translations-t]").find(".list__drop .baron__scroller").empty(),
        serial[a][t])
            0 == e && (e = s,
            $("[data-translations-t]").attr("data-translations-t", s).find(".list__item-text").text(serial[a][t][s].translation)),
            e == s ? $("[data-translations-t]").find(".list__drop .baron__scroller").append('<button data-translation-t="' + s + '" class="list__drop-item active">' + serial[a][t][s].translation + "</button>") : $("[data-translations-t]").find(".list__drop .baron__scroller").append('<button data-translation-t="' + s + '" class="list__drop-item">' + serial[a][t][s].translation + "</button>");
        var i = Number($("[data-numbers] .list__drop-item:first-child").attr("data-number"));
        control_btn_player(t, Number($("[data-numbers] .list__drop-item:last-child").attr("data-number")), i),
        id = serial[a][t][e].id,
        id_s = id,
        player_config(id, !1, !1),
        $(".baron__scroller").css({
            "max-width": "none",
            "min-width": "none",
            width: "auto"
        })
    }
    )),
    $("#player").on("play", (function() {
        if ($ = $ || jQuery,
        play_file != id) {
            play_file = id;
            var e = id_s > 0 ? id_s : id;
            $.post("/ajax.php", {
                id: e,
                token: token,
                domain: domain,
                url_path: location.href,
                type_file: is_trailer ? "t" : "m",
                a_b: player.api("adblock") ? 1 : 0
            }),
            clearInterval(interval_check_ip),
            clearTimeout(timeout_check_ip),
            interval_check_ip = setInterval(check_ip, 5e3)
        }
        t > 0 ? (player.api("seek", t),
        t = 0,
        a = 0) : a && (player.api("seek", seek_play),
        a = 0),
        $(".time_save").remove()
    }
    )),
    $("#player").on("new", (function() {
        count_v_all = 2,
        count_v_view = 1
    }
    )),
    $("#player").on("time", (function(a) {
        if ($ = $ || jQuery,
        time_error_frag = a.originalEvent.info,
        a.originalEvent.info > 5) {
            var t = !!$("[data-seasonss]").length && $("[data-seasonss]").attr("data-seasonss")
              , e = !!$("[data-episodes]").length && $("[data-episodes]").attr("data-episodes")
              , s = !!$("[data-translations]").length && $("[data-translations]").attr("data-translations");
            storageAvailable("localStorage") && (!1 !== t ? localStorage.setItem(key_local, "s=" + t + "&e=" + e + "&t=" + s + "&time=" + a.originalEvent.info) : localStorage.setItem(key_local, "t=" + s + "&time=" + a.originalEvent.info))
        }
    }
    )),
    $("#player").on("ui", (function(a) {
        $ = $ || jQuery,
        1 == a.originalEvent.info ? $(".tabs, .link_movie").removeClass("hidden_ui") : $(".tabs, .link_movie").addClass("hidden_ui")
    }
    )),
    $("#player").on("finish", next_file_player),
    $("#player").on("click", (function() {
        $ = $ || jQuery,
        $(".list").removeClass("active")
    }
    )),
    storageAvailable("localStorage") && localStorage.getItem(key_local) && 1 == save_time) {
        var s = localStorage.getItem(key_local)
          , i = !1
          , r = !1
          , o = !1
          , n = !1;
        s = s.split("&");
        for (var d = 0; d < s.length; d++)
            s[d] = s[d].split("="),
            "s" == s[d][0] && (i = s[d][1]),
            "e" == s[d][0] && (r = s[d][1]),
            "t" == s[d][0] && (o = s[d][1]),
            "time" == s[d][0] && (n = s[d][1]);
        if (e = Math.floor(n),
        !1 === i && !1 === r)
            if ($("[data-translations]").length) {
                var l = "Вы остановились на " + timeFormat(e) + ". Перевод: " + $("[data-translations]").find("[data-translation=" + o + "]").text();
                $("[data-translations]").attr("data-translations") != o && "false" != o ? $("[data-translations]").find("[data-translation=" + o + "]").length && $("body").append(save_time_text($("#time_save").html(), l, o, !1, !1)) : $("body").append(save_time_text($("#time_save").html(), l, o, !1, !1))
            } else {
                l = "Вы остановились на " + timeFormat(e);
                $("body").append(save_time_text($("#time_save").html(), l, !1, !1, !1))
            }
        else {
            if (2 == type_selector)
                var _ = serial[o].translation;
            else
                _ = serial[i][r][o].translation;
            if (-1 != hidden_block.indexOf("episode")) {
                if (r == $("[data-episodes]").attr("data-episodes") && i == $("[data-seasonss]").attr("data-seasonss")) {
                    l = "Вы остановились на " + timeFormat(e) + ". Перевод: " + _;
                    $("body").append(save_time_text($("#time_save").html(), l, i, r, o))
                }
            } else {
                l = "Вы остановились на " + r + "-й серии " + i + "-го сезона " + timeFormat(e) + ". Перевод: " + _;
                $("body").append(save_time_text($("#time_save").html(), l, i, r, o))
            }
        }
        $("body").on("click", ".time_save_close_js", (function() {
            $ = $ || jQuery,
            $(this).parents(".time_save").remove()
        }
        )),
        $("body").on("click", ".time_save_success_js", (function() {
            $ = $ || jQuery;
            var a = $(this).parents(".time_save").attr("data-translation-time")
              , s = $(this).parents(".time_save").attr("data-season-time")
              , i = $(this).parents(".time_save").attr("data-episode-time");
            if (t = Math.floor(e),
            "false" == s && "false" == i && "false" == a)
                player.api("play");
            else if ("false" == s && "false" == i) {
                var r = $("[data-translations]").find("[data-translation=" + a + "]").attr("href");
                void 0 !== r ? location = r + "&start=" + t : player.api("play")
            } else {
                tabs_html = $(".tabs").html(),
                2 == type_selector ? ($(this).parents("[data-translations]").attr("data-translations", a).find("[data-translation=" + a + "]").addClass("active").siblings().removeClass("active"),
                s = list_season(s, serial[a].season),
                i = list_episode(i, serial[a].season[s])) : ($("[data-seasonss]").attr("data-seasonss", s).find("[data-seasons=" + s + "]").addClass("active").siblings().removeClass("active"),
                i = list_episode(i, serial[s]),
                a = list_translation(a, serial[s][i])),
                $("[data-translations]").attr("data-translations", a).find(".list__item-text").text($("[data-translation=" + a + "]").text()),
                $("[data-episodes]").attr("data-episodes", i).find(".list__item-text").text($("[data-episode=" + i + "]").text()),
                $("[data-seasonss]").attr("data-seasonss", s).find(".list__item-text").text($("[data-seasons=" + s + "]").text());
                var o = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
                control_btn_player(i, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), o),
                2 == type_selector ? (id = serial[a].season[s][i].id,
                id_s = serial[a].season[s][i].id_file) : (id = serial[s][i][a].id,
                id_s = serial[s][i][a].id_file),
                player_config(id, !0, !1)
            }
            $(".time_save").remove()
        }
        ))
    }
    baron({
        root: ".baron",
        scroller: ".baron__scroller",
        bar: ".baron__bar"
    }).controls({
        track: ".baron__track"
    }),
    $(window).on("message", (function(a) {
        if ($ = $ || jQuery,
        "getTimeSave" == a.originalEvent.data) {
            var t = localStorage.getItem(key_local)
              , e = !1
              , s = !1
              , i = !1
              , r = !1;
            if (t && 1 == save_time) {
                $("[data-translations]").length && $("[data-translations]").find("[data-translation=" + o + "]").length && (i = $("[data-translations]").find("[data-translation=" + o + "]").text()),
                t = t.split("&");
                for (var n = 0; n < t.length; n++)
                    t[n] = t[n].split("="),
                    "s" == t[n][0] && (e = t[n][1]),
                    "e" == t[n][0] && (s = t[n][1]),
                    "t" == t[n][0] && t[n][1],
                    "time" == t[n][0] && (r = t[n][1]);
                r = timeFormat(Math.floor(r)),
                window.parent.postMessage({
                    data: "success",
                    time: r,
                    season: e,
                    episode: s,
                    translation: i
                }, a.originalEvent.origin)
            } else
                window.parent.postMessage({
                    data: "error"
                }, a.originalEvent.origin)
        }
    }
    )),
    $("body").on("input", ".episode_search", (function() {
        $ = $ || jQuery;
        var a = Number($.trim($(this).val()));
        a > 0 && NaN != a ? $("[data-episode]").addClass("hidden").each((function() {
            -1 !== $(this).attr("data-episode").indexOf(a) && $(this).removeClass("hidden")
        }
        )) : $("[data-episode]").removeClass("hidden")
    }
    ))
}
)),
$("#player").on("init", (function() {
    if ($ = $ || jQuery,
    1 == player.api("adblock") ? vast_replace["[adblock_info]"] = 1 : vast_replace["[adblock_info]"] = 0,
    vast_replace["[lang]"] = navigator.language || navigator.userLanguage,
    vast_replace["[up]"] = user_idF,
    vast_replace["[refp]"] = encodeURI(document.referrer),
    player.api("update:vast_replace", vast_replace),
    !$("[data-episodes]").length || -1 != hidden_block.indexOf("episode") || $("[data-episodes]").hasClass("hidden"))
        return $("#player_control_prev_file, #player_control_next_file").addClass("hidden"),
        !1;
    var a = Number($("[data-episodes]").attr("data-episodes"))
      , t = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
    control_btn_player(a, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), t)
}
)),
$("#player").on("start", (function() {
    if ($ = $ || jQuery,
    vast_replace["[lang]"] = navigator.language || navigator.userLanguage,
    vast_replace["[refp]"] = encodeURI(document.referrer),
    player.api("update:vast_replace", vast_replace),
    !$("[data-episodes]").length || -1 != hidden_block.indexOf("episode") || $("[data-episodes]").hasClass("hidden"))
        return $("#player_control_prev_file, #player_control_next_file").addClass("hidden"),
        !1;
    var a = Number($("[data-episodes]").attr("data-episodes"))
      , t = Number($("[data-episodes] .list__drop-item:first-child").attr("data-episode"));
    control_btn_player(a, Number($("[data-episodes] .list__drop-item:last-child").attr("data-episode")), t)
}
));
