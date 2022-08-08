package io.zeroexland.command;

import io.zeroexland.service.addresslink.IAddressLinkService;
import io.zeroexland.util.Text;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.jetbrains.annotations.NotNull;

public final class LinkCommand implements CommandExecutor {
    private final IAddressLinkService addressLinkService;

    public LinkCommand(IAddressLinkService addressLinkService) {
        this.addressLinkService = addressLinkService;
    }

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String label, @NotNull String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage(Text.color("&cThis command is player only"));
            return true;
        }

        if (args.length < 1) {
            if (this.addressLinkService.isLinked(player)) {
                sender.sendMessage(Text.color("&aLinked Address: &e%s".formatted(this.addressLinkService.getLinkedAddress(player))));
            } else {
                sender.sendMessage(Text.color("&cYou have not linked an address. Use /link <address>"));
            }
            return true;
        }

        final String address = args[0];

        try {
            this.addressLinkService.linkAddress(player, address);
            sender.sendMessage(Text.color("&aSuccessfully linked: &e%s".formatted(address)));
        } catch (Exception e) {
            sender.sendMessage(Text.color("&cUnable to link address: %s".formatted(e.getMessage())));
        }

        return true;
    }

}
