// 封装http请求

/**
 * 步骤：
 *  1、封装公共的部分
 *  2、请求拦截  
 *  3、响应拦截
 */

import http from 'axios';
// 集成在axios里面
import qs from 'qs';

http.defaults.baseURL = 'http://vueshop.glbuys.com/api';
http.defaults.timeout = 5000;

// 请求拦截
http.interceptors.request.use(
    config=>{
        if(config.method == 'get' || config.method == 'put'){
            config.headers = {
                'Content-type':'application/json;charset=utf8',
            }
        }else if(config.method == 'post'|| config.method == 'delete'){
            config.headers = {
                'Content-type':'application/x-www-form-urlencoded;charset=utf-8',
            }
            config.data = qs.stringify(config.data);
        }
        
        return config;
    },
    error =>{
        let err = new Error(error);
        // 捕获并暴露错误信息
        throw err;
    }
);

// 响应拦截
http.interceptors.response.use(
    config =>{
        if(config.status == 200){
            return config.data
        }else if(config.status == 500){
            return '服务器内部错误'
        }
    },
    error =>{
        let errs = new Error(error);
        // 捕获并暴露错误信息
        throw errs;
    }
);
export default http;

// http.interceptors.request.use(config=>{
    
// })
// http.interceptors.response.use(config=>{
//     200
    
// })