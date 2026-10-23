import axios from "axios";
import { status } from "server/reply";

const URL = "http://localhost:3000/users";

export async function getUsers(){
  const response =await axios.get(URL);
  return response.data
 

}
export async function createUser(user) {
  const response = await axios.post(`${URL}`, user);
  return response.data;
}
export async function getUserByEmail(email) {
  const response = await axios.get(URL, { params: { email } });
  return response.data[0];
}

export async function getUserById(id) {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
}
export async function deleteUserById(id){
  const response =await axios.delete(`${URL}/${id}`)
}
export async function  updateUserStatus(id,status){
  const response =await axios.patch(`${URL}/${id}`,{
    status
  })
  return response.data;
}
