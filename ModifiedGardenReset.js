
Garden = Game.Objects['Farm'].minigame;
currentResets = 0;
CheckForReset = function()
		{
			if (currentResets != Garden.convertTimes)
			{
				MaturationTime();
				EffectStrenght();
				Cost();
				currentResets = Garden.convertTimes;
				Game.Achievements["Seedless to nay"].ddesc = 'Convert a complete seed log into sugar lumps by sacrificing your garden to the sugar hornets.<div class="line"></div>Owning this achievement makes plants 5% more efficient, seeds <b>5% cheaper</b>, plants mature <b>5% sooner</b>, and plant upgrades drop <b>5% more</b>.' + " <br> These upgrades stack with every reset: You have sacrificed your garden <b>" + Garden.convertTimes + " times</b>."
			}
		}

MaturationTime = function()
		{
			mult=0.95 ** Garden.convertTimes;
			for (var i in Garden.plants)
			{
				Garden.plants[i].mature=Garden.plants[i].matureBase*mult;
				console.log(Garden.plants[i].mature);
			}
		}		

GetBaseStrength = function()
		{
		for (let i = 0; i < 5; i++) {
			Garden.soilsById[i].baseEffMult = Garden.soilsById[i].effMult;
			} 
		}


EffectStrenght = function()
		{
			for (let i = 0; i < 5; i++) {
			Garden.soilsById[Garden.soil].effMult = Garden.soilsById[Garden.soil].baseEffMult * 1.05 ** Garden.convertTimes;
			}
		}

GetBaseCost = function()
		{
		for (let i = 0; i < 34; i++) {
			Garden.plantsById[i].baseCost = Garden.plantsById[i].cost;
			} 
		}
		
Cost = function()
		{
			for (let i = 0; i < 34; i++) {
			Garden.plantsById[i].cost = Garden.plantsById[i].baseCost * 0.95 ** Garden.convertTimes;
			} 
		}

Game.registerMod("Modified Garden Resets", {
init: function () {
Game.registerHook('check', CheckForReset);
GetBaseStrength();
GetBaseCost();
}
});
