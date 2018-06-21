/**
 * Created by Mehmet on 18.11.16.
 */


var $msgShowTime = 2000;

$(function() {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
    var counter = 4;
    var $pagination=paginationItems();


    function paginationItems() {
        var output=3;
/*  NO DB access 
        $.ajax({
            url: "numberItems.php",
            method: "get",
            data: {user:GetCurrentTap()},
            context: document.body,
            async: false
        }).done(function(data) {
            var content = $(data).filter("#main").text();
            if(content.includes("Success:")) {
                var $numberitems = content.split(":");  //Success:username,  always the 2nd element of that array, username isn't able to use ':' sign.
                output= $numberitems[1];
            }
        });
*/
        return output;
    }
    //Navibar on top left
    $(".nav a").on("click", function(){

        //empty elements shouldn't do anything, by purpose
        if($(this).text()=="" )
        {
            return;}
        if( $(this).prop('class').match("dropdown-toggle")){        //User profil (top right) shouln't be distracted from navibar logic
            return;
        }
        // alert($(this).prop('class'));
        //activate
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");

        switch($(this).prop('id'))
        {
            case "myadsText":
                //$("#demo3").pagination('updateItems', paginationItems());
                //$("#demo3").pagination('drawPage',1) ;
                MyAds();
                break;
            case "Mainsite1":
                //$("#demo3").pagination('updateItems', paginationItems());
                //$("#demo3").pagination('drawPage',1) ;
                 pagecontent("");
                break;
        }
    });

    $("form").submit(function () {
 
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
 
                var $form = $( this),
                    user = $form.find( "input[name='login_username']" ).val(),
                    pass = $form.find( "input[name='login_password']" ).val(),
                    url = $form.attr("action");
                //alert(url);
                //Send the data using post
                
                var posting = $.post( url, { login_username: user, login_password: pass });
                
                posting.done(function( data ) {
                                       
                    var content = $(data).filter("#main").text();
                    
                    if(content.includes("Success:")){
                         
                        $user = content.split(":");  //Success:username,  always the 2nd element of that array, username isn't able to use ':' sign.
                        $user = $user[1];
  
                        $("#login-modal").modal("hide");

                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");

                        msgChangeForever($(''), $(''), $('#text-main-login'), "", "", $user);
                        msgChangeForever($(''), $(''), $('#text-main-login2'), "", "", $user);
                        //$('.dropdown-toggle').removeAttr('disabled');
                        $('.dropdown-toggle').removeClass('disabled').addClass('enabled');

                        $('#myadsText').text("My Ads");
                        $('#glyphicon-login').removeClass('glyphicon glyphicon-log-in');
                        $('#glyphicon-login').addClass('glyphicon glyphicon-globe');

                        return;
                    }
                    // msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                    // msgChangeForever($('#div-main-msg'), $('#icon-main-msg'), $('#text-main-msg'), "success", "glyphicon-remove", $user);
                })
                .fail(function(xhr, textStatus, errorThrown) {
                     alert(errorThrown);
                });
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                    //$('<hr/>').appendTo('.navbar-nav');
                }else{
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":

                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                var $rg_c_password=$('#c_register_password').val();

                if($rg_password!=$rg_c_password){
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Password doesn't match");
                    return false;
                }
                if(!pwvalidate($rg_password))
                {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Password too weak");
                    alert("false");
                    return false;
                }
                alert("true");
                var $form = $(this),
                    user = $form.find("input[name='register_username']").val(),
                    email = $form.find("input[name='register_email']").val(),
                    pass = $form.find("input[name='register_password']").val(),
                    url = $form.attr("action");


                // Send the data using post
                var posting = $.post( url, { register_username: user, register_email: email, register_password: pass } );

                posting.done(function(data) {

                    var content = $(data).filter("#main").text();

                    if(content.includes("Success:")){
                        $user=content.split(":");

                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK!");
                        msgChangeForever($('#div-main-msg'), $('#glyphicon-login'), $('#text-main-login'), "success", "glyphicon glyphicon-globe", $user[1]);
                        msgChangeForever($(''), $(''), $('#text-main-login2'), "", "", $user[1]);

                        $('.dropdown-toggle').removeClass('disabled').addClass('enabled');
                        $('#myadsText').text("My Ads");

                        $("#login-modal").modal("hide");
                        return true;
                    }
                    else if(content.includes("Error:")){
                        content = content.split(":");  //Success:username,  always the 2nd element of that array, username isn't able to use ':' sign.
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", content[1]);
                    }
                    //console.log(content.length);
                    //$( "#div-register-msg" ).empty().append( content );
                    //$("<div>").html(data).find( "#main" );
                    //console.log(content);


                });
                // msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");

                return false;
                break;
            case "postElement":

                $("div.has-error").removeClass("has-error");
                $("span.help-block").text("");
                var $form = $( this),
                    user = escapeHtml($form.find("input[name='name']").val()),
                    titel = escapeHtml($form.find("input[name='titel']").val()),
                    message = escapeHtml($('#message').val()),
                    phone=escapeHtml($form.find("input[name='phone']").val()),
                    email=escapeHtml($form.find("input[name='email']").val()),
                    price=escapeHtml($form.find("input[name='price']").val()),
                    url = $form.attr("action");

                    var error=0;
                    if(phone==""&&email==""){
                        $('#helpphone').text("Pls enter either a phone or an email");
                        $('#helpemail').text("Pls enter either a phone or an email");
                        $('#helpphone').parent().parent().addClass('has-error');
                        $('#helpemail').parent().parent().addClass('has-error');
                        error++;
                    }
                    if(message=="")
                    {
                        $('#helpmessage').text("Pls enter a message");
                        $('#helpmessage').parent().parent().addClass('has-error');
                        error++;
                    }
                    if(price=="")
                    {
                        $('#helpprice').text("Pls enter an amount");
                        $('#helpprice').parent().parent().addClass('has-error');
                        error++;
                    }
                    if(error>0){return false;}




                //Send the data using post 
                $.ajax({
                    type: "POST",
                    url: "api/Ads",
                    //dataType: "JSON",
                    contentType: "application/json",
                    data: JSON.stringify( {
                        "name": user,
                        "titel": titel,
                        "subject": message,
                        "phone": phone,
                        "email": email,
                        "price": price
                    }),
                    success: function(data) { 
                        var content = $(data).filter("#main").text();
                        var message = $(data).filter("#main_message").text();
                        var titel = $(data).filter("#main_titel").text();
                        var phone = $(data).filter("#main_phone").text();
                        var email = $(data).filter("#main_email").text();
                        var price = $(data).filter("#main_price").text();

                        if(content.includes("Success")){
                            $user = content.split("$");  //Success:ID:Timestamp,  always the 3rd element of that array.

                            $user = $user[1];

                            $('<hr/>').appendTo('#AdvertiseElements');
                            $('<div/>', {'id': 'media' + counter, 'class': 'media'}).html(
                                $('<div/>', {'class': 'media-left'}).html(
                                    $('<img/>', {'src': 'http://www.picsum.photos/60/60/', 'class': 'media-object', 'style': 'width:60px'}))
                            )
                                .append(
                                    $('<div/>', {'class': 'media-body'}).html(
                                        $('<h4/>', {'class': 'media-heading'}).html(titel)
                                    ).append($('<p/>').html(message)))
                                .append('<span class="badge">'+price+' €</span><div class="pull-right"><h6>'+$user+'</h6></div>')
                                .appendTo('#AdvertiseElements');
                                var numberads = +$('#numberads').text() + +1;//cast it into a numver + increment it.
                                $('#numberads').text(numberads);

                                //empty form error messages:
                                $("div.has-error").removeClass("has-error");
                                $("span.help-block").text("");


                                $('#postElement')[0].reset();
                        }
                        else if(content.includes("Error.Login")){
                             $("#login-modal").modal("show");
                        }
                    },
                   // error: function(result,textStatus,errorThrown) {
                   //     alert(errorThrown);
                   //     console.log(result);
                   //     console.log(errorThrown);
                      //console.log(textStatus, errorThrown);  
                   // }

                });  
                break;
            default:
                return false;
        }
        return false;
    });

    function unescapeHtml(escapedStr) {
        var div = document.createElement('div');
        div.innerHTML = escapedStr;
        var child = div.childNodes[0];
        return child ? child.nodeValue : '';
    }
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister); });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    $('#editSave').click( function () {
        if($('#myads').hasClass( "active" )) {
            var $adsTitel ="#ads-titel" + $('#edit-modal').data( "divid");
            var $adsSubject ="#ads-subject"+ $('#edit-modal').data( "divid");
            var $adsPrice ="#price"+ $('#edit-modal').data( "divid");

            msgFade($($adsTitel), $('#adsTitel').text());
            msgFade($($adsSubject), $('#adsText').text());
            msgFade($($adsPrice), $('#editprice').text());

            // msgFade($($adsPrice), $('#editprice').text());

            var url = "edit.php";
            // alert($('#editprice').text().replace(/€/,""));

            var titel=$('#adsTitel').text(),
                text=$('#adsText').text(),
                id=$('#edit-modal').data("divid"),
                price=$('#editprice').text().replace(/€/,""),
                mail=$('#editemail').text(),
                phone=$('#editphone').text(),
                name1=$('#editname').text();
            var posting = $.post(url,{titel: titel, user:name1, message: text, id:id, mode:'ad', price:price, mail:mail, phone:phone});

            posting.done(function( data ) {
                // alert(data);
                var content = $(data).filter("#main").text();
                if(content.includes("Success.")){


                    // Todo:
                    // Message wird nicht upgedated.
                    // !!!!!!!!!!!!!!!!!
                    //     !!!!!!!!!!!!!
                    //         !!!!!!!!!!!
                    // !!!!!!!!!!!!!!!!!
                    //     !!!!!!!!!!!!!
                    //         !!!!!!!!!!!



                }
                else if(content.includes("Error."))
                {
                    //msgChange($('#div-loggin-msg'), $('#icon-loggin-msg'), $('#text-loggin-msg'), "error", "glyphicon-remove", "Please log in first!");
                    $("#login-modal").modal("show");
                    msgFade($($adsTitel), $('#adsTitel').text());

                }
            });
        }

    });
    $('#delete').click( function () {

        if($('#myads').hasClass( "active" )) {

            var url = "edit.php";
            var $user = $("#text-main-login").html();

            var id=$('#edit-modal' ).data("divid");
            var posting = $.post(url,{id:id, user:$user, mode:'addelete'});

            posting.done(function( data ) {
                var content = $(data).filter("#main").text();

                if(content.includes("Success.")){

                    $("div").remove("#media" + id);
                    var numberads = $('#numberads').text()-1;
                    $('#numberads').text(numberads);
                }
                else if(content.includes("Error."))
                {
                    //msgChange($('#div-loggin-msg'), $('#icon-loggin-msg'), $('#text-loggin-msg'), "error", "glyphicon-remove", "Please log in first!");
                    $("#login-modal").modal("show");
                    msgFade($($adsTitel), $('#adsTitel').text());

                }
            });


        }
    });
    $('#accoutSave').click( function () {

            var $adsPerPage = $('#adsPerPage').text();
            var $change_password = $("input[name$='change_password']").val();
            var $c_change_password = $("input[name$='c_change_password']").val();
            var $user = $("#text-main-login").html();

            if($change_password.length>0){

                if($change_password!=$c_change_password){
                    msgChange($('#div-acc-setting-msg'), $('#icon-acc-msg'), $('#text-acc-msg'), "error", "glyphicon-remove", "Password doesn't match");
                    return false;
                }
                if(!pwvalidate($change_password))
                {
                    msgChange($('#div-acc-setting-msg'), $('#icon-acc-msg'), $('#text-acc-msg'), "error", "glyphicon-remove", "Password too weak");
                    return false;
                }
            }
        var url = "edit.php";

            var id = $('#edit-modal').data("divid"),
                mode = "account";
            var posting = $.post(url, {
                adsPage: $adsPerPage,
                register_password: $change_password,
                mode: mode,
                user: $user
            });

            posting.done(function (data) {
                var content = $(data).filter("#main").text();
                if (content.includes("Success.")) {
                    $('#edit-modal').data("elementsperpage",$adsPerPage)
                }
                else if (content.includes("Error.")) {
                    $("#setting-modal").modal("show");
                }
            });

    });
    function login($user)
    {


    }

    function pwvalidate($pass) {

        var patt = new RegExp($('#mainsite').data("pwvalidateregex"));

        if(patt.test($pass)){
            return true;
        }
        return false;

    }
    function modalAnimate ($oldForm, $newForm) {

        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    // function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
    //     var $msgOld = $divTag.text();
    //     msgFade($textTag, $msgText);
    //     $divTag.addClass($divClass);
    //     $iconTag.removeClass("glyphicon-chevron-right");
    //     $iconTag.addClass($iconClass + " " + $divClass);
    //     // if($msgOld.includes("main")) { console.log("main bleibt für immer"); return true;}
    //     setTimeout(function() {
    //         msgFade($textTag, $msgOld);
    //         $divTag.removeClass($divClass);
    //         $iconTag.addClass("glyphicon-chevron-right");
    //         $iconTag.removeClass($iconClass + " " + $divClass);
    //     }, $msgShowTime);
    // }
    function msgChangeForever($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {

        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        //ich wollte sowas bauen: aber leider hat das die .includes funktion nicht richtig geklappt, daher eine 2. Funktion ohne es wieder zurückzuändern.
        // if($msgOld.includes("main")) { console.log("main bleibt für immer"); return true;}

    }
    $('#logout').on('click', function(event) {
        var user = $("#text-main-login").html();
        var posting = $.post("api/Logout", { login_username: user });
 
        posting.done(function(data){
            // var content = $(data).find( "#main" );
 
            var content = $(data).filter("#main").text();
            
            if(content.includes("Success")){
                msgChangeForever($(''), $(''), $('#text-main-login'), "", "", "");
                msgChangeForever($(''), $(''), $('#text-main-login2'), "", "", "");
                //$('.dropdown-toggle').prop('disabled', true);
                $('.dropdown-toggle').removeClass('enabled').addClass('disabled');
                // $('#myads').remove();
                $("li").removeClass('active');
                $('#myadsText').text("");
                $('#mainsite').addClass('active');
             //   $("#demo3").pagination('drawPage',1) ;
                pagecontent('');

                $('#glyphicon-login').removeClass('glyphicon glyphicon-globe');
                $('#glyphicon-login').addClass('glyphicon glyphicon-log-in');
            }

        }).fail(function(xhr, textStatus, errorThrown) {
                     alert(errorThrown + " " + textStatus);
        }); 
    });


    //Meine Anzeigen
    $('#myAds').on('click', function(event) {
        $("#demo3").pagination('drawPage',1) ;
        MyAds();
    });

    $('#myAccount').on('click', function(event) {

        $("#setting-modal").modal("show");
        //
        // modalAnimate($formLost, $formLogin);
    });

    function MyAds(){
        pagecontent($("#text-main-login").html());           //Get My_UserID
        $("li").removeClass('active');
        $('#myads').addClass('active');
        //alert("test2");
    }


    //Click on UserLogin Box on top,right, if nobody is logged in -> login modal
    $('.dropdown').on('click', function(event) {
        var user=$("#text-main-login").html();
        if(user.length<1){ 
            $("#login-modal").modal("show");
        }
    });


    $("#demo3").pagination({
        items: $pagination,
        itemsOnPage: $('#edit-modal').data("elementsperpage"),
        hrefTextPrefix: "#page=",
        cssStyle: "dark-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            var elementsPerpage = 3;

            var content = GetCurrentTap();
                $(".inhalt").html(
                $.get( "api/Ads/ApiAds",{page:pageNum, user:content} )
                    .done(function( data ) {
                        // alert(pageNum);
                          $('#AdvertiseElements').html(data);
                    })
                );
        }
    });


    //Load pagecontent for 'my ads' or 'global available ads'
    function pagecontent($user) {
         
        var $page= "1"; //$("#demo3").pagination('getCurrentPage'); //Get current Page#
  
        $(".inhalt").html(
            $.get( "api/Ads/ApiAds", { page:$page, user:$user })
                .done(function( data ) { 
                        $('#AdvertiseElements').html(data);
                })    
        );
 
    }

    function GetCurrentTap() {
        var content = "";
        switch($(".nav").find(".active").attr('id')){
            case "mainsite":
                content= " ";
                break;
            case "myads":
                content= $("#text-main-login").html();  //"My Ads" Page of username.
                break;
            default: content=" ";
        }
        return content;
    }

});

