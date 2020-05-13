# 配置文件

rw-server.conf  

```yml
server {
  name : rw-server
  port : 8899
  env : "product"

  controller-class-path : "com.sunny.rw.server.controller"
  modules-class-path : "com.sunny.rw.server.modules"
  modules: []

  # running as web service
  service-register-flag : false
  zk_register-path : ""
}

# dependency service
dependency_service {

}

# infrastructure
infra {
  zk_conn-str : ""
}
```

