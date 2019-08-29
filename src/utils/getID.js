export default function getID(token) {
  return JSON.parse(atob(token.split('.')[1])).user_id;
}
