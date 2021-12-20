function Start(){
    document.getElementById("cover").style.display = "none";
    document.getElementById("calculator").style.display = "block";
    document.getElementById("instruct").style.display = "block";   
}

function resetAll(){
    reset();
    document.getElementById("cover").style.display = "block";
    document.getElementById("calculator").style.display = "none";
    document.getElementById("instruct").style.display = "none";  

}

function calculate() {
    removeAllChildNodes(document.getElementById("answer"))
    let tempArray=getInputFrom("box");
    console.log(tempArray);
    if(tempArray.length<1)
    {
     printOnPage("Empty matrix")
     return 1;
    }

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
     if(index===-1){
        printOnPage("Error in row "+(i+1));
        return 1;
     }
     Matrix[index]=tempMatrix[i]
     solutionBox[index]=tempArray[i];
    }

    for(let i=0 ; i<solutionBox.length ; i++)
    if(solutionBox[i]===-1)
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
    var regex = /^[-+]?\d+$/;
    let textArea = document.getElementById(ID);
    let arrayFromTextArea = textArea.value.split(/([' ','\n',regex])/).filter(item => item.trim() !== '').map(Number);
    console.log(arrayFromTextArea);
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
    let P = new Array(n).fill(parseInt(seed)); // Prev
    
    for (let k=0 ; k<counter ;k++) 
    {
        //if(k+1==counter)for (let i=0 ; i<n ; i++) P[i]=X[i];
        for (let i = 0; i < n; i++) 
        {
            let sum = S[i]; // b_n
            for (let j = 0; j < n; j++)
                if (j != i)
                    sum -= M[i][j] * X[j];
    // Update x_i to use in the next row calculation
            X[i] = 1/M[i][i] * sum;
        }
        //P = X;
    };
    let L = new Array(n).fill(" ");
    //console.log(P);
    //console.log(X);
    for(let i=0 ; i< X.length ; i++){
        for(let j=0 ; j< X.length ; j++)
            {
            if(i==j)
             L[i]+=M[i][j]+"(0)";
            else
             L[i]+=M[i][j]+"(X"+(j+1)+")";
            if(j+1!=X.length)
              L[i]+="+ ";
            }
        //console.log(L[i]);
        printOnPage("X"+(i+1)+" = "+"1/"+M[i][i]+" * ("+S[i]+" - ("+L[i]+")");}
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
    document.getElementById("answer").style.display = "none";
    removeAllChildNodes(document.getElementById("answer"));
    document.getElementById("box").value=null;
    document.getElementById("solution").value=null;
    document.getElementById("seed").value=0;
    document.getElementById("counter").value=1;
}