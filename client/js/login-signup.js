


var form_data = new FormData();
form_data.append('checkError', true);
fetch('../../server/login-signup.php', { method: 'POST', body: form_data }).then(res => res.text()).then(text => {
    if (text == 'true') {
        errorAnimation('Something went wrong logging in', $('body'));
    }
});

function errorAnimation(msg, elemToPrepend) {
    var div = `
    <div class="alert alert-danger p-3" role="alert">
        <div class="container">
        <div class="alert-icon">
            <i class="now-ui-icons objects_support-17"></i>
        </div>
        <strong>Oh snap!</strong> ${msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">
            <i class="now-ui-icons ui-1_simple-remove"></i>
            </span>
        </button>
        </div>
    </div>`;
    elemToPrepend.prepend(div);
    console.log(elemToPrepend.children()[0]);
    elemToPrepend.children()[0].addClass('scale-in-ver-top');
    //setTimeout(() => elemToPrepend.children('div').remove(), 500);
    console.log(elemToPrepend);
}