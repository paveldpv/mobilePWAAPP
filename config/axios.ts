import axios, { AxiosRequestConfig } from "axios";
import {url} from './config'

const $axios = axios.create({
   baseURL:url
})

export default $axios