/////////////----information----/////////////
//BMI = w / h平方
//BMI Status : 過輕(<18.5) 理想(18.5~25) 過重(25~30) 輕度過胖(30~35) 中度過胖(35~40) 重度過胖(>40)

/////////////----flow----/////////////
//使用者輸入身高體重 -> 按下看結果按鈕 -> 按鈕變成BMI結果以及狀態

//初始化
//第一次點進網頁時，沒有紀錄，中間也沒有空白


//取得DOM元素
var height = document.querySelector(".height");
var weight = document.querySelector(".weight");
var resultBtn = document.querySelector(".result-btn");
var list = document.querySelector(".list");
var his = document.querySelector(".history");
var remove = document.querySelector(".removeAll");


//若是資料庫中有資料，就轉成物件存進Data, 若沒有就創造一個空陣列
var data = JSON.parse(localStorage.getItem("BMIlist")) || [];






////////初始化&除錯時用//////////

//列表區：當使用者第一次打開網頁時不顯示，有列表產生時再出現
his.style.display = "none";
// localStorage.clear();

// function empty(array){
//     array.length = 0;
// };
// empty(data);


updateList(data);
////////初始化//////////
//計算BMI指數並更新資料(以物件儲存，但要用字串存進資料庫)
function calculate(e){
    //data陣列中的各個屬性處理
    //1. 身高, 體重, BMI結果
    var h = parseInt(height.value)/100;
    var w = parseInt(weight.value);
    var result = w/(h*h);
    result = result.toFixed(2);
    console.log(result);  
    var status = "";
    var color = "";
    if(result <= 18.5){
        status = "過輕";
        color = "#31baf9";
    }else if( 18.5 < result && result <=25){
        status = "理想"
        color = "#86d73f";
    }else if( 25 < result && result <=30){
        status = "過重";
        color = "#ff982d";}
    else if( 30 < result && result <=35){
        status = "輕度肥胖";
        color = "#ff6c03"}
    else if( 35 < result && result <=40){
         status = "中度肥胖";
        color = '#ff6c03';}
    else if( 40 < result ){
        status = "重度肥胖"
        color = "#ff1200";
         };
         //if判斷式中不能這樣18.5 < result <25的寫法

    //獲得當前日期
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    
             //將計算出的資料存入一個物件中
             var BMIdata = {
                height:h,
                weight:w,
                BMI:result,
                BMIstatus: status,
                time: month + "-" + day + "-" + year,
                color: color,
            };
                //將最新的資料插入陣列中第一個，讓列表能從最新一筆開始
                data.splice(0, 0, BMIdata); //將新的BMIdata(物件)存進data
                updateList(data);
                localStorage.setItem("BMIlist", JSON.stringify(data));
            if(data.length > 15){
                clear();
            };
           
            switchBTN();

 

}
//避免列表太長，超過15個的話就從第一個開始刪掉
function clear(){
    for(var i=0; i< data.length; i++){
        data.splice(i, 1);
    };
    localStorage.setItem("BMIlist", JSON.stringify(data));
}

function check(e){
    if(height.value == "" || weight.value ==""||height.value ==0 || weight.vaue == 0){
        alert("數字不正確");
    }
    else{
        calculate(height.value, weight.value);
 
    }
};


resultBtn.addEventListener("click", check); 
//按下按鈕後，先檢查是否有輸入數字，或是是否有輸入0，無前述狀況再執行計算


