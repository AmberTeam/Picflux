import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import http from 'http';
import https from 'https';
import { URL } from 'url';
import { Injectable } from '@nestjs/common';
import { dynamicHostnames, staticHostnames } from 'src/utils/sra_hostnames';

// const { dynamicHostnames, staticHostnames } = require('../utils/sra.hstnames');
// const ApiError = require('../exceptions/api.error');

@Injectable()
export class SraService {
  private string_up_to_char(str, starter_val, char, limit = 10) {
    const starter_i = str.indexOf(starter_val) + starter_val.length;
    for (var i = starter_i; i < starter_i + limit; i++) {
      if (str[i] === char) return str.slice(starter_i, i);
    }
  }

  // private constructErrorResponse(url: string, status: number, error: string) {
  //   return `
  //       <html>
  //           <head> 
  //               <title>${status}</title>
  //           </head>
  //           <style> 
  //               html {
  //                   background: url("/static/cover3.jpg");
  //                   background-size: cover;
  //                   background-position: bottom
  //               }
        
  //               .container { 

  //                   background: #000;
  //                   opacity: .9;
  //                   padding: .3rem
  //               }
                
  //               * {
  //                   font-family: "Consolas";
  //                   font-size: 12px;
  //                   color: #0f0
  //               }
  //           </style>
  //           <body>  
  //               <div class="container">
  //                       <div> URL: ${url} </div> 
  //                       <div> STATUS: ${status} </div> 
  //                       <div> INFO: ${error} </div>
  //               </div>
  //           </body>
  //       </html>
  //       `;
  // }

  // private async rewriteVoidBoost(url: string) {
  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'text/html',
  //     },
  //   })
  //     .then((res) => {
  //       return res.text();
  //     })
  //     .then((resTxt) => {
  //       resTxt = resTxt
  //         .replace("'preroll':", "'__undefined__':")
  //         .replaceAll('#00adef', '#f0a832')
  //         .replace(
  //           `${resTxt.substring(
  //             resTxt.indexOf('https://unpkg.com'),
  //             resTxt.indexOf('index.js') + 8,
  //           )}`,
  //           `http://localhost:5000/voidboost/playerjs?url=${resTxt.substring(
  //             resTxt.indexOf('https://unpkg.com'),
  //             resTxt.indexOf('index.js') + 8,
  //           )}`,
  //         )
  //         .replace('/thumbnails/', 'https://voidboost.net/thumbnails/')
  //         .replace("'?s='", `'${url}?s='`)
  //         .replace(
  //           "_url_params = ''",
  //           `_url_params = ''; parent.postMessage('https://voidboost.net/embed/${url}?s='+ _season +'&e='+ _episode +'&h='+ cdn.player.getVBR() + _url_params, "*")`,
  //         )
  //         .replace(
  //           "window.location.href = '/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a;",
  //           "parent.postMessage(window.location.href = 'https://voidboost.net/'+ type +'/'+ t +'/iframe?h='+ cdn.player.getVBR() + a)",
  //         );
  //       const dom = new JSDOM(resTxt);
  //       const sc = dom.window.document.createElement('script');
  //       sc.src = `/static/pjs/js/voidboost/sch.js`;
  //       dom.window.document.getElementsByTagName('head')[0].appendChild(sc);
  //       return dom.window.document.documentElement.outerHTML;
  //     })
  //     .catch((error) => {
  //       console.error('Got err: ' + error);
  //       return this.constructErrorResponse(url, 500, error);
  //     });
  // }

  // private async rewriteVid167(urlC: URL) {
  //   return await new Promise(async (resolve, reject) => {
  //     const o = {
  //       hostname: urlC.hostname,
  //       path: urlC.pathname,
  //       port: 443,
  //       headers: {
  //         'Content-Type': 'text/html',
  //         Referer: 'http://localhost:5000',
  //       },
  //     };

  //     https.get(o, async (res) => {
  //       const { statusCode } = res;
  //       if (statusCode !== 200)
  //         return resolve(
  //           this.constructErrorResponse(urlC.href, statusCode, 'BadRequest'),
  //         );
  //       var chunks = '';
  //       res.on('data', (chunk) => {
  //         chunks += chunk.toString('utf8');
  //       });
  //       res.on('end', async () => {
  //         if (chunks === '')
  //           return resolve(
  //             this.constructErrorResponse(urlC.href, statusCode, 'BadRequest'),
  //           );

  //         //logging script versions
  //         //hls.js
  //         const hlsjsv = this.string_up_to_char(chunks, 'hls.js?v=', '"', 15);
  //         //playerjs.js
  //         const pjsv = this.string_up_to_char(chunks, 'playerjs.js?=', '"', 30);

  //         chunks = chunks
  //           .replace(
  //             '/playerjs/js/playerjs.js?=' + pjsv,
  //             `/vid167/playerjs?curl=${urlC.origin}`,
  //           )
  //           .replace('/player', `${urlC.origin}/player`)
  //           .replace('preroll', '__undefined__')
  //           .replace('pausebanner', '__undefined__')
  //           .replace('banner_show', '__undefined__');

