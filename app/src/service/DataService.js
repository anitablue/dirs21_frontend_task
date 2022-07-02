import http from "../http-common";
class DataService {
  getAll() {
    return http.get("/dishes");
  }
  get(_id) {
    const response = http.get('/dishes/' + _id);
    return response;
  }
  create(data) {
    return http.put("/dishes", data);
  }
  update( data) {
    return http.put("/dishes", data);
  }
  delete(id) {
    return http.delete(`/dishes/${id}`);
  }
  removeAll() {
    return http.get(`/dishes/clear`);
  }
}
export default new DataService();