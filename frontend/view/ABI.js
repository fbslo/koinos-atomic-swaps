const ABI =[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

const SwapABI = [
	{
		"inputs": [],
		"name": "AddressZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "AlreadyFinalized",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Expired",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "IdNotUnique",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidSecret",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotExpired",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "SwapCanceled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "SwapCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "SwapCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "cancelSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "secret",
				"type": "string"
			}
		],
		"name": "completeSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "unlockHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lockTime",
				"type": "uint256"
			}
		],
		"name": "createSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "swaps",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "unlockHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint64",
				"name": "expiration",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "createdAt",
				"type": "uint64"
			},
			{
				"internalType": "bool",
				"name": "finalized",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const KoinosSwapContractABI = {
    "methods": {
        "createSwap": {
            "argument": "swap.createSwap_arguments",
            "return": "swap.createSwap_result",
            "description": "Create new Swap transaction",
            "entry-point": "0x948580ff",
            "read-only": false
        },
        "completeSwap": {
            "argument": "swap.completeSwap_arguments",
            "return": "swap.completeSwap_result",
            "description": "Complete a Swap transaction",
            "entry-point": "0x2993538d",
            "read-only": false
        },
        "cancelSwap": {
            "argument": "swap.cancelSwap_arguments",
            "return": "swap.cancelSwap_result",
            "description": "Cancel a Swap transaction",
            "entry-point": "0x10bb2648",
            "read-only": false
        }
    },
    "types": "Co0HChlhc3NlbWJseS9wcm90by9zd2FwLnByb3RvEgRzd2FwGhRrb2lub3Mvb3B0aW9ucy5wcm90byLEAQoUY3JlYXRlU3dhcF9hcmd1bWVudHMSHgoKdW5sb2NrSGFzaBgBIAEoDFIKdW5sb2NrSGFzaBIeCgdjcmVhdG9yGAIgASgMQgSAtRgGUgdjcmVhdG9yEiAKCHJlY2VpdmVyGAMgASgMQgSAtRgGUghyZWNlaXZlchIaCgV0b2tlbhgEIAEoDEIEgLUYBlIFdG9rZW4SGgoGYW1vdW50GAUgASgEQgIwAVIGYW1vdW50EhIKAmlkGAYgASgEQgIwAVICaWQiJwoRY3JlYXRlU3dhcF9yZXN1bHQSEgoCaWQYASABKARCAjABUgJpZCJEChZjb21wbGV0ZVN3YXBfYXJndW1lbnRzEhIKAmlkGAEgASgEQgIwAVICaWQSFgoGc2VjcmV0GAIgASgJUgZzZWNyZXQiLQoTY29tcGxldGVTd2FwX3Jlc3VsdBIWCgZyZXN1bHQYASABKAhSBnJlc3VsdCIqChRjYW5jZWxTd2FwX2FyZ3VtZW50cxISCgJpZBgBIAEoBEICMAFSAmlkIisKEWNhbmNlbFN3YXBfcmVzdWx0EhYKBnJlc3VsdBgBIAEoCFIGcmVzdWx0Ip8CCgtzd2FwX29iamVjdBIeCgp1bmxvY2tIYXNoGAEgASgMUgp1bmxvY2tIYXNoEh4KB2NyZWF0b3IYAiABKAxCBIC1GAZSB2NyZWF0b3ISIAoIcmVjZWl2ZXIYAyABKAxCBIC1GAZSCHJlY2VpdmVyEhoKBXRva2VuGAQgASgMQgSAtRgGUgV0b2tlbhIaCgZhbW91bnQYBSABKARCAjABUgZhbW91bnQSIgoKZXhwaXJhdGlvbhgGIAEoBEICMAFSCmV4cGlyYXRpb24SIAoJY3JlYXRlZEF0GAcgASgEQgIwAVIJY3JlYXRlZEF0EhwKCWZpbmFsaXplZBgIIAEoCFIJZmluYWxpemVkEhIKAmlkGAkgASgEQgIwAVICaWQiIgoMY3JlYXRlX2V2ZW50EhIKAmlkGAEgASgEQgIwAVICaWQiJAoOY29tcGxldGVfZXZlbnQSEgoCaWQYASABKARCAjABUgJpZCIiCgxjYW5jZWxfZXZlbnQSEgoCaWQYASABKARCAjABUgJpZGIGcHJvdG8z"
}
