FROM node:13-alpine3.10
MAINTAINER Arthur Goldsmith <arthur.goldsmith@gmail.com>

#### SSH SERVICE ####

# Add SSH
RUN apk --update add --no-cache openssh bash ncurses-terminfo \
  && rm -rf /var/cache/apk/*

RUN sed -ie 's/#Port 22/Port 2222/g' /etc/ssh/sshd_config

# Create host key
RUN sed -ri 's/#HostKey \/etc\/ssh\/ssh_host_key/HostKey \/etc\/ssh\/ssh_host_key/g' /etc/ssh/sshd_config
RUN sed -ir 's/#HostKey \/etc\/ssh\/ssh_host_rsa_key/HostKey \/etc\/ssh\/ssh_host_rsa_key/g' /etc/ssh/sshd_config
RUN sed -ir 's/#HostKey \/etc\/ssh\/ssh_host_dsa_key/HostKey \/etc\/ssh\/ssh_host_dsa_key/g' /etc/ssh/sshd_config
RUN sed -ir 's/#HostKey \/etc\/ssh\/ssh_host_ecdsa_key/HostKey \/etc\/ssh\/ssh_host_ecdsa_key/g' /etc/ssh/sshd_config
RUN sed -ir 's/#HostKey \/etc\/ssh\/ssh_host_ed25519_key/HostKey \/etc\/ssh\/ssh_host_ed25519_key/g' /etc/ssh/sshd_config

RUN /usr/bin/ssh-keygen -A
RUN ssh-keygen -t rsa -b 4096 -f  /etc/ssh/ssh_host_key

# Create Home Directory for Chroot Jail Shell
RUN mkdir -p /home/www \
  && mkdir -p /home/www/dev/ \
  && cd /home/www/dev/ \
  && mknod -m 666 null c 1 3 \
  && mknod -m 666 tty c 5 0 \ 
  && mknod -m 666 zero c 1 5 \
  && mknod -m 666 random c 1 8 \
  && chown root:root /home/www \
  && chmod 0755 /home/www

#Create bin and lib directories for bash and other binaries
RUN mkdir -p /home/www/bin && cp -v /bin/bash /home/www/bin/
RUN mkdir -p /home/www/lib && mkdir -p /home/www/usr/lib
RUN mkdir -p /home/www/usr/share
RUN cp -v /lib/ld-musl-x86_64.so.1 /home/www/lib/
RUN cp -v /usr/lib/libreadline.so.8 /home/www/usr/lib/
RUN cp -v /usr/lib/libncursesw.so.6 /home/www/usr/lib/
RUN cp -r /usr/share/terminfo /home/www/usr/share/

# Adds the "visitor" user
RUN adduser visitor -s /bin/bash -D -h /home/arthurgoldsmith.com && echo "visitor:visitor" | chpasswd

# Copies the user groups into the Chrooted area
RUN mkdir /home/www/etc \
  && cp -vf /etc/passwd /home/www/etc/ \
  && cp -vf /etc/group /home/www/etc/

# Adds the Chroot directive to the SSH config
RUN echo "Match User visitor" >> /etc/ssh/sshd_config \
  && echo "  ChrootDirectory /home/www/" >> /etc/ssh/sshd_config

# Add files for site
ADD /arthurgoldsmith.com /home/www/home/arthurgoldsmith.com
ADD /motd.ans /etc/motd
ADD /motd.ans /home/www/etc/motd

# Creates the visitors home directory
RUN chown -R visitor:visitor /home/www/home/arthurgoldsmith.com \
  && chmod -R u-w /home/www/home/arthurgoldsmith.com

# Copies the necessary binaries to have fun & navigate while on the website
RUN cp -v /bin/ls /home/www/bin/ \
  && cp -v /bin/cat /home/www/bin/

#### NODE SERVICE ####
ADD ./node-app /home/node/app
WORKDIR /home/node/app
RUN npm install
RUN export NODE_ENV=production

EXPOSE 80 2222

WORKDIR /

COPY entrypoint.sh entrypoint.sh
COPY entrypoint-dev.sh entrypoint-dev.sh

RUN  chmod 755 /entrypoint.sh
RUN  chmod 755 /entrypoint-dev.sh

CMD /entrypoint.sh
