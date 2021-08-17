import http from "../http-common";

class TutorialDataService {
  csv(data) {
    return http.post("/csv/upload",data);
  }
  getAll() {
    return http.get("/usersAll");
  }

  get(id) {
    return http.get(`/usersAll/${id}`);
  }

  create(data) {
    return http.post("/usersAll", data);
  }

  update(id, data) {
    return http.put(`/usersAll/${id}`, data);
  }

  delete(id) {
    return http.delete(`/usersAll/${id}`);
  }

  deleteAll() {
    return http.delete(`/usersAll`);
  }

  // findByTitle(title) {
  //   return http.get(`/csv?title=${title}`);
  // }
}

export default new TutorialDataService();