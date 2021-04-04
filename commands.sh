URL=https://xo-backend-soroosh.fandogh.cloud
URL=http://localhost:1337
#register

curl $URL/auth/local/register -H "Content-Type: application/json" -d '{"username":"test1","email":"myemail@gmail.com", "password":"123456"}'

#login

curl $URL/auth/local -H "Content-Type: application/json" -d '{"identifier":"myemail@gmail.com", "password":"123456"}'


# create game
curl $URL/games -H "Content-Type: application/json" -d '{"size":3}' -H "Authorization: Bearer ${TOKEN}"

# join game
curl $URL/games/join -H "Content-Type: application/json"  -H "Authorization: Bearer ${TOKEN}" -X POST


# do a move on your turn
curl $URL/moves -H "Content-Type: application/json"  -H "Authorization: Bearer ${TOKEN}" -d '{"code":"code of the game","x":0,"y":0}'
