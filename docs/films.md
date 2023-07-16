# Picflux API Docs

<img src="https://i.ibb.co/0QJnfPx/Logo.jpg" alt="Logo" border="0"/>
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
  "enImdbPoster": "",
  "uaImdbPoster": "",
  "ruImdbPoster": "",
  "posterUrl": "https://st.kp.yandex.net/images/film_big/322.jpg",
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
  "poster": null,
  "genresList": ["фэнтези", "приключения", "семейный"],
  "countriesList": ["Великобритания", "США"],
  "alternativeName": "Harry Potter and the Prisoner of Azkaban",
  "enName": "Harry Potter III: Harry Potter and the Prisoner of Azkaban",
  "shortDescription": "Беглый маг, тайны прошлого и путешествия во времени. В третьей части поттерианы Альфонсо Куарон сгущает краски",
  "releaseYears": [
    {
      "end": 2004,
      "start": 2004
    }
  ]
}
```

<h1 style="color: #98c370; font-weight: bold">Get films with pagination <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films?offset=(0+)&limit(<50)(uuid)

**Body**

- None

**Response**

- Films. Example:
```json
{
  "id": 322,
  "uuid": "278d92d1-d3c1-4567-b17a-35d4a0e15399",
  "enImdbPoster": "",
  "uaImdbPoster": "",
  "ruImdbPoster": "",
  "posterUrl": "https://st.kp.yandex.net/images/film_big/322.jpg",
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
  "poster": null,
  "genresList": ["фэнтези", "приключения", "семейный"],
  "countriesList": ["Великобритания", "США"],
  "alternativeName": "Harry Potter and the Prisoner of Azkaban",
  "enName": "Harry Potter III: Harry Potter and the Prisoner of Azkaban",
  "shortDescription": "Беглый маг, тайны прошлого и путешествия во времени. В третьей части поттерианы Альфонсо Куарон сгущает краски",
  "releaseYears": [
    {
      "end": 2004,
      "start": 2004
    }
  ]
}
```

<h1 style="color: #98c370; font-weight: bold">Get film parent comments <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)/comments?offset(0+)&limit=(50<)

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
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(uuid)/comments/:parent_id(uuid)?offset(0+)&limit=(50<)

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