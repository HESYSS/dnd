const respondToFriendRequest = async (requestId: number, response: string): Promise<void> => {
  try {
    const res = await fetch(`/friend-requests/respond/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response }),
    });

    const data = await res.json();
    
    if (data.success) {
      window.location.reload();
    } else {
      alert('Ошибка при обработке запроса.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default respondToFriendRequest;
