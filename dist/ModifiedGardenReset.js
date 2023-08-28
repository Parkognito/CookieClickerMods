Garden = Game.Objects['Farm'].minigame;
computeBoostPlotOriginal = Garden.computeBoostPlot
currentResets = -1;

CheckForReset = function()
		{
			if (currentResets != Garden.convertTimes)
			{
				boost = 0.95 ** Math.max((Garden.convertTimes) - 1, 0)
				Cost();
				EffectStrenght();
				currentResets = Garden.convertTimes;
				Game.Achievements["Seedless to nay"].ddesc = 'Convert a complete seed log into sugar lumps by sacrificing your garden to the sugar hornets.<div class="line"></div>Owning this achievement makes plants 5% more efficient, seeds <b>5% cheaper</b>, plants mature <b>5% sooner</b>, and plant upgrades drop <b>5% more</b>.' + " <br> These upgrades stack with every reset: You have sacrificed your garden <b>" + Garden.convertTimes + " times</b>."
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


OverwriteBoost = function()
{
	Garden.computeBoostPlot = function()
	{
		computeBoostPlotOriginal()
		for (var y=0;y<6;y++)
		{
			for (var x=0;x<6;x++)
			{
				if (Garden.plot[y][x][0]>=1)
				{
					var tile=Garden.plot[y][x];
					var plant=Garden.plantsById[tile[0]-1];
					if (tile[1]<plant.mature)
					{
						Garden.plotBoost[y][x][0] *= 1/ boost
					}
					else
					{
						Garden.plotBoost[y][x][0] *= (100 - plant.mature) / (100 - plant.mature * boost)
					}
				}
			}
		}
	}
}

		Garden.getPlantDesc=function(me)
		{
			var children='';
			if (me.children.length>0)
			{
				children+='<div class="shadowFilter" style="display:inline-block;">';
				for (var i in me.children)
				{
					if (!Garden.plants[me.children[i]]) console.log('No plant named '+me.children[i]);
					else
					{
						var it=Garden.plants[me.children[i]];
						if (it.unlocked) children+='<div class="gardenSeedTiny" style="background-position:'+(-0*48)+'px '+(-it.icon*48)+'px;"></div>';
						else children+='<div class="gardenSeedTiny" style="background-image:url('+Game.resPath+'img/icons.png?v='+Game.version+');background-position:'+(-0*48)+'px '+(-7*48)+'px;opacity:0.35;"></div>';
					}
				}
				children+='</div>';
			}
			var dragonBoost=1/(1+0.05*Game.auraMult('Supreme Intellect'));
			return '<div class="description">'+
						(!me.immortal?('<div style="margin:6px 0px;font-size:11px;"><b>'+loc("Average lifespan:")+'</b> '+Game.sayTime(((100/(me.ageTick+me.ageTickR/2))*dragonBoost*Garden.stepT)*30,-1)+' <small>('+loc("%1 tick",LBeautify(Math.ceil((100/((me.ageTick+me.ageTickR/2)/dragonBoost))*(1))))+')</small></div>'):'')+
						'<div style="margin:6px 0px;font-size:11px;"><b>'+loc("Average maturation:")+'</b> '+Game.sayTime(((100/((me.ageTick+me.ageTickR/2)))*(me.mature*boost/100)*dragonBoost*Garden.stepT)*30,-1)+' <small>('+loc("%1 tick",LBeautify(Math.ceil((100/((me.ageTick+me.ageTickR/2)/dragonBoost))*(me.mature*boost/100))))+')</small></div>'+
						(me.weed?'<div style="margin:6px 0px;font-size:11px;"><b>'+(EN?"Is a weed":loc("Weed"))+'</b></div>':'')+
						(me.fungus?'<div style="margin:6px 0px;font-size:11px;"><b>'+(EN?"Is a fungus":loc("Fungus"))+'</b></div>':'')+
						(me.detailsStr?('<div style="margin:6px 0px;font-size:11px;"><b>'+loc("Details:")+'</b> '+me.detailsStr+'</div>'):'')+
						(children!=''?('<div style="margin:6px 0px;font-size:11px;"><b>'+loc("Possible mutations:")+'</b> '+children+'</div>'):'')+
						'<div class="line"></div>'+
						'<div style="margin:6px 0px;"><b>'+loc("Effects:")+'</b> <span style="font-size:11px;">('+loc("while plant is alive; scales with plant growth")+')</span></div>'+
						'<div style="font-size:11px;font-weight:bold;">'+me.effsStr+'</div>'+
						(me.q?('<q>'+me.q+'</q>'):'')+
					'</div>';
		}



Game.registerMod("Modified Garden Resets", {
init: function () {
GetBaseCost();
GetBaseStrength()
CheckForReset();
OverwriteBoost();
Garden.computeBoostPlot(); 
Game.registerHook('check', CheckForReset);
Game.registerHook('check', Garden.computeBoostPlot);
}
});

