// 专门写接口的地方
import http from './http';

export let getSwipe = () => {
    return http.get('/home/index/slide?token=1ec949a15fb709370f');
}
export let indexNav = () => {
    return http.get('/home/index/nav?token=1ec949a15fb709370f');
}
export let indexGoods = () => {
    return http.get('/home/index/goodsLevel?token=1ec949a15fb709370f');
}
export let Catleft = () => {
    return http.get('/home/category/menu?token=1ec949a15fb709370f');
}

// export let YZ = () =>{
//     return http.get('/vcode/chkcode?token=1ec949a15fb709370f');
// }
// export let Catright = () =>{
//     return http.get('/category/show?cid=493&token=1ec949a15fb709370f');
// }
export const searchDateList = (order, keywords) => {
    return http.get(`/home/goods/search?kwords=${keywords}&page=1&price1=100&price2=200&otype=${order}&token=1ec949a15fb709370f`);
}