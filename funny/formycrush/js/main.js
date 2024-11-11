$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/lookMe.jpg',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
      }).then(function(){
        $('.content').show(200);
      })
}

 // switch button position
 function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button póition
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
var replyMes
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        // html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        html: "<input type='text' class='form-control' id='txtReason' placeholder='Pls, LMK??' >",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply,
        onOpen: () => {
            // Focus the input element after the modal is open
            document.getElementById('txtReason').focus();
        },
        onClose: () => {
            replyMes = document.getElementById('txtReason').value;
            
            const webhookUrl = 'https://webhook-test.com/f8e041fc4c441265a5c4b0135408d243';
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors', // Set to no-cors
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    button: 'Message From Crush',
                    message: replyMes,
                    redirect:'thank you crushh',
                    timestamp: new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'}),
                }),
            })
            .then(() => {
                // Redirect after logging the click
                console.log('log message:' + replyMes);
            })
            .catch(error => console.error('Error:', error));
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    const webhookUrl = 'https://webhook-test.com/f8e041fc4c441265a5c4b0135408d243';
                    fetch(webhookUrl, {
                        method: 'POST',
                        mode: 'no-cors', // Set to no-cors
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            button: 'Accept invitaion',
                            message: 'Okiiiii lun <3',
                            redirect: 'Enchanted',
                            timestamp: new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'}),
                        }),
                    })
                    .then(() => {
                        // Redirect after logging the click
                        window.open(CONFIG.messLink, '_blank') // Change this to your desired URL
                    })
                    .catch(error => console.error('Error:', error));
                    
                  }
            })
        }
    })
})

