FROM node:13.10-alpine3.11

ENV PATH "/root/.local/bin:$PATH"
WORKDIR /src/app

# Add python3
RUN apk add python3 gcc python3-dev libffi-dev musl-dev make libressl-dev git openssl && \
    # install pip
    wget -O /tmp/get-pip.py https://bootstrap.pypa.io/get-pip.py && \
    python3 /tmp/get-pip.py && \
    rm /tmp/get-pip.py && \
    # version pinned cryptography due to Rust dependency (for now)
    pip install cryptography==3.3.2

COPY ./ /src
RUN cd /src && npm install

CMD ["npm", "start"]