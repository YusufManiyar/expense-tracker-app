function login(){
    const form = document.getElementById('loginForm')
        const user = {
            email: form.loginEmail.value,
            password : form.loginPassword.value
        }

        fetch('http://localhost:4000/login', {method: 'POST', headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('userid', data.id)
            window.location.href= 'home.html'
        })
}