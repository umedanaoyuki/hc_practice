FROM haskell:8

WORKDIR /twitter_erd

RUN apt-get update && apt-get install -y graphviz
RUN cabal v2-update && cabal v2-install erd

ENTRYPOINT ["erd"]