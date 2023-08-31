new Game.Achievement("Wrinkler Genocide", 'Pop 5000 wrinklers <div class="line"></div> Owning this achievement makes shiny wrinklers twice as likely', [19, 8])
Game.Achievements["Wrinkler Genocide"].ddesc = 'Pop 5000 wrinklers <div class="line"></div> Owning this achievement makes shiny wrinklers twice as common'
Game.Achievements["Wrinkler Genocide"].pool = "shadow"
Game.Achievements["Wrinkler Genocide"].order = 35000.261 


Load = function()
{
	isWon = Game.modSaveData["More Shiny Wrinklers"]
	if (typeof isWon === 'undefined')
	{
		console.log("Undefined")
		isWon = 0
	}
	else
	{
		isWon = Number(isWon)
	}
}

WinAchievement = function()
{
		if (Game.wrinklersPopped >= 5000 && isWon != 1 )
		{
			Game.Win("Wrinkler Genocide")
		}
		
		if (isWon == 1)
		{
			Game.Achievements["Wrinkler Genocide"].won = 1
		}
}


GetSpawnRate = function()
{
	if(Game.Achievements["Wrinkler Genocide"].won = 0)
	{
		spawnRate = 0.0001
	}
	else
	{
		spawnRate = 0.0002
	}
	return(spawnRate)
}



Game.SpawnWrinkler=function(me)
{
	if (!me)
	{
		var max=Game.getWrinklersMax();
		var n=0;
		for (var i in Game.wrinklers)
		{
			if (Game.wrinklers[i].phase>0) n++;
		}
		for (var i in Game.wrinklers)
		{
			var it=Game.wrinklers[i];
			if (it.phase==0 && Game.elderWrath>0 && n<max && it.id<max)
			{
				me=it;
				break;
			}
		}
	}
	if (!me) return false;
	me.phase=1;
	me.hp=Game.wrinklerHP;
	me.type=0;
	me.clicks=0;
	if (Math.random()<GetSpawnRate()) me.type=1;//shiny wrinkler
	return me;
}


Love = function ()
{
	if(Math.random() < 0.1)
	{
		Game.Notify('I liebe di', "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️", [34,11]); 
	}
}

Game.registerMod("More Shiny Wrinklers", {
init: function () {
	Load()
	Game.registerHook("check", WinAchievement)
	Love()
	Game.saveModData()
},
save: function ()
{
	return(String(Game.Achievements["Wrinkler Genocide"].won))
}
});


