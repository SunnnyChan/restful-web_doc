# restful-web 介绍  

[restful-web](https://github.com/SunnnyChan/restful-web) demo, A RESTful web application based on restful-web framework.  

## 特性

* Web Service
* RESTful API
* 服务注册/发现
* 数据库集成
* 多应用部署
* 模块化
* 监控

## 技术栈

* Jetty
* Jersey
* Zookeeper
* MyBatis
* Redis

## 模块

* rw-server

RESTful web server module, used for creating a RESTful API web service or web application.    

* common-dev  

development tools.  

* common-utils   

Common utilities, as   
Log  
Config  
etc.  

* common-db  

database  

* common-web    

Web common utilities.  
Jersey  
Web API response  
etc.  

* common-infra  

infrastructure, redis、Zookeeper etc.  

* service-discovery   

When rw-server running as a web service.  
service-discovery implement service register etc.  

to discovery dependency services.  

* infra-config  

Config, config parser and  config center.  

*  service-monitor   

## Have a try

```bash
# 拉取源码
git clone https://github.com/SunnnyChan/restful-web

# 构建
cd restful-web/rw-server/sh/ && sh build

# 打包输出

ls -1 restful-web/rw-server/output/
conf
control.sh
rw-server-1.0.jar

# 启动
sh default-rw-server-control.sh DefaultRwServer start

# 检查是否正常启动
lsof -i:8899
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java      81157 sunny    6u  IPv6 0xc7b527aea176840f      0t0  TCP *:8899 (LISTEN)
```

* 测试

浏览器打开：http://127.0.0.1:8899/sample/v1/hello-world

返回：
```json
{
    "meta":{
        "code":0,
        "errorType":null,
        "errorMsg":null,
        "traceId":null
    },
    "data":{
        "message":"hello world!"
    }
}
```

