docker build -t sarabadani/xo-backend .
docker push sarabadani/xo-backend .
fandogh service reset --name xo-backend
