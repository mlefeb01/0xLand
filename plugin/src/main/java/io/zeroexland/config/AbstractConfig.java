package io.zeroexland.config;

import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public abstract class AbstractConfig {
    protected final Plugin plugin;
    protected final String fileName;
    protected final YamlConfiguration config;

    public AbstractConfig(Plugin plugin, String fileName) {
        this.plugin = plugin;
        this.fileName = fileName;
        this.config = new YamlConfiguration();
    }

    public Path getConfigPath() {
        return Paths.get(this.plugin.getDataFolder().toPath().toString(), this.fileName);
    }

    public void load() {
        if (!this.plugin.getDataFolder().exists()) {
            this.plugin.getDataFolder().mkdir();
        }

        final Path path = getConfigPath();
        if (!Files.exists(path)) {
            try {
                Files.copy(this.plugin.getClass().getClassLoader().getResourceAsStream(this.fileName), path);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            this.config.load(path.toFile());
        } catch (Exception e) {
            e.printStackTrace();
        }

        cache();
    }

    protected abstract void cache();

}