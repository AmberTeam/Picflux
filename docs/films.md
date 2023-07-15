# Picflux API Docs

![Background Image](/logo.jpg)

## Routes

[← Back ](../README.md)

## Films

`/api/films`

---

<h1 style="color: #98c370; font-weight: bold">Get film by uuid <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)

**Body**

- None

**Response**

- Film. Example:

```json
{
  "id": 322,
  "uuid": "278d92d1-d3c1-4567-b17a-35d4a0e15399",
  "externalKpHD": "",
  "externalImdb": "tt0304141",
  "externalTmdb": "673",
  "ratingKp": 8.221,
  "ratingImdb": 7.9,
  "ratingFilmCritics": 0,
  "ratingRussianFilmCritics": 80,
  "votesKp": 613476,
  "votesImdb": 658243,
  "votesFilmCritics": 0,
  "votesRussianFilmCritics": 5,
  "enImdbPoster": "",
  "uaImdbPoster": "",
  "ruImdbPoster": "",
  "posterUrl": "https://st.kp.yandex.net/images/film_big/322.jpg",
  "posterPreviewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_322.jpg",
  "externalId": null,
  "rating": {
    "kp": 8.221,
    "imdb": 7.9,
    "await": null,
    "filmCritics": 7.9,
    "russianFilmCritics": 80
  },
  "votes": {
    "kp": 613476,
    "imdb": 658243,
    "await": 0,
    "filmCritics": 259,
    "russianFilmCritics": 5
  },
  "movieLength": 142,
  "type": "movie",
  "name": "Гарри Поттер и узник Азкабана",
  "description": "В третьей части истории о юном волшебнике полюбившиеся всем герои — Гарри Поттер, Рон и Гермиона — возвращаются уже на третий курс школы чародейства и волшебства Хогвартс. На этот раз они должны раскрыть тайну узника, сбежавшего из зловещей тюрьмы Азкабан, чье пребывание на воле создает для Гарри смертельную опасность...",
  "year": 2004,
  "poster": null,
  "genres": [
    {
      "name": "фэнтези"
    },
    {
      "name": "приключения"
    },
    {
      "name": "семейный"
    }
  ],
  "genresList": ["фэнтези", "приключения", "семейный"],
  "countries": [
    {
      "name": "Великобритания"
    },
    {
      "name": "США"
    }
  ],
  "countriesList": ["Великобритания", "США"],
  "alternativeName": "Harry Potter and the Prisoner of Azkaban",
  "enName": "Harry Potter III: Harry Potter and the Prisoner of Azkaban",
  "names": [
    {
      "name": "Гарри Поттер и узник Азкабана"
    },
    {
      "name": "Harry Potter and the Prisoner of Azkaban"
    },
    {
      "name": "Hari Poter i zatvorenik iz Askabana",
      "type": null,
      "language": "RS"
    },
    {
      "name": "Garri Potter i uznik Azkabana",
      "type": null,
      "language": "RU"
    },
    {
      "name": "Khari Potŭr i zatvornikŭt ot Azkaban",
      "type": null,
      "language": "BG"
    },
    {
      "name": "O Chári Póter kai o Aichmálotos tou Azkampán",
      "type": null,
      "language": "GR"
    },
    {
      "name": "Hari Poter i Zatvorenikot od Azkaban",
      "type": null,
      "language": "MK"
    },
    {
      "name": "Harri Potter i v'yazenʹ Azkabanu",
      "type": null,
      "language": "UA"
    },
    {
      "name": "Harry Potter A Vezen Zazkabanu",
      "type": null,
      "language": "CZ"
    },
    {
      "name": "Harry Potter Eo Prisoneiro de Azkaban",
      "type": null,
      "language": "PT"
    },
    {
      "name": "哈利波特与阿兹卡班的囚徒",
      "type": null,
      "language": "CN"
    },
    {
      "name": "哈利波特 3：阿茲卡班的逃犯",
      "type": null,
      "language": "HK"
    },
    {
      "name": "哈利波特3：阿兹卡班的囚徒",
      "type": null,
      "language": "CN"
    },
    {
      "name": "해리 포터와 아즈카반의 죄수",
      "type": null,
      "language": "KR"
    },
    {
      "name": "Harry Potter e o Prisioneiro de Azkaban",
      "type": null,
      "language": "BR"
    },
    {
      "name": "해리포터와 아즈카반의 죄수",
      "type": null,
      "language": "KR"
    },
    {
      "name": "Harijs Poters un Azkabanas gūsteknis",
      "type": null,
      "language": "LV"
    },
    {
      "name": "Harry Potter III: Harry Potter and the Prisoner of Azkaban",
      "type": "Alternative Title",
      "language": "US"
    },
    {
      "name": "Harry Potter und der Gefangene von Askaban",
      "type": null,
      "language": "DE"
    },
    {
      "name": "ハリー・ポッターとアズカバンの囚人",
      "type": null,
      "language": "JP"
    },
    {
      "name": "ハリーポッターとアズカバンの囚人",
      "type": null,
      "language": "JP"
    },
    {
      "name": "Harry Potter (3) et le Prisonnier d'Azkaban",
      "type": null,
      "language": "FR"
    },
    {
      "name": "הרי פותר והאסיר מאזקבאן",
      "type": null,
      "language": "IL"
    },
    {
      "name": "ארי פוטר 3: האסיר מאזקבן (2004)",
      "type": null,
      "language": "IL"
    },
    {
      "name": "Harry Potter et le Prisonnier d'Azkaban",
      "type": null,
      "language": "FR"
    },
    {
      "name": "ハリー・ポッターとアズカバンの囚人：2004",
      "type": null,
      "language": "JP"
    }
  ],
  "shortDescription": "Беглый маг, тайны прошлого и путешествия во времени. В третьей части поттерианы Альфонсо Куарон сгущает краски",
  "releaseYears": [
    {
      "end": 2004,
      "start": 2004
    }
  ]
}
```

