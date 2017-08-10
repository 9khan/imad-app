console.log('Loaded!');
//changing text
var element = document.getElementById("main-text");
element.innerHTML = "THIS IS KING KHAN";
//moving image
var img = document.getElementById("king");
img.onClick = function()
{
img.style.marginLeft = "100px";
};