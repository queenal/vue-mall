import axios from 'axios'

export function request(config){

  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 50000
  })
// axios的拦截器（请求拦截）
  instance.interceptors.request.use(config=>{
    return config
  },error => {
    console.log(error)
  })

  // axios的拦截器（响应拦截）
  instance.interceptors.response.use(res=>{
    return res.data
  },error => {
    console.log(error)
  })

  return instance(config)
}
