# 工程案例

How to quickly create a web service or web application? 
如何创建一个自定义的服务？ 

## 创建工程  

* 工程创建脚本 create_rw-server_project.sh  

```bash
#!/usr/bin/env bash  

## rw-server 模块可以作为一个脚手架
## 执行 该脚本 可以以 rw-server 为模板创建 一个 自己的的 Restful

if [[ $# != 1 ]]
then
 echo "Error usage!"
 exit 1
fi

SCRIPT_DIR="$(cd $(dirname "${BASH_SOURCE[0]}") && pwd )"
SERVER_NAME=$1

if [[ $(uname) == "Darwin" ]]
then
  SED="gsed"
else
  SED="sed"
fi

git clone https://github.com/SunnnyChan/restful-web

find restful-web -name ".git" | xargs rm -Rf

mv restful-web ${SERVER_NAME}
```  

* 创建基于 restful-web 框架的 web 项目  

```bash
sh create_rw-server_project.sh restful-web_demo 
```

在 sunny-server/src/main/java/com/sunny/rw/server/application 目录下 创建 mainClass：  
SampleServer.java  

## 创建一个 Web 应用  

```java
package com.sunny.rw.server.application;

import com.sunny.infra.conf.parser.ConfInit;

public class SampleServer extends AbstractRwServer {

    public static void main(String[] args) throws Exception {
        parserConf(args);
        SampleServer rwServer = new SampleServer();
        rwServer.startServer();
        rwServer.startModules();
    }

    private static void parserConf(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: <config file path>");
            System.exit(1);
        }
        ConfInit.init(args[0]);
    }

}
```  

* 创建配置文件  

可以使用默认的配置文件rw-server.conf，进行修改后使用。
由于可以启动多个服务，所以也可以独立创建每个服务对应的配置文件。  


```bash
# 从模板 rw-server.conf  复制
cp rw-server/conf/rw-server.conf  rw-server/conf/sample-server.conf  
```
```conf
# 按需修改
server {
  name : sample-server // server name
  modules: ["SampleModule"] // thread modules to start
  port : 8899  // server port
  env : "product" // deploy type

  # running as web service
  service-register-flag : false  // need to register as a service
  zk_register-path : "" // use zk as service discovery infra
}
```

### 构建  

```bash
sh build.sh && sh sample-control.sh start
```

### 启动 

```bash
sh control.sh SampleServer conf/sample-server.conf start
```

***TODO***  

rw-server 实例的生成 需要修改脚本来自动生成。  

### 测试

#### http://localhost:8899/sample/v1/hello-world  

* GET  

* Response  
```json
{
    "meta": {
        "code": 0,
        "errorType": null,
        "errorMsg": null,
        "traceId": null
    },
    "data": {
        "message": "hello world!"
    }
}
```

#### http://localhost:8899/sample/v1/echo  

* POST  

* Request  
```json
{
    "r1": "test1",
    "r2": "test2"
}
```
* Response  

```json
{
    "meta": {
        "code": 0,
        "errorType": null,
        "errorMsg": null,
        "traceId": null
    },
    "data": {
        "echo": {
            "r2": "test2",
            "r1": "test1"
        }
    }
}
```

## 部署  

编译完成后，会产出 restful-web/rw-server/output 文件，  
可以任意拷贝部署，部署完成后通过 control.sh 脚本启动。

