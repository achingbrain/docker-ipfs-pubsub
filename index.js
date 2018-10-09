'use strict'

const IPFS = require('ipfs')

const ipfs = new IPFS({
  init: true,
  EXPERIMENTAL: {
    pubsub: true,
    dht: true
  }
})

const topic = 'my-super-fun-topic'

ipfs.on('ready', async () => {
  const us = await ipfs.id()

  console.info('My peer id', us.id)

  // subscribe to our topic
  try {
    await ipfs.pubsub.subscribe(topic, ({from, data}) => {
      if (from === us.id) {
        return
      }

      console.info('Received', {
        from,
        data: data.toString('utf8')
      })
    })
  } catch (error) {
    console.error(error)
  }

  console.info(`Subscribed to ${topic}`)

  setInterval(async () => {
    // every now and again, send a message to the topic
    try {
      console.info('Publishing message')
      await ipfs.pubsub.publish(topic, Buffer.from('Hello, it is ' + Date.now()))
    } catch (error) {
      console.error(error)
    }

    try {
      // print out our topic peers
      const topicPeers = await ipfs.pubsub.peers(topic)
      console.info('Topic peers:')

      if (!topicPeers.length) {
        console.info('None')
      }

      topicPeers.forEach(peer => {
        console.info(peer.info.id.toB58String())
      })

      // print out our swarm peers
      const swarmPeers = await ipfs.swarm.peers()

      console.info('Swarm peers:')

      if (!swarmPeers.length) {
        console.info('None')
      }

      swarmPeers.forEach(peer => {
        console.info(peer.peer.toB58String())
      })
    } catch (error) {
      console.error(error)
    }
  }, 1000)
})
