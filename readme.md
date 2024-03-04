# Project Title

Boo Coding Assessment

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URI`
`SECRET_TEXT`

## Run Locally

Clone the project

```bash
  git clone https://github.com/bmf10/boo
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

You can run test directly without configure .env file

## API Reference

Try API here: [Postman](https://www.postman.com/bmf10/workspace/boo/collection/9798426-c3c16fd2-b2e6-44a9-ab8c-61075b4685f1?action=share&creator=9798426)

### User

#### Create User

```http
  POST /user
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `name`     | `string` | **Required** |
| `image`    | `string` |              |
| `password` | `string` | **Required** |

#### Login User

```http
  POST /user
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get user

```http
  GET /user/${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of user to fetch |

### Comment

#### Create Comment

```http
  POST /comment
```

##### Body

| Parameter     | Type       | Description                                                                                                     |
| :------------ | :--------- | :-------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`   | **Required**                                                                                                    |
| `description` | `string`   | **Required**                                                                                                    |
| `enneagram`   | `string`   | Select one: 1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1                      |
| `mbti`        | `string`   | Select one: INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ      |
| `zodiac`      | `string`   | Select one: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces |
| `profileId`   | `ObjectId` | **Required**. Profile to be commented on                                                                        |

##### Header

| Parameter       | Type             | Description                            |
| :-------------- | :--------------- | :------------------------------------- |
| `Authorization` | `Bearer {token}` | **Required**. Get token with login API |

#### Get Comment List

```http
  GET /comment
```

| Parameter   | Type     | Description                                                                                                     |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------------------- |
| `sort`      | `string` | Select one: best, recent. **Default: best**                                                                     |
| `perPage`   | `number` | **Default: 10**                                                                                                 |
| `page`      | `number` | **Default: 1**                                                                                                  |
| `enneagram` | `string` | Select one: 1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1                      |
| `mbti`      | `string` | Select one: INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ      |
| `zodiac`    | `string` | Select one: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces |

### LIKE

#### Like/Unlike A Comment

```http
  POST /like
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `userId`    | `string` | **Required** |
| `commentId` | `string` | **Required** |

##### Header

| Parameter       | Type             | Description                            |
| :-------------- | :--------------- | :------------------------------------- |
| `Authorization` | `Bearer {token}` | **Required**. Get token with login API |
