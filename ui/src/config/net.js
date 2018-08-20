
import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(config => {
  Toast.loading('Loading...')
  // TODO: login-need request will be automatically add
  // login token here if already logged in
  console.log(`sending ${config.method} request to ${config.url}`)
  console.log(config)
  return config
})

axios.interceptors.response.use(response => {
  Toast.hide()
  console.log('receive response')
  console.log(response)
  return response
})
