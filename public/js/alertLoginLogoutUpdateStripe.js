const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el){
        el.parentElement.removeChild(el);
    }
};

// type is either success or error
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if(res.data.status === 'success'){
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

const loginForm = document.querySelector('.form--login');

if(loginForm){
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout',
        });
        if(res.data.status === 'success') location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
}

const logOutBtn = document.querySelector('.nav__el--logout');

if(logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}

// type is either 'password' or 'data'
const updateSettings = async (data,type) => {
    try {
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if(res.data.status === 'success'){
            showAlert('success', `${type.toUpperCase()} Updated successfully`);
        }

    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}

const userDataForm = document.querySelector('.form-user-data');

if(userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        console.log(form);

        updateSettings(form, 'data');
    });
}

const userPasswordForm = document.querySelector('.form-user-password');

if(userPasswordForm){
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();

        document.querySelector('.btn--save-password').textContent = 'UPDATING...';

        const passwordCurrent = document.getElementById('password-current').value; 
        const password = document.getElementById('password').value; 
        const passwordConfirm = document.getElementById('password-confirm').value; 
        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

        document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}

const stripe = Stripe('pk_test_51IT4GwB3Oeuq0VpIksM9JGz2lmN2NOD20BHurZEdzRvzsqSIIhjUkhsoqBkTQ20VpO8L5yybaYM1lNCjl28mZjmX00muNv7wWk');

const bookTour = async tourID => {
  try {
    // 1) get checkout session from API
    const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`);
  
    console.log(session);
  
    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch(err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookButton = document.getElementById('book-tour');

if(bookButton) bookButton.addEventListener('click', e => {
  e.target.textContent = 'Processing...';
  const {tourId} = e.target.dataset;
  bookTour(tourId);
});