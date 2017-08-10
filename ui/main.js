//counter code
var button = document.getElementById("counter");
var counter = 0;
button.onclick = function ()
{
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};
/*console.log('Loaded!');
//changing text
var element = document.getElementById("main-text");
element.innerHTML = "THIS IS KING KHAN";
//moving image
var img = document.getElementById("king");
var marginLeft = 0;
function moveRight()
{
  marginLeft = marginLeft + 1;
  img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function()
{
var interval = setInterval(moveRight,50);
};*/