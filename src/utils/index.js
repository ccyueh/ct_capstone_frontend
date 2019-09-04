import callAPI from './api.js';
import getID from './getID.js';

export const allParties = async(token) => {
  let user_id = getID(token);
  let host = await callAPI(
    'api/parties/retrieve',
    'GET',
    {'host_id': user_id},
    false
  );

  let guest = await callAPI(
    'api/parties/retrieve',
    'GET',
    {'user_id': user_id},
    false
  );

  let parties = host.parties.concat(guest.parties);
  return parties;
}

export const getBottles = async(party_id) => {
  let data = await callAPI(
    'api/bottles/retrieve',
    'GET',
    {'party_id': party_id},
    false
  );

  if (data.bottles) {
    return data.bottles;
  } else {
    return [];
  }
}
