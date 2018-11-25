/* Set up */
const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.style.backgroundColor = 'rgba(34, 160, 226, 0.5)'

/*Resize*/
let windowWidth = $canvas.width
let windowHeight = $canvas.height

const resize = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = windowWidth
    $canvas.height = windowHeight
}

window.addEventListener('resize', resize)
resize()
/*Audio*/

function sound(_src) {
    this.sound = document.createElement("audio");
    this.sound.src = _src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
let audio = new sound("media/ambience.mp3");


/* Cursor */
const cursor = { x: 0, y: 0}

window.addEventListener('mousemove', (_event) =>
{
    cursor.x= _event.clientX
    cursor.y = _event.clientY
})

/* Create fish */ 
class Fish
{
    constructor(_posX, _posY, _speedX, _speedY, _bodyLength, _bodyHeight)
    {
        this.posX = _posX
        this.posY = _posY
        this.speedX = _speedX
        this.speedY = _speedY
        this.bodyLength = _bodyLength
        this.bodyHeight = _bodyHeight
        this.tailWidth = this.bodyLength/4
        this.tailHeight = this.bodyHeight/3
        this.eyeLength = this.bodyLength/15
        this.eyeHeigth =this.bodyHeight/2
        this.finWidth = this.bodyLength/4
        this.finHeight = this.bodyHeight/1.5
        this.color = 'rgba(255, 183, 69, 1)'
    }
    update()
    {
        if(this.posX + this.bodyLength > windowWidth || this.posX - this.bodyLength < 0)
        {
            this.speedX = -this.speedX
        }
        if(this.posY + this.bodyHeight > windowHeight)
        {
            this.posY = windowHeight - this.bodyHeight - 1
            this.speedY = -this.speedY
        }
        if(this.posY < 0)
        {
            this.posY = 1
            this.speedY = -this.speedY
        }
        this.posX += this.speedX
        this.posY += this.speedY

        this.drawFish()

    }
    drawFish()
    {
        context.save()
        context.fillStyle = this.color
        context.translate(this.posX+this.bodyLength/2,this.posY+this.bodyHeight/2)
        if(this.speedX < 0){
            context.rotate(Math.PI)
        }
        else{
            context.rotate(0)
        }
        context.translate(-this.posX-this.bodyLength/2,-this.posY-this.bodyHeight/2)
        /*body*/
        context.save()
        context.beginPath()
        context.scale(1, 0.15)
        context.arc(this.posX, this.posY*(1/0.15), this.bodyLength, this.bodyHeight, Math.PI * 2, true)
        context.fill()
        context.restore()
        /*tail*/
        context.save()
        context.beginPath()
        context.moveTo(this.posX-this.bodyLength+this.eyeLength*2, this.posY)
        context.lineTo(this.posX-this.bodyLength-this.tailWidth, this.posY-this.tailHeight)
        context.lineTo(this.posX-this.bodyLength-this.eyeLength*2, this.posY)
        context.lineTo(this.posX-this.bodyLength-this.tailWidth, this.posY+this.tailHeight)
        context.fill()
        context.restore()
        /*fins*/
        context.save()
        context.fillStyle = this.color
        context.beginPath()
        context.moveTo((this.posX+this.finWidth)+this.bodyLength/4, this.posY)
        context.lineTo(this.posX, this.posY-this.finHeight)
        context.lineTo((this.posX-this.finWidth/4)+this.bodyLength/4, this.posY)
        context.moveTo((this.posX+this.finWidth)+this.bodyLength/4, this.posY)
        context.lineTo(this.posX, this.posY+this.finHeight)
        context.lineTo((this.posX-this.finWidth/4)+this.bodyLength/4, this.posY)
        context.fill()
        context.restore()
        /*eyes*/
        context.fillStyle = '#000000'
        context.save()
        context.beginPath()
        context.scale(1, 0.15)
        context.arc(this.posX+this.bodyLength-this.eyeLength*3, this.posY*(1/0.15)-this.eyeHeigth, this.eyeLength, this.eyeHeigth, Math.PI * 2, true)
        context.arc(this.posX+this.bodyLength-this.eyeLength*3, this.posY*(1/0.15)+this.eyeHeigth, this.eyeLength, this.eyeHeigth, Math.PI * 2, true)
        context.fill()
        context.restore()
        context.restore()
    } 
}

/* Add or remove Fish */
let arrayFish = []

$canvas.addEventListener('click', (_event) =>
{
    if (arrayFish.length < 6) 
    {       
        arrayFish.push(new Fish(cursor.x, cursor.y, (-5 + Math.random()*10), (-5 + Math.random()*10), 118, 74))
    }
})

/*
$canvas.addEventListener('click', (_event) =>
{
    if (arrayFish.length >0) 
    {       
        arrayFish.pop()
    }
})
*/

/*Animation*/ 
const loop = () =>
{
    window.requestAnimationFrame(loop)
       // Clear
       context.fillStyle = 'rgba(34, 160, 226, 0.5)'
       context.fillRect(0, 0, windowWidth, windowHeight)
    //audio.play()
    for(let i = 0; i < arrayFish.length ; i++)
    {
        arrayFish[i].update()
    }
}
loop()