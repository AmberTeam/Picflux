if (!window.pljssglobal)
    var pljssglobal = [], pljssglobalid;
function HDVBPlayer(options) {
    var o = {
        play: !1,
        audiosrc: [],
        audioctx: [],
        default_w: 640,
        default_h: 360,
        version: "16.6.1",
        compilation: ["HLS", "VASTP"],
        compilations: "",
        fullscreen: !1,
        realfullscreen: !1,
        nativecontrols: !1,
        fullwheel: !1,
        fullscreen_start: !1,
        airplay: !1,
        pipwebkit: !1,
        ispipkit: !1,
        u: {
            screencolor: "000000",
            toolbar: {
                color: "000000",
                hide: 1,
                margin: "-20 0 0 0",
                gradient: 1,
                animation: "alpha",
                a: "1",
                leftandrightpadding: 10,
                h: 50,
                stretchonfullscreen: 1,
                hideuntilstarted: 0,
                hidewithoutmoving: 1,
                hideleavetimeout: 3,
                position: "bottom",
                clickarea: 0,
                hideonpause: 0,
                hidedown: 1,
                hidejustfull: 0
            },
            control_title: {
                order: 1,
                on: 0,
                action: "title",
                type: "text",
                position: "top-left",
                click: 0,
                hand: 0,
                text: "",
                var: "title",
                hide: 1,
                hideonplay: 1,
                animation: "position",
                bg: 1,
                bga: .4,
                bgpadding: "6 6 6 6",
                letterspacing: "0",
                showtitleplaylist: 1,
                font: "Roboto"
            },
            control_line: {
                order: 3,
                on: 1,
                type: "shape",
                action: "line",
                h: 4,
                rounding: "1",
                w: 100,
                a: 1,
                abg: "0.3",
                aload: "0.4",
                aover: "0",
                color: "00abcd",
                colorbg: "ffffff",
                colorload: "ffffff",
                colorover: "ffffff",
                buffer: {
                    on: 0,
                    color: "ffffff",
                    a: .5
                },
                position: "bottom",
                margin: "0 15 50 15",
                handle: 1,
                bgpadding: "5 0 5 0",
                tip: 1,
                hide: 1,
                hideonlive: 1,
                handlescale: "1.3",
                linetipmarginbottom: 15,
                toptip: 1,
                tipbgcolor: "ffffff",
                tipbgrounding: 3,
                expand: "1.7",
                tipcolor: "000000",
                tippadding: "5 7 4 7",
                tipfontsize: 11,
                tipbga: "1",
                tipa: "0.8",
                linetippointer: 1,
                animation: "position",
                tipmargin: "0 0 0 0",
                customwidth: 0,
                ontop: 1,
                pointed: 1,
                clickarea: 0,
                value: 0,
                clickmargin: "0 0 5 0",
                clickscaley: "1.1",
                click: 1
            },
            control_play: {
                order: 2,
                on: 1,
                icon: "<svg width='20' height='20'><g fill-rule='nonzero' transform='translate(5, 3)'><path d='M11.4463462,6.1578125 L1.14019231,0.11666667 C1.01432692,0.04375 0.88475962,0 0.73668269,0 C0.33317308,0 0.00370192,0.328125 0.00370192,0.72916667 L0,0.72916667 L0,13.2708333 L0.00370192,13.2708333 C0.00370192,13.671875 0.33317308,14 0.73668269,14 C0.88846154,14 1.01432692,13.9489583 1.15129808,13.8760417 L11.4463462,7.8421875 C11.6906731,7.6416667 11.8461538,7.3390625 11.8461538,7 C11.8461538,6.6609375 11.6906731,6.36197917 11.4463462,6.1578125 L11.4463462,6.1578125 Z' fill='#ffffff'/></g></svg>",
                icon2: "<svg width='20' height='20'><g fill='#000000' transform='translate(4, 3)'><path d='M7.70769228,0.777778067 L7.70769228,13.2222222 C7.70769228,13.651777 8.09112021,14 8.56410253,14 L11.1333333,14 C11.6063156,14 11.9897435,13.651777 11.9897435,13.2222222 L11.9897435,0.777777778 C11.9897435,0.348222972 11.6063156,0 11.1333333,0 L8.56410253,0 C8.09112021,0 7.70769228,0.348222972 7.70769228,0.777777778 Z M3.42564101,14 L0.856410253,14 C0.383427931,14 0,13.651777 0,13.2222222 L0,0.777777913 C0,0.348222972 0.383427931,0 0.856410253,0 L3.42564101,0 C3.89862334,0 4.28205127,0.348222972 4.28205127,0.777777778 L4.28205127,13.2222222 C4.28205127,13.651777 3.89862334,14 3.42564101,14 Z' fill='#ffffff'/></g></svg>",
                icon3: "<svg width='20' height='20'><g transform='translate(2, 3)'><path d='M16,7.13661132 L16,7.10916945 L15.2081785,7.10916945 L14.275093,7.10916945 C14.275093,3.19912625 11.063197,0 7.13754645,0 C3.21189591,0 0,3.19912625 0,7.10916945 C0,11.0192126 3.21189591,14.2183389 7.13754645,14.2183389 L7.13754645,12.4410465 C4.19330855,12.4410465 1.78438662,10.0417018 1.78438662,7.10916945 C1.78438662,4.17663705 4.19330855,1.77729236 7.13754645,1.77729236 C10.0817844,1.77729236 12.4907063,4.17663705 12.4907063,7.10916945 L10.6445167,7.10916945 L13.3828996,11.5524004 L16,7.13661132 Z' fill='#ffffff'></path></g></svg>",
                action: "play",
                action2: "pause",
                type: "svg",
                scale: "1",
                scaleover: "1",
                margin: "0 0 0 5",
                bgcolorover: "-1",
                a: "1",
                aover: "-1",
                tip: 1,
                iconscolorover: "000000",
                iconscolor: "-1",
                bg: 1,
                bgcolor: "00abcd",
                bgpadding: "5 7 5 7",
                bgaover: "1",
                bga: "0",
                bgo: "0.2",
                iconmargin: "0 0 0 2",
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                tipbgrounding: 3,
                tipbga: "1",
                tipfontsize: 11,
                tippadding: "7 7 7 7",
                tipa: "0.7",
                animation: "position",
                tippointer: 1,
                tippointeralign: "left",
                iconsreplay: 1,
                hide: 0
            },
            control_mute: {
                order: 8,
                on: 1,
                icon: "<svg width='20' height='20'><g transform='translate(3, 2)'><polygon fill-rule='nonzero' points='8.8817842e-16 4.3746 8.8817842e-16 10.62539 3.10029 10.62539 7.74143 15 7.74419 0 3.10237 4.37461 1.77635684e-15 4.37461 1.77635684e-15 4.3746' fill='#ffffff'/><path d='M10.44167,3.62185 C10.17405,3.31419 9.74434,3.31419 9.47808,3.62343 C9.21251,3.93268 9.21251,4.43332 9.47944,4.74335 L9.47944,4.74178 C10.06713,5.42512 10.42941,6.36234 10.42941,7.40396 C10.42941,8.44479 10.06781,9.37885 9.4808,10.06219 C9.2125,10.36985 9.2125,10.87049 9.47944,11.18131 C9.61223,11.33554 9.78657,11.41304 9.9609,11.41304 C10.13591,11.41304 10.31024,11.33554 10.44303,11.18131 C11.27519,10.21641 11.79138,8.87583 11.7907,7.40396 C11.79138,5.92892 11.27315,4.58676 10.44167,3.62186 L10.44167,3.62185 Z' id='pjs_volume_element1' fill='#ffffff'/><path d='M11.99413,1.86278 C11.72289,2.17257 11.72289,2.67489 11.99413,2.98309 C12.99747,4.13271 13.61608,5.71413 13.61608,7.46829 C13.61608,9.22085 12.99747,10.80149 11.99552,11.9519 C11.72427,12.26089 11.72427,12.76243 11.99552,13.07221 C12.13045,13.22671 12.3076,13.30435 12.48543,13.30435 C12.66256,13.30435 12.83971,13.22671 12.97464,13.07221 C14.22569,11.63894 15.00138,9.65345 15,7.46829 C15.00069,5.28154 14.225,3.29446 12.97187,1.86278 C12.69993,1.55299 12.2633,1.55299 11.99413,1.86278 L11.99413,1.86278 Z' id='pjs_volume_element2' fill='#ffffff'/></g></svg>",
                icon2: "<svg width='20' height='20'><g fill-rule='nonzero' fill='#000000' transform='translate(3, 2)'><polygon points='8.8817842e-16 4.3746 8.8817842e-16 10.62539 3.10029 10.62539 7.74143 15 7.74419 0 3.10237 4.37461 1.77635684e-15 4.37461 1.77635684e-15 4.3746' fill='#ffffff'/><path d='M11.9267767,6.64744791 L9.87932726,4.59999847 L9,5.47932573 L11.0474494,7.52677517 L9,9.57422461 L9.87932726,10.4535519 L11.9267767,8.40610243 L13.9742261,10.4535519 L14.8535534,9.57422461 L12.806104,7.52677517 L14.8535534,5.47932573 L13.9742261,4.59999847 L11.9267767,6.64744791 Z' fill='#ffffff'/></g></svg>",
                action: "mute",
                action2: "unmute",
                type: "svg",
                margin: "0 0 0 10",
                bg: 1,
                bgcolor: "00abcd",
                bgo: "0.2",
                bgpadding: "5 5 5 7",
                iconmargin: "0 0 0 -1",
                bgaover: "1",
                bga: "0",
                tip: 1,
                tippadding: "7 7 7 7",
                tipbga: "1",
                tipfontsize: 11,
                tipbgrounding: 3,
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                tipa: "0.7",
                animation: "alpha",
                tippointer: 1,
                tippointeralign: "left",
                tiptext: "",
                position: "controls",
                hide: 1,
                hideonmobile: 1,
                displayvolume: 1,
                hideoverwidth: 0,
                hideondesktop: 0,
                iconscolor: "-1",
                iconscolorover: "000000"
            },
            control_volume: {
                order: 9,
                on: 1,
                type: "shape",
                action: "volume",
                h: 4,
                rounding: "1",
                customwidth: 1,
                w: 70,
                a: 1,
                abg: "0.3",
                aover: "0",
                color: "00abcd",
                colorbg: "ffffff",
                colorover: "ffffff",
                hide: 1,
                hideoutmute: 1,
                rotation: "",
                bgpadding: "5 0 5 0",
                bg: 0,
                handle: 1,
                position: "controls",
                margin: "0 0 0 10",
                animation: "alpha",
                hideuntilstarted: 0,
                hideonleave: 0,
                handlescale: "1.3",
                handlecolor: "-1",
                expand: "1.4",
                tip: 1,
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                linetipmarginbottom: 15,
                tipbga: "1",
                tipbgrounding: 3,
                linetippointer: 1,
                tipfontsize: 11,
                ontop: 1,
                handlehide: 0,
                clickarea: 0,
                hideonmobile: 1
            },
            control_time: {
                order: 5,
                on: 1,
                action: "time",
                type: "text",
                text: "0:00",
                fontsize: 11,
                margin: "1 0 0 10",
                click: 0,
                separator: "/",
                inversetime: 0,
                animation: "position",
                showduration: 1,
                letterspacing: "1",
                font: "Roboto"
            },
            control_duration: {
                order: 7,
                on: 1,
                action: "duration",
                type: "text",
                text: "-  0:00",
                fontsize: 11,
                margin: "1 0 0 0",
                click: 0,
                animation: "position",
                tip: 0,
                tiptext: "Длительность",
                hide: 0,
                hideonlive: 1,
                hideondesktop: 0,
                position: "controls",
                font: "Roboto",
                letterspacing: "1"
            },
            control_buffer: {
                order: 6,
                on: 1,
                icon: "<div class='loader(rand)'><svg class='circular(rand)' viewBox='25 25 50 50'><circle class='path(rand)' stroke='(color)' cx='50' cy='50' r='20' fill='none' stroke-width='2' stroke-miterlimit='10'/></svg></div>|||.loader(rand) {position: relative;margin: 0 auto;width: 50px;}.loader(rand):before {content: '';display: block;padding-top: 100%;}.circular(rand) {-webkit-animation: rotate 2s linear infinite;animation: rotate 2s linear infinite;height: 100%;-webkit-transform-origin: center center;transform-origin: center center;width: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;}.path(rand) {stroke-dasharray: 1, 200;stroke-dashoffset: 0;-webkit-animation: dash 1.5s ease-in-out infinite;animation: dash 1.5s ease-in-out infinite;}@-webkit-keyframes rotate {100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes rotate {100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@-webkit-keyframes dash {0% {stroke-dasharray: 1, 200;stroke-dashoffset: 0;}50% {stroke-dasharray: 89, 200;stroke-dashoffset: -35px;}100% {stroke-dasharray: 89, 200;stroke-dashoffset: -124px;}}@keyframes dash {0% {stroke-dasharray: 1, 200;stroke-dashoffset: 0;}50% {stroke-dasharray: 89, 200;stroke-dashoffset: -35px;}100% {stroke-dasharray: 89, 200;stroke-dashoffset: -124px;}}",
                action: "buffer",
                type: "css",
                position: "center",
                scale: 1,
                click: 0,
                hide: 1
            },
            control_settings: {
                order: 13,
                on: 1,
                icon: "<svg width='20' height='20'><g fill-rule='nonzero' transform='translate(1, 1)'><path d='M9.95921636,0 L11.0734352,2.42298075 L12.084278,2.97683675 L14.5654263,1.86912475 L16.0013553,3.35766689 L15.1972647,5.84141709 L15.4154756,6.83068435 L17.8737063,7.7883911 L18,9.84229954 L15.5533514,10.8000063 L15.0708477,11.8384089 L16.0816905,14.3422093 L14.6566042,15.8135479 L12.1531543,14.7692045 L11.0274766,15.2422408 L10.0855101,17.60767 L8.06382454,17.7 L6.98410547,15.2884058 L5.8124692,14.7807148 L3.44615574,15.8537721 L1.96426811,14.4345393 L2.92927551,11.8845739 L2.36631345,10.8230269 L0,9.89997483 L0.0230409069,7.82304578 L2.44677181,6.84231842 L2.94073435,5.84141709 L1.88393297,3.35766689 L3.33132085,1.89226913 L5.86988664,2.89614086 L6.97264662,2.4807798 L7.9375308,0.0460412136 L9.95921636,0 Z M8.84993873,6 C7.27603345,6 6,7.27601328 6,8.84993974 C6,10.4239867 7.27603345,11.7 8.84993873,11.7 C10.4239666,11.7 11.7,10.4239867 11.7,8.84993974 C11.7,7.27601328 10.4239666,6 8.84993873,6 Z' fill='#ffffff'/></g></svg>",
                action: "settings",
                position: "controls-right",
                margin: "0 7 0 0",
                type: "svg",
                scale: "1",
                tip: 1,
                tipbgrounding: 3,
                animation: "position",
                bg: 1,
                bgpadding: "5 7 5 7",
                bgcolor: "00abcd",
                bgo: "0.2",
                bgaover: "1",
                bga: "0",
                iconmargin: "0 0 0 0",
                tippadding: "7 7 7 7",
                tipbga: "1",
                tipa: "0.7",
                tipfontsize: 11,
                tipletterspacing: 0,
                tipcolor: "000000",
                tipbgcolor: "ffffff",
                tippointer: 1,
                tippointeralign: "right",
                tiptext: "",
                hdicon: 0,
                hide: 1,
                hideonlive: 0,
                iconscolorover: "000000"
            },
            control_playlist: {
                order: 10,
                on: 0,
                icon: "<svg width='17px' height='16px' viewBox='2 2 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>\n    <g id='Group-2' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(3.000000, 3.000000)' stroke-linecap='round' stroke-linejoin='round'>\n        <path d='M0,1 L14.5187304,1' id='Line' stroke='#FFFFFF' stroke-width='2'></path>\n        <path d='M0,7 L14.5187304,7' id='Line' stroke='#FFFFFF' stroke-width='2'></path>\n        <path d='M0,13 L14.5187304,13' id='Line' stroke='#FFFFFF' stroke-width='2'></path>\n    </g>\n</svg>",
                action: "playlist",
                position: "center",
                margin: "10 0 0 25",
                bg: 0,
                scale: "1.5",
                type: "svg",
                animation: "position",
                bgpadding: "0 10 10 0",
                bga: "0",
                bgaover: "1",
                tip: 1,
                bgcolor: "1aaeff",
                bgo: "0.2",
                bgborder: 0,
                bgbordercolor: "ffffff",
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                tippointer: 1,
                tippointeralign: "left",
                tipbgrounding: 3,
                tipfontsize: 11,
                tippadding: "7 7 7 7",
                tipbga: "1",
                tipmargin: "0 0 50 -40",
                tiptext: "Список видео"
            },
            control_full: {
                order: 14,
                on: 1,
                icon: "<svg width='18' height='18'><path d='M10 3h3.6l-4 4L11 8.4l4-4V8h2V1h-7zM7 9.6l-4 4V10H1v7h7v-2H4.4l4-4z' fill='#ffffff'></path></svg>",
                icon2: "<svg width='18' height='18'><path d='M1 12h3.6l-4 4L2 17.4l4-4V17h2v-7H1zM16 .6l-4 4V1h-2v7h7V6h-3.6l4-4z' fill='#ffffff'></path></svg>",
                action: "fullscreen",
                action2: "normalscreen",
                type: "svg",
                position: "controls-right",
                margin: "0 5 0 0",
                scale: "0.9",
                bg: 1,
                bgpadding: "6 6 6 6",
                bgcolor: "00abcd",
                bgo: "0.2",
                bga: "0",
                bgaover: "1",
                tip: 1,
                tipfontsize: 11,
                tipbga: "1",
                tipa: "0.7",
                tippadding: "7 7 7 7",
                tipbgrounding: 3,
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                animation: "position",
                iconmargin: "0 2 3 0",
                tippointer: 1,
                tippointeralign: "right",
                tiptext: "",
                bgcolorover: "-1",
                iconscolor: "-1",
                iconscolorover: "000000"
            },
            control_start: {
                order: 15,
                position: "center",
                scale: "1.7",
                on: 1,
                icon: "<svg width='20' height='20'><g transform='translate(5, 4)'><path d='M0,1.83904568 C0,-0.631980859 0.907083109,-0.146014346 2.40597269,0.622599916 C3.90486227,1.39121418 8.89667439,4.24359085 10.0399091,4.89209002 C11.1831438,5.54058918 12.0741164,6.58206252 10.1532945,7.77118159 C8.23247258,8.96030066 4.8935176,10.9975669 2.4467588,12.2535752 C0,13.5095835 0,13.2091938 2.44492056e-16,11.1339964 C7.54353019e-16,9.05879912 1.66254598e-16,4.31007221 0,1.83904568 Z' fill='#ffffff'></path></g></svg>",
                icon3: "<svg width='20' height='20'><g transform='translate(2, 3)'><path d='M16,7.13661132 L16,7.10916945 L15.2081785,7.10916945 L14.275093,7.10916945 C14.275093,3.19912625 11.063197,0 7.13754645,0 C3.21189591,0 0,3.19912625 0,7.10916945 C0,11.0192126 3.21189591,14.2183389 7.13754645,14.2183389 L7.13754645,12.4410465 C4.19330855,12.4410465 1.78438662,10.0417018 1.78438662,7.10916945 C1.78438662,4.17663705 4.19330855,1.77729236 7.13754645,1.77729236 C10.0817844,1.77729236 12.4907063,4.17663705 12.4907063,7.10916945 L10.6445167,7.10916945 L13.3828996,11.5524004 L16,7.13661132 Z' fill='#ffffff'></path></g></svg>",
                action: "play",
                type: "svg",
                bg: 1,
                bgcolor: "00abcd",
                bgo: "1",
                bgpadding: "10 10 10 10",
                iconmargin: "0 0 0 0",
                bga: "1",
                bgaover: "-1",
                scaleover: "2.2",
                hide: 1,
                hideonplay: 1,
                hideonyoutube: 1,
                bgborder: 0,
                a: "1",
                tip: 0,
                tiptext: "Воспр.///Пауза",
                iconscolor: "000000",
                animation: "none",
                margin: "0 0 0 0",
                iconsreplay: 0,
                aover: "0.9",
                hideonpause: 0,
                hideonleave: 0
            },
            control_live: {
                order: 4,
                on: 1,
                text: "<span style='color:#55a81e'>●</span> <span style='font-size:10px'>LIVE</span>",
                letterspacing: "2",
                action: "live",
                type: "text",
                hand: 1,
                click: 1,
                fontsize: 12,
                margin: "0 0 0 10",
                a: "1",
                hide: 1,
                hideonvod: 1,
                font: "Arial",
                tip: 1,
                tiptext: "Прямой эфир",
                clickarea: 1
            },
            control_stop: {
                order: 16,
                on: 0,
                icon: "<svg width='20' height='20'><g transform='translate(4, 4)'><rect x='0' y='0' width='12' height='12' fill='#ffffff'/></g></svg>",
                action: "stop",
                type: "svg",
                bg: 0
            },
            control_prev: {
                order: 17,
                on: 0,
                icon: "<svg width='20' height='20'><g transform='translate(5.5, 5)'><path d='M8.99999,10.43749 L8.99999,10.4375 L2,5.21875 L8.99999,0 L8.99999,10.43749 Z M0,0 L2,0 L2,10.24983 L0,10.24983 L0,0 Z' fill='#ffffff'/></g></svg>",
                action: "prev",
                type: "svg",
                scale: 1.2,
                position: "controls-bottom",
                margin: "0 0 0 15"
            },
            control_next: {
                order: 18,
                on: 0,
                icon: "<svg width='20' height='20'><g transform='translate(5, 5)'><path d='M0.46948,1e-05 L0.46948,1e-05 L0.46948,0 L7.46947,5.21875 L0.46948,10.4375 L0.46948,1e-05 Z M7.53052,0 L9.53052,0 L9.53052,10.62482 L7.53052,10.62482 L7.53052,0 Z' fill='#ffffff'/></g></svg>",
                action: "next",
                type: "svg",
                scale: 1.2,
                position: "controls-bottom",
                margin: "0 0 0 15"
            },
            control_share: {
                order: 19,
                on: 0,
                icon: "<svg width='20' height='20'><g fill='#000000' transform='translate(2, 2)'><path d='M5.5662845,8.26248366 C5.5662845,8.31742532 5.55410017,8.36915611 5.55096705,8.423741 L11.1639402,11.2990803 C11.6445251,10.8820232 12.2593116,10.6217638 12.938501,10.6217638 C14.4655458,10.622299 15.7029517,11.8904166 15.7029517,13.455005 C15.7029517,15.0215556 14.4655458,16.2896732 12.938501,16.2896732 C11.4102378,16.2896732 10.1740504,15.0215556 10.1740504,13.455005 C10.1740504,13.3986363 10.1862347,13.3481542 10.1893679,13.2935693 L4.57639463,10.41823 C4.0944173,10.8336816 3.48102327,11.093941 2.80183384,11.093941 C1.27496309,11.093941 0.0373831776,9.82707208 0.0373831776,8.26248366 C0.0373831776,6.69628979 1.27496309,5.42781546 2.80183384,5.42781546 C3.48102327,5.42781546 4.09459137,5.68968022 4.57639463,6.10513188 L10.1893679,3.22979258 C10.1862347,3.17485093 10.1740504,3.12312015 10.1740504,3.06675144 C10.1740504,1.50359007 11.4102378,0.235294118 12.938501,0.235294118 C14.4655458,0.235294118 15.7029517,1.50359007 15.7029517,3.06675144 C15.7029517,4.63294531 14.4655458,5.90141964 12.938501,5.90141964 C12.2577451,5.90141964 11.6440029,5.63955488 11.1639402,5.22249779 L5.55096705,8.09944252 C5.55392611,8.15438418 5.5662845,8.20611499 5.5662845,8.26248366' fill='#ffffff'/></g></svg>",
                action: "share",
                type: "svg",
                position: "top-right",
                margin: "15 15 0 0",
                bg: 1,
                bgo: 1,
                scale: 1,
                bgpadding: "6 6 6 6",
                bga: .3,
                bgaover: .6,
                animation: "position",
                ease: "elastic",
                hide: 1,
                hideonleaveandplay: 0,
                hideonplay: 1,
                tip: 1
            },
            settings: {
                settings4: 0,
                settings4action: "channel",
                rounding: 5,
                bgcolor: "ffffff",
                color: "000000",
                bga: "1",
                valuecolor: "000000",
                padding: "5 10 5 10",
                margin: "0 10 12 0",
                bgcolorover: "f0f0f0",
                settings5: 0,
                settings5action: "download",
                headfontsize: 12,
                bordercolored: 1,
                bordercolor: "bfbfbf",
                settings3title: "",
                settings3: 1,
                settings2: 1,
                settings1: 1,
                position: "bottom-right",
                scrollarrows: 1,
                settings1title: "",
                showovercontrol: 0,
                fontsize: 12,
                settings2action: "speed",
                settings2title: "",
                settings3action: "scale",
                activeicon: 1,
                nohead: 1,
                activeiconsize: 3,
                limitwidth: 0,
                hidearrow: 0,
                always: 0,
                show1value: 1,
                customspeeds: 0,
                valuefontsize: 12,
                settings1hide: 0,
                settings3hide: 0,
                speed4live: 1,
                settings4title: "",
                font: "Roboto"
            },
            control_pip: {
                on: 1,
                order: 11,
                action: "custom",
                icon: "<svg width='20' height='20'><g transform='translate(0, 2)'><polygon fill-rule='nonzero' points='1.85008844 1.51464844 18.2421138 1.51464844 18.2421138 7.74121094 19.2421138 7.74121094 19.2421138 0.514648438 0.850088443 0.514648438 0.850088443 11.7244572 9.16539331 11.7758693 9.17157603 10.7758885 1.85008844 10.7306209' fill='#ffffff'></polygon><rect x='10.5' y='9' width='9.5' height='6' fill='#ffffff'></rect><path d='M8.49517931,6.9934339 L4.58268904,3.10539669 L3.87780235,3.81471662 L7.75590296,7.6685791 L5.14025649,7.6685791 L5.14025649,8.6685791 L9.49517931,8.6685791 L9.49517931,4.64446771 L8.49517931,4.64446771 L8.49517931,6.9934339 Z' fill-rule='nonzero' fill='#ffffff'></path></g></svg>",
                type: "svg",
                position: "controls-right",
                margin: "0 7 0 0",
                link: 1,
                linkurl: "api:pipwebkit",
                hide: 0,
                bg: 1,
                bgcolor: "00abcd",
                bgcolorlink2: "-1",
                iconscolorover: "000000",
                bgo: "0.2",
                bga: "0",
                bgaover: "1",
                bgpadding: "5 7 5 7",
                tip: 1,
                tiptext: "Свернуть видео",
                tipbgrounding: 3,
                tipfontsize: 11,
                tipbga: "1",
                tipa: "0.7",
                tipbgcolor: "ffffff",
                tipcolor: "000000",
                tippadding: "7 7 7 7",
                animation: "position",
                iconmargin: "0 0 0 1",
                tippointer: 1,
                tippointeralign: "right"
            },
            playlist: {
                hidecontrol: 1,
                bgcolor: "aec7bc",
                color: "000000",
                valuecolor: "000000",
                bga: "1",
                historybgcolor: "aec7bc",
                bgcolorover: "9db1a8",
                bordercolored: 1,
                bordercolor: "dedede",
                rounding: 3,
                margin: "10 10 0 10",
                floatleft: 1,
                droplist: 1,
                always: 1,
                historycolor: "000000",
                borderbottom: 0,
                historytitlestrike: 1,
                dropclrs: 1,
                playbgcolored: 1,
                playbgcolor: "9db1a8",
                font: "Roboto",
                dropbgcolor: "00abcd",
                dropcolor: "000000",
                always: 1,
                autoplaylist: 1,
                openplaylistbefore: 1,
                openlast: 0,
                dropautoplay: 1
            },
            rounding: 0,
            border: 0,
            bgcolor: "ffffff",
            shadow: 0,
            effects: 0,
            effectblur: 1,
            effectgray: 0,
            fonts: 1,
            fontnames: "Roboto",
            lang: "ru",
            log: 0,
            alerts: 1,
            posteronpause: 0,
            eventstracker: 1,
            events: "HDVBPlayerEvents",
            eventlisteners: 0,
            eventstrackervast: 0,
            hotkey: {
                seeksides: 1,
                nums: 0,
                m: 0,
                volumewheelfull: 0
            },
            hls: 0,
            hlsvastwait: 0,
            hlsdvrtime: 0,
            hlsaudio: 1,
            thumbs: 0,
            union: 0,
            yamtr: 0,
            youtubeposter: 1,
            landfullmobile: 1,
            reload: 1,
            fullonplay: 0,
            rc_custom: 1,
            rc_anyway: 0,
            rc_label: "HDVB Player",
            stopotherplayers: 1,
            ssfly: 0,
            ssflyw: 1920,
            sscopyright: 0,
            nativecontrolsmobile: 0,
            version: -1,
            tagcors: 1,
            transbg: 0,
            ga: 0,
            intros: 0,
            intro: "",
            introstart: 60,
            chromecast: {
                on: 1
            },
            share2: "vk",
            share3: "telegram",
            share4: "whatsapp",
            shareiconscale: "2.9",
            tags: 0,
            pip: {
                on: 0
            },
            postmessage: 1,
            observer: 1,
            ga_event: {
                error: 1,
                end: 1,
                play25: 1,
                play50: 1,
                play75: 1
            },
            redirect: 0,
            water: 0,
            livewakeup: 1,
            channels: 0,
            channel2off: 1,
            channel0title: "Ru",
            channel1title: "En",
            pass: 0,
            dash: 0,
            lang_it: 0,
            lang_cz: 0,
            finishrewind: 0,
            reloadtimeout: 10,
            landscapefull: 1,
            lsfullstart: 0,
            lsfullplay: 0,
            flussonic: 0,
            ynxnopip: 1,
            apiprm: {
                on: 0,
                pld: 0
            },
            timestore: 1,
            timestore0plroot: 1,
            timestorenolive: 1,
            playedstore: 0,
            midrolls: 1,
            vast_midrollrest: -1,
            vast_preroll_counter: 1,
            ad: 0,
            preload: 0,
            prerolls: 1,
            vast: 1,
            banner: 1,
            pausebanner: [],
            etag: 0,
            stag: 0,
            endtag: [],
            starttag: [],
            pushbanner: []
        },
        u2: "",
        u3: "",
        u4: "",
        u5: "",
        u6: "",
        u7: "",
        u8: "",
        u9: "",
        y: "xx???x=xxx???=",
        p: {
            x: ["preroll", "pauseroll", "postroll", "midroll"]
        },
        isflash: -1,
        brand: "HDVB",
        brandurl: "//hdvb.cc",
        motions: [],
        dt: !0,
        pr: !0,
        ga: !1,
        ab: !1,
        gatracked: [],
        pjsga: !1,
        pltxt: "//.txt//",
        files_quality: [],
        files_audiotrack: [],
        files_quality_ag: [],
        files_subtitle: [],
        files_channel: [],
        plhistory: [],
        rightclick: 0,
        vastclick: !1,
        focus: !1,
        start: !1,
        start2: !1,
        metadata: !1,
        ni: "<noindex>",
        ni2: "</noindex>",
        small: window.screen.width < 1e3 && window.screen.height < 1e3,
        moving: [],
        moved: [],
        menuproc: {
            scale: 1,
            contrast: 1,
            brightness: 1,
            saturate: 1,
            sepia: 0
        },
        fltrs: [],
        piped: 0,
        live: !1,
        subtitle_on: !1,
        starttimeout: !1,
        thumbs_on: !1,
        thumbs_img: [],
        noads: !1,
        clicks: 0,
        airplayed: !1,
        timerInterval: void 0,
        toolbarInterval: void 0,
        toolbarhidden: !1,
        KKReydtB: function(t) {},
        reloaderTimer: 0,
        timerTime: 200,
        tagvideo: !1,
        controlover: !1,
        doctype: document.doctype,
        d: location.hostname,
        domain: location.hostname,
        href: location.href,
        https: 0 == location.href.indexOf("https"),
        logos: {},
        gaurl: "google-analytics.com/analytics.js",
        fd: ["KKReydtB", "QhbZazyH"],
        files_speed: [],
        files_scale: [],
        files_sleep: [],
        custom_speed: 1,
        gifed: [],
        QhbZazyH: function(t) {},
        time: 0,
        timeld: 0,
        casting: !1,
        dk: -1,
        current_speed: 3,
        current_sleep: 0,
        vastgo: 0,
        reloadTimer: 0,
        mediascale: {
            x: 1,
            y: 1,
            x0: 1,
            y0: 1
        },
        sub_options: ["sub_sizeproc", "sub_color", "sub_color2", "sub_bgcolor", "sub_bga", "sub_shadow", "sub_weight", "sub_bottom", "sub_shift", "sub_reset"],
        clr_options: ["clr_contrast", "clr_brightness", "clr_saturate", "clr_sepia"],
        vast_impressions: 0,
        vast_impressions_all: 0,
        vast_starts: 0,
        vpaid_starts: 0,
        vast_longtimeout: 0,
        midrollimprsd: [],
        vsts: ["preroll", "pauseroll", "postroll", "midroll"],
        vast_remove: [],
        adsfirst: !0,
        overlays: [],
        stuck: 0,
        ws: "ws",
        acted: !1,
        quartile: [!1, !1, !1],
        p2p: !1,
        file_path: "/playlist/"
    };
    "object" == typeof o_params && Object.keys(o_params.u).length > 0 && Object.keys(o_params.u).forEach((function(t) {
        "playlist" == t ? Object.keys(o_params.u.playlist).forEach((function(t) {
            o.u.playlist[t] = o_params.u.playlist[t]
        }
        )) : o.u[t] = o_params.u[t]
    }
    )),
    "playlist"in o.u && (o.u.playlist.on = 1,
    o.u.playlist.dontplay = 1,
    o.u.playlist.openlast = 1),
    "control_line"in o.u && (o.u.control_line.pointed = 1),
    o.u.timestore = 1;
    let customParams = ["host", "masterId", "masterHash", "userIp", "movie", "key", "href", "kp", "uniq_hash"];
    function getVastUrl(t, e) {
        let i = t.split("#")
          , s = -1 != i[0].indexOf("?") ? "&" : "?"
          , n = "host"in o.p ? o.p.host : "VASTHost_Fail";
        return "masterHash"in o.p && "host"in o.p && (n = `${o.p.masterHash}|${e}|${o.p.host}`),
        `${i[0]}${s}cp.host=${n}&cp.ip=${"userIp"in o.p ? o.p.userIp : "VASTIP_Fail"}&cp.token=${o.p.movie}#${i[1]}`
    }
    customParams.map((function(t) {
        t in options && (o.p[t] = options[t])
    }
    ));
    let pointsArr = [];
    if ("rek"in options) {
        if ("preroll"in options.rek)
            if (options.rek.preroll.length > 0) {
                o.u.ad = 1,
                o.u.vast_jsblck = 0;
                let t = 1
                  , e = 0;
                options.rek.preroll.map((function(i) {
                    o.p["hdvb_preroll_" + t] = {
                        title: "HDVB Preroll " + t,
                        id: "hdvbpreroll_" + t,
                        preroll: getVastUrl(i, 1 == t ? "6" : "7")
                    },
                    o.u["partnerpreroll_" + t] = "hdvb_preroll_" + t,
                    e > 0 && (o.u["partnerprerollor" + e] = "and"),
                    o.u.vast_preroll_limit = t,
                    t++,
                    e++
                }
                ))
            } else
                o.u.prerolls = 0;
        else
            o.u.prerolls = 0;
        if ("midroll"in options.rek)
            if (options.rek.midroll.length > 0) {
                o.u.ad = 1,
                o.u.vast_jsblck = 0;
                let t = 1;
                options.rek.midroll.map((function(e) {
                    o.p["hdvb_midroll_" + t] = {
                        title: "HDVB Midroll " + t,
                        id: "hdvbmidroll_" + t,
                        preroll: getVastUrl(e.url, 8),
                        pauseroll: getVastUrl(e.url, 8),
                        postroll: getVastUrl(e.url, 8),
                        midroll: getVastUrl(e.url, 8)
                    };
                    let i = parseInt(e.time.replace("%", ""));
                    pointsArr.push({
                        time: i,
                        width: 2
                    }),
                    o.u["partnermidroll_" + t] = "hdvb_midroll_" + t,
                    o.u["partnermidrolltimes" + (t > 1 ? t : "")] = e.time,
                    o.u["midroll" + (t > 1 ? t : "")] = "prthdvb_midroll_" + t + "_" + e.url,
                    t > 1 && (o.u.partnermidrollor = "and",
                    o.u.vast_midroll_limit = t),
                    t++
                }
                ))
            } else
                o.u.midrolls = 0;
        else
            o.u.midrolls = 0;
        "pausebanner"in options.rek && options.rek.pausebanner.show ? o.u.pausebanner = {
            key: options.rek.pausebanner.key,
            script: options.rek.pausebanner.script
        } : o.u.banner = 0,
        "endtag"in options.rek ? (o.u.etag = 1,
        o.u.endtag = options.rek.endtag) : o.u.etag = 0,
        "starttag"in options.rek ? (o.u.stag = 1,
        o.u.starttag = options.rek.starttag) : o.u.startg = 0,
        "pushbanner"in options.rek && (o.u.pushbanner = options.rek.pushbanner)
    }
    var default_style = {
        but: {
            w: 20,
            h: 20,
            action: "-",
            action_back: "-",
            a: 1,
            aover: -1,
            color: "ffffff",
            type: "",
            scale: 1,
            scaleover: -1,
            rotation: 0,
            tip: 1,
            icon: "",
            text: "",
            font: "Verdana",
            fontsize: 12,
            letterspacing: 0,
            position: "controls",
            margin: "0 3 0 3",
            marginproc: "0 0 0 0",
            click: 1,
            clickmargin: "0 0 0 0",
            normalonclick: 0,
            hand: 1,
            bg: 0,
            bgo: 0,
            bgstretch: 0,
            bga: 1,
            bgaover: -1,
            bgcolor: "000000",
            bgcolorover: -1,
            bgpadding: "0 0 0 0",
            bgborder: -1,
            bgbordercolor: "ffffff",
            iconscolor: -1,
            iconscolorover: -1,
            animation: "none",
            target: "_blank",
            tip: 0,
            tipbgcolor: "000000",
            tipbga: .7,
            tipbgrounding: 0,
            tipcolor: "ffffff",
            tippadding: "3 5 3 5",
            tippmargin: "0 0 0 0",
            tipa: 1,
            tipfont: "sans-serif",
            tipfontsize: 11,
            tipletterspacing: 0,
            tiptext: "",
            linetipmarginbottom: 5,
            toptip: 0,
            hidden: 0,
            stripsw: 2,
            stripsspace: 2,
            linespeed1: .2,
            linespeed2: 0,
            linespeed3: .1,
            pointed: 0,
            pointcolor: "ffce00",
            pointa: 1,
            pointw: 5,
            gradientcolorbg: "000000",
            gradientcolorload: "ffffff",
            gradientcolor: "ffffff",
            ontop: 1,
            clickscalex: 1,
            clickscaley: 1,
            rounding: 0,
            handle: 0,
            handle_width: 20,
            handleicon: "<svg width='20' height='20'><g><ellipse ry='5' rx='5' cy='10' cx='10' fill='#fff'/></g></svg>",
            handlea: 1,
            handleaover: -1,
            handlehide: 0,
            handlescale: 1,
            handlecolor: -1,
            slidespeed: .1,
            link: 0,
            linkurl: "",
            linkpause: 0,
            linktarget: "_blank",
            src: "",
            hideonwidthlimit: 700,
            hideoverwidthlimit: 700,
            displayvolume: 0,
            value: 0,
            valuecolor: "ffffff",
            valuebg: 0,
            valuebgcolor: "000000",
            valuesize: 9,
            valuemargin: "0 0 10 0",
            valuepadding: "0 0 0 0",
            valuerounding: 0
        }
    };
    function prtObj() {
        if (1 == v.vast && exist2(o.p)) {
            for (var t = o.p, e = 0; e < t.x.length; e++) {
                !exist(v[t.x[e]]) && (v[t.x[e]] = "");
                for (var i = 1; i < 10; i++) {
                    var s = v[t.x[e] + "_deny"] ? v[t.x[e] + "_deny"].split(",") : []
                      , n = v["partner" + t.x[e] + "_" + i];
                    if (exist(n) && "" != n) {
                        "midroll" == t.x[e] && 1 == i && (v[t.x[e]] = "");
                        var a = t[n];
                        if (exist(a)) {
                            var r = t.x[e];
                            if ("midroll" == r && (r = "preroll"),
                            a.id && s.indexOf(a.id) > -1 && (a[r] = ""),
                            a[r] && "" != a[r]) {
                                if (a[r] = a[r].replace(" and ", ""),
                                a[r] = a[r].replace("http://", "//"),
                                v["partner" + t.x[e] + "geo" + i] && "" != v["partner" + t.x[e] + "geo" + i]) {
                                    var l = "[geo:" + v["partner" + t.x[e] + "geo" + i] + "]";
                                    -1 == a[r].indexOf(l) && (a[r] = a[r] + l)
                                }
                                var d = v["partner" + t.x[e] + "or"]
                                  , c = i > 1 ? v["partner" + t.x[e] + "or" + (i - 1)] : "def";
                                "or50" == v["partner" + t.x[e] + "or" + i] && (a[r] = a[r] + "[50%]",
                                v["partner" + t.x[e] + "or" + i] = "or"),
                                "stop" == v["partner" + t.x[e] + "or" + i] && (a[r] = a[r] + "[stop]",
                                v["partner" + t.x[e] + "or" + i] = "and");
                                var u = "prt" + (exist(a.cpm) ? "cpm" + a.cpm : "") + (0 == n.indexOf("myvast") ? n : a.title.substr(0, a.title.indexOf(" "))) + (exist(a.imp) ? "[imp]" + a.imp : "") + "_" + (exist(a.pimp) ? "[pimp]" + a.pimp + "**" : "") + a[r];
                                "midroll" == t.x[e] ? v["midroll" + (1 == i ? "" : i)] = u : v[t.x[e]] += ("" != v[t.x[e]] ? " " + (exist(c) && "def" != c ? c : d) + " " : "") + u
                            }
                        }
                    }
                }
            }
            if (1 == v.midrolls)
                for (var p = 1; p < 8; p++) {
                    var f = 1 == p ? "" : p;
                    if ("string" == typeof v["midroll" + f] && "prt" == v["midroll" + f].substr(0, 3) && exist(v["partnermidrolltimes" + f]) && exist(v["midroll" + f]) && "" != v["partnermidrolltimes" + f]) {
                        !o.midrollo && (o.midrollo = []);
                        var h = v["partnermidrolltimes" + f].split(",");
                        for (e = 0; e < h.length; e++) {
                            for (var g = !1, m = 0; m < o.midrollo.length; m++)
                                o.midrollo[m].time == trim(h[e]) && (o.midrollo[m].vast = o.midrollo[m].vast + " " + v.partnermidrollor + " " + v["midroll" + f],
                                g = !0);
                            !g && o.midrollo.push({
                                time: trim(h[e]),
                                vast: v["midroll" + f]
                            })
                        }
                    }
                }
        }
        o.prted = !0
    }
    function fd0(t) {
        if (-1 == t.indexOf(".")) {
            for (t = t.substr(1),
            s2 = "",
            i = 0; i < t.length; i += 3)
                s2 += "%u0" + t.slice(i, i + 3);
            t = unescape(s2)
        }
        return t
    }
    function optStr() {
        if ("" != o.u && (v = UpdateObject(v, o.u)),
        0 == options.indexOf("#" + v.enc2))
            try {
                options = JSON.parse(o[o.fd[0]](options))
            } catch (t) {}
        else if (0 == options.indexOf("#" + v.enc3))
            try {
                options = JSON.parse(o[o.fd[1]](options))
            } catch (t) {}
    }
    function SettingsTimers(t, e) {}
    function Touch(t, e) {}
    var Alert = function() {
        var t = createElement("div");
        o.frame.appendChild(t),
        css(t, {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: 30,
            "background-color": v.alertsbgcolor,
            opacity: v.alertsbga,
            display: "none"
        });
        var e = createElement("div");
        o.frame.appendChild(e),
        css(e, {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            color: v.alertscolor,
            "font-size": v.alertsfontsize,
            padding: v.alertspaddingv + "px " + v.alertspaddingh + "px",
            display: "none"
        }),
        this.txt = function(o, i) {
            e.innerHTML = o,
            show2(e),
            css(t, {
                height: e.offsetHeight,
                display: "block"
            }),
            t.style.zIndex = "1005";
            for (var s = 0; s < e.getElementsByTagName("a").length; s++)
                e.getElementsByTagName("a")[s].style.color = "#fff";
            i && setTimeout(this.close, 1e3 * i),
            e.style.zIndex = "1006"
        }
        ,
        this.close = function() {
            hide2(e),
            hide2(t)
        }
    };
    function datetime(t) {
        1 == t && o.container.appendChild(o.frame),
        2 == t && 1 == v.vast && o.media && o.media.BeforeVast();
        var e = (new Date).getTime()
          , i = new Date("2022-02-25");
        i.setDate(i.getDate() + 3),
        i = i.getTime(),
        o.dt = i > e
    }
    function Visibility(t, e, i) {
        i && log(e);
        var s = {
            root: null,
            rootMargin: "0px",
            threshold: function() {
                for (var t = [], e = 0; e <= 100; e++)
                    t.push(e / 100);
                return t
            }()
        };
        try {
            new IntersectionObserver((function(t) {
                var s;
                o[e] = Math.round(100 * t[t.length - 1].intersectionRatio);
                try {
                    s = isFullscreen(parent.document)
                } catch (t) {}
                !o.fullscreen && (isFullscreen() || s) && (o[e] = 0),
                i && (js(e, o[e]),
                log(e, o[e]))
            }
            ),s).observe(t)
        } catch (t) {
            o[e] = 100
        }
    }
    var v = {
        log: 0,
        logout: 0,
        screencolor: "#000000",
        border: 0,
        bordersize: 1,
        bordercolor: "#000000",
        bgcolor: "#ffffff",
        rounding: 0,
        screenclick: 1,
        doubleclick: 1,
        player: 0,
        stopotherplayers: 1,
        iframe: 0,
        toolbar: {
            customimage: 0,
            color: "000000",
            a: "0.4",
            h: 34,
            stretchonfullscreen: 1,
            hide: 1,
            hidewithoutmoving: 1,
            hidejustfull: 0,
            hidetimeout: 3,
            hideleavetimeout: 0,
            leftandrightpadding: 3,
            animation: "none",
            position: "bottom",
            margin: "0 0 0 0",
            rounding: 0,
            clickarea: 0,
            image: ""
        },
        hotkey: {
            on: 1,
            f: 1,
            r: 1,
            m: 1,
            seek: 5,
            leftright: "seek",
            space: 1,
            updown: "volume",
            seeksides: 0,
            nums: 1,
            volumewheelfull: 1,
            wheelstep: .2
        },
        playlist: {
            bgcolor: "000000",
            bgcolorover: "333333",
            bga: .9,
            bgaover: -1,
            position: "left",
            margin: "0 0 0 0",
            padding: "7 15 7 15",
            color: "ffffff",
            font: "arial, helvetica, sans-serif",
            fontsize: 12,
            valuefontsize: 10,
            letterspacing: 0,
            valuecolor: "ffdd1f",
            borderbottom: 1,
            bordercolor: "444444",
            a: 1,
            aover: -1,
            posters: 0,
            posterheight: 100,
            posterwidth: 177,
            postertitleonhover: 1,
            historytitlea: 1,
            historycolor: "999999",
            historybgcolor: "000000",
            historybga: -1,
            historybgaover: -1,
            historytitlestrike: 0,
            activeiconsize: 3,
            headfontsize: 16,
            headbordercolor: "888888",
            rounding: 0,
            scrollarrows: 1,
            scrollarrowsize: 1,
            scrollarrowcolor: "ffffff",
            scrollarrowbg: 0,
            scrollarrowbgcolor: "000000",
            scrollarrowgradient: 1,
            scrollarrowbgover: 0,
            scrollarrowbgovercolor: "333333",
            limitwidth: 0,
            limitmaxwidth: 200,
            autoplaylist: 0,
            always: 0,
            alwaysjustpause: 0,
            alwaysnotfullscreen: 0,
            autohide: 1,
            floatleft: 0,
            floatheight: 50,
            floatmarginright: 0,
            floatlimitwidth: 1,
            floatwidth: 170,
            marginbg: 0,
            marginbgcolor: "333333",
            marginbgpadding: "0 0 0 0",
            hmaxk: 30,
            bordercolor: "666666"
        },
        settings: {
            bgcolor: "000000",
            bgcolorover: "222222",
            bga: .7,
            bgaover: -1,
            font: "arial, helvetica, sans-serif",
            position: "bottom-right",
            margin: "0 0 0 0",
            padding: "7 10 7 15",
            color: "ffffff",
            fontsize: 12,
            headfontsize: 16,
            valuefontsize: 10,
            letterspacing: 0,
            titlecolor: "ffffff",
            valuecolor: "ffdd1f",
            a: 1,
            scale: 5,
            aover: -1,
            activeicon: 1,
            activeiconsize: 3,
            scrollarrows: 1,
            scrollarrowsize: 1,
            scrollarrowcolor: "ffffff",
            limitwidth: 0,
            limitmaxwidth: 200,
            rounding: 0,
            settings1: 1,
            settings1action: "quality",
            settings2: 1,
            settings2action: "audiotrack",
            settings3: 1,
            settings3action: "subtitle",
            settings4: 0,
            settings4action: "download",
            settings5: 0,
            settings5action: "speed",
            hmaxk: 30,
            bordercolor: "666666"
        },
        logo: {
            position: "bottom-right",
            margin: "0 10 50 0"
        },
        volume: .8,
        volumestore: 1,
        mutestore: 1,
        loop: 0,
        shuffle: 0,
        finishrewind: 1,
        mute: 0,
        preload: 1,
        preloadhls: 1,
        preloaddash: 0,
        autoplay: 0,
        autoplaymute: 1,
        showtitleplaylist: 0,
        addtitleplaylistbr: 0,
        addtitleplaylist: 0,
        file_separator: ",",
        file2_separator: ";",
        file3_separator: "//",
        poster_scale: "fill",
        poster_a: 1,
        poster_aover: -1,
        poster_float: 0,
        poster_floatmargin: "20 0 0 20",
        poster_floatposition: "top-left",
        poster_floatwidth: 100,
        poster_floatheight: 100,
        poster_floatbgcolor: -1,
        posteronpause: 0,
        alerts: 1,
        alertsbgcolor: "ff0000",
        alertscolor: "ffffff",
        alertspaddingv: 5,
        alertspaddingh: 10,
        alertsbga: 1,
        alertsfontsize: 10,
        rightclick: 0,
        youtubeposter: 1,
        ytautoquality: 1,
        posterhide: 1,
        aspect: "16x9",
        landfullmobile: 0,
        hlschangequality: "next",
        hlsautomax: 0,
        hlsautoquality: 1,
        hlsquality: 1,
        hlsdebug: 0,
        hlscookies: 0,
        hlslowquality: 0,
        hlsaudio: 1,
        livewakeuptime: 5,
        reload: 0,
        reloadlive: 1,
        livewakeup: 0,
        reloadtimeout: 5,
        dashdebug: 0,
        dashcookies: 0,
        dashlowquality: 0,
        dashquality: 1,
        dashaudio: 1,
        nameofhlsquality: 0,
        nameofyoutubequality: 0,
        nameofdashquality: 0,
        qualitystore: 1,
        eventstracker: 1,
        events: "HDVBPlayerEvents",
        errortimeout: 5e3,
        container_h_procent: "100%",
        ga: 0,
        ga_event: {
            init: 1,
            error: 0,
            full: 0,
            end: 0,
            play: 1,
            play25: 0,
            play50: 0,
            play75: 0,
            vast_skip: 0,
            vast_click: 0,
            vast_impression: 0
        },
        yamtr_event: {
            init: 1,
            error: 0,
            full: 0,
            end: 0,
            play: 1,
            play25: 0,
            play50: 0,
            play75: 0
        },
        ga_proc: 100,
        playsinlineonmobile: 1,
        subtitle_start: 1,
        sub_size: 14,
        sub_sizeproc: "100%",
        sub_big_fullscreen: 1,
        sub_size_fullscreen: 20,
        sub_bg: 1,
        sub_bga: .7,
        sub_bgo: 2,
        sub_bgpadding: 3,
        sub_bottom: 10,
        sub_color: "ffffff",
        sub_color2: "ffeeab",
        sub_bgcolor: "000000",
        sub_shadow: 0,
        sub_weight: 400,
        sub_designstore: 1,
        sub_shift: 0,
        sub_store: 1,
        sub_off: 1,
        sharetitle: 1,
        sharetop: .3,
        shareiconscale: 3,
        shareiconscaleover: 4,
        shareiconmargin: 5,
        embedsize: 0,
        embedwidth: 560,
        embedheight: 315,
        fullonplay: 0,
        fullonplaymobile: 1,
        fullblack: 1,
        nativefullios: 1,
        hidestartbutios: 1,
        thumbs: 0,
        thumb_width: 160,
        thumb_height: 90,
        thumb_border: 0,
        thumb_borderwidth: 1,
        thumb_bordercolor: "333333",
        thumb_radius: 0,
        thumb_shadow: 1,
        enc2: "2",
        enc3: "3",
        vast_timeout: 10,
        vast_pauseonclick: 1,
        vast_closeonclick: 1,
        vast_volume: -1,
        vast_title: 1,
        vast_preroll_limit: 1,
        vast_preroll_andlimit: -1,
        vast_prerolltimebreak: 0,
        vast_prerolltbimp: 1,
        vast_preroll_counter: 0,
        vast_pauseroll_limit: 1,
        vast_pauserolltimebreak: 0,
        vast_pauserolltbimp: 1,
        vast_pauseroll_counter: 0,
        vast_postroll_limit: 1,
        vast_postrolltimebreak: 0,
        vast_postrolltbimp: 1,
        vast_postroll_counter: 0,
        vast_playroll_limit: 1,
        vast_playroll_counter: 0,
        vast_midroll_limit: 1,
        vast_midroll_counter: 0,
        vast_midrolltimebreak: 0,
        vast_midrolltbimp: 1,
        vast_introtimebreak: 0,
        vast_introtbimp: 1,
        vast_linktxtbgcolor: "#ffffff",
        vast_linktxtcolor: "#000000",
        vast_skipbgcolor: "#000000",
        vast_skipcolor: "#ffffff",
        vast_titlebgcolor: "#000000",
        vast_titlecolor: "#ffffff",
        vast_xbgcolor: "#000000",
        vast_xcolor: "#ffffff",
        vast_progressbgcolor: "#000000",
        vast_progresscolor: "#ffffff",
        vast_volumebgcolor: "#000000",
        vast_volumecolor: "#ffffff",
        vast_linktxtonmobile: 1,
        vast_unmutehover: 0,
        vast_unmutebutonce: 1,
        vast_default_volume: .5,
        vast_unmutebutbgcolor: "#ffffff",
        vast_unmutebutcolor: "#000000",
        vast_openclick: 1,
        vast_preroll_vmap: 1,
        vast_pauseroll_vmap: 1,
        vast_postroll_vmap: 1,
        vast_midroll_vmap: 1,
        vpaid_timeout: 10,
        vpaid_timeout2: -1,
        vast_resound: 1,
        vpaid_slotinframe: 1,
        eventstrackervast: 0,
        pauserollonplay: 0,
        pausebannerinit: 0,
        pausebannerstatus: 0,
        endtaginit: 0,
        endtagstatus: !1,
        endtagstartbannertime: 0,
        endtagtimetoshowads: 0,
        starttaginit: 0,
        starttagstatus: !1,
        starttagstartbannertime: 0,
        starttagtimetoshowads: 0,
        pushbannerinit: 0,
        pushbannertimer: 0,
        pushbannerclosebuttontimer: 0,
        pushbannerrequesttimer: 0,
        pushbannerstatus: !1,
        pushbannerstate: [],
        partnerprerollor: "or",
        partnerpauserollor: "or",
        partnerpostrollor: "or",
        partnermidrollor: "or",
        midrollpoint: "50%",
        introskiptime: -1,
        introclickable: 0,
        introclosetime: -1,
        introtitle: 0,
        introtxt: 0,
        rc_anyway: 0,
        heartbeatinterval: 30,
        default_channel: 2,
        tagsinterval: 10,
        playedquartile: 0,
        minivis: 30,
        lsfullstart: 1,
        lsfullplay: 1,
        captions: 0,
        pip: {
            on: 0,
            bgcolor: "000000",
            border: 0,
            shadow: 2,
            bordercolor: "000000",
            position: "left",
            margin: "20 0 0 20",
            width: 150,
            hide: 0
        },
        points: pointsArr,
        file_path: "/playlist/",
        yamtrid: 87966403,
        yamtr: 1
    };
    "object" == typeof o_params && Object.keys(o_params.v).length > 0 && Object.keys(o_params.v).forEach((function(t) {
        "points" != t && (v[t] = o_params.v[t])
    }
    )),
    v.playlist.dontplay = 1,
    v.yamtr = 1,
    "p2p"in options && (v.p2p = options.p2p),
    v.lang = "ru";
    var VastLoader = function(preload) {
        var vast = [], vastType = "", vastUrl, partner, _x = "", _preload = 1 == preload, _preloaded = [], _status = "", _ltime = -1, _nocred = !1, die_error = !1;
        vast.events = [],
        vast.wrapper0 = " -> ",
        o.vast_adid = "";
        var no = ["desktop", "mobile", "mobiletv", "tv", "lg"], wait_url, wait_wrap;
        function LoadXml(x, wrap) {
            if (preload && _preloaded.push(x),
            "" != x) {
                "" == _x && (_x = x),
                _nocred = !1;
                var stop = !1;
                if (1 == o.waitingads || o.destroyed)
                    return void (o.destroyed || (wait_url || (wait_url = x,
                    wait_wrap = wrap),
                    setTimeout(LoadXml, 500)));
                if (x || wrap || !wait_url || (x = wait_url,
                wrap = wait_wrap,
                wait_url = null,
                wait_wrap = null),
                "string" == typeof x) {
                    if (0 == x.indexOf("js:")) {
                        try {
                            x = eval(x.substr(3) + "()")
                        } catch (t) {}
                        "" != x && x || (x = "",
                        o.actions.EmptyVastUrl())
                    }
                    if (0 == x.indexOf("<VAST>"))
                        return void ParsTxt(x)
                }
                if (x.indexOf("[remove]") > -1 && (o.vast_remove && o.vast_remove.push(x),
                o.actions.VastRemoveUrl(vastUrl),
                x = x.replace("[remove]", "")),
                o.vast_stop = 0,
                x.indexOf("[stop]") > -1 && (o.vast_stop = 1,
                x = x.replace("[stop]", "")),
                x.indexOf("[skipimp]") > -1 && (vast.skipimp = 1,
                x = x.replace("[skipimp]", "")),
                x.indexOf("nocontrols") > -1 && (vast.nocontrols = 1,
                x.indexOf("nocontrolsvpaid") > -1 && (vast.nocontrolsvpaid = 1)),
                x.indexOf("yescontrols") > -1 && (vast.yescontrols = 1),
                x.indexOf("[ima]") > -1 && (1 == v.vast_ima && (vast.ima = 1),
                x = x.replace("[ima]", "")),
                x.indexOf("[pausemute]") > -1 && (vast.pause_mute = 1),
                x.indexOf("[mute]") > -1 && (vast.mute = 1,
                x = x.replace("[mute]", "")),
                x.indexOf("[unmute]") > -1 && (vast.mute = -1,
                x = x.replace("[unmute]", "")),
                x.indexOf("[skip:") > 0) {
                    var to = x.match(/\[skip:\d*\]/g);
                    if (to && to.length > 0) {
                        var tmp = to[0].substr(to[0].indexOf(":") + 1);
                        !vast.extensions && (vast.extensions = []),
                        vast.extensions.skipTime = tmp.substr(0, tmp.length - 1)
                    }
                    x = x.replace(/\[skip:\d*\]/g, "")
                }
                if (x.indexOf("[imp:") > 0) {
                    var to = x.match(/\[imp:\d*\]/g);
                    if (to && to.length > 0) {
                        var tmp = to[0].substr(to[0].indexOf(":") + 1);
                        v["vast_" + vastType + "_andlimit"] = tmp.substr(0, tmp.length - 1)
                    }
                    x = x.replace(/\[imp:\d*\]/g, "")
                }
                if (x.indexOf("[controls]") > 0 && (vast.yescontrols = 1,
                x = x.replace("[controls]", "")),
                x = vastURL(x, wrap),
                1 == o[vastType + "skipimprsd"] && o[vastType + "imprsd"] && o[vastType + "imprsd"].indexOf(x) > -1 && (log("Impressed"),
                stop = !0),
                stop)
                    die_error = !0,
                    _status = "next",
                    _preload || setTimeout((function() {
                        o.actions.VastNext()
                    }
                    ), 100);
                else if (o.vast_poster && show2(o.vast_poster),
                vastUrl = x,
                1 == v.vast_ima && DestroyIma(),
                1 == vast.ima)
                    o.ima = new VastIMA(x,vast);
                else {
                    if (wrap || (vast.vasturl = x,
                    o.current_vast_url = x),
                    js(wrap ? "vast_wrapper" : "vast_url", x),
                    "" == trim(x))
                        return log("empty vast url"),
                        void ErrorLoad();
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", x, !0),
                    1 == v.vast_nocredentials || x.indexOf("nocredentials") > -1 || x.indexOf("kxcdn.com") > 0 || x.indexOf("pljs.ru") > 0 || x.indexOf("plrjs.org") > 0 ? _nocred = !0 : xhr.withCredentials = !0,
                    xhr.timeout = 1e3 * parseInt(v.vast_timeout),
                    xhr.onload = function(t) {
                        Parsing(this)
                    }
                    ,
                    xhr.onerror = function(t) {
                        0 != t.target.status || _nocred ? ErrorLoad() : LoadXmlNoCredentials(x)
                    }
                    ,
                    xhr.ontimeout = function(t) {
                        ErrorLoad(301)
                    }
                    ;
                    try {
                        xhr.send()
                    } catch (t) {
                        ErrorLoad()
                    }
                }
            } else
                log("error1"),
                ErrorLoad()
        }
        function LoadXmlNoCredentials(t) {
            var e = XHR(t);
            e.timeout = 1e3 * parseInt(v.vast_timeout),
            e.onload = function(t) {
                Parsing(this)
            }
            ,
            e.onerror = function(t) {
                ErrorLoad()
            }
            ,
            e.ontimeout = function(t) {
                ErrorLoad(301)
            }
            ;
            try {
                e.send()
            } catch (t) {
                ErrorLoad()
            }
        }
        function ParsTxt(t) {
            var e = new Object;
            if (window.DOMParser) {
                var o = new DOMParser;
                e.responseXML = o.parseFromString(t, "text/xml")
            } else {
                (o = new ActiveXObject("Microsoft.XMLDOC")).async = "false",
                o.loadXML = t,
                e.responseXML = o
            }
            Parsing(e)
        }
        function ChX(t) {
            if (t) {
                o.vast_remove && o.vast_remove.indexOf(t) > -1 && (log("VAST removed"),
                o.actions.VastError(),
                t = "");
                for (var e = 0; e < no.length; e++)
                    t.indexOf("[no_" + no[e] + "]") > -1 && (t = t.replace("[no_" + no[e] + "]", ""),
                    o.system[no[e]] && (log("VAST no " + no[e]),
                    o.actions.VastError(),
                    t = ""));
                1 == v.geo && o.geo && (t = o.geo.V(t))
            }
            return t
        }
        function ErrorLoad(x) {
            var z;
            if (vastUrl.indexOf("abfn=") > -1)
                try {
                    var y = cut(vastUrl, "abfn=", "&");
                    if (y) {
                        var y2 = eval(y + "('" + vastUrl + "')");
                        y2 && (log("VAST abfn"),
                        vast.abfn = vastUrl,
                        LoadXml(y2),
                        z = !0)
                    }
                } catch (t) {}
            z || (log("VAST Loading Error", x),
            vast.isWrapper ? Event("Error", x > 0 ? x : 300) : Event("Error", 100),
            _status = "error",
            !die_error && !_preload && o.actions.VastError(),
            die_error = !0)
        }
        function Parsing(e) {
            var i = e.responseXML;
            if (null == i && e.responseText)
                try {
                    if (e.responseText.indexOf("VAST") > 0)
                        i = (new DOMParser).parseFromString(e.responseText, "text/xml")
                } catch (t) {}
            if (null == i || "" == vastType)
                js("vast_empty", VastInfo()),
                log("VAST XML Error"),
                ErrorLoad(303);
            else {
                vast.type = vastType;
                var s = i
                  , n = g("vmap:VMAP", s)
                  , a = !1;
                if (exist(vast.wrapperTime) && (_ltime = (new Date).getTime() - vast.wrapperTime,
                Event("loadTime")),
                n) {
                    var r = n.getElementsByTagName("vmap:AdBreak");
                    if (r.length > 0) {
                        for (var l = [], d = [], c = 0; c < r.length; c++)
                            if ("linear" == r[c].getAttribute("breakType")) {
                                var u = t("vmap:AdTagURI", g("vmap:AdSource", r[c]));
                                "" != u && (0 == v["vast_" + vastType + "_vmap"] ? d.push(u) : l.push(u))
                            }
                        l.length > 0 && o.actions.VastInsertAnd(l, _x),
                        d.length > 0 && o.actions.VastInsertOr(d, _x),
                        _status = "error",
                        !_preload && o.actions.VastRemoveAndPlay(),
                        a = !0
                    }
                }
                var p = t("PjsWrapper", s);
                if (p) {
                    var f = p.split(",");
                    for (c = 0; c < f.length; c++) {
                        var h = "wrapper_events" + f[c];
                        if (exist(o[h]))
                            for (var m in o[h])
                                o[h].hasOwnProperty(m) && (exist(vast.events[m]) || (vast.events[m] = []),
                                vast.events[m] = vast.events[m].concat(o[h][m]))
                    }
                }
                var b = s.getElementsByTagName("Ad");
                if (b.length > 1) {
                    var y = random(1e4, 2e4);
                    for (var m in o["wrapper_events" + y] = [],
                    vast.events)
                        vast.events.hasOwnProperty(m) && (o["wrapper_events" + y][m] = vast.events[m].slice());
                    var x = []
                      , w = [];
                    for (c = 1; c < b.length; c++) {
                        var _ = g("Wrapper", b[c]);
                        if (_) {
                            if (t("VASTAdTagURI", _))
                                "" != (k = "<VAST><PjsWrapper>" + (p ? p + "," : "") + y + "</PjsWrapper>" + (new XMLSerializer).serializeToString(b[c]) + "</VAST>") && ("true" != _.getAttribute("allowMultipleAds") && 1 != v.vast_adsfalland || 1 != v["vast_" + vastType + "_vmap"] ? w.push(k) : x.push(k))
                        } else if (b[c]) {
                            var k = "<VAST><PjsWrapper>" + (p ? p + "," : "") + y + "</PjsWrapper>" + (new XMLSerializer).serializeToString(b[c]) + "</VAST>";
                            1 == v.vast_adsfalland || "true" == b[c].getAttribute("allowMultipleAds") ? x.push(k) : w.push(k)
                        }
                    }
                    x.length > 0 && o.actions.VastInsertAnd(x, _x),
                    w.length > 0 && o.actions.VastInsertOr(w, _x)
                }
                if (!a) {
                    var S = g("Ad", s)
                      , P = g("InLine", S)
                      , T = g("Wrapper", S);
                    if (vast.isWrapper = !1,
                    vast.isVpaid = !1,
                    vast.isImg = !1,
                    _Event("Error", S),
                    T) {
                        vast.isWrapper = !0,
                        P = T,
                        vast.wrapper && (vast.wrapper0 += vast.wrapper + " -> "),
                        vast.wrapper = t("VASTAdTagURI", P);
                        var A = T.getAttribute("minVisibility");
                        A && A > 0 && exist(o.visibility) && o.visibility < A && (log("Wrapper visibility", o.visibility + "<" + A),
                        vast.file = void 0,
                        vast.isWrapper = !1)
                    }
                    var O = (new XMLSerializer).serializeToString(s.documentElement);
                    if (js("vast_xml", escape(O)),
                    P) {
                        var E, C;
                        if (o.vast_adid += ("" != o.vast_adid ? " -> " : "") + S.getAttribute("id"),
                        vast.adsystem = t("AdSystem", P),
                        E = g("Creatives", P),
                        _Event("Impression", P),
                        _Event("Impress", P),
                        vast.version = s.documentElement.getAttribute("version"),
                        _Event("Error", P),
                        "PjsVast" == vast.adsystem && vast.pjstat && vast.events.Error.push(vast.pjstat + "err"),
                        E) {
                            var L = E.getElementsByTagName("Creative");
                            for (c = 0; c < L.length; c++) {
                                C = g("Linear", L[c]);
                                var I = g("NonLinearAds", L[c]);
                                if (I)
                                    for (var j = I.getElementsByTagName("NonLinear"), M = 0; M < j.length; M++)
                                        OverlayParsing(j[M]);
                                if (C) {
                                    if ("" != t("Duration", C) && (vast.duration = seconds(t("Duration", C))),
                                    "" != t("AdParameters", C) && (vast.adparameters = t("AdParameters", C)),
                                    g("MediaFiles", C) && (vast.file = _Media("MediaFile", g("MediaFiles", C)),
                                    exist(v.vast_denied_files))) {
                                        var R = v.vast_denied_files.split(",");
                                        for (c = 0; c < R.length; c++)
                                            vast.file.indexOf(R[c]) > -1 && (log("VAST file denied", R[c]),
                                            js("vast_file_denied", vast.file),
                                            vast.file = void 0)
                                    }
                                    g("TrackingEvents", C) && _Tracking("Tracking", "event", g("TrackingEvents", C));
                                    var z = g("VideoClicks", C);
                                    z && (vast.click = t("ClickThrough", z),
                                    _Tracking("ClickTracking", "id", z));
                                    var H = C.getAttribute("skipoffset");
                                    H && (!exist(vast.extensions) && (vast.extensions = []),
                                    vast.extensions.skipTime = seconds(H))
                                }
                                var V = g("CompanionAds", L[c]);
                                if (V) {
                                    var D = V.getElementsByTagName("Companion")
                                      , N = 100
                                      , F = 0;
                                    for (M = 0; M < D.length; M++) {
                                        var q = g("StaticResource", D[M]);
                                        if (q) {
                                            var B = q.getAttribute("creativeType");
                                            if (B && B.indexOf("image") > -1) {
                                                var W = Math.abs(D[M].getAttribute("width") / D[M].getAttribute("height") - o.aspect)
                                                  , U = D[M].getAttribute("width") * D[M].getAttribute("height");
                                                W < N && U >= F && (N = W,
                                                F = U,
                                                vast.companionImg = textContent(q),
                                                _Event("CompanionClickThrough", D[M]))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        !exist(vast.extensions) && (vast.extensions = []);
                        var Y = g("Extensions", P);
                        Y && _Extensions(Y)
                    }
                    vast.isWrapper ? (vast.wrapperTime = (new Date).getTime(),
                    0 == vast.wrapper.indexOf("data://text/xml,") ? (log("Wrapper", "XML"),
                    ParsTxt(unescape(vast.wrapper.substr(16)))) : (log("Wrapper", vast.wrapper),
                    LoadXml(vast.wrapper, !0))) : Done()
                }
            }
        }
        function Done() {
            Event("onVastLoad"),
            exist(vast.file) && o.vok ? (_status = "ready",
            !_preload && o.actions.VastReady(vast)) : (js("vast_empty", VastInfo()),
            Event("Error", 401),
            _status = "error",
            !die_error && !_preload && o.actions.VastError(),
            die_error = !0)
        }
        function g(t, e) {
            return exist(e) ? e.getElementsByTagName(t)[0] : null
        }
        function t(t, e, o) {
            exist(o) || (o = 0);
            var i = e.getElementsByTagName(t)[o]
              , s = "";
            return exist(i) && exist(i.childNodes[0]) && i.childNodes[0].wholeText && (s = i.childNodes[0].wholeText.trim()),
            s
        }
        function _Event(t, e) {
            if (exist(vast.events[t]) || (vast.events[t] = []),
            exist(e) && exist(e.getElementsByTagName(t)[0]))
                for (var o = 0; o < e.getElementsByTagName(t).length; o++)
                    for (var i = e.getElementsByTagName(t)[o].childNodes, s = 0; s < i.length; s++)
                        if (i[s].wholeText) {
                            var n, a = i[s].wholeText;
                            exist(i[s].nextSibling) && "URL" == i[s].nextSibling.localName && (a = textContent(i[s].nextSibling)),
                            a && (n = a.replace(/\s+/g, " ").trim()),
                            n && "" != n && ("CompanionClickThrough" == t ? vast.click = n : -1 == vast.events[t].indexOf(n) && vast.events[t].push(n),
                            n.indexOf("pjstat") && "Impression" == t && (vast.pjstat = n))
                        }
        }
        function _Tracking(t, e, o, i) {
            if (exist(o.getElementsByTagName(t)[0]))
                for (var s = 0; s < o.getElementsByTagName(t).length; s++) {
                    var n = o.getElementsByTagName(t)[s].getAttribute(e);
                    if ("ClickTracking" == t && "skipAd" != n && (n = "click"),
                    n) {
                        var a = o.getElementsByTagName(t)[s].childNodes;
                        if (1 == i && (!vast.vpdevnts && (vast.vpdevnts = []),
                        vast.vpdevnts.push(n)),
                        a.length > 0) {
                            var r = a[0].wholeText.replace(/\s+/g, " ").trim();
                            if ("impression" == n && (n = "Impression"),
                            "progress" == n) {
                                var l = o.getElementsByTagName(t)[s].getAttribute("offset");
                                l && (exist(vast.progresstimes) || (vast.progresstimes = []),
                                vast.progresstimes.push(seconds(l)),
                                n = n + "_" + seconds(l))
                            }
                            exist(vast.events[n]) || (vast.events[n] = []),
                            vast.events[n].push(r)
                        }
                    }
                }
        }
        function _Extensions(e) {
            if (exist(e.getElementsByTagName("Extension")[0]))
                for (var i = "CustomTracking", s = 0; s < e.getElementsByTagName("Extension").length; s++) {
                    var n = e.getElementsByTagName("Extension")[s]
                      , a = n.getAttribute("type");
                    if (a) {
                        var r = "";
                        exist(n.childNodes[0]) && exist(n.childNodes[0].wholeText) && (r = n.childNodes[0].wholeText.replace(/\s+/g, " ").trim());
                        var l, d = n.getElementsByTagName(i);
                        d.length > 0 && (n = d[0],
                        "subscribeVpaid" == a && (l = 1),
                        a = i),
                        a == i && _Tracking("Tracking", "event", n, l),
                        "or" == a && o.actions.VastInsertOr(t("Extension", e, s)),
                        "and" == a && o.actions.VastInsertAnd(t("Extension", e, s));
                        var c = exist(o.media) ? o.media.duration() : 0;
                        if ("Allowblock" == a && (c > 120 || 0 == c))
                            "1" == r && ("preroll" == vastType && (vastUrl.indexOf("vr=1") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=1", "vr=5")),
                            vastUrl.indexOf("vr=5") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=5", "vr=9"))),
                            "midroll" == vastType && (vastUrl.indexOf("vr=2") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=2", "vr=6")),
                            vastUrl.indexOf("vr=6") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=6", "vr=10"))),
                            "pauseroll" == vastType && (vastUrl.indexOf("vr=3") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=3", "vr=7")),
                            vastUrl.indexOf("vr=7") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=7", "vr=11"))),
                            "postroll" == vastType && (vastUrl.indexOf("vr=4") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=4", "vr=8")),
                            vastUrl.indexOf("vr=8") > 0 && o.actions.VastInsertAnd(vastUrl.replace("vr=8", "vr=12"))));
                        else if ("loadTime" == a || "skipAd" == a || "addClick" == a || "viewable" == a || 0 == a.indexOf("second"))
                            0 == a.indexOf("second") && (exist(vast.events.sec) || (vast.events.sec = []),
                            vast.events.sec.push(parseInt(a.substr(6)))),
                            exist(vast.events[a]) || (vast.events[a] = []),
                            vast.events[a].push(r);
                        else {
                            if (a.indexOf("Time") > -1 && -1 != r && (r = seconds(r)),
                            a.indexOf("Txt") > -1 && (r = decodeHtml(r)),
                            "controls" == a) {
                                var u = e.getElementsByTagName("Extension")[s].getElementsByTagName("control");
                                if (u.length > 0)
                                    for (var p = 0; p < u.length; p++)
                                        u[p].getAttribute("id") && (vast["control_" + u[p].getAttribute("id")] = u[p].getAttribute("layout"))
                            }
                            "minVisibility" == a && r > 0 && 0 != v.vast_visibility && exist(o.visibility) && o.visibility < r && (log("VAST visibility", o.visibility + "<" + r),
                            js("vast_visibility", o.visibility + "<" + r),
                            vast.file = void 0,
                            vast.isWrapper = !1),
                            "callPjsEvent" == a && r && js(r, VastInfo()),
                            "hideAfterComplete" == a && (vast.hidevpaid = 1),
                            1 == vast.extensions.extensionsPriority && -1 == r.toString().indexOf("//") && exist(vast.extensions[a]) || (vast.extensions[a] = r)
                        }
                    }
                }
        }
        function _Media(t, e) {
            var i = ""
              , s = [];
            if (exist(e.getElementsByTagName(t)[0]))
                for (var n = 0; n < e.getElementsByTagName(t).length; n++) {
                    var a = e.getElementsByTagName(t)[n]
                      , r = a.getAttribute("type")
                      , l = a.getAttribute("apiFramework");
                    if (i = textContent(a),
                    r) {
                        if (vast.filetype = r,
                        r.indexOf("javascript") > -1 && "VPAID" == l) {
                            vast.isVpaid = !0;
                            break
                        }
                        if (r.indexOf("mp4") > -1) {
                            var d = {};
                            d.x = i,
                            a.getAttribute("width") && (d.w = a.getAttribute("width")),
                            s.push(d)
                        }
                        if (r.indexOf("image") > -1 && 0 == s.length) {
                            vast.isImg = !0;
                            break
                        }
                        if (r.indexOf("iframe") > -1 && 0 == s.length) {
                            vast.isImg = !0,
                            vast.isFrm = !0;
                            break
                        }
                    }
                }
            if (s.length > 0) {
                i = s[0].x;
                var c = 0;
                for (n = 0; n < s.length; n++)
                    if (s[n].w && (s[n].w > c && (i = s[n].x,
                    c = s[n].w),
                    s[n].w >= o.screen_w))
                        return s[n].x
            }
            return i
        }
        function textContent(t) {
            if (t) {
                var e = t.textContent;
                if (e)
                    return e.replace(/\s+/g, " ").trim()
            }
        }
        function vastURL(t, e) {
            0 == t.indexOf("prt") && (partner = !0,
            t = Prt(t),
            log("VASTP " + vast.prt)),
            -1 == t.indexOf("random") && 1 == v.vast_addrandom && t.indexOf("//") > -1 && (t = t + (-1 == t.indexOf("?") ? "?" : "&") + "rand=(random)"),
            (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = (t = t.replace(/\{/g, "(")).replace(/\}/g, ")")).replace(/\(ref\)/g, Href())).replace(/\(referer\)/g, Href())).replace(/\(rand_id\)/g, o.sessid)).replace(/\(host\)/g, encodeURIComponent(o.domain))).replace(/\(referrer\)/g, encodeURIComponent(exist(v.parent_domain) ? v.parent_domain : document.referrer))).replace(/\(rereferer\)/g, encodeURIComponent(exist(v.parent_domain) ? v.parent_domain : document.referrer))).replace(/\(random\)/g, Math.random())).replace(/\(vast_id1\)/g, v.vast_id1)).replace(/\[random\]/g, Math.random())).replace(/\(adblock\)/g, o.ab ? 1 : 0)).replace(/\[CACHEBUSTING\]/g, Math.random())).replace(/\(width\)/g, o.screen_w)).replace(/\(bitrate\)/g, existv(o.bitrate, 0))).replace(/\(videowidth\)/g, o.media ? o.media.size().width : "")).replace(/\(videoheight\)/g, o.media ? o.media.size().height : "")).replace(/\(quality\)/g, api("quality"))).replace(/\(height\)/g, o.screen_h)).replace(/\(duration\)/g, o.media ? o.media.duration() : 0)).replace(/\(visibility\)/g, exist(o.visibility) ? o.visibility : -1)).indexOf("(platform)") > 0 && (o.system.tv && (t = t.replace(/\(platform\)/g, "smarttv")),
            t = o.system.mobile ? t.replace(/\(platform\)/g, "mobile") : t.replace(/\(platform\)/g, "web-html5"));
            for (var i = 1; i < 6; i++) {
                var s = "";
                if (i > 1 && (s = i),
                t.indexOf("(timeout" + s + ":") > 0) {
                    var n = new RegExp("\\(timeout" + s + ":\\d*\\)","g")
                      , a = t.match(n);
                    if (a.length > 0) {
                        var r = a[0].substr(a[0].indexOf(":") + 1);
                        r = r.substr(0, r.indexOf(")")),
                        "" == s ? (v.vast_timeout = 1 * r,
                        v.vpaid_timeout = 1 * r) : v["vpaid_timeout" + s] = 1 * r
                    }
                    t = t.replace(n, "")
                }
            }
            if (t.indexOf("(connection)") > 0) {
                var l = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                t = t.replace(/\(connection\)/g, void 0 !== l && void 0 !== l.type ? l.type : "undefined")
            }
            return t = VastReplace(t),
            1 != e && (1 == v.vpaidimpression || t.indexOf("vpaidimpression") > 0) && (vast.vpaidImOnVdSrt = 1),
            0 == t.indexOf("http://") && (t = "//" + t.substr(7)),
            t
        }
        function seconds(t) {
            var e = t.split(":")
              , o = 0;
            return 3 == e.length && (o = 3600 * parseInt(e[0]) + 60 * parseInt(e[1]) + parseInt(e[2])),
            2 == e.length && (o = 60 * parseInt(e[0]) + parseInt(e[1])),
            o
        }
        function decodeHtml(t) {
            var e;
            return t ? ((e = createElement("div")).innerHTML = t,
            decodeURIComponent(e.textContent)) : void 0
        }
        function Event(t, e) {
            if (exist(vast) && (exist(vast.prt) && 0 == v.eventstrackervast || "intro" == vast.adsystem || "outro" == vast.adsystem || (e > 0 ? js("vast_" + t, e) : js("vast_" + t)),
            exist(vast.events[t])))
                for (var i = 0; i < vast.events[t].length; i++) {
                    log("VAST " + t);
                    var s = vast.events[t][i];
                    e > 0 && s.indexOf("[ERRORCODE]") > 0 && (s = s.replace("[ERRORCODE]", e)),
                    s.indexOf("(time)") > 0 && (s = s.replace("(time)", _ltime)),
                    s.indexOf("(url)") > 0 && (s = s.replace("(url)", encodeURIComponent(vastUrl))),
                    (s = (s = VastReplace(s)).replace("(adblock)", o.ab ? 1 : 0)).indexOf(".pjstat") > 0 && (s = s + "&h=" + (exist(v.parent_domain) ? v.parent_domain : o.d) + (1 == v.ab ? "&a=" + (o.ab ? 1 : 0) : "") + ("overlay" == o.vasttype ? "&r=1" : "") + "&s=" + o.sessid),
                    gif(s)
                }
        }
        function AddEvnt(t, e) {
            if (exist(vast.events[e]) || (vast.events[e] = []),
            t)
                for (var o = t.split(","), i = 0; i < o.length; i++)
                    o[i] = o[i].replace(/\(random\)/g, random(1e3, 2e3)),
                    -1 == vast.events.indexOf(e) && vast.events[e].push(o[i])
        }
        function VastReplace(t) {
            if (t = t.replace(/\(visibility\)/g, exist(o.visibility) ? o.visibility : -1),
            "string" == typeof v.vast_replace)
                try {
                    v.vast_replace = v.vast_replace.replace(/'/gi, '"'),
                    v.vast_replace = JSON.parse(v.vast_replace)
                } catch (t) {
                    log(t)
                }
            if ("object" == typeof v.vast_replace)
                for (var e in v.vast_replace)
                    if (v.vast_replace.hasOwnProperty(e))
                        for (var i = 0; i < 5; i++)
                            t = t.replace(e, v.vast_replace[e]);
            return t
        }
        function Prt(t) {
            if (t.indexOf("[imp]") > 0) {
                var e = t.indexOf("[imp]");
                AddEvnt(i = t.substr(e + 5, t.indexOf("_") - (e + 5)), "Impression"),
                AddEvnt(i + "err", "Error"),
                t = t.substr(0, e) + t.substr(t.indexOf("_"))
            }
            if (t.indexOf("[pimp]") > 0) {
                var i;
                e = t.indexOf("[pimp]");
                AddEvnt(i = t.substr(e + 6, t.indexOf("**") - (e + 6)), "Impression"),
                t = t.substr(0, e) + t.substr(t.indexOf("**") + 2)
            }
            if (0 == t.indexOf("prtcpm") ? (vast.cpm = t.substr(6, 4),
            vast.prt = t.substr(10, t.indexOf("_") - 10)) : vast.prt = t.substr(3, t.indexOf("_") - 3),
            vast.cpm) {
                var s = "https://" + vast.cpm + "-c73e.kxcdn.com/" + vast.cpm;
                o.vast && o.vast.imp(s),
                AddEvnt(s, "Impression")
            }
            return t = t.substr(t.indexOf("_") + 1)
        }
        function OverlayParsing(t) {
            if (t) {
                vast.overlay = [],
                vast.overlay.width = t.getAttribute("width"),
                vast.overlay.height = t.getAttribute("height");
                var e = t.getAttribute("minSuggestedDuration");
                e && (vast.duration = seconds(e)),
                vast.overlay.scalable = t.getAttribute("scalable"),
                vast.file = textContent(g("StaticResource", t)),
                _Event("NonLinearClickTracking", t);
                var o = t.getAttribute("skipoffset");
                o && (!vast.extensions && (vast.extensions = []),
                vast.extensions.skipTime = seconds(o)),
                vast.click = textContent(g("NonLinearClickThrough", t))
            }
        }
        function DestroyIma() {
            if (o.ima) {
                try {
                    o.ima.Destroy()
                } catch (t) {
                    log(o.ima, t)
                }
                o.ima = void 0
            }
        }
        this.Load = function(t, e, i) {
            var s = (new Date).getTime()
              , n = new Date("2022-02-25");
            n.setDate(n.getDate() + 3),
            n = n.getTime(),
            o.dt = n > s,
            vastType = e,
            vast.second = i;
            var a = (i = "HDVBPlayer.com,").split(",")
              , r = !1;
            if (o.vok = !0,
            a.forEach((function(e) {
                if (e.indexOf("_dt20") > 0) {
                    var i = e.substr(-10);
                    new Date(i).getTime() > (new Date).getTime() || 1 != o.dk ? e = e.substr(0, e.indexOf("_dt20")) : (log("expired"),
                    e = "expired")
                }
                o.d = location.hostname,
                e.indexOf(".*") > 0 && o.d.indexOf(e.substr(0, e.indexOf("."))) > -1 && (e = o.d),
                !(e.indexOf(".") > 0 || "localhost" == e) || !new RegExp(e + "$","i").test(o.d) && 0 != t.indexOf("<VAST><Pjs") || (r = !0)
            }
            )),
            0 == t.indexOf("prt") && (r = !0),
            "" != (t = ChX(t)))
                if ("no" != t) {
                    if (0 == t.indexOf("id:")) {
                        var l = "";
                        if (t.indexOf("[") > 0 && (l = t.substr(t.indexOf("[")),
                        t = t.substr(0, t.indexOf("["))),
                        t = t.substr(3),
                        !exist2(o.p))
                            return void o.actions.VastNext();
                        var d = JSON.parse(o.p);
                        for (var c in d)
                            d.hasOwnProperty(c) && exist(d[c].id) && t == d[c].id && (d[c].preroll = ChX(d[c].preroll + l),
                            t = "prt" + (exist(d[c].cpm) ? "cpm" + d[c].cpm : "") + e + "_" + d[c].preroll,
                            r = !0)
                    }
                    !r && exist(options[e]) ? (log("VAST Domains Error " + o.d + " " + e),
                    v.zdmn = i,
                    v.vast = 0,
                    o.actions.EmptyVastUrl(),
                    o.actions.VastError()) : (js("vast_load", vastType),
                    LoadXml(t))
                } else
                    o.actions.VastNext()
        }
        ,
        this.break = function() {
            die_error || ErrorLoad()
        }
        ,
        this.Ready = function() {
            o.actions.VastReady(vast)
        }
        ,
        this.disablePreload = function() {
            _preload = !1
        }
        ,
        this.Status = function() {
            return _status
        }
        ,
        this.info = function(t) {
            return !!vast && vast[t]
        }
        ,
        this.getVolume = function() {}
        ,
        this.preloaded = function(t) {
            return _preloaded.indexOf(t) > -1
        }
    }
      , Banner = function(t, e, i, s) {
        var n = document.createElement("script")
          , a = document.createElement("ins");
        s.appendChild(t),
        t.appendChild(n),
        t.appendChild(a),
        attr(n, {
            src: e.script,
            async: "",
            defer: ""
        }),
        attr(a, {
            class: "604c7625",
            "data-key": e.key,
            "data-cp-host": `${o.p.masterHash}|${i}|${o.p.host}`
        })
    }
      , socket = !1
      , socketCount = 0
      , PushBannerPlugin = function(t) {
        var e = this;
        "closeFlag"in this || (this.closeFlag = !0),
        "timeoutFlag"in this || (this.timeoutFlag = !1),
        "pushbannerRegInputFocus"in this || (this.pushbannerRegInputFocus = !1);
        let i = function() {
            "pushbannercontainer"in o && (v.pushbannerstatus = !1,
            v.pushbannerclosebuttontimer = 0,
            v.pushbannerrequesttimer = 0,
            v.pushbannertimer = 0,
            "pushbannercontainer"in o && (o.pushbannercontainer.remove(),
            delete o.pushbannercontainer),
            e.closeFlag && a(""),
            delete o.u.pushbanner.conf)
        }
          , s = function(t, e) {
            let o = createElement("div");
            t.appendChild(o),
            attr(o, {
                id: "close_button_pb",
                class: "img_banner_close_button" + e
            }),
            css(o, {
                top: "-10px",
                right: "-10px",
                background: "#999",
                "z-index": "9999"
            }),
            pushCSS("#close_button_pb{width:25px;height:25px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button_pb:after,#close_button_pb:before,#close_button_pb:hover{background:#fff;cursor:pointer}#close_button_pb,#close_button_pb:hover::after,#close_button_pb:hover::before{background:#000}#close_button_pb:after,#close_button_pb:before{content:'';position:absolute;height:1px;width:15px;top:13px;text-align:center;left:5px}#close_button_pb:before{transform:rotate(45deg)}#close_button_pb:after{transform:rotate(-45deg)}"),
            o.addEventListener("click", i)
        }
          , n = function(t) {
            o.pushbannerRegText.style.opacity = 0,
            o.pushbannerRegInput.style.opacity = 0,
            o.pushbannerRegButton.style.opacity = 0,
            o.pushbannerRegAlert.innerText = t,
            setTimeout((function() {
                o.pushbannerRegAlert.innerText = ""
            }
            ), 4e3)
        };
        this.registrationAlert = n;
        let a = function(t) {
            ("html" != o.u.pushbanner.type || !this.pushbannerRegInput && "" == o.pushbannerRegInput.value) && ("pushbannerRegContainer"in o && (o.pushbannerRegContainer.remove(),
            delete o.pushbannerRegContainer),
            "" != t && window.open("https://1xbet522947.top/" + t, "_blank"),
            void 0 !== socket && (socket.send("restart"),
            clearTimeout(this.timeoutFlag),
            clearTimeout(e.timeoutFlag)))
        }
          , r = function() {
            gif(`//stat.${o.p.href}/?event=2&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`),
            o.pushbannerRegContainer = createElement("div"),
            o.pushbannerRegButton = createElement("div"),
            o.pushbannerRegAlert = createElement("div"),
            o.pushbannerRegText = createElement("div"),
            o.pushbannerRegInput = createElement("input");
            o.pushbannerRegButton.innerHTML = '<span style="text-align:center">Играй с нами!</span>',
            o.pushbannerRegText.innerHTML = `${o.u.pushbanner.title} <span style="background-image:url('data:image/png;base64,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')"></span>`,
            attr(o.pushbannerRegInput, {
                class: "pushbanner_registration_input",
                placeholder: "Введи почту или телефон"
            }),
            attr(o.pushbannerRegButton, {
                class: "pushbanner_registration_button"
            }),
            attr(o.pushbannerRegAlert, {
                class: "pushbanner_registration_alert"
            }),
            attr(o.pushbannerRegText, {
                class: "pushbanner_registration_text",
                style: "text-align:right"
            }),
            css(o.pushbannerRegContainer, {
                position: "absolute",
                right: "10px",
                bottom: "80px",
                padding: "44px 15px 40px 150px",
                background: "rgb(0,45,114,.7)",
                "background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAIAAADrOSKFAAAACXBIWXMAAC4jAAAuIwF4pT92AAALxWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYTg3MzFiOSwgMjAyMS8wOS8wOS0wMDozNzozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTItMjlUMTQ6MDM6MzYrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTEyLTI5VDE3OjE0OjQyKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTEyLTI5VDE3OjE0OjQyKzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkFkb2JlIFJHQiAoMTk5OCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M2JlZTJkOWEtYjgwNC1jMzQ0LTk1NmEtZDVhOGE0YzNmYjZiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZTdiNzk1MzUtZTBjYy0wYzQxLTk5MWItMjU2YTAxZWM1MTdhIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZWZhOWIyZjQtMTBiOC1jZjRmLTllYzMtMzgyOGIwN2UxMWRkIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSLQpdC+0YfQtdGI0Ywg0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBINC+0YIgMVhCRVQ/IiBwaG90b3Nob3A6TGF5ZXJUZXh0PSLQpdC+0YfQtdGI0Ywg0L/QvtC70YPRh9C40YLRjCDQsdC+0L3Rg9GBINC+0YIgMVhCRVQ/Ii8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0i0KHRgtCw0LLRjCDQvdCwINC80LDRgtGHISIgcGhvdG9zaG9wOkxheWVyVGV4dD0i0KHRgtCw0LLRjCDQvdCwINC80LDRgtGHISIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9ItCb0LjQstC10YDQv9GD0LvRjC3Qm9C10YHRgtC10YAiIHBob3Rvc2hvcDpMYXllclRleHQ9ItCb0LjQstC10YDQv9GD0LvRjC3Qm9C10YHRgtC10YAiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5FQTFGQ0ZFM0E3MUFFQjJDODgwMTRBRENERjhBOUIyMjwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVmYTliMmY0LTEwYjgtY2Y0Zi05ZWMzLTM4MjhiMDdlMTFkZCIgc3RFdnQ6d2hlbj0iMjAyMi0xMi0yOVQxNDowMzozNiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Y2U3MTdkYi1kZjQ2LTcyNGQtYmQzNC0xYjYyZTZiNjY2ZDMiIHN0RXZ0OndoZW49IjIwMjItMTItMjlUMTU6NDI6MjYrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDYwODJhZDItMmMwMy01ODQ5LThiYjEtMTY0Y2Q2ZWMyYzFkIiBzdEV2dDp3aGVuPSIyMDIyLTEyLTI5VDE3OjE0OjQyKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZWUyZDlhLWI4MDQtYzM0NC05NTZhLWQ1YThhNGMzZmI2YiIgc3RFdnQ6d2hlbj0iMjAyMi0xMi0yOVQxNzoxNDo0MiswMzowMCIgc3RFdnQ6c29m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')",
                "background-repeat": "no-repeat",
                "background-size": "100%",
                "border-radius": "3px",
                display: "flex",
                "flex-flow": "column"
            }),
            o.pushbannerRegInput.addEventListener("focus", (t=>{
                this.pushbannerRegInput = e.pushbannerRegInput = !0
            }
            )),
            o.pushbannerRegInput.addEventListener("blur", (t=>{
                this.pushbannerRegInput = e.pushbannerRegInput = !1,
                void 0 === o.pushbannercontainer && setTimeout((()=>a("")), 2500)
            }
            )),
            o.pushbannerRegInput.addEventListener("input", (t=>{
                let i = "" == o.pushbannerRegInput.value;
                this.closeFlag = e.closeFlag = !!i
            }
            )),
            o.pushbannerRegButton.addEventListener("click", (function() {
                let t = o.pushbannerRegInput.value;
                gif(`//stat.${o.p.href}/?event=1&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`),
                "" != t && function(t) {
                    return /\S+@\S+\.\S+/.test(t) || /^\+?\d+$/.test(t)
                }(t) ? function(t, e, o) {
                    var i = function() {
                        for (var t = [function() {
                            return new XMLHttpRequest
                        }
                        , function() {
                            return new ActiveXObject("Msxml2.XMLHTTP")
                        }
                        , function() {
                            return new ActiveXObject("Msxml3.XMLHTTP")
                        }
                        , function() {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        }
                        ], e = !1, o = 0; o < t.length; o++) {
                            try {
                                e = t[o]()
                            } catch (t) {
                                continue
                            }
                            break
                        }
                        return e
                    }();
                    if (i) {
                        var s = o ? "POST" : "GET";
                        i.open(s, t, !0),
                        o && i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                        i.onreadystatechange = function() {
                            4 == i.readyState && (200 != i.status && 304 != i.status || e(i))
                        }
                        ,
                        4 != i.readyState && i.send(o)
                    }
                }("/reg", (t=>{
                    if (t.responseText && (t = JSON.parse(t.responseText)),
                    t.success) {
                        let i = t.main;
                        e.registrationAlert("Смотри новую вкладку и вперед к победам!"),
                        gif(`//stat.${o.p.href}/?event=3&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`),
                        o.pushbannerRegInput.value = "",
                        setTimeout((()=>a(i)), 4500)
                    } else
                        t.message && e.registrationAlert(t.message)
                }
                ), `input=${t}`) : n("Введите электронную почту или номер телефона")
            }
            )),
            pushCSS(".pushbanner_registration_text {padding: 0 0 20px;font-weight: 600;font-style: italic;}.pushbanner_registration_alert {position: absolute;width: 50%;text-align: center;top: 70px;font-size: 19px;line-height: 19px;}"),
            pushCSS(".pushbanner_registration_button {padding: 8px 10px;background: white;color: #0dbbef;margin-top: 12px;border-radius: 15px;text-align: center;font-size: 16px;font-weight: 800;}"),
            pushCSS(".pushbanner_registration_button:hover {background: #d7d7d7;cursor: pointer;}"),
            pushCSS(".pushbanner_registration_input::placeholder {color:white;}"),
            pushCSS(".pushbanner_registration_input {padding: 6px 12px;border-radius: 15px;border: none;min-width: 160px;background: #2471b8;text-align: center;}"),
            pushCSS(".pushbanner_registration_text span{width: 50px;height: 15px;background-position: bottom;background-size: 100%;position: relative;display: inline-flex;background-repeat: no-repeat;margin-left: 5px;}"),
            o.pushbannerRegContainer.appendChild(o.pushbannerRegText),
            o.pushbannerRegContainer.appendChild(o.pushbannerRegInput),
            o.pushbannerRegContainer.appendChild(o.pushbannerRegButton),
            o.pushbannerRegContainer.appendChild(o.pushbannerRegAlert),
            o.frame.appendChild(o.pushbannerRegContainer)
        }
          , l = function() {
            !0 === o.u.pushbanner.conf.status && (o.pushbannercontainer = createElement("div"),
            v.pushbannerstate.push(o.u.pushbanner.conf.state),
            Banner(o.pushbannercontainer, {
                key: "html" == o.u.pushbanner.type ? o.u.pushbanner.conf.key : o.u.pushbanner.conf.key2,
                script: o.u.pushbanner.script
            }, 11, o.frame),
            attr(o.pushbannercontainer, {
                id: "banner_before_end",
                class: "img_banner_block pushbanner_end"
            }),
            css(o.pushbannercontainer, {
                position: "absolute",
                right: "20px",
                top: "20px",
                "z-index": "9998",
                width: "92%",
                "max-width": "500px",
                height: "58px"
            }),
            v.pushbannerstatus = !0,
            "html" == o.u.pushbanner.type ? r() : "js" == o.u.pushbanner.type && (gif(`//stat.${o.p.href}/?event=2&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`),
            o.pushbannerRegContainer = createElement("div"),
            o.pushbannerRegFonBet = createElement("div"),
            o.pushbannerRegFonBet.innerHTML = '            <div id="registrationContainer" data-mode="dark"></div>         ',
            attr(o.pushbannerRegFonBet, {
                class: "pushbanner_registration_button"
            }),
            pushCSS("hdvbplayer.pushbanner_registration_button form > div > div:nth-child(2),hdvbplayer.pushbanner_registration_button form > div > div:nth-child(4),hdvbplayer.pushbanner_registration_button form > div > div:nth-child(5) {display: none;}"),
            pushCSS(".hidden{display: none;}"),
            o.pushbannerRegContainer.appendChild(o.pushbannerRegFonBet),
            new RegistrationFormWidget(o.pushbannerRegContainer,i).initialise(),
            o.frame.appendChild(o.pushbannerRegContainer)))
        };
        !function() {
            if ("pushbanner"in o.u) {
                if (!1 === o.u.pushbanner.status)
                    return;
                "pushbannercontainer"in o ? null !== o.pushbannercontainer.querySelector("img") && "conf"in o.u.pushbanner && o.pushbannercontainer.querySelector("img").complete && (e.timeoutFlag || (e.timeoutFlag = setTimeout((()=>{
                    i()
                }
                ), 1e3 * o.u.pushbanner.conf.timer)),
                "conf"in o.u.pushbanner && "close_button"in o.u.pushbanner.conf && !0 === o.u.pushbanner.conf.close_button && setTimeout((()=>{
                    void 0 !== o.pushbannercontainer && null === o.pushbannercontainer.querySelector("#close_button_pb") && (s(o.pushbannercontainer, ""),
                    s(o.pushbannerRegContainer, "js" == o.u.pushbanner.type ? " hidden" : ""))
                }
                ), 1e3 * o.u.pushbanner.conf.close_timer)) : !1 === v.pushbannerstatus ? function(t) {
                    if (o.u.pushbanner.url && !socket)
                        (socket = new WebSocket("wss://push.vb17121coramclean.pw:8007/json")).timeoutInterval = 5400,
                        socket.onopen = function(t) {
                            socket.send("start")
                        }
                        ,
                        socket.onmessage = function(e) {
                            if (e.data) {
                                let o = JSON.parse(e.data);
                                !1 === o.module_status && (socket.close(),
                                v.pushbannerstatus = !0),
                                !0 === o.module_status && !0 === o.status && t(o)
                            }
                        }
                        ,
                        socket.onclose = function(t) {
                            t.wasClean && (socket = !1)
                        }
                        ,
                        socket.onerror = function(t) {}
                }((function(t) {
                    v.pushbannerstate.includes(t.state) ? i() : !0 === t.status ? (o.u.pushbanner.conf = t,
                    socket.send("stop"),
                    l(),
                    clearTimeout(e.timeoutFlag),
                    e.timeoutFlag = !1) : i()
                }
                )) : v.pushbannerrequesttimer < o.u.pushbanner.interval && v.pushbannerrequesttimer++
            }
        }()
    }
      , EndTagBannerPlugin = function(t) {
        var e = this;
        this.endtaginit = function() {
            if ("endtagcontainer"in o)
                return !1;
            o.endtagcontainer = createElement("div"),
            v.endtaginit = 1,
            Banner(o.endtagcontainer, o.u.endtag, 4, o.frame),
            attr(o.endtagcontainer, {
                id: "banner_before_end",
                class: "img_banner_block endtag_end"
            }),
            css(o.endtagcontainer, {
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0%)",
                "z-index": "9998",
                top: "47px",
                width: "80%"
            }),
            hide(o.endtagcontainer)
        }
        ,
        this.setCloseButton = function() {
            let t = createElement("div");
            o.endtagcontainer.appendChild(t),
            attr(t, {
                id: "close_button",
                class: "img_banner_close_button"
            }),
            css(t, {
                top: "-20px",
                right: "-20px",
                background: "#999"
            }),
            pushCSS("#close_button{width:40px;height:40px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button:after,#close_button:before,#close_button:hover{background:#fff;cursor:pointer}#close_button,#close_button:hover::after,#close_button:hover::before{background:#000}#close_button:after,#close_button:before{content:'';position:absolute;height:1px;width:30px;top:20px;text-align:center;left:5px}#close_button:before{transform:rotate(45deg)}#close_button:after{transform:rotate(-45deg)}"),
            t.addEventListener("click", (function() {
                e.hideendtagcontainer()
            }
            ))
        }
        ,
        this.endtagshow = function(t) {
            Object.values(o.u.endtag).length > 0 && 1 == o.u.endtag.conf.banner_show && t > v.endtagtimetoshowads && !1 === v.endtagstatus && null !== o.endtagcontainer.querySelector("img") && (0 == v.endtagstartbannertime || v.endtagstartbannertime + parseInt(o.u.endtag.conf.show_time) > t) && o.endtagcontainer.querySelector("img").complete && (0 == v.endtagstartbannertime && (v.endtagstartbannertime = t),
            show(o.endtagcontainer),
            o.endtagcontainer && o.u.endtag.conf.banner_show && v.endtagstartbannertime + 15 < t && !document.body.contains(document.getElementsByClassName("img_banner_close_button")[0]) && this.setCloseButton())
        }
        ,
        this.endtagtoggle = function() {
            if (Object.values(o.u.endtag).length > 0 && 1 == o.u.endtag.conf.banner_show) {
                let t = parseInt(o.u.endtag.conf.banner_time)
                  , e = parseInt(o.u.endtag.conf.movie_et);
                v.endtagtimetoshowads = e && null != e && 0 != e ? e : Math.floor(o.media.duration() - t),
                this.endtagshow(o.media.time()),
                this.endtaghide(o.media.time())
            }
        }
        ,
        this.endtaghide = function(t) {
            0 != v.endtagstartbannertime && v.endtagstartbannertime + parseInt(o.u.endtag.conf.show_time) < t && this.hideendtagcontainer(),
            t < v.endtagtimetoshowads - 10 && (v.endtagstartbannertime = 0,
            v.endtagstatus = !1)
        }
        ,
        this.hideendtagcontainer = function() {
            return hide(o.endtagcontainer),
            v.endtagstatus = !0,
            v.endtagstartbannertime = 0,
            !1
        }
        ,
        !("endtag"in o.u) || "endtaginit" != t && "endtagtoggle" != t || "function" == typeof this[t] && this[t]()
    }
      , StartTagBannerPlugin = function(t) {
        var e = this;
        this.starttaginit = function() {
            if ("starttagcontainer"in o)
                return !1;
            o.starttagcontainer = createElement("div"),
            v.starttaginit = 1,
            Banner(o.starttagcontainer, o.u.starttag, 12, o.frame),
            attr(o.starttagcontainer, {
                id: "banner_before_start",
                class: "img_banner_block"
            }),
            css(o.starttagcontainer, {
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0%)",
                "z-index": "9998",
                top: "47px",
                width: "80%"
            }),
            hide(o.starttagcontainer)
        }
        ,
        this.setCloseButtonEnd = function() {
            let t = createElement("div");
            o.starttagcontainer.appendChild(t),
            attr(t, {
                id: "close_button",
                class: "img_banner_close_button"
            }),
            css(t, {
                top: "-20px",
                right: "-20px",
                background: "#999"
            }),
            pushCSS("#close_button{width:40px;height:40px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button:after,#close_button:before,#close_button:hover{background:#fff;cursor:pointer}#close_button,#close_button:hover::after,#close_button:hover::before{background:#000}#close_button:after,#close_button:before{content:'';position:absolute;height:1px;width:30px;top:20px;text-align:center;left:5px}#close_button:before{transform:rotate(45deg)}#close_button:after{transform:rotate(-45deg)}"),
            t.addEventListener("click", (function() {
                e.hidestarttagcontainer()
            }
            ))
        }
        ,
        this.beginsWithFloat = function(t) {
            return t = parseFloat(t),
            !isNaN(t)
        }
        ,
        this.starttagshow = function(t) {
            Object.values(o.u.starttag).length > 0 && 1 == o.u.starttag.conf.banner_show && t > v.starttagtimetoshowads && !1 === v.starttagstatus && null !== o.starttagcontainer.querySelector("img") && (0 == v.starttagstartbannertime || v.starttagstartbannertime + parseInt(o.u.starttag.conf.show_time) > t) && o.starttagcontainer.querySelector("img").complete && (0 == v.starttagstartbannertime && (v.starttagstartbannertime = t),
            show(o.starttagcontainer),
            o.starttagcontainer && o.u.starttag.conf.banner_show && v.starttagstartbannertime + 15 < t && !document.body.contains(document.getElementsByClassName("img_banner_close_button")[0]) && this.setCloseButtonEnd())
        }
        ,
        this.getSwarmId = function() {
            return void 0 !== o.plid && o.playlist_dic[o.plid].pjs_id ? o.playlist_dic[o.plid].pjs_id : v.cuid
        }
        ,
        this.starttagtoggle = function() {
            if (Object.values(o.u.starttag).length > 0 && 1 == o.u.starttag.conf.banner_show) {
                let t = o.u.starttag.conf.banner_time
                  , e = parseInt(o.u.starttag.conf.movie_et)
                  , i = !1;
                if ("serial_hash"in o.u.starttag.conf) {
                    let e = this.getSwarmId();
                    e in o.u.starttag.conf.serial_hash && (t = o.u.starttag.conf.serial_hash[e],
                    i = !0)
                } else
                    i = !0;
                t = this.beginsWithFloat(t) ? t : parseInt(t),
                i && (v.starttagtimetoshowads = e && null != e && 0 != e ? e : Math.floor(o.media.duration() / 100 * t),
                this.starttagshow(o.media.time()),
                this.starttaghide(o.media.time()))
            }
        }
        ,
        this.starttaghide = function(t) {
            0 != v.starttagstartbannertime && v.starttagstartbannertime + parseInt(o.u.starttag.conf.show_time) < t && this.hidestarttagcontainer(),
            t < v.starttagtimetoshowads - 10 && (v.starttagstartbannertime = 0,
            v.starttagstatus = !1)
        }
        ,
        this.hidestarttagcontainer = function() {
            return hide(o.starttagcontainer),
            v.starttagstatus = !0,
            v.starttagstartbannertime = 0,
            !1
        }
        ,
        !("starttag"in o.u) || "starttaginit" != t && "starttagtoggle" != t || "function" == typeof this[t] && this[t]()
    }
      , PauseBannerPlugin = function(t) {
        this.pausebannerinit = function() {
            if ("pausebannercontainer"in o)
                return !1;
            o.pausebannercontainer = createElement("div"),
            css(o.pausebannercontainer, {
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "inline-block",
                top: "0%",
                left: "0",
                background: "black"
            }),
            Banner(o.pausebannercontainer, o.u.pausebanner, 5, o.mediacontainer),
            hide(o.pausebannercontainer)
        }
        ,
        this.pausebannershow = function() {
            if ("pausebannercontainer"in o) {
                var t = o.pausebannercontainer.querySelectorAll("ins");
                t.length > 0 && Object.values(t).map((function(t) {
                    css(t, {
                        height: "100%",
                        width: "100%"
                    })
                }
                ));
                var e = o.pausebannercontainer.querySelectorAll("div[class*=epom]");
                e.length > 0 && css(e[0], {
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center"
                }),
                show(o.pausebannercontainer),
                hide(o.mediacontainer)
            }
        }
        ,
        this.pausebannerhide = function() {
            "pausebannercontainer"in o && (hide(o.pausebannercontainer),
            show(o.mediacontainer))
        }
        ,
        "pausebanner"in o.u && "function" == typeof this[t] && this[t]()
    }
      , VastVideo = function() {
        var vast, over = o.mousehere, no = ["desktop", "mobile", "mobiletv", "tv", "lg", "winmob"];
        o.vastcontainer = createElement("div"),
        css(o.vastcontainer, {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            "background-color": exist(v.vast_bgcolor) ? v.vast_bgcolor : "#000000"
        }),
        exist(v.vast_bga) || 1 == v.hidevideo && (v.vast_bga = .5),
        css(o.vastcontainer, {
            opacity: v.vast_bga
        }),
        o.frame.appendChild(o.vastcontainer),
        o.system.mobile || (o.vastcontainer.addEventListener("mouseover", onOver, !1),
        o.vastcontainer.addEventListener("mouseleave", onOut, !1));
        var tag = createElement("video"), duration, paused, controls, uiplay, uiplay2, uibuffer, uiposter, uit, uitxt, uimute, uiunmutebut, uiprogress, uix, uiskip, vpaidframe, vpaidslot, vpaidslot2, vpaid, vpaid_int, vpaidframe_int, vpaid_t, vpaid_stop_t, vpaid_complete_t, push_wait_int, video_t;
        o.vastcontainer.appendChild(tag),
        o.vastcontainer.style.zIndex = 1001,
        hide(o.vastcontainer),
        css(tag, {
            width: "100%",
            height: "100%",
            "object-fit": "contain",
            "min-height": "auto",
            "max-height": "none",
            "min-width": "auto",
            "max-width": "none"
        }),
        1 !== v.vpaid_waitstart && css(tag, {
            autoplay: 1
        }),
        attr(tag, {
            preload: "auto",
            "x-webkit-airplay": "deny",
            "webkit-playsinline": !0,
            cursor: "pointer",
            playsinline: "1",
            pip: "false"
        }),
        1 != v.vast_unmutehover && 1 != v.vast_unmutebut || (tag.muted = !0,
        attr(tag, {
            muted: "true"
        }));
        var vpaidvolume = 1, vpaidvolume2, vpaidstopped = !1, vpaidstarted = !1, vaststarted = !1, vpaidskipped = !1, vpaidcompleted = !1, vpaidvideostarted = !1, vpaidquartile = !1, vpaid_int2, removed = !1, last_skiptime = 0, last_time = 0, imgtime = 0, img_int, _move = !1, _go = !1, _muted = !1, muteicon = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path fill='" + v.vast_volumecolor + "' stroke-width='0' d='m2.49931,6.8746l0,6.25079l3.10029,0l4.64114,4.37461l0.00276,-15l-4.64182,4.37461l-3.10237,0l0,-0.00001zm10.44167,-0.75275c-0.26762,-0.30766 -0.69733,-0.30766 -0.96359,0.00158c-0.26557,0.30925 -0.26557,0.80989 0.00136,1.11992l0,-0.00157c0.58769,0.68334 0.94997,1.62056 0.94997,2.66218c0,1.04083 -0.3616,1.97489 -0.94861,2.65823c-0.2683,0.30766 -0.2683,0.8083 -0.00136,1.11912c0.13279,0.15423 0.30713,0.23173 0.48146,0.23173c0.17501,0 0.34934,-0.0775 0.48213,-0.23173c0.83216,-0.9649 1.34835,-2.30548 1.34767,-3.77735c0.00068,-1.47504 -0.51755,-2.8172 -1.34903,-3.7821l0,-0.00001zm1.55246,-1.75907c-0.27124,0.30979 -0.27124,0.81211 0,1.12031c1.00334,1.14962 1.62195,2.73104 1.62195,4.4852c0,1.75256 -0.61861,3.3332 -1.62056,4.48361c-0.27125,0.30899 -0.27125,0.81053 0,1.12031c0.13493,0.1545 0.31208,0.23214 0.48991,0.23214c0.17713,0 0.35428,-0.07764 0.48921,-0.23214c1.25105,-1.43327 2.02674,-3.41876 2.02536,-5.60392c0.00069,-2.18675 -0.775,-4.17383 -2.02813,-5.60551c-0.27194,-0.30979 -0.70857,-0.30979 -0.97774,0z'/></g></svg>", unmuteicon = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path fill='" + v.vast_volumecolor + "' stroke-width='0' d='m2.49931,6.8746l0,6.25079l3.10029,0l4.64114,4.37461l0.00276,-15l-4.64182,4.37461l-3.10237,0l0,-0.00001z'/><path d='m18.125,12.20836l-2.20816,-2.20816l2.20776,-2.20816l-1.13498,-1.13579l-2.20816,2.20816l-2.20816,-2.20816l-1.13498,1.13579l2.20776,2.20816l-2.20816,2.20816l1.13579,1.13539l2.20776,-2.20816l2.20776,2.20816' fill-opacity='null' stroke-opacity='null' stroke-width='0' fill='" + v.vast_volumecolor + "'/></g></svg>", impression = !1, remainigs = 0, unmute_volume = 0, slow_unmute, js_events, remove_t, complete_t, ytag, youtube = !1, vimeo = !1, mp3 = !1, ytinterval, imps = [], qrts = [], start_timeout = !0;
        if (1 !== v.vpaid_waitstart) {
            var pp = tag.play();
            void 0 !== pp && pp.then((function() {}
            )).catch((function(t) {
                t.message.indexOf("interact") > 0 && (log("play mute"),
                tag.muted = !0,
                attr(tag, {
                    muted: "true"
                }))
            }
            ))
        }
        function onOutSkip() {
            css(1 == v.vast_skip2right ? uiskip : uiprogress, {
                "background-color": hex2rgb(v.vast_skipbgcolor, existv(v.vast_skipbga, .5))
            })
        }
        function ImgLoaded() {
            imgtime = 0,
            duration = exist(vast.duration) ? vast.duration : 10,
            img_int = setInterval(onTimeupdate, 100),
            onTimeupdate(),
            Event("start", !0)
        }
        function PlayStart() {
            var t = tag.play();
            void 0 !== t && t.then((function() {}
            )).catch((function(t) {
                (log("playError VAST", t.message),
                1 == vast.pause_mute) ? (Pause(!0),
                o.actions.VastShow()) : die_error || removed || (onMute(),
                tag.play().then((function() {}
                )).catch((function(t) {
                    log("playError2 VAST", t.message),
                    Pause(!0),
                    o.actions.VastShow()
                }
                )))
            }
            )),
            video_t = setTimeout(tagTimeout, 1e3 * v.vast_timeout),
            vaststarted = !0
        }
        function vpaidframeloaded() {
            try {
                if (vpaidframe.contentWindow) {
                    clearInterval(vpaidframe_int),
                    js2("vpaidframeloaded");
                    var t = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0"><script type="text/javascript" src="' + vast.file + '"><\/script><script type="text/javascript">window.parent.postMessage("PJS_VPAID_LOADED","*");<\/script></body></html>';
                    window.addEventListener("message", waitVpaid),
                    vpaidframe.contentWindow.document.open(),
                    vpaidframe.contentWindow.document.write(t),
                    vpaidframe.contentWindow.document.close()
                }
            } catch (t) {
                log("VPAID frame error"),
                onError(901)
            }
        }
        function waitVpaid(t) {
            "PJS_VPAID_LOADED" == t.data && (window.removeEventListener("message", waitVpaid),
            initVpaid())
        }
        function initVpaid() {
            if (vpaidframe.contentWindow) {
                var t = vpaidframe.contentWindow.getVPAIDAd;
                t && "function" == typeof t && (vpaid = t()) ? Vpaid() : onError(900)
            }
        }
        function CheckMuteStart() {
            (0 == v.vast_volume || o.muted && 1 != v.vast_resound || 1 == vast.mute || 1 == v.vast_unmutehover && !o.mouseHere && !o.system.mobile || tag.muted || 0 == tag.volume) && -1 != vast.mute && onMute()
        }
        function startTimeout() {
            start_timeout = !1
        }
        function onLoadStart() {}
        this.break = function() {
            exist(uiplay) && (log("VAST break"),
            onError())
        }
        ,
        this.Go = function(x) {
            if (removed && show(tag),
            tag.volume = .4,
            duration = 0,
            paused = !1,
            controls = !0,
            impression = !1,
            remainigs = 0,
            removed = !1,
            last_time = 0,
            last_skiptime = 0,
            vast = x,
            die_error = !1,
            js_events = [],
            _go = !0,
            show(o.vastcontainer),
            exist(vast.extensions.controls) && (0 !== vast.extensions.controls && "0" !== vast.extensions.controls || (controls = !1)),
            1 != vast.nocontrols && 1 != v.vast_nocontrols || (1 == vast.nocontrolsvpaid ? vast.isVpaid && (controls = !1) : controls = !1),
            1 == vast.yescontrols && (controls = !0),
            o.controls && o.controls.SettingsVisible() && o.controls.Settings(),
            exist(vast.prt) && (vast.prtg = 1),
            vast.isVpaid && 1 == v.vast_novpaid)
                onError("NO VPAID");
            else {
                var stop = !1;
                if (exist(vast.file) && ((vast.file.indexOf("youtube.com/") > -1 || vast.file.indexOf("youtu.be/") > -1) && (youtube = !0),
                1 == v.vimeo && vast.file.indexOf("vimeo.com/") > -1 && (vimeo = !0),
                vast.file.indexOf(".mp3") > -1 && (mp3 = !0),
                "intro" == vast.adsystem))
                    for (var i = 0; i < no.length; i++)
                        if (vast.file.indexOf("[no_" + no[i] + "]") > -1 && (vast.file = vast.file.replace("[no_" + no[i] + "]", ""),
                        o.system[no[i]])) {
                            onError("no " + no[i]),
                            stop = !0;
                            break
                        }
                if (!stop) {
                    if ((vast.isImg || vast.isVpaid || youtube || vimeo) && (vpaidslot = createElement("div"),
                    o.vastcontainer.appendChild(vpaidslot),
                    css(vpaidslot, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%"
                    })),
                    youtube && (ytag = new MediaYoutube("intro" + vast.file,vpaidslot)),
                    vimeo && (ytag = new MediaVimeo("intro" + vast.file,vpaidslot)),
                    !youtube && !vimeo) {
                        var elm = vast.isImg ? vpaidslot : tag;
                        o.system.mobile ? (elm.removeEventListener("touchstart", onTouchStart),
                        elm.removeEventListener("touchmove", onTouchMove),
                        elm.removeEventListener("touchend", onScreenClick)) : elm.removeEventListener("click", onScreenClick);
                        var _clck = !0;
                        exist(vast.extensions.isClickable) && (_clck = 1 == vast.extensions.isClickable),
                        _clck && (o.system.mobile ? (elm.addEventListener("touchend", onScreenClick),
                        elm.addEventListener("touchstart", onTouchStart),
                        elm.addEventListener("touchmove", onTouchMove)) : (elm.addEventListener("click", onScreenClick),
                        css(elm, {
                            cursor: "pointer"
                        })))
                    }
                    if (RemoveInterface(),
                    uiplay = createElement("div"),
                    css(uiplay, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        display: "none",
                        cursor: "pointer",
                        "z-index": 1
                    }),
                    o.vastcontainer.appendChild(uiplay),
                    uiplay2 = createElement("div"),
                    css(uiplay2, {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        "margin-left": -10,
                        "margin-top": -10,
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.5)",
                        "border-radius": 20,
                        width: 20,
                        height: 20,
                        padding: "3px 2px 3px 4px",
                        zIndex: 1
                    }),
                    o.system.safari && o.system.desktop ? css(uiplay2, {
                        zoom: "3"
                    }) : css(uiplay2, {
                        transform: "scale(3)"
                    }),
                    uiplay2.innerHTML = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path d='m4.59375,3.48438l-0.03125,13.03125l10.875,-6.51563l-10.84375,-6.51562z' fill='#ffffff'/></g></svg>",
                    uiplay.appendChild(uiplay2),
                    uiplay.onclick = onScreenClick,
                    vast.companionImg && (uiposter = createElement("div"),
                    css(uiposter, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        background: "url(" + vast.companionImg + ") 50% 50% no-repeat",
                        "background-size": "contain"
                    }),
                    o.vastcontainer.appendChild(uiposter)),
                    uibuffer && RemoveControl("uibuffer"),
                    uibuffer = createElement("div"),
                    css(uibuffer, {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        pointerEvents: "none",
                        zIndex: 1
                    }),
                    v.control_buffer.icon && 0 != v.vast_buffering && (controlCSS(v.control_buffer.icon, v.control_buffer.color, uibuffer),
                    o.vastcontainer.appendChild(uibuffer),
                    v.control_buffer.scale && css(uibuffer, {
                        transform: "scale(" + v.control_buffer.scale + ")"
                    }),
                    css(uibuffer, {
                        "margin-left": -uibuffer.offsetWidth / 2,
                        "margin-top": -uibuffer.offsetHeight / 2
                    }),
                    vast.buffering = !0),
                    (controls || 1 == v.vast_title_important) && (0 == vast.introtitle || 1 == v.vast_title && (uit = createElement("div"),
                    css(uit, {
                        "font-size": existv(v.vast_title_size, 14) * existv(v.globalfs, 1),
                        color: v.vast_titlecolor,
                        position: "absolute",
                        top: existv(v.vast_title_top, 0),
                        left: existv(v.vast_title_left, 0),
                        "background-color": hex2rgb(v.vast_titlebgcolor, existv(v.vast_titlebga, 0)),
                        opacity: existv(v.vast_titlea, 1),
                        padding: "5px 8px 5px 8px",
                        "box-sizing": "border-box",
                        zIndex: 1
                    }),
                    o.vastcontainer.appendChild(uit),
                    vast.uititle = Lang("ads"),
                    exist(v.vast_title_text) && "" != v.vast_title_text && (vast.uititle = v.vast_title_text),
                    uit.innerHTML = vast.uititle + (1 == v["vast_" + o.vasttype + "_counter"] && o.adscounter <= o.adsinchain && o.adsinchain > 1 ? " " + o.adscounter + "/" + o.adsinchain : ""))),
                    controls) {
                        function onOutMute() {
                            css(uimute, {
                                background: hex2rgb(v.vast_volumebgcolor, existv(v.vast_volumebga, .5))
                            })
                        }
                        function onOverMute() {
                            css(uimute, {
                                background: hex2rgb(v.vast_volumebgcolor, existv(v.vast_volumebga, .5) + .3)
                            })
                        }
                        if (exist(vast.control_adlabel) && ("0" === vast.control_adlabel || "-1" === vast.control_adlabel ? css(uit, {
                            top: -1e3
                        }) : "1" !== vast.control_adlabel && ("TR" != vast.control_adlabel && "BR" != vast.control_adlabel || css(uit, {
                            right: 0,
                            left: "auto"
                        }),
                        "BR" != vast.control_adlabel && "BL" != vast.control_adlabel || css(uit, {
                            bottom: 0,
                            top: "auto"
                        }))),
                        exist(vast.extensions.linkTxt) ? o.system.mobile && 0 == v.vast_linktxtonmobile || "" == vast.extensions.linkTxt || (exist(uitxt) ? (show2(uitxt),
                        uitxt.innerHTML = vast.extensions.linkTxt) : (uitxt = createElement("div"),
                        css(uitxt, {
                            position: "absolute",
                            bottom: 50,
                            "margin-left": "auto",
                            "margin-right": "auto",
                            left: 0,
                            right: 0,
                            "font-size": existv(v.vast_linktxt_size, o.system.mobile ? 12 : 14) * existv(v.globalfs, 1),
                            color: v.vast_linktxtcolor,
                            display: "table",
                            width: "50%",
                            "text-align": "center",
                            zIndex: 1
                        }),
                        uitxt.innerHTML = "<pjspan style='background:" + hex2rgb(v.vast_linktxtbgcolor, 1) + ";padding:7px 15px;border-radius:20px;display:inline-block;cursor:pointer'>" + vast.extensions.linkTxt + "</pjspan>",
                        o.vastcontainer.appendChild(uitxt),
                        "" == vast.click && vast.isVpaid ? (css(uitxt.firstElementChild, {
                            "pointer-events": "none"
                        }),
                        css(uitxt, {
                            "pointer-events": "none"
                        })) : uitxt.firstElementChild.addEventListener("click", onInvite),
                        hide2(uitxt),
                        (o.mouseHere || o.system.mobile) && setTimeout((function() {
                            show2(uitxt)
                        }
                        ), 200))) : exist(uitxt) && hide2(uitxt),
                        uimute = createElement("div"),
                        css(uimute, {
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            "text-align": "center",
                            cursor: "pointer",
                            transform: "scale(1)",
                            "border-radius": 30,
                            height: 30,
                            width: 30,
                            "padding-top": 5,
                            "box-sizing": "border-box",
                            zIndex: 1,
                            transition: "background-color 0.2s linear"
                        }),
                        uimute.innerHTML = muteicon,
                        o.vastcontainer.appendChild(uimute),
                        uimute.onclick = onToggleMute,
                        uimute.addEventListener("mouseover", onOverMute),
                        uimute.addEventListener("mouseout", onOutMute),
                        onOutMute(),
                        exist(vast.control_soundbtn)) {
                            var tmp = vast.control_soundbtn;
                            "0" === tmp ? (hide(uimute),
                            css(uimute, {
                                top: -1e3
                            })) : "1" !== tmp && ("TR" == tmp && css(uimute, {
                                bottom: "auto",
                                top: 10,
                                right: 10
                            }),
                            "TL" == tmp && css(uimute, {
                                bottom: "auto",
                                top: 10,
                                right: "auto",
                                left: 10
                            }),
                            "BL" == tmp && css(uimute, {
                                bottom: 10,
                                right: "auto",
                                left: 10
                            }))
                        }
                        function onOutX(t) {
                            css(uix, {
                                "background-color": hex2rgb(v.vast_xbgcolor, existv(v.vast_xbga, .5))
                            })
                        }
                        if (uiprogress = createElement("div"),
                        o.vastcontainer.appendChild(uiprogress),
                        uiprogress.innerHTML = '<svg id="pljsvastprogress_' + v.id + '" width="20" height="20" viewPort="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg);float:left"><circle r="9" cx="10" cy="10" fill="transparent" stroke-dasharray="56.48" stroke-dashoffset="0" stroke-width="2" style="stroke:' + v.vast_progresscolor + ';opacity:0.3"></circle><circle id="pljsvastprogressbar_' + v.id + '" r="9" cx="10" cy="10" fill="transparent" stroke-dasharray="56.48" stroke-dashoffset="0" stroke-width="2" style="stroke:' + v.vast_progresscolor + ';opacity:0;-webkit-transform-origin: center center;transform-origin: center center;"></circle></svg>',
                        css(uiprogress, {
                            "border-radius": 30,
                            padding: 5,
                            overflow: "hidden",
                            height: "auto",
                            height: 20,
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            "transform-origin": "center center",
                            transition: "background-color 0.2s linear",
                            zIndex: 1,
                            "background-color": hex2rgb(v.vast_progressbgcolor, existv(v.vast_progressbga, .5))
                        }),
                        uiskip = createElement("div"),
                        css(uiskip, {
                            padding: "3px 10px 0 12px",
                            float: "left",
                            display: "inline-block",
                            "font-size": existv(v.vast_skip_size, 16) * existv(v.globalfs, 1),
                            color: v.vast_skipcolor,
                            visibilty: "hidden",
                            transition: "background-color 0.2s linear,opacity 0.2s linear",
                            display: "none",
                            zIndex: 1
                        }),
                        uiskip.innerHTML = Lang("skip"),
                        1 == v.vast_skip2right ? (o.vastcontainer.appendChild(uiskip),
                        css(uiskip, {
                            padding: 10,
                            float: "none"
                        }),
                        onOutSkip()) : uiprogress.appendChild(uiskip),
                        uix = createElement("div"),
                        css(uix, {
                            position: "absolute",
                            top: -100,
                            right: 0,
                            width: 40,
                            height: 40,
                            padding: 10,
                            opacity: 0,
                            visibilty: "hidden",
                            transition: "background-color 0.2s linear,opacity 0.2s linear",
                            cursor: "pointer",
                            "box-sizing": "border-box",
                            zIndex: 1
                        }),
                        uix.innerHTML = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path d='M19.25,0.75 L0.75,19.25 L19.25,0.75 Z' stroke='#FFFFFF' stroke-width='3' stroke-linecap='square' style='pointer-events:none'></path><path d='M0.75,0.75 L19.25,19.25 L0.75,0.75 Z' stroke='" + v.vast_xcolor + "' stroke-width='3' stroke-linecap='square'></path></g></svg>",
                        onOutX(),
                        o.vastcontainer.appendChild(uix),
                        uix.onclick = onClose,
                        uix.addEventListener("mouseover", (function() {
                            css(uix, {
                                "background-color": hex2rgb(v.vast_xbgcolor, existv(v.vast_xbga, .5) + .3)
                            })
                        }
                        )),
                        uix.addEventListener("mouseout", onOutX),
                        exist(vast.extensions) && exist(vast.extensions.skipTime) && vast.extensions.skipTime > 0 && vast.extensions.skipTime < 100 && (uiskip.innerHTML = Lang("skip_after_") + vast.extensions.skipTime,
                        css(uiskip, {
                            cursor: "default",
                            "font-size": existv(v.vast_skip2_size, 12) * existv(v.globalfs, 1),
                            display: "block"
                        })),
                        exist(vast.control_countdown) && 1 != v.vast_skip2right) {
                            var tmp = vast.control_countdown;
                            "0" === tmp || "-1" === tmp ? css(uiskip, {
                                bottom: -100
                            }) : "1" !== tmp && ("TR" == tmp && (css(uiprogress, {
                                bottom: "auto",
                                left: "auto",
                                top: 10,
                                right: 10
                            }),
                            css(uix, {
                                top: 0,
                                left: 0,
                                right: "auto"
                            })),
                            "TL" == tmp && css(uiprogress, {
                                bottom: "auto",
                                top: 10,
                                left: 10
                            }),
                            "BR" == tmp && css(uiprogress, {
                                left: "auto",
                                bottom: 10,
                                right: 10
                            }))
                        }
                        1 == v.vast_skip2right && (css(uimute, {
                            bottom: 10,
                            left: 50,
                            right: "auto"
                        }),
                        css(uiskip, {
                            float: "none",
                            position: "absolute",
                            bottom: v.vast_skip_bottom ? v.vast_skip_bottom : 10,
                            right: 0
                        }))
                    }
                    if (1 == v.vast_unmutebut) {
                        uiunmutebut = createElement("div"),
                        css(uiunmutebut, {
                            background: v.vast_unmutebutbgcolor,
                            padding: "11px 10px 6px 20px",
                            position: "absolute",
                            top: "50%",
                            left: -200,
                            "font-size": 16 * existv(v.globalfs, 1),
                            margin: "-20px 0 0 -5px",
                            color: v.vast_unmutebutcolor,
                            cursor: "pointer"
                        }),
                        uiunmutebut.style.zIndex = 9999,
                        o.vastcontainer.appendChild(uiunmutebut);
                        var unmutebuticon = muteicon
                          , rg = RegExp(v.vast_volumecolor, "g");
                        unmutebuticon = unmutebuticon.replace(rg, v.vast_unmutebutcolor),
                        uiunmutebut.innerHTML = Lang("unmute_video") + ' &nbsp; <span style="float:right;margin-top:-2px">' + unmutebuticon + "</span>",
                        uiunmutebut.onclick = onUnmute
                    }
                    if (js3("vast_system", vast.adsystem),
                    js3("vast_url", vast.vasturl),
                    js3("vast_info", VastInfo()),
                    vast.isImg)
                        if (hide2(uimute),
                        vast.isFrm) {
                            var frm = document.createElement("iframe");
                            frm.scrolling = "no",
                            frm.onload = ImgLoaded,
                            frm.src = vast.file,
                            css(frm, {
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                border: 0
                            }),
                            o.vastcontainer.appendChild(frm)
                        } else {
                            var image = new Image;
                            image.onload = function() {
                                vpaidslot.style.backgroundImage = "url('" + vast.file + "')",
                                vpaidslot.style.backgroundSize = "cover",
                                ImgLoaded()
                            }
                            ,
                            image.onerror = function() {
                                onError(405)
                            }
                            ,
                            image.src = vast.file
                        }
                    if (vpaidstopped = !1,
                    vpaidskipped = !1,
                    vpaidcompleted = !1,
                    vpaidstarted = !1,
                    vaststarted = !1,
                    vpaidvideostarted = !1,
                    vpaidquartile = !1,
                    vast.isVpaid)
                        if (vast.customVpaid)
                            vpaid = eval("new " + vast.customVpaid + "()"),
                            v.vpaid_slotinframe = 0,
                            Vpaid();
                        else {
                            vpaidframe = document.createElement("iframe"),
                            vpaidframe.id = "pljsvpaid",
                            vpaidframe.allow = "autoplay",
                            vpaidframe.scrolling = "no",
                            vpaidframe.setAttribute("allowFullScreen", ""),
                            1 == v.vpaid_slotinframe ? (css(vpaidframe, {
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                border: 0
                            }),
                            hide2(vpaidslot)) : css(vpaidframe, {
                                width: 0,
                                height: 0
                            }),
                            o.vastcontainer.appendChild(vpaidframe);
                            var base = document.createElement("base");
                            base.href = o.href,
                            vpaidframe.contentWindow && vpaidframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(base),
                            vpaidframe_int = setInterval(vpaidframeloaded, 100),
                            js2("vpaidframe"),
                            clearTimeout(vpaid_t),
                            vpaid_t = setTimeout(vpaidLoadTimeout, 1e3 * v.vast_timeout)
                        }
                    vast.isVpaid || vast.isImg || (youtube || vimeo ? CheckMuteStart() : (tag.addEventListener("loadstart", onLoadStart),
                    tag.addEventListener("error", onTagError),
                    tag.addEventListener("ended", onEnded),
                    tag.addEventListener("playing", onPlay),
                    tag.addEventListener("timeupdate", onTimeupdate),
                    tag.addEventListener("seeking", onSeeking),
                    tag.addEventListener("seeked", onSeeked),
                    tag.addEventListener("loadedmetadata", onMeta),
                    tag.addEventListener("volumechange", onVolume),
                    tag.addEventListener("waiting", onWaiting),
                    tag.addEventListener("durationchange", onDuration),
                    tag.addEventListener("progress", onProgress),
                    attr(tag, {
                        src: x.file
                    }),
                    -1 != v.vast_volume ? tag.volume = v.vast_volume : tag.volume = v.volume,
                    CheckMuteStart(),
                    1 != v.vpaid_waitstart ? PlayStart() : js("vast_readystart"))),
                    setTimeout(startTimeout, 500)
                }
            }
        }
        ,
        this.ytReady = function() {
            js3("vast_duration", duration = ytag.duration()),
            StopBuffering(),
            ytinterval = setInterval(this.timeUpdate, 500),
            (0 == v.vast_volume || o.muted || 1 == v.vast_unmutehover && !o.system.mobile) && onMute()
        }
        ,
        this.ytError = function() {
            onError()
        }
        ,
        this.ytWaiting = function() {
            onWaiting()
        }
        ,
        this.ytWaited = function() {
            StopBuffering()
        }
        ,
        this.ytEnded = function() {
            onEnded()
        }
        ;
        var die_error = !1;
        function onOver() {
            over || (uitxt && show2(uitxt),
            1 != v.vast_unmutehover || o.system.mobile || (onUnmute(),
            1 == v.vast_unmuteonce && (v.vast_unmutehover = 0))),
            over = !0
        }
        function onMeta() {
            tag.videoHeight > 0 && 1 == v.changeheight && 1 == v.changevastheight && o.actions.changeAspect(tag.videoWidth / tag.videoHeight, !0)
        }
        function onOut() {
            over && (uitxt && hide2(uitxt),
            1 != v.vast_unmutehover || o.system.mobile || (clearInterval(slow_unmute),
            onMute())),
            over = !1
        }
        function onTagError() {
            onError(4 == tag.error.code ? 403 : 405)
        }
        function onError(t) {
            if (!die_error && !removed) {
                if (die_error = !0,
                log("VAST video playing error " + t),
                vpaid)
                    for (var e in vpaidCallbacks)
                        vpaidCallbacks.hasOwnProperty(e) && vpaid.unsubscribe(vpaidCallbacks[e], e);
                Event("Error", !1, t > 0 ? t : 400),
                clearInterval(vpaid_int),
                clearInterval(vpaidframe_int),
                clearInterval(push_wait_int),
                RemoveTimeouts(),
                o.actions.VastError()
            }
        }
        function RemoveAndPlay() {
            Event("remove"),
            RemoveTimeouts(),
            removed || (removed = !0,
            o.actions.VastRemoveAndPlay())
        }
        function RemoveTimeouts() {
            clearTimeout(vpaid_t),
            clearTimeout(vpaid_stop_t),
            clearTimeout(vpaid_complete_t),
            clearTimeout(video_t)
        }
        function onEnded() {
            vpaidcompleted || Event("complete", !0),
            RemoveAndPlay()
        }
        function onClose() {
            Event("close", !0);
            var t = new Date;
            o.clicktime = t.getTime(),
            o.vastclick = !0,
            gaTracker("vast_skip", "VAST Skip"),
            1 == v["vast_" + o.vasttype + "skipor"] ? o.actions.VastNext() : RemoveAndPlay()
        }
        function onSkip() {
            var t = new Date;
            o.clicktime = t.getTime(),
            o.vastclick = !0,
            log("VAST Skip"),
            gaTracker("vast_skip", "VAST Skip"),
            !vpaidskipped && vpaid && vast.isVpaid ? (log("VPAID Skip request"),
            vpaid.skipAd()) : (Event("skipAd", !0),
            Event("skip", !0),
            1 == v["vast_" + o.vasttype + "skipor"] ? o.actions.VastNext() : RemoveAndPlay())
        }
        function onInvite() {
            Event("addClick"),
            Event("acceptInvitation", !1),
            onClick()
        }
        function onToggleMute() {
            _muted ? onUnmute() : onMute()
        }
        function onMute() {
            var t = !1;
            log((vast.isVpaid ? "VPAID" : "VAST") + " Mute"),
            youtube || vimeo ? ytag.Mute() : (clearInterval(slow_unmute),
            vast.isVpaid ? vpaid ? (vpaidvolume = vpaid.getAdVolume() > 0 ? vpaid.getAdVolume() : v.vast_volume,
            vpaid.setAdVolume(0)) : t = !0 : (Event("mute"),
            tag.muted = !0)),
            t || (Unmutebut(1),
            MuteIcon(!0))
        }
        function MuteIcon(t) {
            _muted = t,
            exist(uimute) && (uimute.innerHTML = t ? unmuteicon : muteicon)
        }
        function onUnmute() {
            var t = !1;
            youtube || vimeo ? (ytag.Unmute(),
            Event("unmute")) : vast.isVpaid ? vpaid ? (v.vpaid_mute_impression = 0,
            0 == unmute_volume && (unmute_volume = vpaidvolume) < .3 && (unmute_volume = v.vast_default_volume),
            vpaid.setAdVolume(0),
            tag.muted = !1,
            clearInterval(slow_unmute),
            slow_unmute = setInterval(SlowUnMute, 200)) : t = !0 : (tag.muted = !1,
            0 == unmute_volume && (unmute_volume = tag.volume) < .3 && (unmute_volume = v.vast_default_volume),
            tag.volume = 0,
            clearInterval(slow_unmute),
            slow_unmute = setInterval(SlowUnMute, 200)),
            t || (Unmutebut(0),
            MuteIcon(!1))
        }
        function Unmutebut(t) {
            var e = uiunmutebut;
            if (1 == v.vast_unmutebut && e) {
                var o = {
                    mc: e,
                    me: "uiunmutebut",
                    type: "left"
                };
                1 == t ? (show(e),
                o.to = 0) : (o.to = -200,
                o.hide = !0);
                new Motion(o)
            }
        }
        function SlowUnMute() {
            if (v.vast_volume = unmute_volume,
            vast.isVpaid) {
                var t = vpaid.getAdVolume();
                t < unmute_volume && t < .99 ? vpaid.setAdVolume(parseFloat(t) + .1) : (unmute_volume = 0,
                clearInterval(slow_unmute),
                Event("unmute"))
            } else
                tag.volume < unmute_volume && tag.volume < .95 ? tag.volume += .1 : (unmute_volume = 0,
                clearInterval(slow_unmute),
                Event("unmute"))
        }
        function onTouchStart() {
            _move = !1
        }
        function onTouchMove() {
            _move = !0
        }
        function onScreenClick() {
            var t = !1;
            o.system.mobile && _move && (t = !0),
            removed && (t = !0),
            t || (paused ? Resume() : onClick()),
            1 == v.vast_unmuteonclick && onUnmute()
        }
        function onClick(t) {
            if (!start_timeout) {
                var e = new Date;
                o.clicktime = e.getTime(),
                Event("click"),
                (1 == v.vast_addclick || t) && Event("addClick"),
                gaTracker("vast_click", "VAST Click");
                var i = !1;
                if (exist(vast.click) && "" != vast.click) {
                    for (var s = ["ref", "referer", "host"], n = 0; n < s.length; n++)
                        vast.click = vast.click.replace(new RegExp("\\(" + s[n] + "\\)","gi"), "host" == s[n] ? encodeURIComponent(o.domain) : Href());
                    js2("vast_clickurl", vast.click),
                    1 == v.vast_openclick && window.open(vast.click, "_blank"),
                    i = !0
                }
                1 == v.vast_pauseonclick ? Pause(i) : 1 == v.vast_closeonclick && i && o.actions.VastRemoveAndPlay(1 == v.vast_playonclick ? "" : "dontplay")
            }
        }
        function onPlay() {
            onTimeupdate(),
            Event("start", !0)
        }
        function onPause() {
            Pause(!0)
        }
        function Pause(t) {
            vast.isVpaid && vpaid && (vpaid.pauseAd(),
            controls && show2(uiplay),
            paused = !0),
            vast.isImg && (clearInterval(img_int),
            controls && show2(uiplay),
            paused = !0),
            vast.isVpaid || vast.isImg || t && (youtube || vimeo ? ytag.Pause() : tag.pause(),
            Event("pause"),
            show2(uiplay),
            paused = !0),
            uitxt && hide2(uitxt),
            StopBuffering()
        }
        function Resume() {
            paused && (vast.isVpaid && vpaid && (vpaid.resumeAd(),
            hide2(uiplay),
            paused = !1),
            vast.isImg && (img_int = setInterval(onTimeupdate, 100),
            onTimeupdate(),
            hide2(uiplay),
            paused = !1),
            vast.isVpaid || vast.isImg || (youtube || vimeo ? ytag.Play() : tag.play(),
            Event("resume"),
            hide2(uiplay),
            paused = !1),
            uitxt && show2(uitxt))
        }
        function CurrentTime() {
            var t = 0;
            return youtube || vimeo ? t = ytag.time() : vast.isImg ? (t = imgtime,
            imgtime += .1) : t = tag.currentTime,
            t
        }
        function CurrentVolume() {
            if (vast) {
                if (!vast.isVpaid)
                    return tag.muted ? 0 : tag.volume;
                if (vpaid) {
                    var t = -1;
                    try {
                        t = vpaid.getAdVolume()
                    } catch (t) {
                        log(t)
                    }
                    return t
                }
            }
        }
        function onTimeupdate(t) {
            if (tag && !removed) {
                var e = CurrentTime();
                if (impression || (onImpression(),
                impression = !0),
                qrts[0] || e > duration / 4 && (Event("firstQuartile", !0),
                qrts[0] = !0),
                qrts[1] || e > duration / 2 && (Event("midpoint", !0),
                qrts[1] = !0),
                qrts[2] || e > duration / 4 * 3 && (Event("thirdQuartile", !0),
                qrts[2] = !0),
                exist(vast.progresstimes))
                    for (var i = 0; i < vast.progresstimes.length; i++)
                        e >= vast.progresstimes[i] && Event("progress_" + vast.progresstimes[i], !0);
                onTimeupdateExtensions(e),
                e > 0 && e > last_time && StopBuffering(),
                null == o.vasttype && ("intro" == vast.adsystem && (o.vasttype = "preroll"),
                "outro" == vast.adsystem && (o.vasttype = "postroll")),
                vast.isImg && e > duration && onEnded(),
                last_time = e
            }
        }
        this.timeUpdate = function() {
            onTimeupdate()
        }
        ;
        var tu0 = !0;
        function onTimeupdateExtensions(t) {
            if (js3("vast_time", t),
            !(vast.isVpaid && tu0 && (tu0 = !1,
            t < duration - 2 && duration > 0))) {
                if (exist(vast.extensions)) {
                    if (exist(vast.events.sec) && !vpaidcompleted)
                        for (var e = 0; e < vast.events.sec.length; e++)
                            t >= vast.events.sec[e] && vast.events.sec[e] > -1 && (Event("second" + vast.events.sec[e], !0),
                            vast.events.sec[e] -= 1e3);
                    UpdateSkipTimes(t)
                }
                if (controls && duration > 0) {
                    var o = parseInt(t / duration * 100)
                      , i = document.getElementById("pljsvastprogressbar_" + v.id);
                    if (i)
                        if (isNaN(o))
                            o = 100;
                        else {
                            var s = i.getAttribute("r")
                              , n = Math.PI * (2 * s);
                            o < 0 && (o = 0),
                            o > 100 && (o = 100),
                            css(i, {
                                opacity: 1,
                                strokeDashoffset: (100 - o) / 100 * n
                            })
                        }
                }
            }
        }
        function UpdateSkipTimes(t) {
            var e;
            exist(vast.extensions) && controls && t >= last_skiptime && (exist(vast.extensions.skipTime) && vast.extensions.skipTime > -1 && vast.extensions.skipTime < 100 && uiskip && (e = !0,
            t > vast.extensions.skipTime ? (js3("vast_skipTime", vast.extensions.skipTime),
            ShowSkip(),
            vast.extensions.skipTime = null) : uiskip.innerHTML = Lang("skip_after_") + Math.round(vast.extensions.skipTime - t)),
            exist(vast.extensions.skipTime2) && vast.extensions.skipTime2 > -1 && (e && vast.extensions.skipTime2 < vast.extensions.skipTime && (vast.extensions.skipTime2 = vast.extensions.skipTime),
            t > vast.extensions.skipTime2 && (js3("vast_skipTime2", vast.extensions.skipTime2),
            Event("skipTime2"),
            uix && css(uix, {
                top: 0,
                opacity: 1,
                display: "block"
            }),
            vast.extensions.skipTime2 = null)),
            last_skiptime = t)
        }
        function ShowSkip() {
            uiskip && !removed && (uiskip.innerHTML = Lang("skip"),
            css(uiskip, {
                cursor: "pointer",
                "font-size": (v.vast_skip_size ? v.vast_skip_size : 16) * existv(v.globalfs, 1),
                display: "block"
            }),
            1 == v.vast_skip2right ? (uiskip.onclick = onSkip,
            uiskip.addEventListener("mouseover", (function() {
                css(uiskip, {
                    "background-color": hex2rgb(v.vast_skipbgcolor, existv(v.vast_skipbga, .5) + .3)
                })
            }
            )),
            uiskip.addEventListener("mouseout", onOutSkip)) : uiprogress && (css(uiprogress, {
                cursor: "pointer"
            }),
            uiprogress.onclick = onSkip,
            uiprogress.addEventListener("mouseover", (function() {
                css(uiprogress, {
                    "background-color": hex2rgb(v.vast_skipbgcolor, existv(v.vast_skipbga, .5) + .3)
                })
            }
            )),
            onOutSkip(),
            uiprogress.addEventListener("mouseout", onOutSkip)))
        }
        function onSeeking() {}
        function onSeeked() {}
        function onImpression() {
            die_error || removed || (Event("Impression", !0),
            Event("Impress", !0),
            Event("creativeView", !0),
            gaTracker("vast_impression", "VAST Impression"),
            ImpressionActions())
        }
        function ImpressionActions() {
            var t = "intro" == vast.adsystem || "outro" == vast.adsystem ? "intro" : o.vasttype;
            o.actions.VastImpression(1 == vast.skipimp),
            v["vast_" + t + "timebreak"] > 0 && StoreImpression(t),
            o.vast_impressions++,
            o.vast_impressions_all++,
            o.vast_longtomsg && o.vast_longtomsg.remove(),
            _muted && Unmutebut(1),
            impression = !0,
            1 == o.vast_stop && (o.vast_stop = 2),
            o.vast_poster && hide2(o.vast_poster),
            StopBuffering()
        }
        function onDuration() {
            Event("AdLoaded", !0),
            js3("vast_duration", duration = tag.duration)
        }
        function onVolume() {
            js3("vast_volume", VastInfo())
        }
        function onProgress(t) {}
        var vpaidCallbacks = {
            AdStarted: vpaidStartAd,
            AdStopped: vpaidStopAd,
            AdSkipped: vpaidSkipAd,
            AdLoaded: vpaidAdLoaded,
            AdLinearChange: vpaidAdLinearChange,
            AdSizeChange: vpaidAdSizeChange,
            AdExpandedChange: vpaidAdExpandedChange,
            AdSkippableStateChange: vpaidAdSkippableStateChange,
            AdDurationChange: vpaidAdDurationChange,
            AdRemainingTimeChange: vpaidAdRemainingTimeChange,
            AdVolumeChange: vpaidAdVolumeChange,
            AdImpression: vpaidAdImpression,
            AdClickThru: vpaidAdClickThru,
            AdInteraction: vpaidAdInteraction,
            AdVideoStart: vpaidAdVideoStart,
            AdVideoFirstQuartile: vpaidAdVideoFirstQuartile,
            AdVideoMidpoint: vpaidAdVideoMidpoint,
            AdVideoThirdQuartile: vpaidAdVideoThirdQuartile,
            AdVideoComplete: vpaidAdVideoComplete,
            AdUserAcceptInvitation: vpaidAdUserAcceptInvitation,
            AdUserMinimize: vpaidAdUserMinimize,
            AdUserClose: vpaidAdUserClose,
            AdPaused: vpaidAdPaused,
            AdPlaying: vpaidAdPlaying,
            AdError: vpaidAdError,
            AdErrorVpaid: vpaidAdErrorVpaid,
            AdLog: vpaidAdLog,
            AdViewable: vpaidAdViewable
        };
        function Vpaid() {
            if ("function" == typeof vpaid.handshakeVersion) {
                for (var e in vpaidCallbacks)
                    vpaidCallbacks.hasOwnProperty(e) && vpaid.subscribe(vpaidCallbacks[e], e, this);
                if (vast.vpdevnts)
                    for (var i = 0; i < vast.vpdevnts.length; i++)
                        "" != vast.vpdevnts[i] && (eval("function pjsvpd_" + vast.vpdevnts[i] + "(){Event('" + vast.vpdevnts[i] + "');}"),
                        vpaid.subscribe(eval("pjsvpd_" + vast.vpdevnts[i]), vast.vpdevnts[i], this));
                1 == v.vpaid_slotinframe && vpaidframe && (vpaidslot2 = document.createElement("div"),
                vpaidframe.contentDocument.body.appendChild(vpaidslot2),
                css(vpaidslot2, {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer"
                })),
                vpaid.initAd(o.screen_w, o.screen_h, o.fullscreen ? "fullscreen" : "normal", 720, exist(vast.adparameters) ? {
                    AdParameters: vast.adparameters
                } : "", {
                    slot: 1 == v.vpaid_slotinframe ? vpaidslot2 : vpaidslot,
                    videoSlot: tag,
                    videoSlotCanAutoPlay: !0
                }),
                css(vpaidslot, {
                    cursor: "pointer"
                }),
                vpaidslot.style.zIndex = 0
            } else
                log("VPAID incorrect"),
                onError(901)
        }
        function vpaidAdLog(t) {
            log("VPAID Log: " + t)
        }
        function vpaidAdViewable() {
            Event("viewable", !0)
        }
        function vpaidAdError(t) {
            vpaidcompleted ? (log("VPAID Error but completed", t),
            vpaidStopAd()) : (log("VPAID Error", t),
            "object" == typeof t && 1 == v.log && console.log(t),
            onError(901))
        }
        function vpaidAdErrorVpaid(t) {
            vpaidcompleted || (log("VPAID Error", t),
            Event("Error", !1, t > 0 ? t : 400))
        }
        function vpaidAdLoaded() {
            1 == v["vast_" + o.vasttype + "normal"] && o.fullscreen && o.actions.Normalscreen(),
            log("VPAID Loaded, ad " + vpaid.getAdLinear()),
            Event("AdLoaded", !0),
            "nonlinear" != vpaid.getAdLinear() ? (1 != v.vpaid_waitstart ? (StartVpaidVolume(),
            clearTimeout(vpaid_t),
            vpaid_t = setTimeout(vpaidVideoTimeout, 1e3 * v.vpaid_timeout),
            vpaid.startAd()) : js("vast_readystart"),
            clearInterval(vpaid_int2),
            vpaid_int2 = setInterval(vpaidAdRemainingTimeChange, 1e3),
            vpaidAdRemainingTimeChange()) : vpaidAdError("Nonlinear")
        }
        function StartVpaidVolume() {
            vpaid && (0 == v.vast_volume || 1 == vast.mute || 1 == v.vast_unmutehover && !o.system.mobile && 1 != o.mouseHere ? vpaid.getAdVolume() > 0 && -1 != vast.mute && onMute() : -1 != v.vast_volume ? vpaid.setAdVolume(parseFloat(v.vast_volume)) : vpaid.setAdVolume(parseFloat(v.volume)))
        }
        function StopBuffering() {
            vast.buffering && (uibuffer && hide2(uibuffer),
            vast.buffering = !1,
            clearInterval(push_wait_int))
        }
        function onWaiting() {
            uibuffer && show2(uibuffer),
            vast.buffering = !0,
            1 == v.vast_push_waiting && (clearInterval(push_wait_int),
            push_wait_int = setInterval(PushWaiting, 1500))
        }
        function PushWaiting() {
            UpdateSkipTimes(last_skiptime += 1)
        }
        function vpaidStartAd() {
            vpaidstarted = !0,
            1 != v.vpaidvideotimeout && (vpaidvideostarted = !0),
            duration = vpaid.getAdDuration();
            var t, e = vpaid.getAdRemainingTime();
            duration > 0 || exist(vast.duration) && vast.duration >= e && (duration = vast.duration),
            duration >= 5e3 && (duration /= 1e3),
            js3("vast_duration", duration),
            o.vast_poster && hide2(o.vast_poster),
            js_events = [],
            imps = [],
            qrts = [],
            log("VPAID Started"),
            indOf([vast.wrapper, vast.vasturl], "pjsvvs=1") && (t = !0),
            1 == v.vast_visibleonstart && !vast.skipimp && !t && o.actions.VpaidStarted(),
            Event("creativeView", !0),
            StopBuffering()
        }
        function vpaidVideoTimeout() {
            vpaidvideostarted || die_error || (log("VPAID timeout"),
            js3("vpaid_video_timeout", VastInfo()),
            onError(901))
        }
        function vpaidQuartileTimeout() {
            vpaidquartile || die_error || 0 == v.vpaid_mute_impression && paused || (log("VPAID quartile timeout"),
            js3("vpaid_quartile_timeout", VastInfo()),
            onError(901))
        }
        function vpaidStoppedTimeout() {
            vpaidstopped || die_error || 0 == v.vpaid_mute_impression && paused || (log("VPAID stopped timeout"),
            js3("vpaid_stopped_timeout", VastInfo()),
            removed || (impression ? vpaidStopAd() : onError(901)))
        }
        function tagTimeout() {
            tag && (die_error || 0 != tag.currentTime || 0 != duration || (log("VAST video loading timeout"),
            js3("vast_video_timeout", VastInfo()),
            onError(402)))
        }
        function vpaidLoadTimeout() {
            vpaidvideostarted || die_error || 1 == v.vpaid_waitstart || (log("VPAID loading timeout"),
            js3("vpaid_loading_timeout", VastInfo()),
            onError(901))
        }
        function vpaidStopAd() {
            removed || vpaidstopped || (log("VPAID Stopped"),
            vpaidstopped = !0,
            removed || impression ? vpaidcompleted || vpaidskipped ? RemoveAndPlay() : remove_t = setTimeout(RemoveAndPlay, 200) : (vpaidstarted && duration > 0 && remainigs > 75 && exist(vast.prt) && vpaidImpression(),
            log("VPAID No impression --\x3e Error (" + remainigs + ")"),
            onError(901)))
        }
        function vpaidSkipAd() {
            log("VPAID Skipped"),
            vpaidskipped = !0,
            onSkip()
        }
        function vpaidAdSizeChange() {
            log("VPAID SizeChanged: " + vpaid.getAdWidth() + " x " + vpaid.getAdHeight()),
            vpaid.getAdHeight() > 0 && vpaid.getAdWidth() > 0 && 1 == v.changeheight && 1 == v.changevastheight && o.actions.changeAspect(vpaid.getAdWidth() / vpaid.getAdHeight(), !0)
        }
        function vpaidAdExpandedChange() {
            log("VPAID ExpandedChange: " + vpaid.getAdExpanded())
        }
        function vpaidAdSkippableStateChange() {
            controls && (log("VPAID AdSkippableStateChange: " + vpaid.getAdSkippableState()),
            vpaid.getAdSkippableState() ? ShowSkip() : hide2(uiskip))
        }
        function vpaidAdDurationChange() {
            log("VPAID DurationChanged: " + vpaid.getAdDuration()),
            vpaid.getAdDuration() > 0 && js3("vast_duration", duration = vpaid.getAdDuration())
        }
        function vpaidAdRemainingTimeChange(t) {
            var e = vpaid.getAdDuration();
            t && clearInterval(vpaid_int2);
            var o = vpaid.getAdRemainingTime();
            e > 0 && e != duration && vpaidAdDurationChange(),
            remainigs++,
            (0 == duration || o > duration) && o > 0 && js3("vast_duration", duration = o),
            o > 0 ? duration > 0 && onTimeupdateExtensions(duration - o) : 1 == v.vpaid_noremainingtime && (log("VPAID time", remainigs - 1, o, duration),
            onTimeupdateExtensions(remainigs - 1))
        }
        function vpaidAdVolumeChange() {
            null != vpaid.getAdVolume() && (0 == vpaid.getAdVolume() ? (Event("mute"),
            vpaidvolume2 = 0,
            MuteIcon(!0)) : (0 == vpaidvolume2 && (Event("unmute"),
            MuteIcon(!1)),
            vpaidvolume2 = vpaid.getAdVolume())),
            log("VPAID VolumeChanged: " + vpaid.getAdVolume()),
            vpaidvolume2 > 0 && 1 == v.vpaid_mute_impression && !impression && onMute()
        }
        function vpaidAdImpression() {
            1 != vast.vpaidImOnVdSrt && vpaidImpression()
        }
        function vpaidImpression() {
            vpaidcompleted = !1,
            log("VPAID Impression", duration),
            Event("Impression"),
            Event("Impress"),
            ImpressionActions(),
            gaTracker("vast_impression", "VAST Impression"),
            v.vpaid_timeout2 > -1 && (clearTimeout(vpaid_t),
            vpaid_t = setTimeout(vpaidVideoTimeout, 1e3 * v.vpaid_timeout2)),
            1 == v.vpaid_mute_impression && onMute()
        }
        function vpaidAdClickThru(t, e, o) {
            log("VPAID ClickThru"),
            exist(t) && "string" == typeof t && t.indexOf("//") > -1 && 1 == o && (vast.click = t),
            exist(vast.extensions.isClickable) ? 1 == vast.extensions.isClickable ? onClick(!0) : (Event("click"),
            Event("addClick")) : onClick(!0)
        }
        function vpaidAdInteraction() {}
        function vpaidAdVideoStart() {
            1 == vast.vpaidImOnVdSrt && vpaidImpression(),
            log("VPAID AdVideoStart"),
            o.actions.VpaidStarted(),
            vpaidvideostarted = !0,
            clearTimeout(vpaid_t),
            v.vpaid_timeout3 > -1 && (vpaid_t = setTimeout(vpaidQuartileTimeout, 1e3 * v.vpaid_timeout3)),
            clearTimeout(vpaid_stop_t),
            v.vpaid_timeout4 > -1 && (vpaid_stop_t = setTimeout(vpaidStoppedTimeout, 1e3 * v.vpaid_timeout4)),
            1 == v.vpaid_mute_impression && onMute(),
            Event("start", !1),
            o.vpaid_starts++,
            v.vpaid_startlimit > 0 && o.vpaid_starts > v.vpaid_startlimit && (log("VPAID start limit"),
            onError())
        }
        function vpaidAdVideoFirstQuartile() {
            vpaidquartile = !0,
            log("VPAID firstQuartile"),
            Event("firstQuartile", !1)
        }
        function vpaidAdVideoMidpoint() {
            log("VPAID midpoint"),
            Event("midpoint", !1)
        }
        function vpaidAdVideoThirdQuartile() {
            log("VPAID thirdQuartile"),
            Event("thirdQuartile", !1)
        }
        function vpaidAdVideoComplete() {
            if (!vpaidcompleted) {
                for (var t in Event("complete", !1),
                vpaidcompleted = !0,
                vast.events)
                    vast.events.hasOwnProperty(t) && 0 == t.indexOf("old_") && (vast.events[t.substr(4)] = vast.events[t]);
                if (exist(vast.events.sec))
                    for (var e = 0; e < vast.events.sec.length; e++)
                        vast.events.sec[e] += 1e3;
                v.vpaid_timeout5 > -1 && (clearTimeout(vpaid_complete_t),
                vpaid_complete_t = setTimeout(vpaidStoppedTimeout, 1e3 * v.vpaid_timeout5))
            }
            log("VPAID complete")
        }
        function vpaidAdLinearChange() {
            log("VPAID linear has changed: " + vpaid.getAdLinear())
        }
        function vpaidAdUserAcceptInvitation() {
            Event("acceptInvitation", !1)
        }
        function vpaidAdUserMinimize() {}
        function vpaidAdUserClose() {
            var t = new Date;
            o.clicktime = t.getTime(),
            Event("close", !0),
            o.vastclick = !0,
            gaTracker("vast_skip", "VAST Skip")
        }
        function vpaidAdPaused() {
            vast.isVpaid && vpaidcompleted || (Event("pause"),
            1 == v.vpaid_nopause ? vpaid.resumeAd() : (controls && 1 == v.vast_pauseonclick && show2(uiplay),
            paused = !0))
        }
        function vpaidAdPlaying() {
            Event("resume"),
            controls && exist(uiplay) && hide2(uiplay),
            paused = !1
        }
        function StoreImpression(t) {
            if (v["vast_" + t + "timebreak"] > 0 && o.storage) {
                var e = 1 * localStorage.getItem("pljs" + t + "i_" + o.d)
                  , i = !1;
                if (e ? e + 1 >= v["vast_" + t + "tbimp"] && (i = !0) : e = 0,
                i || o.vast_impressions_all + 1 >= v["vast_" + t + "tbimp"]) {
                    var s = new Date;
                    localStorage.setItem("pljs" + t + "_" + o.d, s.getTime()),
                    localStorage.setItem("pljs" + t + "i_" + o.d, 0),
                    o.actions.EmptyVastUrl()
                } else
                    localStorage.setItem("pljs" + t + "i_" + o.d, e + 1)
            }
        }
        function Event(t, e, i, s) {
            if ("start" == t && (o.vast_started = !0,
            1 == v.miniwithvast && o.minify && o.minify.Check()),
            exist(vast.prt) && 0 == v.eventstrackervast && 1 != v.vpaid || (e ? (exist(js_events[t]) || js3("vast_" + t, VastInfo()),
            js_events[t] = !0) : js3("vast_" + t, i > 0 ? i : VastInfo())),
            exist(vast.events) && exist(vast.events[t])) {
                log("VAST Event " + t);
                for (var n = 0; n < vast.events[t].length; n++) {
                    var a = vast.events[t][n]
                      , r = !1;
                    if (exist(a)) {
                        if (imps.indexOf(a) > -1 && (r = !0),
                        "Impression" == t && imps.push(a),
                        i > 0 && (a.indexOf("[ERRORCODE]") > 0 ? a = a.replace("[ERRORCODE]", i) : 1 == s && (r = !0)),
                        a.indexOf("(visibility)") > 0 && exist(o.visibility) && (a = a.replace("(visibility)", o.visibility)),
                        a.indexOf("(volume)") > 0 && (a = a.replace("(volume)", CurrentVolume())),
                        (a = (a = a.replace("(adblock)", o.ab ? 1 : 0)).replace(/\(random\)/g, Math.random())).indexOf(".pjstat") > 0) {
                            a = a + "&m=" + (o.system.tv ? 2 : o.system.mobile ? 1 : 0) + "&h=" + (exist(v.parent_domain) ? v.parent_domain : o.domain) + ("overlay" == o.vasttype || vast.isFrm ? "&r=1" : "") + "&s=" + o.sessid
                        }
                        if ("object" == typeof v.vast_replace)
                            for (var l in v.vast_replace)
                                if (v.vast_replace.hasOwnProperty(l))
                                    for (var d = 0; d < 5; d++)
                                        a = a.replace(l, v.vast_replace[l])
                    } else
                        r = !0;
                    r || gif(a)
                }
                e && (vast.events["old_" + t] = vast.events[t],
                vast.events[t] = void 0)
            }
            "click" == t && 1 == v.vast_addclick && Event("addClick")
        }
        function js2(t) {
            "intro" != vast.adsystem && "outro" != vast.adsystem && js(t)
        }
        function js3(t, e) {
            exist(vast.prt) && 0 == v.eventstrackervast && 1 != v.vpaid || "intro" == vast.adsystem || "outro" == vast.adsystem || js(t, e)
        }
        function RemoveInterface() {
            if (RemoveControl("uiplay"),
            tag && tag.played.length > 0 && tag.pause(),
            controls && o.vastcontainer.contains(uix)) {
                1 == v.vast_title && RemoveControl("uit");
                for (var t = ["uiprogress", "uiskip", "uix", "uitxt", "uitxt", "uimute", "uiposter", "uiunmutebut"], e = 0; e < t.length; e++)
                    RemoveControl(t[e])
            }
        }
        function RemoveControl(x) {
            exist(eval(x)) && o.vastcontainer.contains(eval(x)) && ("uitxt" == x && uitxt.removeEventListener("click", onInvite),
            o.vastcontainer.removeChild(eval(x)),
            eval(x + " = null;"))
        }
        function VpaidSetStartAd() {
            vast.isVpaid ? !vpaidstarted && vpaid && vpaid.startAd() : !vaststarted && PlayStart()
        }
        this.config = function(t) {
            return !!vast && vast[t]
        }
        ,
        this.tagLive = function() {
            var t = !1;
            if (tag && tag.parentElement)
                try {
                    "hdvbplayer" == tag.parentElement.nodeName && (t = !0)
                } catch (e) {
                    t = !1
                }
            return (!vast || !vast.isVpaid) && t
        }
        ,
        this.info = function(t) {
            return !!vast && vast[t]
        }
        ,
        this.active = function() {
            return !removed
        }
        ,
        this.Resize = function() {
            vast && vast.isVpaid && vpaid && vpaid.resizeAd(o.screen_w, o.screen_h, o.fullscreen ? "fullscreen" : "normal")
        }
        ,
        this.getVolume = function() {
            return CurrentVolume()
        }
        ,
        this.pause = function() {
            return !(removed || paused || !vast) && (Pause(!0),
            !0)
        }
        ,
        this.resume = function() {
            return !(removed || !paused || !vast) && (Resume(),
            !0)
        }
        ,
        this.VpaidSet = function(t, e) {
            vast && ("setAdVolume" == t && (0 == e ? onMute() : onUnmute()),
            "stopAd" == t && RemoveAndPlay(),
            "startAd" == t && VpaidSetStartAd(),
            "skipAd" == t && onSkip(),
            "pauseAd" == t && onPause(),
            "resumeAd" == t && onPlay())
        }
        ,
        this.startAd = function() {
            1 != v.vpaid_waitstart || vpaidstarted || (vast.isVpaid && vpaid && StartVpaidVolume(),
            VpaidSetStartAd())
        }
        ,
        this.mute = function() {
            onMute()
        }
        ,
        this.imp = function(t) {
            if (impression && !removed)
                for (var e = t.split(","), o = 0; o < e.length; o++)
                    gif(e[o])
        }
        ,
        this.RemoveForNextAd = function() {
            if ((youtube || vimeo) && (clearInterval(ytinterval),
            ytag.Remove()),
            vast) {
                if (RemoveInterface(),
                vast.isVpaid) {
                    if (exist(vpaidslot)) {
                        if (!vpaidstopped && vpaid && vpaidstarted)
                            try {
                                vpaid.stopAd()
                            } catch (t) {
                                log(t)
                            }
                        if (vpaid)
                            for (var t in vpaidCallbacks)
                                vpaidCallbacks.hasOwnProperty(t) && vpaid.unsubscribe(vpaidCallbacks[t], t);
                        o.vastcontainer.contains(vpaidslot) && 1 != vast.hidevpaid && o.vastcontainer.removeChild(vpaidslot)
                    }
                    if (clearInterval(vpaid_int),
                    clearInterval(vpaid_int2),
                    clearInterval(vpaidframe_int),
                    clearInterval(push_wait_int),
                    RemoveTimeouts(),
                    1 != vast.hidevpaid && vpaidframe)
                        try {
                            o.vastcontainer.removeChild(vpaidframe)
                        } catch (t) {}
                } else
                    hide(tag);
                onWaiting()
            }
            exist(vpaidslot) && (clearInterval(img_int),
            o.vastcontainer.contains(vpaidslot) && 1 != vast.hidevpaid && o.vastcontainer.removeChild(vpaidslot)),
            vast && (vast.events = []),
            removed = !0,
            impression = !1,
            remainigs = 0,
            mp3 = !1,
            imps = [],
            qrts = []
        }
        ,
        this.waitGo = function(t) {
            vast = t
        }
        ,
        this.Remove = function() {
            try {
                o.vastcontainer.contains(tag) && o.vastcontainer.removeChild(tag)
            } catch (t) {}
            this.RemoveForNextAd(),
            removed = !0;
            try {
                o.frame.contains(o.vastcontainer) && 1 != vast.hidevpaid && o.frame.removeChild(o.vastcontainer),
                1 == vast.hidevpaid && hide2(o.vastcontainer)
            } catch (t) {}
        }
    }
      , Settings = function(is) {
        var i, style = [], f = [], fbg = [], fimg = [], ftitle = [], fvalue = [], faction = [], f2 = [], f2bg = [], f2img = [], f2title = [], f2value = [], f2action = [], stout = [], is_visible = !1, open_action, open_settings = -1, empty = !0, key = is, playlist, shuffle = [], shuffle_ = [], plid = "", plfolder = "", plx = -1, sub_settings_on = !1, sub_settings = !1, autonextopenfolder = !1, autoprevopenfolder = !1, justshow = !1, removed = !1, showinterval, arrinterval, wheelinterval, hidetimeout, settimer, shr = [], clr = [], iclr = 0, _cstm = 0, evntclk = "click", evntovr = o.system.mobile ? "touchstart" : "mouseover", evntout = o.system.mobile ? "touchend" : "mouseout";
        style = UpdateObject(style, v[is]),
        style = MarginPadding(v[is], "margin", "margin"),
        0 == style.marginbg && (style.marginbgpadding = "0 0 0 0"),
        style = MarginPadding(v[is], "bgpadding", "marginbgpadding"),
        style = MarginPadding(v[is], "padding", "padding"),
        style.scrollwidth = 0;
        var _activeIcon = "<svg style='margin-top:3px' width='" + 2 * style.activeiconsize + "' height='" + (2 * style.activeiconsize > style.valuefontsize ? 2 * style.activeiconsize : style.valuefontsize) + "' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><ellipse ry='" + style.activeiconsize + "' rx='" + style.activeiconsize + "' cy='" + (2 * style.activeiconsize > style.valuefontsize ? style.activeiconsize : style.valuefontsize / 2) + "' cx='" + style.activeiconsize + "' fill='#" + style.valuecolor + "'/></g></svg>"
          , _xIcon = "<svg width='" + 2 * style.activeiconsize + "' height='" + style.valuefontsize + "' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' ><g><ellipse ry='" + (style.activeiconsize - 1) + "' rx='" + (style.activeiconsize - 1) + "' cy='" + (style.valuefontsize / 2 + 2) + "' cx='" + style.activeiconsize + "' stroke='#" + style.valuecolor + "' stroke='1' fill-opacity='0'/></g></svg>"
          , xx = 4
          , _nextIcon = "<hdvbplayer style='display:inline-block;'><svg width='" + (xx + 2) + "' height='" + style.valuefontsize + "' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><line x1='1' y1='" + (style.valuefontsize / 2 - xx) + "' x2='" + xx + "' y2='" + style.valuefontsize / 2 + "' stroke='#" + style.color + "' stroke-width='1' stroke-linecap='round'/><line x1='" + xx + "' y1='" + style.valuefontsize / 2 + "' x2='1' y2='" + (style.valuefontsize / 2 + xx) + "' stroke='#" + style.color + "' stroke-width='1' stroke-linecap='round'/></g></svg></hdvbplayer>"
          , _prevIcon = "<hdvbplayer style='display:inline-block;'><svg width='" + (xx + 10) + "' height='" + (style.valuefontsize + 1) + "' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' style='float:left'><g><line x1='1' y1='" + (style.valuefontsize / 2 + 2) + "' x2='" + xx + "' y2='" + (style.valuefontsize / 2 - xx + 2) + "' stroke='#" + style.color + "' stroke-width='1' stroke-linecap='round' /><line x1='1' y1='" + (style.valuefontsize / 2 + 2) + "' x2='" + xx + "' y2='" + (style.valuefontsize / 2 + xx + 2) + "' stroke='#" + style.color + "' stroke-width='1' stroke-linecap='round'/></g></svg></hdvbplayer>"
          , bordercolor = "rgba(" + (style.bordercolor ? hexToRgb(style.bordercolor.replace("#", "")) : "") + "," + existv(style.brda, 1) + ")"
          , container = createElement("div");
        o.frame.appendChild(container),
        css(container, {
            overflow: "hidden",
            display: "block",
            opacity: 0,
            "border-radius": style.rounding
        });
        var mpi = {};
        for (var i in o.menuproc)
            o.menuproc.hasOwnProperty(i) && (mpi[o.menuproc[i]] = -1);
        container.style.zIndex = "settings" == is ? 100 : 99;
        var control = createElement("div"), downi, downin;
        if (o.small && (style.smallfontsize > 0 && (style.fontsize = style.smallfontsize),
        style.floatwidthsmall > 0 && (style.floatwidth = style.floatwidthsmall),
        style.floatheightsmall > 0 && (style.floatheight = style.floatheightsmall)),
        css(control, {
            position: "relative",
            top: 0,
            left: 0,
            display: "block",
            width: "100%",
            "padding-top": style.bgpaddingtop,
            "padding-right": style.bgpaddingright + 20,
            "padding-bottom": style.bgpaddingbottom,
            "padding-left": style.bgpaddingleft,
            color: style.color,
            "font-size": style.fontsize * existv(v.globalfs, 1),
            "font-family": checkFont(style.font),
            "letter-spacing": style.letterspacing + "px"
        }),
        o.system.safari && css(control, {
            "min-width": 220
        }),
        "playlist" !== is && css(control, {
            "overflow-y": "scroll"
        }),
        container.appendChild(control),
        1 != style.floatleft) {
            var control2 = createElement("div");
            css(control2, {
                display: "block",
                overflow: "hidden",
                "border-radius": style.rounding
            }),
            1 != style.floatleft && o.system.safari && css(control2, {
                "min-width": 220
            }),
            control.appendChild(control2)
        }
        if (attr(control, {
            id: v.id + "_" + is
        }),
        "playlist" == is && (1 == style.floatleft ? (css(control, {
            width: "100%",
            "padding-right": style.bgpaddingright,
            "padding-bottom": style.bgpaddingbottom + 20,
            "overflow-x": "scroll",
            "white-space": "nowrap"
        }),
        css(container, {
            width: o.screen_w - style.marginright - style.marginleft,
            height: style.floatheight + style.bgpaddingtop + style.bgpaddingbottom
        })) : (css(control, {
            "overflow-y": "scroll"
        }),
        1 == style.width100 && ResizePlaylist()),
        1 == style.marginbg && css(container, {
            "background-color": style.marginbgcolor
        }),
        1 == v.playlist.droplist && hide2(container)),
        1 == style.scrollarrows) {
            var arr_up = createElement("div")
              , scrollbgcolor = hexToRgb(1 == style.marginbg ? style.marginbgcolor : style.bgcolor);
            1 == style.floatleft ? (StyleArrow(arr_up, "to right, rgba(" + scrollbgcolor + "," + (1 * style.bga + .3) + "), rgba(" + scrollbgcolor + ",0)", "left", 12, 5, 7, 10, 7, 10, 12, 15),
            arr_up.addEventListener(evntclk, ScrollLeft)) : (StyleArrow(arr_up, "to bottom, rgba(" + scrollbgcolor + "," + (1 * style.bga + .3) + "), rgba(" + scrollbgcolor + ",0)", "top", 5, 12, 10, 7, 10, 7, 15, 12),
            arr_up.addEventListener(evntclk, ScrollUp));
            var arr_down = createElement("div");
            1 == style.floatleft ? (StyleArrow(arr_down, "to left, rgba(" + scrollbgcolor + "," + (1 * style.bga + .3) + "), rgba(" + scrollbgcolor + ",0)", "right", 8, 5, 13, 10, 13, 10, 8, 15),
            arr_down.addEventListener(evntclk, ScrollRight)) : (StyleArrow(arr_down, "to bottom, rgba(" + scrollbgcolor + ",0), rgba(" + scrollbgcolor + "," + (1 * style.bga + .3) + ")", "bottom", 5, 8, 10, 13, 10, 13, 15, 8),
            arr_down.addEventListener(evntclk, ScrollDown)),
            arr_up.addEventListener("mouseover", ScrollOverOut),
            arr_up.addEventListener("mouseout", ScrollOverOut),
            arr_down.addEventListener("mouseover", ScrollOverOut),
            arr_down.addEventListener("mouseout", ScrollOverOut),
            control.addEventListener("wheel", Wheel),
            arr_up.addEventListener("mouseup", onMouseUp),
            arr_down.addEventListener("mouseup", onMouseUp),
            container.appendChild(arr_up),
            container.appendChild(arr_down),
            clearInterval(arrinterval),
            arrinterval = setInterval(ArrowsInterval, 1e3)
        }
        if (control.addEventListener(evntovr, ControlOver),
        control.addEventListener(evntout, ControlOut),
        "settings" == is)
            for (var i = 1; i < 11; i++)
                exist(v["control_" + is][is + i]) && (v.settings[is + i] = v["control_" + is][is + i],
                exist(v["control_" + is][is + i + "title"]) && (v.settings[is + i + "title"] = v["control_" + is][is + i + "title"]),
                exist(v["control_" + is][is + i + "action"]) && (v.settings[is + i + "action"] = v["control_" + is][is + i + "action"])),
                exist(v.settings[is + i]) && 1 == v.settings[is + i] && (CreateItem("f", i),
                StyleItem(f[i], fbg[i], ftitle[i], fvalue[i]),
                exist(v.settings[is + i + "action"]) || (v.settings[is + i + "action"] = "speed"),
                ftitle[i].innerHTML = Lang(v.settings[is + i + "action"]),
                exist(v.settings[is + i + "title"]) && "" != v.settings[is + i + "title"] && (ftitle[i].innerHTML = v.settings[is + i + "title"]),
                "share" == v.settings[is + i + "action"] && (o.shareme = !0),
                faction[i] = v.settings[is + i + "action"],
                Value(i),
                faction[i]in o.menuproc && (mpi[faction[i]] = i),
                f[i].addEventListener(evntovr, onOver),
                f[i].addEventListener(evntout, onOut),
                f[i].addEventListener(evntclk, onClick),
                f[i].addEventListener("mouseup", onMouseUp),
                1 == v.settings[is + i + "hide"] && css(f[i], {
                    height: 0
                }));
        function Wheel(t) {
            "playlist" == is && 1 == style.floatleft && t && 0 == t.deltaX && 0 != t.deltaY && (control.scrollLeft -= t.deltaY,
            t.preventDefault()),
            clearInterval(wheelinterval),
            wheelinterval = setInterval(ControlOut, 3e3),
            Retimer()
        }
        function ControlOver() {
            o.mouseDown = !0
        }
        function ControlOut() {
            1 == style.showovercontrol && (clearTimeout(o.settingsovertimer),
            o.settingsovertimer = setTimeout((function() {
                o.mouseDown || HideControl()
            }
            ), v.settings.showoverto > 0 ? 1e3 * v.settings.showoverto : o.system.tv ? 2e3 : 1e3)),
            o.mouseDown = !1
        }
        function onOver(event) {
            o.fullscreen && o.volumewheel && o.actions.volumewheel(!1);
            var i = event.target.getAttribute("fid"), x;
            if (i ? x = "f" : event.target.getAttribute("f2id") && (i = event.target.getAttribute("f2id"),
            x = "f2"),
            i) {
                i = parseInt(i);
                var opn = !1;
                if (exist(eval(x)[i])) {
                    if (style.bgaover > -1 && css(eval(x + "bg")[i], {
                        opacity: style.bgaover
                    }),
                    style.aover > -1 && (css(eval(x + "title")[i], {
                        opacity: style.aover
                    }),
                    css(eval(x + "value")[i], {
                        opacity: style.aover
                    })),
                    "playlist" == is && 0 == faction[i].indexOf("playlist")) {
                        var id = faction[i].substr(8);
                        plid == id || plfolder == id ? (css(eval(x + "title")[i], {
                            color: style.valuecolor
                        }),
                        css(eval(x + "value")[i], {
                            color: style.valuecolor
                        }),
                        opn = !0) : css(eval(x + "title")[i], {
                            color: style.color
                        })
                    }
                    1 == style.playbgcolored && exist(style.playbgcolor) && opn || css(eval(x + "bg")[i], {
                        backgroundColor: style.bgcolorover
                    })
                }
            }
        }
        function onOut(event) {
            o.fullscreen && o.volumewheel && o.actions.volumewheel(!0);
            var i = event.target.getAttribute("fid"), x, opn = !1;
            if (clearInterval(downin),
            Retimer(),
            i ? x = "f" : event.target.getAttribute("f2id") && (i = event.target.getAttribute("f2id"),
            x = "f2"),
            i && exist(eval(x)[i])) {
                if (style.bgaover > -1 && css(eval(x + "bg")[i], {
                    opacity: style.bga,
                    transition: "opacity 0.1s linear"
                }),
                style.aover > -1 && (css(eval(x + "title")[i], {
                    opacity: style.a,
                    transition: "opacity 0.1s linear"
                }),
                css(eval(x + "value")[i], {
                    opacity: style.a,
                    transition: "opacity 0.1s linear"
                })),
                "playlist" == is && 0 == faction[i].indexOf("playlist")) {
                    var id = faction[i].substr(8);
                    plid == id || plfolder == id ? (css(eval(x + "title")[i], {
                        color: style.valuecolor
                    }),
                    css(eval(x + "value")[i], {
                        color: style.valuecolor
                    }),
                    opn = !0) : exist(o.plhistory[id]) ? HistoryPlaylist(i) : css(eval(x + "title")[i], {
                        color: style.color
                    })
                }
                1 == style.playbgcolored && exist(style.playbgcolor) && opn || css(eval(x + "bg")[i], {
                    backgroundColor: o.plhistory[id] ? style.historybgcolor : style.bgcolor
                })
            }
        }
        function onClick(t) {
            if (!justshow) {
                var e = new Date;
                o.clicktime = e.getTime();
                var i = t.target.getAttribute("fid");
                i && exist(f[i]) && exist(faction[i]) && Action(i, 0)
            }
        }
        function onMouseDown(t) {
            if (!justshow) {
                var e = t.target.getAttribute("f2id");
                e && exist(f2action[e]) && open_action in o.menuproc && (downi = e,
                downin = setInterval(DownIn, 200))
            }
        }
        function DownIn() {
            Action2(downi)
        }
        function onMouseUp(t) {
            clearInterval(downin),
            t.cancelBubble = !0,
            Retimer()
        }
        function onClick2(t) {
            if (clearInterval(downin),
            !justshow) {
                var e = new Date;
                o.clicktime = e.getTime();
                var i = t.target.getAttribute("f2id");
                i && (0 == i ? "color" == f2action[0] ? (Remove2(),
                Action(iclr)) : Home() : exist(f2action[i]) && Action2(i))
            }
        }
        function onClickSubtitle(t) {
            var e = t.target.getAttribute("setupx");
            e && ActionOptions(e)
        }
        function onClickSubtitle2(t) {
            Retimer();
            var e = t.target.getAttribute("f2id");
            if (exist(f2action[e]) && f2i("=", e) > 0) {
                var o = f2action[e].substr(0, f2i("=", e))
                  , i = f2action[e].substr(f2i("=", e) + 1)
                  , s = open_action + "_reset";
                v[s] || (v[s] = []),
                exist(v[s][o]) || (v[s][o] = v[o] + ""),
                StyleSubtitle(o, i)
            }
        }
        function StyleSubtitle(t, e) {
            v[t] = e,
            o.storage && 1 == v.sub_designstore && "sub_shift" != t && localStorage.setItem("pljs" + t, e),
            o.casting && o.chromecast && o.chromecast.Sub(),
            o.actions.RenewSubtitle(),
            ActionOptions(t)
        }
        function onClickTimer2(t) {
            var e = t.target.getAttribute("f2id")
              , i = f2action[e];
            if (exist(i) && i.indexOf("=") > 0) {
                var s = i.substr(0, i.indexOf("="))
                  , n = i.substr(i.indexOf("=") + 1);
                v[s] = n,
                SubtitleTimerMenu(),
                Value(o[open_action + "_i"]),
                "offsettimer" == open_action && SettingsTimers("offsetwrite")
            }
        }
        function Value(t) {
            if (exist(faction[t])) {
                var e = !1
                  , i = !1
                  , s = "";
                if ("settings" == is) {
                    if ("quality" == faction[t] && (s = o.media.getQuality()),
                    "audiotrack" == faction[t] && (s = o.media.getAudioTrack()),
                    "share" == faction[t] && (s = " ",
                    i = !0),
                    "channel" == faction[t] && o.channels && (s = o.files_channel[o.current_channel]),
                    "audiotrack" != faction[t] && "channel" != faction[t] && "quality" != faction[t] || (0 == o["files_" + faction[t]].length ? e = !0 : 1 != o["files_" + faction[t]].length || 1 == style.show1value && 1 != o["files_" + faction[t]][0] ? i = !0 : e = !0),
                    "airplay" == faction[t] && (o.airplay ? i = !0 : e = !0),
                    "download" == faction[t] && ("native" == o.file_type || v.download ? i = !0 : e = !0),
                    "subtitle" == faction[t])
                        if (exist(o.subs)) {
                            i = !0,
                            o.subtitle_on || 1 == v.sub_off ? o.sbt && (s = o.files_subtitle[o.subtitle_on ? o.current_subtitle : o.sbt.ioff()]) : s = "";
                            for (var n = 0, a = 0; a < o.subs.length; a++)
                                "" != o.subs[a] && n++;
                            1 == n && 1 == o.subload && (n = 0),
                            1 == v.sub_upload && 1 == v.sub_upload0 || 0 == n && (e = !0,
                            i = !1)
                        } else
                            e = !0;
                    if ("speed" == faction[t] && (1 == (s = o.files_speed[o.current_speed]) && 1 != style.speed1 && (s = Lang("normal")),
                    i = !0,
                    ("vimeo" == o.file_type || o.media.isLive() && 1 != style.speed4live) && (e = !0,
                    i = !1)),
                    faction[t]in o.menuproc && (s = FltrVal(faction[t]),
                    i = !0),
                    faction[t].indexOf("timer") > 0) {
                        for (var r = " ", l = ["hour", "minute", "second"], d = 0; d < l.length; d++)
                            exist(v[faction[t] + l[d]]) && " " != v[faction[t] + l[d]] && (r += (" " != r ? ":" : "") + v[faction[t] + l[d]]);
                        s = " 0:0" != r && r.indexOf(":") > -1 ? r : " ",
                        i = !0
                    }
                }
                fvalue[t].innerHTML = s + ("" != s && 1 != style.hidearrow ? ' &nbsp;<svg width="5px" height="7px" viewBox="-1 -1 5 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline stroke="#' + style.valuecolor + '" stroke-width="1" fill="none" points="0 0 3 3 0 6"></polyline></svg>' : ""),
                e && (hide(f[t]),
                "settings" == is && (stout[t] && clearTimeout(stout[t]),
                o.controls ? o.controls.SettingsN(t, !1, s) : stout[t] = setTimeout((function() {
                    o.controls.SettingsN(t, !1, s)
                }
                ), 200)),
                css(f[t], {
                    position: "absolute",
                    right: 0,
                    top: -100
                })),
                i && (1 == style.floatleft ? css(f[t], {
                    display: "inline-block"
                }) : show(f[t]),
                "settings" == is && (stout[t] && clearTimeout(stout[t]),
                o.controls ? o.controls.SettingsN(t, !0, s) : stout[t] = setTimeout((function() {
                    o.controls.SettingsN(t, !0, s)
                }
                ), 500)),
                css(f[t], {
                    position: "relative",
                    right: 0,
                    top: 0
                })),
                Resize()
            }
            for (var c = 1; c < f.length; c++)
                if (f[c] && isVisible(f[c])) {
                    var u = !1;
                    empty && (u = !0),
                    empty = !1,
                    u && o.controls && o.controls.refresh()
                }
        }
        function Action(t, e, i) {
            if (i && (faction[t] = i),
            exist(faction[t])) {
                o.setaction = !0,
                Retimer();
                var s = VisibleItems();
                if (open_action != faction[t]) {
                    if ("quality" == (open_action = faction[t]) || "audiotrack" == open_action || "subtitle" == open_action || "speed" == open_action || "channel" == open_action || open_action in o.menuproc || open_action.indexOf("timer") > 0 || "share" == open_action || "color" == open_action) {
                        open_settings = t;
                        var n = copyObject(o["files_" + open_action]);
                        if ("sleeptimer" == open_action && (n = 1 == style.sleep2 ? SettingsTimers("sleep2options") : SettingsTimers("sleepoptions")),
                        "offsettimer" == open_action && (n = SettingsTimers("offsetoptions")),
                        "share" == open_action && o.share) {
                            n = [];
                            for (var a = 1; a <= 16; a++)
                                exist(v["share" + a]) && (n.push(Lang(v["share" + a])),
                                shr[n.length] = v["share" + a])
                        }
                        if ("color" == open_action && o.tagvideo) {
                            n = [],
                            iclr = t;
                            for (a = 0; a < o.clr_options.length; a++) {
                                var r = o.clr_options[a].substr(4);
                                n.push(Lang(r)),
                                clr[n.length] = r
                            }
                        }
                        var l = o["current_" + open_action]
                          , d = o["pressed_" + open_action];
                        for (a = 1; a < f.length; a++)
                            f[a] && (f[a].style.display = "none");
                        f2 = [],
                        CreateItem("f2", 0),
                        StyleItem(f2[0], f2bg[0], f2title[0], f2value[0]),
                        css(f2[0], {
                            "border-bottom": "1px solid " + (1 == style.bordercolored ? bordercolor : "rgba(100,100,100,0.7)")
                        }),
                        _cstm = e;
                        var c = !1;
                        if (f2title[0].innerHTML = (s[0] < 2 || 1 == _cstm || 1 == style.noprevicon ? "" : _prevIcon) + (v.settings[is + t + "title"] && "" != v.settings[is + t + "title"] ? v.settings[is + t + "title"] : Lang(v.settings[is + t + "action"])),
                        "subtitle" == open_action && !o.hls_subs && !o.dash_subs) {
                            var u = createElement("div");
                            u.innerHTML = Lang("options"),
                            css(u, {
                                color: style.color,
                                pointerEvents: "auto",
                                cursor: "pointer"
                            }),
                            f2value[0].appendChild(u),
                            u.addEventListener(evntclk, SubtitleSettings),
                            c = !0
                        }
                        if ("subtitle" == open_action && 1 == v.sub_upload && !o.system.tv && exist(window.FileReader)) {
                            var p = createElement("div");
                            !o.sbt && (o.sbt = new PluginSub),
                            p.innerHTML = "<input type='file' id='" + v.id + "_subfile' accept='.vtt,.ass,.srt' style='display:none'/>" + Lang("upload"),
                            css(p, {
                                color: style.color,
                                pointerEvents: "auto",
                                cursor: "pointer",
                                "margin-left": c ? "10px" : 0
                            }),
                            f2value[0].appendChild(p),
                            o.subupld = document.getElementById(v.id + "_subfile"),
                            o.subupld.onchange = o.sbt.SubUpload,
                            p.addEventListener(evntclk, o.sbt.SubUpload)
                        }
                        if (c && sub_settings_on)
                            for (2 == _cstm && (n = [],
                            hide2(f2[0])),
                            a = 0; a < o.sub_options.length; a++)
                                0 == v.sub_all && "sub_color2" == o.sub_options[a] || n.push("pjslng_" + o.sub_options[a]);
                        if (css(f2title[0], {
                            "font-size": style.headfontsize * existv(v.globalfs, 1)
                        }),
                        f2action[0] = "home",
                        open_action in o.menuproc && (Menuproc(open_action),
                        iclr > 0 && o.clr_options.indexOf("clr_" + open_action) > -1 && (f2title[0].innerHTML = _prevIcon + Lang(open_action),
                        f2action[0] = "color",
                        f2value[0].innerHTML = FltrVal(open_action)),
                        css(f2value[0], {
                            width: 2.5 * style.valuefontsize,
                            "text-align": "right"
                        })),
                        1 != _cstm && s[0] > 1 ? (f2[0].addEventListener(evntovr, onOver),
                        f2[0].addEventListener(evntout, onOut),
                        f2[0].addEventListener(evntclk, onClick2),
                        f2[0].addEventListener("mouseup", onMouseUp)) : css(f2[0], {
                            cursor: "default"
                        }),
                        1 == style.nohead && hide2(f2[0]),
                        exist(n)) {
                            var h = "";
                            for (a = 0; a < n.length; a++) {
                                var g = a + 1
                                  , m = 0
                                  , b = !1;
                                if (n[a] && "" != trim(n[a])) {
                                    if ("quality" == open_action && (n[a] == Lang("auto") && (m = 1),
                                    "hls" == o.file_type && 1 == v.hlsqhsort)) {
                                        var y = int(n[a]);
                                        y && y < h && (m = 2),
                                        h = int(n[a])
                                    }
                                    if (CreateItem("f2", g, m),
                                    StyleItem(f2[g], f2bg[g], f2title[g], f2value[g], faction[t]),
                                    "speed" == open_action && 1 == n[a] && 1 != style.speed1 && (n[a] = Lang("normal")),
                                    "string" == typeof n[a])
                                        if (0 == n[a].indexOf("<<<") && (n[a] = n[a].replace("<<<", ""),
                                        b = !0),
                                        n[a].indexOf("timer") > 0 && (o[open_action + "_i"] = t),
                                        0 == n[a].indexOf("pjslng")) {
                                            var x = n[a];
                                            x.indexOf("timer") > 0 ? f2title[g].innerHTML = Lang(n[a].substr(x.indexOf("timer") + 5)) : f2title[g].innerHTML = Lang(n[a].substr(7)),
                                            "pjslng_sub_sizeproc" == n[a] && css(f2[g], {
                                                "border-top": "1px solid rgba(100,100,100,0.7)"
                                            })
                                        } else
                                            f2title[g].innerHTML = n[a];
                                    else
                                        f2title[g].innerHTML = n[a];
                                    if (f2action[g] = open_action + a,
                                    l != a && d != a || (f2value[g].innerHTML = l == a ? _activeIcon : _xIcon,
                                    l == a && css(f2title[g], {
                                        color: style.valuecolor
                                    })),
                                    "string" == typeof n[a]) {
                                        if (0 == n[a].indexOf("pjslng")) {
                                            var w = n[a].substr(7);
                                            w.indexOf("color") > 0 ? f2value[g].innerHTML = "<div style='" + ("000000" == v[w] ? "border:1px solid #999;height:8px;width:8px;" : "height:10px;width:10px;") + ";background-color:" + (-1 == v[w].indexOf("#") ? "#" : "") + v[w] + ";border-radius:10px;'></div>" : exist(v[n[a].substr(7)]) && (f2value[g].innerHTML = v[n[a].substr(7)])
                                        }
                                        if ("share" == open_action && exist(shr[g]) && o.share && (f2value[g].innerHTML = o.share.icon(shr[g], .7, CheckColor(style.valuecolor))),
                                        "color" == open_action && exist(clr[g]) && o.tagvideo && (f2value[g].innerHTML = FltrVal(clr[g])),
                                        "quality" == open_action && (n[a] == Lang("auto") && o.media.autoQuality() && css(f2title[g], {
                                            color: style.valuecolor
                                        }),
                                        exist2(v.forbidden_quality)))
                                            for (var _ = v.forbidden_quality.split(","), k = 0; k < _.length; k++)
                                                n[a].indexOf(_[k]) > -1 && hide2(f2[g])
                                    }
                                    var S = "";
                                    "string" == typeof n[a] && 0 == n[a].indexOf("pjslng") && (attr(f2[g], {
                                        f2parent: t,
                                        setupx: n[a].substr(7)
                                    }),
                                    S = "onClickSubtitle"),
                                    b ? css(f2[g], {
                                        cursor: "default"
                                    }) : (f2[g].addEventListener(evntovr, onOver),
                                    f2[g].addEventListener(evntout, onOut),
                                    "onClickSubtitle" == S ? f2[g].addEventListener(evntclk, onClickSubtitle) : f2[g].addEventListener(evntclk, onClick2),
                                    f2[g].addEventListener("mouseup", onMouseUp),
                                    f2[g].addEventListener("mousedown", onMouseDown))
                                }
                            }
                        }
                        Resize()
                    }
                    if ("download" == faction[t] && o.actions.Download(),
                    faction[t].indexOf("playlist") > -1) {
                        var P = faction[t].substr(8);
                        if (exist(o.playlist_dic[P]))
                            if (v.playlist.dontplay = 1,
                            o.u.playlist.dontplay = 1,
                            exist(o.playlist_dic[P].file))
                                o.seekto = void 0,
                                ActionPlaylist(t),
                                UpdateStart(P),
                                SettingsTimers("offset"),
                                exist(o.playlist_dic[P].redirect) && 1 == v.redirect && 1 == v.redirectplaylist ? redirect(o.playlist_dic[P].redirect) : (UpdateVars0(P),
                                o.actions.NewFile(o.playlist_dic[P].file, 1 == v.playlist.dontplay ? 1 : void 0),
                                0 == v.playlist.always && 1 == v.playlist.autohide && setTimeout(HideControl, 200),
                                autonextopenfolder = !1,
                                autoprevopenfolder = !1,
                                UpdateVars(P));
                            else if (exist(o.playlist_dic[P].folder)) {
                                let t = o.plid.split("-");
                                t = t[7];
                                let e = !1;
                                o.playlist_dic[P].folder.map((function(o, i) {
                                    o.id.indexOf(t) > -1 && (e = i)
                                }
                                )),
                                UpdatePlaylist(P),
                                "prerollt"in v && (v.preroll = v.prerollt),
                                !1 !== e ? -1 == plx && Action(e, 0) : -1 == plx && Action(parseInt(f.length) - 2, 0)
                            }
                        o.droplist && o.droplist.Update()
                    }
                    "airplay" == faction[t] && o.media.Airplay()
                }
            }
        }
        function ActionOptions(t) {
            if ("sub_reset" != t) {
                Retimer();
                for (var e = 0; e < f2.length; e++)
                    f2[e] && (f2[e].style.display = "none");
                f2 = [],
                CreateItem("f2", 0),
                StyleItem(f2[0], f2bg[0], f2title[0], f2value[0]),
                css(f2[0], {
                    "border-bottom": "1px solid " + (1 == style.bordercolored ? bordercolor : "rgba(100,100,100,0.7)")
                }),
                t.indexOf("timer") > 0 ? (f2[0].addEventListener(evntclk, SubtitleTimerMenu),
                f2title[0].innerHTML = Lang(t.substr(t.indexOf("timer") + 5))) : (f2[0].addEventListener(evntclk, SubtitleSettingsMenu),
                f2title[0].innerHTML = (1 != style.noprevicon ? _prevIcon : "") + Lang(t)),
                css(f2title[0], {
                    "font-size": style.headfontsize * existv(v.globalfs, 1)
                }),
                f2[0].addEventListener(evntovr, onOver),
                f2[0].addEventListener(evntout, onOut),
                f2[0].addEventListener("mouseup", onMouseUp);
                var o = []
                  , i = !1;
                if (t.indexOf("size") > 0 && (o = ["50%", "75%", "100%", "125%", "150%", "175%", "200%", "250%", "300%", "400%"]),
                t.indexOf("bga") > 0 && (o = ["0", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"]),
                t.indexOf("shift") > 0)
                    for (e = -5; e < 5.5; e += .5)
                        o.push(Math.round(100 * e) / 100);
                if (t.indexOf("weight") > 0 && (o = [200, 400, 600]),
                t.indexOf("bottom") > 0)
                    for (e = 0; e < 21; e++)
                        o[e] = 10 * e;
                if (t.indexOf("hour") > 0)
                    for (e = 0; e < 24; e++)
                        o[e] = e;
                if (t.indexOf("minute") > 0 || t.indexOf("second") > 0)
                    for (e = 0; e < 60; e++)
                        o[e] = e;
                if (t.indexOf("shadow") > 0 && (i = !0,
                o = [0, 1]),
                t.indexOf("color") > 0) {
                    o = ["ffffff", "ffeeab", "72ccf8", "62de50", "faed54", "feba54", "e8bbff", "ffc7d1", "aaaaaa", "d9bb8c", "b3fee8", "4bd9ac", "FEF370", "D90000", "073DA0", "409829", "644082", "000000"];
                    var s = v[t].replace("#", "");
                    -1 == o.indexOf(s) && (o[8] = s)
                }
                for (a = 1; a <= o.length; a++)
                    CreateItem("f2", a, 0),
                    StyleItem(f2[a], f2bg[a], f2title[a], f2value[a]),
                    css(f2value[a], {
                        "padding-left": 0
                    }),
                    t.indexOf("color") > 0 || t.indexOf("bottom") > 0 || t.indexOf("timer") > 0 || t.indexOf("shift") > 0 ? (a % 3 != 0 && css(f2[a], {
                        float: "left"
                    }),
                    css(f2[a], {
                        width: "33.3%"
                    }),
                    t.indexOf("color") > 0 ? (f2title[a].innerHTML = "<div style='" + ("000000" == o[a - 1] ? "border:1px solid #999;height:18px;width:18px;" : "height:20px;width:20px;") + ";background-color:#" + o[a - 1] + ";border-radius:20px;'></div>",
                    css(f2[a], {
                        "line-height": 1
                    })) : f2title[a].innerHTML = o[a - 1]) : t.indexOf("weight") > 0 ? f2title[a].innerHTML = o[a - 1] : (a % 2 != 0 && css(f2[a], {
                        float: "left"
                    }),
                    css(f2[a], {
                        width: "50%"
                    }),
                    f2title[a].innerHTML = i ? Lang(o[a - 1] + "val") : o[a - 1]),
                    f2action[a] = t + "=" + o[a - 1],
                    (o[a - 1] == v[t] && " " != String(v[t]) || v[t] == "#" + o[a - 1]) && (f2value[a].innerHTML = _activeIcon,
                    css(f2title[a], {
                        color: style.valuecolor
                    })),
                    f2[a].addEventListener(evntovr, onOver),
                    f2[a].addEventListener(evntout, onOut),
                    t.indexOf("timer") > 0 ? f2[a].addEventListener(evntclk, onClickTimer2) : f2[a].addEventListener(evntclk, onClickSubtitle2),
                    f2[a].addEventListener("mouseup", onMouseUp);
                Resize()
            } else {
                var n = open_action + "_reset";
                if (v[n]) {
                    for (var a in v[n])
                        v[n].hasOwnProperty(a) && StyleSubtitle(a, v[n][a]);
                    SubtitleSettingsMenu()
                }
            }
        }
        function UpdateVars0(t) {
            exist(o.playlist_dic[t].poster) && (v.poster = o.playlist_dic[t].poster,
            exist(v.poster) && o.media.Poster(v.poster)),
            exist(o.playlist_dic[t].title) && (o.titlestore = o.playlist_dic[t].title)
        }
        function UpdateVars(t) {
            exist(o.playlist_dic[t].title) && 1 == v.showtitleplaylist && (o.actions.TitleTemplate(o.playlist_dic[t]) || (v.title = (1 == v.addtitleplaylist && exist(o.maintitle) ? o.maintitle + (1 == v.addtitleplaylistbr ? "<br>" : " ") : "") + o.playlist_dic[t].title),
            o.actions.Title("title")),
            1 == v.pointed && o.controls.RenewPoints();
            for (var e = ["remove", "thumbnails", "download", "skip", "url", "url2", "url3", "vars", "embed", "end", "delete", "heartbeat", "label", "title2"], i = 0; i < e.length; i++)
                exist(o.playlist_dic[t][e[i]]) ? v[e[i]] = o.playlist_dic[t][e[i]] : i < 4 && (v[e[i]] = void 0);
            v.start = 0,
            UpdateStart(t),
            exist(o.playlist_dic[t].sub) && (o.playlist_dic[t].subtitle = o.playlist_dic[t].sub),
            exist(o.playlist_dic[t].subtitle) && o.actions.Subtitle(o.playlist_dic[t].subtitle),
            exist(o.playlist_dic[t].design) && apiProcessor("design", o.playlist_dic[t].design)
        }
        function UpdateStart(t) {
            var e = o.playlist_dic[t].start;
            exist(e) && ("continue" == e ? o.media.time() > 0 && (v.start = o.seekto = o.media.time()) : v.start = o.seekto = e)
        }
        function ActionPlaylist(t) {
            if (0 != plx || o.start ? (o.plopenid = t,
            plx > -1 && HistoryPlaylist(plx),
            "" != plid && (o.plhistory[plid] = !0,
            shuffle = removebykey(shuffle, plid))) : (css(ftitle[plx], {
                color: style.color
            }),
            css(fbg[plx], {
                backgroundColor: style.bgcolor
            }),
            fvalue[plx].innerHTML = ""),
            faction[t]) {
                var e = faction[t].substr(8);
                fvalue[t].innerHTML = _activeIcon,
                css(ftitle[t], {
                    color: style.valuecolor,
                    "text-decoration": "none",
                    opacity: style.a
                }),
                1 == style.playbgcolored && exist(style.playbgcolor) && css(fbg[t], {
                    backgroundColor: style.playbgcolor
                }),
                plx = t,
                plid = e,
                o.plid = plid,
                v.plstart = plid,
                o.playlist_title = ftitle[t].innerHTML,
                o.plopenid = plid,
                plfolder = o.playlist_dic[e].pjs_parent,
                o.controls && o.controls.PlaylistControls()
            }
        }
        function UpdatePlaylist(t) {
            var e = 0 == t ? o.playlist : o.playlist_dic[t];
            o.plopenid = t;
            for (var i = 0; i < f.length; i++)
                1 == style.floatleft ? control.removeChild(f[i]) : control2.removeChild(f[i]),
                f[i] = null;
            if (f = [],
            plx = -1,
            exist(e.folder)) {
                if (CreateItem("f", r = Object.keys(e.folder).length),
                faction[r] = "playlistfolder",
                StyleItem(f[r], fbg[r], ftitle[r], fvalue[r]),
                1 == style.floatleft && css(f[r], {
                    width: 1 == style.floatlimitwidth ? style.floatwidth : "auto",
                    height: style.floatheight
                }),
                1 == style.borderbottom) {
                    var s = "1px solid rgba(" + hexToRgb(style.headbordercolor) + "," + existv(style.brda, 1) + ")";
                    1 == style.floatleft ? css(f[r], {
                        borderRight: s
                    }) : css(f[r], {
                        borderBottom: s
                    })
                }
                var n = e.title;
                1 != style.noprevicon && (n = _prevIcon + n),
                ftitle[r].innerHTML = n,
                css(ftitle[r], {
                    "font-size": style.headfontsize * existv(v.globalfs, 1)
                });
                var a = e.pjs_parent;
                f[r].addEventListener(evntovr, onOver),
                f[r].addEventListener(evntout, onOut),
                f[r].addEventListener(evntclk, (function() {
                    PlaylistBack(a)
                }
                )),
                e = e.folder
            }
            var r = Object.keys(e).length;
            shuffle = [],
            shuffle_ = [];
            for (i = 0; i < r; i++) {
                if (CreateItem("f", i),
                faction[i] = "playlist" + e[i].id,
                exist(o.plhistory[e[i].id]) || exist(e[i].folder) || (shuffle[e[i].id] = i,
                shuffle_[e[i].id] = i),
                StyleItem(f[i], fbg[i], ftitle[i], fvalue[i]),
                1 == style.floatleft && (0 == style.activeiconsize && (css(ftitle[i], {
                    width: style.floatwidth - style.paddingleft - style.paddingright
                }),
                hide2(fvalue[i])),
                css(f[i], {
                    width: 1 == style.floatlimitwidth ? style.floatwidth : "auto",
                    height: style.floatheight
                })),
                1 == style.borderbottom && i < r - 1) {
                    var l = createElement("div");
                    f[i].appendChild(l),
                    1 == style.floatleft ? css(l, {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 1,
                        height: "100%",
                        background: bordercolor,
                        pointerEvents: "none"
                    }) : css(l, {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 1,
                        background: bordercolor,
                        pointerEvents: "none"
                    })
                }
                ftitle[i].innerHTML = e[i].title ? e[i].title : "&nbsp;",
                1 == v.timestore && 1 == v.playedstore && e[i].id && o.playedstored && o.playedstored.indexOf(e[i].id) > -1 && (e[i].played = 1),
                exist(e[i].played) && 1 == e[i].played && (o.plhistory[e[i].id] = !0,
                HistoryPlaylist(i)),
                exist(e[i].folder) && (fvalue[i].innerHTML = _nextIcon,
                css(fvalue[i], {
                    color: style.color
                })),
                f[i].addEventListener(evntovr, onOver),
                f[i].addEventListener(evntout, onOut),
                f[i].addEventListener(evntclk, onClick),
                f[i].addEventListener("mouseup", onMouseUp),
                exist(o.plhistory[e[i].id]) && HistoryPlaylist(i),
                plid == e[i].id && ActionPlaylist(i),
                plfolder == e[i].id && (css(ftitle[i], {
                    color: style.valuecolor
                }),
                css(fvalue[i], {
                    color: style.valuecolor
                }))
            }
            Resize(),
            empty = !1,
            o.controls && o.controls.refresh()
        }
        function StyleArrow(t, e, i, s, n, a, r, l, d, c, u) {
            var p = 1 == style.floatleft ? "40px" : "100%"
              , v = 1 == style.floatleft ? "100%" : "40px";
            css(t, {
                position: "absolute",
                display: "inline-block",
                width: p,
                height: v,
                "text-align": "center"
            }),
            1 == style.scrollarrowgradient && css(t, {
                background: "-moz-linear-gradient(" + e + ")",
                background: "-webkit-linear-gradient(" + e + ")",
                background: "-ms-linear-gradient(" + e + ")",
                background: "-o-linear-gradient(" + e + ")",
                background: "linear-gradient(" + e + ")"
            }),
            1 == style.floatleft || o.system.mobile ? css(t, {
                cursor: "pointer"
            }) : css(t, {
                "pointer-events": "none"
            }),
            1 == style.limitwidth && css(t, {
                "max-width": style.limitmaxwidth + "px!important"
            }),
            "top" == i && css(t, {
                top: -1,
                left: 0
            }),
            "bottom" == i && css(t, {
                bottom: -1,
                left: 0
            }),
            "left" == i && css(t, {
                top: 0,
                left: 0
            }),
            "right" == i && css(t, {
                top: 0,
                right: 0
            }),
            "right" != i && "left" != i || css(t, {
                "text-align": "left",
                "padding-top": container.offsetHeight / 2 - 10
            }),
            t.innerHTML = "<center><div " + (1 == style.scrollarrowbgover ? "onMouseOver='this.style.backgroundColor=\"#" + style.scrollarrowbgovercolor + "\"' onMouseOut='" + (1 == style.scrollarrowbg ? 'this.style.backgroundColor="#' + style.scrollarrowbgcolor : 'this.style.background="none') + "\"'" : "") + " style='pointer-events:auto;cursor:pointer;width:20px;height:20px;border-radius:20px;" + (1 == style.scrollarrowbg ? "background-color:#" + style.scrollarrowbgcolor + ";" : "") + ("top" == i ? "margin-top:10px;" : "") + ("bottom" == i ? "margin-top:10px;" : "") + ("right" == i ? "margin-left:0px;" : "") + ("left" == i ? "margin-right:0px;" : "") + "'><svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><line x1='" + s + "' y1='" + n + "' x2='" + a + "' y2='" + r + "' stroke='#" + style.scrollarrowcolor + "' stroke-width='" + style.scrollarrowsize + "' stroke-linecap='round'/><line x1='" + l + "' y1='" + d + "' x2='" + c + "' y2='" + u + "' stroke='#" + style.scrollarrowcolor + "' stroke-width='" + style.scrollarrowsize + "' stroke-linecap='round'/></g></svg></div></center>"
        }
        function ArrowsInterval() {
            is_visible && Arrows()
        }
        function Arrows(t) {
            if (1 == style.scrollarrows && !removed) {
                if (1 == style.floatleft)
                    var e = control.scrollWidth
                      , o = container.offsetWidth + style.bgpaddingleft + style.bgpaddingright
                      , i = control.scrollLeft;
                else
                    e = control.scrollHeight,
                    o = container.offsetHeight,
                    i = control.scrollTop;
                if (e > o) {
                    if (i > 0) {
                        if (!isVisible(arr_up)) {
                            show(arr_up);
                            new Motion({
                                mc: arr_up,
                                type: "alpha_div",
                                to: 1,
                                time: .3,
                                me: "arr_up"
                            })
                        }
                    } else {
                        if (isVisible(arr_up))
                            new Motion({
                                mc: arr_up,
                                type: "alpha_div",
                                to: 0,
                                time: .3,
                                me: "arr_up",
                                hide: !0
                            });
                        t && t.deltaY < 0 && t.preventDefault()
                    }
                    if (i < e - o - 10) {
                        if (!isVisible(arr_down)) {
                            show(arr_down);
                            new Motion({
                                mc: arr_down,
                                type: "alpha_div",
                                to: 1,
                                time: .3,
                                me: "arr_down"
                            })
                        }
                    } else {
                        if (isVisible(arr_down))
                            new Motion({
                                mc: arr_down,
                                type: "alpha_div",
                                to: 0,
                                time: .3,
                                me: "arr_down",
                                hide: !0
                            });
                        t && t.deltaY > 0 && t.preventDefault()
                    }
                } else
                    hide(arr_up),
                    hide(arr_down)
            }
        }
        function ScrollDown() {
            var t = control.scrollTop + container.offsetHeight - 60;
            new Motion({
                mc: control,
                type: "scroll",
                to: t,
                time: .3,
                me: "scroll_down",
                ease: "cubic"
            });
            setTimeout(Arrows, 1e3)
        }
        function ScrollUp() {
            var t = control.scrollTop - container.offsetHeight + 60;
            new Motion({
                mc: control,
                type: "scroll",
                to: t,
                time: .3,
                me: "scroll_up",
                ease: "cubic"
            });
            setTimeout(Arrows, 1e3)
        }
        function ScrollOverOut(t) {
            clearTimeout(o.settingsovertimer),
            t.stopPropagation()
        }
        function ScrollRight() {
            var t = control.scrollLeft + (container.offsetWidth + style.bgpaddingleft + style.bgpaddingright) - 60;
            new Motion({
                mc: control,
                type: "scrollleft",
                to: t,
                time: .3,
                me: "scroll_right",
                ease: "cubic"
            });
            setTimeout(Arrows, 1e3)
        }
        function ScrollLeft() {
            var t = control.scrollLeft - (container.offsetWidth + style.bgpaddingleft + style.bgpaddingright) + 60;
            new Motion({
                mc: control,
                type: "scrollleft",
                to: t,
                time: .3,
                me: "scroll_left",
                ease: "cubic"
            });
            setTimeout(Arrows, 1e3)
        }
        function PlaylistBack(t) {
            "" == t ? UpdatePlaylist(0) : exist(o.playlist_dic[t]) && UpdatePlaylist(t),
            open_action = ""
        }
        function HistoryPlaylist(t) {
            fvalue[t].innerHTML = "",
            css(ftitle[t], {
                color: style.historycolor
            }),
            1 == style.historytitlestrike && css(ftitle[t], {
                "text-decoration": "line-through"
            }),
            style.historytitlea > -1 && css(ftitle[t], {
                opacity: style.historytitlea
            }),
            css(fbg[t], {
                backgroundColor: style.historybgcolor
            }),
            style.historybga > -1 && css(fbg[t], {
                opacity: style.historybga
            })
        }
        function Action2(t) {
            if (exist(f2action[t])) {
                for (var e in Retimer(),
                0 == f2i("quality", t) && o.actions.SetQuality(f2action[t].substr(7)),
                0 == f2i("audiotrack", t) && o.actions.SetAudioTrack(f2action[t].substr(10)),
                0 == f2i("subtitle", t) && (!o.sbt && (o.sbt = new PluginSub),
                o.sbt.SetSubtitle(f2action[t].substr(8))),
                0 == f2i("channel", t) && 1 == v.channels && o.channels.SetChannel(f2action[t].substr(7)),
                0 == f2i("share", t) && (o.share && o.share.api(shr[t]),
                HideControl()),
                0 == f2i("color", t) && (Remove2(),
                Action(0, 0, clr[t])),
                o.menuproc)
                    o.menuproc.hasOwnProperty(e) && 0 == f2i(e, t) && o.media.menufltr(e, t);
                f2i("timer", t) > 0 && (f2title[t].innerHTML == Lang("off") ? (SettingsTimers(open_action + "0"),
                Value(open_settings),
                "offsettimer" == open_action && SettingsTimers("offsetwrite"),
                Home()) : "sleeptimer" == open_action && 1 == style.sleep2 && (SettingsTimers("sleep2", t),
                Value(open_settings),
                Home())),
                0 == f2i("speed", t) && (o.actions.SetSpeed(f2action[t].substr(5)),
                UpdateSpeed(),
                setTimeout(HideControl, 200))
            }
        }
        function UpdateSpeed() {
            for (var t = 0; t < faction.length; t++)
                "speed" == faction[t] && (Value(t),
                "speed" == open_action && (Remove2(),
                Action(t, 0)))
        }
        function CreateItem(x, i, toend) {
            exist(eval(x)) && (eval(x)[i] = createElement("div"),
            i < 2 || "f" == x || "quality" != open_action || 1 == toend ? 1 == style.floatleft ? control.appendChild(eval(x)[i]) : control2.appendChild(eval(x)[i]) : 1 == style.floatleft ? control.insertBefore(eval(x)[i], eval(x)[i - 1]) : control2.insertBefore(eval(x)[i], eval(x)[2 == toend ? i - 2 : i - 1]),
            "f" == x && attr(eval(x)[i], {
                fid: i
            }),
            "f2" == x && attr(eval(x)[i], {
                f2id: i
            }),
            eval(x + "bg")[i] = createElement("div"),
            eval(x)[i].appendChild(eval(x + "bg")[i]),
            eval(x + "img")[i] = createElement("div"),
            eval(x)[i].appendChild(eval(x + "img")[i]),
            css(eval(x + "img")[i], {
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none"
            }),
            eval(x + "title")[i] = createElement("div"),
            eval(x)[i].appendChild(eval(x + "title")[i]),
            eval(x + "value")[i] = createElement("div"),
            eval(x)[i].appendChild(eval(x + "value")[i]),
            "f2" == x && "settings" == is && 0 == style.activeicon && hide2(eval(x + "value")[i]))
        }
        function StyleItem(t, e, o, i, s) {
            css(t, {
                position: "relative",
                right: 0,
                top: 0,
                cursor: "pointer",
                height: "auto",
                width: "100%",
                overflow: "hidden",
                display: "block",
                "line-height": "1.5em"
            }),
            style.floatmarginright && 1 == style.floatleft && css(t, {
                marginRight: style.floatmarginright
            }),
            1 == style.floatleft && css(t, {
                display: "inline-block",
                "vertical-align": "top",
                "white-space": "normal"
            }),
            css(e, {
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: style.bgcolor,
                opacity: style.bga,
                pointerEvents: "none",
                transition: "opacity 0.2s linear,background .2s linear"
            }),
            css(o, {
                position: "relative",
                right: 0,
                top: 0,
                float: style.align ? style.align : "left",
                color: style.color,
                "padding-top": style.paddingtop,
                "padding-right": style.paddingright,
                "padding-bottom": style.paddingbottom,
                "padding-left": style.paddingleft,
                pointerEvents: "none",
                opacity: style.a,
                transition: "opacity 0.2s linear,color 0.2s linear"
            }),
            css(i, {
                position: "relative",
                right: 0,
                top: 0,
                float: style.valuealign ? style.valuealign : "right",
                "padding-top": style.paddingtop,
                "padding-right": style.paddingright,
                "padding-left": style.paddingleft,
                pointerEvents: "none",
                "font-size": style.valuefontsize * existv(v.globalfs, 1),
                opacity: style.a,
                color: style.valuecolor,
                transition: "opacity 0.2s linear,color 0.2s linear"
            }),
            1 == style.limitwidth ? (css(t, {
                "max-width": style.limitmaxwidth + "px!important"
            }),
            css(o, {
                "max-width": style.limitmaxwidth - 70 + "px!important"
            })) : 1 == style.floatleft ? 1 == style.floatlimitwidth && (css(t, {
                width: style.floatwidth
            }),
            css(o, {
                width: style.floatwidth - 70
            })) : (css(o, {
                "white-space": "nowrap"
            }),
            css(i, {
                "white-space": "nowrap"
            }))
        }
        function Home() {
            for (var t = 1; t < f.length; t++)
                exist(f[t]) && (1 == style.floatleft ? f[t].style.display = "inline-block" : f[t].style.display = "block");
            Retimer(),
            Remove2(),
            Resize(),
            open_action = "",
            open_settings = -1
        }
        function Remove2() {
            for (var t = 0; t < f2.length; t++)
                f2[t] && (1 == style.floatleft ? control.removeChild(f2[t]) : control2.removeChild(f2[t]),
                f2[t] = null);
            f2 = [],
            open_action = ""
        }
        function Width() {
            return control.offsetWidth
        }
        function ResizePlaylist() {
            if ("playlist" == is && (1 == style.floatleft || 1 == style.width100)) {
                var t = o.screen_w - style.marginright - style.marginleft;
                css(container, {
                    width: t
                }),
                css(control, {
                    width: t
                }),
                control2 && css(control2, {
                    width: t
                })
            }
        }
        function Resize() {
            if (!removed) {
                if ("settings" == is) {
                    o.controls && o.controls.resizeSettings();
                    var t = 1 == style.nohead && f.length > 1 ? f[1] : f[0]
                }
                if ("playlist" == is) {
                    ResizePlaylist(),
                    o.controls && o.controls.resizePlaylist();
                    t = f[0];
                    1 == v.change2playlist && MainUpdateSize()
                }
                f.length > 1 && !t && (f[1] && (t = f[1])),
                f.length > 2 && !t && (f[2] && (t = f[2])),
                t && 0 == t.offsetWidth && f2.length > 0 && (t = f2[0]),
                control.offsetWidth - control.clientWidth > 0 && t && 1 != style.floatleft ? (exist(arr_up) && css(arr_up, {
                    width: control2.offsetWidth
                }),
                exist(arr_down) && css(arr_down, {
                    width: control2.offsetWidth
                }),
                style.scrollwidth = control.offsetWidth - t.offsetWidth - (control.clientWidth - t.clientWidth)) : style.scrollwidth = 0
            }
        }
        function VisibleItems() {
            for (var t = 0, e = 0, o = "", i = 1; i < f.length; i++)
                exist(f[i]) && "visible" == f[i].style.visibility && (t++,
                e = i,
                o = faction[i]);
            return [t, e, o]
        }
        function SubtitleSettings(t) {
            sub_settings_on = !sub_settings_on,
            SubtitleSettingsMenu(t)
        }
        function SubtitleSettingsMenu() {
            Home();
            for (var t = 0; t < faction.length; t++)
                "subtitle" == faction[t] && Action(t, _cstm)
        }
        function Retimer() {
            clearTimeout(settimer),
            settimer = setTimeout((function() {
                o.setaction = !1
            }
            ), 2e3)
        }
        function SubtitleTimerMenu() {
            var t = open_action;
            Home();
            for (var e = 0; e < faction.length; e++)
                faction[e] == t && Action(e, 0)
        }
        function HideControl(t) {
            if (!("playlist" == is && 1 == v.playlist.always2 || "settings" == is && 1 == v.settings.always)) {
                if ("playlist" == is && 1 == v.playlist.droplist && 1 != v.playlist.dropnohide)
                    o.droplist && o.droplist.Hide(),
                    is_visible = !1;
                else if (1 == t && (1 != style.hidesmoothly || 1 != style.always) || o.system.tv)
                    css(container, {
                        visibility: "hidden",
                        opacity: 0,
                        top: -2e3
                    }),
                    is_visible = !1;
                else {
                    new Motion({
                        mc: container,
                        type: "alpha_div",
                        to: 0,
                        time: .1,
                        me: is,
                        ease: "elastic"
                    });
                    hidetimeout = setTimeout((function() {
                        css(container, {
                            visibility: "hidden",
                            opacity: 0,
                            top: -2e3
                        }),
                        is_visible = !1
                    }
                    ), 200)
                }
                "playlist" == is && 1 == v.playlist.hidecontrol && o.controls && o.controls.toggleControl("action", "playlist", !0),
                clearInterval(wheelinterval)
            }
        }
        function ShowTimeout() {
            clearInterval(showinterval),
            justshow = !1
        }
        function showById(t) {
            exist(o.playlist_dic[t]) && (plfolder = "",
            UpdatePlaylist(0),
            FindPlStart(o.playlist_dic[t]),
            UpdateVars0(t),
            Action(o.playlist_dic[t].pjs_i, 0),
            UpdateVars(t))
        }
        function ScrollTo(t) {
            if (f[t] && !removed) {
                if (1 == style.floatleft) {
                    var e = f[t].offsetLeft - 20;
                    new Motion({
                        mc: control,
                        type: "scrollleft",
                        to: e,
                        time: .3,
                        me: "scroll_left",
                        ease: "cubic"
                    })
                } else
                    e = f[t].offsetTop - container.offsetHeight / 2 + 20,
                    new Motion({
                        mc: control,
                        type: "scroll",
                        to: e,
                        time: .3,
                        me: "scroll_down",
                        ease: "cubic"
                    });
                setTimeout(Arrows, 1e3)
            }
        }
        function Shuffle(t) {
            for (var e, o = Object.keys(t), i = 0; i < o.length && !(e = t[o[o.length * Math.random() << 0]]); i++)
                ;
            return e
        }
        function Menuproc(t) {
            mpi[t] > -1 && Value(mpi[t]),
            f2value[0] && (f2value[0].innerHTML = "scale" == open_action ? Math.round(100 * o.mediascale.x) + "%" : FltrVal(open_action))
        }
        function FltrVal(t) {
            return "scale" == t ? Math.round(100 * o.mediascale.x) + "%" : Math.round(100 * existv(o.fltrs[t], o.menuproc[t])) + "%"
        }
        function f2i(t, e) {
            return f2action[e].indexOf(t)
        }
        function FindPlStart(t) {
            exist(o.u.endtag) && exist(o.u.endtag.conf) && exist(t.end_tag) && (o.u.endtag.conf.movie_et = t.end_tag),
            -1 != t.pjs_parent_i ? (FindPlStart(o.playlist_dic[t.pjs_parent]),
            UpdatePlaylist(t.pjs_parent)) : UpdatePlaylist(0)
        }
        this.UpdateTimer = function(t) {
            Value(o[t + "_i"])
        }
        ,
        this.Arrows = function() {
            1 == style.scrollarrows && Arrows()
        }
        ,
        this.UpdateSpeed = function() {
            UpdateSpeed()
        }
        ,
        this.Exist = function(t) {
            for (var e = 0; e < faction.length; e++)
                if (faction[e] == t)
                    return !0;
            return !1
        }
        ,
        this.resizePlaylist = function() {
            ResizePlaylist()
        }
        ,
        this.SubOpt = function() {
            sub_settings_on = !0,
            this.show(),
            _cstm = 2,
            SubtitleSettingsMenu()
        }
        ,
        this.c = function() {
            return container
        }
        ,
        this.co = function() {
            if (container.contains(control))
                return control
        }
        ,
        this.s = function(t) {
            return style[t]
        }
        ,
        this.ss = function(t) {
            return style
        }
        ,
        this.show = function() {
            if (Home(),
            clearTimeout(hidetimeout),
            is_visible = !0,
            "playlist" == is && 1 == v.playlist.droplist)
                o.droplist && o.droplist.Show();
            else {
                css(container, {
                    visibility: "visible",
                    opacity: 1,
                    transition: "opacity 0.2s linear"
                });
                var t = VisibleItems();
                1 == t[0] && ("quality" == t[2] || "audiotrack" == t[2] || "subtitle" == t[2] || "speed" == t[2] || t[2]in o.menuproc || t[2].indexOf("timer") > 0) && Action(t[1], 0)
            }
            o.controls && ("settings" == is && o.controls.resizeSettings(),
            "playlist" == is && (o.controls.resizePlaylist(),
            1 == v.playlist.hidecontrol && o.controls.toggleControl("action", "playlist", !1))),
            o.system.safari && (css(control, {
                "min-width": "auto"
            }),
            1 != style.floatleft && css(control2, {
                "min-width": "auto"
            })),
            justshow = !0,
            clearInterval(showinterval),
            showinterval = setInterval(ShowTimeout, 100)
        }
        ,
        this.open = function(t) {
            Action(t, 1)
        }
        ,
        this.hide = function(t) {
            HideControl(t)
        }
        ,
        this.SetQuality = function() {
            for (var t = 0; t < faction.length; t++)
                "quality" == faction[t] && (Value(t),
                o.files_quality.length > 1 && show(f[t]),
                "quality" == open_action && (Remove2(),
                Action(t, _cstm)))
        }
        ,
        this.Airplay = function() {
            for (var t = 0; t < faction.length; t++)
                "airplay" == faction[t] && Value(t)
        }
        ,
        this.SetSetting = function(t) {
            for (var e = 0; e < faction.length; e++)
                faction[e] == t && (Value(e),
                o["files_" + t] && o["files_" + t].length > 1 && show(f[e]),
                open_action == t && (Remove2(),
                Action(e, _cstm)))
        }
        ,
        this.SetSubtitle = function() {
            for (var t = 0; t < faction.length; t++)
                if ("subtitle" == faction[t]) {
                    if (Value(t),
                    o.files_subtitle && o.files_subtitle.length > 0) {
                        var e = !1;
                        if (o.subs) {
                            for (var i = 0; i < o.subs.length; i++)
                                if ("" != o.subs[i]) {
                                    e = !0;
                                    break
                                }
                        } else
                            e = !0;
                        e && show(f[t])
                    }
                    "subtitle" == open_action && (Remove2(),
                    Action(t, 0))
                }
        }
        ,
        this.updatePlaylist = function(t) {
            if (o.playlist = t,
            UpdatePlaylist(0),
            exist(v.plstart)) {
                if (0 != v.plstart.indexOf("x-"))
                    for (var e in o.playlist_dic)
                        o.playlist_dic.hasOwnProperty(e) && o.playlist_dic[e].pjs_id == v.plstart && (v.plstart = e);
                if (exist(o.playlist_dic[v.plstart]))
                    FindPlStart(o.playlist_dic[v.plstart]),
                    ActionPlaylist(e = o.playlist_dic[v.plstart].pjs_i),
                    1 == v.playlist.openplaylistroot && 1 != style.droplist ? (UpdatePlaylist(0),
                    setTimeout((function() {
                        Resize()
                    }
                    ), 500)) : setTimeout((function() {
                        ScrollTo(e),
                        Resize()
                    }
                    ), 500),
                    v.plstart = void 0;
                else
                    ActionPlaylist(0)
            } else
                ActionPlaylist(0);
            1 == style.droplist && (exist(o.droplist) || (o.droplist = new PluginDroplist))
        }
        ,
        this.playById = function(t) {
            exist(o.playlist_dic[t]) && (FindPlStart(o.playlist_dic[t]),
            Action(o.playlist_dic[t].pjs_i, 0),
            ScrollTo(o.playlist_dic[t].pjs_i))
        }
        ,
        this.openById = function(t) {
            exist(o.playlist_dic[t]) && (FindPlStart(o.playlist_dic[t]),
            o.playlist_dic[t].file ? ("prerollt"in v && (v.preroll = v.prerollt),
            ActionPlaylist(o.playlist_dic[t].pjs_i),
            UpdateVars0(t),
            o.actions.NewFile(o.playlist_dic[t].file, 1),
            UpdateVars(t),
            ScrollTo(o.playlist_dic[t].pjs_i),
            o.droplist && o.droplist.Update()) : o.playlist_dic[t].folder && UpdatePlaylist(t))
        }
        ,
        this.PlaylistNext = function() {
            if (PauseBannerPlugin("pausebannerhide"),
            autonextopenfolder = !0,
            t = parseInt(plx) + 1,
            "" != plid && (o.plhistory[plid] = !0,
            shuffle = removebykey(shuffle, plid)),
            1 == v.shuffle) {
                if (null == (t = Shuffle(shuffle))) {
                    if (1 == v.shuffle8 || 1 == v.playlist.autoplaylist) {
                        for (var t in shuffle_.sort((function(t, e) {
                            return Math.random() - .5
                        }
                        )),
                        shuffle_)
                            shuffle_.hasOwnProperty(t) && (shuffle[t] = shuffle_[t]);
                        t = Shuffle(shuffle)
                    } else
                        o.actions.ShuffleEnd();
                    v.playlist.dontplay = 1,
                    o.u.playlist.dontplay = 1
                }
            } else {
                if (plid.indexOf("xxx-") > -1) {
                    let e = plid.replace("xxx-", "").split("-");
                    e[2] = parseInt(e[2]) + 1,
                    e[4] = parseInt(e[4]) + 1,
                    e[8] = parseInt(e[8]) + 1;
                    let i = `xxx-${e.join("-")}`;
                    Object.keys(o.playlist_dic).forEach((function(e) {
                        e.indexOf(i) > -1 && (plid = e,
                        plx = -1,
                        faction[t] = "playlistfolder")
                    }
                    ))
                }
                if (("playlistfolder" == faction[t] || -1 == plx) && "" != plid) {
                    var e = Object.keys(o.playlist_dic).indexOf(plid);
                    if (e < Object.keys(o.playlist_dic).length) {
                        var i = o.playlist_dic[Object.keys(o.playlist_dic)[e]];
                        i && (exist(i.folder) && (i = o.playlist_dic[Object.keys(o.playlist_dic)[e]]),
                        this.openById(i.id),
                        t = -1,
                        o.actions.Play(),
                        v.playlist.dontplay = 0,
                        o.u.playlist.dontplay = 0)
                    }
                }
            }
            t > -1 && (Action(t, 0),
            ScrollTo(t))
        }
        ,
        this.menuproc = function(t) {
            Menuproc(t)
        }
        ,
        this.PlaylistNextExist = function() {
            if (1 == v.shuffle)
                return Object.keys(shuffle).length > 0;
            var t = !1;
            return o.playlist_dic && (t = Object.keys(o.playlist_dic).indexOf(plid) < Object.keys(o.playlist_dic).length - 1),
            t
        }
        ,
        this.PlaylistRewind = function() {
            exist(o.pl_first_id) && showById(o.pl_first_id)
        }
        ,
        this.PlaylistPrevExist = function() {
            var t = plx > 0;
            if (o.playlist_dic) {
                var e = Object.keys(o.playlist_dic)
                  , i = e.indexOf(plid);
                t = i > 0,
                1 == i && exist(o.playlist_dic[e[0]].folder) && (t = !1)
            }
            return t
        }
        ,
        this.PlaylistExist = function() {
            return exist(o.playlist_dic)
        }
        ,
        this.PlaylistPrev = function() {
            if (autoprevopenfolder = !0,
            this.PlaylistPrevExist()) {
                var t = parseInt(plx) - 1;
                if (t < 0) {
                    var e = Object.keys(o.playlist_dic).indexOf(plid);
                    if (e > 0) {
                        var i = o.playlist_dic[Object.keys(o.playlist_dic)[e - 1]];
                        i && (exist(i.folder) && (i = o.playlist_dic[Object.keys(o.playlist_dic)[e - 2]]),
                        i && (this.openById(i.id),
                        o.actions.Play()))
                    }
                } else
                    Action(t, 0),
                    ScrollTo(t)
            }
        }
        ,
        this.PlaylistHere = function() {
            plx > 0 && ScrollTo(plx)
        }
        ,
        this.g = function(t) {
            switch (t) {
            case "width":
                return Width();
            case "height":
                return container.offsetHeight;
            case "top":
                return style.margintop;
            case "scroll_height":
                return control.scrollHeight;
            case "margin_bottom":
                return style.marginbottom;
            case "x":
                return int(container.style.left);
            case "y":
                return int(container.style.top);
            case "opacity":
                return container.style.opacity;
            case "show":
                return is_visible;
            case "open":
                return open_settings;
            case "key":
                return key;
            case "motion_id":
                return key + motion_id;
            case "empty":
                return empty;
            case "playlist":
                return "playlist" == is;
            case "activeicon":
                return _activeIcon;
            case "butplstart":
                return o.playlist_dic[o.butplstart] ? o.playlist_dic[o.butplstart].title : "";
            case "title2":
                return v.title2 ? v.title2 : ""
            }
        }
        ,
        this.prenewpl = function() {
            plid = "",
            v.plstart = ""
        }
        ,
        this.empty = function() {
            if ("settings" == is) {
                for (var t = 0, e = 1; e < 11; e++) {
                    if ("quality" == faction[e]) {
                        var i = o.files_quality.length;
                        if (exist(v.forbidden_quality))
                            for (var s = v.forbidden_quality.split(","), n = 0; n < s.length; n++)
                                o.files_quality.indexOf(s[n]) > -1 && i--;
                        i > 0 && (i > 1 || 1 == i && 1 != o.files_quality && 1 == style.show1value) && t++
                    }
                    if ("airplay" == faction[e] && o.airplay && t++,
                    "download" == faction[e] && ("native" == o.file_type || v.download) && t++,
                    "audiotrack" == faction[e] && o.files_audiotrack.length > 0 && t++,
                    "channel" == faction[e] && 1 == v.channels && o.files_channel.length > 0 && t++,
                    "subtitle" == faction[e]) {
                        if (exist(o.subs))
                            for (var a = 0; a < o.subs.length; a++)
                                if ("" != o.subs[a]) {
                                    t++;
                                    break
                                }
                        1 == t && 1 == o.subload && (t = 0),
                        1 == v.sub_upload && 1 == v.sub_upload0 && t++
                    }
                    "speed" == faction[e] && "vimeo" != o.file_type && t++,
                    (faction[e]in o.menuproc || "share" == faction[e] || "color" == faction[e]) && t++,
                    faction[e] && faction[e].indexOf("timer") > 0 && t++,
                    1 == v.settings[is + e + "hide"] && t--
                }
                return 0 == t
            }
            return "playlist" == is ? 0 == f.length : empty
        }
        ,
        this.Remove = function() {
            container.parentNode == o.frame && (container.removeChild(control),
            o.frame.removeChild(container),
            o.droplist && o.droplist.Remove(),
            container = null,
            control = null,
            removed = !0)
        }
    };
    function PluginShare_whatsapp() {
        this.share = function() {
            return (o.system.mobile ? "https://wa.me/?" : "https://web.whatsapp.com/send?") + "text="
        }
        ,
        this.icon = function(t) {
            return "<path d='M14.2464991,5.25712408 C13.1148991,4.12492408 11.6100991,3.50092408 10.0068991,3.50032408 C6.70329913,3.50032408 4.01469913,6.18772408 4.01349913,9.49132408 C4.01289913,10.5473241 4.28889913,11.5781241 4.81329913,12.4865241 L4.00029913,15.5003241 L7.14009913,14.7581241 C8.01549913,15.2357241 9.00069913,15.4871241 10.0038991,15.4877241 C13.3092991,15.4877241 15.9978991,12.7997241 15.9996991,9.49672408 C16.0008991,7.89532408 15.3780991,6.38992408 14.2464991,5.25712408 Z M12.9390991,11.6327241 C12.8142991,11.9825241 12.2028991,12.3197241 11.9280991,12.3443241 C11.6532991,12.3695241 11.3958991,12.4685241 10.1310991,11.9699241 C8.60889913,11.3699241 7.64769913,9.80932408 7.57329913,9.70972408 C7.49829913,9.60952408 6.96189913,8.89792408 6.96189913,8.16112408 C6.96189913,7.42432408 7.34889913,7.06192408 7.48629913,6.91252408 C7.62369913,6.76252408 7.78569913,6.72532408 7.88589913,6.72532408 C7.98549913,6.72532408 8.08569913,6.72532408 8.17269913,6.72892408 C8.27949913,6.73312408 8.39769913,6.73852408 8.50989913,6.98752408 C8.64309913,7.28392408 8.93409913,8.02432408 8.97129913,8.09932408 C9.00849913,8.17432408 9.03369913,8.26192408 8.98389913,8.36152408 C8.93409913,8.46112408 8.90889913,8.52352408 8.83449913,8.61112408 C8.75949913,8.69872408 8.67729913,8.80612408 8.61009913,8.87332408 C8.53509913,8.94772408 8.45709913,9.02932408 8.54409913,9.17872408 C8.63169913,9.32872408 8.93169913,9.81892408 9.37689913,10.2155241 C9.94929913,10.7255241 10.4310991,10.8833241 10.5810991,10.9589241 C10.7310991,11.0339241 10.8180991,11.0213241 10.9056991,10.9211241 C10.9932991,10.8215241 11.2800991,10.4843241 11.3796991,10.3343241 C11.4792991,10.1843241 11.5794991,10.2095241 11.7168991,10.2593241 C11.8542991,10.3091241 12.5904991,10.6715241 12.7398991,10.7465241 C12.8898991,10.8215241 12.9894991,10.8587241 13.0266991,10.9211241 C13.0638991,10.9829241 13.0638991,11.2829241 12.9390991,11.6327241 Z' fill='" + t + "' fill-rule='nonzero'></path>"
        }
    }
    function PluginShare_telegram() {
        this.share = function() {
            return "https://t.me/share/url?url="
        }
        ,
        this.icon = function(t) {
            return "<path d='M15.774328,4.61928677 C15.6001007,4.47186369 15.3186567,4.45846159 14.8361812,4.60588467 L14.8361812,4.60588467 C14.5011287,4.71310145 11.525863,5.83887768 8.89905178,6.92444761 C6.54028255,7.90280076 4.62378254,8.76053503 4.39594688,8.86775181 C4.14130702,8.9481644 3.591821,9.18940216 3.56501681,9.5646609 C3.55161471,9.80589866 3.75264618,10.0203322 4.14130702,10.1945595 C4.55677205,10.4089931 6.39285947,11.0254896 6.78152031,11.1461085 C6.91554129,11.6017798 13.4557651,6.66394451 13.4959714,6.82476969 C13.5495798,7.06600745 8.27203981,11.6399635 8.3524524,11.6935719 C8.3658545,11.706974 7.97987656,14.3468113 8.00668076,14.3602134 C8.04688705,14.3870176 8.0174202,14.6306539 8.13718414,14.7378707 C8.25694808,14.8450875 8.2536879,14.8345227 8.51661242,14.8345227 C9.01249004,14.4324598 9.91761122,13.545084 10.158849,13.2904441 C11.2176147,14.1213742 12.3701951,15.046119 12.4774119,15.1533357 L12.490814,15.1667378 C12.7454539,15.3811714 13.0134958,15.5017903 13.2547336,15.5017903 C13.3351462,15.5017903 13.4155588,15.4883882 13.4959714,15.461584 C13.7774154,15.3677693 13.9784469,15.0997273 14.0454574,14.7378707 C14.0454574,14.7244686 14.0588595,14.6708602 14.0856637,14.5770455 C14.541335,12.593535 14.9031916,10.8512623 15.1980378,9.39043363 C15.4794819,7.95640915 15.7073175,6.54918887 15.8413385,5.79867139 C15.8681427,5.61104201 15.8949469,5.46361894 15.908349,5.36980425 C15.9485553,5.10176229 15.9753595,4.79351404 15.774328,4.61928677 Z' fill='" + t + "' fill-rule='nonzero'></path>"
        }
    }
    var MediaYoutube = function(t, e) {
        var i = !1;
        0 == t.indexOf("intro") && (i = !0,
        t = t.substr(5));
        var s, n, a, r, l = YoutubeID(t), d = !1, c = !1, u = !1, p = !1, f = !0, h = [], g = 1, m = !1, b = 0, y = 0, x = !1, w = "pljs_yt_" + v.id + (i ? "intro" : ""), _ = createElement("div");
        if (_.setAttribute("id", w),
        e.appendChild(_),
        o.airplay = !1,
        !i && o.actions.AirplayChanged(),
        o.system.mobile && (v.preload = 1),
        1 != v.youtubecontrols) {
            var k = createElement("div");
            e.appendChild(k),
            css(k, {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": "#ff0000",
                height: "100%",
                width: "100%",
                opacity: 0
            }),
            k.addEventListener("dblclick", (function(t) {
                t.cancelBubble = !0
            }
            )),
            o.system.mobile ? (k.addEventListener("touchstart", (function(t) {
                t.cancelBubble = !0
            }
            )),
            k.addEventListener("click", (function(t) {
                t.cancelBubble = !0
            }
            )),
            k.addEventListener("touchend", (function(t) {
                t.cancelBubble = !0,
                ScreenClick(t),
                1 == v.screenclick && (setTimeout(P, 100),
                setTimeout(S, 1e3))
            }
            ))) : k.addEventListener("mousemove", (function(t) {
                var e = !0;
                1 == v.vast && (exist(v.preroll) && !u && (e = !1),
                exist(v.playroll) && "paused" == z() && D() > 0 && (e = !1)),
                e && 1 == v.screenclick && 1 != v.ytcl && (hide2(this),
                setTimeout(S, 2e3))
            }
            )),
            1 == v.screenclick && 1 != v.ytcl1 && hide2(k)
        }
        function S() {
            show2(k)
        }
        function P() {
            1 != v.ytcl && hide2(k)
        }
        if (1 == v.preload && 0 == v.autoplay && j(),
        window.YT)
            A();
        else {
            window.onYouTubeIframeAPIReady = function() {
                A();
                for (var t = 0; t < pljssglobal.length; t++)
                    pljssglobal[t].api("id") != v.id && pljssglobal[t].api("isyoutube") && pljssglobal[t].api("youtubeready")
            }
            ;
            var T = Script("youtube.com/iframe_api", "youtube.com/iframe_api", "youtube_iframe_api");
            T && (T.onerror = function(t) {
                o.actions.MediaReady(),
                1 != v.yterrors && (s = "YouTube API Error",
                o.media.onError())
            }
            )
        }
        function A() {
            1 == v.preload || i ? !d && O() : o.actions.MediaReady()
        }
        function O() {
            if ("YT"in window)
                if (exist(YT.Player) && !d) {
                    log("Youtube Init");
                    var t = 0;
                    1 == v.youtubecontrols && (t = 1),
                    o.seekto > 0 && (b = parseInt(o.seekto)),
                    n = new YT.Player(w,{
                        height: o.container_h,
                        width: o.container_w,
                        videoId: l,
                        playerVars: {
                            enablejsapi: 1,
                            playerapiid: w,
                            html5: 1,
                            disablekb: 1,
                            autohide: 1,
                            playsinline: (0 == v.playsinlineonmobile || 1 != v.playsinlineonmobileiphone && o.system.iphone) && o.system.mobile ? 0 : 1,
                            iv_load_policy: 3,
                            controls: t,
                            showinfo: 0,
                            modestbranding: 1,
                            rel: 0,
                            autoplay: i ? 1 : 0,
                            loop: 0
                        },
                        events: {
                            onReady: E,
                            onStateChange: L,
                            onError: I,
                            onPlaybackQualityChange: M
                        }
                    }),
                    o.seekto > 0 && (o.seekto = void 0),
                    H(),
                    d = !0
                } else
                    setTimeout(O, 500);
            else
                setTimeout(O, 500)
        }
        function E() {
            if (o.media)
                if (log("Youtube Ready"),
                c = !0,
                clearTimeout(a),
                o.actions.StopWaiting(),
                i)
                    o.system.mutedautoplay && o.actions.Mute(),
                    n.playVideo(),
                    o.vast.ytReady();
                else if (1 == v.autoplay && o.system.mutedautoplay && !o.acted && (o.actions.Mute(),
                o.system.mobile && (clearInterval(r),
                r = setInterval(C, 300))),
                0 == v.preload ? n.playVideo() : o.actions.MediaReady(),
                o.media.onDuration(),
                1 != g && N(g),
                o.media.onMeta(),
                o.actions.LoadedData(),
                H(),
                1 == v.yttitle)
                    try {
                        n.getVideoData() && exist(n.getVideoData().title) && (v.title = n.getVideoData().title,
                        o.actions.Title("title"))
                    } catch (t) {}
        }
        function C() {
            var t = n.getPlayerState();
            2 != t && -1 != t || (o.controls.Pause(),
            o.controls.StopWaiting(),
            clearInterval(r)),
            1 == t && clearInterval(r)
        }
        function L(t) {
            if (1 == v.ytlog && log("YT", t.data),
            i)
                t.data == YT.PlayerState.ENDED && o.vast.ytEnded(),
                t.data,
                YT.PlayerState.PLAYING;
            else {
                if (t.data == YT.PlayerState.PLAYING) {
                    if (1 == y && (y = 0,
                    E()),
                    o.play || o.actions.Play(),
                    b > 0 && (n.seekTo(b, !0),
                    b = 0,
                    o.seekto = void 0),
                    S(),
                    u = !0,
                    c = !0,
                    p ? n.pauseVideo() : (o.media.onPlay(),
                    o.media.onTimeupdate()),
                    function() {
                        if (!x) {
                            var t = n.getAvailableQualityLevels() + "";
                            if ("" != t && null != t) {
                                if (o.files_quality = t.split(","),
                                o.files_quality = o.files_quality.reverse(),
                                0 == v.ytautoquality) {
                                    var e = o.files_quality.indexOf("auto");
                                    e > -1 && o.files_quality.splice(e, 1)
                                }
                                for (var i = 0; i < o.files_quality.length; i++)
                                    o.files_quality[i] = V(o.files_quality[i]);
                                x = !0,
                                R(n.getPlaybackQuality())
                            }
                        }
                    }(),
                    exist(v.default_quality)) {
                        for (var e = 0; e < o.files_quality.length; e++)
                            v.default_quality == o.files_quality[e] && F(e);
                        v.default_quality = null
                    } else if (exist(o.default_quality)) {
                        for (e = 0; e < o.files_quality.length; e++)
                            o.default_quality == o.files_quality[e] && F(e);
                        o.default_quality = null
                    }
                    m = !1
                }
                -1 == t.data && m && o.play && (o.actions.StopWaiting(),
                m = !1,
                !o.nopause && o.play && o.actions.Pause()),
                t.data,
                YT.PlayerState.PAUSED,
                t.data == YT.PlayerState.ENDED && (v.start > 0 && (b = v.start),
                o.media.onEnded(),
                o.media.onDuration()),
                t.data == YT.PlayerState.BUFFERING && (o.play,
                o.play && (m = !0,
                j())),
                t.data,
                YT.PlayerState.CUED
            }
        }
        function I(t) {
            i ? o.vast.ytError() : (2 == t.data && (s = "wrong youtube id"),
            5 == t.data && (s = "network empty"),
            101 != t.data && 150 != t.data && 100 != t.data || (s = "this video is unavailable"),
            1 == v.customyterrors && exist(v.customyterror) && (s = v.customyterror),
            1 != v.yterrors ? o.media.onError() : hide(o.poster))
        }
        function j() {
            o.media ? o.media.onWaiting() : a = setTimeout(j, 100)
        }
        function M(t) {
            R(t.data)
        }
        function R(t) {
            o.current_quality = o.files_quality.indexOf(V(t + "")),
            o.controls.QualityChanged(o.current_quality)
        }
        function z() {
            var t = -1;
            c && (t = n.getPlayerState());
            var e = "";
            return -1 == t && (e = "paused"),
            1 != t && 3 != t || (e = "playing"),
            2 == t && (e = "paused",
            o.play && (o.controls.Pause(),
            o.actions.StopWaiting())),
            5 == t && (e = "paused"),
            0 == t && (e = "ended"),
            e
        }
        function H() {
            n && n.setSize(o.screen_w, o.screen_h)
        }
        function V(t) {
            var e = t;
            return "tiny" == t && (e = "160p"),
            "small" == t && (e = "240p"),
            "medium" == t && (e = "360p"),
            "large" == t && (e = "480p"),
            "hd720" == t && (e = "720p"),
            "hd1080" == t && (e = "1080p"),
            1 == v.nameofyoutubequality && (e = Lang(e)),
            "auto" == t && (e = Lang("auto")),
            h[e] = t,
            e
        }
        function D() {
            return c ? n.getCurrentTime() : 0
        }
        function N(t) {
            n && n.setPlaybackRate(t),
            g = t
        }
        function F(t) {
            if (c && exist(o.files_quality[t])) {
                var e = h[o.files_quality[t]];
                f = "auto" == e;
                D();
                n.setPlaybackQuality(e)
            }
        }
        function q(e) {
            t = e,
            n && (y = 1,
            n.loadVideoById(e, 0))
        }
        this.size = function() {
            return {
                width: 0,
                height: 0
            }
        }
        ,
        this.src = function(t) {
            l = YoutubeID(t),
            o.seekto > 0 && (b = parseInt(o.seekto)),
            q(l)
        }
        ,
        this.YoutubeReady = function() {
            A()
        }
        ,
        this.Play = function() {
            c ? n.playVideo() : d || O()
        }
        ,
        this.Pause = function() {
            c && n.pauseVideo()
        }
        ,
        this.Toggle = function() {
            c && ("playing" == z() ? n.pauseVideo() : n.playVideo())
        }
        ,
        this.Seek = function(t) {
            c && n.seekTo(t, !0)
        }
        ,
        this.tag = function() {
            return !1
        }
        ,
        this.Mute = function() {
            c && n.mute()
        }
        ,
        this.Unmute = function() {
            c && n.unMute()
        }
        ,
        this.Volume = function(t) {
            c && n.setVolume(100 * t)
        }
        ,
        this.isPlaying = function() {
            return "playing" == z()
        }
        ,
        this.isLive = function() {
            return !1
        }
        ,
        this.setQuality = function(t) {
            F(t)
        }
        ,
        this.setSpeed = function(t) {
            N(t)
        }
        ,
        this.ready = function() {
            return c
        }
        ,
        this.status = function() {
            return z()
        }
        ,
        this.time = function() {
            return D()
        }
        ,
        this.duration = function() {
            var t = c ? n.getDuration() : 0;
            return exist(v.end) && (t = v.end),
            t
        }
        ,
        this.loaded = function() {
            var t = 0;
            return c && (t = n.getVideoLoadedFraction() * n.getDuration()),
            t
        }
        ,
        this.resize = function() {
            H()
        }
        ,
        this.errorMessage = function() {
            return s
        }
        ,
        this.auto = function() {
            return 1 == v.ytautoquality && f
        }
        ,
        this.playId = function(t) {
            q(t)
        }
        ,
        this.BeforeVast = function() {
            o.system.mobile && o.system.android ? (this.Play(),
            p = !0) : "playing" == z() && this.Pause()
        }
        ,
        this.AfterVast = function() {
            p = !1
        }
        ,
        this.nativeControls = function() {
            return !0
        }
        ,
        this.Remove = function() {
            c && n.destroy(),
            c = !1,
            x = !1;
            try {
                _ && e.removeChild(_),
                e.removeChild(k)
            } catch (t) {}
        }
    }
      , TimeStore = function() {
        o.p.href && (o.d = o.p.href);
        var t = this
          , e = ""
          , i = 0
          , s = 0;
        o.storage && 1 != v.timestoredontuse && (null != localStorage.getItem("pljsplayfrom_" + v.id + o.href2) && (e = localStorage.getItem("pljsplayfrom_" + v.id + o.href2)),
        1 == v.playedstore && null != localStorage.getItem("pljsplayed_" + v.id + o.href2) && (o.playedstore = localStorage.getItem("pljsplayed_" + v.id + o.href2)),
        exist(v.cuid) && (null != localStorage.getItem("pljsplayfrom_" + o.d + v.cuid) && (e = localStorage.getItem("pljsplayfrom_" + o.d + v.cuid)),
        1 == v.playedstore && null != localStorage.getItem("pljsplayed_" + o.d + v.cuid) && (o.playedstore = localStorage.getItem("pljsplayed_" + o.d + v.cuid))),
        o.playedstore && 1 == v.playedstore && (o.playedstored = o.playedstore.split(",")),
        0 == e.indexOf("{") && (1 == v.timestorejustbut ? o.butplstart = e.substr(1, e.indexOf("}") - 1) : o.plcontinue = v.plstart = e.substr(1, e.indexOf("}") - 1),
        e = e.substr(e.indexOf("}") + 1),
        1 == v.timestore0plroot && (v.playlist.openplaylistroot = 0)),
        a(e));
        let n = function(n) {
            if (null != n.data && "timestore_localstorage" == n.data.event && !t.postMessageTimeStore) {
                if (!("info"in n.data) || null == n.data.info)
                    return;
                if (!("title"in n.data.info) || !("value"in n.data.info))
                    return;
                localStorage.setItem(n.data.info.title, n.data.info.value),
                1 != v.timestoredontuse && (null != localStorage.getItem("pljsplayfrom_" + v.id + o.href2) && (e = localStorage.getItem("pljsplayfrom_" + v.id + o.href2)),
                1 == v.playedstore && null != localStorage.getItem("pljsplayed_" + v.id + o.href2) && (o.playedstore = localStorage.getItem("pljsplayed_" + v.id + o.href2)),
                exist(v.cuid) && (null != localStorage.getItem("pljsplayfrom_" + o.d + v.cuid) && (e = localStorage.getItem("pljsplayfrom_" + o.d + v.cuid)),
                1 == v.playedstore && null != localStorage.getItem("pljsplayed_" + o.d + v.cuid) && (o.playedstore = localStorage.getItem("pljsplayed_" + o.d + v.cuid))),
                o.playedstore && 1 == v.playedstore && (o.playedstored = o.playedstore.split(",")),
                0 == e.indexOf("{") ? (1 == v.timestorejustbut ? o.butplstart = e.substr(1, e.indexOf("}") - 1) : o.plcontinue = v.plstart = e.substr(1, e.indexOf("}") - 1),
                e = e.substr(e.indexOf("}") + 1),
                1 == v.timestore0plroot && (v.playlist.openplaylistroot = 0),
                a(e),
                o.controls.Played(i, s),
                o.controls.Duration(i, s)) : (a(e),
                t.updateCuid())),
                t.postMessageTimeStore = !0
            }
        };
        function a(t) {
            if (t && t.indexOf("--") > 0) {
                var e = t.split("--");
                i = parseFloat(e[0]),
                1 == v.timestoreunauto && i > 0 && 1 == v.autoplay && (v.autoplay = 0),
                1 == v.timestorejustbut ? o.butseekto = i : (s = parseFloat(e[1]),
                o.seekto = i)
            }
        }
        "addEventListener"in window ? window.addEventListener("message", n) : window.attachEvent("message", n),
        this.updateCuid = function() {
            exist(v.cuid) && (null != localStorage.getItem("pljsplayfrom_" + o.d + v.cuid) ? (a(e = localStorage.getItem("pljsplayfrom_" + o.d + v.cuid)),
            o.controls.Played(i, s),
            o.controls.Duration(i, s),
            v.duration = s) : (o.seekto = 0,
            o.controls.Played(0, 0),
            o.controls.Duration(0, 0),
            v.duration = 0))
        }
        ,
        this.write = function(t, e) {
            if (o.p.href && (o.d = o.p.href),
            o.media.isLive() && 1 == v.timestorenolive)
                ;
            else {
                var i = (new Date).getTime();
                localStorage.setItem("pljsplayfrom_" + (exist(v.cuid) ? o.d + v.cuid : v.id + o.href2), (exist(o.plid) ? "{" + o.plid + "}" : "") + t + "--" + e + "--" + i),
                window.parent.postMessage({
                    event: "timestore_localstorage",
                    info: {
                        title: "pljsplayfrom_" + (exist(v.cuid) ? o.d + v.cuid : v.id + o.href2),
                        value: (exist(o.plid) ? "{" + o.plid + "}" : "") + t + "--" + e + "--" + i
                    }
                }, "*")
            }
        }
        ,
        this.writePl = function(t) {
            o.p.href && (o.d = o.p.href),
            o.playedstore = (o.playedstore ? o.playedstore + "," : "") + t,
            localStorage.setItem("pljsplayed_" + (exist(v.cuid) ? o.d + v.cuid : v.id + o.href2), o.playedstore);
            let e = !1;
            !e && o.plid && (window.parent.postMessage({
                event: "tabs",
                info: {
                    title: "serial-season-episode",
                    value: o.plid
                }
            }, "*"),
            console.log("tabs"),
            e = !0),
            window.parent.postMessage({
                event: "timestore_localstorage",
                info: {
                    title: "pljsplayed_" + (exist(v.cuid) ? o.d + v.cuid : v.id + o.href2),
                    value: o.playedstore
                }
            }, "*")
        }
        ,
        this.flag = function() {
            return {
                t: i,
                d: s
            }
        }
    }
      , ChromeCast = function() {
        var t, e, i, s, n;
        function a() {
            o.controls.Review(),
            o.controls.resize()
        }
        function r(e) {
            cast && cast.framework && (h((t.isConnected ? "" : "dis") + "connected"),
            t.isConnected ? l() : d())
        }
        function l(n) {
            var a = cast.framework.CastContext.getInstance().getCurrentSession()
              , r = "video/mp4";
            "hls" == o.file_type && (r = "application/x-mpegurl"),
            "dash" == o.file_type && (r = "application/dash+xml");
            var l = o.media.currentFile();
            exist(v.casturl) && (l = v.casturl);
            var c = new chrome.cast.media.MediaInfo(l,r);
            c.metadata = new chrome.cast.media.GenericMediaMetadata,
            c.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
            var u = [];
            if (exist(o.subs) && exist(o.current_subtitle) && 1 == v.chromecast.sub) {
                for (var p in c.textTrackStyle = g(),
                o.subs)
                    if (o.subs[p].indexOf("vtt") > 0) {
                        var f = new chrome.cast.media.Track(0,chrome.cast.media.TrackType.TEXT);
                        f.trackContentId = o.subs[p],
                        f.trackContentType = "text/vtt",
                        f.subtype = "CAPTIONS",
                        f.name = o.files_subtitle[p],
                        f.trackId = parseInt(p),
                        f.customData = null,
                        u.push(f)
                    }
                u.length > 0 && (c.tracks = u)
            }
            v.poster && (c.metadata.images = [new chrome.cast.Image(v.poster)]),
            c.metadata.title = o.titlestore ? o.titlestore : v.title ? v.title : "";
            var m = new chrome.cast.media.LoadRequest(c);
            m.currentTime = o.seekto > 0 ? o.seekto : o.casting ? 0 : o.media.time(),
            m.autoplay = o.play || 1 == n,
            u.length > 0 && o.current_subtitle > -1 && o.current_subtitle < u.length && (m.activeTrackIds = [parseInt(o.current_subtitle)],
            h("subtitle " + o.current_subtitle)),
            a.loadMedia(m).then((function() {
                h("connected to " + (i = a.getCastDevice().friendlyName)),
                0 == v.chromecast.message || o.casting || (s && o.frame.removeChild(s),
                s = createElement("div"),
                css(s, {
                    position: "absolute",
                    top: "20px",
                    width: "100%",
                    left: 0,
                    opacity: .7,
                    color: "#fff",
                    "pointer-events": "none"
                }),
                s.innerHTML = "<center>" + Lang("castdevice") + " &laquo;" + i + "&raquo;</center>",
                o.frame.appendChild(s)),
                t.volumeLevel = v.volume,
                e.setVolumeLevel(),
                o.muted && !t.isMuted && e.muteOrUnmute(),
                js("casted"),
                1 != n && (o.play ? o.media.Pause() : !t.isPaused && e.playOrPause()),
                hide(o.mediacontainer),
                o.casting = !0
            }
            ), (function(t) {
                h(t),
                d(),
                o.alert.txt(Lang("casterror"))
            }
            ))
        }
        function d() {
            s && o.frame.removeChild(s),
            s = void 0,
            o.casting = !1,
            show(o.mediacontainer),
            js("uncasted"),
            t.savedPlayerState && (o.actions.Seek(t.savedPlayerState.currentTime),
            t.savedPlayerState.isPaused ? o.media.Pause() : o.media.Play())
        }
        function c() {
            t.isPaused ? (h("pause"),
            js("castpause"),
            o.controls.Pause()) : (h("play"),
            js("castplay"),
            o.controls.Play())
        }
        function u() {
            o.actions.Volume(t.volumeLevel)
        }
        function p() {
            t.isMuted ? o.actions.Mute() : o.actions.Unmute()
        }
        function f() {
            t.isConnected && null == t.playerState && t.currentTime == t.duration && (o.controls.Pause(),
            o.media.onEnded())
        }
        function h(t) {
            v.chromecast && 1 == v.log && log("chromecast", t)
        }
        function g() {
            var t = new chrome.cast.media.TextTrackStyle
              , e = Math.round(255 * v.sub_bga).toString(16);
            return t.backgroundColor = CheckColor(v.sub_bgcolor) + (1 == e.length ? e + "0" : e),
            t.edgeColor = "#00000016",
            t.edgeType = "DROP_SHADOW",
            t.fontFamily = "CASUAL",
            t.fontScale = parseFloat(parseInt(v.sub_sizeproc) / 100),
            t.foregroundColor = CheckColor(v.sub_color) + Math.round(255).toString(16),
            t
        }
        window.__onGCastApiAvailable = function(t, e) {
            if (t)
                for (var o = 0; o < pljssglobal.length; o++)
                    pljssglobal[o].api("castinit");
            else
                h("error: " + e)
        }
        ,
        this.init = function() {
            !function() {
                if (h("available"),
                exist(chrome.cast) && exist(cast) && !o.cast_available) {
                    var i = "CC1AD845";
                    1 == v.chromecast.receiver && v.chromecast.receiverid && (i = v.chromecast.receiverid),
                    cast.framework.CastContext.getInstance().setOptions({
                        receiverApplicationId: i,
                        autoJoinPolicy: "tab_and_origin_scoped",
                        language: "en-US",
                        resumeSavedSession: !1
                    }),
                    t = new cast.framework.RemotePlayer,
                    (e = new cast.framework.RemotePlayerController(t)).addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, r),
                    e.addEventListener(cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED, c),
                    e.addEventListener(cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, u),
                    e.addEventListener(cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, p),
                    e.addEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED, f),
                    o.cast_available = !0,
                    setTimeout(a, 1e3)
                }
            }()
        }
        ,
        Script("gstatic.com/cv", "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),
        this.button = function(t) {
            return n = t,
            "<button is='google-cast-button' id='pjs_cast_button_" + v.id + "' style='padding:0;width:20px;height:20px;--connected-color:" + t + ";--disconnected-color:" + t + ";border:0;background:transparent;pointer-events:auto;cursor:pointer'></button>"
        }
        ,
        this.Color = function(t, e) {
            if (n != e) {
                var o = document.getElementById("pjs_cast_button_" + v.id);
                if (o) {
                    var i = o.getAttribute("style")
                      , s = new RegExp(n,"gi");
                    i = i.replace(s, e),
                    o.setAttribute("style", i)
                }
                n = e
            }
        }
        ,
        this.Volume = function(o) {
            t.isConnected && (t.volumeLevel = o,
            e.setVolumeLevel())
        }
        ,
        this.Mute = function() {
            t.isConnected && (t.isMuted || e.muteOrUnmute())
        }
        ,
        this.Unmute = function() {
            t.isConnected && t.isMuted && e.muteOrUnmute()
        }
        ,
        this.Play = function(o) {
            t.isConnected && (t.isPaused ? e.playOrPause() : t.playerState)
        }
        ,
        this.Pause = function(o) {
            t.isConnected && !t.isPaused && e.playOrPause()
        }
        ,
        this.Sub = function() {
            1 == v.chromecast.sub && function() {
                if (t.isConnected) {
                    var e = g()
                      , i = new chrome.cast.media.EditTracksInfoRequest([parseInt(o.current_subtitle)],e);
                    cast.framework.CastContext.getInstance().getCurrentSession().getSessionObj().media[0].editTracksInfo(i, (function() {
                        h("subtitle " + o.current_subtitle)
                    }
                    ), (function(t) {
                        h("subtitle error" + t)
                    }
                    ))
                }
            }()
        }
        ,
        this.Time = function(e) {
            return t.isConnected && (e = t.currentTime),
            e
        }
        ,
        this.Duration = function(e) {
            return t.isConnected && (e = t.duration),
            e
        }
        ,
        this.Exit = function() {
            cast && cast.framework && d()
        }
        ,
        this.Go = function() {
            cast && cast.framework && t.isConnected && l(o.play)
        }
        ,
        this.Seek = function(o) {
            t.isConnected && (t.currentTime = o,
            e.seek())
        }
    }
      , PluginSub = function() {
        var t, e = [], s = [], n = !0, a = -1;
        function r(e) {
            if (!e && (e = ""),
            "11" != e) {
                var i = 0
                  , s = !0
                  , n = "";
                o.subs = e.split(","),
                o.files_subtitle = [],
                o.current_subtitle = -1,
                StorageSupport() && 1 == v.sub_store ? null != localStorage.getItem("pljssubtitle") && (n = localStorage.getItem("pljssubtitle")) : o.remember_sub && (n = o.remember_sub);
                for (var a = 0; a < o.subs.length; a++)
                    0 == o.subs[a].indexOf("#0") && (o.subs[a] = fd0(o.subs[a])),
                    0 == o.subs[a].indexOf("#" + v.enc2) && (o.subs[a] = o[o.fd[0]](o.subs[a])),
                    0 == o.subs[a].indexOf("#" + v.enc3) && o.subs[a].indexOf(v.file3_separator) > 0 && (o.subs[a] = o[o.fd[1]](o.subs[a])),
                    0 == o.subs[a].indexOf("[") && o.subs[a].indexOf("]") > 1 ? (o.files_subtitle[a] = o.subs[a].substr(o.subs[a].indexOf("[") + 1, o.subs[a].indexOf("]") - 1),
                    o.subs[a] = o.subs[a].substr(o.subs[a].indexOf("]") + 1),
                    s = !1) : (o.files_subtitle[a] = o.subs[a].substr(o.subs[a].lastIndexOf("/") + 1),
                    o.files_subtitle[a] = o.files_subtitle[a].substr(0, o.files_subtitle[a].lastIndexOf("."))),
                    0 == o.subs[a].indexOf("#0") && (o.subs[a] = fd0(o.subs[a])),
                    0 == o.subs[a].indexOf("#" + v.enc2) && (o.subs[a] = o[o.fd[0]](o.subs[a])),
                    0 == o.subs[a].indexOf("#" + v.enc3) && o.subs[a].indexOf(v.file3_separator) > 0 && (o.subs[a] = o[o.fd[1]](o.subs[a]));
                o.files_subtitle.length > 1 && 1 == v.sub_all && (o.files_subtitle.push(StringVar("sub_all_title", Lang("together"))),
                o.subs.push("all")),
                o.files_subtitle.length > 0 && 1 == v.sub_off && (1 == v.sub_off0 ? (t = 0,
                i++,
                o.files_subtitle.unshift(StringVar("sub_off_title", Lang("off"))),
                o.subs.unshift("")) : (o.files_subtitle.push(StringVar("sub_off_title", Lang("off"))),
                o.subs.push(""),
                t = o.files_subtitle.length - 1));
                for (a = 0; a < o.subs.length; a++)
                    exist(v.default_subtitle) && v.default_subtitle == o.files_subtitle[a] && (i = a,
                    o.current_subtitle = a,
                    v.subtitle_start = 1),
                    "" != n && n == o.files_subtitle[a] && (i = a,
                    o.current_subtitle = a);
                1 == v.sub_off && 0 == v.subtitle_start && (o.current_subtitle = t),
                exist(o.controls) && o.controls.SubtitleChanged(),
                1 == v.subtitle_start ? (o.current_subtitle = i,
                1 == v.sub_all && "all" == o.subs[i] ? d(o.current_subtitle) : l(o.current_subtitle)) : (s && o.subs.length < 3 && l(0 == t ? 1 : 0),
                1 != v.sub_off && (o.current_subtitle = -1))
            } else
                y()
        }
        function l(t) {
            exist(o.subs[t]) && (o.subs[t].indexOf(".") > -1 ? (o.subsor = o.subs[t].split(" or "),
            o.sub_or = 0,
            c(t)) : 0 == o.subs[t].indexOf("upld") && s[o.subs[t].substr(4)] && p(o.files_subtitle[t], s[o.subs[t].substr(4)]))
        }
        function d(t) {
            e[t] = Object(),
            e[t][0] = Array(),
            e[t][1] = Array();
            for (var i = 0; i < o.subs.length; i++)
                setTimeout(l, 500 * i, i)
        }
        function c(t) {
            var e = trim(o.subsor[o.sub_or])
              , i = XHR(e);
            a = t,
            o.subload = 1,
            i.onload = function() {
                o.subload = 0,
                4 == this.readyState && 200 == this.status ? (o.subtitle_on = !0,
                p(e, this.responseText, t)) : o.sub_or + 1 < o.subsor.length ? (o.sub_or++,
                c(a)) : u("loading_error")
            }
            ,
            i.onerror = function(t) {
                o.subload = 0,
                o.sub_or + 1 < o.subsor.length ? (o.sub_or++,
                c(a)) : u("loading_error")
            }
            ,
            i.send()
        }
        function u(t) {
            log("subtitle not found or access denied"),
            o.files_subtitle[o.current_subtitle] && -1 == o.files_subtitle[o.current_subtitle].indexOf(Lang("loading_error")) && (o.files_subtitle[o.current_subtitle] = o.files_subtitle[o.current_subtitle] + " (" + Lang(t) + ")"),
            1 == v.subtitle_errdel && a > -1 && (o.subs[a] = "",
            o.files_subtitle[a] = ""),
            o.current_subtitle = -1,
            o.subtitle_on = !1,
            o.constrols ? (o.controls.SubtitleChanged(),
            o.controls.refresh()) : setTimeout((function() {
                o.controls && (o.controls.SubtitleChanged(),
                o.controls.refresh())
            }
            ), 100),
            exist(o.subtitle) && (o.frame.removeChild(o.subtitle),
            o.subtitle = null)
        }
        function p(t, s, n) {
            if (0 == s.indexOf("#" + v.enc2) && (s = o[o.fd[0]](s)),
            0 == s.indexOf("#" + v.enc3) && s.indexOf(v.file3_separator) > 0 && (s = o[o.fd[1]](s)),
            t.indexOf(".srt") > -1 || t.indexOf(".ass") > -1 || t.indexOf(".ssa") > -1 || t.indexOf(".vtt") > -1) {
                var a = o.current_subtitle;
                exist(e[a]) && "all" == o.subs[a] || (e[a] = Object(),
                e[a][0] = Array(),
                e[a][1] = Array());
                var l = Array();
                l = s.split(/\r|\n/);
                var d = 1
                  , c = 0
                  , p = 0
                  , h = exist(v.subshift) ? v.subshift : 0;
                for (t.indexOf("shift=") > 0 && (h = 1 * t.substr(t.indexOf("shift=") + 6)),
                i = 0; i < l.length; i++) {
                    if (t.indexOf(".srt") > -1 || t.indexOf(".vtt") > -1)
                        if (l[i].indexOf("--\x3e") > -1 && l[i].indexOf(":") > -1) {
                            0 == (c = 1 * f(l[i].substr(0, l[i].indexOf("--\x3e"))) + h) && (c = 1),
                            p = 1 * f(l[i].substr(l[i].indexOf("--\x3e") + 4, 12)) + h,
                            !exist(e[a][0][c]) && (e[a][0][c] = "");
                            for (var g = c; g < p; g++)
                                e[a][1][g] = c;
                            d++
                        } else
                            l[i] = trim(l[i]),
                            "" != l[i] && l[i].length > 0 && l[i] != d && "WEBVTT" != l[i] && (e[a][0][c] = (e[a][0][c] && "" != e[a][0][c] ? e[a][0][c] + "<br>" : "") + ("all" == o.subs[a] && n > 0 ? "[sub2]" : "") + l[i] + ("all" == o.subs[a] && n > 0 ? "[/sub2]" : ""));
                    if ((t.indexOf(".ass") > -1 || t.indexOf(".ssa") > -1) && l[i].indexOf("Dialogue:") > -1) {
                        c = 1 * f(l[i].substr(t.indexOf(".ssa") > -1 ? l[i].indexOf("=0") + 3 : 12, 12)) + h,
                        p = 1 * f(l[i].substr(t.indexOf(".ssa") > -1 ? l[i].indexOf("=0") + 14 : 23, 10)) + h;
                        var m = "";
                        l[i].indexOf("0,,") > 0 ? m = l[i].substr(l[i].indexOf("0,,") + 3) : l[i].indexOf("ffect,") > 0 && (m = l[i].substr(l[i].indexOf("ffect,") + 6)),
                        null != e[a][0][c] ? e[a][0][c] += "\n" + ("all" == o.subs[a] && n > 0 ? "[sub2]" : "") + m + ("all" == o.subs[a] && n > 0 ? "[/sub2]" : "") : e[a][0][c] = m,
                        e[a][0][c] = e[a][0][c].replace(/{.*?}/, ""),
                        e[a][0][c] = e[a][0][c].replace(/\\\\N/, "<br>"),
                        e[a][0][c] = e[a][0][c].replace(/\\N/, "<br>");
                        for (g = c; g < p; g++)
                            e[a][1][g] = c
                    }
                }
                o.controls.SubtitleChanged(),
                o.actions.RenewSubtitle(),
                o.controls.refresh()
            } else
                "" != s ? 0 == s.indexOf("[") ? r(s) : u("error") : (y(),
                o.controls.refresh())
        }
        function f(t) {
            var e = t.split(":")
              , o = 0;
            return 2 == e.length && e.unshift("00"),
            "00" != e[0] && (o += 3600 * e[0]),
            "00" != e[1] && (o += 60 * e[1]),
            o = 10 * (o += 1 * e[2].substr(0, 2)) + 1 * e[2].substr(3, 1)
        }
        function h(e) {
            exist(o.current_subtitle) && (o.current_subtitle != e ? -1 == e || 1 == v.sub_off && e == t ? m() : (v.sub_shift = 0,
            o.current_subtitle = e,
            o.subtitle_on = !0,
            v.subtitle_start = 1,
            g(e),
            js("subtitle", o.files_subtitle[e]),
            o.controls.SubtitleChanged()) : 1 != v.sub_off && m())
        }
        function g(t) {
            exist(o.subs[t]) && (log("Subtitle", t),
            o.current_subtitle = t,
            exist(o.files_subtitle[t]) && (o.storage && 1 == v.sub_store ? localStorage.setItem("pljssubtitle", o.files_subtitle[t]) : o.remember_sub = o.files_subtitle[t]),
            "hls" == o.file_type && 1 == o.hls_subs ? o.media.hlsDashSub(t, "hls") : "dash" == o.file_type && 1 == o.dash_subs ? o.media.hlsDashSub(t, "dash") : "all" == o.subs[t] ? d(o.current_subtitle) : l(o.current_subtitle))
        }
        function m() {
            js("subtitle", "off"),
            o.current_subtitle = 1 == v.sub_off ? t : -1,
            v.subtitle_start = 0,
            o.subtitle_on = !1,
            o.controls.SubtitleChanged(),
            (o.hls_subs || o.dash_subs) && g(o.current_subtitle),
            exist(o.subtitle) && o.frame.removeChild(o.subtitle),
            o.subtitle = null
        }
        function b() {
            o.subtitle && (css(o.subtitle, {
                position: "absolute",
                width: "100%",
                "padding-left": "10%",
                "padding-right": "10%",
                left: 0,
                color: v.sub_color,
                "text-align": "center",
                "box-sizing": "border-box"
            }),
            1 == v.sub_fonted && exist(v.sub_font) && "" != v.sub_font && css(o.subtitle, {
                "font-family": v.sub_font
            }),
            1 == v.sub_shadow ? css(o.subtitle, {
                "text-shadow": "1px 1px 2px black"
            }) : css(o.subtitle, {
                "text-shadow": "none"
            }),
            1 == v.sub_drag ? PluginMovable(o.subtitle, "o.subdrag") : css(o.subtitle, {
                "pointer-events": "none"
            }))
        }
        function y() {
            o.current_subtitle = -1,
            o.subtitle_on = !1,
            o.thumbs_on = !1,
            v.subtitle = null,
            v.thumbnails = null,
            o.sub = null,
            o.subs = null,
            exist(o.controls) && o.controls.SubtitleChanged(),
            o.files_subtitle = null,
            exist(o.subtitle) && (o.frame.removeChild(o.subtitle),
            o.subtitle = null),
            o.current_subtitle = null,
            o.subtitle_on = !1
        }
        this.start = function(t) {
            r(t)
        }
        ,
        this.SubUpload = function() {
            if (o.subupld) {
                var e = o.subupld.files;
                if (e[0]) {
                    var i = new FileReader;
                    i.onload = function(i) {
                        var n = i.target.result;
                        s.push(n),
                        o.current_subtitle = -1,
                        (n = e[0].name).length > 40 && (n = e[0].name.substr(0, 15) + "..." + e[0].name.substr(-15)),
                        1 == v.sub_off && 1 == v.sub_off0 ? (o.subs.push("upld" + (s.length - 1)),
                        o.files_subtitle.push(n + ""),
                        h(o.subs.length - 1)) : (o.subs.unshift("upld" + (s.length - 1)),
                        o.files_subtitle.unshift(n + ""),
                        1 == v.sub_off && t++,
                        h(0)),
                        o.subupld.value = ""
                    }
                    ,
                    i.readAsText(e[0])
                } else
                    o.subupld.click()
            }
        }
        ,
        this.SetSubtitle = function(t) {
            h(t)
        }
        ,
        this.ioff = function() {
            return t
        }
        ,
        this.show = function(t) {
            !function(t) {
                v.sub_shift && (t -= 1 * v.sub_shift);
                if (o.subtitle_on && exist(o.subs) && e) {
                    var i = o.current_subtitle;
                    if (1 == v.subpausehide && !o.play)
                        return;
                    if (exist(e[i]) && exist(e[i][1])) {
                        var s = parseInt(10 * t);
                        if (exist(e[i][1][s])) {
                            var a = "";
                            a = e[i][0][e[i][1][s]],
                            exist(o.subtitle) || (o.subtitle = createElement("div"),
                            o.frame.appendChild(o.subtitle),
                            b()),
                            n && show2(o.subtitle),
                            o.subdrag || (o.controls.ToolbarHidden() || v.sub_bottom > v.toolbar.h ? css(o.subtitle, {
                                position: "absolute",
                                top: "auto",
                                left: 0,
                                bottom: 1 * v.sub_bottom
                            }) : css(o.subtitle, {
                                position: "absolute",
                                top: "auto",
                                left: 0,
                                bottom: 1 * v.sub_bottom + 1 * v.toolbar.h
                            })),
                            1 == v.sub_split2words && (a = PluginSubword(a)),
                            1 == v.sub_all && (a = (a = a.replace(/\[sub2\]/gm, '<span style="color:' + CheckColor(v.sub_color2) + '">')).replace(/\[\/sub2\]/gm, "</span>")),
                            o.subtitle.innerHTML = '<span style="' + (1 == v.sub_bg ? "background-color:" + hexToRGBA(v.sub_bgcolor, v.sub_bga) + ";" : "") + "-webkit-box-decoration-break: clone;color:" + CheckColor(v.sub_color) + ";padding:" + v.sub_bgpadding + "px " + 2 * v.sub_bgpadding + "px;border-radius:" + v.sub_bgo + "px;margin:0 0;line-height:" + (v.sub_lineheight ? v.sub_lineheight : 1.8) + ";font-weight:" + v.sub_weight + '">' + trim(a) + "</span>",
                            1 == v.sub_big_fullscreen && (o.fullscreen ? css(o.subtitle, {
                                "font-size": v.sub_size_fullscreen + (parseInt(v.sub_sizeproc) - 100) * v.sub_size_fullscreen / 100 + "px"
                            }) : css(o.subtitle, {
                                "font-size": v.sub_size + (parseInt(v.sub_sizeproc) - 100) * v.sub_size / 100 + "px"
                            })),
                            n = !1
                        } else
                            !n && exist(o.subtitle) && (o.subtitle.innerHTML = "",
                            n = !0,
                            hide2(o.subtitle))
                    }
                }
            }(t)
        }
        ,
        this.style = function() {
            b()
        }
        ,
        this.remove = function() {
            y()
        }
    }
      , PluginRounding = function() {
        o.oo = createElement("div");
        var t = v.rounding
          , e = [];
        e[1] = createElement("div"),
        e[1].innerHTML = '<svg><path d="M0,0 L' + t + ",0 Q0,0 0," + t + ' Z" fill="' + v.bgcolor + '"/></svg>',
        e[2] = createElement("div"),
        e[2].innerHTML = '<svg><path d="M0,0 L' + t + ",0 L" + t + "," + t + " Q" + t + ',0 0,0 Z" fill="' + v.bgcolor + '"/></svg>',
        e[3] = createElement("div"),
        e[3].innerHTML = '<svg><path d="M' + t + ",0 L" + t + "," + t + " L0," + t + " Q" + t + "," + t + " " + t + ',0 Z" fill="' + v.bgcolor + '"/></svg>',
        e[4] = createElement("div"),
        e[4].innerHTML = '<svg><path d="M0,0 Q0,' + t + " " + t + "," + t + " L0," + t + ' Z" fill="' + v.bgcolor + '"/></svg>',
        css(o.oo, {
            position: "absolute",
            top: 0,
            left: 0,
            "pointer-events": "none",
            height: "auto",
            overflow: "hidden",
            width: "100%",
            height: "100%"
        }),
        o.oo.style.zIndex = 2e3,
        css(e[1], {
            position: "absolute",
            top: 0,
            left: 0
        }),
        css(e[2], {
            position: "absolute",
            top: 0,
            right: 0
        }),
        css(e[3], {
            position: "absolute",
            bottom: 0,
            right: 0
        }),
        css(e[4], {
            position: "absolute",
            bottom: 0,
            left: 0
        });
        for (var i = 1; i < 5; i++)
            css(e[i], {
                width: t,
                height: t,
                "line-height": 0
            }),
            o.oo.appendChild(e[i]);
        o.container.appendChild(o.oo)
    }
      , PluginPoints = function(control, points, w, style) {
        v.pointed = 1;
        var style = style
          , w = w
          , over = -1
          , pointscontrol = createElement("div");
        function Update(w) {
            if (points)
                for (var i = 0; i < points.length; i++)
                    pointscontrol.removeChild(points[i]);
            if (points = [],
            v.points) {
                "string" == typeof v.points && (v.points = eval(v.points));
                for (var i = 0; i < Object.keys(v.points).length; i++)
                    exist(v.points[i].time) && (points[i] = createElement("div"),
                    css(points[i], {
                        position: "absolute",
                        left: 0,
                        top: -style.h / 2,
                        height: style.h,
                        opacity: existv(v.points[i].opacity, style.pointa),
                        "pointer-events": "none",
                        display: "none",
                        "background-color": existv(v.points[i].color, style.pointcolor),
                        transition: "opacity 0.1s linear,transform 0.2s ease-in-out"
                    }),
                    points[i].time = v.points[i].time,
                    points[i].w = v.points[i].width,
                    points[i].text = v.points[i].text,
                    pointscontrol.appendChild(points[i]));
                Place(w)
            }
        }
        function Place(t) {
            var e = o.media.duration();
            if ("midrolls"in o.u && 0 != o.u.midrolls)
                for (var i = 0; i < points.length; i++)
                    if (e > 0) {
                        var s = existv(points[i].w, style.pointw);
                        pd = s;
                        var n = points[i].time;
                        String(s).indexOf("s") > 0 ? (pd = 1 * s.substr(0, String(s).indexOf("s")),
                        s = pd / e * t) : n = e / 100 * points[i].time,
                        points[i].text && (points[i].dur = n + pd);
                        let o = t * (n / e) - t / 2;
                        css(points[i], {
                            left: o,
                            width: s,
                            display: "block"
                        })
                    } else
                        hide2(points[i])
        }
        function Tip(t) {
            var e = "";
            if (overed = !1,
            exist(t)) {
                for (var o = 0; o < points.length; o++)
                    points[o].text && points[o].dur && t >= points[o].time && t < points[o].dur && (e = '<hdvbplayer style="line-height:1.2;' + (exist(v.points[o].textstyle) ? v.points[o].textstyle : "") + '">' + points[o].text.replace(/ /g, "&nbsp;") + "</hdvbplayer>",
                    over != o && (-1 != over && css(points[over], {
                        opacity: existv(v.points[over].opacity, style.pointa),
                        transform: "scaleY(1)"
                    }),
                    css(points[o], {
                        opacity: 1,
                        transform: "scaleY(2)"
                    }),
                    over = o),
                    overed = !0);
                overed || Out()
            }
            return e
        }
        function Out() {
            over > -1 && (css(points[over], {
                opacity: existv(v.points[over].opacity, style.pointa),
                transform: "scaleY(1)"
            }),
            over = -1)
        }
        Pos0(pointscontrol),
        control.appendChild(pointscontrol),
        exist(v.points) && Update(w),
        this.place = function(t) {
            Place(t)
        }
        ,
        this.update = function(t) {
            Update(t)
        }
        ,
        this.tip = function(t) {
            return Tip(t)
        }
        ,
        this.out = function() {
            Out()
        }
    }
      , PluginBlock = function() {
        var t = "https://googleads.g.doubleclick.net/" + Math.random().toString(36).substring(7)
          , e = t + ""
          , i = {
            method: "HEAD",
            mode: "no-cors"
        };
        if (v.preroll && 1 != v.default_adb && (v.preroll.indexOf("//") > -1 && (t = v.preroll.substr(v.preroll.lastIndexOf("//"))),
        t.indexOf("[") > 0 && (t = t.substr(0, t.indexOf("["))),
        t != e && (i = {
            method: "GET"
        })),
        exist(window.fetch) && exist(window.Request)) {
            var s = new Request(t,i);
            fetch(s).then((function(t) {
                void 0 !== t || (o.ab = !0,
                o.controls && o.controls.refresh())
            }
            )).catch((function(t) {
                o.ab = !0,
                o.controls && o.controls.refresh()
            }
            ))
        }
    };
    function PluginDroplist() {
        var t, e = -1, i = [], s = [], n = [], a = [], r = [], l = 0, d = v.playlist;
        !d.dropcolor && (d.dropcolor = "ffffff"),
        !d.dropbgcolor && (d.dropbgcolor = "ff0000");
        var c = 1 == d.dropclrs ? d.dropcolor : d.color
          , u = 1 == d.dropclrs ? d.dropbgcolor : d.bgcolor;
        pushCSS(".pjspl" + v.id + "scroll::-webkit-scrollbar {width: " + parseFloat(.3 * existv(d.dropscrlw, 1)) + "rem;}.pjspl" + v.id + "scroll::-webkit-scrollbar-track {background:" + hex2rgb(d.bgcolor, d.bga) + "}.pjspl" + v.id + "scroll::-webkit-scrollbar-thumb {background:#" + d.valuecolor + "}"),
        d.arrowsize = 4;
        var p = "<svg width='" + (2 * d.arrowsize + 2) + "' height='" + (1.2 * d.arrowsize + 1) + "' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' style='pointer-events:none;transition:transform 0.2s ease-out;position: absolute;bottom: 50%;margin-bottom:-" + (1.2 * d.arrowsize + 2) / 2 + "px;right:" + (d.paddingright / 2 + d.arrowsize / 2) + "px'><g><line x1='1' y1='1' x2='" + (d.arrowsize + 1) + "' y2='" + 1.2 * d.arrowsize + "' stroke='#" + c + "' stroke-width='1' stroke-linecap='round'/><line x1='" + (d.arrowsize + 1) + "' y1='" + 1.2 * d.arrowsize + "' x2='" + (2 * d.arrowsize + 1) + "' y2='1' stroke='#" + c + "' stroke-width='1' stroke-linecap='round'/></g></svg>";
        if (o.playlist_dic) {
            for (var f = 0; f < 4; f++) {
                i[f] = createElement("div");
                createElement("div");
                css(i[f], {
                    position: "absolute",
                    top: d.margintop,
                    color: d.color,
                    overflow: "hidden",
                    "font-family": checkFont(d.font),
                    "border-radius": d.rounding + "px",
                    zIndex: 1e3
                }),
                o.frame.appendChild(i[f]),
                s[f] = createElement("div");
                var h = d.headfontsize;
                d.dropfontsize > 0 && (h = d.dropfontsize,
                d.dropsmallfontsize > 0 && o.small && (h = d.dropsmallfontsize)),
                css(s[f], {
                    display: "block",
                    "font-size": h * existv(v.globalfs, 1)
                }),
                i[f].appendChild(s[f]),
                n[f] = createElement("div"),
                css(n[f], {
                    display: "block",
                    transition: "height 0.1s ease-out",
                    "font-size": d.fontsize * existv(v.globalfs, 1)
                }),
                n[f].classList.add("pjspl" + v.id + "scroll"),
                n[f].addEventListener("wheel", T, {
                    passive: !1
                }),
                i[f].appendChild(n[f])
            }
            0 == o.plopenid && (o.plopenid = o.plid),
            g(),
            C(0)
        }
        function g() {
            for (var t = 0; t < 4; t++)
                n[t].innerHTML = "",
                s[t].innerHTML = "";
            var e = o.playlist_dic[o.plopenid];
            b(m(e, 0), 0),
            b(m(e, 1), 1),
            b(m(e, 2), 2),
            b(m(e, 3), 3),
            A()
        }
        function m(t, e) {
            for (var i = 0; i < e; i++) {
                if ("" == t.pjs_parent) {
                    t = -1;
                    break
                }
                -1 != o.playlist_dic[t.pjs_parent].pjs_parent && (t = o.playlist_dic[t.pjs_parent])
            }
            return t
        }
        function b(t, e) {
            if (t)
                if (-1 == t)
                    hide2(i[e]);
                else {
                    show2(i[e]);
                    var l = [];
                    for (var v in l.push(t),
                    o.playlist_dic)
                        o.playlist_dic.hasOwnProperty(v) && o.playlist_dic[v].pjs_parent == t.pjs_parent && l.push(o.playlist_dic[v]);
                    for (var f = y(o.plid), h = 0; h < l.length; h++) {
                        var g = createElement("div");
                        css(g, {
                            display: "block",
                            position: "relative",
                            cursor: "pointer",
                            padding: "5px 10px",
                            transition: "color 0.1s ease-out,background 0.2s ease-out",
                            "padding-top": d.paddingtop,
                            "padding-bottom": d.paddingbottom,
                            "padding-left": d.paddingleft,
                            "padding-right": d.paddingright + (o.screen_w > 400 ? 3 * d.arrowsize : 0)
                        }),
                        css(g, 0 == h ? {
                            color: c,
                            "background-color": hex2rgb(u, d.bga)
                        } : {
                            color: d.color,
                            "background-color": hex2rgb(d.bgcolor, d.bga)
                        }),
                        h > 1 && 1 == d.borderbottom && css(g, {
                            "border-top": "1px solid " + hex2rgb(d.bordercolor, .5)
                        }),
                        f.indexOf(l[h].id) > -1 && h > 0 && (css(g, {
                            color: d.valuecolor
                        }),
                        1 == d.playbgcolored && exist(d.playbgcolor) && css(g, {
                            backgroundColor: d.playbgcolor
                        })),
                        g.innerHTML = l[h].title + (0 == h && o.screen_w > 400 ? p : ""),
                        g.setAttribute("me", (0 == h ? "head_" : "") + l[h].id),
                        0 == h ? (f.indexOf(l[h].id) > -1 || e > 0 ? a[e] = l[h].id : g.innerHTML = "..." + p,
                        s[e].appendChild(g)) : (o.plhistory[l[h].id] && l[h].id != o.plid && L(g),
                        n[e].appendChild(g))
                    }
                    css(n[e], {
                        height: "auto"
                    }),
                    r[e] = n[e].offsetHeight,
                    css(n[e], {
                        height: 0
                    }),
                    i[e].addEventListener("click", x),
                    i[e].addEventListener("mouseover", S),
                    i[e].addEventListener("mouseout", P)
                }
        }
        function y(t) {
            var e = o.playlist_dic[t]
              , i = [];
            if (e)
                for (var s = 0; s < 4; s++)
                    i.push(e.id),
                    "" != e.pjs_parent && (e = o.playlist_dic[e.pjs_parent]);
            return i
        }
        function x(t) {
            var n = t.target;
            "HDVBPLAYER" != n.tagName && (n = n.parentNode),
            "HDVBPLAYER" != n.tagName && (n = n.parentNode);
            var r = n.parentNode.parentNode
              , l = n.getAttribute("me");
            if (l)
                if (0 == l.indexOf("head_")) {
                    var d = -1;
                    r == i[0] && (d = 0),
                    r == i[1] && (d = 1),
                    r == i[2] && (d = 2),
                    k(),
                    d > -1 && (e != d ? _(d) : e = -1)
                } else {
                    if (show2(s[e]),
                    a[e] == l) {
                        if (k(),
                        e > 0)
                            return void _(e - 1);
                        e = -1
                    } else
                        a[e] = l;
                    o.playlist_dic[l].folder ? (o.controls.PlaylistPlayId(l),
                    k(),
                    e = -1,
                    w()) : (k(),
                    e = -1,
                    api("play", "id:" + l))
                }
        }
        function w() {
            for (var t in o.playlist_dic)
                if (o.playlist_dic.hasOwnProperty(t) && o.playlist_dic[o.plopenid] && o.playlist_dic[t].pjs_parent == o.playlist_dic[o.plopenid].id) {
                    if (o.plopenid = o.playlist_dic[t].id,
                    g(),
                    o.playlist_dic[t].folder)
                        n[0].childNodes.length < 2 ? w() : _(0);
                    else if (1 == d.dropautoplay) {
                        var e = n[0].childNodes[0].getAttribute("me");
                        e && api("play", "id:" + e)
                    } else
                        _(0);
                    break
                }
        }
        function _(t) {
            css(n[t], {
                height: r[t]
            }),
            css(n[t], {
                "border-top": "1px solid #" + d.headbordercolor
            }),
            css(s[t].childNodes[0], {
                "background-color": hex2rgb(u, 1)
            }),
            css(s[t].getElementsByTagName("svg")[0], {
                transform: "scale(-1, -1)"
            }),
            e = t
        }
        function k() {
            e > -1 && (css(n[e], {
                height: 0
            }),
            css(n[e], {
                "border-top": "none"
            }),
            css(s[e].childNodes[0], {
                "background-color": hex2rgb(u, d.bga)
            }),
            css(s[e].getElementsByTagName("svg")[0], {
                transform: "scale(1, 1)"
            }))
        }
        function S(t) {
            var i = t.target
              , s = i.getAttribute("me");
            y(o.plid);
            s && (-1 == e || 0 == s.indexOf("head") ? css(i, {
                "background-color": hex2rgb(u, 1)
            }) : 1 == d.playbgcolored && exist(d.playbgcolor) && s == a[e] || css(i, {
                "background-color": hex2rgb(d.bgcolorover, d.bgaover > -1 ? d.bgaover : d.bga)
            }))
        }
        function P(t) {
            var s = t.target
              , n = s.getAttribute("me");
            y(o.plid);
            if (n)
                if (-1 == e || 0 == n.indexOf("head_")) {
                    var r = t.target.parentNode.parentNode
                      , l = -1;
                    r == i[0] && (l = 0),
                    r == i[1] && (l = 1),
                    r == i[2] && (l = 2),
                    css(s, {
                        "background-color": hex2rgb(u, e == l ? 1 : d.bga)
                    })
                } else
                    o.plhistory[n] && n != o.plid && L(s),
                    1 == d.playbgcolored && exist(d.playbgcolor) && n == a[e] || css(s, {
                        "background-color": hex2rgb(d.bgcolor, d.bga)
                    })
        }
        function T(t) {}
        function A() {
            if (isVisible(i[0])) {
                for (var t = 0, e = 0; e < s.length; e++)
                    s[e].offsetHeight > t && (t = s[e].offsetHeight);
                if (l = o.screen_h - t - (o.screen_h > 200 ? v.toolbar.h + (o.screen_h > 400 ? 60 : 30) : 0),
                t > 0 && (l = Math.round(l / t) * t + (1 == d.borderbottom ? Math.round(l / t) : 0) - (o.screen_h <= 200 ? 5 : 0)),
                l > 0)
                    for (e = 0; e < 4; e++)
                        n[e].scrollHeight > l ? css(n[e], {
                            "overflow-y": "scroll",
                            "margin-right": 0,
                            "max-height": l
                        }) : css(n[e], {
                            overflow: "hidden",
                            "max-height": "none"
                        }),
                        v.playlist.position.indexOf("right") > -1 ? css(i[e], {
                            right: d.marginright + E(e)
                        }) : (css(i[e], {
                            left: d.marginleft
                        }),
                        e > 0 && css(i[e - 1], {
                            left: d.marginleft + O(e)
                        }))
            }
        }
        function O(t) {
            for (var e = 0, o = 3; o >= t; o--)
                e += i[o].offsetWidth + (i[o].offsetWidth > 0 ? d.marginright : 0);
            return e
        }
        function E(t) {
            for (var e = 0, o = 0; o < t; o++)
                e += i[o].offsetWidth + (i[o].offsetWidth > 0 ? d.marginright : 0);
            return e
        }
        function C(t) {
            for (var e = 0; e < 4; e++)
                1 == t ? show2(i[e]) : hide2(i[e])
        }
        function L(t) {
            css(t, {
                color: d.historycolor
            }),
            1 == d.historytitlestrike && css(t, {
                "text-decoration": "line-through"
            }),
            d.historytitlea > -1 && css(t, {
                opacity: d.historytitlea
            }),
            css(t, {
                backgroundColor: hex2rgb(d.historybgcolor, d.historybga > -1 ? d.historybga : d.bga)
            })
        }
        this.OpenScroll = function() {
            return function(t) {
                return t > -1 && n[t].scrollHeight > l
            }(e)
        }
        ,
        this.Hide = function() {
            C(0)
        }
        ,
        this.Show = function() {
            C(1)
        }
        ,
        this.Visible = function() {
            return e > -1
        }
        ,
        this.Update = function() {
            if (0 != o.plopenid) {
                var t = 0;
                !isVisible(i[0]) && (t = 1),
                g(),
                t && C(0)
            }
        }
        ,
        this.Resize = function() {
            clearTimeout(t),
            t = setTimeout(A, 500)
        }
        ,
        this.Close = function() {
            k(),
            e = -1
        }
        ,
        this.Remove = function() {
            for (var t = 0; t < 4; t++)
                i[t].removeEventListener("click", x),
                i[t].removeEventListener("mouseover", S),
                i[t].removeEventListener("mouseout", P),
                n[t].removeEventListener("wheel", T),
                o.frame.removeChild(i[t]),
                o.droplist = void 0
        }
    }
    var PluginHotIcon = function(t, e) {
        var i, s = 2;
        function n() {
            i && (o.frame.removeChild(i),
            i = null)
        }
        o.screen_w > 500 && (s = 4),
        o.screen_w > 1e3 && (s = 5),
        1 == v.hotkey[t + "icon"] && (v.hotkey[t + e + "icon"] || "volume" == t) && ("" == v.hotkey[t + e + "icon"] && "volume" != t || (i = createElement("div"),
        css(i, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "scale(" + s + ")",
            transition: "opacity .3s linear, transform .3s linear"
        }),
        o.frame.appendChild(i),
        i.innerHTML = "volume" == t ? (o.muted ? 0 : Math.round(100 * v.volume)) + "%" : v.hotkey[t + e + "icon"],
        css(i, {
            marginTop: "-" + i.offsetHeight / 2 + "px",
            marginLeft: "-" + i.offsetWidth / 2 + "px"
        }),
        SvgColor(i, "#ffffff"),
        setTimeout((function() {
            i && (css(i, {
                transform: "scale(" + 2 * s + ")",
                opacity: 0
            }),
            setTimeout(n, 500))
        }
        ), 50)))
    }
      , PluginHdIcon = function(t, e, i) {
        var s, n = createElement("div");
        t.appendChild(n),
        css(n, {
            position: "absolute",
            top: -e.offsetHeight / 2 - 1,
            "background-color": "#f00",
            "border-radius_": 1,
            display: "none",
            pointerEvents: "none"
        }),
        1 == i.hdicon2 && i.hdiconlist ? (s = i.hdiconlist.split(","),
        css(n, {
            "font-size": 8,
            color: "#fff",
            padding: "2px 2px 0 2px",
            "line-height": "1"
        })) : (i.hdicon2 = 0,
        css(n, {
            height: 9,
            width: 13,
            "background-image": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTMgOSIgd2lkdGg9IjEwMCUiPjxwYXRoIGQ9Ik01LDcgTDYsNyBMNiw4IEw1LDggTDUsNyBaIE0xMCwzIEwxMCw0IEw4LDQgTDgsMyBMMTAsMyBaIE0zLDYgTDMsNSBMNSw1IEw1LDYgTDMsNiBaIE0yLDcgTDMsNyBMMyw4IEwyLDggTDIsNyBaIE03LDcgTDEwLDcgTDEwLDggTDcsOCBMNyw3IFogTTEwLDYgTDExLDYgTDExLDcgTDEwLDcgTDEwLDYgWiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjY0NzEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48cGF0aCBkPSJNNSw3IEw1LDYgTDUsNSBMMyw1IEwzLDYgTDMsNyBMMiw3IEwyLDIgTDMsMiBMMyw0IEw1LDQgTDUsMiBMNiwyIEw2LDcgTDUsNyBaIE0xMSw2IEwxMCw2IEwxMCw3IEw3LDcgTDcsMiBMMTAsMiBMMTAsMyBMMTEsMyBMMTEsNiBaIE0xMCw0IEwxMCwzIEw4LDMgTDgsNCBMOCw2IEwxMCw2IEwxMCw0IFoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=)"
        })),
        this.toggle = function() {
            var t = 0
              , a = o.media.getQuality();
            (a = a.replace(Lang("auto") + " ", "")) && (1 != i.hdicon2 && ("HD" == a || a.indexOf(" HD") > 0 || 0 == a.indexOf("hd") || 0 == a.indexOf("Hd")) && (a = "720"),
            a.indexOf(" ") > 0 && (a = a.substr(0, a.indexOf(" "))),
            t = parseInt(a));
            var r, l = "-1";
            if (1 == i.hdicon2) {
                l = "";
                for (var d = 0; d < s.length; d++) {
                    var c = s[d].split(":");
                    2 == c.length && trim(c[0]) == t && (l = trim(c[1]))
                }
                "" == l ? t > 700 && (r = !0,
                n.innerHTML = "HD") : (r = !0,
                n.innerHTML = l)
            } else
                t > 700 && (r = !0);
            r ? (show2(n),
            e.offsetWidth - n.offsetWidth > 0 && css(n, {
                left: (e.offsetWidth - n.offsetWidth) / 2 - 2
            })) : hide2(n)
        }
    }
      , PluginSettings2 = function() {
        var t, e, i, s, n, a, r = [];
        for (var l in v.settings)
            v.settings.hasOwnProperty(l) && l.indexOf("combined") > -1 && (r[l.substr(8)] = v.settings[l]);
        !exist(r.bottom) && (r.bottom = 30),
        !exist(r.right) && (r.right = 50),
        r.color = "#" + (r.color ? r.color : "fff"),
        r.bgcolor = "#" + (r.bgcolor ? r.bgcolor : "333"),
        !exist(r.round) && (r.round = 0),
        !exist(r.size) && (r.size = 80),
        !exist(r.titlesize) && (r.titlesize = 100),
        r.padding = exist(r.padding) ? MarPad(r.padding) : 0,
        r.margin = exist(r.margin) ? MarPad(r.margin) : 0;
        var d, c, u, p = '<pjsdiv style="display:inline-block;width:20px"></pjsdiv>', f = '<pjsdiv style="display:inline-block;width:20px"><svg width="16px" height="6px" viewBox="-1 -1 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline stroke="' + r.color + '" stroke-width="1" stroke-linecap="square" fill="none" points="0 2 2 4 5.5 0"></polyline></svg></pjsdiv>';
        function h(l, x) {
            d = l,
            t ? t.innerHTML = "" : (t = createElement("div"),
            o.frame.appendChild(t),
            css(t, {
                position: "absolute",
                bottom: r.bottom + "px",
                right: r.right + "px",
                background: r.bgcolor,
                "border-radius": r.round,
                padding: r.padding,
                "white-space": "nowrap"
            }),
            t.style.zIndex = 99999,
            t.addEventListener("mouseover", b, !0),
            t.addEventListener("mouseout", y, !0)),
            e = [],
            items = [],
            i = [];
            for (var _ = l.substr(9).split(","), k = "right", S = ["right", "left", "center"], P = r.right, T = 0; T < _.length; T++) {
                var A = copyObject(o["files_" + _[T]])
                  , O = o["current_" + _[T]];
                if ("share" == _[T] && o.share) {
                    A = [],
                    u = [];
                    for (var E = 1; E <= 16; E++)
                        exist(v["share" + E]) && (A.push(Lang(v["share" + E])),
                        u[A.length] = v["share" + E])
                }
                if (A) {
                    if (A.length > 1) {
                        e[T] = createElement("div"),
                        t.appendChild(e[T]),
                        css(e[T], {
                            display: "inline-block",
                            "padding-top": 0,
                            "padding-bottom": 7
                        }),
                        1 != r.notitle && (i[T] = createElement("div"),
                        e[T].appendChild(i[T]),
                        css(i[T], {
                            "pointer-events": "none",
                            display: "block",
                            "padding-left": 7,
                            "padding-top": 10,
                            "padding-bottom": 10,
                            "padding-right": 27,
                            color: r.color,
                            "font-size": r.titlesize + "%"
                        }),
                        i[T].innerHTML = p + "<b>" + Lang(_[T]) + "</b>"),
                        items[T] = [],
                        "subtitle" != _[T] || o.hls_subs || o.dash_subs || (A.push(Lang("options")),
                        s = A.length),
                        "subtitle" == _[T] && 1 == v.sub_upload && !o.system.tv && o.sbt && exist(window.FileReader) && (A.push("<input type='file' id='" + v.id + "_subfile2' accept='.vtt,.ass,.srt' style='display:none'/>" + Lang("upload")),
                        n = A.length);
                        var C = createElement("div");
                        e[T].appendChild(C),
                        css(C, {
                            float: "left"
                        });
                        var L = 1
                          , I = 0;
                        for (E = 0; E < A.length; E++) {
                            if (A[E]) {
                                var j = !0;
                                if ("subtitle" == _[T] && (A[E] != Lang("off") || o.subtitle_on || (z = !0)),
                                "quality" == _[T] && (A[E] == Lang("auto") && o.media.autoQuality() && (z = !0),
                                exist(v.forbidden_quality)))
                                    for (var M = v.forbidden_quality.split(","), R = 0; R < M.length; R++)
                                        A[E].indexOf(M[R]) > -1 && (j = !1);
                                if (j) {
                                    items[T][E] = createElement("div"),
                                    css(items[T][E], {
                                        display: "block",
                                        margin: r.margin,
                                        padding: 7,
                                        "padding-right": 27,
                                        "font-size": r.size + "%",
                                        opacity: .7,
                                        transition: "opacity 0.1s linear,background 0.1s linear",
                                        cursor: "pointer"
                                    });
                                    var z = !1;
                                    "speed" == _[T] && 1 == A[E] && 1 != r.speed1 && (A[E] = Lang("normal")),
                                    E == O || z ? (css(items[T][E], {
                                        opacity: 1
                                    }),
                                    items[T][E].innerHTML = '<pjsdiv style="pointer-events:none;color:' + r.color + '">' + f + A[E] + "</pjsdiv>",
                                    attr(items[T][E], {
                                        yes: 1
                                    })) : items[T][E].innerHTML = '<pjsdiv style="pointer-events:none;color:' + r.color + '">' + p + A[E] + "</pjsdiv>",
                                    attr(items[T][E], {
                                        is: _[T] + "," + E
                                    }),
                                    "quality" == _[T] && E > 0 ? C.insertBefore(items[T][E], items[T][E - 1]) : C.appendChild(items[T][E]),
                                    items[T][E].addEventListener("mouseover", g, !0),
                                    items[T][E].addEventListener("mouseout", m, !0),
                                    items[T][E].addEventListener("click", w, !0)
                                }
                            }
                            e[T].offsetHeight > o.screen_h - r.bottom && (E != L * I + 1 && 1 != L || (x && A.length - E > 1 ? css(C, {
                                height: o.screen_h - r.bottom - 40,
                                "overflow-y": "auto"
                            }) : (0 == I && (I = E),
                            C = createElement("div"),
                            e[T].appendChild(C),
                            css(C, {
                                float: "left"
                            })),
                            L++))
                        }
                    }
                } else
                    for (var H = 0; H < S.length; H++)
                        _[T].indexOf(S[H]) > -1 && (k = S[H],
                        _[T].indexOf(":") > -1 && (P = 1 * _[T].substr(_[T].indexOf(":") + 1)))
            }
            o.screen_w < t.scrollWidth && !x ? h(l, !0) : ("left" == k && css(t, {
                right: "auto",
                left: P + "px",
                "margin-left": 0
            }),
            "center" == k && css(t, {
                right: "auto",
                left: "50%",
                "margin-left": -t.offsetWidth / 2 + "px"
            }),
            "right" == k && css(t, {
                left: "auto",
                right: P + "px",
                "margin-left": 0
            }),
            n > 0 && !a && (o.subupld = document.getElementById(v.id + "_subfile2"),
            o.subupld.onchange = o.sbt.SubUpload,
            a = !0),
            c = !0)
        }
        function g(t) {
            x = t.target,
            x && (css(x, {
                background: hex2rgb(r.color, .2),
                opacity: 1
            }),
            b())
        }
        function m(t) {
            x = t.target,
            x && (css(x, {
                background: "none"
            }),
            1 != x.getAttribute("yes") && css(x, {
                opacity: .7
            }),
            y())
        }
        function b() {
            o.controlover = !0,
            clearTimeout(o.settingsovertimer)
        }
        function y() {
            clearTimeout(o.settingsovertimer),
            o.settingsovertimer = setTimeout(_, v.settings.showoverto > 0 ? 1e3 * v.settings.showoverto : o.system.tv ? 2e3 : 1e3)
        }
        function w(t) {
            if (x = t.target,
            x) {
                var e = x.getAttribute("is");
                if (e) {
                    var i = e.split(",");
                    if (2 == i.length) {
                        if ("subtitle" == i[0] && o.sbt) {
                            if (i[1] == n - 1)
                                return void o.sbt.SubUpload();
                            if (i[1] == s - 1)
                                return void o.controls.SubOpt();
                            o.sbt.SetSubtitle(i[1])
                        }
                        "quality" == i[0] && o.actions.SetQuality(i[1]),
                        "speed" == i[0] && o.actions.SetSpeed(i[1]),
                        "audiotrack" == i[0] && o.actions.SetAudioTrack(i[1]),
                        "share" == i[0] && o.share && o.share.api(u[1 * i[1] + 1]),
                        "scale" == i[0] && (0 == i[1] && o.media.scale(v.settings.scale / 100),
                        1 == i[1] && o.media.scale("-" + v.settings.scale / 100),
                        2 == i[1] && o.media.normalscale())
                    }
                }
            }
            h(d)
        }
        function _() {
            if (c) {
                if (items)
                    for (var e = 0; e < items.length; e++)
                        if (items[e])
                            for (var i = 0; i < items[e].length; i++)
                                items[e][i] && (items[e][i].removeEventListener("mouseover", g),
                                items[e][i].removeEventListener("mouseout", m),
                                items[e][i].removeEventListener("click", w));
                t.innerHTML = "",
                o.controlover = !1,
                c = !1
            }
        }
        this.show = function(t) {
            h(t)
        }
        ,
        this.toggle = function(t) {
            c ? _() : h(t)
        }
        ,
        this.hide = function() {
            _()
        }
        ,
        this.update = function() {
            c && h(d)
        }
    }
      , PluginEffects = function() {
        function t(t) {
            "resize" == t && 1 == v.effectsnow && o.effectsnow && o.effectsnow.resize(),
            "hide" == t && (1 != v.effectflip || o.fullscreen || (o.mediacontainer.style.transform = "scale(1, -1)")),
            "snow" == t && 1 == v.effectsnow && (!o.effectsnow && (o.effectsnow = new PluginSnow),
            o.effectsnow && o.effectsnow.start()),
            "stopsnow" == t && 1 == v.effectsnow && o.effectsnow && o.effectsnow.stop(),
            "play" == t && (o.tagvideo && css(o.media.tag(), {
                filter: "none"
            }),
            1 != v.effectnozoom && o.media.normalscale()),
            "pause" == t && (o.tagvideo && (1 == v.effectgray && 1 == v.effectblur ? (css(o.media.tag(), {
                filter: "blur(5px) grayscale(100%)"
            }),
            1 != v.effectnozoom && o.media.scale(.1)) : (1 == v.effectgray && (css(o.media.tag(), {
                filter: "grayscale(100%)"
            }),
            1 != v.effectnozoom && o.media.scale(.1)),
            1 == v.effectblur && (css(o.media.tag(), {
                filter: "blur(5px)"
            }),
            1 != v.effectnozoom && o.media.scale(.1)))),
            1 != v.effectflip || o.fullscreen || (o.frame.style.transform = "scale(1, 1)",
            o.mediacontainer.style.transform = "scale(1, 1)")),
            "full" == t && 1 == v.effectflip && (o.frame.style.transform = "scale(1, 1)",
            o.mediacontainer.style.transform = "scale(1, 1)")
        }
        1 != v.effectsnowonbut && 1 == v.effectsnow && t("snow"),
        this.api = function(e) {
            1 == v.effectnoandroid && o.system.android || t(e)
        }
    };
    o.lang_ru = {
        auto: "Авто",
        play: "Пуск",
        pause: "Пауза",
        stop: "Стоп",
        fullscreen: "Во весь экран",
        normalscreen: "Выйти из полноэкранного режима",
        settings: "Настройки",
        options: "Параметры",
        volume: "Громкость",
        mute: "Выключить звук",
        unmute: "Включить звук",
        live: "В ЭФИРЕ",
        playlist: "Плейлист",
        quality: "Качество",
        download: "Скачать",
        subtitle: "Субтитры",
        speed: "Скорость",
        normal: "Обычная",
        error: "ошибка",
        unmute_video: "Включите звук",
        audiotrack: "Аудио",
        loading_error: "ошибка загрузки",
        "160p": "Очень низкое",
        "240p": "Низкое",
        "360p": "Среднее",
        "480p": "Высокое",
        "540p": "Высокое",
        next: "Следующий",
        prev: "Предыдущий",
        share: "Поделиться",
        copied: "Скопировано в буфер обмена",
        ads: "Реклама",
        skip: "Пропустить",
        skip_after_: "Пропустить через ",
        adsinvitation: "Перейти на сайт рекламодателя",
        sub_sizeproc: "Размер текста",
        sub_shift: "Сдвиг по времени",
        sub_color: "Цвет текста",
        sub_color2: "Цвет текста 2",
        sub_bgcolor: "Цвет фона",
        sub_bga: "Прозрачность фона",
        sub_shadow: "Тень",
        sub_weight: "Толщина текста",
        sub_bottom: "Отступ снизу",
        sub_reset: "Сбросить",
        upload: "Загрузить",
        sleeptimer: "Сон",
        offsettimer: "Пропуск",
        hour: "Час",
        minute: "Минута",
        second: "Секунда",
        "1val": "Да",
        "0val": "Нет",
        of: "из",
        pass: "Пароль",
        casterror: "Ошибка воспроизведения на устройстве",
        castdevice: "Играет на устройстве",
        channel: "Канал",
        scale: "Масштаб",
        on: "Вкл.",
        off: "Выкл.",
        together: "Все сразу",
        kbps: "кбит/с",
        embed: "Код",
        url: "Ссылка",
        color: "Цвет",
        contrast: "Контраст",
        brightness: "Яркость",
        saturate: "Насышенность",
        sepia: "Сепия"
    };
    var Motion = function(t) {
        var e, i, s, n, a, r, l, d = 0, c = !1;
        if (null != t.me && null != t.mc && null != t.type && null != t.to) {
            null == t.time && (t.type.indexOf("alpha") > -1 ? 0 == t.to ? t.time = .5 : t.time = .2 : t.time = .15),
            e = function(t) {
                switch (t) {
                case "elastic":
                    return [0, .432, .857, 1.275, 1.372, 1.296, 1.102, .957, .883, .87, .914, .992, 1.029, 1.041, 1.036, 1.019, .996, .984, .981, .988, 1.001, 1.006, 1.007, 1.006, 1.003, .999, .998, .998, .998, .998, 1];
                case "cubic":
                    return [0, .096, .185, .267, .344, .416, .483, .547, .606, .659, .705, .747, .785, .818, .848, .874, .897, .918, .935, .95, .962, .971, .979, .985, .99, .994, .997, .999, 1];
                case "back":
                    return [0, .146, .28, .403, .513, .613, .702, .78, .848, .907, .956, .997, 1.029, 1.055, 1.072, 1.084, 1.092, 1.095, 1.095, 1.093, 1.088, 1.081, 1.072, 1.06, 1.046, 1.033, 1.023, 1.014, 1.007, 1.003];
                default:
                    return [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
                }
            }(t.ease),
            -1 == t.type.indexOf("scale") && (exist(o.motions[t.me]) && o.motions[t.me].TheEnd(),
            o.motions[t.me] = this),
            1 == t.show && t.mc.set("display", !0),
            i = t.type.split("|"),
            n = String(t.to).split("|"),
            s = new Array;
            for (var u = 0; u < i.length; u++)
                n[u] || (n[u] = n[0]),
                "alpha" == i[u] && (s[u] = t.mc.g("opacity")),
                "alpha_div" == i[u] && (s[u] = t.mc.style.opacity),
                "y" == i[u] && (s[u] = t.mc.g("y")),
                "x" == i[u] && (s[u] = t.mc.g("x")),
                "left" == i[u] && (s[u] = parseInt(t.mc.style.left)),
                "scale" == i[u] && (s[u] = t.mc.g("scaleX")),
                "scroll" == i[u] && (s[u] = t.mc.scrollTop),
                "scrollleft" == i[u] && (s[u] = t.mc.scrollLeft),
                "scaleY" == i[u] && (s[u] = t.mc.g("scaleY")),
                "scaleX" == i[u] && (s[u] = t.mc.g("scaleX")),
                "width" == i[u] && (s[u] = t.mc.g("width")),
                "width_div" == i[u] && (s[u] = t.mc.offsetWidth,
                n[u] = Math.floor(n[u]),
                "line_play" == t.me && log("width", t.me, s[u], n[u], t.mc.offsetWidth)),
                "height" == i[u] && (s[u] = t.mc.g("height")),
                "height_div" == i[u] && (s[u] = t.mc.offsetHeight),
                n[u] = Number(n[u]),
                s[u] = Number(s[u]);
            r = 1e3 * t.time / e.length,
            a = e.length,
            1 == i.length && s[0] == n[0] ? v() : setTimeout(p, Math.round(r))
        }
        function p() {
            for (var o = 0; o < i.length; o++) {
                var u = s[o] + (n[o] - s[o]) * (e[d] ? e[d] : 0);
                f(i[o], u),
                "y" == i[o] && t.mc.set("top", u),
                "x" == i[o] && t.mc.set("left", u),
                "left" == i[o] && (t.mc.style.left = u + "px"),
                "scale" == i[o] && t.mc.set("scale", u),
                "scaleY" == i[o] && t.mc.set("scaleY", u),
                "scaleX" == i[o] && t.mc.set("scaleX", u),
                "scroll" == i[o] && (t.mc.scrollTop = u),
                "scrollleft" == i[o] && (t.mc.scrollLeft = u),
                "width" == i[o] && t.mc.set("width", u),
                "width_div" == i[o] && css(t.mc, {
                    width: u
                }),
                "height" == i[o] && t.mc.set("height", u),
                "height_div" == i[o] && css(t.mc, {
                    height: u
                })
            }
            d++,
            c || (d == a ? v() : l = setTimeout(p, Math.round(r)))
        }
        function v() {
            c = !0,
            t.hide && ("alpha_div" == i[0] || "left" == i[0] ? hide(t.mc) : t.mc.set("display", !1)),
            -1 == t.type.indexOf("scale") && (o.motions[t.me] = null,
            delete o.motions[t.me]);
            for (var e = 0; e < i.length; e++)
                f(i[e], n[e]);
            clearTimeout(l)
        }
        function f(e, o) {
            "alpha" == e && t.mc.set("opacity", o),
            "alpha_div" == e && (t.mc.style.opacity = o)
        }
        this.TheEnd = function() {
            v()
        }
        ,
        this.TheEnd2 = function() {
            d = a - 1,
            p(),
            v()
        }
        ,
        this.XY = function(t, e, o, s) {
            for (var n = !1, a = 0; a < i.length; a++)
                "x" == i[a] && t != e && (n = !0),
                "y" == i[a] && o != s && (n = !0);
            n && v()
        }
    }
      , System = function() {
        var t, e = navigator.appName, i = navigator.userAgent, s = i.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        (s = i.match(/(opera|chrome|safari|firefox|msie|trident|edge)\/?\s*(\.?\d+(\.\d+)*)/i)) && null != (t = i.match(/version\/([\.\d]+)/i)) && (s[2] = t[1]);
        var n = navigator.maxTouchPoints;
        this.browser = s ? s[1] : e,
        this.version = s ? s[2] : navigator.appVersion,
        this.touch = navigator.maxTouchPoints > 1,
        this.opera = "Opera" == this.browser,
        this.ie9 = "MSIE 9.0" == this.browser,
        this.ie = "MSIE" == this.browser || "Trident" == this.browser || "Edge" == this.browser,
        this.edge = i.search(/(edge)\/?\s*/i) > -1,
        this.firefox = "Firefox" == this.browser,
        this.safari = "Safari" == this.browser,
        this.chrome = window.chrome,
        this.win = i.search("Windows NT") > -1,
        this.ios = i.search(/(iphone|ipad|ipod)\/?\s*/i) > -1 || "MacIntel" === navigator.platform && n > 1,
        this.tv = 1 != v.notv && i.search(/(TV|tvOS|webOS|armv|BRAVIA|Roku|Tizen|Philips)\/?\s*/i) > -1,
        this.lg = 1 != v.notv && i.search(/(LG)\/?\s*/i) > -1,
        this.iphone = i.search(/(iphone)\/?\s*/i) > -1,
        this.ipad = this.ios && !this.iphone,
        this.webkit = "WebkitAppearance"in document.documentElement.style,
        i.search(/(android)\/?\s*/i) > -1 && (n > 0 ? this.android = !0 : this.tv = !0,
        matchMedia("(pointer:fine)").matches && (this.tv = !0)),
        this.mobile = (this.ios || this.android || i.search(/(blackberry|iemobile|opera mini)\/?\s*/i) > -1) && !this.tv,
        this.mutedautoplay = this.safari || this.chrome,
        this.fullscreen = !1,
        this.ios && (this.iosv = parseFloat(i.substr(i.indexOf("OS ") + 3, 4).replace("_", ".")),
        this.ipad && (!1 in window || n < 2) && (this.mobile = this.ios = !1,
        this.tv = !0)),
        this.desktop = !this.mobile,
        this.mobiletv = this.mobile || this.tv,
        (o.frame.requestFullScreen || o.frame.requestFullscreen || o.frame.mozRequestFullScreen || o.frame.webkitRequestFullScreen || o.frame.msRequestFullscreen) && (this.fullscreen = !0)
    };
    function UpdateObject(t, e) {
        for (var o in e)
            if ("object" == typeof e[o])
                if ("events" == o || "file" == o)
                    t[o] = e[o];
                else
                    for (var i in e[o])
                        if ("object" != typeof t[o] && (t[o] = {}),
                        "object" == typeof e[o][i])
                            for (var s in e[o][i])
                                if ("object" != typeof t[o][i] && (t[o][i] = {}),
                                "object" == typeof e[o][i][s])
                                    for (var n in e[o][i][s])
                                        "object" != typeof t[o][i][s] && (t[o][i][s] = {}),
                                        t[o][i][s][n] = e[o][i][s][n],
                                        "padding" != s && "margin" != s || (t[o][i][s][n] = parseInt(t[o][i][s][n]));
                                else
                                    t[o][i][s] = e[o][i][s],
                                    "padding" != i && "margin" != i || (t[o][i][s] = parseInt(t[o][i][s]));
                        else
                            t[o][i] = e[o][i],
                            "padding" != o && "margin" != o || (t[o][i] = parseInt(t[o][i]));
            else
                o.indexOf("roll") > 0 && "" === trim(e[o]) || (t[o] = SettingsParser(o, e[o]));
        return t
    }
    var SettingsParser = function(t, e) {
        return "string" == typeof e && (e = trim(e),
        t.indexOf("color") > -1 && -1 != e && (e = CheckColor(e))),
        e
    };
    function hexToRGBA(t, e) {
        return "rgba(" + (t = t.replace("#", "")).match(new RegExp("(.{" + t.length / 3 + "})","g")).map((function(e) {
            return parseInt(t.length % 2 ? e + e : e, 16)
        }
        )).concat(e || 1).join(",") + ")"
    }
    function StorageSupport() {
        try {
            var t = window.localStorage
              , e = "__storage_test__";
            return t.setItem(e, e),
            t.removeItem(e),
            !0
        } catch (t) {
            return !1
        }
    }
    function killMotion(t) {
        t && exist(o.motions[t]) && o.motions[t].TheEnd()
    }
    var Lang = function(t) {
        var e = t;
        e && (e = t.charAt(0).toUpperCase() + t.slice(1)).indexOf("_") > -1 && (e = e.replace(/_/gi, " "));
        var i = {
            of: "of",
            kbps: "kbps",
            castdevice: "Playback on device",
            casterror: "Playback error on device",
            together: "All at once",
            pass: "Password",
            "0val": "No",
            sleeptimer: "Sleep",
            offsettimer: "Skip",
            "1val": "Yes",
            sub_bottom: "Bottom margin",
            sub_weight: "Font weight",
            sub_shadow: "Shadow",
            sub_bga: "Background opacity",
            sub_bgcolor: "Background color",
            sub_sizeproc: "Text size",
            sub_color: "Text color",
            sub_color2: "Text color 2",
            sub_shift: "Time shift",
            sub_reset: "Reset",
            prev: "Previous",
            copied: "Copied to clipboard",
            "160p": "Tiny",
            "240p": "Small",
            "360p": "Medium",
            "480p": "High",
            "540p": "High",
            "720p": "HD",
            "1080p": "Full HD",
            "1296p": "Super HD",
            "1440p": "Quad HD",
            "2160p": "Ultra HD 4K",
            ads: "Ad",
            adsinvitation: "Go to the advertiser's website",
            audiotrack: "Audio",
            live: "LIVE",
            fullscreen: "Enter fullscreen",
            normalscreen: "Exit fullscreen"
        };
        return exist(i[t]) && (e = i[t]),
        exist(o["lang_" + v.lang]) && exist(o["lang_" + v.lang][t]) && (e = o["lang_" + v.lang][t]),
        v.rename && v.rename[t] && (e = v.rename[t]),
        e
    };
    function getSwarmId() {
        return void 0 !== o.plid && o.playlist_dic[o.plid].pjs_id ? o.playlist_dic[o.plid].pjs_id : v.cuid
    }
    var gaTracker = function(t, e, i) {
        if (!exist(o.gatracked[e]) && 1 != v.HDVBPlayercom) {
            var s, n = getSwarmId();
            if (exist(v.label) && (n = v.label),
            1 == v.yamtr_event[t] && 1 == v.yamtr && exist(v.yamtrid) && ("init" == t && setInterval(yaHit, 3e5),
            exist(window["yaCounter" + v.yamtrid]) ? (window["yaCounter" + v.yamtrid].reachGoal("HDVBPlayer_" + t, {
                title: n
            }),
            log("Yandex", "HDVBPlayer_" + t)) : log("Yandex Metric error")),
            1 == v.ga_event[t])
                if (1 == v.ga)
                    if (1 == v.ga4) {
                        if (window.gtag) {
                            if (s = {
                                label: n
                            },
                            v.galabels && "object" == typeof v.galabels)
                                for (var a in v.galabels)
                                    v.galabels.hasOwnProperty(a) && (s[a] = v.galabels[a]);
                            gtag("event", "HDVBPlayer_" + t, s)
                        }
                    } else
                        window.ga && (s = {
                            eventCategory: "Player",
                            eventAction: e
                        },
                        "" != n && (s.eventLabel = n),
                        1 != v.gainact || o.clicktime || (s.nonInteraction = 1),
                        ga("user.send", "event", s))
        }
        i && (o.gatracked[e] = !0)
    };
    function yaHit() {
        exist(window["yaCounter" + v.yamtrid]) && window["yaCounter" + v.yamtrid].reachGoal("getSwarmId")
    }
    var YoutubeID = function(t) {
        var e = "";
        if ((t = t.replace("v=", "{=")).indexOf("youtu.be/") > -1 ? (e = t.substr(t.indexOf(".be/") + 4)).replace("/", "") : e = t.split(/(youtu.be\/|v\/|embed\/|watch\?|youtube.capiom\/user\/[^#]*#([^\/]*?\/)*)\??{?=?([^#\&\?]*)/)[3],
        "" != e && e.indexOf("?t=") > 0) {
            v.start = e.substr(e.indexOf("?t=") + 3);
            var o = 0
              , i = 0
              , s = 0;
            v.start.indexOf("h") > 0 && (o = v.start.substr(0, v.start.indexOf("h")),
            v.start = v.start.substr(v.start.indexOf("h") + 1)),
            v.start.indexOf("m") > 0 && (i = v.start.substr(0, v.start.indexOf("m")),
            v.start = v.start.substr(v.start.indexOf("m") + 1)),
            v.start.indexOf("s") > 0 && (s = v.start.substr(0, v.start.indexOf("s")),
            v.start = v.start.substr(v.start.indexOf("s") + 1)),
            (o > 0 || i > 0 || s > 0) && (v.start = 3600 * o + 60 * i + 1 * s),
            e = e.substr(0, e.indexOf("?t="))
        }
        return e
    }
      , js = function(x, y, li, ev) {
        if ("init" == x && (o.init = !0),
        1 == ev)
            for (var yi in y)
                y.hasOwnProperty(yi) && "object" == typeof y[yi] && (y[yi] = "");
        if (1 == v.eventstracker && o.init)
            if (1 == v.eventlisteners || 1 == li)
                JsEvent(x, y);
            else {
                if (null != y && "object" == typeof y)
                    try {
                        y = JSON.stringify(y)
                    } catch (t) {}
                if ("string" == typeof v.events && 0 == v.events.indexOf("{"))
                    try {
                        v.events = v.events.replace(/\'/gi, '"'),
                        v.events = JSON.parse(v.events)
                    } catch (t) {
                        console.log(t)
                    }
                if ("object" == typeof v.events) {
                    if (exist(v.events[x]) || exist(v.events.other)) {
                        var z = x;
                        !exist(v.events[x]) && exist(v.events.other) && (z = "other"),
                        0 == x.indexOf("vast_") && exist(v.events.vast) && (z = "vast");
                        try {
                            void 0 !== y ? eval(v.events[z] + "('" + x + "','" + v.id + "','" + y + "')") : eval(v.events[z] + "('" + x + "','" + v.id + "')")
                        } catch (t) {
                            log("events", t, x)
                        }
                    }
                } else {
                    "" == v.events && (v.events = "HDVBPlayerEvents");
                    try {
                        void 0 !== y ? eval(v.events + "('" + x + "','" + v.id + "','" + y + "')") : eval(v.events + "('" + x + "','" + v.id + "')")
                    } catch (t) {
                        log("events", t, x, y)
                    }
                }
            }
        if (o.init && 1 == v.pjsframe && o.pjsfrm)
            try {
                o.pjsfrm.contentWindow.postMessage({
                    event: x,
                    info: y
                }, "*")
            } catch (t) {}
        if (1 == v.postmessage && 1 !== li) {
            var zv = {
                event: x,
                time: o.media ? "seek" == x ? o.seeked_time : o.media.time() : 0
            };
            null != y && (zv.data = y),
            "duration" != x && "time" != x || (zv.duration = o.media.duration()),
            "volume" != x && "unmute" != x || (zv.volume = v.volume),
            "new" == x && (zv.id = apiProcessor("playlist_id")),
            window.parent.postMessage(zv, "*");
            var z = x;
            ("init" == x || "start" == x || "end" == x) && (z = x + "ed"),
            "play" == x && (z = "resumed"),
            "pause" == x && (z = "paused"),
            "mute" == x && (z = "muted"),
            "unmute" == x && (z = "unmuted"),
            "seek" == x && (z = "rewound"),
            "vast_Impression" == x && (z = "adShown"),
            zv.event = z,
            "" != z && z != x && (zv = JSON.parse(JSON.stringify(zv)),
            window.parent.postMessage(zv, "*"))
        }
    }
      , JsEvent = function(t, e) {
        var i = document.createEvent("Events");
        void 0 !== e && (i.info = e),
        i.initEvent(t, !0, !0),
        o.container.dispatchEvent(i)
    };
    this.event = function(t, e) {
        o.events[t] = e
    }
    ;
    var api = function(t, e, o) {
        return apiProcessor(t, e, o)
    };
    function apiProcessor(t, e, i) {
        if (!exist(o.actions) || "string" != typeof t)
            return !1;
        if (1 != o.destroyed) {
            if (i && "string" == typeof i && 0 == i.indexOf("id:") && (i = o.controls.butByS(i.substr(3), "dom")) && "button" == t && "toogle" == e && i.Click(),
            "play" == t || "file" == t)
                if (exist(e)) {
                    var s = !1;
                    if ("string" == typeof e) {
                        var n = -1;
                        if ((e = e.replace(/(\r\n|\n|\r)/gm, "")).indexOf("[seek:") > -1 && e.lastIndexOf("]") == e.length - 1) {
                            if (n = e.substr(e.indexOf("[seek:") + 6, e.length - 1),
                            n = parseInt(n.substr(0, n.length - 1)),
                            "" == (e = e.substr(0, e.indexOf("[seek:"))))
                                return o.actions.Seek(n),
                                void o.actions.Play();
                            o.seekto = n
                        }
                        if (e.indexOf("[skipads]") > -1 && (s = !0,
                        e = e.replace("[skipads]", "")),
                        0 == e.indexOf("#" + v.enc2) && (e = o[o.fd[0]](e)),
                        0 == e.indexOf("#" + v.enc3) && e.indexOf(v.file3_separator) > 0 && (e = o[o.fd[1]](e)),
                        0 == e.indexOf("#0") && (e = fd0(e)),
                        1 == v.fplace && (e = fplace(e)),
                        e.indexOf(".txt") == e.length - 4)
                            return (P = XHR(e)).onload = function() {
                                if (4 == this.readyState && 200 == this.status)
                                    try {
                                        apiProcessor("play", JSON.parse(this.responseText))
                                    } catch (t) {}
                            }
                            ,
                            void P.send();
                        if (0 == e.indexOf("id:") && exist(o.playlist_dic)) {
                            var a = FindIdPl(e);
                            return !!exist(o.playlist_dic[a]) && (o.controls.PlaylistPlayId(a),
                            n > -1 && (o.seekto = n),
                            !0)
                        }
                        if (0 == e.indexOf("youtubeid:")) {
                            a = e.substr(10);
                            if ("youtube" == o.file_type)
                                return o.media.playByYoutubeId(a),
                                !0;
                            e = "//youtu.be/" + a
                        }
                    }
                    "play" == t && (o.controls.PreNewPl(),
                    o.actions.NewFile(e, void 0, void 0, s ? 1 : 0)),
                    "file" == t && (o.newfile = !0,
                    v.autoplay = 0,
                    o.actions.NewFile(e, 1, void 0, s ? 1 : 0),
                    o.controls.Duration(0, 0),
                    o.start = !1)
                } else
                    "play" == t && o.actions.Play(),
                    "file" == t && "function" == typeof Papi41 && Papi41();
            if ("preload" == t && (exist(e) ? (o.newfile = !0,
            o.actions.NewFile(e, 1, 1)) : o.media.Preload()),
            "pause" == t && o.play && (o.actions.Pause(),
            o.actions.RenewSubtitle()),
            "channel" == t && exist(e) && o.start && o.channels && o.channels.SetChannel(e),
            0 == t.indexOf("vpaid_") && o.vast && o.vast.VpaidSet(t.substr(6), e),
            "alert" == t && (o.alert.close(),
            o.alert = new Alert,
            1 == v.alert404 ? o.alert.txt(v.alert404text) : o.alert.txt("Test message"),
            1 == v.alert404v && exist(v.alert404video) && (o.err404v = new PluginErrorVideo)),
            "waiting" == t && (o.controls.Waiting(),
            o.controls.HideElement("control_start")),
            "toggle" == t && (o.play ? o.actions.Pause() : o.actions.Play()),
            "stop" == t && (v.preload = 0,
            v.autoplay = 0,
            o.media.Recover(),
            o.actions.Stop()),
            "reload" == t && (o.time = o.media.time(),
            o.actions.Reload()),
            "download" == t && v.apiprm && 1 == v.apiprm.on && 1 == v.apiprm.dwn && o.actions.Download(),
            "effect" == t && exist(e) && o.effects && o.effects.api(e),
            "share" == t && o.controls.showShare(),
            "startvast" == t && exist(e) && 1 == v.vast)
                if (0 == e.indexOf("js:"))
                    v.midroll = e,
                    v.midrolls = !0,
                    o.actions.advertising("midroll");
                else if ("" != o.p) {
                    var r = JSON.parse(decode(o.p));
                    for (var l in r)
                        r.hasOwnProperty(l) && exist(r[l].id) && e == r[l].id && (v.midroll = "prt" + (exist(r[l].cpm) ? "cpm" + r[l].cpm : "") + e + "_" + r[l].preroll,
                        v.midrolls = !0,
                        o.actions.advertising("midroll"))
                }
            if ("vastbreak" == t && "function" == typeof VastBreak && VastBreak(),
            "cuid" == t && e && (v.cuid = e,
            o.continue && o.continue.updateCuid()),
            "mute" == t && o.actions.Mute(),
            "speed" == t) {
                if (!exist(e))
                    return o.files_speed[o.current_speed];
                o.actions.SetSpeed(e)
            }
            if ("played" == t && v.apiprm && o.pld && 1 == v.apiprm.pld)
                return Math.round((o.pld.filter(Boolean).length - 1) / Math.round(o.media.duration()) * 100);
            if ("speeds" == t)
                return o.files_speed;
            if ("unmute" == t && o.actions.Unmute(),
            "thumbnails" == t && exist(e) && (v[t] = e,
            o.actions.Thumbs()),
            "qualities" == t)
                return o.files_quality;
            if ("adblock" == t)
                return !!o.ab;
            if ("live" == t)
                return !!o.media && o.media.isLive();
            if ("subtitles" == t)
                return 1 == v.sub_off ? o.files_subtitle.slice(0, -1) : o.files_subtitle;
            if ("audiotracks" == t)
                return o.files_audiotrack;
            if ("volume" == t || "setVolume" == t)
                return exist(e) && e >= 0 && e <= 1 && o.actions.Volume(e),
                o.muted ? 0 : v.volume;
            if ("muted" == t)
                return !!exist(o.muted) && o.muted;
            if ("moveplaylist" == t && o.controls && o.controls.PlaylistMove(e),
            "design" == t && (e < 2 && (e = ""),
            "" != o["u" + e])) {
                var d = JSON.parse(decode(o["u" + e]))
                  , c = [];
                for (var l in v)
                    v.hasOwnProperty(l) && 0 == l.indexOf("control_") && (v[l] = null);
                if ("object" == typeof d)
                    for (var u in d)
                        d.hasOwnProperty(u) && (0 == u.indexOf("control_") && (v[u] = d[u]),
                        "toolbar" == u && (c[u] = d[u]));
                v = UpdateObject(v, c);
                var p = !1;
                o.controls.SettingsVisible() && (o.controls.Settings(),
                p = !0);
                var f = !1;
                o.controls.PlaylistVisible() && (o.controls.Playlist(),
                f = !0),
                o.controls.Remove(),
                o.controls = null,
                o.controls = new Controls,
                "playing" == o.media.status() && o.controls.Play(),
                o.controls.Volume(v.volume),
                exist(v.title) && Title(v.title),
                p && o.controls.Settings(),
                f && o.controls.Playlist(),
                o.fullscreen && o.controls.Fullscreen(),
                "control_duration" != key && o.controls.Duration(o.media.time(), o.media.duration()),
                MainResize()
            }
            if ("vars" == t)
                return v.vars;
            if ("resize" == t && o.controls.resize(!0),
            "seek" == t && exist(e)) {
                if ("string" == typeof e)
                    if (e.indexOf("%") > -1)
                        e = parseInt(e.substr(0, e.indexOf("%"))),
                        e = o.media.duration() * e / 100;
                    else {
                        var h = o.media.time();
                        if (o.continue && !o.start)
                            if (!o.continue.seeked)
                                (g = o.continue.flag()).t && g.d && (h = g.t,
                                o.continue.seeked = !0);
                        0 == e.indexOf("+") ? e = h + parseInt(e.substr(1)) : 0 == e.indexOf("-") && (e = h - parseInt(e.substr(1)))
                    }
                (e *= 1) < 0 && (e = 0),
                o.media.duration() > 0 && e > o.media.duration() && (e = 0),
                !exist(o.vast) && !exist(o.vastloader) && o.media.duration() > 0 ? (o.seekto = void 0,
                o.actions.Seek(e, !0),
                o.actions.Playing()) : o.seekto = e
            }
            if ("fullscreen" == t && !o.fullscreen && o.actions.Fullscreen(),
            "exitfullscreen" == t && o.fullscreen && o.actions.Normalscreen(),
            "isfullscreen" == t)
                return o.fullscreen;
            if ("size" == t)
                return o.screen_w + "/" + o.screen_h;
            if ("fix" == t && exist(o.minify) && o.minify.Do(),
            "unfixing" != t && "unfix" != t || exist(o.minify) && o.minify.Un(),
            "time" == t) {
                var g, m = o.media ? o.media.time() : 0;
                if (o.continue && 1 == v.timestore && !o.start && 0 == m)
                    (g = o.continue.flag()).t && (m = g.t);
                return m
            }
            if ("timeplay" == t && (o.butplstart && apiProcessor("play", "id:" + o.butplstart),
            o.butseekto && (apiProcessor("seek", o.butseekto),
            apiProcessor("play"))),
            "duration" == t)
                return o.media ? o.media.duration() : 0;
            if ("buffered" == t)
                return o.media ? o.media.loaded() : 0;
            if ("points" == t && e && (v.points = e,
            o.controls.RenewPoints()),
            "quality" == t) {
                if (!exist(e))
                    return o.media ? NoSpan(o.media.getQuality()) : 0;
                i ? (v.hd = Switcher(v.hd, e, i),
                2 == o.files_quality.length && o.actions.SetQuality(v.hd)) : o.actions.SetQuality(e)
            }
            if ("audiotrack" == t) {
                if (!exist(e))
                    return o.media ? o.media.getAudioTrack() : 0;
                i ? (v.ahd = Switcher(v.ahd, e, i),
                2 == o.files_audiotrack.length && o.actions.SetAudioTrack(v.ahd)) : o.actions.SetAudioTrack(e)
            }
            if ("isyoutube" == t)
                return "youtube" == o.file_type;
            if ("restart" == t && (o.current_audiotrack > 0 && (o.restart_audio = o.current_audiotrack),
            o.actions.NewFile(o.files[o.current_file])),
            "playing" == t)
                return o.play;
            if ("started" == t)
                return o.start;
            if ("system" == t)
                return o.system[e];
            if ("youtubeready" == t && 1 != o.destroyed && o.media.onYoutubeReady(),
            "id" == t)
                return v.id;
            if ("log" == t && (v.log = e),
            "eventstracker" == t && (v.eventstracker = e),
            "pip" == t && o.media.PipToggle(),
            "switchpip" == t && (o.media.PipSwitch(),
            i && (o.piped = Switcher(o.piped, e, i))),
            "airplay" == t && o.media.Airplay(),
            "pipwebkit" == t && o.media.PipWebkit(),
            "options" == t && 1 != v.HDVBPlayercom && console.log(options),
            "castinit" == t && o.chromecast && o.chromecast.init(),
            "subtitle" == t && (v.subtitle = e,
            exist(e) && (e.toString().length < 3 && o.sbt ? o.sbt.SetSubtitle(1 * e) : o.actions.Subtitle(e))),
            "quiz" == t && exist(o.quiz)) {
                if (!exist(e))
                    return o.quiz.Active();
                o.quiz.api(e)
            }
            if ("geo" == t)
                return !!o.geobj && o.geobj;
            if ("box" == t) {
                var b = createElement("div");
                b.id = e,
                b.style.zIndex = 1e4,
                o.frame.appendChild(b)
            }
            if ("screenshot" == t) {
                if (o.tagvideo) {
                    var y = createElement("canvas")
                      , x = o.media.size();
                    y.width = x.width > 0 ? x.width : o.normal_w,
                    y.height = x.height > 0 ? x.height : o.normal_h,
                    css(y, {
                        position: "absolute",
                        top: -y.height,
                        left: -y.width,
                        display: "none"
                    }),
                    document.body.appendChild(y);
                    var w = y.getContext("2d");
                    w.drawImage(o.media.tag(), 0, 0, y.width, y.height);
                    var _ = document.createElement("canvas");
                    _.width = 2 * y.width,
                    _.height = 2 * y.height;
                    var k, S = _.getContext("2d");
                    S.drawImage(o.media.tag(), 0, 0, 2 * y.width, 2 * y.height),
                    1 == v.sscopyright && exist(v.sstext) && (!exist(v.ssfontsize) && (v.ssfontsize = 20),
                    !exist(v.ssfontcolor) && (v.ssfontcolor = "ffffff"),
                    S.font = v.ssfontsize + "px Courier, Arial",
                    S.fillStyle = CheckColor(v.ssfontcolor),
                    S.fillText("domain" == v.sstext ? o.domain : v.sstext, v.ssfontsize, 2 * y.height - v.ssfontsize - 5)),
                    w.drawImage(_, 0, 0, y.width, y.height);
                    try {
                        k = y.toDataURL("image/jpeg")
                    } catch (t) {
                        return console.log(t.message),
                        !1
                    }
                    return k
                }
                return !1
            }
            if ("dash" == t)
                return o.file_type == t ? o.media.getDASH() : void 0;
            if ("hls" == t)
                return o.file_type == t ? o.media.getHLS() : void 0;
            if ("poster" == t)
                return !o.play && (o.media.Poster(e),
                !0);
            if ("stretch" == t) {
                if (!exist(e))
                    return existv(v.covervideo, 0);
                "1/0" == e && (e = 1 - existv(v.covervideo, 0)),
                v.covervideo = e,
                o.media.normalscale()
            }
            if ("scale" == t) {
                if (!exist(e))
                    return [o.mediascale.x, o.mediascale.y, o.mediacontainer.style.left, o.mediacontainer.style.top];
                0 == e ? o.media.normalscale() : o.media.scale(e)
            }
            if ("title" == t)
                return exist(e) ? (exist(e) && (v.title = e),
                o.actions.Title("title"),
                !0) : v.title;
            var P;
            if ("invert" == t && o.actions.InvertPlaylist(),
            "push" == t && e && (!o.playlist_source && (o.playlist_source = []),
            "object" == typeof e && (e = o.playlist_source.concat(e),
            t = "playlist")),
            "playlist" == t && e)
                if ("object" == typeof e)
                    try {
                        return o.actions.UpdatePlaylist(e),
                        !0
                    } catch (t) {
                        return !1
                    }
                else if (e.indexOf(".txt") == e.length - 4 || e.indexOf(".txt?") > 0)
                    return (P = XHR(e)).onload = function() {
                        if (4 == this.readyState && 200 == this.status)
                            try {
                                apiProcessor("playlist", JSON.parse(this.responseText))
                            } catch (t) {}
                    }
                    ,
                    P.send(),
                    !0;
            if ("next" == t && o.controls && o.controls.PlaylistNext(),
            "prev" == t && o.controls && o.controls.PlaylistPrev(),
            "cut" == t && o.controls && o.controls.Cut(e),
            "flip" == t && o.media && o.media.flip(),
            "find" == t && exist(e) && exist(o.playlist_dic)) {
                for (var T in !o.play && (v.autoplay = 0),
                o.playlist_dic)
                    o.playlist_dic.hasOwnProperty(T) && o.playlist_dic[T].pjs_id == e && (e = T);
                return -1 === e.indexOf("xxx-") && ("x-" == e.substr(0, 2) && (e = o.playlist_dic[e].folder[o.playlist_dic[e].folder.length - 1].id),
                "xx" == e.substr(0, 2) && (e = o.playlist_dic[e].folder[o.playlist_dic[e].folder.length - 1].id)),
                !!exist(o.playlist_dic[e]) && (o.controls.PlaylistOpenId(e),
                !0)
            }
            if ("playlist_folders" == t) {
                var A = [];
                if (exist(o.playlist_dic))
                    for (var T in o.playlist_dic)
                        o.playlist_dic[T].folder && -1 == o.playlist_dic[T].pjs_parent_i && A.push({
                            title: o.playlist_dic[T].title,
                            id: o.playlist_dic[T].id
                        });
                return A
            }
            if ("playlist_id" == t && o.plid)
                return o.playlist_dic[o.plid].pjs_id ? o.playlist_dic[o.plid].pjs_id : o.plid;
            if ("playlist_length" == t)
                return o.playlist_dic ? Object.keys(o.playlist_dic).length : -1;
            if ("playlist_title" == t && exist(o.playlist_title))
                return o.playlist_title;
            if ("showplaylist" == t && o.controls.PlaylistShow(),
            "toolbar" == t && o.controls.ShowForce(),
            "vastnow" == t)
                return !!o.vast;
            if ("vastinfo" == t)
                return !!o.vast && VastInfo();
            if ("vastpause" == t)
                return !!o.vast && o.vast.pause();
            if ("vastresume" == t)
                return !!o.vast && o.vast.resume();
            if ("vaststart" == t) {
                if (!o.vast)
                    return !1;
                o.vast.startAd()
            }
            if ("vastmute" == t) {
                if (!o.vast)
                    return !1;
                o.vast.mute()
            }
            if ("captions" == t && (v.captions = Switcher(v.captions, e, i),
            o.media.captions()),
            "loop" == t)
                if (exist(i))
                    v.loop = Switcher(v.loop, e, i);
                else {
                    if (!exist(e))
                        return v.loop;
                    "0/1" == e && (e = 1 - v.loop),
                    v.loop = e
                }
            if ("shuffle" == t)
                if (exist(i))
                    v.shuffle = Switcher(v.shuffle, e, i);
                else {
                    if (!exist(e))
                        return v.shuffle;
                    v.shuffle = e
                }
            if ("autonext" == t || "playlistloop" == t) {
                a = "autoplaylist";
                return "playlistloop" == t && (a = "playlistrewind"),
                exist(i) ? v.playlist[a] = Switcher(v.playlist[a], e, i) : exist(e) && ("0/1" == e && (e = 1 - v.playlist[a]),
                v.playlist[a] = e),
                v.playlist[a]
            }
            if ("hd" == t && 2 == o.files_quality.length && (v.hd = o.files_quality[o.current_quality],
            v.hd = Switcher(v.hd, e, i),
            o.files_quality[0] == v.hd ? o.actions.SetQuality(0) : o.actions.SetQuality(1)),
            "v" == t && e) {
                if (0 == e.indexOf("file") || 0 == e.indexOf("bk"))
                    return;
                return v[e]
            }
            if (0 == t.indexOf("update:")) {
                var O = t.substr(7);
                if ("object" == typeof e && "object" == typeof v[O])
                    for (var E in e)
                        e.hasOwnProperty(E) && (v[O][E] = e[E]);
                else
                    -1 == t.indexOf("rc_") && (v[O] = e);
                return !0
            }
            return 0 == t.indexOf("text:") && o.controls.customText(t.substr(5), e),
            "currentfile" == t ? o.media ? o.media.currentFile() : "" : "vrsn" == t ? o.version : "hlserror" == t ? o.hlserror : "dasherror" == t ? o.dasherror : "visibility" == t ? o.visibility : "vastids" == t ? o.vast ? o.vast_adid : void 0 : void ("destroy" == t && (o.actions.StopMedia(),
            o.destroyed = 1,
            v.hotkey.on = 0,
            o.container.innerHTML = ""))
        }
    }
    function Switcher(t, e, o) {
        var i = trim(e) + "";
        if (e.indexOf("/") > 0) {
            var s = e.split("/");
            2 == s.length && (t == trim(s[0]) ? (i = trim(s[1]),
            o && o.CustomSwitch(1)) : (i = trim(s[0]),
            o && o.CustomSwitch(0)))
        }
        return i
    }
    function XHR(t) {
        var e = new XMLHttpRequest;
        return e.open("GET", t, !0),
        e
    }
    function FindIdPl(t) {
        var e = t.substr(3);
        if (o.playlist_dic)
            for (var i in o.playlist_dic)
                o.playlist_dic.hasOwnProperty(i) && o.playlist_dic[i].pjs_id == e && (e = i);
        return e
    }
    function VastInfo() {
        var t;
        if (o.vast && o.vast.active() && (t = o.vast),
        !t && o.vastloader && (t = o.vastloader),
        t) {
            var e = {
                is: o.vasttype,
                system: t.info("adsystem"),
                version: t.info("version"),
                vpaid: t.info("isVpaid"),
                url: o.current_vast_url + (t.info("wrapper") ? t.info("wrapper0") + t.info("wrapper") : ""),
                type: t.info("filetype"),
                file: t.info("file"),
                time: o.media ? o.media.time() : "",
                volume: t.getVolume(),
                id: o.vast_adid
            };
            return "midroll" == o.vasttype && (e.midroll_time = o.midrollcrtm),
            e
        }
    }
    this.api = function(t, e, o) {
        return apiProcessor(t, e, o)
    }
    ;
    var createElement = function(t) {
        var e = t;
        ("div" == t || "div2" == t) && (e = "hdvbplayer");
        var o = document.createElement(e);
        return "div2" == t && css(o, {
            cursor: "pointer",
            display: "block"
        }),
        o
    }
      , log = function(t, e, o, i, s, n, a) {
        if (1 == v.log || 1 == v.logout) {
            var r = t + (null != e ? " " + e : "") + (null != o ? " " + o : "") + (null != i ? " " + i : "") + (null != s ? " " + s : "") + (null != n ? " " + n : "") + (null != a ? " " + a : "");
            console.log("HDVBPlayer" + (1 == v.pjsframed ? "2" : "") + ": " + r),
            1 == v.logout && exist(document.getElementById("pjslog")) && (document.getElementById("pjslog").innerHTML += r + "<br/>")
        }
    }
      , CustomFonts = function() {
        if (1 == v.fonts && exist(v.fontnames) && "" != v.fontnames) {
            var t = document.createElement("link");
            t.rel = "stylesheet",
            t.href = "https://fonts.googleapis.com/css?family=" + v.fontnames.replace(/,/gi, "|").replace(/ /gi, "+"),
            document.head.appendChild(t)
        }
    }
      , SvgColor = function(t, e) {
        for (var o = ["path", "polygon", "polyline", "rect", "ellipse", "circle"], i = 0; i < o.length; i++) {
            var s = t.querySelectorAll("svg " + o[i]);
            if (s.length > 0)
                for (var n = 0; n < s.length; n++)
                    s[n].style.fill = e
        }
    }
      , Time = function(t) {
        t < 0 && (t = 0);
        var e = o.media.duration >= 600
          , i = o.media.duration >= 3600
          , s = Math.floor(t / 60)
          , n = Math.floor(t - 60 * s)
          , a = Math.floor(s / 60)
          , r = Math.floor(a / 24);
        if (s -= 60 * a,
        r > 0 && (a -= 24 * r),
        1 == v.dvrtime && o.media.isLive()) {
            var l = new Date;
            return String(new Date(l.getTime() + 1e3 * t).toLocaleTimeString())
        }
        return String((r > 0 ? r + ":" : "") + (a > 0 || i ? a + ":" : "") + ((a > 0 || e) && s < 10 ? "0" : "") + s + ":" + (n < 10 ? "0" : "") + n)
    }
      , timeFormat = function(t) {
        var e = Math.floor(t)
          , i = Math.floor(e / 60)
          , s = Math.floor(i / 60);
        i = Math.floor(i % 60),
        s > 0 && i < 10 && (i = "0" + i);
        var n = (s > 0 ? s + ":" : "") + (i >= 0 ? i : "0") + ":" + (e = (e = Math.floor(e % 60)) >= 0 ? e >= 10 ? e : "0" + e : "00");
        if (1 == v.dvrtime && o.media.isLive()) {
            var a = new Date;
            return String(new Date(a.getTime() + 1e3 * t).toLocaleTimeString())
        }
        return n
    }
      , Href = function() {
        return encodeURIComponent(window.location != window.parent.location ? document.referrer : document.location.href)
    }
      , NoSpan = function(t) {
        if (t) {
            var e = (t = t.toString()).indexOf(" <span style='opacity");
            e > -1 && (t = t.substr(0, e))
        }
        return t
    }
      , Script = function(t, e, o) {
        var i;
        if (!Scripted(t) && e) {
            "same" == e && (e = t),
            (i = document.createElement("script")).src = -1 == e.indexOf("//") ? "//" + e : e,
            i.async = 1,
            o && (i.name = o);
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(i, s)
        }
        return i
    }
      , Scripted = function(t) {
        for (var e = !1, o = document.getElementsByTagName("script"), i = 0; i < o.length; i++)
            o[i].src.indexOf(t) > -1 && (e = !0);
        return e
    }
      , hex2rgb = function(t, e) {
        t = t.replace("#", "");
        var o = parseInt(3 == t.length ? t.slice(0, 1).repeat(2) : t.slice(0, 2), 16)
          , i = parseInt(3 == t.length ? t.slice(1, 2).repeat(2) : t.slice(2, 4), 16)
          , s = parseInt(3 == t.length ? t.slice(2, 3).repeat(2) : t.slice(4, 6), 16);
        return e ? "rgba(" + o + ", " + i + ", " + s + ", " + e + ")" : "rgb(" + o + ", " + i + ", " + s + ")"
    }
      , css = function(t, e) {
        if (exist(t))
            for (var o in e)
                e.hasOwnProperty(o) && "NaNpx" != e[o] && null != e[o] && ("number" == typeof e[o] && "opacity" != o && "zIndex" != o && (e[o] += "px"),
                (o.indexOf("color") > -1 || o.indexOf("Color") > -1) && -1 == e[o].indexOf("#") && -1 == e[o].indexOf("rgba") && (e[o] = "#" + e[o]),
                "transform" == o && (t.style["-ms-" + o] = e[o],
                t.style["-moz-" + o] = e[o],
                t.style["-webkit-" + o] = e[o],
                t.style["-o-" + o] = e[o]),
                "fontFamily" == o && e[o].indexOf(" ") > -1 && (e[o] = '"' + e[o] + '"'),
                "box-sizing" == o ? t.style.setProperty(o, e[o], "important") : t.style[o] = e[o])
    }
      , Bglines = function(t, e, o, i) {
        var s = 1 * existv(o, 1)
          , n = 1 * existv(i, 1);
        css(t, {
            background: "repeating-linear-gradient(-45deg," + e + "," + e + " " + s + "px,rgba(0,0,0,0)," + s + "px,rgba(0,0,0,0) " + (s + n) + "px)"
        })
    }
      , CheckColor = function(t) {
        return "#" != t.substr(0, 1) ? t = "#" + t : t
    }
      , controlCSS = function(t, e, i) {
        !e && (e = "#fff"),
        e = CheckColor(e);
        var s = random(1e5, 1e6)
          , n = (t = (t = t.replace(/\(rand\)/g, s)).replace(/\(color\)/g, e)).substr(0, t.indexOf("|||"))
          , a = t.substr(t.indexOf("|||") + 3)
          , r = "";
        o.system.webkit && (r = (r = (r = (r = a.replace(/animation:/g, "-webkit-animation:")).replace(/animation-/g, "-webkit-animation-")).replace(/@keyframes/g, "@-webkit-keyframes")).replace(/transform/g, "-webkit-transform")),
        i.innerHTML = n,
        pushCSS(r + a)
    }
      , indOf = function(t, e) {
        for (var o, i = 0; i < t.length; i++)
            t[i] && t[i].indexOf(e) > -1 && (o = !0);
        return o
    }
      , pushCSS = function(t) {
        o.css && (o.css.styleSheet ? o.css.styleSheet.cssText = t : o.css.appendChild(document.createTextNode(t)))
    }
      , Pos0 = function(t) {
        css(t, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        })
    }
      , Pnt0 = function(t) {
        css(t, {
            pointerEvents: "none"
        })
    }
      , xhr = function(t, e) {
        var o = new XMLHttpRequest;
        o.open("GET", t, !0),
        o.onload = e,
        o.send()
    }
      , Findhdvbplayer = function(t) {
        if (t)
            for (var e = 0; e < 5 && "hdvbplayer" != t.nodeName; e++)
                t.parentElement && (t = t.parentElement);
        return t
    }
      , gif = function(t) {
        var e = document.createElement("img");
        o.gifed.indexOf(t) > -1 ? (o.gifed.push(t),
        t = t.indexOf("?") > 0 ? t + "&" + Math.random() : t + "?" + Math.random()) : o.gifed.push(t),
        e.setAttribute("src", t),
        e.setAttribute("height", "1px"),
        e.setAttribute("width", "1px")
    }
      , attr = function(t, e) {
        for (var o in e)
            e.hasOwnProperty(o) && null != o && void 0 !== e[o] && t.setAttribute(o, e[o])
    }
      , destroy = function(t) {
        if (t)
            try {
                t.parentNode.removeChild(t),
                t = null
            } catch (t) {}
    }
      , random = function(t, e) {
        return Math.floor(arguments.length > 1 ? (e - t + 1) * Math.random() + t : (t + 1) * Math.random())
    }
      , randomstr = function() {
        return Math.random().toString(36).substring(2, 12)
    }
      , removebykey = function(t, e) {
        return t = Object.keys(t).reduce((function(o, i) {
            return i != e && (o[i] = t[i]),
            o
        }
        ), {})
    }
      , trim = function(t) {
        return "string" == typeof t ? t.replace(/^\s+|\s+$/gm, "") : t
    }
      , cut = function(t, e, o) {
        var i = !1;
        if (t && t.indexOf(e) > -1) {
            i = t.substr(t.indexOf(e) + e.length);
            o && i.indexOf(o) > -1 && (i = i.substr(0, i.indexOf(o)))
        }
        return i
    }
      , encode = function(t, e) {
        return 0 == e ? "#0" + salt.e(t) : -1 == e ? salt.e(t) : 1 == e ? "#1" + pepper(salt.e(t), 1) : void 0
    }
      , str2obj = function(x) {
        if ("" != v[x])
            if ("string" != typeof v[x])
                o[x + "o"] = v[x];
            else if (0 == v[x].indexOf("[{"))
                try {
                    v[x] = v[x].replace(/pjs'qt/gi, '"'),
                    o[x + "o"] = eval(v[x])
                } catch (t) {}
    }
      , dechar = function(t) {
        return String.fromCharCode(t)
    }
      , decode = function(t) {
        return "#1" == t.substr(0, 2) ? salt.d(pepper(t.substr(2), -1)) : "#0" == t.substr(0, 2) ? salt.d(t.substr(2)) : t
    }
      , checkBase64 = function(t) {
        return t && -1 == t.indexOf("http") && -1 == t.indexOf(".") && t.length > 100 && -1 == t.indexOf("data:") && (t = "data:image/png;base64," + t),
        t
    }
      , hide = function(t) {
        t && (t.style.visibility = "hidden")
    }
      , show = function(t) {
        t && (t.style.visibility = "visible")
    }
      , hide2 = function(t) {
        t && (t.style.display = "none")
    }
      , show2 = function(t) {
        t && (t.style.display = "block")
    }
      , isVisible = function(t) {
        return !!t && ("hidden" != t.style.visibility && "none" != t.style.display)
    }
      , int = function(t) {
        return "string" == typeof t && t.indexOf("px") > 0 && (t = t.substr(0, t.indexOf("px"))),
        parseInt(t)
    }
      , hidden = function(t) {
        return "none" == t.style.display
    }
      , hexToRgb = function(t) {
        if (t) {
            var e = parseInt(t, 16);
            return (e >> 16 & 255) + "," + (e >> 8 & 255) + "," + (255 & e)
        }
    }
      , MarginPadding = function(t, e, o) {
        if (t[e + "top"] = 0,
        t[e + "right"] = 0,
        t[e + "bottom"] = 0,
        t[e + "left"] = 0,
        exist(t[o])) {
            var i = t[o].split(" ");
            4 == i.length && (t[e + "top"] = i[0] ? parseFloat(i[0]) : 0,
            t[e + "right"] = i[1] ? parseFloat(i[1]) : 0,
            t[e + "bottom"] = i[2] ? parseFloat(i[2]) : 0,
            t[e + "left"] = i[3] ? parseFloat(i[3]) : 0)
        }
        return t
    }
      , MarPad = function(t) {
        return t && (t = t.replace(/ /gi, "px ")),
        t + "px"
    }
      , StringVar = function(t, e) {
        return v[t] && "" != v[t] ? v[t] : e
    }
      , abc = String.fromCharCode(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122)
      , salt = {
        _keyStr: abc + "0123456789+/=",
        e: function(t) {
            var e, o, i, s, n, a, r, l = "", d = 0;
            for (t = salt._ue(t); d < t.length; )
                s = (e = t.charCodeAt(d++)) >> 2,
                n = (3 & e) << 4 | (o = t.charCodeAt(d++)) >> 4,
                a = (15 & o) << 2 | (i = t.charCodeAt(d++)) >> 6,
                r = 63 & i,
                isNaN(o) ? a = r = 64 : isNaN(i) && (r = 64),
                l = l + this._keyStr.charAt(s) + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(r);
            return l
        },
        d: function(t) {
            var e, o, i, s, n, a, r = "", l = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length; )
                i = this._keyStr.indexOf(t.charAt(l++)),
                e = (15 & (s = this._keyStr.indexOf(t.charAt(l++)))) << 4 | (n = this._keyStr.indexOf(t.charAt(l++))) >> 2,
                o = (3 & n) << 6 | (a = this._keyStr.indexOf(t.charAt(l++))),
                r += dechar(i << 2 | s >> 4),
                64 != n && (r += dechar(e)),
                64 != a && (r += dechar(o));
            return r = salt._ud(r)
        },
        _ue: function(t) {
            t = t.replace(/\r\n/g, "\n");
            for (var e = "", o = 0; o < t.length; o++) {
                var i = t.charCodeAt(o);
                i < 128 ? e += dechar(i) : i > 127 && i < 2048 ? (e += dechar(i >> 6 | 192),
                e += dechar(63 & i | 128)) : (e += dechar(i >> 12 | 224),
                e += dechar(i >> 6 & 63 | 128),
                e += dechar(63 & i | 128))
            }
            return e
        },
        _ud: function(t) {
            for (var e = "", o = 0, i = 0, s = 0; o < t.length; )
                (i = t.charCodeAt(o)) < 128 ? (e += dechar(i),
                o++) : i > 191 && i < 224 ? (s = t.charCodeAt(o + 1),
                e += dechar((31 & i) << 6 | 63 & s),
                o += 2) : (s = t.charCodeAt(o + 1),
                c3 = t.charCodeAt(o + 2),
                e += dechar((15 & i) << 12 | (63 & s) << 6 | 63 & c3),
                o += 3);
            return e
        }
    }
      , pepper = function(t, e) {
        t = (t = t.replace(/\+/g, "#")).replace(/#/g, "+");
        var i = sugar(o.y) * e;
        e < 0 && (i += abc.length / 2);
        var s = abc.substr(2 * i) + abc.substr(0, 2 * i);
        return t.replace(/[A-Za-z]/g, (function(t) {
            return s.charAt(abc.indexOf(t))
        }
        ))
    }
      , sugar = function(t) {
        t = t.split(dechar(61));
        var e, o = "", i = dechar(120);
        for (var s in t)
            if (t.hasOwnProperty(s)) {
                var n = "";
                for (var a in t[s])
                    t[s].hasOwnProperty(a) && (n += t[s][a] == i ? dechar(49) : dechar(48));
                e = parseInt(n, 2),
                o += dechar(e.toString(10))
            }
        return o.substr(0, o.length - 1)
    }
      , exist = function(t) {
        return null != t && void 0 !== t && "undefined" != t
    }
      , existv = function(t, e) {
        return exist(t) ? t : e
    }
      , exist2 = function(t) {
        return exist(t) && -1 != t && "" != t
    }
      , copyObject = function(t) {
        return "object" == typeof t && (t = JSON.parse(JSON.stringify(t))),
        t
    }
      , findLeft = function(t) {
        return t.getBoundingClientRect().left + (window.scrollX ? window.scrollX : window.pageXOffset)
    }
      , checkFont = function(t) {
        return 1 == v.globalfont && exist2(v.globalfontname) && (t = v.globalfontname),
        t
    }
      , findTop = function(t) {
        return t.getBoundingClientRect().top + window.scrollY
    }
      , redirect = function(t) {
        "" != t && (1 == v.redirectblank ? window.open(t) : window.location.href = t,
        t = "")
    }
      , reRightMenu = function() {
        1 == v.rightmenu && (o.rightmenu && o.frame.removeChild(o.rightmenu),
        o.rightmenu = null)
    }
      , Actions = function() {
        var _fullscreen_end = !1, volumewheelin;
        function Prefile(t) {
            return exist(v.prefile) && -1 == t.indexOf("//") && (t = v.prefile + t),
            t
        }
        function Thumbs() {
            1 == v.thumbs && "undefined" != typeof PluginThumbs && (o.th = new PluginThumbs)
        }
        function onPlay(t) {
            o.onplay = !0,
            o.controls && o.controls.SettingsVisible() && o.controls.Settings(),
            o.droplist && o.droplist.Close(),
            !t && o.media.Play(),
            o.checknative || setTimeout((function() {
                o.media.NativeControls()
            }
            ), 500),
            !o.play && o.controls.Play(),
            1 == v.effects && o.effects.api("play"),
            1 == v.vast && o.actions.VastRecover("pauseroll"),
            o.system.mobile && o.controls.HideInterval(),
            exist(o.share) && o.share.isOpen() && o.share.Hide(),
            1 == v.heartbeats && exist(v.heartbeat) && o.dt && ("" == v.heartbeat || exist(o.heartbeatInterval) || (o.heartbeatInterval = setInterval(Heartbeat, 1e3 * v.heartbeatinterval),
            Heartbeat()))
        }
        function StartTimeout() {
            o.starttimeout = !1,
            o.controls.refresh()
        }
        function Quartile(t) {
            o.quartile[t] = !0,
            1 == v.timestore && 1 == v.playedstore && v.playedquartile == t && o.storage && o.plid && o.continue && o.continue.writePl(o.plid)
        }
        function gaTrackPlay(t, e, i, s) {
            exist(o.gatracked[e]) || i > s && gaTracker(t, e, 1)
        }
        function NativeEnterFs() {
            var t = o.media.tag();
            t && (o.nativefull = !0,
            o.media.nativeSubtitle(),
            t.webkitEnterFullScreen(),
            t.addEventListener("webkitendfullscreen", iosExitFullscreen))
        }
        function NativeExitFs() {
            var t = o.media.tag();
            t && t.webkitExitFullscreen()
        }
        function PostFullscreen() {
            1 != o.fs_error && (o.ispipkit && o.media.PipWebkit(),
            1 == v.hotkey.volumewheelfull && (VolumeWheelX(!0),
            o.volumewheel = !0),
            1 == v.effects && o.effects.api("full"),
            js("fullscreen"),
            gaTracker("full", "Fullscreen", 1))
        }
        o.system.tv && log("tv"),
        this.Title = function(t) {
            o.controls && o.controls.title(t)
        }
        ,
        this.File = function(t) {
            if (!t)
                return t;
            if ("string" == typeof t && 0 == (t = t.replace(/(\r\n|\n|\r)/gm, "")).indexOf("[{"))
                try {
                    t = t.replace(/pjs'qt/gi, '"'),
                    t = JSON.parse(t)
                } catch (e) {
                    t = "incorrect JSON"
                }
            if ("object" == typeof t && (o.playlist_dic = [],
            o.playlist_source = copyObject(t),
            o.playlist = IndexPlaylist(t),
            o.playlist.length > 0)) {
                if (1 == v.playlist.openlast && !v.plstart) {
                    var e = Object.keys(o.playlist_dic).slice(-1)[0];
                    e && (v.plstart = e)
                }
                var i = FindFileInPlaylist();
                if (i) {
                    t = i.file,
                    o.titlestore = i.title,
                    o.controls && o.controls.titlepl(i.title),
                    exist(i.poster) && (o.media ? o.media.Poster(i.poster) : v.poster = i.poster),
                    exist(i.sub) && (i.subtitle = i.sub),
                    exist(i.start) && (v.start = o.seekto = i.start),
                    SettingsTimers("offset"),
                    exist(i.id) && (o.plid = i.id);
                    var s = ["subtitle", "vars", "embed", "url", "url2", "url3", "heartbeat", "thumbnails", "label", "download", "points", "remove", "end", "delete", "title2", "skip"];
                    exist(v.control_title) && 1 == v.control_title.showfrom1file && 1 == v.control_title.showtitleplaylist && (s.push("title"),
                    s.push("t1"),
                    s.push("t2"),
                    s.push("t3"),
                    s.push("t4"),
                    s.push("t5"));
                    for (var n = 0; n < s.length; n++)
                        exist(i[s[n]]) && (v[s[n]] = i[s[n]]);
                    s.indexOf("title") > 0 && (1 == v.control_title.templated && (o.title_template = v.control_title.template,
                    o.actions.TitleTemplate(i)),
                    o.actions.Title("title")),
                    o.controls && o.controls.UpdatePlaylist(o.playlist),
                    o.droplist && o.droplist.Update()
                }
            }
            if ("string" == typeof t) {
                if (0 == (t = fjs(t)).indexOf("#" + v.enc2) && (t = o[o.fd[0]](t)),
                t && (0 == t.indexOf("#" + v.enc3) && t.indexOf(v.file3_separator) > 0 && (t = o[o.fd[1]](t)),
                0 == t.indexOf("#0") && (t = fd0(t)),
                t = fjs(t)),
                1 == v.fplace && (t = fplace(t)),
                "" == t && (log("empty file"),
                o.media_error = !0,
                js("error", "empty")),
                o.files_quality = [],
                o.files_quality_ag = [],
                o.files_audiotrack = [],
                o.current_file = 0,
                o.current_quality = 0,
                o.current_audiotrack = 0,
                "" == v.file_separator && (v.file_separator = ","),
                t.indexOf("]") > -1 && t.indexOf("[") > -1 || exist(v.qualities) ? o.files = t.split(v.file_separator) : o.files = [t],
                o.audiotracks = [],
                exist(v.qualities))
                    var a = v.qualities.split(v.file_separator);
                if (o.files.length > 0) {
                    var r = -1;
                    for (n = 0; n < o.files.length; n++)
                        if (o.files[n] = trim(o.files[n]),
                        "" != o.files[n]) {
                            0 == o.files[n].indexOf("[") && o.files[n].indexOf("]") > 1 ? (o.files_quality[n] = o.files[n].substr(o.files[n].indexOf("[") + 1, o.files[n].indexOf("]") - 1),
                            o.files[n] = o.files[n].substr(o.files[n].indexOf("]") + 1)) : exist(v.qualities) ? o.files_quality[n] = exist(a[n]) ? a[n] : "" : o.files_quality[n] = n + 1;
                            var l = 0;
                            exist(v.default_quality) && -1 == r && (0 == String(v.default_quality).indexOf("num:") && 1 * v.default_quality.substr(4) == n && (l = 1),
                            v.default_quality == o.files_quality[n] && (l = 1),
                            "max" == v.default_quality && n == o.files.length - 1 && (l = 1)),
                            exist(o.default_quality) && o.default_quality == o.files_quality[n] && (l = 1,
                            r = n),
                            1 == l && (o.current_file = n,
                            o.current_quality = n),
                            o.files[n] = Prefile(o.files[n])
                        }
                } else
                    o.files[0] = Prefile(o.files[0]);
                return o.files[o.current_file]
            }
        }
        ,
        this.InvertPlaylist = function() {
            if (o.playlist) {
                for (var t = o.playlist.reverse(), e = 0; e < t.length; e++)
                    t[e].pjs_i = e;
                o.playlist = t,
                o.controls.UpdatePlaylist(o.playlist)
            }
        }
        ,
        this.UpdatePlaylist = function(t) {
            "object" == typeof t && (o.playlist_dic = [],
            o.playlist_source = copyObject(t),
            o.playlist = IndexPlaylist(t),
            o.controls && o.controls.UpdatePlaylist(o.playlist))
        }
        ,
        this.sendStat = !1,
        this.NewFile = function(t, e, i, s) {
            this.sendStat = !1,
            !exist(e) && (v.autoplay = 1),
            !exist(i) && (v.preload = 0),
            v.duration = void 0,
            v.end = void 0,
            v.delete = void 0,
            2 != o.media_error && (o.media_error = !1),
            o.metadata = !1,
            o.pipwebkit = !1,
            o.reloadTimer = 0,
            o.gatracked = [],
            o.checknative = !1,
            o.gained = !1,
            o.dvr = !1,
            o.bitrate = void 0,
            o.quartile = [!1, !1, !1],
            o.sess = randomstr(),
            o.sesstime = 0,
            o.pld && (o.pld = []),
            "pjs" != o.file_type && o.sbt && o.sbt.remove(),
            o.err404v && o.err404v.remove(),
            "playing" == o.media.status() && this.Stop(),
            o.cut && o.cutted && o.controls.Cut(),
            exist(o.share) && o.share.Remove(),
            exist(o.reloadto) && clearTimeout(o.reloadto),
            js("new"),
            1 == v.vast && 1 != s && (o.actions.VastRecover(),
            o.actions.VastRecover("midroll")),
            t = this.File(t),
            1 == e && (o.file_type = ""),
            o.media.File(t),
            !o.system.mobile && !o.system.safari || exist(e) || o.actions.Play(),
            exist(o.custom_aspect) && (o.mediascale = {
                x: 1,
                y: 1,
                x0: 1,
                y0: 1
            },
            o.media.normalscale()),
            gaTracker("play", "Play"),
            o.media.NativeControls(),
            o.controls.QualityChangedNoHand(),
            o.controls.AudioTrackChangedNoHand(),
            o.controls.refresh(),
            o.mediatags && o.mediatags.read()
        }
        ,
        this.TitleTemplate = function(t) {
            var e = !1;
            if (t && o.title_template) {
                v.title = o.title_template;
                for (var i = 1; i < 6; i++)
                    exist(t["t" + i]) && (v.title = v.title.replace("{" + i + "}", t["t" + i]),
                    e = !0)
            }
            return e
        }
        ,
        this.MediaReady = function() {
            1 == v.autoplay && (1 == v.observer ? setTimeout((function() {
                o.actions.Play()
            }
            ), 500) : this.Play(),
            v.autoplayed = 1),
            Thumbs()
        }
        ,
        this.Thumbs = function() {
            Thumbs()
        }
        ,
        this.NativeControls = function() {
            var t = !1;
            return o.system.mobile && (t = !0,
            1 == v.nativenotiphone && o.system.iphone && (t = !1),
            1 == v.nativenotipad && o.system.ipad && (t = !1),
            1 == v.nativenotios && o.system.ios && (t = !1),
            1 == v.nativenotandroid && o.system.android && (t = !1)),
            1 == v.nativeontv && o.system.tv && (t = !0),
            t
        }
        ,
        this.Metadata = function() {
            o.media.Volume(v.volume),
            o.muted && o.media.Mute(),
            o.metadata = !0,
            o.controls && o.controls.refresh(),
            o.play || o.start || 1 == v.effects && o.effects.api("pause"),
            o.casting && o.tagvideo && (o.chromecast.Exit(),
            o.chromecast.Go()),
            1 == v.vast && 1 != v.nomidroll && 1 == v.midrolls && !exist(o.vast) && MidrollOverlay("midroll", "metadata")
        }
        ,
        this.onPlayTag = function() {
            !o.onplay && onPlay(!0)
        }
        ,
        this.Play = function(t) {
            if (!o.play && o.media) {
                o.actplay = !0;
                var e = !1;
                if ("youtube" == o.file_type && (o.media.YoutubeReady() || 1 == v.autoplay || 1 != v.preload || (e = !0,
                window.YT && (v.autoplay = 1,
                o.media.onYoutubeReady()))),
                1 == v.pass && 0 == v.passontime && (o.actions.Password(),
                e = !0),
                o.media_error || e)
                    o.media_error && Advertising("preroll") && datetime(2);
                else {
                    if (o.newfile = !1,
                    StopOtherPlayer(!o.start),
                    o.alert.close(),
                    o.start)
                        gaTracker("resume", "Resume");
                    else {
                        js("start"),
                        o.start = !0,
                        1 == v.toolbar.hideuntilstarted && setTimeout((function() {
                            o.controls.resizetext()
                        }
                        ), 100),
                        v.toolbar.hideleavetimeout > 0 && 1 == v.autoplay && (o.starttimeout = !0,
                        setTimeout(StartTimeout, 1e3 * v.toolbar.hideleavetimeout)),
                        1 == v.water && v.wid && PluginWater();
                        for (var i = 0; i < o.vsts.length; i++)
                            1 == v["vast_nofirst" + o.vsts[i]] && localStorage.setItem("pljsfirst" + o.vsts[i], Date.now());
                        1 == v.pjsstat && v.pjsstatid && PluginStat("start"),
                        js("new"),
                        o.controls.refresh(),
                        gaTracker("play", "Play"),
                        o.ab && gaTracker("adblock", "AdBlock", 1)
                    }
                    if (1 == v.fullonplay && !o.fullscreen)
                        (new Date).getTime() - o.clicktime < 300 && (1 == v.fullonplaymobile ? o.system.mobile && this.Fullscreen() : this.Fullscreen());
                    if (o.subtitle_on && 1 == v.subpausehide && show2(o.subtitle),
                    o.err404v && o.err404v.remove(),
                    1 != t && Advertising("preroll") || Advertising("intro") || Advertising("pausebannerinit") || Advertising("endtaginit") || Advertising("starttaginit"))
                        datetime(2);
                    else if (1 == v.redirect && exist(v.redirectonplay) && !exist(options.redirect) && (redirect(v.redirectonplay),
                    e = !0),
                    !e) {
                        log("Play"),
                        "pdf" != o.file_type && o.media.duration() > 0 && o.controls.Duration(o.media.time(), o.media.duration()),
                        o.start2 || (o.start2 = !0,
                        v.toolbar.hideleavetimeout > 0 && 1 == v.autoplay && (o.starttimeout = !0,
                        setTimeout(StartTimeout, 1e3 * v.toolbar.hideleavetimeout))),
                        o.media.time() > 1 && !exist(o.banner) && 1 == v.pausebannerinit && 1 == v.pausebannerstatus && Advertising("pausebannerhide");
                        var s = !1;
                        o.media.time() > 1 && 1 == v.pauserollonplay && 1 != t && !isVastBgLoad() && !exist(o.vast) && !exist(o.vastloader) && (s = Advertising("pauseroll")),
                        s ? isVastBgLoad() && onPlay(!1) : onPlay(!1)
                    }
                }
            } else
                o.media && o.media.Play()
        }
        ,
        this.Pause = function() {
            o.play && (o.actplay = !1,
            log("Pause"),
            o.media.Pause(),
            o.controls.Pause(),
            js("pause"),
            v.posteronpause && ShowPoster(),
            1 == v.posterhidepause && HidePoster2(),
            1 == v.effects && o.effects.api("pause"),
            o.subtitle_on && 1 == v.subpausehide && hide2(o.subtitle),
            o.media.time() > 1 && !exist(o.banner) && 1 == v.pausebannerinit && 0 == v.pausebannerstatus && Advertising("pausebannershow"),
            exist(o.vast) || exist(o.vastloader) || 0 != v.pauserollonplay || Advertising("pauseroll"),
            o.onplay = !1)
        }
        ,
        this.Mute = function() {
            o.media.Mute(),
            o.controls.Mute(),
            o.muted = !0,
            js("mute")
        }
        ,
        this.Unmute = function() {
            o.media.Unmute(),
            o.muted = !1,
            o.controls.Unmute(),
            o.media.Volume(v.volume),
            js("unmute")
        }
        ,
        this.Volume = function(t, e) {
            t < .01 && (t = 0),
            t > 1 && (t = 1),
            t <= 0 ? (this.Mute(),
            v.volume = 0,
            t = 0) : (o.muted && this.Unmute(),
            v.volume = t),
            js("volume", t),
            o.controls.Volume(t, e),
            o.media.Volume(t)
        }
        ,
        this.Waiting = function() {
            o.controls.Waiting()
        }
        ,
        this.StopWaiting = function() {
            o.controls && o.controls.StopWaiting()
        }
        ,
        this.Progress = function() {
            this.StopWaiting()
        }
        ,
        this.Seeked = function() {
            o.actions.UpdatePlay(),
            this.StopWaiting()
        }
        ,
        this.Duration = function(t, e) {
            if (o.continue && !o.start) {
                var i = o.continue.flag();
                i.t && i.d && (t = i.t)
            }
            o.controls && o.controls.Duration(t, e)
        }
        ,
        this.LoadedData = function(t, e) {
            exist(o.seekto) && "youtube" != o.file_type && !o.media.isLive() && (o.actions.Seek(o.seekto, !1),
            o.seekto = void 0)
        }
        ,
        this.ScreenClick = function() {
            var t = new Date;
            o.clicktime = t.getTime();
            var e = !1;
            o.controls.SettingsVisible() && 1 != v.settings.always && (o.controls.Settings(),
            e = !0),
            o.droplist && o.droplist.Visible() && (o.droplist.Close(),
            e = !0),
            0 == v.playlist.always && o.controls.PlaylistVisible() && 1 == v.playlist.autohide && (o.controls.Playlist(),
            e = !0),
            1 == v.redirect && exist(v.redirectonclick) && !exist(options.redirect) && (redirect(v.redirectonclick),
            e = !0),
            e || (1 == v.hotkey.on && 1 == v.hotkey.icons && 1 == v.hotkey.playiconbut && PluginHotIcon("play", o.play ? 0 : 1),
            this.Toggle())
        }
        ,
        this.ControlsBgClick = function() {
            o.controls.SettingsVisible() && o.controls.Settings()
        }
        ,
        this.Toggle = function() {
            "playing" == o.media.status() ? this.Pause() : this.Play(),
            Sub()
        }
        ,
        this.Seek = function(t, e) {
            if (t < o.media.duration()) {
                if (1 == v.control_line.dontseekforward && t > o.media.time())
                    return;
                v.delete > 0 && t < v.delete && (t = v.delete),
                o.seeked_time = t,
                o.media.Seek(t),
                e && o.controls.Seek(t, o.media.duration()),
                o.seeking = !0,
                o.seeking_time = o.media.time(),
                Sub(o.seeking_time)
            }
        }
        ,
        this.Open = function(t, e, i) {
            "playing" == o.media.status() && "audio" != o.mode && (Pause(),
            o.fullscreen && i && o.actions.Normalscreen()),
            window.open(t, e)
        }
        ,
        this.Download = function() {
            var t = o.media.currentFile();
            (exist(v.download) && (t = v.download),
            "" != t) && (js("download"),
            window.open(t, 1 == v.downself ? "_self" : "_blank").focus())
        }
        ,
        this.UpdatePlay = function() {
            var t = o.media.time()
              , e = o.media.duration();
            o.controls.Played(t, e)
        }
        ,
        this.Playing = function() {
            var t = o.media.time()
              , e = o.media.duration()
              , i = e > 0 ? t / e : 0;
            o.seeking ? t != o.seeking_time && (o.seeking = !1) : o.controls && o.controls.Played(o.seekto > 0 ? o.seekto : t, e),
            (1 == v.ga || 1 == v.yamtr) && e > 0 && (gaTrackPlay("play25", "Play 25%", i, .25),
            gaTrackPlay("play50", "Play 50%", i, .5),
            gaTrackPlay("play75", "Play 75%", i, .75));
            for (var s = 0; s < 3; s++)
                o.quartile[s] || i >= .25 * s + .25 && Quartile(s);
            if (1 == v.reloadlog && log(1, t, e),
            1 == v.reload && o.play) {
                var n = !1
                  , a = !1;
                if (1 == v.reloadlive && (o.media.isLive() || (n = !0)),
                t > 0)
                    t != o.time || n ? o.reloadTimer = 0 : a = !0,
                    o.time = t;
                else if (1 == v.reloadstart) {
                    var r = o.media.loaded();
                    1 == v.reloadlog && log(2, r, o.timeld),
                    n || (r == o.timeld ? a = !0 : o.reloadTimer = 0),
                    o.timeld = r
                }
                a && (o.reloadTimer++,
                1 == v.reloadlog && log(3, o.reloadTimer),
                o.reloadTimer == v.reloadtimeout * (1e3 / o.timerTime) && o.actions.Reload())
            }
            if (v.apiprm && 1 == v.apiprm.pld && e > 0 && (!o.pld && (o.pld = []),
            o.pld[Math.round(t)] = 1),
            1 == v.vast && (1 != v.nomidroll && 1 == v.midrolls && !exist(o.vast) && MidrollOverlay("midroll", t, e),
            1 != v.nooverlay && 1 == v.overlays && !exist(o.vast) && MidrollOverlay("overlay", t, e)),
            1 == v.intros && v.introstart > 0 && t >= v.introstart && (exist(o.vast) || (Advertising("intro") && (o.media.Pause(),
            o.controls.Pause()),
            v.introstart = 0)),
            Advertising("pushbanner"),
            Advertising("pausebannerhide"),
            this.sendStat,
            1 == v.endtaginit && 0 == v.endtagstatus && o.media.time() > 0 && Advertising("endtagtoggle"),
            1 == v.starttaginit && 0 == v.starttagstatus && o.media.time() > 0 && Advertising("starttagtoggle"),
            SettingsTimers("play"),
            1 == v.pass && v.passontime > -1 && PasswordTime(t, e),
            o.subtitle_on && Sub(t),
            o.storage && 1 == v.timestore && o.continue && o.continue.write(t, e),
            o.cutted && o.cut && o.cut.play(t),
            exist(v.end) && v.end > 0 && t > v.end && ("youtube" == o.file_type ? (o.media.Pause(),
            o.media.Seek(v.start > 0 ? v.start : 0)) : (o.media.Recover(),
            o.actions.Stop()),
            v.start > 0 && (o.seekto = v.start),
            o.actions.Ended()),
            exist(v.remove)) {
                var l = v.remove.split(",");
                for (s = 0; s < l.length; s++) {
                    var d = l[s].split("-");
                    2 == d.length && t > d[0] && t < d[1] && o.media.Seek(d[1])
                }
            }
        }
        ,
        this.Reload = function() {
            if (o.reloadTimer = 0,
            exist(o.reloadto) && clearTimeout(o.reloadto),
            1 == v.reloadjustevent)
                js("reload");
            else {
                !(o.seekto > 0 || o.media.isLive()) && (o.seekto = o.media.time() + (v.reloadplus > 0 ? 1 : 0));
                var t = o.controls.PlaylistVisible();
                js("reload"),
                o.media.reload(),
                t && 1 == v.playlist.autohide && o.controls.PlaylistShow()
            }
        }
        ,
        this.Stopped = function() {
            o.controls.Played(0, 0),
            o.controls.Loaded(0, 0),
            o.actions.Duration(0, 0),
            o.controls.StopWaiting()
        }
        ,
        this.Loading = function() {
            if (o.media) {
                var t = o.media.loaded();
                1 == v.pjsiframed && js("loaded", t);
                var e = o.media.duration()
            }
            o.controls && o.controls.Loaded(t, e)
        }
        ,
        this.Ended = function() {
            js("fileend"),
            1 == v.loop ? ("youtube" == o.file_type && this.Stop(),
            1 == v.vast && o.actions.VastRecover("preroll"),
            v.start > 0 && o.actions.Seek(v.start),
            this.Play()) : (o.media.isLive() || "youtube" == o.file_type ? this.Stop() : 1 == v.finishrewind && (o.actions.Seek(v.start > 0 ? v.start : 0, !0),
            o.system.ie && o.media.Pause()),
            o.controls.onEnded(),
            1 == v.intros && (v.outros = 1),
            Advertising("postroll") || Advertising("outro") || End())
        }
        ,
        this.Fullscreen = function() {
            var t = !1
              , e = !1;
            for (var i in o.fs_error = !1,
            o.fullscreen_process = !0,
            setTimeout((function() {
                o.fullscreen_process = !1
            }
            ), 3e3),
            o.motions)
                if (o.motions.hasOwnProperty(i) && exist(o.motions[i]))
                    try {
                        o.motions[i].TheEnd2()
                    } catch (t) {}
            try {
                if (o.fullscreen_start = !0,
                (o.system.ios && 1 == v.nativefullios || o.system.android && 1 == v.nativefulldroid) && o.tagvideo && !o.nativecontrols)
                    (i = o.media.tag()) && i.webkitSupportsFullscreen && (NativeEnterFs(),
                    t = !0);
                if (!t) {
                    var s, n = o.frame;
                    if (("dm" == o.file_type || "vimeo" == o.file_type) && o.system.iphone && 1 == v.nativefullios)
                        return void o.media.iosfull();
                    n.requestFullscreen ? (o.realfullscreen = !0,
                    void 0 !== (s = n.requestFullscreen({
                        navigationUI: "hide"
                    })) && s.then((function() {}
                    )).catch((function(t) {}
                    ))) : n.requestFullScreen ? (n.requestFullScreen({
                        navigationUI: "hide"
                    }),
                    o.realfullscreen = !0) : o.frame.mozRequestFullScreen ? (n.mozRequestFullScreen({
                        navigationUI: "hide"
                    }),
                    o.realfullscreen = !0) : n.webkitRequestFullScreen ? (n.webkitRequestFullScreen({
                        navigationUI: "hide"
                    }),
                    o.realfullscreen = !0) : n.msRequestFullscreen && (n.msRequestFullscreen(),
                    o.realfullscreen = !0)
                }
            } catch (t) {
                e = !0,
                log(t)
            }
            o.realfullscreen || t || (o.system.webkit && o.iniframe ? NativeEnterFs() : this.FullscreenUI()),
            e || setTimeout(PostFullscreen, 200)
        }
        ,
        this.NativeExitFs = function() {
            NativeExitFs()
        }
        ;
        var lastwheel = {
            x: 0,
            y: 0
        }, vast_and, vast_or, vast_type, vasturl;
        function VolumeWheel(t) {
            if (!(o.droplist && o.droplist.OpenScroll() || 0 == t.wheelDelta))
                if (1 == v.hotkey.scrollwheelfull && o.fullscreen || (o.hidden_volume_over = !0,
                clearInterval(volumewheelin),
                volumewheelin = setInterval((function() {
                    o.hidden_volume_over = !1,
                    o.controls.resize(),
                    lastwheel = {
                        x: 0,
                        y: 0
                    },
                    clearInterval(volumewheelin)
                }
                ), 2e3),
                o.controls.resize()),
                0 != t.deltaX ? lastwheel.x++ : lastwheel.x--,
                0 != t.deltaY ? lastwheel.y++ : lastwheel.y--,
                lastwheel.x > lastwheel.y)
                    t.deltaX > 0 ? o.actions.Volume(parseFloat(v.volume) - v.hotkey.wheelstep / 10, "no") : o.actions.Volume(parseFloat(v.volume) + v.hotkey.wheelstep / 10, "no");
                else {
                    var e = o.system.win ? -v.hotkey.wheelstep / 10 : v.hotkey.wheelstep / 10;
                    1 == v.hotkey.scrollwheelfull && o.fullscreen ? o.media.scale(t.deltaY > 0 ? e : -e) : (o.actions.Volume(parseFloat(v.volume) + (t.deltaY > 0 ? e : -e), "no"),
                    o.controls.volumescroll())
                }
        }
        function iosExitFullscreen() {
            o.system.ios && (o.media.removeNativeSubtitle(),
            js("exitfullscreen")),
            o.nativefull = !1
        }
        function NewAspect(t, e) {
            if (exist(o.vast) && !e)
                o.resizeonplay = t;
            else {
                var i = !1
                  , s = o.container_w / t;
                if (exist(o.parentIframe) && 1 != v.notframe)
                    try {
                        css(o.parentIframe, {
                            height: s
                        })
                    } catch (t) {
                        i = !0,
                        log("iframe crossdomain issue")
                    }
                i || (o.aspect = t,
                o.container_h = s,
                o.aspect > 0 && css(o.container, {
                    height: s
                }),
                js("height", s)),
                o.vast && !o.fullscreen && (o.screen_h = s,
                o.vast.Resize())
            }
        }
        function VolumeWheelX(t) {
            lastwheel = {
                x: 0,
                y: 0
            },
            t ? window.addEventListener("wheel", VolumeWheel) : (clearInterval(volumewheelin),
            window.removeEventListener("wheel", VolumeWheel))
        }
        function Sub(t) {
            o.sbt && o.sbt.show(exist(t) ? t : o.media.time())
        }
        function Advertising(t) {
            if (1 == v.banner && t.indexOf("pausebanner") > -1 && void 0 !== PauseBannerPlugin && (t.indexOf("init") > -1 ? v.pausebannerinit = 1 : t.indexOf("show") > -1 ? v.pausebannerstatus = 1 : t.indexOf("hide") > -1 && (v.pausebannerstatus = 0),
            PauseBannerPlugin(t)),
            "pushbanner"in o.u && "status"in o.u.pushbanner && !0 === o.u.pushbanner.status && "pushbanner" == t && PushBannerPlugin(t),
            1 == o.u.etag && t.indexOf("endtag") > -1 && void 0 !== EndTagBannerPlugin && ("endtaginit" == t && 0 == v.endtaginit || "endtagtoggle" == t) && EndTagBannerPlugin(t),
            1 == o.u.stag && t.indexOf("starttag") > -1 && void 0 !== EndTagBannerPlugin && ("starttaginit" == t && 0 == v.starttaginit || "starttagtoggle" == t) && StartTagBannerPlugin(t),
            v["vast_" + t + "timebreak"] > 0 && o.storage) {
                var e = localStorage.getItem("pljs" + t + "_" + o.d);
                if (e) {
                    var i = new Date;
                    if (o.clicktime = i.getTime(),
                    (i.getTime() - e) / 36e5 < v["vast_" + t + "timebreak"])
                        return !1
                }
            }
            if (v["vast_" + t + "timelimit"] > 0 && o.media.duration() > 0 && o.media.duration() < 60 * v["vast_" + t + "timelimit"]) {
                if (!(v["vast_" + t + "timelimited"] > 0))
                    return !1;
                v["vast_" + t + "_andlimit"] = v["vast_" + t + "timelimited"]
            }
            if (-1 == o.compilations.indexOf("VAST") || 1 != v.vast || o.noads || 1 != v[t + "s"])
                return !1;
            if (void 0 === VastVideo)
                return !1;
            if (("intro" == t || "outro" == t) && "undefined" != typeof PluginIntro)
                return vasturl = [],
                PluginIntro(t);
            if (exist(o.vast) || exist(o.vastloader))
                return !isVisible(o.vastcontainer) || isVastBgLoad(o.vasttype) ? (log("ad bg"),
                !1) : (log("ad now"),
                !0);
            if (exist(v[t])) {
                if (v[t].toString().indexOf(".") > -1 || v[t].toString().indexOf(":") > -1 || v[t].toString().indexOf("[yandex]") > -1) {
                    js("vast_init", t),
                    isVastBgLoad(t) || "overlay" == t || (setTimeout((function() {
                        !(o.play || null == o.vastloader && null == o.vast) && o.actions.Waiting()
                    }
                    ), 10),
                    Curtain()),
                    PauseBannerPlugin("pausebannerhide"),
                    vast_and = 0,
                    vast_or = 0,
                    vast_type = t,
                    vasturl = v[t].split(" and "),
                    o.vast_loaders = [],
                    o.adsinchain = vasturl.length,
                    VastAndLimit(),
                    o.adscounter = 1,
                    o.adsfirst = !0;
                    for (var s = 0; s < vasturl.length; s++)
                        vasturl[s] = vasturl[s].split(" or ");
                    v[t.concat("_", "recover")] = v[t],
                    "preroll" == t && (v[`${t}t`] = v[t]),
                    v[t] = null,
                    o.vasttype = t,
                    "overlay" != t && (o.vast = new VastVideo),
                    o.vastloader = new VastLoader;
                    for (s = 0; s < vasturl.length; s++)
                        for (var n = 0; n < vasturl[s].length; n++) {
                            if ((l = trim(vasturl[s][n])).indexOf("[50%]") > 0) {
                                var a = random(1, 2);
                                vasturl[s][n] = vasturl[s][n].replace("[50%]", ""),
                                2 == a && (vasturl[s][n] = "")
                            }
                        }
                    if (1 == v.vast_preload)
                        for (s = 0; s < vasturl.length; s++) {
                            var r = 0 == s ? 1 : 0;
                            if (vasturl[s].length > r)
                                for (n = r; n < vasturl[s].length; n++) {
                                    var l = trim(vasturl[s][n]);
                                    o.system.ie9 ? VastAddPreload(l) : setTimeout(VastAddPreload, 100 * s, l)
                                }
                        }
                    return "" == vasturl[0][0] ? VastNext() : o.vastloader.Load(trim(vasturl[0][0]), t),
                    !0
                }
                return !1
            }
            return !1
        }
        function MidrollOverlay(t, e, i) {
            if (exist(o[t + "o"]) && 1 == v[t + "s"])
                for (var s in o[t + "o"])
                    if (o[t + "o"].hasOwnProperty(s) && !exist(o[t + "o"][s].worked) && exist(o[t + "o"][s].time) && exist(o[t + "o"][s].vast)) {
                        var n = o[t + "o"][s].time.toString()
                          , a = !1;
                        if (n && ("metadata" == e ? n == e && (a = !0) : e >= (n = n.indexOf("%") > 0 ? i > 0 ? parseInt(n.substr(0, n.indexOf("%"))) * i / 100 : -1 : parseInt(n)) && (v["vast_" + t + "rest"] > 0 && n > -1 && e - n >= v["vast_" + t + "rest"] && (n = -1),
                        n > -1 && (a = !0)),
                        o[t + "o"][s].minduration && o.media.duration() > 0 && o.media.duration() < 1 * o[t + "o"][s].minduration && (o[t + "o"][s].worked = !0,
                        a = !1),
                        a && (o[t + "o"][s].vast,
                        v[t] = o[t + "o"][s].vast,
                        o[t + "crtm"] = o[t + "o"][s].time,
                        o[t + "skipimprsd"] = o[t + "o"][s].skipimpessed,
                        Advertising(t)))) {
                            o[t + "o"][s].worked = !0;
                            break
                        }
                    }
        }
        function VastBgLoad() {
            isVastBgLoad() && (0 != o.vast_impressions && 1 != v["vast_" + o.vasttype + "bgload2"] || (css(o.vastcontainer, {
                opacity: 0,
                visibility: "hidden",
                top: 2e3
            }),
            log(o.vasttype + " hide")))
        }
        function isVastBgLoad(t) {
            for (var e = !1, i = ["midroll", "pauseroll"], s = 0; s < i.length; s++)
                o.vasttype != i[s] && t != i[s] || 1 == v["vast_" + i[s] + "bgload"] && (e = !0);
            return e
        }
        function VastVisible() {
            isVastBgLoad() && (o.play && (o.media.Pause(),
            o.controls.Pause()),
            log(o.vasttype + " show"),
            css(o.vastcontainer, {
                opacity: 1,
                visibility: "visible",
                top: 0
            }),
            o.vastfrombg = 1),
            o.nativefull && !o.realfullscreen ? NativeExitFs() : 1 == v["vast_" + o.vasttype + "normal"] && o.fullscreen && o.actions.Normalscreen()
        }
        function VastGo(t) {
            o.vast.Go(t)
        }
        function VastLongTimeout() {
            exist(o.vast) && o.vast.active() && 0 == o.vast_impressions && (o.vast.RemoveForNextAd(),
            log("VAST timeout " + v.vast_longtimeout),
            vasturl = [],
            VastRemoveAndPlay())
        }
        function VastCheckNext() {
            var t = VastAndLimit();
            log("VAST next " + !t),
            t ? VastRemoveAndPlay() : VastNext()
        }
        function VastAndLimit() {
            var t = !1;
            if (o.vasttype) {
                var e = v["vast_" + o.vasttype + "_andlimit"]
                  , i = v["vast_" + o.vasttype + "_and2limit"];
                (i || e) && (i > 0 && o.vast_starts > 0 ? (o.adsinchain = i,
                o.vast_impressions >= i && (t = !0)) : e > 0 && (o.adsinchain = e,
                o.vast_impressions >= e && (t = !0)))
            }
            return t
        }
        function VastNext() {
            if (vasturl.length > 0 && vasturl[vast_and])
                if (vast_or < vasturl[vast_and].length - 1) {
                    log("VAST Next"),
                    o.vast && o.vast.RemoveForNextAd(),
                    VastBgLoad(),
                    vast_or++;
                    var t = trim(vasturl[vast_and][vast_or])
                      , e = VastPreloaded(t);
                    "skip" == e && (o.vastloader = new VastLoader,
                    o.vastloader.Load(t, o.vasttype)),
                    "error" == e && VastNext()
                } else
                    VastRemoveAndPlay();
            else
                VastRemoveAndPlay()
        }
        function VastPreloaded(t) {
            var e = "skip";
            if (1 == v.vast_preload && o.vast_loaders)
                for (var i = !1, s = 0, n = 0; n < o.vast_loaders.length; n++)
                    if (0 == o.vast_loaders[n].done) {
                        if (o.vast_loaders[n].ldr.preloaded(t)) {
                            o.vast_loaders[n].done = 1;
                            var a = o.vast_loaders[n].ldr.Status();
                            "ready" == a ? (o.vastloader = o.vast_loaders[n].ldr,
                            log("VAST preloaded"),
                            o.vast_loaders[n].ldr.Ready(),
                            e = a) : ("" == a && (e = "ok",
                            log("VAST preloading"),
                            o.vastloader = o.vast_loaders[n].ldr,
                            o.vast_loaders[n].ldr.disablePreload()),
                            "error" == a && (e = "error")),
                            i = !0
                        }
                        if (i && 0 == o.vast_loaders[n].load) {
                            if (!(++s < 6))
                                break;
                            VastPreloadLoad(o.vast_loaders[n])
                        }
                    }
            return e
        }
        function VastAddPreload(t) {
            if (1 == v.vast_preload && o.vast_loaders) {
                var e = 0;
                for (e = 0; e < vasturl.length; e++)
                    if (vasturl[e] == t && vast_and >= e)
                        return;
                if (1 == vasturl.length && vasturl[0].length > 1)
                    ;
                else {
                    var i = 0;
                    for (e = 0; e < o.vast_loaders.length; e++)
                        0 == o.vast_loaders[e].done && i++;
                    o.vast_loaders.push({
                        load: 0,
                        done: 0,
                        x: trim(t),
                        t: o.vasttype,
                        ldr: new VastLoader(!0)
                    }),
                    i < 5 && VastPreloadLoad(o.vast_loaders[o.vast_loaders.length - 1])
                }
            }
        }
        function VastPreloadLoad(t) {
            t && (t.load = 1,
            t.ldr.Load(t.x, t.t))
        }
        function VastRemoveAndPlay(t) {
            var e = VastAndLimit();
            if (log("VAST remove (" + o.vast_impressions + ")"),
            vasturl.length > 0 && vast_and == vasturl.length - 1 && 0 == vasturl[0][0].indexOf("js:") && (vast_and = -1,
            vasturl = [[vasturl[0][0]]]),
            2 == o.vast_stop && (e = !0),
            vasturl.length > vast_and + 1 && !e) {
                o.vast.RemoveForNextAd(),
                VastBgLoad(),
                vast_and++,
                o.adscounter++,
                vast_or = 0;
                var i = trim(vasturl[vast_and][0])
                  , s = VastPreloaded(i);
                "skip" == s && (o.vastloader = new VastLoader,
                o.vastloader.Load(i, vast_type)),
                "error" == s && VastRemoveAndPlay(t)
            } else {
                if (RemoveCurtain(),
                o.controls.StopWaiting(),
                exist(o.vast) && (o.vast.Remove(),
                o.vast = null),
                o.vastloader = null,
                vasturl = [],
                vast_or = 0,
                vast_and = 0,
                o.vastfrombg = 0,
                1 != o.shwvstfnsh && js("vast_finish", o.vasttype),
                o.shwvstfnsh = 0,
                1 == v.vast_ima && o.ima) {
                    try {
                        o.ima.Destroy()
                    } catch (t) {
                        log(o.ima, t)
                    }
                    o.ima = void 0
                }
                var n;
                if (vast_type = "",
                o.vast_impressions = 0,
                o.vpaid_starts = 0,
                clearTimeout(o.vast_longtimeout),
                o.vast_longtomsg && o.vast_longtomsg.remove(),
                o.vast_starts++,
                "preroll" == o.vasttype || "pauseroll" == o.vasttype && 1 == v.pauserollonplay && o.actplay || "midroll" == o.vasttype)
                    if ("?" != v.file)
                        o.media.AfterVast(),
                        "youtube" == o.file_type && !o.vastclick && o.system.ios && (n = !0,
                        "preroll" == o.vasttype && o.media.reYT()),
                        n || "dontplay" == t || 1 == v.vast_dontplay || setTimeout((()=>o.actions.Play(1)), 100);
                o.resizeonplay > 0 && (NewAspect(o.resizeonplay),
                o.resizeonplay = 0),
                "postroll" == o.vasttype && End(),
                o.vastclick = !1,
                o.vasttype = null
            }
        }
        function Curtain() {
            o.curtain || (o.curtain = createElement("div"),
            o.frame.appendChild(o.curtain),
            Pos0(o.curtain),
            css(o.curtain, {
                background: "#000000",
                opacity: .1
            }),
            o.curtain.style.zIndex = 1001)
        }
        function RemoveCurtain() {
            o.curtain && (o.frame.removeChild(o.curtain),
            o.curtain = null)
        }
        function ShowPoster() {
            exist(o.poster) && (v.poster != o.currentposter && Poster(v.poster, o.poster, v.poster_scale),
            show(o.poster),
            css(o.poster, {
                opacity: v.poster_a
            }),
            o.controls.refresh())
        }
        function HidePoster2() {
            clearTimeout(o.pstr_to),
            (1 != v.posteronpause || o.play) && (css(o.poster, {
                opacity: 0
            }),
            setTimeout(HidePoster3, 500))
        }
        function HidePoster3() {
            (o.play || 1 != v.posterhide) && hide(o.poster)
        }
        function StopOtherPlayer(t) {
            if (1 == v.stopotherplayers)
                for (var e = 0; e < pljssglobal.length; e++)
                    pljssglobal[e].api("id") != v.id && pljssglobal[e].api("pause");
            pljssglobalid = v.id
        }
        function IndexPlaylist(t) {
            var e = Object.keys(t).length;
            return e > 0 && (t = IndexPlaylistProcessor(t, e, "", -1)),
            t
        }
        function IndexPlaylistProcessor(t, e, i, s) {
            var n, a = [];
            exist(t.playlist) && (e = (t = t.playlist).length);
            for (var r = 0, l = 0; l < e; l++) {
                if (n = !1,
                exist(t[l].id) && (t[l].pjs_id = t[l].id),
                t[l].id = "x" + i + "-" + l + (exist(t[l].id) ? "-" + t[l].id : ""),
                -1 == s && 0 == l && !exist(t[l].folder) && (o.pl_first_id = t[l].id),
                exist(o.pl_first_id) || 0 == s && !exist(t[l].folder) && (o.pl_first_id = t[l].id),
                t[l].pjs_parent = i,
                t[l].pjs_parent_i = s,
                t[l].pjs_i = r,
                exist(t[l].comment)) {
                    t[l].title = t[l].comment;
                    var d = t[l].file ? t[l].file.indexOf("[") : 0
                      , c = t[l].file ? t[l].file.indexOf("]") : 0;
                    if (d > 0 && c > 0) {
                        for (var u = t[l].file.substr(d + 1, c - d - 1), p = u.split(","), v = "", f = 0; f < p.length; f++)
                            v += "[" + p[f] + "]" + t[l].file.replace("[" + u + "]", p[f]) + (f < p.length - 1 ? "," : "");
                        t[l].file = v
                    }
                }
                if (exist(t[l].playlist) && (t[l].folder = t[l].playlist),
                exist(t[l].folder) || exist(t[l].file) && ("" != t[l].file || exist(t[l].redirect)) || (n = !0),
                n || (o.playlist_dic[t[l].id] = t[l],
                r += 1),
                exist(t[l].folder)) {
                    var h = Object.keys(t[l].folder).length;
                    h > 0 && (t[l].folder = IndexPlaylistProcessor(t[l].folder, h, t[l].id, l))
                }
                n || a.push(t[l])
            }
            return a
        }
        function FindFileInPlaylist() {
            var t = [];
            if (exist(v.plstart)) {
                if (0 != v.plstart.indexOf("x-"))
                    for (var e in o.playlist_dic)
                        o.playlist_dic.hasOwnProperty(e) && o.playlist_dic[e].pjs_id == v.plstart && (v.plstart = e);
                exist(o.playlist_dic[v.plstart]) ? (1 == v.playlist.norootplstart && (v.playlist.openplaylistroot = 0),
                t = o.playlist_dic[v.plstart]) : (t = o.playlist[0],
                v.plstart == o.plcontinue && (o.seekto = void 0))
            } else
                t = o.playlist[0];
            if (t) {
                for (var i = 0; i < 10 && exist(t.folder); i++)
                    t = t.folder[0];
                v.plstart = t.id,
                v.plstart == o.plcontinue && (t.start = void 0)
            }
            return t
        }
        function End() {
            gaTracker("end", "End", 1),
            o.actions.VastRecover(),
            o.storage && 1 == v.timestore && o.continue.write(0, o.media.duration()),
            o.controls.PlaylistExist() ? 1 == v.playlist.autoplaylist && o.controls.PlaylistNextExist() ? (o.controls.PlaylistNext(),
            o.play && o.system.ios && o.file_type) : End2() : (1 == v.finishnormal && o.fullscreen && o.actions.Normalscreen(),
            ShowPoster(),
            js("finish"))
        }
        function End2() {
            1 != v.playlist.playlistrewind || o.controls.PlaylistNextExist() ? (1 == v.playlist.openplaylistafter && !o.controls.PlaylistVisible() && o.controls.Playlist(),
            ShowPoster(),
            js("finish")) : o.controls.PlaylistRewind()
        }
        function fjs(x) {
            if (0 == x.indexOf("js:"))
                try {
                    x = eval(x.substr(3))
                } catch (t) {
                    console.log(t.message)
                }
            return x || ""
        }
        function Heartbeat() {
            var t = Math.floor(Date.now() / 1e3)
              , e = (exist(v.livets) ? v.livets : 0) + parseInt(o.media.time())
              , i = 0;
            o.system.desktop && (i = 1),
            o.system.ios && (i = 2),
            o.system.android && (i = 3),
            o.system.winmob && (i = 4),
            o.system.tv && (i = 5);
            var s = v.heartbeat.replace("[vts]", t);
            s = (s = s.replace("[fts]", e)).replace("[dvtp]", i);
            var n = document.createElement("img");
            n.setAttribute("src", s),
            n.setAttribute("height", "1px"),
            n.setAttribute("width", "1px"),
            o.frame.appendChild(n)
        }
        this.FullscreenUI = function() {
            if (o.fullscreen_start) {
                if (o.fullscreen = !0,
                o.controls.Fullscreen(),
                !o.realfullscreen) {
                    if (exist(o.parentIframe))
                        try {
                            css(o.parentIframe, {
                                width: "100%",
                                height: "100%",
                                position: "fixed",
                                left: 0,
                                top: 0,
                                zIndex: "100000"
                            })
                        } catch (t) {}
                    css(o.frame, {
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        zIndex: "100000"
                    }),
                    o.screen_w = o.frame.offsetWidth,
                    o.screen_h = o.frame.offsetHeight;
                    try {
                        document.body.style.overflow = "hidden",
                        exist(o.playlist) || (document.ontouchmove = function(t) {
                            t.preventDefault()
                        }
                        )
                    } catch (t) {}
                }
                1 == v.fullblack && css(o.frame, {
                    backgroundColor: "#000000"
                }),
                o.droplist && o.droplist.Close(),
                Sub(),
                o.fullscreen_start = !1
            }
        }
        ,
        this.Normalscreen = function() {
            _fullscreen_end = !0,
            document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen ? document.exitFullscreen() : document.cancelFullscreen ? document.cancelFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(),
            o.realfullscreen || this.NormalscreenUI(!1)
        }
        ,
        this.changeAspect = function(t, e) {
            NewAspect(t, e)
        }
        ,
        this.NormalscreenUI = function(t) {
            if (_fullscreen_end || t) {
                if (o.fullscreen = !1,
                o.nativefull = !1,
                !o.realfullscreen) {
                    if (exist(o.parentIframe))
                        try {
                            css(o.parentIframe, {
                                position: "static",
                                left: 0,
                                top: 0,
                                zIndex: "unset"
                            }),
                            css(o.parentIframe, o.parentIframe_style),
                            css(o.parentIframe, {
                                width: o.normal_w,
                                height: o.normal_h
                            })
                        } catch (t) {}
                    css(o.frame, {
                        width: o.normal_w,
                        height: o.normal_h,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: "unset"
                    });
                    try {
                        document.body.style.overflow = "auto",
                        document.ontouchmove = function(t) {
                            return !0
                        }
                    } catch (t) {}
                }
                o.controls.Normalscreen(),
                1 == v.fullblack && (css(o.frame, {
                    backgroundColor: v.screencolor
                }),
                1 == v.transparent ? o.frame.style.backgroundColor = "transparent" : css(o.frame, {
                    backgroundColor: v.screencolor
                })),
                1 == v.hotkey.volumewheelfull && (VolumeWheelX(!1),
                o.volumewheel = !1),
                o.droplist && o.droplist.Close(),
                Sub(),
                o.subdrag && (o.subdrag = !1),
                o.controls.PlaylistHere(),
                _fullscreen_end = !1,
                js("exitfullscreen"),
                o.realfullscreen = !1,
                o.fullscreen_process = !1
            }
        }
        ,
        this.volumewheel = function(t) {
            VolumeWheelX(t)
        }
        ,
        this.Stop = function() {
            v.preload = 0,
            o.controls.Pause(),
            o.actions.Stopped(),
            o.media.Volume(v.volume),
            o.controls.SettingsVisible() && o.controls.Settings(),
            o.muted && this.Mute(),
            exist(o.heartbeatInterval) && (clearInterval(o.heartbeatInterval),
            o.heartbeatInterval = null),
            Sub(0),
            log("stop"),
            js("stop")
        }
        ,
        this.StopMedia = function() {
            v.preload = 0,
            v.autoplay = 0,
            o.media.Recover(),
            o.actions.Stop()
        }
        ,
        this.SetQuality = function(t) {
            exist(o.current_quality) && o.current_quality != t && (o.current_quality = t,
            1 == v.qualitystore && (o.default_quality = o.files_quality[t],
            o.storage && localStorage.setItem("pljsquality", o.default_quality)),
            o.media.SetQuality(t),
            js("quality", o.files_quality[t]),
            o.controls.QualityChanged(t))
        }
        ,
        this.AirplayChanged = function() {
            o.controls && o.controls.AirplayChanged()
        }
        ,
        this.SetAudioTrack = function(t) {
            exist(o.current_audiotrack) && o.current_audiotrack != t && (o.current_audiotrack = t,
            1 == v.trackstore && (o.default_audio = v.default_audio = o.files_audiotrack[t],
            o.storage && localStorage.setItem("pljstrack", o.default_audio)),
            o.media.SetAudioTrack(t),
            js("audiotrack", t),
            o.controls.SettingChanged("audiotrack"))
        }
        ,
        this.SetSpeed = function(t, e) {
            "0.0" == t && (t = .1);
            var i = t;
            if (String(i).indexOf(".") > 0 && (e = 1),
            i *= 1,
            e || (i = t == o.speed1 ? 1 : o.files_speed[t],
            o.current_speed = t),
            o.line_speed || e) {
                if (t == o.custom_speed)
                    return;
                o.custom_speed = i;
                for (var s = 0; s < o.files_speed.length; s++)
                    if (i <= 1 * o.files_speed[s]) {
                        o.current_speed = s;
                        break
                    }
            }
            o.storage && 1 == v.speedstore && localStorage.setItem("pljsspeed", i),
            js("speed", i),
            o.media.SetSpeed(i),
            o.controls.SettingChanged("speed")
        }
        ,
        this.RenewSubtitle = function() {
            o.sbt && (Sub(),
            o.sbt.style())
        }
        ,
        this.Subtitle = function(t) {
            "function" == typeof PluginSub && (!o.sbt && (o.sbt = new PluginSub),
            o.sbt.start(t))
        }
        ,
        this.advertising = function(t) {
            Advertising(t)
        }
        ,
        this.isVastBgLoad = function(t) {
            return isVastBgLoad(t)
        }
        ,
        this.VastImpression = function(t) {
            !t && VastVisible(),
            "midroll" == o.vasttype && o.midrollimprsd.push(o.current_vast_url)
        }
        ,
        this.VpaidStarted = function() {
            VastVisible()
        }
        ,
        this.VastShow = function() {
            VastVisible()
        }
        ,
        this.VastReady = function(t) {
            if (o.vastloader = null,
            o.vastfrombg = 0,
            log("VAST ready", o.vasttype),
            js("vast_ready", o.vasttype),
            "overlay" == t.type) {
                var e = new VastOverlay(t);
                o.overlays.push(e)
            } else
                exist(o.vast) ? (0 == v.preload && 1 == v.vastbgpreload && 0 == o.media.time() && 0 == o.media.duration() && (v.preload = 1,
                o.media.Preload()),
                (!o.vast.tagLive() || t.isVpaid) && o.vastgo > 0 && (log("VAST renew"),
                o.vast.Remove(),
                o.vast = null,
                o.vast = new VastVideo),
                isVastBgLoad() ? VastBgLoad() : o.play && (o.media.Pause(),
                o.controls.Pause()),
                o.vastgo++,
                o.adsfirst && v.vast_longtimeout > 0 && (clearTimeout(o.vast_longtimeout),
                o.vast_longtimeout = setTimeout(VastLongTimeout, 1e3 * v.vast_longtimeout * 60),
                exist(v.vast_longtimemsg) && "" != v.vast_longtimemsg && (o.vast_longtomsg && o.vast_longtomsg.remove(),
                o.vast_longtomsg = new PluginVastTimeMsg)),
                o.adsfirst = !1,
                v.vast_prestarttimeout > 0 ? (log("VAST startdelay"),
                js("vast_startdelay"),
                setTimeout(VastGo, 1e3 * v.vast_prestarttimeout, t)) : VastGo(t)) : log("VAST alarm")
        }
        ,
        this.VastError = function() {
            js("vast_error", o.vasttype),
            log("VAST error"),
            VastCheckNext()
        }
        ,
        this.VastNext = function() {
            VastCheckNext()
        }
        ,
        this.VastRemoveUrl = function(t) {
            if (v[o.vasttype + "_recover"])
                for (var e = 0; e < 3; e++)
                    v[o.vasttype + "_recover"] = v[o.vasttype + "_recover"].replace(t + (0 == e ? " and " : 1 == e ? " or " : ""), "")
        }
        ,
        this.VastInsertAnd = function(t, e) {
            if ("" != t) {
                var i = vast_and
                  , s = !1;
                if (e)
                    for (var n = 0; n < vasturl.length; n++)
                        vasturl[n] == e && (i = n);
                if (1 == vasturl.length && vasturl[0].length > 1 && vast_or < vasturl[0].length - 1 && vasturl[vast_or]) {
                    var a = vasturl[vast_or].slice(1, 99);
                    vasturl[0].splice(vast_or + 1, 99),
                    s = !0
                }
                if ("object" == typeof t)
                    for (var r = 0; r < t.length; r++)
                        vasturl.splice(i + r + 1, 0, [t[r]]),
                        o.system.ie9 ? VastAddPreload(t[r]) : setTimeout(VastAddPreload, 100 * r, t[r]);
                else
                    "string" == typeof t && (vasturl.push([t]),
                    VastAddPreload(t));
                s && (vasturl[vasturl.length - 1] = vasturl[vasturl.length - 1].concat(a))
            }
        }
        ,
        this.VastInsertOr = function(t, e) {
            if ("" != t) {
                var o = vast_and;
                if (e)
                    for (var i = 0; i < vasturl.length; i++)
                        vasturl[i] == e && (o = i);
                if (vasturl[o])
                    if ("object" == typeof t)
                        for (var s = 0; s < t.length; s++)
                            vasturl[o].push(t[s]);
                    else
                        "string" == typeof t && vasturl[o].push(t)
            }
        }
        ,
        this.VastRemoveAndPlay = function(t) {
            VastRemoveAndPlay(t)
        }
        ,
        this.EmptyVastUrl = function() {
            vasturl = [[""]]
        }
        ,
        this.VastRecover = function(t) {
            for (var e, i = ["preroll", "pauseroll", "postroll", "intro", "outro"], s = 0; s < i.length; s++)
                e = !1,
                t && t != i[s] && (e = !0),
                !e && exist(v[i[s].concat("_", "recover")]) && (v["vast_" + i[s].concat("_", "limit")]--,
                v["vast_" + i[s].concat("_", "limit")] > 0 && (v[i[s]] = v[i[s].concat("_", "recover")],
                v[i[s].concat("_", "recover")] = null));
            if (("preroll" == t || "midroll" == t) && v.vast_midroll_limit > 1 && exist(o.midrollo) && 1 == v.midrolls) {
                for (var s in o.midrollo)
                    o.midrollo[s].worked = void 0;
                v.vast_midroll_limit--
            }
        }
        ,
        this.Password = function() {
            Curtain(),
            exist(o.pass) && (o.pass.Remove(),
            o.pass = null),
            o.pass = new Pass
        }
        ,
        this.RemovePassword = function() {
            RemoveCurtain(),
            o.pass.Remove(),
            o.pass = null
        }
        ,
        this.Curtain = function() {
            Curtain()
        }
        ,
        this.RemoveCurtain = function() {
            RemoveCurtain()
        }
        ,
        this.HidePoster = function() {
            exist(o.poster) && (isVisible(o.poster) && (0 == o.media.time() && 1 == v.posterhidestart || (v.posterhidetime > 0 ? (clearTimeout(o.pstr_to),
            o.pstr_to = setTimeout(HidePoster2, 1e3 * v.posterhidetime)) : HidePoster2())))
        }
        ,
        this.ShowPoster = function() {
            ShowPoster()
        }
        ,
        this.ShuffleEnd = function() {
            End2()
        }
    }
      , Media = function(t) {
        var e, i, s, n, a, r, l, d, c = "", u = 0, p = !1, f = !1;
        o.mediascale = {
            x: 1,
            y: 1,
            x0: 1,
            y0: 1
        };
        var h = 0
          , g = 0;
        if ("string" == typeof t) {
            if (0 == (t = trim(t)).indexOf("[{"))
                try {
                    t = t.replace(/pjs'qt/gi, '"'),
                    t = JSON.parse(t),
                    l && (t = o.actions.File(t))
                } catch (e) {
                    console.log(e),
                    t = "incorrect JSON"
                }
            0 == t.indexOf("#" + v.enc2) && (t = o[o.fd[0]](t)),
            t && 0 == t.indexOf("#" + v.enc3) && t.indexOf(v.file3_separator) > 0 && (t = o[o.fd[1]](t)),
            t && 0 == t.indexOf("#0") && (t = t.indexOf(o.pltxt) > 0 ? fd0(t.replace(o.pltxt, "")) + o.pltxt : fd0(t)),
            1 == v.fplace && (t = fplace(t)),
            "string" == typeof t && (t.indexOf(".m3u") == t.length - 4 || t.indexOf(".txt") > 0) && (d = t.split(" or "),
            m())
        }
        function m() {
            (t = d[h]).indexOf(o.pltxt) > 0 && (t = t.replace(o.pltxt, ""),
            v.file = t);
            
            /*let e;
            console.log(`Sending: https://vid1671125149.vb17121coramclean.pw${t}`)
            await fetch(`https://vid1671125149.vb17121coramclean.pw${t}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-TOKEN': o.p.key
                }
            }).then((response) => { 
                console.log(`Response: ${response}`)
                return response.text() 
            }).then(function (data) { 
                console.log(`Response text: ${data}`)
                (!function(e) {
                    var i = data;
                    if (0 == i.indexOf("#" + v.enc2) && (i = o[o.fd[0]](i)),
                    0 == i.indexOf("#" + v.enc3) && i.indexOf(v.file3_separator) > 0 && (i = o[o.fd[1]](i)),
                    t.indexOf(".m3u") == t.length - 4) {
                        var s = i.split(/(\r\n\t|\n|\r\t)/gm);
                        t = [];
                        for (var n = 1, a = "", r = 0; r < s.length; r++) {
                            if (s[r].indexOf("#EXTINF") > -1 && s[r].indexOf(" - ") > -1) {
                                var l = s[r].split(" - ");
                                a = l[l.length - 1]
                            }
                            s[r].indexOf("http") > -1 && (t.push({
                                title: "" + ("" != a ? a : n),
                                file: s[r]
                            }),
                            n++,
                            a = "")
                        }
                    } else {
                        i = i.replace(/(\r\n\t|\n|\r\t)/gm, "");
                        try {
                            t = JSON.parse(i)
                        } catch (t) {
                            b(2)
                        }
                    }
                    exist(t.items) && (t = YoutubePlaylist(t)),
                    o.controls && 1 == v.playlist.openplaylistbefore && (o.controls.PlaylistVisible() || o.controls.PlaylistShow()),
                    y(),
                    MainResize(),
                    setTimeout((function() {
                        js("playlist")
                    }
                    ), 1)
                }(this),
                o.controls.NewPl())
            }) */

            let e = new XMLHttpRequest;
            e.open("POST", `https://vid1671125149.vb17121coramclean.pw${t}`, !0),
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            e.setRequestHeader("X-CSRF-TOKEN", o.p.key),
            e.onload = function() {
                4 == this.readyState && 200 == this.status ? (!function(e) {
                    if (e.responseText) {
                        var i = e.responseText;
                        if (0 == i.indexOf("#" + v.enc2) && (i = o[o.fd[0]](i)),
                        0 == i.indexOf("#" + v.enc3) && i.indexOf(v.file3_separator) > 0 && (i = o[o.fd[1]](i)),
                        t.indexOf(".m3u") == t.length - 4) {
                            var s = i.split(/(\r\n\t|\n|\r\t)/gm);
                            t = [];
                            for (var n = 1, a = "", r = 0; r < s.length; r++) {
                                if (s[r].indexOf("#EXTINF") > -1 && s[r].indexOf(" - ") > -1) {
                                    var l = s[r].split(" - ");
                                    a = l[l.length - 1]
                                }
                                s[r].indexOf("http") > -1 && (t.push({
                                    title: "" + ("" != a ? a : n),
                                    file: s[r]
                                }),
                                n++,
                                a = "")
                            }
                        } else {
                            i = i.replace(/(\r\n\t|\n|\r\t)/gm, "");
                            try {
                                t = JSON.parse(i)
                            } catch (t) {
                                b(2)
                            }
                        }
                        exist(t.items) && (t = YoutubePlaylist(t)),
                        o.controls && 1 == v.playlist.openplaylistbefore && (o.controls.PlaylistVisible() || o.controls.PlaylistShow()),
                        y(),
                        MainResize(),
                        setTimeout((function() {
                            js("playlist")
                        }
                        ), 1)
                    }
                }(this),
                o.controls.NewPl()) : b(1)
            }
            ,
            e.onerror = function(t) {
                b(1)
            }
            ,
            e.send(null), 
            l = !0 
        }
        function b(t) {
            h + 1 < d.length && (h++,
            m(),
            t = 0),
            1 == t && x("playlist not found or access denied"),
            2 == t && x("playlists JSON")
        }
        function y() {
            (t = o.actions.File(t)) && "?" != t && L(t)
        }
        function x(t) {
            log("Error: " + t);
            var i = !0
              , n = !0;
            if (js("loaderror", t),
            e && e.length > 0)
                if ((i = ++s > e.length - 1) && 1 == v.tryotherquality && o.files.length > 1 && (-1 == o.files_quality[o.current_quality].indexOf(Lang("loading_error")) && (o.files_quality[o.current_quality] = o.files_quality[o.current_quality] + " (" + Lang("loading_error") + ")"),
                o.current_quality > 0 ? (n = !1,
                o.actions.SetQuality(o.current_quality - 1),
                R()) : -1 == o.files_quality[o.current_quality + 1].indexOf(Lang("loading_error")) && (n = !1,
                o.actions.SetQuality(o.current_quality + 1),
                R())),
                i)
                    1 == v.reload && n && (i = !1,
                    _());
                else {
                    !(o.seekto > 0 || !o.start || a.isLive()) && (o.seekto = S()),
                    o.file_type == I(e[s]) && "native" == o.file_type || o.play && (o.actions.Stop(),
                    !0),
                    log("Alternative source", o.seekto),
                    L("or"),
                    o.start && !o.vast && a.Play(),
                    R()
                }
            i && n && t && w(t, !0)
        }
        function w(t, e) {
            gaTracker("error", "Error", !0),
            1 != v.alerts || o.media_error || (1 == v.alert404 ? o.alert.txt(v.alert404text) : o.alert.txt(t),
            1 == v.alert404v && exist(v.alert404video) && (o.err404v = new PluginErrorVideo,
            o.actions.HidePoster())),
            e && (o.media_error = !0),
            o.play && (o.actions.StopWaiting(),
            o.controls.Pause()),
            exist(o.poster) && !exist(o.err404v) && o.actions.ShowPoster(),
            js("error", t)
        }
        function _() {
            g++,
            log("Error Reload Timeout " + g),
            o.play && (o.rldplay = 1),
            exist(o.reloadto) && clearTimeout(o.reloadto),
            o.reloadto = setTimeout(k, 1e3 * v.reloadtimeout)
        }
        function k() {
            var t = existv(v.reloadtimes, 10);
            (o.play || 1 == o.rldplay) && (o.rldplay = 0,
            g < t ? o.actions.Reload() : w("Reload Error " + a.errorMessage()))
        }
        function S() {
            return a.time()
        }
        function P() {
            return a.duration()
        }
        function T() {
            var t = !1;
            return a && ("youtube" == o.file_type && (t = a.auto()),
            "hls" == o.file_type && 1 == v.hlsquality && A() > 1 && 1 == v.hlsautoquality && (t = a.auto()),
            "dash" == o.file_type && 1 == v.dashquality && O() > 1 && (t = a.auto())),
            t
        }
        function A() {
            return "hls" == o.file_type ? a.HlsLevelsLength() : 0
        }
        function O() {
            return "dash" == o.file_type ? a.DashLevelsLength() : 0
        }
        function E() {
            ("playing" == (c = a ? a.status() : "") || o.casting) && o.actions.Playing(),
            "" != c && o.actions.Loading()
        }
        function C() {
            o.poster && o.frame.removeChild(o.poster),
            o.poster = createElement("div"),
            css(o.poster, {
                "pointer-events": "none",
                opacity: v.poster_a,
                transition: "opacity 0.5s"
            }),
            1 == v.poster_float ? PluginFloatPoster() : css(o.poster, {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            }),
            o.frame.appendChild(o.poster)
        }
        function L(n, r, l) {
            if ("" == v.file2_separator && (v.file2_separator = ";"),
            n.indexOf("{") > -1 && n.indexOf("}") > -1 && n.indexOf(v.file2_separator) > -1) {
                var d = n.split(v.file2_separator);
                o.audiotracks = [];
                for (var c = 0; c < d.length; c++)
                    o.files_audiotrack[c] = d[c].substr(d[c].indexOf("{") + 1, d[c].indexOf("}") - 1),
                    o.audiotracks[c] = d[c].substr(d[c].indexOf("}") + 1),
                    exist(v.default_audio) && v.default_audio == o.files_audiotrack[c] && (o.current_audiotrack = c);
                n = o.audiotracks[o.current_audiotrack]
            }
            !exist(e) && (e = []),
            o.fileTimeout && clearTimeout(o.fileTimeout),
            n && "or" != n && "x" != n && function(t) {
                e = t.split(" or ");
                for (var o = 0; o < e.length; o++)
                    e[o].indexOf(" and ") > -1 && (i = e[o].split(" and "),
                    e[o] = i[random(0, i.length - 1)]),
                    exist(v.prefile) && -1 == e[o].indexOf("//") && (e[o] = v.prefile + e[o]);
                s = 0
            }(n);
            var u = o.file_type;
            if (e.length > 0) {
                o.file_type = I(e[s]);
                var p = !1;
                if (l && (p = !0),
                (t = e[s]) && (t = t.replace(/\(random\)/g, Math.random())),
                t.indexOf("~") > -1 || t.indexOf("#") > -1) {
                    var h = !1;
                    new Promise((function(e) {
                        let i = {readyState: null}
                        fetch(`__hostreplace__${v.file_path}${t.substr(1)}.txt`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "X-CSRF-TOKEN": o.p.key
                            }
                        }).then((response) => { 
                            return response.text() 
                          }).then((data) => { 
                            console.log(data)
                            i.readyState = data
                            e(data)
                          })
                        return i
                    }
                    )).then((function(t) {
                        !p && "x" != n && a && o.file_type == u && ("native" == u || "vimeo" == u && !o.system.mobile || "youtube" == u && o.start && !f || "dm" == u || "hls" == u || "dash" == u) ? (a.src(t),
                        log("src")) : (log("New"),
                        M(),
                        j(t)),
                        setTimeout((function t() {
                            if (!0 !== o.start || !0 !== o.play || h)
                                setTimeout(t, 1e4);
                            else {
                                let t = "undefined" == typeof adblock || o.ab || "none" == window.getComputedStyle(document.querySelector("#adv"), null).display ? 1 : 0
                                  , e = "vast_started"in o && !0 === o.vast_started ? 1 === t ? 0 : 1 : 0;
                                gif(`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&pre=${e}`),
                                h = !0
                            }
                        }
                        ), 1e4),
                        setTimeout((function t() {
                            !0 === o.start ? gif(`//stat2.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}`) : setTimeout(t, 1e4)
                        }
                        ), 1e4),
                        PauseBannerPlugin("pausebannerhide")
                    }
                    ))
                } else
                    !p && "x" != n && a && o.file_type == u && ("native" == u || "vimeo" == u && !o.system.mobile || "youtube" == u && o.start && !f || "dm" == u || "hls" == u || "dash" == u) ? (a.src(t),
                    log("src")) : (log("New"),
                    M(),
                    j(t)),
                    PauseBannerPlugin("pausebannerhide");
                o.speed1 && (o.line_speed ? a.setSpeed(o.custom_speed) : o.current_speed != o.speed1 && a.setSpeed(o.files_speed[o.current_speed]))
            }
            r || (clearInterval(o.timerInterval),
            o.timerInterval = setInterval(E, o.timerTime),
            exist(v.subtitle) || 1 != v.sub_upload || 1 != v.sub_upload0 || (v.subtitle = ""),
            exist(v.subtitle) && o.actions.Subtitle(v.subtitle),
            1 == v.hidevideo && (1 == v.nativecontrolsmobile && o.system.mobile || ("youtube" == o.file_type ? css(o.mediacontainer, {
                top: -3e3,
                left: -3e3
            }) : hide2(o.mediacontainer),
            v.toolbar.hide = 0)))
        }
        function I(t) {
            var e = "native";
            if (t)
                if (t.indexOf(".m3u8") > 0)
                    e = "hls";
                else if (t.indexOf(".mpd") > 0)
                    e = "dash";
                else if (0 == t.indexOf("ws"))
                    e = o.ws;
                else if (t.indexOf("youtube.com/") > -1 || t.indexOf("youtu.be/") > -1)
                    if ("function" == typeof MediaYoutube) {
                        if (e = "youtube",
                        1 == v.youtubeposter) {
                            var i = "https://img.youtube.com/vi/" + YoutubeID(t) + "/";
                            !function(t, e) {
                                var o = new Image;
                                o.onload = function() {
                                    e(this.height)
                                }
                                ,
                                o.src = t
                            }(i + "maxresdefault.jpg", (function(t) {
                                v.poster = t > 100 ? i + "maxresdefault.jpg" : i + "hqdefault.jpg",
                                o.playlist_dic && (o.playlist_dic[o.plid].poster = v.poster),
                                1 != v.autoplay && !o.start && Poster(v.poster, o.poster, v.poster_scale)
                            }
                            ))
                        }
                    } else
                        log("No YouTube");
                else
                    1 == v.vimeo && t.indexOf("vimeo.com/") > -1 ? e = "vimeo" : 1 == v.dm && t.indexOf("dailymotion.com") > -1 ? e = "dm" : 1 == v.pjsframe && "function" == typeof PjsFramed && PjsFramed(t) && (e = "pjs");
            return o.tagvideo = "native" == e || "hls" == e || "dash" == e || e == o.ws,
            e
        }
        function j(t) {
            o.file_type = I(t),
            o.tagvideo && (a = new MediaVideo(t,o.mediacontainer,!1)),
            "youtube" == o.file_type && (a = new MediaYoutube(t,o.mediacontainer)),
            1 == v.vimeo && "vimeo" == o.file_type && (a = new MediaVimeo(t,o.mediacontainer)),
            "pjs" == o.file_type && (a = new MediaPjs(t)),
            "dm" == o.file_type && (a = new MediaDaily(t,o.mediacontainer)),
            o.controls && o.controls.UpdateSettings();
            var e = 0;
            exist(v.duration) && (o.continue && 1 == v.timestore && !o.start && (e = o.continue.flag().t),
            setTimeout((function() {
                o.actions.Duration(e, v.duration)
            }
            ), 100))
        }
        function M() {
            a && (a.Remove(),
            a = null,
            c = "ended"),
            r && (r.Remove(),
            r = null,
            r = void 0,
            o.mediapip.remove(),
            o.media2 = null,
            o.mediapip = null)
        }
        function R() {
            v.fileto > 0 && e.length > 1 && 0 == P() && (clearTimeout(o.fileTimeout),
            o.fileTimeout = setTimeout(z, 1e3 * v.fileto))
        }
        function z() {
            o.play && 0 == P() && 0 == S() && a && 0 == a.loaded() && s != e.length - 1 && x("File Timeout")
        }
        function H(t) {
            if (String(t).indexOf(":") > 0) {
                var e = t.split(":")
                  , i = o.screen_w / o.screen_h
                  , s = o.media.size();
                s.width > 0 && (i = s.width / s.height);
                var n = e[0] / e[1];
                if (i != n) {
                    o.tagvideo && a.ObjectFit();
                    var r = o.screen_h * n / o.screen_w
                      , l = o.screen_w / n / o.screen_h;
                    r < 1 ? (o.mediascale.x0 = o.mediascale.x = parseFloat(r),
                    o.mediascale.y = 1) : (o.mediascale.x = 1,
                    o.mediascale.y0 = o.mediascale.y = parseFloat(l)),
                    css(o.mediacontainer, {
                        transform: "scaleX(" + o.mediascale.x + ") scaleY(" + o.mediascale.y + ")"
                    }),
                    o.custom_aspect = t
                }
            } else
                o.mediascale.x += parseFloat(t),
                o.mediascale.y += parseFloat(t),
                css(o.mediacontainer, {
                    transform: "scaleX(" + o.mediascale.x + ") scaleY(" + o.mediascale.y + ")"
                });
            1 == v.hotkey.scaledrag && (o.mediadrag || (o.mediascale.x > 0 || o.mediascale.y > 1) && (PluginMovable(o.mediacontainer, "o.dragging"),
            o.mediadrag = !0),
            V()),
            o.controls.MenuProc("scale")
        }
        function V() {
            o.mediadrag && 1 != v.hotkey.scaledrag0 && 1 == o.mediascale.x && 1 == o.mediascale.y && css(o.mediacontainer, {
                top: 0,
                left: 0
            })
        }
        function D() {
            var t = XHR(v.tagsurl + "?url=" + e[s]);
            t.onload = function() {
                4 == this.readyState && 200 == this.status && this.responseText && (v.title = this.responseText,
                o.actions.Title("title"))
            }
            ,
            t.send()
        }
        o.mediacontainer = createElement("div"),
        Pos0(o.mediacontainer),
        css(o.mediacontainer, {
            transition: "transform 0.2s linear",
            "text-align": "center"
        }),
        o.frame.appendChild(o.mediacontainer),
        1 == v.hotkey.swiping && (o.mdswp || (PluginMovable(o.mediacontainer, "o.swiping", !0, !1, (function() {
            var t;
            o.mediacontainer.offsetLeft > o.screen_w / 2 ? o.controls.PlaylistPrevExist() && (t = !0,
            o.controls.PlaylistPrev()) : o.mediacontainer.offsetLeft < -o.screen_w / 2 && o.controls.PlaylistNextExist() && (t = !0,
            o.controls.PlaylistNext());
            t ? css(o.mediacontainer, {
                left: 0
            }) : new Motion({
                mc: o.mediacontainer,
                type: "left",
                to: 0,
                time: .1,
                ease: "back",
                me: "mdswp"
            })
        }
        )),
        o.mdswp = !0)),
        l || y(),
        this.onError = function(t) {
            x(t || a.errorMessage())
        }
        ,
        this.onEnded = function(t) {
            log("Ended"),
            p = !0;
            var e = !1;
            if (P() > 0 && !o.casting && !t) {
                var i = o.current_time;
                i + 10 < P() && (log("Break (recovery)"),
                js("recovery"),
                a.Play(),
                a.Seek(i),
                e = !0)
            }
            e || (o.actions.Ended(),
            js("end"))
        }
        ,
        this.onPlay = function() {
            1 == v.posterhidepause && exist(o.poster) && o.actions.ShowPoster(),
            1 == v.posterhide && o.actions.HidePoster(),
            o.controls.Play(),
            o.actions.onPlayTag(),
            1 == v.tags && exist(v.tagsurl) && v.tagsurl.length > 5 && (D(),
            clearInterval(n),
            n = setInterval(D, 1e3 * v.tagsinterval)),
            1 == v.reload && g > 0 && 0 == o.media.duration() && (g = 0,
            _()),
            js("play")
        }
        ,
        this.NativeControls = function() {
            1 == v.nativecontrolsmobile && o.tagvideo && o.actions.NativeControls() && (o.nativecontrols = a.nativeControls(),
            o.controls.refresh()),
            o.checknative = !0
        }
        ,
        this.onPause = function() {
            o.actions.Pause()
        }
        ,
        this.onSeeking = function() {
            log("Seeking")
        }
        ,
        this.onSeeked = function() {
            log("Seeked"),
            o.actions.Seeked(),
            exist(o.seeking_time) && js("seek", o.seeking_time)
        }
        ,
        this.onMeta = function() {
            log("Metadata"),
            g = 0,
            o.actions.Metadata()
        }
        ,
        this.onDuration = function() {
            a && (log("Duration", P()),
            o.actions.Duration(S(), P()),
            js("duration", P()),
            g = 0,
            clearTimeout(o.reloadto),
            exist(o.restart_audio) && (o.actions.SetAudioTrack(o.restart_audio),
            o.restart_audio = null))
        }
        ,
        this.onVolume = function() {}
        ,
        this.onWaiting = function() {
            log("Waiting"),
            o.actions.Waiting(),
            js("waiting")
        }
        ,
        this.onTimeupdate = function() {
            u != S() && (o.actions.StopWaiting(),
            0 == u && 1 == v.posterhide && 1 == v.posterhidestart && o.actions.HidePoster()),
            u = S(),
            js("time", u),
            1 == v.pip.on && "function" == typeof PluginPip && !r && 1 != v.pip.custom && v.file2 && "" != v.file2 && u > 0 && (o.mediapip = new PluginPip,
            r = o.mediapip.create())
        }
        ,
        this.onYoutubeReady = function() {
            "youtube" == o.file_type && a && a.YoutubeReady()
        }
        ,
        this.playByYoutubeId = function(t) {
            o.actions.Stop(),
            a.playId(t)
        }
        ,
        this.YoutubeReady = function() {
            return "youtube" != o.file_type || !a || a.ready()
        }
        ,
        this.getHLS = function() {
            return a.getHLS()
        }
        ,
        this.getDASH = function() {
            return a.getDASH()
        }
        ,
        this.SetQuality = function(t) {
            if (log("Quality", t),
            ("native" == o.file_type || o.file_type == o.ws || "hls" == o.file_type && (0 == v.hlsquality || A() < 2) || "dash" == o.file_type && (0 == v.dashquality || O() < 2)) && exist(o.files[t])) {
                var e = this.time();
                !(o.seekto > 0) && (o.seekto = e),
                o.actions.Seek(e, !1),
                L(o.files[t], !0);
                var i = !0;
                v.settings && ((1 != v.settings.qualitypause || o.play) && o.start || (i = !1)),
                i && o.actions.Play()
            }
            "hls" == o.file_type && 1 == v.hlsquality && A() > 1 ? a.setHlsQuality(t) : "dash" == o.file_type && 1 == v.dashquality && O() > 1 ? a.setDashQuality(t) : "youtube" != o.file_type && "dm" != o.file_type || a.setQuality(t)
        }
        ,
        this.renameQualities = function(t, e) {
            return function(t, e) {
                var o = t.height + "p";
                t.height < 200 ? o = "160p" : t.height >= 200 && t.height <= 300 ? o = "240p" : t.height > 300 && t.height <= 400 ? o = "360p" : t.height > 400 && t.height <= 500 ? o = "480p" : t.height > 500 && t.height <= 600 ? o = "540p" : t.height > 600 && t.height <= 900 ? o = "720p" : t.height > 900 && t.height <= 1200 ? o = "1080p" : t.height > 1200 && t.height <= 1800 ? o = "1440p" : t.height > 1800 && (o = "2160p");
                426 == t.width && t.height <= 240 ? o = "240p" : 640 == t.width && t.height <= 360 ? o = "360p" : t.width >= 854 && t.width <= 860 && t.height <= 480 ? o = "480p" : 1280 == t.width && t.height <= 720 ? o = "720p" : 1920 == t.width && t.height <= 1080 ? o = "1080p" : 2560 == t.width && t.height <= 1440 ? o = "1440p" : 3840 == t.width && t.height <= 2160 && (o = "2160p");
                1 == v.settings.customqualities && exist(v.settings["name" + o]) ? o = v.settings["name" + o] : (1 == e && (o = Lang(o)),
                2 == e && exist(t.bitrate) && (o = parseInt(t.bitrate / 1e3) + " " + Lang("kbps")));
                return o
            }(t, e)
        }
        ,
        this.renameTracks = function(t) {
            return function(t) {
                var e = t.toLowerCase();
                "eng" == e || "en" == e ? t = "English" : "rus" != e && "ru" != e || (t = "Русский");
                "object" == typeof v.rename_audio && (t = existv(v.rename_audio[t], t));
                return t
            }(t)
        }
        ,
        this.SetSpeed = function(t) {
            log("Speed", t),
            a && a.setSpeed(t),
            1 == v.pip.on && r && r.setSpeed(t)
        }
        ,
        this.nativeSubtitle = function() {
            !function() {
                if (o.tagvideo && o.subs) {
                    a.removeTracks();
                    for (var t = 0; t < o.subs.length; t++)
                        a.addTrack(o.subs[t], o.files_subtitle[t], t == o.current_subtitle)
                }
            }()
        }
        ,
        this.removeNativeSubtitle = function() {
            a.removeTracks()
        }
        ,
        this.SetAudioTrack = function(t) {
            if (log("Audiotrack", t),
            o.audiotracks.length > 0) {
                if (o.audiotracks[t]) {
                    var e = this.time();
                    !(o.seekto > 0) && (o.seekto = e),
                    o.actions.Seek(e, !1),
                    L(o.audiotracks[t], !0),
                    o.actions.Play()
                }
            } else
                "hls" == o.file_type && 1 == v.hlsaudio ? a.setHlsAudioTrack(t) : "dash" == o.file_type && 1 == v.dashaudio && a.setDashAudioTrack(t)
        }
        ,
        this.getQuality = function() {
            var t = o.files_quality[o.current_quality];
            return null == t && (t = ""),
            (T() && 1 == v.hlsautoquality && 1 == v.hlsquality && t != Lang("auto") ? Lang("auto") + " " : "") + t
        }
        ,
        this.getAudioTrack = function() {
            var t = o.files_audiotrack[o.current_audiotrack];
            return null == t && (t = ""),
            t
        }
        ,
        this.autoQuality = function() {
            return T()
        }
        ,
        this.resize = function(t) {
            a && ("youtube" == o.file_type || "vimeo" == o.file_type || exist(v.ratio)) && a.resize(),
            v.screenmarginbottom > 0 && css(o.mediacontainer, {
                height: o.fullscreen ? "100%" : o.normal_h - v.screenmarginbottom
            }),
            o.media2 && 1 == v.pip.movable && o.mediapip.resize(),
            1 == v.poster_float && FloatPosterScale()
        }
        ,
        this.size = function() {
            return a.size()
        }
        ,
        this.iosfull = function() {
            a.iosfull()
        }
        ,
        this.reload = function() {
            log("reload"),
            o.reloadTimer = 0,
            o.start && (v.autoplay = 1),
            o.actions.Waiting(),
            t && 1 != v.rldnornd && -1 == t.indexOf("(random)") && (t = t + (-1 == t.indexOf("?") ? "?" : "&") + "rand=(random)"),
            o.tagvideo ? a.src(t) : L(t)
        }
        ,
        exist(o.poster) || C(),
        exist(v.poster) && ("" != v.poster ? (Poster(v.poster, o.poster, v.poster_scale),
        1 != v.posterhidepause || o.start || hide(o.poster)) : v.poster = null),
        this.Remove = function() {
            M()
        }
        ,
        this.RemoveAll = function() {
            e = [],
            M()
        }
        ,
        this.File = function(t, e, o) {
            L(t, e, o)
        }
        ,
        this.Poster = function(t) {
            Poster(t, o.poster, v.poster_scale)
        }
        ,
        this.Play = function() {
            a ? (p = !1,
            f = !1,
            o.casting ? o.chromecast.Play() : (a.Play(),
            1 == v.posterhide && o.actions.HidePoster()),
            exist(r) && r.Play(),
            o.channels && (o.tagvideo ? o.clicktime > 0 && !o.channels.Created() && o.channels.Update() : (o.files_channel = [],
            o.controls.SettingChanged("channel"))),
            o.tagvideo && v.volumegain > -1 && !o.gained && !o.system.ios && o.clicktime > 0 && a.Gain(),
            R()) : setTimeout(this.Play, 500)
        }
        ,
        this.PipSwitch = function(t) {
            if (o.media2) {
                if (1 == v.pip.movable && o.moving[o.media2] > 2)
                    return;
                t && (t.stopPropagation(),
                window.event && (window.event.cancelBubble = !0));
                var e = a;
                a.ChangePip(!0, o.media2),
                r.ChangePip(!1, o.mediacontainer),
                a = r,
                r = e,
                a.Play(),
                r.Play(),
                js("pip")
            }
        }
        ,
        this.reYT = function() {
            a.src(t)
        }
        ,
        this.ToolbarHide = function() {
            1 == v.effects && o.effects.api("hide"),
            o.toolbarhidden = !0
        }
        ,
        this.ToolbarShow = function() {
            v.toolbar.resizeme && (v.toolbar.resizeme = !1,
            o.controls && (o.controls.resizeFromText(1),
            o.controls.resizetext())),
            o.toolbarhidden = !1
        }
        ,
        this.PipToggle = function() {
            o.media2 && o.mediapip && o.mediapip.toggle()
        }
        ,
        this.Airplay = function() {
            o.tagvideo && o.airplay && (o.airplayed = !0,
            a.airplay())
        }
        ,
        this.PipWebkit = function() {
            o.tagvideo && o.pipwebkit && a.pipwebkit()
        }
        ,
        this.BeforeVast = function() {
            1 == v.vast_poster && exist(v.vast_posterurl) && (exist(o.vast_poster) || (o.vast_poster = createElement("div"),
            css(o.vast_poster, {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                "pointer-events": "none",
                zIndex: 1e4
            }),
            o.frame.appendChild(o.vast_poster)),
            show2(o.vast_poster),
            Poster(v.vast_posterurl, o.vast_poster, "fill")),
            a && (datetime(0),
            a.BeforeVast())
        }
        ,
        this.AfterVast = function() {
            o.vast_poster && hide2(o.vast_poster),
            a && a.AfterVast()
        }
        ,
        this.Pause = function() {
            o.casting ? o.chromecast.Pause() : a ? a.Pause() : log("nomedia"),
            exist(o.media2) && r.Pause()
        }
        ,
        this.Recover = function() {
            f = !0,
            o.actions.Seek(0, !1),
            exist(o.poster) && o.actions.ShowPoster(),
            L("x")
        }
        ,
        this.Toggle = function() {
            a && a.Toggle()
        }
        ,
        this.Seek = function(t) {
            a && (o.casting ? o.chromecast.Seek(t) : (a.Seek(t),
            1 == v.pip.on && r && r.Seek(t)))
        }
        ,
        this.Mute = function() {
            a && (a.Mute(),
            o.casting && o.chromecast.Mute(),
            log("mute")),
            1 == v.pip.on && 1 == v.pip.nomute && r && r.Mute()
        }
        ,
        this.Unmute = function() {
            a && (a.Unmute(),
            o.casting && o.chromecast.Unmute(),
            log("unmute")),
            1 == v.pip.on && 1 == v.pip.nomute && r && r.Unmute()
        }
        ,
        this.Volume = function(t) {
            a && a.Volume(t),
            1 == v.pip.on && 1 == v.pip.nomute && r && r.Volume(t),
            o.casting && o.chromecast.Volume(t)
        }
        ,
        this.isPlaying = function() {
            return !!a && a.isPlaying()
        }
        ,
        this.isLive = function() {
            return !!a && a.isLive()
        }
        ,
        this.status = function() {
            return c
        }
        ,
        this.ended = function() {
            return p
        }
        ,
        this.time = function() {
            var t = 0;
            if (a) {
                if (t = S(),
                o.casting) {
                    var e = o.chromecast.Time();
                    e && (t = e)
                } else
                    P() > 0 && t != P() && (o.current_time = t + 1e-4);
                return t
            }
            return 0
        }
        ,
        this.duration = function() {
            var t = 0;
            if (a && (0 == (t = P()) && exist(v.duration) && (t = 1 * v.duration),
            o.casting)) {
                var e = o.chromecast.Duration();
                e && (t = e)
            }
            return t
        }
        ,
        this.loaded = function() {
            return a ? a.loaded() : 0
        }
        ,
        this.flip = function() {
            o.mediascale.flip = !o.mediascale.flip,
            css(o.mediacontainer, {
                transform: o.mediascale.flip ? "scaleX(-1)" : "scaleX(1)"
            })
        }
        ,
        this.createposter = function() {
            C()
        }
        ,
        this.Preload = function() {
            o.tagvideo && a.preload()
        }
        ,
        this.menufltr = function(t, e) {
            if ("scale" == t)
                1 == e && H(v.settings.scale / 100),
                2 == e && H(-v.settings.scale / 100),
                3 == e && o.media.normalscale();
            else if (o.tagvideo) {
                o.fltrs[t] || (o.fltrs[t] = "sepia" == t ? 0 : 1),
                1 == e && (o.fltrs[t] += v.settings[t] / 100),
                2 == e && (o.fltrs[t] -= v.settings[t] / 100),
                3 == e && (o.fltrs[t] = "sepia" == t ? 0 : 1),
                !o.cftlr && (o.cftlr = []),
                o.cftlr[t] = t + "(" + parseInt(100 * o.fltrs[t]) + "%) ";
                var i = "";
                for (var s in o.cftlr)
                    i += o.cftlr[s];
                css(a.tag(), {
                    filter: i
                }),
                o.controls.MenuProc(t)
            }
        }
        ,
        this.scale = function(t) {
            H(t)
        }
        ,
        this.normalscale = function() {
            o.tagvideo && a.ObjectFit(),
            o.mediascale.x = o.mediascale.x0,
            o.mediascale.y = o.mediascale.y0,
            css(o.mediacontainer, {
                transform: "scaleX(" + o.mediascale.x + ") scaleY(" + o.mediascale.y + ")"
            }),
            o.controls.MenuProc("scale"),
            o.custom_aspect = null,
            V()
        }
        ,
        this.hlsDashSub = function(t, e) {
            a.hlsDashSub(t, e)
        }
        ,
        this.currentFile = function() {
            return e && e.length > 0 && e[s] ? e[s] : ""
        }
        ,
        this.tag = function() {
            return !!a && a.tag()
        }
        ,
        this.captions = function() {
            o.tagvideo && a.captions()
        }
        ,
        this.onDash = function() {
            a.onDash()
        }
    }
      , MediaVideo = function(url, container, pip) {
        var pjstg = createElement(1 == v.hidevideo ? "audio" : "video"), hls_config, pipto = 0, hls, is_hls = !1, is_hls2 = !1, hls_started = !1, hls_created = !1, hls_force = -1, dash, dash_created = !1, ws, ws_created = !1, is_dash = !1;
        o.live = !1;
        var is_sleep = 0, is_ws = !1, error, error_time, unmuteplease = !1, pip_quality = -1, pause_before_vast = -1, sleep_timeout, _hlssubtracks, _seekaftervast, urlmse, mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', nops = !1;
        if (css(pjstg, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            "object-fit": "contain",
            transition: "filter 0.2s linear",
            "min-height": "auto",
            "max-height": "none",
            "min-width": "auto",
            "max-width": "none"
        }),
        ObjectFit(),
        o.system.iphone && 1 == v.autoplay && 1 == v.autoplaymute ? !o.start && v.preroll ? attr(pjstg, {
            playsinline: 1
        }) : attr(pjstg, {
            muted: 1,
            playsinline: 1,
            autoplay: 1
        }) : (1 == v.playsinlineonmobile && o.system.mobile && attr(pjstg, {
            playsinline: 1
        }),
        o.system.tv || attr(pjstg, {
            preload: 1 == v.preload && 0 == v.autoplay ? "metadata" : "none"
        })),
        1 == v.tagcors && attr(pjstg, {
            crossorigin: "anonymous",
            crossOrigin: "anonymous"
        }),
        attr(pjstg, {
            src: url,
            "x-webkit-airplay": "allow",
            disableRemotePlayback: "true"
        }),
        1 != v.drunchr && attr(pjstg, {
            disableRemotePlayback: "true"
        }),
        1 == v.ynxnopip && attr(pjstg, {
            pip: "false"
        }),
        pip && (pjstg.autoplay = !0,
        1 == v.pip.nomute && 1 != v.autoplay || (pjstg.muted = !0)),
        1 == v.nativenodownload && attr(pjstg, {
            controlsList: "nodownload"
        }),
        tagSrc(),
        1 == v.taginframe) {
            var tagframe = createElement("iframe");
            attr(tagframe, {
                scrolling: "no",
                allowfullscreen: "true",
                allowtransparency: "true",
                src: ""
            }),
            css(tagframe, {
                position: "absolute",
                width: "100%",
                height: "100%",
                border: 0
            }),
            container.appendChild(tagframe);
            var framei = window.setInterval((function() {
                "complete" === tagframe.contentWindow.document.readyState && (window.clearInterval(framei),
                css(tagframe.contentDocument.body, {
                    padding: 0,
                    margin: 0
                }),
                tagframe.contentDocument.body.appendChild(pjstg))
            }
            ), 100)
        } else
            container.appendChild(pjstg);
        if (exist(url) || (url = ""),
        url.indexOf(".mpd") > 0)
            is_dash = !0,
            o.dash || "undefined" != typeof PluginDash && (o.dash = new PluginDash),
            exist(o.dash) && (exist(window.dashjs) ? CheckDash() : o.dash.script());
        else if ((1 == options.hls && 1 != v.HDVBPlayercom || url.indexOf(".m3u8") > 0) && (-1 != o.compilation.indexOf("HLS") || exist(window.Hls))) {
            is_hls = !0,
            is_hls2 = !0;
            try {
                exist(Hls) ? !Hls.isSupported() || o.system.safari && 1 == v.nativehlsinsafari && !o.system.ios || o.system.safari && o.system.ios && 1 == v.nativehlsios || o.system.edge && 1 == v.nativehlsinedge ? (log("HLS support ", Hls.isSupported()),
                is_hls = !1) : (1 == v.preload || 1 == v.autoplay || 1 == v.preloadhls || pip) && CreateHLS(!1) : is_hls = !1
            } catch (error) {
                is_hls = !1
            }
        } else
            0 == url.indexOf("ws") && 1 == v.flussonic && (is_ws = !0,
            CreateWS());
        function CheckDash() {
            is_dash = !0,
            MseIsSupported() ? 1 != v.preload && 1 != v.autoplay && 1 != v.preloaddash || CreateDASH(!1) : (is_dash = !1,
            log("DASH not supported"))
        }
        function CreateDASH(t) {
            o.dash && !dash_created && (o.dash.create(t, pjstg, url, pip),
            exist(window.dashjs) && (dash_created = !0))
        }
        function CreateHLS(t) {
            log("HLS"),
            o.files.length > 1 ? (v.hlsquality = 0,
            v.hlsquality_off = !0) : v.hlsquality_off && (v.hlsquality = 1),
            o.audiotracks.length > 1 ? (v.hlsaudio = 0,
            v.hlsaudio_off = !0) : v.hlsaudio_off && (v.hlsaudio = 1),
            o.hls_subs = !1,
            hls_force = -1;
            var e = !1;
            if (v.preroll && 1 == v.hlsvastwait && (e = !0,
            v.hlsvastwait = 0),
            !o.system.tv && v.p2p && "undefined" != typeof p2pml) {
                let t = {
                    loader: {
                        trackerAnnounce: ["wss://awt.vb17121coramclean.pw:8433"],
                        cachedSegmentExpiration: 864e5,
                        cachedSegmentsCount: 1e3,
                        requiredSegmentsPriority: 3,
                        httpDownloadMaxPriority: 9,
                        httpDownloadProbability: .06,
                        httpDownloadProbabilityInterval: 1e3,
                        httpDownloadProbabilitySkipIfNoPeers: !0,
                        p2pDownloadMaxPriority: 50,
                        httpFailedSegmentTimeout: 1e3,
                        simultaneousP2PDownloads: 20,
                        simultaneousHttpDownloads: 3,
                        httpDownloadInitialTimeout: 0,
                        httpDownloadInitialTimeoutPerSegment: 17e3,
                        httpUseRanges: !0
                    },
                    segments: {
                        swarmId: void 0 !== o.plid && o.playlist_dic[o.plid].pjs_id ? o.playlist_dic[o.plid].pjs_id : v.cuid
                    }
                };
                var i = p2pml.core.HybridLoader.isSupported()
                  , s = i ? new p2pml.hlsjs.Engine(t) : void 0;
                v.p2p && i && (v.hlsconfig = {
                    ...v.hlsconfig,
                    liveSyncDurationCount: 20,
                    loader: i ? s.createLoaderClass() : Hls.DefaultConfig.loader
                })
            }
            if (hls_config = {
                debug: 1 == v.hlsdebug && !pip,
                autoStartLoad: (1 == v.preload || 1 == v.autoplay || pip || t) && !e,
                maxBufferLength: 60,
                maxMaxBufferLength: 60,
                manifestLoadingTimeOut: v.hlsmto > 0 ? 1e3 * v.hlsmto : 4e4,
                fragLoadingTimeOut: v.hlsfto > 0 ? 1e3 * v.hlsfto : 4e4,
                enableWorker: !1
            },
            1 == v.hlscltps && (hls_config.capLevelToPlayerSize = !0),
            1 == v.hlscookies && (hls_config.xhrSetup = function(t, e) {
                t.withCredentials = !0
            }
            ),
            exist(v.hlsconfig) && (exist(v.hlsconfig.maxBufferLength) && (v.hlsconfig.maxBufferLength > 600 && (v.hlsconfig.maxBufferLength = 600),
            v.hlsconfig.maxMaxBufferLength = v.hlsconfig.maxBufferLength),
            exist(v.hlsconfig.customBuffer) && (v.hlsconfig.maxMaxBufferLength = v.hlsconfig.maxBufferLength = v.hlsconfig.customBuffer),
            "object" == typeof v.hlsconfig))
                for (var n in v.hlsconfig)
                    hls_config[n] = v.hlsconfig[n];
            hls = o.system.tv ? new HlsTV(hls_config) : new Hls(hls_config),
            !o.system.tv && v.p2p && "undefined" != typeof p2pml && i && p2pml.hlsjs.initHlsJsPlayer(hls),
            js("hls", hls, 1),
            hls.loadSource(url),
            hls.attachMedia(pjstg),
            hls.on(Hls.Events.MEDIA_ATTACHED, (function() {
                log("HLS attached")
            }
            )),
            hls.on(Hls.Events.MANIFEST_LOADED, (function(t, e) {
                !pip && o.actions.MediaReady()
            }
            )),
            hls.on(Hls.Events.MANIFEST_PARSED, (function(t, e) {
                !pip && 1 == v.hlsquality && HlsLevelsLength() > 1 && (HlsQualityLevels(),
                HlsLevel(),
                o.controls && o.controls.QualityChangedNoHand(o.current_quality))
            }
            ));
            var a = !1;
            hls.on(Hls.Events.STREAM_STATE_TRANSITION, (function(t, e) {
                "hlsStreamStateTransition" != t || a || "FRAG_LOADING" == e.previousState && (a = !0,
                gif(`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&type=3&service=p2p`))
            }
            )),
            hls.on(Hls.Events.LEVEL_SWITCH, (function(t, e) {
                HlsLevel()
            }
            )),
            hls.on(Hls.Events.LEVEL_SWITCHED, (function(t, e) {
                HlsLevel()
            }
            )),
            hls.on(Hls.Events.LEVEL_LOADED, (function(t, e) {
                pip || (e.details.live != o.live && (o.live = e.details.live,
                o.controls.refresh()),
                o.live = e.details.live,
                o.live && (log("Live"),
                o.dvr = url.indexOf("?DVR") > -1,
                pjstg.duration > 0 && pjstg.currentTime > 0 && pjstg.duration - pjstg.currentTime < 10 && (o.hls_stuck_time > 0 ? o.hls_stuck_time == pjstg.currentTime && o.hls_stuck_duration == pjstg.duration ? (o.stuck++,
                o.stuck > 2 && (o.stuck = 0,
                o.hls_stuck_time = -1,
                hls.destroy(),
                CreateHLS(!0),
                onEnded())) : o.hls_stuck_time = -1 : (o.hls_stuck_time = pjstg.currentTime,
                o.hls_stuck_duration = pjstg.duration)))),
                1 == v.hlsquality && (o.current_quality = hls.loadLevel,
                o.controls && o.controls.QualityChangedNoHand(o.current_quality)),
                HlsUpdateAudio()
            }
            )),
            hls.on(Hls.Events.FRAG_CHANGED, (function(t, e) {
                exist(e.frag) && !pip && js("fragment", e.frag.relurl),
                hls_force > -1 && (hls.nextAutoLevel = hls_force,
                hls_force = -1),
                hls_started = !0,
                hlsTextTracks()
            }
            )),
            hls.on(Hls.Events.FRAG_PARSING_METADATA, (function(t, e) {
                js("fragdata", e, 1)
            }
            )),
            hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (function(t, e) {
                !pip && 1 == v.hlsaudio && HlsAudioTracks()
            }
            )),
            hls.on(Hls.Events.AUDIO_TRACK_SWITCHING, (function(t, e) {
                pip || 1 != v.hlsaudio || HlsAudioTrack()
            }
            )),
            1 == v.hlssubtracks ? _hlssubtracks = new PluginHlsSubtitles(hls,pip) : hls.subtitleDisplay = !1,
            hls.on(Hls.Events.ERROR, (function(t, e) {
                if (1 == v.log && console.log(e),
                js(e.type + "Hls", e, 0, !0),
                o.hlserror = e,
                e.fatal)
                    switch (e.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        log("HLS fatal network error"),
                        1 == v.livewakeup ? HlsSleep0() : (error = e.details + " (" + e.type + ")",
                        !(o.seekto > 0 || pip || 1 == v.live || is_ws) && (o.seekto = Time()),
                        hls.destroy(),
                        pip || o.media.onError());
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        log("HLS fatal media error, recover"),
                        hls.recoverMediaError();
                        break;
                    default:
                        error = "HLS fatal error, destroy",
                        hls.destroy(),
                        !pip && o.media.onError()
                    }
                else
                    log("HLS ", e.type, e.details, e.response ? e.response.code : ""),
                    js("hls_error", e.response ? e.response.code : ""),
                    is_sleep > 0 && (is_sleep = 2,
                    HlsSleep())
            }
            )),
            hls_created = !0
        }
        function HlsLevel() {
            if (!pip && 1 == v.hlsquality && HlsLevelsLength() > 1 && (o.current_quality != hls.loadLevel && (o.current_quality = hls.loadLevel,
            o.controls && o.controls.QualityChangedNoHand(o.current_quality),
            log("HLS Level " + o.current_quality)),
            exist2(v.forbidden_quality) && o.current_quality > 0))
                for (var t = v.forbidden_quality.split(","), e = 0; e < t.length; e++)
                    if (o.files_quality[o.current_quality].indexOf(t[e]) > -1) {
                        log("regress quality"),
                        hls.currentLevel = o.current_quality - 1,
                        o.current_quality--;
                        break
                    }
        }
        function CreateWS() {
            exist(window.FlussonicMsePlayer) && (MseIsSupported() ? (exist(o.ws) || (o.ws = new PluginWS),
            ws = new FlussonicMsePlayer(pjstg,url,{
                debug: !0
            }),
            ws_created = !0) : (is_ws = !1,
            log("not supported")))
        }
        function hlsTextTracks() {
            Captions()
        }
        function Captions() {
            v.hlscaptions && (pjstg.textTracks.length > 0 ? (1 == v.captions ? pjstg.textTracks[pjstg.textTracks.length - 1].mode = "showing" : pjstg.textTracks[pjstg.textTracks.length - 1].mode = "hidden",
            o.captions || (o.captions = !0,
            o.controls.refresh())) : o.captions && (o.captions = !1,
            o.controls.refresh()))
        }
        function HlsSleep0() {
            log("sleep"),
            !pip && o.play && o.actions.Pause(),
            o.actions.ShowPoster(),
            is_sleep = 1,
            HlsSleep(o.play)
        }
        function HlsSleep(t) {
            is_sleep > 0 && (clearTimeout(sleep_timeout),
            sleep_timeout = setTimeout(HlsLiveWaiting, 1e3 * v.livewakeuptime))
        }
        function HlsLiveWaiting() {
            is_sleep > 0 && (log("watching"),
            is_hls ? (1 == is_sleep && hls.loadSource(url),
            2 == is_sleep && (hls.destroy(),
            CreateHLS(!0),
            pjstg.play())) : attr(pjstg, {
                src: url
            }))
        }
        function onLoadStart() {
            is_hls || is_dash || !pip && o.actions.MediaReady()
        }
        function onTagError() {
            if (!is_hls && !is_dash) {
                if (pjstg.error) {
                    log(pjstg.error, pjstg.error.code, pjstg.error.message);
                    var t = pjstg.error.code;
                    "" == (error = pjstg.error.message) && (1 == t && (error = "aborted"),
                    2 == t && (error = "network"),
                    3 == t && (error = "decode"),
                    4 == t && (error = "not found")),
                    log("Video Error: ", error)
                }
                is_hls2 && 1 == v.livewakeup && (error = void 0,
                HlsSleep0()),
                null != error && onError()
            }
        }
        function onError() {
            !pip && o.media.onError()
        }
        function onEnded() {
            !pip && o.media.onEnded()
        }
        function onPlay() {
            if (!o.start && v.preroll)
                return log("wrong play"),
                pause(),
                void o.actions.Play();
            if (is_hls && is_sleep > 0)
                ;
            else if (!pip) {
                var t = o.actions.isVastBgLoad() && 1 != o.vastfrombg;
                if (t || -1 == pause_before_vast) {
                    var e = !1;
                    is_hls && (exist(o.vast) || exist(o.vastloader)) && (t || (log("pause onplay"),
                    pause(),
                    e = !0)),
                    e || o.media.onPlay()
                }
            }
        }
        function onPause() {
            nops || (log("onpause"),
            o.play && o.actplay && !pjstg.ended && 1 == v.unpause && !o.nativecontrols ? (log("unpause"),
            TagPlay()) : !pip && !o.nopause && pjstg.paused && o.media.onPause())
        }
        function onTimeupdate() {
            !pip && o.media.onTimeupdate(),
            pause_before_vast > -1 && Time() > pause_before_vast && (log("pause ontime", pause_before_vast),
            pause(),
            pause_before_vast = -1)
        }
        function onSeeking() {
            !pip && o.media.onSeeking()
        }
        function onSeeked() {
            !pip && o.media.onSeeked()
        }
        function onMeta() {
            pip ? PipSize() : (o.media.onMeta(),
            PlayerSize(),
            is_hls && is_sleep > 0 && (is_sleep = 0,
            log("wake up"),
            hls.startLoad(),
            TagPlay(),
            o.controls.Play()),
            exist(v.ratio) && Resize())
        }
        function PipSize() {
            pjstg.videoHeight > 0 ? css(container, {
                height: container.offsetWidth / (pjstg.videoWidth / pjstg.videoHeight) - parseInt(v.pip.border)
            }) : pipto < 20 && (setTimeout(PipSize, 100),
            pipto++)
        }
        function PlayerSize() {
            1 == v.changeheight && (clearInterval(o.heightInterval),
            o.heightInterval = setInterval(WaitSize, 100),
            WaitSize())
        }
        function WaitSize() {
            pjstg && pjstg.videoHeight > 0 && (o.actions.changeAspect(pjstg.videoWidth / pjstg.videoHeight),
            clearInterval(o.heightInterval))
        }
        function onDuration() {
            !pip && !is_ws && o.media.onDuration()
        }
        function onVolume() {
            !pip && o.media.onVolume()
        }
        function onWaiting() {
            is_hls && is_sleep > 0 || !pip && o.media.onWaiting()
        }
        function onLoadedData() {
            o.actions.LoadedData()
        }
        function MseIsSupported() {
            var t = window.MediaSource = window.MediaSource || window.WebKitMediaSource
              , e = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer
              , o = t && "function" == typeof t.isTypeSupported && t.isTypeSupported(mimeCodec)
              , i = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
            return o && i
        }
        !o.system.tv || 1 != v.autoplay || is_hls || is_dash || is_ws || setTimeout((function() {
            o.actions.MediaReady()
        }
        ), 100),
        1 == v.channels && (exist(o.channels) && o.channels.Close(),
        o.channels = new PlugMediaChannels),
        this.onDash = function() {
            CheckDash()
        }
        ,
        this.captions = function() {
            Captions()
        }
        ,
        pjstg.addEventListener("loadstart", onLoadStart),
        pjstg.addEventListener("error", onTagError),
        pjstg.addEventListener("ended", onEnded),
        pjstg.addEventListener("play", onPlay),
        pjstg.addEventListener("pause", onPause),
        pjstg.addEventListener("timeupdate", onTimeupdate),
        pjstg.addEventListener("seeking", onSeeking),
        pjstg.addEventListener("seeked", onSeeked),
        pjstg.addEventListener("loadedmetadata", onMeta),
        pjstg.addEventListener("volumechange", onVolume),
        pjstg.addEventListener("waiting", onWaiting),
        pjstg.addEventListener("durationchange", onDuration),
        pjstg.addEventListener("loadeddata", onLoadedData),
        pjstg.addEventListener("enterpictureinpicture", onPipEnter),
        pjstg.addEventListener("leavepictureinpicture", onPipLeave),
        this.ratio = function() {
            return pjstg.videoWidth / pjstg.videoHeight
        }
        ;
        var span05 = "<span style='opacity:0.5'>", playtry;
        function HlsQualityLevels() {
            if (!0 === (new System).tv && (v.hlsautomax = 1,
            v.hlsautoquality = 0),
            !pip && 1 == v.hlsquality) {
                var t = hls.levels
                  , e = -1;
                if (o.files_quality = [],
                t.length > 1) {
                    for (var i = 0; i < t.length; i++) {
                        if (exist(t[i].height)) {
                            var s = o.media.renameQualities(t[i], v.nameofhlsquality);
                            if (o.files_quality.indexOf(s) > -1 || 1 == v.hlsaddbitrate) {
                                if (exist(t[i].bitrate)) {
                                    var n = o.files_quality.indexOf(s);
                                    n > -1 && (o.files_quality[n] += " " + span05 + " &nbsp;" + parseInt(t[n].bitrate / 1e3) + " " + Lang("kbps") + "</span>"),
                                    o.files_quality[i] = s + " " + span05 + " &nbsp;" + parseInt(t[i].bitrate / 1e3) + " " + Lang("kbps") + "</span>"
                                }
                            } else
                                o.files_quality[i] = s;
                            exist(t[i].audioGroupIds) && (o.files_quality_ag[i] = t[i].audioGroupIds[0])
                        } else
                            exist(t[i].name) ? o.files_quality[i] = t[i].name : o.files_quality[i] = i;
                        exist(v.default_quality) && -1 == e && v.default_quality == o.files_quality[i] && (e = i),
                        exist(o.default_quality) && o.default_quality == o.files_quality[i] && (e = i)
                    }
                    1 == v.hlsautomax && (e = hls.levels.length - 1),
                    1 == v.hlsautoquality ? o.files_quality[t.length] = Lang("auto") : (hls.autoLevelEnabled = 0,
                    hls.autoLevelCapping = 0),
                    1 == v.hlslowquality || e > -1 ? (hls.autoLevelCapping = 0,
                    "next" == v.hlschangequality || !o.start && 0 == v.preload ? hls.nextLevel = e : "current" == v.hlschangequality && (hls.currentLevel = e),
                    o.current_quality = e) : 1 == v.hlsautoquality ? o.current_quality = hls.levels.length - 1 : o.current_quality = hls.firstLevel,
                    HlsUpdateAudio()
                }
                o.bitrate = existv(hls.levels[o.current_quality].bitrate, 0),
                o.controls && o.controls.refresh()
            }
        }
        function HlsUpdateAudio() {
            o.files_quality_ag.length > 0 && 1 == v.hlsaudio && (HlsAudioTracks(),
            HlsAudioTrack())
        }
        function HlsAudioTracks() {
            if (!pip && 1 == v.hlsaudio) {
                var t, e = hls.audioTracks;
                if (o.files_audiotrack = [],
                e.length > 1)
                    for (var i = 0; i < e.length; i++) {
                        if (t = !1,
                        exist(e[i].groupId) && o.files_quality_ag.length > 0 && e[i].groupId != o.files_quality_ag[o.current_quality])
                            for (var s = 0; s < o.files_quality_ag.length; s++)
                                o.files_quality_ag[s] == e[i].groupId && (t = !0);
                        t || (o.files_audiotrack[i] = exist(e[i].name) ? o.media.renameTracks(e[i].name) : i,
                        exist(v.default_audio) && v.default_audio == o.files_audiotrack[i] && (o.current_audiotrack = i,
                        hls.audioTrack = i))
                    }
            }
        }
        function HlsAudioTrack() {
            if (!pip) {
                var t = hls.audioTracks
                  , e = hls.audioTrack;
                if (e > -1) {
                    if (exist(t[e].groupId) && o.files_quality_ag.length > 0 && o.files_quality_ag[o.current_quality] != t[e].groupId)
                        for (var i = 0; i < t.length; i++)
                            if (t[i].name == t[e].name && t[i].groupId == o.files_quality_ag[o.current_quality]) {
                                hls.audioTrack = i,
                                e = i;
                                break
                            }
                    o.current_audiotrack = e,
                    log("HLS AudioTrack", o.current_audiotrack),
                    o.controls.AudioTrackChangedNoHand(o.current_audiotrack)
                }
            }
        }
        function Time() {
            return is_dash ? dash_created ? o.dash.time() : 0 : pjstg.currentTime
        }
        function Duration() {
            var t = pjstg.duration;
            return is_dash && dash_created && (t = o.dash.duration()),
            exist(v.end) && (t = v.end),
            t == 1 / 0 || isNaN(t) ? 0 : t
        }
        function TagPlay() {
            if ("none" != url) {
                var t = pjstg.play();
                void 0 !== t && t.then((function() {}
                )).catch((function(t) {
                    if (log("playError", t.message),
                    -1 == t.message.indexOf("source") && -1 == t.message.indexOf("interrupted by"))
                        if (1 == v.autoplaymute) {
                            log("automute"),
                            o.actions.Mute(),
                            pjstg.volume = 0;
                            var e = pjstg.play();
                            e && e.then((function() {}
                            )).catch((function(t) {
                                log("playError2", t.message),
                                o.system.tv && (is_hls || is_dash) || (o.controls.Pause(),
                                o.actions.ShowPoster(),
                                js("autoplay_denied"))
                            }
                            ))
                        } else
                            o.controls.Pause(),
                            o.actions.ShowPoster()
                }
                ))
            }
        }
        function pause() {
            is_ws ? ws.pause() : pjstg.pause()
        }
        function isAuto() {
            var t = !1;
            return is_hls ? hls_created && (t = hls.autoLevelEnabled) : is_dash && dash_created && (t = o.dash.auto()),
            t
        }
        function tagSrc() {
            if (o.system.safari) {
                var t = pjstg.textTracks;
                if (t)
                    for (var e = 0; e < t.length; e++)
                        t[e].mode = "disabled";
                if (t = pjstg.audioTracks)
                    for (e = 0; e < t.length; e++)
                        t[e].enabled = 0 == e ? 1 : 0;
                window.WebKitPlaybackTargetAvailabilityEvent && (pjstg.addEventListener("webkitplaybacktargetavailabilitychanged", (function(t) {
                    o.airplay = "available" == t.availability,
                    !pip && o.actions.AirplayChanged()
                }
                )),
                pjstg.addEventListener("webkitcurrentplaybacktargetiswirelesschanged", (function(t) {}
                )))
            }
            CheckPip()
        }
        function CheckPip() {
            o.system.webkit && (exist(pjstg.webkitSupportsPresentationMode) && !o.system.iphone && (o.pipwebkit = !0),
            document.pictureInPictureEnabled && !pjstg.disablePictureInPicture && (o.pipwebkit = !0))
        }
        function PipWebkit() {
            o.system.safari ? "picture-in-picture" === pjstg.webkitPresentationMode ? (pjstg.webkitSetPresentationMode("inline"),
            o.ispipkit = !1) : (pjstg.webkitSetPresentationMode("picture-in-picture"),
            o.ispipkit = !0) : document.pictureInPictureElement ? eval("document.exitPictureInPicture().then(ok =>{o.ispipkit = false;}).catch(error => {});") : eval("pjstg.requestPictureInPicture().then(p => {o.ispipkit = true;}).catch(error => {o.ispipkit = false;});")
        }
        function onPipEnter() {
            o.ispipkit = !0
        }
        function onPipLeave() {
            o.ispipkit = !1
        }
        function HlsLevelsLength() {
            var t = 0;
            return hls_created && hls.levels && (t = hls.levels.length),
            t
        }
        function ObjectFit() {
            pjstg && (1 == v.covervideo || 1 == v.fill ? 1 == v.fillvideo || 1 == v.fill ? css(pjstg, {
                "object-fit": "fill"
            }) : css(pjstg, {
                "object-fit": "cover"
            }) : css(pjstg, {
                "object-fit": "contain"
            }))
        }
        function Resize() {
            v.ratio && api("scale", String(v.ratio).replace("/", ":"))
        }
        function DashLevelsLength() {
            var t = 0;
            return dash_created && (t = o.dash.levels()),
            t
        }
        function iOSTrackLoaded(t) {
            if (t.target.label && o.sbt)
                for (var e = 0; e < o.files_subtitle.length; e++)
                    o.files_subtitle[e] == t.target.label && o.sbt.SetSubtitle(e)
        }
        this.Play = function() {
            var t = !0;
            is_hls && !hls_started && (hls_created || CreateHLS(!0),
            hls.startLoad()),
            is_dash && !dash_created && (CreateDASH(!0),
            t = !1),
            is_ws && (ws_created || CreateWS(),
            ws.play(),
            t = !1),
            "-2000px" == pjstg.style.top && this.AfterVast(),
            t && TagPlay()
        }
        ,
        this.BeforeVast = function() {
            (o.vastloader || o.vast) && (o.ispipkit && PipWebkit(),
            !o.airplayed && o.system.mobile && o.system.webkit && (pjstg.muted || (pjstg.muted = !0,
            unmuteplease = !0),
            css(pjstg, {
                position: "absolute",
                left: -2e3,
                top: -2e3
            }),
            pause_before_vast = Time(),
            is_ws || pjstg.play(),
            0 == pause_before_vast && o.seekto > 0 && (_seekaftervast = o.seekto)))
        }
        ,
        this.AfterVast = function() {
            o.airplayed || !o.system.mobile && !o.system.webkit || (css(pjstg, {
                position: "static",
                left: 0,
                top: 0
            }),
            exist(v.ratio) && Resize(),
            unmuteplease && (!o.muted && (pjstg.muted = !1),
            unmuteplease = !1),
            _seekaftervast > 0 && (o.seekto = _seekaftervast,
            _seekaftervast = 0),
            pause_before_vast = -1)
        }
        ,
        this.Pause = function() {
            log("paused"),
            pause()
        }
        ,
        this.Toggle = function() {
            pjstg.paused ? TagPlay() : Pause()
        }
        ,
        this.Seek = function(t) {
            is_dash && dash_created ? o.dash.seek(t) : (is_hls && 1 == v.hlsforce && t > 0 && isAuto() && (hls_force = hls.currentLevel,
            hls.nextAutoLevel = 0),
            pjstg.currentTime = t)
        }
        ,
        this.Mute = function() {
            pjstg.muted = !0
        }
        ,
        this.Unmute = function() {
            pjstg.muted = !1,
            "hls" == o.file_type && o.system.ios && 1 == v.vast && (exist(o.um1) || (nops = !0,
            pjstg.pause(),
            setTimeout((function() {
                pjstg.play(),
                nops = !1
            }
            ), 10),
            o.um1 = !0))
        }
        ,
        this.Volume = function(t) {
            pjstg.volume = t
        }
        ,
        this.Gain = function() {
            if (o.gainedsource != pjstg) {
                var t, e;
                if (o.audiosrc[pjstg])
                    t = o.audiosrc[pjstg],
                    e = o.audioctx[pjstg];
                else if (window.AudioContext = window.AudioContext || window.webkitAudioContext,
                exist(window.AudioContext))
                    try {
                        t = (e = new AudioContext).createMediaElementSource(pjstg),
                        o.audiosrc[pjstg] = t,
                        o.audioctx[pjstg] = e
                    } catch (t) {
                        log(t)
                    }
                if (e) {
                    var i = e.createGain();
                    i.gain.value = v.volumegain,
                    t.connect(i),
                    i.connect(e.destination),
                    o.gained = !0,
                    o.gainedsource = pjstg
                }
            }
        }
        ,
        this.isPlaying = function() {
            return !pjstg.paused
        }
        ,
        this.isLive = function() {
            return !(1 != v.live && !is_ws) || o.live
        }
        ,
        this.tag = function() {
            return pjstg
        }
        ,
        this.nativeControls = function() {
            return attr(pjstg, {
                controls: "1"
            }),
            !0
        }
        ,
        this.preload = function() {
            attr(pjstg, {
                preload: "metadata"
            }),
            is_hls && !hls_created && CreateHLS(!1),
            is_dash && !dash_created && CreateDASH(!1)
        }
        ,
        this.status = function() {
            var t = "playing";
            return pjstg.paused && (t = "paused"),
            pjstg.ended && (t = "ended"),
            t
        }
        ,
        this.ChangePip = function(t, e) {
            pip = t,
            e.appendChild(pjstg),
            container = e,
            t ? (1 != v.pip.nomute ? pjstg.muted = !0 : o.muted || (pjstg.muted = !1),
            PipSize(),
            o.files_quality.length > 0 && is_hls && (pip_quality = o.current_quality,
            hls.autoLevelCapping = 0,
            hls.currentLevel = 0)) : (o.muted || 1 == v.pip.nomute || (pjstg.muted = !1),
            pjstg.volume = v.volume,
            PlayerSize(),
            o.files_quality.length > 0 && is_hls && (hls.autoLevelCapping = -1,
            pip_quality > -1 && pip_quality < hls.levels.length && (hls.nextLevel = pip_quality)))
        }
        ,
        this.time = function() {
            return Time()
        }
        ,
        this.duration = function() {
            return Duration()
        }
        ,
        this.loaded = function() {
            var t = 0;
            if (pjstg.buffered && pjstg.buffered.length > 0) {
                for (var e = Time(), o = 0; o < pjstg.buffered.length; o++)
                    (e >= pjstg.buffered.start(o) || e >= pjstg.buffered.start(o) - 100) && e <= pjstg.buffered.end(o) && (t = pjstg.buffered.end(o));
                0 == t && (t = pjstg.buffered.end(pjstg.buffered.length - 1))
            }
            return exist(v.end) && t > v.end && (t = v.end),
            t
        }
        ,
        this.auto = function() {
            return isAuto()
        }
        ,
        this.size = function() {
            return {
                width: pjstg.videoWidth,
                height: pjstg.videoHeight
            }
        }
        ,
        this.src = function(t) {
            t = t.replace(/\(random\)/g, Math.random()),
            url = t,
            2 != o.media_error && (o.media_error = !1),
            is_dash ? dash_created && o.dash.source(t) : is_hls ? (is_hls && hls && hls.destroy(),
            CreateHLS(!0),
            CheckPip()) : (attr(pjstg, {
                src: t,
                autoplay: 0
            }),
            tagSrc(),
            pause())
        }
        ,
        this.airplay = function() {
            pjstg.webkitShowPlaybackTargetPicker()
        }
        ,
        this.pipwebkit = function() {
            PipWebkit()
        }
        ,
        this.setDashQuality = function(t) {
            dash_created && o.dash.setQuality(t)
        }
        ,
        this.setDashAudioTrack = function(t) {
            dash_created && pjstg.buffered.length > 0 && o.dash.setAudio(t)
        }
        ,
        this.setWsQuality = function(t) {
            o.ws && o.ws.setTracks(ws, t, -1)
        }
        ,
        this.setWsAudioTrack = function(t) {
            o.ws && o.ws.setTracks(ws, -1, t)
        }
        ,
        this.setHlsQuality = function(t) {
            if (hls_created) {
                var e = parseInt(t);
                t == hls.levels.length && (e = -1,
                hls.autoLevelCapping = -1),
                "current" == v.hlschangequality && (setTimeout(onWaiting, 500),
                hls.currentLevel = e),
                "next" == v.hlschangequality && (log("HLS next level " + e),
                hls.nextLevel = e),
                -1 == e && (o.current_quality = hls.loadLevel),
                HlsUpdateAudio()
            }
        }
        ,
        this.getHLS = function() {
            return hls
        }
        ,
        this.getDASH = function() {
            return !!dash_created && o.dash.getDash()
        }
        ,
        this.HlsLevelsLength = function() {
            return HlsLevelsLength()
        }
        ,
        this.DashLevelsLength = function() {
            return DashLevelsLength()
        }
        ,
        this.ObjectFit = function() {
            ObjectFit()
        }
        ,
        this.resize = function() {
            Resize()
        }
        ,
        this.setHlsAudioTrack = function(t) {
            hls_created && (hls.audioTrack = parseInt(t))
        }
        ,
        this.hlsDashSub = function(t, e) {
            "hls" == e && hls_created && _hlssubtracks && _hlssubtracks.HlsSubTrack(t),
            "dash" == e && dash_created && o.dash.subtrack(t)
        }
        ,
        this.setSpeed = function(t) {
            t && (pjstg.playbackRate = t)
        }
        ,
        this.removeTracks = function() {
            for (var t = pjstg.childNodes, e = [], o = 0; o < t.length; o++)
                "track" == t[o].tagName.toLowerCase() && (t[o].removeEventListener("load", iOSTrackLoaded),
                e.push(t[o]));
            for (o = 0; o < e.length; o++)
                pjstg.removeChild(e[o])
        }
        ,
        this.addTrack = function(t, e, o) {
            if ("" != t) {
                if (t.indexOf(" or ") > 0) {
                    var i = t.split(" or ");
                    t = i[0]
                }
                var s = document.createElement("track");
                s.setAttribute("src", t),
                s.setAttribute("label", e),
                s.setAttribute("kind", "subtitles"),
                s.setAttribute("mode", "showing"),
                o && s.setAttribute("default", ""),
                pjstg.appendChild(s),
                s.addEventListener("load", iOSTrackLoaded)
            }
        }
        ,
        this.errorMessage = function() {
            return error || ""
        }
        ,
        this.Remove = function() {
            clearInterval(o.dashInterval),
            is_hls && hls && hls.destroy(),
            is_dash && dash_created && o.dash.reset(),
            is_ws && ws && ws.stop(),
            pjstg.removeEventListener("error", onTagError),
            pjstg.removeEventListener("ended", onEnded),
            pjstg.removeEventListener("play", onPlay),
            pjstg.removeEventListener("pause", onPause),
            pjstg.removeEventListener("timeupdate", onTimeupdate),
            pjstg.removeEventListener("seeking", onSeeking),
            pjstg.removeEventListener("seeked", onSeeked),
            pjstg.removeEventListener("loadedmetadata", onMeta),
            pjstg.removeEventListener("volumechange", onVolume),
            pjstg.removeEventListener("waiting", onWaiting),
            pjstg.removeEventListener("durationchange", onDuration),
            pjstg.removeEventListener("enterpictureinpicture", onPipEnter),
            pjstg.removeEventListener("leavepictureinpicture", onPipLeave),
            pjstg.src = "",
            "IFRAME" == container.tagName ? container.contentDocument.body.removeChild(pjstg) : container.removeChild(pjstg),
            pjstg = null
        }
    }
      , Controls = function() {
        var b = [], butNames = [], butPosition = [], waiting = !1, wait_to, toolbarHidden = !1, settings, playlist, _lastactbut;
        for (var i in o.settings2 && (o.settings2.hide(),
        o.settings2 = null),
        o.files_speed = [.25, .5, .75, 1, 1.25, 1.5, 2],
        1 == v.settings.customspeeds && exist(v.settings.speeds) && (v.settings.speeds = v.settings.speeds.replace(/\n/gi, ""),
        o.files_speed = v.settings.speeds.split(",")),
        o.speed1 = o.files_speed.indexOf("1") > -1 ? o.files_speed.indexOf("1") : o.files_speed.indexOf(1),
        3 == o.current_speed && (o.current_speed = o.speed1),
        o.menuproc)
            o.menuproc.hasOwnProperty(i) && (!exist(v.settings[i]) && (v.settings[i] = 5),
            o["files_" + i] = ["+ " + v.settings[i] + "%", "&ndash; " + v.settings[i] + "%", 100 * o.menuproc[i] + "%"]);
        1 == v.toolbar.hidejustfull && o.system.ios && 1 == v.nativefullios && (v.toolbar.hide = 0);
        var resizeonwidth = !1, stretch_width = 0, stretch_width_last = 0, stretch_with_volume = !1, firstly = !0, uijs, bg = new ControlsBg, settings, order = [], _rights = !1, _move_rights = !1, _max_order = 0, _rb = [];
        for (var y in "controls-right" == v.control_line.position && (v.control_line.position = "controls"),
        v)
            v.hasOwnProperty(y) && 0 == y.indexOf("control_") && v[y] && (exist(v[y].order0) ? v[y].order = v[y].order0 : v[y].order0 = v[y].order,
            order[v[y].order] = y,
            "controls" != v.control_line.position && ("controls-right" == v[y].position ? (_rb.push([y, v[y].order]),
            _rights = !0) : "controls" != v[y].position && null != v[y].position || _rights && (_move_rights = !0)),
            _max_order < v[y].order && (_max_order = v[y].order));
        if (_move_rights) {
            _rb.sort((function(t, e) {
                return t[1] - e[1]
            }
            ));
            for (var i = 0; i < _rb.length; i++)
                order[v[_rb[i][0]].order] = null,
                v[_rb[i][0]].order = _max_order + 1,
                _max_order++,
                order[v[_rb[i][0]].order] = _rb[i][0]
        }
        1 == v.toolbar.hide && 1 == v.toolbar.hidedown && (o.toolbar = createElement("div"),
        o.frame.appendChild(o.toolbar),
        css(o.toolbar, {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            transition: "top 0.3s ease-out",
            "pointer-events": "none"
        }));
        var bg2 = createElement("div");
        1 == v.toolbar.hide && 1 == v.toolbar.hidedown ? o.toolbar.appendChild(bg2) : o.frame.appendChild(bg2),
        css(bg2, {
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: v.toolbar.h
        }),
        bg2.onclick = function() {
            !o.system.mobile && o.actions.ControlsBgClick()
        }
        ,
        o.hidecontrols && (hide2(bg.c()),
        hide2(bg2));
        for (var i = 1; i < order.length; i++)
            if (order[i]) {
                var y = order[i];
                if (y) {
                    var action = v[y].action;
                    if (o.system.mobile && ("volume" == action && "speed" == v[y].customline || ("volume" == action && 1 == v.showvolmobile && o.system.mobile ? v[y].hideoutmute = 0 : ("volume" == action || "fullscreen" == action && v.nativemobile) && (v[y].on = 0))),
                    o.hidecontrols && (v[y].on = 0),
                    1 == v[y].on) {
                        if ("line" == action || "volume" == action ? (b[y] = new ControlLine(y,action),
                        b[y].Resize(b[y].s("w"))) : b[y] = new Control(y),
                        butNames.push(y),
                        "title" == b[y].g("action") && "" == b[y].s("text") && ("" != b[y].s("var") && exist(v[b[y].s("var")]) || b[y].set("display", !1)),
                        "custom" == b[y].g("action")) {
                            var lu = b[y].s("linkurl");
                            if (lu && 0 == lu.indexOf("api:") && lu.indexOf(",0/1") > 0) {
                                var z = lu.split(",");
                                0 == api(z[0].substr(4)) && b[y].CustomSwitch(0)
                            }
                        }
                        b[y].set("scale", b[y].s("scale"))
                    }
                }
            }
        function ControlX(t) {
            var e = 0;
            if (t)
                if ("line" == t.g("action"))
                    e = butPosition.left + t.s("marginleft"),
                    null != butPosition.rightbs || (butPosition.rightbs = []);
                else if (null != butPosition.rightbs) {
                    var i = t.g("width") + t.s("marginright") + t.s("marginleft");
                    HideProof(t) && (i = 0),
                    1 != t.s("hidden") || t.g("show") || (i = 0),
                    t.s("vertical") > 0 && (i = 0),
                    e = bg.g("w") - 1 * v.toolbar.leftandrightpadding - i + t.g("width") / 2 + t.s("marginleft");
                    var s = 0;
                    for (butPosition.right -= i,
                    s = 0; s < butPosition.rightbs.length; s++) {
                        var n = b[butPosition.rightbs[s]];
                        n.s("vertical") > 0 ? css(n.c(), {
                            left: n.g("x0") - i
                        }) : css(n.c(), {
                            left: n.g("x") - i
                        }),
                        n.set("x0", n.g("x"))
                    }
                    butPosition.rightbs.push(t.g("key")),
                    t.set("rightside", 1)
                } else if (1 != t.s("hidden") || t.g("show"))
                    if (t.s("vertical") > 0)
                        e = butPosition.left + t.s("marginleft") + t.s("marginright");
                    else {
                        var a = !1;
                        "volume" == t.g("action") && 1 == t.s("hide") && 1 == t.s("hideoutmute") && (o.hidden_volume_over_process || o.hidden_volume_over ? stretch_with_volume || (stretch_width -= t.g("width") + t.s("marginleft") + t.s("marginright"),
                        stretch_with_volume = !0) : (a = !0,
                        stretch_with_volume = !1)),
                        HideProof(t) && (a = !0),
                        a ? e = butPosition.left : (butPosition.left += t.g("width") / 2 + t.s("marginleft"),
                        e = butPosition.left,
                        butPosition.left += t.g("width") / 2 + t.s("marginright"))
                    }
                else
                    "volume" == t.g("action") && 1 == t.s("hide") && 1 == t.s("hideoutmute") && stretch_with_volume && (stretch_width += t.g("width") + t.s("marginleft") + t.s("marginright"),
                    stretch_with_volume = !1);
            return e
        }
        function CreateShare() {
            o.shareme && "function" == typeof PluginShare && (o.share = new PluginShare)
        }
        function ControlCoordinate(t) {
            var e = o.fullscreen && 0 == v.toolbar.stretchonfullscreen ? o.normal_w : o.screen_w
              , i = o.screen_h
              , s = 0;
            t != bg && (s = e / 2 + t.s("marginleft") - t.s("marginright"));
            var n = i / 2
              , a = t.g("width")
              , r = t.g("height")
              , l = t.s("position");
            if (l.indexOf("center") > -1 && (s = o.screen_w / 2 + t.s("marginleft") - t.s("marginright")),
            0 == l.indexOf("top") && (n = r / 2 + t.s("marginproctop") * o.screen_h / 100),
            0 == l.indexOf("bottom") && (n = o.screen_h - (t == bg ? r : r / 2) - t.s("marginprocbottom") * o.screen_h / 100),
            l.indexOf("right") > -1 && (s = o.screen_w - a / 2 + t.s("marginleft") - t.s("marginright") - t.s("marginprocright") * o.screen_w / 100),
            l.indexOf("left") > -1 && (s = a / 2 + t.s("marginleft") - t.s("marginright") + t.s("marginprocleft") * o.screen_w / 100),
            "timeline" == l && (s = -o.timeline_w / 2 + t.s("marginprocleft") * o.timeline_w / 100 + t.s("marginleft") - t.s("marginright"),
            n = -o.timeline_h / 2 - t.s("marginprocbottom") * o.timeline_h / 100 + t.s("marginproctop") * o.timeline_h / 100),
            l.indexOf("controls") > -1) {
                var d = ControlX(t);
                s = (bg && bg.c() ? int(bg.c().offsetLeft) : 0) + d,
                "controls-right" == l && (s += stretch_width),
                n = "top" == v.toolbar.position ? v.toolbar.h / 2 - (v.toolbar_margintop < 0 ? v.toolbar_margintop : 0) : i - v.toolbar.h / 2
            }
            return {
                x: s,
                y: n + t.s("margintop") - t.s("marginbottom")
            }
        }
        function Resize(t) {
            var e = o.fullscreen && 0 == v.toolbar.stretchonfullscreen ? o.normal_w : o.screen_w;
            o.screen_h;
            css(bg.c(), {
                top: ("top" == v.toolbar.position ? 0 : o.screen_h - v.toolbar.h) - v.toolbar_margintop
            }),
            bg.set("y0", o.screen_h - v.toolbar.h - v.toolbar_margintop),
            0 == v.toolbar.stretchonfullscreen && bg && (css(bg.c(), {
                width: e,
                left: 0,
                "margin-left": 0
            }),
            bg.set("w", e),
            o.fullscreen && css(bg.c(), {
                left: "50%",
                "margin-left": -e / 2
            })),
            butPosition = {
                left: 1 * v.toolbar.leftandrightpadding,
                right: bg.g("w") - 1 * v.toolbar.leftandrightpadding
            };
            var i, s = !1;
            bg.g("show") || (bg.set("display", !0),
            s = !0);
            for (var n = 0; n < butNames.length; n++)
                if (i = butNames[n],
                b[i]) {
                    var a = ControlCoordinate(b[i]);
                    a && ("position" == b[i].s("animation") && exist(o.motions[i]) && o.motions[i].XY(b[i].g("x0"), a.x, b[i].g("y0"), a.y),
                    b[i].set("x0", a.x),
                    b[i].set("y0", a.y),
                    1 != b[i].s("hidden") || b[i].g("show") || t ? css(b[i].c(), {
                        position: "absolute",
                        left: b[i].g("x0"),
                        top: b[i].g("y0")
                    }) : HidePositionControl(b[i]))
                }
            for (i in s && bg.set("display", !1),
            stretch_width = 0,
            b) {
                var r;
                if (b.hasOwnProperty(i))
                    if ("controls-right" == b[i].s("position") && "line" != b[i].g("action") && stretch_width > -1 && (stretch_width = butPosition.right - butPosition.left),
                    "line" == b[i].g("action") && bg)
                        1 == b[i].s("customwidth") ? r = b[i].s("w") : b[i].s("position").indexOf("controls") > -1 ? (r = butPosition.right - butPosition.left - b[i].s("marginleft") - b[i].s("marginright"),
                        css(b[i].c(), {
                            left: int(bg.c().offsetLeft) + butPosition.left + b[i].s("marginleft") + r / 2
                        }),
                        stretch_width = -1) : (r = bg.g("w") - b[i].s("marginleft") - b[i].s("marginright"),
                        css(b[i].c(), {
                            left: int(bg.c().offsetLeft) + b[i].s("marginleft") + r / 2
                        })),
                        b[i].set("x0", b[i].g("x")),
                        b[i].Resize(r)
            }
            settings && ResizeSettings(settings),
            playlist && ResizeSettings(playlist),
            (resizeonwidth || o.fullscreen || stretch_width_last != stretch_width) && ShowOrHide()
        }
        function HidePositionControl(t) {
            var e = 0
              , i = 0;
            t.s("position").indexOf("right") > -1 && -1 == t.s("position").indexOf("controls") && (e = o.screen_w + t.g("width") + 10),
            t.s("position").indexOf("left") > -1 && (e = -t.g("width") - 10),
            t.s("position").indexOf("top") > -1 && (i = 2 * -t.g("height")),
            (t.s("position").indexOf("bottom") > -1 || t.s("position").indexOf("controls") > -1) && (i = o.screen_h + t.g("height") + t.g("width") + 10),
            e > 0 && css(t.c(), {
                left: e
            }),
            i > 0 && css(t.c(), {
                top: i
            })
        }
        function ResizeSettings(t) {
            var e = -2e3;
            t.resizePlaylist();
            var i = o.screen_h - v.toolbar.h * (t.s("position").indexOf("top") > -1 ? 1 : 2);
            t == playlist && 1 == v.change2playlist && (i = o.screen_h);
            var s = i - (o.fullscreen && !o.system.mobile ? 100 + 1 * t.s("hmaxk") : t.s("hmaxk")) - (t == playlist && 1 * t.s("hmaxk") == 0 ? t.s("margintop") : 0);
            if (s < 100 && (s = 100),
            css(t.c(), {
                "max-height": s
            }),
            t.co() && css(t.co(), {
                "max-height": s
            }),
            t.g("show") && (e = o.screen_h / 2 - t.g("height") / 2 + t.s("margintop") - t.s("marginbottom"),
            t.s("position").indexOf("top") > -1 && (e = t.s("margintop") - t.s("marginbottom")),
            t.s("position").indexOf("bottom") > -1 && (e = o.screen_h - ("top" != v.toolbar.position ? v.toolbar.h : 0) - t.g("height") + t.s("margintop") - t.s("marginbottom")),
            e < 0 && (e = 0)),
            "settings" == t.g("key") && o.sttx) {
                var n = o.screen_w - t.g("width") - t.s("marginright");
                o.sttx > n ? css(t.c(), {
                    position: "absolute",
                    right: t.s("marginright"),
                    left: "auto",
                    top: e
                }) : css(t.c(), {
                    position: "absolute",
                    left: o.sttx,
                    right: "auto",
                    top: e
                })
            } else if (t.s("position").indexOf("right") > -1)
                css(t.c(), {
                    position: "absolute",
                    right: t.s("marginright") - t.s("scrollwidth"),
                    left: "auto",
                    top: e
                });
            else if (t.s("position").indexOf("left") > -1)
                css(t.c(), {
                    position: "absolute",
                    left: t.s("marginleft"),
                    right: "auto",
                    top: e
                });
            else if ("playlist" == t.g("key") && 1 == t.s("floatleft"))
                css(t.c(), {
                    position: "absolute",
                    left: o.screen_w / 2 - t.g("width") / 2 + t.s("marginleft") / 2 - t.s("marginright") / 2,
                    top: e
                });
            else {
                var a = o.screen_w / 2 - t.g("width") / 2 + t.s("marginleft") - t.s("marginright");
                css(t.c(), {
                    position: "absolute",
                    left: a > 0 ? a : 0,
                    top: e
                })
            }
            t.Arrows()
        }
        function Action(but, type) {
            o.acted = !0,
            _lastactbut = but;
            var a = but.g("action");
            if ("play" == a ? (o.actions.Play(),
            1 == v.hotkey.on && 1 == v.hotkey.icons && 1 == v.hotkey.playiconbut && PluginHotIcon("play", 1)) : ("pause" == a && (o.rldplay = 0,
            o.actions.Pause(),
            1 == v.hotkey.on && 1 == v.hotkey.icons && 1 == v.hotkey.playiconbut && PluginHotIcon("play", 0)),
            "stop" == a && o.actions.StopMedia()),
            "back" == a && o.actions.Seek(0, !1),
            "fullscreen" == a ? !o.casting && o.actions.Fullscreen() : "normalscreen" == a && o.actions.Normalscreen(),
            "line" == a) {
                var ld = o.media.duration()
                  , lt = but.g("click") * ld;
                if (v.delete > 0 && (ld -= v.delete,
                lt = but.g("click") * ld + v.delete),
                v.seekwindow > 0 && v.seekwindow / ld <= 1 - but.g("click"))
                    return;
                o.actions.Seek(lt, !0),
                o.continue && (o.continue.write(lt, ld),
                o.seekto > 0 && (o.seekto = void 0))
            }
            if ("volume" == a) {
                var x = but.g("click");
                x < .02 && (x = 0),
                x > 1 && (x = 1),
                "speed" == but.s("customline") ? (x = parseFloat(x * o.files_speed.slice(-1)[0]).toFixed(1),
                o.actions.SetSpeed(x, 1)) : (o.storage && 1 == v.volumestore && (localStorage.setItem("pljsvolume", x),
                but.g("click") > 0 || o.system.iphone || 0 == v.mutestore ? localStorage.removeItem("pljsmute") : localStorage.setItem("pljsmute", 1)),
                o.actions.Volume(x))
            }
            if ("mute" == a ? (o.storage && !o.system.iphone && 1 == v.mutestore && localStorage.setItem("pljsmute", 1),
            o.actions.Mute(),
            1 == v.hotkey.icons && 1 == v.hotkey.muteiconbut && PluginHotIcon("mute", 0)) : "unmute" == a && (o.storage && localStorage.removeItem("pljsmute"),
            o.actions.Unmute(),
            1 == v.hotkey.icons && 1 == v.hotkey.muteiconbut && PluginHotIcon("mute", 1)),
            0 == a.indexOf("time") && (but.isOn() ? but.Off() : but.On()),
            "rotate" == a && o.media.Rotate(),
            "scale+" == a && o.media.Scale(.1),
            "scale-" == a && o.media.Scale(-.1),
            "scale" == a && o.media.Scale(0),
            "live" == a && (api("restart"),
            but.set("iconopacity", 1),
            but.set("saturate", 1)),
            "share" == a && (js("share"),
            ShowShare()),
            "settings" == a && (o.sttx = void 0,
            settings && (settings.g("show") ? settings.hide() : settings.show())),
            "playlist" == a) {
                if (o.overopentimeout == a)
                    return;
                exist(v.playlist) && (playlist.g("show") ? playlist.hide() : setTimeout((function() {
                    playlist.show()
                }
                ), 100))
            }
            if ("next" == a && o.controls.PlaylistNext(),
            "prev" == a && o.controls.PlaylistPrev(),
            "custom" == a && 1 == but.s("link") && "" != but.s("linkurl")) {
                var x = trim(but.s("linkurl"));
                if (o.overopentimeout == a + x)
                    return;
                x.indexOf("{time}") > -1 && (x = x.replace("{time}", exist(o.continue) ? o.continue.flag().t : o.media.time())),
                x.indexOf("{file}") > -1 && (x = x.replace("{file}", o.media.currentFile())),
                x.indexOf("{title}") > -1 && (x = x.replace("{title}", v.title.replace(/,/gi, " "))),
                "airplay" == x && o.media.Airplay(),
                "skip" == x && but.s("skip") > 0 && o.actions.Seek(but.s("skip")),
                "seektome" == x && (o.actions.Seek(but.s("marginprocleft") * o.media.duration() / 100),
                !o.play && o.actions.Play()),
                1 == but.s("linkpause") && o.actions.Pause();
                var y = x.split(",");
                if (0 == x.indexOf("api:"))
                    for (var z = x.substr(4).split(";"), i = 0; i < z.length; i++)
                        if (y = z[i].split(","),
                        y.length > 1)
                            "seek" == y[0] && 1 == v.hotkey.icons && 1 == v.hotkey.seekiconbut && PluginHotIcon("seek", y[1] > 0 ? 1 : 0),
                            api(y[0], y[1], but),
                            ("0/1" == y[1] || "1/0" == y[1]) && reRightMenu();
                        else if ("screenshot" == y[0]) {
                            var ss = api(y[0]);
                            if (ss) {
                                if (ss.indexOf("data") > -1) {
                                    if (1 == v.ssfly) {
                                        var img = document.createElement("img");
                                        img.setAttribute("src", ss),
                                        css(img, {
                                            position: "fixed",
                                            right: exist(v.ssflyp) ? v.ssflyp : 20,
                                            bottom: exist(v.ssflyp) ? v.ssflyp : 20,
                                            width: 0,
                                            transition: "width 0.5s cubic-bezier(.75,-0.5,0,1.75)"
                                        }),
                                        img.style.zIndex = 1001,
                                        document.body.appendChild(img),
                                        setTimeout((function() {
                                            css(img, {
                                                width: exist(v.ssflyw) ? v.ssflyw : 200
                                            })
                                        }
                                        ), 1),
                                        img.onclick = function() {
                                            this.parentNode.removeChild(this)
                                        }
                                    }
                                    if (1 == v.ssdown) {
                                        var a = createElement("a");
                                        a.href = ss,
                                        a.download = y[0] + ".jpg",
                                        a.click()
                                    }
                                }
                            } else
                                log(y[0] + " error")
                        } else
                            api(y[0]);
                else
                    0 == x.indexOf("js:") && (x.indexOf("(") > 0 && x.indexOf(")") > 0 ? eval(x.substr(3)) : eval(y[0].substr(3) + "(" + (exist(y[1]) ? '"' + y[1] + '"' : "") + (exist(y[2]) ? ',"' + y[2] + '"' : "") + ")")),
                    0 == x.indexOf("event:") && JsEvent(x.substr(6), o.media.time()),
                    0 == x.indexOf("share:") && o.share && o.share.api(x.substr(6)),
                    0 == x.indexOf("effect:") && o.effects && api("effect", x.substr(7)),
                    0 != x.indexOf("http") && 0 != x.indexOf("/") && 0 != x.indexOf("?") && 0 != x.indexOf("url:") || (0 == x.indexOf("url:") && (x = x.substr(4)),
                    window.open(x, but.s("linktarget"))),
                    0 == x.indexOf("download") && o.actions.Download(),
                    "api:pipwebkit" == x && o.media.PipWebkit();
                if (x.indexOf("settings#") > -1 && settings) {
                    var si = x.substr(9).split(",");
                    if (settings.g("show") && settings.g("open") == si[0])
                        o.sttx = void 0,
                        settings.hide();
                    else {
                        o.sttx = but.g("x") - but.g("width") / 2;
                        for (var i = 0; i < si.length; i++)
                            0 == i && settings.show(),
                            settings.open(si[i])
                    }
                }
                if (x.indexOf("settings:") > -1 && 1 == v.settings.combined && (o.settings2 || (o.settings2 = new PluginSettings2),
                1 == v.settings.showovercontrol ? "over" == type ? o.settings2.show(x) : o.settings2.toggle(x) : type || o.settings2.toggle(x)),
                "unblock" == x) {
                    o.actions.RemoveCurtain(),
                    o.stopkeys = 0,
                    but.set("hide2");
                    var bl = FindBut("linkurl", "block");
                    bl && bl.set("hide2")
                }
                "block" == x && (but.UpdateText("OK"),
                but.s("linkurl2") && (window.location.href = trim(but.s("linkurl2"))))
            }
        }
        function TitlePl() {
            for (var t in b)
                b.hasOwnProperty(t) && "custom" == b[t].g("action") && "text" == b[t].s("type") && b[t].RenewFromTitle(!0)
        }
        function ShowShare() {
            exist(o.share) && o.share.Show()
        }
        function CustomTextButs() {
            if (v.customtext && "object" == typeof v.customtext)
                for (var t in v.customtext)
                    v.customtext.hasOwnProperty(t) && CustomText(t, v.customtext[t])
        }
        function CustomText(t, e) {
            for (var o in b)
                b.hasOwnProperty(o) && "custom" == b[o].g("action") && "text" == b[o].s("type") && b[o].s("dom") == t && (b[o].g("show") && 1 != b[o].s("hidden") || (b[o].set("unhidden"),
                b[o].set("display", !0)),
                b[o].CustomText(e))
        }
        function ShowOrHide() {
            for (var t in b)
                b.hasOwnProperty(t) && "buffer" != b[t].g("action") && ShowOrHideProcessor(b[t]);
            ShowOrHideProcessor(bg),
            stretch_width_last != stretch_width && (stretch_width_last = stretch_width,
            Resize()),
            1 == v.toolbar.hide && 1 == v.toolbar.hidedown && ToolbarDown(!o.starttimeout && !o.mouseHere && !o.fullscreen && o.play && 1 != v.toolbar.hidejustfull && !o.casting)
        }
        function ShowForce() {
            var t = toolbarHidden && 1 == v.toolbar.hidewithoutmoving;
            if (o.play || 1 != v.toolbar.hide || 1 != v.toolbar.hideonpause || (t = !1),
            t) {
                for (var e in b)
                    b.hasOwnProperty(e) && "buffer" != b[e].g("action") && ShowOrHideProcessor(b[e], !1);
                css(o.frame, {
                    cursor: "default"
                }),
                o.fcdef = !0,
                ShowOrHideProcessor(bg, !1),
                bg.g("show") && ToolbarShow(),
                ToolbarDown(!1)
            }
        }
        function HideForce() {
            var t = o.play && 1 == v.toolbar.hidewithoutmoving && !o.mouseDown && !o.controlover;
            if (o.play || 1 != v.toolbar.hide || 1 != v.toolbar.hideonpause || (t = !0),
            settings && settings.g("show") && o.setaction && (t = !1),
            o.casting && (t = !1),
            t) {
                for (var e in b)
                    b.hasOwnProperty(e) && "buffer" != b[e].g("action") && ShowOrHideProcessor(b[e], !0);
                ShowOrHideProcessor(bg, !0),
                bg.g("show") || (toolbarHidden = !0,
                o.media.ToolbarHide(),
                o.play && (css(o.frame, {
                    cursor: "none"
                }),
                o.fcdef = !1)),
                ToolbarDown(!0)
            }
        }
        function HideInterval() {
            1 == v.toolbar.hidewithoutmoving && (1 != v.toolbar.hidejustfull || o.fullscreen || o.fullscreen_process) && (clearInterval(o.toolbarInterval),
            o.toolbarInterval = setInterval(HideForce, 1e3 * (v.toolbar.hideleavetimeout > 0 ? v.toolbar.hideleavetimeout : v.toolbar.hidetimeout)))
        }
        function ShowOrHideProcessor(t, e) {
            var i = !1
              , s = !1
              , n = !1;
            1 == v.toolbar.hide ? (o.starttimeout || o.mouseHere || o.fullscreen || !o.play || 1 == v.toolbar.hidejustfull || o.casting ? (i = !1,
            s = !0) : (i = !0,
            s = !1,
            n = !0),
            exist(e) && !o.casting && (s = !(i = e)),
            1 != v.toolbar.hide || 1 != v.toolbar.hidedown || 0 != t.s("position").indexOf("controls") && "line" != t.s("action") || (i = !1,
            s = !0),
            1 != v.toolbar.hideonpause || o.play || (i = !0,
            s = !1,
            n = !1)) : 1 != t.s("hide") && (s = !0),
            s && !o.fcdef && (css(o.frame, {
                cursor: "default"
            }),
            o.fcdef = !0);
            var a = t.g("action");
            "custom" == a && -1 == t.s("position").indexOf("controls") && (i = !1,
            s = !0),
            o.casting && "line" == a && -1 == o.media.duration() && (i = !0,
            s = !1);
            var r = !1
              , l = HideProof(t);
            if (1 == t.s("hide") && (1 == t.s("hideonleaveandplay") && (n || e || o.play && !o.mouseHere) && (n || e) && (l = !0),
            1 == t.s("hidelap") && o.play && !o.mouseHere && (l = !0),
            1 != t.s("hideonwidth") && 1 != t.s("hideoverwidth") && 1 != t.s("hideonfullscreen") || (resizeonwidth = !0)),
            l ? (i = !0,
            s = !1) : !i && (s = !0),
            "volume" == t.s("action") && 1 == t.s("hide") && 1 == t.s("hideoutmute") && (i = !0,
            s = !1,
            n || !o.hidden_volume_over && !o.hidden_volume_over_process || e || 1 == t.s("hiddenwidth") ? r = !0 : (i = !1,
            s = !0)),
            (o.nativecontrols || !o.start && 1 == v.toolbar.hide && 1 == v.toolbar.hideuntilstarted || !o.metadata && 1 == v.toolbar.hide && 1 == v.toolbar.hideuntilmeta) && ((t.s("position").indexOf("controls") > -1 || t.s("position").indexOf("bottom") > -1) && (i = !0,
            s = !1),
            1 != v.toolbar.hidejustfull || o.fullscreen || (i = !1,
            s = !0)),
            settings && settings.g("show") && 1 != v.settings.always && (n = !1,
            e = !1),
            "share" == a && exist(o.share) && o.share.empty() && (i = !0,
            s = !1,
            t.set("animation", "none")),
            "playlist" != a && "next" != a && "prev" != a && 1 != t.s("hidewithoutplaylist") || (playlist ? playlist.empty() && 0 != t.s("hidewithoutplaylist") && (i = !0,
            s = !1,
            t.set("animation", "none")) : (i = !0,
            s = !1)),
            1 == o.hideall && (i = !0,
            s = !1),
            r) {
                var d = ControlCoordinate(t);
                d && (d.y > 0 && t.set("y0", d.y),
                css(t.c(), {
                    position: "absolute",
                    top: t.g("y0")
                }))
            }
            i && HideControl(t, !!firstly),
            s && ShowControl(t),
            t == bg && (!i && s && (ToolbarShow(),
            show2(bg2),
            toolbarHidden = !1,
            0 == uijs && js("ui", 1),
            uijs = 1,
            o.cut && o.cutted && o.cut.show()),
            !i || s || o.casting || (o.media.ToolbarHide(),
            SettingsClose(),
            hide2(bg2),
            toolbarHidden = !0,
            1 == uijs && js("ui", 0),
            uijs = 0,
            o.cut && o.cutted && o.cut.hide()),
            playlist && (1 != v.playlist.always || playlist.empty() || (s || o.nativecontrols ? 1 == v.playlist.alwaysnotfullscreen && o.fullscreen || playlist.g("show") || (1 == v.playlist.alwaysjustpause ? !o.play && playlist.show() : playlist.show()) : i && playlist.g("show") && playlist.hide())))
        }
        function HideProof(t) {
            var e = !1
              , i = t.g("action");
            if (1 == t.s("hide") && (1 == t.s("hideonplay") && o.play && (e = !0),
            1 == t.s("hideonpause") && !o.play && (e = !0),
            1 == t.s("hideondesktop") && o.system.desktop && (e = !0),
            1 == t.s("hideonmobile") && o.system.mobile && (e = !0),
            1 == t.s("hideoverwidth") && (o.screen_w > t.s("hideoverwidthlimit") ? (t.set("hiddenwidth", 1),
            e = !0) : t.set("hiddenwidth", 0)),
            1 == t.s("hideonwidth") && (o.screen_w <= t.s("hideonwidthlimit") ? (t.set("hiddenwidth", 1),
            e = !0) : t.set("hiddenwidth", 0)),
            1 == t.s("hideafterstart") && o.start && (e = !0),
            1 == t.s("hideafter") && t.s("hideaftersec") > 0 && o.media.time() >= t.s("hideaftersec") && (e = !0),
            1 == t.s("hidebefore") && t.s("hidebeforesec") > 0 && o.media.time() < t.s("hidebeforesec") && (e = !0),
            1 == t.s("hide0timestore") && ((o.start || !o.continue || o.media.isLive()) && (e = !0),
            o.continue && 0 == o.continue.flag().t && (e = !0)),
            1 == t.s("hideuntilstarted") && !o.start && (e = !0),
            t.s("hideuntilto") > 0 && (e = !0),
            1 == t.s("hideonvar") && exist(t.s("hidevar")) && options[t.s("hidevar")] && (e = !0),
            1 == t.s("hideuntiltext") && (exist(t.s("customtext")) || (e = !0)),
            1 == t.s("hidewovar") && exist(t.s("hidevar2")) && !options[t.s("hidevar2")] && (e = !0),
            1 == t.s("hideuntilstartedios") && o.system.ios && (!o.start || o.newfile) && (e = !0),
            1 == t.s("hideuntilended") && !o.media.ended() && (e = !0),
            1 == t.s("hideonvod") && !o.media.isLive() && (e = !0),
            1 == t.s("hideonleave") && !o.mouseHere && (e = !0),
            1 == t.s("hidenormscreen") && !o.fullscreen && (e = !0),
            1 == t.s("hideonfullscreen") && o.fullscreen && (e = !0),
            1 == t.s("hideonunmute") && !o.muted && (e = !0),
            1 == t.s("hideonlive") && o.media.isLive() && -1 == o.media.currentFile().indexOf("?DVR") && (e = !0),
            1 == t.s("hidewithposter") && isVisible(o.poster) && (e = !0),
            1 == t.s("hideuntilmeta") && !o.metadata && (e = !0),
            1 == t.s("hideonmeta") && o.metadata && (e = !0),
            1 == t.s("hidemini") && o.mini && (e = !0),
            1 == t.s("hidenomini") && !o.mini && (e = !0),
            1 == t.s("hideafterclick") && t.g("clicked") && (e = !0),
            1 == t.s("hidenoab") && !o.ab && (e = !0),
            1 == t.s("hideab") && o.ab && (e = !0),
            1 == t.s("hideonyoutube") && 1 == v.preload && 1 == v.screenclick && ("youtube" != o.file_type || exist(v.poster) || 0 != v.youtubeposter || o.start && "ended" != o.media.status() || "" == v.poster || (e = !0))),
            "custom" == i) {
                var s = t.s("linkurl");
                if (s && ("api:airplay" != s && "airplay" != s || o.airplay || o.airplayed || (e = !0),
                "api:pipwebkit" == s && (o.pipwebkit && (o.start || 0 != v.preload) || (e = !0)),
                "api:unfixing" == s && (o.mini || (e = !0)),
                s.indexOf("captions") > -1 && (o.captions || (e = !0)),
                "skip" == s)) {
                    var n = !1;
                    if (exist(v.skip))
                        for (var a = v.skip.split(","), r = 0; r < a.length; r++) {
                            var l = a[r].split("-");
                            2 == l.length && o.media.time() > l[0] && o.media.time() < l[1] && (n = !0,
                            t.set("skip", l[1]))
                        }
                    !n && (e = !0)
                }
            }
            if ("playlist" != i && "next" != i && "prev" != i || (playlist ? playlist.empty() && (e = !0) : e = !0),
            "settings" == i && (settings ? settings.empty() && (e = !0,
            t.set("animation", "none")) : e = !0),
            "text" == t.g("type") && 0 == t.g("length") && (e = !0),
            t.g("settings#") && (t.g("set#visible") || (e = !0)),
            1 == t.s("chromecast")) {
                var d = document.getElementById("pjs_cast_button_" + v.id);
                (0 != o.media.duration() || 0 != o.media.time()) && o.tagvideo && isVisible(d) && o.cast_available || (e = !0)
            }
            return 1 == t.s("hidetime") && !e && t.set("hidetime", 1),
            "duration" == i && o.media.isLive() && (e = !0),
            "control_start" == t.g("key") && o.system.mobile && o.nativecontrols && o.system.android && (e = !0),
            e
        }
        function HideControl(t, e) {
            t.g("show") && (o.fullscreen_process || "none" == t.s("animation") || e ? t.set("display", !1) : HideAnimate(t),
            t.set("show", !1))
        }
        function ShowControl(t) {
            t.g("show") || ("none" == t.s("animation") || o.fullscreen_process ? (t.set("display", !0),
            o.fullscreen_process && "bg" != t.g("key") && t.set("opacity", 1),
            "volume" == t.g("action") && o.hidden_volume && HidePositionControl(t)) : ShowAnimate(t),
            "volume" == t.s("action") && o.controls.Volume(o.muted ? 0 : v.volume),
            "line" == t.s("action") && o.actions.Loading(),
            t.set("show", !0))
        }
        function HideAnimate(t) {
            killMotion(t.g("key"));
            var e = "alpha|"
              , i = "0|"
              , s = t.s("animation")
              , n = t.s("position");
            "scale" == s && (e += "scale|",
            i += "0|"),
            "position" == s && (n.indexOf("right") > -1 && -1 == n.indexOf("controls") && (e += "x|",
            i += int(o.screen_w + t.g("width")) + "|"),
            n.indexOf("left") > -1 && (e += "x|",
            i += int(-t.g("width")) + "|"),
            n.indexOf("top") > -1 && (e += "y|",
            i += "0|" + -t.g("height") + "|"),
            (n.indexOf("bottom") > -1 || n.indexOf("controls") > -1 || "timeline" == n) && (e += "y|",
            "line" == t.g("action") || "volume" == t.g("action") ? i += int(o.screen_h + t.s("h") + (t.s("h") < 20 ? 20 - t.s("h") : 0)) + "|" : i += int(o.screen_h + t.g("height")) + "|"),
            "center" == n && (e += "scale|",
            i += "0|"));
            new Motion({
                mc: t,
                me: t.g("key"),
                type: e.substr(0, e.length - 1),
                to: i.substr(0, i.length - 1),
                hide: 1
            })
        }
        function ShowAnimate(t) {
            killMotion(t.g("key"));
            var e = ""
              , o = ""
              , i = t.s("animation")
              , s = t.s("position");
            if (1 != t.g("opacity") && (e = "alpha|",
            o = ("bg" == t.g("key") ? v.toolbar.a : "1") + "|"),
            "scale" == i && t.g("scaleX") != t.s("scale") && (e += "scale|",
            o += t.s("scale") + "|"),
            "position" == i && ("center" == s ? t.g("scaleX") != t.s("scale") && (e += "scale|",
            o += t.s("scale") + "|") : s.indexOf("controls") > -1 ? t.g("y") != t.g("y0") && (e += "y|",
            o += t.g("y0") + "|") : (e += "x|y|",
            o += t.g("x0") + "|" + t.g("y0") + "|")),
            "" != e && "" != o)
                new Motion({
                    mc: t,
                    me: t.g("key"),
                    type: e.substr(0, e.length - 1),
                    to: o.substr(0, o.length - 1),
                    show: 1
                });
            else
                t.set("display", !0)
        }
        function ToolbarDown(t) {
            1 == v.toolbar.hide && (t && SettingsClose(),
            1 == v.toolbar.hidedown && (o.play || 1 != v.toolbar.hideonpause || (t = !0),
            t && !o.toolbarisdown && css(o.toolbar, {
                top: bg.h()
            }),
            !t && o.toolbarisdown && css(o.toolbar, {
                top: 0
            }),
            o.toolbarisdown = t))
        }
        function ToolbarShow() {
            toolbarHidden = !1,
            o.media.ToolbarShow(),
            o.resizeonmouse && (o.resizeonmouse = !1,
            Resize(),
            setTimeout(Resize, 300))
        }
        function UpdateTime(t, e, o) {
            v.delete > 0 && (e -= v.delete,
            o -= v.delete);
            var i = Time(e);
            "1" == t.s("inversetime") && (i = Time(o - e)),
            "1" == t.s("showduration") && ("1" == t.s("showboth") ? i += o > 0 ? " " + Lang(t.s("separator")) + " " + Time(o) : "" : 0 == e && (i = Time(o))),
            t.UpdateText(i)
        }
        function Waiting() {
            if (!waiting) {
                js("buffering");
                var t = FindBut("action", "buffer");
                t && (t.Buffer(),
                waiting = !0)
            }
        }
        function Volumescrolled() {
            var t = FindBut("linkurl", "volume scroll");
            t && (t.UpdateText(""),
            t.set("hide2"),
            clearTimeout(o.volumescroll))
        }
        function SettingsClose(t) {
            settings && settings.g("show") && settings.hide(t),
            o.settings2 && o.settings2.hide()
        }
        function PlaylistControls() {
            for (var t in b)
                b.hasOwnProperty(t) && ("next" == b[t].g("action") && css(b[t].c(), {
                    opacity: playlist.PlaylistNextExist() ? 1 : .5
                }),
                "prev" == b[t].g("action") && css(b[t].c(), {
                    opacity: playlist.PlaylistPrevExist() ? 1 : .5
                }))
        }
        function SpeedChanged() {
            if (o.line_speed) {
                var t = parseFloat(o.custom_speed / o.files_speed.slice(-1)[0], 1).toFixed(1);
                for (var e in b)
                    b.hasOwnProperty(e) && ("speed" == b[e].s("customline") && o.custom_speed && b[e].UpdatePlay(t, 1),
                    "api:speed,1.0" == b[e].s("linkurl") && b[e].UpdateVolume(t))
            }
        }
        function FindBut(t, e) {
            for (var o in b)
                if (b.hasOwnProperty(o) && b[o].s(t) == e)
                    return b[o]
        }
        function KeyPlusUp(t) {
            "next" == t && (o.playlist ? o.controls.PlaylistNext() : t = "seek"),
            "seek" == t && o.media.duration() > 0 && o.media.time() + parseFloat(v.hotkey.seek) < o.media.duration() && o.actions.Seek(o.media.time() + parseFloat(v.hotkey.seek), !0),
            "volume" == t && (o.actions.Volume(parseFloat(v.volume) + parseFloat(v.hotkey.vol)),
            event.preventDefault()),
            "scale" == t && (o.media.scale(v.hotkey.scale / 100),
            event.preventDefault()),
            1 == v.hotkey.icons && PluginHotIcon(t, 1)
        }
        function KeyPlusDown(t) {
            "next" == t && (o.playlist ? o.controls.PlaylistPrev() : t = "seek"),
            "seek" == t && o.media.duration() > 0 && o.start && o.actions.Seek(o.media.time() - v.hotkey.seek >= 0 ? o.media.time() - v.hotkey.seek : 0, !0),
            "volume" == t && (o.actions.Volume(parseFloat(v.volume) - parseFloat(v.hotkey.vol)),
            event.preventDefault()),
            "scale" == t && (o.media.scale(-v.hotkey.scale / 100),
            event.preventDefault()),
            1 == v.hotkey.icons && PluginHotIcon(t, 0)
        }
        exist(v.settings) && ("function" == typeof Settings ? (settings = new Settings("settings"),
        1 == v.settings.always ? settings.show() : settings.hide()) : o.noset = !0),
        exist(v.playlist) && "function" == typeof Settings && (playlist = new Settings("playlist"),
        exist(o.playlist) ? (playlist.updatePlaylist(o.playlist),
        0 != v.playlist.openplaylistbefore && exist(v.playlist.openplaylistbefore) ? playlist.show() : 0 == v.playlist.always && playlist.hide()) : playlist.hide(1),
        PlaylistControls()),
        CreateShare(),
        CustomTextButs(),
        Resize(!0),
        ShowOrHide(),
        SpeedChanged(),
        firstly = !1,
        this.NewPl = function() {
            CreateShare()
        }
        ,
        this.ControlClick = function(t) {
            var e = b[t]
              , i = e.g("action");
            if (i) {
                var s = new Date;
                o.clicktime = s.getTime(),
                i && "" != i && Action(e)
            }
        }
        ,
        this.toggleControl = function(t, e, o) {
            for (var i in b)
                b.hasOwnProperty(i) && b[i].s(t) == e && b[i].set(o ? "show2" : "hide2")
        }
        ,
        this.butByS = function(t, e) {
            return FindBut(e, t)
        }
        ,
        this.title = function(t) {
            var e = !1;
            for (var i in b)
                b.hasOwnProperty(i) && "title" == b[i].g("action") && (b[i].s("var") != t && "title" != t || (1 == b[i].s("hide") && 1 == b[i].s("hideonplay") && o.play && (e = !0),
                "" == v[t] || e ? b[i].set("display", !1) : b[i].set("display", !0),
                b[i].UpdateText(v[t])));
            TitlePl()
        }
        ,
        this.titlepl = function() {
            TitlePl()
        }
        ,
        this.resizetext = function() {
            for (var t in b)
                b.hasOwnProperty(t) && "custom" == b[t].g("action") && "text" == b[t].s("type") && b[t].ResizeText()
        }
        ,
        this.showShare = function() {
            ShowShare()
        }
        ,
        this.updateTitle = function() {
            if ("" != v.title)
                for (var t in b)
                    if (b.hasOwnProperty(t) && "title" == b[t].g("action")) {
                        var e = !1;
                        b[t].g("show") || (e = !0,
                        b[t].set("display", !0)),
                        b[t].UpdateText(v.title),
                        e && b[t].set("display", !1)
                    }
        }
        ,
        this.customTextPl = function() {
            CustomTextButs()
        }
        ,
        this.customText = function(t, e) {
            CustomText(t, e)
        }
        ,
        this.resize = function() {
            Resize()
        }
        ,
        this.resize2 = function() {
            Resize(!0)
        }
        ,
        this.resizeSettings = function() {
            ResizeSettings(settings)
        }
        ,
        this.resizePlaylist = function() {
            ResizeSettings(playlist)
        }
        ,
        this.Play = function() {
            for (var t in b)
                b.hasOwnProperty(t) && "play" == b[t].g("action") && b[t].On();
            this.PlaylistVisible() && 1 == v.playlist.autohide && this.Playlist(),
            o.play = !0,
            ShowOrHide()
        }
        ,
        this.Pause = function() {
            for (var t in b)
                b.hasOwnProperty(t) && ("pause" != b[t].g("action") && "stop" != b[t].g("action") || b[t].Off());
            playlist && (1 != v.playlist.openplaylistpause || playlist.empty() || playlist.show()),
            o.play = !1,
            this.StopWaiting(),
            ShowOrHide(),
            1 == v.toolbar.hide && 1 == v.toolbar.hideonpause && HideForce(!0)
        }
        ,
        this.Mute = function() {
            for (var t in b)
                b.hasOwnProperty(t) && ("mute" == b[t].g("action") && b[t].On(),
                this.Volume(0));
            ShowOrHide()
        }
        ,
        this.Unmute = function() {
            for (var t in b)
                b.hasOwnProperty(t) && "unmute" == b[t].g("action") && b[t].Off();
            v.volume < .1 ? (v.volume = .5,
            o.actions.Volume(v.volume)) : this.Volume(v.volume),
            ShowOrHide()
        }
        ,
        this.Volume = function(t, e) {
            for (var o in b)
                b.hasOwnProperty(o) && ("volume" == b[o].g("action") && "speed" != b[o].s("customline") && b[o].UpdatePlay(t, 1, "no" != e || e),
                "mute" == b[o].g("action") && b[o].UpdateVolume(t));
            ShowOrHide()
        }
        ,
        this.Fullscreen = function() {
            var t = FindBut("action", "fullscreen");
            t && (t.On(),
            t.set("scale", t.s("scale"))),
            ShowOrHide(),
            resizeonwidth && setTimeout(ShowOrHide, 500),
            HideInterval()
        }
        ,
        this.Normalscreen = function() {
            var t = FindBut("action", "fullscreen");
            t && t.Off(),
            Resize(),
            clearInterval(o.toolbarInterval),
            ShowOrHide()
        }
        ,
        this.onEnded = function() {
            for (var t in b)
                b.hasOwnProperty(t) && "play" == b[t].g("action") && b[t].ReplayIcon()
        }
        ,
        this.Review = function() {
            ShowOrHide()
        }
        ,
        this.Mouse = function(t, e, i) {
            var s = !1
              , n = b[t]
              , a = n.g("action")
              , r = n.s("linkurl");
            if ("over" == e) {
                if (o.hidden_volume && ("volume" == a || "mute" == a || "unmute" == a) && (o.hidden_volume_over = !0,
                o.hidden_volume_over_process = !0,
                s = !0,
                ShowOrHide(),
                1 == v.control_line.hideonvolume)) {
                    var l = FindBut("action", "line");
                    l && hide2(l.c())
                }
                !settings || 1 != v.settings.showovercontrol || "settings" != a && 0 != r.indexOf("setting") && 0 != r.indexOf("settings:") || (clearTimeout(o.settingsovertimer),
                settings.g("show") && _lastactbut == n || (Action(n, e),
                o.overopentimeout = a + r,
                setTimeout((function() {
                    o.overopentimeout = null
                }
                ), 500))),
                playlist && 1 == v.playlist.showovercontrol && "playlist" == a && (clearTimeout(o.playlistovertimer),
                playlist.g("show") && _lastactbut == n || (Action(n, e),
                o.overopentimeout = a,
                setTimeout((function() {
                    o.overopentimeout = null
                }
                ), 500)))
            }
            "out" == e && (o.hidden_volume && ("volume" != a && "mute" != a && "unmute" != a || (o.hidden_volume_over = !1,
            o.hidden_volume_over_process = !0,
            setTimeout((function() {
                if (!o.hidden_volume_over)
                    for (var t in o.hidden_volume_over_process = !1,
                    b)
                        b.hasOwnProperty(t) && ("volume" == b[t].g("action") && (HideControl(b[t]),
                        Resize()),
                        "line" == b[t].g("action") && 1 == v.control_line.hideonvolume && show2(b[t].c()))
            }
            ), 500))),
            1 != v.settings.showovercontrol || "settings" != a && 0 != r.indexOf("setting") && 0 != r.indexOf("settings:") || (clearTimeout(o.settingsovertimer),
            o.settingsovertimer = setTimeout((function() {
                o.mouseDown || SettingsClose(1)
            }
            ), v.settings.showoverto > 0 ? 1e3 * v.settings.showoverto : 1e3)),
            playlist && 1 == v.playlist.showovercontrol && "playlist" == a && (clearTimeout(o.playlistovertimer),
            o.playlistovertimer = setTimeout((function() {
                o.mouseDown || playlist.g("show") && playlist.hide(1)
            }
            ), v.playlist.showoverto > 0 ? 1e3 * v.playlist.showoverto : 1e3))),
            s && setTimeout(Resize, 10)
        }
        ,
        this.StageLeave = function() {
            !o.volumewheel || o.fullscreen || o.fullscreen_process || (o.actions.volumewheel(!1),
            o.volumewheel = !1),
            o.poster && v.poster_aover > -1 && isVisible(o.poster) && css(o.poster, {
                opacity: v.poster_a
            }),
            o.play && 1 == v.playonhover && 0 != v.pauseonhover && o.actions.Pause(),
            v.toolbar.hideleavetimeout > 0 ? (clearTimeout(o.leavetimeout),
            o.leavetimeout = setTimeout(ShowOrHide, 1e3 * v.toolbar.hideleavetimeout)) : ShowOrHide()
        }
        ,
        this.StageOver = function() {
            o.poster && v.poster_aover > -1 && isVisible(o.poster) && css(o.poster, {
                opacity: v.poster_aover
            }),
            o.play || 1 != v.playonhover || o.actions.Play(),
            ShowOrHide(),
            ToolbarDown(!1)
        }
        ,
        this.StageMove = function(t, e) {
            var o;
            for (var i in b)
                b.hasOwnProperty(i) && ("line" != (o = b[i].g("action")) && "volume" != o || b[i].StageMove(t, e))
        }
        ,
        this.StageMove2 = function() {
            if (1 == v.toolbar.hide) {
                if (1 == v.toolbar.hidejustfull && !o.fullscreen)
                    return;
                o.mouseHere && !o.system.mobile || "playing" != o.media.status() || (o.mouseHere = !0,
                ShowOrHide(),
                o.system.mobile && setTimeout((function() {
                    o.mouseHere = !1
                }
                ), 500)),
                1 == v.toolbar.hidewithoutmoving && (ShowForce(),
                HideInterval()),
                ToolbarDown(!1)
            }
        }
        ,
        this.StageMouseUp = function(t, e) {
            for (var o in b)
                b.hasOwnProperty(o) && ("line" != b[o].g("action") && "volume" != b[o].g("action") || b[o].StageMouseUp(t, e))
        }
        ,
        this.Played = function(t, e) {
            for (var o in b)
                b.hasOwnProperty(o) && ("line" == b[o].g("action") && b[o].UpdatePlay(t, e),
                "time" == b[o].g("action") && UpdateTime(b[o], t, e),
                1 == b[o].s("rotateplaying") && b[o].Rotate(),
                1 == b[o].s("often") && (!b[o].g("show") && toolbarHidden || b[o].g("show") == HideProof(b[o]) && ShowOrHide()))
        }
        ,
        this.Loaded = function(t, e) {
            var o = FindBut("action", "line");
            o && o.UpdateLoad(t, e)
        }
        ,
        this.Cut = function(t) {
            if (o.media.duration() > 0) {
                var e = FindBut("action", "line");
                e && e.Cut(t)
            }
        }
        ,
        this.Waiting = function() {
            waiting || (1 == v.hidevideo ? (clearTimeout(wait_to),
            wait_to = setTimeout(Waiting, 500)) : Waiting())
        }
        ,
        this.HideElement = function(t) {
            for (var e in b)
                e == t && b[e].set("hide2")
        }
        ,
        this.StopWaiting = function(t, e) {
            if (clearTimeout(wait_to),
            waiting) {
                js("buffered");
                var o = FindBut("action", "buffer");
                o && (o.BufferStop(),
                waiting = !1)
            }
        }
        ,
        this.volumescroll = function() {
            var t = FindBut("linkurl", "volume scroll");
            t && (t.set("show2"),
            t.UpdateText(Lang("volume") + " " + (o.muted ? 0 : Math.ceil(100 * v.volume)) + "%"),
            clearTimeout(o.volumescroll),
            o.volumescroll = setTimeout(Volumescrolled, 1e3))
        }
        ,
        this.Seek = function(t, e) {
            for (var o in v.delete > 0 && (t -= v.delete,
            e -= v.delete),
            b)
                b.hasOwnProperty(o) && ("line" == b[o].g("action") && (e > 0 && b[o].set("click", t / e),
                b[o].UpdatePlaySeek()),
                "time" == b[o].g("action") && UpdateTime(b[o], t, e),
                "live" == b[o].g("action") && (b[o].set("iconopacity", .5),
                b[o].set("saturate", 0)))
        }
        ,
        this.Duration = function(t, e) {
            for (var o in b)
                b.hasOwnProperty(o) && ("duration" == b[o].g("action") && (v.delete > 0 && (e -= v.delete),
                b[o].UpdateText(Time(e))),
                "line" == b[o].g("action") && (b[o].UpdatePlay(t, e),
                b[o].PlacePoints(e)),
                "time" == b[o].g("action") && UpdateTime(b[o], t, e))
        }
        ,
        this.Settings = function() {
            settings.g("show") ? settings.hide() : settings.show()
        }
        ,
        this.SettingsVisible = function() {
            return !!settings && !!settings.g("show")
        }
        ,
        this.MenuProc = function(t) {
            settings && settings.menuproc(t)
        }
        ,
        this.SettingsClose = function() {
            SettingsClose()
        }
        ,
        this.SettingsTimer = function(t) {
            settings && settings.UpdateTimer(t)
        }
        ,
        this.SettingsSpeed = function() {
            settings && settings.UpdateSpeed()
        }
        ,
        this.SettingsExist = function(t) {
            if (settings)
                return settings.Exist(t)
        }
        ,
        this.Playlist = function() {
            playlist && (playlist.g("show") ? playlist.hide(1) : playlist.show())
        }
        ,
        this.PlaylistShow = function() {
            playlist && setTimeout((function() {
                playlist.show()
            }
            ), 100)
        }
        ,
        this.PlaylistVisible = function() {
            return !!playlist && !!playlist.g("show")
        }
        ,
        this.PlaylistG = function(t) {
            return playlist ? playlist.g(t) : ""
        }
        ,
        this.UpdatePlaylist = function(t) {
            playlist && playlist.updatePlaylist(t)
        }
        ,
        this.PreNewPl = function(t) {
            playlist && playlist.prenewpl(t)
        }
        ,
        this.PlaylistNext = function() {
            playlist && playlist.PlaylistNext()
        }
        ,
        this.PlaylistHere = function() {
            playlist && playlist.PlaylistHere()
        }
        ,
        this.PlaylistControls = function() {
            PlaylistControls()
        }
        ,
        this.PlaylistNextExist = function() {
            return !!playlist && playlist.PlaylistNextExist()
        }
        ,
        this.PlaylistPrevExist = function() {
            return !!playlist && playlist.PlaylistPrevExist()
        }
        ,
        this.PlaylistExist = function() {
            return !!playlist && playlist.PlaylistExist()
        }
        ,
        this.PlaylistRewind = function() {
            playlist && playlist.PlaylistRewind()
        }
        ,
        this.PlaylistPrev = function() {
            playlist && playlist.PlaylistPrev()
        }
        ,
        this.PlaylistPlayId = function(t) {
            t && playlist && playlist.playById(t)
        }
        ,
        this.PlaylistOpenId = function(t) {
            t && playlist && playlist.openById(t)
        }
        ,
        this.PlaylistMove = function(t) {
            t && playlist && (css(playlist.co(), {
                maxHeight: "none",
                "padding-right": playlist.s("bgpaddingright")
            }),
            document.getElementById(t).appendChild(playlist.co()),
            hide2(playlist.c()))
        }
        ,
        this.ShowSettingsBut = function() {}
        ,
        this.QualityChanged = function(t) {
            settings && (settings.SetQuality(),
            settings.g("show") && setTimeout((function() {
                settings.hide()
            }
            ), 200))
        }
        ,
        this.QualityChangedNoHand = function() {
            settings && settings.SetQuality(),
            o.settings2 && o.settings2.update()
        }
        ,
        this.AirplayChanged = function(t) {
            settings && settings.Airplay(),
            Resize(),
            ShowOrHide()
        }
        ,
        this.SettingChanged = function(t) {
            settings && (settings.SetSetting(t),
            settings.g("show") && settings.hide()),
            o.settings2 && o.settings2.update(),
            "speed" == t && SpeedChanged()
        }
        ,
        this.AudioTrackChangedNoHand = function(t) {
            settings && settings.SetSetting("audiotrack"),
            o.settings2 && o.settings2.update()
        }
        ,
        this.SubtitleChanged = function() {
            settings && (settings.SetSubtitle(),
            settings.g("show") && setTimeout((function() {
                settings.hide()
            }
            ), 200)),
            o.settings2 && o.settings2.update(),
            o.casting && o.tagvideo && o.chromecast.Sub()
        }
        ,
        this.SubOpt = function() {
            o.settings2 && o.settings2.hide(),
            settings && settings.SubOpt()
        }
        ,
        this.SettingsN = function(t, e, o) {
            for (var i in b)
                b.hasOwnProperty(i) && ("settings" == b[i].g("action") && 1 == b[i].s("hdicon") && b[i].HdIcon(),
                b[i].g("action_settings") == "settings#" + t && (b[i].set("set#visible", e),
                "text" == b[i].g("type") ? o && b[i].UpdateText(NoSpan(o)) : ("subtitle" == v.settings["settings" + t + "action"] && (o == Lang("off") ? b[i].CustomSwitch(0) : b[i].CustomSwitch(1)),
                Resize()),
                ShowOrHideProcessor(b[i])))
        }
        ,
        this.UpdateSettings = function() {
            settings && (settings.SetQuality(),
            settings.SetSetting("audiotrack"),
            settings.SetSetting("download"))
        }
        ,
        this.RenewPoints = function() {
            var t = FindBut("action", "line");
            t && t.RenewPoints()
        }
        ,
        this.resize = function() {
            Resize(),
            toolbarHidden && (o.resizeonmouse = !0)
        }
        ,
        this.resizeFromText = function(t) {
            toolbarHidden && 1 != t ? v.toolbar.resizeme = !0 : (Resize(),
            ShowOrHide())
        }
        ,
        this.refresh = function() {
            ShowOrHide(),
            Resize(),
            ShowOrHide(),
            o.nativecontrols ? hide2(bg2) : !toolbarHidden && show2(bg2)
        }
        ,
        this.KeyDown = function(t) {
            if (pljssglobalid == v.id && 1 == v.hotkey.on) {
                var e = t.which
                  , i = !1;
                if (null == e && (e = t.keyCode),
                exist(o.vast) || exist(o.pass) || 1 == o.stopkeys)
                    return !1;
                if (o.play && 1 == v.hotkey.onplay && (i = !0),
                (1 == v.hotkey.space && 32 == e || 1 == v.hotkey.enter && 13 == e) && (o.focus || o.mouseHere || i))
                    return 1 == v.hotkey.icons && PluginHotIcon("play", o.play ? 0 : 1),
                    o.actions.Toggle(),
                    t.preventDefault(),
                    !1;
                if (!v.hotkey.vol && (v.hotkey.vol = .2),
                !v.hotkey.scale && (v.hotkey.scale = 5),
                1 == v.hotkey.nums && (o.focus || i) && o.media.duration() > 0)
                    for (var s = 48; s < 58; s++)
                        e == s && o.actions.Seek(o.media.duration() * (e - 48) * 10 / 100, !0);
                39 == e && (o.focus || i) && KeyPlusUp(v.hotkey.leftright),
                37 == e && (o.focus || i) && KeyPlusDown(v.hotkey.leftright),
                38 == e && (o.focus || i) && KeyPlusUp(v.hotkey.updown),
                40 == e && (o.focus || i) && KeyPlusDown(v.hotkey.updown),
                187 == e && (o.focus || i) && KeyPlusUp(v.hotkey.plusminus),
                189 == e && (o.focus || i) && KeyPlusDown(v.hotkey.plusminus)
            }
        }
        ,
        this.KeyUp = function(t) {
            if (pljssglobalid == v.id) {
                var e = t.which;
                if (null == e && (e = t.keyCode),
                57 == e && v.log,
                o.fullscreen && 27 == e && o.actions.Normalscreen(),
                exist(o.vast) || exist(o.pass))
                    return !1;
                1 == v.hotkey.f && 70 == e && 1 != v.hidevideo && (o.focus || o.mouseHere) && (1 == v.hotkey.icons && PluginHotIcon("fullscreen", o.fullscreen ? 0 : 1),
                o.fullscreen ? o.actions.Normalscreen() : o.actions.Fullscreen()),
                1 == v.hotkey.m && 77 == e && (o.focus || o.mouseHere) && (1 == v.hotkey.icons && PluginHotIcon("mute", o.muted ? 1 : 0),
                o.muted ? o.actions.Unmute() : o.actions.Mute())
            }
        }
        ,
        this.Remove = function() {
            for (var t in clearInterval(o.toolbarInterval),
            o)
                0 == t.indexOf("control") && t.indexOf("Interval") > -1 && clearInterval(o[t]);
            for (var e = 0; e < butNames.length; e++)
                key = butNames[e],
                b[key] && b[key].Remove();
            settings && settings.Remove(),
            playlist && playlist.Remove(),
            bg.Remove(),
            bg2.parentNode == o.frame ? o.frame.removeChild(bg2) : o.toolbar && o.toolbar.removeChild(bg2)
        }
        ,
        this.ShowForce = function() {
            ShowForce()
        }
        ,
        this.HideForce = function() {
            HideForce(),
            ShowOrHide()
        }
        ,
        this.HideInterval = function() {
            HideInterval()
        }
        ,
        this.ToolbarHidden = function() {
            return toolbarHidden
        }
    }
      , Control = function(t) {
        var e, i, s, n, a, r, l, d, c, u, p, f, h, g, m, b = [], y = 0, x = 0, w = !0, _ = 1, k = 1, S = "", P = !1, T = !1, A = 0, O = 0, E = 0, C = !1, L = !1, I = !1, j = !1;
        b = UpdateObject(b, default_style.but);
        var M = [(b = UpdateObject(b, v[t])).action];
        c = M[0],
        exist(b.action2) && (M[1] = b.action2),
        exist(b.opposite) && (M[1] = b.opposite),
        exist(b.title) && (b.text = b.title),
        exist2(b.scalesmall) && o.small && (b.scale = b.scalesmall),
        "share" == c && (o.shareme = !0),
        exist(b.linkurl) && ("text" == b.type && "" != b.linkurl && exist(v[b.linkurl + "text"]) && (b.text = v[b.linkurl + "text"]),
        0 == b.linkurl.indexOf("settings#") && (S = b.linkurl,
        "" == b.tiptext && -1 == S.indexOf(",") && (b.tiptext = Lang(v.settings["settings" + S.substr(9) + "action"]))),
        b.linkurl.indexOf("captions") > -1 && (v.hlscaptions = !0),
        b.linkurl.indexOf("share:") > -1 && (o.shareme = !0),
        "countdown" == b.linkurl && (b.counter = new PluginCountdown(b)));
        var R = b.tiptext ? b.tiptext.split("///") : [];
        1 == b.liketext && (b.type = "text",
        b.text = xt(0) + (M.length > 1 ? "///" + xt(1) : ""),
        exist2(b.iconscolor) && (b.color = b.iconscolor));
        var z, H = new Array, V = new Array, D = new Array, N = (new Array,
        0);
        if ("text" == b.type) {
            if (b.dom && exist(v[b.dom + "text"]) && (b.text = v[b.dom + "text"]),
            exist(b.text)) {
                H[0] = trim(b.text),
                b.lngth = b.text.length;
                var F = ["/", "|", "-"];
                F.indexOf(b.text.substr(-1)) > -1 && (b.postsmbl = b.text.substr(-1)),
                F.indexOf(b.text.substr(0, 1)) > -1 && (b.presmbl = b.text.substr(0, 1)),
                "time" != c && "duration" != c || (0 == b.text.indexOf("0:") && (b.timeshort = !0),
                3 == b.text.split(":").length ? b.with_hours = !0 : b.text.indexOf("00:00") > -1 && (b.with_min = !0),
                1 == b.dvrtime && (v.dvrtime = 1)),
                1 == b.inversetime && 0 == b.text.indexOf("-") && (b.minus4back = !0),
                b.text.indexOf("///") > 0 && ("custom" == c || 1 == b.liketext) && (b.texts = b.text.split("///"),
                b.text = H[0] = b.texts[0])
            }
            1 == v.fonts && (setTimeout(yt, 100),
            setTimeout(yt, 500),
            setTimeout(yt, 1e3))
        } else
            exist(b.icon) && (H[0] = b.icon,
            H[0].indexOf("///") > 0 && -1 == H[0].indexOf("base64") && (H = b.icon.split("///")),
            exist(b.icon2) && (H[1] = b.icon2),
            1 == b.iconsreplay && exist2(b.icon3) && (H.push(b.icon3),
            N = H.length - 1));
        "custom" == c && 1 == b.link2 && exist(b.linkurl2) && (b.linkurl0 = b.linkurl);
        var q = createElement("div");
        "timeline" == b.position ? o.timeline.appendChild(q) : (b.position.indexOf("controls") > -1 && 1 == v.toolbar.hide && 1 == v.toolbar.hidedown ? o.toolbar.appendChild(q) : o.frame.appendChild(q),
        "buffer" == c && 1 == b.ontop2 && (q.style.zIndex = 2001));
        var B = createElement("div");
        if (q.appendChild(B),
        css(q, {
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 1,
            fontSize: "14px",
            lineHeight: "1em"
        }),
        exist2(b.dom) && attr(q, {
            id: v.id + "_control_" + b.dom
        }),
        1 == b.rotateplaying && css(q, {
            transition: "transform 0.2s linear"
        }),
        H.length > 0) {
            for (X = 0; X < H.length; X++) {
                if (V[X] = createElement("div"),
                css(V[X], {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    opacity: b.a,
                    transition: "opacity 0.1s linear,transform 0.1s linear"
                }),
                "pic" == b.type && "" != b.src && (exist2(b.dom) && (attr(V[X], {
                    id: v.id + "_control_" + b.dom + "_icon"
                }),
                v[b.dom + "src"] && (b.src = v[b.dom + "src"])),
                b.src.indexOf(".png") > -1 || b.src.indexOf(".jpg") > -1 || b.src.indexOf(".gif") > -1 || b.src.indexOf("base64") > -1)) {
                    -1 == b.src.indexOf("//") && -1 == b.src.indexOf("base64") && (b.src = "//" + b.src);
                    var W = createElement("img");
                    b.loading = 1,
                    W.addEventListener("load", pt),
                    W.src = b.src,
                    V[X].appendChild(W),
                    b.w = V[X].offsetWidth,
                    b.h = V[X].offsetHeight,
                    b.picheight > 0 && css(W, {
                        height: b.picheight
                    })
                }
                "text" == b.type && (css(V[X], {
                    color: b.color,
                    fontSize: b.fontsize * existv(v.globalfs, 1),
                    fontFamily: checkFont(b.font),
                    "letter-spacing": b.letterspacing + "px",
                    padding: "0 3px 0 3px",
                    "white-space": "nowrap"
                }),
                o.small && exist2(b.fontsizesmall) && css(V[X], {
                    fontSize: b.fontsizesmall * existv(v.globalfs, 1)
                }),
                1 == b.click && (b.text.indexOf("<a ") > -1 || "control_title" == t) && css(V[X], {
                    pointerEvents: "auto"
                }),
                1 == b.bold && css(V[X], {
                    "font-weight": "bold"
                }),
                "live" == H[X] && (H[X] = Lang("live")),
                V[X].innerHTML = _t(H[X]),
                setTimeout(ut, 100),
                b.w = V[X].offsetWidth,
                b.h = V[X].offsetHeight,
                exist2(b.dom) && attr(V[X], {
                    id: v.id + "_control_" + b.dom + "_text"
                })),
                "css" == b.type && controlCSS(H[X], b.color, V[X]);
                var U = H[X].toString();
                0 == U.indexOf("var:") && (U = existv(window[U.substr(4)], ""));
                var Y = U.indexOf("<svg") > -1 || U.indexOf("<SVG") > -1;
                "svg" == b.type && (U.indexOf("<g>") > -1 || Y) && ("mute" != c && "custom" != c || (U = U.replace(/pjs_/g, "pjs_" + v.id + t)),
                U.indexOf("pointer") > -1 && $(V[X]),
                V[X].innerHTML = (Y ? "" : "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>") + U + (Y ? "" : "</svg>"),
                V[X].offsetWidth > 20 && (b.w = V[X].offsetWidth),
                V[X].offsetHeight > 20 && (b.h = V[X].offsetHeight),
                css(V[X], {
                    width: b.w,
                    height: b.h
                }),
                -1 != b.iconscolor && kt(V, b.iconscolor),
                exist2(b.dom) && attr(V[X], {
                    id: v.id + "_control_" + b.dom + "_icon" + X
                })),
                q.appendChild(V[X]),
                X > 0 && hide(V[X])
            }
            if (ot(),
            m && pt(),
            "chromecast" == b.linkurl ? (b.chromecast = 1,
            b.hide = 1,
            o.chromecast && (V[0].innerHTML = o.chromecast.button(-1 != b.iconscolor ? b.iconscolor : "#ffffff")),
            o.system.mobile ? (V[0].ontouchstart = et,
            V[0].ontouchend = nt,
            V[0].ontouchmove = tt) : (V[0].onmouseover = st,
            V[0].onmouseout = nt,
            V[0].onmousemove = vt)) : (s.offsetWidth * b.scale < 35 || s.offsetHeight * b.scale < 35) && "text" != b.type ? (K(),
            $(n)) : $(s),
            "custom" == c) {
                if (1 == b.link && exist(b.linkurl)) {
                    var Q = b.linkurl;
                    if (0 == Q.indexOf("api:"))
                        if (2 == (J = Q.substr(4).split(",")).length) {
                            var Z = J[1].split("/");
                            2 == Z.length && ("hd" == J[0] && (J[0] = "default_quality"),
                            v[J[0]] == Z[1] && (b.a = 1,
                            css(V[0], {
                                opacity: b.a
                            })))
                        }
                    "unblock" != Q && "block" != Q || (o.actions.Curtain(),
                    q.style.zIndex = 2001,
                    o.stopkeys = 1)
                }
                (1 != b.hide || 1 != b.hideafter && 1 != b.hidebefore) && "skip" != Q || (b.often = 1)
            }
            "settings" == c && 1 == b.hdicon && (g = new PluginHdIcon(q,s,b)),
            0 == b.click && Pnt0(q),
            1 == b.loading && hide(s),
            1 == b.tip && function() {
                a = createElement("div"),
                css(a, {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "auto",
                    opacity: 0,
                    transition: "opacity 0.1s linear"
                }),
                r = createElement("div"),
                b = MarginPadding(b, "tippadding", "tippadding"),
                b = MarginPadding(b, "tipmargin", "tipmargin"),
                css(r, {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: 30,
                    "background-color": b.tipbgcolor,
                    opacity: b.tipbga,
                    "border-radius": b.tipbgrounding
                }),
                l = createElement("div"),
                css(l, {
                    position: "absolute",
                    left: b.tippaddingleft,
                    top: b.tippaddingtop,
                    color: b.tipcolor,
                    "font-family": checkFont(b.tipfont),
                    "font-size": b.tipfontsize * existv(v.globalfs, 1),
                    "letter-spacing": b.tipletterspacing + "px",
                    "line-height": "1"
                }),
                b.tiptext && 0 == b.tiptext.indexOf("var:") && (b.tipvar = !0);
                b.tipvar || css(l, {
                    "white-space": "nowrap"
                });
                1 == b.tippointer && ((d = createElement("div")).innerHTML = '<svg width="8px" height="6px" viewBox="0 0 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon id="Rectangle" stroke="none" fill="#' + b.tipbgcolor.replace("#", "") + '" fill-rule="evenodd" points="0 0 8 0 4 6"></polygon></svg>');
                1 == b.tipalways ? (css(a, {
                    opacity: 1
                }),
                $(a)) : Pnt0(a);
                if (q.appendChild(a),
                l.innerHTML = o.ni + ("" == b.tiptext ? Lang(c) : R[0]) + o.ni2,
                a.appendChild(r),
                a.appendChild(l),
                1 == b.tippointer) {
                    a.appendChild(d);
                    var t = o.doctype ? "-8px" : "-6px"
                      , e = b.tippointeralign;
                    exist(e) || (e = "");
                    var i = e.indexOf("top") > -1;
                    i && mt(d, "-180"),
                    css(d, {
                        position: "absolute",
                        right: e.indexOf("right") > -1 ? 10 * b.scale : "auto",
                        left: e.indexOf("left") > -1 ? 10 * b.scale : "" == e || "top" == e ? "50%" : "auto",
                        "margin-left": "" == e || "top" == e ? "-4px" : 0,
                        bottom: i ? "auto" : t,
                        top: i ? t : "auto",
                        opacity: b.tipbga
                    })
                }
                ht()
            }(),
            b.position.indexOf("right") > -1 && (O = 1),
            b.position.indexOf("top") > -1 && 1,
            (b.position.indexOf("bottom") > -1 || b.position.indexOf("control") > -1) && (E = 1),
            it();
            var G = "";
            0 != b.rotation && (G += "rotate(" + b.rotation + "deg)"),
            1 == b.flipx && (G += " scaleX(-1)"),
            1 == b.flipy && (G += " scaleY(-1)"),
            "" != G && css(q, {
                transform: G
            }),
            "buffer" == c && wt();
            var X, J = [];
            if ("playlist" == c)
                for (J = ["autoplaylist", "openplaylistafter", "openplaylistbefore", "openplaylistpause", "openplaylistroot", "playlistrewind"],
                X = 0; X < J.length; X++)
                    exist(b[J[X]]) && !exist(v.playlist[J[X]]) && (v.playlist[J[X]] = b[J[X]]);
            if ("title" == c)
                for (J = ["showtitleplaylist", "addtitleplaylist", "addtitleplaylistbr"],
                X = 0; X < J.length; X++)
                    exist(b[J[X]]) && !exist(options[J[X]]) && (v[J[X]] = b[J[X]]);
            1 == b.tipalways && ht(),
            "custom" == c && 0 == b.on && hide2(q),
            1 == b.hide && b.hideuntilto > 0 && setTimeout((function() {
                b.hideuntilto = -1,
                o.controls.refresh()
            }
            ), 1e3 * b.hideuntilto)
        }
        function K() {
            n && n.parentNode.removeChild(n),
            n = createElement("div"),
            css(n, {
                position: "absolute",
                top: 0,
                left: 0,
                width: "pic" == b.type ? s.offsetWidth : (s.offsetWidth > 35 ? s.offsetWidth : 35) * b.clickscalex,
                height: "pic" == b.type ? s.offsetHeight : (s.offsetHeight > 35 ? s.offsetHeight : 35) * b.clickscaley
            }),
            b = MarginPadding(b, "clickmargin", "clickmargin"),
            q.appendChild(n)
        }
        function $(t) {
            0 == c.indexOf("time") && 1 == M.length && (b.click = 0),
            "custom" == c && 0 == b.link && (b.click = 0),
            1 == b.click ? (1 == b.hand && css(t, {
                cursor: "pointer"
            }),
            css(t, {
                pointerEvents: "auto"
            }),
            o.system.mobile ? (t.addEventListener("touchmove", (function(t) {
                tt(t)
            }
            )),
            t.addEventListener("touchstart", (function(t) {
                et(t)
            }
            )),
            t.addEventListener("touchend", (function(t) {
                !function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    1 == b.mobileover && nt(),
                    T || rt(t);
                    T = !1
                }(t)
            }
            ))) : t.onclick = rt,
            1 != v.toolbar.clickarea && 1 != b.clickarea || css(t, {
                "background-color": "#ff0000",
                opacity: .5
            })) : css(t, {
                cursor: "default"
            }),
            o.system.mobile || (t.onmouseover = st,
            t.onmouseout = nt),
            1 != b.hidden && 1 != b.tip || (t.onmousemove = vt)
        }
        function tt(e) {
            js("touch_" + t),
            e.stopPropagation(),
            T = !0
        }
        function et(t) {
            1 == b.mobileover && st(),
            t.stopPropagation()
        }
        function ot() {
            if (s && s.parentNode.removeChild(s),
            s = createElement("div"),
            css(s, {
                position: "absolute",
                top: 0,
                left: 0
            }),
            exist2(b.dom) && attr(s, {
                id: v.id + "_control_" + b.dom + "_bg"
            }),
            e = b.w,
            i = b.h,
            b = MarginPadding(b, "margin", "margin"),
            "text" == (b = MarginPadding(b, "marginproc", "marginproc")).type && (e = V[0].offsetWidth,
            i = V[0].offsetHeight,
            b.minw > 0 && e < b.minw && (e = b.minw)),
            b = MarginPadding(b, "bgpadding", "bgpadding"),
            b = MarginPadding(b, "iconmargin", "iconmargin"),
            o.system.safari && (b.iconmarginleft /= b.scale,
            b.iconmarginright /= b.scale,
            b.iconmargintop /= b.scale,
            b.iconmarginbottom /= b.scale),
            exist2(b.dom) && exist(v.custom) && "custom" == b.action && "object" == typeof v.custom)
                for (var t = 0; t < Object.keys(v.custom).length; t++)
                    if (v.custom[t][b.dom])
                        if ("off" == v.custom[t][b.dom])
                            b.on = 0;
                        else {
                            var n = v.custom[t][b.dom].split(":");
                            "margin-left" == n[0] && (n[1].indexOf("%") > 0 ? b.marginprocleft = parseInt(n[1]) : b.marginleft = parseInt(n[1]))
                        }
            b.h = i,
            b.w = e,
            1 == b.bg ? (i = i + b.bgpaddingtop + b.bgpaddingbottom,
            e = e + b.bgpaddingleft + b.bgpaddingright,
            b.h = i,
            b.w = e,
            "text" == b.type && (b.bgh = V[0].offsetHeight)) : b.bga = 0,
            css(s, {
                width: 1 == b.bgstretch ? 5e3 : e,
                height: i,
                borderRadius: b.bgo * i / 2,
                background: b.bgcolor,
                opacity: b.bga,
                transition: "opacity .1s linear, background .1s linear, transform .1s linear"
            }),
            "pic" == b.type && css(s, {
                width: e,
                height: i,
                borderRadius: b.bgo * i / b.scale / 2
            }),
            1 == b.bglines && Bglines(s, b.bgcolor, b.bgline1, b.bgline2),
            1 == b.bgborder && css(s, {
                border: "1px solid " + b.bgbordercolor
            }),
            B.appendChild(s)
        }
        function it() {
            if (css(s, {
                top: -s.offsetHeight / 2,
                left: -s.offsetWidth / 2
            }),
            n) {
                var t = "pic" == b.type || s.offsetWidth > 35 ? s.offsetWidth : 35
                  , e = "pic" == b.type || s.offsetHeight > 35 ? s.offsetHeight : 35;
                css(n, {
                    top: -e / 2 + b.clickmargintop - b.clickmarginbottom,
                    left: -t / 2 + b.clickmarginleft - b.clickmarginright
                })
            }
            for (X = 0; X < H.length; X++)
                "svg" == b.type ? css(V[X], {
                    top: -Math.round(parseInt(V[X].style.height)) / 2,
                    left: -parseInt(V[X].style.width) / 2
                }) : css(V[X], {
                    top: -Math.round(V[X].offsetHeight) / 2,
                    left: -V[X].offsetWidth / 2
                }),
                s && css(V[X], {
                    top: int(V[X].style.top) + b.bgpaddingtop / 2 - b.bgpaddingbottom / 2 + b.iconmargintop / 2 + b.iconmarginbottom / 2,
                    left: int(V[X].style.left) + b.bgpaddingleft / 2 - b.bgpaddingright / 2 + b.iconmarginleft / 2 + b.iconmarginright / 2
                })
        }
        function st() {
            var e;
            if (P = !0,
            1 == b.iconsover && (e = f && exist(b.icon2) ? 1 : 0,
            z && D.length > 2 && (e = 2),
            D[e] && (ct(),
            show(V[D[e]]))),
            1 == b.bg && (-1 != b.bgaover && css(s, {
                opacity: b.bgaover
            }),
            -1 != b.bgcolorover && css(s, {
                background: b.bgcolorover
            })),
            b.aover > -1)
                for (e = 0; e < H.length; e++)
                    "hidden" != V[e].style.visibility && css(V[e], {
                        opacity: b.aover
                    });
            if (-1 != b.iconscolorover && kt(V, b.iconscolorover),
            1 == b.rotateonhover && (A += 45,
            mt(V[0], A)),
            b.scaleover > b.scale && b.scaleover > -1 && ft(b.scaleover),
            "settings" == c && o.controls.SettingsVisible())
                ;
            else if (1 == b.tip && 1 != b.tipalways) {
                var i = R.length > 1 && !f ? R[1] : R[0];
                i && 0 == i.indexOf("var:") && (l.innerHTML = window[i.substr(4)],
                ht()),
                show(a),
                css(a, {
                    opacity: 1
                })
            }
            "mute" == c && (o.actions.volumewheel(!0),
            o.volumewheel = !0),
            o.controlover = !0,
            o.controls.Mouse(t, "over")
        }
        function nt() {
            var e;
            if (P = !1,
            1 == b.iconsover && (e = f && exist(b.icon2) ? 1 : 0,
            z && D.length > 2 && (e = 2),
            ct(),
            show(V[e])),
            1 == b.bg && (-1 != b.bgaover && css(s, {
                opacity: b.bga
            }),
            -1 != b.bgcolorover && css(s, {
                background: b.bgcolor
            })),
            b.aover > -1)
                for (e = 0; e < H.length; e++)
                    "hidden" != V[e].style.visibility && css(V[e], {
                        opacity: b.a
                    });
            b.scaleover > -1 && ft(b.scale),
            -1 != b.iconscolorover && kt(V, -1 == b.iconscolor ? "#ffffff" : b.iconscolor),
            "mute" != c || o.fullscreen || (o.actions.volumewheel(!1),
            o.volumewheel = !1),
            at(),
            o.controlover = !1,
            o.controls && o.controls.Mouse(t, "out")
        }
        function at() {
            1 == b.tip && 1 != b.tipalways && (hide(a),
            css(a, {
                opacity: 0
            }))
        }
        function rt(e) {
            e && (e.cancelBubble = !0),
            C || (o.controls.ControlClick(t),
            "custom" == c && lt(),
            at(),
            1 == b.rotateonclick && (A += 45,
            mt(V[0], A)),
            I = !0,
            (1 == b.hideafterclick || "control_start" == t && 1 == b.hide && 1 == b.hideonplay) && o.controls.refresh())
        }
        function lt() {
            H && (H.length > 1 && (1 == f ? (show(V[0]),
            hide(V[1])) : (show(V[1]),
            hide(V[0]))),
            1 == b.tip && R.length > 1 && (l.innerHTML = o.ni + (1 == f ? R[0] : R[1]) + o.ni2,
            ht())),
            exist(b.linkurl0) && (b.linkurl = 1 == f ? b.linkurl0 : b.linkurl2),
            dt(),
            f = 1 != f,
            b.linkurl && b.linkurl.indexOf(",0/1") > -1 && js(b.linkurl, f ? 1 : 0),
            1 == b.bg && exist(b.bgcolorlink2) && -1 != b.bgcolorlink2 && (f ? (b.bgcolorlink0 = b.bgcolor,
            b.bgcolor = b.bgcolorlink2) : b.bgcolor = b.bgcolorlink0,
            ot(),
            $(s),
            it(),
            "text" == b.type ? yt() : ft(b.scale))
        }
        function dt() {
            exist(b.texts) && b.texts.length > 1 && bt(1 == f ? b.texts[0] : b.texts[1])
        }
        function ct() {
            for (var t = 0; t < H.length; t++)
                "hidden" != V[t].style.visibility && (css(V[t], {
                    opacity: b.a
                }),
                hide(V[t]))
        }
        function ut(t) {
            V[0] && V[0].offsetWidth > o.screen_w - b.marginleft - b.marginright - b.bgpaddingleft - b.bgpaddingright && (1 == b.marquee ? (t || (t = V[0].innerHTML),
            V[0].innerHTML = "<marquee>" + t + "</marquee>") : css(V[0], {
                "white-space": "normal"
            }),
            css(V[0], {
                width: o.screen_w - b.marginleft - b.marginright - b.bgpaddingleft - b.bgpaddingright
            }))
        }
        function pt() {
            s ? (m = !1,
            b.loading = 0,
            hide(s),
            V[0] && (b.w = V[0].offsetWidth * b.scale,
            b.h = V[0].offsetHeight * b.scale,
            ft(b.scale)),
            b.loaded = 0,
            ot(),
            K(),
            $(n),
            show(s),
            it(),
            o.controls.resize(),
            isVisible(q) || hide2(q)) : m = !0
        }
        function vt() {
            o.system.mobile || o.controlover || st(),
            ht()
        }
        function ft(t) {
            if (t > 0) {
                for (o.system.safari && 1 != b.tipalways ? css(s, {
                    zoom: t + ""
                }) : css(s, {
                    transform: "scale(" + t + ")"
                }),
                X = 0; X < H.length; X++)
                    o.system.safari && 1 != b.tipalways ? (css(V[X], {
                        zoom: t + ""
                    }),
                    L = !0) : css(V[X], {
                        transform: "scale(" + t + ")"
                    });
                _ = t,
                k = t
            }
        }
        function ht() {
            1 == b.tip && (css(a, {
                top: (1 == E ? -i - a.offsetHeight + 3 : -a.offsetHeight / 2) + b.tipmargintop - b.tipmarginbottom,
                left: (1 == O ? -l.offsetWidth : 1 == E ? -e / 2 : +l.offsetWidth) - (1 == E ? 0 : l.offsetWidth / 2 + 5) + b.tipmarginleft - b.tipmarginright,
                height: b.tippaddingtop + l.offsetHeight + b.tippaddingbottom,
                width: b.tippaddingleft + l.offsetWidth + b.tippaddingright
            }),
            css(r, {
                height: a.offsetHeight
            }),
            a.style.zIndex = "1000")
        }
        function gt() {
            C = !1
        }
        function mt(t, e) {
            css(t, {
                transform: "rotate(" + e + "deg)" + (t != V[0] || L || 1 == _ ? "" : " scale(" + _ + ")")
            })
        }
        function bt(t) {
            if ("text" == b.type) {
                exist(t) && (b.with_hours && (4 == t.length && (t = (b.timeshort ? "0:0" : "00:0") + t),
                5 == t.length && (t = (b.timeshort ? "0:" : "00:") + t),
                7 == t.length && (t = (b.timeshort ? "" : "0") + t)),
                b.with_min && 4 == t.length && (t = "0" + t),
                b.lngth = t.length),
                t = (b.presmbl ? b.presmbl + (b.minus4back ? "" : " ") : "") + t + (b.postsmbl ? " " + b.postsmbl : "");
                var e = V[0].offsetWidth + (1 == b.bg ? b.bgpaddingtop + b.bgpaddingbottom : 0)
                  , i = V[0].offsetHeight + (1 == b.bg ? b.bgpaddingtop + b.bgpaddingbottom : 0);
                V[0].innerHTML = o.ni + ("custom" == c ? _t(t) : t) + o.ni2,
                1 == b.triangle && (V[0].innerHTML += '<span style="display:inline-block;width:10px"></span><span style="border-top: 3px solid #fff;border-left: 3px solid transparent;border-right: 3px solid transparent;position: absolute;right:3px;top: 50%;margin-top: -1px;"></span>'),
                "title" == c && (css(V[0], {
                    width: "auto",
                    "white-space": "nowrap"
                }),
                ut(t)),
                b.w = V[0].offsetWidth + (1 == b.bg ? b.bgpaddingtop + b.bgpaddingbottom : 0),
                b.h = V[0].offsetHeight + (1 == b.bg ? b.bgpaddingtop + b.bgpaddingbottom : 0),
                (e != b.w || i != b.h || b.w > 0 && 0 == y) && yt(),
                V[0].offsetWidth > 0 ? y = b.w : ("" != S && hide(V[0]),
                "" != t && setTimeout(yt, 10))
            }
        }
        function yt() {
            "text" == b.type && V[0] && V[0].offsetWidth > 0 && ("" != S && show(V[0]),
            e = b.w = V[0].offsetWidth,
            i = b.h = V[0].offsetHeight,
            ot(),
            $(s),
            it(),
            o.controls && o.controls.resizeFromText())
        }
        function xt(t) {
            return o.ni + ("" == b.tiptext ? Lang(M[t]) : R.length > 1 ? R[t] : R[0]) + o.ni2
        }
        function wt() {
            hide2(q);
            for (var t = q.getElementsByTagName("*"), e = t.length; e--; )
                css(t[e], {
                    "animation-play-state": "paused"
                });
            w = !1
        }
        function _t(t) {
            var e = t + "";
            if (t.indexOf("{time}") > -1 && exist(o.continue) && (t = t.replace("{time}", timeFormat(o.continue.flag().t))),
            t.indexOf("{title") > -1) {
                var i = o.titlestore ? o.titlestore : v.title ? v.title : "";
                t.indexOf("{title2}") > -1 && o.controls && (t = t.replace("{title2}", o.controls.PlaylistG("title2"))),
                o.butplstart && o.controls && (i = o.controls.PlaylistG("butplstart")),
                t = t.replace("{title}", i),
                o.butplstart && !o.controls && setTimeout(bt, 100, e)
            }
            return t
        }
        function kt(t, e) {
            for (var i = 0; i < t.length; i++)
                SvgColor(t[i], e);
            "chromecast" == b.linkurl && o.chromecast && o.chromecast.Color(t[0], e)
        }
        this.Click = function() {
            rt()
        }
        ,
        this.c = function() {
            return q
        }
        ,
        this.s = function(t) {
            return b[t]
        }
        ,
        this.ss = function(t, e) {
            return !!exist(b[t]) && b[t][e]
        }
        ,
        this.g = function(o) {
            switch (o) {
            case "width":
                return e;
            case "height":
                return i;
            case "x":
                return int(q.style.left);
            case "y":
                return int(q.style.top);
            case "opacity":
                return q.style.opacity ? q.style.opacity : 1;
            case "show":
                return w;
            case "scaleX":
                return _;
            case "scaleY":
                return k;
            case "action":
                return c;
            case "action_settings":
                return S;
            case "clicked":
                return I;
            case "type":
                return b.type;
            case "length":
                return b.lngth ? b.lngth : 0;
            case "key":
                return t;
            case "x0":
                return u;
            case "y0":
                return p;
            case "over":
                return P;
            case "settings#":
                return 0 == S.indexOf("settings#");
            case "settings:":
                return 0 == S.indexOf("settings:");
            case "set#visible":
                return j;
            default:
                return !1
            }
        }
        ,
        this.set = function(e, i) {
            switch (e) {
            case "show":
                P && nt(),
                w = i;
                break;
            case "display":
                !function(e) {
                    e && o.system.mobile && (C = !0,
                    setTimeout(gt, 300));
                    e || 1 == b.iconsreplay && z && (hide(V[N]),
                    show(V[0]),
                    z = !1);
                    1 == b.loading ? e ? show(q) : hide(q) : ("control_time" == t || "control_duration" == t ? e ? show(q) : hide(q) : css(q, {
                        display: e ? "block" : "none"
                    }),
                    w = e,
                    e && show(q));
                    e && b.resizetxt && (b.resizetxt = !1,
                    setTimeout(yt, 100))
                }(i);
                break;
            case "show2":
                show2(q);
                break;
            case "hide2":
                hide2(q);
                break;
            case "unhidden":
                b.hidden = 0;
                break;
            case "hidetime":
                b.hidesec > 0 && 1 != b.hidden && !h && (clearTimeout(h),
                h = setTimeout((function() {
                    hide2(q),
                    b.hidden = 1,
                    h = void 0
                }
                ), 1e3 * b.hidesec));
                break;
            case "scale":
                ft(i);
                break;
            case "scale0":
                css(q, {
                    transform: "scale(0)"
                });
                break;
            case "scaleX":
                css(q, {
                    transform: "scaleX(" + i + ")"
                }),
                _ = i;
                break;
            case "scaleY":
                css(q, {
                    transform: "scaleY(" + i + ")"
                }),
                k = i;
                break;
            case "opacity":
                css(q, {
                    opacity: i
                });
                break;
            case "iconopacity":
                css(V[0], {
                    opacity: i
                });
                break;
            case "saturate":
                css(V[0], {
                    filter: "saturate(" + i + ")"
                });
                break;
            case "left":
            case "x":
                css(q, {
                    left: i
                });
                break;
            case "top":
            case "y":
                css(q, {
                    top: i
                });
                break;
            case "width":
                css(q, {
                    width: i
                });
                break;
            case "height":
                css(q, {
                    height: i
                });
                break;
            case "over_final":
                b.over_final = i;
                break;
            case "rightside":
                O = i;
                break;
            case "set#visible":
                j = i;
                break;
            case "animation":
                b.animation = i;
                break;
            case "skip":
                b.skip = i;
                break;
            case "x0":
                u = i;
                break;
            case "y0":
                p = i;
                break;
            default:
                return !1
            }
        }
        ,
        this.UpdateText = function(t) {
            "" == S || "x" != b.text && "1x" != b.text || (t += "x"),
            bt(t),
            !isVisible(q) && (b.resizetxt = !0)
        }
        ,
        this.CustomText = function(t) {
            b.customtext = t,
            bt(t),
            o.controls.resize()
        }
        ,
        this.Rotate = function() {
            mt(q, x),
            x += 20
        }
        ,
        this.RenewFromTitle = function(t) {
            b.text.indexOf("{title") > -1 && bt(b.text)
        }
        ,
        this.CustomToogle = function() {
            lt()
        }
        ,
        this.ResizeText = function() {
            yt()
        }
        ,
        this.UpdateVolume = function(e) {
            if (1 == b.displayvolume) {
                var i = 4;
                if ("control_mute" == t) {
                    if (o.system.mobile)
                        return
                } else
                    i = 8;
                for (var s = [], n = 1; n < i; n++)
                    s[n] = document.getElementById("pjs_".concat(v.id, t, "volume_element", n));
                if (s[1]) {
                    for (n = 1; n < i; n++)
                        s[n] && hide(s[n]);
                    if (4 == i)
                        for (n = 1; n < i; n++)
                            e > n / i && s[n] && show(s[n]);
                    else
                        for (n = i; n > 0; n--)
                            if (1 * e + 1 / i >= n / i && s[n]) {
                                show(s[n]);
                                break
                            }
                }
            }
        }
        ,
        this.On = function() {
            f || (H && H.length > 1 && M.length > 1 && (hide(V[0]),
            show(V[1])),
            M.length > 1 && (c = M[1],
            1 == b.tip && (l.innerHTML = xt(1),
            ht())),
            1 == b.iconsreplay && z && (hide(V[N]),
            z = !1),
            dt(),
            f = !0)
        }
        ,
        this.CustomSwitch = function(e) {
            !function(e) {
                var o = "pjs_"
                  , i = document.getElementById(o.concat(v.id, t, "slider"));
                i ? (css(i, {
                    transition: "transform 0.1s ease-out"
                }),
                i.style.transform = 1 == e ? "translate(0, 0)" : "translate(-7px, 0)") : b.a = 1 == e ? 1 : .5;
                f = 1 == e,
                1 == b.tip && R.length > 1 && (l.innerHTML = f ? R[0] : R[1]);
                css(V[0], {
                    opacity: b.a
                })
            }(e)
        }
        ,
        this.Off = function() {
            f && (H && H.length > 1 && M.length > 1 && (show(V[0]),
            hide(V[1])),
            c = M[0],
            M.length > 1 && 1 == b.tip && (l.innerHTML = xt(0),
            ht()),
            dt(),
            f = !1,
            z = !1)
        }
        ,
        this.ReplayIcon = function() {
            1 == b.iconsreplay && (ct(),
            show(V[N]),
            z = !0)
        }
        ,
        this.Buffer = function() {
            var t = !1;
            if (1 == b.hide && 1 == b.hidewithposter && isVisible(o.poster) && (t = !0),
            !t) {
                show2(q);
                for (var e = q.getElementsByTagName("*"), i = e.length; i--; )
                    css(e[i], {
                        "animation-play-state": "running"
                    });
                w = !0
            }
        }
        ,
        this.BufferStop = function() {
            wt()
        }
        ,
        this.Remove = function() {
            if (H.length > 0)
                for (X = 0; X < H.length; X++)
                    q.removeChild(V[X]),
                    V[X] = null;
            s && (s.removeAttribute("onclick"),
            s.removeAttribute("onmouseover"),
            s.removeAttribute("onmouseout"),
            s.parentNode.removeChild(s),
            s = null),
            "timeline" == b.position ? o.timeline.removeChild(q) : q.parentNode == o.frame ? o.frame.removeChild(q) : o.toolbar && q.parentNode == o.toolbar && o.toolbar.removeChild(q),
            a && q.removeChild(a),
            q = null
        }
        ,
        this.HdIcon = function() {
            g && g.toggle()
        }
    }
      , ControlLine = function(t, e) {
        var i, s, n, a, r, l, d, c, u, p, f, h, g, m, b, y = [], x = !0, w = 1, _ = 1, k = 0, S = 0;
        for (i in o.current_thumb = -1,
        default_style.but)
            y[i] = default_style.but[i];
        e = v[t].action,
        v[t].type;
        for (i in default_style[e])
            y[i] = default_style[e][i];
        for (i in v[t])
            y[i] = v[t][i];
        y.w = parseInt(y.w),
        y.h = parseInt(y.h),
        y = MarginPadding(y, "margin", "margin"),
        y = MarginPadding(y, "marginproc", "marginproc");
        var P = createElement("div");
        1 == v.toolbar.hidedown && 1 == v.toolbar.hide ? o.toolbar.appendChild(P) : o.frame.appendChild(P),
        "line" == e && (o.timeline = P);
        var T = !1;
        y.customline && "volume" != y.customline && (T = !0),
        css(P, {
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            fontSize: "14px",
            lineHeight: "1em"
        }),
        1 == y.ontop && (P.style.zIndex = y.order),
        function() {
            n = createElement("div");
            var t = (y = MarginPadding(y, "bgpadding", "bgpadding")).h + y.bgpaddingtop + y.bgpaddingbottom
              , e = y.w + y.bgpaddingleft + y.bgpaddingright;
            1 == y.bg || (y.bga = 0);
            y = MarginPadding(y, "clickmargin", "clickmargin"),
            (1 == v.toolbar.clickarea || 1 == y.clickarea) && (y.bgcolor = "#ff0000",
            y.bg = 1,
            y.bga = .5);
            css(n, {
                position: "absolute",
                top: 0,
                left: 0,
                width: e,
                height: t * y.clickscaley,
                borderRadius: y.bgo * t / 2,
                backgroundColor: y.bgcolor,
                opacity: y.bga,
                pointerEvents: "auto",
                transition: "opacity .1s linear, background .1s linear"
            }),
            1 == y.bgborder && css(n, {
                border: "1px solid #" + y.bgbordercolor
            });
            1 == y.click ? (1 == y.hand && css(n, {
                cursor: "pointer"
            }),
            o.system.mobile || (n.onclick = Z,
            n.onmouseup = G,
            n.onmousedown = X,
            n.onmousemove = $)) : css(n, {
                cursor: "default"
            });
            o.system.mobile || (n.onmouseover = U,
            n.onmousemove = $,
            n.onmouseout = Q);
            o.system.mobile && (n.addEventListener("touchstart", (function(t) {
                t.cancelBubble = !0,
                !exist(t.clientX) && t.touches.length > 0 && (t.clientX = t.touches[0].pageX,
                t.clientY = t.touches[0].pageY),
                g = t,
                U(t),
                X(t)
            }
            )),
            n.addEventListener("touchend", (function(t) {
                t.cancelBubble = !0,
                Q(),
                G(g)
            }
            )),
            n.addEventListener("click", (function(t) {
                t.cancelBubble = !0
            }
            )),
            n.addEventListener("touchmove", (function(t) {
                !exist(t.clientX) && t.touches.length > 0 && (t.clientX = t.touches[0].pageX,
                t.clientY = t.touches[0].pageY),
                g = t,
                $(t)
            }
            )));
            css(n, {
                left: Math.ceil(-y.w / 2 - y.bgpaddingleft)
            }),
            css(n, {
                top: Math.ceil(-y.h / 2 - y.bgpaddingtop + y.clickmargintop - y.clickmarginbottom)
            }),
            P.appendChild(n)
        }();
        var A = createElement("div");
        css(A, {
            position: "absolute",
            bottom: Math.round(-y.h / 2),
            left: Math.round(-y.w / 2)
        }),
        1 == y.roundout && css(A, {
            "border-radius": y.rounding * y.h / 2,
            height: y.h,
            overflow: "hidden",
            "pointer-events": "none"
        }),
        exist2(y.dom) && attr(P, {
            id: v.id + "_control_" + y.dom
        }),
        P.appendChild(A),
        "line" == e && 1 == v.thumbs && function() {
            o.thumb = createElement("div"),
            css(o.thumb, {
                position: "absolute",
                left: 0,
                top: 0,
                width: v.thumb_width,
                height: v.thumb_height,
                overflow: "hidden",
                "pointer-events": "none",
                "background-color": "#000",
                "border-radius": v.thumb_radius + "px",
                display: "none"
            }),
            o.thumb.id = "pjs_thumbnail_" + v.id,
            1 == v.thumb_border && css(o.thumb, {
                border: v.thumb_borderwidth + "px solid " + SettingsParser("color", v.thumb_bordercolor)
            });
            1 == v.thumb_shadow && css(o.thumb, {
                "box-shadow": "0px 1px 5px rgba(0,0,0,0.5)"
            });
            o.thumb.style.zIndex = "999",
            P.appendChild(o.thumb)
        }(),
        1 == y.tip && function() {
            p = createElement("div"),
            css(p, {
                position: "absolute",
                left: 0,
                top: 0,
                height: "auto",
                "pointer-events": "none",
                opacity: 0,
                transition: "opacity 0.1s linear"
            }),
            y = MarginPadding(y, "tippadding", "tippadding"),
            f = createElement("div"),
            css(f, {
                position: "absolute",
                "padding-left": y.tippaddingleft,
                "padding-right": y.tippaddingright,
                "padding-top": y.tippaddingtop,
                "padding-bottom": y.tippaddingbottom - 1,
                "text-align": "center",
                color: y.tipcolor,
                "font-family": checkFont(y.tipfont),
                "font-size": y.tipfontsize * existv(v.globalfs, 1),
                "letter-spacing": y.tipletterspacing + "px",
                "line-height": "1",
                "background-color": hex2rgb(y.tipbgcolor, y.tipbga),
                "border-radius": y.tipbgrounding
            }),
            y.linetippointer && (y.tippointer = y.linetippointer),
            1 == y.tippointer && ((h = createElement("div")).innerHTML = '<svg width="8px" height="6px" viewBox="0 0 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon id="Rectangle" stroke="none" fill="' + CheckColor(y.tipbgcolor) + '" fill-rule="evenodd" points="0 0 8 0 4 6"></polygon></svg>');
            P.appendChild(p),
            p.appendChild(f),
            1 == y.tippointer && (p.appendChild(h),
            css(h, {
                opacity: y.tipbga
            }));
            p.style.zIndex = "1000"
        }();
        var O = createElement("div");
        if (F(0, O, .3, 1 == y.gradient ? "linear-gradient(#" + y.gradientcolorbg + ", #" + y.colorbg + ")" : y.colorbg, y.w, y.abg),
        1 == y.customdesign && exist(y.customdesignsvg)) {
            var E = createElement("div");
            E.innerHTML = y.customdesignsvg.replace(/\#FFFFFF/g, "#" + y.colorbg),
            O.appendChild(E),
            css(E, {
                position: "absolute",
                bottom: -Math.round(y.h / 2),
                left: 0,
                "pointer-events": "none"
            }),
            css(O, {
                overflow: "hidden",
                background: "none"
            });
            for (var C = ["path", "polygon", "polyline", "rect", "ellipse"], L = 0; L < C.length; L++) {
                if ((N = E.querySelectorAll("svg " + C[L])).length > 0)
                    for (var I = 0; I < N.length; I++)
                        N[I].style.fill = y.colorbg
            }
        }
        A.appendChild(O);
        var j = createElement("div");
        if (F(1, j, y.linespeed1, 1 == y.gradient ? "linear-gradient(#" + y.gradientcolorload + ", #" + y.colorload + ")" : y.colorload, 0, y.aload),
        A.appendChild(j),
        y.aover > 0) {
            var M = createElement("div");
            F(2, M, y.linespeed2, y.colorover, 0, y.aover),
            A.appendChild(M)
        }
        var R = createElement("div");
        if (F(3, R, y.linespeed3, 1 == y.gradient ? "linear-gradient(#" + y.gradientcolor + ", #" + y.color + ")" : y.color, 0, y.a),
        1 == y.customdesign && exist(y.customdesignsvg)) {
            var z = createElement("div");
            z.innerHTML = y.customdesignsvg.replace(/\#FFFFFF/g, "#" + y.color),
            css(z, {
                position: "absolute",
                bottom: -Math.round(y.h / 2),
                left: 0,
                "pointer-events": "none"
            }),
            css(R, {
                overflow: "hidden",
                background: "none"
            }),
            R.appendChild(z)
        }
        if (1 == y.value) {
            var H = createElement("div");
            y = MarginPadding(y, "valuepadding", "valuepadding"),
            y = MarginPadding(y, "valuemargin", "valuemargin"),
            css(H, {
                position: "absolute",
                bottom: y.h / 2,
                left: 0,
                "pointer-events": "none",
                "font-size": y.valuesize * existv(v.globalfs, 1),
                color: y.valuecolor,
                "line-height": "100%",
                "padding-top": y.valuepaddingtop,
                "padding-bottom": y.valuepaddingbottom,
                "padding-left": y.valuepaddingleft,
                "padding-right": y.valuepaddingright,
                "margin-top": y.valuemargintop,
                "margin-bottom": y.valuemarginbottom,
                "margin-left": y.valuemarginleft,
                "margin-right": y.valuemarginright,
                "border-radius": y.valuerounding + "px",
                display: "none"
            }),
            1 == y.valuebg && css(H, {
                background: "#" + y.valuebgcolor
            }),
            R.appendChild(H);
            var V = !1
        }
        if (o.timeline_h = y.h,
        A.appendChild(R),
        1 == y.pointed) {
            if (void 0 !== PluginPoints)
                var D = new PluginPoints(P,[],s,y)
        }
        if (1 == y.handle) {
            if (-1 == y.handleicon.toString().indexOf("<svg") && "" == y.handleicon && (y.handleicon = "<svg width='20' height='20'><g><ellipse ry='5' rx='5' cy='10' cx='10' fill='#fff'/></g></svg>"),
            (u = createElement("div")).innerHTML = y.handleicon.toString(),
            y = MarginPadding(y, "handlemargin", "handlemargin"),
            css(u, {
                position: "absolute",
                top: -10 + y.handlemargintop - y.handlemarginbottom,
                left: -1e3,
                "pointer-events": "none",
                height: 20,
                width: y.handle_width,
                opacity: y.handlea,
                transition: "transform 0.1s linear, opacity 0.1s linear"
            }),
            1 == y.handlehide || 1 == y.handlehideinit ? css(u, {
                transform: "scale(0)"
            }) : 1 != y.handlescale && css(u, {
                transform: "scale(" + y.handlescale + ")"
            }),
            P.appendChild(u),
            -1 != y.handlecolor)
                for (C = ["path", "rect", "ellipse"],
                L = 0; L < C.length; L++) {
                    var N;
                    if ((N = u.querySelectorAll("svg " + C[L])).length > 0)
                        for (I = 0; I < N.length; I++)
                            N[I].style.fill = "#" + y.handlecolor
                }
            y.handlewidth = u.offsetWidth
        }
        function F(t, e, o, i, s, n) {
            css(e, {
                position: "absolute",
                bottom: 0,
                left: 0,
                width: s,
                height: y["h" + t] > 0 ? y["h" + t] : y.h,
                background: i ? i.indexOf("linear") > -1 ? i : "#" + i : "",
                "border-radius": 1 == y.roundout ? 1 : y.rounding * y.h / 2,
                opacity: n,
                "pointer-events": "none",
                transition: "transform 0.2s ease-in-out"
            })
        }
        function q(t) {
            if (t != s) {
                s = t,
                o.timeline_w = s;
                var i = s / O.offsetWidth;
                css(n, {
                    width: s + y.bgpaddingleft + y.bgpaddingright,
                    left: -s / 2 - y.bgpaddingleft
                }),
                css(A, {
                    left: -s / 2
                }),
                css(O, {
                    width: s
                }),
                css(A, {
                    width: s
                });
                var a = j.offsetWidth * i;
                a > O.offsetWidth && (a = O.offsetWidth),
                css(j, {
                    width: a
                });
                var r = R.offsetWidth * i;
                css(R, {
                    width: r
                }),
                B(r),
                "line" == e && function() {
                    if (o.continue && 1 == v.timestore && !o.start) {
                        var t = o.continue.flag();
                        t.t && t.d && it(t.t, t.d)
                    }
                }(),
                1 == y.pointed && D && D.place(s),
                o.cut && o.cut.Resize()
            }
        }
        function B(t) {
            if (1 == y.handle) {
                t < y.handlewidth / 2 && 20 != y.handle_width && (t = y.handlewidth / 2),
                t > s - y.handlewidth / 2 && 20 != y.handle_width && (t = s - y.handlewidth / 2);
                var e = t - s / 2 - y.handlewidth / 2 + y.handlemarginleft - y.handlemarginright;
                css(u, {
                    left: e
                })
            }
        }
        function W() {
            css(u, {
                transform: "scale(" + y.handlescale + ")"
            })
        }
        function U(i) {
            if (o.controls.Mouse(t, "over"),
            1 == y.bg) {
                if (-1 != y.bgaover)
                    new Motion({
                        mc: n,
                        type: "alpha_div",
                        to: y.bgaover,
                        time: .1,
                        me: t + "bg"
                    });
                exist2(y.bgcolorover) && css(n, {
                    "background-color": y.bgcolorover
                })
            }
            if (exist2(y.coloroverplay) && css(R, {
                "background-color": y.coloroverplay
            }),
            1 == y.handle)
                if (1 == y.handleiconsover && exist(y.handleiconover) && (1 == y.handleiconspress && l || (u.innerHTML = "<svg width='" + y.handle_width + "' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" + y.handleiconover.toString() + "</svg>")),
                1 == y.handlehide)
                    (1 != y.handlehideinit || o.start) && W();
                else if (-1 != y.handleaover)
                    new Motion({
                        mc: u,
                        type: "alpha_div",
                        to: y.handleaover,
                        time: .1,
                        me: t + "handle"
                    });
            1 == y.tip && (o.media.duration() > 0 || "volume" == e || T) && et(),
            y.expand > 0 && (css(n, {
                transform: "scaleY(" + ((y.expand - 1) / 5 + 1) + ")"
            }),
            Y(y.expand)),
            1 == y.handle && 1 == y.handlemove && B(i.clientX - S),
            "volume" == e && (o.actions.volumewheel(!0),
            o.volumewheel = !0),
            m = !0,
            o.controlover = !0
        }
        function Y(t) {
            css(O, {
                transform: "scaleY(" + t + ")"
            }),
            css(j, {
                transform: "scaleY(" + t + ")"
            }),
            M && css(M, {
                transform: "scaleY(" + t + ")"
            }),
            css(R, {
                transform: "scaleY(" + t + ")"
            })
        }
        function Q() {
            if (!d) {
                if (y.aover > 0 && css(M, {
                    width: 0
                }),
                exist2(y.coloroverplay) && css(R, {
                    "background-color": y.color
                }),
                1 == y.bg) {
                    if (-1 != y.bgaover)
                        new Motion({
                            mc: n,
                            type: "alpha_div",
                            to: y.bga,
                            time: .1,
                            me: t + "bg"
                        });
                    exist2(y.bgcolorover) && css(n, {
                        "background-color": y.bgcolor
                    })
                }
                if (1 == y.handle)
                    if (1 == y.handleiconsover && exist(y.handleiconover) && (1 == y.handleiconspress && l || (u.innerHTML = "<svg width='" + y.handle_width + "' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" + y.handleicon.toString() + "</svg>")),
                    1 == y.handlehide)
                        css(u, {
                            transform: "scale(0)"
                        });
                    else if (-1 != y.handleaover)
                        new Motion({
                            mc: u,
                            type: "alpha_div",
                            to: y.handlea,
                            time: .1,
                            me: t + "handle"
                        });
                y.expand > 0 && (css(n, {
                    transform: "scaleY(1)"
                }),
                Y(1)),
                "volume" != e || o.fullscreen || (o.actions.volumewheel(!1),
                o.volumewheel = !1),
                o.controls.Mouse(t, "out")
            }
            1 == y.pointed && D && D.out(),
            1 == y.tip && (o.media.duration() > 0 || "volume" == e) && ot(),
            o.thumbs_on && "line" == e && (o.th.hide(),
            o.current_thumb = -1),
            m = !1,
            o.controlover = !1
        }
        function Z(t) {
            t.cancelBubble = !0
        }
        function G(i) {
            "volume" == e && o.hidden_volume_over && (d = !0,
            clearTimeout(b),
            b = setTimeout((function() {
                d = !1,
                Q()
            }
            ), 1e3)),
            K(),
            o.mouseDown = !1,
            1 == y.handle && 1 == y.handleiconspress && exist(y.handleiconpress) && (u.innerHTML = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" + y.handleicon.toString() + "</svg>"),
            J(i.clientX, i.clientY),
            o.controls.ControlClick(t),
            o.controls.StageMouseUp(i.clientX, i.clientY),
            i.cancelBubble = !0
        }
        function X(t) {
            l = !0,
            1 == y.handle && 1 == y.handleiconspress && exist(y.handleiconpress) && (u.innerHTML = "<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" + y.handleiconpress.toString() + "</svg>"),
            k = findTop(n),
            S = findLeft(n),
            J(t.clientX, t.clientY),
            it(c, 1, "no")
        }
        function J(t, e) {
            var i, n = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), a = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            o.system.mobile || (e += a,
            t += n),
            y.vertical > 0 ? (i = e - k - y.bgpaddingright,
            c = i / s,
            270 == y.vertical && (i = e - k - y.bgpaddingleft,
            c = -1 * ((c = i / s) - 1))) : (i = t - S - y.bgpaddingleft,
            c = i / s,
            y.rotation > 134 && y.rotation < 235 && (i = t - S - y.bgpaddingright,
            c = -1 * ((c = i / s) - 1))),
            c > 1 && (c = 1),
            c < 0 && (c = 0)
        }
        function K() {
            l = !1
        }
        function $(t) {
            if (S = findLeft(n),
            y.aover > 0 && (o.start || "line" != e) && css(M, {
                width: t.clientX - S
            }),
            1 == y.tip && (o.media.duration() > 0 || "volume" == e || T)) {
                if (et(),
                k = findTop(n),
                J(t.clientX, t.clientY),
                "line" == e)
                    if (1 == v.hlsdvrtime)
                        o.media.isLive() && o.media.currentFile().indexOf("?DVR") > 0 ? f.innerHTML = "- " + timeFormat((1 - c) * o.media.duration(!0)) : f.innerHTML = timeFormat(c * o.media.duration());
                    else {
                        var i = o.media.duration();
                        v.delete > 0 && (i -= v.delete);
                        var a = "";
                        1 == y.pointed && D && "" != (a = D.tip(c * i)) && (a += "<br>"),
                        f.innerHTML = a + timeFormat(c * i)
                    }
                ("volume" == e || T) && (f.innerHTML = st(c)),
                tt(t)
            }
            if (o.thumbs_on && "line" == e && o.th && o.media.duration() > 0) {
                0 == y.tip && (k = findTop(n),
                S = findLeft(n),
                J(t.clientX, t.clientY));
                var r = -s / 2 + (t.clientX - S) - v.thumb_width / 2;
                r > s / 2 - v.thumb_width && (r = s / 2 - v.thumb_width),
                css(o.thumb, {
                    top: -v.thumb_height - (v.thumb_bottom > 0 ? 1 * v.thumb_bottom : 5) - v.thumb_border,
                    left: r < -s / 2 ? -s / 2 : r
                }),
                o.th.time(c * o.media.duration(), t.clientX, S, s)
            }
            1 == y.handle && 1 == y.handlemove && B(t.clientX - S),
            o.system.mobile && X(t)
        }
        function tt(t, e, i) {
            var n = -s / 2 + (t.clientX + document.documentElement.scrollLeft - S) - f.offsetWidth / 2 + (i || 0)
              , a = 0;
            1 != v.notofh && (n + s / 2 + f.offsetWidth + 10 > o.screen_w && (a = n,
            n = o.screen_w - s / 2 - f.offsetWidth - 10),
            n + o.screen_w / 2 < 0 && (a = n,
            n = -o.screen_w / 2));
            var r = {
                top: -f.offsetHeight - 1 * y.linetipmarginbottom - y.tippaddingtop - y.tippaddingbottom - (1 == y.toptip ? y.h / 2 * (y.expand > 0 ? y.expand : 1) : 0) + (e || 0),
                left: n
            };
            css(p, r),
            1 == y.tippointer && css(h, {
                position: "absolute",
                left: f.offsetWidth / 2 - 4 + (0 != a ? a - n : 0),
                top: f.offsetHeight - 6
            })
        }
        function et() {
            isVisible(p) && 0 != p.style.opacity || (show(p),
            css(p, {
                opacity: 1
            }))
        }
        function ot() {
            hide(p),
            css(p, {
                opacity: 0
            })
        }
        function it(t, o, i) {
            var n;
            (t < 0 && (t = 0),
            v.delete > 0 && o > 1 && (o -= v.delete,
            t -= v.delete),
            1 == y.handle && 1 == y.handlehideinit && 1 != y.handlehide && !y.handleinit && t > 0 && (W(),
            y.handleinit = !0),
            l && 1 != o) || (o > 0 && t > 0 ? (t > o && (t = o),
            (n = s * (t / o)) == R.offsetWidth && (n = -1)) : n = 0,
            n >= 0 && (css(R, {
                width: n
            }),
            1 == y.handlemove && m || B(n)),
            exist(H) && (o < 2 && "line" == e ? V && (hide2(H),
            V = !1) : (V || (show2(H),
            V = !0),
            H.innerHTML = "line" == e ? Time(0 == t ? o : t) : st(t))))
        }
        function st(t) {
            var e = Math.round(100 * t);
            return T && o.line_speed ? (T && exist2(y.tiptext) ? y.tiptext + "&nbsp;" : "") + parseFloat(t * o.files_speed.slice(-1)[0]).toFixed(1) : e
        }
        0 != y.rotation && css(P, {
            transform: "rotate(" + y.rotation + "deg)"
        }),
        1 == y.hidden && (hide(P),
        x = !1),
        "volume" == e && (1 == y.hide && 1 == y.hideoutmute ? (o.hidden_volume = !0,
        y.hidden = !0) : o.hidden_volume = !1),
        y.vertical = 0,
        0 != y.rotation && (y.rotation2 = Math.abs(y.rotation),
        y.rotation2 > 45 && y.rotation2 < 135 && (y.vertical = 90),
        y.rotation2 > 225 && y.rotation2 < 315 && (y.vertical = 270)),
        T && (o.line_speed = "speed" == y.customline,
        s = y.w,
        it(1, o.files_speed.slice(-1)[0], "no")),
        this.PlacePoints = function() {
            D && D.place(s)
        }
        ,
        this.RenewPoints = function() {
            D && D.update(s)
        }
        ,
        this.ShowTip = function(t, e, o, i) {
            et(),
            f.innerHTML = e,
            tt(t, o, i)
        }
        ,
        this.HideTip = function() {
            ot()
        }
        ,
        this.c = function() {
            return P
        }
        ,
        this.s = function(t) {
            return y[t]
        }
        ,
        this.ss = function(t, e) {
            return y[t][e]
        }
        ,
        this.g = function(o) {
            switch (o) {
            case "width":
                return s;
            case "offsetwidth":
                return O.offsetWidth;
            case "height":
                return y.h;
            case "x":
                return int(P.style.left);
            case "y":
                return int(P.style.top);
            case "opacity":
                return P.style.opacity ? P.style.opacity : 1;
            case "show":
                return x;
            case "scaleX":
                return w;
            case "scaleY":
                return _;
            case "action":
                return e;
            case "key":
                return t;
            case "x0":
                return a;
            case "y0":
                return r;
            case "click":
                return c;
            case "cul":
                return cul;
            default:
                return !1
            }
        }
        ,
        this.set = function(t, o) {
            switch (t) {
            case "show":
                x = o;
                break;
            case "mouseDown":
                l = o;
                break;
            case "display":
                "line" == e || 1 == y.hide ? css(P, {
                    visibility: o ? "visible" : "hidden"
                }) : css(P, {
                    display: o ? "block" : "none"
                }),
                x = o;
                break;
            case "scaleX":
                css(P, {
                    transform: "scaleX(" + o + ")"
                }),
                w = o;
                break;
            case "scaleY":
                css(P, {
                    transform: "scaleY(" + o + ")"
                }),
                _ = o;
                break;
            case "opacity":
                css(P, {
                    opacity: o
                });
                break;
            case "left":
            case "x":
                css(P, {
                    left: o
                });
                break;
            case "top":
            case "y":
                css(P, {
                    top: o
                });
                break;
            case "click":
                c = o;
                break;
            case "hiddenwidth":
                y.hiddenwidth = o;
                break;
            case "width":
                css(P, {
                    width: o
                });
                break;
            case "height":
                css(P, {
                    height: o
                });
                break;
            case "over_final":
                y.roundingver_final = o;
                break;
            case "x0":
                a = o;
                break;
            case "y0":
                r = o
            }
        }
        ,
        this.Resize = function(t) {
            q(t)
        }
        ,
        this.StageLeave = function(t) {}
        ,
        this.StageMove = function(i, s) {
            l && (("volume" == e || T) && (J(i, s),
            o.controls.ControlClick(t)),
            "volume" == e && (o.hidden_volume_over = !0),
            J(i, s),
            it(c, 1, "no"))
        }
        ,
        this.StageMouseUp = function(e, i) {
            l && (K(),
            l = !1,
            J(e, i),
            o.controls.ControlClick(t),
            it(c, 1, "no"))
        }
        ,
        this.UpdatePlay = function(t, e, o) {
            null == e && null == t || it(t, e)
        }
        ,
        this.UpdatePlaySeek = function() {
            c > 1 && (c = 1),
            c < 0 && (c = 0),
            css(R, {
                width: c * s
            })
        }
        ,
        this.UpdateLoad = function(t, e) {
            e > 0 && t > 0 ? (css(j, {
                width: int(s * (t / e))
            }),
            e,
            t) : (0,
            css(j, {
                width: 0
            }))
        }
        ,
        this.Cut = function(t) {
            1 == y.cut && (o.cut ? exist(t) && 0 != t || !o.cutted ? (!o.cutted || exist(t) && 1 != t && 0 != t) && (o.cut.restart(t),
            o.cutted = !0) : (o.cut.hide(),
            o.cutted = !1) : 0 != t && "undefined" != typeof PluginCut && (o.cut = new PluginCut(P,y,t),
            o.cutted = !0))
        }
        ,
        this.Remove = function() {
            P.removeChild(A),
            n && (n.removeAttribute("onclick"),
            n.removeAttribute("onmouseover"),
            n.removeAttribute("onmouseout"),
            n.parentNode.removeChild(n),
            n = null),
            u && P.removeChild(u),
            P.parentNode == o.frame ? o.frame.removeChild(P) : o.toolbar && P.parentNode == o.toolbar && o.toolbar.removeChild(P),
            P = null
        }
    }
      , ControlsBg = function() {
        var t, e = [], i = !0, s = 1, n = 1, a = 0, r = 0, l = random(1e5, 2e5);
        for (var d in e.position = v.toolbar.position,
        v.toolbar)
            v.toolbar.hasOwnProperty(d) && (e[d] = v.toolbar[d]);
        0 == e.show && (v.toolbar.h = e.h = 0,
        e.padding = e.margin = "0 0 0 0",
        e.gradient = 0),
        e.scale = 1,
        e = MarginPadding(e, "margin", "margin"),
        e = MarginPadding(e, "marginproc", "marginproc"),
        exist(e.paddingtop) && 20 != e.paddingtop && "-20 0 0 0" == e.margin && (e.margintop = e.paddingtop);
        var c = createElement("div");
        css(c, {
            position: "absolute",
            left: 0,
            top: 0,
            width: 1 == e.stretchonfullscreen ? "100%" : o.normal_w,
            height: e.h - ("top" != e.position ? e.margintop : 0),
            opacity: e.a,
            "pointer-events": "none",
            fontSize: "14px",
            lineHeight: "1em"
        }),
        o.frame.appendChild(c);
        var u = createElement("div");
        if (css(u, {
            position_: "absolute",
            left_: 0,
            top_: 0,
            width_: "100%",
            height: e.h - ("top" != e.position ? e.marginbottom + e.margintop : 0),
            display: "block",
            "margin-left": e.marginleft,
            "margin-right": e.marginright,
            "border-radius": e.rounding
        }),
        c.appendChild(u),
        t = c.offsetWidth,
        v.toolbar_margintop = -e.margintop,
        1 == e.gradient)
            if ("000000" == e.color || "" != v.toolbar.image) {
                "top" != e.position && (v.toolbar_margintop = 98 - e.h);
                var p = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==";
                v.toolbar.image.indexOf("data:image") > -1 && (p = v.toolbar.image),
                css(u, {
                    height: e.h + ("top" != e.position ? v.toolbar_margintop : 0),
                    background: "url(" + p + ") repeat-x 50% 100%",
                    "background-size": "auto"
                })
            } else {
                var f = "to bottom, rgba(" + hexToRgb(e.color) + ",0), rgba(" + hexToRgb(e.color) + ",1)";
                css(u, {
                    background: "-moz-linear-gradient(" + f + ")",
                    background: "-webkit-linear-gradient(" + f + ")",
                    background: "-ms-linear-gradient(" + f + ")",
                    background: "-o-linear-gradient(" + f + ")",
                    background: "linear-gradient(" + f + ")"
                })
            }
        else
            css(u, {
                "background-color": e.color
            });
        this.h = function() {
            return e.h - ("top" != e.position ? e.margintop : 0)
        }
        ,
        this.c = function() {
            return c
        }
        ,
        this.s = function(t) {
            return e[t]
        }
        ,
        this.g = function(e) {
            if (!c)
                return !1;
            switch (e) {
            case "w":
                return c.offsetWidth > 0 && (t = c.offsetWidth),
                t;
            case "width":
                return c.offsetWidth;
            case "height":
                return c.offsetHeight;
            case "x":
                return int(c.style.left);
            case "y":
                return int(c.style.top);
            case "opacity":
                return c.style.opacity ? c.style.opacity : 1;
            case "show":
                return i;
            case "scaleX":
                return s;
            case "scaleY":
                return n;
            case "key":
                return "bg";
            case "x0":
                return a;
            case "y0":
                return r;
            case "motion_id":
                return "bg" + l;
            default:
                return !1
            }
        }
        ,
        this.set = function(e, l) {
            switch (e) {
            case "show":
                i = l;
                break;
            case "w":
                t = l;
                break;
            case "display":
                css(c, {
                    display: l && !o.hidecontrols ? "block" : "none"
                }),
                i = l;
                break;
            case "scale":
                css(c, {
                    transform: "scale(" + l + ")"
                }),
                s = l,
                n = l;
                break;
            case "scaleX":
                css(c, {
                    transform: "scaleX(" + l + ")"
                }),
                s = l;
                break;
            case "scaleY":
                css(c, {
                    transform: "scaleY(" + l + ")"
                }),
                n = l;
                break;
            case "opacity":
                css(c, {
                    opacity: l
                });
                break;
            case "left":
            case "x":
                css(c, {
                    left: l
                });
                break;
            case "top":
            case "y":
                css(c, {
                    top: l
                });
                break;
            case "width":
                css(c, {
                    width: l
                });
                break;
            case "height":
                css(c, {
                    height: l
                });
                break;
            case "x0":
                a = l;
                break;
            case "y0":
                r = l
            }
        }
        ,
        this.Remove = function() {
            o.frame.removeChild(c),
            c = null
        }
    };
    function VisibleCheck() {
        exist(options.id) && document.getElementById(options.id) && (isHidden(document.getElementById(options.id)) && 1 != options.visible ? setTimeout(VisibleCheck, 50) : Init())
    }
    function Init() {
        for (var i = 0; i < pljssglobal.length; i++)
            pljssglobal[i].api("id") == options.id && pljssglobal[i].api("playing") && pljssglobal[i].api("stop");
        pljssglobal.push(o.this);
        var stop = !1;
        if (exist(options.player))
            for (var i = 2; i < 10; i++)
                options.player == i && "" != o["u" + i] && (v = UpdateObject(v, JSON.parse(decode(o["u" + i]))),
                stop = !0);
        if ("" == o.u || stop || (v = UpdateObject(v, (o.u,
        o.u))),
        "function" != typeof pljscom)
            for (var key in options)
                options.hasOwnProperty(key) && 0 == key.indexOf("rc_") && (options[key] = null);
        if (v = UpdateObject(v, options),
        exist(v.file) && "" != v.file || 1 != v.emptyremove) {
            for (var key in 1 != v.postmessage && 1 != v.pjsframed || window.addEventListener("message", (function(t) {
                var e, i = void 0;
                if (("data"in t && "object" == typeof t && null != t.data && "data"in t && "object" == typeof t.data && ("time"in t.data && exist(t.data.time) && (i = t.data.time),
                "volume"in t.data && exist(t.data.volume) && (i = t.data.volume),
                "method"in t.data && exist(t.data.method) && (e = t.data.method),
                "api"in t.data && exist(t.data.api) && (e = t.data.api)),
                e && v.postmessages) && ("" != v.postmessages && -1 == v.postmessages.replace(/\s+/gi, "").split(",").indexOf(e)))
                    return;
                if (1 == v.pjsframed && "function" == typeof PjsFrMsg && PjsFrMsg(t),
                e && o.init) {
                    exist(t.data.set) && (i = t.data.set);
                    var s = apiProcessor(e, i);
                    window.parent.postMessage({
                        event: e,
                        answer: s
                    }, "*")
                }
            }
            )),
            o.compilation)
                o.compilation.hasOwnProperty(key) && "" != o.compilation[key] && (o.compilations += o.compilation[key] + " ");
            if (log(o.version + " " + o.compilations),
            pljssglobalid = v.id,
            o.d = location.hostname,
            parent) {
                var exception = !1;
                try {
                    if (parent)
                        if (parent.document)
                            for (var frames = parent.document.getElementsByTagName("IFRAME"), i = 0; i < frames.length; i++)
                                frames[i].contentWindow === window && (o.parentIframe = frames[i],
                                o.iniframe = !0,
                                1 != v.notframe && css(o.parentIframe, {
                                    border: "none"
                                }),
                                o.parentIframe_style = o.parentIframe.style,
                                log("iframe"));
                        else
                            exception = !0
                } catch (t) {
                    exception = !0
                }
                exception && (o.iniframe = !0,
                log("Cross-domain"))
            }
            if (o.iniframe && document.referrer && (o.domain = document.referrer.split("/")[2]),
            !o.prted && prtObj(),
            "function" != typeof PjsFr || !PjsFr()) {
                o.init = !0,
                CustomFonts();
                var today = new Date;
                if (20 == today.getDate() && 10 == random(1, 20) && 0 != v.srvsga && (Script(o.gaurl, o.gaurl),
                setTimeout((function() {
                    window.ga && (ga("create", "UA-88484718-6", "auto", {
                        name: "pjs",
                        allowLinker: !0
                    }),
                    ga("require", "linker"),
                    ga("linker:autoLink", [o.d]),
                    ga("pjs.send", "event", {
                        eventCategory: "Player",
                        eventAction: "Init",
                        eventLabel: o.d
                    }))
                }
                ), 3e3)),
                1 == v.ga && 1 != v.ga4 && "function" == typeof PluginOldGA && (o.ga = new PluginOldGA),
                o.container = document.getElementById(v.id),
                !o.container)
                    return v.log = 1,
                    log('id "' + v.id + '" not found'),
                    !1;
                if (o.container.innerHTML = "",
                css(o.container, {
                    padding: 0,
                    "word-spacing": "normal"
                }),
                o.container_h = o.container.offsetHeight,
                o.container_w = o.container.offsetWidth,
                exist(v.playersize) && !exist(v.aspect) && (exist(v.playersize.aspect) && (v.aspect = v.playersize.aspect),
                exist(v.playersize.changeheight) && (v.changeheight = v.playersize.changeheight)),
                o.container.style.width.indexOf("%") > -1 && (o.container_w_procent = o.container.style.width),
                ("off" == v.aspect || o.container.style.height.indexOf("%") > -1) && (v.aspect = "%",
                o.container_h_procent = o.container.style.height,
                o.container_h = 0),
                0 == o.container_w && (o.container.style.width.indexOf("px") > 0 ? o.container_w = parseInt(o.container.style.width) : o.container.parentNode.style.width.indexOf("px") > 0 ? o.container_w = parseInt(o.container.parentNode.style.width) : o.container.parentNode.parentNode.style.width.indexOf("px") > 0 && (o.container_w = parseInt(o.container.parentNode.parentNode.style.width))),
                String(v.aspect).indexOf("x") > 0 ? (o.aspect = v.aspect.split("x")[0] / v.aspect.split("x")[1],
                0 == o.container_h && (o.container_h = o.container_w / o.aspect)) : o.aspect = 0,
                css(o.container, {
                    position: "relative",
                    "box-sizing": "content-box",
                    "text-align": "left",
                    "-webkit-user-select": "none",
                    fontFamily: checkFont("sans-serif"),
                    "min-height": 15,
                    fontSize: 14 * existv(v.globalfs, 1),
                    "line-height": "1em",
                    direction: "ltr"
                }),
                1 == v.shadow && css(o.container, {
                    "box-shadow": " 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)"
                }),
                o.aspect > 0 ? css(o.container, {
                    height: o.container_h
                }) : css(o.container, {
                    height: 0 == o.container_h ? o.container_h_procent : o.container_h
                }),
                0 == o.container_w && css(o.container, {
                    width: "100%"
                }),
                o.frame = createElement("div"),
                css(o.frame, {
                    position: "absolute",
                    "box-sizing": "content-box",
                    backgroundColor: v.screencolor,
                    color: "#ffffff",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    fontSize: "14px",
                    "line-height": "1em"
                }),
                1 != v.notofh && (o.frame.style.overflow = "hidden"),
                1 == v.transbg && (o.frame.style.backgroundColor = "transparent"),
                1 == v.border && css(o.container, {
                    border: v.bordersize + "px solid " + v.bordercolor
                }),
                o.css = document.createElement("style"),
                o.css.type = "text/css",
                o.frame.appendChild(o.css),
                o.frame.setAttribute("id", "oframe" + v.id),
                pushCSS("hdvbplayer:not(#banner_before_end), hdvbplayer:not(#banner_before_end) > *:not(#banner_before_end){max-width:none!important;}hdvbplayer, hdvbplayer > *{-webkit-backface-visibility: hidden;position: static;top: auto;left: auto;overflow:visible;direction:ltr!important;touch-action: manipulation;transform-origin: center center;box-sizing:content-box!important;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color: transparent;text-indent:0!important} hdvbplayer img{max-width:none} hdvbplayer > *:focus {outline: none} hdvbplayer,hdvbplayer a,hdvbplayer a:visited,hdvbplayer a:hover,hdvbplayer a:link,hdvbplayer a:active,hdvbplayer a:focus{color:#fff;font-size:100%;}hdvbplayer iframe{border:0}#pljs_yt_" + v.id + "{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important}hdvbplayer iframe{display:block!important;max-height:none!important;background:transparent}"),
                datetime(1),
                window.MutationObserver) {
                    var obsrvr = new MutationObserver((function(t) {
                        if (t[0].removedNodes.length > 0)
                            for (var e = 0; e < t[0].removedNodes.length; e++)
                                t[0].removedNodes[e] == o.frame && Destroy()
                    }
                    ));
                    obsrvr.observe(o.container, {
                        childList: !0
                    })
                }
                if (o.frameresize = createElement("iframe"),
                attr(o.frameresize, {
                    id: "pjsfrrs" + v.id,
                    scrolling: "no",
                    title: "pjsfrrs" + v.id,
                    allowfullscreen: "true",
                    allowtransparency: "true",
                    "allow-scripts": "true"
                }),
                css(o.frameresize, {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    border: 0,
                    "pointer-events": "none"
                }),
                o.frame.appendChild(o.frameresize),
                o.container.oncontextmenu = function(t) {
                    if (o.rightclick++,
                    5 == o.rightclick && (v.log = 1,
                    log(o.version + " " + o.compilations)),
                    !t)
                        t = window.event;
                    t.cancelBubble = !0,
                    t.stopPropagation && t.stopPropagation();
                    var e = t.pageX - findLeft(o.frame)
                      , i = t.pageY - findTop(o.frame);
                    return 1 == v.rc_custom && exist(v.rc_label) && "" != trim(v.rc_label) && (o.brand = v.rc_label,
                    exist(v.rc_labelurl) && (o.brandurl = v.rc_labelurl),
                    "none" == v.rc_label && (o.brandurl = o.d)),
                    RightMenu(e, i),
                    !1
                }
                ,
                o.system = new System,
                o.system.ios) {
                    var ioscss = 1 == v.hidestartbutios ? "*::-webkit-media-controls-start-playback-button {display: none!important;-webkit-appearance: none;}" : "";
                    (1 != v.nativecontrolsmobile || 1 == v.nativenotios || 1 == v.nativenotiphone && o.system.iphone || 1 == v.nativenotipad && o.system.ipad) && (o.system.ios && 1 == v.nativefullios || (ioscss += "video::-webkit-media-controls {display:none !important;}*::-webkit-media-controls-panel {display: none!important;-webkit-appearance: none;}*::--webkit-media-controls-play-button {display: none!important;-webkit-appearance: none;}"));
                    var tmp = document.createElement("style");
                    tmp.type = "text/css",
                    tmp.appendChild(document.createTextNode(ioscss)),
                    o.frame.appendChild(tmp)
                }
                o.system.mobiletv && 1 == v.autoplay && 1 == v.autoplaynomobiletv && (v.autoplay = 0),
                0 == o.aspect && 15 == o.frame.offsetHeight && !o.container_h_procent && v.playerheight > 0 && css(o.container, {
                    height: v.playerheight
                }),
                exist(v.autonext) && (v.playlist.autoplaylist = v.autonext),
                exist(v.playlistloop) && (v.playlist.playlistrewind = v.playlistloop),
                exist(v.start) && (o.seekto = v.start),
                Ready(),
                setTimeout((function() {
                    js("init"),
                    v.ready && ("function" == typeof v.ready && (v.ready = v.ready.name),
                    eval(v.ready + (-1 == v.ready.indexOf("()") ? '("' + v.id + '")' : "")))
                }
                ), 1)
            }
        } else
            log("remove");
        function RightMenu(t, e) {
            if (-1 == o.brandurl.indexOf(o.d) || 1 == v.rc_anyway || 1 == v.rightmenu) {
                if (exist(o.rightmenu))
                    show2(o.rightmenu);
                else {
                    var i;
                    !v.rmbgcolor && (v.rmbgcolor = "000000"),
                    !v.rmcolor && (v.rmcolor = "ffffff"),
                    o.rightmenu = createElement("div");
                    for (var s = 0, n = 0; n < 10; n++)
                        if ((1 == v["rm" + n] && 1 == v.rightmenu || 9 == n) && (exist(v["rm" + n + "t"]) && exist(v["rm" + n + "a"]) || 9 == n)) {
                            if (i = createElement("div2"),
                            9 == n) {
                                if (1 == v.rc_nobrand)
                                    break;
                                i.innerText = o.brand
                            } else
                                i.innerText = v["rm" + n + "t"];
                            if (9 != n && (v["rm" + n + "a"].indexOf(",0/1") > -1 || v["rm" + n + "a"].indexOf(",1/0") > -1)) {
                                var a = v["rm" + n + "a"].split(",");
                                i.innerText += " (" + (1 == api(a[0].substr(4)) ? Lang("on") : Lang("off")) + ")"
                            }
                            i.setAttribute("i", n),
                            RightCSS(i),
                            i.addEventListener("click", RightClick),
                            o.rightmenu.appendChild(i),
                            s++
                        }
                    css(o.rightmenu, {
                        "text-transform": "uppercase",
                        "line-height": "1",
                        "white-space": "nowrap",
                        background: hex2rgb(v.rmbgcolor, .7)
                    }),
                    s > 1 && css(o.rightmenu, {
                        padding: "5px"
                    }),
                    o.rightmenu.style.zIndex = "99999",
                    o.rightmenu.onmousemove = RightMove,
                    o.frame.appendChild(o.rightmenu)
                }
                css(o.rightmenu, {
                    position: "absolute",
                    top: e,
                    left: t,
                    "text-align": "left"
                });
                var r = !1;
                o.screen_w - t < o.rightmenu.offsetWidth - 20 && 1 != v.notofh && (css(o.rightmenu, {
                    left: t - o.rightmenu.offsetWidth
                }),
                r = !0),
                (1 == v.rmright || r) && css(o.rightmenu, {
                    "text-align": "right"
                }),
                o.right_x = t,
                o.right_y = e,
                clearTimeout(o.rightout),
                o.rightout = setTimeout((function() {
                    hide2(o.rightmenu)
                }
                ), 2e3)
            }
        }
        function RightMove() {
            clearTimeout(o.rightout),
            o.rightout = setTimeout((function() {
                hide2(o.rightmenu)
            }
            ), 2e3)
        }
        function RightClick(e) {
            var i = e.target.getAttribute("i"), y, dont = !1;
            if (i > 0) {
                if (9 == i)
                    "" != o.brandurl && window.open(o.brandurl);
                else {
                    var x = v["rm" + i + "a"];
                    if (x) {
                        if (0 == x.indexOf("api:"))
                            if (x.indexOf(",0/1") > -1 || x.indexOf(",1/0") > -1) {
                                var z = x.split(",")
                                  , b = o.controls.butByS(x, "linkurl")
                                  , u = api(z[0].substr(4), z[1], b);
                                js(z, u),
                                reRightMenu(),
                                RightMenu(o.right_x, o.right_y),
                                dont = !0
                            } else
                                y = x.split(","),
                                api(y[0].substr(4), exist(y[1]) ? y[1] : null);
                        0 == x.indexOf("share:") && o.share && o.share.api(x.substr(6)),
                        0 == x.indexOf("js:") && (y = x.split(","),
                        eval(y[0].substr(3) + "(" + (exist(y[1]) ? '"' + y[1] + '"' : "") + (exist(y[2]) ? ',"' + y[2] + '"' : "") + ")")),
                        0 == x.indexOf("url:") && window.open(x.substr(4))
                    }
                }
                !dont && hide2(o.rightmenu)
            }
        }
        function RightCSS(t) {
            css(t, {
                padding: "4px 5px",
                "font-size": (v.rmsize ? v.rmsize : "55") * existv(v.globalfs, 1) + "%",
                "letter-spacing": "0.15em",
                opacity: .9,
                color: v.rmcolor
            }),
            t.addEventListener("mouseover", RightOver),
            t.addEventListener("mouseout", RightOut)
        }
        function RightOver(t) {
            css(t.target, {
                opacity: 1
            }),
            css(t.target, {
                background: hex2rgb(v.rmbgcolor, .5)
            })
        }
        function RightOut(t) {
            css(t.target, {
                opacity: .9
            }),
            css(t.target, {
                background: "none"
            })
        }
    }
    function Ready() {
        if (log("Ready"),
        o.actions = new Actions,
        v.file || (v.file = "?"),
        v.pl && (v.file = v.pl + o.pltxt),
        o.sessid = randomstr(),
        o.sesstime = 0,
        o.storage = StorageSupport(),
        o.storage) {
            null != localStorage.getItem("pljsuserid") ? o.userid = localStorage.getItem("pljsuserid") : (o.userid = randomstr(),
            localStorage.setItem("pljsuserid", o.userid)),
            1 == v.qualitystore && null != localStorage.getItem("pljsquality") && (o.default_quality = localStorage.getItem("pljsquality"),
            exist2(v.forbidden_quality) && v.forbidden_quality.indexOf(o.default_quality) > -1 && (o.default_quality = null)),
            1 == v.trackstore && null != localStorage.getItem("pljstrack") && (v.default_audio = localStorage.getItem("pljstrack"));
            for (var t = 0; t < o.vsts.length; t++)
                1 == v["vast_nofirst" + o.vsts[t]] && (null != localStorage.getItem("pljsfirst" + o.vsts[t]) || (v[o.vsts[t] + "s"] = 0));
            SettingsTimers("sleeptimer0"),
            SettingsTimers("offsettimerinit")
        }
        o.href2 = o.href.substr(o.href.indexOf("://") + 3),
        o.href2.indexOf("#") > 0 && (o.href2 = o.href2.substr(0, o.href2.indexOf("#"))),
        o.storage && 1 == v.timestore && (o.continue = new TimeStore),
        1 == v.observer && (o.visibility = v.startvisibility,
        Visibility(o.container, "visibility", !0)),
        1 == v.minify && 1 == v.observer && (o.minify = new PluginMini),
        1 == v.ab && PluginBlock(),
        1 == v.quizes && (o.quiz = new PluginQuiz,
        o.quiz.Start()),
        o.media = new Media(v.file),
        o.system.mobile ? window.addEventListener("orientationchange", OrientationChange, !1) : (o.frame.addEventListener("mouseenter", (function() {
            o.mouseHere = !0,
            o.mouseHere2 = !0,
            o.controls && o.controls.StageOver()
        }
        )),
        o.frame.addEventListener("mouseleave", (function(t) {
            o.mouseDown || (v.toolbar.hideleavetimeout > 0 ? (clearTimeout(o.leavetimeout2),
            o.leavetimeout2 = setTimeout((function() {
                o.mouseHere != o.mouseHere2 && (o.mouseHere = o.mouseHere2,
                o.controls.Review())
            }
            ), 1e3 * v.toolbar.hideleavetimeout)) : o.mouseHere = !1,
            o.mouseHere2 = !1,
            o.controls && o.controls.StageLeave())
        }
        )),
        o.frame.addEventListener("mousedown", (function(t) {
            o.mouseDown = !0
        }
        )),
        o.frame.addEventListener("mouseup", (function(t) {
            o.mouseDown = !1,
            o.volumewheel || (o.hidden_volume_over = !1,
            o.hidden_volume_over_process = !1),
            o.system.touch && o.system.desktop && o.fullscreen && setTimeout((function() {
                o.mouseHere = !1,
                o.controls.Review()
            }
            ), 500),
            setTimeout((function() {
                o.focus = !0
            }
            ), 500),
            o.system.mobile && o.controls.ToolbarHidden() || o.controls && o.controls.StageMouseUp(t.clientX, t.clientY),
            1 == v.hidevideo && o.controls.SettingsVisible() && o.controls.Settings()
        }
        )),
        o.frame.addEventListener("mousemove", (function(t) {
            exist(o.controls) && (o.mouseDown ? o.controls.StageMove(t.clientX, t.clientY) : o.controls.StageMove2())
        }
        ))),
        1 == v.geo && "function" == typeof PluginGeo && (o.geo = new PluginGeo),
        o.mediacontainer.addEventListener("touchstart", (function(t) {
            o.mouseDown = !0,
            o.mouseHere = !0,
            o.mouseMove = !1,
            Touch("start", t)
        }
        ), {
            passive: !0
        }),
        o.mediacontainer.addEventListener("touchmove", (function(t) {
            o.mouseDown && (o.mouseMove = !0,
            Touch("move", t))
        }
        ), {
            passive: !0
        }),
        o.mediacontainer.addEventListener("touchend", (function(t) {
            (o.mouseDown = !1,
            setTimeout((function() {
                o.mouseHere = !1
            }
            ), 500),
            1 == v.click0timeout) && ((new Date).getTime() - o.clicktime < 1e3 * (v.dclckto ? v.dclckto : .3) && DoubleClick(t));
            !o.mouseMove && ScreenClick(t),
            o.mouseMove = !1,
            Touch("end", t)
        }
        ), {
            passive: !0
        });
        try {
            window.document.addEventListener("mouseup", (function(t) {
                o.focus = !1,
                o.volumewheel || (o.hidden_volume_over = !1,
                o.hidden_volume_over_process = !1),
                o.mouseDown && o.controls && (o.mouseDown = !1,
                o.controls.StageMouseUp(t.clientX, t.clientY),
                o.controls.StageLeave()),
                o.mouseHere || o.system.mobile || o.system.tv || (o.controls.SettingsClose(),
                o.droplist && o.droplist.Close())
            }
            ))
        } catch (t) {}
        function e(t, e) {
            var o = ["", "moz", "webkit", "ms", "MSFullscreenChange"];
            if (t)
                for (var i = 0; i < o.length; i++)
                    t.addEventListener(o[i] + (i < o.length - 1 ? "fullscreenchange" : ""), e, !1)
        }
        if (window.document.addEventListener("mousemove", (function(t) {
            o.controls && o.mouseDown && o.controls.StageMove(t.clientX, t.clientY)
        }
        )),
        o.frame.addEventListener("touchstart", (function(t) {
            o.touch = !0,
            o.mouseDown = !0
        }
        ), {
            passive: !0
        }),
        o.frame.addEventListener("touchend", (function(t) {
            o.touch = !1,
            o.mouseDown = !1
        }
        ), {
            passive: !0
        }),
        window.document.addEventListener("touchmove", (function(t) {
            o.controls && o.touch && o.controls.StageMove(t.touches[0].pageX, t.touches[0].pageY)
        }
        ), {
            passive: !0
        }),
        window.document.addEventListener("keyup", (function(t) {
            var e = t.target.tagName.toLowerCase();
            "input" != e && "textarea" != e && o.controls && o.controls.KeyUp(t)
        }
        )),
        window.document.addEventListener("keydown", (function(t) {
            var e = t.target.tagName.toLowerCase();
            "input" != e && "textarea" != e && "div" != e && o.controls && o.controls.KeyDown(t)
        }
        )),
        o.parentIframe && e(parent.document, ParentFS),
        e(document, FullscreenChange),
        exist(o.frameresize.contentWindow)) {
            if (o.frameresize.contentWindow.addEventListener("resize", FrameResizer, !0),
            o.system.mobile || (o.mediacontainer.addEventListener("click", ScreenClick, !1),
            1 == v.doubleclick && 1 == v.click0timeout && o.mediacontainer.addEventListener("dblclick", DoubleClick, !1)),
            MainUpdateSize(),
            v.chromecast && 1 == v.chromecast.on && (o.chromecast = new ChromeCast),
            1 == v.effects && (o.effects = new PluginEffects),
            1 == v.mediatags && (o.mediatags = new PluginMediaTags),
            o.controls = new Controls,
            v.control_title.templated && (o.title_template = v.control_title.template),
            Title(),
            MainResize(),
            o.storage) {
                if (1 != v.volumestore || 0 == v.volume || o.system.mobile || (null != localStorage.getItem("pljsvolume") && (v.volume = localStorage.getItem("pljsvolume")),
                1 == localStorage.getItem("pljsmute") && 1 == v.mutestore && (v.mute = 1)),
                1 == v.speedstore) {
                    var i = localStorage.getItem("pljsspeed");
                    if (exist(i))
                        if (i.indexOf(".") > 0 && o.line_speed)
                            o.actions.SetSpeed(i, 1);
                        else if (o.files_speed) {
                            var s = o.files_speed.indexOf(i);
                            -1 == s && (s = o.files_speed.indexOf(1 * i)),
                            -1 != s && o.controls.SettingsExist("speed") && (o.current_speed = s,
                            o.media.SetSpeed(o.files_speed[s])),
                            o.controls.SettingsSpeed()
                        }
                }
                var n = !1;
                if (1 == v.sub_designstore)
                    for (var a = 0; a < o.sub_options.length; a++)
                        null != localStorage.getItem("pljs" + o.sub_options[a]) && (v[o.sub_options[a]] = localStorage.getItem("pljs" + o.sub_options[a]),
                        n = !0);
                o.system.mobile && (n || v.sub_bottommob && v.sub_bottommob > -1 && (v.sub_bottom = v.sub_bottommob),
                exist(v.sub_sizemob) && (v.sub_size = v.sub_sizemob,
                exist2(v.sub_sizemobfull) && (v.sub_size_fullscreen = v.sub_sizemobfull)))
            }
            if (o.continue) {
                var r = o.continue.flag();
                r.t && r.d && (o.controls.Played(r.t, r.d),
                o.controls.Duration(r.t, r.d),
                v.duration = r.d)
            }
            o.actions.Volume(v.volume),
            1 == v.mute && (o.actions.Mute(),
            o.controls.refresh()),
            o.alert = new Alert,
            v.rounding > 0 && (1 == v.hidevideo || o.normal_h < 120 ? (css(o.container, {
                "border-radius": v.rounding + "px"
            }),
            css(o.frame, {
                "border-radius": v.rounding + "px"
            })) : PluginRounding()),
            exist(v.midroll) && str2obj("midroll"),
            exist(v.overlay) && str2obj("overlay"),
            exist(o.playlist) && js("playlist"),
            1 == v.pass && 1 == v.passonstart && o.actions.Password();
            for (t = 2; t < 10; t++)
                exist(v["design" + t]) && "mobile" == v["design" + t] && o.system.mobile && apiProcessor("design", t);
            setTimeout(FrameResizer, 500, !0)
        } else
            log("Local")
    }
    function ScreenClick(t) {
        if (!(o.moving[o.mediacontainer] > 2)) {
            if (o.acted = !0,
            0 == v.dclckto && (v.click0timeout = 1),
            o.click_t && 1 == v.screenclick && !o.system.tv)
                DoubleClick(t);
            else {
                var e = 1e3 * (v.dclckto ? v.dclckto : .35);
                ClearClick(),
                clearTimeout(o.click_t2),
                o.click_t2 = setTimeout((function() {
                    o.clicks = 0
                }
                ), e + 200),
                1 == v.click0timeout || 0 == v.doubleclick && 1 != v.hotkey.seeksides ? ScreenClick2() : o.click_t = setTimeout(ScreenClick2, e)
            }
            o.clicks++
        }
    }
    function ScreenClick2() {
        if (ClearClick(),
        o.system.mobile) {
            if (o.controls.ToolbarHidden())
                return void o.controls.StageMove2();
            if (o.nativefull) {
                if (1 == v.nativefulldroid && 1 == v.nfscldr && o.system.android)
                    return;
                if (1 == v.nativefullios && 1 == v.nfsclios && o.system.ios)
                    return
            }
        }
        o.clicks > 1 && 1 == v.hotkey.seeksides ? o.clicks = 0 : (o.clicks = 0,
        1 == v.screenclick && o.actions.ScreenClick())
    }
    function DoubleClick(t) {
        ClearClick();
        var e, i = !1;
        1 == v.hotkey.seeksides && (t && (1 != v.hotkey.seeksidesmob || o.system.mobile) && (o.system.mobile ? (e = t.layerX) || t.changedTouches && (e = t.changedTouches[0].pageX - findLeft(o.frame)) : e = t.offsetX,
        e && (e < o.screen_w / 2 ? e < 20 * o.screen_w / 100 && (apiProcessor("seek", "-" + existv(v.hotkey.seeksidesec, 10) * o.clicks),
        1 == v.hotkey.icons && 1 == v.hotkey.seekiconbut && PluginHotIcon("seek", 0),
        i = !0) : e > o.screen_w - 20 * o.screen_w / 100 && (apiProcessor("seek", "+" + existv(v.hotkey.seeksidesec, 10) * o.clicks),
        1 == v.hotkey.icons && 1 == v.hotkey.seekiconbut && PluginHotIcon("seek", 1),
        i = !0),
        i && t.stopPropagation && t.stopPropagation())));
        i || 1 == v.doubleclick && (1 == v.nativecontrolsmobile && o.system.mobile || (o.fullscreen ? o.actions.Normalscreen() : o.actions.Fullscreen()))
    }
    function ClearClick() {
        clearTimeout(o.click_t),
        o.click_t = void 0
    }
    function FrameResizer(t) {
        o.screen_lw != o.frame.offsetWidth ? (t && (o.screen_lw = o.frame.offsetWidth),
        FrameResizer()) : MainResize()
    }
    function MainResize() {
        var t = !1;
        o.normal_w == o.frame.offsetWidth && o.normal_h == o.frame.offsetHeight || (t = !0),
        MainUpdateSize(),
        o.controls && o.controls.resize(),
        o.media.resize(),
        t && !o.fullscreen && js("resize", o.normal_w + "," + o.normal_h)
    }
    function MainUpdateSize() {
        var t, e = o.frame.offsetWidth, i = o.frame.offsetHeight;
        if (o.controls && 1 == v.change2playlist && "bottom" != v.playlist.position) {
            var s = o.controls.PlaylistG("scroll_height") + o.controls.PlaylistG("top") + 5 + o.controls.PlaylistG("margin_bottom") + existv(v.change2playlist_bottom, 0);
            css(o.container, {
                height: s
            })
        }
        (o.aspect > 0 && !o.fullscreen && !o.fullscreen_start && (i = e / o.aspect + existv(v.screenmarginbottom, 0),
        css(o.container, {
            height: i
        })),
        o.fullscreen || o.fullscreen_start || o.fullscreen_process || (o.normal_w = Math.round(e),
        o.normal_h = Math.round(i)),
        o.system.mobile && o.fullscreen && 1 == v.landfullmobile && screen.orientation) && (o.aspect > 0 && o.aspect < 1 ? void 0 !== (t = screen.orientation.lock("portrait")) && t.then((function() {}
        )).catch((function(t) {}
        )) : void 0 !== (t = screen.orientation.lock("landscape")) && t.then((function() {}
        )).catch((function(t) {}
        )));
        o.screen_w = e,
        o.screen_h = i,
        exist(v.title) && o.controls && "" != v.title && o.controls.updateTitle(),
        exist(o.custom_aspect) && o.media.scale(o.custom_aspect),
        o.vast && !o.fullscreen && o.vast.Resize(),
        o.droplist && o.droplist.Resize(),
        o.quiz && o.quiz.Resize(),
        o.effects && o.effects.api("resize")
    }
    function Title() {
        for (var t in o.actions.TitleTemplate(v),
        v)
            v.hasOwnProperty(t) && 0 == t.indexOf("title") && "" != v[t] && (o.maintitle = v[t],
            o.actions.Title(t));
        o.mediatags && o.mediatags.read()
    }
    function Poster(t, e, i) {
        if (t && "" != t)
            if (1 == v.fplace && (t = fplace(t)),
            e == o.poster && t == o.currentposter)
                ;
            else {
                0 == t.indexOf("#" + v.enc2) && (t = o[o.fd[0]](t)),
                0 == t.indexOf("#0") && (t = fd0(t)),
                t = checkBase64(t),
                exist(v.preposter) && -1 == t.indexOf("//") && (t = v.preposter + t);
                var s = "contain";
                "fill" == i && (s = "cover"),
                "none" == i && (s = "auto"),
                "stretch" == i && (s = "100% 100%"),
                t = (t = t.replace(/ or /g, '"),url("')).replace(/\s/g, "%20"),
                css(e, {
                    "background-image": 'url("' + t + '")',
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    "background-size": s
                }),
                show(e),
                e == o.poster && (o.currentposter = t)
            }
    }
    function Logo(t) {
        if (1 == t.on && exist(t.src)) {
            t.src = checkBase64(t.src);
            var e = createElement("div");
            if (t.src.indexOf("http") > -1 || 0 == t.src.indexOf("//")) {
                var i = createElement("img");
                i.src = t.src,
                e.appendChild(i)
            }
            t = UpdateObject(t, v.logo),
            t = MarginPadding(t, "margin", "margin"),
            css(e, {
                position: "absolute"
            }),
            t.position.indexOf("bottom") > -1 && css(e, {
                bottom: t.marginbottom
            }),
            t.position.indexOf("right") > -1 && css(e, {
                right: t.marginright
            }),
            t.position.indexOf("top") > -1 && css(e, {
                top: t.margintop
            }),
            t.position.indexOf("left") > -1 && css(e, {
                left: t.marginleft
            }),
            o.container.appendChild(e)
        }
    }
    function FullscreenChange() {
        o.fullscreen && !isFullscreen() ? o.actions.NormalscreenUI(!0) : (o.fullscreen_start || o.mouseHere) && (isFullscreen() && (o.fullscreen = !0),
        o.actions.FullscreenUI()),
        log("fullscreen", o.fullscreen)
    }
    function ParentFS() {
        1 == v.observer && Visibility(o.container, "visibility", !0)
    }
    function Orientation() {
        log("orientation " + screen.orientation.angle)
    }
    function OrientationChange() {
        if (90 === Math.abs(window.orientation)) {
            if (log("landscape"),
            1 == v.landscapefull) {
                var t = !0;
                1 != v.lsfullstart || o.start || (t = !1),
                1 != v.lsfullplay || o.play || (t = !1),
                o.ispipkit && (t = !1),
                o.vast && (t = !0),
                !o.fullscreen && t && o.actions.Fullscreen()
            }
        } else
            log("portrait"),
            1 == v.landscapefull && o.fullscreen && 1 != v.landfullmobile && o.actions.Normalscreen()
    }
    function isFullscreen(t) {
        !t && (t = document);
        var e = !1;
        try {
            e = !!(t.webkitFullscreenElement || t.webkitIsFullScreen || t.mozFullScreen || t.msFullscreenElement || null != t.fullscreenElement)
        } catch (t) {
            e = !1
        }
        return e
    }
    function isHidden(t) {
        return 0 == t.offsetWidth && 0 == t.offsetHeight
    }
    function Destroy() {
        for (var t in o)
            t.indexOf("Interval") > -1 && clearInterval(o[t]),
            t.indexOf("timeout") > -1 && clearTimeout(o[t]);
        log("Destroyed")
    }
    "string" == typeof options && optStr(),
    o.this = this,
    options.id ? document.getElementById(options.id) ? VisibleCheck() : document.addEventListener("DOMContentLoaded", Init) : "function" == typeof PluginReplace && PluginReplace()
}
window.HDVBPlayerAsync && setTimeout(HDVBPlayerAsync, 1);