<h1 style="color: #98c370; font-weight: bold">Get film players <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)/players

**Body**

- None

**Response**

- Players. Example:

```json
[
  {
    "force": "https://voidboost.net/embed/915196",
    "sra": "http://localhost:3000/api/sra/by_hostname?link=https://voidboost.net/embed/915196"
  },
  {
    "force": "https://47.annacdn.cc/bPc1TBx1jCZH?kp_id=915196",
    "sra": "http://localhost:3000/api/sra/by_hostname?link=https://47.annacdn.cc/bPc1TBx1jCZH?kp_id=915196"
  },
  {
    "force": "https://47.svetacdn.in/bPc1TBx1jCZH?kp_id=915196",
    "sra": "http://localhost:3000/api/sra/by_hostname?link=https://47.svetacdn.in/bPc1TBx1jCZH?kp_id=915196"
  },
  {
    "force": "https://api.tobaco.ws/embed/kp/915196",
    "sra": "http://localhost:3000/api/sra/by_hostname?link=https://api.tobaco.ws/embed/kp/915196"
  }
]
```

<h1 style="color: #98c370; font-weight: bold">Get film parent comments <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)/comments

**Body**

- None

**Response**

- Comments. Example:

```json
[
  {
    "id": "42552f01-9b12-4387-9460-87f08ea4dac9",
    "createdAt": "2023-07-15T10:38:39.553Z",
    "text": "Hi"
  },
  {
    "id": "f909cbe6-8909-433c-b6cc-f6cda2a5908b",
    "createdAt": "2023-07-15T10:51:32.930Z",
    "text": "Hi 2"
  },
  {
    "id": "69e39cd6-03a8-459c-8334-287148e81b53",
    "createdAt": "2023-07-15T10:56:48.329Z",
    "text": "Amazing movie!"
  },
  {
    "id": "86769af4-966e-4d37-8d79-4c762db749a9",
    "createdAt": "2023-07-15T11:10:14.107Z",
    "text": "REally?"
  },
  {
    "id": "c922b24e-9b96-4d41-b770-39ddec9400c8",
    "createdAt": "2023-07-15T11:10:35.218Z",
    "text": "Yeah Buddy"
  }
]
```

<h1 style="color: #98c370; font-weight: bold">Get sub-comments of a parent comment <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)/comments/:parent_id(uuid)

**Body**

- None

**Response**

- Comments. Example:

```json
[
    {
        "id": "f909cbe6-8909-433c-b6cc-f6cda2a5908b",
        "createdAt": "2023-07-15T10:51:32.930Z",
        "text": "Hi 2",
        "commentId": "42552f01-9b12-4387-9460-87f08ea4dac9"
    },
    {
        "id": "86769af4-966e-4d37-8d79-4c762db749a9",
        "createdAt": "2023-07-15T11:10:14.107Z",
        "text": "REally?",
        "commentId": "42552f01-9b12-4387-9460-87f08ea4dac9"
    }
]
```


<h1 style="color: #98c370; font-weight: bold">Rate a film <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/films/:id(uuid)/rate

**Body**
- rating(int/float(will be formatted to integer anyway))

**Response**
- None