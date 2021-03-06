/* 
 * Neste arquivo temos todos os serviços da
 * tela de lista de usuario e cadastro do mesmo
 * 
 * Autor Simão Menezes
 */


/*########## functions de list ##########################*/
$('#pageListAccounts').live('pageinit', function(event) {
    loadAllAccounts;        
});

var api = "http://localhost/WebServiceSysBugs/index.php/api/";
var loadAllAccounts = $(function() {     
    $.ajax({
        type : "GET",
        url : api + "AccountsRest/accounts",
        dataType : "xml",
        contentType : 'application/xml',
        processData : false,
        success : manipulateXml,
        error : function(callback) {
            alert('error: ' + callback);
        }
    });
});
function manipulateXml(data) {
    $(data).find("item").each(function() {
        var name = $(this).find("name").text();
        var output = [ '<li><a href="#" class="ui-btn-right">' + name + '</a></li>' ]
        $("ul").append(output.join("\n"));
        $('ul').listview('refresh');
    });
}

/*############ function de cadastro #########################*/
$(document).bind('pageinit',function() {    
    
    $('#btnAdd').click(function() {
        $.ajax({
            type : 'POST',
            url : api + "AccountsRest/",
            dataType : "xml",
            data : $('#fmradd').serialize(),
            contentType : 'application/x-www-form-urlencoded, xml',
            processData : false,
            success : function(response) {
                console.log("salvo");
                $.mobile.changePage( "../accounts/list_accounts.html", { transition: "slideup"} );
            },
            error : function() {
                console.log("erro");
            }
        });
    });
});

