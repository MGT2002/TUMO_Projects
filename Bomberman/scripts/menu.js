function menuPage()
{
    $("body").empty();

	var node_main = $("<div/>").appendTo("body");
    var node_music = $("<audio/>").appendTo("body");
    var node_click = $("<audio/>").appendTo("body");
	var node_volume = $("<div/>");
	var node_title = $("<img/>");
	var node_mine1 = $("<img/>");
	var node_mine2 = $("<img/>");
	var node_arrow2 = $("<img/>");
	var node_arrow3 = $("<img/>");
	var node_speaker = $("<img/>");
	var node_plus = $("<img/>");
	var node_minus = $("<img/>");
	var node_start = $("<button/>");

	node_main.attr("id", "main")
        .append(node_volume)
        .append(node_title)
        .append(node_mine1)
        .append(node_mine2)
        .append(node_arrow2)
        .append(node_arrow3)
        .append(node_speaker)
        .append(node_plus)
        .append(node_minus)
        .append(node_start);
	node_title.attr("src", "images/title1.png").attr("id", "title");
	node_mine1.attr("src", "images/a01.png").attr("id", "mine1");
	node_mine2.attr("src", "images/bomberman.gif").attr("id", "mine2");
	node_arrow2.attr("src", "images/arrow2.png").attr("id", "arrow2");
	node_arrow3.attr("src", "images/arrow3.png").attr("id", "arrow3");
	node_speaker.attr("src", "images/speaker.png").attr("id", "speaker");
	node_plus.attr("src", "images/plus.png").attr("id", "plus");
	node_minus.attr("src", "images/minus.png").attr("id", "minus");
	node_start.attr("id", "start").text("START");
	node_music.attr("src", "audio/music.mp3").attr("loop", "");
    node_click.attr("src", "audio/click.mp3");
	node_volume.attr("id", "volume");

	node_speaker.click(function()
	{
        node_click[0].play();

		var clickedImg = $(this);
		if(clickedImg.attr("src") == "images/speaker.png")
		{
			clickedImg.attr("src", "images/muted-speaker.png");
			node_music[0].pause();
		}
		else
		{
			clickedImg.attr("src", "images/speaker.png");
			node_music[0].play();
		}
	});

	node_plus.click(function(){
        if (node_music[0].volume <= 0.9)
        {
            node_click[0].play();

            node_music[0].volume += 0.1;
            showVolume(node_volume, node_music[0].volume);
        }
	});

	node_minus.click(function(){
        if (node_music[0].volume >= 0.1)
        {
            node_click[0].play();

    		node_music[0].volume -= 0.1;
    		showVolume(node_volume, node_music[0].volume);
        }
	});

    node_start.click(function()
    {
        gamePage();
    });

    node_music[0].volume = 0.5;
    showVolume(node_volume, node_music[0].volume);

    node_music[0].play();
}

function showVolume(div, vol)
{
	div.text(Math.round(vol * 100));
}
