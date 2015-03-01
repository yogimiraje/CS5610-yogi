$(function () {

    $("#blueButton").click(function () {
         
        $("#sample").removeClass("red");
        $("#sample").addClass("blue");
            
    });

    $("#redButton").click(function () {
        $("#sample").removeClass("blue");
        $("#sample").addClass("red");
    });
      

       
     
});