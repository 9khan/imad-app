
//counter code
var button = document.getElementById("counter");
button.onclick = function ()
{
    //create request obj
    var request = new XMLHttpRequest();
    // Capture the res and store it in a variable
    request.onreadystatechange = function ()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status === 200)
            {
            var counter = request.responseText;
            var span = document.getElementById("count");
            span.innerHTML = counter.toString();
        }
        }
    // not done yet
};
//make the req
request.open('GET','http://mohd9khan.imad.hasura-app.io/counter',true);
request.send(null);
};
//submit names
var nameInput = document.getElementById("name");
var name = nameInput.value;
var submit = document.getElementById("submit_btn");
submit.onclick = function ()
{
    //make a request to the server and send the same
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for(var i=0;i<names.length;i++)
    {
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
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