
const container = document.querySelector('.container');
const btn = document.querySelector('.popUp');

const defaultSideLength = 16; // Initial grid size
const maxSideLength = 100; // Maximum allowed input
const containerSize = 384; // Fixed container width/height in pixels

function createGrid(sideLength) {
    container.replaceChildren(); // Clear existing grid
    const totalSquares = sideLength * sideLength;
    const squareSize = containerSize / sideLength; // Dynamic square size

    // Set square styles dynamically
    for (let i = 0; i < totalSquares; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.width = `${squareSize}px`;
        gridSquare.style.height = `${squareSize}px`;

        gridSquare.dataset.interactions = '0';
        gridSquare.style.opacity = '1';

        gridSquare.addEventListener('mouseover', () => {
            let interactions = parseInt(gridSquare.dataset.interactions);

            if (interactions === 0) {
                    // First hover: set a random RGB color with 10% opacity
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    gridSquare.dataset.r = r;
                    gridSquare.dataset.g = g;
                    gridSquare.dataset.b = b;
                    gridSquare.style.background = `rgb(${r}, ${g}, ${b})`;
                    gridSquare.style.opacity = '0.1'; // Start faint
                } else if (interactions < 10) {
                    // Subsequent hovers: increase opacity by 10%
                    const newOpacity = Math.min(1, 0.1 + interactions * 0.1);
                    gridSquare.style.opacity = newOpacity.toString();
                }
                // Increment interactions, cap at 10
                gridSquare.dataset.interactions = Math.min(interactions + 1, 10).toString();
            });
        container.appendChild(gridSquare);
    }
}

// Initial grid (16x16)
createGrid(defaultSideLength);

btn.addEventListener('click', () => {
    let newSideLength = parseInt(prompt("Please enter the number of squares per side (max 100):"));
    if (isNaN(newSideLength) || newSideLength <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    if (newSideLength > maxSideLength) {
        alert(`Maximum allowed is ${maxSideLength}. Using ${maxSideLength} instead.`);
        newSideLength = maxSideLength;
    }
    createGrid(newSideLength);
});