//更新歷史列表
function updateList(data){
    //先抓取資料庫中資料
    
    str = "";
    for(var i=0; i< data.length; i++){
        his.style.display = "block";
        //抓取陣列資料，根據抓到資料的bmistatus分類並列表
        if(data[i].BMIstatus == "過輕"){
           
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #31baf9 solid'><div class = 'BMIstatus'><span style = 'font-size: 20px'>" + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };

        if(data[i].BMIstatus == "理想"){
            
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #86d73f solid'><div class = 'BMIstatus'> <span style = 'font-size: 20px'>" + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };

        if(data[i].BMIstatus == "過重"){
            
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #ff982d solid'><div class = 'BMIstatus'> <span style = 'font-size: 20px'>" + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };

        if(data[i].BMIstatus == "輕度肥胖" ){
            
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #ff6c03 solid'><div class = 'BMIstatus'><span style = 'font-size: 20px'> " + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };

        if(data[i].BMIstatus == "中度肥胖" || data[i].BMIstatus == "中度肥胖"){
           
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #ff6c03 solid'><div class = 'BMIstatus'><span style = 'font-size: 20px'> " + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };

        if(data[i].BMIstatus == "重度肥胖"){
            
            text =  "<li data-num  = '"+i+"'class = listItem style = 'border-left: 7px #ff1200 solid'><div class = 'BMIstatus'><span style = 'font-size: 20px'> " + data[i].BMIstatus + "</span></div><div class = 'result'>BMI <span style = 'font-size :20px; margin-left: 10px'>"+ data[i].BMI+ "</span></div><div class = 'weight-kg'>weight<span style = 'font-size :20px;margin-left: 10px'>"+ data[i].weight +"kg</span></div><div class = 'height-cm'>height<span style = 'font-size :20px; margin-left: 10px'>"+ data[i].height*100 +"cm</span></div><div class = 'test-date'>"+data[i].time+"</div></li>";
        };
        
        str += text;    
         
        
    };
    list.innerHTML = str;

};







    function switchBTN(){
        var getParent = resultBtn.parentNode;
        getParent.removeChild(resultBtn);
        var div = document.createElement("div");
        div.setAttribute("class", "show");
       
        //創造一個Div元素，並賦予其屬性"class = show"
        //因為前面改成將新的列表作為陣列第一位，所以只要永遠讀取第一位的資料就好
        
             var str = "";
             switch (data[0].BMIstatus) {
                case "過輕":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#31baf9";
                    div.style.border = "5px solid #31baf9";
                    div.style.position = "relative";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#31baf9";
                    getParent.appendChild(div);

                    //將str的字串新增到div元素中，設定css樣式
    
                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#31baf9";
                    div.appendChild(p);

                    //再新增一個div元素在div之下，設定它的顯示位置
                    
                    
                    break;

                 case "理想":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#86d73f";
                    div.style.border = "5px solid #86d73f";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#86d73f";
                    getParent.appendChild(div);

                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#86d73f";
                    div.appendChild(p);
                    break;
                
                case "過重":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#ff982d";
                    div.style.border = "5px solid #ff982d";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#ff982d";
                    getParent.appendChild(div);

                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#ff982d";
                    div.appendChild(p);
                    break;    
            
                case "輕度肥胖":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#ff6c03";
                    div.style.border = "5px solid #ff6c03";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#ff6c03";
                    getParent.appendChild(div);

                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#ff6c03";
                    div.appendChild(p);
                    break;   
                
                case "中度肥胖":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#ff6c03";
                    div.style.border = "5px solid #ff6c03";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#ff6c03";
                    getParent.appendChild(div);

                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#ff6c03";
                    div.appendChild(p);
                    break;  
                
                case "重度肥胖":
                    str = "<p >"+data[0].BMI+"</p><p style = 'font-size: 14px;'>BMI</p><a href = 'index.html'></a>";
                    div.innerHTML = str;
                    div.style.color = "#ff1200";
                    div.style.border = "5px solid #ff1200";
                    var a = div.querySelector("a");
                    a.style.backgroundColor = "#ff1200";
                    getParent.appendChild(div);

                    var p = document.createElement("div");
                    p.setAttribute("class", "statusText")
                    var pStr = "<p>"+data[0].BMIstatus+"</p>"
                    p.innerHTML = pStr;
                    p.style.color = "#ff1200";
                    div.appendChild(p);
                    break;   
                default:
                    console.log("other status");
                    break;
            };

        
    };

    //刪除全部資料
    his.addEventListener("click", deleteList);
    function deleteList(e){
        e.preventDefault();
        if(e.target.nodeName !== "A"){return};
        data.length = 0;
        console.log(data.length);  
        localStorage.setItem("BMIlist", JSON.stringify(data));
        updateList(data);
        his.style.display = "none";  
        
    };
    

   
    
