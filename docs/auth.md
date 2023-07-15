# Picflux API Docs

<img src="https://i.ibb.co/0QJnfPx/Logo.jpg" alt="Logo" border="0"/>

## Routes

[← Back ](../README.md)

## Auth

`/api/auth`

---

<h1 style="color: #98c370; font-weight: bold">Sign up <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> `/api/auth/signup`

**Body**

- email <span style="color: red; font-weight: bold">\*</span>
- username (min_length: 4,max_length:30) <span style="color: red; font-weight: bold">\*</span>
- password (max_length:30) <span style="color: red; font-weight: bold">\*</span>

**Response**

- access_token (15m)
- refresh_token (30m)

Example:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjg5NDM2MjQyfQ.O1tAFZwW1ZL-_z8mSwNKy6gKouUxGbcNmkqvx0ZEMbI",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjkwNjQ0OTQyfQ.YV3ol6A3RL5Jtm71IwMTXEsToUXjtmLHbolKneDUfk8"
}
```

---

<h1 style="color: #98c370; font-weight: bold">Sign in <span style="color: #8c8caf;">Public</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/auth/signin

**Body**

- email <span style="color: red; font-weight: bold">\*</span>
- password <span style="color: red; font-weight: bold">\*</span>

**Response**

- access_token (15m)
- refresh_token (30m)

Example:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjg5NDM2MjQyfQ.O1tAFZwW1ZL-_z8mSwNKy6gKouUxGbcNmkqvx0ZEMbI",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjkwNjQ0OTQyfQ.YV3ol6A3RL5Jtm71IwMTXEsToUXjtmLHbolKneDUfk8"
}
```

---

<h1 style="color: #98c370; font-weight: bold">Log out <span style="color: #f36700;">Private - access</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> /api/auth/logout

**Body**

- email <span style="color: red; font-weight: bold">\*</span>
- password <span style="color: red; font-weight: bold">\*</span>

**Response**

- None

---

<h1 style="color: #98c370; font-weight: bold">Refresh tokens <span style="color: #f36700;">Private - refresh</span></h1>
- <span style="color: #fde27d; font-weight: bold">POST</span> api/auth/refresh

**Body**

- None

**Response**

- access_token
- refresh_token

Example:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjg5NDM2MjQyfQ.O1tAFZwW1ZL-_z8mSwNKy6gKouUxGbcNmkqvx0ZEMbI",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMmM1MjBlOS1hODIzLTRlZDQtOWQxMy00NzcxZGYxMDFkMWIiLCJlbWFpbCI6InVhcXVheEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVhcXVheCIsImlhdCI6MTY4OTQzNTM0MiwiZXhwIjoxNjkwNjQ0OTQyfQ.YV3ol6A3RL5Jtm71IwMTXEsToUXjtmLHbolKneDUfk8"
}
```
