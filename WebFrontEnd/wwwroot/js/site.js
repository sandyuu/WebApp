const { useState } = React; //透過物件的解構賦值把 useState 方法取出
//Development
let webapiUrl = "https://localhost:5001/api/TodoItems";
//Production
//let webapiUrl = "https://localhost:6001/api/TodoItems";

let todoitem = { "Name": "台灣萬事達", "IsComplete": true };


const AjaxButtons = () => {
    let [content, setContent] = useState("none");
    //1. jQuery.Ajax - GET
    function jQueryAjaxGet(webapiUrl) {
        var request = $.ajax({
            url: webapiUrl,
            //method: "GET", // jQuery > v1.9
            type: 'GET',  // jQuery < v1.9
            dataType: 'json',
            // dataType: 'text',
            success: function (response) {
                // console.log(response);
                //alert(response);
            },
            error: function (response) {
                // console.log('error');
                // alert(response);
            },
        });
        request.done(function (response) {
            //blah blah
            //$("#result").text("done");
            $("#result").html(JSON.stringify(response));
            //setContent(content =JSON.stringify(response));
            return JSON.stringify(response);
        });
        request.fail(function (jqXHR, textStatus) {
            //var error_div = $('.error-loading');
            //error_div.append("<div class='error-text'>資料載入失敗</div>");
            console.log('error');
            alert('error');
        });
    }
    //2. jQuery.Ajax - POST
    function jQueryAjaxPost(webapiUrl) {
        var request = $.ajax({
            url: webapiUrl,
            method: "POST", // > 1.9
            //type: "POST",  // < 1.9
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: "json",
            data: todoitem,

            // dataType: 'text',
            success: function (response) {
                // console.log(response);
                // alert(response);
            },
            error: function (response) {
                // console.log('error');
                // alert(response);
            },
        });
        request.done(function (response) {
            console.log(response);
            $("#result").html(JSON.stringify(response));
            return JSON.stringify(response);
        });
        request.fail(function (jqXHR, textStatus) {
            console.log('error');
            alert('error');
        });
    }

    return (
        <div className="AjaxButtons">
            <button id="get" onClick={() => {
                setContent(content = jQueryAjaxGet(webapiUrl));
            }}>GET</button>
            <button id="post" onClick={() => {
                setContent(content = jQueryAjaxPost(webapiUrl));
            }}>POST</button>
            <button id="put">PUT</button>
            <button id="delete">DELETE</button>
            <div id="result">{content}</div>
        </div>
    );
};

ReactDOM.render(
    <div className="container">
        <AjaxButtons />
    </div>, document.querySelector('#app')
);