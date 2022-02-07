document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []
    let isGameOver = false

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

            // normal click
            square.addEventListener('click', function(e) {
                click(square)
            })
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

    // click on square actions
    function click(square) {
        let currentId = square.id
        // what happens when is Game Over
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        // squares with bombs
        if (square.classList.contains('bomb')) {
            console.log('Game Over');
        } else {
            // normal squares close to bombs
            let total = square.getAttribute('data')
            if (total !=0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        // normal squares not close to bombs
        square.classList.add('checked')
    }

    // check neighboring squares once square is clicked
    function checkSquare(square, currentId) {
        // checking all squares around the checked square

        // verify if the checked square is in the right o left edge
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width - 1)

        // checking all so around squares
        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId -width)].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)

    }

})