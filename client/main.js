let userId;
$(document).ready(() => {
    if(localStorage.getItem('access_token')){
        $('#login-section').hide();
        $('#full-app').show();
        viewFoods();
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
        viewFoods()
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
        $('#full-app').show();
        viewFoods()
        console.log(data)
    }).fail( err => {
        console.log(err);
    })
})

function viewFoods(){
    $('#list-food').empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/foods',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done( data => {
        $('#list-food').append(`
            <tr>
                <td>title<td>
                <td>price<td>
                <td>ingredients<td>
                <td>tag<td>
                <td>action<td>
            </tr>
        `)

        for( let i = 0; i < data.data.length; i++ ){
            $('#list-food').append(`
            <tr>
                <td>${data.data[i].title}<td>
                <td>${data.data[i].price}<td>
                <td>${data.data[i].ingredients}<td>
                <td>${data.data[i].tag}<td>
                <td><button class="btn btn-danger" onclick="deleteFood(${data.data[i].id})">Delete</button><td>
            </tr>
        `)
        }
        console.log(data)
    }).fail( err => {
        console.log(err)
    })
}

function deleteFood(id){
    $.ajax({
        url: `http://localhost:3000/foods/${id}`,
        type: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done( data => {
        $('#full-app').show();
        viewFoods()
        console.log(data)
    }).fail( err => {
        console.log(err)
    })
}