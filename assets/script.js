document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');


    canvas.onmousedown = startDraw;
    canvas.onmouseup = stopDraw;
    canvas.onmouseout = stopDraw;
    canvas.onmousemove = draw;

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


    const colorInputs = document.querySelectorAll('.input-color');
    context.strokeStyle = 'black';

    colorInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            context.strokeStyle = e.target.value;
        });
    });


    const sizeInputs = document.querySelectorAll('.input-size');
    context.lineWidth = 1;

    sizeInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            context.lineWidth = e.target.value;
        })
    });

    
    const clearButton = document.querySelector('#cleaner');
    context.fillStyle = 'white';

    clearButton.addEventListener('click', function() {
        context.fillRect(0, 0, 300, 150);
    })



    const saverButton = document.querySelector('#saver')
    saverButton.addEventListener('click', function() {
        let dataURL = canvas.toDataURL();

        localStorage.setItem('img', dataURL)
    });

    let pic = new Image();
    pic.src = localStorage.getItem('img');
    pic.onload = function() {
        context.drawImage(pic, 0, 0);
    }
});
