function calculate() {
    var textArea = document.getElementById("box");
    var arrayFromTextArea = textArea.value.split(/([' ','\n'])/).filter(item => item.trim() !== '').map(Number);
    var tempMatrix=chunk(arrayFromTextArea);
    textArea=document.getElementById("solution");
    arrayFromTextArea=textArea.value.split('\n').map(Number);

    var Matrix=[];
    var solutionBox=[];
    for (let i=0 ; i<tempMatrix.length;i++)
    {
     Matrix[findPlace(tempMatrix[i])]=tempMatrix[i];
     solutionBox[findPlace(tempMatrix[i])]=arrayFromTextArea[i];
    }
    console.log(Matrix);
    console.log(solutionBox);
    
    removeAllChildNodes(document.getElementById("answer"))
    printOnHtml(solution(Matrix,solutionBox));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function findPlace(matrix){
    for (let i=0 ; i<matrix.length;i++)
    {
        if(matrix[i]>sumOf(matrix)-matrix[i])
         return i;
    }
}

function sumOf(matrix){
    let sum=0;
    for (let i=0 ; i<matrix.length ; i++)
     sum+=matrix[i];
    return sum;
}

function chunk (matrix) {
    var chunks = [],
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
    var counter=document.getElementById("counter").value;
    var seed=document.getElementById("seed").value;
    var n = M.length;
    var X = new Array(n).fill(seed); // Approximations
    var P = new Array(n); // Prev

    for (let k=0 ; k<counter ;k++) 
    {
        for (let i = 0; i < n; i++) 
        {
            var sum = S[i]; // b_n
            for (let j = 0; j < n; j++)
                if (j != i)
                    sum -= M[i][j] * X[j];
    // Update x_i to use in the next row calculation
            X[i] = 1/M[i][i] * sum;
        }
        P = X;
    //    if (Math.abs(X[i] - P[i]) > epsilon) break;
    }
    console.log(X);
    return X;
}

function printOnHtml(answer){
  for (let j=0 ; j<answer.length ; j++)
    answer[j]=answer[j].toFixed(4);
  for (let i=0 ; i<answer.length ; i++)
  {
    var elm = document.getElementById( 'answer' ),
    div = document.createElement( 'div' );
    div.textContent = "X"+(i+1)+" = "+answer[i];
    elm.appendChild( div );
  }
}

function reset(){
    removeAllChildNodes(document.getElementById("answer"));
    document.getElementById("box").value=null;
    document.getElementById("solution").value=null;
    document.getElementById("seed").value=0;
    document.getElementById("counter").value=1;
}