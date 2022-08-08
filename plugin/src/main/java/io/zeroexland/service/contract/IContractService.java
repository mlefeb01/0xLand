package io.zeroexland.service.contract;

import io.zeroexland.config.ConfigYml;
import io.zeroexland.contract.LandContract;

public interface IContractService {

    void load(ConfigYml configYml);

    LandContract get();

}
