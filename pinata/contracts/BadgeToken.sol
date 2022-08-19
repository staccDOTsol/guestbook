//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract StaccStaccs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string [] private staccs = [""];
    Counters.Counter private _tokenIds;
    Counters.Counter private _staccIds;
    Counters.Counter private _burned;
    string private ipfs = "ipfs://";
    uint256 length = 50;
    uint256 endts;
    uint256 price = 50000;
    uint256 base =  10000;
    uint256 increment = 3;
    constructor(string memory _name, string  memory _ticker, uint256 _length, uint256 _price, uint256 _base, string  [] memory _staccs, uint256 _increment) ERC721(_name, _ticker) {
        staccs = staccs;
        length = _length;
        price = _price;
        base = _base;
        staccs = _staccs;
        increment = _increment;

    }
    function testInProd() 
    public
    onlyOwner
    returns (uint256) {
        endts = block.timestamp + 86400 * 1;
        return endts;
    }
    function twophase() 
    view
    public
     returns (uint256) {
        return endts;
    }

    function totalSupply() 
    view
    public
     returns (uint256) {
        return _tokenIds.current() - _burned.current();
    }

    function x() 
    view
    public
     returns (uint256) {
        return _tokenIds.current();
    }


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    function getPrice() public view returns (uint) {
        return price;
    }
    function burn(uint256 tokenId)
    public
  {
    require(_isApprovedOrOwner(msg.sender, tokenId));
    _burn(tokenId);
    _burned.increment();
    msg.sender.call{value: getBalance() / 10 }("");

    price = price - (base * (_tokenIds.current() + (increment - 1)));
  }
    function mintNFT(address recipient, address payable ref,address payable _toJare)
        public
        payable
        returns (uint256)
    {
     require (_toJare ==  0xb04006D2AEf65D05Fc480FAd3ab15FF76738e470, "@staccoverflow or bust");
         
        if (msg.value >= price -  (base * (_tokenIds.current() + 1)) ){
            _staccIds.increment();
            if (_staccIds.current() > length){
                _staccIds.reset();
            }
            _tokenIds.increment();
         
            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, staccs[_staccIds.current()]);


            if (block.timestamp <= endts  ){
                _staccIds.increment();
                if (_staccIds.current() > length){
                    _staccIds.reset();
                }
                _tokenIds.increment();
 price = price + (base * (_tokenIds.current() + increment));
                newItemId = _tokenIds.current();
                _mint(recipient, newItemId);
                _setTokenURI(newItemId, staccs[_staccIds.current()]);
            }
             price = price + (base * (_tokenIds.current() + increment));
            ref.call{value: msg.value/10}("");
            
            _toJare.call{value: msg.value/10}("");
           // require(ref, "Failed to send refeth");
            return newItemId;
        }
        else {
            revert();
        }
    }
}