  //         const dom = new JSDOM(chunks);
  //         const sc = dom.window.document.createElement('script');
  //         sc.src = `/static/pjs/js/vid167/rch.js`;
  //         dom.window.document.getElementsByTagName('head')[0].appendChild(sc);
  //         return resolve(dom.window.document.documentElement.outerHTML);
  //       });
  //       res.on('error', (err) => {
  //         console.error('Got error: ' + err);
  //         return resolve(
  //           this.constructErrorResponse(urlC.href, 500, err.message),
  //         );
  //       });
  //     });
  //   });
  // }

  // private async rewriteSvetacdnin(
  //   hostname: string,
  //   path: string,
  //   search: string,
  // ) {
  //   return await new Promise<string>(async (resolve, reject) => {
  //     let options = {
  //       hostname,
  //       path: path + search,
  //       port: 443,
  //       headers: {
  //         'Content-Type': 'text/html',
  //         Referer: 'http://localhost:5000',
  //       },
  //     };

  //     https
  //       .get(options, async (res) => {
  //         const { statusCode } = res;

  //         if (statusCode !== 200)
  //           return resolve(
  //             this.constructErrorResponse(
  //               'https://' + hostname + path + search,
  //               statusCode,
  //               'BadRequest',
  //             ),
  //           );

  //         let chunks = '';
  //         res.on('data', (chunk) => {
  //           chunks += chunk.toString('utf8');
  //         });
  //         res.on('end', async () => {
  //           const v = getStringUpToChar(chunks, '?v=', '"', 15);
  //           chunks = chunks
  //             .replace(
  //               `/Assets/pj_films.js?v=${v}`,
  //               `/annacdn/script?url=/Assets/pj_films.js&v=${v}`,
  //             )
  //             .replace(
  //               `/Assets/pj_serials.js?v=${v}`,
  //               `/annacdn/script?url=/Assets/pj_serials.js&v=${v}`,
  //             )
  //             .replace(
  //               `/Assets/fb.js?v=${v}`,
  //               `https://${hostname}/Assets/fb.js?v=${v}`,
  //             )
  //             .replace(
  //               `/Assets/pj.js?v=${v}`,
  //               `https://${hostname}/Assets/pj.js?v=${v}`,
  //             )
  //             .replace(
  //               `https://cdn.jsdelivr.net/npm/hls.js@0.14.17`,
  //               `/static/pjs/js/annacdn/hls.js@0.14.17`,
  //             )
  //             .replace(
  //               `/Assets/iframe.css`,
  //               `https://${hostname}/Assets/iframe.css`,
  //             );
  //           const dom = new JSDOM(chunks);
  //           const link = dom.window.document.createElement('script');
  //           link.src = `/static/pjs/js/annacdn/rch.js`;
  //           dom.window.document
  //             .getElementsByTagName('head')[0]
  //             .appendChild(link);

  //           return resolve(dom.window.document.documentElement.outerHTML);
  //         });
  //       })
  //       .on('error', (e) => {
  //         console.error(`Got error: ${e.message}`);
  //         return resolve(
  //           this.constructErrorResponse(
  //             'https://' + hostname + path + search,
  //             500,
  //             e.message,
  //           ),
  //         );
  //       });
  //   });
  // }

  // private async rewriteAnnacdncc(
  //   hostname: string,
  //   path: string,
  //   search: string,
  // ) {
  //   return await new Promise<string>(async (resolve, reject) => {
  //     let options = {
  //       hostname,
  //       path: path + search,
  //       headers: {
  //         'Content-Type': 'text/html',
  //         Referer: 'http://localhost:5000',
  //       },
  //     };

  //     http
  //       .get(options, async (res) => {
  //         const { statusCode } = res;

  //         if (statusCode !== 302) {
  //           console.log('SPA: Terminating: The request was not redirected.');
  //           return resolve(
  //             this.constructErrorResponse(
  //               'https://' + hostname + path + search,
  //               statusCode,
  //               'The request was not redirected.',
  //             ),
  //           );
  //         }

  //         http.get({ ...options, path: res.headers.location }, async (_res) => {
  //           let chunks = '';
  //           _res.on('data', (chunk) => {
  //             chunks += chunk.toString('utf8');
  //           });
  //           _res.on('end', async () => {
  //             const v = getStringUpToChar(chunks, '?v=', '"', 15);
  //             chunks = chunks
  //               .replace(
  //                 `/Assets/pj_films.js?v=${v}`,
  //                 `/annacdn/script?url=/Assets/pj_films.js&v=${v}`,
  //               )
  //               .replace(
  //                 `/Assets/pj_serials.js?v=${v}`,
  //                 `/annacdn/script?url=/Assets/pj_serials.js&v=${v}`,
  //               )
  //               .replace(
  //                 `/Assets/fb.js?v=${v}`,
  //                 `https://${hostname}/Assets/fb.js?v=${v}`,
  //               )
  //               .replace(
  //                 `/Assets/pj.js?v=${v}`,
  //                 `https://${hostname}/Assets/pj.js?v=${v}`,
  //               )
  //               .replace(
  //                 `https://cdn.jsdelivr.net/npm/hls.js@0.14.17`,
  //                 `/static/pjs/js/annacdn/hls.js@0.14.17`,
  //               )
  //               .replace(
  //                 `/Assets/iframe.css`,
  //                 `https://${hostname}/Assets/iframe.css`,
  //               );
  //             const dom = new JSDOM(chunks);
  //             const link = dom.window.document.createElement('script');
  //             link.src = `/static/pjs/js/annacdn/rch.js`;
  //             dom.window.document
  //               .getElementsByTagName('head')[0]
  //               .appendChild(link);

