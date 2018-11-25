/* Set up */
const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

$canvas.style.backgroundColor = 'rgba(34, 160, 226, 0.5)'

/* Resize */
const sizes = { width: 800, height: 600 }

const resize = () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    $canvas.width = sizes.width
    $canvas.height = sizes.height
}

window.addEventListener('resize', resize)
resize()

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
    constructor(_posX, _posY, _bodyLength, _bodyHeight)
    {
        this.posX = _posX
        this.posY = _posY
        this.bodyLength = _bodyLength
        this.bodyHeight = _bodyHeight
        this.tailWidth = this.bodyLength/4
        this.tailHeight = this.bodyHeight/3
        this.eyeLength = this.bodyLength/15
        this.eyeHeigth =this.bodyHeight/2
        this.finWidth = this.bodyLength/4
        this.finHeight = this.bodyHeight/1.5
        this.color = '#FFB745'
    }
    drawFish()
    {
        context.fillStyle = this.color
        context.save()
        /*body*/
        context.beginPath()
        context.scale(1, 0.15)
        context.arc(this.posX, this.posY*(1/0.15), this.bodyLength, this.bodyHeight, Math.PI * 2, true)
        context.fill()
        context.restore()
        /*tail*/
        context.beginPath()
        context.moveTo(this.posX-this.bodyLength+this.eyeLength*2, this.posY)
        context.lineTo(this.posX-this.bodyLength-this.tailWidth, this.posY-this.tailHeight)
        context.lineTo(this.posX-this.bodyLength-this.eyeLength*2, this.posY)
        context.lineTo(this.posX-this.bodyLength-this.tailWidth, this.posY+this.tailHeight)
        context.fill()
        /*fins*/
        context.fillStyle = this.color
        context.save()
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
    } 
}
//const fish1 = new Fish(100, 250, 118, 74)
//fish1.drawFish()

/* Add or remove Fish */
let arrayFish = []

$canvas.addEventListener('click', (_event) =>
{
    if (arrayFish.length < 6) 
    {       
        arrayFish.push(new Fish(cursor.x, cursor.y, 118, 74))
    }
    for(let i = 0; i < arrayFish.length ; i++)
    {
        arrayFish[i].drawFish()
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