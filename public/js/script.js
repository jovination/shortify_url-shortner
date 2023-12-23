document.addEventListener('DOMContentLoaded', function() {
    let fun__btn1 = document.querySelector('.btn1');
    let fun__btn2 = document.querySelector('.btn2');

    fun__btn1.onclick = () => {
        fun__btn1.classList.add('active');
        fun__btn2.classList.remove('active');
        showLinkIcon1();
    };

    fun__btn2.onclick = () => {
        fun__btn2.classList.add('active');
        fun__btn1.classList.remove('active');
        showQrIcon1();
    }

    showLinkIcon1();
});


function showLinkIcon1() {
    let fun__link1 = document.querySelector('.link1');
    let fun__link2 = document.querySelector('.link2');
    let fun__qr1 = document.querySelector('.qr1');
    let fun__qr2 = document.querySelector('.qr2');
    fun__link1.style.display = 'block';
    fun__link2.style.display = 'none';
    fun__qr1.style.display = 'block';
    fun__qr2.style.display = 'none';
}

function showQrIcon1() {
    let fun__qr1 = document.querySelector('.qr1');
    let fun__qr2 = document.querySelector('.qr2');
    let fun__link1 = document.querySelector('.link1');
    let fun__link2 = document.querySelector('.link2');
    fun__qr1.style.display = 'none';
    fun__qr2.style.display = 'block';
    fun__link1.style.display = 'none';
    fun__link2.style.display = 'block';
}