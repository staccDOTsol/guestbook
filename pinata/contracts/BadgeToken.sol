//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract StaccStaccs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    string [] private staccs = ['ipfs://QmcdEDWfwrM6L6QrNLR3xiVngUQDHQByjFMTwtZHYcrKHb', 'ipfs://QmNUgWjifvVSddmnaHNytv6BM4X1QnEwo8VLwpErvbKqRG', 'ipfs://QmPAan8srhm35vrfR19tU2CPSYP15mZDUv7xSZiiwty4Fg', 'ipfs://QmW9yNeCkKdFQyKrZYCfuiTx2eYTzVU8byv9T6MnPZd9eR', 'ipfs://QmNnWXDSnAm7GBXhxdMLSuYfrLrWDLWienY3qWSCtKK8kV', 'ipfs://QmYsNnzujr9wMxffsJwWXRqitBmzqsm9MnNbJxX3a8DqvA', 'ipfs://QmexN6zEjjpqWJ5Sa5Z2tz4KPvxPSE5w6RQbg23D9Kpqma', 'ipfs://QmQs2JigiNPvCMMbf6f85em8n3ZRikeinzJNbCyeyjSG7b', 'ipfs://QmNwXdKeKtMXLsEMfnVHMtaNVn1WGcNKYxYWCs2ey81ofc', 'ipfs://QmYmS6StuFQ7Ww4R5mYHewmF8cRtMAFepFPy5eXxwANG2J', 'ipfs://QmVXYQsqbxCNQCBAaEXiEa8fTknEvYk9wF5tkeBT9JMrBP', 'ipfs://QmWiaC5jsDNQCbY9RCJTJ2CuHm3FTLQRbCQ6iYSbJW7jZj', 'ipfs://Qmbp4jXJNLGXDCsdj78xAZYnYtiFv58DTPfDN4TYEeNL1q', 'ipfs://QmUqU9txkCKFWExdBSSH1qxFYuJ87iyXh1rEShz1mZzbTa', 'ipfs://QmYKSdEKGuRnqNb3jqq3Ppg2D6n9oCNDvtSiQEUPJzQYj8', 'ipfs://Qma2EtB1Sx7yqUa1PDesoGW4z3SajvXPbcaEGYRyTS7NA6', 'ipfs://QmWPSvxTYRFZZYwXvKpNnHQkqFY5rcJ6JrxUY9dkRYFboK', 'ipfs://QmVkKEBArvH2FCFo18RVVS9s3YFRFh4ULQY79e6KXYk9uz', 'ipfs://QmXsKiYT4CVLupjGLstbxz9Bi9iBrzM3tyBvtassnWwnWC', 'ipfs://QmeQ1oT7H14MJf52DJo8RLA8xrXTMBjs5Xbg5LYHCA6Zfb', 'ipfs://QmPzjhRHWgnpizy6YCrav4ehXMrB84fqdMKcXfq3ezpb7g', 'ipfs://QmPBSWpisVCXGmzPFfaJLGQ3j6MVZDDqSnUmTh2ap6ixeY', 'ipfs://QmVA4q8dnBo44SVPG3r76NG8m1n3j9SmsfRc3bgA3bBRYj', 'ipfs://QmZ4F7RmH7hGJwe8nMRncM5ajLxTjF9m7LCFXAn1Ec1xW6', 'ipfs://QmbaxymdrqmTgfPwH9MoJHGD937QLSmmRJZXrUPSerPE6Y', 'ipfs://QmdWMVNHSait1GGsfxKMAddzx9Uf1u3pERW9JhVozvCYnG', 'ipfs://Qmf1y5DNqWAiFZDVNwwVKCpvyHWy2Cb3EX3t35Xypwwf21', 'ipfs://QmX7SpVBy9hyJyVqwtXhK7DHbs1RGpcVuXk7MP9s49r2U2', 'ipfs://QmeXpHL6Xs4mSFPrvqcJ5n1wKFmJnBN89cUMaAmzmkZkqk', 'ipfs://QmThHWtvxXdqBJtbS3p1hnwphMuBWWPntzBXfdoUyuvEZJ', 'ipfs://QmTvbWfGT6eKEBRoSZSqPkU3RHDCPAcpuTGiYojtY8cEqJ', 'ipfs://QmTTETVQKNd7Dqh6SFLYCip53iU6QbzR1oXeXCd81J2XET', 'ipfs://QmSc5HtXhNk92E8pPqsu5VEyQvAH9vJNTcRMFdDp86mYNH', 'ipfs://QmbNHCGgiDUBXWA1CwpPjaukHFDScH6NKNY87zFbfPHu4c', 'ipfs://QmcwnBimFfLUv3eYrcb3eNNYF4K9SNKfzTT9zjhYFxRKxb', 'ipfs://Qmf4ia7pUpHwNzgQtJuD19xdPB6ALcjTevZjWnHVzUPSeP', 'ipfs://QmdrZNeDWceadHPU7SbuGXpQsrih38qiXzDG2gJ7nMcPv6', 'ipfs://QmQnzP44p9Q6bEiu48m46CXG4vuw3Wsv4LhRyxxx3Zgvqn', 'ipfs://QmXnDEoxQtiSFNpjLAYrqKXTa8GnSDhgFcBvuba1yZddEw', 'ipfs://QmeddvXfP3Sp9QDyWXfyDBkbcZScRXU6cBnyrZkAwfDuuq', 'ipfs://QmXXfF94RJYMUu4bBxGTjNbd6vdyiGfQidP8Rc7jH5mMdC', 'ipfs://Qmc9UpqFJymxsq5t6XADU3P1F46WEgBoBebBXo1Fh4YGpF', 'ipfs://QmVyGHWkbZQmwrrTo71mVSKTy4P8kZKpoRodvaw41isirq', 'ipfs://QmVc1iM1RCbvPmQgt4GNHD87wYJc8k5AsZcdte1pGe2yeX', 'ipfs://QmYULXWiuHq9ypDDTLZuVHVxWh5J5xgCdzVnNi6UsB8tay', 'ipfs://QmXidBMsCxoKrd5cm4Q6a4jLRHtyeBLLJsN2ymch7eoJBH', 'ipfs://QmcC2qtiKn9oEeUCwKkdR3YscFdsipsvBMoPjQYjMVJ4bn', 'ipfs://QmeFW6ciCtQ5Y3mHQXr9Zs4wavCD3fpNfHK8eqdU4YsPQB', 'ipfs://Qmc3SravJjwqnvLgcN8QnGWiwW5a1YxqwJyu2PbBAhwYse', 'ipfs://Qmdj2yAuUR8d2vngiDT9PjvX8pKHhERQTz35i2rbjq6TeS'];
    Counters.Counter private _tokenIds;
    Counters.Counter private _staccIds;
    Counters.Counter private _burned;
    string private ipfs = "ipfs://";
    uint256 length = 50;
    uint256 endts;
    uint256 price = 50000;
    uint256 base =  10000;
    constructor() ERC721("Stacc Staccs", "staccArb") {
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

    price = price - (base * (_tokenIds.current() + 2));
  }
    function mintNFT(address recipient, address payable ref)
        public
        payable
        returns (uint256)
    {
         
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
 price = price + (base * (_tokenIds.current() + 3));
                newItemId = _tokenIds.current();
                _mint(recipient, newItemId);
                _setTokenURI(newItemId, staccs[_staccIds.current()]);
            }
             price = price + (base * (_tokenIds.current() + 3));
            ref.call{value: msg.value/10}("");
           // require(ref, "Failed to send refeth");
            return newItemId;
        }
        else {
            revert();
        }
    }
}
