// jwtBlacklist.js

const blacklist = new Set();

const addToBlacklist = (token) => {
  blacklist.add(token);
}

const isInBlacklist = (token) =>{
  return blacklist.has(token);
}

export { addToBlacklist, isInBlacklist };
