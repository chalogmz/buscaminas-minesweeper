document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []

    // Create board
    function createBoard() {
        //get shuffled game array with random bombs

        // squares with bombs
        const bombsArray = Array(bombAmount).fill('bomb')
        // squares without bombs
        const emptyArray = Array(width*width - bombAmount).fill('valid')
        // union of both types of squares
        const gameArray = emptyArray.concat(bombsArray)
        // bombs random positions
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        
        // game board
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
        }

        // add numbers to the squares
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            // differentiating board sides
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === 1)

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
                if (i > 10 && squares[i - width].classList.contains('bomb')) total ++
                if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
                if (i < 88 && !isRightEdge && squares[i + 1 +width].classList.contains('bomb')) total ++
                if (i < 89 && squares[i +width].classList.contains('bomb')) total ++

                squares[i].setAttribute('data', total)
                console.log(squares[i]);
            }
        }
    }
    createBoard()

})