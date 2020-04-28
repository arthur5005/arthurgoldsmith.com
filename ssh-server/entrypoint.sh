#!/bin/bash
  
# turn on bash's job control
set -m

cd /home/node/app/
npm run start &

# Start the primary process and put it in the background
/usr/sbin/sshd -D

# Start the helper process
  
# now we bring the primary process back into the foreground
# and leave it there
fg %1