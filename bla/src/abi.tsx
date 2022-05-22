export const ERC20ABI = [
    // Read-Only Functions
    "function x() view returns (uint256)",
    "function twophase() view returns (uint256)",
    // Authenticated Functions
    "function mintNFT(address recipient, string memory tokenURI, string memory maybeToken2, uint8 num) payable returns (uint256)",
];