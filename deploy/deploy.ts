import { Address, Deployer } from "../web3webdeploy/types";

export interface EthForwardDeploymentSettings {
  forceRedeploy?: boolean;
}

export interface EthForwardDeployment {
  ethForward: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: EthForwardDeploymentSettings
): Promise<EthForwardDeployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "V1.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const ethForward = await deployer
    .deploy({
      id: "EthFoward",
      contract: "EthForward",
    })
    .then((deployment) => deployment.address);

  const deployment = {
    ethForward: ethForward,
  };
  await deployer.saveDeployment({
    deploymentName: "V1.json",
    deployment: deployment,
  });
  return deployment;
}
