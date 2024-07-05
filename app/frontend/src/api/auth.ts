const AuthAPI = {
  signUp: async function(firstName: string, lastName: string, email: string, password: string) {
    fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName, lastName, email, password
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
}

export default AuthAPI;
