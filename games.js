var started = false;
var imageList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var player = [];
var player1 = 0;
var player2 = 0;
var numPairs = 0;
var guessedPairs = [];
var nowPlaying = 0;
var score =0;
$("h2").css("display","none");
$("button").click(function(){
    if(!started){
        $("button").css("display","none");
        started = true;
        randomPositionImage();
        $("img").css("display","none");
        $("h2").css("display","none");
        nowPlaying = randplayergenerator();
    };
});


$(".grid_item").click(function(){
    if (started){
        var id = $(this).attr("id");
        if (!guessedPairs.includes(id)){
            imageAnimation1(id);
            player.push(id);
        if (player.length === 2){
            checkAnswer(player[0],player[1]);
        }
        
        if(numPairs === 8){
            setTimeout(function(){
                $("h2").text(winner(player1,player2));
                $("button").text("Restart").css("display","inline-block");
                reset();
            },1000);
        }
        }
        
    }
    
});




function randomPositionImage(){
    var numImage = imageList.length;
    for (var i = 0;i<numImage;i++){
        var randIndex = Math.floor(Math.random()*(numImage-(i+1)));
        $("#"+(i+1)).html("<img src='./images/emogi"+imageList[randIndex]+".png'>")
        imageList.splice(randIndex,1);
    }
}

function imageAnimation1(id){

    $("#"+id).addClass("spin3D1");
    setTimeout(function(){
        $("#"+id+" img").css("display","block");
    },250);
    setTimeout(function(){
        $("#"+id).removeClass("spin3D1");
    },500);
}

function imageAnimation2(id){
    $("#"+id).addClass("spin3D2");
    setTimeout(function(){
        $("#"+id+" img").css("display","none");
    },250);
    setTimeout(function(){
        $("#"+id).removeClass("spin3D2");
    },500);
}

function checkAnswer(id1,id2){
    if (id1!=id2){
        var imgSrc1 = $("#"+id1+" img").attr("src");
        var imgSrc2 = $("#"+id2+" img").attr("src");
        if (imgSrc1 != imgSrc2){
            setTimeout(function(){
                imageAnimation2(id1);
                imageAnimation2(id2);
                nowPlaying = exchangePlayer(nowPlaying);
            },1000);
            
        }else{
            numPairs++;
            if(nowPlaying == 1){
                player1++;
                score = player1;
            }else{
                player2++;
                score = player2;
            }
            $("#score"+nowPlaying).text("Score: "+ score)
            guessedPairs.push(id1,id2);
        }
    }else{
        setTimeout(function(){
            imageAnimation2(id1);
            imageAnimation2(id2);
            nowPlaying = exchangePlayer(nowPlaying);
        },1000);
    }
    
    player = [];
}

function randplayergenerator(){
    var currentPlayer = Math.floor(Math.random()*2+1);
    // $(".player"+currentPlayer).removeClass("player"+currentPlayer);

    return exchangePlayer(currentPlayer);
}
function exchangePlayer(player){
    $(".number"+player).removeClass("player"+player);
    if(player == 1){
        player = 2;
        $(".number"+player).addClass("player"+player);
    }else{
        player = 1;
        $(".number"+player).addClass("player"+player);
    }
    console.log(player);
    return player;
}
function winner(score1, score2){
    $("h2").css("display","block").addClass("win");
    $("h2").text()
    if (score1>score2){
        return "Player1 Wins";
    }else if(score1<score2){
        return "Player2 Wins";
    }else{
        return "draw";
    }
    
}

function reset(){
    imageList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    player = [];
    player1 = 0;
    player2 = 0;
    numPairs = 0;
    guessedPairs = [];
    started = false;
    $("#score1").text("Score 0");
    $("#score2").text("Score 0");
}