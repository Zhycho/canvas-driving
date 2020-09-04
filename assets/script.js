document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // рисование
    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;
    canvas.onmouseout = stopDraw;

    let isDraw = false;

    function startDraw(e) {
        isDraw = true;

        context.beginPath();
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }

    function draw(e) {
        if (isDraw == true) {
            let x = e.pageX - canvas.offsetLeft;
            let y = e.pageY - canvas.offsetTop;

            context.lineTo(x, y);
            context.stroke();
        }
    }

    function stopDraw() {
        isDraw = false;
    }

    // смена цвета кисти
    const colorInputs = document.querySelectorAll('.input-color');
    context.strokeStyle = 'black';

    colorInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            context.strokeStyle = e.target.value;
        });
    });

    // смена толщины кисти
    const sizeInputs = document.querySelectorAll('.input-size');
    context.lineWidth = 1;

    sizeInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            context.lineWidth = e.target.value;
        })
    });

    // очистка
    const clearButton = document.querySelector('#cleaner');
    context.fillStyle = 'white';

    clearButton.addEventListener('click', function() {
        context.fillRect(0, 0, 300, 150);
    })


    // сохранение
    if (localStorage.getItem('saved-images') == null) {
        localStorage.setItem('saved-images', JSON.stringify([]));
    }

    if (localStorage.getItem('last-image') == null) {
        localStorage.setItem('last-image', '');
    }

    const saverButton = document.querySelector('#saver')
    saverButton.addEventListener('click', function() {
        const dataURL = canvas.toDataURL();

        localStorage.setItem('last-image', dataURL);
    });

    // синхронизация вкладок при сохранении  
    window.addEventListener('storage', function(e) {
        if (e.key === 'last-image') {
            
            // сохранение предыдущего рисунка
            const savedImages = JSON.parse(localStorage.getItem('saved-images'));
            const prevImg = canvas.toDataURL();
            savedImages.push(prevImg);
            localStorage.setItem('saved-images', JSON.stringify(savedImages));

            const lastImage = new Image();
            lastImage.src = localStorage.getItem('last-image');
            lastImage.onload = function() {
                context.drawImage(lastImage, 0, 0);
            }
        }
    });

    // вывод последнего изображения при загрузке
    if (localStorage.getItem('last-image') != false) {
        const lastImage = new Image();

        lastImage.src = localStorage.getItem('last-image');
        lastImage.onload = function() {
            context.drawImage(lastImage, 0, 0);
        }
    }
});
