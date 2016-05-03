# MQTT-Bench : MQTT Benchmark Tool
This is the benchmark tool for MQTT Broker implemented by [golang](https://golang.org/).
This can benchmark the throughput for publishing and subscribing.

Supported benchmark pattern is:
* Parallel publish from clients
* Parallel subscribe from clients with publishing

## Getting started
### Installation

Use ```go get``` and ```go install```

```
$ go get github.com/takanorig/mqtt-bench
$ go install github.com/takanorig/mqtt-bench
```

or 

Download here

https://github.com/takanorig/mqtt-bench/wiki/Download

### Publish
* Precondition
 * The MQTT Broker is started.
```
$ mqtt-bench -action pub -broker tcp://127.0.0.1:1883 -client-file clients.json -totaltime 20
```

### Subscribe
* Precondition
 * The MQTT Broker is started.
```
$ mqtt-bench -action sub -broker tcp://127.0.0.1:1883 -client-file clients.json -totaltime 20
```

If the following message is output to the console, the count is over limit.
So, please set ```-intervalTime``` option. 
```
panic: Subscribe error : Not finished in the max count. It may not be received the message.
```

### TLS mode
Use ```-tls``` option.

- Server authentication
```
-tls=server:certFile
```

- Server and Client authentication
```
-tls=client:rootCAFile,clientCertFile,clientKeyFile
```

## Usage
```
Usage of mqtt-bench
  -action="p|pub or s|sub"                    : Publish or Subscribe (required)
  -broker="tcp://{host}:{port}"               : URI of MQTT broker (required)
  -client-file=""                             : Client Info File for connecting to the MQTT broker
  -tls=""                                     : TLS mode. 'server:certFile' or 'client:rootCAFile,clientCertFile,clientKeyFile'
  -qos=0                                      : MQTT QoS(0|1|2)
  -retain=false                               : MQTT Retain
  -topic="/mqtt-bench/benchmark"              : Base topic
  -clients=10                                 : Number of clients
  -count=100                                  : Number of loops per client
  -size=1024                                  : Message size per publish (byte)
  -pretime=3000                               : Pre wait time (ms)
  -intervaltime=0                             : Interval time per message (ms)
  -totaltime=10                               : Total bench time (s)
  -x=false                                    : Debug mode
  -influxdb                                   : stat influxdb address (host:port)
```

## Note
* Using Apollo
 * If you use [Apollo 1.7.x](http://activemq.apache.org/apollo/), the subscribed messages can't be output to console even if debug mode. If you want to output the subscribed messages, designate ```-support-unknown-received``` option.
