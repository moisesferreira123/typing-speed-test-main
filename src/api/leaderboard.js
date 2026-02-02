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

export async function getPosition(wpm, accuracy, createdAt) {
  const response = await api.post('/leaderboard/position', {
    wpm: wpm,
    accuracy: accuracy,
    createdAt: createdAt
  });

  return response.data;
}
