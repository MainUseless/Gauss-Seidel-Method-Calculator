function calculate() {
    removeAllChildNodes(document.getElementById("answer"))
    let tempArray=getInputFrom("box");

    if(Math.sqrt(tempArray.length) % 1 !== 0){
     printOnPage("Matrix must be square")
     return 1;
    }
    
    let tempMatrix=chunk(tempArray);
 
    tempArray=getInputFrom("solution");   //temp array that hold the solution box elements

    if(tempArray.length!=tempMatrix.length){
        printOnPage("Missing constants")
        return 1;
    }

    let Matrix = new Array(tempMatrix.length);
    let solutionBox = new Array(tempMatrix.length).fill(-1);
    for (let i=0 ; i<tempMatrix.length;i++)       //to reorder the matrix 
    {
    let index = findPlace(tempMatrix[i]) ;
     if(index==-1){
        printOnPage("Error in row "+(i+1));
        return 1;
     }
     Matrix[index]=tempMatrix[i]
     solutionBox[index]=tempArray[i];
    }

    for(let i=0 ; i<solutionBox.length ; i++)
    if(solutionBox[i]==-1)
    {
        printOnPage("Input matrix contains some error")
        return 1;
    }
    solution(Matrix,solutionBox);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getInputFrom(ID)
{
    let textArea = document.getElementById(ID);
    let arrayFromTextArea = textArea.value.split(/([' ','\n',/\D/g])/).filter(item => item.trim() !== '').map(Number);
    for (let i=0 ; i<arrayFromTextArea.length ; i++)
    if(isNaN(arrayFromTextArea[i])){
       printOnPage("Input contains invalid characters");
       return 1;
    }
    return arrayFromTextArea;
}

function findPlace(matrix){
    for (let i=0 ; i<matrix.length;i++)
    {
        if(matrix[i]>sumOfRow(matrix)-matrix[i])
         return i;
    }
    return -1 ;
}

function sumOfRow(matrix){
    let sum=0;
    for (let i=0 ; i<matrix.length ; i++)
     sum+=matrix[i];
    return sum;
}

function chunk(matrix) {
    let chunks = [],
        i = 0;
        n = matrix.length;
        len=Math.sqrt(n);
  
    while (i < n) {
      chunks.push(matrix.slice(i, i += len));
    }
    return chunks;
  }

 function solution(M,S)
 { 
    let counter=document.getElementById("counter").value;
    let seed=document.getElementById("seed").value;
    let n = M.length;
    let X = new Array(n).fill(parseInt(seed)); // Approximations
    let P = new Array(n); // Prev

    for (let k=0 ; k<counter ;k++) 
    {
        for (let i = 0; i < n; i++) 
        {
            let sum = S[i]; // b_n
            for (let j = 0; j < n; j++)
                if (j != i)
                    sum -= M[i][j] * X[j];
    // Update x_i to use in the next row calculation
            X[i] = 1/M[i][i] * sum;
        }
        P = X;
    //    if (Math.abs(X[i] - P[i]) > epsilon) break;
    };
    for(let i=0 ; i< X.length ; i++)
        printOnPage("X"+(i+1)+" = "+X[i].toFixed(4));
}

function printOnPage(text){
    let elm = document.getElementById( 'answer' ),
    div = document.createElement( 'div' );
    div.textContent = text ;
    elm.appendChild( div );
}

function reset(){
    removeAllChildNodes(document.getElementById("answer"));
    document.getElementById("box").value=null;
    document.getElementById("solution").value=null;
    document.getElementById("seed").value=0;
    document.getElementById("counter").value=1;
}