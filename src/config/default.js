export default {
    elasticConfig: {
        //   node: "http://13.233.238.216:9200/"
        cloud: {
            id: "search:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGE1ZmUwMmZiNWMwMTQ4MTBhNTI4ZDE1Mjg1M2FmOWYxJDVjNzVkZmFhODJiOTRmNzY4NjBiZTcwOTJkMjFlYjgy"
        },
        auth: {
            username: "elastic",
            password: "TfZShE2LNQfiYjvPYJxx3yg2"
        }
    },
    rabitUri: 'amqps://dphdaths:mcdCSia4FYQz6uTFb1PCTPNKT_Ysc0Sz@hornet.rmq.cloudamqp.com/dphdaths',
    quename: 'searchDataQueue',
    port: 9000,
    autoIndex: 'autoindex',
    searchIndex: 'searchindex',
    kafkaTopic: 'users',
    kafka_sasl: {
        username: 'H6V2F2GNW7FPHHDE',
        password: '2Us07EWk8a5dfCm0ZKfsFJqBK4ORl7ANKHUSA+RSLoZdn4EGw0q0qj1tPGDeNOJN',
        mechanism: 'plain'
    }

}