Garden = Game.Objects['Farm'].minigame

Garden.doTick = function()
{
	Garden.nextStep=Date.now();
}

Game.ImportSaveCode=function(save)
		{
			var out=false;
			if (save && save!='') out=Game.LoadSave(save);
			if (out && App && App.onImportSave) App.onImportSave(out,save);
			GetOfflineTime();
			return out;
		}


Grow = function() {
	if(ticksRunned < ticksToRun)
	{
		Game.Objects['Farm'].muted = 1;
		Garden.doTick();
		ticksRunned += 1;
	}
	else 
	{
		Game.Objects['Farm'].muted = 0;
		Game.removeHook('logic', Grow);
	}
}


GetOfflineTime = function() 
{
	Game.removeHook('logic', Grow);
	ticksRunned = 0;
	offlineTime = (Date.now()- Game.lastDate)/60000;
	soilTickrate = Garden.soilsById[Garden.soil].tick;
	ticksToRun = Math.min(Math.floor(offlineTime / soilTickrate), 1500);
	if (Garden.freeze == 0 && ticksToRun != 0)
	{
		message = "Your garden is catching up " + ticksToRun.toString() + " ticks";
		Game.Notify('Offline Garden', message, [2,18]);
		Game.registerHook('logic', Grow);
	}
	if (Garden.freeze == 1)
	{
		Game.Notify('Offline Garden', "Garden was freezed: No ticks have been caught up", [2,18]);
	}
}
	

		

Game.registerMod("Offline Garden", {
init: function () {
GetOfflineTime()
},
});
	
