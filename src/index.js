console.log('test build');
fetch('http://localhost:8000/test').then(async (res) => {
  const data = await res.json();
  console.log(data)
})
