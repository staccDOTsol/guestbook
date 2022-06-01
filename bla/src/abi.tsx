export const ERC20ABI = [
    // Read-Only Functions
    "function x() view returns (uint256)",
    "function twophase() view returns (uint256)",
    // Authenticated Functions
    "function mintNFT(address recipient, string tokenUri, string maybeToken2) payable returns (uint256)",
];