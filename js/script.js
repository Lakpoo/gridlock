const grid = document.getElementById("grid");
const cells = document.querySelectorAll(".cell");
let matrix = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

let draggedElement = null;

function createGrid() {
  console.log("État actuel de la matrice :");
  matrix.forEach((row, rowIndex) => {
    console.log(`Rangée ${rowIndex}:`, row.join(" "));
  });

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (matrix[row][col] === 1) {
      cell.classList.add("red-square");
      cell.draggable = true;
      console.log(`Carré rouge ajouté à la cellule: rangée ${row}, colonne ${col}`);
    } else {
      cell.classList.remove("red-square");
      cell.draggable = false;
    }
    cell.addEventListener("dragstart", dragStart);
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", drop);
  });
}

function dragStart(event) {
  draggedElement = event.target;
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const targetCell = event.target;

  if (targetCell !== draggedElement && !targetCell.classList.contains("red-square")) {
    const fromRow = parseInt(draggedElement.dataset.row);
    const fromCol = parseInt(draggedElement.dataset.col);
    const toRow = parseInt(targetCell.dataset.row);
    const toCol = parseInt(targetCell.dataset.col);

    if (Math.abs(toRow - fromRow) + Math.abs(toCol - fromCol) === 1) {
      console.log(`Déplacement du carré rouge de (${fromRow},${fromCol}) à (${toRow},${toCol})`);
      matrix[fromRow][fromCol] = 0;
      matrix[toRow][toCol] = 1;
      createGrid();
    }
  }
}

// Assurez-vous d'appeler cette fonction au chargement de la page
createGrid();

console.log("Fonction createGrid() appelée");
