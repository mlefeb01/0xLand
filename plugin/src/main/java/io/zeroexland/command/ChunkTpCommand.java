package io.zeroexland.command;

import io.zeroexland.util.Text;
import org.bukkit.Bukkit;
import org.bukkit.Chunk;
import org.bukkit.block.Block;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.NotNull;

public final class ChunkTpCommand implements CommandExecutor {

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String label, @NotNull String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage(Text.color("&cThis command is player only"));
            return true;
        }

        if (args.length < 2) {
            player.sendMessage(Text.color("&cNot enough args provided. Usage /chunktp <x> <z>"));
            return true;
        }

        try {
            final int x = Integer.parseInt(args[0]);
            final int z = Integer.parseInt(args[1]);

            final Chunk chunk = Bukkit.getWorld("world").getChunkAt(x, z);

            chunk.load();

            final Block block = chunk.getWorld().getHighestBlockAt(chunk.getBlock(0, 0, 0).getLocation());

            player.teleport(block.getLocation());
        } catch (Exception e) {
            player.sendMessage(Text.color("&cError parsing x/z coordinates"));
        }

        return false;
    }

}
