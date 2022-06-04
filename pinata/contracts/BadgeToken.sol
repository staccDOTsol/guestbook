//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Saucey is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    mapping (string => uint256) hashes;

    Counters.Counter private _tokenIds;
    uint256 endts;
    constructor() ERC721("Cyberscapes", "SAUCE") {
        endts = block.timestamp + 86400;
    }
    function twophase() 
    view
    public
     returns (uint256) {
        return endts;
    }

    function x() 
    view
    public
     returns (uint256) {
        return _tokenIds.current();
    }

    function sendViaCall(address payable _toSauce, address payable _toJare, uint256 weiSauce, uint256 weiJare) onlyOwner public {
        uint256 sixfive = getBalance() * 49;
        uint256 threefive = getBalance() * 49; // derp -1% ea. cuz buffer cuz stupid gaschains
        
        require(weiSauce * 100 >= sixfive && weiJare * 100 >= threefive, "Derp go big or go home AND adhere to the %s fellas");
        require(getBalance() > weiJare + weiSauce, "Derp you cannot withdraw moar than has");
        (bool sauce, bytes memory data1) = _toSauce.call{value: weiSauce}("");
        require(sauce, "Failed to send sauceeth");
        (bool jare, bytes memory data2) = _toJare.call{value: weiJare}("");
        require(jare, "Failed to send jareeth");
        
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function mintNFT(address recipient, string memory tokenURI, string memory maybeToken2, address payable ref)
        public
        payable
        returns (uint256)
    {
        if (msg.value == 30000000000000000 && _tokenIds.current() <= 10000 && hashes[tokenURI] != 1){
            hashes[tokenURI] = 1;

            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURI);

            if (block.timestamp <= endts && msg.value == 30000000000000000 && _tokenIds.current() <= 10000  && hashes[maybeToken2] != 1){
                hashes[maybeToken2] = 1;
                _tokenIds.increment();

                newItemId = _tokenIds.current();
                _mint(recipient, newItemId);
                _setTokenURI(newItemId, maybeToken2);
            }
            (bool ref, bytes memory refd) = ref.call{value: 10000000000000000}("");
            require(ref, "Failed to send refeth");
            return newItemId;
        }
        else {
            revert();
        }
    }
}
