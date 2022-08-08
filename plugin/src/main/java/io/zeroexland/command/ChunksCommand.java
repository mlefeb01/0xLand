package io.zeroexland.command;

import io.zeroexland.contract.LandContract;
import io.zeroexland.service.addresslink.IAddressLinkService;
import io.zeroexland.util.Text;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.stream.Collectors;

public final class ChunksCommand implements CommandExecutor {
    private final IAddressLinkService addressLinkService;

    public ChunksCommand(IAddressLinkService addressLinkService) {
        this.addressLinkService = addressLinkService;
    }

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String label, @NotNull String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage(Text.color("&cThis command is player only!"));
            return true;
        }

        if (!this.addressLinkService.isLinked(player)) {
            player.sendMessage("&cYou have not linked an address!");
            return true;
        }

        final List<LandContract.Chunk> chunks = this.addressLinkService.getOwned(this.addressLinkService.getLinkedAddress(player));

        final String owned;
        if (chunks == null || chunks.isEmpty()) {
            owned = "";
        } else {
            owned = chunks.stream().map(chunk -> String.format("(%d,%d)", chunk.x.intValue(), chunk.z.intValue())).collect(Collectors.joining(", "));
        }

        player.sendMessage(Text.color("&aOwned chunks: [%s]".formatted(owned)));
        return true;
    }

}
