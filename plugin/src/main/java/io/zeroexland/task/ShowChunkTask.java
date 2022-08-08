package io.zeroexland.task;

import io.zeroexland.service.addresslink.IAddressLinkService;
import org.bukkit.*;
import org.bukkit.entity.Player;

import java.math.BigInteger;

public class ShowChunkTask implements Runnable {
    private static final Particle.DustOptions OWNER = new Particle.DustOptions(Color.fromRGB(70, 235, 52), 1);
    private static final Particle.DustOptions NOT_OWNER = new Particle.DustOptions(Color.fromRGB(255, 0, 0), 1);
    private final IAddressLinkService addressLinkService;

    public ShowChunkTask(IAddressLinkService addressLinkService) {
        this.addressLinkService = addressLinkService;
    }

    @Override
    public void run() {
        for (Player player : Bukkit.getOnlinePlayers()) {
            if (player.isDead()) {
                continue;
            }

            final Location location = player.getLocation();
            final int heightLimit = location.getWorld().getMaxHeight();
            final Chunk chunk = location.getChunk();

            final int chunkX = chunk.getX();
            final int chunkZ = chunk.getZ();

            final Particle.DustOptions dustOptions;
            if (this.addressLinkService.isLinked(player) &&
                    this.addressLinkService.owns(this.addressLinkService.getLinkedAddress(player), BigInteger.valueOf(chunkX), BigInteger.valueOf(chunkZ))) {
                dustOptions = OWNER;
            } else {
                dustOptions = NOT_OWNER;
            }

            for (int x = chunkX * 16; x <= (chunkX * 16 + 16); x += 16) {
                for (int y = 0; y < heightLimit; y += 3) {
                    for (int z = chunkZ * 16; z <= (chunkZ * 16 + 16); z += 16) {
                        player.spawnParticle(Particle.REDSTONE, x, y, z, 1, dustOptions);
                    }
                }
            }
        }
    }

}