// $.fn.editable.defaults.mode = 'inline';
// $(document).ready(function() {
//     $('#username').editable();
// });

//Let's take advantage of browsers capability of escaping strings.
//The document.createTextNode method is doing the work for us.
//Javascript can never beat the speed of the browser, mostly written in C++.
//So it is fast, simple & save!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
}
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
    var $msgOld = $divTag.text();
    msgFade($textTag, $msgText);
    $divTag.addClass($divClass);
    $iconTag.removeClass("glyphicon-chevron-right");
    $iconTag.addClass($iconClass + " " + $divClass);
    // if($msgOld.includes("main")) { console.log("main bleibt für immer"); return true;}
    setTimeout(function() {
        msgFade($textTag, $msgOld);
        $divTag.removeClass($divClass);
        $iconTag.addClass("glyphicon-chevron-right");
        $iconTag.removeClass($iconClass + " " + $divClass);
    }, $msgShowTime);
}

$(document).ready(function() {

    $("#register_password").popover({ trigger: "at least 1 " });
    $("#c_register_password").popover({ trigger: "hover" });

    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline';


    $('#adsTitel').editable({
        display: function(value) {
            $(this).text(escapeHtml(value ));
        }

    });
    $('#editemail').editable({
        display: function(value) {
            $(this).text(escapeHtml(value ));
        }

    });
    $('#editphone').editable({
        display: function(value) {
            $(this).text(escapeHtml(value ));
        }

    });
    $('#editprice').editable({
        display: function(value) {
            $(this).text(escapeHtml(value ));
        }

    });

    $('#adsText').editable({
        display: function(value) {
            // $(this).text( value  );
            $(this).text(escapeHtml(value ));
        }
    });

    $('#adsPerPage').editable({
        value: 5,
        source: [
            {value: 5, text: '5'},
            {value: 10, text: '10'},
            {value: 20, text: '20'},
            {value: 40, text: '40'},
            {value: 80, text: '80'},
            {value: 100, text: '100'}
        ],

        error: function(data) {
            msgChange($('#div-acc-setting-msg'), $('#icon-acc-msg'), $('#text-acc-msg'), "error", "glyphicon-remove", "Send error");
        }
    });







    //clear edit modal, for next fresh empty call
    $('#edit-modal').on('hide.bs.modal', function (e) {
        msgFade($('#adsTitel'), "");  //clear edit modal, for next fresh empty call
        msgFade($('#adsText'), "");
        msgFade($('#editemail'), "");
        msgFade($('#editphone'), "");
        msgFade($('#editprice'), "");
        $('#adsText').editable('setValue',"");
    });

    var user=$("#text-main-login").html();
    if(user.length<1){
        $('#myadsText').text("");
    }
    else
    {
        // alert("test");
        $('#glyphicon-login').removeClass('glyphicon glyphicon-log-in');
        $('#glyphicon-login').addClass('glyphicon glyphicon-globe');
    }

});


