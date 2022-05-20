function getToday() {
  const createdAt = new Date();
  const yyyy = createdAt.getFullYear();
  const mm = createdAt.getMonth() + 1;
  const dd = createdAt.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}

export { getToday };
