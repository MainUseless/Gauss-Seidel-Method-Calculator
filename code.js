function calculate() {
    removeAllChildNodes(document.getElementById("answer"))
    let textArea = document.getElementById("box");
    let arrayFromTextArea = textArea.value.split(/([' ','\n',/\D/g])/).filter(item => item.trim() !== '').map(Number);
    console.log(arrayFromTextArea);

    for (let i=0 ; i<arrayFromTextArea.length ; i++)
     if(isNaN(arrayFromTextArea[i])){
        printOnPage("Input contains invalid characters");
        return 1;
     }

    arrayFromTextArea=arrayFromTextArea.filter( value => !Number.isNaN(value));

    console.log(arrayFromTextArea);

    if(Math.sqrt(arrayFromTextArea.length) % 1 !== 0){
     printOnPage("Matrix must be square")
     return 1;
    }
    
    let tempMatrix=chunk(arrayFromTextArea);
    textArea=document.getElementById("solution");
    arrayFromTextArea=textArea.value.split('\n').map(Number);
    
    if(arrayFromTextArea.length!=tempMatrix.length){
        printOnPage("Missing constants")
        return 1;
    }

    let Matrix=[];
    let solutionBox=[];
    for (let i=0 ; i<tempMatrix.length;i++)
    {
     if(findPlace(tempMatrix[i])===false){
        printOnPage("Error in row "+(i+1));
        return 1;
     }
     Matrix[findPlace(tempMatrix[i])]=tempMatrix[i]
     solutionBox[findPlace(tempMatrix[i])]=arrayFromTextArea[i];
    }
    
    solution(Matrix,solutionBox);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function findPlace(matrix){
    for (let i=0 ; i<matrix.length;i++)
    {
        if(matrix[i]>sumOfRow(matrix)-matrix[i])
         return i;
        else if (matrix[i]==sumOfRow(matrix)-matrix[i])
         return false ;
    }
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
        if(S.length!=n)
        {
            console.log("lol");
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