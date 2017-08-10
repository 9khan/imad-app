//counter code
var buttton = document.getElementById("counter");
var counter = 0;
button.onclick = function()
{
    //create request obj
    var request = new XMLHttpRequest();
    // Capture the res and store it in a variable
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status === 200)
            {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
        }
    // not done yet
};
//make the req
request.open('GET','http://http://mohd9khan.imad.hasura-app.io/counter',true);
request.send(null);
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