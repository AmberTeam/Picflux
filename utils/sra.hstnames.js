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
    vid167: {
        domain: "vid167",
        url: "https://vid1672084730.vb17121coramclean.pw",
        playerjs_url: "/vid167/playerjs",
    },
    www2embeed: {
        domain: "www.2embed.to",
        url: "https://www.2embed.to",
        playerjs_url: "/static/pjs/js/embed/player.min.js",
    },
    ashdivip: {
        domain: "ashdi.vip",
        url: "https://ashdi.vip",
    },
    vcdn_icdn_ws: {
        domain: "vcdn.icdn.ws",
        url: "https://vcdn.icdn.ws",
        pj_films_url: "/static/pjs/js/vcdn/pj_films.js"
    },
    annacdn_cc: {
        domain: "47.annacdn.cc",
        url: "https://47.annacdn.cc",
        hlsjs_url: "/static/pjs/js/annacdn/hls.js@0.14.17",
        pj_films_url: "/annacdn/playerjs"
    },
})

const dynamic_hostnames = [
    {
        domain_wprefix: 'vid167wprefix',
        overlaps: ['vid167']
    },
    {
        domain_wprefix: 'api_wprefix_ws',
        overlaps: ['api', 'ws']
    }
]