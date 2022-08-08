package io.zeroexland.listener;

import io.zeroexland.service.addresslink.IAddressLinkService;
import io.zeroexland.util.Text;
import org.bukkit.Chunk;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.math.BigInteger;

public final class PlayerListener implements Listener {
    private final IAddressLinkService addressLinkService;

    public PlayerListener(IAddressLinkService addressLinkService) {
        this.addressLinkService = addressLinkService;
    }

    @EventHandler
    public void onInteract(PlayerInteractEvent event) {
        if (!event.hasBlock()) {
            return;
        }

        final Player player = event.getPlayer();

        if (!this.addressLinkService.isLinked(player)) {
            player.sendMessage(Text.color("&cYou do not have an account linked!"));
            event.setCancelled(true);
            return;
        }

        final Chunk minecraftChunk = event.getClickedBlock().getChunk();

        if (!this.addressLinkService.owns(this.addressLinkService.getLinkedAddress(player), BigInteger.valueOf(minecraftChunk.getX()), BigInteger.valueOf(minecraftChunk.getZ()))) {
            player.sendMessage(Text.color("&cYou do not own this chunk!"));
            event.setCancelled(true);
            return;
        }
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        this.addressLinkService.unlinkAddress(event.getPlayer());
    }

}
