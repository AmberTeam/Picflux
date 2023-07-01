if (!window.pljssglobal) var
	pljssglobalid, pljssglobal = [];

function setCookie(e, t, o) {
	o = 365;
	var n = new Date;
	n.setDate(n.getDate() + o);
	var s = escape(t) + (null == o ?
		"" : "; expires=" + n
		.toUTCString());
	document.cookie = e + "=" + s
}

function getCookie(e) {
	var t, o, n, s = document.cookie
		.split(";");
	for (t = 0; t < s.length; t++)
		if (o = s[t].substr(0, s[t]
				.indexOf("=")), n = s[t]
			.substr(s[t].indexOf("=") +
				1), (o = o.replace(
				/^\s+|\s+$/g, "")) == e)
			return unescape(n)
}

function HDVBPlayer(options) {
	var o = {
		play: !1,
		audiosrc: [],
		audioctx: [],
		default_w: 640,
		default_h: 360,
		version: "16.6.1",
		compilation: ["HLS",
			"VASTP"],
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
				on: 1,
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
				bgpadding: "12 12 12 12",
				letterspacing: "0",
				showtitleplaylist: 1,
				font: "Roboto",
				fontsize: 16
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
			qrtag: 0,
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
			x: ["preroll",
				"pauseroll",
				"postroll",
				"midroll"
			]
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
		small: window.screen.width <
			1e3 && window.screen
			.height < 1e3,
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
		KKReydtB: function(e) {},
		reloaderTimer: 0,
		timerTime: 200,
		tagvideo: !1,
		controlover: !1,
		doctype: document.doctype,
		d: location.hostname,
		domain: location.hostname,
		href: location.href,
		https: 0 == location.href
			.indexOf("https"),
		logos: {},
		gaurl: "google-analytics.com/analytics.js",
		fd: ["KKReydtB",
			"QhbZazyH"],
		files_speed: [],
		files_scale: [],
		files_sleep: [],
		custom_speed: 1,
		gifed: [],
		QhbZazyH: function(e) {},
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
		sub_options: [
			"sub_sizeproc",
			"sub_color",
			"sub_color2",
			"sub_bgcolor",
			"sub_bga",
			"sub_shadow",
			"sub_weight",
			"sub_bottom",
			"sub_shift",
			"sub_reset"
		],
		clr_options: [
			"clr_contrast",
			"clr_brightness",
			"clr_saturate",
			"clr_sepia"
		],
		vast_impressions: 0,
		vast_impressions_all: 0,
		vast_starts: 0,
		vpaid_starts: 0,
		vast_longtimeout: 0,
		midrollimprsd: [],
		vsts: ["preroll",
			"pauseroll",
			"postroll",
			"midroll"
		],
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
	"object" == typeof o_params &&
		Object.keys(o_params.u).length >
		0 && Object.keys(o_params.u)
		.forEach(function(e) {
			"playlist" == e ? Object
				.keys(o_params.u
					.playlist)
				.forEach(function(
				e) {
					o.u.playlist[
							e] =
						o_params
						.u
						.playlist[
							e]
				}) : o.u[e] =
				o_params.u[e]
		}), "playlist" in o.u && (o.u
			.playlist.on = 1, o.u
			.playlist.dontplay = 1, o.u
			.playlist.openlast = 1),
		"control_line" in o.u && (o.u
			.control_line.pointed = 1),
		o.u.timestore = 1;
	let customParams;

	function getVastUrl(e, t) {
		let n = e.split("#"),
			s = -1 != n[0].indexOf(
			"?") ? "&" : "?",
			a = "host" in o.p ? o.p
			.host : "VASTHost_Fail";
		return "masterHash" in o.p &&
			"host" in o.p && (a =
				`${o.p.masterHash}|${t}|${o.p.host}`
				),
			`${n[0]}${s}cp.host=${a}&cp.ip=${"userIp"in o.p?o.p.userIp:"VASTIP_Fail"}&cp.token=${o.p.movie}#${n[1]}`
	} ["host", "masterId", "masterHash",
		"userIp", "movie", "key",
		"href", "kp", "uniq_hash",
		"translator"
	].map(function(e) {
		e in options && (o.p[
			e] = options[e])
	});
	let pointsArr = [];
	if ("rek" in options) {
		if ("preroll" in options.rek) {
			if (options.rek.preroll
				.length > 0) {
				o.u.ad = 1, o.u
					.vast_jsblck = 0;
				let prerollIntCounter =
					1,
					prerollNumCounter =
					0;
				options.rek.preroll.map(
					function(e) {
						o.p["hdvb_preroll_" +
								prerollIntCounter
								] = {
								title: "HDVB Preroll " +
									prerollIntCounter,
								id: "hdvbpreroll_" +
									prerollIntCounter,
								preroll: getVastUrl(
									e,
									1 ==
									prerollIntCounter ?
									"6" :
									"7"
									)
							}, o.u[
								"partnerpreroll_" +
								prerollIntCounter
								] =
							"hdvb_preroll_" +
							prerollIntCounter,
							prerollNumCounter >
							0 && (o
								.u["partnerprerollor" +
									prerollNumCounter
									] =
								"and"
								), o
							.u
							.vast_preroll_limit =
							prerollIntCounter,
							prerollIntCounter++,
							prerollNumCounter++
					})
			} else o.u.prerolls = 0
		} else o.u.prerolls = 0;
		if ("midroll" in options.rek) {
			if (options.rek.midroll
				.length > 0) {
				o.u.ad = 1, o.u
					.vast_jsblck = 0;
				let midrollIntCounter =
					1;
				options.rek.midroll.map(
					function(e) {
						o.p["hdvb_midroll_" +
							midrollIntCounter
							] = {
							title: "HDVB Midroll " +
								midrollIntCounter,
							id: "hdvbmidroll_" +
								midrollIntCounter,
							preroll: getVastUrl(
								e
								.url,
								8
								),
							pauseroll: getVastUrl(
								e
								.url,
								8
								),
							postroll: getVastUrl(
								e
								.url,
								8
								),
							midroll: getVastUrl(
								e
								.url,
								8
								)
						};
						let t =
							parseInt(
								e
								.time
								.replace(
									"%",
									""
									)
								);
						pointsArr
							.push({
								time: t,
								width: 2
							}), o.u[
								"partnermidroll_" +
								midrollIntCounter
								] =
							"hdvb_midroll_" +
							midrollIntCounter,
							o.u["partnermidrolltimes" +
								(midrollIntCounter >
									1 ?
									midrollIntCounter :
									""
									)
								] =
							e.time,
							o.u["midroll" +
								(midrollIntCounter >
									1 ?
									midrollIntCounter :
									""
									)
								] =
							"prthdvb_midroll_" +
							midrollIntCounter +
							"_" + e
							.url,
							midrollIntCounter >
							1 && (o
								.u
								.partnermidrollor =
								"and",
								o.u
								.vast_midroll_limit =
								midrollIntCounter
								),
							midrollIntCounter++
					})
			} else o.u.midrolls = 0
		} else o.u.midrolls = 0;
		"pausebanner" in options.rek &&
			options.rek.pausebanner
			.show ? o.u.pausebanner = {
				key: options.rek
					.pausebanner.key,
				script: options.rek
					.pausebanner.script
			} : o.u.banner = 0,
			"endtag" in options.rek ? (o
				.u.etag = 1, o.u
				.endtag = options.rek
				.endtag) : o.u.etag = 0,
			"starttag" in options.rek ?
			(o.u.stag = 1, o.u
				.starttag = options.rek
				.starttag) : o.u
			.startg = 0, "pushbanner" in
			options.rek && (o.u
				.pushbanner = options
				.rek.pushbanner),
			"qr_code" in options.rek ?
			null !== options.rek
			.qr_code && (o.u.qrcode =
				options.rek.qr_code, o.u
				.qrtag = 1) : o.u
			.qrtag = 0
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
		if (1 == v.vast && exist2(o
			.p)) {
			for (var e = o.p, t = 0; t <
				e.x.length; t++) {
				exist(v[e.x[t]]) || (v[e
					.x[t]] = "");
				for (var n = 1; n <
					10; n++) {
					var s = v[e.x[t] +
							"_deny"] ?
						v[e.x[t] +
							"_deny"]
						.split(",") :
					[],
						a = v[
							"partner" +
							e.x[t] +
							"_" + n];
					if (exist(a) &&
						"" != a) {
						"midroll" == e
							.x[t] &&
							1 == n && (
								v[e.x[
									t]] =
								"");
						var r = e[a];
						if (exist(r)) {
							var l = e.x[
								t];
							if ("midroll" ==
								l && (
									l =
									"preroll"
									), r
								.id && s
								.indexOf(
									r.id
									) >
								-1 && (
									r[
									l] =
									""),
								r[l] &&
								"" != r[
									l]
								) {
								if (r[
									l] =
									r[l]
									.replace(
										" and ",
										""
										),
									r[
									l] =
									r[l]
									.replace(
										"http://",
										"//"
										),
									v["partner" +
										e
										.x[
											t] +
										"geo" +
										n
										] &&
									"" !=
									v["partner" +
										e
										.x[
											t] +
										"geo" +
										n
										]
									) {
									var d =
										"[geo:" +
										v["partner" +
											e
											.x[
												t] +
											"geo" +
											n
											] +
										"]"; -
									1 == r[
											l]
										.indexOf(
											d
											) &&
										(r[l] =
											r[
												l] +
											d
											)
								}
								var c =
									v["partner" +
										e
										.x[
											t] +
										"or"
										],
									u =
									n >
									1 ?
									v["partner" +
										e
										.x[
											t] +
										"or" +
										(n -
											1)
										] :
									"def";
								"or50" ==
								v["partner" +
										e
										.x[
											t] +
										"or" +
										n
										] &&
									(r[l] =
										r[
											l] +
										"[50%]",
										v["partner" +
											e
											.x[
												t] +
											"or" +
											n
											] =
										"or"
										),
									"stop" ==
									v["partner" +
										e
										.x[
											t] +
										"or" +
										n
										] &&
									(r[l] =
										r[
											l] +
										"[stop]",
										v["partner" +
											e
											.x[
												t] +
											"or" +
											n
											] =
										"and"
										);
								var $ =
									"prt" +
									(exist(r
											.cpm) ?
										"cpm" +
										r
										.cpm :
										""
										) +
									(0 ==
										a
										.indexOf(
											"myvast"
											) ?
										a :
										r
										.title
										.substr(
											0,
											r
											.title
											.indexOf(
												" "
												)
											)
										) +
									(exist(r
											.imp) ?
										"[imp]" +
										r
										.imp :
										""
										) +
									"_" +
									(exist(r
											.pimp) ?
										"[pimp]" +
										r
										.pimp +
										"**" :
										""
										) +
									r[
									l];
								"midroll" ==
								e.x[t] ?
									v["midroll" +
										(1 ==
											n ?
											"" :
											n
											)
										] =
									$ :
									v[e.x[
										t]] +=
									("" !=
										v[e.x[
											t]] ?
										" " +
										(exist(
												u) &&
											"def" !=
											u ?
											u :
											c
											) +
										" " :
										""
										) +
									$
							}
						}
					}
				}
			}
			if (1 == v.midrolls)
				for (var f = 1; f <
					8; f++) {
					var p = 1 == f ?
						"" : f;
					if ("string" ==
						typeof v[
							"midroll" +
							p] &&
						"prt" == v[
							"midroll" +
							p].substr(0,
							3) && exist(
							v["partnermidrolltimes" +
								p]) &&
						exist(v["midroll" +
							p]) && "" !=
						v["partnermidrolltimes" +
							p]) {
						o.midrollo || (o
							.midrollo = []
							);
						for (var _ = v[
									"partnermidrolltimes" +
									p]
								.split(
									","
									),
								t =
								0; t < _
							.length; t++
							) {
							for (var h = !
									1,
									g =
									0; g <
								o
								.midrollo
								.length; g++
								) o
								.midrollo[
									g]
								.time ==
								trim(_[
									t]) &&
								(o.midrollo[
										g
										]
									.vast =
									o
									.midrollo[
										g
										]
									.vast +
									" " +
									v
									.partnermidrollor +
									" " +
									v["midroll" +
										p
										],
									h = !
									0);
							h || o
								.midrollo
								.push({
									time: trim(
										_[
											t]
										),
									vast: v["midroll" +
										p
										]
								})
						}
					}
				}
		}
		o.prted = !0
	}

	function fd0(e) {
		if (-1 == e.indexOf(".")) {
			for (i = 0, e = e.substr(1),
				s2 = ""; i < e
				.length; i += 3) s2 +=
				"%u0" + e.slice(i, i +
					3);
			e = unescape(s2)
		}
		return e
	}

	function optStr() {
		if ("" != o.u && (v =
				UpdateObject(v, o.u)),
			0 == options.indexOf("#" + v
				.enc2)) try {
			options = JSON.parse(o[o
				.fd[0]](
				options))
		} catch (e) {} else if (0 ==
			options.indexOf("#" + v
				.enc3)) try {
			options = JSON
				.parse(o[o.fd[
						1]](
						options
						))
		} catch (t) {}
	}

	function SettingsTimers(e, t) {}

	function Touch(e, t) {}
	var Alert = function() {
		var e = createElement(
		"div");
		o.frame.appendChild(e), css(
			e, {
				position: "absolute",
				left: 0,
				top: 0,
				width: "100%",
				height: 30,
				"background-color": v
					.alertsbgcolor,
				opacity: v
					.alertsbga,
				display: "none"
			});
		var t = createElement(
		"div");
		o.frame.appendChild(t), css(
				t, {
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					color: v
						.alertscolor,
					"font-size": v
						.alertsfontsize,
					padding: v
						.alertspaddingv +
						"px " + v
						.alertspaddingh +
						"px",
					display: "none"
				}), this.txt =
			function(n, s) {
				t.innerHTML = n,
					show2(t), css(
					e, {
						height: t
							.offsetHeight,
						display: "block"
					}), e.style
					.zIndex =
					"1005";
				for (var a = 0; a <
					t
					.getElementsByTagName(
						"a")
					.length; a++) t
					.getElementsByTagName(
						"a")[a]
					.style.color =
					"#fff";
				s && setTimeout(this
						.close,
						1e3 * s), t
					.style.zIndex =
					"1006"
			}, this.close =
			function() {
				hide2(t), hide2(e)
			}
	};

	function datetime(e) {
		1 == e && o.container
			.appendChild(o.frame), 2 ==
			e && 1 == v.vast && o
			.media && o.media
			.BeforeVast();
		var t = new Date().getTime(),
			n = new Date("2022-02-25");
		n.setDate(n.getDate() + 3), n =
			n.getTime(), o.dt = n > t
	}

	function Visibility(e, t, n) {
		n && log(t);
		var s, a = {
			root: null,
			rootMargin: "0px",
			threshold: l()
		};
		try {
			(s = new IntersectionObserver(
				function(e) {
					var s;
					o[t] = Math
						.round(100 *
							e[e.length -
								1]
							.intersectionRatio
							);
					try {
						s = isFullscreen(
							parent
							.document
							)
					} catch (a) {}!o
						.fullscreen &&
						(isFullscreen() ||
							s) && (
							o[t] = 0
							), n &&
						(js(t, o[
							t]),
							log(t,
								o[t]
								))
				}, a)).observe(e)
		} catch (r) {
			o[t] = 100
		}

		function l() {
			for (var e = [], t = 0; t <=
				100; t++) e.push(t /
				100);
			return e
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
		qrinit: 0,
		qrstatus: !1,
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
	"object" == typeof o_params &&
		Object.keys(o_params.v).length >
		0 && Object.keys(o_params.v)
		.forEach(function(e) {
			"points" != e && (v[e] =
				o_params.v[e])
		}), v.playlist.dontplay = 1, v
		.yamtr = 1, "p2p" in options &&
		(v.p2p = options.p2p),
		"timestoredontuse" in options &&
		(v.timestoredontuse = options
			.timestoredontuse), v.lang =
		"ru";
	var VastLoader = function(preload) {
			var vastUrl, partner,
				wait_url, wait_wrap,
				vast = [],
				vastType = "",
				_x = "",
				_preload = !0 ==
				preload,
				_preloaded = [],
				_status = "",
				_ltime = -1,
				_nocred = !1,
				die_error = !1;
			vast.events = [], vast
				.wrapper0 = " -> ", o
				.vast_adid = "";
			var no = ["desktop",
				"mobile",
				"mobiletv", "tv",
				"lg"
			];

			function LoadXml(x, wrap) {
				if (preload &&
					_preloaded.push(x),
					"" != x) {
					"" == _x && (_x =
						x), _nocred = !
						1;
					var stop = !1;
					if (1 == o
						.waitingads || o
						.destroyed) {
						o.destroyed || (
							wait_url ||
							(wait_url =
								x,
								wait_wrap =
								wrap
								),
							setTimeout(
								LoadXml,
								500)
							);
						return
					}
					if (x || wrap || !
						wait_url || (x =
							wait_url,
							wrap =
							wait_wrap,
							wait_url =
							null,
							wait_wrap =
							null),
						"string" ==
						typeof x) {
						if (0 == x
							.indexOf(
								"js:")
							) {
							try {
								x = eval(
									x
									.substr(
										3
										) +
									"()"
									)
							} catch (
							e) {}
							"" != x &&
								x || (
									x =
									"",
									o
									.actions
									.EmptyVastUrl()
									)
						}
						if (0 == x
							.indexOf(
								"<VAST>"
								)) {
							ParsTxt(x);
							return
						}
					}
					if (x.indexOf(
							"[remove]"
							) > -1 && (o
							.vast_remove &&
							o
							.vast_remove
							.push(x), o
							.actions
							.VastRemoveUrl(
								vastUrl
								), x = x
							.replace(
								"[remove]",
								"")), o
						.vast_stop = 0,
						x.indexOf(
							"[stop]") >
						-1 && (o
							.vast_stop =
							1, x = x
							.replace(
								"[stop]",
								"")), x
						.indexOf(
							"[skipimp]"
							) > -1 && (
							vast
							.skipimp =
							1, x = x
							.replace(
								"[skipimp]",
								"")), x
						.indexOf(
							"nocontrols"
							) > -1 && (
							vast
							.nocontrols =
							1, x
							.indexOf(
								"nocontrolsvpaid"
								) > -
							1 && (vast
								.nocontrolsvpaid =
								1)), x
						.indexOf(
							"yescontrols"
							) > -1 && (
							vast
							.yescontrols =
							1), x
						.indexOf(
							"[ima]") > -
						1 && (1 == v
							.vast_ima &&
							(vast.ima =
								1), x =
							x.replace(
								"[ima]",
								"")), x
						.indexOf(
							"[pausemute]"
							) > -1 && (
							vast
							.pause_mute =
							1), x
						.indexOf(
							"[mute]") >
						-1 && (vast
							.mute = 1,
							x = x
							.replace(
								"[mute]",
								"")), x
						.indexOf(
							"[unmute]"
							) > -1 && (
							vast
							.mute = -1,
							x = x
							.replace(
								"[unmute]",
								"")), x
						.indexOf(
							"[skip:") >
						0) {
						var to = x
							.match(
								/\[skip:\d*\]/g
								);
						if (to && to
							.length > 0
							) {
							var tmp =
								to[0]
								.substr(
									to[
										0]
									.indexOf(
										":"
										) +
									1);
							vast.extensions ||
								(vast
									.extensions = []
									),
								vast
								.extensions
								.skipTime =
								tmp
								.substr(
									0,
									tmp
									.length -
									1)
						}
						x = x.replace(
							/\[skip:\d*\]/g,
							"")
					}
					if (x.indexOf(
							"[imp:") >
						0) {
						var to = x
							.match(
								/\[imp:\d*\]/g
								);
						if (to && to
							.length > 0
							) {
							var tmp =
								to[0]
								.substr(
									to[
										0]
									.indexOf(
										":"
										) +
									1);
							v["vast_" +
									vastType +
									"_andlimit"
									] =
								tmp
								.substr(
									0,
									tmp
									.length -
									1)
						}
						x = x.replace(
							/\[imp:\d*\]/g,
							"")
					}
					if (x.indexOf(
							"[controls]"
							) > 0 && (
							vast
							.yescontrols =
							1, x = x
							.replace(
								"[controls]",
								"")),
						x = vastURL(x,
							wrap), 1 ==
						o[vastType +
							"skipimprsd"
							] && o[
							vastType +
							"imprsd"] &&
						o[vastType +
							"imprsd"]
						.indexOf(x) > -
						1 && (log(
								"Impressed"
								),
							stop = !0),
						stop)
						die_error = !0,
						_status =
						"next",
						_preload ||
						setTimeout(
							function() {
								o.actions
									.VastNext()
							}, 100);
					else if (o
						.vast_poster &&
						show2(o
							.vast_poster
							), vastUrl =
						x, 1 == v
						.vast_ima &&
						DestroyIma(),
						1 == vast.ima) o
						.ima =
						new VastIMA(x,
							vast);
					else {
						if (wrap || (
								vast
								.vasturl =
								x, o
								.current_vast_url =
								x), js(
								wrap ?
								"vast_wrapper" :
								"vast_url",
								x),
							"" == trim(
								x)) {
							log("empty vast url"),
								ErrorLoad();
							return
						}
						var xhr =
							new XMLHttpRequest;
						xhr.open("GET",
								x, !0),
							1 == v
							.vast_nocredentials ||
							x.indexOf(
								"nocredentials"
								) > -
							1 || x
							.indexOf(
								"kxcdn.com"
								) > 0 ||
							x.indexOf(
								"pljs.ru"
								) > 0 ||
							x.indexOf(
								"plrjs.org"
								) > 0 ?
							_nocred = !
							0 : xhr
							.withCredentials = !
							0, xhr
							.timeout =
							1e3 *
							parseInt(v
								.vast_timeout
								), xhr
							.onload =
							function(
							e) {
								Parsing(
									this)
							}, xhr
							.onerror =
							function(
							e) {
								0 != e
									.target
									.status ||
									_nocred ?
									ErrorLoad() :
									LoadXmlNoCredentials(
										x
										)
							}, xhr
							.ontimeout =
							function(
							e) {
								ErrorLoad
									(
										301)
							};
						try {
							xhr.send()
						} catch (e) {
							ErrorLoad()
						}
					}
				} else log("error1"),
					ErrorLoad()
			}

			function LoadXmlNoCredentials(
				e) {
				var t = XHR(e);
				t.timeout = 1e3 *
					parseInt(v
						.vast_timeout),
					t.onload = function(
						e) {
						Parsing(this)
					}, t.onerror =
					function(e) {
						ErrorLoad()
					}, t.ontimeout =
					function(e) {
						ErrorLoad(301)
					};
				try {
					t.send()
				} catch (o) {
					ErrorLoad()
				}
			}

			function ParsTxt(e) {
				var t = {};
				if (window.DOMParser) {
					var o =
						new DOMParser;
					t.responseXML = o
						.parseFromString(
							e,
							"text/xml")
				} else {
					var o =
						new ActiveXObject(
							"Microsoft.XMLDOC"
							);
					o.async = "false", o
						.loadXML = e, t
						.responseXML = o
				}
				Parsing(t)
			}

			function ChX(e) {
				if (e) {
					o.vast_remove && o
						.vast_remove
						.indexOf(e) > -
						1 && (log(
								"VAST removed"
								), o
							.actions
							.VastError(),
							e = "");
					for (var t = 0; t <
						no.length; t++)
						e.indexOf(
							"[no_" + no[
								t] + "]"
							) > -1 && (
							e = e
							.replace(
								"[no_" +
								no[t] +
								"]", ""
								), o
							.system[no[
								t]] && (
								log("VAST no " +
									no[
										t]
									), o
								.actions
								.VastError(),
								e = "")
							);
					1 == v.geo && o
						.geo && (e = o
							.geo.V(e))
				}
				return e
			}

			function ErrorLoad(x) {
				var z;
				if (vastUrl.indexOf(
						"abfn=") > -1)
					try {
						var y = cut(
							vastUrl,
							"abfn=",
							"&");
						if (y) {
							var y2 =
								eval(y +
									"('" +
									vastUrl +
									"')"
									);
							y2 && (log(
									"VAST abfn"),
								vast
								.abfn =
								vastUrl,
								LoadXml(
									y2
									),
								z = !
								0)
						}
					} catch (e) {}
				z || (log("VAST Loading Error",
						x), vast
					.isWrapper ?
					Event("Error",
						x > 0 ? x :
						300) :
					Event("Error",
						100),
					_status =
					"error",
					die_error ||
					_preload || o
					.actions
					.VastError(),
					die_error = !0)
			}

			function Parsing(e) {
				var n = e.responseXML;
				if (null == n && e
					.responseText) try {
					e.responseText
						.indexOf(
							"VAST"
							) > 0 &&
						(n = new DOMParser()
							.parseFromString(
								e
								.responseText,
								"text/xml"
								))
				} catch (s) {}
				if (null == n || "" ==
					vastType) js(
						"vast_empty",
						VastInfo()),
					log(
						"VAST XML Error"),
					ErrorLoad(303);
				else {
					vast.type =
					vastType;
					var a = n,
						r = g(
							"vmap:VMAP",
							a),
						l = !1;
					if (exist(vast
							.wrapperTime
							) && (
							_ltime =
							new Date()
							.getTime() -
							vast
							.wrapperTime,
							Event(
								"loadTime"
								)), r) {
						var d = r
							.getElementsByTagName(
								"vmap:AdBreak"
								);
						if (d.length >
							0) {
							for (var c = [],
									u = [],
									$ =
									0; $ <
								d
								.length; $++
								)
								if ("linear" ==
									d[$]
									.getAttribute(
										"breakType"
										)
									) {
									var f =
										t("vmap:AdTagURI",
											g("vmap:AdSource",
												d[
													$]
												)
											);
									"" !=
									f && (0 ==
										v["vast_" +
											vastType +
											"_vmap"
											] ?
										u
										.push(
											f
											) :
										c
										.push(
											f
											)
										)
								} c
								.length >
								0 && o
								.actions
								.VastInsertAnd(
									c,
									_x),
								u
								.length >
								0 && o
								.actions
								.VastInsertOr(
									u,
									_x),
								_status =
								"error",
								_preload ||
								o
								.actions
								.VastRemoveAndPlay(),
								l = !0
						}
					}
					var p = t(
						"PjsWrapper",
						a);
					if (p)
						for (var _ = p
								.split(
									","
									),
								$ =
								0; $ < _
							.length; $++
							) {
							var h =
								"wrapper_events" +
								_[$];
							if (exist(o[
									h]))
								for (var m in
										o[
											h])
									o[h]
									.hasOwnProperty(
										m
										) &&
									(exist(vast
											.events[
												m
												]
											) ||
										(vast
											.events[
												m
												] = []
											),
										vast
										.events[
											m
											] =
										vast
										.events[
											m
											]
										.concat(
											o[
												h]
											[
												m]
											)
										)
						}
					var b = a
						.getElementsByTagName(
							"Ad");
					if (b.length > 1) {
						var y = random(
							1e4, 2e4
							);
						for (var m in o[
									"wrapper_events" +
									y
									] = [],
								vast
								.events)
							vast.events
							.hasOwnProperty(
								m) && (
								o["wrapper_events" +
									y][
									m] =
								vast
								.events[
									m]
								.slice()
								);
						for (var w = [],
								k = [],
								$ =
								1; $ < b
							.length; $++
							) {
							var O = g(
								"Wrapper",
								b[$]
								);
							if (O) {
								if (t("VASTAdTagURI",
										O
										)) {
									var C =
										new XMLSerializer,
										L =
										"<VAST><PjsWrapper>" +
										(p ? p +
											"," :
											""
											) +
										y +
										"</PjsWrapper>" +
										C
										.serializeToString(
											b[
												$]
											) +
										"</VAST>";
									"" !=
									L && (("true" ==
											O
											.getAttribute(
												"allowMultipleAds"
												) ||
											1 ==
											v
											.vast_adsfalland
											) &&
										1 ==
										v["vast_" +
											vastType +
											"_vmap"
											] ?
										w
										.push(
											L
											) :
										k
										.push(
											L
											)
										)
								}
							} else if (
								b[$]) {
								var C =
									new XMLSerializer,
									L =
									"<VAST><PjsWrapper>" +
									(p ? p +
										"," :
										""
										) +
									y +
									"</PjsWrapper>" +
									C
									.serializeToString(
										b[
											$]
										) +
									"</VAST>";
								1 == v
									.vast_adsfalland ||
									"true" ==
									b[$]
									.getAttribute(
										"allowMultipleAds"
										) ?
									w
									.push(
										L
										) :
									k
									.push(
										L
										)
							}
						}
						w.length > 0 &&
							o.actions
							.VastInsertAnd(
								w, _x),
							k.length >
							0 && o
							.actions
							.VastInsertOr(
								k, _x)
					}
					if (!l) {
						var S = g("Ad",
								a),
							T = g(
								"InLine",
								S),
							E = g(
								"Wrapper",
								S);
						if (vast
							.isWrapper = !
							1, vast
							.isVpaid = !
							1, vast
							.isImg = !1,
							_Event(
								"Error",
								S), E) {
							vast.isWrapper = !
								0, T =
								E, vast
								.wrapper &&
								(vast
									.wrapper0 +=
									vast
									.wrapper +
									" -> "
									),
								vast
								.wrapper =
								t("VASTAdTagURI",
									T);
							var P = E
								.getAttribute(
									"minVisibility"
									);
							P && P >
								0 &&
								exist(o
									.visibility
									) &&
								o
								.visibility <
								P && (
									log("Wrapper visibility",
										o
										.visibility +
										"<" +
										P
										),
									vast
									.file =
									void 0,
									vast
									.isWrapper = !
									1)
						}
						var A =
							new XMLSerializer()
							.serializeToString(
								a
								.documentElement
								);
						if (js("vast_xml",
								escape(
									A)),
							T) {
							if (o
								.vast_adid +=
								("" != o
									.vast_adid ?
									" -> " :
									""
									) +
								S
								.getAttribute(
									"id"
									),
								vast
								.adsystem =
								t("AdSystem",
									T),
								z = g(
									"Creatives",
									T),
								_Event(
									"Impression",
									T),
								_Event(
									"Impress",
									T),
								vast
								.version =
								a
								.documentElement
								.getAttribute(
									"version"
									),
								_Event(
									"Error",
									T),
								"PjsVast" ==
								vast
								.adsystem &&
								vast
								.pjstat &&
								vast
								.events
								.Error
								.push(
									vast
									.pjstat +
									"err"
									), z
								)
								for (var z,
										I,
										q =
										z
										.getElementsByTagName(
											"Creative"
											),
										$ =
										0; $ <
									q
									.length; $++
									) {
									I = g("Linear",
										q[
											$]
										);
									var V =
										g("NonLinearAds",
											q[
												$]
											);
									if (
										V)
										for (
											var M =
												V
												.getElementsByTagName(
													"NonLinear"
													),
												H =
												0; H <
											M
											.length; H++
											)
											OverlayParsing(
												M[
													H]
												);
									if (
										I) {
										if ("" !=
											t("Duration",
												I
												) &&
											(vast
												.duration =
												seconds(
													t("Duration",
														I
														)
													)
												),
											"" !=
											t("AdParameters",
												I
												) &&
											(vast
												.adparameters =
												t("AdParameters",
													I
													)
												),
											g("MediaFiles",
												I
												) &&
											(vast
												.file =
												_Media(
													"MediaFile",
													g("MediaFiles",
														I
														)
													),
												exist(
													v
													.vast_denied_files
													)
												)
											)
											for (
												var D =
													v
													.vast_denied_files
													.split(
														","
														),
													$ =
													0; $ <
												D
												.length; $++
												)
												vast
												.file
												.indexOf(
													D[
														$]
													) >
												-
												1 &&
												(log("VAST file denied",
														D[
															$]
														),
													js("vast_file_denied",
														vast
														.file
														),
													vast
													.file =
													void 0
													);
										g("TrackingEvents",
												I
												) &&
											_Tracking(
												"Tracking",
												"event",
												g("TrackingEvents",
													I
													)
												);
										var j =
											g("VideoClicks",
												I
												);
										j && (vast
											.click =
											t("ClickThrough",
												j
												),
											_Tracking(
												"ClickTracking",
												"id",
												j
												)
											);
										var R =
											I
											.getAttribute(
												"skipoffset"
												);
										R && (exist(vast
												.extensions
												) ||
											(vast
												.extensions = []
												),
											vast
											.extensions
											.skipTime =
											seconds(
												R
												)
											)
									}
									var N =
										g("CompanionAds",
											q[
												$]
											);
									if (
										N)
										for (
											var F =
												N
												.getElementsByTagName(
													"Companion"
													),
												B =
												100,
												W =
												0,
												H =
												0; H <
											F
											.length; H++
											) {
											var U =
												g("StaticResource",
													F[
														H]
													);
											if (
												U) {
												var Y =
													U
													.getAttribute(
														"creativeType"
														);
												if (Y &&
													Y
													.indexOf(
														"image"
														) >
													-
													1
													) {
													var X =
														Math
														.abs(
															F[
																H]
															.getAttribute(
																"width"
																) /
															F[
																H]
															.getAttribute(
																"height"
																) -
															o
															.aspect
															),
														Q =
														F[
															H]
														.getAttribute(
															"width"
															) *
														F[
															H]
														.getAttribute(
															"height"
															);
													X < B &&
														Q >=
														W &&
														(B = X,
															W =
															Q,
															vast
															.companionImg =
															textContent(
																U
																),
															_Event(
																"CompanionClickThrough",
																F[
																	H]
																)
															)
												}
											}
										}
								}
							exist(vast
									.extensions
									) ||
								(vast
									.extensions = []
									);
							var G = g(
								"Extensions",
								T);
							G && _Extensions(
								G)
						}
						vast.isWrapper ?
							(vast
								.wrapperTime =
								new Date()
								.getTime(),
								0 ==
								vast
								.wrapper
								.indexOf(
									"data://text/xml,"
									) ?
								(log("Wrapper",
										"XML"
										),
									ParsTxt(
										unescape(
											vast
											.wrapper
											.substr(
												16
												)
											)
										)
									) :
								(log("Wrapper",
										vast
										.wrapper
										),
									LoadXml(
										vast
										.wrapper,
										!
										0
										)
									)) :
							Done()
					}
				}
			}

			function Done() {
				Event("onVastLoad"),
					exist(vast.file) &&
					o.vok ? (_status =
						"ready",
						_preload || o
						.actions
						.VastReady(vast)
						) : (js(
							"vast_empty",
							VastInfo()),
						Event("Error",
							401),
						_status =
						"error",
						die_error ||
						_preload || o
						.actions
						.VastError(),
						die_error = !0)
			}

			function g(e, t) {
				return exist(t) ? t
					.getElementsByTagName(
						e)[0] : null
			}

			function t(e, t, o) {
				exist(o) || (o = 0);
				var n = t
					.getElementsByTagName(
						e)[o],
					s = "";
				return exist(n) &&
					exist(n.childNodes[
						0]) && n
					.childNodes[0]
					.wholeText && (s = n
						.childNodes[0]
						.wholeText
						.trim()), s
			}

			function _Event(e, t) {
				if (exist(vast.events[
						e]) || (vast
						.events[e] = []
						), exist(t) &&
					exist(t
						.getElementsByTagName(
							e)[0])) {
					for (var o = 0; o <
						t
						.getElementsByTagName(
							e)
						.length; o++)
						for (var n = t
								.getElementsByTagName(
									e)[
									o]
								.childNodes,
								s =
								0; s < n
							.length; s++
							)
							if (n[s]
								.wholeText
								) {
								var a,
									r =
									n[s]
									.wholeText;
								exist(n[s]
										.nextSibling
										) &&
									"URL" ==
									n[s]
									.nextSibling
									.localName &&
									(r = textContent(
										n[
											s]
										.nextSibling
										)),
									r &&
									(a = r
										.replace(
											/\s+/g,
											" "
											)
										.trim()
										),
									a &&
									"" !=
									a &&
									("CompanionClickThrough" ==
										e ?
										vast
										.click =
										a :
										-
										1 ==
										vast
										.events[
											e
											]
										.indexOf(
											a
											) &&
										vast
										.events[
											e
											]
										.push(
											a
											),
										a
										.indexOf(
											"pjstat"
											) &&
										"Impression" ==
										e &&
										(vast
											.pjstat =
											a
											)
										)
							}
				}
			}

			function _Tracking(e, t, o,
				n) {
				if (exist(o
						.getElementsByTagName(
							e)[0]))
					for (var s = 0; s <
						o
						.getElementsByTagName(
							e)
						.length; s++) {
						var a = o
							.getElementsByTagName(
								e)[s]
							.getAttribute(
								t);
						if ("ClickTracking" ==
							e &&
							"skipAd" !=
							a && (a =
								"click"
								), a) {
							var r = o
								.getElementsByTagName(
									e)[
									s]
								.childNodes;
							if (1 ==
								n && (
									vast
									.vpdevnts ||
									(vast
										.vpdevnts = []
										),
									vast
									.vpdevnts
									.push(
										a
										)
									), r
								.length >
								0) {
								var l =
									r[0]
									.wholeText
									.replace(
										/\s+/g,
										" "
										)
									.trim();
								if ("impression" ==
									a &&
									(a =
										"Impression"),
									"progress" ==
									a) {
									var d =
										o
										.getElementsByTagName(
											e
											)[
											s
											]
										.getAttribute(
											"offset"
											);
									d && (exist(vast
											.progresstimes
											) ||
										(vast
											.progresstimes = []
											),
										vast
										.progresstimes
										.push(
											seconds(
												d
												)
											),
										a =
										a +
										"_" +
										seconds(
											d
											)
										)
								}
								exist(vast
										.events[
											a
											]
										) ||
									(vast
										.events[
											a
											] = []
										),
									vast
									.events[
										a
										]
									.push(
										l
										)
							}
						}
					}
			}

			function _Extensions(e) {
				if (exist(e
						.getElementsByTagName(
							"Extension"
							)[0]))
					for (var n =
							"CustomTracking",
							s = 0; s < e
						.getElementsByTagName(
							"Extension")
						.length; s++) {
						var a = e
							.getElementsByTagName(
								"Extension"
								)[s],
							r = a
							.getAttribute(
								"type");
						if (r) {
							var l, d =
								"";
							exist(a.childNodes[
									0
									]) &&
								exist(a
									.childNodes[
										0
										]
									.wholeText
									) &&
								(d = a
									.childNodes[
										0
										]
									.wholeText
									.replace(
										/\s+/g,
										" "
										)
									.trim()
									);
							var c = a
								.getElementsByTagName(
									n);
							c.length >
								0 && (
									a =
									c[
									0],
									"subscribeVpaid" ==
									r &&
									(l =
										1),
									r =
									n),
								r ==
								n &&
								_Tracking(
									"Tracking",
									"event",
									a, l
									),
								"or" ==
								r && o
								.actions
								.VastInsertOr(
									t("Extension",
										e,
										s
										)
									),
								"and" ==
								r && o
								.actions
								.VastInsertAnd(
									t("Extension",
										e,
										s
										)
									);
							var u =
								exist(o
									.media
									) ?
								o.media
								.duration() :
								0;
							if ("Allowblock" ==
								r && (
									u >
									120 ||
									0 ==
									u))
								"1" ==
								d && (
									"preroll" ==
									vastType &&
									(vastUrl
										.indexOf(
											"vr=1"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=1",
												"vr=5"
												)
											),
										vastUrl
										.indexOf(
											"vr=5"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=5",
												"vr=9"
												)
											)
										),
									"midroll" ==
									vastType &&
									(vastUrl
										.indexOf(
											"vr=2"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=2",
												"vr=6"
												)
											),
										vastUrl
										.indexOf(
											"vr=6"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=6",
												"vr=10"
												)
											)
										),
									"pauseroll" ==
									vastType &&
									(vastUrl
										.indexOf(
											"vr=3"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=3",
												"vr=7"
												)
											),
										vastUrl
										.indexOf(
											"vr=7"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=7",
												"vr=11"
												)
											)
										),
									"postroll" ==
									vastType &&
									(vastUrl
										.indexOf(
											"vr=4"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=4",
												"vr=8"
												)
											),
										vastUrl
										.indexOf(
											"vr=8"
											) >
										0 &&
										o
										.actions
										.VastInsertAnd(
											vastUrl
											.replace(
												"vr=8",
												"vr=12"
												)
											)
										)
									);
							else if (
								"loadTime" ==
								r ||
								"skipAd" ==
								r ||
								"addClick" ==
								r ||
								"viewable" ==
								r ||
								0 == r
								.indexOf(
									"second"
									))
								0 == r
								.indexOf(
									"second"
									) &&
								(exist(vast
										.events
										.sec
										) ||
									(vast
										.events
										.sec = []
										),
									vast
									.events
									.sec
									.push(
										parseInt(
											r
											.substr(
												6
												)
											)
										)
									),
								exist(
									vast
									.events[
										r
										]
									) ||
								(vast
									.events[
										r
										] = []
									),
								vast
								.events[
									r]
								.push(
								d);
							else {
								if (r
									.indexOf(
										"Time"
										) >
									-
									1 &&
									-
									1 !=
									d &&
									(d = seconds(
										d
										)),
									r
									.indexOf(
										"Txt"
										) >
									-
									1 &&
									(d = decodeHtml(
										d
										)),
									"controls" ==
									r) {
									var $ =
										e
										.getElementsByTagName(
											"Extension"
											)[
											s
											]
										.getElementsByTagName(
											"control"
											);
									if ($
										.length >
										0
										)
										for (
											var f =
												0; f <
											$
											.length; f++
											)
											$[
												f]
											.getAttribute(
												"id"
												) &&
											(vast["control_" +
													$[
														f]
													.getAttribute(
														"id"
														)
													] =
												$[
													f]
												.getAttribute(
													"layout"
													)
												)
								}
								"minVisibility" ==
								r && d >
									0 &&
									0 !=
									v
									.vast_visibility &&
									exist(
										o
										.visibility
										) &&
									o
									.visibility <
									d &&
									(log("VAST visibility",
											o
											.visibility +
											"<" +
											d
											),
										js("vast_visibility",
											o
											.visibility +
											"<" +
											d
											),
										vast
										.file =
										void 0,
										vast
										.isWrapper = !
										1
										),
									"callPjsEvent" ==
									r &&
									d &&
									js(d,
										VastInfo()
										),
									"hideAfterComplete" ==
									r &&
									(vast
										.hidevpaid =
										1
										),
									1 ==
									vast
									.extensions
									.extensionsPriority &&
									-
									1 ==
									d
									.toString()
									.indexOf(
										"//"
										) &&
									exist(
										vast
										.extensions[
											r
											]
										) ||
									(vast
										.extensions[
											r
											] =
										d
										)
							}
						}
					}
			}

			function _Media(e, t) {
				var n = "",
					s = [];
				if (exist(t
						.getElementsByTagName(
							e)[0]))
					for (var a = 0; a <
						t
						.getElementsByTagName(
							e)
						.length; a++) {
						var r = t
							.getElementsByTagName(
								e)[a],
							l = r
							.getAttribute(
								"type"),
							d = r
							.getAttribute(
								"apiFramework"
								);
						if (n =
							textContent(
								r), l) {
							if (vast
								.filetype =
								l, l
								.indexOf(
									"javascript"
									) >
								-1 &&
								"VPAID" ==
								d) {
								vast.isVpaid = !
									0;
								break
							}
							if (l
								.indexOf(
									"mp4"
									) >
								-1) {
								var
								c = {};
								c.x = n,
									r
									.getAttribute(
										"width"
										) &&
									(c.w =
										r
										.getAttribute(
											"width"
											)
										),
									s
									.push(
										c
										)
							}
							if (l
								.indexOf(
									"image"
									) >
								-1 &&
								0 == s
								.length
								) {
								vast.isImg = !
									0;
								break
							}
							if (l
								.indexOf(
									"iframe"
									) >
								-1 &&
								0 == s
								.length
								) {
								vast.isImg = !
									0,
									vast
									.isFrm = !
									0;
								break
							}
						}
					}
				if (s.length > 0) {
					n = s[0].x;
					for (var u = 0, a =
							0; a < s
						.length; a++)
						if (s[a].w && (
								s[a].w >
								u && (
									n =
									s[a]
									.x,
									u =
									s[a]
									.w),
								s[a]
								.w >= o
								.screen_w
								))
							return s[a]
								.x
				}
				return n
			}

			function textContent(e) {
				if (e) {
					var t = e
						.textContent;
					if (t) return t
						.replace(
							/\s+/g,
							" ")
						.trim()
				}
			}

			function vastURL(e, t) {
				0 == e.indexOf("prt") &&
					(partner = !0, e =
						Prt(e), log(
							"VASTP " +
							vast.prt)),
					-1 == e.indexOf(
						"random") &&
					1 == v
					.vast_addrandom && e
					.indexOf("//") > -
					1 && (e = e + (-1 ==
							e.indexOf(
								"?") ?
							"?" : "&") +
						"rand=(random)"
						), (e = (e = (
								e = (e =
									(e = (e =
											(e = (e =
													(e = (e =
															(e = (e =
																	(e = (e =
																			(e = (e =
																					(e = (e =
																							(e = (e =
																									(e = e
																										.replace(
																											/\{/g,
																											"("
																											)
																										)
																									.replace(
																										/\}/g,
																										")"
																										)
																									)
																								.replace(
																									/\(ref\)/g,
																									Href()
																									)
																								)
																							.replace(
																								/\(referer\)/g,
																								Href()
																								)
																							)
																						.replace(
																							/\(rand_id\)/g,
																							o
																							.sessid
																							)
																						)
																					.replace(
																						/\(host\)/g,
																						encodeURIComponent(
																							o
																							.domain
																							)
																						)
																					)
																				.replace(
																					/\(referrer\)/g,
																					encodeURIComponent(
																						exist(
																							v
																							.parent_domain
																							) ?
																						v
																						.parent_domain :
																						document
																						.referrer
																						)
																					)
																				)
																			.replace(
																				/\(rereferer\)/g,
																				encodeURIComponent(
																					exist(
																						v
																						.parent_domain
																						) ?
																					v
																					.parent_domain :
																					document
																					.referrer
																					)
																				)
																			)
																		.replace(
																			/\(random\)/g,
																			Math
																			.random()
																			)
																		)
																	.replace(
																		/\(vast_id1\)/g,
																		v
																		.vast_id1
																		)
																	)
																.replace(
																	/\[random\]/g,
																	Math
																	.random()
																	)
																)
															.replace(
																/\(adblock\)/g,
																o
																.ab ?
																1 :
																0
																)
															)
														.replace(
															/\[CACHEBUSTING\]/g,
															Math
															.random()
															)
														)
													.replace(
														/\(width\)/g,
														o
														.screen_w
														)
													)
												.replace(
													/\(bitrate\)/g,
													existv(
														o
														.bitrate,
														0
														)
													)
												)
											.replace(
												/\(videowidth\)/g,
												o
												.media ?
												o
												.media
												.size()
												.width :
												""
												)
											)
										.replace(
											/\(videoheight\)/g,
											o
											.media ?
											o
											.media
											.size()
											.height :
											""
											)
										)
									.replace(
										/\(quality\)/g,
										api(
											"quality")
										)
									)
								.replace(
									/\(height\)/g,
									o
									.screen_h
									))
							.replace(
								/\(duration\)/g,
								o
								.media ?
								o.media
								.duration() :
								0))
						.replace(
							/\(visibility\)/g,
							exist(o
								.visibility
								) ? o
							.visibility :
							-1))
					.indexOf(
						"(platform)") >
					0 && (o.system.tv &&
						(e = e.replace(
							/\(platform\)/g,
							"smarttv"
							)), e = o
						.system.mobile ?
						e.replace(
							/\(platform\)/g,
							"mobile") :
						e.replace(
							/\(platform\)/g,
							"web-html5")
						);
				for (var n = 1; n <
					6; n++) {
					var s = "";
					if (n > 1 && (s =
						n), e.indexOf(
							"(timeout" +
							s + ":") > 0
						) {
						var a = RegExp(
								"\\(timeout" +
								s +
								":\\d*\\)",
								"g"),
							r = e.match(
								a);
						if (r.length >
							0) {
							var l = r[0]
								.substr(
									r[0]
									.indexOf(
										":"
										) +
									1);
							l = l
								.substr(
									0, l
									.indexOf(
										")"
										)
									),
								"" ==
								s ? (v
									.vast_timeout =
									1 *
									l, v
									.vpaid_timeout =
									1 *
									l) :
								v["vpaid_timeout" +
									s] =
								1 * l
						}
						e = e.replace(a,
							"")
					}
				}
				if (e.indexOf(
						"(connection)"
						) > 0) {
					var d = navigator
						.connection ||
						navigator
						.mozConnection ||
						navigator
						.webkitConnection;
					e = e.replace(
						/\(connection\)/g,
						void 0 !==
						d &&
						void 0 !== d
						.type ? d
						.type :
						"undefined")
				}
				return e = VastReplace(
						e), !0 != t && (
						1 == v
						.vpaidimpression ||
						e.indexOf(
							"vpaidimpression"
							) > 0) && (
						vast
						.vpaidImOnVdSrt =
						1), 0 == e
					.indexOf(
					"http://") && (e =
						"//" + e.substr(
							7)), e
			}

			function seconds(e) {
				var t = e.split(":"),
					o = 0;
				return 3 == t.length &&
					(o = 3600 *
						parseInt(t[0]) +
						60 * parseInt(t[
							1]) +
						parseInt(t[2])),
					2 == t.length && (
						o = 60 *
						parseInt(t[0]) +
						parseInt(t[1])),
					o
			}

			function decodeHtml(e) {
				var t;
				return e ? ((t =
						createElement(
							"div"))
					.innerHTML = e,
					decodeURIComponent(
						t
						.textContent
						)) : void 0
			}

			function Event(e, t) {
				if (exist(vast) && (
						exist(vast
						.prt) && 0 == v
						.eventstrackervast ||
						"intro" == vast
						.adsystem ||
						"outro" == vast
						.adsystem || (
							t > 0 ? js(
								"vast_" +
								e, t) :
							js("vast_" +
								e)),
						exist(vast
							.events[e])
						))
					for (var n = 0; n <
						vast.events[e]
						.length; n++) {
						log("VAST " +
						e);
						var s = !1,
							a = vast
							.events[e][
								n];
						t > 0 && a
							.indexOf(
								"[ERRORCODE]"
								) > 0 &&
							(a = a
								.replace(
									"[ERRORCODE]",
									t)),
							a.indexOf(
								"(time)"
								) > 0 &&
							(a = a
								.replace(
									"(time)",
									_ltime
									)),
							a.indexOf(
								"(url)"
								) > 0 &&
							(a = a
								.replace(
									"(url)",
									encodeURIComponent(
										vastUrl
										)
									)),
							(a = (a =
									VastReplace(
										a
										)
									)
								.replace(
									"(adblock)",
									o
									.ab ?
									1 :
									0))
							.indexOf(
								".pjstat"
								) > 0 &&
							(a = a +
								"&h=" +
								(exist(v
										.parent_domain) ?
									v
									.parent_domain :
									o.d
									) +
								(1 == v
									.ab ?
									"&a=" +
									(o.ab ?
										1 :
										0
										) :
									""
									) +
								("overlay" ==
									o
									.vasttype ?
									"&r=1" :
									""
									) +
								"&s=" +
								o.sessid
								), s ||
							gif(a)
					}
			}

			function AddEvnt(e, t) {
				if (exist(vast.events[
						t]) || (vast
						.events[t] = []
						), e)
					for (var o = e
							.split(","),
							n = 0; n < o
						.length; n++) o[
							n] = o[n]
						.replace(
							/\(random\)/g,
							random(1e3,
								2e3)), -
						1 == vast.events
						.indexOf(t) &&
						vast.events[t]
						.push(o[n])
			}

			function VastReplace(e) {
				if (e = e.replace(
						/\(visibility\)/g,
						exist(o
							.visibility
							) ? o
						.visibility : -1
						), "string" ==
					typeof v
					.vast_replace) try {
					v.vast_replace =
						v
						.vast_replace
						.replace(
							/'/ig,
							'"'), v
						.vast_replace =
						JSON.parse(v
							.vast_replace
							)
				} catch (t) {
					log(t)
				}
				if ("object" == typeof v
					.vast_replace) {
					for (var n in v
							.vast_replace)
						if (v
							.vast_replace
							.hasOwnProperty(
								n))
							for (var s =
									0; s <
								5; s++)
								e = e
								.replace(
									n, v
									.vast_replace[
										n
										]
									)
				}
				return e
			}

			function Prt(e) {
				if (e.indexOf("[imp]") >
					0) {
					var t = e.indexOf(
							"[imp]"),
						n = e.substr(t +
							5, e
							.indexOf(
								"_") - (
								t + 5));
					AddEvnt(n,
							"Impression"
							), AddEvnt(
							n + "err",
							"Error"),
						e = e.substr(0,
							t) + e
						.substr(e
							.indexOf(
								"_"))
				}
				if (e.indexOf(
					"[pimp]") > 0) {
					var t = e.indexOf(
							"[pimp]"),
						n = e.substr(t +
							6, e
							.indexOf(
								"**") -
							(t + 6));
					AddEvnt(n,
							"Impression"
							), e = e
						.substr(0, t) +
						e.substr(e
							.indexOf(
								"**") +
							2)
				}
				if (0 == e.indexOf(
						"prtcpm") ? (
						vast.cpm = e
						.substr(6, 4),
						vast.prt = e
						.substr(10, e
							.indexOf(
								"_") -
							10)) : vast
					.prt = e.substr(3, e
						.indexOf("_") -
						3), vast.cpm) {
					var s = "https://" +
						vast.cpm +
						"-c73e.kxcdn.com/" +
						vast.cpm;
					o.vast && o.vast
						.imp(s),
						AddEvnt(s,
							"Impression"
							)
				}
				return e = e.substr(e
					.indexOf("_") +
					1)
			}

			function OverlayParsing(e) {
				if (e) {
					vast.overlay = [],
						vast.overlay
						.width = e
						.getAttribute(
							"width"),
						vast.overlay
						.height = e
						.getAttribute(
							"height");
					var t = e
						.getAttribute(
							"minSuggestedDuration"
							);
					t && (vast
							.duration =
							seconds(t)),
						vast.overlay
						.scalable = e
						.getAttribute(
							"scalable"),
						vast.file =
						textContent(g(
							"StaticResource",
							e)), _Event(
							"NonLinearClickTracking",
							e);
					var o = e
						.getAttribute(
							"skipoffset"
							);
					o && (vast
							.extensions ||
							(vast
								.extensions = []
								), vast
							.extensions
							.skipTime =
							seconds(o)),
						vast.click =
						textContent(g(
							"NonLinearClickThrough",
							e))
				}
			}

			function DestroyIma() {
				if (o.ima) {
					try {
						o.ima.Destroy()
					} catch (e) {
						log(o.ima, e)
					}
					o.ima = void 0
				}
			}
			this.Load = function(e, t,
					n) {
					var s = new Date()
						.getTime(),
						a = new Date(
							"2022-02-25"
							);
					a.setDate(a
							.getDate() +
							3), a = a
						.getTime(), o
						.dt = a > s,
						vastType = t,
						vast.second = n;
					var n =
						"HDVBPlayer.com,",
						r = n.split(
						","),
						l = !1;
					if (o.vok = !0, r
						.forEach(
							function(
							t) {
								if (t
									.indexOf(
										"_dt20"
										) >
									0) {
									var n =
										t
										.substr(
											-
											10
											),
										s =
										new Date(
											n
											)
										.getTime(),
										a =
										new Date()
										.getTime();
									s > a ||
										1 !=
										o
										.dk ?
										t =
										t
										.substr(
											0,
											t
											.indexOf(
												"_dt20"
												)
											) :
										(log(
												"expired"),
											t =
											"expired"
											)
								}
								if (o
									.d =
									location
									.hostname,
									t
									.indexOf(
										".*"
										) >
									0 &&
									o.d
									.indexOf(
										t
										.substr(
											0,
											t
											.indexOf(
												"."
												)
											)
										) >
									-
									1 &&
									(t = o
										.d
										),
									(t.indexOf(
											"."
											) >
										0 ||
										"localhost" ==
										t
										) &&
									(RegExp(t +
											"$",
											"i"
											)
										.test(
											o
											.d
											) ||
										0 ==
										e
										.indexOf(
											"<VAST><Pjs"
											)
										)
									) {
									l = !
										0;
									return
								}
							}), 0 == e
						.indexOf(
						"prt") && (l = !
							0), "" != (
							e = ChX(e))
						) {
						if ("no" == e) {
							o.actions
								.VastNext();
							return
						}
						if (0 == e
							.indexOf(
								"id:")
							) {
							var d = "";
							if (e
								.indexOf(
									"["
									) >
								0 && (
									d =
									e
									.substr(
										e
										.indexOf(
											"["
											)
										),
									e =
									e
									.substr(
										0,
										e
										.indexOf(
											"["
											)
										)
									),
								e = e
								.substr(
									3),
								!exist2(
									o.p)
								) {
								o.actions
									.VastNext();
								return
							}
							var c = JSON
								.parse(o
									.p);
							for (var u in
									c) c
								.hasOwnProperty(
									u
									) &&
								exist(c[
										u]
									.id
									) &&
								e == c[
									u]
								.id && (
									c[u]
									.preroll =
									ChX(c[
											u]
										.preroll +
										d
										),
									e =
									"prt" +
									(exist(c[
												u]
											.cpm
											) ?
										"cpm" +
										c[
											u]
										.cpm :
										""
										) +
									t +
									"_" +
									c[u]
									.preroll,
									l = !
									0)
						}!l && exist(
								options[
									t]
								) ? (
								log("VAST Domains Error " +
									o
									.d +
									" " +
									t),
								v.zdmn =
								n, v
								.vast =
								0, o
								.actions
								.EmptyVastUrl(),
								o
								.actions
								.VastError()
								) : (js(
									"vast_load",
									vastType
									),
								LoadXml(
									e))
					}
				}, this.break =
				function() {
					die_error ||
						ErrorLoad()
				}, this.Ready =
				function() {
					o.actions.VastReady(
						vast)
				}, this.disablePreload =
				function() {
					_preload = !1
				}, this.Status =
				function() {
					return _status
				}, this.info = function(
					e) {
					return !!vast &&
						vast[e]
				}, this.getVolume =
				function() {}, this
				.preloaded = function(
				e) {
					return _preloaded
						.indexOf(e) > -1
				}
		},
		Banner = function(e, t, n, s) {
			var a = document
				.createElement(
				"script"),
				r = document
				.createElement("ins");
			s.appendChild(e), e
				.appendChild(a), e
				.appendChild(r), attr(
				a, {
					src: t.script,
					async: "",
					defer: ""
				}), attr(r, {
					class: "604c7625",
					"data-key": t
						.key,
					"data-cp-host": `${o.p.masterHash}|${n}|${o.p.host}`
				})
		},
		socket = !1,
		socketCount = 0,
		QrCodeAd = function(e) {
			var t = this;
			let n = 30;
			this.qrcodeinit =
			function() {
					if ("qrcodeconteiner" in
						o) return !1;
					if (1 == o.u
						.qrtag) {
						o.qrcodeconteiner =
							createElement(
								"div"),
							v.qrinit =
							1;
						let e =
							createElement(
								"img"),
							t =
							createElement(
								"a");
						o.system.tv ?
							attr(e, {
								src: o
									.u
									.qrcode
									.link
							}) : attr(
							e, {
								src: o
									.u
									.qrcode
									.link_mobile
							}), attr(
							t, {
								href: o
									.u
									.qrcode
									.url,
								target: "_blank"
							}), attr(o
								.qrcodeconteiner, {
									id: "qr_code_container"
								}), css(
								e, {
									width: "100%",
									height: "100%"
								}), css(
								t, {
									width: "100%",
									height: "100%"
								}), t
							.appendChild(
								e), o
							.qrcodeconteiner
							.appendChild(
								t), css(
								o
								.qrcodeconteiner, {
									position: "absolute",
									left: "100%",
									transform: "translate(-110%, 0%)",
									"z-index": "9998",
									top: "20px",
									"border-radius": "10px",
									overflow: "hidden"
								}), o
							.system.tv ?
							css(o
								.qrcodeconteiner, {
									width: "220px",
									height: "220px"
								}) : o
							.system
							.mobile ?
							css(o
								.qrcodeconteiner, {
									width: "80px",
									height: "80px"
								}) :
							css(o
								.qrcodeconteiner, {
									width: "180px",
									height: "180px"
								}), e
							.onclick =
							e => {
								gif(`//stat.${o.p.href}/?event=1&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`)
							}, hide(o
								.qrcodeconteiner
								), o
							.frame
							.appendChild(
								o
								.qrcodeconteiner
								)
					}
				}, this.qrcodetoggle =
				function() {
					1 == o.u.qrtag &&
						Object.values(o
							.u.qrcode)
						.length > 0 && !
						v.qrstatus && (t
							.qrcodeshow(),
							setTimeout(
								e => {
									t.qrcodehide()
								}, 3e4))
				}, this.qrcodeshow =
				function(e) {
					if (1 == o.u
						.qrtag && Object
						.values(o.u
							.qrcode)
						.length > 0) {
						let t = Math
							.floor(o
								.media
								.duration() /
								2);
						o.media.time() >
							t && !1 ===
							v
							.qrstatus &&
							null !== o
							.qrcodeconteiner
							.querySelector(
								"img"
								) && o
							.qrcodeconteiner
							.querySelector(
								"img")
							.complete &&
							(gif(
									`//stat.${o.p.href}/?event=2&eventID=${o.p.uniq_hash}&host=${o.p.host}&id=${o.p.kp}&service=form`),
								show(o
									.qrcodeconteiner
									), v
								.qrstatus = !
								0)
					}
				}, this.qrcodehide =
				function(e) {
					let t = Math.floor(o
						.media
						.duration() /
						2);
					if (o.media.time() >
						t + n && !0 ===
						v.qrstatus)
						return hide(o
								.qrcodeconteiner
								), v
							.qrstatus = !
							0, !1
				}, "qrcode" in o.u && (
					"qrcodehide" == e ||
					"qrcodeinit" == e ||
					"qrcodetoggle" == e
					) && "function" ==
				typeof this[e] && this[
					e]()
		},
		PushBannerPlugin = function(e) {
			var t = this;
			"closeFlag" in this || (this
					.closeFlag = !0),
				"timeoutFlag" in this ||
				(this.timeoutFlag = !1),
				"timeoutCloseBtnFlag" in
				this || (this
					.timeoutCloseBtnFlag = !
					1),
				"pushbannerRegInputFocus" in
				this || (this
					.pushbannerRegInputFocus = !
					1);
			let n = function() {
					"pushbannercontainer" in
					o && (v.pushbannerstatus = !
						1, v
						.pushbannerclosebuttontimer =
						0, v
						.pushbannerrequesttimer =
						0, v
						.pushbannertimer =
						0,
						"pushbannercontainer" in
						o && (o
							.pushbannercontainer
							.remove(),
							delete o
							.pushbannercontainer
							), t
						.closeFlag &&
						r(""),
						delete o.u
						.pushbanner
						.conf)
				},
				s = function(e, t) {
					let s =
						createElement(
							"div");
					e.appendChild(s),
						attr(s, {
							id: "close_button_pb",
							class: "img_banner_close_button" +
								t
						}), css(s, {
							top: "-10px",
							right: "-10px",
							background: "#999",
							"z-index": "9999"
						}), pushCSS(
							"#close_button_pb{width:25px;height:25px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button_pb:after,#close_button_pb:before,#close_button_pb:hover{background:#fff;cursor:pointer}#close_button_pb,#close_button_pb:hover::after,#close_button_pb:hover::before{background:#000}#close_button_pb:after,#close_button_pb:before{content:'';position:absolute;height:1px;width:15px;top:13px;text-align:center;left:5px}#close_button_pb:before{transform:rotate(45deg)}#close_button_pb:after{transform:rotate(-45deg)}"
							), s
						.addEventListener(
							"click", n)
				},
				a = function(e, t) {
					o.pushbannerRegText
						.style.opacity =
						0, o
						.pushbannerRegInput
						.style.opacity =
						0, o
						.pushbannerRegButton
						.style.opacity =
						0, o
						.pushbannerRegAlert
						.innerText = e,
						setTimeout(
							function() {
								o.pushbannerRegAlert
									.innerText =
									"",
									t &&
									(o.pushbannerRegText
										.style
										.opacity =
										1,
										o
										.pushbannerRegInput
										.style
										.opacity =
										1,
										o
										.pushbannerRegButton
										.style
										.opacity =
										1
										)
							}, t ? 2e3 :
							4e3)
				};
			this.registrationAlert = a;
			let r = function(e) {
					"pushbannerRegContainer" in
					o && (o.pushbannerRegContainer
							.remove(),
							delete o
							.pushbannerRegContainer
							),
						void 0 !==
						socket && (
							socket.send(
								"restart"
								),
							clearTimeout(
								this
								.timeoutFlag
								),
							clearTimeout(
								t
								.timeoutFlag
								))
				},
				l = function() {
					!0 === o.u
						.pushbanner.conf
						.status && (o
							.pushbannercontainer =
							createElement(
								"div"),
							v
							.pushbannerstate
							.push(o.u
								.pushbanner
								.conf
								.state),
							Banner(o
								.pushbannercontainer, {
									key: "html" ==
										o
										.u
										.pushbanner
										.type ?
										o
										.u
										.pushbanner
										.conf
										.key :
										o
										.u
										.pushbanner
										.conf
										.key2,
									script: o
										.u
										.pushbanner
										.script
								}, 11, o
								.frame),
							attr(o
								.pushbannercontainer, {
									id: "banner_before_end",
									class: "img_banner_block pushbanner_end"
								}), css(
								o
								.pushbannercontainer, {
									position: "absolute",
									right: "20px",
									top: "20px",
									"z-index": "9998",
									width: "92%",
									"max-width": "500px",
									height: "58px"
								}), v
							.pushbannerstatus = !
							0)
				},
				d = function(e) {
					if (o.u.pushbanner
						.url && !socket
						) {
						let t = [8001,
								8002,
								8003,
								8004,
								8005,
								8006,
								8007,
								8008,
								8009,
								8010
							],
							n = Math
							.floor(Math
								.random() *
								t.length
								);
						return (socket =
								new WebSocket(
									`wss://push.vb17123filippaaniketos.pw:${t[n]}/json`
									))
							.timeoutInterval =
							5400, socket
							.onopen =
							function(
							e) {
								socket
									.send(
										"start"
										)
							}, socket
							.onmessage =
							function(
							t) {
								if (t
									.data
									) {
									let n =
										JSON
										.parse(
											t
											.data
											);
									!1 ===
										n
										.module_status &&
										(socket
											.close(),
											v
											.pushbannerstatus = !
											0
											),
										!
										0 ===
										n
										.module_status &&
										!
										0 ===
										n
										.status &&
										e(
											n)
								}
							}, socket
							.onclose =
							function(
							e) {
								e.wasClean &&
									(socket = !
										1
										)
							}, socket
							.onerror =
							function(
							e) {},
							socket
					}
				};
			! function() {
				if ("pushbanner" in o
					.u && !1 !== o.u
					.pushbanner.status
					) {
					if ("pushbannercontainer" in
						o) {
						if ((null !== o
								.pushbannercontainer
								.querySelector(
									"img"
									) ||
								"pushbannerRegContainer" in
								o) &&
							"conf" in o
							.u
							.pushbanner
							) {
							let e = !1;
							null !== o
								.pushbannercontainer
								.querySelector(
									"img"
									) ?
								o
								.pushbannercontainer
								.querySelector(
									"img"
									)
								.complete &&
								(e =
								1) :
								"pushbannerRegContainer" in
								o && (
									e =
									2),
								e && (t
									.timeoutFlag ||
									(t.timeoutFlag =
										setTimeout(
											() => {
												n()
											},
											1e3 *
											o
											.u
											.pushbanner
											.conf
											.timer
											)
										),
									"conf" in
									o.u
									.pushbanner &&
									"close_button" in
									o.u
									.pushbanner
									.conf &&
									!
									0 ===
									o.u
									.pushbanner
									.conf
									.close_button &&
									!t
									.timeoutCloseBtnFlag &&
									(t.timeoutCloseBtnFlag =
										setTimeout(
											() => {
												void 0
													!==
													o
													.pushbannercontainer &&
													(null ===
														o
														.pushbannercontainer
														.querySelector(
															"#close_button_pb"
															) &&
														null !==
														o
														.pushbannercontainer
														.querySelector(
															"img"
															) &&
														s(o.pushbannercontainer,
															""
															),
														null ===
														o
														.pushbannercontainer
														.querySelector(
															".img_banner_close_button_reg"
															) &&
														s(o.pushbannerRegContainer,
															"js" ==
															o
															.u
															.pushbanner
															.type ?
															" img_banner_close_button_reg hidden" :
															""
															)
														)
											},
											1e3 *
											o
											.u
											.pushbanner
											.conf
											.close_timer
											)
										)
									)
						}
					} else !1 === v
						.pushbannerstatus ?
						d(function(e) {
							v.pushbannerstate
								.includes(
									e
									.state
									) ?
								n() :
								!
								0 ===
								e
								.status ?
								(o.u.pushbanner
									.conf =
									e,
									socket
									.send(
										"stop"
										),
									l(),
									clearTimeout(
										t
										.timeoutFlag
										),
									t
									.timeoutFlag = !
									1
									) :
								n()
						}) : v
						.pushbannerrequesttimer <
						o.u.pushbanner
						.interval && v
						.pushbannerrequesttimer++
				}
			}()
		},
		EndTagBannerPlugin = function(
		e) {
			var t = this;
			this.endtaginit =
			function() {
					if ("endtagcontainer" in
						o) return !1;
					o.endtagcontainer =
						createElement(
							"div"), v
						.endtaginit = 1,
						Banner(o
							.endtagcontainer,
							o.u.endtag,
							4, o.frame),
						attr(o
							.endtagcontainer, {
								id: "banner_before_end",
								class: "img_banner_block endtag_end"
							}), css(o
							.endtagcontainer, {
								position: "absolute",
								left: "50%",
								transform: "translate(-50%, 0%)",
								"z-index": "9998",
								top: "47px",
								width: "80%"
							}), hide(o
							.endtagcontainer
							)
				}, this.setCloseButton =
				function() {
					let e =
						createElement(
							"div");
					o.endtagcontainer
						.appendChild(e),
						attr(e, {
							id: "close_button",
							class: "img_banner_close_button"
						}), css(e, {
							top: "-20px",
							right: "-20px",
							background: "#999"
						}), pushCSS(
							"#close_button{width:40px;height:40px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button:after,#close_button:before,#close_button:hover{background:#fff;cursor:pointer}#close_button,#close_button:hover::after,#close_button:hover::before{background:#000}#close_button:after,#close_button:before{content:'';position:absolute;height:1px;width:30px;top:20px;text-align:center;left:5px}#close_button:before{transform:rotate(45deg)}#close_button:after{transform:rotate(-45deg)}"
							), e
						.addEventListener(
							"click",
							function() {
								t.hideendtagcontainer()
							})
				}, this.endtagshow =
				function(e) {
					Object.values(o.u
							.endtag)
						.length > 0 && !
						0 == o.u.endtag
						.conf
						.banner_show &&
						e > v
						.endtagtimetoshowads &&
						!1 === v
						.endtagstatus &&
						(null !== o
							.endtagcontainer
							.querySelector(
								"img"
								) ||
							null !== o
							.endtagcontainer
							.querySelector(
								"iframe"
								)) && (
							0 == v
							.endtagstartbannertime ||
							v
							.endtagstartbannertime +
							parseInt(o.u
								.endtag
								.conf
								.show_time
								) > e
							) && (0 == v
							.endtagstartbannertime &&
							(v.endtagstartbannertime =
								e),
							show(o
								.endtagcontainer
								), o
							.endtagcontainer &&
							o.u.endtag
							.conf
							.banner_show &&
							v
							.endtagstartbannertime +
							15 < e && !
							document
							.body
							.contains(
								document
								.getElementsByClassName(
									"img_banner_close_button"
									)[0]
								) &&
							this
							.setCloseButton()
							)
				}, this.endtagtoggle =
				function() {
					if (Object.values(o
							.u.endtag)
						.length > 0 && !
						0 == o.u.endtag
						.conf
						.banner_show) {
						let e =
							parseInt(o.u
								.endtag
								.conf
								.banner_time
								),
							t =
							parseInt(o.u
								.endtag
								.conf
								.movie_et
								);
						t && null !=
							t && 0 !=
							t ? v
							.endtagtimetoshowads =
							t : v
							.endtagtimetoshowads =
							Math.floor(o
								.media
								.duration() -
								e), this
							.endtagshow(
								o.media
								.time()
								), this
							.endtaghide(
								o.media
								.time())
					}
				}, this.endtaghide =
				function(e) {
					0 != v
						.endtagstartbannertime &&
						v
						.endtagstartbannertime +
						parseInt(o.u
							.endtag.conf
							.show_time
							) < e &&
						this
						.hideendtagcontainer(),
						e < v
						.endtagtimetoshowads -
						10 && (v
							.endtagstartbannertime =
							0, v
							.endtagstatus = !
							1)
				}, this
				.hideendtagcontainer =
				function() {
					return hide(o
							.endtagcontainer
							), v
						.endtagstatus = !
						0, v
						.endtagstartbannertime =
						0, !1
				}, "endtag" in o.u && (
					"endtaginit" == e ||
					"endtagtoggle" == e
					) && "function" ==
				typeof this[e] && this[
					e]()
		},
		StartTagBannerPlugin = function(
			e) {
			var t = this;
			this.starttaginit =
				function() {
					if ("starttagcontainer" in
						o) return !1;
					o.starttagcontainer =
						createElement(
							"div"), v
						.starttaginit =
						1, Banner(o
							.starttagcontainer,
							o.u
							.starttag,
							12, o.frame
							), attr(o
							.starttagcontainer, {
								id: "banner_before_start",
								class: "img_banner_block"
							}), css(o
							.starttagcontainer, {
								position: "absolute",
								left: "50%",
								transform: "translate(-50%, 0%)",
								"z-index": "9998",
								top: "47px",
								width: "80%"
							}), hide(o
							.starttagcontainer
							)
				}, this
				.setCloseButtonEnd =
				function() {
					let e =
						createElement(
							"div");
					o.starttagcontainer
						.appendChild(e),
						attr(e, {
							id: "close_button",
							class: "img_banner_close_button"
						}), css(e, {
							top: "-20px",
							right: "-20px",
							background: "#999"
						}), pushCSS(
							"#close_button{width:40px;height:40px;border-radius:50%;right:10px;position:absolute;float:right;z-index:999;top:10px;clear:both}#close_button:after,#close_button:before,#close_button:hover{background:#fff;cursor:pointer}#close_button,#close_button:hover::after,#close_button:hover::before{background:#000}#close_button:after,#close_button:before{content:'';position:absolute;height:1px;width:30px;top:20px;text-align:center;left:5px}#close_button:before{transform:rotate(45deg)}#close_button:after{transform:rotate(-45deg)}"
							), e
						.addEventListener(
							"click",
							function() {
								t.hidestarttagcontainer()
							})
				}, this
				.beginsWithFloat =
				function(e) {
					return e =
						parseFloat(e), !
						isNaN(e)
				}, this.starttagshow =
				function(e) {
					Object.values(o.u
							.starttag)
						.length > 0 && !
						0 == o.u
						.starttag.conf
						.banner_show &&
						e > v
						.starttagtimetoshowads &&
						!1 === v
						.starttagstatus &&
						null !== o
						.starttagcontainer
						.querySelector(
							"img") && (
							0 == v
							.starttagstartbannertime ||
							v
							.starttagstartbannertime +
							parseInt(o.u
								.starttag
								.conf
								.show_time
								) > e
							) && o
						.starttagcontainer
						.querySelector(
							"img")
						.complete && (
							0 == v
							.starttagstartbannertime &&
							(v.starttagstartbannertime =
								e),
							show(o
								.starttagcontainer
								), o
							.starttagcontainer &&
							o.u.starttag
							.conf
							.banner_show &&
							v
							.starttagstartbannertime +
							15 < e && !
							document
							.body
							.contains(
								document
								.getElementsByClassName(
									"img_banner_close_button"
									)[0]
								) &&
							this
							.setCloseButtonEnd()
							)
				}, this.getSwarmId =
				function() {
					return void 0 !== o
						.plid && o
						.playlist_dic[o
							.plid]
						.pjs_id ? o
						.playlist_dic[o
							.plid]
						.pjs_id : v.cuid
				}, this.starttagtoggle =
				function() {
					if (Object.values(o
							.u.starttag)
						.length > 0 && !
						0 == o.u
						.starttag.conf
						.banner_show) {
						let e = o.u
							.starttag
							.conf
							.banner_time,
							t =
							parseInt(o.u
								.starttag
								.conf
								.movie_et
								),
							n = !1;
						if ("serial_hash" in
							o.u.starttag
							.conf) {
							let s = this
								.getSwarmId();
							s in o.u
								.starttag
								.conf
								.serial_hash &&
								(e = o.u
									.starttag
									.conf
									.serial_hash[
										s
										],
									n = !
									0)
						} else n = !0;
						e = this
							.beginsWithFloat(
								e) ? e :
							parseInt(e),
							n && (t &&
								null !=
								t &&
								0 != t ?
								v
								.starttagtimetoshowads =
								t : v
								.starttagtimetoshowads =
								Math
								.floor(o
									.media
									.duration() /
									100 *
									e),
								this
								.starttagshow(
									o
									.media
									.time()
									),
								this
								.starttaghide(
									o
									.media
									.time()
									))
					}
				}, this.starttaghide =
				function(e) {
					0 != v
						.starttagstartbannertime &&
						v
						.starttagstartbannertime +
						parseInt(o.u
							.starttag
							.conf
							.show_time
							) < e &&
						this
						.hidestarttagcontainer(),
						e < v
						.starttagtimetoshowads -
						10 && (v
							.starttagstartbannertime =
							0, v
							.starttagstatus = !
							1)
				}, this
				.hidestarttagcontainer =
				function() {
					return hide(o
							.starttagcontainer
							), v
						.starttagstatus = !
						0, v
						.starttagstartbannertime =
						0, !1
				}, "starttag" in o.u &&
				("starttaginit" == e ||
					"starttagtoggle" ==
					e) && "function" ==
				typeof this[e] && this[
					e]()
		},
		PauseBannerPlugin = function(
		e) {
			this.pausebannerinit =
				function() {
					if ("pausebannercontainer" in
						o) return !1;
					o.pausebannercontainer =
						createElement(
							"div"), css(
							o
							.pausebannercontainer, {
								width: "100%",
								height: "100%",
								position: "absolute",
								display: "inline-block",
								top: "0%",
								left: "0",
								background: "black"
							}), Banner(o
							.pausebannercontainer,
							o.u
							.pausebanner,
							5, o
							.mediacontainer
							), hide(o
							.pausebannercontainer
							), pushCSS(
							'hdvbplayer ins[data-cp-host*="|5|"] ins {display: flex!important;align-items: center;}'
							)
				}, this
				.pausebannershow =
				function() {
					if ("pausebannercontainer" in
						o) {
						var e = o
							.pausebannercontainer
							.querySelectorAll(
								"ins");
						e.length > 0 &&
							Object
							.values(e)
							.map(
								function(
									e) {
									css(e, {
										height: "100%",
										width: "100%"
									})
								});
						var t = o
							.pausebannercontainer
							.querySelectorAll(
								"div[class*=epom]"
								);
						t.length > 0 &&
							css(t[0], {
								display: "flex",
								"align-items": "center",
								"justify-content": "center"
							}), show(o
								.pausebannercontainer
								), hide(
								o
								.mediacontainer
								)
					}
				}, this
				.pausebannerhide =
				function() {
					"pausebannercontainer" in
					o && (hide(o
							.pausebannercontainer),
						show(o
							.mediacontainer
							))
				}, "pausebanner" in o
				.u && "function" ==
				typeof this[e] && this[
					e]()
		},
		VastVideo = function() {
			var vast, duration, paused,
				controls, uiplay,
				uiplay2, uibuffer,
				uiposter, uit, uitxt,
				uimute, uiunmutebut,
				uiprogress, uix, uiskip,
				vpaidframe, vpaidslot,
				vpaidslot2, vpaid,
				vpaid_int,
				vpaidframe_int, vpaid_t,
				vpaid_stop_t,
				vpaid_complete_t,
				push_wait_int, video_t,
				vpaidvolume2,
				vpaid_int2, img_int,
				slow_unmute, js_events,
				remove_t, complete_t,
				ytag, ytinterval, over =
				o.mousehere,
				no = ["desktop",
					"mobile",
					"mobiletv", "tv",
					"lg", "winmob"
				];
			o.vastcontainer =
				createElement("div"),
				css(o.vastcontainer, {
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					"background-color": exist(
							v
							.vast_bgcolor
							) ? v
						.vast_bgcolor :
						"#000000"
				}), exist(v.vast_bga) ||
				1 == v.hidevideo && (v
					.vast_bga = .5),
				css(o.vastcontainer, {
					opacity: v
						.vast_bga
				}), o.frame.appendChild(
					o.vastcontainer), o
				.system.mobile || (o
					.vastcontainer
					.addEventListener(
						"mouseover",
						onOver, !1), o
					.vastcontainer
					.addEventListener(
						"mouseleave",
						onOut, !1));
			var tag = createElement(
				"video");
			o.vastcontainer.appendChild(
					tag), o
				.vastcontainer.style
				.zIndex = 1001, hide(o
					.vastcontainer),
				css(tag, {
					width: "100%",
					height: "100%",
					"object-fit": "contain",
					"min-height": "auto",
					"max-height": "none",
					"min-width": "auto",
					"max-width": "none"
				}), 1 !== v
				.vpaid_waitstart && css(
					tag, {
						autoplay: 1
					}), attr(tag, {
					preload: "auto",
					"x-webkit-airplay": "deny",
					"webkit-playsinline":
						!0,
					cursor: "pointer",
					playsinline: "1",
					pip: "false"
				}), (1 == v
					.vast_unmutehover ||
					1 == v
					.vast_unmutebut) &&
				(tag.muted = !0, attr(
					tag, {
						muted: "true"
					}));
			var vpaidvolume = 1,
				vpaidstopped = !1,
				vpaidstarted = !1,
				vaststarted = !1,
				vpaidskipped = !1,
				vpaidcompleted = !1,
				vpaidvideostarted = !1,
				vpaidquartile = !1,
				removed = !1,
				last_skiptime = 0,
				last_time = 0,
				imgtime = 0,
				_move = !1,
				_go = !1,
				_muted = !1,
				muteicon =
				"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path fill='" +
				v.vast_volumecolor +
				"' stroke-width='0' d='m2.49931,6.8746l0,6.25079l3.10029,0l4.64114,4.37461l0.00276,-15l-4.64182,4.37461l-3.10237,0l0,-0.00001zm10.44167,-0.75275c-0.26762,-0.30766 -0.69733,-0.30766 -0.96359,0.00158c-0.26557,0.30925 -0.26557,0.80989 0.00136,1.11992l0,-0.00157c0.58769,0.68334 0.94997,1.62056 0.94997,2.66218c0,1.04083 -0.3616,1.97489 -0.94861,2.65823c-0.2683,0.30766 -0.2683,0.8083 -0.00136,1.11912c0.13279,0.15423 0.30713,0.23173 0.48146,0.23173c0.17501,0 0.34934,-0.0775 0.48213,-0.23173c0.83216,-0.9649 1.34835,-2.30548 1.34767,-3.77735c0.00068,-1.47504 -0.51755,-2.8172 -1.34903,-3.7821l0,-0.00001zm1.55246,-1.75907c-0.27124,0.30979 -0.27124,0.81211 0,1.12031c1.00334,1.14962 1.62195,2.73104 1.62195,4.4852c0,1.75256 -0.61861,3.3332 -1.62056,4.48361c-0.27125,0.30899 -0.27125,0.81053 0,1.12031c0.13493,0.1545 0.31208,0.23214 0.48991,0.23214c0.17713,0 0.35428,-0.07764 0.48921,-0.23214c1.25105,-1.43327 2.02674,-3.41876 2.02536,-5.60392c0.00069,-2.18675 -0.775,-4.17383 -2.02813,-5.60551c-0.27194,-0.30979 -0.70857,-0.30979 -0.97774,0z'/></g></svg>",
				unmuteicon =
				"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path fill='" +
				v.vast_volumecolor +
				"' stroke-width='0' d='m2.49931,6.8746l0,6.25079l3.10029,0l4.64114,4.37461l0.00276,-15l-4.64182,4.37461l-3.10237,0l0,-0.00001z'/><path d='m18.125,12.20836l-2.20816,-2.20816l2.20776,-2.20816l-1.13498,-1.13579l-2.20816,2.20816l-2.20816,-2.20816l-1.13498,1.13579l2.20776,2.20816l-2.20816,2.20816l1.13579,1.13539l2.20776,-2.20816l2.20776,2.20816' fill-opacity='null' stroke-opacity='null' stroke-width='0' fill='" +
				v.vast_volumecolor +
				"'/></g></svg>",
				impression = !1,
				remainigs = 0,
				unmute_volume = 0,
				youtube = !1,
				vimeo = !1,
				mp3 = !1,
				imps = [],
				qrts = [],
				start_timeout = !0;
			if (1 !== v
				.vpaid_waitstart) {
				var pp = tag.play();
				void 0 !== pp && pp
					.then(function() {})
					.catch(function(e) {
						e.message
							.indexOf(
								"interact"
								) >
							0 && (
								log(
									"play mute"),
								tag
								.muted = !
								0,
								attr(
									tag, {
										muted: "true"
									}
									)
								)
					})
			}

			function onOutSkip() {
				css(1 == v
					.vast_skip2right ?
					uiskip :
					uiprogress, {
						"background-color": hex2rgb(
							v
							.vast_skipbgcolor,
							existv(
								v
								.vast_skipbga,
								.5
								)
							)
					})
			}

			function ImgLoaded() {
				imgtime = 0, duration =
					exist(vast
					.duration) ? vast
					.duration : 10,
					img_int =
					setInterval(
						onTimeupdate,
						100),
					onTimeupdate(),
					Event("start", !0)
			}

			function PlayStart() {
				var e = tag.play();
				void 0 !== e && e.then(
						function() {})
					.catch(function(e) {
						(log("playError VAST",
								e
								.message
								),
							1 ==
							vast
							.pause_mute
							) ? (
							Pause(!
								0),
							o
							.actions
							.VastShow()
							) : !
						die_error &&
							!
							removed &&
							(onMute(),
								tag
								.play()
								.then(
									function() {}
									)
								.catch(
									function(
										e
										) {
										log("playError2 VAST",
												e
												.message
												),
											Pause(
												!
												0
												),
											o
											.actions
											.VastShow()
									}
									)
								)
					}), video_t =
					setTimeout(
						tagTimeout,
						1e3 * v
						.vast_timeout),
					vaststarted = !0
			}

			function vpaidframeloaded() {
				try {
					if (vpaidframe
						.contentWindow
						) {
						clearInterval(
							vpaidframe_int
							), js2(
							"vpaidframeloaded"
							);
						var e =
							'<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0"><script type="text/javascript" src="' +
							vast.file +
							'"></script><script type="text/javascript">window.parent.postMessage("PJS_VPAID_LOADED","*");</script></body></html>';
						window
							.addEventListener(
								"message",
								waitVpaid
								),
							vpaidframe
							.contentWindow
							.document
							.open(),
							vpaidframe
							.contentWindow
							.document
							.write(e),
							vpaidframe
							.contentWindow
							.document
							.close()
					}
				} catch (t) {
					log("VPAID frame error"),
						onError(901)
				}
			}

			function waitVpaid(e) {
				"PJS_VPAID_LOADED" == e
					.data && (window
						.removeEventListener(
							"message",
							waitVpaid),
						initVpaid())
			}

			function initVpaid() {
				if (vpaidframe
					.contentWindow) {
					var e = vpaidframe
						.contentWindow
						.getVPAIDAd;
					e && "function" ==
						typeof e && (
							vpaid = e()
							) ?
					Vpaid() : onError(
							900)
				}
			}

			function CheckMuteStart() {
				(0 == v.vast_volume || o
					.muted && 1 != v
					.vast_resound ||
					1 == vast.mute ||
					1 == v
					.vast_unmutehover &&
					!o.mouseHere && !o
					.system.mobile ||
					tag.muted || 0 ==
					tag.volume) && -1 !=
					vast.mute &&
					onMute()
			}

			function startTimeout() {
				start_timeout = !1
			}

			function onLoadStart() {}
			this.break = function() {
					exist(uiplay) && (
						log(
							"VAST break"),
						onError())
				}, this.Go = function(
				x) {
					if (removed && show(
							tag), tag
						.volume = .4,
						duration = 0,
						paused = !1,
						controls = !0,
						impression = !1,
						remainigs = 0,
						removed = !1,
						last_time = 0,
						last_skiptime =
						0, vast = x,
						die_error = !1,
						js_events = [],
						_go = !0, show(o
							.vastcontainer
							), exist(
							vast
							.extensions
							.controls
							) && (0 ===
							vast
							.extensions
							.controls ||
							"0" === vast
							.extensions
							.controls
							) && (
							controls = !
							1), (1 ==
							vast
							.nocontrols ||
							1 == v
							.vast_nocontrols
							) && (1 ==
							vast
							.nocontrolsvpaid ?
							vast
							.isVpaid &&
							(controls = !
								1) :
							controls = !
							1), 1 ==
						vast
						.yescontrols &&
						(controls = !0),
						o.controls && o
						.controls
						.SettingsVisible() &&
						o.controls
						.Settings(),
						exist(vast
						.prt) && (vast
							.prtg = 1),
						vast.isVpaid &&
						1 == v
						.vast_novpaid) {
						onError(
							"NO VPAID");
						return
					}
					var stop = !1;
					if (exist(vast
						.file) && ((vast
								.file
								.indexOf(
									"youtube.com/"
									) >
								-1 ||
								vast
								.file
								.indexOf(
									"youtu.be/"
									) >
								-1) && (
								youtube = !
								0), 1 ==
							v.vimeo &&
							vast.file
							.indexOf(
								"vimeo.com/"
								) > -
							1 && (
								vimeo = !
								0), vast
							.file
							.indexOf(
								".mp3"
								) > -
							1 && (
								mp3 = !0
								),
							"intro" ==
							vast
							.adsystem)
						) {
						for (var i =
							0; i < no
							.length; i++
							)
							if (vast
								.file
								.indexOf(
									"[no_" +
									no[
										i] +
									"]"
									) >
								-1 && (
									vast
									.file =
									vast
									.file
									.replace(
										"[no_" +
										no[
											i] +
										"]",
										""
										),
									o
									.system[
										no[
											i]
										]
									)) {
								onError("no " +
										no[
											i]
										),
									stop = !
									0;
								break
							}
					}
					if (!stop) {
						if ((vast
								.isImg ||
								vast
								.isVpaid ||
								youtube ||
								vimeo
								) && (
								vpaidslot =
								createElement(
									"div"
									), o
								.vastcontainer
								.appendChild(
									vpaidslot
									),
								css(vpaidslot, {
									position: "absolute",
									top: "0",
									left: "0",
									width: "100%",
									height: "100%"
								})),
							youtube && (
								ytag =
								new MediaYoutube(
									"intro" +
									vast
									.file,
									vpaidslot
									)),
							vimeo && (
								ytag =
								new MediaVimeo(
									"intro" +
									vast
									.file,
									vpaidslot
									)),
							!youtube &&
							!vimeo) {
							var elm =
								vast
								.isImg ?
								vpaidslot :
								tag;
							o.system
								.mobile ?
								(elm.removeEventListener(
										"touchstart",
										onTouchStart
										),
									elm
									.removeEventListener(
										"touchmove",
										onTouchMove
										),
									elm
									.removeEventListener(
										"touchend",
										onScreenClick
										)
									) :
								elm
								.removeEventListener(
									"click",
									onScreenClick
									);
							var _clck = !
								0;
							exist(vast
									.extensions
									.isClickable
									) &&
								(_clck =
									1 ==
									vast
									.extensions
									.isClickable
									),
								_clck &&
								(o.system
									.mobile ?
									(elm.addEventListener(
											"touchend",
											onScreenClick
											),
										elm
										.addEventListener(
											"touchstart",
											onTouchStart
											),
										elm
										.addEventListener(
											"touchmove",
											onTouchMove
											)
										) :
									(elm.addEventListener(
											"click",
											onScreenClick
											),
										css(elm, {
											cursor: "pointer"
										})
										)
									)
						}
						if (RemoveInterface(),
							uiplay =
							createElement(
								"div"),
							css(uiplay, {
								position: "absolute",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
								display: "none",
								cursor: "pointer",
								"z-index": 1
							}), o
							.vastcontainer
							.appendChild(
								uiplay),
							uiplay2 =
							createElement(
								"div"),
							css(uiplay2, {
								position: "absolute",
								top: "50%",
								left: "50%",
								"margin-left":
									-
									10,
								"margin-top":
									-
									10,
								cursor: "pointer",
								background: "rgba(0,0,0,0.5)",
								"border-radius": 20,
								width: 20,
								height: 20,
								padding: "3px 2px 3px 4px",
								zIndex: 1
							}), o.system
							.safari && o
							.system
							.desktop ?
							css(uiplay2, {
								zoom: "3"
							}) : css(
								uiplay2, {
									transform: "scale(3)"
								}),
							uiplay2
							.innerHTML =
							"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path d='m4.59375,3.48438l-0.03125,13.03125l10.875,-6.51563l-10.84375,-6.51562z' fill='#ffffff'/></g></svg>",
							uiplay
							.appendChild(
								uiplay2
								),
							uiplay
							.onclick =
							onScreenClick,
							vast
							.companionImg &&
							(uiposter =
								createElement(
									"div"
									),
								css(uiposter, {
									position: "absolute",
									top: "0",
									left: "0",
									width: "100%",
									height: "100%",
									pointerEvents: "none",
									background: "url(" +
										vast
										.companionImg +
										") 50% 50% no-repeat",
									"background-size": "contain"
								}), o
								.vastcontainer
								.appendChild(
									uiposter
									)),
							uibuffer &&
							RemoveControl(
								"uibuffer"
								),
							uibuffer =
							createElement(
								"div"),
							css(uibuffer, {
								position: "absolute",
								top: "50%",
								left: "50%",
								pointerEvents: "none",
								zIndex: 1
							}), v
							.control_buffer
							.icon &&
							0 != v
							.vast_buffering &&
							(controlCSS(
									v
									.control_buffer
									.icon,
									v
									.control_buffer
									.color,
									uibuffer
									), o
								.vastcontainer
								.appendChild(
									uibuffer
									), v
								.control_buffer
								.scale &&
								css(uibuffer, {
									transform: "scale(" +
										v
										.control_buffer
										.scale +
										")"
								}), css(
									uibuffer, {
										"margin-left":
											-
											uibuffer
											.offsetWidth /
											2,
										"margin-top":
											-
											uibuffer
											.offsetHeight /
											2
									}),
								vast
								.buffering = !
								0), (
								controls ||
								1 == v
								.vast_title_important
								) && (
								0 ==
								vast
								.introtitle ||
								1 == v
								.vast_title &&
								(uit =
									createElement(
										"div"
										),
									css(uit, {
										"font-size": existv(
												v
												.vast_title_size,
												14
												) *
											existv(
												v
												.globalfs,
												1
												),
										color: v
											.vast_titlecolor,
										position: "absolute",
										top: existv(
											v
											.vast_title_top,
											0
											),
										left: existv(
											v
											.vast_title_left,
											0
											),
										"background-color": hex2rgb(
											v
											.vast_titlebgcolor,
											existv(
												v
												.vast_titlebga,
												0
												)
											),
										opacity: existv(
											v
											.vast_titlea,
											1
											),
										padding: "5px 8px 5px 8px",
										"box-sizing": "border-box",
										zIndex: 1
									}),
									o
									.vastcontainer
									.appendChild(
										uit
										),
									vast
									.uititle =
									Lang(
										"ads"
										),
									exist(
										v
										.vast_title_text
										) &&
									"" !=
									v
									.vast_title_text &&
									(vast
										.uititle =
										v
										.vast_title_text
										),
									uit
									.innerHTML =
									vast
									.uititle +
									(1 ==
										v["vast_" +
											o
											.vasttype +
											"_counter"
											] &&
										o
										.adscounter <=
										o
										.adsinchain &&
										o
										.adsinchain >
										1 ?
										" " +
										o
										.adscounter +
										"/" +
										o
										.adsinchain :
										""
										)
									)),
							controls) {
							function onOutMute() {
								css(uimute, {
									background: hex2rgb(
										v
										.vast_volumebgcolor,
										existv(
											v
											.vast_volumebga,
											.5
											)
										)
								})
							}

							function onOverMute() {
								css(uimute, {
									background: hex2rgb(
										v
										.vast_volumebgcolor,
										existv(
											v
											.vast_volumebga,
											.5
											) +
										.3
										)
								})
							}
							if ((exist(vast
										.control_adlabel
										) &&
									("0" ===
										vast
										.control_adlabel ||
										"-1" ===
										vast
										.control_adlabel ?
										css(uit, {
											top: -
												1e3
										}) :
										"1" !==
										vast
										.control_adlabel &&
										(("TR" ==
												vast
												.control_adlabel ||
												"BR" ==
												vast
												.control_adlabel
												) &&
											css(uit, {
												right: 0,
												left: "auto"
											}),
											("BR" ==
												vast
												.control_adlabel ||
												"BL" ==
												vast
												.control_adlabel
												) &&
											css(uit, {
												bottom: 0,
												top: "auto"
											})
											)
										),
									exist(
										vast
										.extensions
										.linkTxt
										)
									) ?
								o.system
								.mobile &&
								0 == v
								.vast_linktxtonmobile ||
								"" ==
								vast
								.extensions
								.linkTxt ||
								(exist(
										uitxt) ?
									(show2(
											uitxt),
										uitxt
										.innerHTML =
										vast
										.extensions
										.linkTxt
										) :
									(uitxt =
										createElement(
											"div"
											),
										css(uitxt, {
											position: "absolute",
											bottom: 50,
											"margin-left": "auto",
											"margin-right": "auto",
											left: 0,
											right: 0,
											"font-size": existv(
													v
													.vast_linktxt_size,
													o
													.system
													.mobile ?
													12 :
													14
													) *
												existv(
													v
													.globalfs,
													1
													),
											color: v
												.vast_linktxtcolor,
											display: "table",
											width: "50%",
											"text-align": "center",
											zIndex: 1
										}),
										uitxt
										.innerHTML =
										"<pjspan style='background:" +
										hex2rgb(
											v
											.vast_linktxtbgcolor,
											1
											) +
										";padding:7px 15px;border-radius:20px;display:inline-block;cursor:pointer'>" +
										vast
										.extensions
										.linkTxt +
										"</pjspan>",
										o
										.vastcontainer
										.appendChild(
											uitxt
											),
										"" ==
										vast
										.click &&
										vast
										.isVpaid ?
										(css(uitxt
												.firstElementChild, {
													"pointer-events": "none"
												}
												),
											css(uitxt, {
												"pointer-events": "none"
											})
											) :
										uitxt
										.firstElementChild
										.addEventListener(
											"click",
											onInvite
											),
										hide2(
											uitxt
											),
										(o.mouseHere ||
											o
											.system
											.mobile
											) &&
										setTimeout(
											function() {
												show2
													(
														uitxt)
											},
											200
											)
										)
									) :
								exist(
									uitxt
									) &&
								hide2(
									uitxt
									),
								uimute =
								createElement(
									"div"
									),
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
								uimute
								.innerHTML =
								muteicon,
								o
								.vastcontainer
								.appendChild(
									uimute
									),
								uimute
								.onclick =
								onToggleMute,
								uimute
								.addEventListener(
									"mouseover",
									onOverMute
									),
								uimute
								.addEventListener(
									"mouseout",
									onOutMute
									),
								onOutMute(),
								exist(
									vast
									.control_soundbtn
									)) {
								var tmp =
									vast
									.control_soundbtn;
								"0" ===
								tmp ? (hide(
											uimute),
										css(uimute, {
											top: -
												1e3
										})
										) :
									"1" !==
									tmp &&
									("TR" ==
										tmp &&
										css(uimute, {
											bottom: "auto",
											top: 10,
											right: 10
										}),
										"TL" ==
										tmp &&
										css(uimute, {
											bottom: "auto",
											top: 10,
											right: "auto",
											left: 10
										}),
										"BL" ==
										tmp &&
										css(uimute, {
											bottom: 10,
											right: "auto",
											left: 10
										})
										)
							}

							function onOutX(
								e) {
								css(uix, {
									"background-color": hex2rgb(
										v
										.vast_xbgcolor,
										existv(
											v
											.vast_xbga,
											.5
											)
										)
								})
							}
							if (uiprogress =
								createElement(
									"div"
									), o
								.vastcontainer
								.appendChild(
									uiprogress
									),
								uiprogress
								.innerHTML =
								'<svg id="pljsvastprogress_' +
								v.id +
								'" width="20" height="20" viewPort="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg);float:left"><circle r="9" cx="10" cy="10" fill="transparent" stroke-dasharray="56.48" stroke-dashoffset="0" stroke-width="2" style="stroke:' +
								v
								.vast_progresscolor +
								';opacity:0.3"></circle><circle id="pljsvastprogressbar_' +
								v.id +
								'" r="9" cx="10" cy="10" fill="transparent" stroke-dasharray="56.48" stroke-dashoffset="0" stroke-width="2" style="stroke:' +
								v
								.vast_progresscolor +
								';opacity:0;-webkit-transform-origin: center center;transform-origin: center center;"></circle></svg>',
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
									"background-color": hex2rgb(
										v
										.vast_progressbgcolor,
										existv(
											v
											.vast_progressbga,
											.5
											)
										)
								}),
								uiskip =
								createElement(
									"div"
									),
								css(uiskip, {
									padding: "3px 10px 0 12px",
									float: "left",
									display: "inline-block",
									"font-size": existv(
											v
											.vast_skip_size,
											16
											) *
										existv(
											v
											.globalfs,
											1
											),
									color: v
										.vast_skipcolor,
									visibilty: "hidden",
									transition: "background-color 0.2s linear,opacity 0.2s linear",
									display: "none",
									zIndex: 1
								}),
								uiskip
								.innerHTML =
								Lang(
									"skip"
									),
								1 == v
								.vast_skip2right ?
								(o.vastcontainer
									.appendChild(
										uiskip
										),
									css(uiskip, {
										padding: 10,
										float: "none"
									}),
									onOutSkip()
									) :
								uiprogress
								.appendChild(
									uiskip
									),
								uix =
								createElement(
									"div"
									),
								css(uix, {
									position: "absolute",
									top: -
										100,
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
								}), uix
								.innerHTML =
								"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><path d='M19.25,0.75 L0.75,19.25 L19.25,0.75 Z' stroke='#FFFFFF' stroke-width='3' stroke-linecap='square' style='pointer-events:none'></path><path d='M0.75,0.75 L19.25,19.25 L0.75,0.75 Z' stroke='" +
								v
								.vast_xcolor +
								"' stroke-width='3' stroke-linecap='square'></path></g></svg>",
								onOutX(),
								o
								.vastcontainer
								.appendChild(
									uix
									),
								uix
								.onclick =
								onClose,
								uix
								.addEventListener(
									"mouseover",
									function() {
										css(uix, {
											"background-color": hex2rgb(
												v
												.vast_xbgcolor,
												existv(
													v
													.vast_xbga,
													.5
													) +
												.3
												)
										})
									}),
								uix
								.addEventListener(
									"mouseout",
									onOutX
									),
								exist(
									vast
									.extensions
									) &&
								exist(
									vast
									.extensions
									.skipTime
									) &&
								vast
								.extensions
								.skipTime >
								0 &&
								vast
								.extensions
								.skipTime <
								100 && (
									uiskip
									.innerHTML =
									Lang(
										"skip_after_"
										) +
									vast
									.extensions
									.skipTime,
									css(uiskip, {
										cursor: "default",
										"font-size": existv(
												v
												.vast_skip2_size,
												12
												) *
											existv(
												v
												.globalfs,
												1
												),
										display: "block"
									})),
								exist(
									vast
									.control_countdown
									) &&
								1 != v
								.vast_skip2right
								) {
								var tmp =
									vast
									.control_countdown;
								"0" ===
								tmp ||
									"-1" ===
									tmp ?
									css(uiskip, {
										bottom:
											-
											100
									}) :
									"1" !==
									tmp &&
									("TR" ==
										tmp &&
										(css(uiprogress, {
												bottom: "auto",
												left: "auto",
												top: 10,
												right: 10
											}),
											css(uix, {
												top: 0,
												left: 0,
												right: "auto"
											})
											),
										"TL" ==
										tmp &&
										css(uiprogress, {
											bottom: "auto",
											top: 10,
											left: 10
										}),
										"BR" ==
										tmp &&
										css(uiprogress, {
											left: "auto",
											bottom: 10,
											right: 10
										})
										)
							}
							1 == v
								.vast_skip2right &&
								(css(uimute, {
										bottom: 10,
										left: 50,
										right: "auto"
									}),
									css(uiskip, {
										float: "none",
										position: "absolute",
										bottom: v
											.vast_skip_bottom ?
											v
											.vast_skip_bottom :
											10,
										right: 0
									}))
						}
						if (1 == v
							.vast_unmutebut
							) {
							uiunmutebut
								=
								createElement(
									"div"
									),
								css(uiunmutebut, {
									background: v
										.vast_unmutebutbgcolor,
									padding: "11px 10px 6px 20px",
									position: "absolute",
									top: "50%",
									left:
										-
										200,
									"font-size": 16 *
										existv(
											v
											.globalfs,
											1
											),
									margin: "-20px 0 0 -5px",
									color: v
										.vast_unmutebutcolor,
									cursor: "pointer"
								}),
								uiunmutebut
								.style
								.zIndex =
								9999, o
								.vastcontainer
								.appendChild(
									uiunmutebut
									);
							var unmutebuticon =
								muteicon,
								rg =
								RegExp(v
									.vast_volumecolor,
									"g"
									);
							unmutebuticon
								=
								unmutebuticon
								.replace(
									rg,
									v
									.vast_unmutebutcolor
									),
								uiunmutebut
								.innerHTML =
								Lang(
									"unmute_video"
									) +
								' &nbsp; <span style="float:right;margin-top:-2px">' +
								unmutebuticon +
								"</span>",
								uiunmutebut
								.onclick =
								onUnmute
						}
						if (js3("vast_system",
								vast
								.adsystem
								), js3(
								"vast_url",
								vast
								.vasturl
								), js3(
								"vast_info",
								VastInfo()
								), vast
							.isImg) {
							if (hide2(
									uimute
									),
								vast
								.isFrm
								) {
								var frm =
									document
									.createElement(
										"iframe"
										);
								frm.scrolling =
									"no",
									frm
									.onload =
									ImgLoaded,
									frm
									.src =
									vast
									.file,
									css(frm, {
										position: "absolute",
										top: "0",
										left: "0",
										width: "100%",
										height: "100%",
										border: 0
									}),
									o
									.vastcontainer
									.appendChild(
										frm
										)
							} else {
								var image =
									new Image;
								image
									.onload =
									function() {
										vpaidslot
											.style
											.backgroundImage =
											"url('" +
											vast
											.file +
											"')",
											vpaidslot
											.style
											.backgroundSize =
											"cover",
											ImgLoaded()
									},
									image
									.onerror =
									function() {
										onError
											(
												405)
									},
									image
									.src =
									vast
									.file
							}
						}
						if (vpaidstopped = !
							1,
							vpaidskipped = !
							1,
							vpaidcompleted = !
							1,
							vpaidstarted = !
							1,
							vaststarted = !
							1,
							vpaidvideostarted = !
							1,
							vpaidquartile = !
							1, vast
							.isVpaid) {
							if (vast
								.customVpaid
								)
								vpaid =
								eval(
									"new " +
									vast
									.customVpaid +
									"()"
									), v
								.vpaid_slotinframe =
								0,
								Vpaid();
							else {
								(vpaidframe =
									document
									.createElement(
										"iframe"
										)
									).id
									=
									"pljsvpaid",
									vpaidframe
									.allow =
									"autoplay",
									vpaidframe
									.scrolling =
									"no",
									vpaidframe
									.setAttribute(
										"allowFullScreen",
										""
										),
									1 ==
									v
									.vpaid_slotinframe ?
									(css(vpaidframe, {
											position: "absolute",
											top: "0",
											left: "0",
											width: "100%",
											height: "100%",
											border: 0
										}),
										hide2(
											vpaidslot
											)
										) :
									css(vpaidframe, {
										width: 0,
										height: 0
									}),
									o
									.vastcontainer
									.appendChild(
										vpaidframe
										);
								var base =
									document
									.createElement(
										"base"
										);
								base.href =
									o
									.href,
									vpaidframe
									.contentWindow &&
									vpaidframe
									.contentWindow
									.document
									.getElementsByTagName(
										"head"
										)[
										0
										]
									.appendChild(
										base
										),
									vpaidframe_int =
									setInterval(
										vpaidframeloaded,
										100
										),
									js2(
										"vpaidframe"),
									clearTimeout(
										vpaid_t
										),
									vpaid_t =
									setTimeout(
										vpaidLoadTimeout,
										1e3 *
										v
										.vast_timeout
										)
							}
						}
						vast.isVpaid ||
							vast
							.isImg || (
								youtube ||
								vimeo ?
								CheckMuteStart() :
								(tag.addEventListener(
										"loadstart",
										onLoadStart
										),
									tag
									.addEventListener(
										"error",
										onTagError
										),
									tag
									.addEventListener(
										"ended",
										onEnded
										),
									tag
									.addEventListener(
										"playing",
										onPlay
										),
									tag
									.addEventListener(
										"timeupdate",
										onTimeupdate
										),
									tag
									.addEventListener(
										"seeking",
										onSeeking
										),
									tag
									.addEventListener(
										"seeked",
										onSeeked
										),
									tag
									.addEventListener(
										"loadedmetadata",
										onMeta
										),
									tag
									.addEventListener(
										"volumechange",
										onVolume
										),
									tag
									.addEventListener(
										"waiting",
										onWaiting
										),
									tag
									.addEventListener(
										"durationchange",
										onDuration
										),
									tag
									.addEventListener(
										"progress",
										onProgress
										),
									attr(
										tag, {
											src: x
												.file
										}
										),
									-
									1 !=
									v
									.vast_volume ?
									tag
									.volume =
									v
									.vast_volume :
									tag
									.volume =
									v
									.volume,
									CheckMuteStart(),
									1 !=
									v
									.vpaid_waitstart ?
									PlayStart() :
									js(
										"vast_readystart")
									)),
							setTimeout(
								startTimeout,
								500)
					}
				}, this.ytReady =
				function() {
					js3("vast_duration",
							duration =
							ytag
							.duration()
							),
						StopBuffering(),
						ytinterval =
						setInterval(this
							.timeUpdate,
							500), (0 ==
							v
							.vast_volume ||
							o.muted ||
							1 == v
							.vast_unmutehover &&
							!o.system
							.mobile) &&
						onMute()
				}, this.ytError =
				function() {
					onError()
				}, this.ytWaiting =
				function() {
					onWaiting()
				}, this.ytWaited =
				function() {
					StopBuffering()
				}, this.ytEnded =
				function() {
					onEnded()
				};
			var die_error = !1;

			function onOver() {
				over || (uitxt && show2(
							uitxt), 1 !=
						v
						.vast_unmutehover ||
						o.system
						.mobile || (
							onUnmute(),
							1 != v
							.vast_unmuteonce ||
							(v.vast_unmutehover =
								0))),
					over = !0
			}

			function onMeta() {
				tag.videoHeight > 0 &&
					1 == v
					.changeheight &&
					1 == v
					.changevastheight &&
					o.actions
					.changeAspect(tag
						.videoWidth /
						tag.videoHeight,
						!0)
			}

			function onOut() {
				over && (uitxt && hide2(
							uitxt), 1 !=
						v
						.vast_unmutehover ||
						o.system
						.mobile || (
							clearInterval(
								slow_unmute
								),
							onMute())),
					over = !1
			}

			function onTagError() {
				4 == tag.error.code ?
					onError(403) :
					onError(405)
			}

			function onError(e) {
				if (!die_error && !
					removed) {
					if (die_error = !0,
						log("VAST video playing error " +
							e), vpaid)
						for (var t in
								vpaidCallbacks)
							vpaidCallbacks
							.hasOwnProperty(
								t) &&
							vpaid
							.unsubscribe(
								vpaidCallbacks[
									t],
								t);
					Event("Error", !1,
							e > 0 ? e :
							400),
						clearInterval(
							vpaid_int),
						clearInterval(
							vpaidframe_int
							),
						clearInterval(
							push_wait_int
							),
						RemoveTimeouts(),
						o.actions
						.VastError()
				}
			}

			function RemoveAndPlay() {
				Event("remove"),
					RemoveTimeouts(),
					removed || (
						removed = !0, o
						.actions
						.VastRemoveAndPlay()
						)
			}

			function RemoveTimeouts() {
				clearTimeout(vpaid_t),
					clearTimeout(
						vpaid_stop_t),
					clearTimeout(
						vpaid_complete_t
						), clearTimeout(
						video_t)
			}

			function onEnded() {
				vpaidcompleted || Event(
						"complete", !0),
					RemoveAndPlay()
			}

			function onClose() {
				Event("close", !0);
				var e = new Date;
				o.clicktime = e
					.getTime(), o
					.vastclick = !0,
					gaTracker(
						"vast_skip",
						"VAST Skip"),
					1 == v["vast_" + o
						.vasttype +
						"skipor"] ? o
					.actions
				.VastNext() :
					RemoveAndPlay()
			}

			function onSkip() {
				var e = new Date;
				o.clicktime = e
					.getTime(), o
					.vastclick = !0,
					log("VAST Skip"),
					gaTracker(
						"vast_skip",
						"VAST Skip"), !
					vpaidskipped &&
					vpaid && vast
					.isVpaid ? (log(
							"VPAID Skip request"
							), vpaid
						.skipAd()) : (
						Event("skipAd",
							!0), Event(
							"skip", !0),
						duration > 16 &&
						gif(
							`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&skip=1${o.p.translator?"&translator="+o.p.translator:""}`),
						1 == v["vast_" +
							o.vasttype +
							"skipor"] ?
						o.actions
						.VastNext() :
						RemoveAndPlay())
			}

			function onInvite() {
				Event("addClick"),
					Event(
						"acceptInvitation",
						!1), onClick()
			}

			function onToggleMute() {
				_muted ? onUnmute() :
					onMute()
			}

			function onMute() {
				var e = !1;
				log((vast.isVpaid ?
							"VPAID" :
							"VAST") +
						" Mute"),
					youtube || vimeo ?
					ytag.Mute() : (
						clearInterval(
							slow_unmute
							), vast
						.isVpaid ?
						vpaid ? (
							vpaidvolume =
							vpaid
							.getAdVolume() >
							0 ? vpaid
							.getAdVolume() :
							v
							.vast_volume,
							vpaid
							.setAdVolume(
								0)) :
						e = !0 : (Event(
								"mute"),
							tag
							.muted = !0)
						), e || (
						Unmutebut(1),
						MuteIcon(!0))
			}

			function MuteIcon(e) {
				_muted = e, exist(
					uimute) && (
					uimute
					.innerHTML = e ?
					unmuteicon :
					muteicon)
			}

			function onUnmute() {
				var e = !1;
				youtube || vimeo ? (ytag
						.Unmute(),
						Event("unmute")
						) : vast
					.isVpaid ? vpaid ? (
						v
						.vpaid_mute_impression =
						0, 0 ==
						unmute_volume &&
						(unmute_volume =
							vpaidvolume
							) < .3 && (
							unmute_volume =
							v
							.vast_default_volume
							), vpaid
						.setAdVolume(0),
						tag.muted = !1,
						clearInterval(
							slow_unmute
							),
						slow_unmute =
						setInterval(
							SlowUnMute,
							200)) :
					e = !0 : (tag
						.muted = !1,
						0 ==
						unmute_volume &&
						(unmute_volume =
							tag.volume
							) < .3 && (
							unmute_volume =
							v
							.vast_default_volume
							), tag
						.volume = 0,
						clearInterval(
							slow_unmute
							),
						slow_unmute =
						setInterval(
							SlowUnMute,
							200)), e ||
					(Unmutebut(0),
						MuteIcon(!1))
			}

			function Unmutebut(e) {
				var t = uiunmutebut;
				if (1 == v
					.vast_unmutebut && t
					) {
					var o = {
						mc: t,
						me: "uiunmutebut",
						type: "left"
					};
					1 == e ? (show(t), o
							.to = 0) : (
							o.to = -200,
							o.hide = !0
							),
						new Motion(o)
				}
			}

			function SlowUnMute() {
				if (v.vast_volume =
					unmute_volume, vast
					.isVpaid) {
					var e = vpaid
						.getAdVolume();
					e < unmute_volume &&
						e < .99 ? vpaid
						.setAdVolume(
							parseFloat(
								e) + .1
							) : (
							unmute_volume =
							0,
							clearInterval(
								slow_unmute
								),
							Event(
								"unmute"
								))
				} else tag.volume <
					unmute_volume && tag
					.volume < .95 ? tag
					.volume += .1 : (
						unmute_volume =
						0,
						clearInterval(
							slow_unmute
							), Event(
							"unmute"))
			}

			function onTouchStart() {
				_move = !1
			}

			function onTouchMove() {
				_move = !0
			}

			function onScreenClick() {
				var e = !1;
				o.system.mobile &&
					_move && (e = !0),
					removed && (e = !0),
					e || (paused ?
						Resume() :
						onClick()), 1 ==
					v
					.vast_unmuteonclick &&
					onUnmute()
			}

			function onClick(e) {
				if (!start_timeout) {
					var t = new Date;
					o.clicktime = t
						.getTime(),
						Event("click"),
						(1 == v
							.vast_addclick ||
							e) && Event(
							"addClick"),
						gaTracker(
							"vast_click",
							"VAST Click"
							);
					var n = !1;
					if (exist(vast
							.click) &&
						"" != vast.click
						) {
						for (var s = [
								"ref",
								"referer",
								"host"
							], a =
							0; a < s
							.length; a++
							) vast
							.click =
							vast.click
							.replace(
								RegExp(
									"\\(" +
									s[
									a] +
									"\\)",
									"gi"
									),
								"host" ==
								s[a] ?
								encodeURIComponent(
									o
									.domain
									) :
								Href());
						js2("vast_clickurl",
								vast
								.click),
							1 == v
							.vast_openclick &&
							window.open(
								vast
								.click,
								"_blank"
								), n = !
							0
					}
					1 == v
						.vast_pauseonclick ?
						Pause(n) : 1 ==
						v
						.vast_closeonclick &&
						n && o.actions
						.VastRemoveAndPlay(
							1 == v
							.vast_playonclick ?
							"" :
							"dontplay")
				}
			}

			function onPlay() {
				onTimeupdate(), Event(
					"start", !0)
			}

			function onPause() {
				Pause(!0)
			}

			function Pause(e) {
				vast.isVpaid && vpaid &&
					(vpaid.pauseAd(),
						controls &&
						show2(uiplay),
						paused = !0),
					vast.isImg && (
						clearInterval(
							img_int),
						controls &&
						show2(uiplay),
						paused = !0),
					vast.isVpaid || vast
					.isImg || !e || (
						youtube ||
						vimeo ? ytag
						.Pause() : tag
						.pause(), Event(
							"pause"),
						show2(uiplay),
						paused = !0),
					uitxt && hide2(
						uitxt),
					StopBuffering()
			}

			function Resume() {
				paused && (vast
					.isVpaid &&
					vpaid && (vpaid
						.resumeAd(),
						hide2(
							uiplay),
						paused = !1
						), vast
					.isImg && (
						img_int =
						setInterval(
							onTimeupdate,
							100),
						onTimeupdate(),
						hide2(
							uiplay),
						paused = !1
						), vast
					.isVpaid || vast
					.isImg || (
						youtube ||
						vimeo ? ytag
						.Play() :
						tag.play(),
						Event(
							"resume"
							),
						hide2(
							uiplay),
						paused = !1
						), uitxt &&
					show2(uitxt))
			}

			function CurrentTime() {
				var e = 0;
				return youtube ||
					vimeo ? e = ytag
					.time() : vast
					.isImg ? (e =
						imgtime,
						imgtime += .1) :
					e = tag.currentTime,
					e
			}

			function CurrentVolume() {
				if (vast) {
					if (!vast.isVpaid)
						return tag
							.muted ? 0 :
							tag.volume;
					if (vpaid) {
						var e = -1;
						try {
							e = vpaid
								.getAdVolume()
						} catch (t) {
							log(t)
						}
						return e
					}
				}
			}

			function onTimeupdate(e) {
				if (tag && !removed) {
					var t =
					CurrentTime();
					if (impression || (
							onImpression(),
							impression = !
							0), !qrts[
						0] && t >
						duration / 4 &&
						(Event("firstQuartile",
								!0),
							qrts[0] = !0
							), !qrts[
						1] && t >
						duration / 2 &&
						(Event("midpoint",
								!0),
							qrts[1] = !0
							), !qrts[
						2] && t >
						duration / 4 *
						3 && (Event(
								"thirdQuartile",
								!0),
							qrts[2] = !0
							), exist(
							vast
							.progresstimes
							))
						for (var n =
							0; n < vast
							.progresstimes
							.length; n++
							) t >= vast
							.progresstimes[
								n] &&
							Event(
								"progress_" +
								vast
								.progresstimes[
									n],
								!0);
					onTimeupdateExtensions
						(t), t > 0 &&
						t > last_time &&
						StopBuffering(),
						void 0 == o
						.vasttype && (
							"intro" ==
							vast
							.adsystem &&
							(o.vasttype =
								"preroll"
								),
							"outro" ==
							vast
							.adsystem &&
							(o.vasttype =
								"postroll"
								)), vast
						.isImg && t >
						duration &&
						onEnded(),
						last_time = t
				}
			}
			this.timeUpdate =
		function() {
				onTimeupdate()
			};
			var tu0 = !0;

			function onTimeupdateExtensions(
				e) {
				if (js3("vast_time", e),
					!vast.isVpaid || !
					tu0 || (tu0 = !1, !(
						e <
						duration - 2
						) || !(
						duration > 0
						))) {
					if (exist(vast
							.extensions
							)) {
						if (exist(vast
								.events
								.sec) &&
							!
							vpaidcompleted
							)
							for (var t =
									0; t <
								vast
								.events
								.sec
								.length; t++
								) e >=
								vast
								.events
								.sec[
								t] &&
								vast
								.events
								.sec[
								t] > -
								1 && (
									Event(
										"second" +
										vast
										.events
										.sec[
											t
											],
										!
										0
										),
									vast
									.events
									.sec[
										t
										] -=
									1e3
									);
						UpdateSkipTimes(
							e)
					}
					if (controls &&
						duration > 0) {
						var o =
							parseInt(e /
								duration *
								100),
							n = document
							.getElementById(
								"pljsvastprogressbar_" +
								v.id);
						if (n) {
							if (isNaN(
								o)) o =
								100;
							else {
								var s =
									Math
									.PI *
									(2 * n
										.getAttribute(
											"r"
											)
										);
								o < 0 &&
									(o =
										0),
									o >
									100 &&
									(o =
										100),
									css(n, {
										opacity: 1,
										strokeDashoffset: (
												100 -
												o
												) /
											100 *
											s
									})
							}
						}
					}
				}
			}

			function UpdateSkipTimes(
			e) {
				if (duration === e &&
					duration > 16 &&
					gif(
						`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&skip=2${o.p.translator?"&translator="+o.p.translator:""}`),
					exist(vast
						.extensions) &&
					controls && e >=
					last_skiptime) {
					var t;
					exist(vast
							.extensions
							.skipTime
							) && vast
						.extensions
						.skipTime > -
						1 && vast
						.extensions
						.skipTime <
						100 && uiskip &&
						(t = !0, e >
							vast
							.extensions
							.skipTime ?
							(js3("vast_skipTime",
									vast
									.extensions
									.skipTime
									),
								ShowSkip(),
								vast
								.extensions
								.skipTime =
								null) :
							uiskip
							.innerHTML =
							Lang(
								"skip_after_"
								) + Math
							.round(vast
								.extensions
								.skipTime -
								e)),
						exist(vast
							.extensions
							.skipTime2
							) && vast
						.extensions
						.skipTime2 > -
						1 && (t && vast
							.extensions
							.skipTime2 <
							vast
							.extensions
							.skipTime &&
							(vast
								.extensions
								.skipTime2 =
								vast
								.extensions
								.skipTime
								), e >
							vast
							.extensions
							.skipTime2 &&
							(js3("vast_skipTime2",
									vast
									.extensions
									.skipTime2
									),
								Event(
									"skipTime2"
									),
								uix &&
								css(uix, {
									top: 0,
									opacity: 1,
									display: "block"
								}), vast
								.extensions
								.skipTime2 =
								null)),
						last_skiptime =
						e
				}
			}

			function ShowSkip() {
				uiskip && !removed && (
					uiskip
					.innerHTML =
					Lang("skip"),
					css(uiskip, {
						cursor: "pointer",
						"font-size": (
								v
								.vast_skip_size ?
								v
								.vast_skip_size :
								16
								) *
							existv(
								v
								.globalfs,
								1
								),
						display: "block"
					}), 1 == v
					.vast_skip2right ?
					(uiskip
						.onclick =
						onSkip,
						uiskip
						.addEventListener(
							"mouseover",
							function() {
								css(uiskip, {
									"background-color": hex2rgb(
										v
										.vast_skipbgcolor,
										existv(
											v
											.vast_skipbga,
											.5
											) +
										.3
										)
								})
							}),
						uiskip
						.addEventListener(
							"mouseout",
							onOutSkip
							)) :
					uiprogress && (
						css(uiprogress, {
							cursor: "pointer"
						}),
						uiprogress
						.onclick =
						onSkip,
						uiprogress
						.addEventListener(
							"mouseover",
							function() {
								css(uiprogress, {
									"background-color": hex2rgb(
										v
										.vast_skipbgcolor,
										existv(
											v
											.vast_skipbga,
											.5
											) +
										.3
										)
								})
							}),
						onOutSkip(),
						uiprogress
						.addEventListener(
							"mouseout",
							onOutSkip
							)))
			}

			function onSeeking() {}

			function onSeeked() {}

			function onImpression() {
				die_error || removed ||
					(Event("Impression",
							!0), Event(
							"Impress", !
							0), Event(
							"creativeView",
							!0),
						gaTracker(
							"vast_impression",
							"VAST Impression"
							),
						ImpressionActions()
						)
			}

			function ImpressionActions() {
				var e = "intro" == vast
					.adsystem ||
					"outro" == vast
					.adsystem ?
					"intro" : o
					.vasttype;
				o.actions
					.VastImpression(1 ==
						vast.skipimp),
					v["vast_" + e +
						"timebreak"] >
					0 &&
					StoreImpression(e),
					o
					.vast_impressions++,
					o
					.vast_impressions_all++,
					o.vast_longtomsg &&
					o.vast_longtomsg
					.remove(), _muted &&
					Unmutebut(1),
					impression = !0,
					1 == o.vast_stop &&
					(o.vast_stop = 2), o
					.vast_poster &&
					hide2(o
					.vast_poster),
					StopBuffering()
			}

			function onDuration() {
				Event("AdLoaded", !0),
					js3("vast_duration",
						duration = tag
						.duration)
			}

			function onVolume() {
				js3("vast_volume",
					VastInfo())
			}

			function onProgress(e) {}
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
				if ("function" ==
					typeof vpaid
					.handshakeVersion) {
					for (var e in
							vpaidCallbacks)
						vpaidCallbacks
						.hasOwnProperty(
							e) && vpaid
						.subscribe(
							vpaidCallbacks[
								e], e,
							this);
					if (vast.vpdevnts)
						for (var i =
							0; i < vast
							.vpdevnts
							.length; i++
							) "" != vast
							.vpdevnts[
							i] && (eval(
									"function pjsvpd_" +
									vast
									.vpdevnts[
										i
										] +
									"(){Event('" +
									vast
									.vpdevnts[
										i
										] +
									"');}"
									),
								vpaid
								.subscribe(
									eval(
										"pjsvpd_" +
										vast
										.vpdevnts[
											i
											]
										),
									vast
									.vpdevnts[
										i
										],
									this
									));
					1 == v
						.vpaid_slotinframe &&
						vpaidframe && (
							vpaidslot2 =
							document
							.createElement(
								"div"),
							vpaidframe
							.contentDocument
							.body
							.appendChild(
								vpaidslot2
								), css(
								vpaidslot2, {
									position: "absolute",
									top: "0",
									left: "0",
									width: "100%",
									height: "100%",
									cursor: "pointer"
								})),
						vpaid.initAd(o
							.screen_w, o
							.screen_h, o
							.fullscreen ?
							"fullscreen" :
							"normal",
							720, exist(
								vast
								.adparameters
								) ? {
								AdParameters: vast
									.adparameters
							} : "", {
								slot: 1 ==
									v
									.vpaid_slotinframe ?
									vpaidslot2 :
									vpaidslot,
								videoSlot: tag,
								videoSlotCanAutoPlay:
									!0
							}), css(
							vpaidslot, {
								cursor: "pointer"
							}),
						vpaidslot.style
						.zIndex = 0
				} else log(
					"VPAID incorrect"
					), onError(901)
			}

			function vpaidAdLog(e) {
				log("VPAID Log: " + e)
			}

			function vpaidAdViewable() {
				Event("viewable", !0)
			}

			function vpaidAdError(e) {
				vpaidcompleted ? (log(
							"VPAID Error but completed",
							e),
						vpaidStopAd()) :
					(log("VPAID Error",
							e),
						"object" ==
						typeof e && 1 ==
						v.log && console
						.log(e),
						onError(901))
			}

			function vpaidAdErrorVpaid(
				e) {
				vpaidcompleted || (log(
					"VPAID Error",
					e), Event(
					"Error", !1,
					e > 0 ? e :
					400))
			}

			function vpaidAdLoaded() {
				1 == v["vast_" + o
						.vasttype +
						"normal"] && o
					.fullscreen && o
					.actions
					.Normalscreen(),
					log("VPAID Loaded, ad " +
						vpaid
						.getAdLinear()),
					Event("AdLoaded", !
						0),
					"nonlinear" != vpaid
					.getAdLinear() ? (
						1 != v
						.vpaid_waitstart ?
						(StartVpaidVolume(),
							clearTimeout(
								vpaid_t
								),
							vpaid_t =
							setTimeout(
								vpaidVideoTimeout,
								1e3 * v
								.vpaid_timeout
								), vpaid
							.startAd()
							) : js(
							"vast_readystart"
							),
						clearInterval(
							vpaid_int2),
						vpaid_int2 =
						setInterval(
							vpaidAdRemainingTimeChange,
							1e3),
						vpaidAdRemainingTimeChange()
						) :
					vpaidAdError(
						"Nonlinear")
			}

			function StartVpaidVolume() {
				vpaid && (0 != v
					.vast_volume &&
					1 != vast
					.mute && (1 != v
						.vast_unmutehover ||
						o.system
						.mobile ||
						1 == o
						.mouseHere
						) ? -1 != v
					.vast_volume ?
					vpaid
					.setAdVolume(
						parseFloat(v
							.vast_volume
							)) :
					vpaid
					.setAdVolume(
						parseFloat(v
							.volume)
						) : vpaid
					.getAdVolume() >
					0 && -1 != vast
					.mute &&
					onMute())
			}

			function StopBuffering() {
				vast.buffering && (
					uibuffer &&
					hide2(uibuffer),
					vast
					.buffering = !1,
					clearInterval(
						push_wait_int
						))
			}

			function onWaiting() {
				uibuffer && show2(
						uibuffer), vast
					.buffering = !0,
					1 == v
					.vast_push_waiting &&
					(clearInterval(
							push_wait_int
							),
						push_wait_int =
						setInterval(
							PushWaiting,
							1500))
			}

			function PushWaiting() {
				UpdateSkipTimes(
					last_skiptime +=
					1)
			}

			function vpaidStartAd() {
				vpaidstarted = !0, 1 !=
					v
					.vpaidvideotimeout &&
					(vpaidvideostarted = !
						0), duration =
					vpaid
					.getAdDuration();
				var e, t = vpaid
					.getAdRemainingTime();
				duration > 0 || exist(
						vast.duration
						) && vast
					.duration >= t && (
						duration = vast
						.duration),
					duration >= 5e3 && (
						duration /= 1e3
						), js3(
						"vast_duration",
						duration), o
					.vast_poster &&
					hide2(o
					.vast_poster),
					js_events = [],
					imps = [],
				qrts = [], log(
						"VPAID Started"
						), indOf([vast
						.wrapper,
						vast.vasturl
					], "pjsvvs=1") && (
						e = !0), 1 != v
					.vast_visibleonstart ||
					vast.skipimp || e ||
					o.actions
					.VpaidStarted(),
					Event(
						"creativeView",
						!0),
					StopBuffering()
			}

			function vpaidVideoTimeout() {
				vpaidvideostarted ||
					die_error || (log(
							"VPAID timeout"
							), js3(
							"vpaid_video_timeout",
							VastInfo()),
						onError(901))
			}

			function vpaidQuartileTimeout() {
				vpaidquartile ||
					die_error || 0 == v
					.vpaid_mute_impression &&
					paused || (log(
							"VPAID quartile timeout"
							), js3(
							"vpaid_quartile_timeout",
							VastInfo()),
						onError(901))
			}

			function vpaidStoppedTimeout() {
				vpaidstopped ||
					die_error || 0 == v
					.vpaid_mute_impression &&
					paused || (log(
							"VPAID stopped timeout"
							), js3(
							"vpaid_stopped_timeout",
							VastInfo()),
						removed || (
							impression ?
							vpaidStopAd() :
							onError(901)
							))
			}

			function tagTimeout() {
				tag && !die_error &&
					0 == tag
					.currentTime && 0 ==
					duration && (log(
							"VAST video loading timeout"
							), js3(
							"vast_video_timeout",
							VastInfo()),
						onError(402))
			}

			function vpaidLoadTimeout() {
				vpaidvideostarted ||
					die_error || 1 == v
					.vpaid_waitstart ||
					(log(
							"VPAID loading timeout"),
						js3("vpaid_loading_timeout",
							VastInfo()),
						onError(901))
			}

			function vpaidStopAd() {
				removed ||
					vpaidstopped || (
						log(
							"VPAID Stopped"),
						vpaidstopped = !
						0, removed ||
						impression ?
						vpaidcompleted ||
						vpaidskipped ?
						RemoveAndPlay() :
						remove_t =
						setTimeout(
							RemoveAndPlay,
							200) : (
							vpaidstarted &&
							duration >
							0 &&
							remainigs >
							75 && exist(
								vast.prt
								) &&
							vpaidImpression(),
							log("VPAID No impression --> Error (" +
								remainigs +
								")"),
							onError(901)
							))
			}

			function vpaidSkipAd() {
				log("VPAID Skipped"),
					vpaidskipped = !0,
					onSkip()
			}

			function vpaidAdSizeChange() {
				log("VPAID SizeChanged: " +
						vpaid
						.getAdWidth() +
						" x " + vpaid
						.getAdHeight()),
					vpaid
				.getAdHeight() > 0 &&
					vpaid.getAdWidth() >
					0 && 1 == v
					.changeheight &&
					1 == v
					.changevastheight &&
					o.actions
					.changeAspect(vpaid
						.getAdWidth() /
						vpaid
						.getAdHeight(),
						!0)
			}

			function vpaidAdExpandedChange() {
				log("VPAID ExpandedChange: " +
					vpaid
					.getAdExpanded()
					)
			}

			function vpaidAdSkippableStateChange() {
				controls && (log(
						"VPAID AdSkippableStateChange: " +
						vpaid
						.getAdSkippableState()
						), vpaid
					.getAdSkippableState() ?
					ShowSkip() :
					hide2(uiskip))
			}

			function vpaidAdDurationChange() {
				log("VPAID DurationChanged: " +
						vpaid
						.getAdDuration()
						), vpaid
					.getAdDuration() >
					0 && js3(
						"vast_duration",
						duration = vpaid
						.getAdDuration()
						)
			}

			function vpaidAdRemainingTimeChange(
				e) {
				var t = vpaid
					.getAdDuration();
				e && clearInterval(
					vpaid_int2);
				var o = vpaid
					.getAdRemainingTime();
				t > 0 && t !=
					duration &&
					vpaidAdDurationChange(),
					remainigs++, (0 ==
						duration || o >
						duration) && o >
					0 && js3(
						"vast_duration",
						duration = o),
					o > 0 ? duration >
					0 &&
					onTimeupdateExtensions(
						duration - o) :
					1 == v
					.vpaid_noremainingtime &&
					(log("VPAID time",
							remainigs -
							1, o,
							duration),
						onTimeupdateExtensions(
							remainigs -
							1))
			}

			function vpaidAdVolumeChange() {
				void 0 != vpaid
					.getAdVolume() && (
						0 == vpaid
						.getAdVolume() ?
						(Event("mute"),
							vpaidvolume2 =
							0, MuteIcon(
								!0)) : (
							0 ==
							vpaidvolume2 &&
							(Event(
									"unmute"),
								MuteIcon(
									!1)
								),
							vpaidvolume2 =
							vpaid
							.getAdVolume()
							)), log(
						"VPAID VolumeChanged: " +
						vpaid
						.getAdVolume()),
					vpaidvolume2 > 0 &&
					1 == v
					.vpaid_mute_impression &&
					!impression &&
					onMute()
			}

			function vpaidAdImpression() {
				1 != vast
					.vpaidImOnVdSrt &&
					vpaidImpression()
			}

			function vpaidImpression() {
				vpaidcompleted = !1,
					log("VPAID Impression",
						duration),
					Event("Impression"),
					Event("Impress"),
					ImpressionActions(),
					gaTracker(
						"vast_impression",
						"VAST Impression"
						), v
					.vpaid_timeout2 > -
					1 && (clearTimeout(
							vpaid_t),
						vpaid_t =
						setTimeout(
							vpaidVideoTimeout,
							1e3 * v
							.vpaid_timeout2
							)), 1 == v
					.vpaid_mute_impression &&
					onMute()
			}

			function vpaidAdClickThru(e,
				t, o) {
				log("VPAID ClickThru"),
					exist(e) &&
					"string" ==
					typeof e && e
					.indexOf("//") > -
					1 && !0 == o && (
						vast.click = e),
					exist(vast
						.extensions
						.isClickable) ?
					1 == vast.extensions
					.isClickable ?
					onClick(!0) : (
						Event("click"),
						Event(
							"addClick")
						) : onClick(!0)
			}

			function vpaidAdInteraction() {}

			function vpaidAdVideoStart() {
				1 == vast
					.vpaidImOnVdSrt &&
					vpaidImpression(),
					log(
						"VPAID AdVideoStart"),
					o.actions
					.VpaidStarted(),
					vpaidvideostarted = !
					0, clearTimeout(
						vpaid_t), v
					.vpaid_timeout3 > -
					1 && (vpaid_t =
						setTimeout(
							vpaidQuartileTimeout,
							1e3 * v
							.vpaid_timeout3
							)),
					clearTimeout(
						vpaid_stop_t), v
					.vpaid_timeout4 > -
					1 && (vpaid_stop_t =
						setTimeout(
							vpaidStoppedTimeout,
							1e3 * v
							.vpaid_timeout4
							)), 1 == v
					.vpaid_mute_impression &&
					onMute(), Event(
						"start", !1), o
					.vpaid_starts++, v
					.vpaid_startlimit >
					0 && o
					.vpaid_starts > v
					.vpaid_startlimit &&
					(log(
							"VPAID start limit"),
						onError())
			}

			function vpaidAdVideoFirstQuartile() {
				vpaidquartile = !0, log(
					"VPAID firstQuartile"
					), Event(
					"firstQuartile",
					!1)
			}

			function vpaidAdVideoMidpoint() {
				log("VPAID midpoint"),
					Event("midpoint", !
						1)
			}

			function vpaidAdVideoThirdQuartile() {
				log("VPAID thirdQuartile"),
					Event(
						"thirdQuartile",
						!1)
			}

			function vpaidAdVideoComplete() {
				if (!vpaidcompleted) {
					for (var e in Event(
								"complete",
								!1),
							vpaidcompleted = !
							0, vast
							.events)
						vast.events
						.hasOwnProperty(
							e) && 0 == e
						.indexOf(
						"old_") && (vast
							.events[e
								.substr(
									4)
								] = vast
							.events[e]);
					if (exist(vast
							.events.sec
							))
						for (var t =
							0; t < vast
							.events.sec
							.length; t++
							) vast
							.events.sec[
								t] +=
							1e3;
					v.vpaid_timeout5 > -
						1 && (
							clearTimeout(
								vpaid_complete_t
								),
							vpaid_complete_t =
							setTimeout(
								vpaidStoppedTimeout,
								1e3 * v
								.vpaid_timeout5
								))
				}
				log("VPAID complete")
			}

			function vpaidAdLinearChange() {
				log("VPAID linear has changed: " +
					vpaid
					.getAdLinear())
			}

			function vpaidAdUserAcceptInvitation() {
				Event("acceptInvitation",
					!1)
			}

			function vpaidAdUserMinimize() {}

			function vpaidAdUserClose() {
				var e = new Date;
				o.clicktime = e
					.getTime(), Event(
						"close", !0), o
					.vastclick = !0,
					gaTracker(
						"vast_skip",
						"VAST Skip")
			}

			function vpaidAdPaused() {
				vast.isVpaid &&
					vpaidcompleted || (
						Event("pause"),
						1 == v
						.vpaid_nopause ?
						vpaid
					.resumeAd() : (
							controls &&
							1 == v
							.vast_pauseonclick &&
							show2(
								uiplay),
							paused = !0)
						)
			}

			function vpaidAdPlaying() {
				Event("resume"),
					controls && exist(
						uiplay) &&
					hide2(uiplay),
					paused = !1
			}

			function StoreImpression(
			e) {
				if (v["vast_" + e +
						"timebreak"] >
					0 && o.storage) {
					var t = 1 *
						getCookie(
							"pljs" + e +
							"i_" + o.d),
						n = !1;
					if (t ? t + 1 >= v[
							"vast_" +
							e + "tbimp"
							] && (n = !
							0) : t = 0,
						n || o
						.vast_impressions_all +
						1 >= v["vast_" +
							e + "tbimp"]
						) {
						var s =
						new Date;
						setCookie(
								"pljs" +
								e +
								"_" + o
								.d, s
								.getTime()
								),
							setCookie(
								"pljs" +
								e +
								"i_" + o
								.d, 0),
							o.actions
							.EmptyVastUrl()
					} else setCookie(
						"pljs" + e +
						"i_" + o.d,
						t + 1)
				}
			}

			function Event(e, t, n, s) {
				if ("start" == e && (o
						.vast_started = !
						0, 1 == v
						.miniwithvast &&
						o.minify && o
						.minify.Check()
						), exist(vast
						.prt) && 0 == v
					.eventstrackervast &&
					1 != v.vpaid || (t ?
						(exist(js_events[
								e]) ||
							js3("vast_" +
								e,
								VastInfo()
								),
							js_events[
							e] = !0) :
						n > 0 ? js3(
							"vast_" + e,
							n) : js3(
							"vast_" + e,
							VastInfo())
						), exist(vast
						.events) &&
					exist(vast.events[
						e])) {
					log("VAST Event " +
						e);
					for (var a = 0; a <
						vast.events[e]
						.length; a++) {
						var r = vast
							.events[e][
								a],
							l = !1;
						if (exist(r)) {
							if (imps
								.indexOf(
									r) >
								-1 && (
									l = !
									0),
								"Impression" ==
								e &&
								imps
								.push(
								r), n >
								0 && (r
									.indexOf(
										"[ERRORCODE]"
										) >
									0 ?
									r =
									r
									.replace(
										"[ERRORCODE]",
										n
										) :
									1 ==
									s &&
									(l = !
										0
										)
									), r
								.indexOf(
									"(visibility)"
									) >
								0 &&
								exist(o
									.visibility
									) &&
								(r = r
									.replace(
										"(visibility)",
										o
										.visibility
										)
									), r
								.indexOf(
									"(volume)"
									) >
								0 && (
									r =
									r
									.replace(
										"(volume)",
										CurrentVolume()
										)
									), (
									r =
									(r = r
										.replace(
											"(adblock)",
											o
											.ab ?
											1 :
											0
											)
										)
									.replace(
										/\(random\)/g,
										Math
										.random()
										)
									)
								.indexOf(
									".pjstat"
									) >
								0 && (
									r =
									r +
									"&m=" +
									(o.system
										.tv ?
										2 :
										o
										.system
										.mobile ?
										1 :
										0
										) +
									"&h=" +
									(exist(v
											.parent_domain) ?
										v
										.parent_domain :
										o
										.domain
										) +
									("overlay" ==
										o
										.vasttype ||
										vast
										.isFrm ?
										"&r=1" :
										""
										) +
									"&s=" +
									o
									.sessid
									),
								"object" ==
								typeof v
								.vast_replace
								) {
								for (var d in
										v
										.vast_replace)
									if (v
										.vast_replace
										.hasOwnProperty(
											d
											)
										)
										for (
											var c =
												0; c <
											5; c++
											)
											r =
											r
											.replace(
												d,
												v
												.vast_replace[
													d
													]
												)
							}
						} else l = !0;
						l || gif(r)
					}
					t && (vast.events[
							"old_" +
							e] =
						vast.events[
							e], vast
						.events[e] =
						void 0)
				}
				"click" == e && 1 == v
					.vast_addclick &&
					Event("addClick")
			}

			function js2(e) {
				"intro" != vast
					.adsystem &&
					"outro" != vast
					.adsystem && js(e)
			}

			function js3(e, t) {
				exist(vast.prt) && 0 ==
					v
					.eventstrackervast &&
					1 != v.vpaid ||
					"intro" == vast
					.adsystem ||
					"outro" == vast
					.adsystem || js(e,
						t)
			}

			function RemoveInterface() {
				if (RemoveControl(
						"uiplay"),
					tag && tag.played
					.length > 0 && tag
					.pause(),
					controls && o
					.vastcontainer
					.contains(uix)) {
					1 == v.vast_title &&
						RemoveControl(
							"uit");
					for (var e = [
							"uiprogress",
							"uiskip",
							"uix",
							"uitxt",
							"uitxt",
							"uimute",
							"uiposter",
							"uiunmutebut"
						], t = 0; t < e
						.length; t++)
						RemoveControl(e[
							t])
				}
			}

			function RemoveControl(x) {
				exist(eval(x)) && o
					.vastcontainer
					.contains(eval(
					x)) && ("uitxt" ==
						x && uitxt
						.removeEventListener(
							"click",
							onInvite), o
						.vastcontainer
						.removeChild(
							eval(x)),
						eval(x +
							" = null;"))
			}

			function VpaidSetStartAd() {
				vast.isVpaid ? !
					vpaidstarted &&
					vpaid && vpaid
					.startAd() :
					vaststarted ||
					PlayStart()
			}
			this.config = function(e) {
					return !!vast &&
						vast[e]
				}, this.tagLive =
				function() {
					var e = !1;
					if (tag && tag
						.parentElement)
						try {
							"hdvbplayer" ==
							tag.parentElement
								.nodeName &&
								(e = !0)
						} catch (t) {
							e = !1
						}
					return (!vast || !
						vast.isVpaid
						) && e
				}, this.info = function(
					e) {
					return !!vast &&
						vast[e]
				}, this.active =
				function() {
					return !removed
				}, this.Resize =
				function() {
					vast && vast
						.isVpaid &&
						vpaid && vpaid
						.resizeAd(o
							.screen_w, o
							.screen_h, o
							.fullscreen ?
							"fullscreen" :
							"normal")
				}, this.getVolume =
				function() {
					return CurrentVolume()
				}, this.pause =
				function() {
					return !removed && !
						paused && !!
						vast && (Pause(!
							0), !0)
				}, this.resume =
				function() {
					return !removed && !
						!paused && !!
						vast && (
							Resume(), !
							0)
				}, this.VpaidSet =
				function(e, t) {
					vast && (
						"setAdVolume" ==
						e && (0 ==
							t ?
							onMute() :
							onUnmute()
							),
						"stopAd" ==
						e &&
						RemoveAndPlay(),
						"startAd" ==
						e &&
						VpaidSetStartAd(),
						"skipAd" ==
						e &&
						onSkip(),
						"pauseAd" ==
						e &&
						onPause(),
						"resumeAd" ==
						e &&
						onPlay())
				}, this.startAd =
				function() {
					1 != v
						.vpaid_waitstart ||
						vpaidstarted ||
						(vast.isVpaid &&
							vpaid &&
							StartVpaidVolume(),
							VpaidSetStartAd()
							)
				}, this.mute =
				function() {
					onMute()
				}, this.imp = function(
					e) {
					if (impression && !
						removed)
						for (var t = e
								.split(
									","
									),
								o =
								0; o < t
							.length; o++
							) gif(t[o])
				}, this
				.RemoveForNextAd =
				function() {
					if ((youtube ||
							vimeo) && (
							clearInterval(
								ytinterval
								), ytag
							.Remove()),
						vast) {
						if (RemoveInterface(),
							vast.isVpaid
							) {
							if (exist(
									vpaidslot
									)) {
								if (!
									vpaidstopped &&
									vpaid &&
									vpaidstarted
									)
									try {
										vpaid
											.stopAd()
									} catch (
										e
										) {
										log(e)
									}
								if (
									vpaid)
									for (
										var t in
											vpaidCallbacks
										)
										vpaidCallbacks
										.hasOwnProperty(
											t
											) &&
										vpaid
										.unsubscribe(
											vpaidCallbacks[
												t
												],
											t
											);
								o.vastcontainer
									.contains(
										vpaidslot
										) &&
									1 !=
									vast
									.hidevpaid &&
									o
									.vastcontainer
									.removeChild(
										vpaidslot
										)
							}
							if (clearInterval(
									vpaid_int
									),
								clearInterval(
									vpaid_int2
									),
								clearInterval(
									vpaidframe_int
									),
								clearInterval(
									push_wait_int
									),
								RemoveTimeouts(),
								1 !=
								vast
								.hidevpaid &&
								vpaidframe
								) try {
									o.vastcontainer
										.removeChild(
											vpaidframe
											)
								} catch (
									n
									) {}
						} else hide(
						tag);
						onWaiting()
					}
					exist(vpaidslot) &&
						(clearInterval(
								img_int
								), o
							.vastcontainer
							.contains(
								vpaidslot
								) &&
							1 != vast
							.hidevpaid &&
							o
							.vastcontainer
							.removeChild(
								vpaidslot
								)),
						vast && (vast
							.events = []
							),
						removed = !0,
						impression = !1,
						remainigs = 0,
						mp3 = !1,
						imps = [],
						qrts = []
				}, this.waitGo =
				function(e) {
					vast = e
				}, this.Remove =
				function() {
					try {
						o.vastcontainer
							.contains(
								tag) &&
							o
							.vastcontainer
							.removeChild(
								tag)
					} catch (e) {}
					this.RemoveForNextAd(),
						removed = !0;
					try {
						o.frame
							.contains(o
								.vastcontainer
								) &&
							1 != vast
							.hidevpaid &&
							o.frame
							.removeChild(
								o
								.vastcontainer
								), 1 ==
							vast
							.hidevpaid &&
							hide2(o
								.vastcontainer
								)
					} catch (t) {}
				}
		},
		Settings = function(is) {
			var i, open_action,
				playlist, showinterval,
				arrinterval,
				wheelinterval,
				hidetimeout, settimer,
				downi, downin,
				style = [],
				f = [],
				fbg = [],
				fimg = [],
				ftitle = [],
				fvalue = [],
				faction = [],
				f2 = [],
				f2bg = [],
				f2img = [],
				f2title = [],
				f2value = [],
				f2action = [],
				stout = [],
				is_visible = !1,
				open_settings = -1,
				empty = !0,
				key = is,
				shuffle = [],
				shuffle_ = [],
				plid = "",
				plfolder = "",
				plx = -1,
				sub_settings_on = !1,
				sub_settings = !1,
				autonextopenfolder = !1,
				autoprevopenfolder = !1,
				justshow = !1,
				removed = !1,
				shr = [],
				clr = [],
				iclr = 0,
				_cstm = 0,
				evntclk = "click",
				evntovr = o.system
				.mobile ? "touchstart" :
				"mouseover",
				evntout = o.system
				.mobile ? "touchend" :
				"mouseout";
			style = UpdateObject(style,
					v[is]), 0 == (
					style =
					MarginPadding(v[is],
						"margin",
						"margin"))
				.marginbg && (style
					.marginbgpadding =
					"0 0 0 0"), style =
				MarginPadding(v[is],
					"bgpadding",
					"marginbgpadding"),
				(style = MarginPadding(
					v[is],
					"padding",
					"padding"))
				.scrollwidth = 0;
			var _activeIcon =
				"<svg style='margin-top:3px' width='" +
				2 * style
				.activeiconsize +
				"' height='" + (2 *
					style
					.activeiconsize >
					style
					.valuefontsize ? 2 *
					style
					.activeiconsize :
					style.valuefontsize
					) +
				"' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><ellipse ry='" +
				style.activeiconsize +
				"' rx='" + style
				.activeiconsize +
				"' cy='" + (2 * style
					.activeiconsize >
					style
					.valuefontsize ?
					style
					.activeiconsize :
					style
					.valuefontsize / 2
					) + "' cx='" + style
				.activeiconsize +
				"' fill='#" + style
				.valuecolor +
				"'/></g></svg>",
				_xIcon =
				"<svg width='" + 2 *
				style.activeiconsize +
				"' height='" + style
				.valuefontsize +
				"' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' ><g><ellipse ry='" +
				(style.activeiconsize -
					1) + "' rx='" + (
					style
					.activeiconsize - 1
					) + "' cy='" + (
					style
					.valuefontsize / 2 +
					2) + "' cx='" +
				style.activeiconsize +
				"' stroke='#" + style
				.valuecolor +
				"' stroke='1' fill-opacity='0'/></g></svg>",
				xx = 4,
				_nextIcon =
				"<hdvbplayer style='display:inline-block;'><svg width='" +
				(xx + 2) +
				"' height='" + style
				.valuefontsize +
				"' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><line x1='1' y1='" +
				(style.valuefontsize /
					2 - xx) + "' x2='" +
				xx + "' y2='" + style
				.valuefontsize / 2 +
				"' stroke='#" + style
				.color +
				"' stroke-width='1' stroke-linecap='round'/><line x1='" +
				xx + "' y1='" + style
				.valuefontsize / 2 +
				"' x2='1' y2='" + (style
					.valuefontsize / 2 +
					xx) +
				"' stroke='#" + style
				.color +
				"' stroke-width='1' stroke-linecap='round'/></g></svg></hdvbplayer>",
				_prevIcon =
				"<hdvbplayer style='display:inline-block;'><svg width='" +
				(xx + 10) +
				"' height='" + (style
					.valuefontsize + 1
					) +
				"' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' style='float:left'><g><line x1='1' y1='" +
				(style.valuefontsize /
					2 + 2) + "' x2='" +
				xx + "' y2='" + (style
					.valuefontsize / 2 -
					xx + 2) +
				"' stroke='#" + style
				.color +
				"' stroke-width='1' stroke-linecap='round' /><line x1='1' y1='" +
				(style.valuefontsize /
					2 + 2) + "' x2='" +
				xx + "' y2='" + (style
					.valuefontsize / 2 +
					xx + 2) +
				"' stroke='#" + style
				.color +
				"' stroke-width='1' stroke-linecap='round'/></g></svg></hdvbplayer>",
				bordercolor = "rgba(" +
				(style.bordercolor ?
					hexToRgb(style
						.bordercolor
						.replace("#",
							"")) : "") +
				"," + existv(style.brda,
					1) + ")",
				container =
				createElement("div");
			o.frame.appendChild(
				container), css(
				container, {
					overflow: "hidden",
					display: "block",
					opacity: 0,
					"border-radius": style
						.rounding
				});
			var mpi = {};
			for (var i in o.menuproc) o
				.menuproc
				.hasOwnProperty(i) && (
					mpi[o.menuproc[
					i]] = -1);
			"settings" == is ? container
				.style.zIndex = 100 :
				container.style.zIndex =
				99;
			var control = createElement(
				"div");
			if (o.small && (style
					.smallfontsize >
					0 && (style
						.fontsize =
						style
						.smallfontsize),
					style
					.floatwidthsmall >
					0 && (style
						.floatwidth =
						style
						.floatwidthsmall
						), style
					.floatheightsmall >
					0 && (style
						.floatheight =
						style
						.floatheightsmall
						)), css(
				control, {
					position: "relative",
					top: 0,
					left: 0,
					display: "block",
					width: "100%",
					"padding-top": style
						.bgpaddingtop,
					"padding-right": style
						.bgpaddingright +
						20,
					"padding-bottom": style
						.bgpaddingbottom,
					"padding-left": style
						.bgpaddingleft,
					color: style
						.color,
					"font-size": style
						.fontsize *
						existv(v
							.globalfs,
							1),
					"font-family": checkFont(
						style
						.font),
					"letter-spacing": style
						.letterspacing +
						"px"
				}), o.system.safari &&
				css(control, {
					"min-width": 220
				}), "playlist" !== is &&
				css(control, {
					"overflow-y": "scroll"
				}), container
				.appendChild(control),
				1 != style.floatleft) {
				var control2 =
					createElement(
					"div");
				css(control2, {
						display: "block",
						overflow: "hidden",
						"border-radius": style
							.rounding
					}), 1 != style
					.floatleft && o
					.system.safari &&
					css(control2, {
						"min-width": 220
					}), control
					.appendChild(
						control2)
			}
			if (attr(control, {
					id: v.id + "_" +
						is
				}), "playlist" == is &&
				(1 == style.floatleft ?
					(css(control, {
						width: "100%",
						"padding-right": style
							.bgpaddingright,
						"padding-bottom": style
							.bgpaddingbottom +
							20,
						"overflow-x": "scroll",
						"white-space": "nowrap"
					}), css(
						container, {
							width: o
								.screen_w -
								style
								.marginright -
								style
								.marginleft,
							height: style
								.floatheight +
								style
								.bgpaddingtop +
								style
								.bgpaddingbottom
						})) : (css(
							control, {
								"overflow-y": "scroll"
							}), 1 ==
						style
						.width100 &&
						ResizePlaylist()
						), 1 == style
					.marginbg && css(
						container, {
							"background-color": style
								.marginbgcolor
						}), 1 == v
					.playlist
					.droplist && hide2(
						container)),
				1 == style.scrollarrows
				) {
				var arr_up =
					createElement(
					"div"),
					scrollbgcolor =
					hexToRgb(1 == style
						.marginbg ?
						style
						.marginbgcolor :
						style.bgcolor);
				1 == style.floatleft ? (
						StyleArrow(
							arr_up,
							"to right, rgba(" +
							scrollbgcolor +
							"," + (1 *
								style
								.bga +
								.3) +
							"), rgba(" +
							scrollbgcolor +
							",0)",
							"left", 12,
							5, 7, 10, 7,
							10, 12, 15),
						arr_up
						.addEventListener(
							evntclk,
							ScrollLeft)
						) : (StyleArrow(
							arr_up,
							"to bottom, rgba(" +
							scrollbgcolor +
							"," + (1 *
								style
								.bga +
								.3) +
							"), rgba(" +
							scrollbgcolor +
							",0)",
							"top", 5,
							12, 10, 7,
							10, 7, 15,
							12), arr_up
						.addEventListener(
							evntclk,
							ScrollUp));
				var arr_down =
					createElement(
					"div");
				1 == style.floatleft ? (
						StyleArrow(
							arr_down,
							"to left, rgba(" +
							scrollbgcolor +
							"," + (1 *
								style
								.bga +
								.3) +
							"), rgba(" +
							scrollbgcolor +
							",0)",
							"right", 8,
							5, 13, 10,
							13, 10, 8,
							15),
						arr_down
						.addEventListener(
							evntclk,
							ScrollRight)
						) : (StyleArrow(
							arr_down,
							"to bottom, rgba(" +
							scrollbgcolor +
							",0), rgba(" +
							scrollbgcolor +
							"," + (1 *
								style
								.bga +
								.3) +
							")",
							"bottom", 5,
							8, 10, 13,
							10, 13, 15,
							8), arr_down
						.addEventListener(
							evntclk,
							ScrollDown)
						), arr_up
					.addEventListener(
						"mouseover",
						ScrollOverOut),
					arr_up
					.addEventListener(
						"mouseout",
						ScrollOverOut),
					arr_down
					.addEventListener(
						"mouseover",
						ScrollOverOut),
					arr_down
					.addEventListener(
						"mouseout",
						ScrollOverOut),
					control
					.addEventListener(
						"wheel", Wheel),
					arr_up
					.addEventListener(
						"mouseup",
						onMouseUp),
					arr_down
					.addEventListener(
						"mouseup",
						onMouseUp),
					container
					.appendChild(
					arr_up), container
					.appendChild(
						arr_down),
					clearInterval(
						arrinterval),
					arrinterval =
					setInterval(
						ArrowsInterval,
						1e3)
			}
			if (control
				.addEventListener(
					evntovr, ControlOver
					), control
				.addEventListener(
					evntout, ControlOut
					), "settings" == is)
				for (var i = 1; i <
					11; i++) exist(v[
						"control_" +
						is][is + i]) &&
					(v.settings[is +
						i] = v[
							"control_" +
							is][is + i],
						exist(v["control_" +
							is][is +
							i +
							"title"
						]) && (v
							.settings[
								is + i +
								"title"
								] = v[
								"control_" +
								is][is +
								i +
								"title"
							]), exist(v[
							"control_" +
							is][is +
							i +
							"action"
						]) && (v
							.settings[
								is + i +
								"action"
								] = v[
								"control_" +
								is][is +
								i +
								"action"
							])), exist(v
						.settings[is +
							i]) && 1 ==
					v.settings[is +
					i] && (CreateItem(
							"f", i),
						StyleItem(f[i],
							fbg[i],
							ftitle[i],
							fvalue[i]),
						exist(v
							.settings[
								is + i +
								"action"
								]) || (v
							.settings[
								is + i +
								"action"
								] =
							"speed"),
						ftitle[i]
						.innerHTML =
						Lang(v.settings[
							is + i +
							"action"
							]), exist(v
							.settings[
								is + i +
								"title"]
							) && "" != v
						.settings[is +
							i + "title"
							] && (
							ftitle[i]
							.innerHTML =
							v.settings[
								is + i +
								"title"]
							),
						"share" == v
						.settings[is +
							i + "action"
							] && (o
							.shareme = !
							0), faction[
							i] = v
						.settings[is +
							i + "action"
							], Value(i),
						faction[i] in o
						.menuproc && (
							mpi[faction[
								i]] = i
							), f[i]
						.addEventListener(
							evntovr,
							onOver), f[
							i]
						.addEventListener(
							evntout,
							onOut), f[i]
						.addEventListener(
							evntclk,
							onClick), f[
							i]
						.addEventListener(
							"mouseup",
							onMouseUp),
						1 == v.settings[
							is + i +
							"hide"] &&
						css(f[i], {
							height: 0
						}));

			function Wheel(e) {
				"playlist" == is && 1 ==
					style.floatleft &&
					e && 0 == e
					.deltaX && 0 != e
					.deltaY && (control
						.scrollLeft -= e
						.deltaY, e
						.preventDefault()
						),
					clearInterval(
						wheelinterval),
					wheelinterval =
					setInterval(
						ControlOut, 3e3
						), Retimer()
			}

			function ControlOver() {
				o.mouseDown = !0
			}

			function ControlOut() {
				1 == style
					.showovercontrol &&
					(clearTimeout(o
							.settingsovertimer
							), o
						.settingsovertimer =
						setTimeout(
							function() {
								o.mouseDown ||
									HideControl()
							}, v
							.settings
							.showoverto >
							0 ? 1e3 * v
							.settings
							.showoverto :
							o.system
							.tv ? 2e3 :
							1e3)), o
					.mouseDown = !1
			}

			function onOver(event) {
				o.fullscreen && o
					.volumewheel && o
					.actions
					.volumewheel(!1);
				var x, i = event.target
					.getAttribute(
					"fid");
				if (i ? x = "f" : event
					.target
					.getAttribute(
						"f2id") && (i =
						event.target
						.getAttribute(
							"f2id"), x =
						"f2"), i) {
					i = parseInt(i);
					var opn = !1;
					if (exist(eval(x)[
							i])) {
						if (style
							.bgaover > -
							1 && css(
								eval(x +
									"bg"
									)[
								i], {
									opacity: style
										.bgaover
								}),
							style
							.aover > -
							1 && (css(
									eval(
										x +
										"title"
										)[
										i
										], {
										opacity: style
											.aover
									}),
								css(eval(
									x +
									"value"
									)[
									i
									], {
									opacity: style
										.aover
								})),
							"playlist" ==
							is && 0 ==
							faction[i]
							.indexOf(
								"playlist"
								)) {
							var id =
								faction[
									i]
								.substr(
									8);
							plid ==
								id ||
								plfolder ==
								id ? (
									css(eval(
										x +
										"title"
										)[
										i
										], {
										color: style
											.valuecolor
									}),
									css(eval(
										x +
										"value"
										)[
										i
										], {
										color: style
											.valuecolor
									}),
									opn = !
									0) :
								css(eval(
									x +
									"title"
									)[
									i
									], {
									color: style
										.color
								})
						}
						1 == style
							.playbgcolored &&
							exist(style
								.playbgcolor
								) &&
							opn || css(
								eval(x +
									"bg"
									)[
								i], {
									backgroundColor: style
										.bgcolorover
								})
					}
				}
			}

			function onOut(event) {
				o.fullscreen && o
					.volumewheel && o
					.actions
					.volumewheel(!0);
				var x, i = event.target
					.getAttribute(
					"fid"),
					opn = !1;
				if (clearInterval(
						downin),
					Retimer(), i ? x =
					"f" : event.target
					.getAttribute(
						"f2id") && (i =
						event.target
						.getAttribute(
							"f2id"), x =
						"f2"), i &&
					exist(eval(x)[i])) {
					if (style.bgaover >
						-1 && css(eval(
							x + "bg"
							)[i], {
							opacity: style
								.bga,
							transition: "opacity 0.1s linear"
						}), style
						.aover > -1 && (
							css(eval(x +
									"title"
									)[
								i], {
									opacity: style
										.a,
									transition: "opacity 0.1s linear"
								}), css(
								eval(x +
									"value"
									)[
								i], {
									opacity: style
										.a,
									transition: "opacity 0.1s linear"
								})),
						"playlist" ==
						is && 0 ==
						faction[i]
						.indexOf(
							"playlist")
						) {
						var id =
							faction[i]
							.substr(8);
						plid == id ||
							plfolder ==
							id ? (css(
									eval(
										x +
										"title"
										)[
										i
										], {
										color: style
											.valuecolor
									}),
								css(eval(
									x +
									"value"
									)[
									i
									], {
									color: style
										.valuecolor
								}),
								opn = !0
								) :
							exist(o
								.plhistory[
									id]
								) ?
							HistoryPlaylist(
								i) :
							css(eval(x +
									"title"
									)[
								i], {
									color: style
										.color
								})
					}
					1 == style
						.playbgcolored &&
						exist(style
							.playbgcolor
							) && opn ||
						css(eval(x +
								"bg")[
							i], {
								backgroundColor: o
									.plhistory[
										id
										] ?
									style
									.historybgcolor :
									style
									.bgcolor
							})
				}
			}

			function onClick(e) {
				if (!justshow) {
					var t = new Date;
					o.clicktime = t
						.getTime();
					var n = e.target
						.getAttribute(
							"fid");
					n && exist(f[n]) &&
						exist(faction[
							n]) &&
						Action(n, 0)
				}
			}

			function onMouseDown(e) {
				if (!justshow) {
					var t = e.target
						.getAttribute(
							"f2id");
					t && exist(f2action[
							t]) &&
						open_action in o
						.menuproc && (
							downi = t,
							downin =
							setInterval(
								DownIn,
								200))
				}
			}

			function DownIn() {
				Action2(downi)
			}

			function onMouseUp(e) {
				clearInterval(downin), e
					.cancelBubble = !0,
					Retimer()
			}

			function onClick2(e) {
				if (clearInterval(
						downin), !
					justshow) {
					var t = new Date;
					o.clicktime = t
						.getTime();
					var n = e.target
						.getAttribute(
							"f2id");
					n && (0 == n ?
						"color" ==
						f2action[
						0] ? (
							Remove2(),
							Action(
								iclr
								)) :
						Home() :
						exist(
							f2action[
								n]
							) &&
						Action2(n))
				}
			}

			function onClickSubtitle(
			e) {
				var t = e.target
					.getAttribute(
						"setupx");
				t && ActionOptions(t)
			}

			function onClickSubtitle2(
			e) {
				Retimer();
				var t = e.target
					.getAttribute(
						"f2id");
				if (exist(f2action[
					t]) && f2i("=", t) >
					0) {
					var o = f2action[t]
						.substr(0, f2i(
							"=", t)),
						n = f2action[t]
						.substr(f2i("=",
							t) + 1),
						s =
						open_action +
						"_reset";
					v[s] || (v[s] = []),
						exist(v[s][
						o]) || (v[s][
							o] = v[o] +
							""),
						StyleSubtitle(o,
							n)
				}
			}

			function StyleSubtitle(e,
			t) {
				v[e] = t, o.storage &&
					1 == v
					.sub_designstore &&
					"sub_shift" != e &&
					setCookie("pljs" +
						e, t), o
					.casting && o
					.chromecast && o
					.chromecast.Sub(), o
					.actions
					.RenewSubtitle(),
					ActionOptions(e)
			}

			function onClickTimer2(e) {
				var t = f2action[e
					.target
					.getAttribute(
						"f2id")];
				if (exist(t) && t
					.indexOf("=") > 0) {
					var n = t.substr(0,
							t.indexOf(
								"=")),
						s = t.substr(t
							.indexOf(
								"=") + 1
							);
					v[n] = s,
						SubtitleTimerMenu(),
						Value(o[open_action +
							"_i"]),
						"offsettimer" ==
						open_action &&
						SettingsTimers(
							"offsetwrite"
							)
				}
			}

			function Value(e) {
				if (exist(faction[e])) {
					var t = !1,
						n = !1,
						s = "";
					if ("settings" ==
						is) {
						if ("quality" ==
							faction[
							e] && (s = o
								.media
								.getQuality()
								),
							"audiotrack" ==
							faction[
							e] && (s = o
								.media
								.getAudioTrack()
								),
							"share" ==
							faction[
							e] && (s =
								" ",
								n = !0),
							"channel" ==
							faction[
							e] && o
							.channels &&
							(s = o
								.files_channel[
									o
									.current_channel
									]),
							("audiotrack" ==
								faction[
									e
									] ||
								"channel" ==
								faction[
									e
									] ||
								"quality" ==
								faction[
									e]
								) && (
								0 == o[
									"files_" +
									faction[
										e
										]
									]
								.length ?
								t = !0 :
								1 == o[
									"files_" +
									faction[
										e
										]
									]
								.length &&
								(1 !=
									style
									.show1value ||
									1 ==
									o["files_" +
										faction[
											e
											]
										]
									[0]
									) ?
								t = !0 :
								n = !0),
							"airplay" ==
							faction[
							e] && (o
								.airplay ?
								n = !0 :
								t = !0),
							"download" ==
							faction[
							e] && (
								"native" ==
								o
								.file_type ||
								v
								.download ?
								n = !0 :
								t = !0),
							"subtitle" ==
							faction[e]
							) {
							if (exist(o
									.subs
									)) {
								n = !0,
									o
									.subtitle_on ||
									1 ==
									v
									.sub_off ?
									o
									.sbt &&
									(s = o
										.files_subtitle[
											o
											.subtitle_on ?
											o
											.current_subtitle :
											o
											.sbt
											.ioff()
											]
										) :
									s =
									"";
								for (var a =
										0,
										r =
										0; r <
									o
									.subs
									.length; r++
									)
									"" !=
									o
									.subs[
										r
										] &&
									a++;
								1 == a &&
									1 ==
									o
									.subload &&
									(a =
										0),
									1 ==
									v
									.sub_upload &&
									1 ==
									v
									.sub_upload0 ||
									0 ==
									a &&
									(t = !
										0,
										n = !
										1
										)
							} else t = !
								0
						}
						if ("speed" ==
							faction[
							e] && (1 ==
								(s = o
									.files_speed[
										o
										.current_speed
										]
									) &&
								1 !=
								style
								.speed1 &&
								(s = Lang(
									"normal"
									)),
								n = !0,
								("vimeo" ==
									o
									.file_type ||
									o
									.media
									.isLive() &&
									1 !=
									style
									.speed4live
									) &&
								(t = !0,
									n = !
									1)),
							faction[
							e] in o
							.menuproc &&
							(s = FltrVal(
									faction[
										e
										]
									),
								n = !0),
							faction[e]
							.indexOf(
								"timer"
								) > 0) {
							for (var l =
									" ",
									d = [
										"hour",
										"minute",
										"second"
									],
									c =
									0; c <
								d
								.length; c++
								) exist(
									v[faction[
											e
											] +
										d[
											c]
										]
									) &&
								" " !=
								v[faction[
										e
										] +
									d[c]
									] &&
								(l += (" " !=
										l ?
										":" :
										""
										) +
									v[faction[
											e
											] +
										d[
											c]
										]
									);
							s = " 0:0" !=
								l && l
								.indexOf(
									":"
									) >
								-1 ? l :
								" ",
								n = !0
						}
					}
					fvalue[e]
						.innerHTML = s +
						("" != s && 1 !=
							style
							.hidearrow ?
							' &nbsp;<svg width="5px" height="7px" viewBox="-1 -1 5 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline stroke="#' +
							style
							.valuecolor +
							'" stroke-width="1" fill="none" points="0 0 3 3 0 6"></polyline></svg>' :
							""), t && (
							hide(f[e]),
							"settings" ==
							is && (
								stout[
								e] &&
								clearTimeout(
									stout[
										e
										]
									), o
								.controls ?
								o
								.controls
								.SettingsN(
									e, !
									1, s
									) :
								stout[
								e] =
								setTimeout(
									function() {
										o.controls
											.SettingsN(
												e,
												!
												1,
												s
												)
									},
									200)
								), css(
								f[e], {
									position: "absolute",
									right: 0,
									top: -
										100
								})),
						n && (1 == style
							.floatleft ?
							css(f[e], {
								display: "inline-block"
							}) : show(f[
								e]),
							"settings" ==
							is && (
								stout[
								e] &&
								clearTimeout(
									stout[
										e
										]
									), o
								.controls ?
								o
								.controls
								.SettingsN(
									e, !
									0, s
									) :
								stout[
								e] =
								setTimeout(
									function() {
										o.controls
											.SettingsN(
												e,
												!
												0,
												s
												)
									},
									500)
								), css(
								f[e], {
									position: "relative",
									right: 0,
									top: 0
								})),
						Resize()
				}
				for (var u = 1; u < f
					.length; u++)
					if (f[u] &&
						isVisible(f[u])
						) {
						var $ = !1;
						empty && ($ = !
								0),
							empty = !1,
							$ && o
							.controls &&
							o.controls
							.refresh()
					}
			}

			function Action(e, t, n) {
				if (n && (faction[e] =
						n), exist(
						faction[e])) {
					o.setaction = !0,
						Retimer();
					var s =
						VisibleItems();
					if (open_action !=
						faction[e]) {
						if ("quality" ==
							(open_action =
								faction[
									e]
								) ||
							"audiotrack" ==
							open_action ||
							"subtitle" ==
							open_action ||
							"speed" ==
							open_action ||
							"channel" ==
							open_action ||
							open_action in
							o
							.menuproc ||
							open_action
							.indexOf(
								"timer"
								) > 0 ||
							"share" ==
							open_action ||
							"color" ==
							open_action
							) {
							open_settings
								= e;
							var a =
								copyObject(
									o["files_" +
										open_action
										]
									);
							if ("sleeptimer" ==
								open_action &&
								(a = 1 ==
									style
									.sleep2 ?
									SettingsTimers(
										"sleep2options"
										) :
									SettingsTimers(
										"sleepoptions"
										)
									),
								"offsettimer" ==
								open_action &&
								(a = SettingsTimers(
									"offsetoptions"
									)),
								"share" ==
								open_action &&
								o.share
								) {
								a = [];
								for (var r =
										1; r <=
									16; r++
									)
									exist(
										v["share" +
											r
											]
										) &&
									(a.push(Lang(
											v["share" +
												r
												]
											)),
										shr[a
											.length
											] =
										v["share" +
											r
											]
										)
							}
							if ("color" ==
								open_action &&
								o
								.tagvideo
								) {
								a = [],
									iclr =
									e;
								for (var r =
										0; r <
									o
									.clr_options
									.length; r++
									) {
									var l =
										o
										.clr_options[
											r
											]
										.substr(
											4
											);
									a.push(Lang(
											l)),
										clr[a
											.length
											] =
										l
								}
							}
							for (var d =
									o["current_" +
										open_action
										],
									c =
									o["pressed_" +
										open_action
										],
									r =
									1; r <
								f
								.length; r++
								) f[
								r] && (
									f[r]
									.style
									.display =
									"none"
									);
							f2 = [],
								CreateItem(
									"f2",
									0),
								StyleItem(
									f2[
										0],
									f2bg[
										0
										],
									f2title[
										0
										],
									f2value[
										0
										]
									),
								css(f2[
									0], {
									"border-bottom": "1px solid " +
										(1 ==
											style
											.bordercolored ?
											bordercolor :
											"rgba(100,100,100,0.7)"
											)
								}),
								_cstm =
								t;
							var u = !1;
							if (f2title[
									0]
								.innerHTML =
								(s[0] <
									2 ||
									1 ==
									_cstm ||
									1 ==
									style
									.noprevicon ?
									"" :
									_prevIcon
									) +
								(v.settings[
										is +
										e +
										"title"
										] &&
									"" !=
									v
									.settings[
										is +
										e +
										"title"
										] ?
									v
									.settings[
										is +
										e +
										"title"
										] :
									Lang(
										v
										.settings[
											is +
											e +
											"action"
											]
										)
									),
								"subtitle" ==
								open_action &&
								!o
								.hls_subs &&
								!o
								.dash_subs
								) {
								var $ =
									createElement(
										"div"
										);
								$.innerHTML =
									Lang(
										"options"
										),
									css($, {
										color: style
											.color,
										pointerEvents: "auto",
										cursor: "pointer"
									}),
									f2value[
										0
										]
									.appendChild(
										$
										),
									$
									.addEventListener(
										evntclk,
										SubtitleSettings
										),
									u = !
									0
							}
							if ("subtitle" ==
								open_action &&
								1 == v
								.sub_upload &&
								!o
								.system
								.tv &&
								exist(
									window
									.FileReader
									)) {
								var p =
									createElement(
										"div"
										);
								o.sbt ||
									(o.sbt =
										new PluginSub
										),
									p
									.innerHTML =
									"<input type='file' id='" +
									v
									.id +
									"_subfile' accept='.vtt,.ass,.srt' style='display:none'/>" +
									Lang(
										"upload"
										),
									css(p, {
										color: style
											.color,
										pointerEvents: "auto",
										cursor: "pointer",
										"margin-left": u ?
											"10px" :
											0
									}),
									f2value[
										0
										]
									.appendChild(
										p
										),
									o
									.subupld =
									document
									.getElementById(
										v
										.id +
										"_subfile"
										),
									o
									.subupld
									.onchange =
									o
									.sbt
									.SubUpload,
									p
									.addEventListener(
										evntclk,
										o
										.sbt
										.SubUpload
										)
							}
							if (u &&
								sub_settings_on
								)
								for (
									2 ==
									_cstm &&
									(a = [],
										hide2(
											f2[
												0]
											)
										),
									r =
									0; r <
									o
									.sub_options
									.length; r++
									)
									0 ==
									v
									.sub_all &&
									"sub_color2" ==
									o
									.sub_options[
										r
										] ||
									a
									.push(
										"pjslng_" +
										o
										.sub_options[
											r
											]
										);
							if (css(f2title[
									0
									], {
									"font-size": style
										.headfontsize *
										existv(
											v
											.globalfs,
											1
											)
								}),
								f2action[
									0] =
								"home",
								open_action in
								o
								.menuproc &&
								(Menuproc(
										open_action
										),
									iclr >
									0 &&
									o
									.clr_options
									.indexOf(
										"clr_" +
										open_action
										) >
									-
									1 &&
									(f2title[
											0
											]
										.innerHTML =
										_prevIcon +
										Lang(
											open_action
											),
										f2action[
											0
											] =
										"color",
										f2value[
											0
											]
										.innerHTML =
										FltrVal(
											open_action
											)
										),
									css(f2value[
										0
										], {
										width: 2.5 *
											style
											.valuefontsize,
										"text-align": "right"
									})),
								1 !=
								_cstm &&
								s[0] >
								1 ? (f2[
										0]
									.addEventListener(
										evntovr,
										onOver
										),
									f2[
										0]
									.addEventListener(
										evntout,
										onOut
										),
									f2[
										0]
									.addEventListener(
										evntclk,
										onClick2
										),
									f2[
										0]
									.addEventListener(
										"mouseup",
										onMouseUp
										)
									) :
								css(f2[
									0], {
									cursor: "default"
								}), 1 ==
								style
								.nohead &&
								hide2(
									f2[
										0]
									),
								exist(a)
								) {
								var _ =
									"";
								for (r =
									0; r <
									a
									.length; r++
									) {
									var h =
										r +
										1,
										g =
										0,
										m = !
										1;
									if (a[
											r] &&
										"" !=
										trim(
											a[
												r]
											)
										) {
										if ("quality" ==
											open_action &&
											(a[r] ==
												Lang(
													"auto"
													) &&
												(g =
													1),
												"hls" ==
												o
												.file_type &&
												1 ==
												v
												.hlsqhsort
												)
											) {
											var b =
												int(a[
													r]);
											b && b <
												_ &&
												(g =
													2),
												_ =
												int(a[
													r])
										}
										if (CreateItem(
												"f2",
												h,
												g
												),
											StyleItem(
												f2[
													h],
												f2bg[
													h
													],
												f2title[
													h
													],
												f2value[
													h
													],
												faction[
													e
													]
												),
											"speed" ==
											open_action &&
											1 ==
											a[
												r] &&
											1 !=
											style
											.speed1 &&
											(a[r] =
												Lang(
													"normal"
													)
												),
											"string" ==
											typeof a[
												r
												]
											) {
											if (0 ==
												a[
													r]
												.indexOf(
													"<<<"
													) &&
												(a[r] =
													a[
														r]
													.replace(
														"<<<",
														""
														),
													m = !
													0
													),
												a[
													r]
												.indexOf(
													"timer"
													) >
												0 &&
												(o[open_action +
														"_i"
														] =
													e
													),
												0 ==
												a[
													r]
												.indexOf(
													"pjslng"
													)
												) {
												var y =
													a[
														r];
												y.indexOf(
														"timer"
														) >
													0 ?
													f2title[
														h
														]
													.innerHTML =
													Lang(
														a[
															r]
														.substr(
															y
															.indexOf(
																"timer"
																) +
															5
															)
														) :
													f2title[
														h
														]
													.innerHTML =
													Lang(
														a[
															r]
														.substr(
															7
															)
														),
													"pjslng_sub_sizeproc" ==
													a[
														r] &&
													css(f2[
														h], {
														"border-top": "1px solid rgba(100,100,100,0.7)"
													})
											} else
												f2title[
													h
													]
												.innerHTML =
												a[
													r]
										} else
											f2title[
												h
												]
											.innerHTML =
											a[
												r];
										if (f2action[
												h
												] =
											open_action +
											r,
											(d ==
												r ||
												c ==
												r
												) &&
											(f2value[
													h
													]
												.innerHTML =
												d ==
												r ?
												_activeIcon :
												_xIcon,
												d ==
												r &&
												css(f2title[
													h
													], {
													color: style
														.valuecolor
												})
												),
											"string" ==
											typeof a[
												r
												]
											) {
											if (0 ==
												a[
													r]
												.indexOf(
													"pjslng"
													)
												) {
												var w =
													a[
														r]
													.substr(
														7
														);
												w.indexOf(
														"color"
														) >
													0 ?
													f2value[
														h
														]
													.innerHTML =
													"<div style='" +
													("000000" ==
														v[
															w] ?
														"border:1px solid #999;height:8px;width:8px;" :
														"height:10px;width:10px;"
														) +
													";background-color:" +
													(-1 ==
														v[
															w]
														.indexOf(
															"#"
															) ?
														"#" :
														""
														) +
													v[
														w] +
													";border-radius:10px;'></div>" :
													exist(
														v[a[r]
															.substr(
																7
																)
															]
														) &&
													(f2value[
															h
															]
														.innerHTML =
														v[a[r]
															.substr(
																7
																)
															]
														)
											}
											if ("share" ==
												open_action &&
												exist(
													shr[
														h]
													) &&
												o
												.share &&
												(f2value[
														h
														]
													.innerHTML =
													o
													.share
													.icon(
														shr[
															h],
														.7,
														CheckColor(
															style
															.valuecolor
															)
														)
													),
												"color" ==
												open_action &&
												exist(
													clr[
														h]
													) &&
												o
												.tagvideo &&
												(f2value[
														h
														]
													.innerHTML =
													FltrVal(
														clr[
															h]
														)
													),
												"quality" ==
												open_action &&
												(a[r] ==
													Lang(
														"auto"
														) &&
													o
													.media
													.autoQuality() &&
													css(f2title[
														h
														], {
														color: style
															.valuecolor
													}),
													exist2(
														v
														.forbidden_quality
														)
													)
												)
												for (
													var k =
														v
														.forbidden_quality
														.split(
															","
															),
														O =
														0; O <
													k
													.length; O++
													)
													a[
														r]
													.indexOf(
														k[
															O]
														) >
													-
													1 &&
													hide2(
														f2[
															h]
														)
										}
										var C =
											"";
										"string" ==
										typeof a
											[
												r] &&
											0 ==
											a[
												r]
											.indexOf(
												"pjslng"
												) &&
											(attr(f2[
													h], {
													f2parent: e,
													setupx: a[
															r
															]
														.substr(
															7
															)
												}),
												C =
												"onClickSubtitle"
												),
											m ?
											css(f2[
												h], {
												cursor: "default"
											}) :
											(f2[h]
												.addEventListener(
													evntovr,
													onOver
													),
												f2[
													h]
												.addEventListener(
													evntout,
													onOut
													),
												"onClickSubtitle" ==
												C ?
												f2[
													h]
												.addEventListener(
													evntclk,
													onClickSubtitle
													) :
												f2[
													h]
												.addEventListener(
													evntclk,
													onClick2
													),
												f2[
													h]
												.addEventListener(
													"mouseup",
													onMouseUp
													),
												f2[
													h]
												.addEventListener(
													"mousedown",
													onMouseDown
													)
												)
									}
								}
							}
							Resize()
						}
						if ("download" ==
							faction[
							e] && o
							.actions
							.Download(),
							faction[e]
							.indexOf(
								"playlist"
								) > -1
							) {
							var L =
								faction[
									e]
								.substr(
									8);
							if (exist(o
									.playlist_dic[
										L
										]
									)) {
								if (v
									.playlist
									.dontplay =
									1, o
									.u
									.playlist
									.dontplay =
									1,
									exist(
										o
										.playlist_dic[
											L
											]
										.file
										)
									) o
									.seekto =
									void 0,
									ActionPlaylist(
										e
										),
									UpdateStart(
										L
										),
									SettingsTimers(
										"offset"
										),
									exist(
										o
										.playlist_dic[
											L
											]
										.redirect
										) &&
									1 ==
									v
									.redirect &&
									1 ==
									v
									.redirectplaylist ?
									redirect(
										o
										.playlist_dic[
											L
											]
										.redirect
										) :
									(UpdateVars0(
											L
											),
										o
										.actions
										.NewFile(
											o
											.playlist_dic[
												L
												]
											.file,
											1 ==
											v
											.playlist
											.dontplay ?
											1 :
											void 0
											),
										0 ==
										v
										.playlist
										.always &&
										1 ==
										v
										.playlist
										.autohide &&
										setTimeout(
											HideControl,
											200
											),
										autonextopenfolder = !
										1,
										autoprevopenfolder = !
										1,
										UpdateVars(
											L
											)
										);
								else if (
									exist(
										o
										.playlist_dic[
											L
											]
										.folder
										)
									) {
									let S =
										o
										.plid
										.split(
											"-"
											);
									S = S[
										7];
									let T = !
										1;
									o.playlist_dic[
											L
											]
										.folder
										.map(
											function(
												e,
												t
												) {
												e.id.indexOf(
														S
														) >
													-
													1 &&
													(T =
														t)
											}
											),
										UpdatePlaylist(
											L
											),
										"prerollt" in
										v &&
										(v.preroll =
											v
											.prerollt
											),
										!
										1 !==
										T ?
										-
										1 ==
										plx &&
										Action(
											T,
											0
											) :
										-
										1 ==
										plx &&
										Action(
											parseInt(
												f
												.length
												) -
											2,
											0
											)
								}
							}
							o.droplist &&
								o
								.droplist
								.Update()
						}
						"airplay" ==
						faction[e] && o
							.media
							.Airplay()
					}
				}
			}

			function ActionOptions(e) {
				if ("sub_reset" == e) {
					var t =
						open_action +
						"_reset";
					if (v[t]) {
						for (var o in v[
								t]) v[t]
							.hasOwnProperty(
								o) &&
							StyleSubtitle(
								o, v[t][
									o
								]);
						SubtitleSettingsMenu
							()
					}
					return
				}
				Retimer();
				for (var n = 0; n < f2
					.length; n++) f2[
					n] && (f2[n].style
						.display =
						"none");
				f2 = [], CreateItem(
						"f2", 0),
					StyleItem(f2[0],
						f2bg[0],
						f2title[0],
						f2value[0]),
					css(f2[0], {
						"border-bottom": "1px solid " +
							(1 ==
								style
								.bordercolored ?
								bordercolor :
								"rgba(100,100,100,0.7)"
								)
					}), e.indexOf(
						"timer") > 0 ? (
						f2[0]
						.addEventListener(
							evntclk,
							SubtitleTimerMenu
							), f2title[
							0]
						.innerHTML =
						Lang(e.substr(e
							.indexOf(
								"timer"
								) +
							5))) : (f2[
							0]
						.addEventListener(
							evntclk,
							SubtitleSettingsMenu
							), f2title[
							0]
						.innerHTML = (
							1 != style
							.noprevicon ?
							_prevIcon :
							"") + Lang(
							e)), css(
						f2title[0], {
							"font-size": style
								.headfontsize *
								existv(v
									.globalfs,
									1)
						}), f2[0]
					.addEventListener(
						evntovr, onOver
						), f2[0]
					.addEventListener(
						evntout, onOut),
					f2[0]
					.addEventListener(
						"mouseup",
						onMouseUp);
				var s = [],
					a = !1;
				if (e.indexOf("size") >
					0 && (s = ["50%",
						"75%",
						"100%",
						"125%",
						"150%",
						"175%",
						"200%",
						"250%",
						"300%",
						"400%"
					]), e.indexOf(
					"bga") > 0 && (s = [
						"0", "0.2",
						"0.3",
						"0.4",
						"0.5",
						"0.6",
						"0.7",
						"0.8",
						"0.9", "1"
					]), e.indexOf(
						"shift") > 0)
					for (n = -5; n <
						5.5; n += .5) s
						.push(Math
							.round(100 *
								n) / 100
							);
				if (e.indexOf(
					"weight") > 0 && (
						s = [200, 400,
							600
						]), e.indexOf(
						"bottom") > 0)
					for (n = 0; n <
						21; n++) s[n] =
						10 * n;
				if (e.indexOf("hour") >
					0)
					for (n = 0; n <
						24; n++) s[n] =
						n;
				if (e.indexOf(
					"minute") > 0 || e
					.indexOf("second") >
					0)
					for (n = 0; n <
						60; n++) s[n] =
						n;
				if (e.indexOf(
					"shadow") > 0 && (
						a = !0, s = [0,
							1
						]), e.indexOf(
						"color") > 0) {
					s = ["ffffff",
						"ffeeab",
						"72ccf8",
						"62de50",
						"faed54",
						"feba54",
						"e8bbff",
						"ffc7d1",
						"aaaaaa",
						"d9bb8c",
						"b3fee8",
						"4bd9ac",
						"FEF370",
						"D90000",
						"073DA0",
						"409829",
						"644082",
						"000000"
					];
					var r = v[e]
						.replace("#",
							""); - 1 ==
						s.indexOf(r) &&
						(s[8] = r)
				}
				for (o = 1; o <= s
					.length; o++)
					CreateItem("f2", o,
						0), StyleItem(
						f2[o], f2bg[o],
						f2title[o],
						f2value[o]),
					css(f2value[o], {
						"padding-left": 0
					}), e.indexOf(
						"color") > 0 ||
					e.indexOf(
					"bottom") > 0 || e
					.indexOf("timer") >
					0 || e.indexOf(
						"shift") > 0 ? (
						o % 3 != 0 &&
						css(f2[o], {
							float: "left"
						}), css(f2[o], {
							width: "33.3%"
						}), e.indexOf(
							"color") >
						0 ? (f2title[o]
							.innerHTML =
							"<div style='" +
							("000000" ==
								s[o -
								1] ?
								"border:1px solid #999;height:18px;width:18px;" :
								"height:20px;width:20px;"
								) +
							";background-color:#" +
							s[o - 1] +
							";border-radius:20px;'></div>",
							css(f2[o], {
								"line-height": 1
							})) :
						f2title[o]
						.innerHTML = s[
							o - 1]) : e
					.indexOf("weight") >
					0 ? f2title[o]
					.innerHTML = s[o -
						1] : (o % 2 !=
						0 && css(f2[
						o], {
							float: "left"
						}), css(f2[o], {
							width: "50%"
						}), a ? f2title[
							o]
						.innerHTML =
						Lang(s[o - 1] +
							"val") :
						f2title[o]
						.innerHTML = s[
							o - 1]),
					f2action[o] = e +
					"=" + s[o - 1], (s[
							o - 1] == v[
							e] && " " !=
						String(v[e]) ||
						v[e] == "#" + s[
							o - 1]) && (
						f2value[o]
						.innerHTML =
						_activeIcon,
						css(f2title[
						o], {
							color: style
								.valuecolor
						})), f2[o]
					.addEventListener(
						evntovr, onOver
						), f2[o]
					.addEventListener(
						evntout, onOut),
					e.indexOf("timer") >
					0 ? f2[o]
					.addEventListener(
						evntclk,
						onClickTimer2) :
					f2[o]
					.addEventListener(
						evntclk,
						onClickSubtitle2
						), f2[o]
					.addEventListener(
						"mouseup",
						onMouseUp);
				Resize()
			}

			function UpdateVars0(e) {
				exist(o.playlist_dic[e]
						.poster) && (v
						.poster = o
						.playlist_dic[e]
						.poster, exist(v
							.poster) &&
						o.media.Poster(v
							.poster)),
					exist(o
						.playlist_dic[e]
						.title) && (o
						.titlestore = o
						.playlist_dic[e]
						.title)
			}

			function UpdateVars(e) {
				exist(o.playlist_dic[e]
						.title) && 1 ==
					v
					.showtitleplaylist &&
					(o.actions
						.TitleTemplate(o
							.playlist_dic[
								e]) || (
							v.title = (
								1 == v
								.addtitleplaylist &&
								exist(o
									.maintitle
									) ?
								o
								.maintitle +
								(1 == v
									.addtitleplaylistbr ?
									"<br>" :
									" "
									) :
								"") + o
							.playlist_dic[
								e].title
							), o.actions
						.Title("title")
						), 1 == v
					.pointed && o
					.controls
					.RenewPoints();
				for (var t = ["remove",
						"thumbnails",
						"download",
						"skip",
						"url",
						"url2",
						"url3",
						"vars",
						"embed",
						"end",
						"delete",
						"heartbeat",
						"label",
						"title2"
					], n = 0; n < t
					.length; n++) exist(
						o.playlist_dic[
							e][t[n]]) ?
					v[t[n]] = o
					.playlist_dic[e][t[
						n]] : n < 4 && (
						v[t[n]] = void 0
						);
				v.start = 0,
					UpdateStart(e),
					exist(o
						.playlist_dic[e]
						.sub) && (o
						.playlist_dic[e]
						.subtitle = o
						.playlist_dic[e]
						.sub), exist(o
						.playlist_dic[e]
						.subtitle) && o
					.actions.Subtitle(o
						.playlist_dic[e]
						.subtitle),
					exist(o
						.playlist_dic[e]
						.design) &&
					apiProcessor(
						"design", o
						.playlist_dic[e]
						.design)
			}

			function UpdateStart(e) {
				var t = o.playlist_dic[
					e].start;
				exist(t) && (
					"continue" ==
					t ? o.media
					.time() > 0 && (
						v.start = o
						.seekto = o
						.media
						.time()) : v
					.start = o
					.seekto = t)
			}

			function ActionPlaylist(e) {
				if (0 != plx || o
					.start ? (o
						.plopenid = e,
						plx > -1 &&
						HistoryPlaylist(
							plx), "" !=
						plid && (o
							.plhistory[
								plid
								] = !0,
							shuffle =
							removebykey(
								shuffle,
								plid))
						) : (css(ftitle[
							plx], {
							color: style
								.color
						}), css(fbg[
							plx], {
								backgroundColor: style
									.bgcolor
							}), fvalue[
							plx]
						.innerHTML = ""
						), faction[e]) {
					var t = faction[e]
						.substr(8);
					fvalue[e]
						.innerHTML =
						_activeIcon,
						css(ftitle[e], {
							color: style
								.valuecolor,
							"text-decoration": "none",
							opacity: style
								.a
						}), 1 == style
						.playbgcolored &&
						exist(style
							.playbgcolor
							) && css(
							fbg[e], {
								backgroundColor: style
									.playbgcolor
							}), plx = e,
						plid = t, o
						.plid = plid, v
						.plstart = plid,
						o
						.playlist_title =
						ftitle[e]
						.innerHTML, o
						.plopenid =
						plid, plfolder =
						o.playlist_dic[
							t]
						.pjs_parent, o
						.controls && o
						.controls
						.PlaylistControls()
				}
			}

			function UpdatePlaylist(e) {
				var t = 0 == e ? o
					.playlist : o
					.playlist_dic[e];
				o.plopenid = e;
				for (var n = 0; n < f
					.length; n++) 1 ==
					style.floatleft ?
					control.removeChild(
						f[n]) : control2
					.removeChild(f[n]),
					f[n] = null;
				if (f = [], plx = -1,
					exist(t.folder)) {
					var s = Object.keys(
							t.folder)
						.length;
					if (CreateItem("f",
							s), faction[
							s] =
						"playlistfolder",
						StyleItem(f[s],
							fbg[s],
							ftitle[s],
							fvalue[s]),
						1 == style
						.floatleft &&
						css(f[s], {
							width: 1 ==
								style
								.floatlimitwidth ?
								style
								.floatwidth :
								"auto",
							height: style
								.floatheight
						}), 1 == style
						.borderbottom) {
						var a =
							"1px solid rgba(" +
							hexToRgb(
								style
								.headbordercolor
								) +
							"," +
							existv(style
								.brda, 1
								) + ")";
						1 == style
							.floatleft ?
							css(f[s], {
								borderRight: a
							}) : css(f[
								s], {
								borderBottom: a
							})
					}
					var r = t.title;
					1 != style
						.noprevicon && (
							r =
							_prevIcon +
							r), ftitle[
							s]
						.innerHTML = r,
						css(ftitle[s], {
							"font-size": style
								.headfontsize *
								existv(
									v
									.globalfs,
									1
									)
						});
					var l = t
					.pjs_parent;
					f[s].addEventListener(
							evntovr,
							onOver), f[
							s]
						.addEventListener(
							evntout,
							onOut), f[s]
						.addEventListener(
							evntclk,
							function() {
								PlaylistBack
									(l)
							}), t = t
						.folder
				}
				var s = Object.keys(t)
					.length;
				shuffle = [],
					shuffle_ = [];
				for (var n = 0; n <
					s; n++) {
					if (CreateItem("f",
							n), faction[
							n] =
						"playlist" + t[
							n].id,
						exist(o
							.plhistory[
								t[n].id]
							) || exist(
							t[n].folder
							) || (
							shuffle[t[n]
								.id] =
							n, shuffle_[
								t[n].id
								] = n),
						StyleItem(f[n],
							fbg[n],
							ftitle[n],
							fvalue[n]),
						1 == style
						.floatleft && (
							0 == style
							.activeiconsize &&
							(css(ftitle[
									n], {
									width: style
										.floatwidth -
										style
										.paddingleft -
										style
										.paddingright
								}),
								hide2(
									fvalue[
										n
										]
									)),
							css(f[n], {
								width: 1 ==
									style
									.floatlimitwidth ?
									style
									.floatwidth :
									"auto",
								height: style
									.floatheight
							})), 1 ==
						style
						.borderbottom &&
						n < s - 1) {
						var d =
							createElement(
								"div");
						f[n].appendChild(
								d), 1 ==
							style
							.floatleft ?
							css(d, {
								position: "absolute",
								top: 0,
								right: 0,
								width: 1,
								height: "100%",
								background: bordercolor,
								pointerEvents: "none"
							}) : css(
							d, {
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								height: 1,
								background: bordercolor,
								pointerEvents: "none"
							})
					}
					ftitle[n]
						.innerHTML = t[
							n].title ?
						t[n].title :
						"&nbsp;", 1 == v
						.timestore &&
						1 == v
						.playedstore &&
						t[n].id && o
						.playedstored &&
						o.playedstored
						.indexOf(t[n]
							.id) > -1 &&
						(t[n].played =
							1), exist(t[
								n]
							.played) &&
						1 == t[n]
						.played && (o
							.plhistory[
								t[n].id
								] = !0,
							HistoryPlaylist(
								n)),
						exist(t[n]
							.folder) &&
						(fvalue[n]
							.innerHTML =
							_nextIcon,
							css(fvalue[
								n], {
								color: style
									.color
							})), f[n]
						.addEventListener(
							evntovr,
							onOver), f[
							n]
						.addEventListener(
							evntout,
							onOut), f[n]
						.addEventListener(
							evntclk,
							onClick), f[
							n]
						.addEventListener(
							"mouseup",
							onMouseUp),
						exist(o
							.plhistory[
								t[n].id]
							) &&
						HistoryPlaylist(
							n), plid ==
						t[n].id &&
						ActionPlaylist(
							n),
						plfolder == t[n]
						.id && (css(
							ftitle[
								n], {
								color: style
									.valuecolor
							}), css(
							fvalue[
								n], {
								color: style
									.valuecolor
							}))
				}
				Resize(), empty = !1, o
					.controls && o
					.controls.refresh()
			}

			function StyleArrow(e, t, n,
				s, a, r, l, d, c, u, $
				) {
				var f;
				css(e, {
						position: "absolute",
						display: "inline-block",
						width: 1 ==
							style
							.floatleft ?
							"40px" :
							"100%",
						height: 1 ==
							style
							.floatleft ?
							"100%" :
							"40px",
						"text-align": "center"
					}), 1 == style
					.scrollarrowgradient &&
					css(e, {
						background: "-moz-linear-gradient(" +
							t + ")",
						background: "-webkit-linear-gradient(" +
							t + ")",
						background: "-ms-linear-gradient(" +
							t + ")",
						background: "-o-linear-gradient(" +
							t + ")",
						background: "linear-gradient(" +
							t + ")"
					}), 1 == style
					.floatleft || o
					.system.mobile ?
					css(e, {
						cursor: "pointer"
					}) : css(e, {
						"pointer-events": "none"
					}), 1 == style
					.limitwidth && css(
						e, {
							"max-width": style
								.limitmaxwidth +
								"px!important"
						}), "top" ==
					n && css(e, {
						top: -1,
						left: 0
					}), "bottom" == n &&
					css(e, {
						bottom: -1,
						left: 0
					}), "left" == n &&
					css(e, {
						top: 0,
						left: 0
					}), "right" == n &&
					css(e, {
						top: 0,
						right: 0
					}), ("right" == n ||
						"left" == n) &&
					css(e, {
						"text-align": "left",
						"padding-top": container
							.offsetHeight /
							2 - 10
					}), e.innerHTML =
					"<center><div " + (
						1 == style
						.scrollarrowbgover ?
						"onMouseOver='this.style.backgroundColor=\"#" +
						style
						.scrollarrowbgovercolor +
						"\"' onMouseOut='" +
						(1 == style
							.scrollarrowbg ?
							'this.style.backgroundColor="#' +
							style
							.scrollarrowbgcolor :
							'this.style.background="none'
							) + "\"'" :
						"") +
					" style='pointer-events:auto;cursor:pointer;width:20px;height:20px;border-radius:20px;" +
					(1 == style
						.scrollarrowbg ?
						"background-color:#" +
						style
						.scrollarrowbgcolor +
						";" : "") + (
						"top" == n ?
						"margin-top:10px;" :
						"") + (
						"bottom" == n ?
						"margin-top:10px;" :
						"") + (
						"right" == n ?
						"margin-left:0px;" :
						"") + ("left" ==
						n ?
						"margin-right:0px;" :
						"") +
					"'><svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'><g><line x1='" +
					s + "' y1='" + a +
					"' x2='" + r +
					"' y2='" + l +
					"' stroke='#" +
					style
					.scrollarrowcolor +
					"' stroke-width='" +
					style
					.scrollarrowsize +
					"' stroke-linecap='round'/><line x1='" +
					d + "' y1='" + c +
					"' x2='" + u +
					"' y2='" + $ +
					"' stroke='#" +
					style
					.scrollarrowcolor +
					"' stroke-width='" +
					style
					.scrollarrowsize +
					"' stroke-linecap='round'/></g></svg></div></center>"
			}

			function ArrowsInterval() {
				is_visible && Arrows()
			}

			function Arrows(e) {
				if (1 == style
					.scrollarrows && !
					removed) {
					if (1 == style
						.floatleft) var
						t = control
						.scrollWidth,
						o =
						container
						.offsetWidth +
						style
						.bgpaddingleft +
						style
						.bgpaddingright,
						n = control
						.scrollLeft;
					else var t = control
						.scrollHeight,
						o =
						container
						.offsetHeight,
						n = control
						.scrollTop;
					t > o ? (n > 0 ?
						isVisible(
							arr_up
							) || (
							show(
								arr_up
								),
							new Motion({
								mc: arr_up,
								type: "alpha_div",
								to: 1,
								time: .3,
								me: "arr_up"
							})) : (
							isVisible(
								arr_up
								) &&
							new Motion({
								mc: arr_up,
								type: "alpha_div",
								to: 0,
								time: .3,
								me: "arr_up",
								hide:
									!
									0
							}), e &&
							e
							.deltaY <
							0 && e
							.preventDefault()
							), n <
						t - o - 10 ?
						isVisible(
							arr_down
							) || (
							show(
								arr_down
								),
							new Motion({
								mc: arr_down,
								type: "alpha_div",
								to: 1,
								time: .3,
								me: "arr_down"
							})) : (
							isVisible(
								arr_down
								) &&
							new Motion({
								mc: arr_down,
								type: "alpha_div",
								to: 0,
								time: .3,
								me: "arr_down",
								hide:
									!
									0
							}), e &&
							e
							.deltaY >
							0 && e
							.preventDefault()
							)) : (
						hide(
						arr_up),
						hide(
							arr_down
							))
				}
			}

			function ScrollDown() {
				var e = control
					.scrollTop +
					container
					.offsetHeight - 60;
				new Motion({
					mc: control,
					type: "scroll",
					to: e,
					time: .3,
					me: "scroll_down",
					ease: "cubic"
				}), setTimeout(
					Arrows, 1e3)
			}

			function ScrollUp() {
				var e = control
					.scrollTop -
					container
					.offsetHeight + 60;
				new Motion({
					mc: control,
					type: "scroll",
					to: e,
					time: .3,
					me: "scroll_up",
					ease: "cubic"
				}), setTimeout(
					Arrows, 1e3)
			}

			function ScrollOverOut(e) {
				clearTimeout(o
						.settingsovertimer
						), e
					.stopPropagation()
			}

			function ScrollRight() {
				var e = control
					.scrollLeft + (
						container
						.offsetWidth +
						style
						.bgpaddingleft +
						style
						.bgpaddingright
						) - 60;
				new Motion({
					mc: control,
					type: "scrollleft",
					to: e,
					time: .3,
					me: "scroll_right",
					ease: "cubic"
				}), setTimeout(
					Arrows, 1e3)
			}

			function ScrollLeft() {
				var e = control
					.scrollLeft - (
						container
						.offsetWidth +
						style
						.bgpaddingleft +
						style
						.bgpaddingright
						) + 60;
				new Motion({
					mc: control,
					type: "scrollleft",
					to: e,
					time: .3,
					me: "scroll_left",
					ease: "cubic"
				}), setTimeout(
					Arrows, 1e3)
			}

			function PlaylistBack(e) {
				"" == e ?
					UpdatePlaylist(0) :
					exist(o
						.playlist_dic[e]
						) &&
					UpdatePlaylist(e),
					open_action = ""
			}

			function HistoryPlaylist(
			e) {
				fvalue[e].innerHTML =
					"", css(ftitle[e], {
						color: style
							.historycolor
					}), 1 == style
					.historytitlestrike &&
					css(ftitle[e], {
						"text-decoration": "line-through"
					}), style
					.historytitlea > -
					1 && css(ftitle[
					e], {
						opacity: style
							.historytitlea
					}), css(fbg[e], {
						backgroundColor: style
							.historybgcolor
					}), style
					.historybga > -1 &&
					css(fbg[e], {
						opacity: style
							.historybga
					})
			}

			function Action2(e) {
				if (exist(f2action[
					e])) {
					for (var t in
							Retimer(),
							0 == f2i(
								"quality",
								e) && o
							.actions
							.SetQuality(
								f2action[
									e]
								.substr(
									7)),
							0 == f2i(
								"audiotrack",
								e) && o
							.actions
							.SetAudioTrack(
								f2action[
									e]
								.substr(
									10)
								), 0 ==
							f2i("subtitle",
								e) && (o
								.sbt ||
								(o.sbt =
									new PluginSub
									), o
								.sbt
								.SetSubtitle(
									f2action[
										e
										]
									.substr(
										8
										)
									)),
							0 == f2i(
								"channel",
								e) &&
							1 == v
							.channels &&
							o.channels
							.SetChannel(
								f2action[
									e]
								.substr(
									7)),
							0 == f2i(
								"share",
								e) && (o
								.share &&
								o.share
								.api(
									shr[
										e]
									),
								HideControl()
								), 0 ==
							f2i("color",
								e) && (
								Remove2(),
								Action(
									0,
									0,
									clr[
										e]
									)),
							o.menuproc)
						o.menuproc
						.hasOwnProperty(
							t) && 0 ==
						f2i(t, e) && o
						.media.menufltr(
							t, e);
					f2i("timer", e) >
						0 && (f2title[e]
							.innerHTML ==
							Lang(
							"off") ? (
								SettingsTimers(
									open_action +
									"0"
									),
								Value(
									open_settings
									),
								"offsettimer" ==
								open_action &&
								SettingsTimers(
									"offsetwrite"
									),
								Home()
								) :
							"sleeptimer" ==
							open_action &&
							1 == style
							.sleep2 && (
								SettingsTimers(
									"sleep2",
									e),
								Value(
									open_settings
									),
								Home())
							), 0 == f2i(
							"speed", e
							) && (o
							.actions
							.SetSpeed(
								f2action[
									e]
								.substr(
									5)),
							UpdateSpeed(),
							setTimeout(
								HideControl,
								200))
				}
			}

			function UpdateSpeed() {
				for (var e = 0; e <
					faction.length; e++)
					"speed" == faction[
						e] && (Value(e),
						"speed" ==
						open_action && (
							Remove2(),
							Action(e, 0)
							))
			}

			function CreateItem(x, i,
				toend) {
				exist(eval(x)) && (eval(
						x)[i] =
					createElement(
						"div"), i <
					2 || "f" == x ||
					"quality" !=
					open_action ||
					1 == toend ?
					1 == style
					.floatleft ?
					control
					.appendChild(
						eval(x)[i]
						) : control2
					.appendChild(
						eval(x)[i]
						) : 1 ==
					style
					.floatleft ?
					control
					.insertBefore(
						eval(x)[i],
						eval(x)[i -
							1]) :
					control2
					.insertBefore(
						eval(x)[i],
						eval(x)[2 ==
							toend ?
							i - 2 :
							i - 1]),
					"f" == x &&
					attr(eval(x)[
					i], {
						fid: i
					}), "f2" == x &&
					attr(eval(x)[
					i], {
						f2id: i
					}), eval(x +
						"bg")[i] =
					createElement(
						"div"),
					eval(x)[i]
					.appendChild(
						eval(x +
							"bg")[i]
						), eval(x +
						"img")[i] =
					createElement(
						"div"),
					eval(x)[i]
					.appendChild(
						eval(x +
							"img")[
							i]),
					css(eval(x +
						"img")[
						i], {
						position: "absolute",
						right: 0,
						top: 0,
						width: "100%",
						height: "100%",
						pointerEvents: "none"
					}), eval(x +
						"title")[
					i] =
					createElement(
						"div"),
					eval(x)[i]
					.appendChild(
						eval(x +
							"title"
							)[i]),
					eval(x +
						"value")[
					i] =
					createElement(
						"div"),
					eval(x)[i]
					.appendChild(
						eval(x +
							"value"
							)[i]),
					"f2" == x &&
					"settings" ==
					is && 0 == style
					.activeicon &&
					hide2(eval(x +
							"value"
							)[i]))
			}

			function StyleItem(e, t, o,
				n, s) {
				css(e, {
						position: "relative",
						right: 0,
						top: 0,
						cursor: "pointer",
						height: "auto",
						width: "100%",
						overflow: "hidden",
						display: "block",
						"line-height": "1.5em"
					}), style
					.floatmarginright &&
					1 == style
					.floatleft && css(
					e, {
						marginRight: style
							.floatmarginright
					}), 1 == style
					.floatleft && css(
					e, {
						display: "inline-block",
						"vertical-align": "top",
						"white-space": "normal"
					}), css(t, {
						position: "absolute",
						right: 0,
						top: 0,
						width: "100%",
						height: "100%",
						backgroundColor: style
							.bgcolor,
						opacity: style
							.bga,
						pointerEvents: "none",
						transition: "opacity 0.2s linear,background .2s linear"
					}), css(o, {
						position: "relative",
						right: 0,
						top: 0,
						float: style
							.align ?
							style
							.align :
							"left",
						color: style
							.color,
						"padding-top": style
							.paddingtop,
						"padding-right": style
							.paddingright,
						"padding-bottom": style
							.paddingbottom,
						"padding-left": style
							.paddingleft,
						pointerEvents: "none",
						opacity: style
							.a,
						transition: "opacity 0.2s linear,color 0.2s linear"
					}), css(n, {
						position: "relative",
						right: 0,
						top: 0,
						float: style
							.valuealign ?
							style
							.valuealign :
							"right",
						"padding-top": style
							.paddingtop,
						"padding-right": style
							.paddingright,
						"padding-left": style
							.paddingleft,
						pointerEvents: "none",
						"font-size": style
							.valuefontsize *
							existv(v
								.globalfs,
								1),
						opacity: style
							.a,
						color: style
							.valuecolor,
						transition: "opacity 0.2s linear,color 0.2s linear"
					}), 1 == style
					.limitwidth ? (css(
						e, {
							"max-width": style
								.limitmaxwidth +
								"px!important"
						}), css(o, {
						"max-width": style
							.limitmaxwidth -
							70 +
							"px!important"
					})) : 1 == style
					.floatleft ? 1 ==
					style
					.floatlimitwidth &&
					(css(e, {
						width: style
							.floatwidth
					}), css(o, {
						width: style
							.floatwidth -
							70
					})) : (css(o, {
						"white-space": "nowrap"
					}), css(n, {
						"white-space": "nowrap"
					}))
			}

			function Home() {
				for (var e = 1; e < f
					.length; e++) exist(
					f[e]) && (1 ==
					style
					.floatleft ? f[
						e].style
					.display =
					"inline-block" :
					f[e].style
					.display =
					"block");
				Retimer(), Remove2(),
					Resize(),
					open_action = "",
					open_settings = -1
			}

			function Remove2() {
				for (var e = 0; e < f2
					.length; e++) f2[
					e] && (1 == style
						.floatleft ?
						control
						.removeChild(f2[
							e]) :
						control2
						.removeChild(f2[
							e]), f2[e] =
						null);
				f2 = [], open_action =
					""
			}

			function Width() {
				return control
					.offsetWidth
			}

			function ResizePlaylist() {
				if ("playlist" == is &&
					(1 == style
						.floatleft ||
						1 == style
						.width100)) {
					var e = o.screen_w -
						style
						.marginright -
						style
						.marginleft;
					css(container, {
							width: e
						}), css(
						control, {
							width: e
						}), control2 &&
						css(control2, {
							width: e
						})
				}
			}

			function Resize() {
				if (!removed) {
					if ("settings" ==
						is) {
						o.controls && o
							.controls
							.resizeSettings();
						var e = 1 ==
							style
							.nohead && f
							.length >
							1 ? f[1] :
							f[0]
					}
					if ("playlist" ==
						is) {
						ResizePlaylist
						(), o
							.controls &&
							o.controls
							.resizePlaylist();
						var e = f[0];
						1 == v
							.change2playlist &&
							MainUpdateSize()
					}
					f.length > 1 && !
						e && f[1] && (
							e = f[1]), f
						.length > 2 && !
						e && f[2] && (
							e = f[2]),
						e && 0 == e
						.offsetWidth &&
						f2.length > 0 &&
						(e = f2[0]),
						control
						.offsetWidth -
						control
						.clientWidth >
						0 && e && 1 !=
						style
						.floatleft ? (
							exist(
								arr_up) &&
							css(arr_up, {
								width: control2
									.offsetWidth
							}), exist(
								arr_down
								) &&
							css(arr_down, {
								width: control2
									.offsetWidth
							}), style
							.scrollwidth =
							control
							.offsetWidth -
							e
							.offsetWidth -
							(control
								.clientWidth -
								e
								.clientWidth
								)) :
						style
						.scrollwidth = 0
				}
			}

			function VisibleItems() {
				for (var e = 0, t = 0,
						o = "", n =
						1; n < f
					.length; n++) exist(
						f[n]) &&
					"visible" == f[n]
					.style.visibility &&
					(e++, t = n, o =
						faction[n]);
				return [e, t, o]
			}

			function SubtitleSettings(
			e) {
				sub_settings_on = !
					sub_settings_on,
					SubtitleSettingsMenu(
						e)
			}

			function SubtitleSettingsMenu() {
				Home();
				for (var e = 0; e <
					faction.length; e++)
					"subtitle" ==
					faction[e] &&
					Action(e, _cstm)
			}

			function Retimer() {
				clearTimeout(settimer),
					settimer =
					setTimeout(
					function() {
						o.setaction = !
							1
					}, 2e3)
			}

			function SubtitleTimerMenu() {
				var e = open_action;
				Home();
				for (var t = 0; t <
					faction.length; t++)
					faction[t] == e &&
					Action(t, 0)
			}

			function HideControl(e) {
				("playlist" != is ||
					1 != v.playlist
					.always2) && (
					"settings" != is ||
					1 != v.settings
					.always) && (
					"playlist" == is &&
					1 == v.playlist
					.droplist && 1 != v
					.playlist
					.dropnohide ? (o
						.droplist && o
						.droplist
					.Hide(),
						is_visible = !1
						) : 1 == e && (
						1 != style
						.hidesmoothly ||
						1 != style
						.always) || o
					.system.tv ? (css(
							container, {
								visibility: "hidden",
								opacity: 0,
								top: -
									2e3
							}),
						is_visible = !1
						) : (
					new Motion({
							mc: container,
							type: "alpha_div",
							to: 0,
							time: .1,
							me: is,
							ease: "elastic"
						}),
						hidetimeout =
						setTimeout(
							function() {
								css(container, {
										visibility: "hidden",
										opacity: 0,
										top: -
											2e3
									}),
									is_visible = !
									1
							}, 200)),
					"playlist" == is &&
					1 == v.playlist
					.hidecontrol && o
					.controls && o
					.controls
					.toggleControl(
						"action",
						"playlist", !0),
					clearInterval(
						wheelinterval))
			}

			function ShowTimeout() {
				clearInterval(
						showinterval),
					justshow = !1
			}

			function showById(e) {
				exist(o.playlist_dic[
					e]) && (plfolder =
						"",
						UpdatePlaylist(
							0),
						FindPlStart(o
							.playlist_dic[
								e]),
						UpdateVars0(e),
						Action(o
							.playlist_dic[
								e]
							.pjs_i, 0),
						UpdateVars(e))
			}

			function ScrollTo(e) {
				if (f[e] && !removed) {
					if (1 == style
						.floatleft) {
						var t = f[e]
							.offsetLeft -
							20;
						new Motion({
							mc: control,
							type: "scrollleft",
							to: t,
							time: .3,
							me: "scroll_left",
							ease: "cubic"
						})
					} else {
						var t = f[e]
							.offsetTop -
							container
							.offsetHeight /
							2 + 20;
						new Motion({
							mc: control,
							type: "scroll",
							to: t,
							time: .3,
							me: "scroll_down",
							ease: "cubic"
						})
					}
					setTimeout(Arrows,
						1e3)
				}
			}

			function Shuffle(e) {
				for (var t, o = Object
						.keys(e), n =
						0; n < o
					.length && !(t = e[
						o[o.length *
							Math
							.random() <<
							0]]); n++);
				return t
			}

			function Menuproc(e) {
				mpi[e] > -1 && Value(
						mpi[e]),
					f2value[0] && (
						"scale" ==
						open_action ?
						f2value[0]
						.innerHTML =
						Math.round(100 *
							o.mediascale
							.x) + "%" :
						f2value[0]
						.innerHTML =
						FltrVal(
							open_action)
						)
			}

			function FltrVal(e) {
				return "scale" == e ?
					Math.round(100 * o
						.mediascale.x) +
					"%" : Math.round(
						100 * existv(o
							.fltrs[e], o
							.menuproc[e]
							)) + "%"
			}

			function f2i(e, t) {
				return f2action[t]
					.indexOf(e)
			}

			function FindPlStart(e) {
				exist(o.u.endtag) &&
					exist(o.u.endtag
						.conf) && exist(
						e.end_tag) && (o
						.u.endtag.conf
						.movie_et = e
						.end_tag), -1 !=
					e.pjs_parent_i ? (
						FindPlStart(o
							.playlist_dic[
								e
								.pjs_parent
								]),
						UpdatePlaylist(e
							.pjs_parent)
						) :
					UpdatePlaylist(0)
			}
			this.UpdateTimer = function(
					e) {
					Value(o[e + "_i"])
				}, this.Arrows =
				function() {
					1 == style
						.scrollarrows &&
						Arrows()
				}, this.UpdateSpeed =
				function() {
					UpdateSpeed()
				}, this.Exist =
				function(e) {
					for (var t = 0; t <
						faction
						.length; t++)
						if (faction[
							t] == e)
							return !0;
					return !1
				}, this.resizePlaylist =
				function() {
					ResizePlaylist()
				}, this.SubOpt =
				function() {
					sub_settings_on = !
						0, this.show(),
						_cstm = 2,
						SubtitleSettingsMenu()
				}, this.c = function() {
					return container
				}, this.co =
			function() {
					if (container
						.contains(
							control))
						return control
				}, this.s = function(
				e) {
					return style[e]
				}, this.ss = function(
				e) {
					return style
				}, this.show =
				function() {
					if (Home(),
						clearTimeout(
							hidetimeout
							),
						is_visible = !0,
						"playlist" ==
						is && 1 == v
						.playlist
						.droplist) o
						.droplist && o
						.droplist
					.Show();
					else {
						css(container, {
							visibility: "visible",
							opacity: 1,
							transition: "opacity 0.2s linear"
						});
						var e =
							VisibleItems();
						1 == e[0] && (
								"quality" ==
								e[2] ||
								"audiotrack" ==
								e[2] ||
								"subtitle" ==
								e[2] ||
								"speed" ==
								e[2] ||
								e[
								2] in o
								.menuproc ||
								e[2]
								.indexOf(
									"timer"
									) >
								0) &&
							Action(e[1],
								0)
					}
					o.controls && (
							"settings" ==
							is && o
							.controls
							.resizeSettings(),
							"playlist" ==
							is && (o
								.controls
								.resizePlaylist(),
								1 == v
								.playlist
								.hidecontrol &&
								o
								.controls
								.toggleControl(
									"action",
									"playlist",
									!1))
							), o.system
						.safari && (css(
								control, {
									"min-width": "auto"
								}), 1 !=
							style
							.floatleft &&
							css(control2, {
								"min-width": "auto"
							})),
						justshow = !0,
						clearInterval(
							showinterval
							),
						showinterval =
						setInterval(
							ShowTimeout,
							100)
				}, this.open = function(
					e) {
					Action(e, 1)
				}, this.hide = function(
					e) {
					HideControl(e)
				}, this.SetQuality =
				function() {
					for (var e = 0; e <
						faction
						.length; e++)
						"quality" ==
						faction[e] && (
							Value(e), o
							.files_quality
							.length >
							1 && show(f[
								e]),
							"quality" ==
							open_action &&
							(Remove2(),
								Action(
									e,
									_cstm
									)))
				}, this.Airplay =
				function() {
					for (var e = 0; e <
						faction
						.length; e++)
						"airplay" ==
						faction[e] &&
						Value(e)
				}, this.SetSetting =
				function(e) {
					for (var t = 0; t <
						faction
						.length; t++)
						faction[t] ==
						e && (Value(t),
							o["files_" +
								e] && o[
								"files_" +
								e]
							.length >
							1 && show(f[
								t]),
							open_action ==
							e && (
								Remove2(),
								Action(
									t,
									_cstm
									)))
				}, this.SetSubtitle =
				function() {
					for (var e = 0; e <
						faction
						.length; e++)
						if ("subtitle" ==
							faction[e]
							) {
							if (Value(
								e), o
								.files_subtitle &&
								o
								.files_subtitle
								.length >
								0) {
								var t = !
									1;
								if (o
									.subs
									) {
									for (
										var n =
											0; n <
										o
										.subs
										.length; n++
										)
										if ("" !=
											o
											.subs[
												n
												]
											) {
											t = !
												0;
											break
										}
								} else
									t = !
									0;
								t && show(
									f[
										e]
									)
							}
							"subtitle" ==
							open_action
								&& (Remove2(),
									Action(
										e,
										0
										)
									)
						}
				}, this.updatePlaylist =
				function(e) {
					if (o.playlist = e,
						UpdatePlaylist(
							0), exist(v
							.plstart)) {
						if (0 != v
							.plstart
							.indexOf(
								"x-"))
							for (var t in
									o
									.playlist_dic)
								o
								.playlist_dic
								.hasOwnProperty(
									t
									) &&
								o
								.playlist_dic[
									t]
								.pjs_id ==
								v
								.plstart &&
								(v.plstart =
									t);
						if (exist(o
								.playlist_dic[
									v
									.plstart
									]
								)) {
							FindPlStart(
								o
								.playlist_dic[
									v
									.plstart
									]
								);
							var t = o
								.playlist_dic[
									v
									.plstart
									]
								.pjs_i;
							ActionPlaylist
								(t),
								1 == v
								.playlist
								.openplaylistroot &&
								1 !=
								style
								.droplist ?
								(UpdatePlaylist(
										0
										),
									setTimeout(
										function() {
											Resize
												()
										},
										500
										)
									) :
								setTimeout(
									function() {
										ScrollTo
											(
												t),
											Resize()
									},
									500
									), v
								.plstart =
								void 0
						} else
							ActionPlaylist(
								0)
					} else
						ActionPlaylist(
							0);
					1 != style
						.droplist ||
						exist(o
							.droplist) ||
						(o.droplist =
							new PluginDroplist
							)
				}, this.playById =
				function(e) {
					exist(o.playlist_dic[
						e]) && (
						FindPlStart(
							o
							.playlist_dic[
								e]),
						Action(o
							.playlist_dic[
								e]
							.pjs_i,
							0),
						ScrollTo(o
							.playlist_dic[
								e]
							.pjs_i))
				}, this.openById =
				function(e) {
					exist(o.playlist_dic[
						e]) && (
						FindPlStart(
							o
							.playlist_dic[
								e]),
						o
						.playlist_dic[
							e]
						.file ? (
							"prerollt" in
							v && (v
								.preroll =
								v
								.prerollt
								),
							ActionPlaylist(
								o
								.playlist_dic[
									e
									]
								.pjs_i
								),
							UpdateVars0(
								e),
							o
							.actions
							.NewFile(
								o
								.playlist_dic[
									e
									]
								.file,
								1),
							UpdateVars(
								e),
							ScrollTo(
								o
								.playlist_dic[
									e
									]
								.pjs_i
								), o
							.droplist &&
							o
							.droplist
							.Update()
							) : o
						.playlist_dic[
							e]
						.folder &&
						UpdatePlaylist(
							e))
				}, this.PlaylistNext =
				function() {
					if (PauseBannerPlugin(
							"pausebannerhide"
							),
						autonextopenfolder = !
						0, e = parseInt(
							plx) + 1,
						"" != plid && (o
							.plhistory[
								plid
								] = !0,
							shuffle =
							removebykey(
								shuffle,
								plid)),
						1 == v.shuffle
						) {
						if (null == (e =
								Shuffle(
									shuffle
									)
								)) {
							if (1 == v
								.shuffle8 ||
								1 == v
								.playlist
								.autoplaylist
								) {
								for (var e in
										shuffle_
										.sort(
											function(
												e,
												t
												) {
												return Math
													.random() -
													.5
											}
											),
										shuffle_)
									shuffle_
									.hasOwnProperty(
										e
										) &&
									(shuffle[
											e
											] =
										shuffle_[
											e
											]
										);
								e = Shuffle(
									shuffle
									)
							} else o
								.actions
								.ShuffleEnd();
							v.playlist
								.dontplay =
								1, o.u
								.playlist
								.dontplay =
								1
						}
					} else {
						if (plid
							.indexOf(
								"xxx-"
								) > -1
							) {
							let t = plid
								.replace(
									"xxx-",
									"")
								.split(
									"-"
									);
							t[2] =
								parseInt(
									t[2]
									) +
								1, t[
								4] =
								parseInt(
									t[4]
									) +
								1, t[
								8] =
								parseInt(
									t[8]
									) +
								1;
							let n =
								`xxx-${t.join("-")}`;
							Object.keys(
									o
									.playlist_dic
									)
								.forEach(
									function(
										t
										) {
										t.indexOf(
												n
												) >
											-
											1 &&
											(plid =
												t,
												plx = -
												1,
												faction[
													e
													] =
												"playlistfolder"
												)
									})
						}
						if (("playlistfolder" ==
								faction[
									e
									] ||
								-1 ==
								plx) &&
							"" != plid
							) {
							var s =
								Object
								.keys(o
									.playlist_dic
									)
								.indexOf(
									plid
									);
							if (s <
								Object
								.keys(o
									.playlist_dic
									)
								.length
								) {
								var a =
									o
									.playlist_dic[
										Object
										.keys(
											o
											.playlist_dic
											)[
											s
											]
										];
								a && (exist(a
										.folder
										) &&
									(a = o
										.playlist_dic[
											Object
											.keys(
												o
												.playlist_dic
												)[
												s
												]
											]
										),
									this
									.openById(
										a
										.id
										),
									e = -
									1,
									setTimeout(
										() =>
										o
										.actions
										.Play(
											1
											),
										100
										),
									v
									.playlist
									.dontplay =
									0,
									o
									.u
									.playlist
									.dontplay =
									0
									)
							}
						}
					}
					e > -1 && (Action(e,
							0),
						ScrollTo(e))
				}, this.menuproc =
				function(e) {
					Menuproc(e)
				}, this
				.PlaylistNextExist =
				function() {
					if (1 == v.shuffle)
						return Object
							.keys(
								shuffle)
							.length > 0;
					var e = !1;
					return o
						.playlist_dic &&
						(e = Object
							.keys(o
								.playlist_dic
								)
							.indexOf(
								plid) <
							Object.keys(
								o
								.playlist_dic
								)
							.length - 1
							), e
				}, this.PlaylistRewind =
				function() {
					exist(o
						.pl_first_id) &&
						showById(o
							.pl_first_id
							)
				}, this
				.PlaylistPrevExist =
				function() {
					var e = plx > 0;
					if (o
						.playlist_dic) {
						var t = Object
							.keys(o
								.playlist_dic
								),
							n = t
							.indexOf(
								plid);
						e = n > 0, 1 ==
							n && exist(o
								.playlist_dic[
									t[0]
									]
								.folder
								) && (
								e = !1)
					}
					return e
				}, this.PlaylistExist =
				function() {
					return exist(o
						.playlist_dic
						)
				}, this.PlaylistPrev =
				function() {
					if (autoprevopenfolder = !
						0, this
						.PlaylistPrevExist()
						) {
						var e =
							parseInt(
								plx) -
							1;
						if (e < 0) {
							var t =
								Object
								.keys(o
									.playlist_dic
									)
								.indexOf(
									plid
									);
							if (t > 0) {
								var n =
									o
									.playlist_dic[
										Object
										.keys(
											o
											.playlist_dic
											)[
											t -
											1
											]
										];
								n && (exist(n
										.folder
										) &&
									(n = o
										.playlist_dic[
											Object
											.keys(
												o
												.playlist_dic
												)[
												t -
												2
												]
											]
										),
									n &&
									(this
										.openById(
											n
											.id
											),
										o
										.actions
										.Play()
										)
									)
							}
						} else Action(e,
								0),
							ScrollTo(e)
					}
				}, this.PlaylistHere =
				function() {
					plx > 0 && ScrollTo(
						plx)
				}, this.g = function(
				e) {
					switch (e) {
						case "width":
							return Width();
						case "height":
							return container
								.offsetHeight;
						case "top":
							return style
								.margintop;
						case "scroll_height":
							return control
								.scrollHeight;
						case "margin_bottom":
							return style
								.marginbottom;
						case "x":
							return int(
								container
								.style
								.left
								);
						case "y":
							return int(
								container
								.style
								.top
								);
						case "opacity":
							return container
								.style
								.opacity;
						case "show":
							return is_visible;
						case "open":
							return open_settings;
						case "key":
							return key;
						case "motion_id":
							return key +
								motion_id;
						case "empty":
							return empty;
						case "playlist":
							return "playlist" ==
								is;
						case "activeicon":
							return _activeIcon;
						case "butplstart":
							return o
								.playlist_dic[
									o
									.butplstart
									] ?
								o
								.playlist_dic[
									o
									.butplstart
									]
								.title :
								"";
						case "title2":
							return v
								.title2 ?
								v
								.title2 :
								""
					}
				}, this.prenewpl =
				function() {
					plid = "", v
						.plstart = ""
				}, this.empty =
				function() {
					if ("settings" ==
						is) {
						for (var e = 0,
								t =
								1; t <
							11; t++) {
							if ("quality" ==
								faction[
									t]
								) {
								var n =
									o
									.files_quality
									.length;
								if (exist(
										v
										.forbidden_quality
										))
									for (
										var s =
											v
											.forbidden_quality
											.split(
												","
												),
											a =
											0; a <
										s
										.length; a++
										)
										o
										.files_quality
										.indexOf(
											s[
												a]
											) >
										-
										1 &&
										n--;
								n > 0 &&
									(n > 1 ||
										1 ==
										n &&
										1 !=
										o
										.files_quality &&
										1 ==
										style
										.show1value
										) &&
									e++
							}
							if ("airplay" ==
								faction[
									t
									] &&
								o
								.airplay &&
								e++,
								"download" ==
								faction[
									t
									] &&
								("native" ==
									o
									.file_type ||
									v
									.download
									) &&
								e++,
								"audiotrack" ==
								faction[
									t
									] &&
								o
								.files_audiotrack
								.length >
								0 &&
								e++,
								"channel" ==
								faction[
									t
									] &&
								1 == v
								.channels &&
								o
								.files_channel
								.length >
								0 &&
								e++,
								"subtitle" ==
								faction[
									t]
								) {
								if (exist(
										o
										.subs
										)) {
									for (
										var r =
											0; r <
										o
										.subs
										.length; r++
										)
										if ("" !=
											o
											.subs[
												r
												]
											) {
											e++;
											break
										}
								}
								1 == e &&
									1 ==
									o
									.subload &&
									(e =
										0),
									1 ==
									v
									.sub_upload &&
									1 ==
									v
									.sub_upload0 &&
									e++
							}
							"speed" ==
							faction[
								t] &&
								"vimeo" !=
								o
								.file_type &&
								e++, (
									faction[
										t
										] in o
									.menuproc ||
									"share" ==
									faction[
										t
										] ||
									"color" ==
									faction[
										t
										]
									) &&
								e++,
								faction[
									t
									] &&
								faction[
									t]
								.indexOf(
									"timer"
									) >
								0 &&
								e++,
								1 == v
								.settings[
									is +
									t +
									"hide"
									] &&
								e--
						}
						return 0 == e
					}
					return "playlist" ==
						is ? 0 == f
						.length : empty
				}, this.Remove =
				function() {
					container
						.parentNode == o
						.frame && (
							container
							.removeChild(
								control
								), o
							.frame
							.removeChild(
								container
								), o
							.droplist &&
							o.droplist
							.Remove(),
							container =
							null,
							control =
							null,
							removed = !0
							)
				}
		};

	function PluginShare_whatsapp() {
		this.share = function() {
			return (o.system
				.mobile ?
				"https://wa.me/?" :
				"https://web.whatsapp.com/send?"
				) + "text="
		}, this.icon = function(e) {
			return "<path d='M14.2464991,5.25712408 C13.1148991,4.12492408 11.6100991,3.50092408 10.0068991,3.50032408 C6.70329913,3.50032408 4.01469913,6.18772408 4.01349913,9.49132408 C4.01289913,10.5473241 4.28889913,11.5781241 4.81329913,12.4865241 L4.00029913,15.5003241 L7.14009913,14.7581241 C8.01549913,15.2357241 9.00069913,15.4871241 10.0038991,15.4877241 C13.3092991,15.4877241 15.9978991,12.7997241 15.9996991,9.49672408 C16.0008991,7.89532408 15.3780991,6.38992408 14.2464991,5.25712408 Z M12.9390991,11.6327241 C12.8142991,11.9825241 12.2028991,12.3197241 11.9280991,12.3443241 C11.6532991,12.3695241 11.3958991,12.4685241 10.1310991,11.9699241 C8.60889913,11.3699241 7.64769913,9.80932408 7.57329913,9.70972408 C7.49829913,9.60952408 6.96189913,8.89792408 6.96189913,8.16112408 C6.96189913,7.42432408 7.34889913,7.06192408 7.48629913,6.91252408 C7.62369913,6.76252408 7.78569913,6.72532408 7.88589913,6.72532408 C7.98549913,6.72532408 8.08569913,6.72532408 8.17269913,6.72892408 C8.27949913,6.73312408 8.39769913,6.73852408 8.50989913,6.98752408 C8.64309913,7.28392408 8.93409913,8.02432408 8.97129913,8.09932408 C9.00849913,8.17432408 9.03369913,8.26192408 8.98389913,8.36152408 C8.93409913,8.46112408 8.90889913,8.52352408 8.83449913,8.61112408 C8.75949913,8.69872408 8.67729913,8.80612408 8.61009913,8.87332408 C8.53509913,8.94772408 8.45709913,9.02932408 8.54409913,9.17872408 C8.63169913,9.32872408 8.93169913,9.81892408 9.37689913,10.2155241 C9.94929913,10.7255241 10.4310991,10.8833241 10.5810991,10.9589241 C10.7310991,11.0339241 10.8180991,11.0213241 10.9056991,10.9211241 C10.9932991,10.8215241 11.2800991,10.4843241 11.3796991,10.3343241 C11.4792991,10.1843241 11.5794991,10.2095241 11.7168991,10.2593241 C11.8542991,10.3091241 12.5904991,10.6715241 12.7398991,10.7465241 C12.8898991,10.8215241 12.9894991,10.8587241 13.0266991,10.9211241 C13.0638991,10.9829241 13.0638991,11.2829241 12.9390991,11.6327241 Z' fill='" +
				e +
				"' fill-rule='nonzero'></path>"
		}
	}

	function PluginShare_telegram() {
		this.share = function() {
			return "https://t.me/share/url?url="
		}, this.icon = function(e) {
			return "<path d='M15.774328,4.61928677 C15.6001007,4.47186369 15.3186567,4.45846159 14.8361812,4.60588467 L14.8361812,4.60588467 C14.5011287,4.71310145 11.525863,5.83887768 8.89905178,6.92444761 C6.54028255,7.90280076 4.62378254,8.76053503 4.39594688,8.86775181 C4.14130702,8.9481644 3.591821,9.18940216 3.56501681,9.5646609 C3.55161471,9.80589866 3.75264618,10.0203322 4.14130702,10.1945595 C4.55677205,10.4089931 6.39285947,11.0254896 6.78152031,11.1461085 C6.91554129,11.6017798 13.4557651,6.66394451 13.4959714,6.82476969 C13.5495798,7.06600745 8.27203981,11.6399635 8.3524524,11.6935719 C8.3658545,11.706974 7.97987656,14.3468113 8.00668076,14.3602134 C8.04688705,14.3870176 8.0174202,14.6306539 8.13718414,14.7378707 C8.25694808,14.8450875 8.2536879,14.8345227 8.51661242,14.8345227 C9.01249004,14.4324598 9.91761122,13.545084 10.158849,13.2904441 C11.2176147,14.1213742 12.3701951,15.046119 12.4774119,15.1533357 L12.490814,15.1667378 C12.7454539,15.3811714 13.0134958,15.5017903 13.2547336,15.5017903 C13.3351462,15.5017903 13.4155588,15.4883882 13.4959714,15.461584 C13.7774154,15.3677693 13.9784469,15.0997273 14.0454574,14.7378707 C14.0454574,14.7244686 14.0588595,14.6708602 14.0856637,14.5770455 C14.541335,12.593535 14.9031916,10.8512623 15.1980378,9.39043363 C15.4794819,7.95640915 15.7073175,6.54918887 15.8413385,5.79867139 C15.8681427,5.61104201 15.8949469,5.46361894 15.908349,5.36980425 C15.9485553,5.10176229 15.9753595,4.79351404 15.774328,4.61928677 Z' fill='" +
				e +
				"' fill-rule='nonzero'></path>"
		}
	}
	var MediaYoutube = function(e, t) {
			var n, s, a, r, l = !1;
			0 == e.indexOf("intro") && (
				l = !0, e = e
				.substr(5));
			var d = YoutubeID(e),
				c = !1,
				u = !1,
				$ = !1,
				f = !1,
				p = !0,
				_ = [],
				h = 1,
				g = !1,
				m = 0,
				b = 0,
				y = !1,
				w = "pljs_yt_" + v.id +
				(l ? "intro" : ""),
				k = createElement(
				"div");
			if (k.setAttribute("id", w),
				t.appendChild(k), o
				.airplay = !1, l || o
				.actions
				.AirplayChanged(), o
				.system.mobile && (v
					.preload = 1), 1 !=
				v.youtubecontrols) {
				var O = createElement(
					"div");
				t.appendChild(O), css(
					O, {
						position: "absolute",
						top: 0,
						left: 0,
						"background-color": "#ff0000",
						height: "100%",
						width: "100%",
						opacity: 0
					}), O
					.addEventListener(
						"dblclick",
						function(e) {
							e.cancelBubble = !
								0
						}), o.system
					.mobile ? (O
						.addEventListener(
							"touchstart",
							function(
							e) {
								e.cancelBubble = !
									0
							}), O
						.addEventListener(
							"click",
							function(
							e) {
								e.cancelBubble = !
									0
							}), O
						.addEventListener(
							"touchend",
							function(
							e) {
								e.cancelBubble = !
									0,
									ScreenClick(
										e
										),
									1 ==
									v
									.screenclick &&
									(setTimeout(
											L,
											100
											),
										setTimeout(
											C,
											1e3
											)
										)
							})) : O
					.addEventListener(
						"mousemove",
						function(e) {
							var t = !0;
							1 == v
								.vast &&
								(exist(v
										.preroll) &&
									!
									$ &&
									(t = !
										1
										),
									exist(
										v
										.playroll
										) &&
									"paused" ==
									W() &&
									X() >
									0 &&
									(t = !
										1
										)
									),
								t &&
								1 == v
								.screenclick &&
								1 != v
								.ytcl &&
								(hide2(
										this),
									setTimeout(
										C,
										2e3
										)
									)
						}), 1 == v
					.screenclick && 1 !=
					v.ytcl1 && hide2(O)
			}

			function C() {
				show2(O)
			}

			function L() {
				1 != v.ytcl && hide2(O)
			}
			if (1 == v.preload && 0 == v
				.autoplay && R(), window
				.YT) T();
			else {
				window
					.onYouTubeIframeAPIReady =
					function() {
						T();
						for (var e =
							0; e <
							pljssglobal
							.length; e++
							)
							pljssglobal[
								e].api(
								"id") !=
							v.id &&
							pljssglobal[
								e].api(
								"isyoutube"
								) &&
							pljssglobal[
								e].api(
								"youtubeready"
								)
					};
				var S = Script(
					"youtube.com/iframe_api",
					"youtube.com/iframe_api",
					"youtube_iframe_api"
					);
				S && (S.onerror =
					function(e) {
						o.actions
							.MediaReady(),
							1 != v
							.yterrors &&
							(n = "YouTube API Error",
								o
								.media
								.onError()
								)
					})
			}

			function T() {
				1 == v.preload || l ?
					c || E() : o.actions
					.MediaReady()
			}

			function E() {
				if ("YT" in window) {
					if (exist(YT
						.Player) && !c
						) {
						log(
						"Youtube Init");
						var e = 0;
						1 == v
							.youtubecontrols &&
							(e = 1), o
							.seekto >
							0 && (m =
								parseInt(
									o
									.seekto
									)),
							s = new YT
							.Player(w, {
								height: o
									.container_h,
								width: o
									.container_w,
								videoId: d,
								playerVars: {
									enablejsapi: 1,
									playerapiid: w,
									html5: 1,
									disablekb: 1,
									autohide: 1,
									playsinline: (
											0 ==
											v
											.playsinlineonmobile ||
											1 !=
											v
											.playsinlineonmobileiphone &&
											o
											.system
											.iphone
											) &&
										o
										.system
										.mobile ?
										0 :
										1,
									iv_load_policy: 3,
									controls: e,
									showinfo: 0,
									modestbranding: 1,
									rel: 0,
									autoplay: l ?
										1 :
										0,
									loop: 0
								},
								events: {
									onReady: P,
									onStateChange: z,
									onError: I,
									onPlaybackQualityChange: N
								}
							}), o
							.seekto >
							0 && (o
								.seekto =
								void 0),
							U(), c = !0
					} else setTimeout(E,
						500)
				} else setTimeout(E,
					500)
			}

			function P() {
				if (o.media) {
					if (log(
							"Youtube Ready"),
						u = !0,
						clearTimeout(a),
						o.actions
						.StopWaiting(),
						l) o.system
						.mutedautoplay &&
						o.actions
					.Mute(), s
						.playVideo(), o
						.vast.ytReady();
					else if (1 == v
						.autoplay && o
						.system
						.mutedautoplay &&
						!o.acted && (o
							.actions
							.Mute(), o
							.system
							.mobile && (
								clearInterval(
									r),
								r =
								setInterval(
									A,
									300)
								)), 0 ==
						v.preload ? s
						.playVideo() : o
						.actions
						.MediaReady(), o
						.media
						.onDuration(),
						1 != h && Q(h),
						H(), U(), 1 == v
						.yttitle) try {
						s.getVideoData() &&
							exist(s
								.getVideoData()
								.title
								) &&
							(v.title =
								s
								.getVideoData()
								.title,
								o
								.actions
								.Title(
									"title"
									)
								)
					} catch (e) {}
				}
			}

			function A() {
				var e = s
					.getPlayerState();
				(2 == e || -1 == e) && (
					o.controls.Pause(),
					o.controls
					.StopWaiting(),
					clearInterval(r)), 1
					== e &&
					clearInterval(r)
			}

			function z(e) {
				if (1 == v.ytlog && log(
						"YT", e.data),
					l) e.data == YT
					.PlayerState
					.ENDED && o.vast
					.ytEnded(), e.data,
					YT.PlayerState
					.PLAYING;
				else {
					if (e.data == YT
						.PlayerState
						.PLAYING) {
						if (1 == b && (
								b = 0,
								P()), o
							.play || o
							.actions
							.Play(), m >
							0 && (s
								.seekTo(
									m, !
									0),
								m = 0, o
								.seekto =
								void 0),
							C(), $ = !0,
							u = !0, f ?
							s
							.pauseVideo() :
							(o.media
								.onPlay(),
								o.media
								.onTimeupdate()
								), F(),
							exist(v
								.default_quality
								)) {
							for (var t =
									0; t <
								o
								.files_quality
								.length; t++
								) v
								.default_quality ==
								o
								.files_quality[
									t
									] &&
								G(t);
							v.default_quality =
								null
						} else if (
							exist(o
								.default_quality
								)) {
							for (var t =
									0; t <
								o
								.files_quality
								.length; t++
								) o
								.default_quality ==
								o
								.files_quality[
									t
									] &&
								G(t);
							o.default_quality =
								null
						}
						g = !1
					} - 1 == e.data &&
						g && o.play && (
							o.actions
							.StopWaiting(),
							g = !1, V()
							), e.data,
						YT.PlayerState
						.PAUSED, e
						.data == YT
						.PlayerState
						.ENDED && q(), e
						.data == YT
						.PlayerState
						.BUFFERING && (o
							.play, o
							.play && (
								g = !0,
								R())), e
						.data, YT
						.PlayerState
						.CUED
				}
			}

			function I(e) {
				l ? o.vast.ytError() : (
					2 == e.data && (
						n =
						"wrong youtube id"
						), 5 == e
					.data && (n =
						"network empty"
						), (101 == e
						.data ||
						150 == e
						.data ||
						100 == e
						.data) && (
						n =
						"this video is unavailable"
						), 1 == v
					.customyterrors &&
					exist(v
						.customyterror
						) && (n = v
						.customyterror
						), 1 != v
					.yterrors ? o
					.media
				.onError() : hide(o
						.poster))
			}

			function q() {
				v.start > 0 && (m = v
						.start), o.media
					.onEnded(), o.media
					.onDuration()
			}

			function V() {
				!o.nopause && o.play &&
					o.actions.Pause()
			}

			function M() {
				o.media.onTimeupdate()
			}

			function H() {
				o.media.onMeta(), o
					.actions
					.LoadedData()
			}

			function D() {
				o.media.onDuration()
			}

			function j() {
				o.media.onVolume()
			}

			function R() {
				o.media ? o.media
					.onWaiting() : a =
					setTimeout(R, 100)
			}

			function N(e) {
				B(e.data)
			}

			function F() {
				if (!y) {
					var e = s
						.getAvailableQualityLevels() +
						"";
					if ("" != e &&
						void 0 != e) {
						if (o
							.files_quality =
							e.split(
							","), o
							.files_quality =
							o
							.files_quality
							.reverse(),
							0 == v
							.ytautoquality
							) {
							var t = o
								.files_quality
								.indexOf(
									"auto"
									);
							t > -1 && o
								.files_quality
								.splice(
									t, 1
									)
						}
						for (var n =
							0; n < o
							.files_quality
							.length; n++
							) o
							.files_quality[
								n] = Y(o
								.files_quality[
									n]);
						y = !0, B(s
							.getPlaybackQuality()
							)
					}
				}
			}

			function B(e) {
				o.current_quality = o
					.files_quality
					.indexOf(Y(e + "")),
					o.controls
					.QualityChanged(o
						.current_quality
						)
			}

			function W() {
				var e = -1;
				u && (e = s
					.getPlayerState()
					);
				var t = "";
				return -1 == e && (t =
						"paused"), (1 ==
						e || 3 == e) &&
					(t = "playing"),
					2 == e && (t =
						"paused", o
						.play && (o
							.controls
							.Pause(), o
							.actions
							.StopWaiting()
							)), 5 ==
					e && (t = "paused"),
					0 == e && (t =
						"ended"), t
			}

			function U() {
				s && s.setSize(o
					.screen_w, o
					.screen_h)
			}

			function Y(e) {
				var t = e;
				return "tiny" == e && (
						t = "160p"),
					"small" == e && (t =
						"240p"),
					"medium" == e && (
						t = "360p"),
					"large" == e && (t =
						"480p"),
					"hd720" == e && (t =
						"720p"),
					"hd1080" == e && (
						t = "1080p"),
					1 == v
					.nameofyoutubequality &&
					(t = Lang(t)),
					"auto" == e && (t =
						Lang("auto")),
					_[t] = e, t
			}

			function X() {
				return u ? s
					.getCurrentTime() :
					0
			}

			function Q(e) {
				s && s.setPlaybackRate(
					e), h = e
			}

			function G(e) {
				if (u && exist(o
						.files_quality[
							e])) {
					var t = _[o
						.files_quality[
							e]];
					p = "auto" == t,
					X(), s
						.setPlaybackQuality(
							t)
				}
			}

			function Z(t) {
				e = t, s && (b = 1, s
					.loadVideoById(
						t, 0))
			}
			this.size = function() {
					return {
						width: 0,
						height: 0
					}
				}, this.src = function(
					e) {
					d = YoutubeID(e), o
						.seekto > 0 && (
							m =
							parseInt(o
								.seekto)
							), Z(d)
				}, this.YoutubeReady =
				function() {
					T()
				}, this.Play =
				function() {
					u ? s.playVideo() :
						c || E()
				}, this.Pause =
				function() {
					u && s.pauseVideo()
				}, this.Toggle =
				function() {
					u && ("playing" ==
						W() ? s
						.pauseVideo() :
						s
						.playVideo()
						)
				}, this.Seek = function(
					e) {
					u && s.seekTo(e, !0)
				}, this.tag =
			function() {
					return !1
				}, this.Mute =
				function() {
					u && s.mute()
				}, this.Unmute =
				function() {
					u && s.unMute()
				}, this.Volume =
				function(e) {
					u && s.setVolume(
						100 * e)
				}, this.isPlaying =
				function() {
					return "playing" ==
						W()
				}, this.isLive =
				function() {
					return !1
				}, this.setQuality =
				function(e) {
					G(e)
				}, this.setSpeed =
				function(e) {
					Q(e)
				}, this.ready =
				function() {
					return u
				}, this.status =
				function() {
					return W()
				}, this.time =
				function() {
					return X()
				}, this.duration =
				function() {
					var e = u ? s
						.getDuration() :
						0;
					return exist(v
						.end) && (e = v
							.end), e
				}, this.loaded =
				function() {
					var e = 0;
					return u && (e = s
						.getVideoLoadedFraction() *
						s
						.getDuration()
						), e
				}, this.resize =
				function() {
					U()
				}, this.errorMessage =
				function() {
					return n
				}, this.auto =
				function() {
					return 1 == v
						.ytautoquality &&
						p
				}, this.playId =
				function(e) {
					Z(e)
				}, this.BeforeVast =
				function() {
					o.system.mobile && o
						.system
						.android ? (this
							.Play(),
							f = !0) :
						"playing" ==
					W() && this.Pause()
				}, this.AfterVast =
				function() {
					f = !1
				}, this.nativeControls =
				function() {
					return !0
				}, this.Remove =
				function() {
					u && s.destroy(),
						u = !1, y = !1;
					try {
						k && t
							.removeChild(
								k), t
							.removeChild(
								O)
					} catch (e) {}
				}
		},
		TimeStore = function() {
			o.p.href && (o.d = o.p
			.href);
			var e = this,
				t = "",
				n = 0,
				s = 0;
			o.storage && 1 != v
				.timestoredontuse && (
					null != getCookie(
						"pljsplayfrom_" +
						v.id + o.href2
						) && (t =
						getCookie(
							"pljsplayfrom_" +
							v.id + o
							.href2)),
					1 == v
					.playedstore &&
					null != getCookie(
						"pljsplayed_" +
						v.id + o.href2
						) && (o
						.playedstore =
						getCookie(
							"pljsplayed_" +
							v.id + o
							.href2)),
					exist(v.cuid) && (
						null !=
						getCookie(
							"pljsplayfrom_" +
							o.d + v.cuid
							) && (t =
							getCookie(
								"pljsplayfrom_" +
								o.d + v
								.cuid)),
						1 == v
						.playedstore &&
						null !=
						getCookie(
							"pljsplayed_" +
							o.d + v.cuid
							) && (o
							.playedstore =
							getCookie(
								"pljsplayed_" +
								o.d + v
								.cuid))
						), o
					.playedstore && 1 ==
					v.playedstore && (o
						.playedstored =
						o.playedstore
						.split(",")),
					0 == t.indexOf(
					"{") && (1 == v
						.timestorejustbut ?
						o.butplstart = t
						.substr(1, t
							.indexOf(
								"}") - 1
							) : o
						.plcontinue = v
						.plstart = t
						.substr(1, t
							.indexOf(
								"}") - 1
							), t = t
						.substr(t
							.indexOf(
								"}") + 1
							), 1 == v
						.timestore0plroot &&
						(v.playlist
							.openplaylistroot =
							0)), r(t));
			let a = function(a) {
				null != a.data &&
					"timestore_localstorage" ==
					a.data.event &&
					!e
					.postMessageTimeStore &&
					"info" in a
					.data && null !=
					a.data.info &&
					"title" in a
					.data.info &&
					"value" in a
					.data.info && (
						setCookie(a
							.data
							.info
							.title,
							a.data
							.info
							.value),
						1 != v
						.timestoredontuse &&
						(null !=
							getCookie(
								"pljsplayfrom_" +
								v
								.id +
								o
								.href2
								) &&
							(t = getCookie(
								"pljsplayfrom_" +
								v
								.id +
								o
								.href2
								)),
							1 == v
							.playedstore &&
							null !=
							getCookie(
								"pljsplayed_" +
								v
								.id +
								o
								.href2
								) &&
							(o.playedstore =
								getCookie(
									"pljsplayed_" +
									v
									.id +
									o
									.href2
									)
								),
							exist(v
								.cuid
								) &&
							(null !=
								getCookie(
									"pljsplayfrom_" +
									o
									.d +
									v
									.cuid
									) &&
								(t = getCookie(
									"pljsplayfrom_" +
									o
									.d +
									v
									.cuid
									)),
								1 ==
								v
								.playedstore &&
								null !=
								getCookie(
									"pljsplayed_" +
									o
									.d +
									v
									.cuid
									) &&
								(o.playedstore =
									getCookie(
										"pljsplayed_" +
										o
										.d +
										v
										.cuid
										)
									)
								), o
							.playedstore &&
							1 == v
							.playedstore &&
							(o.playedstored =
								o
								.playedstore
								.split(
									","
									)
								),
							0 == t
							.indexOf(
								"{"
								) ?
							(1 == v
								.timestorejustbut ?
								o
								.butplstart =
								t
								.substr(
									1,
									t
									.indexOf(
										"}"
										) -
									1
									) :
								o
								.plcontinue =
								v
								.plstart =
								t
								.substr(
									1,
									t
									.indexOf(
										"}"
										) -
									1
									),
								t =
								t
								.substr(
									t
									.indexOf(
										"}"
										) +
									1
									),
								1 ==
								v
								.timestore0plroot &&
								(v.playlist
									.openplaylistroot =
									0
									),
								r(
								t),
								o
								.controls
								.Played(
									n,
									s
									),
								o
								.controls
								.Duration(
									n,
									s
									)
								) :
							(r(t), e
								.updateCuid()
								)),
						e
						.postMessageTimeStore = !
						0)
			};

			function r(e) {
				if (e && e.indexOf(
					"--") > 0) {
					var t = e.split(
						"--");
					n = parseFloat(t[
						0]), 1 == v
						.timestoreunauto &&
						n > 0 && 1 == v
						.autoplay && (v
							.autoplay =
							0), 1 == v
						.timestorejustbut ?
						o.butseekto =
						n : (s =
							parseFloat(
								t[1]), o
							.seekto = n)
				}
			}
			"addEventListener" in window
				? window
				.addEventListener(
					"message", a) :
				window.attachEvent(
					"message", a), this
				.updateCuid =
			function() {
					exist(v.cuid) && (
						null !=
						getCookie(
							"pljsplayfrom_" +
							o.d + v
							.cuid) ?
						(t = getCookie(
								"pljsplayfrom_" +
								o
								.d +
								v
								.cuid
								),
							r(t), o
							.controls
							.Played(
								n, s
								), o
							.controls
							.Duration(
								n, s
								), v
							.duration =
							s) : (o
							.seekto =
							0, o
							.controls
							.Played(
								0, 0
								), o
							.controls
							.Duration(
								0, 0
								), v
							.duration =
							0))
				}, this.write =
				function(e, t) {
					if (o.p.href && (o
							.d = o.p
							.href), o
						.media
					.isLive() && 1 == v
						.timestorenolive
						);
					else {
						var n =
							new Date()
							.getTime();
						setCookie(
								"pljsplayfrom_" +
								(exist(v
										.cuid) ?
									o
									.d +
									v
									.cuid :
									v
									.id +
									o
									.href2
									), (
									exist(
										o
										.plid
										) ?
									"{" +
									o
									.plid +
									"}" :
									""
									) +
								e +
								"--" +
								t +
								"--" + n
								),
							window
							.parent
							.postMessage({
								event: "timestore_localstorage",
								info: {
									title: "pljsplayfrom_" +
										(exist(v
												.cuid) ?
											o
											.d +
											v
											.cuid :
											v
											.id +
											o
											.href2
											),
									value: (exist(
												o
												.plid
												) ?
											"{" +
											o
											.plid +
											"}" :
											""
											) +
										e +
										"--" +
										t +
										"--" +
										n
								}
							}, "*")
					}
				}, this.writePl =
				function(e) {
					o.p.href && (o.d = o
							.p.href), o
						.playedstore = (
							o
							.playedstore ?
							o
							.playedstore +
							"," : "") +
						e, setCookie(
							"pljsplayed_" +
							(exist(v
									.cuid) ?
								o.d + v
								.cuid :
								v.id + o
								.href2),
							o
							.playedstore
							);
					let t = !1;
					!t && o.plid && (
							window
							.parent
							.postMessage({
								event: "tabs",
								info: {
									title: "serial-season-episode",
									value: o
										.plid
								}
							}, "*"),
							console.log(
								"tabs"),
							t = !0),
						window.parent
						.postMessage({
							event: "timestore_localstorage",
							info: {
								title: "pljsplayed_" +
									(exist(v
											.cuid) ?
										o
										.d +
										v
										.cuid :
										v
										.id +
										o
										.href2
										),
								value: o
									.playedstore
							}
						}, "*")
				}, this.flag =
				function() {
					return {
						t: n,
						d: s
					}
				}
		},
		ChromeCast = function() {
			var e, t, n, s, a;

			function r() {
				if (g("available"),
					exist(chrome
					.cast) && exist(
						cast) && !o
					.cast_available) {
					var t = "CC1AD845";
					1 == v.chromecast
						.receiver && v
						.chromecast
						.receiverid && (
							t = v
							.chromecast
							.receiverid
							), cast
						.framework
						.CastContext
						.getInstance()
						.setOptions({
							receiverApplicationId: t,
							autoJoinPolicy: "tab_and_origin_scoped",
							language: "en-US",
							resumeSavedSession:
								!1
						}), e = new cast
						.framework
						.RemotePlayer,
						h(), o
						.cast_available = !
						0, setTimeout(l,
							1e3)
				}
			}

			function l() {
				o.controls.Review(), o
					.controls.resize()
			}

			function d(t) {
				cast && cast
					.framework && (g((e
								.isConnected ?
								"" :
								"dis") +
							"connected"
							), e
						.isConnected ?
						c() : u())
			}

			function c(a) {
				var r = cast.framework
					.CastContext
					.getInstance()
					.getCurrentSession(),
					l = "video/mp4";
				"hls" == o.file_type &&
					(l =
						"application/x-mpegurl"),
					"dash" == o
					.file_type && (l =
						"application/dash+xml"
						);
				var d = o.media
					.currentFile();
				exist(v.casturl) && (d =
					v.casturl);
				var c = new chrome.cast
					.media.MediaInfo(d,
						l);
				c.metadata = new chrome
					.cast.media
					.GenericMediaMetadata,
					c.metadata
					.metadataType =
					chrome.cast.media
					.MetadataType
					.GENERIC;
				var $ = [];
				if (exist(o.subs) &&
					exist(o
						.current_subtitle
						) && 1 == v
					.chromecast.sub) {
					for (var f in c
							.textTrackStyle =
							b(), o.subs)
						if (o.subs[f]
							.indexOf(
								"vtt") >
							0) {
							var p =
								new chrome
								.cast
								.media
								.Track(
									0,
									chrome
									.cast
									.media
									.TrackType
									.TEXT
									);
							p.trackContentId =
								o.subs[
									f],
								p
								.trackContentType =
								"text/vtt",
								p
								.subtype =
								"CAPTIONS",
								p.name =
								o
								.files_subtitle[
									f],
								p
								.trackId =
								parseInt(
									f),
								p
								.customData =
								null, $
								.push(p)
						} $.length >
						0 && (c.tracks =
							$)
				}
				v.poster && (c.metadata
						.images = [
							new chrome
							.cast.Image(
								v.poster
								)
						]), c.metadata
					.title = o
					.titlestore ? o
					.titlestore : v
					.title ? v.title :
					"";
				var _ = new chrome.cast
					.media.LoadRequest(
						c);
				_.currentTime = o
					.seekto > 0 ? o
					.seekto : o
					.casting ? 0 : o
					.media.time(), _
					.autoplay = o
					.play || !0 == a, $
					.length > 0 && o
					.current_subtitle >
					-1 && o
					.current_subtitle <
					$.length && (_
						.activeTrackIds = [
							parseInt(o
								.current_subtitle
								)
						], g(
							"subtitle " +
							o
							.current_subtitle
							)), r
					.loadMedia(_).then(
						function() {
							g("connected to " +
									(n = r
										.getCastDevice()
										.friendlyName
										)
									),
								0 == v
								.chromecast
								.message ||
								o
								.casting ||
								(s && o
									.frame
									.removeChild(
										s
										),
									s =
									createElement(
										"div"
										),
									css(s, {
										position: "absolute",
										top: "20px",
										width: "100%",
										left: 0,
										opacity: .7,
										color: "#fff",
										"pointer-events": "none"
									}),
									s
									.innerHTML =
									"<center>" +
									Lang(
										"castdevice"
										) +
									" &laquo;" +
									n +
									"&raquo;</center>",
									o
									.frame
									.appendChild(
										s
										)
									), e
								.volumeLevel =
								v
								.volume,
								t
								.setVolumeLevel(),
								o
								.muted &&
								!e
								.isMuted &&
								t
								.muteOrUnmute(),
								js(
									"casted"),
								!0 !=
								a && (o
									.play ?
									o
									.media
									.Pause() :
									e
									.isPaused ||
									t
									.playOrPause()
									),
								hide(o
									.mediacontainer
									), o
								.casting = !
								0
						},
						function(e) {
							g(e), u(), o
								.alert
								.txt(
									Lang(
										"casterror"
										)
									)
						})
			}

			function u() {
				s && o.frame
					.removeChild(s), s =
					void 0, o
					.casting = !1, show(
						o.mediacontainer
						), js(
						"uncasted"), e
					.savedPlayerState &&
					(o.actions.Seek(e
							.savedPlayerState
							.currentTime
							), e
						.savedPlayerState
						.isPaused ? o
						.media.Pause() :
						o.media.Play())
			}

			function $() {
				e.isPaused ? (g(
					"pause"), js(
						"castpause"
						), o
					.controls
					.Pause()) : (g(
						"play"), js(
						"castplay"),
					o.controls
					.Play())
			}

			function f() {
				o.actions.Volume(e
					.volumeLevel)
			}

			function p() {
				e.isMuted ? o.actions
					.Mute() : o.actions
					.Unmute()
			}

			function _() {
				e.isConnected && null ==
					e.playerState && e
					.currentTime == e
					.duration && (o
						.controls
						.Pause(), o
						.media.onEnded()
						)
			}

			function h() {
				(t = new cast.framework
					.RemotePlayerController(
						e))
				.addEventListener(cast
						.framework
						.RemotePlayerEventType
						.IS_CONNECTED_CHANGED,
						d), t
					.addEventListener(
						cast.framework
						.RemotePlayerEventType
						.IS_PAUSED_CHANGED,
						$), t
					.addEventListener(
						cast.framework
						.RemotePlayerEventType
						.VOLUME_LEVEL_CHANGED,
						f), t
					.addEventListener(
						cast.framework
						.RemotePlayerEventType
						.IS_MUTED_CHANGED,
						p), t
					.addEventListener(
						cast.framework
						.RemotePlayerEventType
						.PLAYER_STATE_CHANGED,
						_)
			}

			function g(e) {
				v.chromecast && 1 == v
					.log && log(
						"chromecast", e)
			}

			function m() {
				if (e.isConnected) {
					var t = b(),
						n = new chrome
						.cast.media
						.EditTracksInfoRequest(
							[parseInt(o
								.current_subtitle
								)], t);
					cast.framework
						.CastContext
						.getInstance()
						.getCurrentSession()
						.getSessionObj()
						.media[0]
						.editTracksInfo(
							n,
							function() {
								g("subtitle " +
									o
									.current_subtitle
									)
							},
							function(
							e) {
								g("subtitle error" +
									e
									)
							})
				}
			}

			function b() {
				var e = new chrome.cast
					.media
					.TextTrackStyle,
					t = Math.round(255 *
						v.sub_bga)
					.toString(16);
				return e
					.backgroundColor =
					CheckColor(v
						.sub_bgcolor) +
					(1 == t.length ? t +
						"0" : t), e
					.edgeColor =
					"#00000016", e
					.edgeType =
					"DROP_SHADOW", e
					.fontFamily =
					"CASUAL", e
					.fontScale =
					parseFloat(parseInt(
						v
						.sub_sizeproc
						) / 100), e
					.foregroundColor =
					CheckColor(v
						.sub_color) +
					Math.round(255)
					.toString(16), e
			}
			window
				.__onGCastApiAvailable =
				function(e, t) {
					if (e)
						for (var n =
							0; n <
							pljssglobal
							.length; n++
							)
							pljssglobal[
								n].api(
								"castinit"
								);
					else g("error: " +
						t)
				}, this.init =
				function() {
					r()
				}, Script(
					"gstatic.com/cv",
					"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
					), this.button =
				function(e) {
					return a = e,
						"<button is='google-cast-button' id='pjs_cast_button_" +
						v.id +
						"' style='padding:0;width:20px;height:20px;--connected-color:" +
						e +
						";--disconnected-color:" +
						e +
						";border:0;background:transparent;pointer-events:auto;cursor:pointer'></button>"
				}, this.Color =
				function(e, t) {
					if (a != t) {
						var n = document
							.getElementById(
								"pjs_cast_button_" +
								v.id);
						if (n) {
							var s = n
								.getAttribute(
									"style"
									),
								r =
								RegExp(
									a,
									"gi"
									);
							s = s
								.replace(
									r, t
									), n
								.setAttribute(
									"style",
									s)
						}
						a = t
					}
				}, this.Volume =
				function(n) {
					e.isConnected && (e
						.volumeLevel =
						n, t
						.setVolumeLevel()
						)
				}, this.Mute =
				function() {
					e.isConnected && !e
						.isMuted && t
						.muteOrUnmute()
				}, this.Unmute =
				function() {
					e.isConnected && e
						.isMuted && t
						.muteOrUnmute()
				}, this.Play = function(
					n) {
					e.isConnected && (e
						.isPaused ?
						t
						.playOrPause() :
						e
						.playerState
						)
				}, this.Pause =
				function(n) {
					e.isConnected && !e
						.isPaused && t
						.playOrPause()
				}, this.Sub =
			function() {
					1 == v.chromecast
						.sub && m()
				}, this.Time = function(
					t) {
					var t;
					return e
						.isConnected &&
						(t = e
							.currentTime
							), t
				}, this.Duration =
				function(t) {
					var t;
					return e
						.isConnected &&
						(t = e
						.duration), t
				}, this.Exit =
				function() {
					cast && cast
						.framework &&
						u()
				}, this.Go =
			function() {
					cast && cast
						.framework && e
						.isConnected &&
						c(o.play)
				}, this.Seek = function(
					n) {
					e.isConnected && (e
						.currentTime =
						n, t.seek())
				}
		},
		PluginSub = function() {
			var e, t = [],
				n = [],
				s = !0,
				a = -1;

			function r(t) {
				if (t || (t = ""),
					"11" != t) {
					var n = 0,
						s = !0,
						a = "";
					o.subs = t.split(
							","), o
						.files_subtitle = [],
						o
						.current_subtitle = -
						1,
						StorageSupport() &&
						1 == v
						.sub_store ?
						null !=
						getCookie(
							"pljssubtitle"
							) && (a =
							getCookie(
								"pljssubtitle"
								)) : o
						.remember_sub &&
						(a = o
							.remember_sub
							);
					for (var r = 0; r <
						o.subs
						.length; r++)
						0 == o.subs[r]
						.indexOf(
						"#0") && (o
							.subs[r] =
							fd0(o.subs[
								r])),
						0 == o.subs[r]
						.indexOf("#" + v
							.enc2) && (o
							.subs[r] =
							o[o.fd[0]](o
								.subs[r]
								)), 0 ==
						o.subs[r]
						.indexOf("#" + v
							.enc3) && o
						.subs[r]
						.indexOf(v
							.file3_separator
							) > 0 && (o
							.subs[r] =
							o[o.fd[1]](o
								.subs[r]
								)), 0 ==
						o.subs[r]
						.indexOf("[") &&
						o.subs[r]
						.indexOf("]") >
						1 ? (o
							.files_subtitle[
								r] = o
							.subs[r]
							.substr(o
								.subs[r]
								.indexOf(
									"["
									) +
								1, o
								.subs[r]
								.indexOf(
									"]"
									) -
								1), o
							.subs[r] = o
							.subs[r]
							.substr(o
								.subs[r]
								.indexOf(
									"]"
									) +
								1),
							s = !1) : (o
							.files_subtitle[
								r] = o
							.subs[r]
							.substr(o
								.subs[r]
								.lastIndexOf(
									"/"
									) +
								1), o
							.files_subtitle[
								r] = o
							.files_subtitle[
								r]
							.substr(0, o
								.files_subtitle[
									r]
								.lastIndexOf(
									".")
								)), 0 ==
						o.subs[r]
						.indexOf(
						"#0") && (o
							.subs[r] =
							fd0(o.subs[
								r])),
						0 == o.subs[r]
						.indexOf("#" + v
							.enc2) && (o
							.subs[r] =
							o[o.fd[0]](o
								.subs[r]
								)), 0 ==
						o.subs[r]
						.indexOf("#" + v
							.enc3) && o
						.subs[r]
						.indexOf(v
							.file3_separator
							) > 0 && (o
							.subs[r] =
							o[o.fd[1]](o
								.subs[r]
								));
					o.files_subtitle
						.length > 1 &&
						1 == v
						.sub_all && (o
							.files_subtitle
							.push(
								StringVar(
									"sub_all_title",
									Lang(
										"together"
										)
									)),
							o.subs.push(
								"all")),
						o.files_subtitle
						.length > 0 &&
						1 == v
						.sub_off && (
							1 == v
							.sub_off0 ?
							(e = 0, n++,
								o
								.files_subtitle
								.unshift(
									StringVar(
										"sub_off_title",
										Lang(
											"off"
											)
										)
									), o
								.subs
								.unshift(
									"")
								) : (o
								.files_subtitle
								.push(
									StringVar(
										"sub_off_title",
										Lang(
											"off"
											)
										)
									), o
								.subs
								.push(
									""),
								e = o
								.files_subtitle
								.length -
								1));
					for (var r = 0; r <
						o.subs
						.length; r++)
						exist(v
							.default_subtitle
							) && v
						.default_subtitle ==
						o
						.files_subtitle[
							r] && (n =
							r, o
							.current_subtitle =
							r, v
							.subtitle_start =
							1), "" !=
						a && a == o
						.files_subtitle[
							r] && (n =
							r, o
							.current_subtitle =
							r);
					1 == v.sub_off &&
						0 == v
						.subtitle_start &&
						(o.current_subtitle =
							e), exist(o
							.controls
							) && o
						.controls
						.SubtitleChanged(),
						1 == v
						.subtitle_start ?
						(o.current_subtitle =
							n, 1 == v
							.sub_all &&
							"all" == o
							.subs[n] ?
							d(o
								.current_subtitle) :
							l(o
								.current_subtitle)
							) : (s && o
							.subs
							.length <
							3 && l(0 ==
								e ? 1 :
								0), 1 !=
							v.sub_off &&
							(o.current_subtitle = -
								1))
				} else y()
			}

			function l(e) {
				exist(o.subs[e]) && (o
					.subs[e]
					.indexOf(".") >
					-1 ? (o.subsor =
						o.subs[e]
						.split(
							" or "),
						o.sub_or =
						0, c(e)) :
					0 == o.subs[e]
					.indexOf(
					"upld") && n[o
						.subs[e]
						.substr(4)
						] && $(o
						.files_subtitle[
							e], n[o
							.subs[e]
							.substr(
								4)])
					)
			}

			function d(e) {
				t[e] = {}, t[e][0] = [],
					t[e][1] = [];
				for (var n = 0; n < o
					.subs.length; n++)
					setTimeout(l, 500 *
						n, n)
			}

			function c(e) {
				var t = trim(o.subsor[o
						.sub_or]),
					n = XHR(t);
				a = e, o.subload = 1, n
					.onload =
				function() {
						o.subload = 0,
							4 == this
							.readyState &&
							200 == this
							.status ? (o
								.subtitle_on = !
								0, $(t,
									this
									.responseText,
									e)
								) : o
							.sub_or +
							1 < o.subsor
							.length ? (o
								.sub_or++,
								c(a)) :
							u(
								"loading_error")
					}, n.onerror =
					function(e) {
						o.subload = 0, o
							.sub_or +
							1 < o.subsor
							.length ? (o
								.sub_or++,
								c(a)) :
							u(
								"loading_error")
					}, n.send()
			}

			function u(e) {
				log("subtitle not found or access denied"),
					o.files_subtitle[o
						.current_subtitle
						] && -1 == o
					.files_subtitle[o
						.current_subtitle
						].indexOf(Lang(
						"loading_error"
						)) && (o
						.files_subtitle[
							o
							.current_subtitle
							] = o
						.files_subtitle[
							o
							.current_subtitle
							] + " (" +
						Lang(e) + ")"),
					1 == v
					.subtitle_errdel &&
					a > -1 && (o.subs[
						a] = "", o
						.files_subtitle[
							a] = ""), o
					.current_subtitle = -
					1, o.subtitle_on = !
					1, o.constrols ? (o
						.controls
						.SubtitleChanged(),
						o.controls
						.refresh()) :
					setTimeout(
					function() {
						o.controls &&
							(o.controls
								.SubtitleChanged(),
								o
								.controls
								.refresh()
								)
					}, 100), exist(o
						.subtitle) && (o
						.frame
						.removeChild(o
							.subtitle),
						o.subtitle =
						null)
			}

			function $(e, n, s) {
				if (0 == n.indexOf("#" +
						v.enc2) && (n =
						o[o.fd[0]](n)),
					0 == n.indexOf("#" +
						v.enc3) && n
					.indexOf(v
						.file3_separator
						) > 0 && (n = o[
						o.fd[1]](n)), e
					.indexOf(".srt") > -
					1 || e.indexOf(
						".ass") > -1 ||
					e.indexOf(".ssa") >
					-1 || e.indexOf(
						".vtt") > -1) {
					var a = o
						.current_subtitle;
					exist(t[a]) &&
						"all" == o.subs[
							a] || (t[
							a] = {}, t[
								a][
							0] = [], t[
								a][
							1] = []);
					var l = [];
					l = n.split(
					/\r|\n/);
					var d = 1,
						c = 0,
						$ = 0,
						p = exist(v
							.subshift) ?
						v.subshift : 0;
					for (e.indexOf(
							"shift=") >
						0 && (p = 1 * e
							.substr(e
								.indexOf(
									"shift="
									) +
								6)), i =
						0; i < l
						.length; i++) {
						if (e.indexOf(
								".srt"
								) > -
							1 || e
							.indexOf(
								".vtt"
								) > -1
							) {
							if (l[i]
								.indexOf(
									"-->"
									) >
								-1 && l[
									i]
								.indexOf(
									":"
									) >
								-1) {
								0 == (c =
										1 *
										f(l[i]
											.substr(
												0,
												l[
													i]
												.indexOf(
													"-->"
													)
												)
											) +
										p
										) &&
									(c =
										1),
									$ =
									1 *
									f(l[i]
										.substr(
											l[
												i]
											.indexOf(
												"-->"
												) +
											4,
											12
											)
										) +
									p,
									exist(
										t[
											a]
										[
											0]
										[
											c]
										) ||
									(t[a]
										[
											0]
										[
											c] =
										""
										);
								for (var _ =
										c; _ <
									$; _++
									) t[
										a]
									[1][
										_] =
									c;
								d++
							} else l[
								i] =
								trim(l[
									i]),
								"" != l[
									i
									] &&
								l[i]
								.length >
								0 && l[
									i] !=
								d &&
								"WEBVTT" !=
								l[i] &&
								(t[a][0]
									[
									c] =
									(t[a]
										[
											0]
										[
											c] &&
										"" !=
										t[
											a]
										[
											0]
										[
											c] ?
										t[
											a]
										[
											0]
										[
											c] +
										"<br>" :
										""
										) +
									("all" ==
										o
										.subs[
											a
											] &&
										s >
										0 ?
										"[sub2]" :
										""
										) +
									l[
									i] +
									("all" ==
										o
										.subs[
											a
											] &&
										s >
										0 ?
										"[/sub2]" :
										""
										)
									)
						}
						if ((e.indexOf(
									".ass"
									) >
								-1 || e
								.indexOf(
									".ssa"
									) >
								-1) &&
							l[i]
							.indexOf(
								"Dialogue:"
								) > -1
							) {
							c = 1 * f(l[
										i]
									.substr(
										e
										.indexOf(
											".ssa"
											) >
										-
										1 ?
										l[
											i]
										.indexOf(
											"=0"
											) +
										3 :
										12,
										12
										)
									) +
								p, $ =
								1 * f(l[
										i]
									.substr(
										e
										.indexOf(
											".ssa"
											) >
										-
										1 ?
										l[
											i]
										.indexOf(
											"=0"
											) +
										14 :
										23,
										10
										)
									) +
								p;
							var h = "";
							l[i].indexOf(
									"0,,"
									) >
								0 ? h =
								l[i]
								.substr(
									l[i]
									.indexOf(
										"0,,"
										) +
									3) :
								l[i]
								.indexOf(
									"ffect,"
									) >
								0 && (
									h =
									l[i]
									.substr(
										l[
											i]
										.indexOf(
											"ffect,"
											) +
										6
										)
									),
								void 0 !=
								t[a][0][
									c
								] ? t[a]
								[0][
								c] +=
								"\n" + (
									"all" ==
									o
									.subs[
										a
										] &&
									s >
									0 ?
									"[sub2]" :
									""
									) +
								h + (
									"all" ==
									o
									.subs[
										a
										] &&
									s >
									0 ?
									"[/sub2]" :
									""
									) :
								t[a][0][
									c
								] = h,
								t[a][0][
									c
								] = t[a]
								[0][c]
								.replace(
									/{.*?}/,
									""),
								t[a][0][
									c
								] = t[a]
								[0][c]
								.replace(
									/\\\\N/,
									"<br>"
									),
								t[a][0][
									c
								] = t[a]
								[0][c]
								.replace(
									/\\N/,
									"<br>"
									);
							for (var _ =
									c; _ <
								$; _++)
								t[a][1][
									_
								] = c
						}
					}
					o.controls
						.SubtitleChanged(),
						o.actions
						.RenewSubtitle(),
						o.controls
						.refresh()
				} else "" != n ? 0 == n
					.indexOf("[") ? r(
					n) : u("error") : (
						y(), o.controls
						.refresh())
			}

			function f(e) {
				var t = e.split(":"),
					n = 0;
				return 2 == t.length &&
					t.unshift("00"),
					"00" != t[0] && (
						n += 3600 * t[0]
						), "00" != t[
					1] && (n += 60 * t[
						1]), n += 1 * t[
						2].substr(0, 2),
					n = 10 * n + 1 * t[
						2].substr(3, 1)
			}

			function p(t) {
				exist(o
						.current_subtitle) &&
					(o.current_subtitle !=
						t ? -1 == t ||
						1 == v
						.sub_off && t ==
						e ? h() : (v
							.sub_shift =
							0, o
							.current_subtitle =
							t, o
							.subtitle_on = !
							0, v
							.subtitle_start =
							1, _(t), js(
								"subtitle",
								o
								.files_subtitle[
									t]),
							o.controls
							.SubtitleChanged()
							) : 1 != v
						.sub_off && h())
			}

			function _(e) {
				exist(o.subs[e]) && (
					log("Subtitle",
						e), o
					.current_subtitle =
					e, exist(o
						.files_subtitle[
							e]) && (
						o.storage &&
						1 == v
						.sub_store ?
						setCookie(
							"pljssubtitle",
							o
							.files_subtitle[
								e]
							) : o
						.remember_sub =
						o
						.files_subtitle[
							e]),
					"hls" == o
					.file_type && !
					0 == o
					.hls_subs ? o
					.media
					.hlsDashSub(e,
						"hls") :
					"dash" == o
					.file_type && !
					0 == o
					.dash_subs ? o
					.media
					.hlsDashSub(e,
						"dash") :
					"all" == o.subs[
						e] ? d(o
						.current_subtitle
						) : l(o
						.current_subtitle
						))
			}

			function h() {
				js("subtitle", "off"), o
					.current_subtitle =
					1 == v.sub_off ? e :
					-1, v
					.subtitle_start = 0,
					o.subtitle_on = !1,
					o.controls
					.SubtitleChanged(),
					(o.hls_subs || o
						.dash_subs) &&
					_(o
						.current_subtitle),
					exist(o.subtitle) &&
					o.frame.removeChild(
						o.subtitle), o
					.subtitle = null
			}

			function g(e) {
				if (v.sub_shift && (e -=
						1 * v.sub_shift
						), o
					.subtitle_on &&
					exist(o.subs) && t
					) {
					var n = o
						.current_subtitle;
					if ((1 != v
							.subpausehide ||
							o.play) &&
						exist(t[n]) &&
						exist(t[n][1])
						) {
						var a =
							parseInt(
								10 * e);
						if (exist(t[n][
								1][
								a])) {
							var r = "";
							r = t[n][0][
									t[n]
									[1][
										a]
								],
								exist(o
									.subtitle
									) ||
								(o.subtitle =
									createElement(
										"div"
										),
									o
									.frame
									.appendChild(
										o
										.subtitle
										),
									m()
									),
								s &&
								show2(o
									.subtitle
									),
								b(),
								1 == v
								.sub_split2words &&
								(r = PluginSubword(
									r
									)),
								1 == v
								.sub_all &&
								(r = (r =
										r
										.replace(
											/\[sub2\]/gm,
											'<span style="color:' +
											CheckColor(
												v
												.sub_color2
												) +
											'">'
											)
										)
									.replace(
										/\[\/sub2\]/gm,
										"</span>"
										)
									), o
								.subtitle
								.innerHTML =
								'<span style="' +
								(1 == v
									.sub_bg ?
									"background-color:" +
									hexToRGBA(
										v
										.sub_bgcolor,
										v
										.sub_bga
										) +
									";" :
									""
									) +
								"-webkit-box-decoration-break: clone;color:" +
								CheckColor(
									v
									.sub_color
									) +
								";padding:" +
								v
								.sub_bgpadding +
								"px " +
								2 * v
								.sub_bgpadding +
								"px;border-radius:" +
								v
								.sub_bgo +
								"px;margin:0 0;line-height:" +
								(v.sub_lineheight ?
									v
									.sub_lineheight :
									1.8
									) +
								";font-weight:" +
								v
								.sub_weight +
								'">' +
								trim(
								r) +
								"</span>",
								1 == v
								.sub_big_fullscreen &&
								(o.fullscreen ?
									css(o
										.subtitle, {
											"font-size": v
												.sub_size_fullscreen +
												(parseInt(
														v
														.sub_sizeproc
														) -
													100
													) *
												v
												.sub_size_fullscreen /
												100 +
												"px"
										}
										) :
									css(o
										.subtitle, {
											"font-size": v
												.sub_size +
												(parseInt(
														v
														.sub_sizeproc
														) -
													100
													) *
												v
												.sub_size /
												100 +
												"px"
										}
										)
									),
								s = !1
						} else !s &&
							exist(o
								.subtitle
								) && (o
								.subtitle
								.innerHTML =
								"",
								s = !0,
								hide2(o
									.subtitle
									))
					}
				}
			}

			function m() {
				o.subtitle && (css(o
						.subtitle, {
							position: "absolute",
							width: "100%",
							"padding-left": "10%",
							"padding-right": "10%",
							left: 0,
							color: v
								.sub_color,
							"text-align": "center",
							"box-sizing": "border-box"
						}), 1 == v
					.sub_fonted &&
					exist(v
						.sub_font) &&
					"" != v
					.sub_font &&
					css(o
					.subtitle, {
						"font-family": v
							.sub_font
					}), 1 == v
					.sub_shadow ?
					css(o
					.subtitle, {
						"text-shadow": "1px 1px 2px black"
					}) : css(o
						.subtitle, {
							"text-shadow": "none"
						}), 1 == v
					.sub_drag ?
					PluginMovable(o
						.subtitle,
						"o.subdrag"
						) : css(o
						.subtitle, {
							"pointer-events": "none"
						}))
			}

			function b() {
				o.subdrag || (o.controls
					.ToolbarHidden() ||
					v.sub_bottom > v
					.toolbar.h ?
					css(o
					.subtitle, {
						position: "absolute",
						top: "auto",
						left: 0,
						bottom: 1 *
							v
							.sub_bottom
					}) : css(o
						.subtitle, {
							position: "absolute",
							top: "auto",
							left: 0,
							bottom: 1 *
								v
								.sub_bottom +
								1 *
								v
								.toolbar
								.h
						}))
			}

			function y() {
				o.current_subtitle = -1,
					o.subtitle_on = !1,
					o.thumbs_on = !1, v
					.subtitle = null, v
					.thumbnails = null,
					o.sub = null, o
					.subs = null, exist(
						o.controls) && o
					.controls
					.SubtitleChanged(),
					o.files_subtitle =
					null, exist(o
						.subtitle) && (o
						.frame
						.removeChild(o
							.subtitle),
						o.subtitle =
						null), o
					.current_subtitle =
					null, o
					.subtitle_on = !1
			}
			this.start = function(e) {
					r(e)
				}, this.SubUpload =
				function() {
					if (o.subupld) {
						var t = o
							.subupld
							.files;
						if (t[0]) {
							var s =
								new FileReader;
							s.onload =
								function(
									s) {
									var a =
										s
										.target
										.result;
									n.push(
											a),
										o
										.current_subtitle = -
										1;
									var a =
										t[
											0]
										.name;
									a.length >
										40 &&
										(a = t[
												0]
											.name
											.substr(
												0,
												15
												) +
											"..." +
											t[
												0]
											.name
											.substr(
												-
												15
												)
											),
										1 ==
										v
										.sub_off &&
										1 ==
										v
										.sub_off0 ?
										(o.subs
											.push(
												"upld" +
												(n.length -
													1
													)
												),
											o
											.files_subtitle
											.push(
												a +
												""
												),
											p(o.subs
												.length -
												1
												)
											) :
										(o.subs
											.unshift(
												"upld" +
												(n.length -
													1
													)
												),
											o
											.files_subtitle
											.unshift(
												a +
												""
												),
											1 ==
											v
											.sub_off &&
											e++,
											p(
												0)
											),
										o
										.subupld
										.value =
										""
								}, s
								.readAsText(
									t[0]
									)
						} else o.subupld
							.click()
					}
				}, this.SetSubtitle =
				function(e) {
					p(e)
				}, this.ioff =
				function() {
					return e
				}, this.show = function(
					e) {
					g(e)
				}, this.style =
				function() {
					m()
				}, this.remove =
				function() {
					y()
				}
		},
		PluginRounding = function() {
			o.oo = createElement("div");
			var e = v.rounding,
				t = [];
			t[1] = createElement("div"),
				t[1].innerHTML =
				'<svg><path d="M0,0 L' +
				e + ",0 Q0,0 0," + e +
				' Z" fill="' + v
				.bgcolor + '"/></svg>',
				t[2] = createElement(
					"div"), t[2]
				.innerHTML =
				'<svg><path d="M0,0 L' +
				e + ",0 L" + e + "," +
				e + " Q" + e +
				',0 0,0 Z" fill="' + v
				.bgcolor + '"/></svg>',
				t[3] = createElement(
					"div"), t[3]
				.innerHTML =
				'<svg><path d="M' + e +
				",0 L" + e + "," + e +
				" L0," + e + " Q" + e +
				"," + e + " " + e +
				',0 Z" fill="' + v
				.bgcolor + '"/></svg>',
				t[4] = createElement(
					"div"), t[4]
				.innerHTML =
				'<svg><path d="M0,0 Q0,' +
				e + " " + e + "," + e +
				" L0," + e +
				' Z" fill="' + v
				.bgcolor + '"/></svg>',
				css(o.oo, {
					position: "absolute",
					top: 0,
					left: 0,
					"pointer-events": "none",
					height: "auto",
					overflow: "hidden",
					width: "100%",
					height: "100%"
				}), o.oo.style.zIndex =
				2e3, css(t[1], {
					position: "absolute",
					top: 0,
					left: 0
				}), css(t[2], {
					position: "absolute",
					top: 0,
					right: 0
				}), css(t[3], {
					position: "absolute",
					bottom: 0,
					right: 0
				}), css(t[4], {
					position: "absolute",
					bottom: 0,
					left: 0
				});
			for (var n = 1; n < 5; n++)
				css(t[n], {
					width: e,
					height: e,
					"line-height": 0
				}), o.oo.appendChild(t[
					n]);
			o.container.appendChild(o
				.oo)
		},
		PluginPoints = function(control,
			points, w, style) {
			v.pointed = 1;
			var style = style,
				w = w,
				over = -1,
				pointscontrol =
				createElement("div");

			function Update(w) {
				if (points)
					for (var i = 0; i <
						points
						.length; i++)
						pointscontrol
						.removeChild(
							points[i]);
				if (points = [], v
					.points) {
					"string" == typeof v
						.points && (v
							.points =
							eval(v
								.points)
							);
					for (var i = 0; i <
						Object.keys(v
							.points)
						.length; i++)
						exist(v.points[
							i].time) &&
						(points[i] =
							createElement(
								"div"),
							css(points[
								i], {
								position: "absolute",
								left: 0,
								top: -
									style
									.h /
									2,
								height: style
									.h,
								opacity: existv(
									v
									.points[
										i
										]
									.opacity,
									style
									.pointa
									),
								"pointer-events": "none",
								display: "none",
								"background-color": existv(
									v
									.points[
										i
										]
									.color,
									style
									.pointcolor
									),
								transition: "opacity 0.1s linear,transform 0.2s ease-in-out"
							}), points[
								i]
							.time = v
							.points[i]
							.time,
							points[i]
							.w = v
							.points[i]
							.width,
							points[i]
							.text = v
							.points[i]
							.text,
							pointscontrol
							.appendChild(
								points[
									i])
							);
					Place(w)
				}
			}

			function Place(e) {
				var t = o.media
					.duration();
				if ("midrolls" in o.u) {
					if (0 != o.u
						.midrolls)
						for (var n =
							0; n <
							points
							.length; n++
							)
							if (t > 0) {
								var s =
									existv(
										points[
											n
											]
										.w,
										style
										.pointw
										);
								pd = s;
								var a =
									points[
										n
										]
									.time;
								String(
										s)
									.indexOf(
										"s"
										) >
									0 ?
									s =
									(pd =
										1 *
										s
										.substr(
											0,
											String(
												s
												)
											.indexOf(
												"s"
												)
											)
										) /
									t *
									e :
									a =
									t /
									100 *
									points[
										n
										]
									.time,
									points[
										n
										]
									.text &&
									(points[
											n]
										.dur =
										a +
										pd
										);
								let r =
									e *
									(a /
										t) -
									e /
									2;
								css(points[
									n], {
									left: r,
									width: s,
									display: "block"
								})
							} else
								hide2(
									points[
										n
										]
									)
				}
			}

			function Tip(e) {
				var t = "";
				if (overed = !1, exist(
						e)) {
					for (var o = 0; o <
						points
						.length; o++)
						points[o]
						.text && points[
							o].dur &&
						e >= points[o]
						.time && e <
						points[o].dur &&
						(t = '<hdvbplayer style="line-height:1.2;' +
							(exist(v.points[
										o
										]
									.textstyle
									) ?
								v
								.points[
									o]
								.textstyle :
								"") +
							'">' +
							points[o]
							.text
							.replace(
								/ /g,
								"&nbsp;"
								) +
							"</hdvbplayer>",
							over != o &&
							(-1 !=
								over &&
								css(points[
									over
									], {
									opacity: existv(
										v
										.points[
											over
											]
										.opacity,
										style
										.pointa
										),
									transform: "scaleY(1)"
								}), css(
									points[
										o
										], {
										opacity: 1,
										transform: "scaleY(2)"
									}),
								over = o
								),
							overed = !0
							);
					overed || Out()
				}
				return t
			}

			function Out() {
				over > -1 && (css(
						points[
						over], {
							opacity: existv(
								v
								.points[
									over
									]
								.opacity,
								style
								.pointa
								),
							transform: "scaleY(1)"
						}), over = -
					1)
			}
			Pos0(pointscontrol), control
				.appendChild(
					pointscontrol),
				exist(v.points) &&
				Update(w), this.place =
				function(e) {
					Place(e)
				}, this.update =
				function(e) {
					Update(e)
				}, this.tip = function(
					e) {
					return Tip(e)
				}, this.out =
			function() {
					Out()
				}
		},
		PluginBlock = function() {
			var e =
				"https://googleads.g.doubleclick.net/" +
				Math.random().toString(
					36).substring(7),
				t = e + "",
				n = {
					method: "HEAD",
					mode: "no-cors"
				};
			if (v.preroll && 1 != v
				.default_adb && (v
					.preroll.indexOf(
						"//") > -1 && (
						e = v.preroll
						.substr(v
							.preroll
							.lastIndexOf(
								"//"))),
					e.indexOf("[") >
					0 && (e = e.substr(
						0, e
						.indexOf(
							"["))), e !=
					t && (n = {
						method: "GET"
					})), exist(window
					.fetch) && exist(
					window.Request)) {
				var s = new Request(e,
					n);
				fetch(s).then(function(
					e) {
					void 0 !==
						e || (o
							.ab = !
							0, o
							.controls &&
							o
							.controls
							.refresh()
							)
				}).catch(function(
				e) {
					o.ab = !0, o
						.controls &&
						o
						.controls
						.refresh()
				})
			}
		};

	function PluginDroplist() {
		var e, t = -1,
			n = [],
			s = [],
			a = [],
			r = [],
			l = [],
			d = 4,
			c = 0,
			u = v.playlist;
		u.dropcolor || (u.dropcolor =
				"ffffff"), u
			.dropbgcolor || (u
				.dropbgcolor = "ff0000"
				);
		var $ = 1 == u.dropclrs ? u
			.dropcolor : u.color,
			f = 1 == u.dropclrs ? u
			.dropbgcolor : u.bgcolor;
		pushCSS(".pjspl" + v.id +
				"scroll::-webkit-scrollbar {width: " +
				parseFloat(.3 * existv(u
					.dropscrlw, 1)) +
				"rem;}.pjspl" + v.id +
				"scroll::-webkit-scrollbar-track {background:" +
				hex2rgb(u.bgcolor, u
					.bga) + "}.pjspl" +
				v.id +
				"scroll::-webkit-scrollbar-thumb {background:#" +
				u.valuecolor + "}"), u
			.arrowsize = 4;
		var p = "<svg width='" + (2 * u
				.arrowsize + 2) +
			"' height='" + (1.2 * u
				.arrowsize + 1) +
			"' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' style='pointer-events:none;transition:transform 0.2s ease-out;position: absolute;bottom: 50%;margin-bottom:-" +
			(1.2 * u.arrowsize + 2) /
			2 + "px;right:" + (u
				.paddingright / 2 + u
				.arrowsize / 2) +
			"px'><g><line x1='1' y1='1' x2='" +
			(u.arrowsize + 1) +
			"' y2='" + 1.2 * u
			.arrowsize + "' stroke='#" +
			$ +
			"' stroke-width='1' stroke-linecap='round'/><line x1='" +
			(u.arrowsize + 1) +
			"' y1='" + 1.2 * u
			.arrowsize + "' x2='" + (2 *
				u.arrowsize + 1) +
			"' y2='1' stroke='#" + $ +
			"' stroke-width='1' stroke-linecap='round'/></g></svg>";
		if (o.playlist_dic) {
			for (var _ = 0; _ <
				d; _++) {
				n[_] = createElement(
						"div"),
					createElement(
					"div"), css(n[_], {
						position: "absolute",
						top: u
							.margintop,
						color: u
							.color,
						overflow: "hidden",
						"font-family": checkFont(
							u
							.font
							),
						"border-radius": u
							.rounding +
							"px",
						zIndex: 1e3
					}), o.frame
					.appendChild(n[_]),
					s[_] =
					createElement(
					"div");
				var h = u.headfontsize;
				u.dropfontsize > 0 && (
						h = u
						.dropfontsize, u
						.dropsmallfontsize >
						0 && o.small &&
						(h = u
							.dropsmallfontsize
							)), css(s[
						_], {
							display: "block",
							"font-size": h *
								existv(v
									.globalfs,
									1)
						}), n[_]
					.appendChild(s[_]),
					a[_] =
					createElement(
					"div"), css(a[_], {
						display: "block",
						transition: "height 0.1s ease-out",
						"font-size": u
							.fontsize *
							existv(v
								.globalfs,
								1)
					}), a[_].classList
					.add("pjspl" + v
						.id + "scroll"),
					a[_]
					.addEventListener(
						"wheel", T, {
							passive: !1
						}), n[_]
					.appendChild(a[_])
			}
			0 == o.plopenid && (o
					.plopenid = o.plid),
				g(), z(0)
		}

		function g() {
			for (var e = 0; e < d; e++)
				a[e].innerHTML = "", s[
					e].innerHTML = "";
			var t = o.playlist_dic[o
				.plopenid];
			b(m(t, 0), 0), b(m(t, 1),
				1), b(m(t, 2), 2), b(m(
					t, 3), 3), E()
		}

		function m(e, t) {
			for (var n = 0; n <
				t; n++) {
				if ("" == e
					.pjs_parent) {
					e = -1;
					break
				} - 1 != o.playlist_dic[
						e.pjs_parent]
					.pjs_parent && (e =
						o.playlist_dic[e
							.pjs_parent]
						)
			}
			return e
		}

		function b(e, t) {
			if (e) {
				if (-1 == e) hide2(n[
				t]);
				else {
					show2(n[t]);
					var d = [];
					for (var c in d
							.push(e), o
							.playlist_dic)
						o.playlist_dic
						.hasOwnProperty(
							c) && o
						.playlist_dic[c]
						.pjs_parent == e
						.pjs_parent && d
						.push(o
							.playlist_dic[
								c]);
					var _ = y(o.plid);
					o.p.translator =
						parseInt(o
							.playlist_dic[
								o.plid]
							.translator
							);
					for (var h = 0; h <
						d.length; h++) {
						var g =
							createElement(
								"div");
						css(g, {
								display: "block",
								position: "relative",
								cursor: "pointer",
								padding: "5px 10px",
								transition: "color 0.1s ease-out,background 0.2s ease-out",
								"padding-top": u
									.paddingtop,
								"padding-bottom": u
									.paddingbottom,
								"padding-left": u
									.paddingleft,
								"padding-right": u
									.paddingright +
									(o.screen_w >
										400 ?
										3 *
										u
										.arrowsize :
										0
										)
							}), 0 == h ?
							css(g, {
								color: $,
								"background-color": hex2rgb(
									f,
									u
									.bga
									)
							}) : css(
							g, {
								color: u
									.color,
								"background-color": hex2rgb(
									u
									.bgcolor,
									u
									.bga
									)
							}), h > 1 &&
							1 == u
							.borderbottom &&
							css(g, {
								"border-top": "1px solid " +
									hex2rgb(
										u
										.bordercolor,
										.5
										)
							}), _
							.indexOf(d[
									h]
								.id) > -
							1 && h >
							0 && (css(
								g, {
									color: u
										.valuecolor
								}), 1 ==
								u
								.playbgcolored &&
								exist(u
									.playbgcolor
									) &&
								css(g, {
									backgroundColor: u
										.playbgcolor
								})), g
							.innerHTML =
							d[h].title +
							(0 == h && o
								.screen_w >
								400 ?
								p : ""),
							g
							.setAttribute(
								"me", (
									0 ==
									h ?
									"head_" :
									""
									) +
								d[h].id
								), 0 ==
							h ? (_
								.indexOf(
									d[h]
									.id
									) >
								-1 ||
								t > 0 ?
								r[t] =
								d[h]
								.id : g
								.innerHTML =
								"..." +
								p, s[t]
								.appendChild(
									g)
								) : (o
								.plhistory[
									d[h]
									.id
									] &&
								d[h]
								.id != o
								.plid &&
								q(g), a[
									t]
								.appendChild(
									g))
					}
					css(a[t], {
							height: "auto"
						}), l[t] = a[t]
						.offsetHeight,
						css(a[t], {
							height: 0
						}), n[t]
						.addEventListener(
							"click", w),
						n[t]
						.addEventListener(
							"mouseover",
							L), n[t]
						.addEventListener(
							"mouseout",
							S)
				}
			}
		}

		function y(e) {
			var t = o.playlist_dic[e],
				n = [];
			if (t)
				for (var s = 0; s <
					d; s++) n.push(t
					.id), "" != t
					.pjs_parent && (t =
						o.playlist_dic[t
							.pjs_parent]
						);
			return n
		}

		function w(e) {
			var a = e.target;
			"HDVBPLAYER" != a.tagName &&
				(a = a.parentNode),
				"HDVBPLAYER" != a
				.tagName && (a = a
					.parentNode);
			var l = a.parentNode
				.parentNode,
				d = a.getAttribute(
				"me");
			if (d) {
				if (0 == d.indexOf(
						"head_")) {
					var c = -1;
					l == n[0] && (c =
						0), l == n[1] &&
						(c = 1), l == n[
							2] && (c =
							2), C(), c >
						-1 && (t != c ?
							O(c) : t = -
							1)
				} else {
					if (show2(s[t]), r[
							t] == d) {
						if (C(), t >
							0) {
							O(t - 1);
							return
						}
						t = -1
					} else r[t] = d;
					o.playlist_dic[d]
						.folder ? (o
							.controls
							.PlaylistPlayId(
								d), C(),
							t = -1, k()
							) : (C(),
							t = -1, api(
								"play",
								"id:" +
								d))
				}
			}
		}

		function k() {
			for (var e in o
				.playlist_dic)
				if (o.playlist_dic
					.hasOwnProperty(
					e) && o
					.playlist_dic[o
						.plopenid] && o
					.playlist_dic[e]
					.pjs_parent == o
					.playlist_dic[o
						.plopenid].id) {
					if (o.plopenid = o
						.playlist_dic[e]
						.id, g(), o
						.playlist_dic[e]
						.folder) a[0]
						.childNodes
						.length < 2 ?
						k() : O(0);
					else if (1 == u
						.dropautoplay) {
						var t = a[0]
							.childNodes[
								0]
							.getAttribute(
								"me");
						t && api("play",
							"id:" +
							t)
					} else O(0);
					break
				}
		}

		function O(e) {
			css(a[e], {
				height: l[e]
			}), css(a[e], {
				"border-top": "1px solid #" +
					u
					.headbordercolor
			}), css(s[e].childNodes[
				0], {
				"background-color": hex2rgb(
					f, 1)
			}), css(s[e]
				.getElementsByTagName(
					"svg")[0], {
					transform: "scale(-1, -1)"
				}), t = e
		}

		function C() {
			t > -1 && (css(a[t], {
				height: 0
			}), css(a[t], {
				"border-top": "none"
			}), css(s[t]
				.childNodes[
				0], {
					"background-color": hex2rgb(
						f, u
						.bga
						)
				}), css(s[t]
				.getElementsByTagName(
					"svg")[0], {
					transform: "scale(1, 1)"
				}))
		}

		function L(e) {
			var n = e.target,
				s = n.getAttribute(
				"me");
			y(o.plid), s && (-1 == t ||
				0 == s.indexOf(
					"head") ? css(
				n, {
					"background-color": hex2rgb(
						f, 1
						)
				}) : 1 == u
				.playbgcolored &&
				exist(u
				.playbgcolor) &&
				s == r[t] || css(
				n, {
					"background-color": hex2rgb(
						u
						.bgcolorover,
						u
						.bgaover >
						-1 ?
						u
						.bgaover :
						u
						.bga
						)
				}))
		}

		function S(e) {
			var s = e.target,
				a = s.getAttribute(
				"me");
			if (y(o.plid), a) {
				if (-1 == t || 0 == a
					.indexOf("head_")) {
					var l = e.target
						.parentNode
						.parentNode,
						d = -1;
					l == n[0] && (d =
						0), l == n[1] &&
						(d = 1), l == n[
							2] && (d =
							2), css(s, {
							"background-color": hex2rgb(
								f,
								t ==
								d ?
								1 :
								u
								.bga
								)
						})
				} else o.plhistory[a] &&
					a != o.plid && q(s),
					1 == u
					.playbgcolored &&
					exist(u
					.playbgcolor) &&
					a == r[t] || css(
					s, {
						"background-color": hex2rgb(
							u
							.bgcolor,
							u
							.bga
							)
					})
			}
		}

		function T(e) {}

		function E() {
			if (isVisible(n[0])) {
				for (var e = 0, t =
					0; t < s.length; t++
					) s[t]
					.offsetHeight > e &&
					(e = s[t]
						.offsetHeight);
				if (c = o.screen_h - e -
					(o.screen_h > 200 ?
						v.toolbar.h + (o
							.screen_h >
							400 ? 60 :
							30) : 0),
					e > 0 && (c = Math
						.round(c / e) *
						e + (1 == u
							.borderbottom ?
							Math.round(
								c / e) :
							0) - (o
							.screen_h <=
							200 ? 5 : 0)
						), c > 0)
					for (var t = 0; t <
						d; t++) a[t]
						.scrollHeight >
						c ? css(a[t], {
							"overflow-y": "scroll",
							"margin-right": 0,
							"max-height": c
						}) : css(a[t], {
							overflow: "hidden",
							"max-height": "none"
						}), v.playlist
						.position
						.indexOf(
							"right") > -
						1 ? css(n[t], {
							right: u
								.marginright +
								A(t)
						}) : (css(n[
							t], {
								left: u
									.marginleft
							}), t > 0 &&
							css(n[t -
								1], {
									left: u
										.marginleft +
										P(
											t)
								}))
			}
		}

		function P(e) {
			for (var t = 0, s = d -
				1; s >= e; s--) t += n[
				s].offsetWidth + (n[
					s].offsetWidth >
				0 ? u.marginright :
				0);
			return t
		}

		function A(e) {
			for (var t = 0, s = 0; s <
				e; s++) t += n[s]
				.offsetWidth + (n[s]
					.offsetWidth > 0 ? u
					.marginright : 0);
			return t
		}

		function z(e) {
			for (var t = 0; t < d; t++)
				1 == e ? show2(n[t]) :
				hide2(n[t])
		}

		function I(e) {
			return !!(e > -1) && !!(a[e]
				.scrollHeight > c)
		}

		function q(e) {
			css(e, {
					color: u
						.historycolor
				}), 1 == u
				.historytitlestrike &&
				css(e, {
					"text-decoration": "line-through"
				}), u.historytitlea > -
				1 && css(e, {
					opacity: u
						.historytitlea
				}), css(e, {
					backgroundColor: hex2rgb(
						u
						.historybgcolor,
						u
						.historybga >
						-1 ? u
						.historybga :
						u.bga)
				})
		}
		this.OpenScroll = function() {
			return I(t)
		}, this.Hide = function() {
			z(0)
		}, this.Show = function() {
			z(1)
		}, this.Visible =
	function() {
			return t > -1
		}, this.Update =
	function() {
			if (0 != o.plopenid) {
				var e = 0;
				isVisible(n[0]) || (
						e = 1), g(),
					e && z(0)
			}
		}, this.Resize =
	function() {
			clearTimeout(e), e =
				setTimeout(E, 500)
		}, this.Close = function() {
			C(), t = -1
		}, this.Remove =
	function() {
			for (var e = 0; e <
				d; e++) n[e]
				.removeEventListener(
					"click", w), n[
					e]
				.removeEventListener(
					"mouseover", L),
				n[e]
				.removeEventListener(
					"mouseout", S),
				a[e]
				.removeEventListener(
					"wheel", T), o
				.frame.removeChild(
					n[e]), o
				.droplist = void 0
		}
	}
	var PluginHotIcon = function(e, t) {
			var n, s = 2;

			function a() {
				n && (css(n, {
					transform: "scale(" +
						2 *
						s +
						")",
					opacity: 0
				}), setTimeout(
					r, 500))
			}

			function r() {
				n && (o.frame
					.removeChild(n),
					n = null)
			}
			o.screen_w > 500 && (s = 4),
				o.screen_w > 1e3 && (s =
					5), 1 == v.hotkey[
					e + "icon"] && (v
					.hotkey[e + t +
						"icon"] ||
					"volume" == e) && (
					"" != v.hotkey[e +
						t + "icon"] ||
					"volume" == e) && (
					n = createElement(
						"div"), css(n, {
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "scale(" +
							s + ")",
						transition: "opacity .3s linear, transform .3s linear"
					}), o.frame
					.appendChild(n), n
					.innerHTML =
					"volume" == e ? (o
						.muted ? 0 :
						Math.round(100 *
							v.volume)) +
					"%" : v.hotkey[e +
						t + "icon"],
					css(n, {
						marginTop: "-" +
							n
							.offsetHeight /
							2 +
							"px",
						marginLeft: "-" +
							n
							.offsetWidth /
							2 + "px"
					}), SvgColor(n,
						"#ffffff"),
					setTimeout(a, 50))
		},
		PluginHdIcon = function(e, t,
		n) {
			var s, a = createElement(
				"div");
			e.appendChild(a), css(a, {
					position: "absolute",
					top: -t
						.offsetHeight /
						2 - 1,
					"background-color": "#f00",
					"border-radius_": 1,
					display: "none",
					pointerEvents: "none"
				}), 1 == n.hdicon2 && n
				.hdiconlist ? (s = n
					.hdiconlist.split(
						","), css(a, {
						"font-size": 8,
						color: "#fff",
						padding: "2px 2px 0 2px",
						"line-height": "1"
					})) : (n.hdicon2 =
					0, css(a, {
						height: 9,
						width: 13,
						"background-image": "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTMgOSIgd2lkdGg9IjEwMCUiPjxwYXRoIGQ9Ik01LDcgTDYsNyBMNiw4IEw1LDggTDUsNyBaIE0xMCwzIEwxMCw0IEw4LDQgTDgsMyBMMTAsMyBaIE0zLDYgTDMsNSBMNSw1IEw1LDYgTDMsNiBaIE0yLDcgTDMsNyBMMyw4IEwyLDggTDIsNyBaIE03LDcgTDEwLDcgTDEwLDggTDcsOCBMNyw3IFogTTEwLDYgTDExLDYgTDExLDcgTDEwLDcgTDEwLDYgWiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjY0NzEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48cGF0aCBkPSJNNSw3IEw1LDYgTDUsNSBMMyw1IEwzLDYgTDMsNyBMMiw3IEwyLDIgTDMsMiBMMyw0IEw1LDQgTDUsMiBMNiwyIEw2LDcgTDUsNyBaIE0xMSw2IEwxMCw2IEwxMCw3IEw3LDcgTDcsMiBMMTAsMiBMMTAsMyBMMTEsMyBMMTEsNiBaIE0xMCw0IEwxMCwzIEw4LDMgTDgsNCBMOCw2IEwxMCw2IEwxMCw0IFoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=)"
					})), this.toggle =
				function() {
					var e, r = 0,
						l = o.media
						.getQuality();
					(l = l.replace(Lang(
							"auto"
							) + " ",
						"")) && (1 != n
						.hdicon2 && (
							"HD" == l ||
							l.indexOf(
								" HD") >
							0 || 0 == l
							.indexOf(
								"hd") ||
							0 == l
							.indexOf(
								"Hd")
							) && (l =
							"720"), l
						.indexOf(" ") >
						0 && (l = l
							.substr(0, l
								.indexOf(
									" ")
								)), r =
						parseInt(l));
					var d = "-1";
					if (1 == n
						.hdicon2) {
						d = "";
						for (var c =
							0; c < s
							.length; c++
							) {
							var u = s[c]
								.split(
									":"
									);
							2 == u
								.length &&
								trim(u[
									0]) ==
								r && (
									d =
									trim(
										u[
											1]
										)
									)
						}
						"" == d ? r >
							700 && (
								e = !0,
								a
								.innerHTML =
								"HD") :
							(e = !0, a
								.innerHTML =
								d)
					} else r > 700 && (
						e = !0);
					e ? (show2(a), t
						.offsetWidth -
						a
						.offsetWidth >
						0 && css(
						a, {
							left: (t.offsetWidth -
									a
									.offsetWidth
									) /
								2 -
								2
						})) : hide2(
						a)
				}
		},
		PluginSettings2 = function() {
			var e, t, n, s, a, r, l, d,
				c, u = [];
			for (var $ in v.settings) v
				.settings
				.hasOwnProperty($) && $
				.indexOf("combined") > -
				1 && (u[$.substr(8)] = v
					.settings[$]);
			exist(u.bottom) || (u
					.bottom = 30),
				exist(u.right) || (u
					.right = 50), u
				.color = "#" + (u
					.color ? u.color :
					"fff"), u.bgcolor =
				"#" + (u.bgcolor ? u
					.bgcolor : "333"),
				exist(u.round) || (u
					.round = 0), exist(u
					.size) || (u.size =
					80), exist(u
					.titlesize) || (u
					.titlesize = 100), u
				.padding = exist(u
					.padding) ? MarPad(u
					.padding) : 0, u
				.margin = exist(u
					.margin) ? MarPad(u
					.margin) : 0;
			var f =
				'<pjsdiv style="display:inline-block;width:20px"></pjsdiv>',
				p =
				'<pjsdiv style="display:inline-block;width:20px"><svg width="16px" height="6px" viewBox="-1 -1 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline stroke="' +
				u.color +
				'" stroke-width="1" stroke-linecap="square" fill="none" points="0 2 2 4 5.5 0"></polyline></svg></pjsdiv>';

			function _($, w) {
				l = $, e ? e.innerHTML =
					"" : (e =
						createElement(
							"div"), o
						.frame
						.appendChild(e),
						css(e, {
							position: "absolute",
							bottom: u
								.bottom +
								"px",
							right: u
								.right +
								"px",
							background: u
								.bgcolor,
							"border-radius": u
								.round,
							padding: u
								.padding,
							"white-space": "nowrap"
						}), e.style
						.zIndex = 99999,
						e
						.addEventListener(
							"mouseover",
							m, !0), e
						.addEventListener(
							"mouseout",
							b, !0)),
					t = [], items = [],
					n = [];
				for (var k = $.substr(9)
						.split(","), O =
						"right", C = [
							"right",
							"left",
							"center"
						], L = u.right,
						S = 0; S < k
					.length; S++) {
					var T = copyObject(
							o["files_" +
								k[S]]),
						E = o[
							"current_" +
							k[S]];
					if ("share" == k[
						S] && o.share) {
						T = [], c = [];
						for (var P =
							1; P <=
							16; P++)
							exist(v["share" +
								P]) && (
								T.push(
									Lang(
										v["share" +
											P
											]
										)
									),
								c[T
									.length] =
								v["share" +
									P])
					}
					if (T) {
						if (T.length >
							1) {
							t[S] =
								createElement(
									"div"
									), e
								.appendChild(
									t[S]
									),
								css(t[
									S], {
										display: "inline-block",
										"padding-top": 0,
										"padding-bottom": 7
									}),
								1 != u
								.notitle &&
								(n[S] =
									createElement(
										"div"
										),
									t[S]
									.appendChild(
										n[
											S]
										),
									css(n[
										S], {
										"pointer-events": "none",
										display: "block",
										"padding-left": 7,
										"padding-top": 10,
										"padding-bottom": 10,
										"padding-right": 27,
										color: u
											.color,
										"font-size": u
											.titlesize +
											"%"
									}),
									n[S]
									.innerHTML =
									f +
									"<b>" +
									Lang(
										k[
											S]
										) +
									"</b>"
									),
								items[
								S] = [],
								"subtitle" !=
								k[S] ||
								o
								.hls_subs ||
								o
								.dash_subs ||
								(T.push(Lang(
										"options"
										)),
									s =
									T
									.length
									),
								"subtitle" ==
								k[S] &&
								1 == v
								.sub_upload &&
								!o
								.system
								.tv && o
								.sbt &&
								exist(
									window
									.FileReader
									) &&
								(T.push("<input type='file' id='" +
										v
										.id +
										"_subfile2' accept='.vtt,.ass,.srt' style='display:none'/>" +
										Lang(
											"upload"
											)
										),
									a =
									T
									.length
									);
							var A =
								createElement(
									"div"
									);
							t[S].appendChild(
									A),
								css(A, {
									float: "left"
								});
							for (var z =
									1,
									I =
									0,
									P =
									0; P <
								T
								.length; P++
								) {
								if (T[
									P]) {
									var q = !
										0;
									if ("subtitle" !=
										k[
											S] ||
										T[
											P] !=
										Lang(
											"off"
											) ||
										o
										.subtitle_on ||
										(H = !
											0
											),
										"quality" ==
										k[
											S] &&
										(T[P] ==
											Lang(
												"auto"
												) &&
											o
											.media
											.autoQuality() &&
											(H = !
												0
												),
											exist(
												v
												.forbidden_quality
												)
											)
										)
										for (
											var V =
												v
												.forbidden_quality
												.split(
													","
													),
												M =
												0; M <
											V
											.length; M++
											)
											T[
												P]
											.indexOf(
												V[
													M]
												) >
											-
											1 &&
											(q = !
												1
												);
									if (
										q) {
										items
											[
												S]
											[
												P] =
											createElement(
												"div"
												),
											css(items[
													S
													]
												[
													P], {
													display: "block",
													margin: u
														.margin,
													padding: 7,
													"padding-right": 27,
													"font-size": u
														.size +
														"%",
													opacity: .7,
													transition: "opacity 0.1s linear,background 0.1s linear",
													cursor: "pointer"
												}
												);
										var H = !
											1;
										"speed" ==
										k[S] &&
											1 ==
											T[
												P] &&
											1 !=
											u
											.speed1 &&
											(T[P] =
												Lang(
													"normal"
													)
												),
											P ==
											E ||
											H ?
											(css(items[
														S]
													[
														P], {
														opacity: 1
													}
													),
												items[
													S
													]
												[
													P]
												.innerHTML =
												'<pjsdiv style="pointer-events:none;color:' +
												u
												.color +
												'">' +
												p +
												T[
													P] +
												"</pjsdiv>",
												attr(
													items[
														S
														]
													[
														P], {
														yes: 1
													}
													)
												) :
											items[
												S
												]
											[
												P]
											.innerHTML =
											'<pjsdiv style="pointer-events:none;color:' +
											u
											.color +
											'">' +
											f +
											T[
												P] +
											"</pjsdiv>",
											attr(
												items[
													S
													]
												[
													P], {
													is: k[
															S] +
														"," +
														P
												}
												),
											"quality" ==
											k[
												S] &&
											P >
											0 ?
											A
											.insertBefore(
												items[
													S
													]
												[
													P],
												items[
													S
													]
												[P -
													1]
												) :
											A
											.appendChild(
												items[
													S
													]
												[
													P]
												),
											items[
												S
												]
											[
												P]
											.addEventListener(
												"mouseover",
												h,
												!
												0
												),
											items[
												S
												]
											[
												P]
											.addEventListener(
												"mouseout",
												g,
												!
												0
												),
											items[
												S
												]
											[
												P]
											.addEventListener(
												"click",
												y,
												!
												0
												)
									}
								}
								t[S].offsetHeight >
									o
									.screen_h -
									u
									.bottom &&
									(P ==
										z *
										I +
										1 ||
										1 ==
										z
										) &&
									(w &&
										T
										.length -
										P >
										1 ?
										css(A, {
											height: o
												.screen_h -
												u
												.bottom -
												40,
											"overflow-y": "auto"
										}) :
										(0 ==
											I &&
											(I =
												P),
											A =
											createElement(
												"div"
												),
											t[
												S]
											.appendChild(
												A
												),
											css(A, {
												float: "left"
											})
											),
										z++
										)
							}
						}
					} else
						for (var D =
							0; D < C
							.length; D++
							) k[S]
							.indexOf(C[
								D]) > -
							1 && (O = C[
									D],
								k[S]
								.indexOf(
									":"
									) >
								-1 && (
									L =
									1 *
									k[S]
									.substr(
										k[
											S]
										.indexOf(
											":"
											) +
										1
										)
									))
				}
				if (o.screen_w < e
					.scrollWidth && !w
					) {
					_($, !0);
					return
				}
				"left" == O && css(e, {
						right: "auto",
						left: L +
							"px",
						"margin-left": 0
					}), "center" == O &&
					css(e, {
						right: "auto",
						left: "50%",
						"margin-left":
							-e
							.offsetWidth /
							2 + "px"
					}), "right" == O &&
					css(e, {
						left: "auto",
						right: L +
							"px",
						"margin-left": 0
					}), a > 0 && !r && (
						o.subupld =
						document
						.getElementById(
							v.id +
							"_subfile2"
							), o.subupld
						.onchange = o
						.sbt.SubUpload,
						r = !0), d = !0
			}

			function h(e) {
				(x = e.target) && (css(
					x, {
						background: hex2rgb(
							u
							.color,
							.2),
						opacity: 1
					}), m())
			}

			function g(e) {
				(x = e.target) && (css(
						x, {
							background: "none"
						}), 1 != x
					.getAttribute(
					"yes") && css(x, {
						opacity: .7
					}), b())
			}

			function m() {
				o.controlover = !0,
					clearTimeout(o
						.settingsovertimer
						)
			}

			function b() {
				clearTimeout(o
						.settingsovertimer
						), o
					.settingsovertimer =
					setTimeout(w, v
						.settings
						.showoverto >
						0 ? 1e3 * v
						.settings
						.showoverto : o
						.system.tv ?
						2e3 : 1e3)
			}

			function y(e) {
				if (x = e.target) {
					var t = x
						.getAttribute(
							"is");
					if (t) {
						var n = t.split(
							",");
						if (2 == n
							.length) {
							if ("subtitle" ==
								n[0] &&
								o.sbt) {
								if (n[
									1] ==
									a -
									1) {
									o.sbt
										.SubUpload();
									return
								}
								if (n[
									1] ==
									s -
									1) {
									o.controls
										.SubOpt();
									return
								}
								o.sbt
									.SetSubtitle(
										n[
											1]
										)
							}
							"quality" ==
							n[0] && o
								.actions
								.SetQuality(
									n[1]
									),
								"speed" ==
								n[0] &&
								o
								.actions
								.SetSpeed(
									n[1]
									),
								"audiotrack" ==
								n[0] &&
								o
								.actions
								.SetAudioTrack(
									n[1]
									),
								"share" ==
								n[0] &&
								o
								.share &&
								o.share
								.api(c[1 *
									n[
										1] +
									1
									]),
								"scale" ==
								n[0] &&
								(0 == n[
										1] &&
									o
									.media
									.scale(
										v
										.settings
										.scale /
										100
										),
									1 ==
									n[
									1] &&
									o
									.media
									.scale(
										"-" +
										v
										.settings
										.scale /
										100
										),
									2 ==
									n[
									1] &&
									o
									.media
									.normalscale()
									)
						}
					}
				}
				_(l)
			}

			function w() {
				if (d) {
					if (items) {
						for (var t =
							0; t < items
							.length; t++
							)
							if (items[
								t])
								for (var n =
										0; n <
									items[
										t
										]
									.length; n++
									)
									items[
										t
										]
									[
									n] &&
									(items[
											t]
										[
											n]
										.removeEventListener(
											"mouseover",
											h
											),
										items[
											t
											]
										[
											n]
										.removeEventListener(
											"mouseout",
											g
											),
										items[
											t
											]
										[
											n]
										.removeEventListener(
											"click",
											y
											)
										)
					}
					e.innerHTML = "", o
						.controlover = !
						1, d = !1
				}
			}
			this.show = function(e) {
					_(e)
				}, this.toggle =
				function(e) {
					d ? w() : _(e)
				}, this.hide =
				function() {
					w()
				}, this.update =
				function() {
					d && _(l)
				}
		},
		PluginEffects = function() {
			function e(e) {
				"resize" == e && 1 == v
					.effectsnow && o
					.effectsnow && o
					.effectsnow
				.resize(), "hide" !=
					e || 1 != v
					.effectflip || o
					.fullscreen || (o
						.mediacontainer
						.style
						.transform =
						"scale(1, -1)"),
					"snow" == e && 1 ==
					v.effectsnow && (o
						.effectsnow || (
							o
							.effectsnow =
							new PluginSnow
							), o
						.effectsnow && o
						.effectsnow
						.start()),
					"stopsnow" == e &&
					1 == v.effectsnow &&
					o.effectsnow && o
					.effectsnow.stop(),
					"play" == e && (o
						.tagvideo &&
						css(o.media
						.tag(), {
							filter: "none"
						}), 1 != v
						.effectnozoom &&
						o.media
						.normalscale()),
					"pause" != e || (o
						.tagvideo && (
							1 == v
							.effectgray &&
							1 == v
							.effectblur ?
							(css(o.media
									.tag(), {
										filter: "blur(5px) grayscale(100%)"
									}),
								1 != v
								.effectnozoom &&
								o.media
								.scale(
									.1)
								) : (
								1 == v
								.effectgray &&
								(css(o.media
										.tag(), {
											filter: "grayscale(100%)"
										}
										),
									1 !=
									v
									.effectnozoom &&
									o
									.media
									.scale(
										.1
										)
									),
								1 == v
								.effectblur &&
								(css(o.media
										.tag(), {
											filter: "blur(5px)"
										}
										),
									1 !=
									v
									.effectnozoom &&
									o
									.media
									.scale(
										.1
										)
									))),
						1 != v
						.effectflip || o
						.fullscreen || (
							o.frame
							.style
							.transform =
							"scale(1, 1)",
							o
							.mediacontainer
							.style
							.transform =
							"scale(1, 1)"
							)),
					"full" == e && 1 ==
					v.effectflip && (o
						.frame.style
						.transform =
						"scale(1, 1)", o
						.mediacontainer
						.style
						.transform =
						"scale(1, 1)")
			}
			1 != v.effectsnowonbut &&
				1 == v.effectsnow && e(
					"snow"), this.api =
				function(t) {
					1 == v
						.effectnoandroid &&
						o.system
						.android || e(t)
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
	var Motion = function(e) {
			var t, n, s, a, r, l, d, c =
				0,
				u = !1;
			if (void 0 != e.me &&
				void 0 != e.mc &&
				void 0 != e.type &&
				void 0 != e.to) {
				null == e.time && (e
						.type.indexOf(
							"alpha") > -
						1 ? 0 == e.to ?
						e.time = .5 : e
						.time = .2 : e
						.time = .15),
					t = h(e.ease), -1 ==
					e.type.indexOf(
						"scale") && (
						exist(o.motions[
							e.me]) && o
						.motions[e.me]
						.TheEnd(), o
						.motions[e.me] =
						this), 1 == e
					.show && e.mc.set(
						"display", !0),
					n = e.type.split(
						"|"), a =
					String(e.to).split(
						"|"), s = [];
				for (var $ = 0; $ < n
					.length; $++) a[
					$] || (a[$] = a[0]),
					"alpha" == n[$] && (
						s[$] = e.mc.g(
							"opacity")),
					"alpha_div" == n[
					$] && (s[$] = e.mc
						.style.opacity),
					"y" == n[$] && (s[
						$] = e.mc.g("y")
						), "x" == n[
					$] && (s[$] = e.mc
						.g("x")),
					"left" == n[$] && (
						s[$] = parseInt(
							e.mc.style
							.left)),
					"scale" == n[$] && (
						s[$] = e.mc.g(
							"scaleX")),
					"scroll" == n[$] &&
					(s[$] = e.mc
						.scrollTop),
					"scrollleft" == n[
					$] && (s[$] = e.mc
						.scrollLeft),
					"scaleY" == n[$] &&
					(s[$] = e.mc.g(
						"scaleY")),
					"scaleX" == n[$] &&
					(s[$] = e.mc.g(
						"scaleX")),
					"width" == n[$] && (
						s[$] = e.mc.g(
							"width")),
					"width_div" == n[
					$] && (s[$] = e.mc
						.offsetWidth, a[
							$] = Math
						.floor(a[$]),
						"line_play" == e
						.me && log(
							"width", e
							.me, s[$],
							a[$], e.mc
							.offsetWidth
							)),
					"height" == n[$] &&
					(s[$] = e.mc.g(
						"height")),
					"height_div" == n[
					$] && (s[$] = e.mc
						.offsetHeight),
					a[$] = Number(a[$]),
					s[$] = Number(s[$]);
				l = 1e3 * e.time / t
					.length, r = t
					.length, 1 == n
					.length && s[0] ==
					a[0] ? p() :
					setTimeout(f, Math
						.round(l))
			}

			function f() {
				for (var $ = 0; $ < n
					.length; $++) {
					var h = s[$] + (a[
							$] - s[$]) *
						(t[c] ? t[c] :
							0);
					_(n[$], h), "y" ==
						n[$] && e.mc
						.set("top", h),
						"x" == n[$] && e
						.mc.set("left",
							h),
						"left" == n[
						$] && (e.mc
							.style
							.left = h +
							"px"),
						"scale" == n[
						$] && e.mc.set(
							"scale", h),
						"scaleY" == n[
						$] && e.mc.set(
							"scaleY", h
							),
						"scaleX" == n[
						$] && e.mc.set(
							"scaleX", h
							),
						"scroll" == n[
						$] && (e.mc
							.scrollTop =
							h),
						"scrollleft" ==
						n[$] && (e.mc
							.scrollLeft =
							h),
						"width" == n[
						$] && e.mc.set(
							"width", h),
						"width_div" ==
						n[$] && css(e
							.mc, {
								width: h
							}),
						"height" == n[
						$] && e.mc.set(
							"height", h
							),
						"height_div" ==
						n[$] && css(e
							.mc, {
								height: h
							})
				}
				c++, u || (c == r ?
				p() : d =
					setTimeout(f,
						Math.round(
							l)))
			}

			function p() {
				u = !0, e.hide && (
						"alpha_div" ==
						n[0] ||
						"left" == n[0] ?
						hide(e.mc) : e
						.mc.set(
							"display", !
							1)), -1 == e
					.type.indexOf(
						"scale") && (o
						.motions[e.me] =
						null, delete o
						.motions[e.me]);
				for (var t = 0; t < n
					.length; t++) _(n[
					t], a[t]);
				clearTimeout(d)
			}

			function _(t, n) {
				"alpha" == t && e.mc
					.set("opacity", n),
					"alpha_div" == t &&
					(e.mc.style
						.opacity = n)
			}

			function h(e) {
				switch (e) {
					case "elastic":
						return [0, .432,
							.857,
							1.275,
							1.372,
							1.296,
							1.102,
							.957,
							.883,
							.87,
							.914,
							.992,
							1.029,
							1.041,
							1.036,
							1.019,
							.996,
							.984,
							.981,
							.988,
							1.001,
							1.006,
							1.007,
							1.006,
							1.003,
							.999,
							.998,
							.998,
							.998,
							.998, 1
						];
					case "cubic":
						return [0, .096,
							.185,
							.267,
							.344,
							.416,
							.483,
							.547,
							.606,
							.659,
							.705,
							.747,
							.785,
							.818,
							.848,
							.874,
							.897,
							.918,
							.935,
							.95,
							.962,
							.971,
							.979,
							.985,
							.99,
							.994,
							.997,
							.999, 1
						];
					case "back":
						return [0, .146,
							.28,
							.403,
							.513,
							.613,
							.702,
							.78,
							.848,
							.907,
							.956,
							.997,
							1.029,
							1.055,
							1.072,
							1.084,
							1.092,
							1.095,
							1.095,
							1.093,
							1.088,
							1.081,
							1.072,
							1.06,
							1.046,
							1.033,
							1.023,
							1.014,
							1.007,
							1.003
						];
					default:
						return [0, .1,
							.2, .3,
							.4, .5,
							.6, .7,
							.8, .9,
							1
						]
				}
			}
			this.TheEnd = function() {
					p()
				}, this.TheEnd2 =
				function() {
					c = r - 1, f(), p()
				}, this.XY = function(e,
					t, s, a) {
					for (var r = !1, l =
							0; l < n
						.length; l++)
						"x" == n[l] &&
						e != t && (r = !
							0), "y" ==
						n[l] && s !=
						a && (r = !0);
					r && p()
				}
		},
		System = function() {
			var e, t = navigator
				.appName,
				n = navigator.userAgent,
				s = n.match(
					/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
					),
				s = n.match(
					/(opera|chrome|safari|firefox|msie|trident|edge)\/?\s*(\.?\d+(\.\d+)*)/i
					);
			s && null != (e = n.match(
				/version\/([\.\d]+)/i
				)) && (s[2] = e[1]);
			var a = navigator
				.maxTouchPoints;
			this.browser = s ? s[1] : t,
				this.version = s ? s[
				2] : navigator
				.appVersion, this
				.touch = navigator
				.maxTouchPoints > 1,
				this.opera = "Opera" ==
				this.browser, this.ie9 =
				"MSIE 9.0" == this
				.browser, this.ie =
				"MSIE" == this
				.browser || "Trident" ==
				this.browser ||
				"Edge" == this.browser,
				this.edge = n.search(
					/(edge)\/?\s*/i) > -
				1, this.firefox =
				"Firefox" == this
				.browser, this.safari =
				"Safari" == this
				.browser, this.chrome =
				window.chrome, this
				.win = n.search(
					"Windows NT") > -1,
				this.ios = n.search(
					/(iphone|ipad|ipod)\/?\s*/i
					) > -1 ||
				"MacIntel" === navigator
				.platform && a > 1, this
				.tv = 1 != v.notv && n
				.search(
					/(TV|tvOS|webOS|armv|BRAVIA|Roku|Tizen|Philips)\/?\s*/i
					) > -1, this.lg =
				1 != v.notv && n.search(
					/(LG)\/?\s*/i) > -1,
				this.iphone = n.search(
					/(iphone)\/?\s*/i) >
				-1, this.ipad = this
				.ios && !this.iphone,
				this.webkit =
				"WebkitAppearance" in
				document.documentElement
				.style, n.search(
					/(android)\/?\s*/i
					) > -1 && (a > 0 ?
					this.android = !0 :
					this.tv = !0,
					matchMedia(
						"(pointer:fine)"
						).matches && (
						this.tv = !0)),
				this.mobile = (this
					.ios || this
					.android || n
					.search(
						/(blackberry|iemobile|opera mini)\/?\s*/i
						) > -1) && !this
				.tv, this
				.mutedautoplay = this
				.safari || this.chrome,
				this.fullscreen = !1,
				this.ios && (this.iosv =
					parseFloat(n.substr(
							n.indexOf(
								"OS ") +
							3, 4)
						.replace("_",
							".")), this
					.ipad && (!1 in
						window || a < 2
						) && (this
						.mobile = this
						.ios = !1, this
						.tv = !0)), this
				.desktop = !this.mobile,
				this.mobiletv = this
				.mobile || this.tv, (o
					.frame
					.requestFullScreen ||
					o.frame
					.requestFullscreen ||
					o.frame
					.mozRequestFullScreen ||
					o.frame
					.webkitRequestFullScreen ||
					o.frame
					.msRequestFullscreen
					) && (this
					.fullscreen = !0)
		};

	function UpdateObject(e, t) {
		for (var o in t)
			if ("object" == typeof t[
				o]) {
				if ("events" == o ||
					"file" == o) e[o] =
					t[o];
				else
					for (var n in t[o])
						if ("object" !=
							typeof e[
							o] && (e[
								o] = {}
								),
							"object" ==
							typeof t[o][
								n
							])
							for (var s in
									t[o]
									[n])
								if ("object" !=
									typeof e[
										o
										]
									[
									n] &&
									(e[o]
										[
											n] = {}
										),
									"object" ==
									typeof t[
										o
										]
									[n][
										s]
									)
									for (
										var a in
											t[
												o]
											[
												n]
											[
												s]
										)
										"object" !=
										typeof e[
											o
											]
										[
											n]
										[
											s] &&
										(e[o]
											[
												n]
											[
												s] = {}
											),
										e[
											o]
										[
											n]
										[
											s]
										[
											a] =
										t[
											o]
										[
											n]
										[
											s]
										[
											a],
										("padding" ==
											s ||
											"margin" ==
											s
											) &&
										(e[o]
											[
												n]
											[
												s]
											[
												a] =
											parseInt(
												e[
													o]
												[
													n]
												[
													s]
												[
													a]
												)
											);
								else e[
										o]
									[n][
										s] =
									t[o]
									[n][
										s],
									("padding" ==
										n ||
										"margin" ==
										n
										) &&
									(e[o]
										[
											n]
										[
											s] =
										parseInt(
											e[
												o]
											[
												n]
											[
												s]
											)
										);
				else e[o][n] = t[o][n],
					("padding" == o ||
						"margin" == o
						) && (e[o][n] =
						parseInt(e[o][
							n]))
			} else o.indexOf("roll") >
				0 && "" === trim(t[
				o]) || (e[o] =
					SettingsParser(o, t[
						o]));
		return e
	}
	var SettingsParser = function(e,
	t) {
		return "string" ==
			typeof t && (t = trim(
				t), e.indexOf(
					"color") > -1 &&
				-1 != t && (t =
					CheckColor(t))),
			t
	};

	function hexToRGBA(e, t) {
		return "rgba(" + (e = e.replace(
			"#", "")).match(RegExp(
			"(.{" + e.length /
			3 + "})", "g")).map(
			function(t) {
				return parseInt(e
					.length %
					2 ? t + t :
					t, 16)
			}).concat(t || 1).join(
			",") + ")"
	}

	function StorageSupport() {
		try {
			var e = window.localStorage,
				t = "__storage_test__";
			return e.setItem(t, t), e
				.removeItem(t), !0
		} catch (o) {
			return !1
		}
	}

	function killMotion(e) {
		e && exist(o.motions[e]) && o
			.motions[e].TheEnd()
	}
	var Lang = function(e) {
		var t = e;
		t && (t = e.charAt(0)
			.toUpperCase() + e
			.slice(1)).indexOf(
			"_") > -1 && (t = t
			.replace(/_/ig, " ")
			);
		var n = {
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
		return exist(n[e]) && (t =
				n[e]), exist(o[
				"lang_" + v.lang
				]) && exist(o[
				"lang_" + v.lang
				][e]) && (t = o[
				"lang_" + v.lang
				][e]), v.rename && v
			.rename[e] && (t = v
				.rename[e]), t
	};

	function getSwarmId() {
		return void 0 !== o.plid && o
			.playlist_dic[o.plid]
			.pjs_id ? o.playlist_dic[o
				.plid].pjs_id : v.cuid
	}
	var gaTracker = function(e, t, n) {
		if (!exist(o.gatracked[
			t]) && 1 != v
			.HDVBPlayercom) {
			var s, a = getSwarmId();
			if (exist(v.label) && (
					a = v.label),
				1 == v.yamtr_event[
					e] && 1 == v
				.yamtr && exist(v
					.yamtrid) && (
					"init" == e &&
					setInterval(
						yaHit, 3e5),
					exist(window[
						"yaCounter" +
						v
						.yamtrid
						]) ? (
						window[
							"yaCounter" +
							v
							.yamtrid
							]
						.reachGoal(
							"HDVBPlayer_" +
							e, {
								title: a
							}), log(
							"Yandex",
							"HDVBPlayer_" +
							e)) :
					log(
						"Yandex Metric error")
					), 1 == v
				.ga_event[e] && 1 ==
				v.ga) {
				if (1 == v.ga4) {
					if (window
						.gtag) {
						if (s = {
								label: a
							}, v
							.galabels &&
							"object" ==
							typeof v
							.galabels
							)
							for (var r in
									v
									.galabels)
								v
								.galabels
								.hasOwnProperty(
									r
									) &&
								(s[r] =
									v
									.galabels[
										r
										]
									);
						gtag("event",
							"HDVBPlayer_" +
							e, s
							)
					}
				} else window.ga &&
					(s = {
							eventCategory: "Player",
							eventAction: t
						}, "" !=
						a && (s
							.eventLabel =
							a), 1 !=
						v.gainact ||
						o
						.clicktime ||
						(s.nonInteraction =
							1), ga(
							"user.send",
							"event",
							s))
			}
		}
		n && (o.gatracked[t] = !0)
	};

	function yaHit() {
		exist(window["yaCounter" + v
				.yamtrid]) && window[
				"yaCounter" + v.yamtrid]
			.reachGoal("getSwarmId")
	}
	var YoutubeID = function(e) {
			var t = "";
			if ((e = e.replace("v=",
					"{=")).indexOf(
					"youtu.be/") > -1 ?
				(t = e.substr(e.indexOf(
					".be/") + 4))
				.replace("/", "") : t =
				e.split(
					/(youtu.be\/|v\/|embed\/|watch\?|youtube.capiom\/user\/[^#]*#([^\/]*?\/)*)\??{?=?([^#\&\?]*)/
					)[3], "" != t && t
				.indexOf("?t=") > 0) {
				v.start = t.substr(t
					.indexOf(
					"?t=") + 3);
				var o = 0,
					n = 0,
					s = 0;
				v.start.indexOf("h") >
					0 && (o = v.start
						.substr(0, v
							.start
							.indexOf(
								"h")), v
						.start = v.start
						.substr(v.start
							.indexOf(
								"h") + 1
							)), v.start
					.indexOf("m") > 0 &&
					(n = v.start.substr(
							0, v.start
							.indexOf(
								"m")), v
						.start = v.start
						.substr(v.start
							.indexOf(
								"m") + 1
							)), v.start
					.indexOf("s") > 0 &&
					(s = v.start.substr(
							0, v.start
							.indexOf(
								"s")), v
						.start = v.start
						.substr(v.start
							.indexOf(
								"s") + 1
							)), (o >
						0 || n > 0 ||
						s > 0) && (v
						.start = 3600 *
						o + 60 * n + 1 *
						s), t = t
					.substr(0, t
						.indexOf("?t="))
			}
			return t
		},
		js = function(x, y, li, ev) {
			if ("init" == x && (o
					.init = !0), 1 ==
				ev)
				for (var yi in y) y
					.hasOwnProperty(
					yi) && "object" ==
					typeof y[yi] && (y[
						yi] = "");
			if (1 == v.eventstracker &&
				o.init) {
				if (1 == v
					.eventlisteners ||
					1 == li) JsEvent(x,
					y);
				else {
					if (void 0 != y &&
						"object" ==
						typeof y) try {
						y = JSON
							.stringify(
								y)
					} catch (e) {}
					if ("string" ==
						typeof v
						.events && 0 ==
						v.events
						.indexOf("{"))
						try {
							v.events = v
								.events
								.replace(
									/\'/ig,
									'"'
									), v
								.events =
								JSON
								.parse(v
									.events
									)
						} catch (e) {
							console.log(
								e)
						}
					if ("object" ==
						typeof v.events
						) {
						if (exist(v
								.events[
									x]
								) ||
							exist(v
								.events
								.other)
							) {
							var z = x;
							!exist(v.events[
									x
									]) &&
								exist(v
									.events
									.other
									) &&
								(z =
									"other"),
								0 == x
								.indexOf(
									"vast_"
									) &&
								exist(v
									.events
									.vast
									) &&
								(z =
									"vast");
							try {
								void 0
									!==
									y ?
									eval(
										v
										.events[
											z
											] +
										"('" +
										x +
										"','" +
										v
										.id +
										"','" +
										y +
										"')"
										) :
									eval(
										v
										.events[
											z
											] +
										"('" +
										x +
										"','" +
										v
										.id +
										"')"
										)
							} catch (
							e) {
								log("events",
									e,
									x
									)
							}
						}
					} else {
						"" == v
							.events && (
								v
								.events =
								"HDVBPlayerEvents"
								);
						try {
							void 0 !==
								y ?
								eval(v
									.events +
									"('" +
									x +
									"','" +
									v
									.id +
									"','" +
									y +
									"')"
									) :
								eval(v
									.events +
									"('" +
									x +
									"','" +
									v
									.id +
									"')"
									)
						} catch (e) {
							log("events",
								e,
								x, y
								)
						}
					}
				}
			}
			if (o.init && 1 == v
				.pjsframe && o.pjsfrm)
				try {
					o.pjsfrm
						.contentWindow
						.postMessage({
							event: x,
							info: y
						}, "*")
				} catch (e) {}
			if (1 == v.postmessage &&
				1 !== li) {
				var zv = {
					event: x,
					time: o.media ?
						"seek" ==
						x ? o
						.seeked_time :
						o.media
						.time() : 0
				};
				void 0 != y && (zv
						.data = y), (
						"duration" ==
						x || "time" == x
						) && (zv
						.duration = o
						.media
						.duration()), (
						"volume" == x ||
						"unmute" == x
						) && (zv
						.volume = v
						.volume),
					"new" == x && (zv
						.id =
						apiProcessor(
							"playlist_id"
							)), window
					.parent.postMessage(
						zv, "*");
				var z = x;
				("init" == x ||
					"start" == x ||
					"end" == x) && (z =
					x + "ed"), "play" ==
				x && (z = "resumed"),
					"pause" == x && (z =
						"paused"),
					"mute" == x && (z =
						"muted"),
					"unmute" == x && (
						z = "unmuted"),
					"seek" == x && (z =
						"rewound"),
					"vast_Impression" ==
					x && (z =
					"adShown"), zv
					.event = z, "" !=
					z && z != x && (zv =
						JSON.parse(JSON
							.stringify(
								zv)),
						window.parent
						.postMessage(zv,
							"*"))
			}
		},
		JsEvent = function(e, t) {
			var n = document
				.createEvent("Events");
			void 0 !== t && (n.info =
				t), n.initEvent(e, !0, !
					0), o.container
				.dispatchEvent(n)
		};
	this.event = function(e, t) {
		o.events[e] = t
	};
	var api = function(e, t, o) {
		return apiProcessor(e, t, o)
	};

	function apiProcessor(e, t, n) {
		if (!exist(o.actions) ||
			"string" != typeof e)
		return !1;
		if (1 != o.destroyed) {
			if (n && "string" ==
				typeof n && 0 == n
				.indexOf("id:") && (n =
					o.controls.butByS(n
						.substr(3),
						"dom")) &&
				"button" == e &&
				"toogle" == t && n
				.Click(), "play" == e ||
				"file" == e) {
				if (exist(t)) {
					var s = !1;
					if ("string" ==
						typeof t) {
						t = t.replace(
							/(\r\n|\n|\r)/gm,
							"");
						var a = -1;
						if (t.indexOf(
								"[seek:"
								) > -
							1 && t
							.lastIndexOf(
								"]") ==
							t.length - 1
							) {
							if (a =
								parseInt(
									(a = t
										.substr(
											t
											.indexOf(
												"[seek:"
												) +
											6,
											t
											.length -
											1
											)
										)
									.substr(
										0,
										a
										.length -
										1
										)
									),
								"" == (
									t =
									t
									.substr(
										0,
										t
										.indexOf(
											"[seek:"
											)
										)
									)) {
								o.actions
									.Seek(
										a
										),
									o
									.actions
									.Play();
								return
							}
							o.seekto = a
						}
						if (t.indexOf(
								"[skipads]"
								) > -
							1 && (s = !
								0, t = t
								.replace(
									"[skipads]",
									"")
								), 0 ==
							t.indexOf(
								"#" + v
								.enc2
								) && (
								t = o[o
									.fd[
										0]
									](t)
								), 0 ==
							t.indexOf(
								"#" + v
								.enc3
								) && t
							.indexOf(v
								.file3_separator
								) > 0 &&
							(t = o[o.fd[
								1]](
								t)),
							0 == t
							.indexOf(
								"#0") &&
							(t = fd0(
							t)), 1 == v
							.fplace && (
								t =
								fplace(
									t)),
							t.indexOf(
								".txt"
								) == t
							.length - 4
							) {
							var r = XHR(
								t);
							r.onload =
								function() {
									if (4 ==
										this
										.readyState &&
										200 ==
										this
										.status
										)
										try {
											apiProcessor
												("play",
													JSON
													.parse(
														this
														.responseText
														)
													)
										} catch (
											e
											) {}
								}, r
								.send();
							return
						}
						if (0 == t
							.indexOf(
								"id:"
								) &&
							exist(o
								.playlist_dic
								)) {
							var l =
								FindIdPl(
									t);
							return !!
								exist(o
									.playlist_dic[
										l
										]
									) &&
								(o.controls
									.PlaylistPlayId(
										l
										),
									a >
									-
									1 &&
									(o.seekto =
										a
										),
									!0)
						}
						if (0 == t
							.indexOf(
								"youtubeid:"
								)) {
							var l = t
								.substr(
									10);
							if ("youtube" ==
								o
								.file_type
								) return o
								.media
								.playByYoutubeId(
									l
									),
								!0;
							t = "//youtu.be/" +
								l
						}
					}
					"play" == e && (o
							.controls
							.PreNewPl(),
							o.actions
							.NewFile(t,
								void 0,
								void 0,
								s ? 1 :
								0)),
						"file" == e && (
							o
							.newfile = !
							0, v
							.autoplay =
							0, o.actions
							.NewFile(t,
								1,
								void 0,
								s ? 1 :
								0), o
							.controls
							.Duration(0,
								0), o
							.start = !1)
				} else "play" == e && o
					.actions.Play(),
					"file" == e &&
					"function" ==
					typeof Papi41 &&
					Papi41()
			}
			if ("preload" == e && (
					exist(t) ? (o
						.newfile = !0, o
						.actions
						.NewFile(t, 1,
							1)) : o
					.media.Preload()),
				"pause" == e && o
				.play && (o.actions
					.Pause(), o.actions
					.RenewSubtitle()),
				"channel" == e && exist(
					t) && o.start && o
				.channels && o.channels
				.SetChannel(t), 0 == e
				.indexOf("vpaid_") && o
				.vast && o.vast
				.VpaidSet(e.substr(6),
					t), "alert" == e &&
				(o.alert.close(), o
					.alert = new Alert,
					1 == v.alert404 ? o
					.alert.txt(v
						.alert404text) :
					o.alert.txt(
						"Test message"),
					1 == v.alert404v &&
					exist(v
						.alert404video
						) && (o
						.err404v =
						new PluginErrorVideo
						)), "waiting" ==
				e && (o.controls
					.Waiting(), o
					.controls
					.HideElement(
						"control_start")
					), "toggle" == e &&
				(o.play ? o.actions
					.Pause() : o.actions
					.Play()), "stop" ==
				e && (v.preload = 0, v
					.autoplay = 0, o
					.media.Recover(), o
					.actions.Stop()),
				"reload" == e && (o
					.time = o.media
					.time(), o.actions
					.Reload()),
				"download" == e && v
				.apiprm && 1 == v.apiprm
				.on && 1 == v.apiprm
				.dwn && o.actions
				.Download(), "effect" ==
				e && exist(t) && o
				.effects && o.effects
				.api(t), "share" == e &&
				o.controls.showShare(),
				"startvast" == e &&
				exist(t) && 1 == v.vast
				) {
				if (0 == t.indexOf(
						"js:")) v
					.midroll = t, v
					.midrolls = !0, o
					.actions
					.advertising(
						"midroll");
				else if ("" != o.p) {
					var d = JSON.parse(
						decode(o.p));
					for (var c in d) d
						.hasOwnProperty(
							c) && exist(
							d[c].id) &&
						t == d[c].id &&
						(v.midroll =
							"prt" + (
								exist(d[
										c]
									.cpm
									) ?
								"cpm" +
								d[c]
								.cpm :
								"") +
							t + "_" + d[
								c]
							.preroll, v
							.midrolls = !
							0, o.actions
							.advertising(
								"midroll"
								))
				}
			}
			if ("vastbreak" == e &&
				"function" ==
				typeof VastBreak &&
				VastBreak(), "cuid" ==
				e && t && (v.cuid = t, o
					.continue && o
					.continue
					.updateCuid()),
				"mute" == e && o.actions
				.Mute(), "speed" == e) {
				if (!exist(t)) return o
					.files_speed[o
						.current_speed
						];
				o.actions.SetSpeed(t)
			}
			if ("played" == e && v
				.apiprm && o.pld && 1 ==
				v.apiprm.pld)
			return Math.round((o.pld
						.filter(
							Boolean)
						.length - 1
						) / Math
					.round(o.media
						.duration()
						) * 100);
			if ("speeds" == e) return o
				.files_speed;
			if ("unmute" == e && o
				.actions.Unmute(),
				"thumbnails" == e &&
				exist(t) && (v[e] = t, o
					.actions.Thumbs()),
				"qualities" == e)
			return o.files_quality;
			if ("adblock" == e) return !
				!o.ab;
			if ("live" == e) return !!o
				.media && o.media
				.isLive();
			if ("subtitles" == e)
			return 1 == v.sub_off ?
				o.files_subtitle
				.slice(0, -1) : o
				.files_subtitle;
			if ("audiotracks" == e)
				return o
					.files_audiotrack;
			if ("volume" == e ||
				"setVolume" == e)
			return exist(t) && t >=
				0 && t <= 1 && o
				.actions.Volume(t),
				o.muted ? 0 : v
				.volume;
			if ("muted" == e) return !!
				exist(o.muted) && o
				.muted;
			if ("moveplaylist" == e && o
				.controls && o.controls
				.PlaylistMove(t),
				"design" == e && (t <
					2 && (t = ""), "" !=
					o["u" + t])) {
				var u = JSON.parse(
						decode(o["u" +
							t])),
					$ = [];
				for (var c in v) v
					.hasOwnProperty(
					c) && 0 == c
					.indexOf(
					"control_") && (v[
						c] = null);
				if ("object" ==
					typeof u)
					for (var f in u) u
						.hasOwnProperty(
							f) && (0 ==
							f.indexOf(
								"control_"
								) && (v[
									f] =
								u[f]),
							"toolbar" ==
							f && ($[f] =
								u[f]));
				v = UpdateObject(v, $);
				var p = !1;
				o.controls
					.SettingsVisible() &&
					(o.controls
						.Settings(),
						p = !0);
				var _ = !1;
				o.controls
					.PlaylistVisible() &&
					(o.controls
						.Playlist(),
						_ = !0), o
					.controls.Remove(),
					o.controls = null, o
					.controls =
					new Controls,
					"playing" == o.media
					.status() && o
					.controls.Play(), o
					.controls.Volume(v
						.volume), exist(
						v.title) &&
					Title(v.title), p &&
					o.controls
					.Settings(), _ && o
					.controls
				.Playlist(), o
					.fullscreen && o
					.controls
					.Fullscreen(),
					"control_duration" !=
					key && o.controls
					.Duration(o.media
						.time(), o.media
						.duration()),
					MainResize()
			}
			if ("vars" == e) return v
				.vars;
			if ("resize" == e && o
				.controls.resize(!0),
				"seek" == e && exist(t)
				) {
				if ("string" ==
					typeof t) {
					if (t.indexOf("%") >
						-1) t =
						parseInt(t
							.substr(0, t
								.indexOf(
									"%")
								)), t =
						o.media
						.duration() *
						t / 100;
					else {
						var h = o.media
							.time();
						if (o
							.continue &&
							!o.start &&
							!o.continue
							.seeked) {
							var g = o
								.continue
								.flag();
							g.t && g
								.d && (
									h =
									g.t,
									o
									.continue
									.seeked = !
									0)
						}
						0 == t.indexOf(
								"+") ?
							t = h +
							parseInt(t
								.substr(
									1)
								) : 0 ==
							t.indexOf(
								"-") &&
							(t = h -
								parseInt(
									t
									.substr(
										1
										)
									))
					}
				}(t *= 1) < 0 && (t =
					0), o.media
					.duration() > 0 &&
					t > o.media
					.duration() && (t =
						0), !exist(o
						.vast) && !
					exist(o
					.vastloader) && o
					.media.duration() >
					0 ? (o.seekto =
						void 0, o
						.actions.Seek(t,
							!0), o
						.actions
						.Playing()) : o
					.seekto = t
			}
			if ("fullscreen" == e && (o
					.fullscreen || o
					.actions
					.Fullscreen()),
				"exitfullscreen" == e &&
				o.fullscreen && o
				.actions.Normalscreen(),
				"isfullscreen" == e)
				return o.fullscreen;
			if ("size" == e) return o
				.screen_w + "/" + o
				.screen_h;
			if ("fix" == e && exist(o
					.minify) && o.minify
				.Do(), ("unfixing" ==
					e || "unfix" == e
					) && exist(o
				.minify) && o.minify
				.Un(), "time" == e) {
				var m = o.media ? o
					.media.time() : 0;
				if (o.continue && 1 == v
					.timestore && !o
					.start && 0 == m) {
					var g = o.continue
						.flag();
					g.t && (m = g.t)
				}
				return m
			}
			if ("timeplay" == e && (o
					.butplstart &&
					apiProcessor("play",
						"id:" + o
						.butplstart), o
					.butseekto && (
						apiProcessor(
							"seek", o
							.butseekto),
						apiProcessor(
							"play"))),
				"duration" == e)
			return o.media ? o.media
				.duration() : 0;
			if ("buffered" == e)
			return o.media ? o.media
				.loaded() : 0;
			if ("points" == e && t && (v
					.points = t, o
					.controls
					.RenewPoints()),
				"quality" == e) {
				if (!exist(t)) return o
					.media ? NoSpan(
						o.media
						.getQuality()
						) : 0;
				n ? (v.hd = Switcher(v
							.hd, t, n),
						2 == o
						.files_quality
						.length && o
						.actions
						.SetQuality(v
							.hd)) : o
					.actions.SetQuality(
						t)
			}
			if ("audiotrack" == e) {
				if (!exist(t)) return o
					.media ? o.media
					.getAudioTrack() :
					0;
				n ? (v.ahd = Switcher(v
							.ahd, t, n),
						2 == o
						.files_audiotrack
						.length && o
						.actions
						.SetAudioTrack(v
							.ahd)) : o
					.actions
					.SetAudioTrack(t)
			}
			if ("isyoutube" == e)
			return "youtube" == o
				.file_type;
			if ("restart" == e && (o
					.current_audiotrack >
					0 && (o
						.restart_audio =
						o
						.current_audiotrack
						), o.actions
					.NewFile(o.files[o
						.current_file
						])),
				"playing" == e) return o
				.play;
			if ("started" == e) return o
				.start;
			if ("system" == e) return o
				.system[t];
			if ("youtubeready" == e &&
				1 != o.destroyed && o
				.media.onYoutubeReady(),
				"id" == e) return v.id;
			if ("log" == e && (v.log =
					t),
				"eventstracker" == e &&
				(v.eventstracker = t),
				"pip" == e && o.media
				.PipToggle(),
				"switchpip" == e && (o
					.media.PipSwitch(),
					n && (o.piped =
						Switcher(o
							.piped, t, n
							))),
				"airplay" == e && o
				.media.Airplay(),
				"pipwebkit" == e && o
				.media.PipWebkit(),
				"options" == e && 1 != v
				.HDVBPlayercom &&
				console.log(options),
				"castinit" == e && o
				.chromecast && o
				.chromecast.init(),
				"subtitle" == e && (v
					.subtitle = t,
					exist(t) && (t
						.toString()
						.length < 3 && o
						.sbt ? o.sbt
						.SetSubtitle(1 *
							t) : o
						.actions
						.Subtitle(t))),
				"quiz" == e && exist(o
					.quiz)) {
				if (!exist(t)) return o
					.quiz.Active();
				o.quiz.api(t)
			}
			if ("geo" == e) return !!o
				.geobj && o.geobj;
			if ("box" == e) {
				var b = createElement(
					"div");
				b.id = t, b.style
					.zIndex = 1e4, o
					.frame.appendChild(
						b)
			}
			if ("screenshot" == e) {
				if (!o.tagvideo)
				return !1;
				var y, w =
					createElement(
						"canvas"),
					k = o.media.size();
				w.width = k.width > 0 ?
					k.width : o
					.normal_w, w
					.height = k.height >
					0 ? k.height : o
					.normal_h, css(w, {
						position: "absolute",
						top: -w
							.height,
						left: -w
							.width,
						display: "none"
					}), document.body
					.appendChild(w);
				var O = w.getContext(
					"2d");
				O.drawImage(o.media
					.tag(), 0, 0, w
					.width, w.height
					);
				var C = 2,
					L = document
					.createElement(
						"canvas");
				L.width = w.width * C, L
					.height = w.height *
					C;
				var S = L.getContext(
					"2d");
				S.drawImage(o.media
						.tag(), 0, 0, w
						.width * C, w
						.height * C),
					1 == v
					.sscopyright &&
					exist(v.sstext) && (
						exist(v
							.ssfontsize
							) || (v
							.ssfontsize =
							20), exist(v
							.ssfontcolor
							) || (v
							.ssfontcolor =
							"ffffff"), S
						.font = v
						.ssfontsize +
						"px Courier, Arial",
						S.fillStyle =
						CheckColor(v
							.ssfontcolor
							), S
						.fillText(
							"domain" ==
							v.sstext ? o
							.domain : v
							.sstext, v
							.ssfontsize,
							w.height *
							C - v
							.ssfontsize -
							5)), O
					.drawImage(L, 0, 0,
						w.width, w
						.height);
				try {
					y = w.toDataURL(
						"image/jpeg"
						)
				} catch (T) {
					return console.log(T
							.message), !
						1
				}
				return y
			}
			if ("dash" == e) return o
				.file_type == e ? o
				.media.getDASH() :
				void 0;
			if ("hls" == e) return o
				.file_type == e ? o
				.media.getHLS() :
				void 0;
			if ("poster" == e) return !o
				.play && (o.media
					.Poster(t), !0);
			if ("stretch" == e) {
				if (!exist(t))
				return existv(v
						.covervideo,
						0);
				"1/0" == t && (t = 1 -
						existv(v
							.covervideo,
							0)), v
					.covervideo = t, o
					.media.normalscale()
			}
			if ("scale" == e) {
				if (!exist(t)) return [o
					.mediascale
					.x, o
					.mediascale
					.y, o
					.mediacontainer
					.style.left,
					o
					.mediacontainer
					.style.top
				];
				0 == t ? o.media
					.normalscale() : o
					.media.scale(t)
			}
			if ("title" == e)
			return exist(t) ? (
					exist(t) && (v
						.title = t),
					o.actions.Title(
						"title"), !0
					) : v.title;
			if ("invert" == e && o
				.actions
				.InvertPlaylist(),
				"push" == e && t && (o
					.playlist_source ||
					(o
					.playlist_source = []),
					"object" ==
					typeof t && (t = o
						.playlist_source
						.concat(t), e =
						"playlist")),
				"playlist" == e && t) {
				if ("object" ==
					typeof t) try {
					return o.actions
						.UpdatePlaylist(
							t), !0
				} catch (E) {
					return !1
				} else if (t
					.indexOf(
					".txt") == t
					.length - 4 || t
					.indexOf(
						".txt?") > 0
					) {
					var r = XHR(t);
					return r
						.onload =
						function() {
							if (4 ==
								this
								.readyState &&
								200 ==
								this
								.status
								)
								try {
									apiProcessor
										("playlist",
											JSON
											.parse(
												this
												.responseText
												)
											)
								} catch (
									e
									) {}
						}, r.send(),
						!0
				}
			}
			if ("next" == e && o
				.controls && o.controls
				.PlaylistNext(),
				"prev" == e && o
				.controls && o.controls
				.PlaylistPrev(),
				"cut" == e && o
				.controls && o.controls
				.Cut(t), "flip" == e &&
				o.media && o.media
				.flip(), "find" == e &&
				exist(t) && exist(o
					.playlist_dic)) {
				for (var P in o.play ||
						(v.autoplay =
						0), o
						.playlist_dic) o
					.playlist_dic
					.hasOwnProperty(
					P) && o
					.playlist_dic[P]
					.pjs_id == t && (t =
						P);
				return -1 === t.indexOf(
						"xxx-") && (
						"x-" == t
						.substr(0, 2) &&
						(t = o
							.playlist_dic[
								t]
							.folder[o
								.playlist_dic[
									t]
								.folder
								.length -
								1].id),
						"xx" == t
						.substr(0, 2) &&
						(t = o
							.playlist_dic[
								t]
							.folder[o
								.playlist_dic[
									t]
								.folder
								.length -
								1].id)),
					!!exist(o
						.playlist_dic[t]
						) && (o.controls
						.PlaylistOpenId(
							t), !0)
			}
			if ("playlist_folders" ==
				e) {
				var A = [];
				if (exist(o
						.playlist_dic))
					for (var P in o
							.playlist_dic)
						o.playlist_dic[
							P].folder &&
						-1 == o
						.playlist_dic[P]
						.pjs_parent_i &&
						A.push({
							title: o
								.playlist_dic[
									P
									]
								.title,
							id: o
								.playlist_dic[
									P
									]
								.id
						});
				return A
			}
			if ("playlist_id" == e && o
				.plid) return o
				.playlist_dic[o
					.plid].pjs_id ?
				o.playlist_dic[o
					.plid].pjs_id :
				o.plid;
			if ("playlist_length" == e)
				return o.playlist_dic ?
					Object.keys(o
						.playlist_dic)
					.length : -1;
			if ("playlist_title" == e &&
				exist(o.playlist_title))
				return o.playlist_title;
			if ("showplaylist" == e && o
				.controls
			.PlaylistShow(),
				"toolbar" == e && o
				.controls.ShowForce(),
				"vastnow" == e) return !
				!o.vast;
			if ("vastinfo" == e)
			return !!o.vast &&
				VastInfo();
			if ("vastpause" == e)
			return !!o.vast && o
				.vast.pause();
			if ("vastresume" == e)
				return !!o.vast && o
					.vast.resume();
			if ("vaststart" == e) {
				if (!o.vast) return !1;
				o.vast.startAd()
			}
			if ("vastmute" == e) {
				if (!o.vast) return !1;
				o.vast.mute()
			}
			if ("captions" == e && (v
					.captions =
					Switcher(v.captions,
						t, n), o.media
					.captions()),
				"loop" == e) {
				if (exist(n)) v.loop =
					Switcher(v.loop, t,
						n);
				else {
					if (!exist(t))
						return v.loop;
					"0/1" == t && (t =
							1 - v.loop),
						v.loop = t
				}
			}
			if ("shuffle" == e) {
				if (exist(n)) v
					.shuffle = Switcher(
						v.shuffle, t, n
						);
				else {
					if (!exist(t))
						return v
						.shuffle;
					v.shuffle = t
				}
			}
			if ("autonext" == e ||
				"playlistloop" == e) {
				var l = "autoplaylist";
				return "playlistloop" ==
					e && (l =
						"playlistrewind"
						), exist(n) ? v
					.playlist[l] =
					Switcher(v.playlist[
						l], t, n) :
					exist(t) && (
						"0/1" == t && (
							t = 1 - v
							.playlist[l]
							), v
						.playlist[l] = t
						), v.playlist[l]
			}
			if ("hd" == e && 2 == o
				.files_quality.length &&
				(v.hd = o.files_quality[
						o
						.current_quality
						], v.hd =
					Switcher(v.hd, t,
					n), o.files_quality[
						0] == v.hd ? o
					.actions.SetQuality(
						0) : o.actions
					.SetQuality(1)),
				"v" == e && t) {
				if (0 == t.indexOf(
						"file") || 0 ==
					t.indexOf("bk"))
					return;
				return v[t]
			}
			if (0 == e.indexOf(
					"update:")) {
				var z = e.substr(7);
				if ("object" ==
					typeof t &&
					"object" ==
					typeof v[z])
					for (var I in t) t
						.hasOwnProperty(
							I) && (v[z][
							I
						] = t[I]);
				else - 1 == e.indexOf(
					"rc_") && (v[
					z] = t);
				return !0
			}
			if (0 == e.indexOf(
				"text:") && o.controls
				.customText(e.substr(5),
					t), "currentfile" ==
				e) return o.media ? o
				.media
			.currentFile() : "";
			if ("vrsn" == e) return o
				.version;
			if ("hlserror" == e)
			return o.hlserror;
			if ("dasherror" == e)
			return o.dasherror;
			if ("visibility" == e)
				return o.visibility;
			if ("vastids" == e) return o
				.vast ? o
				.vast_adid : void 0;
			"destroy" == e && (o.actions
				.StopMedia(), o
				.destroyed = 1, v
				.hotkey.on = 0, o
				.container
				.innerHTML = "")
		}
	}

	function Switcher(e, t, o) {
		var n = trim(t) + "";
		if (t.indexOf("/") > 0) {
			var s = t.split("/");
			2 == s.length && (e == trim(
				s[0]) ? (n =
				trim(s[1]), o &&
				o.CustomSwitch(
					1)) : (n =
				trim(s[0]), o &&
				o.CustomSwitch(
					0)))
		}
		return n
	}

	function XHR(e) {
		var t = new XMLHttpRequest;
		return t.open("GET", e, !0), t
	}

	function FindIdPl(e) {
		var t = e.substr(3);
		if (o.playlist_dic)
			for (var n in o
				.playlist_dic) o
				.playlist_dic
				.hasOwnProperty(n) && o
				.playlist_dic[n]
				.pjs_id == t && (t = n);
		return t
	}

	function VastInfo() {
		var e;
		if (o.vast && o.vast.active() &&
			(e = o.vast), !e && o
			.vastloader && (e = o
				.vastloader), e) {
			var t = {
				is: o.vasttype,
				system: e.info(
					"adsystem"),
				version: e.info(
					"version"),
				vpaid: e.info(
					"isVpaid"),
				url: o
					.current_vast_url +
					(e.info(
							"wrapper") ?
						e.info(
							"wrapper0"
							) + e
						.info(
							"wrapper"
							) : ""),
				type: e.info(
					"filetype"),
				file: e.info(
					"file"),
				time: o.media ? o
					.media.time() :
					"",
				volume: e
				.getVolume(),
				id: o.vast_adid
			};
			return "midroll" == o
				.vasttype && (t
					.midroll_time = o
					.midrollcrtm), t
		}
	}
	this.api = function(e, t, o) {
		return apiProcessor(e, t, o)
	};
	var createElement = function(e) {
			var t = e;
			("div" == e || "div2" ==
			e) && (t = "hdvbplayer");
			var o = document
				.createElement(t);
			return "div2" == e && css(
			o, {
				cursor: "pointer",
				display: "block"
			}), o
		},
		log = function(e, t, o, n, s, a,
			r) {
			if (1 == v.log || 1 == v
				.logout) {
				var l = e + (void 0 !=
					t ? " " + t : ""
					) + (void 0 !=
					o ? " " + o : ""
					) + (void 0 !=
					n ? " " + n : ""
					) + (void 0 !=
					s ? " " + s : ""
					) + (void 0 !=
					a ? " " + a : ""
					) + (void 0 !=
					r ? " " + r : ""
					);
				console.log(
						"HDVBPlayer" + (
							1 == v
							.pjsframed ?
							"2" : "") +
						": " + l), 1 ==
					v.logout && exist(
						document
						.getElementById(
							"pjslog")
						) && (document
						.getElementById(
							"pjslog")
						.innerHTML +=
						l + "<br/>")
			}
		},
		CustomFonts = function() {
			if (1 == v.fonts && exist(v
					.fontnames) && "" !=
				v.fontnames) {
				var e = document
					.createElement(
						"link");
				e.rel = "stylesheet", e
					.href =
					"https://fonts.googleapis.com/css?family=" +
					v.fontnames.replace(
						/,/ig, "|")
					.replace(/ /ig,
					"+"), document.head
					.appendChild(e)
			}
		},
		SvgColor = function(e, t) {
			for (var o = ["path",
					"polygon",
					"polyline",
					"rect",
					"ellipse",
					"circle"
				], n = 0; n < o
				.length; n++) {
				var s = e
					.querySelectorAll(
						"svg " + o[n]);
				if (s.length > 0)
					for (var a = 0; a <
						s.length; a++)
						s[a].style
						.fill = t
			}
		},
		Time = function(e) {
			e < 0 && (e = 0);
			var t = o.media.duration >=
				600,
				n = o.media.duration >=
				3600,
				s = Math.floor(e / 60),
				a = Math.floor(e - 60 *
					s),
				r = Math.floor(s / 60),
				l = Math.floor(r / 24);
			if (s -= 60 * r, l > 0 && (
					r -= 24 * l), !(1 ==
					v.dvrtime && o.media
					.isLive()))
			return String((l > 0 ?
						l + ":" : ""
						) + (r >
						0 || n ? r +
						":" : "") +
					((r > 0 || t) &&
						s < 10 ?
						"0" : "") +
					s + ":" + (a <
						10 ? "0" :
						"") + a);
			var d = new Date;
			return String(new Date(d
					.getTime() +
					1e3 * e)
				.toLocaleTimeString()
				)
		},
		timeFormat = function(e) {
			var t = Math.floor(e),
				n = Math.floor(t / 60),
				s = Math.floor(n / 60);
			n = Math.floor(n % 60), s >
				0 && n < 10 && (n =
					"0" + n);
			var a = (s > 0 ? s + ":" :
				"") + (n >= 0 ? n :
				"0") + ":" + (t = (
					t = Math.floor(
						t % 60)) >=
				0 ? t >= 10 ? t :
				"0" + t : "00");
			if (!(1 == v.dvrtime && o
					.media.isLive()))
				return a;
			var r = new Date;
			return String(new Date(r
					.getTime() +
					1e3 * e)
				.toLocaleTimeString()
				)
		},
		Href = function() {
			return encodeURIComponent(
				window.location !=
				window.parent
				.location ? document
				.referrer : document
				.location.href)
		},
		NoSpan = function(e) {
			if (e) {
				var t = (e = e
					.toString())
					.indexOf(
						" <span style='opacity"
						);
				t > -1 && (e = e.substr(
					0, t))
			}
			return e
		},
		Script = function(e, t, o) {
			var n;
			if (!Scripted(e) && t) {
				n = document
					.createElement(
						"script"),
					"same" == t && (t =
						e), n.src = -
					1 == t.indexOf(
					"//") ? "//" + t :
					t, n.async = 1, o &&
					(n.name = o);
				var s = document
					.getElementsByTagName(
						"script")[0];
				s.parentNode
					.insertBefore(n, s)
			}
			return n
		},
		Scripted = function(e) {
			for (var t = !1, o =
					document
					.getElementsByTagName(
						"script"), n =
					0; n < o.length; n++
				) o[n].src.indexOf(e) >
				-1 && (t = !0);
			return t
		},
		hex2rgb = function(e, t) {
			var o = parseInt(3 == (e = e
						.replace("#",
							""))
					.length ? e.slice(0,
						1).repeat(2) : e
					.slice(0, 2), 16),
				n = parseInt(3 == e
					.length ? e.slice(1,
						2).repeat(2) : e
					.slice(2, 4), 16),
				s = parseInt(3 == e
					.length ? e.slice(2,
						3).repeat(2) : e
					.slice(4, 6), 16);
			return t ? "rgba(" + o +
				", " + n + ", " + s +
				", " + t + ")" :
				"rgb(" + o + ", " + n +
				", " + s + ")"
		},
		css = function(e, t) {
			if (exist(e))
				for (var o in t) t
					.hasOwnProperty(
					o) && "NaNpx" != t[
						o] && void 0 !=
					t[o] && ("number" ==
						typeof t[o] &&
						"opacity" !=
						o && "zIndex" !=
						o && (t[o] +=
							"px"), (o
							.indexOf(
								"color"
								) > -
							1 || o
							.indexOf(
								"Color"
								) > -1
							) && -1 ==
						t[o].indexOf(
							"#") && -
						1 == t[o]
						.indexOf(
						"rgba") && (t[
							o] = "#" +
							t[o]),
						"transform" ==
						o && (e.style[
								"-ms-" +
								o] = t[
								o], e
							.style[
								"-moz-" +
								o] = t[
								o], e
							.style[
								"-webkit-" +
								o] = t[
								o], e
							.style[
								"-o-" +
								o] = t[
								o]),
						"fontFamily" ==
						o && t[o]
						.indexOf(" ") >
						-1 && (t[o] =
							'"' + t[o] +
							'"'),
						"box-sizing" ==
						o ? e.style
						.setProperty(o,
							t[o],
							"important"
							) : e.style[
							o] = t[o])
		},
		Bglines = function(e, t, o, n) {
			var s = 1 * existv(o, 1),
				a = 1 * existv(n, 1);
			css(e, {
				background: "repeating-linear-gradient(-45deg," +
					t + "," +
					t + " " +
					s +
					"px,rgba(0,0,0,0)," +
					s +
					"px,rgba(0,0,0,0) " +
					(s + a) +
					"px)"
			})
		},
		CheckColor = function(e) {
			return "#" != e.substr(0,
				1) ? e = "#" + e : e
		},
		controlCSS = function(e, t, n) {
			t || (t = "#fff"), t =
				CheckColor(t);
			var s = random(1e5, 1e6),
				a = (e = (e = e.replace(
						/\(rand\)/g,
						s)).replace(
						/\(color\)/g, t
						)).substr(0, e
					.indexOf("|||")),
				r = e.substr(e.indexOf(
					"|||") + 3),
				l = "";
			o.system.webkit && (l = (l =
					(l = (l = r
							.replace(
								/animation:/g,
								"-webkit-animation:"
								))
						.replace(
							/animation-/g,
							"-webkit-animation-"
							))
					.replace(
						/@keyframes/g,
						"@-webkit-keyframes"
						)).replace(
					/transform/g,
					"-webkit-transform"
					)), n.innerHTML = a,
				pushCSS(l + r)
		},
		indOf = function(e, t) {
			for (var o, n = 0; n < e
				.length; n++) e[n] && e[
					n].indexOf(t) > -
				1 && (o = !0);
			return o
		},
		pushCSS = function(e) {
			o.css && (o.css.styleSheet ?
				o.css.styleSheet
				.cssText = e : o.css
				.appendChild(
					document
					.createTextNode(
						e)))
		},
		Pos0 = function(e) {
			css(e, {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%"
			})
		},
		Pnt0 = function(e) {
			css(e, {
				pointerEvents: "none"
			})
		},
		xhr = function(e, t) {
			var o = new XMLHttpRequest;
			o.open("GET", e, !0), o
				.onload = t, o.send()
		},
		Findhdvbplayer = function(e) {
			if (e)
				for (var t = 0; t < 5 &&
					"hdvbplayer" != e
					.nodeName; t++) e
					.parentElement && (
						e = e
						.parentElement);
			return e
		},
		gif = function(e) {
			var t = document
				.createElement("img");
			o.gifed.indexOf(e) > -1 ? (o
					.gifed.push(e), e =
					e.indexOf("?") > 0 ?
					e + "&" + Math
					.random() : e +
					"?" + Math.random()
					) : o.gifed.push(e),
				t.setAttribute("src",
				e), t.setAttribute(
					"height", "1px"), t
				.setAttribute("width",
					"1px")
		},
		attr = function(e, t) {
			for (var o in t) t
				.hasOwnProperty(o) &&
				void 0 != o &&
				void 0 !== t[o] && e
				.setAttribute(o, t[o])
		},
		destroy = function(e) {
			if (e) try {
				e.parentNode
					.removeChild(e),
					e = null
			} catch (t) {}
		},
		random = function(e, t) {
			return Math.floor(arguments
				.length > 1 ? (t -
					e + 1) * Math
				.random() + e : (e +
					1) * Math
				.random())
		},
		randomstr = function() {
			return Math.random()
				.toString(36).substring(
					2, 12)
		},
		removebykey = function(e, t) {
			return e = Object.keys(e)
				.reduce(function(o, n) {
					return n != t &&
						(o[n] = e[
							n]), o
				}, {})
		},
		trim = function(e) {
			return "string" ==
				typeof e ? e.replace(
					/^\s+|\s+$/gm, "") :
				e
		},
		cut = function(e, t, o) {
			var n = !1;
			if (e && e.indexOf(t) > -
				1) {
				var n = e.substr(e
					.indexOf(t) + t
					.length);
				o && n.indexOf(o) > -
					1 && (n = n.substr(
							0, n
							.indexOf(o)
							))
			}
			return n
		},
		encode = function(e, t) {
			return 0 == t ? "#0" + salt
				.e(e) : -1 == t ? salt
				.e(e) : 1 == t ? "#1" +
				pepper(salt.e(e), 1) :
				void 0
		},
		str2obj = function(x) {
			if ("" != v[x]) {
				if ("string" !=
					typeof v[x]) o[x +
					"o"] = v[x];
				else if (0 == v[x]
					.indexOf("[{"))
				try {
					v[x] = v[x]
						.replace(
							/pjs'qt/ig,
							'"'), o[
							x + "o"
							] =
						eval(v[x])
				} catch (e) {}
			}
		},
		dechar = function(e) {
			return String.fromCharCode(
				e)
		},
		decode = function(e) {
			return "#1" == e.substr(0,
					2) ? salt.d(pepper(e
					.substr(2), -1)) :
				"#0" == e.substr(0, 2) ?
				salt.d(e.substr(2)) : e
		},
		checkBase64 = function(e) {
			return e && -1 == e.indexOf(
					"http") && -1 == e
				.indexOf(".") && e
				.length > 100 && -1 == e
				.indexOf("data:") && (
					e =
					"data:image/png;base64," +
					e), e
		},
		hide = function(e) {
			e && (e.style.visibility =
				"hidden")
		},
		show = function(e) {
			e && (e.style.visibility =
				"visible")
		},
		hide2 = function(e) {
			e && (e.style.display =
				"none")
		},
		show2 = function(e) {
			e && (e.style.display =
				"block")
		},
		isVisible = function(e) {
			return !!e && "hidden" != e
				.style.visibility &&
				"none" != e.style
				.display
		},
		int = function(e) {
			return "string" ==
				typeof e && e.indexOf(
					"px") > 0 && (e = e
					.substr(0, e
						.indexOf("px"))
					), parseInt(e)
		},
		hidden = function(e) {
			return "none" == e.style
				.display
		},
		hexToRgb = function(e) {
			if (e) {
				var t, o = parseInt(e,
						16),
					n = o >> 16 & 255;
				return n + "," + (o >>
						8 & 255) + "," +
					(255 & o)
			}
		},
		MarginPadding = function(e, t,
			o) {
			if (e[t + "top"] = 0, e[t +
					"right"] = 0, e[t +
					"bottom"] = 0, e[t +
					"left"] = 0, exist(
					e[o])) {
				var n = e[o].split(" ");
				4 == n.length && (e[t +
						"top"] = n[
						0] ?
					parseFloat(n[
					0]) : 0, e[t +
						"right"] =
					n[1] ?
					parseFloat(n[
					1]) : 0, e[t +
						"bottom"] =
					n[2] ?
					parseFloat(n[
					2]) : 0, e[t +
						"left"] = n[
						3] ?
					parseFloat(n[
					3]) : 0)
			}
			return e
		},
		MarPad = function(e) {
			return e && (e = e.replace(
					/ /ig, "px ")), e +
				"px"
		},
		StringVar = function(e, t) {
			return v[e] && "" != v[e] ?
				v[e] : t
		},
		abc = String.fromCharCode(65,
			66, 67, 68, 69, 70, 71, 72,
			73, 74, 75, 76, 77, 97, 98,
			99, 100, 101, 102, 103, 104,
			105, 106, 107, 108, 109, 78,
			79, 80, 81, 82, 83, 84, 85,
			86, 87, 88, 89, 90, 110,
			111, 112, 113, 114, 115,
			116, 117, 118, 119, 120,
			121, 122),
		salt = {
			_keyStr: abc +
				"0123456789+/=",
			e: function(e) {
				var t, o, n, s, a,
					r, l, d = "",
					c = 0;
				for (e = salt._ue(
					e); c < e
					.length;) t = e
					.charCodeAt(
					c++), o = e
					.charCodeAt(
					c++), n = e
					.charCodeAt(
					c++), s = t >>
					2, a = (3 &
					t) << 4 | o >>
					4, r = (15 &
					o) << 2 | n >>
					6, l = 63 & n,
					isNaN(o) ? r =
					l = 64 : isNaN(
						n) && (l =
						64), d = d +
					this._keyStr
					.charAt(s) +
					this._keyStr
					.charAt(a) +
					this._keyStr
					.charAt(r) +
					this._keyStr
					.charAt(l);
				return d
			},
			d: function(e) {
				var t, o, n, s, a,
					r, l, d = "",
					c = 0;
				for (e = e.replace(
						/[^A-Za-z0-9\+\/\=]/g,
						""); c < e
					.length;) s =
					this._keyStr
					.indexOf(e
						.charAt(c++)
						), a = this
					._keyStr
					.indexOf(e
						.charAt(c++)
						), r = this
					._keyStr
					.indexOf(e
						.charAt(c++)
						), l = this
					._keyStr
					.indexOf(e
						.charAt(c++)
						), t = s <<
					2 | a >> 4, o =
					(15 & a) << 4 |
					r >> 2, n = (3 &
						r) << 6 | l,
					d += dechar(t),
					64 != r && (d +=
						dechar(o)),
					64 != l && (d +=
						dechar(n));
				return salt._ud(d)
			},
			_ue: function(e) {
				e = e.replace(
					/\r\n/g,
					"\n");
				for (var t = "", o =
						0; o < e
					.length; o++) {
					var n = e
						.charCodeAt(
							o);
					n < 128 ? t +=
						dechar(n) :
						n > 127 &&
						n < 2048 ? (
							t +=
							dechar(
								n >>
								6 |
								192
								),
							t +=
							dechar(
								63 &
								n |
								128)
							) : (
							t +=
							dechar(
								n >>
								12 |
								224
								),
							t +=
							dechar(
								n >>
								6 &
								63 |
								128
								),
							t +=
							dechar(
								63 &
								n |
								128)
							)
				}
				return t
			},
			_ud: function(e) {
				for (var t = "", o =
						0, n = 0,
						s = 0; o < e
					.length;)(n = e
						.charCodeAt(
							o)) <
					128 ? (t +=
						dechar(n),
						o++) : n >
					191 && n < 224 ?
					(t += dechar((
								31 &
								n
								) <<
							6 | 63 &
							(s = e
								.charCodeAt(
									o +
									1
									)
								)),
						o += 2) : (
						t += dechar(
							(15 &
							n) <<
							12 | (
								63 &
								(s = e
									.charCodeAt(
										o +
										1
										)
									)
								) <<
							6 | 63 &
							(c3 = e
								.charCodeAt(
									o +
									2
									)
								)),
						o += 3);
				return t
			}
		},
		pepper = function(e, t) {
			e = (e = e.replace(/\+/g,
				"#")).replace(/#/g,
				"+");
			var n = sugar(o.y) * t;
			t < 0 && (n += abc.length /
				2);
			var s = abc.substr(2 * n) +
				abc.substr(0, 2 * n);
			return e.replace(
				/[A-Za-z]/g,
				function(e) {
					return s.charAt(
						abc
						.indexOf(
							e))
				})
		},
		sugar = function(e) {
			e = e.split(dechar(61));
			var t, o = "",
				n = dechar(120);
			for (var s in e)
				if (e.hasOwnProperty(
					s)) {
					var a = "";
					for (var r in e[s])
						e[s]
						.hasOwnProperty(
							r) && (a +=
							e[s][r] ==
							n ? dechar(
								49) :
							dechar(48));
					t = parseInt(a, 2),
						o += dechar(t
							.toString(
								10))
				} return o.substr(0, o
				.length - 1)
		},
		exist = function(e) {
			return null != e &&
				void 0 !== e &&
				"undefined" != e
		},
		existv = function(e, t) {
			return exist(e) ? e : t
		},
		exist2 = function(e) {
			return exist(e) && -1 !=
				e && "" != e
		},
		copyObject = function(e) {
			return "object" ==
				typeof e && (e = JSON
					.parse(JSON
						.stringify(e))),
				e
		},
		findLeft = function(e) {
			return e
				.getBoundingClientRect()
				.left + (window
					.scrollX ? window
					.scrollX : window
					.pageXOffset)
		},
		checkFont = function(e) {
			return 1 == v.globalfont &&
				exist2(v
				.globalfontname) && (e =
					v.globalfontname), e
		},
		findTop = function(e) {
			let t = e
				.getBoundingClientRect();
			return t.top + window
				.scrollY
		},
		redirect = function(e) {
			"" != e && (1 == v
				.redirectblank ?
				window.open(e) :
				window.location
				.href = e, e = "")
		},
		reRightMenu = function() {
			1 == v.rightmenu && (o
				.rightmenu && o
				.frame.removeChild(o
					.rightmenu), o
				.rightmenu = null)
		},
		Actions = function() {
			var volumewheelin, vast_and,
				vast_or, vast_type,
				vasturl,
				_fullscreen_end = !1;

			function Prefile(e) {
				return exist(v
					.prefile) && -1 == e
					.indexOf("//") && (
						e = v.prefile +
						e), e
			}

			function Thumbs() {
				1 == v.thumbs &&
					"undefined" !=
					typeof PluginThumbs &&
					(o.th =
						new PluginThumbs
						)
			}

			function onPlay(e) {
				o.onplay = !0, o
					.controls && o
					.controls
					.SettingsVisible() &&
					o.controls
					.Settings(), o
					.droplist && o
					.droplist.Close(),
					e || o.media.Play(),
					o.checknative ||
					setTimeout(
					function() {
						o.media
							.NativeControls()
					}, 500), o.play || o
					.controls.Play(),
					1 == v.effects && o
					.effects.api(
					"play"), 1 == v
					.vast && o.actions
					.VastRecover(
						"pauseroll"), o
					.system.mobile && o
					.controls
					.HideInterval(),
					exist(o.share) && o
					.share.isOpen() && o
					.share.Hide(), 1 ==
					v.heartbeats &&
					exist(v
					.heartbeat) && o
					.dt && "" != v
					.heartbeat && !
					exist(o
						.heartbeatInterval
						) && (o
						.heartbeatInterval =
						setInterval(
							Heartbeat,
							1e3 * v
							.heartbeatinterval
							),
						Heartbeat())
			}

			function StartTimeout() {
				o.starttimeout = !1, o
					.controls.refresh()
			}

			function Quartile(e) {
				o.quartile[e] = !0, 1 ==
					v.timestore && 1 ==
					v.playedstore && v
					.playedquartile ==
					e && o.storage && o
					.plid && o
					.continue && o
					.continue.writePl(o
						.plid)
			}

			function gaTrackPlay(e, t,
				n, s) {
				!exist(o.gatracked[
					t]) && n > s &&
					gaTracker(e, t, 1)
			}

			function NativeEnterFs() {
				var e = o.media.tag();
				e && (o.nativefull = !0,
					o.media
					.nativeSubtitle(),
					e
					.webkitEnterFullScreen(),
					e
					.addEventListener(
						"webkitendfullscreen",
						iosExitFullscreen
						))
			}

			function NativeExitFs() {
				var e = o.media.tag();
				e && e
					.webkitExitFullscreen()
			}

			function PostFullscreen() {
				!0 != o.fs_error && (o
					.ispipkit && o
					.media
					.PipWebkit(),
					1 == v.hotkey
					.volumewheelfull &&
					(VolumeWheelX(!
							0), o
						.volumewheel = !
						0), 1 == v
					.effects && o
					.effects.api(
						"full"), js(
						"fullscreen"
						),
					gaTracker(
						"full",
						"Fullscreen",
						1))
			}
			o.system.tv && log("tv"),
				this.Title = function(
				e) {
					o.controls && o
						.controls.title(
							e)
				}, this.File = function(
					e) {
					if (!e) return e;
					if ("string" ==
						typeof e && 0 ==
						(e = e.replace(
							/(\r\n|\n|\r)/gm,
							""))
						.indexOf("[{"))
						try {
							e = e
								.replace(
									/pjs'qt/ig,
									'"'
									),
								e = JSON
								.parse(
									e)
						} catch (t) {
							e = "incorrect JSON"
						}
					if ("object" ==
						typeof e && (o
							.playlist_dic = [],
							o
							.playlist_source =
							copyObject(
								e), o
							.playlist =
							IndexPlaylist(
								e), o
							.playlist
							.length > 0)
						) {
						if (1 == v
							.playlist
							.openlast &&
							!v.plstart
							) {
							var n =
								Object
								.keys(o
									.playlist_dic
									)
								.slice(-
									1)[
									0];
							n && (v.plstart =
								n)
						}
						var s =
							FindFileInPlaylist();
						if (s) {
							e = s.file,
								o
								.titlestore =
								s.title,
								o
								.controls &&
								o
								.controls
								.titlepl(
									s
									.title
									),
								exist(s
									.poster
									) &&
								(o.media ?
									o
									.media
									.Poster(
										s
										.poster
										) :
									v
									.poster =
									s
									.poster
									),
								exist(s
									.sub
									) &&
								(s.subtitle =
									s
									.sub
									),
								exist(s
									.start
									) &&
								(v.start =
									o
									.seekto =
									s
									.start
									),
								SettingsTimers(
									"offset"
									),
								exist(s
									.id
									) &&
								(o.plid =
									s.id
									);
							var a = [
								"subtitle",
								"vars",
								"embed",
								"url",
								"url2",
								"url3",
								"heartbeat",
								"thumbnails",
								"label",
								"download",
								"points",
								"remove",
								"end",
								"delete",
								"title2",
								"skip"
							];
							exist(v
									.control_title) &&
								1 == v
								.control_title
								.showfrom1file &&
								1 == v
								.control_title
								.showtitleplaylist &&
								(a.push(
										"title"),
									a
									.push(
										"t1"
										),
									a
									.push(
										"t2"
										),
									a
									.push(
										"t3"
										),
									a
									.push(
										"t4"
										),
									a
									.push(
										"t5"
										)
									);
							for (var r =
									0; r <
								a
								.length; r++
								) exist(
									s[a[
										r]]
									) &&
								(v[a[
									r]] =
									s[a[
										r]]
									);
							a.indexOf(
									"title"
									) >
								0 && (
									1 ==
									v
									.control_title
									.templated &&
									(o.title_template =
										v
										.control_title
										.template,
										o
										.actions
										.TitleTemplate(
											s
											)
										),
									o
									.actions
									.Title(
										"title"
										)
									), o
								.controls &&
								o
								.controls
								.UpdatePlaylist(
									o
									.playlist
									), o
								.droplist &&
								o
								.droplist
								.Update()
						}
					}
					if ("string" ==
						typeof e) {
						if (0 == (e =
								fjs(e))
							.indexOf(
								"#" + v
								.enc2
								) && (
								e = o[o
									.fd[
										0]
									](e)
								), e &&
							(0 == e
								.indexOf(
									"#" +
									v
									.enc3
									) &&
								e
								.indexOf(
									v
									.file3_separator
									) >
								0 && (
									e =
									o[o.fd[
										1]]
									(e)
									),
								0 == e
								.indexOf(
									"#0"
									) &&
								(e = fd0(
									e
									)),
								e = fjs(
									e)),
							1 == v
							.fplace && (
								e =
								fplace(
									e)),
							"" == e && (
								log(
									"empty file"),
								o
								.media_error = !
								0, js(
									"error",
									"empty"
									)),
							o
							.files_quality = [],
							o
							.files_quality_ag = [],
							o
							.files_audiotrack = [],
							o
							.current_file =
							0, o
							.current_quality =
							0, o
							.current_audiotrack =
							0, "" == v
							.file_separator &&
							(v.file_separator =
								","), e
							.indexOf(
								"]") > -
							1 && e
							.indexOf(
								"[") > -
							1 || exist(v
								.qualities
								) ? o
							.files = e
							.split(v
								.file_separator
								) : o
							.files = [
							e], o
							.audiotracks = [],
							exist(v
								.qualities
								)) var
							l = v
							.qualities
							.split(v
								.file_separator
								);
						if (o.files
							.length > 0
							) {
							for (var d = -
									1,
									r =
									0; r <
								o.files
								.length; r++
								)
								if (o
									.files[
										r
										] =
									trim(
										o
										.files[
											r
											]
										),
									"" !=
									o
									.files[
										r
										]
									) {
									0 == o
										.files[
											r
											]
										.indexOf(
											"["
											) &&
										o
										.files[
											r
											]
										.indexOf(
											"]"
											) >
										1 ?
										(o.files_quality[
												r
												] =
											o
											.files[
												r
												]
											.substr(
												o
												.files[
													r
													]
												.indexOf(
													"["
													) +
												1,
												o
												.files[
													r
													]
												.indexOf(
													"]"
													) -
												1
												),
											o
											.files[
												r
												] =
											o
											.files[
												r
												]
											.substr(
												o
												.files[
													r
													]
												.indexOf(
													"]"
													) +
												1
												)
											) :
										exist(
											v
											.qualities
											) ?
										o
										.files_quality[
											r
											] =
										exist(
											l[
												r]
											) ?
										l[
											r] :
										"" :
										o
										.files_quality[
											r
											] =
										r +
										1;
									var c =
										0;
									exist
										(v
											.default_quality) &&
										-
										1 ==
										d &&
										(0 ==
											String(
												v
												.default_quality
												)
											.indexOf(
												"num:"
												) &&
											1 *
											v
											.default_quality
											.substr(
												4
												) ==
											r &&
											(c =
												1),
											v
											.default_quality ==
											o
											.files_quality[
												r
												] &&
											(c =
												1),
											"max" ==
											v
											.default_quality &&
											r ==
											o
											.files
											.length -
											1 &&
											(c =
												1)
											),
										exist(
											o
											.default_quality
											) &&
										o
										.default_quality ==
										o
										.files_quality[
											r
											] &&
										(c = 1,
											d =
											r
											),
										1 ==
										c &&
										(o.current_file =
											r,
											o
											.current_quality =
											r
											),
										o
										.files[
											r
											] =
										Prefile(
											o
											.files[
												r
												]
											)
								}
						} else o.files[
								0] =
							Prefile(o
								.files[
									0]);
						return o.files[o
							.current_file
							]
					}
				}, this.InvertPlaylist =
				function() {
					if (o.playlist) {
						for (var e = o
								.playlist
								.reverse(),
								t =
								0; t < e
							.length; t++
							) e[t]
							.pjs_i = t;
						o.playlist = e,
							o.controls
							.UpdatePlaylist(
								o
								.playlist
								)
					}
				}, this.UpdatePlaylist =
				function(e) {
					"object" == typeof e
						&& (o
							.playlist_dic = [],
							o
							.playlist_source =
							copyObject(
								e), o
							.playlist =
							IndexPlaylist(
								e), o
							.controls &&
							o.controls
							.UpdatePlaylist(
								o
								.playlist
								))
				}, this.sendStat = !1,
				this.NewFile = function(
					e, t, n, s) {
					this.sendStat = !1,
						exist(t) || (v
							.autoplay =
							1), exist(
						n) || (v
							.preload = 0
							), v
						.duration =
						void 0, v.end =
						void 0, v
						.delete =
						void 0, 2 != o
						.media_error &&
						(o.media_error = !
							1), o
						.metadata = !1,
						o.pipwebkit = !
						1, o
						.reloadTimer =
						0, o
						.gatracked = [],
						o
						.checknative = !
						1, o.gained = !
						1, o.dvr = !1, o
						.bitrate =
						void 0, o
						.quartile = [!1,
							!1, !1
						], o.sess =
						randomstr(), o
						.sesstime = 0, o
						.pld && (o
							.pld = []),
						"pjs" != o
						.file_type && o
						.sbt && o.sbt
						.remove(), o
						.err404v && o
						.err404v
						.remove(),
						"playing" == o
						.media
					.status() && this
						.Stop(), o
						.cut && o
						.cutted && o
						.controls.Cut(),
						exist(o
						.share) && o
						.share.Remove(),
						exist(o
							.reloadto) &&
						clearTimeout(o
							.reloadto),
						js("new"), 1 ==
						v.vast && 1 !=
						s && (o.actions
							.VastRecover(),
							o.actions
							.VastRecover(
								"midroll"
								)), e =
						this.File(e),
						1 == t && (o
							.file_type =
							""), o.media
						.File(e), (o
							.system
							.mobile || o
							.system
							.safari) &&
						!exist(t) && o
						.actions.Play(),
						exist(o
							.custom_aspect
							) && (o
							.mediascale = {
								x: 1,
								y: 1,
								x0: 1,
								y0: 1
							}, o.media
							.normalscale()
							),
						gaTracker(
							"play",
							"Play"), o
						.media
						.NativeControls(),
						o.controls
						.QualityChangedNoHand(),
						o.controls
						.AudioTrackChangedNoHand(),
						o.controls
						.refresh(), o
						.mediatags && o
						.mediatags
						.read()
				}, this.TitleTemplate =
				function(e) {
					var t = !1;
					if (e && o
						.title_template
						) {
						v.title = o
							.title_template;
						for (var n =
							1; n <
							6; n++)
							exist(e["t" +
								n]) && (
								v
								.title =
								v.title
								.replace(
									"{" +
									n +
									"}",
									e["t" +
										n
										]
									),
								t = !0)
					}
					return t
				}, this.MediaReady =
				function() {
					1 == v.autoplay && (
						1 == v
						.observer ?
						setTimeout(
							function() {
								o.actions
									.Play()
							}, 500
							) : this
						.Play(), v
						.autoplayed =
						1), Thumbs()
				}, this.Thumbs =
				function() {
					Thumbs()
				}, this.NativeControls =
				function() {
					var e = !1;
					return o.system
						.mobile && (
							e = !0, 1 ==
							v
							.nativenotiphone &&
							o.system
							.iphone && (
								e = !1),
							1 == v
							.nativenotipad &&
							o.system
							.ipad && (
								e = !1),
							1 == v
							.nativenotios &&
							o.system
							.ios && (
								e = !1),
							1 == v
							.nativenotandroid &&
							o.system
							.android &&
							(e = !1)),
						1 == v
						.nativeontv && o
						.system.tv && (
							e = !0), e
				}, this.Metadata =
				function() {
					o.media.Volume(v
							.volume), o
						.muted && o
						.media.Mute(), o
						.metadata = !0,
						o.controls && o
						.controls
						.refresh(), o
						.play || o
						.start || 1 != v
						.effects || o
						.effects.api(
							"pause"), o
						.casting && o
						.tagvideo && (o
							.chromecast
							.Exit(), o
							.chromecast
							.Go()), 1 ==
						v.vast && 1 != v
						.nomidroll &&
						1 == v
						.midrolls && (
							exist(o
								.vast) ||
							MidrollOverlay(
								"midroll",
								"metadata"
								))
				}, this.onPlayTag =
				function() {
					o.onplay || onPlay(!
						0)
				}, this.Play = function(
					e) {
					if (!o.play && o
						.media) {
						o.actplay = !0;
						var t = !1;
						if ("youtube" ==
							o
							.file_type &&
							!o.media
							.YoutubeReady() &&
							1 != v
							.autoplay &&
							1 == v
							.preload &&
							(t = !0,
								window
								.YT && (
									v
									.autoplay =
									1, o
									.media
									.onYoutubeReady()
									)),
							1 == v
							.pass &&
							0 == v
							.passontime &&
							(o.actions
								.Password(),
								t = !0),
							o
							.media_error ||
							t) o
							.media_error &&
							Advertising(
								"preroll"
								) &&
							datetime(2);
						else {
							if (o
								.newfile = !
								1,
								StopOtherPlayer(
									!o
									.start
									), o
								.alert
								.close(),
								o.start)
								gaTracker(
									"resume",
									"Resume"
									);
							else {
								js("start"),
									o
									.start = !
									0,
									1 ==
									v
									.toolbar
									.hideuntilstarted &&
									setTimeout(
										function() {
											o.controls
												.resizetext()
										},
										100
										),
									v
									.toolbar
									.hideleavetimeout >
									0 &&
									1 ==
									v
									.autoplay &&
									(o.starttimeout = !
										0,
										setTimeout(
											StartTimeout,
											1e3 *
											v
											.toolbar
											.hideleavetimeout
											)
										),
									1 ==
									v
									.water &&
									v
									.wid &&
									PluginWater();
								for (var n =
										0; n <
									o
									.vsts
									.length; n++
									)
									1 ==
									v["vast_nofirst" +
										o
										.vsts[
											n
											]
										] &&
									setCookie(
										"pljsfirst" +
										o
										.vsts[
											n
											],
										Date
										.now()
										);
								1 == v
									.pjsstat &&
									v
									.pjsstatid &&
									PluginStat(
										"start"
										),
									js(
										"new"),
									o
									.controls
									.refresh(),
									gaTracker(
										"play",
										"Play"
										),
									o
									.ab &&
									gaTracker(
										"adblock",
										"AdBlock",
										1
										)
							}
							if (1 == v
								.fullonplay &&
								!o
								.fullscreen &&
								new Date()
								.getTime() -
								o
								.clicktime <
								300 && (
									1 ==
									v
									.fullonplaymobile ?
									o
									.system
									.mobile &&
									this
									.Fullscreen() :
									this
									.Fullscreen()
									), o
								.subtitle_on &&
								1 == v
								.subpausehide &&
								show2(o
									.subtitle
									), o
								.err404v &&
								o
								.err404v
								.remove(),
								1 !=
								e &&
								Advertising(
									"preroll"
									) ||
								Advertising(
									"intro"
									) ||
								Advertising(
									"pausebannerinit"
									) ||
								Advertising(
									"endtaginit"
									) ||
								Advertising(
									"qrcodeinit"
									) ||
								Advertising(
									"starttaginit"
									))
								datetime(
									2);
							else if (
								1 == v
								.redirect &&
								exist(v
									.redirectonplay
									) &&
								!exist(
									options
									.redirect
									) &&
								(redirect(
										v
										.redirectonplay
										),
									t = !
									0),
								!t) {
								log("Play"),
									"pdf" !=
									o
									.file_type &&
									o
									.media
									.duration() >
									0 &&
									o
									.controls
									.Duration(
										o
										.media
										.time(),
										o
										.media
										.duration()
										),
									!o
									.start2 &&
									(o.start2 = !
										0,
										v
										.toolbar
										.hideleavetimeout >
										0 &&
										1 ==
										v
										.autoplay &&
										(o.starttimeout = !
											0,
											setTimeout(
												StartTimeout,
												1e3 *
												v
												.toolbar
												.hideleavetimeout
												)
											)
										),
									o
									.media
									.time() >
									1 &&
									!
									exist(
										o
										.banner
										) &&
									1 ==
									v
									.pausebannerinit &&
									1 ==
									v
									.pausebannerstatus &&
									Advertising(
										"pausebannerhide"
										);
								var s = !
									1;
								!(o.media
									.time() >
									1
									) ||
								1 != v
									.pauserollonplay ||
									1 ==
									e ||
									isVastBgLoad() ||
									exist(
										o
										.vast
										) ||
									exist(
										o
										.vastloader
										) ||
									(s = Advertising(
										"pauseroll"
										)),
									s ?
									isVastBgLoad() &&
									onPlay(
										!
										1
										) :
									onPlay(
										!
										1
										)
							}
						}
					} else o.media && o
						.media.Play()
				}, this.Pause =
				function() {
					o.play && (o
						.actplay = !
						1, log(
							"Pause"
							), o
						.media
						.Pause(), o
						.controls
						.Pause(),
						js("pause"),
						v
						.posteronpause &&
						ShowPoster(),
						1 == v
						.posterhidepause &&
						HidePoster2(),
						1 == v
						.effects &&
						o.effects
						.api(
							"pause"),
						o
						.subtitle_on &&
						1 == v
						.subpausehide &&
						hide2(o
							.subtitle
							), o
						.media
						.time() >
						1 && !exist(
							o.banner
							) &&
						1 == v
						.pausebannerinit &&
						0 == v
						.pausebannerstatus &&
						Advertising(
							"pausebannershow"
							),
						exist(o
							.vast) ||
						exist(o
							.vastloader
							) ||
						0 != v
						.pauserollonplay ||
						Advertising(
							"pauseroll"
							), o
						.onplay = !1
						)
				}, this.Mute =
				function() {
					o.media.Mute(), o
						.controls
					.Mute(), o.muted = !
						0, js("mute")
				}, this.Unmute =
				function() {
					o.media.Unmute(), o
						.muted = !1, o
						.controls
						.Unmute(), o
						.media.Volume(v
							.volume),
						js("unmute")
				}, this.Volume =
				function(e, t) {
					e < .01 && (e = 0),
						e > 1 && (e =
						1), e <= 0 ? (
							this.Mute(),
							v.volume =
							0, e = 0) :
						(o.muted && this
							.Unmute(), v
							.volume = e
							), js(
							"volume", e
							), o
						.controls
						.Volume(e, t), o
						.media.Volume(e)
				}, this.Waiting =
				function() {
					o.controls.Waiting()
				}, this.StopWaiting =
				function() {
					o.controls && o
						.controls
						.StopWaiting()
				}, this.Progress =
				function() {
					this.StopWaiting()
				}, this.Seeked =
				function() {
					o.actions
						.UpdatePlay(),
						this
						.StopWaiting()
				}, this.Duration =
				function(e, t) {
					if (o.continue && !o
						.start) {
						var n = o
							.continue
							.flag();
						n.t && n.d && (
							e = n.t)
					}
					o.controls && o
						.controls
						.Duration(e, t)
				}, this.LoadedData =
				function(e, t) {
					exist(o.seekto) &&
						"youtube" != o
						.file_type && !o
						.media
					.isLive() && (o
							.actions
							.Seek(o
								.seekto,
								!1), o
							.seekto =
							void 0)
				}, this.ScreenClick =
				function() {
					var e = new Date;
					o.clicktime = e
						.getTime();
					var t = !1;
					o.controls
						.SettingsVisible() &&
						1 != v.settings
						.always && (o
							.controls
							.Settings(),
							t = !0), o
						.droplist && o
						.droplist
						.Visible() && (o
							.droplist
							.Close(),
							t = !0),
						0 == v.playlist
						.always && o
						.controls
						.PlaylistVisible() &&
						1 == v.playlist
						.autohide && (o
							.controls
							.Playlist(),
							t = !0),
						1 == v
						.redirect &&
						exist(v
							.redirectonclick
							) && !exist(
							options
							.redirect
							) && (
							redirect(v
								.redirectonclick
								), t = !
							0), t || (
							1 == v
							.hotkey
							.on && 1 ==
							v.hotkey
							.icons &&
							1 == v
							.hotkey
							.playiconbut &&
							PluginHotIcon(
								"play",
								o.play ?
								0 : 1),
							this
							.Toggle())
				}, this
				.ControlsBgClick =
				function() {
					o.controls
						.SettingsVisible() &&
						o.controls
						.Settings()
				}, this.Toggle =
				function() {
					"playing" == o.media
						.status() ? this
						.Pause() : this
						.Play(), Sub()
				}, this.Seek = function(
					e, t) {
					e < o.media
						.duration() && !
						(1 == v
							.control_line
							.dontseekforward &&
							e > o.media
							.time()) &&
						(v.delete > 0 &&
							e < v
							.delete && (
								e = v
								.delete
								), o
							.seeked_time =
							e, o.media
							.Seek(e),
							t && o
							.controls
							.Seek(e, o
								.media
								.duration()
								), o
							.seeking = !
							0, o
							.seeking_time =
							o.media
							.time(),
							Sub(o
								.seeking_time
								))
				}, this.Open = function(
					e, t, n) {
					"playing" == o.media
						.status() &&
						"audio" != o
						.mode && (
							Pause(), o
							.fullscreen &&
							n && o
							.actions
							.Normalscreen()
							), window
						.open(e, t)
				}, this.Download =
				function() {
					var e = o.media
						.currentFile();
					exist(v.download) &&
						(e = v
						.download),
						"" != e && (js(
								"download"
								),
							window.open(
								e, 1 ==
								v
								.downself ?
								"_self" :
								"_blank"
								)
							.focus())
				}, this.UpdatePlay =
				function() {
					var e = o.media
						.time(),
						t = o.media
						.duration();
					o.controls.Played(e,
						t)
				}, this.Playing =
				function() {
					var e = o.media
						.time(),
						t = o.media
						.duration(),
						n = t > 0 ? e /
						t : 0;
					o.seeking ? e != o
						.seeking_time &&
						(o.seeking = !
						1) : o
						.controls && o
						.controls
						.Played(o
							.seekto >
							0 ? o
							.seekto : e,
							t), (1 == v
							.ga || 1 ==
							v.yamtr) &&
						t > 0 && (
							gaTrackPlay(
								"play25",
								"Play 25%",
								n, .25),
							gaTrackPlay(
								"play50",
								"Play 50%",
								n, .5),
							gaTrackPlay(
								"play75",
								"Play 75%",
								n, .75)
							);
					for (var s = 0; s <
						3; s++) !o
						.quartile[s] &&
						n >= .25 * s +
						.25 && Quartile(
							s);
					if (1 == v
						.reloadlog &&
						log(1, e, t),
						1 == v.reload &&
						o.play) {
						var a = !1,
							r = !1;
						if (1 != v
							.reloadlive ||
							o.media
							.isLive() ||
							(a = !0),
							e > 0) e !=
							o.time ||
							a ? o
							.reloadTimer =
							0 : r = !0,
							o.time = e;
						else if (1 == v
							.reloadstart
							) {
							var l = o
								.media
								.loaded();
							1 == v
								.reloadlog &&
								log(2,
									l, o
									.timeld
									),
								a || (
									l ==
									o
									.timeld ?
									r = !
									0 :
									o
									.reloadTimer =
									0),
								o
								.timeld =
								l
						}
						r && (o.reloadTimer++,
							1 == v
							.reloadlog &&
							log(3, o
								.reloadTimer
								), o
							.reloadTimer ==
							v
							.reloadtimeout *
							(1e3 / o
								.timerTime
								) &&
							o
							.actions
							.Reload()
							)
					}
					if (v.apiprm && 1 ==
						v.apiprm.pld &&
						t > 0 && (o
							.pld || (o
								.pld = []
								), o
							.pld[Math
								.round(
									e)
								] = 1),
						1 == v.vast && (
							1 != v
							.nomidroll &&
							1 == v
							.midrolls &&
							(exist(o
									.vast) ||
								MidrollOverlay(
									"midroll",
									e, t
									)),
							1 != v
							.nooverlay &&
							1 == v
							.overlays &&
							(exist(o
									.vast) ||
								MidrollOverlay(
									"overlay",
									e, t
									))),
						1 == v.intros &&
						v.introstart >
						0 && e >= v
						.introstart && !
						exist(o.vast) &&
						(Advertising(
								"intro"
								) && (o
								.media
								.Pause(),
								o
								.controls
								.Pause()
								), v
							.introstart =
							0),
						Advertising(
							"pushbanner"
							),
						Advertising(
							"pausebannerhide"
							), this
						.sendStat, 1 ==
						v.qrinit && 0 ==
						v.qrstatus && o
						.media.time() >
						0 &&
						Advertising(
							"qrcodetoggle"
							), 1 == v
						.endtaginit &&
						0 == v
						.endtagstatus &&
						o.media.time() >
						0 &&
						Advertising(
							"endtagtoggle"
							), 1 == v
						.starttaginit &&
						0 == v
						.starttagstatus &&
						o.media.time() >
						0 &&
						Advertising(
							"starttagtoggle"
							),
						SettingsTimers(
							"play"),
						1 == v.pass && v
						.passontime > -
						1 &&
						PasswordTime(e,
							t), o
						.subtitle_on &&
						Sub(e), o
						.storage && 1 ==
						v.timestore && o
						.continue && o
						.continue.write(
							e, t), o
						.cutted && o
						.cut && o.cut
						.play(e), exist(
							v.end) && v
						.end > 0 && e >
						v.end && (
							"youtube" ==
							o
							.file_type ?
							(o.media
								.Pause(),
								o.media
								.Seek(v
									.start >
									0 ?
									v
									.start :
									0)
								) : (o
								.media
								.Recover(),
								o
								.actions
								.Stop()
								), v
							.start >
							0 && (o
								.seekto =
								v.start
								), o
							.actions
							.Ended()),
						exist(v.remove))
						for (var d = v
								.remove
								.split(
									","
									),
								s =
								0; s < d
							.length; s++
							) {
							var c = d[s]
								.split(
									"-"
									);
							2 == c
								.length &&
								e > c[
								0] &&
								e < c[
								1] && o
								.media
								.Seek(c[
									1])
						}
				}, this.Reload =
				function() {
					if (o.reloadTimer =
						0, exist(o
							.reloadto
							) &&
						clearTimeout(o
							.reloadto),
						1 == v
						.reloadjustevent
						) js("reload");
					else {
						o.seekto > 0 ||
							o.media
							.isLive() ||
							(o.seekto =
								o.media
								.time() +
								(v.reloadplus >
									0 ?
									1 :
									0));
						var e = o
							.controls
							.PlaylistVisible();
						js("reload"), o
							.media
							.reload(),
							e && 1 == v
							.playlist
							.autohide &&
							o.controls
							.PlaylistShow()
					}
				}, this.Stopped =
				function() {
					o.controls.Played(0,
							0), o
						.controls
						.Loaded(0, 0), o
						.actions
						.Duration(0, 0),
						o.controls
						.StopWaiting()
				}, this.Loading =
				function() {
					if (o.media) {
						var e = o.media
							.loaded();
						1 == v
							.pjsiframed &&
							js("loaded",
								e);
						var t = o.media
							.duration()
					}
					o.controls && o
						.controls
						.Loaded(e, t)
				}, this.Ended =
				function() {
					js("fileend"), 1 ==
						v.loop ? (
							"youtube" ==
							o
							.file_type &&
							this.Stop(),
							1 == v
							.vast && o
							.actions
							.VastRecover(
								"preroll"
								), v
							.start >
							0 && o
							.actions
							.Seek(v
								.start),
							this.Play()
							) : (o.media
							.isLive() ||
							"youtube" ==
							o
							.file_type ?
							this
						.Stop() : 1 == v
							.finishrewind &&
							(o.actions
								.Seek(v
									.start >
									0 ?
									v
									.start :
									0, !
									0),
								o.system
								.ie && o
								.media
								.Pause()
								), o
							.controls
							.onEnded(),
							1 == v
							.intros && (
								v
								.outros =
								1),
							Advertising(
								"postroll"
								) ||
							Advertising(
								"outro"
								) ||
							End())
				}, this.Fullscreen =
				function() {
					var e = !1,
						t = !1;
					for (var n in o
							.fs_error = !
							1, o
							.fullscreen_process = !
							0,
							setTimeout(
								function() {
									o.fullscreen_process = !
										1
								}, 3e3),
							o.motions)
						if (o.motions
							.hasOwnProperty(
								n) &&
							exist(o
								.motions[
									n]))
							try {
								o.motions[
										n
										]
									.TheEnd2()
							} catch (
							s) {}
					try {
						if (o
							.fullscreen_start = !
							0, (o.system
								.ios &&
								1 == v
								.nativefullios ||
								o.system
								.android &&
								1 == v
								.nativefulldroid
								) && o
							.tagvideo &&
							!o
							.nativecontrols
							) {
							var n = o
								.media
								.tag();
							n && n
								.webkitSupportsFullscreen &&
								(NativeEnterFs(),
									e = !
									0)
						}
						if (!e) {
							var a, r = o
								.frame;
							if (("dm" ==
									o
									.file_type ||
									"vimeo" ==
									o
									.file_type
									) &&
								o.system
								.iphone &&
								1 == v
								.nativefullios
								) {
								o.media
									.iosfull();
								return
							}
							r.requestFullscreen ?
								(o.realfullscreen = !
									0,
									void 0 !==
									(a = r
										.requestFullscreen({
											navigationUI: "hide"
										})
										) &&
									a
									.then(
										function() {}
										)
									.catch(
										function(
											e
											) {}
										)
									) :
								r
								.requestFullScreen ?
								(r.requestFullScreen({
										navigationUI: "hide"
									}),
									o
									.realfullscreen = !
									0) :
								o.frame
								.mozRequestFullScreen ?
								(r.mozRequestFullScreen({
										navigationUI: "hide"
									}),
									o
									.realfullscreen = !
									0) :
								r
								.webkitRequestFullScreen ?
								(r.webkitRequestFullScreen({
										navigationUI: "hide"
									}),
									o
									.realfullscreen = !
									0) :
								r
								.msRequestFullscreen &&
								(r.msRequestFullscreen(),
									o
									.realfullscreen = !
									0)
						}
					} catch (l) {
						t = !0, log(l)
					}
					o.realfullscreen ||
						e || (o.system
							.webkit && o
							.iniframe ?
							NativeEnterFs() :
							this
							.FullscreenUI()
							), t ||
						setTimeout(
							PostFullscreen,
							200)
				}, this.NativeExitFs =
				function() {
					NativeExitFs()
				};
			var lastwheel = {
				x: 0,
				y: 0
			};

			function VolumeWheel(e) {
				if (!(o.droplist && o
						.droplist
						.OpenScroll()
						) && 0 != e
					.wheelDelta) {
					if (1 == v.hotkey
						.scrollwheelfull &&
						o.fullscreen ||
						(o.hidden_volume_over = !
							0,
							clearInterval(
								volumewheelin
								),
							volumewheelin =
							setInterval(
								function() {
									o.hidden_volume_over = !
										1,
										o
										.controls
										.resize(),
										lastwheel = {
											x: 0,
											y: 0
										},
										clearInterval(
											volumewheelin
											)
								}, 2e3),
							o.controls
							.resize()),
						0 != e.deltaX ?
						lastwheel.x++ :
						lastwheel.x--,
						0 != e.deltaY ?
						lastwheel.y++ :
						lastwheel.y--,
						lastwheel.x >
						lastwheel.y) e
						.deltaX > 0 ? o
						.actions.Volume(
							parseFloat(v
								.volume
								) - v
							.hotkey
							.wheelstep /
							10, "no") :
						o.actions
						.Volume(
							parseFloat(v
								.volume
								) + v
							.hotkey
							.wheelstep /
							10, "no");
					else {
						var t = o.system
							.win ? -v
							.hotkey
							.wheelstep /
							10 : v
							.hotkey
							.wheelstep /
							10;
						1 == v.hotkey
							.scrollwheelfull &&
							o
							.fullscreen ?
							o.media
							.scale(e
								.deltaY >
								0 ? t :
								-t) : (o
								.actions
								.Volume(
									parseFloat(
										v
										.volume
										) +
									(e.deltaY >
										0 ?
										t :
										-
										t
										),
									"no"
									), o
								.controls
								.volumescroll()
								)
					}
				}
			}

			function iosExitFullscreen() {
				o.system.ios && (o.media
						.removeNativeSubtitle(),
						js(
							"exitfullscreen")
						), o
					.nativefull = !1
			}

			function NewAspect(e, t) {
				if (exist(o.vast) && !t)
					o.resizeonplay = e;
				else {
					var n = !1,
						s = o
						.container_w /
						e;
					if (exist(o
							.parentIframe
							) && 1 != v
						.notframe) try {
						css(o.parentIframe, {
							height: s
						})
					} catch (a) {
						n = !0, log(
							"iframe crossdomain issue"
							)
					}
					n || (o.aspect = e,
							o
							.container_h =
							s, o
							.aspect >
							0 && css(o
								.container, {
									height: s
								}), js(
								"height",
								s)), o
						.vast && !o
						.fullscreen && (
							o.screen_h =
							s, o.vast
							.Resize())
				}
			}

			function VolumeWheelX(e) {
				lastwheel = {
						x: 0,
						y: 0
					}, e ? window
					.addEventListener(
						"wheel",
						VolumeWheel) : (
						clearInterval(
							volumewheelin
							), window
						.removeEventListener(
							"wheel",
							VolumeWheel)
						)
			}

			function Sub(e) {
				o.sbt && o.sbt.show(
					exist(e) ? e : o
					.media.time())
			}

			function Advertising(e) {
				if (1 == v.banner && e
					.indexOf(
						"pausebanner") >
					-1 && void 0 !==
					PauseBannerPlugin &&
					(e.indexOf("init") >
						-1 ? v
						.pausebannerinit =
						1 : e.indexOf(
							"show") > -
						1 ? v
						.pausebannerstatus =
						1 : e.indexOf(
							"hide") > -
						1 && (v
							.pausebannerstatus =
							0),
						PauseBannerPlugin(
							e)),
					"pushbanner" in o
					.u && "status" in o
					.u.pushbanner && !
					0 === o.u.pushbanner
					.status &&
					"pushbanner" == e &&
					PushBannerPlugin(e),
					1 == o.u.qrtag && e
					.indexOf("qrcode") >
					-1 && void 0 !==
					QrCodeAd && (
						"qrcodeinit" ==
						e && 0 == v
						.qrinit ||
						"qrcodetoggle" ==
						e) && QrCodeAd(
						e), 1 == o.u
					.etag && e.indexOf(
						"endtag") > -
					1 && void 0 !==
					EndTagBannerPlugin &&
					("endtaginit" ==
						e && 0 == v
						.endtaginit ||
						"endtagtoggle" ==
						e) &&
					EndTagBannerPlugin(
						e), 1 == o.u
					.stag && e.indexOf(
						"starttag") > -
					1 && void 0 !==
					EndTagBannerPlugin &&
					("starttaginit" ==
						e && 0 == v
						.starttaginit ||
						"starttagtoggle" ==
						e) &&
					StartTagBannerPlugin(
						e), v["vast_" +
						e + "timebreak"
						] > 0 && o
					.storage) {
					var t = getCookie(
						"pljs" + e +
						"_" + o.d);
					if (t) {
						var n =
						new Date;
						if (o
							.clicktime =
							n.getTime(),
							(n.getTime() -
								t) /
							36e5 < v[
								"vast_" +
								e +
								"timebreak"
								])
							return !1
					}
				}
				if (v["vast_" + e +
						"timelimit"] >
					0 && o.media
					.duration() > 0 && o
					.media.duration() <
					60 * v["vast_" + e +
						"timelimit"]) {
					if (!(v["vast_" +
							e +
							"timelimited"
							] > 0))
						return !1;
					v["vast_" + e +
							"_andlimit"
							] = v[
							"vast_" +
							e +
							"timelimited"
							]
				}
				if (-1 == o.compilations
					.indexOf("VAST") ||
					1 != v.vast || o
					.noads || 1 != v[e +
						"s"] ||
					void 0 === VastVideo
					) return !1;
				if (("intro" == e ||
						"outro" == e) &&
					"undefined" !=
					typeof PluginIntro)
					return vasturl = [],
						PluginIntro(e);
				if (exist(o.vast) ||
					exist(o.vastloader))
					return !isVisible(o
							.vastcontainer
							) ||
						isVastBgLoad(o
							.vasttype) ?
						(log("ad bg"), !
							1) : (log(
							"ad now"
							), !0);
				if (!exist(v[e]) || !(v[
							e]
						.toString()
						.indexOf(".") >
						-1 || v[e]
						.toString()
						.indexOf(":") >
						-1 || v[e]
						.toString()
						.indexOf(
							"[yandex]"
							) > -1))
					return !1;
				js("vast_init", e),
					isVastBgLoad(e) ||
					"overlay" == e || (
						setTimeout(
							function() {
								o.play ||
									null ==
									o
									.vastloader &&
									null ==
									o
									.vast ||
									o
									.actions
									.Waiting()
							}, 10),
						Curtain()),
					PauseBannerPlugin(
						"pausebannerhide"
						), vast_and = 0,
					vast_or = 0,
					vast_type = e,
					vasturl = v[e]
					.split(" and "), o
					.vast_loaders = [],
					o.adsinchain =
					vasturl.length,
					VastAndLimit(), o
					.adscounter = 1, o
					.adsfirst = !0;
				for (var s = 0; s <
					vasturl.length; s++)
					vasturl[s] =
					vasturl[s].split(
						" or ");
				v[e.concat("_",
						"recover")] = v[
						e], "preroll" ==
					e && (v[`${e}t`] =
						v[e]), v[e] =
					null, o.vasttype =
					e, "overlay" != e &&
					(o.vast =
						new VastVideo),
					o.vastloader =
					new VastLoader;
				for (var s = 0; s <
					vasturl.length; s++)
					for (var a = 0; a <
						vasturl[s]
						.length; a++) {
						var r = trim(
							vasturl[
								s][
								a]);
						if (r.indexOf(
								"[50%]"
								) > 0) {
							var l =
								random(
									1, 2
									);
							vasturl[s][
									a] =
								vasturl[
									s][
									a]
								.replace(
									"[50%]",
									""),
								2 ==
								l && (
									vasturl[
										s
										]
									[
									a] =
									"")
						}
					}
				if (1 == v.vast_preload)
					for (var s = 0; s <
						vasturl
						.length; s++) {
						var d = 0 == s ?
							1 : 0;
						if (vasturl[s]
							.length > d)
							for (var a =
									d; a <
								vasturl[
									s]
								.length; a++
								) {
								var r =
									trim(
										vasturl[
											s
											]
										[
											a]
										);
								o.system
									.ie9 ?
									VastAddPreload(
										r
										) :
									setTimeout(
										VastAddPreload,
										100 *
										s,
										r
										)
							}
					}
				return "" == vasturl[0][
						0
					] ? VastNext() : o
					.vastloader.Load(
						trim(vasturl[0][
							0
						]), e), !0
			}

			function MidrollOverlay(e,
				t, n) {
				if (exist(o[e + "o"]) &&
					1 == v[e + "s"]) {
					var s;
					for (var a in o[e +
							"o"])
						if (o[e + "o"]
							.hasOwnProperty(
								a) && !
							exist(o[e +
									"o"]
								[a]
								.worked
								) &&
							exist(o[e +
									"o"]
								[a].time
								) &&
							exist(o[e +
									"o"]
								[a].vast
								)) {
							var r = o[
									e +
									"o"]
								[a].time
								.toString(),
								l = !1;
							if (r && (
									"metadata" ==
									t ?
									r ==
									t &&
									(l = !
										0
										) :
									(r = r
										.indexOf(
											"%"
											) >
										0 ?
										n >
										0 ?
										parseInt(
											r
											.substr(
												0,
												r
												.indexOf(
													"%"
													)
												)
											) *
										n /
										100 :
										-
										1 :
										parseInt(
											r
											),
										t >=
										r &&
										(v["vast_" +
												e +
												"rest"
												] >
											0 &&
											r >
											-
											1 &&
											t -
											r >=
											v["vast_" +
												e +
												"rest"
												] &&
											(r = -
												1
												),
											r >
											-
											1 &&
											(l = !
												0
												)
											)
										),
									o[e +
										"o"
										]
									[a]
									.minduration &&
									o
									.media
									.duration() >
									0 &&
									o
									.media
									.duration() <
									1 *
									o[e +
										"o"
										]
									[a]
									.minduration &&
									(o[e +
											"o"]
										[
											a]
										.worked = !
										0,
										l = !
										1
										),
									l &&
									(s = o[e +
											"o"
											]
										[
											a]
										.vast,
										v[
											e] =
										o[e +
											"o"
											]
										[
											a]
										.vast,
										o[e +
											"crtm"
											] =
										o[e +
											"o"
											]
										[
											a]
										.time,
										o[e +
											"skipimprsd"
											] =
										o[e +
											"o"
											]
										[
											a]
										.skipimpessed,
										Advertising(
											e
											)
										)
									)) {
								o[e +
										"o"]
									[a]
									.worked = !
									0;
								break
							}
						}
				}
			}

			function VastBgLoad() {
				isVastBgLoad() && (0 ==
						o
						.vast_impressions ||
						1 == v["vast_" +
							o.vasttype +
							"bgload2"]
						) && (css(o
						.vastcontainer, {
							opacity: 0,
							visibility: "hidden",
							top: 2e3
						}), log(o
						.vasttype +
						" hide"))
			}

			function isVastBgLoad(e) {
				for (var t = !1, n = [
						"midroll",
						"pauseroll"
					], s = 0; s < n
					.length; s++)(o
					.vasttype == n[
						s] || e ==
					n[s]) && 1 == v[
					"vast_" + n[s] +
					"bgload"] && (
					t = !0);
				return t
			}

			function VastVisible() {
				isVastBgLoad() && (o
						.play && (o
							.media
							.Pause(), o
							.controls
							.Pause()),
						log(o.vasttype +
							" show"),
						css(o
							.vastcontainer, {
								opacity: 1,
								visibility: "visible",
								top: 0
							}), o
						.vastfrombg = 1
						), o
					.nativefull && !o
					.realfullscreen ?
					NativeExitFs() :
					1 == v["vast_" + o
						.vasttype +
						"normal"] && o
					.fullscreen && o
					.actions
					.Normalscreen()
			}

			function VastGo(e) {
				o.vast.Go(e)
			}

			function VastLongTimeout() {
				exist(o.vast) && o.vast
					.active() && 0 == o
					.vast_impressions &&
					(o.vast
						.RemoveForNextAd(),
						log("VAST timeout " +
							v
							.vast_longtimeout
							),
						vasturl = [],
						VastRemoveAndPlay()
						)
			}

			function VastCheckNext() {
				var e = VastAndLimit();
				log("VAST next " + !e),
					e ?
					VastRemoveAndPlay() :
					VastNext()
			}

			function VastAndLimit() {
				var e = !1;
				if (o.vasttype) {
					var t = v["vast_" +
							o.vasttype +
							"_andlimit"
							],
						n = v["vast_" +
							o.vasttype +
							"_and2limit"
							];
					(n || t) && (n >
						0 && o
						.vast_starts >
						0 ? (o
							.adsinchain =
							n, o
							.vast_impressions >=
							n && (e = !
								0)) :
						t > 0 && (o
							.adsinchain =
							t, o
							.vast_impressions >=
							t && (e = !
								0)))
				}
				return e
			}

			function VastNext() {
				if (vasturl.length >
					0 && vasturl[
						vast_and]) {
					if (vast_or <
						vasturl[
							vast_and]
						.length - 1) {
						log("VAST Next"),
							o.vast && o
							.vast
							.RemoveForNextAd(),
							VastBgLoad(),
							vast_or++;
						var e = trim(
								vasturl[
									vast_and
									][
									vast_or
								]),
							t =
							VastPreloaded(
								e);
						"skip" == t && (
								o
								.vastloader =
								new VastLoader,
								o
								.vastloader
								.Load(e,
									o
									.vasttype
									)),
							"error" ==
							t &&
							VastNext()
					} else
						VastRemoveAndPlay()
				} else
					VastRemoveAndPlay()
			}

			function VastPreloaded(e) {
				var t = "skip";
				if (1 == v
					.vast_preload && o
					.vast_loaders) {
					for (var n = !1, s =
							0, a =
							0; a < o
						.vast_loaders
						.length; a++)
						if (0 == o
							.vast_loaders[
								a].done
							) {
							if (o
								.vast_loaders[
									a]
								.ldr
								.preloaded(
									e)
								) {
								o.vast_loaders[
										a
										]
									.done =
									1;
								var r =
									o
									.vast_loaders[
										a
										]
									.ldr
									.Status();
								"ready" ==
								r ? (o.vastloader =
										o
										.vast_loaders[
											a
											]
										.ldr,
										log(
											"VAST preloaded"),
										o
										.vast_loaders[
											a
											]
										.ldr
										.Ready(),
										t =
										r
										) :
									("" ==
										r &&
										(t = "ok",
											log(
												"VAST preloading"),
											o
											.vastloader =
											o
											.vast_loaders[
												a
												]
											.ldr,
											o
											.vast_loaders[
												a
												]
											.ldr
											.disablePreload()
											),
										"error" ==
										r &&
										(t =
											"error")
										),
									n = !
									0
							}
							if (n &&
								0 == o
								.vast_loaders[
									a]
								.load) {
								if (++
									s <
									6)
									VastPreloadLoad(
										o
										.vast_loaders[
											a
											]
										);
								else break
							}
						}
				}
				return t
			}

			function VastAddPreload(e) {
				if (1 == v
					.vast_preload && o
					.vast_loaders) {
					for (var t = 0, t =
							0; t <
						vasturl
						.length; t++)
						if (vasturl[
							t] == e &&
							vast_and >=
							t) return;
					if (1 == vasturl
						.length &&
						vasturl[0]
						.length > 1);
					else {
						var n = 0;
						for (t = 0; t <
							o
							.vast_loaders
							.length; t++
							) 0 == o
							.vast_loaders[
								t]
							.done &&
							n++;
						o.vast_loaders
							.push({
								load: 0,
								done: 0,
								x: trim(
									e),
								t: o.vasttype,
								ldr: new VastLoader(
									!
									0
									)
							}), n < 5 &&
							VastPreloadLoad(
								o
								.vast_loaders[
									o
									.vast_loaders
									.length -
									1])
					}
				}
			}

			function VastPreloadLoad(
			e) {
				e && (e.load = 1, e.ldr
					.Load(e.x, e.t))
			}

			function VastRemoveAndPlay(
				e) {
				var t, n =
				VastAndLimit();
				if (log("VAST remove (" +
						o
						.vast_impressions +
						")"), vasturl
					.length > 0 &&
					vast_and == vasturl
					.length - 1 && 0 ==
					vasturl[0][0]
					.indexOf("js:") && (
						vast_and = -1,
						vasturl = [
							[vasturl[0][
								0
							]]
						]), 2 == o
					.vast_stop && (n = !
						0), vasturl
					.length > vast_and +
					1 && !n) {
					o.vast
						.RemoveForNextAd(),
						VastBgLoad(),
						vast_and++, o
						.adscounter++,
						vast_or = 0;
					var s = trim(
							vasturl[
								vast_and
								][0]),
						a =
						VastPreloaded(
						s);
					"skip" == a && (o
							.vastloader =
							new VastLoader,
							o.vastloader
							.Load(s,
								vast_type
								)),
						"error" == a &&
						VastRemoveAndPlay(
							e)
				} else {
					if (RemoveCurtain(),
						o.controls
						.StopWaiting(),
						exist(o.vast) &&
						(o.vast
						.Remove(), o
							.vast = null
							), o
						.vastloader =
						null,
						vasturl = [],
						vast_or = 0,
						vast_and = 0, o
						.vastfrombg = 0,
						1 != o
						.shwvstfnsh &&
						js("vast_finish",
							o.vasttype),
						o.shwvstfnsh =
						0, 1 == v
						.vast_ima && o
						.ima) {
						try {
							o.ima
								.Destroy()
						} catch (r) {
							log(o.ima,
								r)
						}
						o.ima = void 0
					}
					vast_type = "", o
						.vast_impressions =
						0, o
						.vpaid_starts =
						0, clearTimeout(
							o
							.vast_longtimeout
							), o
						.vast_longtomsg &&
						o.vast_longtomsg
						.remove(), o
						.vast_starts++,
						("preroll" == o
							.vasttype ||
							"pauseroll" ==
							o
							.vasttype &&
							1 == v
							.pauserollonplay &&
							o.actplay ||
							"midroll" ==
							o.vasttype
							) && "?" !=
						v.file && (o
							.media
							.AfterVast(),
							"youtube" ==
							o
							.file_type &&
							!o
							.vastclick &&
							o.system
							.ios && (
								t = !0,
								"preroll" ==
								o
								.vasttype &&
								o.media
								.reYT()
								), t ||
							"dontplay" ==
							e || 1 == v
							.vast_dontplay ||
							setTimeout(
								() => o
								.actions
								.Play(
								1), 100)
							), o
						.resizeonplay >
						0 && (NewAspect(
								o
								.resizeonplay
								), o
							.resizeonplay =
							0),
						"postroll" == o
						.vasttype &&
						End(), o
						.vastclick = !1,
						o.vasttype =
						null
				}
			}

			function Curtain() {
				o.curtain || (o
					.curtain =
					createElement(
						"div"), o
					.frame
					.appendChild(o
						.curtain),
					Pos0(o.curtain),
					css(o.curtain, {
						background: "#000000",
						opacity: .1
					}), o.curtain
					.style.zIndex =
					1001)
			}

			function RemoveCurtain() {
				o.curtain && (o.frame
					.removeChild(o
						.curtain), o
					.curtain = null)
			}

			function ShowPoster() {
				exist(o.poster) && (v
					.poster != o
					.currentposter &&
					Poster(v.poster,
						o.poster, v
						.poster_scale
						), show(o
						.poster),
					css(o.poster, {
						opacity: v
							.poster_a
					}), o.controls
					.refresh())
			}

			function HidePoster2() {
				clearTimeout(o.pstr_to),
					(1 != v
						.posteronpause ||
						o.play) && (css(
							o.poster, {
								opacity: 0
							}),
						setTimeout(
							HidePoster3,
							500))
			}

			function HidePoster3() {
				(o.play || 1 != v
					.posterhide) && hide
					(o.poster)
			}

			function StopOtherPlayer(
			e) {
				if (1 == v
					.stopotherplayers)
					for (var t = 0; t <
						pljssglobal
						.length; t++)
						pljssglobal[t]
						.api("id") != v
						.id &&
						pljssglobal[t]
						.api("pause");
				pljssglobalid = v.id
			}

			function IndexPlaylist(e) {
				var t = Object.keys(e)
					.length;
				return t > 0 && (e =
					IndexPlaylistProcessor(
						e, t, "", -1
						)), e
			}

			function IndexPlaylistProcessor(
				e, t, n, s) {
				var a, r = [];
				exist(e.playlist) && (
					t = (e = e
						.playlist)
					.length);
				for (var l = 0, d =
					0; d < t; d++) {
					if (a = !1, exist(e[
							d].id) && (
							e[d]
							.pjs_id = e[
								d].id),
						e[d].id = "x" +
						n + "-" + d + (
							exist(e[d]
								.id) ?
							"-" + e[d]
							.id : ""), -
						1 != s || 0 !=
						d || exist(e[d]
							.folder) ||
						(o.pl_first_id =
							e[d].id), !
						exist(o
							.pl_first_id
							) && (0 !=
							s || exist(
								e[d]
								.folder
								) || (o
								.pl_first_id =
								e[d].id)
							), e[d]
						.pjs_parent = n,
						e[d]
						.pjs_parent_i =
						s, e[d].pjs_i =
						l, exist(e[d]
							.comment)) {
						e[d].title = e[
								d]
							.comment;
						var c = e[d]
							.file ? e[d]
							.file
							.indexOf(
								"[") :
							0,
							u = e[d]
							.file ? e[d]
							.file
							.indexOf(
								"]") :
							0;
						if (c > 0 && u >
							0) {
							for (var $ =
									e[d]
									.file
									.substr(
										c +
										1,
										u -
										c -
										1
										),
									f =
									$
									.split(
										","
										),
									p =
									"",
									_ =
									0; _ <
								f
								.length; _++
								) p +=
								"[" + f[
									_] +
								"]" + e[
									d]
								.file
								.replace(
									"[" +
									$ +
									"]",
									f[_]
									) +
								(_ < f
									.length -
									1 ?
									"," :
									"");
							e[d].file =
								p
						}
					}
					if (exist(e[d]
							.playlist
							) && (e[d]
							.folder = e[
								d]
							.playlist),
						exist(e[d]
							.folder) ||
						exist(e[d]
						.file) && ("" !=
							e[d].file ||
							exist(e[d]
								.redirect
								)) || (
							a = !0),
						a || (o
							.playlist_dic[
								e[d].id
								] = e[
							d], l += 1),
						exist(e[d]
							.folder)) {
						var h = Object
							.keys(e[d]
								.folder)
							.length;
						h > 0 && (e[d]
							.folder =
							IndexPlaylistProcessor(
								e[d]
								.folder,
								h,
								e[d]
								.id,
								d))
					}
					a || r.push(e[d])
				}
				return r
			}

			function FindFileInPlaylist() {
				var e = [];
				if (exist(v.plstart)) {
					if (0 != v.plstart
						.indexOf("x-"))
						for (var t in o
								.playlist_dic)
							o
							.playlist_dic
							.hasOwnProperty(
								t) && o
							.playlist_dic[
								t]
							.pjs_id == v
							.plstart &&
							(v.plstart =
								t);
					exist(o.playlist_dic[
						v
						.plstart
						]) ? (1 == v
						.playlist
						.norootplstart &&
						(v.playlist
							.openplaylistroot =
							0), e =
						o
						.playlist_dic[
							v
							.plstart
							]) : (
						e = o
						.playlist[
						0], v
						.plstart ==
						o
						.plcontinue &&
						(o.seekto =
							void 0))
				} else e = o.playlist[
				0];
				if (e) {
					for (var n = 0; n <
						10; n++)
						if (exist(e
								.folder
								)) e = e
							.folder[0];
						else break;
					v.plstart = e.id, v
						.plstart == o
						.plcontinue && (
							e.start =
							void 0)
				}
				return e
			}

			function End() {
				gaTracker("end", "End",
						1), o.actions
					.VastRecover(), o
					.storage && 1 == v
					.timestore && o
					.continue.write(0, o
						.media
						.duration()), o
					.controls
					.PlaylistExist() ?
					1 == v.playlist
					.autoplaylist && o
					.controls
					.PlaylistNextExist() ?
					(o.controls
						.PlaylistNext(),
						o.play && o
						.system.ios && o
						.file_type) :
					End2() : (1 == v
						.finishnormal &&
						o.fullscreen &&
						o.actions
						.Normalscreen(),
						ShowPoster(),
						js("finish"))
			}

			function End2() {
				if (1 == v.playlist
					.playlistrewind && !
					o.controls
					.PlaylistNextExist()
					) {
					o.controls
						.PlaylistRewind();
					return
				}
				1 == v.playlist
					.openplaylistafter &&
					(o.controls
						.PlaylistVisible() ||
						o.controls
						.Playlist()),
					ShowPoster(), js(
						"finish")
			}

			function fjs(x) {
				if (0 == x.indexOf(
						"js:")) try {
					x = eval(x
						.substr(
							3))
				} catch (e) {
					console.log(e
						.message
						)
				}
				return x || ""
			}

			function Heartbeat() {
				var e = Math.floor(Date
						.now() / 1e3),
					t = (exist(v
						.livets) ? v
						.livets : 0) +
					parseInt(o.media
						.time()),
					n = 0;
				o.system.desktop && (n =
						1), o.system
					.ios && (n = 2), o
					.system.android && (
						n = 3), o.system
					.winmob && (n = 4),
					o.system.tv && (n =
						5);
				var s = v.heartbeat
					.replace("[vts]",
					e);
				s = (s = s.replace(
						"[fts]", t))
					.replace("[dvtp]",
						n);
				var a = document
					.createElement(
						"img");
				a.setAttribute("src",
					s), a.setAttribute(
						"height", "1px"
						), a
					.setAttribute(
						"width", "1px"),
					o.frame.appendChild(
						a)
			}
			this.FullscreenUI =
				function() {
					if (o
						.fullscreen_start
						) {
						if (o
							.fullscreen = !
							0, o
							.controls
							.Fullscreen(),
							!o
							.realfullscreen
							) {
							if (exist(o
									.parentIframe
									))
								try {
									css(o.parentIframe, {
										width: "100%",
										height: "100%",
										position: "fixed",
										left: 0,
										top: 0,
										zIndex: "100000"
									})
								} catch (
									e
									) {}
							css(o.frame, {
									width: "100%",
									height: "100%",
									position: "fixed",
									left: 0,
									top: 0,
									zIndex: "100000"
								}), o
								.screen_w =
								o.frame
								.offsetWidth,
								o
								.screen_h =
								o.frame
								.offsetHeight;
							try {
								document
									.body
									.style
									.overflow =
									"hidden",
									exist(
										o
										.playlist
										) ||
									(document
										.ontouchmove =
										function(
											e
											) {
											e.preventDefault()
										}
										)
							} catch (
							t) {}
						}
						1 == v
							.fullblack &&
							css(o
							.frame, {
								backgroundColor: "#000000"
							}), o
							.droplist &&
							o.droplist
							.Close(),
							Sub(), o
							.fullscreen_start = !
							1
					}
				}, this.Normalscreen =
				function() {
					_fullscreen_end = !
						0, document
						.cancelFullScreen ?
						document
						.cancelFullScreen() :
						document
						.exitFullscreen ?
						document
						.exitFullscreen() :
						document
						.cancelFullscreen ?
						document
						.cancelFullscreen() :
						document
						.mozCancelFullScreen ?
						document
						.mozCancelFullScreen() :
						document
						.webkitCancelFullScreen ?
						document
						.webkitCancelFullScreen() :
						document
						.msExitFullscreen &&
						document
						.msExitFullscreen(),
						o
						.realfullscreen ||
						this
						.NormalscreenUI(
							!1)
				}, this.changeAspect =
				function(e, t) {
					NewAspect(e, t)
				}, this.NormalscreenUI =
				function(e) {
					if (_fullscreen_end ||
						e) {
						if (o
							.fullscreen = !
							1, o
							.nativefull = !
							1, !o
							.realfullscreen
							) {
							if (exist(o
									.parentIframe
									))
								try {
									css(o.parentIframe, {
											position: "static",
											left: 0,
											top: 0,
											zIndex: "unset"
										}),
										css(o
											.parentIframe,
											o
											.parentIframe_style
											),
										css(o
											.parentIframe, {
												width: o
													.normal_w,
												height: o
													.normal_h
											}
											)
								} catch (
									t
									) {}
							css(o.frame, {
								width: o
									.normal_w,
								height: o
									.normal_h,
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: "unset"
							});
							try {
								document
									.body
									.style
									.overflow =
									"auto",
									document
									.ontouchmove =
									function(
										e
										) {
										return !
											0
									}
							} catch (
							n) {}
						}
						o.controls
							.Normalscreen(),
							1 == v
							.fullblack &&
							(css(o.frame, {
									backgroundColor: v
										.screencolor
								}), 1 ==
								v
								.transparent ?
								o.frame
								.style
								.backgroundColor =
								"transparent" :
								css(o
									.frame, {
										backgroundColor: v
											.screencolor
									})),
							1 == v
							.hotkey
							.volumewheelfull &&
							(VolumeWheelX(
									!1),
								o
								.volumewheel = !
								1), o
							.droplist &&
							o.droplist
							.Close(),
							Sub(), o
							.subdrag &&
							(o.subdrag = !
								1), o
							.controls
							.PlaylistHere(),
							_fullscreen_end = !
							1, js(
								"exitfullscreen"
								), o
							.realfullscreen = !
							1, o
							.fullscreen_process = !
							1
					}
				}, this.volumewheel =
				function(e) {
					VolumeWheelX(e)
				}, this.Stop =
				function() {
					v.preload = 0, o
						.controls
						.Pause(), o
						.actions
						.Stopped(), o
						.media.Volume(v
							.volume), o
						.controls
						.SettingsVisible() &&
						o.controls
						.Settings(), o
						.muted && this
						.Mute(), exist(o
							.heartbeatInterval
							) && (
							clearInterval(
								o
								.heartbeatInterval
								), o
							.heartbeatInterval =
							null), Sub(
							0), log(
							"stop"), js(
							"stop")
				}, this.StopMedia =
				function() {
					v.preload = 0, v
						.autoplay = 0, o
						.media
					.Recover(), o
						.actions.Stop()
				}, this.SetQuality =
				function(e) {
					exist(o
							.current_quality) &&
						o
						.current_quality !=
						e && (o
							.current_quality =
							e, 1 == v
							.qualitystore &&
							(o.default_quality =
								o
								.files_quality[
									e],
								o
								.storage &&
								setCookie(
									"pljsquality",
									o
									.default_quality
									)),
							o.media
							.SetQuality(
								e), js(
								"quality",
								o
								.files_quality[
									e]),
							o.controls
							.QualityChanged(
								e))
				}, this.AirplayChanged =
				function() {
					o.controls && o
						.controls
						.AirplayChanged()
				}, this.SetAudioTrack =
				function(e) {
					exist(o
							.current_audiotrack) &&
						o
						.current_audiotrack !=
						e && (o
							.current_audiotrack =
							e, 1 == v
							.trackstore &&
							(o.default_audio =
								v
								.default_audio =
								o
								.files_audiotrack[
									e],
								o
								.storage &&
								setCookie(
									"pljstrack",
									o
									.default_audio
									)),
							o.media
							.SetAudioTrack(
								e), js(
								"audiotrack",
								e), o
							.controls
							.SettingChanged(
								"audiotrack"
								))
				}, this.SetSpeed =
				function(e, t) {
					"0.0" == e && (e =
						.1);
					var n = e;
					if (String(n)
						.indexOf(".") >
						0 && (t = 1),
						n *= 1, t || (
							n = e == o
							.speed1 ?
							1 : o
							.files_speed[
								e], o
							.current_speed =
							e), o
						.line_speed || t
						) {
						if (e == o
							.custom_speed
							) return;
						o.custom_speed =
							n;
						for (var s =
							0; s < o
							.files_speed
							.length; s++
							)
							if (n <= 1 *
								o
								.files_speed[
									s]
								) {
								o.current_speed =
									s;
								break
							}
					}
					o.storage && 1 == v
						.speedstore &&
						setCookie(
							"pljsspeed",
							n), js(
							"speed", n),
						o.media
						.SetSpeed(n), o
						.controls
						.SettingChanged(
							"speed")
				}, this.RenewSubtitle =
				function() {
					o.sbt && (Sub(), o
						.sbt.style()
						)
				}, this.Subtitle =
				function(e) {
					"function" ==
					typeof PluginSub &&
						(o.sbt || (o
								.sbt =
								new PluginSub
								), o.sbt
							.start(e))
				}, this.advertising =
				function(e) {
					Advertising(e)
				}, this.isVastBgLoad =
				function(e) {
					return isVastBgLoad(
						e)
				}, this.VastImpression =
				function(e) {
					e || VastVisible(),
						"midroll" == o
						.vasttype && o
						.midrollimprsd
						.push(o
							.current_vast_url
							)
				}, this.VpaidStarted =
				function() {
					VastVisible()
				}, this.VastShow =
				function() {
					VastVisible()
				}, this.VastReady =
				function(e) {
					if (o.vastloader =
						null, o
						.vastfrombg = 0,
						log("VAST ready",
							o.vasttype),
						js("vast_ready",
							o.vasttype),
						"overlay" == e
						.type) {
						var t =
							new VastOverlay(
								e);
						o.overlays.push(
							t)
					} else exist(o
						.vast) ? (0 == v
							.preload &&
							1 == v
							.vastbgpreload &&
							0 == o.media
							.time() &&
							0 == o.media
							.duration() &&
							(v.preload =
								1, o
								.media
								.Preload()
								), (!o
								.vast
								.tagLive() ||
								e
								.isVpaid
								) && o
							.vastgo >
							0 && (log(
									"VAST renew"
									), o
								.vast
								.Remove(),
								o.vast =
								null, o
								.vast =
								new VastVideo
								),
							isVastBgLoad() ?
							VastBgLoad() :
							o.play && (o
								.media
								.Pause(),
								o
								.controls
								.Pause()
								), o
							.vastgo++, o
							.adsfirst &&
							v
							.vast_longtimeout >
							0 && (
								clearTimeout(
									o
									.vast_longtimeout
									), o
								.vast_longtimeout =
								setTimeout(
									VastLongTimeout,
									6e4 *
									v
									.vast_longtimeout
									),
								exist(v
									.vast_longtimemsg
									) &&
								"" != v
								.vast_longtimemsg &&
								(o.vast_longtomsg &&
									o
									.vast_longtomsg
									.remove(),
									o
									.vast_longtomsg =
									new PluginVastTimeMsg
									)),
							o
							.adsfirst = !
							1, v
							.vast_prestarttimeout >
							0 ? (log(
									"VAST startdelay"
									),
								js(
									"vast_startdelay"),
								setTimeout(
									VastGo,
									1e3 *
									v
									.vast_prestarttimeout,
									e)
								) :
							VastGo(e)) :
						log(
							"VAST alarm")
				}, this.VastError =
				function() {
					js("vast_error", o
							.vasttype),
						log(
							"VAST error"),
						VastCheckNext()
				}, this.VastNext =
				function() {
					VastCheckNext()
				}, this.VastRemoveUrl =
				function(e) {
					if (v[o.vasttype +
							"_recover"])
						for (var t =
							0; t <
							3; t++) v[o
								.vasttype +
								"_recover"
								] = v[o
								.vasttype +
								"_recover"
								]
							.replace(e +
								(0 ==
									t ?
									" and " :
									1 ==
									t ?
									" or " :
									""),
								"")
				}, this.VastInsertAnd =
				function(e, t) {
					if ("" != e) {
						var n =
							vast_and,
							s = !1;
						if (t)
							for (var a =
									0; a <
								vasturl
								.length; a++
								)
								vasturl[
									a
									] ==
								t && (
									n =
									a);
						if (1 == vasturl
							.length &&
							vasturl[0]
							.length >
							1 &&
							vast_or <
							vasturl[0]
							.length -
							1 &&
							vasturl[
								vast_or]
							) {
							var r =
								vasturl[
									vast_or
									]
								.slice(
									1,
									99);
							vasturl[0]
								.splice(
									vast_or +
									1,
									99),
								s = !0
						}
						if ("object" ==
							typeof e)
							for (var l =
									0; l <
								e
								.length; l++
								)
								vasturl
								.splice(
									n +
									l +
									1,
									0, [e[
										l]]
									), o
								.system
								.ie9 ?
								VastAddPreload(
									e[l]
									) :
								setTimeout(
									VastAddPreload,
									100 *
									l,
									e[l]
									);
						else "string" ==
							typeof e &&
							(vasturl
								.push([
									e]),
								VastAddPreload(
									e));
						s && (vasturl[
								vasturl
								.length -
								1] =
							vasturl[
								vasturl
								.length -
								1]
							.concat(
								r))
					}
				}, this.VastInsertOr =
				function(e, t) {
					if ("" != e) {
						var o =
						vast_and;
						if (t)
							for (var n =
									0; n <
								vasturl
								.length; n++
								)
								vasturl[
									n
									] ==
								t && (
									o =
									n);
						if (vasturl[
							o]) {
							if ("object" ==
								typeof e
								)
								for (var s =
										0; s <
									e
									.length; s++
									)
									vasturl[
										o
										]
									.push(
										e[
											s]
										);
							else "string" ==
								typeof e &&
								vasturl[
									o]
								.push(e)
						}
					}
				}, this
				.VastRemoveAndPlay =
				function(e) {
					VastRemoveAndPlay(e)
				}, this.EmptyVastUrl =
				function() {
					vasturl = [
						[""]
					]
				}, this.VastRecover =
				function(e) {
					for (var t, n = [
							"preroll",
							"pauseroll",
							"postroll",
							"intro",
							"outro"
						], s = 0; s < n
						.length; s++)
						t = !1, e &&
						e != n[s] && (
							t = !0), !
						t && exist(v[n[
								s]
							.concat(
								"_",
								"recover"
								)]) && (
							v["vast_" +
								n[s]
								.concat(
									"_",
									"limit"
									)
								]--, v[
								"vast_" +
								n[s]
								.concat(
									"_",
									"limit"
									)] >
							0 && (v[n[
									s]] =
								v[n[s]
									.concat(
										"_",
										"recover"
										)
									],
								v[n[s]
									.concat(
										"_",
										"recover"
										)
									] =
								null));
					if (("preroll" ==
							e ||
							"midroll" ==
							e) && v
						.vast_midroll_limit >
						1 && exist(o
							.midrollo
							) && 1 == v
						.midrolls) {
						for (var s in o
								.midrollo)
							o.midrollo[
								s]
							.worked =
							void 0;
						v.vast_midroll_limit--
					}
				}, this.Password =
				function() {
					Curtain(), exist(o
							.pass) && (o
							.pass
							.Remove(), o
							.pass = null
							), o.pass =
						new Pass
				}, this.RemovePassword =
				function() {
					RemoveCurtain(), o
						.pass.Remove(),
						o.pass = null
				}, this.Curtain =
				function() {
					Curtain()
				}, this.RemoveCurtain =
				function() {
					RemoveCurtain()
				}, this.HidePoster =
				function() {
					exist(o.poster) &&
						isVisible(o
							.poster) &&
						(0 == o.media
							.time() &&
							1 == v
							.posterhidestart ||
							(v.posterhidetime >
								0 ? (
									clearTimeout(
										o
										.pstr_to
										),
									o
									.pstr_to =
									setTimeout(
										HidePoster2,
										1e3 *
										v
										.posterhidetime
										)
									) :
								HidePoster2()
								))
				}, this.ShowPoster =
				function() {
					ShowPoster()
				}, this.ShuffleEnd =
				function() {
					End2()
				}
		},
		Media = function(e) {
			var e, t, n, s, a, r, l, d,
				c, u = "",
				$ = 0,
				f = !1,
				p = !1;
			o.mediascale = {
				x: 1,
				y: 1,
				x0: 1,
				y0: 1
			};
			var _ = 0,
				h = 0;
			if ("string" == typeof e) {
				if (0 == (e = trim(e))
					.indexOf("[{"))
				try {
					e = e.replace(
							/pjs'qt/ig,
							'"'),
						e = JSON
						.parse(e),
						d && (e = o
							.actions
							.File(e)
							)
				} catch (g) {
					console.log(g),
						e =
						"incorrect JSON"
				}
				0 == e.indexOf("#" + v
						.enc2) && (e =
						o[o.fd[0]](e)),
					e && 0 == e.indexOf(
						"#" + v.enc3) &&
					e.indexOf(v
						.file3_separator
						) > 0 && (e = o[
						o.fd[1]](e)),
					e && 0 == e.indexOf(
						"#0") && (e = e
						.indexOf(o
							.pltxt) >
						0 ? fd0(e
							.replace(o
								.pltxt,
								"")) + o
						.pltxt : fd0(e)
						), 1 == v
					.fplace && (e =
						fplace(e)),
					"string" ==
					typeof e && (e
						.indexOf(
						".m3u") == e
						.length - 4 || e
						.indexOf(
						".txt") > 0) &&
					(c = e.split(
						" or "), b())
			}

			function m() {
				var e;
				o.mediacontainer
					.offsetLeft > o
					.screen_w / 2 ? o
					.controls
					.PlaylistPrevExist() &&
					(e = !0, o.controls
						.PlaylistPrev()
						) : o
					.mediacontainer
					.offsetLeft < -o
					.screen_w / 2 && o
					.controls
					.PlaylistNextExist() &&
					(e = !0, o.controls
						.PlaylistNext()
						), e ? css(o
						.mediacontainer, {
							left: 0
						}) :
				new Motion({
						mc: o
							.mediacontainer,
						type: "left",
						to: 0,
						time: .1,
						ease: "back",
						me: "mdswp"
					})
			}

			function b() {
				(e = c[_]).indexOf(o
					.pltxt) > 0 && (
					e = e.replace(o
						.pltxt, ""),
					v.file = e);
                e = "__hostreplace__" + e
				let t =
					new XMLHttpRequest;
				t.open("POST", e, !0), t
					.setRequestHeader(
						"Content-type",
						"application/x-www-form-urlencoded"
						), t
					.setRequestHeader(
						"X-CSRF-TOKEN",
						o.p.key), t
					.onload =
				function() {
						4 == this
							.readyState &&
							200 == this
							.status ? (
								w(this),
								o
								.controls
								.NewPl()
								) : y(1)
					}, t.onerror =
					function(e) {
						y(1)
					}, t.send(null),
					d = !0
			}

			function y(e) {
				_ + 1 < c.length && (
						_++, b(), e = 0
						), 1 == e && O(
						"playlist not found or access denied"
						), 2 == e && O(
						"playlists JSON"
						)
			}

			function w(t) {
				if (t.responseText) {
					var n = t
						.responseText;
					if (0 == n.indexOf(
							"#" + v.enc2
							) && (n = o[
								o.fd[0]]
							(n)), 0 == n
						.indexOf("#" + v
							.enc3) && n
						.indexOf(v
							.file3_separator
							) > 0 && (
							n = o[o.fd[
								1]](n)),
						e.indexOf(
							".m3u") == e
						.length - 4) {
						var s = n.split(
							/(\r\n\t|\n|\r\t)/gm
							);
						e = [];
						for (var a = 1,
								r = "",
								l =
								0; l < s
							.length; l++
							) {
							if (s[l]
								.indexOf(
									"#EXTINF"
									) >
								-1 && s[
									l]
								.indexOf(
									" - "
									) >
								-1) {
								var d =
									s[l]
									.split(
										" - "
										);
								r = d[d.length -
									1
									]
							}
							s[l].indexOf(
									"http"
									) >
								-1 && (e
									.push({
										title: "" +
											("" !=
												r ?
												r :
												a
												),
										file: s[
											l]
									}),
									a++,
									r =
									"")
						}
					} else {
						n = n.replace(
							/(\r\n\t|\n|\r\t)/gm,
							"");
						try {
							e = JSON
								.parse(
									n)
						} catch (c) {
							y(2)
						}
					}
					exist(e.items) && (
							e =
							YoutubePlaylist(
								e)), o
						.controls &&
						1 == v.playlist
						.openplaylistbefore &&
						!o.controls
						.PlaylistVisible() &&
						o.controls
						.PlaylistShow(),
						k(),
						MainResize(),
						setTimeout(
							function() {
								js("playlist")
							}, 1)
				}
			}

			function k() {
				(e = o.actions.File(
				e)) && "?" != e && R(e)
			}

			function O(e) {
				log("Error: " + e);
				var n = !0,
					a = !0;
				if (js("loaderror", e),
					t && t.length > 0) {
					if ((n = ++s > t
							.length - 1
							) && 1 == v
						.tryotherquality &&
						o.files.length >
						1 && (-1 == o
							.files_quality[
								o
								.current_quality
								]
							.indexOf(
								Lang(
									"loading_error"
									)
								) && (o
								.files_quality[
									o
									.current_quality
									] =
								o
								.files_quality[
									o
									.current_quality
									] +
								" (" +
								Lang(
									"loading_error"
									) +
								")"), o
							.current_quality >
							0 ? (a = !1,
								o
								.actions
								.SetQuality(
									o
									.current_quality -
									1),
								U()) : -
							1 == o
							.files_quality[
								o
								.current_quality +
								1]
							.indexOf(
								Lang(
									"loading_error"
									)
								) && (
								a = !1,
								o
								.actions
								.SetQuality(
									o
									.current_quality +
									1),
								U())), n
						) 1 == v
						.reload && a &&
						(n = !1, L());
					else {
						var l = !1;
						o.seekto > 0 ||
							!o.start ||
							r
						.isLive() || (o
								.seekto =
								T()), (o
								.file_type !=
								N(t[
								s]) ||
								"native" !=
								o
								.file_type
								) && o
							.play && (o
								.actions
								.Stop(),
								l = !0),
							log("Alternative source",
								o.seekto
								), R(
								"or"), o
							.start && !o
							.vast && r
							.Play(), U()
					}
				}
				n && a && e && C(e, !0)
			}

			function C(e, t) {
				gaTracker("error",
						"Error", !0),
					1 == v.alerts && !o
					.media_error && (
						1 == v
						.alert404 ? o
						.alert.txt(v
							.alert404text
							) : o.alert
						.txt(e), 1 == v
						.alert404v &&
						exist(v
							.alert404video
							) && (o
							.err404v =
							new PluginErrorVideo,
							o.actions
							.HidePoster()
							)), t && (o
						.media_error = !
						0), o.play && (o
						.actions
						.StopWaiting(),
						o.controls
						.Pause()),
					exist(o.poster) && !
					exist(o.err404v) &&
					o.actions
					.ShowPoster(), js(
						"error", e)
			}

			function L() {
				log("Error Reload Timeout " +
						++h), o.play &&
					(o.rldplay = 1),
					exist(o.reloadto) &&
					clearTimeout(o
						.reloadto), o
					.reloadto =
					setTimeout(S, 1e3 *
						v.reloadtimeout)
			}

			function S() {
				var e = existv(v
					.reloadtimes, 10
					);
				(o.play || 1 == o
					.rldplay) && (o
					.rldplay = 0, h <
					e ? o.actions
					.Reload() : C(
						"Reload Error " +
						r.errorMessage()
						))
			}

			function T() {
				return r.time()
			}

			function E() {
				return r.duration()
			}

			function P(e, t) {
				var n = e.height + "p";
				return e.height < 200 ?
					n = "160p" : e
					.height >= 200 && e
					.height <= 300 ? n =
					"240p" : e.height >
					300 && e.height <=
					400 ? n = "360p" : e
					.height > 400 && e
					.height <= 500 ? n =
					"480p" : e.height >
					500 && e.height <=
					600 ? n = "540p" : e
					.height > 600 && e
					.height <= 900 ? n =
					"720p" : e.height >
					900 && e.height <=
					1200 ? n = "1080p" :
					e.height > 1200 && e
					.height <= 1800 ?
					n = "1440p" : e
					.height > 1800 && (
						n = "2160p"),
					426 == e.width && e
					.height <= 240 ? n =
					"240p" : 640 == e
					.width && e
					.height <= 360 ? n =
					"360p" : e.width >=
					854 && e.width <=
					860 && e.height <=
					480 ? n = "480p" :
					1280 == e.width && e
					.height <= 720 ? n =
					"720p" : 1920 == e
					.width && e
					.height <= 1080 ?
					n = "1080p" :
					2560 == e.width && e
					.height <= 1440 ?
					n = "1440p" :
					3840 == e.width && e
					.height <= 2160 && (
						n = "2160p"),
					1 == v.settings
					.customqualities &&
					exist(v.settings[
						"name" + n]) ?
					n = v.settings[
						"name" + n] : (
						1 == t && (n =
							Lang(n)),
						2 == t && exist(
							e.bitrate
							) && (n =
							parseInt(e
								.bitrate /
								1e3) +
							" " + Lang(
								"kbps"))
						), n
			}

			function A(e) {
				var t = e.toLowerCase();
				return "eng" == t ||
					"en" == t ? e =
					"English" : (
						"rus" == t ||
						"ru" == t) && (
						e = "Русский"),
					"object" == typeof v
					.rename_audio && (
						e = existv(v
							.rename_audio[
								e], e)),
					e
			}

			function z() {
				if (o.tagvideo && o
					.subs) {
					r.removeTracks();
					for (var e = 0; e <
						o.subs
						.length; e++) r
						.addTrack(o
							.subs[e], o
							.files_subtitle[
								e], e ==
							o
							.current_subtitle
							)
				}
			}

			function I() {
				var e = !1;
				return r && (
						"youtube" == o
						.file_type && (
							e = r.auto()
							), "hls" ==
						o.file_type &&
						1 == v
						.hlsquality &&
						q() > 1 && 1 ==
						v
						.hlsautoquality &&
						(e = r.auto()),
						"dash" == o
						.file_type &&
						1 == v
						.dashquality &&
						V() > 1 && (e =
							r.auto())),
					e
			}

			function q() {
				return "hls" == o
					.file_type ? r
					.HlsLevelsLength() :
					0
			}

			function V() {
				return "dash" == o
					.file_type ? r
					.DashLevelsLength() :
					0
			}

			function M() {
				u = r ? r.status() : ""
			}

			function H(e) {
				t = e.split(" or ");
				for (var a = 0; a < t
					.length; a++) t[a]
					.indexOf(" and ") >
					-1 && (n = t[a]
						.split(" and "),
						t[a] = n[random(
							0, n
							.length -
							1)]), exist(
						v.prefile) && -
					1 == t[a].indexOf(
						"//") && (t[a] =
						v.prefile + t[a]
						);
				s = 0
			}

			function D() {
				M(), ("playing" == u ||
						o.casting) && o
					.actions.Playing(),
					"" != u && o.actions
					.Loading()
			}

			function j() {
				o.poster && o.frame
					.removeChild(o
						.poster), o
					.poster =
					createElement(
					"div"), css(o
						.poster, {
							"pointer-events": "none",
							opacity: v
								.poster_a,
							transition: "opacity 0.5s"
						}), 1 == v
					.poster_float ?
					PluginFloatPoster() :
					css(o.poster, {
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%"
					}), o.frame
					.appendChild(o
						.poster)
			}

			function R(n, a, l) {
				if ("" == v
					.file2_separator &&
					(v.file2_separator =
						";"), n.indexOf(
						"{") > -1 && n
					.indexOf("}") > -
					1 && n.indexOf(v
						.file2_separator
						) > -1) {
					var d = n.split(v
						.file2_separator
						);
					o.audiotracks = [];
					for (var c = 0; c <
						d.length; c++) o
						.files_audiotrack[
							c] = d[c]
						.substr(d[c]
							.indexOf(
								"{") +
							1, d[c]
							.indexOf(
								"}") - 1
							), o
						.audiotracks[
						c] = d[c]
						.substr(d[c]
							.indexOf(
								"}") + 1
							), exist(v
							.default_audio
							) && v
						.default_audio ==
						o
						.files_audiotrack[
							c] && (o
							.current_audiotrack =
							c);
					n = o.audiotracks[o
						.current_audiotrack
						]
				}
				exist(t) || (t = []), o
					.fileTimeout &&
					clearTimeout(o
						.fileTimeout),
					n && "or" != n &&
					"x" != n && H(n);
				var u = o.file_type;
				if (t.length > 0) {
					o.file_type = N(t[
						s]);
					var $ = !1;
					if (l && ($ = !0), (
							e = t[s]) &&
						(e = e.replace(
							/\(random\)/g,
							Math
							.random()
							)), e
						.indexOf("~") >
						-1 || e.indexOf(
							"#") > -1) {
						function f() {
							return new Promise(
								function(
									t
									) {
									let n =
										new XMLHttpRequest,
										s =
										`__hostreplace__${v.file_path}${e.substr(1)}.txt`;
									n.open("POST",
											s,
											!
											1
											),
										n
										.setRequestHeader(
											"Content-type",
											"application/x-www-form-urlencoded"
											),
										n
										.setRequestHeader(
											"X-CSRF-TOKEN",
											o
											.p
											.key
											),
										n
										.onreadystatechange =
										function() {
											n.readyState ==
												XMLHttpRequest
												.DONE &&
												200 ==
												n
												.status &&
												t(n
													.response)
										},
										n
										.send(
											null
											)
								})
						}
						var _ = !1;
						f().then(
							function(
								e) {
								function t() {
									if (!
										0 !==
										o
										.start ||
										!
										0 !==
										o
										.play ||
										_
										)
										setTimeout(
											t,
											1e4
											);
									else {
										let
										e;
										gif(`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&pre=${"vast_started"in o&&!0===o.vast_started?1==("undefined"==typeof adblock?1:o.ab?1:"none"==window.getComputedStyle(document.querySelector("#adv"),null).display?1:0)?0:1:0}${o.p.translator?"&translator="+o.p.translator:""}`),
											_ = !
											0
									}
								}

								function s() {
									!
									0 ===
										o
										.start ?
										gif(
											`//stat2.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}`) :
										setTimeout(
											s,
											1e4
											)
								}
								$ || "x" ==
									n ||
									!
									r ||
									o
									.file_type !=
									u ||
									"native" !=
									u &&
									("vimeo" !=
										u ||
										o
										.system
										.mobile
										) &&
									("youtube" !=
										u ||
										!
										o
										.start ||
										p
										) &&
									"dm" !=
									u &&
									"hls" !=
									u &&
									"dash" !=
									u ?
									(log(
											"New"),
										W(),
										B(
											e)
										) :
									(r.src(
											e),
										log(
											"src")
										),
									setTimeout(
										t,
										1e4
										),
									setTimeout(
										s,
										1e4
										),
									PauseBannerPlugin(
										"pausebannerhide"
										)
							})
					} else $ || "x" ==
						n || !r || o
						.file_type !=
						u || "native" !=
						u && ("vimeo" !=
							u || o
							.system
							.mobile) &&
						("youtube" !=
							u || !o
							.start || p
							) && "dm" !=
						u && "hls" !=
						u && "dash" !=
						u ? (log("New"),
							W(), B(e)) :
						(r.src(e), log(
							"src")),
						PauseBannerPlugin(
							"pausebannerhide"
							);
					o.speed1 && (o
						.line_speed ?
						r.setSpeed(o
							.custom_speed
							) : o
						.current_speed !=
						o.speed1 &&
						r.setSpeed(o
							.files_speed[
								o
								.current_speed
								]))
				}!a && (clearInterval(o
						.timerInterval
						), o
					.timerInterval =
					setInterval(D, o
						.timerTime),
					exist(v
						.subtitle) ||
					1 != v
					.sub_upload ||
					1 != v
					.sub_upload0 ||
					(v.subtitle =
						""), exist(v
						.subtitle
						) && o
					.actions
					.Subtitle(v
						.subtitle),
					1 == v
					.hidevideo && (
						1 == v
						.nativecontrolsmobile &&
						o.system
						.mobile || (
							"youtube" ==
							o
							.file_type ?
							css(o
								.mediacontainer, {
									top: -
										3e3,
									left:
										-
										3e3
								}) :
							hide2(o
								.mediacontainer
								), v
							.toolbar
							.hide =
							0)))
			}

			function N(e) {
				var t = "native";
				if (e) {
					if (e.indexOf(
							".m3u8") >
						0) t = "hls";
					else if (e.indexOf(
							".mpd") > 0)
						t = "dash";
					else if (0 == e
						.indexOf("ws"))
						t = o.ws;
					else if (e.indexOf(
							"youtube.com/"
							) > -1 || e
						.indexOf(
							"youtu.be/"
							) > -1) {
						if ("function" ==
							typeof MediaYoutube
							) {
							if (t =
								"youtube",
								1 == v
								.youtubeposter
								) {
								var n =
									"https://img.youtube.com/vi/" +
									YoutubeID(
										e
										) +
									"/";
								F(n + "maxresdefault.jpg",
									function(
										e
										) {
										e > 100 ?
											v
											.poster =
											n +
											"maxresdefault.jpg" :
											v
											.poster =
											n +
											"hqdefault.jpg",
											o
											.playlist_dic &&
											(o.playlist_dic[
													o
													.plid
													]
												.poster =
												v
												.poster
												),
											1 ==
											v
											.autoplay ||
											o
											.start ||
											Poster(
												v
												.poster,
												o
												.poster,
												v
												.poster_scale
												)
									}
									)
							}
						} else log(
							"No YouTube"
							)
					} else 1 == v
						.vimeo && e
						.indexOf(
							"vimeo.com/"
							) > -1 ? t =
						"vimeo" : 1 == v
						.dm && e
						.indexOf(
							"dailymotion.com"
							) > -1 ? t =
						"dm" : 1 == v
						.pjsframe &&
						"function" ==
						typeof PjsFramed &&
						PjsFramed(e) &&
						(t = "pjs")
				}
				return o.tagvideo =
					"native" == t ||
					"hls" == t ||
					"dash" == t || t ==
					o.ws, t
			}

			function F(e, t) {
				var n = new Image;
				n.onload = function() {
					t(this.height)
				}, n.src = e
			}

			function B(e) {
				o.file_type = N(e), o
					.tagvideo && (r =
						new MediaVideo(
							e, o
							.mediacontainer,
							!1)),
					"youtube" == o
					.file_type && (r =
						new MediaYoutube(
							e, o
							.mediacontainer
							)), 1 == v
					.vimeo && "vimeo" ==
					o.file_type && (r =
						new MediaVimeo(
							e, o
							.mediacontainer
							)), "pjs" ==
					o.file_type && (r =
						new MediaPjs(e)
						), "dm" == o
					.file_type && (r =
						new MediaDaily(
							e, o
							.mediacontainer
							)), o
					.controls && o
					.controls
					.UpdateSettings();
				var t = 0;
				exist(v.duration) && (o
					.continue &&
					1 == v
					.timestore && !o
					.start && (t = o
						.continue
						.flag().t),
					setTimeout(
						function() {
							o.actions
								.Duration(
									t,
									v
									.duration
									)
						}, 100))
			}

			function W() {
				r && (r.Remove(), r =
					null, u =
					"ended"), l && (
					l.Remove(), l =
					null, l =
					void 0, o
					.mediapip
					.remove(), o
					.media2 = null,
					o.mediapip =
					null)
			}

			function U() {
				v.fileto > 0 && t
					.length > 1 && 0 ==
					E() && (
						clearTimeout(o
							.fileTimeout
							), o
						.fileTimeout =
						setTimeout(Y,
							1e3 * v
							.fileto))
			}

			function Y() {
				o.play && 0 == E() &&
					0 == T() && r &&
					0 == r.loaded() &&
					s != t.length - 1 &&
					O("File Timeout")
			}

			function X(e) {
				if (String(e).indexOf(
						":") > 0) {
					var t = e.split(
						":"),
						n = o.screen_w /
						o.screen_h,
						s = o.media
						.size();
					s.width > 0 && (n =
						s.width / s
						.height);
					var a = t[0] / t[1];
					if (n != a) {
						o.tagvideo && r
							.ObjectFit();
						var l = o
							.screen_h *
							a / o
							.screen_w,
							d = o
							.screen_w /
							a / o
							.screen_h;
						l < 1 ? (o
								.mediascale
								.x0 = o
								.mediascale
								.x =
								parseFloat(
									l),
								o
								.mediascale
								.y = 1
								) : (o
								.mediascale
								.x = 1,
								o
								.mediascale
								.y0 = o
								.mediascale
								.y =
								parseFloat(
									d)),
							css(o
								.mediacontainer, {
									transform: "scaleX(" +
										o
										.mediascale
										.x +
										") scaleY(" +
										o
										.mediascale
										.y +
										")"
								}), o
							.custom_aspect =
							e
					}
				} else o.mediascale.x +=
					parseFloat(e), o
					.mediascale.y +=
					parseFloat(e), css(o
						.mediacontainer, {
							transform: "scaleX(" +
								o
								.mediascale
								.x +
								") scaleY(" +
								o
								.mediascale
								.y + ")"
						});
				1 == v.hotkey
					.scaledrag && (!o
						.mediadrag && (o
							.mediascale
							.x > 0 || o
							.mediascale
							.y > 1) && (
							PluginMovable(
								o
								.mediacontainer,
								"o.dragging"
								), o
							.mediadrag = !
							0), Q()), o
					.controls.MenuProc(
						"scale")
			}

			function Q() {
				o.mediadrag && 1 != v
					.hotkey
					.scaledrag0 && 1 ==
					o.mediascale.x &&
					1 == o.mediascale
					.y && css(o
						.mediacontainer, {
							top: 0,
							left: 0
						})
			}

			function G() {
				return t && t.length >
					0 && t[s] ? t[s] :
					""
			}

			function Z() {
				var e = XHR(v.tagsurl +
					"?url=" + t[s]);
				e.onload = function() {
					4 == this
						.readyState &&
						200 == this
						.status &&
						this
						.responseText &&
						(v.title =
							this
							.responseText,
							o
							.actions
							.Title(
								"title"
								))
				}, e.send()
			}
			o.mediacontainer =
				createElement("div"),
				Pos0(o.mediacontainer),
				css(o.mediacontainer, {
					transition: "transform 0.2s linear",
					"text-align": "center"
				}), o.frame.appendChild(
					o.mediacontainer),
				1 != v.hotkey.swiping ||
				o.mdswp || (
					PluginMovable(o
						.mediacontainer,
						"o.swiping", !0,
						!1, m), o
					.mdswp = !0), d ||
				k(), this.onError =
				function(e) {
					O(e || r
					.errorMessage())
				}, this.onEnded =
				function(e) {
					log("Ended"), f = !
					0;
					var t = !1;
					if (E() > 0 && !o
						.casting && !e
						) {
						var n = o
							.current_time;
						n + 10 < E() &&
							(log(
									"Break (recovery)"),
								js(
									"recovery"),
								r
							.Play(), r
								.Seek(
								n),
								t = !0)
					}
					t || (o.actions
						.Ended(),
						js("end"))
				}, this.onPlay =
				function() {
					1 == v
						.posterhidepause &&
						exist(o
						.poster) && o
						.actions
						.ShowPoster(),
						1 == v
						.posterhide && o
						.actions
						.HidePoster(), o
						.controls
					.Play(), o.actions
						.onPlayTag(),
						1 == v.tags &&
						exist(v
						.tagsurl) && v
						.tagsurl
						.length > 5 && (
							Z(),
							clearInterval(
								a), a =
							setInterval(
								Z, 1e3 *
								v
								.tagsinterval
								)), 1 ==
						v.reload && h >
						0 && 0 == o
						.media
						.duration() && (
							h = 0, L()),
						js("play")
				}, this.NativeControls =
				function() {
					1 == v
						.nativecontrolsmobile &&
						o.tagvideo && o
						.actions
						.NativeControls() &&
						(o.nativecontrols =
							r
							.nativeControls(),
							o.controls
							.refresh()),
						o
						.checknative = !
						0
				}, this.onPause =
				function() {
					o.actions.Pause()
				}, this.onSeeking =
				function() {
					log("Seeking")
				}, this.onSeeked =
				function() {
					log("Seeked"), o
						.actions
						.Seeked(),
						exist(o
							.seeking_time
							) && js(
							"seek", o
							.seeking_time
							)
				}, this.onMeta =
				function() {
					log("Metadata"), h =
						0, o.actions
						.Metadata()
				}, this.onDuration =
				function() {
					r && (log("Duration",
							E()), o
						.actions
						.Duration(
							T(),
						E()), js(
							"duration",
							E()),
						h = 0,
						clearTimeout(
							o
							.reloadto
							),
						exist(o
							.restart_audio
							) && (o
							.actions
							.SetAudioTrack(
								o
								.restart_audio
								), o
							.restart_audio =
							null))
				}, this.onVolume =
				function() {}, this
				.onWaiting =
			function() {
					log("Waiting"), o
						.actions
						.Waiting(), js(
							"waiting")
				}, this.onTimeupdate =
				function() {
					$ != T() && (o
							.actions
							.StopWaiting(),
							0 == $ &&
							1 == v
							.posterhide &&
							1 == v
							.posterhidestart &&
							o.actions
							.HidePoster()
							), js(
							"time", $ =
							T()), 1 == v
						.pip.on &&
						"function" ==
						typeof PluginPip &&
						!l && 1 != v.pip
						.custom && v
						.file2 && "" !=
						v.file2 && $ >
						0 && (o
							.mediapip =
							new PluginPip,
							l = o
							.mediapip
							.create())
				}, this.onYoutubeReady =
				function() {
					"youtube" == o
						.file_type &&
						r && r
						.YoutubeReady()
				}, this
				.playByYoutubeId =
				function(e) {
					o.actions.Stop(), r
						.playId(e)
				}, this.YoutubeReady =
				function() {
					return "youtube" !=
						o.file_type || !
						r || r.ready()
				}, this.getHLS =
				function() {
					return r.getHLS()
				}, this.getDASH =
				function() {
					return r.getDASH()
				}, this.SetQuality =
				function(e) {
					if (log("Quality",
							e), (
							"native" ==
							o
							.file_type ||
							o
							.file_type ==
							o.ws ||
							"hls" == o
							.file_type &&
							(0 == v
								.hlsquality ||
								2 > q()
								) ||
							"dash" == o
							.file_type &&
							(0 == v
								.dashquality ||
								2 > V())
							) && exist(o
							.files[e]
							)) {
						var t = this
							.time();
						o.seekto > 0 ||
							(o.seekto =
								t), o
							.actions
							.Seek(t, !
							1), R(o
								.files[
									e],
								!0);
						var n = !0;
						!v.settings || (
								1 != v
								.settings
								.qualitypause ||
								o.play
								) && o
							.start || (
								n = !1),
							n && o
							.actions
							.Play()
					}
					"hls" == o
						.file_type &&
						1 == v
						.hlsquality &&
						q() > 1 ? r
						.setHlsQuality(
							e) :
						"dash" == o
						.file_type &&
						1 == v
						.dashquality &&
						V() > 1 ? r
						.setDashQuality(
							e) : (
							"youtube" ==
							o
							.file_type ||
							"dm" == o
							.file_type
							) && r
						.setQuality(e)
				}, this
				.renameQualities =
				function(e, t) {
					return P(e, t)
				}, this.renameTracks =
				function(e) {
					return A(e)
				}, this.SetSpeed =
				function(e) {
					log("Speed", e),
						r && r.setSpeed(
							e), 1 == v
						.pip.on && l &&
						l.setSpeed(e)
				}, this.nativeSubtitle =
				function() {
					z()
				}, this
				.removeNativeSubtitle =
				function() {
					r.removeTracks()
				}, this.SetAudioTrack =
				function(e) {
					if (log("Audiotrack",
							e), o
						.audiotracks
						.length > 0) {
						if (o
							.audiotracks[
								e]) {
							var t = this
								.time();
							o.seekto >
								0 || (o
									.seekto =
									t),
								o
								.actions
								.Seek(t,
									!1),
								R(o.audiotracks[
										e
										],
									!0),
								o
								.actions
								.Play()
						}
					} else "hls" == o
						.file_type &&
						1 == v
						.hlsaudio ? r
						.setHlsAudioTrack(
							e) :
						"dash" == o
						.file_type &&
						1 == v
						.dashaudio && r
						.setDashAudioTrack(
							e)
				}, this.getQuality =
				function() {
					var e = o
						.files_quality[o
							.current_quality
							];
					return void 0 ==
						e && (e = ""), (
							I() && 1 ==
							v
							.hlsautoquality &&
							1 == v
							.hlsquality &&
							e != Lang(
								"auto"
								) ? "" +
							Lang(
							"auto") +
							" " : "") +
						e
				}, this.getAudioTrack =
				function() {
					var e = o
						.files_audiotrack[
							o
							.current_audiotrack
							];
					return void 0 ==
						e && (e = ""), e
				}, this.autoQuality =
				function() {
					return I()
				}, this.resize =
				function(e) {
					r && ("youtube" == o
							.file_type ||
							"vimeo" == o
							.file_type ||
							exist(v
								.ratio)
							) && r
						.resize(), v
						.screenmarginbottom >
						0 && css(o
							.mediacontainer, {
								height: o
									.fullscreen ?
									"100%" :
									o
									.normal_h -
									v
									.screenmarginbottom
							}), o
						.media2 && 1 ==
						v.pip.movable &&
						o.mediapip
						.resize(), 1 ==
						v
						.poster_float &&
						FloatPosterScale()
				}, this.size =
				function() {
					return r.size()
				}, this.iosfull =
				function() {
					r.iosfull()
				}, this.reload =
				function() {
					log("reload"), o
						.reloadTimer =
						0, o.start && (v
							.autoplay =
							1), o
						.actions
						.Waiting(), e &&
						1 != v
						.rldnornd && -
						1 == e.indexOf(
							"(random)"
							) && (e =
							e + (-1 == e
								.indexOf(
									"?"
									) ?
								"?" :
								"&") +
							"rand=(random)"
							), o
						.tagvideo ? r
						.src(e) : R(e)
				}, exist(o.poster) ||
				j(), exist(v.poster) &&
				("" != v.poster ? (
						Poster(v.poster,
							o.poster, v
							.poster_scale
							), 1 != v
						.posterhidepause ||
						o.start || hide(
							o.poster)) :
					v.poster = null),
				this.Remove =
			function() {
					W()
				}, this.RemoveAll =
				function() {
					t = [], W()
				}, this.File = function(
					e, t, n) {
					R(e, t, n)
				}, this.Poster =
				function(e) {
					Poster(e, o.poster,
						v
						.poster_scale
						)
				}, this.Play =
				function() {
					r ? (f = !1, p = !1,
							o.casting ?
							o.chromecast
							.Play() : (r
								.Play(),
								1 == v
								.posterhide &&
								o
								.actions
								.HidePoster()
								),
							exist(l) &&
							l.Play(), o
							.channels &&
							(o.tagvideo ?
								o
								.clicktime >
								0 && !o
								.channels
								.Created() &&
								o
								.channels
								.Update() :
								(o.files_channel = [],
									o
									.controls
									.SettingChanged(
										"channel"
										)
									)),
							o
							.tagvideo &&
							v
							.volumegain >
							-1 && !o
							.gained && !
							o.system
							.ios && o
							.clicktime >
							0 && r
							.Gain(), U()
							) :
						setTimeout(this
							.Play, 500)
				}, this.PipSwitch =
				function(e) {
					if (o.media2 && (
							1 != v.pip
							.movable ||
							!(o.moving[o
									.media2
									] >
								2))) {
						e && (e.stopPropagation(),
							window
							.event &&
							(window
								.event
								.cancelBubble = !
								0));
						var t = r;
						r.ChangePip(!0,
								o.media2
								), l
							.ChangePip(!
								1, o
								.mediacontainer
								), r =
							l, l = t, r
							.Play(), l
							.Play(), js(
								"pip")
					}
				}, this.reYT =
				function() {
					r.src(e)
				}, this.ToolbarHide =
				function() {
					1 == v.effects && o
						.effects.api(
							"hide"), o
						.toolbarhidden = !
						0
				}, this.ToolbarShow =
				function() {
					v.toolbar
						.resizeme && (v
							.toolbar
							.resizeme = !
							1, o
							.controls &&
							(o.controls
								.resizeFromText(
									1),
								o
								.controls
								.resizetext()
								)), o
						.toolbarhidden = !
						1
				}, this.PipToggle =
				function() {
					o.media2 && o
						.mediapip && o
						.mediapip
						.toggle()
				}, this.Airplay =
				function() {
					o.tagvideo && o
						.airplay && (o
							.airplayed = !
							0, r
							.airplay())
				}, this.PipWebkit =
				function() {
					o.tagvideo && o
						.pipwebkit && r
						.pipwebkit()
				}, this.BeforeVast =
				function() {
					1 == v
						.vast_poster &&
						exist(v
							.vast_posterurl
							) && (exist(
								o
								.vast_poster
								) || (o
								.vast_poster =
								createElement(
									"div"
									),
								css(o
									.vast_poster, {
										position: "absolute",
										left: 0,
										top: 0,
										width: "100%",
										height: "100%",
										"pointer-events": "none",
										zIndex: 1e4
									}),
								o.frame
								.appendChild(
									o
									.vast_poster
									)),
							show2(o
								.vast_poster
								),
							Poster(v
								.vast_posterurl,
								o
								.vast_poster,
								"fill")
							), r && (
							datetime(0),
							r
							.BeforeVast()
							)
				}, this.AfterVast =
				function() {
					o.vast_poster &&
						hide2(o
							.vast_poster
							), r && r
						.AfterVast()
				}, this.Pause =
				function() {
					o.casting ? o
						.chromecast
						.Pause() : r ? r
						.Pause() : log(
							"nomedia"),
						exist(o
						.media2) && l
						.Pause()
				}, this.Recover =
				function() {
					p = !0, o.actions
						.Seek(0, !1),
						exist(o
						.poster) && o
						.actions
						.ShowPoster(),
						R("x")
				}, this.Toggle =
				function() {
					r && r.Toggle()
				}, this.Seek = function(
					e) {
					r && (o.casting ? o
						.chromecast
						.Seek(e) : (
							r.Seek(
								e),
							1 == v
							.pip
							.on &&
							l && l
							.Seek(e)
							))
				}, this.Mute =
				function() {
					r && (r.Mute(), o
							.casting &&
							o.chromecast
							.Mute(),
							log("mute")
							), 1 == v
						.pip.on && 1 ==
						v.pip.nomute &&
						l && l.Mute()
				}, this.Unmute =
				function() {
					r && (r.Unmute(), o
							.casting &&
							o.chromecast
							.Unmute(),
							log(
								"unmute")
							), 1 == v
						.pip.on && 1 ==
						v.pip.nomute &&
						l && l.Unmute()
				}, this.Volume =
				function(e) {
					r && r.Volume(e),
						1 == v.pip.on &&
						1 == v.pip
						.nomute && l &&
						l.Volume(e), o
						.casting && o
						.chromecast
						.Volume(e)
				}, this.isPlaying =
				function() {
					return !!r && r
						.isPlaying()
				}, this.isLive =
				function() {
					return !!r && r
						.isLive()
				}, this.status =
				function() {
					return u
				}, this.ended =
				function() {
					return f
				}, this.time =
				function() {
					var e = 0;
					if (!r) return 0;
					if (e = T(), o
						.casting) {
						var t = o
							.chromecast
							.Time();
						t && (e = t)
					} else E() > 0 &&
						e != E() && (o
							.current_time =
							e + 1e-4);
					return e
				}, this.duration =
				function() {
					var e = 0;
					if (r && (0 == (e =
								E()) &&
							exist(v
								.duration
								) && (
								e = 1 *
								v
								.duration
								), o
							.casting)) {
						var t = o
							.chromecast
							.Duration();
						t && (e = t)
					}
					return e
				}, this.loaded =
				function() {
					return r ? r
					.loaded() : 0
				}, this.flip =
				function() {
					o.mediascale
						.flip = !o
						.mediascale
						.flip, css(o
							.mediacontainer, {
								transform: o
									.mediascale
									.flip ?
									"scaleX(-1)" :
									"scaleX(1)"
							})
				}, this.createposter =
				function() {
					j()
				}, this.Preload =
				function() {
					o.tagvideo && r
						.preload()
				}, this.menufltr =
				function(e, t) {
					if ("scale" == e)
						1 == t && X(v
							.settings
							.scale / 100
							), 2 == t &&
						X(-v.settings
							.scale / 100
							), 3 == t &&
						o.media
						.normalscale();
					else if (o
						.tagvideo) {
						o.fltrs[e] || (
								"sepia" ==
								e ? o
								.fltrs[
									e] =
								0 : o
								.fltrs[
									e] =
								1), 1 ==
							t && (o
								.fltrs[
									e] +=
								v
								.settings[
									e] /
								100),
							2 == t && (o
								.fltrs[
									e] -=
								v
								.settings[
									e] /
								100),
							3 == t && (
								"sepia" ==
								e ? o
								.fltrs[
									e] =
								0 : o
								.fltrs[
									e] =
								1), o
							.cftlr || (o
								.cftlr = []
								), o
							.cftlr[e] =
							e + "(" +
							parseInt(
								100 * o
								.fltrs[
									e]
								) +
							"%) ";
						var n = "";
						for (var s in o
								.cftlr)
							n += o
							.cftlr[s];
						css(r.tag(), {
								filter: n
							}), o
							.controls
							.MenuProc(e)
					}
				}, this.scale =
				function(e) {
					X(e)
				}, this.normalscale =
				function() {
					o.tagvideo && r
						.ObjectFit(), o
						.mediascale.x =
						o.mediascale.x0,
						o.mediascale.y =
						o.mediascale.y0,
						css(o
							.mediacontainer, {
								transform: "scaleX(" +
									o
									.mediascale
									.x +
									") scaleY(" +
									o
									.mediascale
									.y +
									")"
							}), o
						.controls
						.MenuProc(
							"scale"), o
						.custom_aspect =
						null, Q()
				}, this.hlsDashSub =
				function(e, t) {
					r.hlsDashSub(e, t)
				}, this.currentFile =
				function() {
					return G()
				}, this.tag =
			function() {
					return !!r && r
					.tag()
				}, this.captions =
				function() {
					o.tagvideo && r
						.captions()
				}, this.onDash =
				function() {
					r.onDash()
				}
		},
		MediaVideo = function(url,
			container, pip) {
			var hls_config, hls, dash,
				ws, error, error_time,
				sleep_timeout,
				_hlssubtracks,
				_seekaftervast, urlmse,
				playtry, pjstg =
				createElement(1 == v
					.hidevideo ?
					"audio" : "video"),
				pipto = 0,
				is_hls = !1,
				is_hls2 = !1,
				hls_started = !1,
				hls_created = !1,
				hls_force = -1,
				dash_created = !1,
				ws_created = !1,
				is_dash = !1;
			o.live = !1;
			var is_sleep = 0,
				is_ws = !1,
				unmuteplease = !1,
				pip_quality = -1,
				pause_before_vast = -1,
				mimeCodec =
				'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
				nops = !1;
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
				}), ObjectFit(), o
				.system.iphone && 1 == v
				.autoplay && 1 == v
				.autoplaymute ? !o
				.start && v.preroll ?
				attr(pjstg, {
					playsinline: 1
				}) : attr(pjstg, {
					muted: 1,
					playsinline: 1,
					autoplay: 1
				}) : (1 == v
					.playsinlineonmobile &&
					o.system.mobile &&
					attr(pjstg, {
						playsinline: 1
					}), o.system.tv ||
					attr(pjstg, {
						preload: 1 ==
							v
							.preload &&
							0 == v
							.autoplay ?
							"metadata" :
							"none"
					})), 1 == v
				.tagcors && attr(
				pjstg, {
					crossorigin: "anonymous",
					crossOrigin: "anonymous"
				}), attr(pjstg, {
					src: url,
					"x-webkit-airplay": "allow",
					disableRemotePlayback: "true"
				}), 1 != v.drunchr &&
				attr(pjstg, {
					disableRemotePlayback: "true"
				}), 1 == v.ynxnopip &&
				attr(pjstg, {
					pip: "false"
				}), pip && (pjstg
					.autoplay = !0, (
						1 != v.pip
						.nomute || 1 ==
						v.autoplay) && (
						pjstg.muted = !0
						)), 1 == v
				.nativenodownload &&
				attr(pjstg, {
					controlsList: "nodownload"
				}), tagSrc(), 1 == v
				.taginframe) {
				var tagframe =
					createElement(
						"iframe");
				attr(tagframe, {
						scrolling: "no",
						allowfullscreen: "true",
						allowtransparency: "true",
						src: ""
					}), css(tagframe, {
						position: "absolute",
						width: "100%",
						height: "100%",
						border: 0
					}), container
					.appendChild(
						tagframe);
				var framei = window
					.setInterval(
						function() {
							"complete" ===
							tagframe
								.contentWindow
								.document
								.readyState &&
								(window
									.clearInterval(
										framei
										),
									css(tagframe
										.contentDocument
										.body, {
											padding: 0,
											margin: 0
										}
										),
									tagframe
									.contentDocument
									.body
									.appendChild(
										pjstg
										)
									)
						}, 100)
			} else container
				.appendChild(pjstg);
			if (exist(url) || (url =
				""), url.indexOf(
				".mpd") > 0) is_dash = !
				0, o.dash ||
				"undefined" ==
				typeof PluginDash || (o
					.dash =
					new PluginDash),
				exist(o.dash) && (exist(
						window.dashjs) ?
					CheckDash() : o.dash
					.script());
			else if ((1 == options
					.hls && 1 != v
					.HDVBPlayercom ||
					url.indexOf(
					".m3u8") > 0) && (-
					1 != o.compilation
					.indexOf("HLS") ||
					exist(window.Hls)
					)) {
				is_hls = !0, is_hls2 = !
					0;
				try {
					exist(Hls) ? !Hls
						.isSupported() ||
						o.system
						.safari && 1 ==
						v
						.nativehlsinsafari &&
						!o.system.ios ||
						o.system
						.safari && o
						.system.ios &&
						1 == v
						.nativehlsios ||
						o.system.edge &&
						1 == v
						.nativehlsinedge ?
						(log("HLS support ",
								Hls
								.isSupported()
								),
							is_hls = !1
							) : (1 == v
							.preload ||
							1 == v
							.autoplay ||
							1 == v
							.preloadhls ||
							pip) &&
						CreateHLS(!1) :
						is_hls = !1
				} catch (error) {
					is_hls = !1
				}
			} else 0 == url.indexOf(
					"ws") && 1 == v
				.flussonic && (is_ws = !
					0, CreateWS());

			function CheckDash() {
				is_dash = !0,
					MseIsSupported() ? (
						1 == v
						.preload || 1 ==
						v.autoplay ||
						1 == v
						.preloaddash) &&
					CreateDASH(!1) : (
						is_dash = !1,
						log(
							"DASH not supported")
						)
			}

			function CreateDASH(e) {
				o.dash && !
					dash_created && (o
						.dash.create(e,
							pjstg, url,
							pip), exist(
							window
							.dashjs) &&
						(dash_created = !
							0))
			}

			function CreateHLS(e) {
				log("HLS"), o.files
					.length > 1 ? (v
						.hlsquality = 0,
						v
						.hlsquality_off = !
						0) : v
					.hlsquality_off && (
						v.hlsquality = 1
						), o.audiotracks
					.length > 1 ? (v
						.hlsaudio = 0, v
						.hlsaudio_off = !
						0) : v
					.hlsaudio_off && (v
						.hlsaudio = 1),
					o.hls_subs = !1,
					hls_force = -1;
				var t = !1;

				function n() {
					return void 0 !== o
						.plid && o
						.playlist_dic[o
							.plid]
						.pjs_id ? o
						.playlist_dic[o
							.plid]
						.pjs_id : v.cuid
				}
				if (v.preroll && 1 == v
					.hlsvastwait && (
						t = !0, v
						.hlsvastwait = 0
						), !o.system
					.tv && !o.system
					.safari && v.p2p &&
					"undefined" !=
					typeof p2pml) {
					let s = {
						loader: {
							trackerAnnounce: [
								"wss://awt.vb17123filippaaniketos.pw:8433"
							],
							cachedSegmentExpiration: 864e5,
							cachedSegmentsCount: 1e3,
							requiredSegmentsPriority: 3,
							httpDownloadMaxPriority: 9,
							httpDownloadProbability: .06,
							httpDownloadProbabilityInterval: 1e3,
							httpDownloadProbabilitySkipIfNoPeers:
								!0,
							p2pDownloadMaxPriority: 50,
							httpFailedSegmentTimeout: 1e3,
							simultaneousP2PDownloads: 20,
							simultaneousHttpDownloads: 3,
							httpDownloadInitialTimeout: 0,
							httpDownloadInitialTimeoutPerSegment: 17e3,
							httpUseRanges:
								!0
						},
						segments: {
							swarmId: n()
						}
					};
					var a = p2pml.core
						.HybridLoader
						.isSupported(),
						r = a ?
						new p2pml.hlsjs
						.Engine(s) :
						void 0;
					v.p2p && a && (v
						.hlsconfig = {
							...v
							.hlsconfig,
							liveSyncDurationCount: 20,
							loader: a ?
								r
								.createLoaderClass() :
								Hls
								.DefaultConfig
								.loader
						})
				}
				if (hls_config = {
						debug: 1 == v
							.hlsdebug &&
							!pip,
						autoStartLoad: (
							1 == v
							.preload ||
							1 == v
							.autoplay ||
							pip || e
							) && !t,
						maxBufferLength: 60,
						maxMaxBufferLength: 60,
						manifestLoadingTimeOut: v
							.hlsmto >
							0 ? 1e3 * v
							.hlsmto :
							4e4,
						fragLoadingTimeOut: v
							.hlsfto >
							0 ? 1e3 * v
							.hlsfto :
							4e4,
						enableWorker: !1
					}, 1 == v
					.hlscltps && (
						hls_config
						.capLevelToPlayerSize = !
						0), 1 == v
					.hlscookies && (
						hls_config
						.xhrSetup =
						function(e, t) {
							e.withCredentials = !
								0
						}), exist(v
						.hlsconfig) && (
						exist(v
							.hlsconfig
							.maxBufferLength
							) && (v
							.hlsconfig
							.maxBufferLength >
							600 && (v
								.hlsconfig
								.maxBufferLength =
								600), v
							.hlsconfig
							.maxMaxBufferLength =
							v.hlsconfig
							.maxBufferLength
							), exist(v
							.hlsconfig
							.customBuffer
							) && (v
							.hlsconfig
							.maxMaxBufferLength =
							v.hlsconfig
							.maxBufferLength =
							v.hlsconfig
							.customBuffer
							),
						"object" ==
						typeof v
						.hlsconfig))
					for (var l in v
							.hlsconfig)
						hls_config[l] =
						v.hlsconfig[l];
				hls = o.system.tv ?
					new HlsTV(
						hls_config) :
					new Hls(hls_config),
					!o.system.tv && !o
					.system.safari && v
					.p2p &&
					"undefined" !=
					typeof p2pml && a &&
					p2pml.hlsjs
					.initHlsJsPlayer(
						hls), js("hls",
						hls, 1), hls
					.loadSource(url),
					hls.attachMedia(
						pjstg), hls.on(
						Hls.Events
						.MEDIA_ATTACHED,
						function() {
							log("HLS attached")
						}), hls.on(Hls
						.Events
						.MANIFEST_LOADED,
						function(e, t) {
							pip || o
								.actions
								.MediaReady()
						}), hls.on(Hls
						.Events
						.MANIFEST_PARSED,
						function(e, t) {
							!pip && 1 ==
								v
								.hlsquality &&
								HlsLevelsLength() >
								1 && (
									HlsQualityLevels(),
									HlsLevel(),
									o
									.controls &&
									o
									.controls
									.QualityChangedNoHand(
										o
										.current_quality
										)
									)
						});
				var d = !1;
				hls.on(Hls.Events
						.STREAM_STATE_TRANSITION,
						function(e, t) {
							"hlsStreamStateTransition" !=
							e || d ||
								"FRAG_LOADING" !=
								t
								.previousState ||
								(d = !0,
									gif(
										`//stat.${o.p.href}/?host=${o.p.host}&id=${o.p.kp}&type=3&service=p2p`)
									)
						}), hls.on(Hls
						.Events
						.LEVEL_SWITCH,
						function(e, t) {
							HlsLevel()
						}), hls.on(Hls
						.Events
						.LEVEL_SWITCHED,
						function(e, t) {
							HlsLevel()
						}), hls.on(Hls
						.Events
						.LEVEL_LOADED,
						function(e, t) {
							!pip && (t
									.details
									.live !=
									o
									.live &&
									(o.live =
										t
										.details
										.live,
										o
										.controls
										.refresh()
										),
									o
									.live =
									t
									.details
									.live,
									o
									.live &&
									(log(
											"Live"),
										o
										.dvr =
										url
										.indexOf(
											"?DVR"
											) >
										-
										1,
										pjstg
										.duration >
										0 &&
										pjstg
										.currentTime >
										0 &&
										pjstg
										.duration -
										pjstg
										.currentTime <
										10 &&
										(o.hls_stuck_time >
											0 ?
											o
											.hls_stuck_time ==
											pjstg
											.currentTime &&
											o
											.hls_stuck_duration ==
											pjstg
											.duration ?
											(o.stuck++,
												o
												.stuck >
												2 &&
												(o.stuck =
													0,
													o
													.hls_stuck_time = -
													1,
													hls
													.destroy(),
													CreateHLS(
														!
														0
														),
													onEnded()
													)
												) :
											o
											.hls_stuck_time = -
											1 :
											(o.hls_stuck_time =
												pjstg
												.currentTime,
												o
												.hls_stuck_duration =
												pjstg
												.duration
												)
											)
										)
									),
								1 == v
								.hlsquality &&
								(o.current_quality =
									hls
									.loadLevel,
									o
									.controls &&
									o
									.controls
									.QualityChangedNoHand(
										o
										.current_quality
										)
									),
								HlsUpdateAudio()
						}), hls.on(Hls
						.Events
						.FRAG_CHANGED,
						function(e, t) {
							exist(t
									.frag) &&
								!pip &&
								js("fragment",
									t
									.frag
									.relurl
									),
								hls_force >
								-1 && (
									hls
									.nextAutoLevel =
									hls_force,
									hls_force = -
									1),
								hls_started = !
								0,
								hlsTextTracks()
						}), hls.on(Hls
						.Events
						.FRAG_PARSING_METADATA,
						function(e, t) {
							js("fragdata",
								t, 1
								)
						}), hls.on(Hls
						.Events
						.AUDIO_TRACKS_UPDATED,
						function(e, t) {
							pip || 1 !=
								v
								.hlsaudio ||
								HlsAudioTracks()
						}), hls.on(Hls
						.Events
						.AUDIO_TRACK_SWITCHING,
						function(e, t) {
							pip || 1 !=
								v
								.hlsaudio ||
								HlsAudioTrack()
						}), 1 == v
					.hlssubtracks ?
					_hlssubtracks =
					new PluginHlsSubtitles(
						hls, pip) : hls
					.subtitleDisplay = !
					1, hls.on(Hls.Events
						.ERROR,
						function(e, t) {
							if (1 == v
								.log &&
								console
								.log(t),
								js(t.type +
									"Hls",
									t,
									0, !
									0),
								o
								.hlserror =
								t, t
								.fatal)
								switch (
									t
									.type
									) {
									case Hls
									.ErrorTypes
									.NETWORK_ERROR:
										log("HLS fatal network error"),
											1 ==
											v
											.livewakeup ?
											HlsSleep0() :
											(error =
												t
												.details +
												" (" +
												t
												.type +
												")",
												o
												.seekto >
												0 ||
												pip ||
												1 ==
												v
												.live ||
												is_ws ||
												(o.seekto =
													Time()
													),
												hls
												.destroy(),
												pip ||
												o
												.media
												.onError()
												);
										break;
									case Hls
									.ErrorTypes
									.MEDIA_ERROR:
										log("HLS fatal media error, recover"),
											hls
											.recoverMediaError();
										break;
									default:
										error
											=
											"HLS fatal error, destroy",
											hls
											.destroy(),
											pip ||
											o
											.media
											.onError()
								} else
									log("HLS ",
										t
										.type,
										t
										.details,
										t
										.response ?
										t
										.response
										.code :
										""
										),
									js("hls_error",
										t
										.response ?
										t
										.response
										.code :
										""
										),
									is_sleep >
									0 &&
									(is_sleep =
										2,
										HlsSleep()
										)
						}),
					hls_created = !0
			}

			function HlsLevel() {
				if (!pip && 1 == v
					.hlsquality &&
					HlsLevelsLength() >
					1 && (o
						.current_quality !=
						hls.loadLevel &&
						(o.current_quality =
							hls
							.loadLevel,
							o
							.controls &&
							o.controls
							.QualityChangedNoHand(
								o
								.current_quality
								), log(
								"HLS Level " +
								o
								.current_quality
								)),
						exist2(v
							.forbidden_quality
							) && o
						.current_quality >
						0)) {
					for (var e = v
							.forbidden_quality
							.split(","),
							t = 0; t < e
						.length; t++)
						if (o
							.files_quality[
								o
								.current_quality
								]
							.indexOf(e[
								t]) > -1
							) {
							log("regress quality"),
								hls
								.currentLevel =
								o
								.current_quality -
								1, o
								.current_quality--;
							break
						}
				}
			}

			function CreateWS() {
				exist(window
					.FlussonicMsePlayer
					) && (
					MseIsSupported() ?
					(exist(o.ws) ||
						(o.ws =
							new PluginWS
							), ws =
						new FlussonicMsePlayer(
							pjstg,
							url, {
								debug:
									!
									0
							}),
						ws_created = !
						0) : (
						is_ws = !1,
						log(
							"not supported")
						))
			}

			function hlsTextTracks() {
				Captions()
			}

			function Captions() {
				v.hlscaptions && (pjstg
					.textTracks
					.length > 0 ? (
						1 == v
						.captions ?
						pjstg
						.textTracks[
							pjstg
							.textTracks
							.length -
							1]
						.mode =
						"showing" :
						pjstg
						.textTracks[
							pjstg
							.textTracks
							.length -
							1]
						.mode =
						"hidden", o
						.captions ||
						(o.captions = !
							0, o
							.controls
							.refresh()
							)) : o
					.captions && (o
						.captions = !
						1, o
						.controls
						.refresh()))
			}

			function HlsSleep0() {
				log("sleep"), !pip && o
					.play && o.actions
					.Pause(), o.actions
					.ShowPoster(),
					is_sleep = 1,
					HlsSleep(o.play)
			}

			function HlsSleep(e) {
				is_sleep > 0 && (
					clearTimeout(
						sleep_timeout
						),
					sleep_timeout =
					setTimeout(
						HlsLiveWaiting,
						1e3 * v
						.livewakeuptime
						))
			}

			function HlsLiveWaiting() {
				is_sleep > 0 && (log(
						"watching"),
					is_hls ? (1 ==
						is_sleep &&
						hls
						.loadSource(
							url),
						2 ==
						is_sleep &&
						(hls.destroy(),
							CreateHLS(
								!0),
							pjstg
							.play())
						) : attr(
						pjstg, {
							src: url
						}))
			}

			function onLoadStart() {
				is_hls || is_dash ||
					pip || o.actions
					.MediaReady()
			}

			function onTagError() {
				if (!is_hls && !
					is_dash) {
					if (pjstg.error) {
						log(pjstg.error,
							pjstg
							.error
							.code,
							pjstg
							.error
							.message
							);
						var e = pjstg
							.error.code;
						"" == (error =
							pjstg.error
							.message) &&
						(1 == e && (
								error =
								"aborted"
								), 2 ==
							e && (
								error =
								"network"
								), 3 ==
							e && (
								error =
								"decode"
								), 4 ==
							e && (
								error =
								"not found"
								)), log(
							"Video Error: ",
							error)
					}
					is_hls2 && 1 == v
						.livewakeup && (
							error =
							void 0,
							HlsSleep0()
							), void 0 !=
						error &&
						onError()
				}
			}

			function onError() {
				pip || o.media.onError()
			}

			function onEnded() {
				pip || o.media.onEnded()
			}

			function onPlay() {
				if (!o.start && v
					.preroll) {
					log("wrong play"),
						pause(), o
						.actions.Play();
					return
				}
				if (is_hls && is_sleep >
					0);
				else if (!pip) {
					var e = o.actions
						.isVastBgLoad() &&
						1 != o
						.vastfrombg;
					if (e || -1 ==
						pause_before_vast
						) {
						var t = !1;
						is_hls && (
								exist(o
									.vast
									) ||
								exist(o
									.vastloader
									)
								) && (
								e || (
									log(
										"pause onplay"),
									pause(),
									t = !
									0)),
							t || o.media
							.onPlay()
					}
				}
			}

			function onPause() {
				!nops && (log(
					"onpause"), o
					.play && o
					.actplay && !
					pjstg.ended &&
					1 == v
					.unpause && !o
					.nativecontrols ?
					(log("unpause"),
						TagPlay()) :
					pip || o
					.nopause || !
					pjstg.paused ||
					o.media
					.onPause())
			}

			function onTimeupdate() {
				pip || o.media
					.onTimeupdate(),
					pause_before_vast >
					-1 && Time() >
					pause_before_vast &&
					(log("pause ontime",
							pause_before_vast
							), pause(),
						pause_before_vast = -
						1)
			}

			function onSeeking() {
				pip || o.media
					.onSeeking()
			}

			function onSeeked() {
				pip || o.media
				.onSeeked()
			}

			function onMeta() {
				pip ? PipSize() : (o
					.media.onMeta(),
					PlayerSize(),
					is_hls &&
					is_sleep > 0 &&
					(is_sleep = 0,
						log(
							"wake up"),
						hls
						.startLoad(),
						TagPlay(), o
						.controls
						.Play()),
					exist(v
					.ratio) &&
					Resize())
			}

			function PipSize() {
				pjstg.videoHeight > 0 ?
					css(container, {
						height: container
							.offsetWidth /
							(pjstg
								.videoWidth /
								pjstg
								.videoHeight
								) -
							parseInt(
								v
								.pip
								.border
								)
					}) : pipto < 20 && (
						setTimeout(
							PipSize, 100
							), pipto++)
			}

			function PlayerSize() {
				1 == v.changeheight && (
					clearInterval(o
						.heightInterval
						), o
					.heightInterval =
					setInterval(
						WaitSize,
						100),
					WaitSize())
			}

			function WaitSize() {
				pjstg && pjstg
					.videoHeight > 0 &&
					(o.actions
						.changeAspect(
							pjstg
							.videoWidth /
							pjstg
							.videoHeight
							),
						clearInterval(o
							.heightInterval
							))
			}

			function onDuration() {
				pip || is_ws || o.media
					.onDuration()
			}

			function onVolume() {
				pip || o.media
				.onVolume()
			}

			function onWaiting() {
				is_hls && is_sleep >
					0 || pip || o.media
					.onWaiting()
			}

			function onLoadedData() {
				o.actions.LoadedData()
			}

			function MseIsSupported() {
				var e = window
					.MediaSource =
					window
					.MediaSource ||
					window
					.WebKitMediaSource,
					t = window
					.SourceBuffer =
					window
					.SourceBuffer ||
					window
					.WebKitSourceBuffer,
					o = e &&
					"function" ==
					typeof e
					.isTypeSupported &&
					e.isTypeSupported(
						mimeCodec),
					n = !t || t
					.prototype &&
					"function" ==
					typeof t.prototype
					.appendBuffer &&
					"function" ==
					typeof t.prototype
					.remove;
				return o && n
			}!o.system.tv || 1 != v
				.autoplay || is_hls ||
				is_dash || is_ws ||
				setTimeout(function() {
					o.actions
						.MediaReady()
				}, 100), 1 == v
				.channels && (exist(o
						.channels) && o
					.channels.Close(), o
					.channels =
					new PlugMediaChannels
					), this.onDash =
				function() {
					CheckDash()
				}, this.captions =
				function() {
					Captions()
				}, pjstg
				.addEventListener(
					"loadstart",
					onLoadStart), pjstg
				.addEventListener(
					"error", onTagError
					), pjstg
				.addEventListener(
					"ended", onEnded),
				pjstg.addEventListener(
					"play", onPlay),
				pjstg.addEventListener(
					"pause", onPause),
				pjstg.addEventListener(
					"timeupdate",
					onTimeupdate), pjstg
				.addEventListener(
					"seeking", onSeeking
					), pjstg
				.addEventListener(
					"seeked", onSeeked),
				pjstg.addEventListener(
					"loadedmetadata",
					onMeta), pjstg
				.addEventListener(
					"volumechange",
					onVolume), pjstg
				.addEventListener(
					"waiting", onWaiting
					), pjstg
				.addEventListener(
					"durationchange",
					onDuration), pjstg
				.addEventListener(
					"loadeddata",
					onLoadedData), pjstg
				.addEventListener(
					"enterpictureinpicture",
					onPipEnter), pjstg
				.addEventListener(
					"leavepictureinpicture",
					onPipLeave), this
				.ratio = function() {
					return pjstg
						.videoWidth /
						pjstg
						.videoHeight
				};
			var span05 =
				"<span style='opacity:0.5'>";

			function HlsQualityLevels() {
				if (!0 === new System()
					.tv && (v
						.hlsautomax = 1,
						v
						.hlsautoquality =
						0), !pip && 1 ==
					v.hlsquality) {
					var e = hls.levels,
						t = -1;
					if (o
						.files_quality = [],
						e.length > 1) {
						for (var n =
							0; n < e
							.length; n++
							) {
							if (exist(e[
										n]
									.height
									)) {
								var s =
									o
									.media
									.renameQualities(
										e[
											n],
										v
										.nameofhlsquality
										);
								if (o
									.files_quality
									.indexOf(
										s
										) >
									-
									1 ||
									1 ==
									v
									.hlsaddbitrate
									) {
									if (exist(
											e[
												n]
											.bitrate
											)) {
										var a =
											o
											.files_quality
											.indexOf(
												s
												);
										a > -
											1 &&
											(o.files_quality[
													a
													] +=
												" " +
												span05 +
												" &nbsp;" +
												parseInt(
													e[
														a]
													.bitrate /
													1e3
													) +
												" " +
												Lang(
													"kbps"
													) +
												"</span>"
												),
											o
											.files_quality[
												n
												] =
											s +
											" " +
											span05 +
											" &nbsp;" +
											parseInt(
												e[
													n]
												.bitrate /
												1e3
												) +
											" " +
											Lang(
												"kbps"
												) +
											"</span>"
									}
								} else o
									.files_quality[
										n
										] =
									s;
								exist(e[n]
										.audioGroupIds
										) &&
									(o.files_quality_ag[
											n
											] =
										e[
											n]
										.audioGroupIds[
											0
											]
										)
							} else
								exist(e[
										n]
									.name
									) ?
								o
								.files_quality[
									n] =
								e[n]
								.name :
								o
								.files_quality[
									n] =
								n;
							exist(v
									.default_quality) &&
								-1 ==
								t && v
								.default_quality ==
								o
								.files_quality[
									n
									] &&
								(t = n),
								exist(o
									.default_quality
									) &&
								o
								.default_quality ==
								o
								.files_quality[
									n
									] &&
								(t = n)
						}
						1 == v
							.hlsautomax &&
							(t = hls
								.levels
								.length -
								1), 1 ==
							v
							.hlsautoquality ?
							o
							.files_quality[
								e.length
								] =
							Lang(
							"auto") : (
								hls
								.autoLevelEnabled =
								0, hls
								.autoLevelCapping =
								0), 1 ==
							v
							.hlslowquality ||
							t > -1 ? (
								hls
								.autoLevelCapping =
								0,
								"next" !=
								v
								.hlschangequality &&
								(o.start ||
									0 !=
									v
									.preload
									) ?
								"current" ==
								v
								.hlschangequality &&
								(hls.currentLevel =
									t) :
								hls
								.nextLevel =
								t, o
								.current_quality =
								t) :
							1 == v
							.hlsautoquality ?
							o
							.current_quality =
							hls.levels
							.length -
							1 : o
							.current_quality =
							hls
							.firstLevel,
							HlsUpdateAudio()
					}
					o.bitrate = existv(
							hls.levels[o
								.current_quality
								]
							.bitrate, 0
							), o
						.controls && o
						.controls
						.refresh()
				}
			}

			function HlsUpdateAudio() {
				o.files_quality_ag
					.length > 0 && 1 ==
					v.hlsaudio && (
						HlsAudioTracks(),
						HlsAudioTrack())
			}

			function HlsAudioTracks() {
				if (!pip && 1 == v
					.hlsaudio) {
					var e, t = hls
						.audioTracks;
					if (o
						.files_audiotrack = [],
						t.length > 1)
						for (var n =
							0; n < t
							.length; n++
							) {
							if (e = !1,
								exist(t[
										n]
									.groupId
									) &&
								o
								.files_quality_ag
								.length >
								0 && t[
									n]
								.groupId !=
								o
								.files_quality_ag[
									o
									.current_quality
									])
								for (var s =
										0; s <
									o
									.files_quality_ag
									.length; s++
									) o
									.files_quality_ag[
										s
										] ==
									t[n]
									.groupId &&
									(e = !
										0
										);
							!e && (o.files_audiotrack[
									n
									] =
								exist(
									t[
										n]
									.name
									) ?
								o
								.media
								.renameTracks(
									t[
										n]
									.name
									) :
								n,
								exist(
									v
									.default_audio
									) &&
								v
								.default_audio ==
								o
								.files_audiotrack[
									n
									] &&
								(o.current_audiotrack =
									n,
									hls
									.audioTrack =
									n
									)
								)
						}
				}
			}

			function HlsAudioTrack() {
				if (!pip) {
					var e = hls
						.audioTracks,
						t = hls
						.audioTrack;
					if (t > -1) {
						if (exist(e[t]
								.groupId
								) && o
							.files_quality_ag
							.length >
							0 && o
							.files_quality_ag[
								o
								.current_quality
								] != e[
								t]
							.groupId) {
							for (var n =
									0; n <
								e
								.length; n++
								)
								if (e[n]
									.name ==
									e[t]
									.name &&
									e[n]
									.groupId ==
									o
									.files_quality_ag[
										o
										.current_quality
										]
									) {
									hls.audioTrack =
										n,
										t =
										n;
									break
								}
						}
						o.current_audiotrack =
							t, log(
								"HLS AudioTrack",
								o
								.current_audiotrack
								), o
							.controls
							.AudioTrackChangedNoHand(
								o
								.current_audiotrack
								)
					}
				}
			}

			function Time() {
				return is_dash ?
					dash_created ? o
					.dash.time() : 0 :
					pjstg.currentTime
			}

			function Duration() {
				var e = pjstg.duration;
				return is_dash &&
					dash_created && (e =
						o.dash
						.duration()),
					exist(v.end) && (e =
						v.end), e == 1 /
					0 || isNaN(e) ? 0 :
					e
			}

			function TagPlay() {
				if ("none" != url) {
					var e = pjstg
				.play();
					void 0 !== e && e
						.then(
					function() {})
						.catch(function(
							e) {
							if (log("playError",
									e
									.message
									),
								-
								1 ==
								e
								.message
								.indexOf(
									"source"
									) &&
								-
								1 ==
								e
								.message
								.indexOf(
									"interrupted by"
									)
								) {
								if (1 ==
									v
									.autoplaymute
									) {
									log("automute"),
										o
										.actions
										.Mute(),
										pjstg
										.volume =
										0;
									var t =
										pjstg
										.play();
									t && t
										.then(
											function() {}
											)
										.catch(
											function(
												e
												) {
												log("playError2",
														e
														.message
														),
													o
													.system
													.tv &&
													(is_hls ||
														is_dash
														) ||
													(o.controls
														.Pause(),
														o
														.actions
														.ShowPoster(),
														js(
															"autoplay_denied")
														)
											}
											)
								} else
									o
									.controls
									.Pause(),
									o
									.actions
									.ShowPoster()
							}
						})
				}
			}

			function pause() {
				is_ws ? ws.pause() :
					pjstg.pause()
			}

			function isAuto() {
				var e = !1;
				return is_hls ?
					hls_created && (e =
						hls
						.autoLevelEnabled
						) : is_dash &&
					dash_created && (e =
						o.dash.auto()),
					e
			}

			function tagSrc() {
				if (o.system.safari) {
					var e = pjstg
						.textTracks;
					if (e)
						for (var t =
							0; t < e
							.length; t++
							) e[t]
							.mode =
							"disabled";
					if (e = pjstg
						.audioTracks)
						for (t = 0; t <
							e
							.length; t++
							) e[t]
							.enabled =
							0 == t ? 1 :
							0;
					window
						.WebKitPlaybackTargetAvailabilityEvent &&
						(pjstg
							.addEventListener(
								"webkitplaybacktargetavailabilitychanged",
								function(
									e) {
									o.airplay =
										"available" ==
										e
										.availability,
										pip ||
										o
										.actions
										.AirplayChanged()
								}),
							pjstg
							.addEventListener(
								"webkitcurrentplaybacktargetiswirelesschanged",
								function(
									e
									) {}
								))
				}
				CheckPip()
			}

			function CheckPip() {
				o.system.webkit && (
					exist(pjstg
						.webkitSupportsPresentationMode
						) && !o
					.system
					.iphone && (o
						.pipwebkit = !
						0), document
					.pictureInPictureEnabled &&
					!pjstg
					.disablePictureInPicture &&
					(o.pipwebkit = !
						0))
			}

			function PipWebkit() {
				o.system.safari ?
					"picture-in-picture" ===
					pjstg
					.webkitPresentationMode ?
					(pjstg
						.webkitSetPresentationMode(
							"inline"), o
						.ispipkit = !1
						) : (pjstg
						.webkitSetPresentationMode(
							"picture-in-picture"
							), o
						.ispipkit = !0
						) : document
					.pictureInPictureElement ?
					eval(
						"document.exitPictureInPicture().then(ok =>{o.ispipkit = false;}).catch(error => {});"
						) : eval(
						"pjstg.requestPictureInPicture().then(p => {o.ispipkit = true;}).catch(error => {o.ispipkit = false;});"
						)
			}

			function onPipEnter() {
				o.ispipkit = !0
			}

			function onPipLeave() {
				o.ispipkit = !1
			}

			function HlsLevelsLength() {
				var e = 0;
				return hls_created &&
					hls.levels && (e =
						hls.levels
						.length), e
			}

			function ObjectFit() {
				pjstg && (1 == v
					.covervideo ||
					1 == v.fill ?
					1 == v
					.fillvideo ||
					1 == v.fill ?
					css(pjstg, {
						"object-fit": "fill"
					}) : css(
					pjstg, {
						"object-fit": "cover"
					}) : css(
					pjstg, {
						"object-fit": "contain"
					}))
			}

			function Resize() {
				v.ratio && api("scale",
					String(v.ratio)
					.replace("/",
						":"))
			}

			function DashLevelsLength() {
				var e = 0;
				return dash_created && (
					e = o.dash
					.levels()), e
			}

			function iOSTrackLoaded(e) {
				if (e.target.label && o
					.sbt)
					for (var t = 0; t <
						o.files_subtitle
						.length; t++) o
						.files_subtitle[
							t] == e
						.target.label &&
						o.sbt
						.SetSubtitle(t)
			}
			this.Play = function() {
					var e = !0;
					is_hls && !
						hls_started && (
							hls_created ||
							CreateHLS(!
								0), hls
							.startLoad()
							),
						is_dash && !
						dash_created &&
						(CreateDASH(!0),
							e = !1),
						is_ws && (
							ws_created ||
							CreateWS(),
							ws.play(),
							e = !1),
						"-2000px" ==
						pjstg.style
						.top && this
						.AfterVast(),
						e && TagPlay()
				}, this.BeforeVast =
				function() {
					(o.vastloader || o
						.vast) && (o
						.ispipkit &&
						PipWebkit(), !o
						.airplayed && o
						.system
						.mobile && o
						.system
						.webkit && (
							pjstg
							.muted || (
								pjstg
								.muted = !
								0,
								unmuteplease = !
								0), css(
								pjstg, {
									position: "absolute",
									left:
										-
										2e3,
									top: -
										2e3
								}),
							pause_before_vast =
							Time(),
							is_ws ||
							pjstg
						.play(), 0 ==
							pause_before_vast &&
							o.seekto >
							0 && (
								_seekaftervast =
								o.seekto
								)))
				}, this.AfterVast =
				function() {
					!o.airplayed && (o
							.system
							.mobile || o
							.system
							.webkit) &&
						(css(pjstg, {
								position: "static",
								left: 0,
								top: 0
							}), exist(v
								.ratio
								) &&
							Resize(),
							unmuteplease &&
							(o.muted ||
								(pjstg
									.muted = !
									1),
								unmuteplease = !
								1),
							_seekaftervast >
							0 && (o
								.seekto =
								_seekaftervast,
								_seekaftervast =
								0),
							pause_before_vast = -
							1)
				}, this.Pause =
				function() {
					log("paused"),
						pause()
				}, this.Toggle =
				function() {
					pjstg.paused ?
						TagPlay() :
						Pause()
				}, this.Seek = function(
					e) {
					is_dash &&
						dash_created ? o
						.dash.seek(e) :
						(is_hls && 1 ==
							v
							.hlsforce &&
							e > 0 &&
							isAuto() &&
							(hls_force =
								hls
								.currentLevel,
								hls
								.nextAutoLevel =
								0),
							pjstg
							.currentTime =
							e)
				}, this.Mute =
				function() {
					pjstg.muted = !0
				}, this.Unmute =
				function() {
					pjstg.muted = !1,
						"hls" == o
						.file_type && o
						.system.ios &&
						1 == v.vast && !
						exist(o.um1) &&
						(nops = !0,
							pjstg
							.pause(),
							setTimeout(
								function() {
									pjstg
										.play(),
										nops = !
										1
								}, 10),
							o.um1 = !0)
				}, this.Volume =
				function(e) {
					pjstg.volume = e
				}, this.Gain =
				function() {
					if (o
						.gainedsource !=
						pjstg) {
						if (o.audiosrc[
								pjstg])
							t = o
							.audiosrc[
								pjstg],
							n = o
							.audioctx[
								pjstg];
						else if (window
							.AudioContext =
							window
							.AudioContext ||
							window
							.webkitAudioContext,
							exist(window
								.AudioContext
								)) try {
							t = (n =
									new AudioContext)
								.createMediaElementSource(
									pjstg
									),
								o
								.audiosrc[
									pjstg
									] =
								t, o
								.audioctx[
									pjstg
									] =
								n
						} catch (
						e) {
							log(e)
						}
						if (n) {
							var t, n,
								s = n
								.createGain();
							s.gain
								.value =
								v
								.volumegain,
								t
								.connect(
									s),
								s
								.connect(
									n
									.destination
									), o
								.gained = !
								0, o
								.gainedsource =
								pjstg
						}
					}
				}, this.isPlaying =
				function() {
					return !pjstg.paused
				}, this.isLive =
				function() {
					return 1 == v
						.live || !!
						is_ws || o.live
				}, this.tag =
			function() {
					return pjstg
				}, this.nativeControls =
				function() {
					return attr(pjstg, {
						controls: "1"
					}), !0
				}, this.preload =
				function() {
					attr(pjstg, {
							preload: "metadata"
						}), is_hls && !
						hls_created &&
						CreateHLS(!1),
						is_dash && !
						dash_created &&
						CreateDASH(!1)
				}, this.status =
				function() {
					var e = "playing";
					return pjstg
						.paused && (e =
							"paused"),
						pjstg.ended && (
							e = "ended"
							), e
				}, this.ChangePip =
				function(e, t) {
					pip = e, t
						.appendChild(
							pjstg),
						container = t,
						e ? (1 != v.pip
							.nomute ?
							pjstg
							.muted = !
							0 : o
							.muted || (
								pjstg
								.muted = !
								1),
							PipSize(), o
							.files_quality
							.length >
							0 &&
							is_hls && (
								pip_quality =
								o
								.current_quality,
								hls
								.autoLevelCapping =
								0, hls
								.currentLevel =
								0)) : (o
							.muted ||
							1 == v.pip
							.nomute || (
								pjstg
								.muted = !
								1),
							pjstg
							.volume = v
							.volume,
							PlayerSize(),
							o
							.files_quality
							.length >
							0 &&
							is_hls && (
								hls
								.autoLevelCapping = -
								1,
								pip_quality >
								-1 &&
								pip_quality <
								hls
								.levels
								.length &&
								(hls.nextLevel =
									pip_quality
									)))
				}, this.time =
				function() {
					return Time()
				}, this.duration =
				function() {
					return Duration()
				}, this.loaded =
				function() {
					var e = 0;
					if (pjstg
						.buffered &&
						pjstg.buffered
						.length > 0) {
						for (var t =
								Time(),
								o =
								0; o <
							pjstg
							.buffered
							.length; o++
							)(t >= pjstg
								.buffered
								.start(
									o) ||
								t >=
								pjstg
								.buffered
								.start(
									o) -
								100) &&
							t <= pjstg
							.buffered
							.end(o) && (
								e =
								pjstg
								.buffered
								.end(o)
								);
						0 == e && (e =
							pjstg
							.buffered
							.end(
								pjstg
								.buffered
								.length -
								1))
					}
					return exist(v
						.end) && e > v
						.end && (e = v
							.end), e
				}, this.auto =
				function() {
					return isAuto()
				}, this.size =
				function() {
					return {
						width: pjstg
							.videoWidth,
						height: pjstg
							.videoHeight
					}
				}, this.src = function(
					e) {
					url = e = e.replace(
							/\(random\)/g,
							Math
							.random()),
						2 != o
						.media_error &&
						(o.media_error = !
							1),
						is_dash ?
						dash_created &&
						o.dash.source(
						e) : is_hls ? (
							is_hls &&
							hls && hls
							.destroy(),
							CreateHLS(!
								0),
							CheckPip()
							) : (attr(
								pjstg, {
									src: e,
									autoplay: 0
								}),
							tagSrc(),
							pause())
				}, this.airplay =
				function() {
					pjstg
						.webkitShowPlaybackTargetPicker()
				}, this.pipwebkit =
				function() {
					PipWebkit()
				}, this.setDashQuality =
				function(e) {
					dash_created && o
						.dash
						.setQuality(e)
				}, this
				.setDashAudioTrack =
				function(e) {
					dash_created &&
						pjstg.buffered
						.length > 0 && o
						.dash.setAudio(
							e)
				}, this.setWsQuality =
				function(e) {
					o.ws && o.ws
						.setTracks(ws,
							e, -1)
				}, this
				.setWsAudioTrack =
				function(e) {
					o.ws && o.ws
						.setTracks(ws, -
							1, e)
				}, this.setHlsQuality =
				function(e) {
					if (hls_created) {
						var t =
							parseInt(e);
						e == hls.levels
							.length && (
								t = -1,
								hls
								.autoLevelCapping = -
								1),
							"current" ==
							v
							.hlschangequality &&
							(setTimeout(
									onWaiting,
									500
									),
								hls
								.currentLevel =
								t),
							"next" == v
							.hlschangequality &&
							(log("HLS next level " +
									t),
								hls
								.nextLevel =
								t), -
							1 == t && (o
								.current_quality =
								hls
								.loadLevel
								),
							HlsUpdateAudio()
					}
				}, this.getHLS =
				function() {
					return hls
				}, this.getDASH =
				function() {
					return !!
						dash_created &&
						o.dash.getDash()
				}, this
				.HlsLevelsLength =
				function() {
					return HlsLevelsLength()
				}, this
				.DashLevelsLength =
				function() {
					return DashLevelsLength()
				}, this.ObjectFit =
				function() {
					ObjectFit()
				}, this.resize =
				function() {
					Resize()
				}, this
				.setHlsAudioTrack =
				function(e) {
					hls_created && (hls
						.audioTrack =
						parseInt(e))
				}, this.hlsDashSub =
				function(e, t) {
					"hls" == t &&
						hls_created &&
						_hlssubtracks &&
						_hlssubtracks
						.HlsSubTrack(e),
						"dash" == t &&
						dash_created &&
						o.dash.subtrack(
							e)
				}, this.setSpeed =
				function(e) {
					e && (pjstg
						.playbackRate =
						e)
				}, this.removeTracks =
				function() {
					for (var e = pjstg
							.childNodes,
							t = [], o =
							0; o < e
						.length; o++)
						"track" == e[o]
						.tagName
						.toLowerCase() &&
						(e[o]
							.removeEventListener(
								"load",
								iOSTrackLoaded
								), t
							.push(e[o])
							);
					for (var o = 0; o <
						t.length; o++)
						pjstg
						.removeChild(t[
							o])
				}, this.addTrack =
				function(e, t, o) {
					if ("" != e) {
						e.indexOf(
								" or ") >
							0 && (e = e
								.split(
									" or "
									)[0]
								);
						var n = document
							.createElement(
								"track"
								);
						n.setAttribute(
								"src", e
								), n
							.setAttribute(
								"label",
								t), n
							.setAttribute(
								"kind",
								"subtitles"
								), n
							.setAttribute(
								"mode",
								"showing"
								), o &&
							n
							.setAttribute(
								"default",
								""),
							pjstg
							.appendChild(
								n), n
							.addEventListener(
								"load",
								iOSTrackLoaded
								)
					}
				}, this.errorMessage =
				function() {
					return error || ""
				}, this.Remove =
				function() {
					clearInterval(o
							.dashInterval
							), is_hls &&
						hls && hls
						.destroy(),
						is_dash &&
						dash_created &&
						o.dash.reset(),
						is_ws && ws &&
						ws.stop(), pjstg
						.removeEventListener(
							"error",
							onTagError),
						pjstg
						.removeEventListener(
							"ended",
							onEnded),
						pjstg
						.removeEventListener(
							"play",
							onPlay),
						pjstg
						.removeEventListener(
							"pause",
							onPause),
						pjstg
						.removeEventListener(
							"timeupdate",
							onTimeupdate
							), pjstg
						.removeEventListener(
							"seeking",
							onSeeking),
						pjstg
						.removeEventListener(
							"seeked",
							onSeeked),
						pjstg
						.removeEventListener(
							"loadedmetadata",
							onMeta),
						pjstg
						.removeEventListener(
							"volumechange",
							onVolume),
						pjstg
						.removeEventListener(
							"waiting",
							onWaiting),
						pjstg
						.removeEventListener(
							"durationchange",
							onDuration),
						pjstg
						.removeEventListener(
							"enterpictureinpicture",
							onPipEnter),
						pjstg
						.removeEventListener(
							"leavepictureinpicture",
							onPipLeave),
						pjstg.src = "",
						"IFRAME" ==
						container
						.tagName ?
						container
						.contentDocument
						.body
						.removeChild(
							pjstg) :
						container
						.removeChild(
							pjstg),
						pjstg = null
				}
		},
		Controls = function() {
			var wait_to, settings,
				playlist, _lastactbut,
				uijs, b = [],
				butNames = [],
				butPosition = [],
				waiting = !1,
				toolbarHidden = !1;
			for (var i in o.settings2 &&
					(o.settings2.hide(),
						o.settings2 =
						null), o
					.files_speed = [.25,
						.5, .75, 1,
						1.25, 1.5, 2
					], 1 == v.settings
					.customspeeds &&
					exist(v.settings
						.speeds) && (v
						.settings
						.speeds = v
						.settings.speeds
						.replace(/\n/ig,
							""), o
						.files_speed = v
						.settings.speeds
						.split(",")), o
					.speed1 = o
					.files_speed
					.indexOf("1") > -1 ?
					o.files_speed
					.indexOf("1") : o
					.files_speed
					.indexOf(1), 3 == o
					.current_speed && (o
						.current_speed =
						o.speed1), o
					.menuproc) o
				.menuproc
				.hasOwnProperty(i) && (
					exist(v.settings[
					i]) || (v.settings[
						i] = 5), o[
						"files_" + i
						] = ["+ " + v
						.settings[i] +
						"%",
						"&ndash; " + v
						.settings[i] +
						"%", 100 * o
						.menuproc[i] +
						"%"
					]);
			1 == v.toolbar
				.hidejustfull && o
				.system.ios && 1 == v
				.nativefullios && (v
					.toolbar.hide = 0);
			var resizeonwidth = !1,
				stretch_width = 0,
				stretch_width_last = 0,
				stretch_with_volume = !
				1,
				firstly = !0,
				bg = new ControlsBg,
				order = [],
				_rights = !1,
				_move_rights = !1,
				_max_order = 0,
				_rb = [];
			for (var y in
					"controls-right" ==
					v.control_line
					.position && (v
						.control_line
						.position =
						"controls"), v)
				v.hasOwnProperty(y) &&
				0 == y.indexOf(
					"control_") && v[
				y] && (exist(v[y]
						.order0) ? v[y]
					.order = v[y]
					.order0 : v[y]
					.order0 = v[y]
					.order, order[v[y]
						.order] = y,
					"controls" != v
					.control_line
					.position && (
						"controls-right" ==
						v[y].position ?
						(_rb.push([y, v[
									y]
								.order
							]),
							_rights = !0
							) : (
							"controls" ==
							v[y]
							.position ||
							void 0 == v[
								y]
							.position
							) &&
						_rights && (
							_move_rights = !
							0)),
					_max_order < v[y]
					.order && (
						_max_order = v[
							y].order));
			if (_move_rights) {
				_rb.sort(function(e,
				t) {
					return e[
						1] - t[
							1]
				});
				for (var i = 0; i < _rb
					.length; i++) order[
						v[_rb[i][0]]
						.order] = null,
					v[_rb[i][0]].order =
					_max_order + 1,
					_max_order++, order[
						v[_rb[i][0]]
						.order] = _rb[i]
					[0]
			}
			1 == v.toolbar.hide && 1 ==
				v.toolbar.hidedown && (o
					.toolbar =
					createElement(
					"div"), o.frame
					.appendChild(o
						.toolbar), css(o
						.toolbar, {
							position: "absolute",
							left: 0,
							top: 0,
							width: "100%",
							height: "100%",
							transition: "top 0.3s ease-out",
							"pointer-events": "none"
						}));
			var bg2 = createElement(
				"div");
			1 == v.toolbar.hide && 1 ==
				v.toolbar.hidedown ? o
				.toolbar.appendChild(
					bg2) : o.frame
				.appendChild(bg2), css(
					bg2, {
						position: "absolute",
						left: 0,
						bottom: 0,
						width: "100%",
						height: v
							.toolbar.h
					}), bg2.onclick =
				function() {
					o.system.mobile || o
						.actions
						.ControlsBgClick()
				}, o.hidecontrols && (
					hide2(bg.c()),
					hide2(bg2));
			for (var i = 1; i < order
				.length; i++)
				if (order[i]) {
					var y = order[i];
					if (y) {
						var action = v[
								y]
							.action;
						if (o.system
							.mobile && (
								"volume" ==
								action &&
								"speed" ==
								v[y]
								.customline ||
								("volume" ==
									action &&
									1 ==
									v
									.showvolmobile &&
									o
									.system
									.mobile ?
									v[y]
									.hideoutmute =
									0 :
									("volume" ==
										action ||
										"fullscreen" ==
										action &&
										v
										.nativemobile
										) &&
									(v[y]
										.on =
										0
										)
									)),
							o
							.hidecontrols &&
							(v[y].on =
								0), 1 ==
							v[y].on) {
							if ("line" ==
								action ||
								"volume" ==
								action ?
								(b[y] =
									new ControlLine(
										y,
										action
										),
									b[y]
									.Resize(
										b[
											y]
										.s(
											"w")
										)
									) :
								b[y] =
								new Control(
									y),
								butNames
								.push(
								y),
								"title" !=
								b[y].g(
									"action"
									) ||
								"" != b[
									y]
								.s(
									"text") ||
								"" != b[
									y]
								.s(
									"var") &&
								exist(v[b[
										y]
									.s(
										"var")
									]) ||
								b[y]
								.set(
									"display",
									!1),
								"custom" ==
								b[y].g(
									"action"
									)) {
								var lu =
									b[y]
									.s(
										"linkurl");
								lu &&
									0 ==
									lu
									.indexOf(
										"api:"
										) &&
									lu
									.indexOf(
										",0/1"
										) >
									0 &&
									0 ==
									api(lu
										.split(
											","
											)[
											0
											]
										.substr(
											4
											)
										) &&
									b[y]
									.CustomSwitch(
										0
										)
							}
							b[y].set(
								"scale",
								b[y]
								.s(
									"scale")
								)
						}
					}
				}
			function ControlX(e) {
				var t = 0;
				if (e) {
					if ("line" == e.g(
							"action"))
						t = butPosition
						.left + e.s(
							"marginleft"
							), null !=
						butPosition
						.rightbs || (
							butPosition
							.rightbs = []
							);
					else if (null !=
						butPosition
						.rightbs) {
						var n = e.g(
								"width"
								) + e.s(
								"marginright"
								) + e.s(
								"marginleft"
								);
						HideProof(e) &&
							(n = 0),
							1 != e.s(
								"hidden"
								) || e
							.g(
							"show") || (
								n = 0),
							e.s(
								"vertical") >
							0 && (n =
							0), t = bg
							.g("w") -
							1 * v
							.toolbar
							.leftandrightpadding -
							n + e.g(
								"width"
								) / 2 +
							e.s(
								"marginleft");
						var s = 0;
						for (butPosition
							.right -= n,
							s = 0; s <
							butPosition
							.rightbs
							.length; s++
							) {
							var a = b[
								butPosition
								.rightbs[
									s
									]
								];
							a.s("vertical") >
								0 ? css(
									a
									.c(), {
										left: a
											.g(
												"x0") -
											n
									}) :
								css(a
								.c(), {
									left: a
										.g(
											"x") -
										n
								}), a
								.set(
									"x0",
									a.g(
										"x")
									)
						}
						butPosition
							.rightbs
							.push(e.g(
								"key"
								)), e
							.set(
								"rightside",
								1)
					} else if (1 != e.s(
							"hidden") ||
						e.g("show")) {
						if (e.s(
								"vertical") >
							0) t =
							butPosition
							.left + e.s(
								"marginleft"
								) + e.s(
								"marginright"
								);
						else {
							var r = !1;
							"volume" !=
							e.g("action") ||
								1 != e
								.s(
									"hide") ||
								1 != e
								.s(
									"hideoutmute") ||
								(o.hidden_volume_over_process ||
									o
									.hidden_volume_over ?
									stretch_with_volume ||
									(stretch_width -=
										e
										.g(
											"width") +
										e
										.s(
											"marginleft") +
										e
										.s(
											"marginright"),
										stretch_with_volume = !
										0
										) :
									(r = !
										0,
										stretch_with_volume = !
										1
										)
									),
								HideProof(
									e
									) &&
								(r = !
								0), r ?
								t =
								butPosition
								.left :
								(butPosition
									.left +=
									e.g(
										"width") /
									2 +
									e.s(
										"marginleft"),
									t =
									butPosition
									.left,
									butPosition
									.left +=
									e.g(
										"width") /
									2 +
									e.s(
										"marginright")
									)
						}
					} else "volume" == e
						.g("action") &&
						1 == e.s(
						"hide") && 1 ==
						e.s(
							"hideoutmute") &&
						stretch_with_volume &&
						(stretch_width +=
							e.g(
							"width") + e
							.s(
								"marginleft") +
							e.s(
								"marginright"),
							stretch_with_volume = !
							1)
				}
				return t
			}

			function CreateShare() {
				o.shareme &&
					"function" ==
					typeof PluginShare &&
					(o.share =
						new PluginShare)
			}

			function ControlCoordinate(
				e) {
				var t = o.fullscreen &&
					0 == v.toolbar
					.stretchonfullscreen ?
					o.normal_w : o
					.screen_w,
					n = o.screen_h,
					s = 0;
				e != bg && (s = t / 2 +
					e.s(
						"marginleft") -
					e.s(
						"marginright")
					);
				var a = n / 2,
					r = e.g("width"),
					l = e.g("height"),
					d = e.s("position");
				if (d.indexOf(
					"center") > -1 && (
						s = o.screen_w /
						2 + e.s(
							"marginleft"
							) - e.s(
							"marginright"
							)), 0 == d
					.indexOf("top") && (
						a = l / 2 + e.s(
							"marginproctop"
							) * o
						.screen_h / 100
						), 0 == d
					.indexOf(
					"bottom") && (a = o
						.screen_h - (
							e == bg ?
							l : l / 2) -
						e.s(
							"marginprocbottom") *
						o.screen_h / 100
						), d.indexOf(
						"right") > -1 &&
					(s = o.screen_w -
						r / 2 + e.s(
							"marginleft"
							) - e.s(
							"marginright"
							) - e.s(
							"marginprocright"
							) * o
						.screen_w / 100
						), d.indexOf(
						"left") > -1 &&
					(s = r / 2 + e.s(
							"marginleft"
							) - e.s(
							"marginright"
							) + e.s(
							"marginprocleft"
							) * o
						.screen_w / 100
						), "timeline" ==
					d && (s = -o
						.timeline_w /
						2 + e.s(
							"marginprocleft"
							) * o
						.timeline_w /
						100 + e.s(
							"marginleft"
							) - e.s(
							"marginright"
							), a = -o
						.timeline_h /
						2 - e.s(
							"marginprocbottom"
							) * o
						.timeline_h /
						100 + e.s(
							"marginproctop"
							) * o
						.timeline_h /
						100), d.indexOf(
						"controls") > -1
					) {
					var c = ControlX(e);
					s = (bg && bg.c() ?
							int(bg.c()
								.offsetLeft
								) : 0) +
						c,
						"controls-right" ==
						d && (s +=
							stretch_width
							), a =
						"top" == v
						.toolbar
						.position ? v
						.toolbar.h / 2 -
						(v.toolbar_margintop <
							0 ? v
							.toolbar_margintop :
							0) : n - v
						.toolbar.h / 2
				}
				return {
					x: s,
					y: a + e.s(
							"margintop"
							) - e.s(
							"marginbottom"
							)
				}
			}

			function Resize(e) {
				var t, n, s = o
					.fullscreen && 0 ==
					v.toolbar
					.stretchonfullscreen ?
					o.normal_w : o
					.screen_w;
				o.screen_h, css(bg
				.c(), {
						top: ("top" ==
								v
								.toolbar
								.position ?
								0 :
								o
								.screen_h -
								v
								.toolbar
								.h
								) -
							v
							.toolbar_margintop
					}), bg.set("y0", o
						.screen_h - v
						.toolbar.h - v
						.toolbar_margintop
						), 0 == v
					.toolbar
					.stretchonfullscreen &&
					bg && (css(bg.c(), {
							width: s,
							left: 0,
							"margin-left": 0
						}), bg.set("w",
							s), o
						.fullscreen &&
						css(bg.c(), {
							left: "50%",
							"margin-left":
								-s /
								2
						})),
					butPosition = {
						left: 1 * v
							.toolbar
							.leftandrightpadding,
						right: bg.g(
							"w") - 1 * v
							.toolbar
							.leftandrightpadding
					};
				var a = !1;
				bg.g("show") || (bg.set(
					"display", !
					0), a = !0);
				for (var r = 0; r <
					butNames.length; r++
					)
					if (b[t = butNames[
							r]]) {
						var l =
							ControlCoordinate(
								b[t]);
						l && ("position" ==
							b[t].s(
								"animation"
								) &&
							exist(o
								.motions[
									t
									]
								) &&
							o
							.motions[
								t]
							.XY(b[t]
								.g(
									"x0"),
								l.x,
								b[t]
								.g(
									"y0"),
								l.y
								),
							b[t]
							.set(
								"x0",
								l.x
								),
							b[t]
							.set(
								"y0",
								l.y
								),
							1 != b[
								t]
							.s(
								"hidden") ||
							b[t].g(
								"show"
								) ||
							e ? css(
								b[t]
								.c(), {
									position: "absolute",
									left: b[
											t]
										.g(
											"x0"),
									top: b[
											t]
										.g(
											"y0")
								}) :
							HidePositionControl(
								b[t]
								))
					} for (t in a && bg
					.set("display", !1),
					stretch_width = 0, b
					) b.hasOwnProperty(
					t) && (
					"controls-right" ==
					b[t].s(
						"position"
						) &&
					"line" != b[t]
					.g("action") &&
					stretch_width >
					-1 && (
						stretch_width =
						butPosition
						.right -
						butPosition
						.left),
					"line" == b[t]
					.g("action") &&
					bg && (1 == b[t]
						.s(
							"customwidth") ?
						n = b[t].s(
							"w") :
						b[t].s(
							"position"
							)
						.indexOf(
							"controls"
							) > -1 ?
						(n = butPosition
							.right -
							butPosition
							.left -
							b[t].s(
								"marginleft"
								) -
							b[t].s(
								"marginright"
								),
							css(b[t]
								.c(), {
									left: int(
											bg
											.c()
											.offsetLeft
											) +
										butPosition
										.left +
										b[
											t]
										.s(
											"marginleft") +
										n /
										2
								}),
							stretch_width = -
							1) : (
							n = bg
							.g(
							"w") -
							b[t].s(
								"marginleft"
								) -
							b[t].s(
								"marginright"
								),
							css(b[t]
								.c(), {
									left: int(
											bg
											.c()
											.offsetLeft
											) +
										b[
											t]
										.s(
											"marginleft") +
										n /
										2
								})),
						b[t].set(
							"x0", b[
								t]
							.g("x")
							), b[t]
						.Resize(n)));
				settings &&
					ResizeSettings(
						settings),
					playlist &&
					ResizeSettings(
						playlist), (
						resizeonwidth ||
						o.fullscreen ||
						stretch_width_last !=
						stretch_width
						) &&
					ShowOrHide()
			}

			function HidePositionControl(
				e) {
				var t = 0,
					n = 0;
				e.s("position").indexOf(
						"right") > -1 &&
					-1 == e.s(
						"position")
					.indexOf(
					"controls") && (t =
						o.screen_w + e
						.g("width") + 10
						), e.s(
						"position")
					.indexOf("left") > -
					1 && (t = -e.g(
							"width") -
						10), e.s(
						"position")
					.indexOf("top") > -
					1 && (n = -(2 * e.g(
						"height"
						))), (e.s(
							"position")
						.indexOf(
							"bottom") >
						-1 || e.s(
							"position")
						.indexOf(
							"controls"
							) > -1) && (
						n = o.screen_h +
						e.g("height") +
						e.g("width") +
						10), t > 0 &&
					css(e.c(), {
						left: t
					}), n > 0 && css(e
						.c(), {
							top: n
						})
			}

			function ResizeSettings(e) {
				var t = -2e3;
				e.resizePlaylist();
				var n = o.screen_h - v
					.toolbar.h * (e.s(
							"position")
						.indexOf(
						"top") > -1 ?
						1 : 2);
				e == playlist && 1 == v
					.change2playlist &&
					(n = o.screen_h);
				var s = n - (o
						.fullscreen && !
						o.system
						.mobile ? 100 +
						1 * e.s(
						"hmaxk") : e.s(
							"hmaxk")) -
					(e == playlist &&
						1 * e.s(
						"hmaxk") == 0 ?
						e.s(
						"margintop") : 0
						);
				if (s < 100 && (s =
					100), css(e.c(), {
						"max-height": s
					}), e.co() && css(e
						.co(), {
							"max-height": s
						}), e.g(
					"show") && (t = o
						.screen_h / 2 -
						e.g("height") /
						2 + e.s(
							"margintop"
							) - e.s(
							"marginbottom"
							), e.s(
							"position")
						.indexOf(
						"top") > -1 && (
							t = e.s(
								"margintop"
								) - e.s(
								"marginbottom"
								)), e.s(
							"position")
						.indexOf(
							"bottom") >
						-1 && (t = o
							.screen_h -
							("top" != v
								.toolbar
								.position ?
								v
								.toolbar
								.h : 0
								) - e.g(
								"height"
								) + e.s(
								"margintop"
								) - e.s(
								"marginbottom"
								)), t <
						0 && (t = 0)),
					"settings" == e.g(
						"key") && o.sttx
					) {
					var a = o.screen_w -
						e.g("width") - e
						.s(
							"marginright");
					o.sttx > a ? css(e
						.c(), {
							position: "absolute",
							right: e
								.s(
									"marginright"),
							left: "auto",
							top: t
						}) : css(e
						.c(), {
							position: "absolute",
							left: o
								.sttx,
							right: "auto",
							top: t
						})
				} else if (e.s(
						"position")
					.indexOf("right") >
					-1) css(e.c(), {
					position: "absolute",
					right: e.s(
							"marginright"
							) -
						e.s(
							"scrollwidth"),
					left: "auto",
					top: t
				});
				else if (e.s("position")
					.indexOf("left") > -
					1) css(e.c(), {
					position: "absolute",
					left: e.s(
						"marginleft"
						),
					right: "auto",
					top: t
				});
				else if ("playlist" == e
					.g("key") && 1 == e
					.s("floatleft"))
					css(e.c(), {
						position: "absolute",
						left: o
							.screen_w /
							2 - e.g(
								"width"
								) /
							2 + e.s(
								"marginleft"
								) /
							2 - e.s(
								"marginright"
								) /
							2,
						top: t
					});
				else {
					var r = o.screen_w /
						2 - e.g(
						"width") / 2 + e
						.s(
						"marginleft") -
						e.s(
							"marginright");
					css(e.c(), {
						position: "absolute",
						left: r >
							0 ?
							r :
							0,
						top: t
					})
				}
				e.Arrows()
			}

			function Action(but, type) {
				o.acted = !0,
					_lastactbut = but;
				var a = but.g("action");
				if ("play" == a ? (o
						.actions.Play(),
						1 == v.hotkey
						.on && 1 == v
						.hotkey.icons &&
						1 == v.hotkey
						.playiconbut &&
						PluginHotIcon(
							"play", 1)
						) : ("pause" ==
						a && (o
							.rldplay =
							0, o.actions
							.Pause(),
							1 == v
							.hotkey
							.on && 1 ==
							v.hotkey
							.icons &&
							1 == v
							.hotkey
							.playiconbut &&
							PluginHotIcon(
								"play",
								0)),
						"stop" == a && o
						.actions
						.StopMedia()),
					"back" == a && o
					.actions.Seek(0, !
					1), "fullscreen" ==
					a ? o.casting || o
					.actions
					.Fullscreen() :
					"normalscreen" ==
					a && o.actions
					.Normalscreen(),
					"line" == a) {
					var ld = o.media
						.duration(),
						lt = but.g(
							"click") *
						ld;
					if (v.delete > 0 &&
						(ld -= v.delete,
							lt = but.g(
								"click"
								) * ld +
							v.delete), v
						.seekwindow >
						0 && v
						.seekwindow /
						ld <= 1 - but.g(
							"click"))
						return;
					o.actions.Seek(lt, !
							0), o
						.continue && (o
							.continue
							.write(lt,
								ld), o
							.seekto >
							0 && (o
								.seekto =
								void 0))
				}
				if ("volume" == a) {
					var x = but.g(
						"click");
					x < .02 && (x = 0),
						x > 1 && (x =
						1), "speed" ==
						but.s(
							"customline"
							) ? (x =
							parseFloat(
								x * o
								.files_speed
								.slice(-
									1)[
									0])
							.toFixed(1),
							o.actions
							.SetSpeed(x,
								1)) : (o
							.storage &&
							1 == v
							.volumestore &&
							(setCookie(
									"pljsvolume",
									x),
								but.g(
									"click"
									) >
								0 || o
								.system
								.iphone ||
								0 == v
								.mutestore ?
								localStorage
								.removeItem(
									"pljsmute"
									) :
								setCookie(
									"pljsmute",
									1)),
							o.actions
							.Volume(x))
				}
				if ("mute" == a ? (o
						.storage && !o
						.system
						.iphone && 1 ==
						v.mutestore &&
						setCookie(
							"pljsmute",
							1), o
						.actions.Mute(),
						1 == v.hotkey
						.icons && 1 == v
						.hotkey
						.muteiconbut &&
						PluginHotIcon(
							"mute", 0)
						) : "unmute" ==
					a && (o.storage &&
						localStorage
						.removeItem(
							"pljsmute"),
						o.actions
						.Unmute(), 1 ==
						v.hotkey
						.icons && 1 == v
						.hotkey
						.muteiconbut &&
						PluginHotIcon(
							"mute", 1)),
					0 == a.indexOf(
						"time") && (but
						.isOn() ? but
						.Off() : but
						.On()),
					"rotate" == a && o
					.media.Rotate(),
					"scale+" == a && o
					.media.Scale(.1),
					"scale-" == a && o
					.media.Scale(-.1),
					"scale" == a && o
					.media.Scale(0),
					"live" == a && (api(
							"restart"),
						but.set(
							"iconopacity",
							1), but.set(
							"saturate",
							1)),
					"share" == a && (js(
							"share"),
						ShowShare()),
					"settings" == a && (
						o.sttx = void 0,
						settings && (
							settings.g(
								"show"
								) ?
							settings
							.hide() :
							settings
							.show())),
					"playlist" == a) {
					if (o
						.overopentimeout ==
						a) return;
					exist(v.playlist) &&
						(playlist.g(
								"show"
								) ?
							playlist
							.hide() :
							setTimeout(
								function() {
									playlist
										.show()
								}, 100))
				}
				if ("next" == a && o
					.controls
					.PlaylistNext(),
					"prev" == a && o
					.controls
					.PlaylistPrev(),
					"custom" == a &&
					1 == but.s(
					"link") && "" != but
					.s("linkurl")) {
					var x = trim(but.s(
						"linkurl"
						));
					if (o
						.overopentimeout ==
						a + x) return;
					x.indexOf(
						"{time}") > -
						1 && (x = x
							.replace(
								"{time}",
								exist(o
									.continue
									) ?
								o
								.continue
								.flag()
								.t : o
								.media
								.time())
							), x
						.indexOf(
							"{file}") >
						-1 && (x = x
							.replace(
								"{file}",
								o.media
								.currentFile()
								)), x
						.indexOf(
							"{title}") >
						-1 && (x = x
							.replace(
								"{title}",
								v.title
								.replace(
									/,/ig,
									" ")
								)),
						"airplay" ==
						x && o.media
						.Airplay(),
						"skip" == x &&
						but.s("skip") >
						0 && o.actions
						.Seek(but.s(
							"skip")),
						"seektome" ==
						x && (o.actions
							.Seek(but.s(
									"marginprocleft"
									) *
								o.media
								.duration() /
								100), o
							.play || o
							.actions
							.Play()),
						1 == but.s(
							"linkpause"
							) && o
						.actions
					.Pause();
					var y = x.split(
					",");
					if (0 == x.indexOf(
							"api:"))
						for (var z = x
								.substr(
									4)
								.split(
									";"
									),
								i =
								0; i < z
							.length; i++
							)
							if ((y = z[
										i]
									.split(
										","
										)
									)
								.length >
								1)
								"seek" ==
								y[0] &&
								1 == v
								.hotkey
								.icons &&
								1 == v
								.hotkey
								.seekiconbut &&
								PluginHotIcon(
									"seek",
									y[
									1] >
									0 ?
									1 :
									0),
								api(y[
									0],
									y[
									1],
									but
									), (
									"0/1" ==
									y[
									1] ||
									"1/0" ==
									y[1]
									) &&
								reRightMenu();
							else if (
						"screenshot" ==
						y[0]) {
						var ss = api(y[
							0]);
						if (ss) {
							if (ss
								.indexOf(
									"data"
									) >
								-1) {
								if (1 ==
									v
									.ssfly
									) {
									var img =
										document
										.createElement(
											"img"
											);
									img.setAttribute(
											"src",
											ss
											),
										css(img, {
											position: "fixed",
											right: exist(
													v
													.ssflyp
													) ?
												v
												.ssflyp :
												20,
											bottom: exist(
													v
													.ssflyp
													) ?
												v
												.ssflyp :
												20,
											width: 0,
											transition: "width 0.5s cubic-bezier(.75,-0.5,0,1.75)"
										}),
										img
										.style
										.zIndex =
										1001,
										document
										.body
										.appendChild(
											img
											),
										setTimeout(
											function() {
												css(img, {
													width: exist(
															v
															.ssflyw
															) ?
														v
														.ssflyw :
														200
												})
											},
											1
											),
										img
										.onclick =
										function() {
											this.parentNode
												.removeChild(
													this
													)
										}
								}
								if (1 ==
									v
									.ssdown
									) {
									var a =
										createElement(
											"a"
											);
									a.href =
										ss,
										a
										.download =
										y[
											0] +
										".jpg",
										a
										.click()
								}
							}
						} else log(y[
							0] +
							" error"
							)
					} else api(y[0]);
					else 0 == x.indexOf(
							"js:") && (x
							.indexOf(
								"(") >
							0 && x
							.indexOf(
								")") >
							0 ? eval(x
								.substr(
									3)
								) :
							eval(y[0]
								.substr(
									3) +
								"(" + (
									exist(
										y[
											1]
										) ?
									'"' +
									y[
									1] +
									'"' :
									""
									) +
								(exist(y[
										2]) ?
									',"' +
									y[
									2] +
									'"' :
									""
									) +
								")")),
						0 == x.indexOf(
							"event:") &&
						JsEvent(x
							.substr(6),
							o.media
							.time()),
						0 == x.indexOf(
							"share:") &&
						o.share && o
						.share.api(x
							.substr(6)),
						0 == x.indexOf(
							"effect:"
							) && o
						.effects && api(
							"effect", x
							.substr(7)),
						(0 == x.indexOf(
								"http"
								) ||
							0 == x
							.indexOf(
								"/") ||
							0 == x
							.indexOf(
								"?") ||
							0 == x
							.indexOf(
								"url:")
							) && (0 == x
							.indexOf(
								"url:"
								) && (
								x = x
								.substr(
									4)),
							window.open(
								x, but
								.s(
									"linktarget")
								)), 0 ==
						x.indexOf(
							"download"
							) && o
						.actions
						.Download(),
						"api:pipwebkit" ==
						x && o.media
						.PipWebkit();
					if (x.indexOf(
							"settings#"
							) > -1 &&
						settings) {
						var si = x
							.substr(9)
							.split(",");
						if (settings.g(
								"show"
								) &&
							settings.g(
								"open"
								) == si[
								0]) o
							.sttx =
							void 0,
							settings
							.hide();
						else {
							o.sttx = but
								.g(
								"x") -
								but.g(
									"width"
									) /
								2;
							for (var i =
									0; i <
								si
								.length; i++
								) 0 ==
								i &&
								settings
								.show(),
								settings
								.open(
									si[
										i]
									)
						}
					}
					if (x.indexOf(
							"settings:"
							) > -1 &&
						1 == v.settings
						.combined && (o
							.settings2 ||
							(o.settings2 =
								new PluginSettings2
								), 1 ==
							v.settings
							.showovercontrol ?
							"over" ==
							type ? o
							.settings2
							.show(x) : o
							.settings2
							.toggle(x) :
							type || o
							.settings2
							.toggle(x)),
						"unblock" == x
						) {
						o.actions
							.RemoveCurtain(),
							o.stopkeys =
							0, but.set(
								"hide2"
								);
						var bl =
							FindBut(
								"linkurl",
								"block"
								);
						bl && bl.set(
							"hide2")
					}
					"block" == x && (but
						.UpdateText(
							"OK"),
						but.s(
							"linkurl2"
							) && (
							window
							.location
							.href =
							trim(but
								.s(
									"linkurl2")
								)))
				}
			}

			function TitlePl() {
				for (var e in b) b
					.hasOwnProperty(
					e) && "custom" == b[
						e].g(
					"action") &&
					"text" == b[e].s(
						"type") && b[e]
					.RenewFromTitle(!0)
			}

			function ShowShare() {
				exist(o.share) && o
					.share.Show()
			}

			function CustomTextButs() {
				if (v.customtext &&
					"object" == typeof v
					.customtext)
					for (var e in v
							.customtext)
						v.customtext
						.hasOwnProperty(
							e) &&
						CustomText(e, v
							.customtext[
								e])
			}

			function CustomText(e, t) {
				for (var o in b) b
					.hasOwnProperty(
					o) && "custom" == b[
						o].g(
					"action") &&
					"text" == b[o].s(
						"type") && b[o]
					.s("dom") == e && (
						b[o].g(
						"show") && 1 !=
						b[o].s(
						"hidden") || (b[
								o].set(
								"unhidden"
								), b[o]
							.set(
								"display",
								!0)), b[
							o]
						.CustomText(t))
			}

			function ShowOrHide() {
				for (var e in b) b
					.hasOwnProperty(
					e) && "buffer" != b[
						e].g(
					"action") &&
					ShowOrHideProcessor(
						b[e]);
				ShowOrHideProcessor(bg),
					stretch_width_last !=
					stretch_width && (
						stretch_width_last =
						stretch_width,
						Resize()), 1 ==
					v.toolbar.hide &&
					1 == v.toolbar
					.hidedown &&
					ToolbarDown(!o
						.starttimeout &&
						!o.mouseHere &&
						!o.fullscreen &&
						o.play && 1 != v
						.toolbar
						.hidejustfull &&
						!o.casting)
			}

			function ShowForce() {
				var e = toolbarHidden &&
					1 == v.toolbar
					.hidewithoutmoving;
				if (o.play || 1 != v
					.toolbar.hide ||
					1 != v.toolbar
					.hideonpause || (
						e = !1), e) {
					for (var t in b) b
						.hasOwnProperty(
							t) &&
						"buffer" != b[t]
						.g("action") &&
						ShowOrHideProcessor(
							b[t], !1);
					css(o.frame, {
							cursor: "default"
						}), o.fcdef = !
						0,
						ShowOrHideProcessor(
							bg, !1), bg
						.g("show") &&
						ToolbarShow(),
						ToolbarDown(!1)
				}
			}

			function HideForce() {
				var e = o.play && 1 == v
					.toolbar
					.hidewithoutmoving &&
					!o.mouseDown && !o
					.controlover;
				if (o.play || 1 != v
					.toolbar.hide ||
					1 != v.toolbar
					.hideonpause || (
						e = !0),
					settings && settings
					.g("show") && o
					.setaction && (e = !
						1), o.casting &&
					(e = !1), e) {
					for (var t in b) b
						.hasOwnProperty(
							t) &&
						"buffer" != b[t]
						.g("action") &&
						ShowOrHideProcessor(
							b[t], !0);
					ShowOrHideProcessor(
							bg, !0), !bg
						.g("show") && (
							toolbarHidden = !
							0, o.media
							.ToolbarHide(),
							o.play && (
								css(o
									.frame, {
										cursor: "none"
									}),
								o
								.fcdef = !
								1)),
						ToolbarDown(!0)
				}
			}

			function HideInterval() {
				1 == v.toolbar
					.hidewithoutmoving &&
					(1 != v.toolbar
						.hidejustfull ||
						o.fullscreen ||
						o
						.fullscreen_process
						) && (
						clearInterval(o
							.toolbarInterval
							), o
						.toolbarInterval =
						setInterval(
							HideForce, (
								v
								.toolbar
								.hideleavetimeout >
								0 ? v
								.toolbar
								.hideleavetimeout :
								v
								.toolbar
								.hidetimeout
								) * 1e3)
						)
			}

			function ShowOrHideProcessor(
				e, t) {
				var n = !1,
					s = !1,
					a = !1;
				1 == v.toolbar.hide ? (o
						.starttimeout ||
						o.mouseHere || o
						.fullscreen || !
						o.play || 1 == v
						.toolbar
						.hidejustfull ||
						o.casting ? (
							n = !1,
							s = !0) : (
							n = !0,
							s = !1,
							a = !0),
						exist(t) && !o
						.casting && (
							s = !(n = t)
							), 1 == v
						.toolbar.hide &&
						1 == v.toolbar
						.hidedown && (
							0 == e.s(
								"position"
								)
							.indexOf(
								"controls"
								) ||
							"line" == e
							.s("action")
							) && (n = !
							1, s = !0),
						1 != v.toolbar
						.hideonpause ||
						o.play || (n = !
							0, s = !1,
							a = !1)) :
					1 != e.s("hide") &&
					(s = !0), s && !o
					.fcdef && (css(o
							.frame, {
								cursor: "default"
							}), o
						.fcdef = !0);
				var r = e.g("action");
				"custom" == r && -1 == e
					.s("position")
					.indexOf(
					"controls") && (
						n = !1, s = !0),
					o.casting &&
					"line" == r && -1 ==
					o.media
				.duration() && (n = !0,
						s = !1);
				var l = !1,
					d = HideProof(e);
				if (1 == e.s("hide") &&
					(1 == e.s(
							"hideonleaveandplay"
							) && (a ||
							t || o
							.play && !o
							.mouseHere
							) && (a ||
							t) && (d = !
							0), 1 == e
						.s("hidelap") &&
						o.play && !o
						.mouseHere && (
							d = !0), (
							1 == e.s(
								"hideonwidth"
								) ||
							1 == e.s(
								"hideoverwidth"
								) ||
							1 == e.s(
								"hideonfullscreen"
								)) && (
							resizeonwidth = !
							0)), d ? (
						n = !0, s = !1
						) : n || (s = !
						0), "volume" ==
					e.s("action") &&
					1 == e.s("hide") &&
					1 == e.s(
						"hideoutmute"
						) && (n = !0,
						s = !1, !a && (o
							.hidden_volume_over ||
							o
							.hidden_volume_over_process
							) && !t &&
						1 != e.s(
							"hiddenwidth"
							) ? (n = !1,
							s = !0) :
						l = !0), !o
					.nativecontrols && (
						o.start || 1 !=
						v.toolbar
						.hide || 1 != v
						.toolbar
						.hideuntilstarted
						) && (o
						.metadata ||
						1 != v.toolbar
						.hide || 1 != v
						.toolbar
						.hideuntilmeta
						) || ((e.s(
								"position"
								)
							.indexOf(
								"controls"
								) > -
							1 || e.s(
								"position"
								)
							.indexOf(
								"bottom"
								) > -1
							) && (n = !
							0, s = !1),
						1 != v.toolbar
						.hidejustfull ||
						o.fullscreen ||
						(n = !1, s = !0)
						), settings &&
					settings.g(
					"show") && 1 != v
					.settings.always &&
					(a = !1, t = !1),
					"share" == r &&
					exist(o.share) && o
					.share.empty() && (
						n = !0, s = !1,
						e.set(
							"animation",
							"none")), (
						"playlist" ==
						r || "next" ==
						r || "prev" ==
						r || 1 == e.s(
							"hidewithoutplaylist"
							)) && (
						playlist ?
						playlist
					.empty() && 0 != e
						.s(
							"hidewithoutplaylist") &&
						(n = !0, s = !1,
							e.set(
								"animation",
								"none")
							) : (n = !0,
							s = !1)),
					1 == o.hideall && (
						n = !0, s = !1),
					l) {
					var c =
						ControlCoordinate(
							e);
					c && (c.y > 0 && e
						.set("y0", c
							.y),
						css(e.c(), {
							position: "absolute",
							top: e
								.g(
									"y0")
						}))
				}
				n && HideControl(e, !!
						firstly), s &&
					ShowControl(e), e ==
					bg && (!n && s && (
							ToolbarShow(),
							show2(bg2),
							toolbarHidden = !
							1, 0 ==
							uijs && js(
								"ui", 1
								),
							uijs = 1, o
							.cut && o
							.cutted && o
							.cut.show()
							), n && !
						s && !o
						.casting && (o
							.media
							.ToolbarHide(),
							SettingsClose(),
							hide2(bg2),
							toolbarHidden = !
							0, 1 ==
							uijs && js(
								"ui", 0
								),
							uijs = 0, o
							.cut && o
							.cutted && o
							.cut.hide()
							),
						playlist && 1 ==
						v.playlist
						.always && !
						playlist
					.empty() && (s || o
							.nativecontrols ?
							1 == v
							.playlist
							.alwaysnotfullscreen &&
							o
							.fullscreen ||
							!playlist.g(
								"show"
								) && (
								1 == v
								.playlist
								.alwaysjustpause &&
								o
								.play ||
								playlist
								.show()
								) : n &&
							playlist.g(
								"show"
								) &&
							playlist
							.hide()))
			}

			function HideProof(e) {
				var t = !1,
					n = e.g("action");
				if (1 != e.s("hide") ||
					(1 == e.s(
							"hideonplay"
							) && o
						.play && (t = !
							0), 1 == e
						.s(
							"hideonpause") &&
						(o.play || (
							t = !0)),
						1 == e.s(
							"hideondesktop"
							) && o
						.system
						.desktop && (
							t = !0),
						1 == e.s(
							"hideonmobile"
							) && o
						.system
						.mobile && (
							t = !0),
						1 == e.s(
							"hideoverwidth"
							) && (o
							.screen_w >
							e.s(
								"hideoverwidthlimit") ?
							(e.set("hiddenwidth",
									1),
								t = !0
								) : e
							.set(
								"hiddenwidth",
								0)),
						1 == e.s(
							"hideonwidth"
							) && (o
							.screen_w <=
							e.s(
								"hideonwidthlimit") ?
							(e.set("hiddenwidth",
									1),
								t = !0
								) : e
							.set(
								"hiddenwidth",
								0)),
						1 == e.s(
							"hideafterstart"
							) && o
						.start && (t = !
							0), 1 == e
						.s(
						"hideafter") &&
						e.s(
							"hideaftersec") >
						0 && o.media
						.time() >= e.s(
							"hideaftersec"
							) && (t = !
							0), 1 == e
						.s(
						"hidebefore") &&
						e.s(
							"hidebeforesec") >
						0 && o.media
						.time() < e.s(
							"hidebeforesec"
							) && (t = !
							0), 1 == e
						.s(
							"hide0timestore") &&
						((o.start || !o
								.continue ||
								o.media
								.isLive()
								) && (
								t = !0),
							o
							.continue &&
							0 == o
							.continue
							.flag().t &&
							(t = !0)),
						1 == e.s(
							"hideuntilstarted"
							) && (o
							.start || (
								t = !0)
							), e.s(
							"hideuntilto"
							) > 0 && (
							t = !0),
						1 == e.s(
							"hideonvar"
							) && exist(e
							.s(
								"hidevar")
							) &&
						options[e.s(
							"hidevar"
							)] && (t = !
							0), 1 != e
						.s(
							"hideuntiltext") ||
						exist(e.s(
							"customtext"
							)) || (t = !
							0), 1 == e
						.s(
						"hidewovar") &&
						exist(e.s(
							"hidevar2"
							)) && (
							options[e.s(
								"hidevar2"
								)] || (
								t = !0)
							), 1 == e.s(
							"hideuntilstartedios"
							) && o
						.system.ios && (
							!o.start ||
							o.newfile
							) && (t = !
							0), 1 == e
						.s(
							"hideuntilended") &&
						(o.media
						.ended() || (
								t = !0)
							), 1 == e.s(
							"hideonvod"
							) && (o
							.media
							.isLive() ||
							(t = !0)),
						1 == e.s(
							"hideonleave"
							) && (o
							.mouseHere ||
							(t = !0)),
						1 == e.s(
							"hidenormscreen"
							) && (o
							.fullscreen ||
							(t = !0)),
						1 == e.s(
							"hideonfullscreen"
							) && o
						.fullscreen && (
							t = !0),
						1 == e.s(
							"hideonunmute"
							) && (o
							.muted || (
								t = !0)
							), 1 == e.s(
							"hideonlive"
							) && o.media
						.isLive() && -
						1 == o.media
						.currentFile()
						.indexOf(
						"?DVR") && (
							t = !0),
						1 == e.s(
							"hidewithposter"
							) &&
						isVisible(o
							.poster) &&
						(t = !0), 1 == e
						.s(
							"hideuntilmeta") &&
						(o.metadata || (
							t = !0)),
						1 == e.s(
							"hideonmeta"
							) && o
						.metadata && (
							t = !0),
						1 == e.s(
							"hidemini"
							) && o
						.mini && (t = !
							0), 1 == e
						.s(
						"hidenomini") &&
						(o.mini || (
							t = !0)),
						1 == e.s(
							"hideafterclick"
							) && e.g(
							"clicked"
							) && (t = !
							0), 1 == e
						.s(
						"hidenoab") && (
							o.ab || (
								t = !0)
							), 1 == e.s(
							"hideab") &&
						o.ab && (t = !
						0), 1 != e.s(
							"hideonyoutube"
							) || 1 != v
						.preload || 1 !=
						v.screenclick ||
						"youtube" != o
						.file_type ||
						exist(v
						.poster) || 0 !=
						v
						.youtubeposter ||
						o.start &&
						"ended" != o
						.media
					.status() || "" != v
						.poster && (
							t = !0)),
					"custom" == n) {
					var s = e.s(
						"linkurl");
					if (s && (
							"api:airplay" !=
							s &&
							"airplay" !=
							s || o
							.airplay ||
							o
							.airplayed ||
							(t = !0),
							"api:pipwebkit" !=
							s || o
							.pipwebkit &&
							(o.start ||
								0 != v
								.preload
								) || (
								t = !0),
							"api:unfixing" !=
							s || o
							.mini || (
								t = !0),
							s.indexOf(
								"captions"
								) > -
							1 && !o
							.captions &&
							(t = !0),
							"skip" == s
							)) {
						var a = !1;
						if (exist(v
								.skip))
							for (var r =
									v
									.skip
									.split(
										","
										),
									l =
									0; l <
								r
								.length; l++
								) {
								var d =
									r[l]
									.split(
										"-"
										);
								2 == d
									.length &&
									o
									.media
									.time() >
									d[
									0] &&
									o
									.media
									.time() <
									d[
									1] &&
									(a = !
										0,
										e
										.set(
											"skip",
											d[
												1]
											)
										)
							}
						a || (t = !0)
					}
				}
				if (("playlist" == n ||
						"next" == n ||
						"prev" == n) &&
					(playlist ? playlist
						.empty() && (
							t = !0) :
						t = !0),
					"settings" == n && (
						settings ?
						settings
					.empty() && (t = !0,
							e.set(
								"animation",
								"none")
							) : t = !0),
					"text" == e.g(
						"type") && 0 ==
					e.g("length") && (
						t = !0), e.g(
						"settings#") &&
					!e.g(
					"set#visible") && (
						t = !0), 1 == e
					.s("chromecast")) {
					var c = document
						.getElementById(
							"pjs_cast_button_" +
							v.id);
					(0 != o.media
						.duration() ||
						0 != o.media
						.time()) && o
						.tagvideo &&
						isVisible(c) &&
						o
						.cast_available ||
						(t = !0)
				}
				return 1 == e.s(
						"hidetime") && (
						t || e.set(
							"hidetime",
							1)),
					"duration" == n && o
					.media.isLive() && (
						t = !0),
					"control_start" == e
					.g("key") && o
					.system.mobile && o
					.nativecontrols && o
					.system.android && (
						t = !0), t
			}

			function HideControl(e, t) {
				e.g("show") && (o
					.fullscreen_process ||
					"none" == e.s(
						"animation"
						) || t ? e
					.set("display",
						!1) :
					HideAnimate(e),
					e.set("show", !
						1))
			}

			function ShowControl(e) {
				e.g("show") || (
					"none" == e.s(
						"animation"
						) || o
					.fullscreen_process ?
					(e.set("display",
							!0), o
						.fullscreen_process &&
						"bg" != e.g(
							"key"
							) && e
						.set(
							"opacity",
							1),
						"volume" ==
						e.g(
							"action") &&
						o
						.hidden_volume &&
						HidePositionControl(
							e)) :
					ShowAnimate(e),
					"volume" == e.s(
						"action") &&
					o.controls
					.Volume(o
						.muted ? 0 :
						v.volume),
					"line" == e.s(
						"action") &&
					o.actions
					.Loading(), e
					.set("show", !0)
					)
			}

			function HideAnimate(e) {
				killMotion(e.g("key"));
				var t = "alpha|",
					n = "0|",
					s = 1,
					a = e.s(
					"animation"),
					r = e.s("position");
				"scale" == a && (t +=
						"scale|", n +=
						"0|"),
					"position" == a && (
						r.indexOf(
							"right") > -
						1 && -1 == r
						.indexOf(
							"controls"
							) && (t +=
							"x|", n +=
							int(o
								.screen_w +
								e.g(
									"width")
								) + "|"
							), r
						.indexOf(
						"left") > -1 &&
						(t += "x|", n +=
							int(-e.g(
								"width"
								)) + "|"
							), r
						.indexOf(
						"top") > -1 && (
							t += "y|",
							n += "0|" +
							-e.g(
								"height"
								) + "|"
							), (r
							.indexOf(
								"bottom"
								) > -
							1 || r
							.indexOf(
								"controls"
								) > -
							1 ||
							"timeline" ==
							r) && (t +=
							"y|",
							"line" == e
							.g(
							"action") ||
							"volume" ==
							e.g(
								"action") ?
							n += int(o
								.screen_h +
								e.s(
								"h") + (
									20 >
									e.s(
										"h") ?
									20 -
									e.s(
										"h") :
									0)
								) +
							"|" : n +=
							int(o
								.screen_h +
								e.g(
									"height")
								) + "|"
							),
						"center" == r &&
						(t += "scale|",
							n += "0|")),
					new Motion({
						mc: e,
						me: e.g(
							"key"),
						type: t
							.substr(
								0, t
								.length -
								1),
						to: n
							.substr(
								0, n
								.length -
								1),
						hide: s
					})
			}

			function ShowAnimate(e) {
				killMotion(e.g("key"));
				var t = "",
					o = "",
					n = e.s(
					"animation"),
					s = e.s("position");
				1 != e.g("opacity") && (
						t = "alpha|",
						o = ("bg" == e
							.g("key") ?
							v.toolbar
							.a : "1") +
						"|"), "scale" ==
					n && e.g(
					"scaleX") != e.s(
						"scale") && (
						t += "scale|",
						o += e.s(
							"scale") +
						"|"),
					"position" == n && (
						"center" == s ?
						e.g("scaleX") !=
						e.s("scale") &&
						(t += "scale|",
							o += e.s(
								"scale"
								) + "|"
							) : s
						.indexOf(
							"controls"
							) > -1 ? e
						.g("y") != e.g(
							"y0") && (
							t += "y|",
							o += e.g(
								"y0") +
							"|") : (t +=
							"x|y|", o +=
							e.g("x0") +
							"|" + e.g(
								"y0") +
							"|")), "" !=
					t && "" != o ?
					new Motion({
						mc: e,
						me: e.g(
							"key"),
						type: t
							.substr(
								0, t
								.length -
								1),
						to: o
							.substr(
								0, o
								.length -
								1),
						show: 1
					}) : e.set(
						"display", !0)
			}

			function ToolbarDown(e) {
				1 == v.toolbar.hide && (
					e &&
					SettingsClose(),
					1 == v.toolbar
					.hidedown && (o
						.play ||
						1 != v
						.toolbar
						.hideonpause ||
						(e = !0),
						e && !o
						.toolbarisdown &&
						css(o
							.toolbar, {
								top: bg
									.h()
							}), !
						e && o
						.toolbarisdown &&
						css(o
							.toolbar, {
								top: 0
							}), o
						.toolbarisdown =
						e))
			}

			function ToolbarShow() {
				toolbarHidden = !1, o
					.media
				.ToolbarShow(), o
					.resizeonmouse && (o
						.resizeonmouse = !
						1, Resize(),
						setTimeout(
							Resize, 300)
						)
			}

			function UpdateTime(e, t,
			o) {
				v.delete > 0 && (t -= v
					.delete, o -= v
					.delete);
				var n = Time(t);
				"1" == e.s(
						"inversetime") &&
					(n = Time(o - t)),
					"1" == e.s(
						"showduration"
						) && ("1" == e
						.s("showboth") ?
						n += o > 0 ?
						" " + Lang(e.s(
							"separator"
							)) + " " +
						Time(o) : "" :
						0 == t && (n =
							Time(o))), e
					.UpdateText(n)
			}

			function Waiting() {
				if (!waiting) {
					js("buffering");
					var e = FindBut(
						"action",
						"buffer");
					e && (e.Buffer(),
						waiting = !0
						)
				}
			}

			function Volumescrolled() {
				var e = FindBut(
					"linkurl",
					"volume scroll");
				e && (e.UpdateText(""),
					e.set("hide2"),
					clearTimeout(o
						.volumescroll
						))
			}

			function SettingsClose(e) {
				settings && settings.g(
						"show") &&
					settings.hide(e), o
					.settings2 && o
					.settings2.hide()
			}

			function PlaylistControls() {
				for (var e in b) b
					.hasOwnProperty(
					e) && ("next" == b[
							e].g(
							"action") &&
						css(b[e].c(), {
							opacity: playlist
								.PlaylistNextExist() ?
								1 :
								.5
						}), "prev" == b[
							e].g(
							"action") &&
						css(b[e].c(), {
							opacity: playlist
								.PlaylistPrevExist() ?
								1 :
								.5
						}))
			}

			function SpeedChanged() {
				if (o.line_speed) {
					var e = parseFloat(o
							.custom_speed /
							o
							.files_speed
							.slice(-1)[
								0], 1)
						.toFixed(1);
					for (var t in b) b
						.hasOwnProperty(
							t) && (
							"speed" ==
							b[t].s(
								"customline"
								) && o
							.custom_speed &&
							b[t]
							.UpdatePlay(
								e, 1),
							"api:speed,1.0" ==
							b[t].s(
								"linkurl"
								) && b[
								t]
							.UpdateVolume(
								e))
				}
			}

			function FindBut(e, t) {
				for (var o in b)
					if (b
						.hasOwnProperty(
							o) && b[o]
						.s(e) == t)
						return b[o]
			}

			function KeyPlusUp(e) {
				"next" == e && (o
						.playlist ? o
						.controls
						.PlaylistNext() :
						e = "seek"),
					"seek" == e && o
					.media.duration() >
					0 && o.media
				.time() + parseFloat(v
						.hotkey.seek) <
					o.media
				.duration() && o.actions
					.Seek(o.media
					.time() +
						parseFloat(v
							.hotkey.seek
							), !0),
					"volume" == e && (o
						.actions.Volume(
							parseFloat(v
								.volume
								) +
							parseFloat(v
								.hotkey
								.vol)),
						event
						.preventDefault()
						), "scale" ==
					e && (o.media.scale(
							v.hotkey
							.scale / 100
							), event
						.preventDefault()
						), 1 == v.hotkey
					.icons &&
					PluginHotIcon(e, 1)
			}

			function KeyPlusDown(e) {
				"next" == e && (o
						.playlist ? o
						.controls
						.PlaylistPrev() :
						e = "seek"),
					"seek" == e && o
					.media.duration() >
					0 && o.start && o
					.actions.Seek(o
						.media.time() -
						v.hotkey.seek >=
						0 ? o.media
						.time() - v
						.hotkey.seek :
						0, !0),
					"volume" == e && (o
						.actions.Volume(
							parseFloat(v
								.volume
								) -
							parseFloat(v
								.hotkey
								.vol)),
						event
						.preventDefault()
						), "scale" ==
					e && (o.media.scale(
							-v.hotkey
							.scale / 100
							), event
						.preventDefault()
						), 1 == v.hotkey
					.icons &&
					PluginHotIcon(e, 0)
			}
			exist(v.settings) && (
					"function" ==
					typeof Settings ? (
						settings =
						new Settings(
							"settings"),
						1 == v.settings
						.always ?
						settings
					.show() : settings
						.hide()) : o
					.noset = !0), exist(
					v.playlist) &&
				"function" ==
				typeof Settings && (
					playlist =
					new Settings(
						"playlist"),
					exist(o.playlist) ?
					(playlist
						.updatePlaylist(
							o.playlist),
						0 != v.playlist
						.openplaylistbefore &&
						exist(v.playlist
							.openplaylistbefore
							) ? playlist
						.show() : 0 == v
						.playlist
						.always &&
						playlist.hide()
						) : playlist
					.hide(1),
					PlaylistControls()),
				CreateShare(),
				CustomTextButs(),
				Resize(!0),
			ShowOrHide(),
			SpeedChanged(), firstly = !
				1, this.NewPl =
				function() {
					CreateShare()
				}, this.ControlClick =
				function(e) {
					var t = b[e],
						n = t.g(
							"action");
					if (n) {
						var s =
						new Date;
						o.clicktime = s
							.getTime(),
							n && "" !=
							n && Action(
								t)
					}
				}, this.toggleControl =
				function(e, t, o) {
					for (var n in b) b
						.hasOwnProperty(
							n) && b[n]
						.s(e) == t && b[
							n].set(o ?
							"show2" :
							"hide2")
				}, this.butByS =
				function(e, t) {
					return FindBut(t, e)
				}, this.title =
				function(e) {
					var t = !1;
					for (var n in b) b
						.hasOwnProperty(
							n) &&
						"title" == b[n]
						.g("action") &&
						(b[n].s(
							"var") ==
							e ||
							"title" == e
							) && (1 ==
							b[n].s(
								"hide"
								) &&
							1 == b[n].s(
								"hideonplay"
								) && o
							.play && (
								t = !0),
							"" == v[
							e] || t ? b[
								n].set(
								"display",
								!1) : b[
								n].set(
								"display",
								!0), b[
								n]
							.UpdateText(
								v[e]));
					TitlePl()
				}, this.titlepl =
				function() {
					TitlePl()
				}, this.resizetext =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) &&
						"custom" == b[e]
						.g("action") &&
						"text" == b[e]
						.s("type") && b[
							e]
						.ResizeText()
				}, this.showShare =
				function() {
					ShowShare()
				}, this.updateTitle =
				function() {
					if ("" != v.title) {
						for (var e in b)
							if (b
								.hasOwnProperty(
									e
									) &&
								"title" ==
								b[e].g(
									"action"
									)) {
								var t = !
									1;
								b[e].g(
										"show") ||
									(t = !
										0,
										b[
											e]
										.set(
											"display",
											!
											0
											)
										),
									b[e]
									.UpdateText(
										v
										.title
										),
									t &&
									b[e]
									.set(
										"display",
										!
										1
										)
							}
					}
				}, this.customTextPl =
				function() {
					CustomTextButs()
				}, this.customText =
				function(e, t) {
					CustomText(e, t)
				}, this.resize =
				function() {
					Resize()
				}, this.resize2 =
				function() {
					Resize(!0)
				}, this.resizeSettings =
				function() {
					ResizeSettings(
						settings)
				}, this.resizePlaylist =
				function() {
					ResizeSettings(
						playlist)
				}, this.Play =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) &&
						"play" == b[e]
						.g("action") &&
						b[e].On();
					this.PlaylistVisible() &&
						1 == v.playlist
						.autohide &&
						this.Playlist(),
						o.play = !0,
						ShowOrHide()
				}, this.Pause =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) && (
							"pause" ==
							b[e].g(
								"action"
								) ||
							"stop" == b[
								e].g(
								"action"
								)) && b[
							e].Off();
					playlist && 1 == v
						.playlist
						.openplaylistpause &&
						!playlist
						.empty() &&
						playlist.show(),
						o.play = !1,
						this
						.StopWaiting(),
						ShowOrHide(),
						1 == v.toolbar
						.hide && 1 == v
						.toolbar
						.hideonpause &&
						HideForce(!0)
				}, this.Mute =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) && (
							"mute" == b[
								e].g(
								"action"
								) && b[
								e].On(),
							this.Volume(
								0));
					ShowOrHide()
				}, this.Unmute =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) &&
						"unmute" == b[e]
						.g("action") &&
						b[e].Off();
					v.volume < .1 ? (v
							.volume =
							.5, o
							.actions
							.Volume(v
								.volume)
							) : this
						.Volume(v
							.volume),
						ShowOrHide()
				}, this.Volume =
				function(e, t) {
					for (var o in b) b
						.hasOwnProperty(
							o) && (
							"volume" ==
							b[o].g(
								"action"
								) &&
							"speed" !=
							b[o].s(
								"customline"
								) && b[
								o]
							.UpdatePlay(
								e, 1,
								"no" !=
								t || t),
							"mute" == b[
								o].g(
								"action"
								) && b[
								o]
							.UpdateVolume(
								e));
					ShowOrHide()
				}, this.Fullscreen =
				function() {
					var e = FindBut(
						"action",
						"fullscreen"
						);
					e && (e.On(), e.set(
							"scale",
							e.s(
								"scale")
							)),
						ShowOrHide(),
						resizeonwidth &&
						setTimeout(
							ShowOrHide,
							500),
						HideInterval()
				}, this.Normalscreen =
				function() {
					var e = FindBut(
						"action",
						"fullscreen"
						);
					e && e.Off(),
						Resize(),
						clearInterval(o
							.toolbarInterval
							),
						ShowOrHide()
				}, this.onEnded =
				function() {
					for (var e in b) b
						.hasOwnProperty(
							e) &&
						"play" == b[e]
						.g("action") &&
						b[e]
						.ReplayIcon()
				}, this.Review =
				function() {
					ShowOrHide()
				}, this.Mouse =
				function(e, t, n) {
					var s = !1,
						a = b[e],
						r = a.g(
							"action"),
						l = a.s(
							"linkurl");
					if ("over" == t) {
						if (o
							.hidden_volume &&
							("volume" ==
								r ||
								"mute" ==
								r ||
								"unmute" ==
								r) && (o
								.hidden_volume_over = !
								0, o
								.hidden_volume_over_process = !
								0, s = !
								0,
								ShowOrHide(),
								1 == v
								.control_line
								.hideonvolume
								)) {
							var d =
								FindBut(
									"action",
									"line"
									);
							d && hide2(d
								.c()
								)
						}
						settings && 1 ==
							v.settings
							.showovercontrol &&
							("settings" ==
								r ||
								0 == l
								.indexOf(
									"setting"
									) ||
								0 == l
								.indexOf(
									"settings:"
									)
								) && (
								clearTimeout(
									o
									.settingsovertimer
									),
								settings
								.g(
									"show") &&
								_lastactbut ==
								a || (
									Action(
										a,
										t
										),
									o
									.overopentimeout =
									r +
									l,
									setTimeout(
										function() {
											o.overopentimeout =
												null
										},
										500
										)
									)),
							playlist &&
							1 == v
							.playlist
							.showovercontrol &&
							"playlist" ==
							r && (
								clearTimeout(
									o
									.playlistovertimer
									),
								playlist
								.g(
									"show") &&
								_lastactbut ==
								a || (
									Action(
										a,
										t
										),
									o
									.overopentimeout =
									r,
									setTimeout(
										function() {
											o.overopentimeout =
												null
										},
										500
										)
									))
					}
					"out" == t && (o
							.hidden_volume &&
							("volume" ==
								r ||
								"mute" ==
								r ||
								"unmute" ==
								r) && (o
								.hidden_volume_over = !
								1, o
								.hidden_volume_over_process = !
								0,
								setTimeout(
									function() {
										if (!
											o
											.hidden_volume_over
											)
											for (
												var e in
													o
													.hidden_volume_over_process = !
													1,
													b
												)
												b
												.hasOwnProperty(
													e
													) &&
												("volume" ==
													b[
														e]
													.g(
														"action") &&
													(HideControl(
															b[
																e]
															),
														Resize()
														),
													"line" ==
													b[
														e]
													.g(
														"action") &&
													1 ==
													v
													.control_line
													.hideonvolume &&
													show2(
														b[
															e]
														.c()
														)
													)
									},
									500)
								), 1 ==
							v.settings
							.showovercontrol &&
							("settings" ==
								r ||
								0 == l
								.indexOf(
									"setting"
									) ||
								0 == l
								.indexOf(
									"settings:"
									)
								) && (
								clearTimeout(
									o
									.settingsovertimer
									), o
								.settingsovertimer =
								setTimeout(
									function() {
										o.mouseDown ||
											SettingsClose(
												1
												)
									}, v
									.settings
									.showoverto >
									0 ?
									1e3 *
									v
									.settings
									.showoverto :
									1e3)
								),
							playlist &&
							1 == v
							.playlist
							.showovercontrol &&
							"playlist" ==
							r && (
								clearTimeout(
									o
									.playlistovertimer
									), o
								.playlistovertimer =
								setTimeout(
									function() {
										!
										o.mouseDown &&
											playlist
											.g(
												"show") &&
											playlist
											.hide(
												1
												)
									}, v
									.playlist
									.showoverto >
									0 ?
									1e3 *
									v
									.playlist
									.showoverto :
									1e3)
								)), s &&
						setTimeout(
							Resize, 10)
				}, this.StageLeave =
				function() {
					!o.volumewheel || o
						.fullscreen || o
						.fullscreen_process ||
						(o.actions
							.volumewheel(
								!1), o
							.volumewheel = !
							1), o
						.poster && v
						.poster_aover >
						-1 && isVisible(
							o.poster) &&
						css(o.poster, {
							opacity: v
								.poster_a
						}), o.play &&
						1 == v
						.playonhover &&
						0 != v
						.pauseonhover &&
						o.actions
						.Pause(), v
						.toolbar
						.hideleavetimeout >
						0 ? (
							clearTimeout(
								o
								.leavetimeout
								), o
							.leavetimeout =
							setTimeout(
								ShowOrHide,
								1e3 * v
								.toolbar
								.hideleavetimeout
								)) :
						ShowOrHide()
				}, this.StageOver =
				function() {
					o.poster && v
						.poster_aover >
						-1 && isVisible(
							o.poster) &&
						css(o.poster, {
							opacity: v
								.poster_aover
						}), o.play ||
						1 != v
						.playonhover ||
						o.actions
					.Play(),
						ShowOrHide(),
						ToolbarDown(!1)
				}, this.StageMove =
				function(e, t) {
					var o;
					for (var n in b) b
						.hasOwnProperty(
							n) && (
							"line" == (
								o = b[n]
								.g(
									"action")
								) ||
							"volume" ==
							o) && b[n]
						.StageMove(e, t)
				}, this.StageMove2 =
				function() {
					1 == v.toolbar
						.hide && (1 != v
							.toolbar
							.hidejustfull ||
							o.fullscreen
							) && ((!o
								.mouseHere ||
								o.system
								.mobile
								) &&
							"playing" ==
							o.media
							.status() &&
							(o.mouseHere = !
								0,
								ShowOrHide(),
								o.system
								.mobile &&
								setTimeout(
									function() {
										o.mouseHere = !
											1
									},
									500)
								), 1 ==
							v.toolbar
							.hidewithoutmoving &&
							(ShowForce(),
								HideInterval()
								),
							ToolbarDown(
								!1))
				}, this.StageMouseUp =
				function(e, t) {
					for (var o in b) b
						.hasOwnProperty(
							o) && (
							"line" == b[
								o].g(
								"action"
								) ||
							"volume" ==
							b[o].g(
								"action"
								)) && b[
							o]
						.StageMouseUp(e,
							t)
				}, this.Played =
				function(e, t) {
					for (var o in b) b
						.hasOwnProperty(
							o) && (
							"line" == b[
								o].g(
								"action"
								) && b[
								o]
							.UpdatePlay(
								e, t),
							"time" == b[
								o].g(
								"action"
								) &&
							UpdateTime(
								b[o], e,
								t), 1 ==
							b[o].s(
								"rotateplaying"
								) && b[
								o]
							.Rotate(),
							1 == b[o].s(
								"often"
								) && (!
								b[o].g(
									"show"
									) &&
								toolbarHidden ||
								b[o].g(
									"show"
									) ==
								HideProof(
									b[o]
									) &&
								ShowOrHide()
								))
				}, this.Loaded =
				function(e, t) {
					var o = FindBut(
						"action",
						"line");
					o && o.UpdateLoad(e,
						t)
				}, this.Cut = function(
					e) {
					if (o.media
						.duration() > 0
						) {
						var t = FindBut(
							"action",
							"line");
						t && t.Cut(e)
					}
				}, this.Waiting =
				function() {
					waiting || (1 == v
						.hidevideo ?
						(clearTimeout(
								wait_to
								),
							wait_to =
							setTimeout(
								Waiting,
								500)
							) :
						Waiting())
				}, this.HideElement =
				function(e) {
					for (var t in b)
						t == e && b[t]
						.set("hide2")
				}, this.StopWaiting =
				function(e, t) {
					if (clearTimeout(
							wait_to),
						waiting) {
						js("buffered");
						var o = FindBut(
							"action",
							"buffer"
							);
						o && (o.BufferStop(),
							waiting = !
							1)
					}
				}, this.volumescroll =
				function() {
					var e = FindBut(
						"linkurl",
						"volume scroll"
						);
					e && (e.set(
						"show2"), e
						.UpdateText(
							Lang(
								"volume"
								) +
							" " + (o
								.muted ?
								0 :
								Math
								.ceil(
									100 *
									v
									.volume
									)
								) +
							"%"),
						clearTimeout(
							o
							.volumescroll
							), o
						.volumescroll =
						setTimeout(
							Volumescrolled,
							1e3))
				}, this.Seek = function(
					e, t) {
					for (var o in v
							.delete >
							0 && (e -= v
								.delete,
								t -= v
								.delete
								), b) b
						.hasOwnProperty(
							o) && (
							"line" == b[
								o].g(
								"action"
								) && (
								t > 0 &&
								b[o]
								.set(
									"click",
									e /
									t),
								b[o]
								.UpdatePlaySeek()
								),
							"time" == b[
								o].g(
								"action"
								) &&
							UpdateTime(
								b[o], e,
								t),
							"live" == b[
								o].g(
								"action"
								) && (b[
									o]
								.set(
									"iconopacity",
									.5),
								b[o]
								.set(
									"saturate",
									0)))
				}, this.Duration =
				function(e, t) {
					for (var o in b) b
						.hasOwnProperty(
							o) && (
							"duration" ==
							b[o].g(
								"action"
								) && (v
								.delete >
								0 && (
									t -=
									v
									.delete
									),
								b[o]
								.UpdateText(
									Time(
										t
										)
									)),
							"line" == b[
								o].g(
								"action"
								) && (b[
									o]
								.UpdatePlay(
									e, t
									),
								b[o]
								.PlacePoints(
									t)),
							"time" == b[
								o].g(
								"action"
								) &&
							UpdateTime(
								b[o], e,
								t))
				}, this.Settings =
				function() {
					settings.g("show") ?
						settings
					.hide() : settings
						.show()
				}, this
				.SettingsVisible =
				function() {
					return !!settings &&
						!!settings.g(
							"show")
				}, this.MenuProc =
				function(e) {
					settings && settings
						.menuproc(e)
				}, this.SettingsClose =
				function() {
					SettingsClose()
				}, this.SettingsTimer =
				function(e) {
					settings && settings
						.UpdateTimer(e)
				}, this.SettingsSpeed =
				function() {
					settings && settings
						.UpdateSpeed()
				}, this.SettingsExist =
				function(e) {
					if (settings)
					return settings
						.Exist(e)
				}, this.Playlist =
				function() {
					playlist && (
						playlist.g(
							"show"
							) ?
						playlist
						.hide(1) :
						playlist
						.show())
				}, this.PlaylistShow =
				function() {
					playlist &&
						setTimeout(
							function() {
								playlist
									.show()
							}, 100)
				}, this
				.PlaylistVisible =
				function() {
					return !!playlist &&
						!!playlist.g(
							"show")
				}, this.PlaylistG =
				function(e) {
					return playlist ?
						playlist.g(e) :
						""
				}, this.UpdatePlaylist =
				function(e) {
					playlist && playlist
						.updatePlaylist(
							e)
				}, this.PreNewPl =
				function(e) {
					playlist && playlist
						.prenewpl(e)
				}, this.PlaylistNext =
				function() {
					playlist && playlist
						.PlaylistNext()
				}, this.PlaylistHere =
				function() {
					playlist && playlist
						.PlaylistHere()
				}, this
				.PlaylistControls =
				function() {
					PlaylistControls()
				}, this
				.PlaylistNextExist =
				function() {
					return !!playlist &&
						playlist
						.PlaylistNextExist()
				}, this
				.PlaylistPrevExist =
				function() {
					return !!playlist &&
						playlist
						.PlaylistPrevExist()
				}, this.PlaylistExist =
				function() {
					return !!playlist &&
						playlist
						.PlaylistExist()
				}, this.PlaylistRewind =
				function() {
					playlist && playlist
						.PlaylistRewind()
				}, this.PlaylistPrev =
				function() {
					playlist && playlist
						.PlaylistPrev()
				}, this.PlaylistPlayId =
				function(e) {
					e && playlist &&
						playlist
						.playById(e)
				}, this.PlaylistOpenId =
				function(e) {
					e && playlist &&
						playlist
						.openById(e)
				}, this.PlaylistMove =
				function(e) {
					e && playlist && (
						css(playlist
							.co(), {
								maxHeight: "none",
								"padding-right": playlist
									.s(
										"bgpaddingright")
							}),
						document
						.getElementById(
							e)
						.appendChild(
							playlist
							.co()),
						hide2(
							playlist
							.c()))
				}, this
				.ShowSettingsBut =
				function() {}, this
				.QualityChanged =
				function(e) {
					settings && (
						settings
						.SetQuality(),
						settings.g(
							"show"
							) &&
						setTimeout(
							function() {
								settings
									.hide()
							}, 200))
				}, this
				.QualityChangedNoHand =
				function() {
					settings && settings
						.SetQuality(), o
						.settings2 && o
						.settings2
						.update()
				}, this.AirplayChanged =
				function(e) {
					settings && settings
						.Airplay(),
						Resize(),
						ShowOrHide()
				}, this.SettingChanged =
				function(e) {
					settings && (
							settings
							.SetSetting(
								e),
							settings.g(
								"show"
								) &&
							settings
							.hide()), o
						.settings2 && o
						.settings2
						.update(),
						"speed" == e &&
						SpeedChanged()
				}, this
				.AudioTrackChangedNoHand =
				function(e) {
					settings && settings
						.SetSetting(
							"audiotrack"
							), o
						.settings2 && o
						.settings2
						.update()
				}, this
				.SubtitleChanged =
				function() {
					settings && (
							settings
							.SetSubtitle(),
							settings.g(
								"show"
								) &&
							setTimeout(
								function() {
									settings
										.hide()
								}, 200)
							), o
						.settings2 && o
						.settings2
						.update(), o
						.casting && o
						.tagvideo && o
						.chromecast
						.Sub()
				}, this.SubOpt =
				function() {
					o.settings2 && o
						.settings2
						.hide(),
						settings &&
						settings
						.SubOpt()
				}, this.SettingsN =
				function(e, t, o) {
					for (var n in b) b
						.hasOwnProperty(
							n) && (
							"settings" ==
							b[n].g(
								"action"
								) &&
							1 == b[n].s(
								"hdicon"
								) && b[
								n]
							.HdIcon(),
							b[n].g(
								"action_settings"
								) ==
							"settings#" +
							e && (b[n]
								.set(
									"set#visible",
									t),
								"text" ==
								b[n].g(
									"type"
									) ?
								o && b[
									n]
								.UpdateText(
									NoSpan(
										o
										)
									) :
								("subtitle" ==
									v
									.settings[
										"settings" +
										e +
										"action"
										] &&
									(o ==
										Lang(
											"off"
											) ?
										b[
											n]
										.CustomSwitch(
											0
											) :
										b[
											n]
										.CustomSwitch(
											1
											)
										),
									Resize()
									),
								ShowOrHideProcessor(
									b[n]
									)))
				}, this.UpdateSettings =
				function() {
					settings && (
						settings
						.SetQuality(),
						settings
						.SetSetting(
							"audiotrack"
							),
						settings
						.SetSetting(
							"download"
							))
				}, this.RenewPoints =
				function() {
					var e = FindBut(
						"action",
						"line");
					e && e.RenewPoints()
				}, this.resize =
				function() {
					Resize(),
						toolbarHidden &&
						(o.resizeonmouse = !
							0)
				}, this.resizeFromText =
				function(e) {
					toolbarHidden &&
						1 != e ? v
						.toolbar
						.resizeme = !0 :
						(Resize(),
							ShowOrHide()
							)
				}, this.refresh =
				function() {
					ShowOrHide(),
						Resize(),
						ShowOrHide(), o
						.nativecontrols ?
						hide2(bg2) :
						toolbarHidden ||
						show2(bg2)
				}, this.KeyDown =
				function(e) {
					if (pljssglobalid ==
						v.id && 1 == v
						.hotkey.on) {
						var t = e.which,
							n = !1;
						if (void 0 ==
							t && (t = e
								.keyCode
								),
							exist(o
								.vast) ||
							exist(o
								.pass) ||
							1 == o
							.stopkeys)
							return !1;
						if (o.play &&
							1 == v
							.hotkey
							.onplay && (
								n = !0),
							(1 == v
								.hotkey
								.space &&
								32 ==
								t ||
								1 == v
								.hotkey
								.enter &&
								13 == t
								) && (o
								.focus ||
								o
								.mouseHere ||
								n))
							return 1 ==
								v.hotkey
								.icons &&
								PluginHotIcon(
									"play",
									o
									.play ?
									0 :
									1),
								o
								.actions
								.Toggle(),
								e
								.preventDefault(),
								!1;
						if (v.hotkey
							.vol || (v
								.hotkey
								.vol =
								.2), v
							.hotkey
							.scale || (v
								.hotkey
								.scale =
								5), 1 ==
							v.hotkey
							.nums && (o
								.focus ||
								n) && o
							.media
							.duration() >
							0)
							for (var s =
									48; s <
								58; s++)
								t ==
								s && o
								.actions
								.Seek(o
									.media
									.duration() *
									(t -
										48) *
									10 /
									100,
									!0);
						39 == t && (o
								.focus ||
								n) &&
							KeyPlusUp(v
								.hotkey
								.leftright
								), 37 ==
							t && (o
								.focus ||
								n) &&
							KeyPlusDown(
								v.hotkey
								.leftright
								), 38 ==
							t && (o
								.focus ||
								n) &&
							KeyPlusUp(v
								.hotkey
								.updown
								), 40 ==
							t && (o
								.focus ||
								n) &&
							KeyPlusDown(
								v.hotkey
								.updown
								),
							187 == t &&
							(o.focus ||
								n) &&
							KeyPlusUp(v
								.hotkey
								.plusminus
								),
							189 == t &&
							(o.focus ||
								n) &&
							KeyPlusDown(
								v.hotkey
								.plusminus
								)
					}
				}, this.KeyUp =
				function(e) {
					if (pljssglobalid ==
						v.id) {
						var t = e.which;
						if (void 0 ==
							t && (t = e
								.keyCode
								), 57 ==
							t && v.log,
							o
							.fullscreen &&
							27 == t && o
							.actions
							.Normalscreen(),
							exist(o
								.vast) ||
							exist(o
								.pass))
							return !1;
						1 == v.hotkey
							.f && 70 ==
							t && 1 != v
							.hidevideo &&
							(o.focus ||
								o
								.mouseHere
								) && (
								1 == v
								.hotkey
								.icons &&
								PluginHotIcon(
									"fullscreen",
									o
									.fullscreen ?
									0 :
									1),
								o
								.fullscreen ?
								o
								.actions
								.Normalscreen() :
								o
								.actions
								.Fullscreen()
								), 1 ==
							v.hotkey
							.m && 77 ==
							t && (o
								.focus ||
								o
								.mouseHere
								) && (
								1 == v
								.hotkey
								.icons &&
								PluginHotIcon(
									"mute",
									o
									.muted ?
									1 :
									0),
								o
								.muted ?
								o
								.actions
								.Unmute() :
								o
								.actions
								.Mute())
					}
				}, this.Remove =
				function() {
					for (var e in
							clearInterval(
								o
								.toolbarInterval
								), o)
						0 == e.indexOf(
							"control"
							) && e
						.indexOf(
							"Interval"
							) > -1 &&
						clearInterval(o[
							e]);
					for (var t = 0; t <
						butNames
						.length; t++) b[
							key =
							butNames[t]
							] && b[key]
						.Remove();
					settings && settings
						.Remove(),
						playlist &&
						playlist
						.Remove(), bg
						.Remove(), bg2
						.parentNode == o
						.frame ? o.frame
						.removeChild(
							bg2) : o
						.toolbar && o
						.toolbar
						.removeChild(
							bg2)
				}, this.ShowForce =
				function() {
					ShowForce()
				}, this.HideForce =
				function() {
					HideForce(),
						ShowOrHide()
				}, this.HideInterval =
				function() {
					HideInterval()
				}, this.ToolbarHidden =
				function() {
					return toolbarHidden
				}
		},
		Control = function(e) {
			var t = [],
				n = 0,
				s = 0,
				a = !0,
				r = !1,
				l = 1,
				d = 1,
				c = "",
				u = !1,
				$ = !1,
				f = 0,
				p = 0,
				_ = 0,
				h = 0,
				g = !1,
				m = !1,
				b = !1,
				y = !1;
			t = UpdateObject(t,
				default_style.but);
			var w = [(t = UpdateObject(
					t, v[e]))
				.action];
			N = w[0], exist(t
				.action2) && (w[1] = t
					.action2), exist(t
					.opposite) && (w[
					1] = t.opposite),
				exist(t.title) && (t
					.text = t.title),
				exist2(t.scalesmall) &&
				o.small && (t.scale = t
					.scalesmall),
				"share" == N && (o
					.shareme = !0),
				exist(t.linkurl) && (
					"text" == t.type &&
					"" != t.linkurl &&
					exist(v[t.linkurl +
						"text"]) && (t
						.text = v[t
							.linkurl +
							"text"]),
					0 == t.linkurl
					.indexOf(
						"settings#") &&
					(c = t.linkurl,
						"" == t
						.tiptext && -
						1 == c.indexOf(
							",") && (t
							.tiptext =
							Lang(v
								.settings[
									"settings" +
									c
									.substr(
										9
										) +
									"action"
									]))
						), t.linkurl
					.indexOf(
					"captions") > -1 &&
					(v.hlscaptions = !
					0), t.linkurl
					.indexOf("share:") >
					-1 && (o.shareme = !
						0),
					"countdown" == t
					.linkurl && (t
						.counter =
						new PluginCountdown(
							t)));
			var k = t.tiptext ? t
				.tiptext.split("///") :
				[];
			1 == t.liketext && (t.type =
				"text", t.text = e5(
					0) + (w.length >
					1 ? "///" + e5(
						1) : ""),
				exist2(t
				.iconscolor) && (t
					.color = t
					.iconscolor));
			var O = 0,
				C = [],
				L = [],
				S = [],
				T = 0;
			if ("text" == t.type) {
				if (t.dom && exist(v[t
						.dom +
						"text"]) && (t
						.text = v[t
							.dom +
							"text"]),
					exist(t.text)) {
					C[0] = trim(t.text),
						t.lngth = t.text
						.length;
					var E = ["/", "|",
						"-"
					];
					E.indexOf(t.text
							.substr(-1)
							) > -1 && (t
							.postsmbl =
							t.text
							.substr(-1)
							), E
						.indexOf(t.text
							.substr(0,
								1)) > -
						1 && (t
							.presmbl = t
							.text
							.substr(0,
								1)), (
							"time" ==
							N ||
							"duration" ==
							N) && (0 ==
							t.text
							.indexOf(
								"0:") &&
							(t.timeshort = !
								0), 3 ==
							t.text
							.split(":")
							.length ? t
							.with_hours = !
							0 : t.text
							.indexOf(
								"00:00"
								) > -
							1 && (t
								.with_min = !
								0), 1 ==
							t.dvrtime &&
							(v.dvrtime =
								1)),
						1 == t
						.inversetime &&
						0 == t.text
						.indexOf("-") &&
						(t.minus4back = !
							0), t.text
						.indexOf(
						"///") > 0 && (
							"custom" ==
							N || 1 == t
							.liketext
							) && (t
							.texts = t
							.text.split(
								"///"),
							t.text = C[
								0] = t
							.texts[0])
				}
				1 == v.fonts && (
					setTimeout(e3,
						100),
					setTimeout(e3,
						500),
					setTimeout(e3,
						1e3))
			} else exist(t.icon) && (C[
					0] = t.icon, C[
					0].indexOf(
					"///") > 0 && -
				1 == C[0].indexOf(
					"base64") && (
					C = t.icon
					.split("///")),
				exist(t.icon2) && (
					C[1] = t.icon2),
				1 == t
				.iconsreplay &&
				exist2(t.icon3) && (
					C.push(t.icon3),
					T = C.length - 1
					));
			"custom" == N && 1 == t
				.link2 && exist(t
					.linkurl2) && (t
					.linkurl0 = t
					.linkurl);
			var P = createElement(
			"div");
			"timeline" == t.position ? o
				.timeline.appendChild(
				P) : (t.position
					.indexOf(
					"controls") > -1 &&
					1 == v.toolbar
					.hide && 1 == v
					.toolbar.hidedown ?
					o.toolbar
					.appendChild(P) : o
					.frame.appendChild(
						P), "buffer" ==
					N && 1 == t
					.ontop2 && (P.style
						.zIndex = 2001)
					);
			var A = createElement(
			"div");
			if (P.appendChild(A), css(
				P, {
					position: "absolute",
					left: 0,
					top: 0,
					opacity: 1,
					fontSize: "14px",
					lineHeight: "1em",
					zIndex: 2
				}), exist2(t.dom) &&
				attr(P, {
					id: v.id +
						"_control_" +
						t.dom
				}), 1 == t
				.rotateplaying && css(
				P, {
					transition: "transform 0.2s linear"
				}), C.length > 0) {
				for (z = 0; z < C
					.length; z++) {
					if (L[z] =
						createElement(
							"div"), css(
							L[z], {
								position: "absolute",
								top: 0,
								left: 0,
								pointerEvents: "none",
								opacity: t
									.a,
								transition: "opacity 0.1s linear,transform 0.1s linear"
							}), "pic" ==
						t.type && "" !=
						t.src && (
							exist2(t
								.dom) &&
							(attr(L[z], {
									id: v
										.id +
										"_control_" +
										t
										.dom +
										"_icon"
								}), v[t
									.dom +
									"src"
									] &&
								(t.src =
									v[t.dom +
										"src"
										]
									)),
							t.src
							.indexOf(
								".png"
								) > -
							1 || t.src
							.indexOf(
								".jpg"
								) > -
							1 || t.src
							.indexOf(
								".gif"
								) > -
							1 || t.src
							.indexOf(
								"base64"
								) > -1)
						) {
						-1 == t.src
							.indexOf(
								"//") &&
							-1 == t.src
							.indexOf(
								"base64"
								) && (t
								.src =
								"//" + t
								.src);
						var z, I, q, V,
							A, M, H, D,
							j, R, N, F,
							B, W, U, Y,
							X, Q, G =
							createElement(
								"img");
						t.loading = 1, G
							.addEventListener(
								"load",
								eb), G
							.src = t
							.src, L[z]
							.appendChild(
								G), t
							.w = L[z]
							.offsetWidth,
							t.h = L[z]
							.offsetHeight,
							t
							.picheight >
							0 && css(
							G, {
								height: t
									.picheight
							})
					}
					"text" == t.type &&
						(css(L[z], {
								color: t
									.color,
								fontSize: t
									.fontsize *
									existv(
										v
										.globalfs,
										1
										),
								fontFamily: checkFont(
									t
									.font
									),
								"letter-spacing": t
									.letterspacing +
									"px",
								padding: "0 3px 0 3px",
								"white-space": "nowrap"
							}), o
							.small &&
							exist2(t
								.fontsizesmall
								) &&
							css(L[z], {
								fontSize: t
									.fontsizesmall *
									existv(
										v
										.globalfs,
										1
										)
							}), 1 == t
							.click && (t
								.text
								.indexOf(
									"<a "
									) >
								-1 ||
								"control_title" ==
								e) &&
							css(L[z], {
								pointerEvents: "auto"
							}), 1 == t
							.bold &&
							css(L[z], {
								"font-weight": "bold"
							}),
							"live" == C[
								z] && (
								C[z] =
								Lang(
									"live"
									)),
							L[z]
							.innerHTML =
							eO(C[z]),
							setTimeout(
								ev, 100
								), t.w =
							L[z]
							.offsetWidth,
							t.h = L[z]
							.offsetHeight,
							exist2(t
								.dom) &&
							attr(L[z], {
								id: v
									.id +
									"_control_" +
									t
									.dom +
									"_text"
							})),
						"css" == t
						.type &&
						controlCSS(C[z],
							t.color, L[
								z]);
					var Z = C[z]
						.toString();
					0 == Z.indexOf(
						"var:") && (
						Z = existv(
							window[Z
								.substr(
									4
									)
								],
							""));
					var K = Z.indexOf(
							"<svg") > -
						1 || Z.indexOf(
							"<SVG") > -
						1;
					"svg" == t.type && (
							Z.indexOf(
								"<g>") >
							-1 || K) &&
						(("mute" == N ||
								"custom" ==
								N) && (
								Z = Z
								.replace(
									/pjs_/g,
									"pjs_" +
									v
									.id +
									e)),
							Z.indexOf(
								"pointer"
								) > -
							1 && es(L[
								z]), L[
								z]
							.innerHTML =
							(K ? "" :
								"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>"
								) + Z +
							(K ? "" :
								"</svg>"
								), L[z]
							.offsetWidth >
							20 && (t.w =
								L[z]
								.offsetWidth
								), L[z]
							.offsetHeight >
							20 && (t.h =
								L[z]
								.offsetHeight
								), css(
								L[z], {
									width: t
										.w,
									height: t
										.h
								}), -
							1 != t
							.iconscolor &&
							eC(L, t
								.iconscolor
								),
							exist2(t
								.dom) &&
							attr(L[z], {
								id: v
									.id +
									"_control_" +
									t
									.dom +
									"_icon" +
									z
							})), P
						.appendChild(L[
							z]), z >
						0 && hide(L[z])
				}
				if (ed(), X && eb(),
					"chromecast" == t
					.linkurl ? (t
						.chromecast = 1,
						t.hide = 1, o
						.chromecast && (
							L[0]
							.innerHTML =
							o.chromecast
							.button(-
								1 != t
								.iconscolor ?
								t
								.iconscolor :
								"#ffffff"
								)), o
						.system.mobile ?
						(L[0]
							.ontouchstart =
							er, L[0]
							.ontouchend =
							e$, L[0]
							.ontouchmove =
							ea) : (L[0]
							.onmouseover =
							eu, L[0]
							.onmouseout =
							e$, L[0]
							.onmousemove =
							e8)) : (V
						.offsetWidth * t
						.scale < 35 || V
						.offsetHeight *
						t.scale < 35) &&
					"text" != t.type ? (
						en(), es(M)) :
					es(V), "custom" == N
					) {
					if (1 == t.link &&
						exist(t.linkurl)
						) {
						var J = t
							.linkurl;
						if (0 == J
							.indexOf(
								"api:")
							) {
							var ee = J
								.substr(
									4)
								.split(
									","
									);
							if (2 == ee
								.length
								) {
								var et =
									ee[
										1]
									.split(
										"/"
										);
								2 == et
									.length &&
									("hd" ==
										ee[
											0] &&
										(ee[0] =
											"default_quality"
											),
										v[ee[
											0]] ==
										et[
											1] &&
										(t.a =
											1,
											css(L[
												0], {
												opacity: t
													.a
											})
											)
										)
							}
						}("unblock" ==
							J ||
							"block" == J
							) && (o
							.actions
							.Curtain(),
							P.style
							.zIndex =
							2001, o
							.stopkeys =
							1)
					}(1 == t.hide && (
							1 == t
							.hideafter ||
							1 == t
							.hidebefore
							) ||
						"skip" == J) &&
					(t.often = 1)
				}
				"settings" == N && 1 ==
					t.hdicon && (Y =
						new PluginHdIcon(
							P, V, t)),
					0 == t.click &&
					Pnt0(P), 1 == t
					.loading && hide(V),
					1 == t.tip && ew(),
					t.position.indexOf(
						"right") > -1 &&
					(p = 1), t.position
					.indexOf("top") > -
					1 && (_ = 1), (t
						.position
						.indexOf(
							"bottom") >
						-1 || t.position
						.indexOf(
							"control") >
						-1) && (h = 1),
					ec();
				var ei = "";
				0 != t.rotation && (
						ei +=
						"rotate(" + t
						.rotation +
						"deg)"), 1 == t
					.flipx && (ei +=
						" scaleX(-1)"),
					1 == t.flipy && (
						ei +=
						" scaleY(-1)"),
					"" != ei && css(P, {
						transform: ei
					}), "buffer" == N &&
					e6();
				var ee = [];
				if ("playlist" == N)
					for (z = 0, ee = [
							"autoplaylist",
							"openplaylistafter",
							"openplaylistbefore",
							"openplaylistpause",
							"openplaylistroot",
							"playlistrewind"
						]; z < ee
						.length; z++)
						exist(t[ee[
						z]]) && !exist(v
							.playlist[
								ee[z]]
							) && (v
							.playlist[
								ee[z]] =
							t[ee[z]]);
				if ("title" == N)
					for (z = 0, ee = [
							"showtitleplaylist",
							"addtitleplaylist",
							"addtitleplaylistbr"
						]; z < ee
						.length; z++)
						exist(t[ee[
						z]]) && !exist(
							options[ee[
								z]]) &&
						(v[ee[z]] = t[
							ee[z]]);
				1 == t.tipalways &&
				ex(), "custom" == N &&
					0 == t.on && hide2(
						P), 1 == t
					.hide && t
					.hideuntilto > 0 &&
					setTimeout(eo, 1e3 *
						t.hideuntilto)
			}

			function eo() {
				t.hideuntilto = -1, o
					.controls.refresh()
			}

			function en() {
				M && M.parentNode
					.removeChild(M), M =
					createElement(
					"div"), css(M, {
						position: "absolute",
						top: 0,
						left: 0,
						width: "pic" ==
							t.type ?
							V
							.offsetWidth :
							(V.offsetWidth >
								35 ?
								V
								.offsetWidth :
								35
								) *
							t
							.clickscalex,
						height: "pic" ==
							t.type ?
							V
							.offsetHeight :
							(V.offsetHeight >
								35 ?
								V
								.offsetHeight :
								35
								) *
							t
							.clickscaley
					}), t =
					MarginPadding(t,
						"clickmargin",
						"clickmargin"),
					P.appendChild(M)
			}

			function es(e) {
				0 == N.indexOf(
					"time") && 1 == w
					.length && (t
						.click = 0),
					"custom" == N &&
					0 == t.link && (t
						.click = 0),
					1 == t.click ? (1 ==
						t.hand && css(
						e, {
							cursor: "pointer"
						}), css(e, {
							pointerEvents: "auto"
						}), o.system
						.mobile ? (e
							.addEventListener(
								"touchmove",
								function(
									e) {
									ea(e)
								}), e
							.addEventListener(
								"touchstart",
								function(
									e) {
									er(e)
								}), e
							.addEventListener(
								"touchend",
								function(
									e) {
									el(e)
								})) : e
						.onclick = ep, (
							1 == v
							.toolbar
							.clickarea ||
							1 == t
							.clickarea
							) && css(
						e, {
							"background-color": "#ff0000",
							opacity: .5
						})) : css(e, {
						cursor: "default"
					}), o.system
					.mobile || (e
						.onmouseover =
						eu, e
						.onmouseout = e$
						), (1 == t
						.hidden || 1 ==
						t.tip) && (e
						.onmousemove =
						e8)
			}

			function ea(t) {
				js("touch_" + e), t
					.stopPropagation(),
					$ = !0
			}

			function er(e) {
				1 == t.mobileover &&
					eu(), e
					.stopPropagation()
			}

			function el(e) {
				e.stopPropagation(), e
					.preventDefault(),
					1 == t.mobileover &&
					e$(), $ || ep(e),
					$ = !1
			}

			function ed() {
				if (V && V.parentNode
					.removeChild(V), V =
					createElement(
					"div"), css(V, {
						position: "absolute",
						top: 0,
						left: 0
					}), exist2(t.dom) &&
					attr(V, {
						id: v.id +
							"_control_" +
							t.dom +
							"_bg"
					}), I = t.w, q = t
					.h, t =
					MarginPadding(t,
						"margin",
						"margin"),
					"text" == (t =
						MarginPadding(t,
							"marginproc",
							"marginproc"
							)).type && (
						I = L[O]
						.offsetWidth,
						q = L[O]
						.offsetHeight, t
						.minw > 0 && I <
						t.minw && (I = t
							.minw)), t =
					MarginPadding(t,
						"bgpadding",
						"bgpadding"),
					t = MarginPadding(t,
						"iconmargin",
						"iconmargin"), o
					.system.safari && (t
						.iconmarginleft /=
						t.scale, t
						.iconmarginright /=
						t.scale, t
						.iconmargintop /=
						t.scale, t
						.iconmarginbottom /=
						t.scale),
					exist2(t.dom) &&
					exist(v.custom) &&
					"custom" == t
					.action &&
					"object" == typeof v
					.custom) {
					for (var e = 0; e <
						Object.keys(v
							.custom)
						.length; e++)
						if (v.custom[e][
								t.dom
							]) {
							if ("off" ==
								v
								.custom[
									e][t
									.dom
								]) t
								.on = 0;
							else {
								var n =
									v
									.custom[
										e
										]
									[t
										.dom]
									.split(
										":"
										);
								"margin-left" ==
								n[0] &&
									(n[1]
										.indexOf(
											"%"
											) >
										0 ?
										t
										.marginprocleft =
										parseInt(
											n[
												1]
											) :
										t
										.marginleft =
										parseInt(
											n[
												1]
											)
										)
							}
						}
				}
				t.h = q, t.w = I, 1 == t
					.bg ? (q = q + t
						.bgpaddingtop +
						t
						.bgpaddingbottom,
						I = I + t
						.bgpaddingleft +
						t
						.bgpaddingright,
						t.h = q, t.w =
						I, "text" == t
						.type && (t
							.bgh = L[0]
							.offsetHeight
							)) : t.bga =
					0, css(V, {
						width: 1 ==
							t
							.bgstretch ?
							5e3 : I,
						height: q,
						borderRadius: t
							.bgo *
							q / 2,
						background: t
							.bgcolor,
						opacity: t
							.bga,
						transition: "opacity .1s linear, background .1s linear, transform .1s linear"
					}), "pic" == t
					.type && css(V, {
						width: I,
						height: q,
						borderRadius: t
							.bgo *
							q / t
							.scale /
							2
					}), 1 == t
					.bglines && Bglines(
						V, t.bgcolor, t
						.bgline1, t
						.bgline2), 1 ==
					t.bgborder && css(
					V, {
						border: "1px solid " +
							t
							.bgbordercolor
					}), A.appendChild(V)
			}

			function ec() {
				if (css(V, {
						top: -V
							.offsetHeight /
							2,
						left: -V
							.offsetWidth /
							2
					}), M) {
					var e = "pic" == t
						.type ? V
						.offsetWidth : V
						.offsetWidth >
						35 ? V
						.offsetWidth :
						35;
					css(M, {
						top: -("pic" ==
								t
								.type ?
								V
								.offsetHeight :
								V
								.offsetHeight >
								35 ?
								V
								.offsetHeight :
								35
								) /
							2 +
							t
							.clickmargintop -
							t
							.clickmarginbottom,
						left: -
							e /
							2 +
							t
							.clickmarginleft -
							t
							.clickmarginright
					})
				}
				for (z = 0; z < C
					.length; z++)
					"svg" == t.type ?
					css(L[z], {
						top: -Math
							.round(
								parseInt(
									L[
										z]
									.style
									.height
									)
								) /
							2,
						left: -
							parseInt(
								L[z]
								.style
								.width
								) /
							2
					}) : css(L[z], {
						top: -Math
							.round(
								L[z]
								.offsetHeight
								) /
							2,
						left: -L[z]
							.offsetWidth /
							2
					}), V && css(L[z], {
						top: int(L[
									z]
								.style
								.top
								) +
							t
							.bgpaddingtop /
							2 - t
							.bgpaddingbottom /
							2 + t
							.iconmargintop /
							2 + t
							.iconmarginbottom /
							2,
						left: int(L[
									z]
								.style
								.left
								) +
							t
							.bgpaddingleft /
							2 - t
							.bgpaddingright /
							2 + t
							.iconmarginleft /
							2 + t
							.iconmarginright /
							2
					})
			}

			function eu() {
				var n;
				if (u = !0, 1 == t
					.iconsover && (n =
						W && exist(t
							.icon2) ?
						1 : 0, Q && S
						.length > 2 && (
							n = 2), S[
						n] && (em(),
							show(L[S[
								n]]))),
					1 == t.bg && (-1 !=
						t.bgaover &&
						css(V, {
							opacity: t
								.bgaover
						}), -1 != t
						.bgcolorover &&
						css(V, {
							background: t
								.bgcolorover
						})), t.aover > -
					1 && !r)
					for (n = 0; n < C
						.length; n++)
						"hidden" != L[n]
						.style
						.visibility &&
						css(L[n], {
							opacity: t
								.aover
						});
				if (-1 != t
					.iconscolorover &&
					eC(L, t
						.iconscolorover
						), 1 == t
					.rotateonhover && (
						f += 45, e1(L[
							0], f)), t
					.scaleover > t
					.scale && t
					.scaleover > -1 &&
					e0(t.scaleover),
					"settings" == N && o
					.controls
					.SettingsVisible());
				else if (1 == t.tip &&
					1 != t.tipalways) {
					var s = k.length >
						1 && !W ? k[1] :
						k[0];
					s && 0 == s.indexOf(
						"var:") && (
						j
						.innerHTML =
						window[s
							.substr(
								4)],
						ex()), show(
						H), css(H, {
						opacity: 1
					})
				}
				"mute" == N && (o
						.actions
						.volumewheel(!
						0), o
						.volumewheel = !
						0), o
					.controlover = !0, o
					.controls.Mouse(e,
						"over")
			}

			function e$() {
				var n;
				if (u = !1, 1 == t
					.iconsover && (n =
						W && exist(t
							.icon2) ?
						1 : 0, Q && S
						.length > 2 && (
							n = 2),
					em(), show(L[n])),
					1 == t.bg && (-1 !=
						t.bgaover &&
						css(V, {
							opacity: t
								.bga
						}), -1 != t
						.bgcolorover &&
						css(V, {
							background: t
								.bgcolor
						})), t.aover > -
					1)
					for (n = 0; n < C
						.length; n++)
						"hidden" != L[n]
						.style
						.visibility &&
						css(L[n], {
							opacity: t
								.a
						});
				t.scaleover > -1 && e0(t
						.scale), -1 != t
					.iconscolorover &&
					eC(L, -1 == t
						.iconscolor ?
						"#ffffff" : t
						.iconscolor),
					"mute" != N || o
					.fullscreen || (o
						.actions
						.volumewheel(!
						1), o
						.volumewheel = !
						1), ef(), o
					.controlover = !1, o
					.controls && o
					.controls.Mouse(e,
						"out")
			}

			function ef() {
				1 == t.tip && 1 != t
					.tipalways && (hide(
						H), css(H, {
						opacity: 0
					}))
			}

			function ep(n) {
				n && (n.cancelBubble = !
					0), g || (o
					.controls
					.ControlClick(
					e), "custom" ==
					N && e_(), ef(),
					1 == t
					.rotateonclick &&
					(f += 45, e1(L[
							0],
						f)), b = !0,
					(1 == t
						.hideafterclick ||
						"control_start" ==
						e && 1 == t
						.hide &&
						1 == t
						.hideonplay
						) && o
					.controls
					.refresh())
			}

			function e_() {
				C && (C.length > 1 && (!
							0 == W ? (
								show(L[
									0]),
								hide(L[
									1])
								) : (
								show(L[
									1]),
								hide(L[
									0]))
							), 1 == t
						.tip && k
						.length > 1 && (
							j
							.innerHTML =
							o.ni + (!
								0 == W ?
								k[0] :
								k[1]) +
							o.ni2, ex())
						), exist(t
						.linkurl0) && (!
						0 == W ? t
						.linkurl = t
						.linkurl0 : t
						.linkurl = t
						.linkurl2),
				eh(), W = !0 != W, t
					.linkurl && t
					.linkurl.indexOf(
						",0/1") > -1 &&
					js(t.linkurl, W ?
						1 : 0), 1 == t
					.bg && exist(t
						.bgcolorlink2
						) && -1 != t
					.bgcolorlink2 && (
						W ? (t
							.bgcolorlink0 =
							t.bgcolor, t
							.bgcolor = t
							.bgcolorlink2
							) : t
						.bgcolor = t
						.bgcolorlink0,
						ed(), es(V),
						ec(), "text" ==
						t.type ? e3() :
						e0(t.scale))
			}

			function eh() {
				exist(t.texts) && t
					.texts.length > 1 &&
					(!0 == W ? e7(t
							.texts[0]) :
						e7(t.texts[1]))
			}

			function eg(t) {
				t.cancelBubble = !0, o
					.controls
					.ControlClick(e)
			}

			function em() {
				for (var e = 0; e < C
					.length; e++)
					"hidden" != L[e]
					.style.visibility &&
					(css(L[e], {
						opacity: t
							.a
					}), hide(L[e]))
			}

			function ev(e) {
				L[0] && L[0]
					.offsetWidth > o
					.screen_w - t
					.marginleft - t
					.marginright - t
					.bgpaddingleft - t
					.bgpaddingright && (
						1 == t.marquee ?
						(e || (e = L[0]
								.innerHTML
								), L[0]
							.innerHTML =
							"<marquee>" +
							e +
							"</marquee>"
							) : css(L[
							0], {
								"white-space": "normal"
							}), css(L[
							0], {
								width: o
									.screen_w -
									t
									.marginleft -
									t
									.marginright -
									t
									.bgpaddingleft -
									t
									.bgpaddingright
							}))
			}

			function eb() {
				V ? (X = !1, t.loading =
						0, hide(V), L[
						0] && (t.w = L[
								0]
							.offsetWidth *
							t.scale, t
							.h = L[0]
							.offsetHeight *
							t.scale, e0(
								t.scale)
							), t
						.loaded = 0,
						ed(), en(), es(
							M), show(V),
						ec(), o.controls
						.resize(),
						isVisible(P) ||
						hide2(P)) :
					X = !0
			}

			function ey(e) {
				e.cancelBubble = !0
			}

			function e8() {
				o.system.mobile || o
					.controlover ||
				eu(), ex()
			}

			function e0(e) {
				if (e > 0) {
					for (o.system
						.safari && 1 !=
						t.tipalways ?
						css(V, {
							zoom: e +
								""
						}) : css(V, {
							transform: "scale(" +
								e +
								")"
						}), z = 0; z < C
						.length; z++) o
						.system
						.safari && 1 !=
						t.tipalways ? (
							css(L[z], {
								zoom: e +
									""
							}), m = !0
							) : css(L[
							z], {
								transform: "scale(" +
									e +
									")"
							});
					l = e, d = e
				}
			}

			function ew() {
				if (H = createElement(
						"div"), css(H, {
						position: "absolute",
						left: 0,
						top: 0,
						height: "auto",
						opacity: 0,
						transition: "opacity 0.1s linear"
					}), D =
					createElement(
					"div"), t =
					MarginPadding(t,
						"tippadding",
						"tippadding"),
					t = MarginPadding(t,
						"tipmargin",
						"tipmargin"),
					css(D, {
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: 30,
						"background-color": t
							.tipbgcolor,
						opacity: t
							.tipbga,
						"border-radius": t
							.tipbgrounding
					}), j =
					createElement(
					"div"), css(j, {
						position: "absolute",
						left: t
							.tippaddingleft,
						top: t
							.tippaddingtop,
						color: t
							.tipcolor,
						"font-family": checkFont(
							t
							.tipfont
							),
						"font-size": t
							.tipfontsize *
							existv(v
								.globalfs,
								1),
						"letter-spacing": t
							.tipletterspacing +
							"px",
						"line-height": "1"
					}), t.tiptext &&
					0 == t.tiptext
					.indexOf("var:") &&
					(t.tipvar = !0), t
					.tipvar || css(j, {
						"white-space": "nowrap"
					}), 1 == t
					.tippointer && ((R =
							createElement(
								"div"))
						.innerHTML =
						'<svg width="8px" height="6px" viewBox="0 0 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon id="Rectangle" stroke="none" fill="#' +
						t.tipbgcolor
						.replace("#",
							"") +
						'" fill-rule="evenodd" points="0 0 8 0 4 6"></polygon></svg>'
						), 1 == t
					.tipalways ? (css(
					H, {
						opacity: 1
					}), es(H)) : Pnt0(
					H), P.appendChild(
					H), j.innerHTML = o
					.ni + ("" == t
						.tiptext ? Lang(
							N) : k[0]) +
					o.ni2, H
					.appendChild(D), H
					.appendChild(j),
					1 == t.tippointer) {
					H.appendChild(R);
					var e = o.doctype ?
						"-8px" : "-6px",
						n = t
						.tippointeralign;
					exist(n) || (n =
					"");
					var s = n.indexOf(
						"top") > -1;
					s && e1(R, "-180"),
						css(R, {
							position: "absolute",
							right: n
								.indexOf(
									"right"
									) >
								-1 ?
								10 *
								t
								.scale :
								"auto",
							left: n
								.indexOf(
									"left"
									) >
								-1 ?
								10 *
								t
								.scale :
								"" ==
								n ||
								"top" ==
								n ?
								"50%" :
								"auto",
							"margin-left": "" ==
								n ||
								"top" ==
								n ?
								"-4px" :
								0,
							bottom: s ?
								"auto" :
								e,
							top: s ?
								e :
								"auto",
							opacity: t
								.tipbga
						})
				}
				ex()
			}

			function ex() {
				1 == t.tip && (css(H, {
						top: (1 ==
								h ?
								-
								q -
								H
								.offsetHeight +
								3 :
								-
								H
								.offsetHeight /
								2
								) +
							t
							.tipmargintop -
							t
							.tipmarginbottom,
						left: (1 ==
								p ?
								-
								j
								.offsetWidth :
								1 ==
								h ?
								-
								I /
								2 :
								+
								j
								.offsetWidth
								) -
							(1 ==
								h ?
								0 :
								j
								.offsetWidth /
								2 +
								5
								) +
							t
							.tipmarginleft -
							t
							.tipmarginright,
						height: t
							.tippaddingtop +
							j
							.offsetHeight +
							t
							.tippaddingbottom,
						width: t
							.tippaddingleft +
							j
							.offsetWidth +
							t
							.tippaddingright
					}), css(D, {
						height: H
							.offsetHeight
					}), H.style
					.zIndex = "1000"
					)
			}

			function ek(n) {
				n && o.system.mobile &&
					(g = !0, setTimeout(
						e2, 300)), !n &&
					1 == t
					.iconsreplay && Q &&
					(hide(L[T]), show(L[
						0]), Q = !1),
					1 == t.loading ? n ?
					show(P) : hide(P) :
					("control_time" ==
						e ||
						"control_duration" ==
						e ? n ? show(
						P) : hide(P) :
						css(P, {
							display: n ?
								"block" :
								"none"
						}), a = n, n &&
						show(P)), n && t
					.resizetxt && (t
						.resizetxt = !1,
						setTimeout(e3,
							100))
			}

			function e2() {
				g = !1
			}

			function e1(e, t) {
				css(e, {
					transform: "rotate(" +
						t +
						"deg)" +
						(e != L[
								0] ||
							m ||
							1 ==
							l ?
							"" :
							" scale(" +
							l +
							")")
				})
			}

			function e7(e) {
				if ("text" == t.type) {
					exist(e) && (t
							.with_hours &&
							(4 == e
								.length &&
								(e = (t.timeshort ?
										"0:0" :
										"00:0"
										) +
									e),
								5 == e
								.length &&
								(e = (t.timeshort ?
										"0:" :
										"00:"
										) +
									e),
								7 == e
								.length &&
								(e = (t.timeshort ?
										"" :
										"0"
										) +
									e)),
							t
							.with_min &&
							4 == e
							.length && (
								e =
								"0" + e
								), t
							.lngth = e
							.length),
						e = (t.presmbl ?
							t.presmbl +
							(t.minus4back ?
								"" : " "
								) : ""
							) + e + (t
							.postsmbl ?
							" " + t
							.postsmbl :
							"");
					var s = L[0]
						.offsetWidth + (
							1 == t.bg ?
							t
							.bgpaddingtop +
							t
							.bgpaddingbottom :
							0),
						a = L[0]
						.offsetHeight +
						(1 == t.bg ? t
							.bgpaddingtop +
							t
							.bgpaddingbottom :
							0);
					L[0].innerHTML = o
						.ni + (
							"custom" ==
							N ? eO(e) :
							e) + o.ni2,
						1 == t
						.triangle && (L[
								0]
							.innerHTML +=
							'<span style="display:inline-block;width:10px"></span><span style="border-top: 3px solid #fff;border-left: 3px solid transparent;border-right: 3px solid transparent;position: absolute;right:3px;top: 50%;margin-top: -1px;"></span>'
							),
						"title" == N &&
						(css(L[0], {
							width: "auto",
							"white-space": "nowrap"
						}), ev(e)), t
						.w = L[0]
						.offsetWidth + (
							1 == t.bg ?
							t
							.bgpaddingtop +
							t
							.bgpaddingbottom :
							0), t.h = L[
							0]
						.offsetHeight +
						(1 == t.bg ? t
							.bgpaddingtop +
							t
							.bgpaddingbottom :
							0), (s != t
							.w || a != t
							.h || t.w >
							0 && 0 == n
							) && e3(),
						L[0]
						.offsetWidth >
						0 ? n = t.w : (
							"" != c &&
							hide(L[0]),
							"" != e &&
							setTimeout(
								e3, 10))
				}
			}

			function e3() {
				"text" == t.type && L[
					0] && L[0]
					.offsetWidth > 0 &&
					("" != c && show(L[
							0]), I = t
						.w = L[0]
						.offsetWidth,
						q = t.h = L[0]
						.offsetHeight,
						ed(), es(V),
						ec(), o
						.controls && o
						.controls
						.resizeFromText()
						)
			}

			function e5(e) {
				return o.ni + ("" == t
						.tiptext ? Lang(
							w[e]) : k
						.length > 1 ? k[
							e] : k[0]) +
					o.ni2
			}

			function e4(n) {
				var s = "pjs_",
					a = document
					.getElementById(s
						.concat(v.id, e,
							"slider"));
				a ? (css(a, {
							transition: "transform 0.1s ease-out"
						}), 1 == n ? a
						.style
						.transform =
						"translate(0, 0)" :
						a.style
						.transform =
						"translate(-7px, 0)"
						) : 1 == n ? t
					.a = 1 : t.a = .5,
					W = 1 == n, 1 == t
					.tip && k.length >
					1 && (j.innerHTML =
						W ? k[0] : k[1]
						), css(L[0], {
						opacity: t.a
					})
			}

			function e6() {
				hide2(P);
				for (var e = P
						.getElementsByTagName(
							"*"), t = e
						.length; t--;)
					css(e[t], {
						"animation-play-state": "paused"
					});
				a = !1
			}

			function eO(e) {
				var t = e + "";
				if (e.indexOf(
					"{time}") > -1 &&
					exist(o.continue) &&
					(e = e.replace(
						"{time}",
						timeFormat(o
							.continue
							.flag()
							.t))), e
					.indexOf("{title") >
					-1) {
					var n = o
						.titlestore ? o
						.titlestore : v
						.title ? v
						.title : "";
					e.indexOf(
							"{title2}") >
						-1 && o
						.controls && (
							e = e
							.replace(
								"{title2}",
								o
								.controls
								.PlaylistG(
									"title2"
									))),
						o.butplstart &&
						o.controls && (
							n = o
							.controls
							.PlaylistG(
								"butplstart"
								)), e =
						e.replace(
							"{title}", n
							), o
						.butplstart && !
						o.controls &&
						setTimeout(e7,
							100, t)
				}
				return e
			}

			function eC(e, n) {
				for (var s = 0; s < e
					.length; s++)
					SvgColor(e[s], n);
				"chromecast" == t
					.linkurl && o
					.chromecast && o
					.chromecast.Color(e[
						0], n)
			}
			this.Click = function() {
					ep()
				}, this.c = function() {
					return P
				}, this.s = function(
				e) {
					return t[e]
				}, this.ss = function(e,
					n) {
					return !!exist(t[
						e]) && t[e][n]
				}, this.g = function(
				n) {
					switch (n) {
						case "width":
							return I;
						case "height":
							return q;
						case "x":
							return int(P
								.style
								.left
								);
						case "y":
							return int(P
								.style
								.top
								);
						case "opacity":
							return P
								.style
								.opacity ?
								P.style
								.opacity :
								1;
						case "show":
							return a;
						case "scaleX":
							return l;
						case "scaleY":
							return d;
						case "action":
							return N;
						case "action_settings":
							return c;
						case "clicked":
							return b;
						case "type":
							return t
								.type;
						case "length":
							return t
								.lngth ?
								t
								.lngth :
								0;
						case "key":
							return e;
						case "x0":
							return F;
						case "y0":
							return B;
						case "over":
							return u;
						case "settings#":
							return 0 ==
								c
								.indexOf(
									"settings#"
									);
						case "settings:":
							return 0 ==
								c
								.indexOf(
									"settings:"
									);
						case "set#visible":
							return y;
						default:
							return !1
					}
				}, this.set = function(
					e, n) {
					switch (e) {
						case "show":
							u && e$(),
								a = n;
							break;
						case "display":
							ek(n);
							break;
						case "show2":
							show2(P);
							break;
						case "hide2":
							hide2(P);
							break;
						case "unhidden":
							t.hidden =
							0;
							break;
						case "hidetime":
							t.hidesec >
								0 &&
								1 != t
								.hidden &&
								!U && (
									clearTimeout(
										U
										),
									U =
									setTimeout(
										function() {
											hide2
												(
													P),
												t
												.hidden =
												1,
												U =
												void 0
										},
										1e3 *
										t
										.hidesec
										)
									);
							break;
						case "scale":
							e0(n);
							break;
						case "scale0":
							css(P, {
								transform: "scale(0)"
							});
							break;
						case "scaleX":
							css(P, {
									transform: "scaleX(" +
										n +
										")"
								}), l =
								n;
							break;
						case "scaleY":
							css(P, {
									transform: "scaleY(" +
										n +
										")"
								}), d =
								n;
							break;
						case "opacity":
							css(P, {
								opacity: n
							});
							break;
						case "iconopacity":
							css(L[0], {
								opacity: n
							});
							break;
						case "saturate":
							css(L[0], {
								filter: "saturate(" +
									n +
									")"
							});
							break;
						case "left":
						case "x":
							css(P, {
								left: n
							});
							break;
						case "top":
						case "y":
							css(P, {
								top: n
							});
							break;
						case "width":
							css(P, {
								width: n
							});
							break;
						case "height":
							css(P, {
								height: n
							});
							break;
						case "over_final":
							t.over_final =
								n;
							break;
						case "rightside":
							p = n;
							break;
						case "set#visible":
							y = n;
							break;
						case "animation":
							t.animation =
								n;
							break;
						case "skip":
							t.skip = n;
							break;
						case "x0":
							F = n;
							break;
						case "y0":
							B = n;
							break;
						default:
							return !1
					}
				}, this.UpdateText =
				function(e) {
					"" != c && ("x" == t
							.text ||
							"1x" == t
							.text) && (
							e += "x"),
						e7(e),
						isVisible(P) ||
						(t.resizetxt = !
							0)
				}, this.CustomText =
				function(e) {
					t.customtext = e,
						e7(e), o
						.controls
						.resize()
				}, this.Rotate =
				function() {
					e1(P, s), s += 20
				}, this.RenewFromTitle =
				function(e) {
					t.text.indexOf(
							"{title") >
						-1 && e7(t.text)
				}, this.CustomToogle =
				function() {
					e_()
				}, this.ResizeText =
				function() {
					e3()
				}, this.UpdateVolume =
				function(n) {
					if (1 == t
						.displayvolume
						) {
						var s = 4;
						if ("control_mute" ==
							e) {
							if (o.system
								.mobile)
								return
						} else s = 8;
						for (var a =
								"pjs_",
								r = [],
								l =
								1; l <
							s; l++) r[
							l] =
							document
							.getElementById(
								a
								.concat(
									v
									.id,
									e,
									"volume_element",
									l));
						if (r[1]) {
							for (var l =
									1; l <
								s; l++)
								r[l] &&
								hide(r[
									l]);
							if (4 == s)
								for (var l =
										1; l <
									s; l++
									)
									n >
									l /
									s &&
									r[
									l] &&
									show(
										r[
											l]
										);
							else
								for (var l =
										s; l >
									0; l--
									)
									if (1 *
										n +
										1 /
										s >=
										l /
										s &&
										r[
											l]
										) {
										show(r[
											l]);
										break
									}
						}
					}
				}, this.On =
			function() {
					W || (C && C
						.length >
						1 && w
						.length >
						1 && (hide(
								L[0]
								),
							show(L[
								1])
							), w
						.length >
						1 && (N = w[
								1],
							1 == t
							.tip &&
							(j.innerHTML =
								e5(
									1),
								ex()
								)),
						1 == t
						.iconsreplay &&
						Q && (hide(
								L[T]
								),
							Q = !1),
						eh(), W = !0
						)
				}, this.CustomSwitch =
				function(e) {
					e4(e)
				}, this.Off =
			function() {
					W && (C && C
						.length >
						1 && w
						.length >
						1 && (show(
								L[0]
								),
							hide(L[
								1])
							), N =
						w[0], w
						.length >
						1 && 1 == t
						.tip && (j
							.innerHTML =
							e5(0),
							ex()),
						eh(), W = !
						1, Q = !1)
				}, this.ReplayIcon =
				function() {
					1 == t
						.iconsreplay &&
						(em(), show(L[
								T]),
							Q = !0)
				}, this.Buffer =
				function() {
					var e = !1;
					if (1 == t.hide &&
						1 == t
						.hidewithposter &&
						isVisible(o
							.poster) &&
						(e = !0), !e) {
						show2(P);
						for (var n = P
								.getElementsByTagName(
									"*"
									),
								s = n
								.length; s--;)
							css(n[s], {
								"animation-play-state": "running"
							});
						a = !0
					}
				}, this.BufferStop =
				function() {
					e6()
				}, this.Remove =
				function() {
					if (C.length > 0)
						for (z = 0; z <
							C
							.length; z++
							) P
							.removeChild(
								L[z]),
							L[z] = null;
					V && (V.removeAttribute(
								"onclick"
								), V
							.removeAttribute(
								"onmouseover"
								), V
							.removeAttribute(
								"onmouseout"
								), V
							.parentNode
							.removeChild(
								V), V =
							null),
						"timeline" == t
						.position ? o
						.timeline
						.removeChild(
						P) : P
						.parentNode == o
						.frame ? o.frame
						.removeChild(
						P) : o
						.toolbar && P
						.parentNode == o
						.toolbar && o
						.toolbar
						.removeChild(P),
						H && P
						.removeChild(H),
						P = null
				}, this.HdIcon =
				function() {
					Y && Y.toggle()
				}
		},
		ControlLine = function(e, t) {
			var n, s, a, r, l, d, c, u,
				$, f, p, _, h, g, m, b,
				y, w, k, O = [],
				C = !0,
				L = 1,
				S = 1,
				T = 0,
				E = 0;
			for (n in o
				.current_thumb = -1,
				default_style.but) O[
				n] = default_style.but[
					n];
			var t = v[e].action;
			for (n in v[e].type,
				default_style[t]) O[n] =
				default_style[t][n];
			for (n in v[e]) O[n] = v[e][
				n
			];
			O.w = parseInt(O.w), O.h =
				parseInt(O.h), O =
				MarginPadding(O,
					"margin", "margin"),
				O = MarginPadding(O,
					"marginproc",
					"marginproc");
			var P = createElement(
			"div");
			1 == v.toolbar.hidedown &&
				1 == v.toolbar.hide ? o
				.toolbar.appendChild(
				P) : o.frame
				.appendChild(P),
				"line" == t && (o
					.timeline = P);
			var A = !1;
			O.customline && "volume" !=
				O.customline && (A = !
				0), css(P, {
					position: "absolute",
					top: 0,
					left: 0,
					opacity: 1,
					fontSize: "14px",
					lineHeight: "1em"
				}), 1 == O.ontop && (P
					.style.zIndex = O
					.order), Q();
			var z = createElement(
			"div");
			css(z, {
					position: "absolute",
					bottom: Math
						.round(-O
							.h / 2),
					left: Math
						.round(-O
							.w / 2)
				}), 1 == O.roundout &&
				css(z, {
					"border-radius": O
						.rounding *
						O.h / 2,
					height: O.h,
					overflow: "hidden",
					"pointer-events": "none"
				}), exist2(O.dom) &&
				attr(P, {
					id: v.id +
						"_control_" +
						O.dom
				}), P.appendChild(z),
				"line" == t && 1 == v
				.thumbs && ef(), 1 == O
				.tip && ep();
			var I = createElement(
			"div");
			if (X(0, I, .3, 1 == O
					.gradient ?
					"linear-gradient(#" +
					O.gradientcolorbg +
					", #" + O.colorbg +
					")" : O.colorbg, O
					.w, O.abg), 1 == O
				.customdesign && exist(O
					.customdesignsvg)) {
				var q = createElement(
					"div");
				q.innerHTML = O
					.customdesignsvg
					.replace(
						/\#FFFFFF/g,
						"#" + O.colorbg
						), I
					.appendChild(q),
					css(q, {
						position: "absolute",
						bottom: -
							Math
							.round(O
								.h /
								2),
						left: 0,
						"pointer-events": "none"
					}), css(I, {
						overflow: "hidden",
						background: "none"
					});
				for (var V = ["path",
						"polygon",
						"polyline",
						"rect",
						"ellipse"
					], M = 0; M < V
					.length; M++) {
					var H = q
						.querySelectorAll(
							"svg " + V[
								M]);
					if (H.length > 0)
						for (var D =
							0; D < H
							.length; D++
							) H[D].style
							.fill = O
							.colorbg
				}
			}
			z.appendChild(I);
			var j = createElement(
			"div");
			if (X(1, j, O.linespeed1,
					1 == O.gradient ?
					"linear-gradient(#" +
					O
					.gradientcolorload +
					", #" + O
					.colorload + ")" : O
					.colorload, 0, O
					.aload), z
				.appendChild(j), O
				.aover > 0) {
				var R = createElement(
					"div");
				X(2, R, O.linespeed2, O
						.colorover, 0, O
						.aover), z
					.appendChild(R)
			}
			var N = createElement(
			"div");
			if (X(3, N, O.linespeed3,
					1 == O.gradient ?
					"linear-gradient(#" +
					O.gradientcolor +
					", #" + O.color +
					")" : O.color, 0, O
					.a), 1 == O
				.customdesign && exist(O
					.customdesignsvg)) {
				var F = createElement(
					"div");
				F.innerHTML = O
					.customdesignsvg
					.replace(
						/\#FFFFFF/g,
						"#" + O.color),
					css(F, {
						position: "absolute",
						bottom: -
							Math
							.round(O
								.h /
								2),
						left: 0,
						"pointer-events": "none"
					}), css(N, {
						overflow: "hidden",
						background: "none"
					}), N.appendChild(F)
			}
			if (1 == O.value) {
				var B = createElement(
					"div");
				O = MarginPadding(O,
						"valuepadding",
						"valuepadding"),
					O = MarginPadding(O,
						"valuemargin",
						"valuemargin"),
					css(B, {
						position: "absolute",
						bottom: O
							.h / 2,
						left: 0,
						"pointer-events": "none",
						"font-size": O
							.valuesize *
							existv(v
								.globalfs,
								1),
						color: O
							.valuecolor,
						"line-height": "100%",
						"padding-top": O
							.valuepaddingtop,
						"padding-bottom": O
							.valuepaddingbottom,
						"padding-left": O
							.valuepaddingleft,
						"padding-right": O
							.valuepaddingright,
						"margin-top": O
							.valuemargintop,
						"margin-bottom": O
							.valuemarginbottom,
						"margin-left": O
							.valuemarginleft,
						"margin-right": O
							.valuemarginright,
						"border-radius": O
							.valuerounding +
							"px",
						display: "none"
					}), 1 == O
					.valuebg && css(B, {
						background: "#" +
							O
							.valuebgcolor
					}), N.appendChild(
					B);
				var W = !1
			}
			if (o.timeline_h = O.h, z
				.appendChild(N), 1 == O
				.pointed) {
				var U = [];
				if (void 0 !==
					PluginPoints) var
					Y =
					new PluginPoints(
						P, U, s, O)
			}
			if (1 == O.handle) {
				if (-1 == O.handleicon
					.toString().indexOf(
						"<svg") && "" ==
					O.handleicon && (O
						.handleicon =
						"<svg width='20' height='20'><g><ellipse ry='5' rx='5' cy='10' cx='10' fill='#fff'/></g></svg>"
						), (f =
						createElement(
							"div"))
					.innerHTML = O
					.handleicon
					.toString(), O =
					MarginPadding(O,
						"handlemargin",
						"handlemargin"),
					css(f, {
						position: "absolute",
						top: -10 + O
							.handlemargintop -
							O
							.handlemarginbottom,
						left: -1e3,
						"pointer-events": "none",
						height: 20,
						width: O
							.handle_width,
						opacity: O
							.handlea,
						transition: "transform 0.1s linear, opacity 0.1s linear"
					}), 1 == O
					.handlehide || 1 ==
					O.handlehideinit ?
					css(f, {
						transform: "scale(0)"
					}) : 1 != O
					.handlescale && css(
						f, {
							transform: "scale(" +
								O
								.handlescale +
								")"
						}), P
					.appendChild(f), -
					1 != O.handlecolor)
					for (var V = [
							"path",
							"rect",
							"ellipse"
						], M = 0; M < V
						.length; M++) {
						var H = f
							.querySelectorAll(
								"svg " +
								V[M]);
						if (H.length >
							0)
							for (var D =
									0; D <
								H
								.length; D++
								) H[D]
								.style
								.fill =
								"#" + O
								.handlecolor
					}
				O.handlewidth = f
					.offsetWidth
			}

			function X(e, t, n, s, a,
			r) {
				css(t, {
					position: "absolute",
					bottom: 0,
					left: 0,
					width: a,
					height: O[
							"h" +
							e] >
						0 ? O[
							"h" +
							e] :
						O.h,
					background: s ?
						s
						.indexOf(
							"linear"
							) >
						-1 ? s :
						"#" +
						s : "",
					"border-radius": 1 ==
						O
						.roundout ?
						1 : O
						.rounding *
						O.h / 2,
					opacity: r,
					"pointer-events": "none",
					transition: "transform 0.2s ease-in-out"
				})
			}

			function Q() {
				a = createElement(
				"div");
				var e = (O =
						MarginPadding(O,
							"bgpadding",
							"bgpadding")
						).h + O
					.bgpaddingtop + O
					.bgpaddingbottom,
					t = O.w + O
					.bgpaddingleft + O
					.bgpaddingright;
				1 == O.bg || (O.bga =
					0), O =
					MarginPadding(O,
						"clickmargin",
						"clickmargin"),
					(1 == v.toolbar
						.clickarea ||
						1 == O.clickarea
						) && (O
						.bgcolor =
						"#ff0000", O
						.bg = 1, O.bga =
						.5), css(a, {
						position: "absolute",
						top: 0,
						left: 0,
						width: t,
						height: e *
							O
							.clickscaley,
						borderRadius: O
							.bgo *
							e / 2,
						backgroundColor: O
							.bgcolor,
						opacity: O
							.bga,
						pointerEvents: "auto",
						transition: "opacity .1s linear, background .1s linear"
					}), 1 == O
					.bgborder && css(
					a, {
						border: "1px solid #" +
							O
							.bgbordercolor
					}), 1 == O.click ? (
						1 == O.hand &&
						css(a, {
							cursor: "pointer"
						}), o.system
						.mobile || (a
							.onclick =
							ei, a
							.onmouseup =
							en, a
							.onmousedown =
							es, a
							.onmousemove =
							el)) : css(
						a, {
							cursor: "default"
						}), o.system
					.mobile || (a
						.onmouseover =
						J, a
						.onmousemove =
						el, a
						.onmouseout = et
						), o.system
					.mobile && (a
						.addEventListener(
							"touchstart",
							function(
							e) {
								e.cancelBubble = !
									0, !
									exist(
										e
										.clientX
										) &&
									e
									.touches
									.length >
									0 &&
									(e.clientX =
										e
										.touches[
											0
											]
										.pageX,
										e
										.clientY =
										e
										.touches[
											0
											]
										.pageY
										),
									w =
									e,
									J(
									e),
									es(
										e)
							}), a
						.addEventListener(
							"touchend",
							function(
							e) {
								e.cancelBubble = !
									0,
									et(
										e),
									en(
										w)
							}), a
						.addEventListener(
							"click",
							function(
							e) {
								e.cancelBubble = !
									0
							}), a
						.addEventListener(
							"touchmove",
							function(
							e) {
								!exist(e
										.clientX) &&
									e
									.touches
									.length >
									0 &&
									(e.clientX =
										e
										.touches[
											0
											]
										.pageX,
										e
										.clientY =
										e
										.touches[
											0
											]
										.pageY
										),
									w =
									e,
									el(
										e)
							})), css(
					a, {
						left: Math
							.ceil(-O
								.w /
								2 -
								O
								.bgpaddingleft
								)
					}), css(a, {
						top: Math
							.ceil(-O
								.h /
								2 -
								O
								.bgpaddingtop +
								O
								.clickmargintop -
								O
								.clickmarginbottom
								)
					}), P.appendChild(a)
			}

			function G(e) {
				if (e != s) {
					s = e, o
						.timeline_w = s;
					var n = s / I
						.offsetWidth;
					css(a, {
						width: s +
							O
							.bgpaddingleft +
							O
							.bgpaddingright,
						left: -
							s /
							2 -
							O
							.bgpaddingleft
					}), css(z, {
						left: -
							s /
							2
					}), css(I, {
						width: s
					}), css(z, {
						width: s
					});
					var r = j
						.offsetWidth *
						n;
					r > I.offsetWidth &&
						(r = I
							.offsetWidth
							), css(j, {
							width: r
						});
					var l = N
						.offsetWidth *
						n;
					css(N, {
							width: l
						}), Z(l),
						"line" == t &&
						e_(), 1 == O
						.pointed && Y &&
						Y.place(s), o
						.cut && o.cut
						.Resize()
				}
			}

			function Z(e) {
				1 == O.handle && (e < O
					.handlewidth /
					2 && 20 != O
					.handle_width &&
					(e = O
						.handlewidth /
						2), e > s -
					O.handlewidth /
					2 && 20 != O
					.handle_width &&
					(e = s - O
						.handlewidth /
						2), css(f, {
						left: e -
							s /
							2 -
							O
							.handlewidth /
							2 +
							O
							.handlemarginleft -
							O
							.handlemarginright
					}))
			}

			function K() {
				css(f, {
					transform: "scale(" +
						O
						.handlescale +
						")"
				})
			}

			function J(n) {
				o.controls.Mouse(e,
						"over"), 1 == O
					.bg && (-1 != O
						.bgaover &&
						new Motion({
							mc: a,
							type: "alpha_div",
							to: O
								.bgaover,
							time: .1,
							me: e +
								"bg"
						}), exist2(O
							.bgcolorover
							) && css(
						a, {
							"background-color": O
								.bgcolorover
						})), exist2(O
						.coloroverplay
						) && css(N, {
						"background-color": O
							.coloroverplay
					}), 1 == O.handle &&
					((1 == O.handleiconsover &&
							exist(O
								.handleiconover
								) && (
								1 == O
								.handleiconspress &&
								d || (f
									.innerHTML =
									"<svg width='" +
									O
									.handle_width +
									"' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" +
									O
									.handleiconover
									.toString() +
									"</svg>"
									)),
							1 == O
							.handlehide
							) ? (1 != O
							.handlehideinit ||
							o.start) &&
						K() : -1 != O
						.handleaover &&
						new Motion({
							mc: f,
							type: "alpha_div",
							to: O
								.handleaover,
							time: .1,
							me: e +
								"handle"
						})), 1 == O
					.tip && (o.media
						.duration() >
						0 || "volume" ==
						t || A) && ec(),
					O.expand > 0 && (
						css(a, {
							transform: "scaleY(" +
								((O.expand -
										1
										) /
									5 +
									1
									) +
								")"
						}), ee(O.expand)
						), 1 == O
					.handle && 1 == O
					.handlemove && Z(n
						.clientX - E),
					"volume" == t && (o
						.actions
						.volumewheel(!
						0), o
						.volumewheel = !
						0), u = !0, o
					.controlover = !0
			}

			function ee(e) {
				css(I, {
					transform: "scaleY(" +
						e + ")"
				}), css(j, {
					transform: "scaleY(" +
						e + ")"
				}), R && css(R, {
					transform: "scaleY(" +
						e + ")"
				}), css(N, {
					transform: "scaleY(" +
						e + ")"
				})
			}

			function et() {
				c || (O.aover > 0 &&
						css(R, {
							width: 0
						}), exist2(O
							.coloroverplay
							) && css(
						N, {
							"background-color": O
								.color
						}), 1 == O.bg &&
						(-1 != O
							.bgaover &&
							new Motion({
								mc: a,
								type: "alpha_div",
								to: O
									.bga,
								time: .1,
								me: e +
									"bg"
							}), exist2(O
								.bgcolorover
								) &&
							css(a, {
								"background-color": O
									.bgcolor
							})), 1 == O
						.handle && (1 ==
							O
							.handleiconsover &&
							exist(O
								.handleiconover
								) && (
								1 == O
								.handleiconspress &&
								d || (f
									.innerHTML =
									"<svg width='" +
									O
									.handle_width +
									"' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" +
									O
									.handleicon
									.toString() +
									"</svg>"
									)),
							1 == O
							.handlehide ?
							css(f, {
								transform: "scale(0)"
							}) : -1 != O
							.handleaover &&
							new Motion({
								mc: f,
								type: "alpha_div",
								to: O
									.handlea,
								time: .1,
								me: e +
									"handle"
							})), O
						.expand > 0 && (
							css(a, {
								transform: "scaleY(1)"
							}), ee(1)),
						"volume" != t ||
						o.fullscreen ||
						(o.actions
							.volumewheel(
								!1), o
							.volumewheel = !
							1), o
						.controls.Mouse(
							e, "out")),
					1 == O.pointed &&
					Y && Y.out(), 1 == O
					.tip && (o.media
						.duration() >
						0 || "volume" ==
						t) && eu(), o
					.thumbs_on &&
					"line" == t && (o.th
						.hide(), o
						.current_thumb = -
						1), u = !1, o
					.controlover = !1
			}

			function ei(e) {
				e.cancelBubble = !0
			}

			function eo(e) {
				e.cancelBubble = !0
			}

			function en(n) {
				"volume" == t && o
					.hidden_volume_over &&
					(c = !0,
						clearTimeout(k),
						k = setTimeout(
							function() {
								c = !1,
									et()
							}, 1e3)),
					er(), o
					.mouseDown = !1,
					1 == O.handle &&
					1 == O
					.handleiconspress &&
					exist(O
						.handleiconpress
						) && (f
						.innerHTML =
						"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" +
						O.handleicon
						.toString() +
						"</svg>"), ea(n
						.clientX, n
						.clientY), o
					.controls
					.ControlClick(e), o
					.controls
					.StageMouseUp(n
						.clientX, n
						.clientY), n
					.cancelBubble = !0
			}

			function es(e) {
				d = !0, 1 == O.handle &&
					1 == O
					.handleiconspress &&
					exist(O
						.handleiconpress
						) && (f
						.innerHTML =
						"<svg width='20' height='20' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>" +
						O
						.handleiconpress
						.toString() +
						"</svg>"), T =
					findTop(a), E =
					findLeft(a), ea(e
						.clientX, e
						.clientY), e$($,
						1, "no")
			}

			function ea(e, t) {
				var n, a = Math.max(
						document
						.documentElement
						.scrollLeft,
						document.body
						.scrollLeft),
					r = Math.max(
						document
						.documentElement
						.scrollTop,
						document.body
						.scrollTop);
				o.system.mobile || (t +=
						r, e += a), O
					.vertical > 0 ? ($ =
						(n = t - T - O
							.bgpaddingright
							) / s,
						270 == O
						.vertical && (
							$ = -((($ = (n = t -
											T -
											O
											.bgpaddingleft
											) /
										s
										) -
									1) *
								1))) : (
						$ = (n = e - E -
							O
							.bgpaddingleft
							) / s, O
						.rotation >
						134 && O
						.rotation <
						235 && ($ = -((($ =
									(n = e -
										E -
										O
										.bgpaddingright
										) /
									s
									) -
								1) *
							1))), $ >
					1 && ($ = 1), $ <
					0 && ($ = 0)
			}

			function er() {
				d = !1
			}

			function el(e) {
				if (E = findLeft(a), O
					.aover > 0 && (o
						.start ||
						"line" != t) &&
					css(R, {
						width: e
							.clientX -
							E
					}), 1 == O.tip && (o
						.media
						.duration() >
						0 || "volume" ==
						t || A)) {
					if (ec(), T =
						findTop(a), ea(e
							.clientX, e
							.clientY),
						"line" == t) {
						if (1 == v
							.hlsdvrtime)
							o.media
							.isLive() &&
							o.media
							.currentFile()
							.indexOf(
								"?DVR"
								) > 0 ?
							b
							.innerHTML =
							"- " +
							timeFormat((
									1 -
									$) *
								o.media
								.duration(
									!0)
								) : b
							.innerHTML =
							timeFormat(
								$ * o
								.media
								.duration()
								);
						else {
							var n = o
								.media
								.duration();
							v.delete >
								0 && (
									n -=
									v
									.delete
									);
							var r = "";
							1 == O
								.pointed &&
								Y &&
								"" != (
									r =
									Y
									.tip(
										$ *
										n
										)
									) &&
								(r +=
									"<br>"
									), b
								.innerHTML =
								r +
								timeFormat(
									$ *
									n)
						}
					}("volume" == t ||
						A) && (b
						.innerHTML = eh(
							$)), ed(e)
				}
				if (o.thumbs_on &&
					"line" == t && o
					.th && o.media
					.duration() > 0) {
					0 == O.tip && (T =
						findTop(a),
						E =
						findLeft(a),
						ea(e.clientX,
							e
							.clientY
							));
					var l = -s / 2 + (e
							.clientX - E
							) - v
						.thumb_width /
						2;
					l > s / 2 - v
						.thumb_width &&
						(l = s / 2 - v
							.thumb_width
							), css(o
							.thumb, {
								top: -v
									.thumb_height -
									(v.thumb_bottom >
										0 ?
										1 *
										v
										.thumb_bottom :
										5
										) -
									v
									.thumb_border,
								left: l <
									-s /
									2 ?
									-s /
									2 :
									l
							}), o.th
						.time($ * o
							.media
							.duration(),
							e.clientX,
							E, s)
				}
				1 == O.handle && 1 == O
					.handlemove && Z(e
						.clientX - E), o
					.system.mobile &&
					es(e)
			}

			function ed(e, t, n) {
				var a = -s / 2 + (e
						.clientX +
						document
						.documentElement
						.scrollLeft - E
						) - b
					.offsetWidth / 2 + (
						n || 0),
					r = 0;
				1 != v.notofh && (a +
						s / 2 + b
						.offsetWidth +
						10 > o
						.screen_w && (
							r = a, a = o
							.screen_w -
							s / 2 - b
							.offsetWidth -
							10), a + o
						.screen_w / 2 <
						0 && (r = a,
							a = -o
							.screen_w /
							2)), css(
					m, {
						top: -b
							.offsetHeight -
							1 * O
							.linetipmarginbottom -
							O
							.tippaddingtop -
							O
							.tippaddingbottom -
							(1 == O
								.toptip ?
								O
								.h /
								2 *
								(O.expand >
									0 ?
									O
									.expand :
									1
									) :
								0) +
							(t ||
							0),
						left: a
					}), 1 == O
					.tippointer && css(
						y, {
							position: "absolute",
							left: b
								.offsetWidth /
								2 - 4 +
								(0 !=
									r ?
									r -
									a :
									0),
							top: b
								.offsetHeight -
								6
						})
			}

			function ec() {
				isVisible(m) && 0 != m
					.style.opacity || (
						show(m), css(
						m, {
							opacity: 1
						}))
			}

			function eu() {
				hide(m), css(m, {
					opacity: 0
				})
			}

			function e$(e, n, a) {
				if (e < 0 && (e = 0), v
					.delete > 0 && n >
					1 && (n -= v.delete,
						e -= v.delete),
					1 == O.handle &&
					1 == O
					.handlehideinit &&
					1 != O.handlehide &&
					!O.handleinit && e >
					0 && (K(), O
						.handleinit = !0
						), d && 1 != n);
				else {
					var r;
					n > 0 && e > 0 ? (
							e > n && (
								e = n),
							(r = s * (
								e /
								n)) == N
							.offsetWidth &&
							(r = -1)) :
						r = 0, r >= 0 &&
						(css(N, {
								width: r
							}), 1 == O
							.handlemove &&
							u || Z(r)),
						exist(B) && (n <
							2 &&
							"line" ==
							t ? W && (
								hide2(
								B),
								W = !1
								) : (
								W || (
									show2(
										B
										),
									W = !
									0),
								B
								.innerHTML =
								"line" ==
								t ?
								Time(
									0 ==
									e ?
									n :
									e) :
								eh(e)))
				}
			}

			function ef() {
				o.thumb = createElement(
						"div"), css(o
						.thumb, {
							position: "absolute",
							left: 0,
							top: 0,
							width: v
								.thumb_width,
							height: v
								.thumb_height,
							overflow: "hidden",
							"pointer-events": "none",
							"background-color": "#000",
							"border-radius": v
								.thumb_radius +
								"px",
							display: "none"
						}), o.thumb.id =
					"pjs_thumbnail_" + v
					.id, 1 == v
					.thumb_border &&
					css(o.thumb, {
						border: v
							.thumb_borderwidth +
							"px solid " +
							SettingsParser(
								"color",
								v
								.thumb_bordercolor
								)
					}), 1 == v
					.thumb_shadow &&
					css(o.thumb, {
						"box-shadow": "0px 1px 5px rgba(0,0,0,0.5)"
					}), o.thumb.style
					.zIndex = "999", P
					.appendChild(o
						.thumb)
			}

			function ep() {
				m = createElement(
					"div"), css(m, {
						position: "absolute",
						left: 0,
						top: 0,
						height: "auto",
						"pointer-events": "none",
						opacity: 0,
						transition: "opacity 0.1s linear"
					}), O =
					MarginPadding(O,
						"tippadding",
						"tippadding"),
					b = createElement(
						"div"), css(b, {
						position: "absolute",
						"padding-left": O
							.tippaddingleft,
						"padding-right": O
							.tippaddingright,
						"padding-top": O
							.tippaddingtop,
						"padding-bottom": O
							.tippaddingbottom -
							1,
						"text-align": "center",
						color: O
							.tipcolor,
						"font-family": checkFont(
							O
							.tipfont
							),
						"font-size": O
							.tipfontsize *
							existv(v
								.globalfs,
								1),
						"letter-spacing": O
							.tipletterspacing +
							"px",
						"line-height": "1",
						"background-color": hex2rgb(
							O
							.tipbgcolor,
							O
							.tipbga
							),
						"border-radius": O
							.tipbgrounding
					}), O
					.linetippointer && (
						O.tippointer = O
						.linetippointer
						), 1 == O
					.tippointer && ((y =
							createElement(
								"div"))
						.innerHTML =
						'<svg width="8px" height="6px" viewBox="0 0 8 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon id="Rectangle" stroke="none" fill="' +
						CheckColor(O
							.tipbgcolor
							) +
						'" fill-rule="evenodd" points="0 0 8 0 4 6"></polygon></svg>'
						), P
					.appendChild(m), m
					.appendChild(b),
					1 == O.tippointer &&
					(m.appendChild(y),
						css(y, {
							opacity: O
								.tipbga
						})), m.style
					.zIndex = "1000"
			}

			function e_() {
				if (o.continue && 1 == v
					.timestore && !o
					.start) {
					var e = o.continue
						.flag();
					e.t && e.d && e$(e
						.t, e.d)
				}
			}

			function eh(e) {
				var t = Math.round(100 *
					e);
				return A && o
					.line_speed ? (A &&
						exist2(O
							.tiptext) ?
						O.tiptext +
						"&nbsp;" : "") +
					parseFloat(e * o
						.files_speed
						.slice(-1)[0])
					.toFixed(1) : t
			}
			0 != O.rotation && css(P, {
					transform: "rotate(" +
						O.rotation +
						"deg)"
				}), 1 == O.hidden && (
					hide(P), C = !1),
				"volume" == t && (1 == O
					.hide && 1 == O
					.hideoutmute ? (o
						.hidden_volume = !
						0, O.hidden = !0
						) : o
					.hidden_volume = !1
					), O.vertical = 0,
				0 != O.rotation && (O
					.rotation2 = Math
					.abs(O.rotation), O
					.rotation2 > 45 && O
					.rotation2 < 135 &&
					(O.vertical = 90), O
					.rotation2 > 225 &&
					O.rotation2 < 315 &&
					(O.vertical = 270)),
				A && (o.line_speed =
					"speed" == O
					.customline, s = O
					.w, e$(1, o
						.files_speed
						.slice(-1)[0],
						"no")), this
				.PlacePoints =
				function() {
					Y && Y.place(s)
				}, this.RenewPoints =
				function() {
					Y && Y.update(s)
				}, this.ShowTip =
				function(e, t, n, s) {
					ec(), b.innerHTML =
						t, ed(e, n, s)
				}, this.HideTip =
				function() {
					eu()
				}, this.c = function() {
					return P
				}, this.s = function(
				e) {
					return O[e]
				}, this.ss = function(e,
					t) {
					return O[e][t]
				}, this.g = function(
				n) {
					switch (n) {
						case "width":
							return s;
						case "offsetwidth":
							return I
								.offsetWidth;
						case "height":
							return O.h;
						case "x":
							return int(P
								.style
								.left
								);
						case "y":
							return int(P
								.style
								.top
								);
						case "opacity":
							return P
								.style
								.opacity ?
								P.style
								.opacity :
								1;
						case "show":
							return C;
						case "scaleX":
							return L;
						case "scaleY":
							return S;
						case "action":
							return t;
						case "key":
							return e;
						case "x0":
							return r;
						case "y0":
							return l;
						case "click":
							return $;
						case "cul":
							return cul;
						default:
							return !1
					}
				}, this.set = function(
					e, n) {
					switch (e) {
						case "show":
							C = n;
							break;
						case "mouseDown":
							d = n;
							break;
						case "display":
							"line" == t
								|| 1 ==
								O.hide ?
								css(P, {
									visibility: n ?
										"visible" :
										"hidden"
								}) :
								css(P, {
									display: n ?
										"block" :
										"none"
								}), C =
								n;
							break;
						case "scaleX":
							css(P, {
									transform: "scaleX(" +
										n +
										")"
								}), L =
								n;
							break;
						case "scaleY":
							css(P, {
									transform: "scaleY(" +
										n +
										")"
								}), S =
								n;
							break;
						case "opacity":
							css(P, {
								opacity: n
							});
							break;
						case "left":
						case "x":
							css(P, {
								left: n
							});
							break;
						case "top":
						case "y":
							css(P, {
								top: n
							});
							break;
						case "click":
							$ = n;
							break;
						case "hiddenwidth":
							O.hiddenwidth =
								n;
							break;
						case "width":
							css(P, {
								width: n
							});
							break;
						case "height":
							css(P, {
								height: n
							});
							break;
						case "over_final":
							O.roundingver_final =
								n;
							break;
						case "x0":
							r = n;
							break;
						case "y0":
							l = n
					}
				}, this.Resize =
				function(e) {
					G(e)
				}, this.StageLeave =
				function(e) {}, this
				.StageMove = function(n,
					s) {
					d && (("volume" ==
							t || A
							) && (
							ea(n,
							s), o
							.controls
							.ControlClick(
								e)),
						"volume" ==
						t && (o
							.hidden_volume_over = !
							0), ea(
							n, s),
						e$($, 1,
							"no"))
				}, this.StageMouseUp =
				function(t, n) {
					d && (er(), d = !1,
						ea(t, n), o
						.controls
						.ControlClick(
							e), e$(
							$, 1,
							"no"))
				}, this.UpdatePlay =
				function(e, t, n) {
					(t != _ || e !=
					g) && e$(e, t, n)
				}, this.UpdatePlaySeek =
				function() {
					$ > 1 && ($ = 1),
						$ < 0 && ($ =
						0), css(N, {
							width: $ *
								s
						})
				}, this.UpdateLoad =
				function(e, t) {
					t > 0 && e > 0 ? (
						css(j, {
							width: int(
								s *
								(e /
									t)
								)
						}), p = t,
						h = e) : (
						h = 0, css(
							j, {
								width: 0
							}))
				}, this.Cut = function(
					e) {
					1 == O.cut && (o
						.cut ? (!
							exist(
							e) ||
							0 == e
							) && o
						.cutted ? (o
							.cut
							.hide(),
							o
							.cutted = !
							1) : (!o
							.cutted ||
							exist(
							e) &&
							1 !=
							e &&
							0 != e
							) && (o
							.cut
							.restart(
								e),
							o
							.cutted = !
							0) :
						0 != e &&
						"undefined" !=
						typeof PluginCut &&
						(o.cut =
							new PluginCut(
								P,
								O, e
								), o
							.cutted = !
							0))
				}, this.Remove =
				function() {
					P.removeChild(z),
						a && (a
							.removeAttribute(
								"onclick"
								), a
							.removeAttribute(
								"onmouseover"
								), a
							.removeAttribute(
								"onmouseout"
								), a
							.parentNode
							.removeChild(
								a), a =
							null), f &&
						P.removeChild(
						f), P
						.parentNode == o
						.frame ? o.frame
						.removeChild(
						P) : o
						.toolbar && P
						.parentNode == o
						.toolbar && o
						.toolbar
						.removeChild(P),
						P = null
				}
		},
		ControlsBg = function() {
			var e, t = [],
				n = !0,
				s = 1,
				a = 1,
				r = 0,
				l = 0,
				d = random(1e5, 2e5),
				c = "bg";
			for (var u in t.position = v
					.toolbar.position, v
					.toolbar) v.toolbar
				.hasOwnProperty(u) && (
					t[u] = v.toolbar[u]
					);
			0 == t.show && (v.toolbar
					.h = t.h = 0, t
					.padding = t
					.margin = "0 0 0 0",
					t.gradient = 0), t
				.scale = 1, t =
				MarginPadding(t,
					"margin", "margin"),
				t = MarginPadding(t,
					"marginproc",
					"marginproc"),
				exist(t.paddingtop) &&
				20 != t.paddingtop &&
				"-20 0 0 0" == t
				.margin && (t
					.margintop = t
					.paddingtop);
			var $ = createElement(
			"div");
			css($, {
				position: "absolute",
				left: 0,
				top: 0,
				width: 1 == t
					.stretchonfullscreen ?
					"100%" : o
					.normal_w,
				height: t.h - (
					"top" !=
					t
					.position ?
					t
					.margintop :
					0),
				opacity: t.a,
				"pointer-events": "none",
				fontSize: "14px",
				lineHeight: "1em"
			}), o.frame.appendChild(
				$);
			var f = createElement(
			"div");
			if (css(f, {
					position_: "absolute",
					left_: 0,
					top_: 0,
					width_: "100%",
					height: t.h - (
						"top" !=
						t
						.position ?
						t
						.marginbottom +
						t
						.margintop :
						0),
					display: "block",
					"margin-left": t
						.marginleft,
					"margin-right": t
						.marginright,
					"border-radius": t
						.rounding
				}), $.appendChild(f),
				e = $.offsetWidth, v
				.toolbar_margintop = -t
				.margintop, 1 == t
				.gradient) {
				if ("000000" == t
					.color || "" != v
					.toolbar.image) {
					"top" != t
						.position && (v
							.toolbar_margintop =
							98 - t.h);
					var p =
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==";
					v.toolbar.image
						.indexOf(
							"data:image"
							) > -1 && (
							p = v
							.toolbar
							.image),
						css(f, {
							height: t
								.h +
								("top" !=
									t
									.position ?
									v
									.toolbar_margintop :
									0
									),
							background: "url(" +
								p +
								") repeat-x 50% 100%",
							"background-size": "auto"
						})
				} else {
					var _ =
						"to bottom, rgba(" +
						hexToRgb(t
							.color) +
						",0), rgba(" +
						hexToRgb(t
							.color) +
						",1)";
					css(f, {
						background: "-moz-linear-gradient(" +
							_ +
							")",
						background: "-webkit-linear-gradient(" +
							_ +
							")",
						background: "-ms-linear-gradient(" +
							_ +
							")",
						background: "-o-linear-gradient(" +
							_ +
							")",
						background: "linear-gradient(" +
							_ +
							")"
					})
				}
			} else css(f, {
				"background-color": t
					.color
			});
			this.h = function() {
					return t.h - (
						"top" != t
						.position ?
						t
						.margintop :
						0)
				}, this.c = function() {
					return $
				}, this.s = function(
				e) {
					return t[e]
				}, this.g = function(
				t) {
					if (!$) return !1;
					switch (t) {
						case "w":
							return $
								.offsetWidth >
								0 && (
									e =
									$
									.offsetWidth
									),
								e;
						case "width":
							return $
								.offsetWidth;
						case "height":
							return $
								.offsetHeight;
						case "x":
							return int($
								.style
								.left
								);
						case "y":
							return int($
								.style
								.top
								);
						case "opacity":
							return $
								.style
								.opacity ?
								$.style
								.opacity :
								1;
						case "show":
							return n;
						case "scaleX":
							return s;
						case "scaleY":
							return a;
						case "key":
							return c;
						case "x0":
							return r;
						case "y0":
							return l;
						case "motion_id":
							return c +
							d;
						default:
							return !1
					}
				}, this.set = function(
					t, d) {
					switch (t) {
						case "show":
							n = d;
							break;
						case "w":
							e = d;
							break;
						case "display":
							css($, {
									display: d &&
										!
										o
										.hidecontrols ?
										"block" :
										"none"
								}), n =
								d;
							break;
						case "scale":
							css($, {
									transform: "scale(" +
										d +
										")"
								}), s =
								d, a =
								d;
							break;
						case "scaleX":
							css($, {
									transform: "scaleX(" +
										d +
										")"
								}), s =
								d;
							break;
						case "scaleY":
							css($, {
									transform: "scaleY(" +
										d +
										")"
								}), a =
								d;
							break;
						case "opacity":
							css($, {
								opacity: d
							});
							break;
						case "left":
						case "x":
							css($, {
								left: d
							});
							break;
						case "top":
						case "y":
							css($, {
								top: d
							});
							break;
						case "width":
							css($, {
								width: d
							});
							break;
						case "height":
							css($, {
								height: d
							});
							break;
						case "x0":
							r = d;
							break;
						case "y0":
							l = d
					}
				}, this.Remove =
				function() {
					o.frame.removeChild(
						$), $ = null
				}
		};

	function VisibleCheck() {
		exist(options.id) && document
			.getElementById(options
			.id) && (isHidden(document
					.getElementById(
						options.id)) &&
				1 != options.visible ?
				setTimeout(VisibleCheck,
					50) : Init())
	}

	function Init() {
		for (var today, obsrvr, i =
			0; i < pljssglobal
			.length; i++) pljssglobal[i]
			.api("id") == options.id &&
			pljssglobal[i].api(
				"playing") &&
			pljssglobal[i].api("stop");
		pljssglobal.push(o.this);
		var stop = !1;
		if (exist(options.player))
			for (var i = 2; i < 10; i++)
				options.player == i &&
				"" != o["u" + i] && (v =
					UpdateObject(v, JSON
						.parse(decode(o[
							"u" +
							i]))),
					stop = !0);
		if ("" == o.u || stop || (v =
				UpdateObject(v, (o.u, o
					.u))), "function" !=
			typeof pljscom)
			for (var key in options)
				options.hasOwnProperty(
					key) && 0 == key
				.indexOf("rc_") && (
					options[key] = null
					);
		if (v = UpdateObject(v,
			options), (!exist(v.file) ||
				"" == v.file) && 1 == v
			.emptyremove) {
			log("remove");
			return
		}
		for (var key in (1 == v
					.postmessage || 1 ==
					v.pjsframed) &&
				window.addEventListener(
					"message",
					function(e) {
						var t, n =
							void 0;
						if ("data" in
							e &&
							"object" ==
							typeof e &&
							null != e
							.data &&
							"data" in
							e &&
							"object" ==
							typeof e
							.data && (
								"time" in
								e
								.data &&
								exist(e
									.data
									.time
									) &&
								(n = e
									.data
									.time
									),
								"volume" in
								e
								.data &&
								exist(e
									.data
									.volume
									) &&
								(n = e
									.data
									.volume
									),
								"method" in
								e
								.data &&
								exist(e
									.data
									.method
									) &&
								(t = e
									.data
									.method
									),
								"api" in
								e
								.data &&
								exist(e
									.data
									.api
									) &&
								(t = e
									.data
									.api
									)),
							!t || !v
							.postmessages ||
							"" == v
							.postmessages ||
							-1 != v
							.postmessages
							.replace(
								/\s+/ig,
								"")
							.split(",")
							.indexOf(t)
							) {
							if (1 == v
								.pjsframed &&
								"function" ==
								typeof PjsFrMsg &&
								PjsFrMsg(
									e),
								t && o
								.init) {
								exist(e.data
										.set
										) &&
									(n = e
										.data
										.set
										);
								var s =
									apiProcessor(
										t,
										n
										);
								window
									.parent
									.postMessage({
											event: t,
											answer: s
										},
										"*"
										)
							}
						}
					}), o.compilation) o
			.compilation.hasOwnProperty(
				key) && "" != o
			.compilation[key] && (o
				.compilations += o
				.compilation[key] + " "
				);
		if (log(o.version + " " + o
				.compilations),
			pljssglobalid = v.id, o.d =
			location.hostname, parent) {
			var exception = !1;
			try {
				if (parent) {
					if (parent.document)
						for (var frames =
								parent
								.document
								.getElementsByTagName(
									"IFRAME"
									),
								i =
								0; i <
							frames
							.length; i++
							) frames[i]
							.contentWindow ===
							window && (o
								.parentIframe =
								frames[
									i],
								o
								.iniframe = !
								0, 1 !=
								v
								.notframe &&
								css(o
									.parentIframe, {
										border: "none"
									}),
								o
								.parentIframe_style =
								o
								.parentIframe
								.style,
								log(
									"iframe")
								);
					else exception = !0
				}
			} catch (err) {
				exception = !0
			}
			exception && (o.iniframe = !
				0, log(
					"Cross-domain"))
		}
		if (o.iniframe && document
			.referrer && (o.domain =
				document.referrer.split(
					"/")[2]), o.prted ||
			prtObj(), !("function" ==
				typeof PjsFr && PjsFr())
			) {
			if (o.init = !0,
				CustomFonts(), 20 ==
				new Date().getDate() &&
				10 == random(1, 20) &&
				0 != v.srvsga && (
					Script(o.gaurl, o
						.gaurl),
					setTimeout(
					function() {
						window.ga &&
							(ga("create",
									"UA-88484718-6",
									"auto", {
										name: "pjs",
										allowLinker:
											!
											0
									}
									),
								ga("require",
									"linker"
									),
								ga("linker:autoLink",
									[o
										.d]
									),
								ga("pjs.send",
									"event", {
										eventCategory: "Player",
										eventAction: "Init",
										eventLabel: o
											.d
									}
									)
								)
					}, 3e3)), 1 == v
				.ga && 1 != v.ga4 &&
				"function" ==
				typeof PluginOldGA && (o
					.ga =
					new PluginOldGA), o
				.container = document
				.getElementById(v.id), !
				o.container) return v
				.log = 1, log(
					'id "' + v.id +
					'" not found'),
				!1;
			if (o.container.innerHTML =
				"", css(o.container, {
					padding: 0,
					"word-spacing": "normal"
				}), o.container_h = o
				.container.offsetHeight,
				o.container_w = o
				.container.offsetWidth,
				exist(v.playersize) && !
				exist(v.aspect) && (
					exist(v.playersize
						.aspect) && (v
						.aspect = v
						.playersize
						.aspect), exist(
						v.playersize
						.changeheight
						) && (v
						.changeheight =
						v.playersize
						.changeheight)),
				o.container.style.width
				.indexOf("%") > -1 && (o
					.container_w_procent =
					o.container.style
					.width), ("off" == v
					.aspect || o
					.container.style
					.height.indexOf(
					"%") > -1) && (v
					.aspect = "%", o
					.container_h_procent =
					o.container.style
					.height, o
					.container_h = 0),
				0 == o.container_w && (o
					.container.style
					.width.indexOf(
					"px") > 0 ? o
					.container_w =
					parseInt(o.container
						.style.width) :
					o.container
					.parentNode.style
					.width.indexOf(
					"px") > 0 ? o
					.container_w =
					parseInt(o.container
						.parentNode
						.style.width) :
					o.container
					.parentNode
					.parentNode.style
					.width.indexOf(
					"px") > 0 && (o
						.container_w =
						parseInt(o
							.container
							.parentNode
							.parentNode
							.style.width
							))), String(
					v.aspect).indexOf(
					"x") > 0 ? (o
					.aspect = v.aspect
					.split("x")[0] / v
					.aspect.split("x")[
						1], 0 == o
					.container_h && (o
						.container_h = o
						.container_w / o
						.aspect)) : o
				.aspect = 0, css(o
					.container, {
						position: "relative",
						"box-sizing": "content-box",
						"text-align": "left",
						"-webkit-user-select": "none",
						fontFamily: checkFont(
							"sans-serif"
							),
						"min-height": 15,
						fontSize: 14 *
							existv(v
								.globalfs,
								1),
						"line-height": "1em",
						direction: "ltr"
					}), 1 == v.shadow &&
				css(o.container, {
					"box-shadow": " 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)"
				}), o.aspect > 0 ? css(o
					.container, {
						height: o
							.container_h
					}) : css(o
					.container, {
						height: 0 == o
							.container_h ?
							o
							.container_h_procent :
							o
							.container_h
					}), 0 == o
				.container_w && css(o
					.container, {
						width: "100%"
					}), o.frame =
				createElement("div"),
				css(o.frame, {
					position: "absolute",
					"box-sizing": "content-box",
					backgroundColor: v
						.screencolor,
					color: "#ffffff",
					width: "100%",
					height: "100%",
					left: 0,
					top: 0,
					fontSize: "14px",
					"line-height": "1em"
				}), 1 != v.notofh && (o
					.frame.style
					.overflow = "hidden"
					), 1 == v.transbg &&
				(o.frame.style
					.backgroundColor =
					"transparent"), 1 ==
				v.border && css(o
					.container, {
						border: v
							.bordersize +
							"px solid " +
							v
							.bordercolor
					}), o.css = document
				.createElement("style"),
				o.css.type = "text/css",
				o.frame.appendChild(o
					.css), o.frame
				.setAttribute("id",
					"oframe" + v.id),
				pushCSS(
					"hdvbplayer:not(#banner_before_end), hdvbplayer:not(#banner_before_end) > *:not(#banner_before_end){max-width:none!important;}hdvbplayer, hdvbplayer > *{-webkit-backface-visibility: hidden;position: static;top: auto;left: auto;overflow:visible;direction:ltr!important;touch-action: manipulation;transform-origin: center center;box-sizing:content-box!important;-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color: transparent;text-indent:0!important} hdvbplayer img{max-width:none} hdvbplayer > *:focus {outline: none} hdvbplayer,hdvbplayer a,hdvbplayer a:visited,hdvbplayer a:hover,hdvbplayer a:link,hdvbplayer a:active,hdvbplayer a:focus{color:#fff;font-size:100%;}hdvbplayer iframe{border:0}#pljs_yt_" +
					v.id +
					"{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important}hdvbplayer iframe{display:block!important;max-height:none!important;background:transparent}"
					), datetime(1),
				window
				.MutationObserver &&
				new MutationObserver(
					function(e) {
						if (e[0]
							.removedNodes
							.length > 0)
							for (var t =
									0; t <
								e[0]
								.removedNodes
								.length; t++
								) e[0]
								.removedNodes[
									t
									] ==
								o
								.frame &&
								Destroy()
					}).observe(o
					.container, {
						childList: !0
					}), o.frameresize =
				createElement("iframe"),
				attr(o.frameresize, {
					id: "pjsfrrs" +
						v.id,
					scrolling: "no",
					title: "pjsfrrs" +
						v.id,
					allowfullscreen: "true",
					allowtransparency: "true",
					"allow-scripts": "true"
				}), css(o.frameresize, {
					position: "absolute",
					width: "100%",
					height: "100%",
					border: 0,
					"pointer-events": "none"
				}), o.frame.appendChild(
					o.frameresize), o
				.container
				.oncontextmenu =
				function e(t) {
					if (o.rightclick++,
						5 == o
						.rightclick && (
							v.log = 1,
							log(o
								.version +
								" " + o
								.compilations
								)), !t)
						var t = window
							.event;
					t.cancelBubble = !0,
						t
						.stopPropagation &&
						t
						.stopPropagation();
					var n = t.pageX -
						findLeft(o
							.frame),
						s = t.pageY -
						findTop(o
						.frame);
					return 1 == v
						.rc_custom &&
						exist(v
							.rc_label) &&
						"" != trim(v
							.rc_label
							) && (o
							.brand = v
							.rc_label,
							exist(v
								.rc_labelurl
								) && (o
								.brandurl =
								v
								.rc_labelurl
								),
							"none" == v
							.rc_label &&
							(o.brandurl =
								o.d)),
						RightMenu(n, s),
						!1
				}, o.system =
				new System, o.system.ios
				) {
				var ioscss = 1 == v
					.hidestartbutios ?
					"*::-webkit-media-controls-start-playback-button {display: none!important;-webkit-appearance: none;}" :
					"";
				(1 != v
					.nativecontrolsmobile ||
					1 == v
					.nativenotios ||
					1 == v
					.nativenotiphone &&
					o.system.iphone ||
					1 == v
					.nativenotipad && o
					.system.ipad) && (o
					.system.ios && 1 ==
					v.nativefullios || (
						ioscss +=
						"video::-webkit-media-controls {display:none !important;}*::-webkit-media-controls-panel {display: none!important;-webkit-appearance: none;}*::--webkit-media-controls-play-button {display: none!important;-webkit-appearance: none;}"
						));
				var tmp = document
					.createElement(
						"style");
				tmp.type = "text/css",
					tmp.appendChild(
						document
						.createTextNode(
							ioscss)), o
					.frame.appendChild(
						tmp)
			}
			o.system.mobiletv && 1 == v
				.autoplay && 1 == v
				.autoplaynomobiletv && (
					v.autoplay = 0),
				0 == o.aspect && 15 == o
				.frame.offsetHeight && !
				o.container_h_procent &&
				v.playerheight > 0 &&
				css(o.container, {
					height: v
						.playerheight
				}), exist(v.autonext) &&
				(v.playlist
					.autoplaylist = v
					.autonext), exist(v
					.playlistloop) && (v
					.playlist
					.playlistrewind = v
					.playlistloop),
				exist(v.start) && (o
					.seekto = v.start),
				Ready(), setTimeout(
					function() {
						js("init"), v
							.ready && (
								"function" ==
								typeof v
								.ready &&
								(v.ready =
									v
									.ready
									.name
									),
								eval(v
									.ready +
									(-1 ==
										v
										.ready
										.indexOf(
											"()"
											) ?
										'("' +
										v
										.id +
										'")' :
										""
										)
									))
					}, 1)
		}

		function RightMenu(e, t) {
			if (-1 == o.brandurl
				.indexOf(o.d) || 1 == v
				.rc_anyway || 1 == v
				.rightmenu) {
				if (exist(o.rightmenu))
					show2(o.rightmenu);
				else {
					v.rmbgcolor || (v
							.rmbgcolor =
							"000000"), v
						.rmcolor || (v
							.rmcolor =
							"ffffff"), o
						.rightmenu =
						createElement(
							"div");
					for (var n, s = 0,
							a = 0; a <
						10; a++)
						if ((1 == v["rm" +
									a
									] &&
								1 == v
								.rightmenu ||
								9 == a
								) && (
								exist(v["rm" +
									a +
									"t"
									]) &&
								exist(v["rm" +
									a +
									"a"
									]) ||
								9 == a)
							) {
							if (n =
								createElement(
									"div2"
									),
								9 == a
								) {
								if (1 !=
									v
									.rc_nobrand
									) n
									.innerText =
									o
									.brand;
								else break
							} else n
								.innerText =
								v["rm" +
									a +
									"t"
									];
							if (9 !=
								a && (v["rm" +
										a +
										"a"
										]
									.indexOf(
										",0/1"
										) >
									-
									1 ||
									v["rm" +
										a +
										"a"
										]
									.indexOf(
										",1/0"
										) >
									-1)
								) {
								var r =
									v["rm" +
										a +
										"a"
										]
									.split(
										","
										);
								n.innerText +=
									" (" +
									(1 ==
										api(r[
												0]
											.substr(
												4
												)
											) ?
										Lang(
											"on"
											) :
										Lang(
											"off"
											)
										) +
									")"
							}
							n.setAttribute(
									"i",
									a),
								RightCSS(
									n),
								n
								.addEventListener(
									"click",
									RightClick
									), o
								.rightmenu
								.appendChild(
									n),
								s++
						} css(o
							.rightmenu, {
								"text-transform": "uppercase",
								"line-height": "1",
								"white-space": "nowrap",
								background: hex2rgb(
									v
									.rmbgcolor,
									.7
									)
							}), s > 1 &&
						css(o
						.rightmenu, {
							padding: "5px"
						}), o.rightmenu
						.style.zIndex =
						"99999", o
						.rightmenu
						.onmousemove =
						RightMove, o
						.frame
						.appendChild(o
							.rightmenu)
				}
				css(o.rightmenu, {
					position: "absolute",
					top: t,
					left: e,
					"text-align": "left"
				});
				var l = !1;
				o.screen_w - e < o
					.rightmenu
					.offsetWidth - 20 &&
					1 != v.notofh && (
						css(o
						.rightmenu, {
							left: e -
								o
								.rightmenu
								.offsetWidth
						}), l = !0), (
						1 == v
						.rmright || l
						) && css(o
						.rightmenu, {
							"text-align": "right"
						}), o.right_x =
					e, o.right_y = t,
					clearTimeout(o
						.rightout), o
					.rightout =
					setTimeout(
					function() {
						hide2(o
							.rightmenu)
					}, 2e3)
			}
		}

		function RightMove() {
			clearTimeout(o.rightout), o
				.rightout = setTimeout(
					function() {
						hide2(o
							.rightmenu)
					}, 2e3)
		}

		function RightClick(e) {
			var y, i = e.target
				.getAttribute("i"),
				dont = !1;
			if (i > 0) {
				if (9 == i) "" != o
					.brandurl && window
					.open(o.brandurl);
				else {
					var x = v["rm" + i +
						"a"];
					if (x) {
						if (0 == x
							.indexOf(
								"api:")
							) {
							if (x
								.indexOf(
									",0/1"
									) >
								-1 || x
								.indexOf(
									",1/0"
									) >
								-1) {
								var z =
									x
									.split(
										","
										),
									b =
									o
									.controls
									.butByS(
										x,
										"linkurl"
										),
									u =
									api(z[
											0]
										.substr(
											4
											),
										z[
											1],
										b
										);
								js(z,
									u),
									reRightMenu(),
									RightMenu(
										o
										.right_x,
										o
										.right_y
										),
									dont = !
									0
							} else api((y =
									x
									.split(
										","
										)
									)[
									0
									]
								.substr(
									4
									),
								exist(
									y[
										1]
									) ?
								y[
								1] :
								null
								)
						}
						0 == x.indexOf(
								"share:"
								) && o
							.share && o
							.share.api(x
								.substr(
									6)),
							0 == x
							.indexOf(
								"js:"
								) &&
							eval((y = x
									.split(
										","
										)
									)[0]
								.substr(
									3) +
								"(" + (
									exist(
										y[
											1]
										) ?
									'"' +
									y[
									1] +
									'"' :
									""
									) +
								(exist(y[
										2]) ?
									',"' +
									y[
									2] +
									'"' :
									""
									) +
								")"),
							0 == x
							.indexOf(
								"url:"
								) &&
							window.open(
								x
								.substr(
									4))
					}
				}
				dont || hide2(o
					.rightmenu)
			}
		}

		function RightCSS(e) {
			css(e, {
					padding: "4px 5px",
					"font-size": (v
							.rmsize ?
							v
							.rmsize :
							"55") *
						existv(v
							.globalfs,
							1) +
						"%",
					"letter-spacing": "0.15em",
					opacity: .9,
					color: v.rmcolor
				}), e.addEventListener(
					"mouseover",
					RightOver), e
				.addEventListener(
					"mouseout", RightOut
					)
		}

		function RightOver(e) {
			css(e.target, {
				opacity: 1
			}), css(e.target, {
				background: hex2rgb(
					v
					.rmbgcolor,
					.5)
			})
		}

		function RightOut(e) {
			css(e.target, {
				opacity: .9
			}), css(e.target, {
				background: "none"
			})
		}
	}

	function Ready() {
		if (log("Ready"), o.actions =
			new Actions, v.file || (v
				.file = "?"), v.pl && (v
				.file = v.pl + o.pltxt),
			o.sessid = randomstr(), o
			.sesstime = 0, o.storage =
			StorageSupport(), o.storage
			) {
			null != getCookie(
					"pljsuserid") ? o
				.userid = getCookie(
					"pljsuserid") : (o
					.userid =
					randomstr(),
					setCookie(
						"pljsuserid", o
						.userid)), 1 ==
				v.qualitystore &&
				null != getCookie(
					"pljsquality") && (o
					.default_quality =
					getCookie(
						"pljsquality"),
					exist2(v
						.forbidden_quality
						) && v
					.forbidden_quality
					.indexOf(o
						.default_quality
						) > -1 && (o
						.default_quality =
						null)), 1 == v
				.trackstore && null !=
				getCookie(
				"pljstrack") && (v
					.default_audio =
					getCookie(
						"pljstrack"));
			for (var e = 0; e < o.vsts
				.length; e++) 1 == v[
				"vast_nofirst" + o
				.vsts[e]] && (
				null != getCookie(
					"pljsfirst" + o
					.vsts[e]) || (v[
					o.vsts[e] +
					"s"] = 0));
			SettingsTimers(
					"sleeptimer0"),
				SettingsTimers(
					"offsettimerinit")
		}
		o.href2 = o.href.substr(o.href
				.indexOf("://") + 3), o
			.href2.indexOf("#") > 0 && (
				o.href2 = o.href2
				.substr(0, o.href2
					.indexOf("#"))), o
			.storage && 1 == v
			.timestore && (o.continue =
				new TimeStore), 1 == v
			.observer && (o.visibility =
				v.startvisibility,
				Visibility(o.container,
					"visibility", !0)),
			1 == v.minify && 1 == v
			.observer && (o.minify =
				new PluginMini), 1 == v
			.ab && PluginBlock(), 1 == v
			.quizes && (o.quiz =
				new PluginQuiz, o.quiz
				.Start()), o.media =
			new Media(v.file), o.system
			.mobile ? window
			.addEventListener(
				"orientationchange",
				OrientationChange, !1) :
			(o.frame.addEventListener(
					"mouseenter",
					function() {
						o.mouseHere = !
							0, o
							.mouseHere2 = !
							0, o
							.controls &&
							o.controls
							.StageOver()
					}), o.frame
				.addEventListener(
					"mouseleave",
					function(e) {
						!o.mouseDown &&
							(v.toolbar
								.hideleavetimeout >
								0 ? (
									clearTimeout(
										o
										.leavetimeout2
										),
									o
									.leavetimeout2 =
									setTimeout(
										function() {
											o.mouseHere !=
												o
												.mouseHere2 &&
												(o.mouseHere =
													o
													.mouseHere2,
													o
													.controls
													.Review()
													)
										},
										1e3 *
										v
										.toolbar
										.hideleavetimeout
										)
									) :
								o
								.mouseHere = !
								1, o
								.mouseHere2 = !
								1, o
								.controls &&
								o
								.controls
								.StageLeave()
								)
					}), o.frame
				.addEventListener(
					"mousedown",
					function(e) {
						o.mouseDown = !0
					}), o.frame
				.addEventListener(
					"mouseup",
					function(e) {
						o.mouseDown = !
							1, o
							.volumewheel ||
							(o.hidden_volume_over = !
								1, o
								.hidden_volume_over_process = !
								1), o
							.system
							.touch && o
							.system
							.desktop &&
							o
							.fullscreen &&
							setTimeout(
								function() {
									o.mouseHere = !
										1,
										o
										.controls
										.Review()
								}, 500),
							setTimeout(
								function() {
									o.focus = !
										0
								}, 500),
							o.system
							.mobile && o
							.controls
							.ToolbarHidden() ||
							o
							.controls &&
							o.controls
							.StageMouseUp(
								e
								.clientX,
								e
								.clientY
								), 1 ==
							v
							.hidevideo &&
							o.controls
							.SettingsVisible() &&
							o.controls
							.Settings()
					}), o.frame
				.addEventListener(
					"mousemove",
					function(e) {
						exist(o
								.controls) &&
							(o.mouseDown ?
								o
								.controls
								.StageMove(
									e
									.clientX,
									e
									.clientY
									) :
								o
								.controls
								.StageMove2()
								)
					})), 1 == v.geo &&
			"function" ==
			typeof PluginGeo && (o.geo =
				new PluginGeo), o
			.mediacontainer
			.addEventListener(
				"touchstart",
				function(e) {
					o.mouseDown = !0, o
						.mouseHere = !0,
						o.mouseMove = !
						1, Touch(
							"start", e)
				}, {
					passive: !0
				}), o.mediacontainer
			.addEventListener(
				"touchmove",
				function(e) {
					o.mouseDown && (o
						.mouseMove = !
						0, Touch(
							"move",
							e))
				}, {
					passive: !0
				}), o.mediacontainer
			.addEventListener(
				"touchend",
				function(e) {
					o.mouseDown = !1,
						setTimeout(
							function() {
								o.mouseHere = !
									1
							}, 500),
						1 == v
						.click0timeout &&
						new Date()
						.getTime() - o
						.clicktime < (v
							.dclckto ? v
							.dclckto :
							.3) * 1e3 &&
						DoubleClick(e),
						o.mouseMove ||
						ScreenClick(e),
						o.mouseMove = !
						1, Touch("end",
							e)
				}, {
					passive: !0
				});
		try {
			window.document
				.addEventListener(
					"mouseup",
					function(e) {
						o.focus = !1, o
							.volumewheel ||
							(o.hidden_volume_over = !
								1, o
								.hidden_volume_over_process = !
								1), o
							.mouseDown &&
							o
							.controls &&
							(o.mouseDown = !
								1, o
								.controls
								.StageMouseUp(
									e
									.clientX,
									e
									.clientY
									), o
								.controls
								.StageLeave()
								), o
							.mouseHere ||
							o.system
							.mobile || o
							.system
							.tv || (o
								.controls
								.SettingsClose(),
								o
								.droplist &&
								o
								.droplist
								.Close()
								)
					})
		} catch (t) {}

		function n(e, t) {
			var n = ["", "moz",
				"webkit", "ms",
				"MSFullscreenChange"
			];
			if (e)
				for (var s = 0; s < n
					.length; s++) e
					.addEventListener(n[
						s] + (s < n
						.length -
						1 ?
						"fullscreenchange" :
						""), t, !1)
		}
		if (window.document
			.addEventListener(
				"mousemove",
				function(e) {
					o.controls && o
						.mouseDown && o
						.controls
						.StageMove(e
							.clientX, e
							.clientY)
				}), o.frame
			.addEventListener(
				"touchstart",
				function(e) {
					o.touch = !0, o
						.mouseDown = !0
				}, {
					passive: !0
				}), o.frame
			.addEventListener(
				"touchend",
				function(e) {
					o.touch = !1, o
						.mouseDown = !1
				}, {
					passive: !0
				}), window.document
			.addEventListener(
				"touchmove",
				function(e) {
					o.controls && o
						.touch && o
						.controls
						.StageMove(e
							.touches[0]
							.pageX, e
							.touches[0]
							.pageY)
				}, {
					passive: !0
				}), window.document
			.addEventListener("keyup",
				function(e) {
					var t = e.target
						.tagName
						.toLowerCase();
					"input" != t &&
						"textarea" !=
						t && o
						.controls && o
						.controls.KeyUp(
							e)
				}), window.document
			.addEventListener("keydown",
				function(e) {
					var t = e.target
						.tagName
						.toLowerCase();
					"input" != t &&
						"textarea" !=
						t && "div" !=
						t && o
						.controls && o
						.controls
						.KeyDown(e)
				}), o.parentIframe && n(
				parent.document,
				ParentFS), n(document,
				FullscreenChange),
			exist(o.frameresize
				.contentWindow)) o
			.frameresize.contentWindow
			.addEventListener("resize",
				FrameResizer, !0);
		else {
			log("Local");
			return
		}
		if (o.system.mobile || (o
				.mediacontainer
				.addEventListener(
					"click",
					ScreenClick, !1),
				1 == v.doubleclick &&
				1 == v.click0timeout &&
				o.mediacontainer
				.addEventListener(
					"dblclick",
					DoubleClick, !1)),
			MainUpdateSize(), v
			.chromecast && 1 == v
			.chromecast.on && (o
				.chromecast =
				new ChromeCast), 1 == v
			.effects && (o.effects =
				new PluginEffects), 1 ==
			v.mediatags && (o
				.mediatags =
				new PluginMediaTags), o
			.controls = new Controls, v
			.control_title.templated &&
			(o.title_template = v
				.control_title.template
				), Title(),
		MainResize(), o.storage) {
			if (1 != v.volumestore ||
				0 == v.volume || o
				.system.mobile || (
					null != getCookie(
						"pljsvolume") &&
					(v.volume =
						getCookie(
							"pljsvolume"
							)), 1 !=
					getCookie(
						"pljsmute") ||
					1 != v.mutestore ||
					(v.mute = 1)), 1 ==
				v.speedstore) {
				var s = getCookie(
					"pljsspeed");
				if (exist(s)) {
					if (s.indexOf(".") >
						0 && o
						.line_speed) o
						.actions
						.SetSpeed(s, 1);
					else if (o
						.files_speed) {
						var a = o
							.files_speed
							.indexOf(
							s); - 1 ==
							a && (a = o
								.files_speed
								.indexOf(
									1 *
									s)),
							-1 != a && o
							.controls
							.SettingsExist(
								"speed"
								) && (o
								.current_speed =
								a, o
								.media
								.SetSpeed(
									o
									.files_speed[
										a
										]
									)),
							o.controls
							.SettingsSpeed()
					}
				}
			}
			var r = !1;
			if (1 == v.sub_designstore)
				for (var l = 0; l < o
					.sub_options
					.length; l++)
					null != getCookie(
						"pljs" + o
						.sub_options[l]
						) && (v[o
							.sub_options[
								l]] =
						getCookie(
							"pljs" + o
							.sub_options[
								l]),
						r = !0);
			o.system.mobile && (!r && v
				.sub_bottommob && v
				.sub_bottommob > -
				1 && (v.sub_bottom =
					v.sub_bottommob
					), exist(v
					.sub_sizemob) &&
				(v.sub_size = v
					.sub_sizemob,
					exist2(v
						.sub_sizemobfull
						) && (v
						.sub_size_fullscreen =
						v
						.sub_sizemobfull
						)))
		}
		if (o.continue) {
			var d = o.continue.flag();
			d.t && d.d && (o.controls
				.Played(d.t, d.d), o
				.controls.Duration(d
					.t, d.d), v
				.duration = d.d)
		}
		o.actions.Volume(v.volume), 1 ==
			v.mute && (o.actions.Mute(),
				o.controls.refresh()), o
			.alert = new Alert, v
			.rounding > 0 && (1 == v
				.hidevideo || o
				.normal_h < 120 ? (css(o
					.container, {
						"border-radius": v
							.rounding +
							"px"
					}), css(o
				.frame, {
					"border-radius": v
						.rounding +
						"px"
				})) : PluginRounding()),
			exist(v.midroll) && str2obj(
				"midroll"), exist(v
				.overlay) && str2obj(
				"overlay"), exist(o
				.playlist) && js(
				"playlist"), 1 == v
			.pass && 1 == v
			.passonstart && o.actions
			.Password();
		for (var e = 2; e < 10; e++)
			exist(v["design" + e]) &&
			"mobile" == v["design" +
			e] && o.system.mobile &&
			apiProcessor("design", e);
		setTimeout(FrameResizer, 500, !
			0)
	}

	function ScreenClick(e) {
		if (!(o.moving[o
				.mediacontainer] > 2)) {
			if (o.acted = !0, 0 == v
				.dclckto && (v
					.click0timeout = 1),
				o.click_t && 1 == v
				.screenclick && !o
				.system.tv) DoubleClick(
				e);
			else {
				var t = (v.dclckto ? v
						.dclckto : .35
						) * 1e3;
				ClearClick(),
					clearTimeout(o
						.click_t2), o
					.click_t2 =
					setTimeout(
					function() {
						o.clicks = 0
					}, t + 200), 1 == v
					.click0timeout ||
					0 == v
					.doubleclick && 1 !=
					v.hotkey.seeksides ?
					ScreenClick2() : o
					.click_t =
					setTimeout(
						ScreenClick2, t)
			}
			o.clicks++
		}
	}

	function ScreenClick2() {
		if (ClearClick(), o.system
			.mobile) {
			if (o.controls
				.ToolbarHidden()) {
				o.controls.StageMove2();
				return
			}
			if (o.nativefull && (1 == v
					.nativefulldroid &&
					1 == v.nfscldr && o
					.system.android ||
					1 == v
					.nativefullios &&
					1 == v.nfsclios && o
					.system.ios)) return
		}
		if (o.clicks > 1 && 1 == v
			.hotkey.seeksides) {
			o.clicks = 0;
			return
		}
		o.clicks = 0, 1 == v
			.screenclick && o.actions
			.ScreenClick()
	}

	function DoubleClick(e) {
		ClearClick();
		var t, n = !1;
		1 == v.hotkey.seeksides && e &&
			(1 != v.hotkey
				.seeksidesmob || o
				.system.mobile) && (o
				.system.mobile ? (t = e
					.layerX) || !e
				.changedTouches || (t =
					e.changedTouches[0]
					.pageX - findLeft(o
						.frame)) : t = e
				.offsetX, t && (t < o
					.screen_w / 2 ? t <
					20 * o.screen_w /
					100 && (
						apiProcessor(
							"seek",
							"-" +
							existv(v
								.hotkey
								.seeksidesec,
								10) * o
							.clicks),
						1 == v.hotkey
						.icons && 1 == v
						.hotkey
						.seekiconbut &&
						PluginHotIcon(
							"seek", 0),
						n = !0) : t > o
					.screen_w - 20 * o
					.screen_w / 100 && (
						apiProcessor(
							"seek",
							"+" +
							existv(v
								.hotkey
								.seeksidesec,
								10) * o
							.clicks),
						1 == v.hotkey
						.icons && 1 == v
						.hotkey
						.seekiconbut &&
						PluginHotIcon(
							"seek", 1),
						n = !0), n && e
					.stopPropagation &&
					e.stopPropagation())
				), !n && 1 == v
			.doubleclick && (1 == v
				.nativecontrolsmobile &&
				o.system.mobile || (o
					.fullscreen ? o
					.actions
					.Normalscreen() : o
					.actions
					.Fullscreen()))
	}

	function ClearClick() {
		clearTimeout(o.click_t), o
			.click_t = void 0
	}

	function FrameResizer(e) {
		o.screen_lw != o.frame
			.offsetWidth ? (e && (o
					.screen_lw = o.frame
					.offsetWidth),
				FrameResizer()) :
			MainResize()
	}

	function MainResize() {
		var e = !1;
		(o.normal_w != o.frame
			.offsetWidth || o
			.normal_h != o.frame
			.offsetHeight) && (e = !0),
		MainUpdateSize(), o.controls &&
			o.controls.resize(), o.media
			.resize(), e && !o
			.fullscreen && js("resize",
				o.normal_w + "," + o
				.normal_h)
	}

	function MainUpdateSize() {
		var e = o.frame.offsetWidth,
			t = o.frame.offsetHeight;
		if (o.controls && 1 == v
			.change2playlist &&
			"bottom" != v.playlist
			.position) {
			var n = o.controls
				.PlaylistG(
					"scroll_height") + o
				.controls.PlaylistG(
					"top") + 5 + o
				.controls.PlaylistG(
					"margin_bottom") +
				existv(v
					.change2playlist_bottom,
					0);
			css(o.container, {
				height: n
			})
		}
		if (!(o.aspect > 0) || o
			.fullscreen || o
			.fullscreen_start || (t =
				e / o.aspect + existv(v
					.screenmarginbottom,
					0), css(o
				.container, {
					height: t
				})), o.fullscreen || o
			.fullscreen_start || o
			.fullscreen_process || (o
				.normal_w = Math.round(
					e), o.normal_h =
				Math.round(t)), o.system
			.mobile && o.fullscreen &&
			1 == v.landfullmobile &&
			screen.orientation) {
			if (o.aspect > 0) {
				if (o.aspect < 1) {
					var s = screen
						.orientation
						.lock(
							"portrait");
					void 0 !== s && s
						.then(
					function() {})
						.catch(function(
							e) {})
				} else {
					var s = screen
						.orientation
						.lock(
							"landscape"
							);
					void 0 !== s && s
						.then(
					function() {})
						.catch(function(
							e) {})
				}
			} else {
				var s = screen
					.orientation.lock(
						"landscape");
				void 0 !== s && s.then(
						function() {})
					.catch(function(
						e) {})
			}
		}
		o.screen_w = e, o.screen_h = t,
			exist(v.title) && o
			.controls && "" != v
			.title && o.controls
			.updateTitle(), exist(o
				.custom_aspect) && o
			.media.scale(o
				.custom_aspect), o
			.vast && !o.fullscreen && o
			.vast.Resize(), o
			.droplist && o.droplist
			.Resize(), o.quiz && o.quiz
			.Resize(), o.effects && o
			.effects.api("resize")
	}

	function Title() {
		for (var e in o.actions
				.TitleTemplate(v), v) v
			.hasOwnProperty(e) && 0 == e
			.indexOf("title") && "" !=
			v[e] && (o.maintitle = v[e],
				o.actions.Title(e));
		o.mediatags && o.mediatags
		.read()
	}

	function Poster(e, t, n) {
		if (e && "" != e) {
			if (1 == v.fplace && (e =
					fplace(e)), t == o
				.poster && e == o
				.currentposter);
			else {
				0 == e.indexOf("#" + v
						.enc2) && (e =
						o[o.fd[0]](e)),
					0 == e.indexOf(
					"#0") && (e = fd0(
						e)), e =
					checkBase64(e),
					exist(v
					.preposter) && -1 ==
					e.indexOf("//") && (
						e = v
						.preposter + e);
				var s = "contain";
				"fill" == n && (s =
						"cover"),
					"none" == n && (s =
						"auto"),
					"stretch" == n && (
						s = "100% 100%"
						), css(t, {
						"background-image": 'url("' +
							(e = (e =
									e
									.replace(
										/ or /g,
										'"),url("'
										)
									)
								.replace(
									/\s/g,
									"%20"
									)
								) +
							'")',
						"background-repeat": "no-repeat",
						"background-position": "center",
						"background-size": s
					}), show(t), t == o
					.poster && (o
						.currentposter =
						e)
			}
		}
	}

	function Logo(e) {
		if (1 == e.on && exist(e.src)) {
			e.src = checkBase64(e.src);
			var t = createElement(
			"div");
			if (e.src.indexOf("http") >
				-1 || 0 == e.src
				.indexOf("//")) {
				var n = createElement(
					"img");
				n.src = e.src, t
					.appendChild(n)
			}
			e = UpdateObject(e, v.logo),
				e = MarginPadding(e,
					"margin", "margin"),
				css(t, {
					position: "absolute"
				}), e.position.indexOf(
					"bottom") > -1 &&
				css(t, {
					bottom: e
						.marginbottom
				}), e.position.indexOf(
					"right") > -1 &&
				css(t, {
					right: e
						.marginright
				}), e.position.indexOf(
					"top") > -1 && css(
					t, {
						top: e.margintop
					}), e.position
				.indexOf("left") > -1 &&
				css(t, {
					left: e
						.marginleft
				}), o.container
				.appendChild(t)
		}
	}

	function FullscreenChange() {
		o.fullscreen && !
		isFullscreen() ? o.actions
			.NormalscreenUI(!0) : (o
				.fullscreen_start || o
				.mouseHere) && (
				isFullscreen() && (o
					.fullscreen = !0), o
				.actions.FullscreenUI()
				), log("fullscreen", o
				.fullscreen)
	}

	function ParentFS() {
		1 == v.observer && Visibility(o
			.container,
			"visibility", !0)
	}

	function Orientation() {
		log("orientation " + screen
			.orientation.angle)
	}

	function OrientationChange() {
		if (90 === Math.abs(window
				.orientation)) {
			if (log("landscape"), 1 == v
				.landscapefull) {
				var e = !0;
				1 != v.lsfullstart || o
					.start || (e = !1),
					1 != v.lsfullplay ||
					o.play || (e = !1),
					o.ispipkit && (e = !
						1), o.vast && (
						e = !0), !o
					.fullscreen && e &&
					o.actions
					.Fullscreen()
			}
		} else log("portrait"), 1 == v
			.landscapefull && o
			.fullscreen && 1 != v
			.landfullmobile && o.actions
			.Normalscreen()
	}

	function isFullscreen(e) {
		e || (e = document);
		var t = !1;
		try {
			t = !!(e.webkitFullscreenElement ||
				e
				.webkitIsFullScreen ||
				e.mozFullScreen || e
				.msFullscreenElement ||
				void 0 != e
				.fullscreenElement)
		} catch (o) {
			t = !1
		}
		return t
	}

	function isHidden(e) {
		return 0 == e.offsetWidth &&
			0 == e.offsetHeight
	}

	function Destroy() {
		for (var e in o) e.indexOf(
				"Interval") > -1 &&
			clearInterval(o[e]), e
			.indexOf("timeout") > -1 &&
			clearTimeout(o[e]);
		log("Destroyed")
	}
	"string" == typeof options &&
		optStr(), o.this = this, options
		.id ? document.getElementById(
			options.id) ?
	VisibleCheck() : document
		.addEventListener(
			"DOMContentLoaded", Init) :
		"function" ==
		typeof PluginReplace &&
		PluginReplace()
}
window.HDVBPlayerAsync && setTimeout(
	HDVBPlayerAsync, 1);