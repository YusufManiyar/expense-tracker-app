
function signup(){
    const form = document.getElementById('signupForm')
    if(form.signupPassword.value === form.signupConfirmPassword.value){
        const user = {
            username: form.signupUsername.value,
            email: form.signupEmail.value,
            password : form.signupPassword.value
        }

        fetch('http://localhost:4000/signup', {method: 'POST', headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user),
        }).then(res => res.json())
        .then(data => {
            localStorage.setItem('userid', data.id)
            window.location.href= 'home.html'
        })
    }else{
        alert('password not match')
    }
}