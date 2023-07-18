# Picflux API Docs

<img src="https://i.ibb.co/0QJnfPx/Logo.jpg" alt="Logo" border="0"/>
## Routes

[← Back ](../README.md)

## Films

`/api/films`

---

<h1 style="color: #98c370; font-weight: bold">Get film by uuid <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(integer)

**Body**

- None

**Response**

- Film. Example:

```json
{
  "data": {
    "id": 666,
    "externalId": {
      "kpHD": "48e8d0acb0f62d8585101798eaeceec5",
      "imdb": "tt0232500",
      "tmdb": 9799
    },
    "name": "Форсаж",
    "alternativeName": "The Fast and the Furious",
    "enName": null,
    "names": [
      {
        "name": "Форсаж",
        "language": "RU",
        "type": "Russian title on kinopoisk"
      },
      {
        "name": "The Fast and the Furious",
        "language": null,
        "type": "Original title on kinopoisk"
      },
      {
        "name": "Wild Speed",
        "language": "JP",
        "type": "English title"
      },
      {
        "name": "The Fast and the Furious (A todo gas)",
        "language": "ES",
        "type": null
      },
      {
        "name": "Forsazh",
        "language": "UA",
        "type": null
      },
      {
        "name": "Oi Machités ton Drómon",
        "language": "GR",
        "type": null
      },
      {
        "name": "Paklene ulice",
        "language": "RS",
        "type": null
      },
      {
        "name": "Bŭrzi i yarostni",
        "language": "BG",
        "type": null
      },
      {
        "name": "玩命關頭",
        "language": "TW",
        "type": null
      },
      {
        "name": "速度与激情",
        "language": "CN",
        "type": null
      },
      {
        "name": "Fast & furious",
        "language": "FR",
        "type": null
      },
      {
        "name": "Fast & Furious",
        "language": "US",
        "type": null
      },
      {
        "name": "01 - Fast & Furious",
        "language": "FR",
        "type": null
      },
      {
        "name": "F&F1 - The Fast and the Furious",
        "language": "GB",
        "type": "Sortable"
      },
      {
        "name": "Quá Nhanh Quá Nguy Hiểm",
        "language": "VN",
        "type": null
      },
      {
        "name": "ワイルド・スピード：2001",
        "language": "JP",
        "type": null
      }
    ],
    "type": "movie",
    "typeNumber": 1,
    "year": 2001,
    "description": "Его зовут Брайан, и он — фанат турбин и нитроускорителей. Он пытается попасть в автобанду легендарного Доминика Торетто, чемпиона опасных и незаконных уличных гонок. Брайан также полицейский, и его задание — втереться в доверие к Торетто, подозреваемому в причастности к дерзким грабежам грузовиков, совершаемым прямо на ходу.",
    "shortDescription": "Коп под прикрытием внедряется в банду стритрейсеров и становится одним из них. Первая часть гоночной франшизы",
    "slogan": "Если у тебя есть то, что нужно... ты можешь получить всё",
    "status": null,
    "rating": {
      "kp": 7.77,
      "imdb": 6.8,
      "filmCritics": 5.4,
      "russianFilmCritics": 0,
      "await": null
    },
    "votes": {
      "kp": 289103,
      "imdb": 403849,
      "filmCritics": 153,
      "russianFilmCritics": 0,
      "await": 0
    },
    "movieLength": 106,
    "ratingMpaa": "pg13",
    "ageRating": 16,
    "poster": {
      "url": "https://st.kp.yandex.net/images/film_big/666.jpg",
      "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_666.jpg"
    },
    "backdrop": {
      "url": "https://imagetmdb.com/t/p/original/jY9ef5nqY4xIIMu3yzW3qamUCoi.jpg",
      "previewUrl": "https://imagetmdb.com/t/p/w500/jY9ef5nqY4xIIMu3yzW3qamUCoi.jpg"
    },
    "genres": [
      {
        "name": "боевик"
      },
      {
        "name": "триллер"
      },
      {
        "name": "криминал"
      }
    ],
    "countries": [
      {
        "name": "США"
      },
      {
        "name": "Германия"
      }
    ],
    "persons": [
      {
        "id": 6317,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg",
        "name": "Пол Уокер",
        "enName": "Paul Walker",
        "description": "Brian O'Conner",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 11437,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_11437.jpg",
        "name": "Вин Дизель",
        "enName": "Vin Diesel",
        "description": "Dominic Toretto",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 2318,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_2318.jpg",
        "name": "Мишель Родригес",
        "enName": "Michelle Rodriguez",
        "description": "Letty",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 47679,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_47679.jpg",
        "name": "Джордана Брюстер",
        "enName": "Jordana Brewster",
        "description": "Mia Toretto",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 16059,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_16059.jpg",
        "name": "Мэтт Шульце",
        "enName": "Matt Schulze",
        "description": "Vince",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 29366,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_29366.jpg",
        "name": "Рик Юн",
        "enName": "Rick Yune",
        "description": "Johnny Tran",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 22695,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_22695.jpg",
        "name": "Чэд Линдберг",
        "enName": "Chad Lindberg",
        "description": "Jesse",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 47429,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_47429.jpg",
        "name": "Джонни Стронг",
        "enName": "Johnny Strong",
        "description": "Leon",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 532,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_532.jpg",
        "name": "Тед Левайн",
        "enName": "Ted Levine",
        "description": "Sgt. Tanner",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 7189,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_7189.jpg",
        "name": "Том Бэрри",
        "enName": "Thom Barry",
        "description": "Agent Bilkins",
        "profession": "актеры",
        "enProfession": "actor"
      },
      {
        "id": 449730,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_449730.jpg",
        "name": "Брайан Трансо",
        "enName": "Brian Transeau",
        "description": null,
        "profession": "композиторы",
        "enProfession": "composer"
      },
      {
        "id": 1996705,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1996705.jpg",
        "name": "Кевин Кэвэно",
        "enName": "Kevin Kavanaugh",
        "description": null,
        "profession": "художники",
        "enProfession": "designer"
      },
      {
        "id": 1115548,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1115548.jpg",
        "name": "Санья Милкович Хэйс",
        "enName": "Sanja Milkovic Hays",
        "description": null,
        "profession": "художники",
        "enProfession": "designer"
      },
      {
        "id": 1995740,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1995740.jpg",
        "name": "Флоренс Фелмэн",
        "enName": "Florence Fellman",
        "description": null,
        "profession": "художники",
        "enProfession": "designer"
      },
      {
        "id": 2409,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_2409.jpg",
        "name": "Роб Коэн",
        "enName": "Rob Cohen",
        "description": null,
        "profession": "режиссеры",
        "enProfession": "director"
      },
      {
        "id": 1085433,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1085433.jpg",
        "name": "Питер Хонесс",
        "enName": "Peter Honess",
        "description": null,
        "profession": "монтажеры",
        "enProfession": "editor"
      },
      {
        "id": 610522,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_610522.jpg",
        "name": "Эриксон Кор",
        "enName": "Ericson Core",
        "description": null,
        "profession": "операторы",
        "enProfession": "operator"
      },
      {
        "id": 52,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_52.jpg",
        "name": "Нил Х. Мориц",
        "enName": "Neal H. Moritz",
        "description": null,
        "profession": "продюсеры",
        "enProfession": "producer"
      },
      {
        "id": 6361,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_6361.jpg",
        "name": "Крейтон Беллингер",
        "enName": "Creighton Bellinger",
        "description": null,
        "profession": "продюсеры",
        "enProfession": "producer"
      },
      {
        "id": 47687,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_47687.jpg",
        "name": "Даг Клейборн",
        "enName": "Doug Claybourne",
        "description": null,
        "profession": "продюсеры",
        "enProfession": "producer"
      },
      {
        "id": 1918050,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1918050.jpg",
        "name": "Вейн Джонсон",
        "enName": "Wayne Johnson",
        "description": null,
        "profession": "продюсеры",
        "enProfession": "producer"
      },
      {
        "id": 1806292,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1806292.jpg",
        "name": "Дмитрий Кошмин",
        "enName": null,
        "description": null,
        "profession": "актеры дубляжа",
        "enProfession": "voice_actor"
      },
      {
        "id": 1053232,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1053232.jpg",
        "name": "Алексей Мясников",
        "enName": null,
        "description": null,
        "profession": "актеры дубляжа",
        "enProfession": "voice_actor"
      },
      {
        "id": 1672422,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1672422.jpg",
        "name": "Татьяна Весёлкина",
        "enName": null,
        "description": null,
        "profession": "актеры дубляжа",
        "enProfession": "voice_actor"
      },
      {
        "id": 4118844,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_4118844.jpg",
        "name": "Ирина Аникина",
        "enName": null,
        "description": null,
        "profession": "актеры дубляжа",
        "enProfession": "voice_actor"
      },
      {
        "id": 1040432,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_1040432.jpg",
        "name": "Денис Беспалый",
        "enName": null,
        "description": null,
        "profession": "актеры дубляжа",
        "enProfession": "voice_actor"
      },
      {
        "id": 47678,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_47678.jpg",
        "name": "Эрик Бергквист",
        "enName": "Erik Bergquist",
        "description": null,
        "profession": "редакторы",
        "enProfession": "writer"
      },
      {
        "id": 30322,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_30322.jpg",
        "name": "Дэвид Эйр",
        "enName": "David Ayer",
        "description": null,
        "profession": "редакторы",
        "enProfession": "writer"
      },
      {
        "id": 47677,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_47677.jpg",
        "name": "Кен Лай",
        "enName": "Ken Li",
        "description": null,
        "profession": "редакторы",
        "enProfession": "writer"
      },
      {
        "id": 30024,
        "photo": "https://st.kp.yandex.net/images/actor_iphone/iphone360_30024.jpg",
        "name": "Гэри Скотт Томпсон",
        "enName": "Gary Scott Thompson",
        "description": null,
        "profession": "редакторы",
        "enProfession": "writer"
      }
    ],
    "budget": {
      "value": 38000000,
      "currency": "$"
    },
    "fees": {
      "world": {
        "value": 207283925,
        "currency": "$"
      },
      "usa": {
        "value": 144533925,
        "currency": "$"
      }
    },
    "sequelsAndPrequels": [
      {
        "id": 323,
        "name": "Двойной форсаж",
        "enName": null,
        "alternativeName": "2 Fast 2 Furious",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/a7de8b77-34a0-4b22-9574-acec6c689958/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/a7de8b77-34a0-4b22-9574-acec6c689958/x1000"
        }
      },
      {
        "id": 623352,
        "name": "Включай турбонаддув",
        "enName": null,
        "alternativeName": "The Turbo Charged Prelude for 2 Fast 2 Furious",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/32b7545e-d964-4442-a87b-e6746459e450/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/32b7545e-d964-4442-a87b-e6746459e450/x1000"
        }
      },
      {
        "id": 106079,
        "name": "Тройной форсаж: Токийский дрифт",
        "enName": null,
        "alternativeName": "The Fast and the Furious: Tokyo Drift",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/93898f89-91a1-4084-a2c7-5e5deac4933a/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/93898f89-91a1-4084-a2c7-5e5deac4933a/x1000"
        }
      },
      {
        "id": 395978,
        "name": "Форсаж 4",
        "enName": null,
        "alternativeName": "Fast & Furious",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/a65f24e3-10db-4325-87b6-49037781ada0/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/a65f24e3-10db-4325-87b6-49037781ada0/x1000"
        }
      },
      {
        "id": 484718,
        "name": "Бандиты",
        "enName": null,
        "alternativeName": "Los Bandoleros",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/b22c914d-5b47-40f0-87a3-356f75cc4fb0/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/b22c914d-5b47-40f0-87a3-356f75cc4fb0/x1000"
        }
      },
      {
        "id": 496943,
        "name": "Форсаж 5",
        "enName": null,
        "alternativeName": "Fast Five",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/90ecc695-b927-45b4-a012-d9da7e674f52/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/90ecc695-b927-45b4-a012-d9da7e674f52/x1000"
        }
      },
      {
        "id": 594736,
        "name": "Форсаж 6",
        "enName": null,
        "alternativeName": "Furious 6",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/1441cd7d-a538-4724-b7f0-e131b2fdab21/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/1441cd7d-a538-4724-b7f0-e131b2fdab21/x1000"
        }
      },
      {
        "id": 754481,
        "name": "Форсаж 7",
        "enName": null,
        "alternativeName": "Fast & Furious 7",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/a594e007-e67b-4eab-ae03-b86192804531/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/a594e007-e67b-4eab-ae03-b86192804531/x1000"
        }
      },
      {
        "id": 894027,
        "name": "Форсаж 8",
        "enName": null,
        "alternativeName": "The Fate of the Furious",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/8dd570e1-eaac-4c2b-945d-1209bc64a187/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/8dd570e1-eaac-4c2b-945d-1209bc64a187/x1000"
        }
      },
      {
        "id": 964318,
        "name": "Форсаж 9",
        "enName": null,
        "alternativeName": "F9",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/8adda490-54b6-4780-86ad-d42f0aa020da/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/8adda490-54b6-4780-86ad-d42f0aa020da/x1000"
        }
      },
      {
        "id": 959062,
        "name": "Форсаж 10",
        "enName": null,
        "alternativeName": "Fast X",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/cb22693a-d025-4d74-81c5-11976cbf4858/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/cb22693a-d025-4d74-81c5-11976cbf4858/x1000"
        }
      }
    ],
    "watchability": {
      "items": [
        {
          "name": "Иви",
          "logo": {
            "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig"
          },
          "url": "https://www.ivi.ru/watch/90291?utm_source=yandex&utm_medium=wizard"
        }
      ]
    },
    "top10": null,
    "top250": null,
    "facts": [
      {
        "value": "У <a href=\"/name/2318/\" class=\"all\">Мишель Родригес</a> и <a href=\"/name/47679/\" class=\"all\">Джорданы Брюстер</a>, исполнивших в фильме главные женские роли, на момент съемок даже не было водительских прав.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "В первой уличной гонке были использованы 15 тысяч различных звуковых эффектов.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "Фильм, который смотрят герои — «<a href=\"/film/13332/\" class=\"all\">Дракон: История Брюса Ли</a>». Его снял режиссер «Форсажа» <a href=\"/name/2409/\" class=\"all\">Роб Коэн</a>.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "Человек за рулем черного &laquo;феррари&raquo; — это продюсер картины <a href=\"/name/52/\" class=\"all\">Нил Х. Моритц</a>, который также продюсировал другой фильм с участием <a href=\"/name/11437/\" class=\"all\">Вина Дизеля</a> — &laquo;<a href=\"/film/6032/\" class=\"all\">Три икса</a>&raquo;.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "Режиссёр <a href=\"/name/2409/\" class=\"all\">Роб Коэн</a> снялся в маленькой роли разносчика пиццы.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "В фильме было занято более 80 тюнингованных автомобилей, из которых пришла в негодность только четвертая часть.",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "Эффектная концовка фильма, начинающаяся с не менее эффектного старта легендарного Dodge Charger 1970 года, тоже не обошлась без хитростей. Дело в том, что машина, снимавшаяся в фильме, выглядела как настоящий дрэгстерский аппарат, но не была таковым. В принципе, настоящие экземпляры, участвующие в четвертьмильных заездах, преспокойно поднимаются на дыбы, но Charger из фильма «схитрил». Ответственная за трюки команда оборудовала Dodge специальными пневмо-толкателями с маленькими колесиками. Каскадер, управляющий в тот момент машиной, нажимал в салоне кнопку, и толкатели поднимали автомобиль на дыбы, притом Charger мог проехать на задних колесах 10-20 метров!",
        "type": "FACT",
        "spoiler": false
      },
      {
        "value": "В команду был приглашен консультант — настоящий стритрейсер со стажем, который и посоветовал приобрести Mitsubishi Eclipse GSX 1995 года, Toyota Supra RZ 1994 и Mazda RX-7 1993 года выпуска для главных героев. Каждая из машин (а купили по 5 штук каждой) стоила около 10 тыс. долларов, плюс примерно по столько же ушло на доработку.",
        "type": "FACT",
        "spoiler": false
      }
    ],
    "spokenLanguages": [],
    "seasonsInfo": [],
    "collections": [],
    "productionCompanies": [],
    "similarMovies": [
      {
        "id": 2011,
        "name": "Угнать за 60 секунд",
        "enName": null,
        "alternativeName": "Gone in Sixty Seconds",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/c12b330e-808f-45cb-a38c-5309587722ae/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/c12b330e-808f-45cb-a38c-5309587722ae/x1000"
        }
      },
      {
        "id": 14349,
        "name": "Такси",
        "enName": null,
        "alternativeName": "Taxi",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/1fb5cf42-c546-4171-8261-81a92ad0f08e/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/1fb5cf42-c546-4171-8261-81a92ad0f08e/x1000"
        }
      },
      {
        "id": 1990,
        "name": "На гребне волны",
        "enName": null,
        "alternativeName": "Point Break",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/3283195b-ba13-46cb-b24c-6ff38bf4b5fe/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/3283195b-ba13-46cb-b24c-6ff38bf4b5fe/x1000"
        }
      },
      {
        "id": 678975,
        "name": "Need for Speed: Жажда скорости",
        "enName": null,
        "alternativeName": "Need for Speed",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/4b842adb-1cf3-4865-80ce-e3d72d59ba2b/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/4b842adb-1cf3-4865-80ce-e3d72d59ba2b/x1000"
        }
      },
      {
        "id": 6206,
        "name": "Перевозчик",
        "enName": null,
        "alternativeName": "The Transporter",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/4483445/4e6a8d3f-fc61-4716-862d-3241842d99fa/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/4483445/4e6a8d3f-fc61-4716-862d-3241842d99fa/x1000"
        }
      },
      {
        "id": 6032,
        "name": "Три икса",
        "enName": null,
        "alternativeName": "xXx",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/1d8dcbf7-9dff-4787-bdaa-9afad82bdde2/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/1d8dcbf7-9dff-4787-bdaa-9afad82bdde2/x1000"
        }
      },
      {
        "id": 102136,
        "name": "Смертельная гонка",
        "enName": null,
        "alternativeName": "Death Race",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/8fd2e2df-81f0-4a3d-aeb3-b386d659e19a/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/8fd2e2df-81f0-4a3d-aeb3-b386d659e19a/x1000"
        }
      },
      {
        "id": 854,
        "name": "Такси 2",
        "enName": null,
        "alternativeName": "Taxi 2",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/a89ba16c-271c-4fb9-b1a5-806449bc3d62/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/a89ba16c-271c-4fb9-b1a5-806449bc3d62/x1000"
        }
      },
      {
        "id": 17659,
        "name": "Крутящий момент",
        "enName": null,
        "alternativeName": "Torque",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/ff47fcc5-5ba4-40b3-a50a-367cf3a6ebb8/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/ff47fcc5-5ba4-40b3-a50a-367cf3a6ebb8/x1000"
        }
      },
      {
        "id": 14333,
        "name": "Мишель Вальян: Жажда скорости",
        "enName": null,
        "alternativeName": "Michel Vaillant",
        "type": "movie",
        "poster": {
          "url": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/7af2eb92-b61e-4794-91a4-79f24b850fae/orig",
          "previewUrl": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/7af2eb92-b61e-4794-91a4-79f24b850fae/x1000"
        }
      }
    ],
    "releaseYears": [],
    "createdAt": "2023-03-12T00:39:00.937Z",
    "updatedAt": "2023-07-14T20:23:36.071Z",
    "videos": {
      "trailers": [
        {
          "url": "https://www.youtube.com/embed/m_jWcyfjFGw",
          "name": "Legacy Trailer",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/HRe0LVDO9zE",
          "name": "Trailer 2",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/ZsJz2TJAPjw",
          "name": "Official Trailer",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/m_jWcyfjFGw",
          "name": "Legacy Trailer",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/HRe0LVDO9zE",
          "name": "Trailer 2",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/ZsJz2TJAPjw",
          "name": "Official Trailer",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/_Oi9Ma7nxK8",
          "name": "Форсаж (2001) - Дублир трейлер2 Open Matte HD",
          "site": "youtube",
          "type": "TRAILER"
        },
        {
          "url": "https://www.youtube.com/embed/_Oi9Ma7nxK8",
          "name": "Форсаж (2001) - Дублир трейлер2 Open Matte HD",
          "site": "youtube",
          "type": "TRAILER"
        }
      ],
      "teasers": []
    },
    "premiere": {
      "world": "2001-06-18T00:00:00.000Z",
      "russia": "2001-10-18T00:00:00.000Z"
    },
    "ticketsOnSale": false,
    "audience": [
      {
        "count": 25500000,
        "country": "США"
      },
      {
        "count": 1545240,
        "country": "Великобритания"
      },
      {
        "count": 1338595,
        "country": "Германия"
      }
    ],
    "isSeries": false,
    "seriesLength": null,
    "totalSeriesLength": null,
    "deletedAt": null,
    "logo": {
      "url": "https://imagetmdb.com/t/p/original/uPzO7DHR1Z3zZQExKp5X4ABUu79.png"
    }
  },
  "statusCode": 200,
  "error": null,
  "message": null,
  "averageRating": 2
}
```

