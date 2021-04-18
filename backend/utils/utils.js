function getCurrentTime() {
  return new Date().toISOString().substr(11, 5);
}

module.exports = {
  getCurrentTime,
}
