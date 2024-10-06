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
    let qr__container = document.querySelector('.qr__container');
    let loader = document.querySelector('.loader'); // add this line
    let downloadBtn = document.querySelector('.Btn');
    let url__container = document.querySelector('.url_container');
    let copyBtn = document.querySelector('.copy');
    let shortenedUrlElement = document.getElementById('shortenedUrl');
    

    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.7 } // Adjust origin as needed
        });
    }



    
    function downloadImage() {
        const imageUrl = qr__code.src;
        if (imageUrl) {
            // Create an anchor element to trigger the download
            const downloadLink = document.createElement('a');
            
            // Use XMLHttpRequest to download the image
            const xhr = new XMLHttpRequest();
            xhr.open('GET', imageUrl, true);
            xhr.responseType = 'blob';
            xhr.onload = function() {
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(this.response);
                downloadLink.href = imageUrl;
                downloadLink.download = url__txt.value.replace(/[^\w\s]/gi, '') + '.png'; // You can set the desired filename
                
                // Programmatically click the download link
                downloadLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                
                // Clean up the object URL to avoid memory leaks
                window.setTimeout(function() {
                    urlCreator.revokeObjectURL(imageUrl);
                }, 100);
            };
            xhr.send();
        } else {
            console.error('QR code image source is empty.');
        }
    }

    fun__btn1.onclick = () => {
        fun__btn1.classList.add('active');
        fun__btn2.classList.remove('active');
        showLinkIcon1();
        if (fun__btn1.classList.contains('active')) {
            f__header.innerHTML = original__txt; // set to original text
            url__txt.placeholder = original__url;
            shortenBtn.textContent = shorten__txt;
            qr__code.src = "";
            qr__container.style.display ="none";

        }
    };

    fun__btn2.onclick = () => {
        fun__btn2.classList.add('active');
        fun__btn1.classList.remove('active');
        showQrIcon1();
        generateQrCode();
        url__container.style.display ="none";
        
    };

    shortenBtn.onclick = () => {
        qr__code.src = "";
        qr__container.style.display = 'none';
        
    
        if(fun__btn2.classList.contains('active')) {
            if(url__txt.value.trim() !== '') {
                loader.style.display = 'block'; // show the loader
                qr__container.style.display = 'none'; // hide the QR code container
                setTimeout(generateQr, 500); // delay of 500ms before generating the QR code
            } 
            
            else {
                // If url__txt is empty, add the 'error' class to it
                url__txt.classList.add('error');
                setTimeout(() => {
                    url__txt.classList.remove('error'); // Remove the 'error' class after 1 second
                }, 1000);
            }
        }

        else{
            if(url__txt.value.trim() !== ''){
                setTimeout(generateShortUrl, 2);  //delay of 2ms before generating the  generateShortUrl      
            }

             else
        {
            url__txt.classList.add('error');
            setTimeout(() => {
                url__txt.classList.remove('error'); // Remove the 'error' class after 1 second
            }, 1000); 
        }
        }
    };
    
    

    function generateQr() {
        //the qr code API to the qr__code div
            qr__code.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + url__txt.value;
            qr__code.onload = function() {
             loader.style.display = 'none'; // hide the loader when the QR code has loaded
             qr__container.style.display = 'block'; // show the QR code container
             triggerConfetti();
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

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
        copyBtn.onclick = function() {
  const shortUrl = shortenedUrlElement.querySelector('a')?.textContent;

  if (shortUrl) {
      copyToClipboard(shortUrl);      
      
  } else {
      console.error("No URL found to copy.");
  }
}

    async function generateShortUrl() {
        const fullUrl = url__txt.value.trim();
    
        // Validate the input
        if (!fullUrl) {
            alert('Please enter a URL to shorten.');
            return;
        }
        console.log(fullUrl)
    
        loader.style.display = 'block';
    
        url__container.style.display = 'none';
        document.getElementById('shortenedUrl').innerHTML = '';
    
        try {
            const response = await fetch('/api/v2/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: fullUrl })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to shorten URL');
            }
    
            const data = await response.json();
    
            loader.style.display = 'none';
            url__container.style.display = 'block';
            triggerConfetti();

    
            const shortUrl = data.shortUrl;
            document.getElementById('shortenedUrl').innerHTML = `
                <a href="${shortUrl}" target="_blank">${shortUrl}</a>
            `;
    
            console.log('Shortened URL:', shortUrl);
        } catch (error) {
            loader.style.display = 'none';
            alert(`Error: ${error.message}`);
            console.error('Error:', error);
        }
    }
    
    

    showLinkIcon1();
    downloadBtn.onclick = downloadImage;
});

