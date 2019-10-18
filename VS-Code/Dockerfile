FROM alpine
RUN apk add --no-cache git zsh sudo openssl && wget https://github.com/cdr/code-server/releases/download/2.1523-vsc1.38.1/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz -qO /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz && \
  tar -xzf /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz -C /tmp && \
  mv /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64/code-server /usr/local/bin && \
  wget https://download.docker.com/linux/static/stable/x86_64/docker-19.03.3.tgz -qO /tmp/docker-19.03.4.tgz && \
  tar -xzf /tmp/docker-19.03.4.tgz -C /tmp && \
  mv /tmp/docker/docker /usr/local/bin/docker-bin && \
  echo '#!/bin/sh' >> /usr/local/bin/docker && \
  echo 'sudo /usr/local/bin/docker-bin "$@"' >> /usr/local/bin/docker && \
  chmod +x /usr/local/bin/docker && \
  rm -rf /tmp/*

RUN addgroup -g 1000 -S vs-code
RUN adduser -u 1000 -D -S -G vs-code vs-code
RUN mkdir -p /home/vs-code/ && wget -O - https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh ; \
    git clone https://github.com/zsh-users/zsh-autosuggestions.git /root/.oh-my-zsh/plugins/zsh-autosuggestions; \
    sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="ys"/g' /root/.zshrc; \
    sed -i "s/(git)/(git zsh-autosuggestions)/g" /root/.zshrc; \
    su -c "$(wget -O - https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" -s /bin/sh vs-code ; \
    git clone https://github.com/zsh-users/zsh-autosuggestions.git /home/vs-code/.oh-my-zsh/plugins/zsh-autosuggestions; \
    sed -i "s/(git)/(git zsh-autosuggestions)/g" /home/vs-code/.zshrc; \
    \
    # Symlink demyx command history with root
    ln -s /home/vs-code/.zsh_history /root; \
    \
    # gpg purposes
    echo 'export GPG_TTY=$(tty)' >> /root/.zshrc; \
    echo 'export GPG_TTY=$(tty)' >> /home/vs-code/.zshrc


FROM mhart/alpine-node:slim

FROM alpine
# TEMPORARY
RUN apk --no-cache add zsh
COPY --from=0 /etc/sudoers /etc/sudoers
COPY --from=0 /usr/lib/sudo /usr/lib/sudo
COPY --from=1 /usr/lib/libgcc* /usr/lib/libstdc*  /usr/lib/
COPY --from=1 ["/usr/bin/node", "/usr/bin/"]
COPY --from=0 ["/usr/local/bin/docker", "/usr/bin/openssl", "/usr/bin/git*", "/usr/bin/sudo", "/usr/bin/"]
COPY --from=0 /usr/local/bin/docker-bin  /usr/local/bin/docker-bin
COPY --from=0 /usr/local/bin/code-server /usr/local/bin/
COPY --from=0 /root/.zshrc /root/.zshrc
COPY --from=0 ["/root/.oh-my-zsh/", "/root/.oh-my-zsh/"]
COPY --from=0 ["/usr/lib/libncursesw.so.6*","/usr/lib/libpcre2*", "/usr/lib/libcurl.so.4*", "/usr/lib/libnghttp2*", "/usr/lib/"]
COPY --from=0 ["/usr/lib/zsh", "/usr/lib/zsh"]
COPY --from=0 ["/usr/share/git-core/", "/usr/share/git-core/"]
COPY --from=0 ["/usr/libexec/git-core/", "/usr/libexec/git-core/"]
COPY --from=0 ["/etc/ssl/", "/etc/ssl/"]
COPY --from=0 ["/etc/zsh", "/etc/zsh"]
RUN chmod +x /usr/bin/docker
RUN addgroup -g 1000 -S vs-code
RUN adduser -u 1000 -D -S -G vs-code vs-code
RUN echo vs-code:vs-code | chpasswd
RUN sed -i "s|/home/vs-code:/sbin/nologin|/home/vs-code:/bin/zsh|g" /etc/passwd
COPY --from=0 /home/vs-code/ /home/vs-code/
RUN mkdir -p /home/vs-code/.code/data/User
RUN mkdir /home/vs-code/Projects
RUN chown -R vs-code:vs-code /home/vs-code
RUN echo -e "{\n    \"terminal.integrated.shell.linux\": \"/bin/zsh\"\n}" > /home/vs-code/.code/data/User/settings.json
RUN echo "vs-code ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
COPY npm /usr/local/bin/npm 
RUN chmod +x /usr/local/bin/npm

EXPOSE 8080
WORKDIR /home/vs-code
USER vs-code

VOLUME [ "/home/vs-code/Projects" ]
ENV DOCKER_HOST=/var/run/docker.sock

CMD [ "/usr/local/bin/code-server", "/home/vs-code/Projects", "--user-data-dir=/home/vs-code/.code/data", "--extensions-dir=/home/vs-code/.code/extensions" ]