var $msgAnimateTime = 350;

function toggler(divId) {
    //alert(divId);
    var $adsTitel ="#ads-titel" + divId;
    var $adsSubject ="#ads-subject"+ divId;

    var phone="",email="",name="";
    if($($adsTitel).data('phone')==""){
        phone = "_";
    }else{phone = $($adsTitel).data('phone')}
    if($($adsTitel).data('email')==""){
        email = "_";
    }else{email=$($adsTitel).data('email')}
    if($($adsTitel).data('name')==""){
        name = "_";
    }else{name=$($adsTitel).data('name')}


    msgFade($('#adsTitel'), $($adsTitel).text());
    msgFade($('#adsText'), $($adsSubject).text());


    msgFade($('#editemail'), email);
    msgFade($('#editphone'), phone);
    msgFade($('#editname'), name);
    msgFade($('#editprice'), $($adsTitel).data('price'));


    if($('#myads').hasClass( "active" ))
    {
        if($($adsTitel).data('phone')==""){
            $('#editphone').editable('setValue',"_");}
        if($($adsTitel).data('email')==""){
            $('#editemail').editable('setValue',"_");}
        $('#adsText').editable('option', 'disabled', false);
        $('#adsText').editable('setValue',$($adsSubject).text());
        $('#adsTitel').editable('option', 'disabled', false);

        $('#editemail').editable('option', 'disabled', false);
        $('#editphone').editable('option', 'disabled', false);
        $('#editprice').editable('option', 'disabled', false);
        $('#editname').editable('option', 'disabled', false);

        msgFade($('#gridSystemModalLabel'),"Edit");

        $('#edit-modal').data("divid",divId);
        $('#delete').show();
        $("#editSave").html('Save&Close');
    }
    else{
        msgFade($('#gridSystemModalLabel'),"Show");
        $('#delete').hide();
        $("#editSave").html('Close');
        $('#adsText').editable('option', 'disabled', true);
        $('#adsTitel').editable('option', 'disabled', true);
        $('#editemail').editable('option', 'disabled', true);
        $('#editphone').editable('option', 'disabled', true);
        $('#editprice').editable('option', 'disabled', true);
        $('#editname').editable('option', 'disabled', true);
    }


    $("#edit-modal").modal("show");
}

function msgFade ($msgId, $msgText) {
    $msgId.fadeOut($msgAnimateTime , function() {
        $(this).text($msgText).fadeIn($msgAnimateTime);
    });
}

