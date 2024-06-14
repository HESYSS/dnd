
const respondToFriendRequest = (requestId, response) => {
  fetch(`/friend-requests/respond/${requestId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ response }),
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      window.location.reload();
    } else {
      alert('Ошибка при обработке запроса.');
    }
  })
  .catch((error) => console.error('Error:', error));
};

export default respondToFriendRequest;
