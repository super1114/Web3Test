export const mintNFT = async (contract, account, amount, value) => {
  console.log(amount, value);
  const response = await contract.methods.mint(amount).send({
    from: account,
    value,
  });
  return response;
};

export const getCost = async (contract) => {
  return await contract.methods.cost().call();
};

export const getMaxMintAmount = async (contract) => {
  return await contract.methods.maxMintAmount().call();
};

export const getTotalSupply = async (contract) => {
  return await contract.methods.totalSupply().call();
};

export const getMaxSupply = async (contract) => {
  return await contract.methods.maxSupply().call();
};
