# Guide to use

Please copy the db.json and json-server.json in the folder where you want to host json-server and then run json-server.

If you have downloaded the code on your local machine then you can simply start the server by opening a new terminal window in the folder and the entering the command:

npm run json-server

##Credentials for admin login

adminID: admin
password: Admin@123

If you want to add a new administrator then you can follow the below steps:-

1. Use Postman to add a new administrator:
open postman and make a post request on /administrators with the data as {adminId: <adminID you want>, password: <password you want>}

2. Add new administrator credentials in db.json file:
in "administrator" key make a new object with {id: 2, adminId: <adminID you want>, password: <password you want>}