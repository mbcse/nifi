// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nifi is Ownable {

    struct AuthRule {
        address tokenAddress;
        uint256 tokenId; // For ERC721 and ERC1155
        uint256 amountRequired; // For ERC20 and ERC1155
        bool isNFT; // If it's an NFT (ERC721 or ERC1155)
        bool isERC1155; // Specific for ERC1155
    }

    // Mapping of token address to user address to amount (for escrowed tokens)
    mapping(address => mapping(address => uint256)) public tokenEscrow;

    // Mapping of ruleId to authentication rule
    mapping(uint256 => AuthRule) public authRules;

    uint256 public ruleCounter;

    event RuleAdded(
        uint256 ruleId,
        address tokenAddress,
        uint256 tokenId,
        uint256 amountRequired,
        bool isNFT,
        bool isERC1155
    );
    event Authenticated(address user, uint256 ruleId);
    event Deposited(address indexed user, uint256 amount, address tokenAddress);
    event Withdrawn(address indexed user, uint256 amount, address tokenAddress);
    event TokensDeducted(address indexed user, uint256 amount, address tokenAddress);

    modifier validateTokenType(AuthRule memory rule, address user) {
        if (rule.isNFT) {
            if (rule.isERC1155) {
                require(
                    IERC1155(rule.tokenAddress).balanceOf(user, rule.tokenId) >= rule.amountRequired,
                    "Insufficient ERC1155 tokens for auth"
                );
            } else {
                require(
                    IERC721(rule.tokenAddress).ownerOf(rule.tokenId) == user,
                    "User does not own the required ERC721 token"
                );
            }
        } else {
            require(
                IERC20(rule.tokenAddress).balanceOf(user) >= rule.amountRequired,
                "Insufficient ERC20 tokens for auth"
            );
        }
        _;
    }

    // Escrow contract address for handling locked tokens (can be extended for future uses)
    address public escrowContractAddress;

    // Ownable constructor is called implicitly
    constructor(address owner) Ownable(owner) {}

    /**
     * @dev Allows the admin to register a new token or NFT for authentication.
     */
    function addAuthRule(
        address tokenAddress,
        uint256 tokenId,
        uint256 amountRequired,
        bool isNFT,
        bool isERC1155
    ) external onlyOwner {
        authRules[ruleCounter] = AuthRule({
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            amountRequired: amountRequired,
            isNFT: isNFT,
            isERC1155: isERC1155
        });

        emit RuleAdded(ruleCounter, tokenAddress, tokenId, amountRequired, isNFT, isERC1155);
        ruleCounter++;
    }

    /**
     * @dev Check if a user is authenticated based on token ownership.
     */
    function authenticateUser(address user, uint256 ruleId)
        external
        validateTokenType(authRules[ruleId], user)
    {
        emit Authenticated(user, ruleId);
    }

    /**
     * @dev Deposit ERC20 tokens into escrow.
     */
    function depositTokens(uint256 amount, address tokenAddress) external {
        require(
            IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        tokenEscrow[tokenAddress][msg.sender] += amount;

        emit Deposited(msg.sender, amount, tokenAddress);
    }

    /**
     * @dev Withdraw ERC20 tokens from escrow.
     */
    function withdrawTokens(uint256 amount, address tokenAddress) external {
        require(tokenEscrow[tokenAddress][msg.sender] >= amount, "Insufficient balance");
        tokenEscrow[tokenAddress][msg.sender] -= amount;
        require(
            IERC20(tokenAddress).transfer(msg.sender, amount),
            "Token transfer failed"
        );

        emit Withdrawn(msg.sender, amount, tokenAddress);
    }

    /**
     * @dev Deduct tokens from the user's escrow based on usage.
     */
    function deductTokens(
        address user,
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        require(tokenEscrow[tokenAddress][user] >= amount, "Insufficient balance");
        tokenEscrow[tokenAddress][user] -= amount;
        require(
            IERC20(tokenAddress).transfer(owner(), amount),
            "Token transfer failed"
        );

        emit TokensDeducted(user, amount, tokenAddress);
    }

    /**
     * @dev Set the escrow contract address if needed for custom interactions.
     */
    function setEscrowContractAddress(address _escrowContractAddress) external onlyOwner {
        escrowContractAddress = _escrowContractAddress;
    }
}
