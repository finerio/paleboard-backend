# Sample HTTPIE requests

1. Walk through the in README first
2. Start your server

```
npm start / npm run dev
```

3. Open another terminal
4. Try out the requests below

## GET /

```bash
http GET :4000
```

## POST /echo

```bash
http POST :4000/echo hello="world" number:=0 cheesesArray:='["cheddar", "rochefort", "stilton"]'
```

## POST /signup-therapist

```bash
http -v POST :4000/signup-therapist email="therapist10@clinic.com" password="zzz" name="therapist 10"
```

## POST /signup-patient

```bash
http -v POST :4000/signup-patient email="patinet10@email.com" password="zzz" name="patient 10"
```

## POST /login-therapist

```bash
http -v POST :4000/login-therapist email="therapist1@clinic.com" password="zzz"
```

## POST /login-patient

```bash
http -v POST :4000/login-patient email="patient1@email.com" password="zzz"
```

## GET /me

Get a token first:

```
http POST :4000/login email="test@test.com" password="test1234"
```

```bash
http GET :4000/me Authorization:"Bearer <PASTE_YOUR_TOKEN_HERE>"
```

```bash
http GET :4000/me Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50RW1haWwiOiJwYXRpZW50MUBlbWFpbC5jb20iLCJpYXQiOjE2MjAyMTc1NDAsImV4cCI6MTYyMDIyNDc0MH0.goUv70sQByixCzwTbM3LdRAUQpKMTaRDMEnfSD9VA5Y"
```

## POST /authorized_post_request

Get a token first:

```
http POST :4000/login email="test@test.com" password="test1234"
```

```bash
http POST :4000/authorized_post_request Authorization:"Bearer <PASTE_YOUR_TOKEN_HERE>" hello="world" number:=0 cheesesArray:='["cheddar", "rochefort", "stilton"]'
```

```bash
http POST :4000/authorized_post_request Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE1ODQ2MTQxMjYsImV4cCI6MTU4NDYyMTMyNn0.3WKeq1MmGQaq5iMSds3ff8JNBJa5D2k3DDW645OFrAY" hello="world" number:=0 cheesesArray:='["cheddar", "rochefort", "stilton"]'
```
