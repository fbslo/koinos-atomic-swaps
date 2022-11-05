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
        },
        "getSwap": {
            "argument": "swap.getSwap_arguments",
            "return": "swap.getSwap_result",
            "description": "Get a Swap transaction object",
            "entry-point": "0x37866993",
            "read-only": true
        }
    },
    "types": "CsMKChlhc3NlbWJseS9wcm90by9zd2FwLnByb3RvEgRzd2FwGhRrb2lub3Mvb3B0aW9ucy5wcm90byLkAQoUY3JlYXRlU3dhcF9hcmd1bWVudHMSHgoKdW5sb2NrSGFzaBgBIAEoDFIKdW5sb2NrSGFzaBIeCgdjcmVhdG9yGAIgASgMQgSAtRgGUgdjcmVhdG9yEiAKCHJlY2VpdmVyGAMgASgMQgSAtRgGUghyZWNlaXZlchIaCgV0b2tlbhgEIAEoDEIEgLUYBlIFdG9rZW4SGgoGYW1vdW50GAUgASgEQgIwAVIGYW1vdW50EhIKAmlkGAYgASgEQgIwAVICaWQSHgoIbG9ja1RpbWUYByABKARCAjABUghsb2NrVGltZSInChFjcmVhdGVTd2FwX3Jlc3VsdBISCgJpZBgBIAEoBEICMAFSAmlkIkQKFmNvbXBsZXRlU3dhcF9hcmd1bWVudHMSEgoCaWQYASABKARCAjABUgJpZBIWCgZzZWNyZXQYAiABKAlSBnNlY3JldCItChNjb21wbGV0ZVN3YXBfcmVzdWx0EhYKBnJlc3VsdBgBIAEoCFIGcmVzdWx0IioKFGNhbmNlbFN3YXBfYXJndW1lbnRzEhIKAmlkGAEgASgEQgIwAVICaWQiKwoRY2FuY2VsU3dhcF9yZXN1bHQSFgoGcmVzdWx0GAEgASgIUgZyZXN1bHQiJwoRZ2V0U3dhcF9hcmd1bWVudHMSEgoCaWQYASABKARCAjABUgJpZCK6AgoOZ2V0U3dhcF9yZXN1bHQSHgoKdW5sb2NrSGFzaBgBIAEoDFIKdW5sb2NrSGFzaBIeCgdjcmVhdG9yGAIgASgMQgSAtRgGUgdjcmVhdG9yEiAKCHJlY2VpdmVyGAMgASgMQgSAtRgGUghyZWNlaXZlchIaCgV0b2tlbhgEIAEoDEIEgLUYBlIFdG9rZW4SGgoGYW1vdW50GAUgASgEQgIwAVIGYW1vdW50EiIKCmV4cGlyYXRpb24YBiABKARCAjABUgpleHBpcmF0aW9uEiAKCWNyZWF0ZWRBdBgHIAEoBEICMAFSCWNyZWF0ZWRBdBIcCglmaW5hbGl6ZWQYCCABKAhSCWZpbmFsaXplZBISCgJpZBgJIAEoBEICMAFSAmlkEhYKBnNlY3JldBgKIAEoCVIGc2VjcmV0IrcCCgtzd2FwX29iamVjdBIeCgp1bmxvY2tIYXNoGAEgASgMUgp1bmxvY2tIYXNoEh4KB2NyZWF0b3IYAiABKAxCBIC1GAZSB2NyZWF0b3ISIAoIcmVjZWl2ZXIYAyABKAxCBIC1GAZSCHJlY2VpdmVyEhoKBXRva2VuGAQgASgMQgSAtRgGUgV0b2tlbhIaCgZhbW91bnQYBSABKARCAjABUgZhbW91bnQSIgoKZXhwaXJhdGlvbhgGIAEoBEICMAFSCmV4cGlyYXRpb24SIAoJY3JlYXRlZEF0GAcgASgEQgIwAVIJY3JlYXRlZEF0EhwKCWZpbmFsaXplZBgIIAEoCFIJZmluYWxpemVkEhIKAmlkGAkgASgEQgIwAVICaWQSFgoGc2VjcmV0GAogASgJUgZzZWNyZXQiIgoMY3JlYXRlX2V2ZW50EhIKAmlkGAEgASgEQgIwAVICaWQiPAoOY29tcGxldGVfZXZlbnQSEgoCaWQYASABKARCAjABUgJpZBIWCgZzZWNyZXQYAiABKAlSBnNlY3JldCIiCgxjYW5jZWxfZXZlbnQSEgoCaWQYASABKARCAjABUgJpZGIGcHJvdG8z"
}
