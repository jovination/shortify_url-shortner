document.addEventListener('DOMContentLoaded', function() {
    let fun__btn1 = document.querySelector('.btn1');
    let fun__btn2 = document.querySelector('.btn2');
    let f__header = document.querySelector('.f-header');
    let fun__link1 = document.querySelector('.link1');
    let fun__link2 = document.querySelector('.link2');
    let fun__qr1 = document.querySelector('.qr1');
    let fun__qr2 = document.querySelector('.qr2');
    let url__txt = document.getElementById('fullUrl');
    let qr__txt = "Generate QR Code";
    let original__txt = f__header.innerHTML; // store the original text
    let qr__url = "Enter Your Text Here!"; //
    let original__url = url__txt.placeholder; // store the original text
    let shortenBtn = document.querySelector('.shorten-btn');
    let generate__txt = "Generate QR";
    let shorten__txt = shortenBtn.textContent; 
    let qr__code = document.getElementById('qr__code');
    let loader = document.querySelector('.loader'); // add this line




    fun__btn1.onclick = () => {
        fun__btn1.classList.add('active');
        fun__btn2.classList.remove('active');
        showLinkIcon1();
        if (fun__btn1.classList.contains('active')) {
            f__header.innerHTML = original__txt; // set to original text
            url__txt.placeholder = original__url;
            shortenBtn.textContent = shorten__txt;
            qr__code.src = "";
        }
    };

    fun__btn2.onclick = () => {
        fun__btn2.classList.add('active');
        fun__btn1.classList.remove('active');
        showQrIcon1();
        generateQrCode();
    };

    shortenBtn.onclick = () => {
        // Clear the QR code
        qr__code.src = "";
    
        if(fun__btn2.classList.contains('active')) {
            if(url__txt.value.trim() !== '') {
                loader.style.display = 'block'; // show the loader
                setTimeout(generateQr, 500); // delay of 500ms before generating the QR code
            } else {
                // If url__txt is empty, add the 'error' class to it
                url__txt.classList.add('error');
                setTimeout(() => {
                    url__txt.classList.remove('error'); // Remove the 'error' class after 1 second
                }, 1000);
            }
        }
    };
    
    

    function generateQr() {
        //the qr code API to the qr__code div
            qr__code.src = "https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=" + url__txt.value;
            qr__code.onload = function() {
                loader.style.display = 'none'; // hide the loader when the QR code has loaded
            };
         
}
    


    function generateQrCode() {
        if (fun__btn2.classList.contains('active')) {
            f__header.innerHTML = qr__txt;
            url__txt.placeholder = qr__url;
            shortenBtn.textContent = generate__txt;
        }
    }

    function showLinkIcon1() {
        fun__link1.style.display = 'block';
        fun__link2.style.display = 'none';
        fun__qr1.style.display = 'block';
        fun__qr2.style.display = 'none';
    }

    function showQrIcon1() {
        fun__qr1.style.display = 'none';
        fun__qr2.style.display = 'block';
        fun__link1.style.display = 'none';
        fun__link2.style.display = 'block';
    }

    showLinkIcon1();
});
