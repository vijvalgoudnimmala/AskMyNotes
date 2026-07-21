const output = document.getElementById("output");

function showOutput(msg){
    output.innerHTML = msg;
}

document.getElementById("btn1").onclick=function(){

    let heading=document.getElementById("main-heading");

    heading.innerHTML="Selected using getElementById()";

    showOutput("Heading selected using getElementById()");
}

document.getElementById("btn2").onclick=function(){

    let cards=document.getElementsByClassName("student-card");

    showOutput("Number of student cards selected: "+cards.length);
}

document.getElementById("btn3").onclick=function(){

    let p=document.getElementsByTagName("p");

    p[0].style.color="red";

    showOutput("Tag selected: p");
}

document.getElementById("btn4").onclick=function(){

    let course=document.querySelector(".important");

    course.style.background="yellow";

    showOutput("Only the first important course is selected.");
}

document.getElementById("btn5").onclick=function(){

    let courses=document.querySelectorAll(".important");

    courses.forEach(function(c){
        c.style.background="lightgreen";
    });

    showOutput("Number of important courses selected: "+courses.length);
}

document.getElementById("resetPage").onclick = function () {

    document.getElementById("main-heading").innerHTML = "Welcome Students";

    document.getElementById("output").innerHTML =
        "Click any button to see the result here.";

    let cards = document.getElementsByClassName("student-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "";
        cards[i].style.borderLeft = "";
    }

    let courses = document.querySelectorAll(".important");
    courses.forEach(function(course) {
        course.style.backgroundColor = "";
        course.style.border = "";
        course.style.padding = "";
    });

    let p = document.getElementsByTagName("p");
    for (let i = 0; i < p.length; i++) {
        p[i].style.color = "";
    }
};