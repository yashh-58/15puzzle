let activeOption;

let flag = 0;

function handleButtonClick(option) {
    activeOption = option;
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    localStorage.setItem("option" , activeOption);
    document.getElementById(`option${option}`).classList.add('active');
    flag = 1;
}

if(!flag){
    activeOption = 4;
    localStorage.setItem("option" , activeOption);
}

document.getElementById('option4').classList.add('active');

