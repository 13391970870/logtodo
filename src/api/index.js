//接口
import http from '@/utils/http.js';

//注册接口
export function apiSegiste({
  userName,
  password
}) {
  return http.post('/api/setUser', {
    userName,
    password,
  });
}

//登录接口
export function apiLogin({
  userName,
  password
}) {
  // return http.post("/login", {
  //   userName,
  //   password,
  // });
  return http.post("/api/login", {
    userName,
    password,
  })
}


//编辑或创建日志
export function apiBlogUpdate({
  title,
  content,
  log_type,
  introduce,
  username,
  time,
  updateTime,
  file_path,
  id
}) {
  return http.post("/api/blog/update", {
    title,
    content,
    log_type,
    introduce,
    username,
    time,
    updateTime,
    file_path,
    id
  })
}

//删除日志
export function apiBlogDelete({
  file_path,
  id
}) {
  return http.post("api/blog/delete", {
    file_path,
    id
  })
}

//查询日志
export function apiBlogSearch({
  log_type,
  page,
  limit
}){
  return http.post("/api/blog/search",{
    log_type,
    page,
    limit
  })
}


//编辑或创建记录
export function apiRecordUpdate({
  title,
  content,
  record_type,
  introduce,
  username,
  time,
  updateTime,
  file_path,
  id
}) {
  return http.post("/api/record/update", {
    title,
    content,
    record_type,
    introduce,
    username,
    time,
    updateTime,
    file_path,
    id
  })
}

//删除记录
export function apiRecordDelete({
  file_path,
  id
}) {
  return http.post("api/record/delete", {
    file_path,
    id
  })
}
//查询记录
export function apiRecord() {
  return http.get("/api/record", {})
}