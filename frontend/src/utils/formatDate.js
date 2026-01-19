export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatTime = (timeString) => {
  return timeString;
};

export const isEventPast = (dateString) => {
  return new Date(dateString) < new Date();
};

export const isEventToday = (dateString) => {
  const today = new Date();
  const eventDate = new Date(dateString);
  return (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  );
};