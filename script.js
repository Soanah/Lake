/* Set up */
const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

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
        this.color = '#FFB745'
    }
    drawFish()
    {
        context.save()
        context.fillStyle = this.color
        context.fillRect(this.posX, this.posY, this.bodyLength, this.bodyHeight)
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

console.log(arrayFish)