<h1 style="color: #98c370; font-weight: bold">Get films with pagination <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films?offset=(1+)&limit=<250&required=poster,backdrop

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
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/:id(integer)/comments?offset(0+)&limit=(50<)

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
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/comments/:parent_id(uuid)?offset(0+)&limit=(50<)

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
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/films/:id(int)/rate

**Body**

- rating(int/float(will be formatted to integer anyway))

**Response**

- None

<h1 style="color: #98c370; font-weight: bold">Search films with pagination <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/films/search?q=QUERTY&offset=(1+)&limit(<50)(uuid)

**Body**

- None

**Response**

- Films. Example:

```json
{
  "data": {
    "docs": [
      {
        "id": 915196,
        "name": "Очень странные дела",
        "alternativeName": "Stranger Things",
        "enName": "Stranger Things",
        "names": [
          "Очень странные дела",
          "Stranger Things",
          "Bagulhos Sinistros",
          "怪奇物语",
          "უცნაური საქმეები",
          "Παράξενα Πράγματα",
          "اتفاقات عجیب",
          "ストレンジャー・シングス",
          "기묘한 이야기",
          "Чудни Нешта",
          "Странные вещи",
          "Крайне странные события",
          "Загадочные события",
          "Zvláštne veci",
          "Tuhaf Şeyler",
          "Загадкові справи",
          "Дивні дива 2",
          "Дивні дива 3"
        ],
        "type": "tv-series",
        "year": 2016,
        "description": "1980-е годы, тихий провинциальный американский городок. Благоприятное течение местной жизни нарушает загадочное исчезновение подростка по имени Уилл. Выяснить обстоятельства дела полны решимости родные мальчика и местный шериф, также события затрагивают лучшего друга Уилла – Майка. Он начинает собственное расследование. Майк уверен, что близок к разгадке, и теперь ему предстоит оказаться в эпицентре ожесточенной битвы потусторонних сил.",
        "shortDescription": "",
        "logo": null,
        "poster": "https://st.kp.yandex.net/images/film_big/915196.jpg",
        "backdrop": null,
        "rating": 8.379,
        "votes": 459085,
        "movieLength": 0,
        "genres": [
          "ужасы",
          "фантастика",
          "фэнтези",
          "триллер",
          "драма",
          "детектив"
        ],
        "countries": ["США"],
        "releaseYears": []
      }
    ],
    "total": 1000,
    "limit": 1,
    "page": 1,
    "pages": 1000
  },
  "statusCode": 200,
  "error": null,
  "message": null
}
```
