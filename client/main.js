let userId;
$(document).ready(() => {
    if(localStorage.getItem('access_token')){
        $('#login-section').hide();
        $('#full-app').show();
    } else {
        $('#login-section').show();
        $('#full-app').hide();
    }
})

$('#login-form').submit( e => {
    e.preventDefault();
    const data = {
        email: $('#email').val(),
        password: $('#password').val()
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login',
        data
    }).done( data => {
        localStorage.setItem('access_token', data.access_token);
        $('#login-section').hide();
        $('#full-app').show();
        console.log(data)
    }).fail( err => {
        console.log(err)
    });
})

$('#logout-button').click(() => {
    localStorage.removeItem('access_token');
    $('#login-section').show();
    $('#full-app').hide();
})

$('#food-form').submit( e => {
    e.preventDefault();
    const data = {
        title: $('#title').val(),
        price: $('#price').val(),
        ingredients: $('#ingredients').val(),
        tag: $('#tag').val()
    }
    $.ajax({
        type:'POST',
        url: 'http://localhost:3000/foods',
        data,
        headers : {
            access_token: localStorage.getItem('access_token')
        }
    }).done( data => {
        console.log(data)
    }).fail( err => {
        console.log(err);
    })
})

