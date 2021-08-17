import http from "../http-common";

class weatherDataService {
  csv(data) {
    return http.post("/csv/upload",data);
  }
  getAll() {
    return http.get("/csv2");
  }
 
  get(id) {
    return http.get(`/csv2/${id}`);
  }
  create(data) {
    return http.post("/csv2", data);
  }
  findDate(data,data2){
    return http.get(`/date/${data},${data2}`)
  }
  update(id, data) {
    return http.put(`/csv2/${id}`, data);
  }

  delete(id) {
    return http.delete(`/csv2/${id}`);
  }

  deleteAll() {
    return http.delete(`/csv2`);
  }

  // findByTitle(title) {
  //   return http.get(`/csv?title=${title}`);
  // }
}

export default new weatherDataService();