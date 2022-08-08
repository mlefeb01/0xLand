package io.zeroexland.service.addresslink;

import io.zeroexland.contract.LandContract;
import io.zeroexland.service.contract.IContractService;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.plugin.Plugin;

import java.math.BigInteger;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

public class AddressLinkService implements IAddressLinkService {
    private static final Pattern ADDRESS_PATTERN = Pattern.compile("^0x[a-fA-F0-9]{40}$");
    private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
    private final Plugin plugin;
    private final IContractService contractService;
    private final Map<UUID, String> linked;
    private final Set<String> addresses;
    private final Map<String, List<LandContract.Chunk>> chunksByAddress;

    public AddressLinkService(Plugin plugin, IContractService contractService) {
        this.plugin = plugin;
        this.contractService = contractService;
        this.linked = new HashMap<>();
        this.addresses = new HashSet<>();
        this.chunksByAddress = Collections.synchronizedMap(new HashMap<>());
        this.scheduleQueryTask();
    }

    @Override
    public void linkAddress(Player player, String address) throws IllegalArgumentException {
        if (player == null) {
            throw new IllegalArgumentException("Invalid player");
        }

        if (!this.isValidAddress(address)) {
            throw new IllegalArgumentException("Invalid address");
        }

        if (this.addresses.contains(address)) {
            throw new IllegalArgumentException("Address linked with other player");
        }

        this.linked.put(player.getUniqueId(), address);
        this.addresses.add(address);
        Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> queryOwnedChunks(player));
    }

    @Override
    public void unlinkAddress(Player player) throws IllegalArgumentException {
        if (player == null) {
            throw new IllegalArgumentException("Invalid player");
        }

        final String linkedAddress = this.linked.remove(player.getUniqueId());
        this.addresses.remove(linkedAddress);
        this.chunksByAddress.remove(linkedAddress);
    }

    @Override
    public boolean isLinked(Player player) {
        if (player == null) {
            return false;
        }
        return this.linked.containsKey(player.getUniqueId());
    }

    @Override
    public String getLinkedAddress(Player player) {
        if (player == null) {
            return null;
        }
        return this.linked.get(player.getUniqueId());
    }

    @Override
    public boolean isValidAddress(String address) {
        return ADDRESS_PATTERN.matcher(address).matches();
    }

    @Override
    public boolean owns(String address, BigInteger x, BigInteger z) {
        final List<LandContract.Chunk> owned = this.chunksByAddress.get(address);
        if (owned == null || owned.isEmpty()) {
            return false;
        }

        for (LandContract.Chunk chunk : owned) {
            if (chunk.x.equals(x) && chunk.z.equals(z)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public List<LandContract.Chunk> getOwned(String address) {
        return this.chunksByAddress.get(address);
    }

    private void scheduleQueryTask() {
        this.executorService.scheduleWithFixedDelay(() -> {
            for (Player player : Bukkit.getOnlinePlayers()) {
                if (!isLinked(player)) {
                    continue;
                }

                this.queryOwnedChunks(player);
            }
        }, 0, 30, TimeUnit.SECONDS);
    }

    private void queryOwnedChunks(Player player) {
        try {
            final LandContract contract = this.contractService.get();
            final String owner = getLinkedAddress(player);

            final int balance = contract.balanceOf(owner).send().intValue();

            final List<LandContract.Chunk> chunks = new ArrayList<>(balance);

            for (int n = 0; n < balance; n++) {
                final BigInteger tokenId = contract.tokenOfOwnerByIndex(owner, BigInteger.valueOf(n)).send();
                final LandContract.Chunk chunk = contract.chunkByTokenId(tokenId).send();
                chunks.add(chunk);
            }

            this.chunksByAddress.put(owner, chunks);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
