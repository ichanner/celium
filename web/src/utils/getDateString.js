export default (timestamp)=> {

  const dt = new Date(timestamp);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = days[dt.getDay()];
  const month = months[dt.getMonth()];
  const day_of_month = dt.getDate();
  const year = dt.getFullYear();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formated_hours = hours % 12 === 0 ? 12 : hours % 12;
  const time = `${formated_hours}:${String(minutes).padStart(2, '0')} ${ampm}`;

  return `${day}, ${month}, ${day_of_month}, ${year} ${time}`
}