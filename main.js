const render = document.querySelector('#render');
const input = document.querySelector('input');
const btnObject = {
    Submit:document.querySelector('#btn-submit'),
    Reset:document.querySelector('#btn-reset'),
    Volume:document.querySelector('#btn-volume')
}
const chars = [...'abcdefghijklmnopqrstuvwxyz', ...'1234567890', ...'abcdefghijklmnopqrstuvwxyz'.toUpperCase(), ...'!@#$%&*'];
let str = '';
let onClick = 'click';

(() => {
    randomWords(9);
})();

function randomWords(l) {
    for (let i = 0; i < l; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    render.innerHTML = str;
    console.log(`letters: ${str}`)
}

function reset(){
    console.clear();
    str = '';
    randomWords(9);
}

btnObject.Submit.addEventListener(onClick, (e) => {
    e.preventDefault();
    let checked = input.value === str ? true : false;
    if (checked) {
        Swal.fire({
            icon: 'success',
            title: 'correct',
            showConfirmButton: false,
            timer: 1200
        })
        btnObject.Reset.classList.remove('fa-spin');
        btnObject.Volume.classList.remove('fa-shake');
    } else if(!checked){
        Swal.fire({
            icon: 'error',
            title: 'You typed the characters incorrectly, please try again.',
            showConfirmButton: false,
            timer: 1200
          })
        setTimeout(reset() , 20000);
    }
})

btnObject.Reset.addEventListener(onClick , () => {
    reset();
    btnObject.Reset.classList.add('fa-spin');
});

btnObject.Volume.addEventListener(onClick , () => {
    btnObject.Volume.classList.add('fa-shake');
    let text = str.split('');
    const speech = new SpeechSynthesisUtterance(text);    
    try {
        speech.lang = 'en-US';
        speech.rate = 0.4;
        window.speechSynthesis.speak(speech);
    } catch(err){
        console.error(err);
    }
})
