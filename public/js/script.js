document.addEventListener('DOMContentLoaded', function() {
    let fun__btn1 = document.querySelector('.btn1');
    let fun__btn2 = document.querySelector('.btn2');

    fun__btn1.onclick = () => {
        fun__btn1.classList.add('active');
        fun__btn2.classList.remove('active');
    };

    fun__btn2.onclick = () => {
        fun__btn2.classList.add('active');
        fun__btn1.classList.remove('active');
    }
});