package io.zeroexland.util;

import org.bukkit.ChatColor;

public final class Text {

    private Text() {
        throw new AssertionError();
    }

    public static String color(String str) {
        return ChatColor.translateAlternateColorCodes('&', str);
    }

}
