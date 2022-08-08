package io.zeroexland;

import io.zeroexland.command.ChunkTpCommand;
import io.zeroexland.command.ChunksCommand;
import io.zeroexland.command.LinkCommand;
import io.zeroexland.config.ConfigYml;
import io.zeroexland.listener.PlayerListener;
import io.zeroexland.service.addresslink.AddressLinkService;
import io.zeroexland.service.addresslink.IAddressLinkService;
import io.zeroexland.service.contract.ContractService;
import io.zeroexland.service.contract.IContractService;
import io.zeroexland.task.ShowChunkTask;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public final class ZeroExLandPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        if (!getDataFolder().exists()) {
            getDataFolder().mkdir();
        }

        final ConfigYml configYml = new ConfigYml(this);
        configYml.load();

        final IContractService contractService = new ContractService();
        contractService.load(configYml);
        final IAddressLinkService addressLinkService = new AddressLinkService(this, contractService);

        // listeners
        getServer().getPluginManager().registerEvents(new PlayerListener(addressLinkService), this);

        // commands
        getCommand("link").setExecutor(new LinkCommand(addressLinkService));
        getCommand("chunktp").setExecutor(new ChunkTpCommand());
        getCommand("chunks").setExecutor(new ChunksCommand(addressLinkService));

        // task
        Bukkit.getScheduler().scheduleSyncRepeatingTask(this, new ShowChunkTask(addressLinkService), 0, 1L);
    }

}
