//Global Variables
var $numofTasks = 0;
var $todolist = $("#todo");

// Function to bring focus to the input once the page loads
$(document).ready(function(){
	$("#Input").focus();
	});

// Add function running after the user clicks 'Add' button.
$(document).ready(
    function(){
        $('#Add').click(
            function(){
				if($("#Input").val()==='')
				{
					alert("Please input a task");
					$("#Input").focus();
				}
				else if($("#priority").val()==='default')
				{
					alert("Please enter a priority for the task");
					$("#priority").val().focus();
				}
				else{
				 var $ListElement = $("<li></li>");
                 
				 var $Priority = $("select[id=priority]");
				 
				 if($Priority.val() === 'High')
				 {
				 var $PriorityDiv = $("<div id='prId' class='High'></div>");
				 }else if($Priority.val() === 'Medium')
				 {
					 var $PriorityDiv = $("<div id='prId' class='Medium'></div>");
				 }else if($Priority.val() === 'Low')
				 {
				 var $PriorityDiv = $("<div id='prId' class='Low'></div>");
				 }
				 
				 var $tasktoAdd = $("input[id=Input]").val();
                 var $Span = $("<span id='taskName'>"+$tasktoAdd+"</span>");
                 var $EditInput = $("<input type='text' class='edit'>");
                 var $EditButton = $("<button class='editbutton' id='editB'>Edit</button>");
                 var $DeleteButton = $("<button class='deletebutton' id='deleteB'>Delete</button>");
				 
				 $ListElement.append($PriorityDiv);
				 $ListElement.append($Span);
				 $ListElement.append($EditInput);
				 $ListElement.append($EditButton);
				 $ListElement.append($DeleteButton);
				 
				 $todolist.append($ListElement);
				 ++ $numofTasks;
				 //alert($numofTasks);
				 $("#numTask").html("Total Tasks: "+$numofTasks);
				 $(".colors").css("visibility","visible");
				 $("#Input").val('');
				 $("#priority").val('default');
				 $("#Input").focus();
				 
				 
				}
            })});
			
//Accepts the enter key pressed in the 'Add Task' input.
$(document).ready(
    function(){
		$("input[id=Input]").keyup(function(event){
          if(event.keyCode == 13){
            $("#Add").click();
			$("#Input").focus();
          }         
      })});

// Function to delete a task
$(document).ready(
    function(){
	$todolist.on("click", ".deletebutton", function(){
    $(this).parent().remove(); 
	
	if($("span").hasClass("selected"))
    {
	 $("#clearTask").css("visibility","visible");
    }
   else
   {
	$("#clearTask").css("visibility","hidden");
     }

 $("#Input").focus();
    })});
	
// Function to strike-through the completed tasks, toggles to 'selected' class which has been described in the style.css file
$(document).ready(
    function(){
	$todolist.on("click", "#taskName", function(){
	 $(this).toggleClass("selected");
    
    })});

// Function to edit a seleted task	
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

// Accepts the enter key on the 'edit task' input and saves the edited task
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

// Function to bring the focus back to the Add Task input once a priority is selected.		  
$("#priority").click(function() {
    if ($('#priority').val() === 'default') {
    $("#priority").focus();
    } else {
    $("#Input").focus();
    }
});

// Function to clear the completed tasks, triggered on clicking the 'Clear Completed Task' button which is hidden until a task is marked complete.
$(document).on("click", "#clearTask", function(){
if($("span").hasClass("selected"))
{   
    var $taskCount = ($("span.selected").length);
	$("span.selected").parent().remove();
	$("#clearTask").css("visibility","hidden");
	var newCount = $numofTasks-$taskCount;
	$("#numTask").html("Total Tasks: "+newCount);
	$numofTasks = newCount;
	 $("#Input").focus();
}});	

// Function to hide the 'Clear Completed Task' button when no task is marked completed
$(document).on("click", "#taskName", function(){
if($("span").hasClass("selected"))
{
	 $("#clearTask").css("visibility","visible");
}
else{
	$("#clearTask").css("visibility","hidden");
}
});
	
// Function to counter for the deleted tasks, it outputs its value to the 'Total Tasks:'	
$(document).ready(
    function(){
	$todolist.on("click", ".deletebutton", function(){
		$numofTasks--;
		$("#numTask").html("Total Tasks: "+$numofTasks);
    })});


// Function to display the 'Click on the task to mark it as complete !!!' message on screen after the page loads.
$(document).ready(function() {
      $('.divMsg').delay(500).fadeIn('fast');
	  
});

/*Function to hide the 'Click on the task to mark it as complete !!!' message once the user clicks the 'Ok' button, and passes the control back to Input */

$(document).ready(
    function(){
	$('.okay').click(function(){
	$('.divMsg').fadeOut('slow');
	$("#Input").focus();
	}
	)})