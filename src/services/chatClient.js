export async function chatWithAri({ message, behavior, memory }) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        behavior,
        memory,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to chat with Ari');
    }

    return await response.json();
  } catch (error) {
    console.error('Chat Service Error:', error);
    throw error;
  }
}
