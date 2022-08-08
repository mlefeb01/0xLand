package io.zeroexland.config;

import lombok.Getter;
import org.bukkit.plugin.Plugin;

public class ConfigYml extends AbstractConfig {

    public ConfigYml(Plugin plugin) {
        super(plugin, "config.yml");
    }

    @Getter
    private String address;
    @Getter
    private String network;
    @Getter
    private String privateKey;
    @Getter
    private long gasPrice;
    @Getter
    private long gasLimit;

    @Override
    protected void cache() {
        this.address = config.getString("address");
        this.network = config.getString("network");
        this.privateKey = config.getString("privateKey");
        this.gasPrice = config.getLong("gasPrice");
        this.gasLimit = config.getLong("gasLimit");
    }

}
