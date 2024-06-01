import ApiConnection from '../../js/api.js';


document.addEventListener('DOMContentLoaded', function () {
    const api = new ApiConnection();

    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const forgotPasswordBox = document.getElementById('forgotPasswordBox');
    const enterCodeBox = document.getElementById('enterCodeBox');
    const resetPasswordBox = document.getElementById('resetPasswordBox');

    const showRegisterButton = document.getElementById('showRegisterButton');
    const showForgotPasswordButton = document.getElementById('showForgotPasswordButton');
    const backToLoginButton = document.getElementById('backToLoginButton');
    const backToLoginFromForgotButton = document.getElementById('backToLoginFromForgotButton');
    const backToLoginFromEnterCodeButton = document.getElementById('backToLoginFromEnterCodeButton');
    const backToLoginFromResetButton = document.getElementById('backToLoginFromResetButton');

    const getCodeButton = document.getElementById('getCodeButton');
    const submitCodeButton = document.getElementById('submitCodeButton');
    const changePasswordButton = document.getElementById('changePasswordButton');

    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    showRegisterButton.addEventListener('click', function () {
        transitionBoxes(loginBox, registerBox);
    });

    showForgotPasswordButton.addEventListener('click', function () {
        transitionBoxes(loginBox, forgotPasswordBox);
    });

    backToLoginButton.addEventListener('click', function () {
        transitionBoxes(registerBox, loginBox);
    });

    backToLoginFromForgotButton.addEventListener('click', function () {
        transitionBoxes(forgotPasswordBox, loginBox);
    });

    backToLoginFromEnterCodeButton.addEventListener('click', function () {
        transitionBoxes(enterCodeBox, loginBox);
    });

    backToLoginFromResetButton.addEventListener('click', function () {
        transitionBoxes(resetPasswordBox, loginBox);
    });

    getCodeButton.addEventListener('click', function () {
        transitionBoxes(forgotPasswordBox, enterCodeBox);
    });

    submitCodeButton.addEventListener('click', function () {
        transitionBoxes(enterCodeBox, resetPasswordBox);
    });

    changePasswordButton.addEventListener('click', function () {
        transitionBoxes(resetPasswordBox, loginBox);
    });

    loginButton.addEventListener('click', async function () {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const result = await api.authenticateUser(loginUsername, loginPassword);
        
        if (result.startsWith('User authenticated successfully')) {
            window.location.href = '../Kanban/index.html';
        } else {
            const loginSnackbar = document.getElementById('loginSnackbar');
            loginSnackbar.innerText = 'Неверные данные для входа';
            loginSnackbar.style.display = 'block';
        }
    });

    registerButton.addEventListener('click', async function () {
        const registerUsername = document.getElementById('registerUsername').value;
        const registerEmail = document.getElementById('registerEmail').value;
        const registerPassword1 = document.getElementById('registerPassword1').value;
        const registerPassword2 = document.getElementById('registerPassword2').value;

        if (registerPassword1 !== registerPassword2) {
            const registerSnackbar = document.getElementById('registerSnackbar');
            registerSnackbar.innerText = 'Пароли не совпадают';
            registerSnackbar.style.display = 'block';
            return;
        }

        const result = await api.registerUser(registerUsername, registerEmail, registerPassword1);
        
        if (result.success) {
            transitionBoxes(registerBox, loginBox);
        } else {
            const registerSnackbar = document.getElementById('registerSnackbar');
            registerSnackbar.innerText = 'Ошибка регистрации';
            registerSnackbar.style.display = 'block';
        }
    });

    function transitionBoxes(hideBox, showBox) {
        hideBox.style.display = 'none';
        showBox.style.display = 'block';
    }
});
