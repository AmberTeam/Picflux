

const static_hostnames = Object.freeze({
    voidboost_net: {
        domain: "voidboost.net",
        url: "https://voidboost.net",
    },
    spinning_allihalive_com: {
        domain: "spinning.allohalive.com",
        url: "https://spinning.allohalive.com",
        playerjs_url: "/static/pjs/js/alloha/playerjs-alloha-new.js",
        default_dist_url: "/static/pjs/js/alloha/default-dist.js",
        jquery_min_url: "/static/pjs/js/alloha/jquery.min.js",
    },
    ashdivip: {
        domain: "ashdi.vip",
        url: "https://ashdi.vip",
    },
    vcdn_icdn_ws: {
        domain: "vcdn.icdn.ws",
        url: "https://vcdn.icdn.ws",
        pj_films_url: "/static/pjs/js/vcdn/pj_films.js",
    },
    annacdn_cc: {
        domain: "47.annacdn.cc",
        url: "https://47.annacdn.cc",
        hlsjs_url: "/static/pjs/js/annacdn/hls.js@0.14.17",
        pj_films_url: "/annacdn/playerjs",
    },
})

const dynamic_hostnames = [
    {
        domain_wprefix: 'vid16wprefix',
        overlaps: ['vb', "pw"]
    },
    {
        domain_wprefix: 'api_wprefix_ws',
        overlaps: ['api', 'ws']
    },
    {
        domain_wprefix: 'wprefix_svetacdn_in',
        overlaps: ['svetacdn']
    }
]

module.exports = {dynamic_hostnames, static_hostnames}