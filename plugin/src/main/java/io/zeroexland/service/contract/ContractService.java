package io.zeroexland.service.contract;

import io.zeroexland.config.ConfigYml;
import io.zeroexland.contract.LandContract;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;

public class ContractService implements IContractService {
    private LandContract landContract;

    @Override
    public void load(ConfigYml configYml) {
        try {
            final Web3j web3j = Web3j.build(new HttpService(configYml.getNetwork()));
            final Credentials credentials = Credentials.create(configYml.getPrivateKey());
            this.landContract = LandContract.load(
                    configYml.getAddress(),
                    web3j,
                    credentials,
                    new StaticGasProvider(
                            BigInteger.valueOf(configYml.getGasPrice()),
                            BigInteger.valueOf(configYml.getGasLimit())
                    )
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public LandContract get() {
        return this.landContract;
    }

}