  //             return resolve(dom.window.document.documentElement.outerHTML);
  //           });
  //         });
  //       })
  //       .on('error', (e) => {
  //         console.error(`Got error: ${e.message}`);
  //         return resolve(
  //           this.constructErrorResponse(
  //             'https://' + hostname + path + search,
  //             500,
  //             e.message,
  //           ),
  //         );
  //       });
  //   });
  // }

  // private async rewriteApiWprefixWs(urlC: URL) {
  //   return new Promise<string>(async (resolve, reject) => {
  //     const o = {
  //       hostname: urlC.hostname,
  //       path: urlC.pathname,
  //       port: 443,
  //       headers: {
  //         'Content-Type': 'text/html',
  //         Referer: 'http://localhost:5000',
  //       },
  //     };

  //     https.get(o, (res) => {
  //       const { statusCode } = res;

  //       if (statusCode !== 200)
  //         return resolve(
  //           this.constructErrorResponse(urlC.href, statusCode, 'BadRequest'),
  //         );

  //       let chunks = '';
  //       res.on('data', (chunk) => {
  //         chunks += chunk.toString('utf8');
  //       });
  //       res.on('end', () => {
  //         const primaryFrg = chunks.substring(
  //           chunks.indexOf('"color-primary":') + 17,
  //           chunks.indexOf('"background-color-primary"'),
  //         );
  //         const primary = primaryFrg.replace('",', '');
  //         chunks = chunks
  //           .replace(
  //             'body {',
  //             'html {height: 100%;overflow: hidden;}\nbody {\n height:100%;',
  //           )
  //           .replaceAll(
  //             `"color-primary":"${primary}"`,
  //             '"color-primary":"#f0a832"',
  //           );
  //         const dom = new JSDOM(chunks);
  //         const link = dom.window.document.createElement('script');
  //         link.src = `/static/pjs/js/api_wprefix_ws/sch.js`;
  //         dom.window.document.getElementsByTagName('head')[0].appendChild(link);
  //         return resolve(dom.window.document.documentElement.outerHTML);
  //       });
  //       res.on('error', (err) => {
  //         console.error('Got err: ' + err);
  //         return resolve(
  //           this.constructErrorResponse(urlC.href, 500, err.message),
  //         );
  //       });
  //     });
  //   });
  // }

  // private async multidomainCheck(url: string, urlC: URL) {
  //   for (let i = 0; i < dynamicHostnames.length; i++) {
  //     let coincidences = 0;
  //     for (let a = 0; a < dynamicHostnames[i].overlaps.length; a++) {
  //       if (
  //         url.includes(dynamicHostnames[i].overlaps[a]) &&
  //         url.indexOf(dynamicHostnames[i].overlaps[a]) <
  //           (url.indexOf('?') !== -1 ? url.indexOf('?') : 1000)
  //       ) {
  //         coincidences++;
  //       }
  //     }

  //     if (coincidences >= 1) {
  //       let data = null;
  //       switch (dynamicHostnames[i].domain_wprefix) {
  //         case 'vid16wprefix':
  //           data = await this.rewriteVid167(urlC);
  //           return data;
  //         case 'apiWprefixWs':
  //           data = await this.rewriteApiWprefixWs(urlC);
  //           return data;
  //         case 'wprefixSvetacdnIn':
  //           if (urlC.hostname === '47.svetacdn.in') {
  //             return this.rewriteAnnacdncc(
  //               urlC.hostname,
  //               urlC.pathname,
  //               urlC.search,
  //             );
  //           }
  //           return this.rewriteSvetacdnin(
  //             urlC.hostname,
  //             urlC.pathname,
  //             urlC.search,
  //           );
  //       }
  //     }
  //   }
  //   return null;
  // }

  // async rewriteByHostname(url: string) {
  //   try {
  //     const urlDeconstructed = new URL(
  //       url.replace('https//', 'https://').replace('https:://', 'https://'),
  //     );

  //     const multidomain = await this.multidomainCheck(url, urlDeconstructed);
  //     if (multidomain) return multidomain;

  //     switch (urlDeconstructed.host) {
  //       case staticHostnames.voidboost_net.domain:
  //         return this.rewriteVoidBoost(url);
  //       case staticHostnames.annacdn_cc.domain:
  //         return this.rewriteAnnacdncc(
  //           urlDeconstructed.hostname,
  //           urlDeconstructed.pathname,
  //           urlDeconstructed.search,
  //         );
  //       default:
  //         return this.constructErrorResponse(url, 404, 'Undefined hostname');
  //     }
  //   } catch (e) {
  //     return this.constructErrorResponse(url, 400, 'Bad Request');
  //   }
  // }
}