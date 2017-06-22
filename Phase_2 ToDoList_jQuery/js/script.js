// Global Variable
var $todolist = $("#todo");

// Function to bring focus to the Input box once the page is loaded
$(document).ready(function(){
	$("#Input").focus();
	});

// Function to add a task, is triggered when the user clicks the 'Add' button
$(document).ready(
    function(){
        $('#Add').click(
            function(){
				if($("#Input").val()==='')
				{
					alert("Please input a task");
					$("#Input").focus();
				}
				else{
				 var $ListElement = $("<li></li>");
                 var $Checkbox = $("<input type='checkbox' class='checkbox'>");
				 var $tasktoAdd = $("input[id=Input]").val();
                 var $Span = $("<span class='incomplete'>"+$tasktoAdd+"</span>");
                 var $EditInput = $("<input type='text' class='edit'>");
                 var $EditButton = $("<button class='editbutton' id='editB'>Edit</button>");
                 var $DeleteButton = $("<button class='deletebutton' id='deleteB'>Delete</button>");
				 
				 $ListElement.append($Checkbox);
				 $ListElement.append($Span);
				 $ListElement.append($EditInput);
				 $ListElement.append($EditButton);
				 $ListElement.append($DeleteButton);
				 
				 $todolist.append($ListElement);
				 $("#Input").val('');
				 $("#Input").focus();
				}
            })});

// Function to accept the enter key			
$(document).ready(
    function(){
		$("input[id=Input]").keyup(function(event){
          if(event.keyCode == 13){
            $("#Add").click();
			$("#Input").focus();
          }         
      })});

// Function to delete a selected task
$(document).ready(
    function(){
	$todolist.on("click", ".deletebutton", function(){
    $(this).parent().remove();
    $("#Input").focus();	
    })});
	
// Function to strike-through when a task is marked as completed
$(document).ready(
    function(){
	$todolist.on("click", ".checkbox", function(){
	var $crossElement = $(this).next();
	
	if($(this).is(':checked'))
	{
     $crossElement.css("text-decoration","line-through");
	 }
	 else{
	 $crossElement.css("text-decoration","none");
	 }
	 
    })});
	
// Function to edit a selected task	
$(document).ready(
    function(){
	$todolist.on("click", ".editbutton", function(){
	
	var $list = $(this).parent();  
    var $input = $(this).prev();
    var $span = $input.prev();
	 
	if ($list.hasClass("edit"))
	{
	$span.text($input.val());
	}
	else{
	$input.val($span.text());
	}
	$list.toggleClass("edit");
	$(".edit").focus();
  })
});

// Function to accept the enter pressed in the edit input 
$(document).ready(
    function(){
	$todolist.on("keypress", ".edit", function(event){
          if(event.keyCode == 13){
	  
		  var $listItem = $(this).parent();
		  var $Span = $(this).prev();
		  $Span.text($(this).val());		  
		  $listItem.toggleClass("edit");
		  
		  return false;
		  
		  }})});
