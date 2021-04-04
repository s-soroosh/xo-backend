URL=https://xo-backend-soroosh.fandogh.cloud
URL=http://localhost:1337
#register

curl http://localhost:1337/auth/local/register -H "Content-Type: application/json" -d '{"username":"test1","email":"myemail@gmail.com", "password":"123456"}'

#login

curl http://localhost:1337/auth/local -H "Content-Type: application/json" -d '{"identifier":"myemail@gmail.com", "password":"123456"}'


# create game
curl $URL/games -H "Content-Type: application/json" -d '{"size":3}' -H "Authorization: Bearer ${TOKEN}"

# join game
curl http://localhost:1337/games/join -H "Content-Type: application/json"  -H "Authorization: Bearer ${TOKEN}"
