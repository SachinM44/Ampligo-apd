# this shell script is for while the conatiner up and running this shell script will be running 
#!/bin/bash 
export GIT_REPOSITORY__URL ="$GIT_REPOSITORY__URL" 

git clone "$GIT_REPOSITORY__URL" /home/app/output
exec node script.js
# (1) what this file does is .. it create the env variable called GIT_REPOSITORY_URL and store the git url ; 
#(2) then it clone the git repo in this folder /home/app/output
#(3) then it it exicute the code stored in the script.js 