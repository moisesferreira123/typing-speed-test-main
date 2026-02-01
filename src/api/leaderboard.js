import api from "./api";

export async function getLeaderboard() {
  const response = await api.get('/leaderboard');
  return response.data;
}

export async function addToRank(username, accuracy, wpm) {
  const response = await api.post('/leaderboard', {
    username: username,
    accuracy: accuracy,
    wpm: wpm
  });
  
  return response.data;
}

export async function getPositionById(id) {
  if (!id) throw new Error('ID is mandatory.');
  
  const response = await api.get(`/leaderboard/${id}`);
  return response.data;
}

export async function updateUsernameById(id, username) {
  if (!id) throw new Error('ID is mandatory.');

  const response = await api.patch(`/leaderboard/${id}`, {
    username: username
  });

  return response.data;
}
