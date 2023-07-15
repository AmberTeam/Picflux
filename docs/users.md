# Picflux API Docs

![Background Image](/logo.jpg)

## Routes

[← Back ](../README.md)

## Users

`/api/users`

---

<h1 style="color: #98c370; font-weight: bold">Get user's watchclist <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/users/watch_list

**Body**
- None

**Response**
- A list of uuids of films(string[])

---

<h1 style="color: #98c370; font-weight: bold">Add a film to watchlist <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/watch_list/:id(uuid of a film)

**Body**
- None

**Response**
- A user, with his new watch-list

---

<h1 style="color: #98c370; font-weight: bold">Remove a film from watch-list <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #d7887e; font-weight: bold">DELETE</span> /api/users/watch_list/:id(uuid of a film)

**Body**
- None

**Response**
- A user, with his new watch-list

---

<h1 style="color: #98c370; font-weight: bold">Get user alerts <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/users/alerts

**Body**
- None

**Response**
- A list of alerts

---

<h1 style="color: #98c370; font-weight: bold">Get user alerts <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/users/alerts

**Body**
- None

**Response**
- A list of alerts

---

<h1 style="color: #98c370; font-weight: bold">Add an alert <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/alerts/create

**Body**
- recipient: uuid - the user who will receive this alert
- tag: string - a tag of alert(for example: msg)

**Response**
- the alert


<h1 style="color: #98c370; font-weight: bold">Get user by id <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #69d797; font-weight: bold">GET</span> /api/users/:id(uuid)

**Body**
- None

**Response**
- User

--

<h1 style="color: #98c370; font-weight: bold">Update last_active of user <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/last_active/update

**Body**
- None

**Response**
- The user with updated last_active


--

<h1 style="color: #98c370; font-weight: bold">Follow to a user <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/follow?target=UUID

**Body**
- None

**Response**
- None


<h1 style="color: #98c370; font-weight: bold">Unfollow from a user <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/follow?target=UUID

**Body**
- None

**Response**
- None

<h1 style="color: #98c370; font-weight: bold">Update user info <span style="color: #8c8caf;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/users/update

**Body**
- avatar(file)
- username(optional)
- biography(optional)

**Response**
- Updated user