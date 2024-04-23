from node:20.12.2-alpine3.19

run mkdir /app
workdir /app

copy dist /app
copy package.json /app

run npm i

cmd node main
