import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8080"

// 前置拦截
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token") != null) {
            config.headers.Authorization = sessionStorage.getItem("token");
        }
        return config;
    },
    err => Promise.reject(err)
);

// axios.interceptors.response.use(response => {
//     let res = response.data;
//     if (res.code === 200 || res.data === 201) {
//         return response
//     }
//     else {
//         return Promise.reject(response.data.msg)
//     }
// },
//     error => {
//         console.log(error)
//         if (error.response.data) {
//             error.message = error.response.data.msg
//         }

//         if (error.response.status === 401) {
//             store.commit("REMOVE_INFO")
//             router.push("/login")
//         }

//         Element.Message.error(error.message, { duration: 3 * 1000 })
//         return Promise.reject(error)
//     }
// )