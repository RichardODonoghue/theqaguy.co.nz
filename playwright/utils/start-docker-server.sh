#!/bin/bash
sudo docker run \
  --network=host \
  --rm \
  --init \
  -it \
  --workdir /home/pwuser \
  --user pwuser \
  mcr.microsoft.com/playwright:v1.56.1-noble \
  /bin/sh -c "npx -y playwright@1.56.1 run-server --port 3001 --host 0.0.0.0"