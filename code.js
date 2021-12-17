function calculate() {
    removeAllChildNodes(document.getElementById("answer"))
    let tempArray=getInputFrom("box");

    if(Math.sqrt(tempArray.length) % 1 !== 0){
     printOnPage("Matrix must be square")
     return 1;
    }
    
    let tempMatrix=chunk(tempArray);
 
    tempArray=getInputFrom("solution");   //temp array that hold the solution box elements
    console.log(tempArray);
    console.log(tempMatrix);

    if(tempArray.length!=tempMatrix.length){
        printOnPage("Missing constants")
        return 1;
    }

    let Matrix=[];
    let solutionBox=[];
    for (let i=0 ; i<tempMatrix.length;i++)       //to reorder the matrix 
    {
     if(findPlace(tempMatrix[i])===false){
        printOnPage("Error in row "+(i+1));
        return 1;
     }
     Matrix[findPlace(tempMatrix[i])]=tempMatrix[i]
     solutionBox[findPlace(tempMatrix[i])]=tempArray[i];
    }
    console.log(checkRepeat(Matrix));
    if(checkRepeat(Matrix))
      return 1;
    solution(Matrix,solutionBox);
}

function checkRepeat(matrix)
{
    for (let i=0 ; i<matrix.length ; i++)
     for (let j=0 ; j<matrix.length ; j++){
        console.log("lol");
        if(i!=j)
         if(finplace(matrix[i])==findPlace(matrix[j])){
           printOnPage("Check rows "+(i+1)+" and "+(j+1));
           return true ;}}
    return false; 
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
    return false ;
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
    console.log(S);
    let counter=document.getElementById("counter").value;
    let seed=document.getElementById("seed").value;
    let n = M.length;
    let X = new Array(n).fill(seed); // Approximations
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
    }
    console.log(X.length);
    console.log(n);
    for(let i=0 ; i< X.length ; i++){
        if(X.length!=n)
        {
            printOnPage("Input matrix contains some error")
            return 1;
        }
        printOnPage("X"+(i+1)+" = "+X[i].toFixed(4));
}}

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