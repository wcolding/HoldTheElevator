import {IPlugin, IModLoaderAPI} from 'modloader64_api/IModLoaderAPI';
import {IOOTCore} from 'modloader64_api/OOT/OOTAPI';
import {InjectCore} from 'modloader64_api/CoreInjection';

var buttonsAddr = 0x801C84B4;
var saveAddr = 0x8011A5D0;
var pressed : boolean;
var phantomGanon = 0x000C;

class Main implements IPlugin{

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    @InjectCore()
    core!: IOOTCore;

    preinit(): void {
    }
    init(): void {
        this.ModLoader.logger.debug("***Hold Dpad Up while going to a new area to warp to Phantom Ganon!***");
        pressed = false;
    }
    postinit(): void {
    }
    onTick(frame?: number | undefined): void {

        let input = this.ModLoader.emulator.rdramRead16(buttonsAddr); 

        if ((input & 0x0800) != 0) // if dpad up
        {
            this.ModLoader.emulator.rdramWrite32(saveAddr, phantomGanon);
            if (!pressed)
            {            
                pressed = true;
            }
        }
        else
        {
            pressed = false;
        }

    }

}

module.exports = Main;