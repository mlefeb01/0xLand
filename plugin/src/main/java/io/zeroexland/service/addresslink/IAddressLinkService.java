package io.zeroexland.service.addresslink;

import io.zeroexland.contract.LandContract;
import org.bukkit.entity.Player;

import java.math.BigInteger;
import java.util.List;

public interface IAddressLinkService {

    void linkAddress(Player player, String address) throws IllegalArgumentException;

    void unlinkAddress(Player player) throws IllegalArgumentException;

    boolean isLinked(Player player);

    String getLinkedAddress(Player player);

    boolean isValidAddress(String address);

    boolean owns(String address, BigInteger x, BigInteger z);

    List<LandContract.Chunk> getOwned(String address);

}
