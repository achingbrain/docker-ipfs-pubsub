# IPFS pubsub between Docker containers

Build the Docker container and start two instances:

```console
$ docker-compose build
$ docker-compose up --scale echo=2 echo
```

Sample output:

```console
Recreating docker-ipfs-pubsub_echo_1 ... done
Recreating docker-ipfs-pubsub_echo_2 ... done
Attaching to docker-ipfs-pubsub_echo_1, docker-ipfs-pubsub_echo_2
echo_1  | Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/ipfs/QmNaTphh31rHSQywEMM8U29xn4NXTDQoK9idAqpAKJLGhK
echo_1  | Swarm listening on /ip4/127.0.0.1/tcp/4002/ipfs/QmNaTphh31rHSQywEMM8U29xn4NXTDQoK9idAqpAKJLGhK
echo_1  | Swarm listening on /ip4/172.18.0.2/tcp/4002/ipfs/QmNaTphh31rHSQywEMM8U29xn4NXTDQoK9idAqpAKJLGhK
echo_1  | My peer id QmNaTphh31rHSQywEMM8U29xn4NXTDQoK9idAqpAKJLGhK
echo_1  | Subscribed to my-super-fun-topic
echo_1  | Publishing message
echo_1  | Topic peers:
echo_1  | None
echo_1  | Swarm peers:
echo_1  | None
echo_2  | Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/ipfs/QmfKMX3j9xLpTcyzkGL9ZiC9jZ2gZowGd2fTAiCKAuTVFC
echo_2  | Swarm listening on /ip4/127.0.0.1/tcp/4002/ipfs/QmfKMX3j9xLpTcyzkGL9ZiC9jZ2gZowGd2fTAiCKAuTVFC
echo_2  | Swarm listening on /ip4/172.18.0.3/tcp/4002/ipfs/QmfKMX3j9xLpTcyzkGL9ZiC9jZ2gZowGd2fTAiCKAuTVFC
echo_2  | My peer id QmfKMX3j9xLpTcyzkGL9ZiC9jZ2gZowGd2fTAiCKAuTVFC
echo_2  | Subscribed to my-super-fun-topic
echo_1  | Publishing message
echo_1  | Topic peers:
echo_1  | None
echo_1  | Swarm peers:
echo_1  | QmfKMX3j9xLpTcyzkGL9ZiC9jZ2gZowGd2fTAiCKAuTVFC
echo_2  | Publishing message
echo_2  | Topic peers:
echo_2  | None
echo_2  | Swarm peers:
echo_2  | QmNaTphh31rHSQywEMM8U29xn4NXTDQoK9idAqpAKJLGhs
...repeat
```

So, `echo_1` (id `Qm...GhK`) and `echo_2` (id `Qm...TVFC`) have each other in their swarm peers and are subscribed to the same pubsub topic but never see each other in the topic peer list & never receive each other's messages.
