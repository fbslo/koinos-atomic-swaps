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
            "input": "swap.createSwap_arguments",
            "output": "swap.createSwap_result",
            "description": "Create new Swap transaction",
            "entryPoint": 2491777279,
            "readOnly": false
        },
        "completeSwap": {
            "input": "swap.completeSwap_arguments",
            "output": "swap.completeSwap_result",
            "description": "Complete a Swap transaction",
            "entryPoint": 697521037,
            "readOnly": false
        },
        "cancelSwap": {
            "input": "swap.cancelSwap_arguments",
            "output": "swap.cancelSwap_result",
            "description": "Cancel a Swap transaction",
            "entryPoint": 280700488,
            "readOnly": false
        },
        "getSwap": {
            "input": "swap.getSwap_arguments",
            "output": "swap.getSwap_result",
            "description": "Get a Swap transaction object",
            "entryPoint": 931555731,
            "readOnly": true
        }
    },
    "koilib_types": {
        "nested": {
            "swap": {
                "nested": {
                    "createSwap_arguments": {
                        "fields": {
                            "unlockHash": {
                                "type": "bytes",
                                "id": 1
                            },
                            "creator": {
                                "type": "bytes",
                                "id": 2,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "receiver": {
                                "type": "bytes",
                                "id": 3,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "token": {
                                "type": "bytes",
                                "id": 4,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "amount": {
                                "type": "uint64",
                                "id": 5,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "id": {
                                "type": "uint64",
                                "id": 6,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "lockTime": {
                                "type": "uint64",
                                "id": 7,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "createSwap_result": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "completeSwap_arguments": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "secret": {
                                "type": "string",
                                "id": 2
                            }
                        }
                    },
                    "completeSwap_result": {
                        "fields": {
                            "result": {
                                "type": "bool",
                                "id": 1
                            }
                        }
                    },
                    "cancelSwap_arguments": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "cancelSwap_result": {
                        "fields": {
                            "result": {
                                "type": "bool",
                                "id": 1
                            }
                        }
                    },
                    "getSwap_arguments": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "getSwap_result": {
                        "fields": {
                            "unlockHash": {
                                "type": "bytes",
                                "id": 1
                            },
                            "creator": {
                                "type": "bytes",
                                "id": 2,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "receiver": {
                                "type": "bytes",
                                "id": 3,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "token": {
                                "type": "bytes",
                                "id": 4,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "amount": {
                                "type": "uint64",
                                "id": 5,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "expiration": {
                                "type": "uint64",
                                "id": 6,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "createdAt": {
                                "type": "uint64",
                                "id": 7,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "finalized": {
                                "type": "bool",
                                "id": 8
                            },
                            "id": {
                                "type": "uint64",
                                "id": 9,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "secret": {
                                "type": "string",
                                "id": 10
                            }
                        }
                    },
                    "swap_object": {
                        "fields": {
                            "unlockHash": {
                                "type": "bytes",
                                "id": 1
                            },
                            "creator": {
                                "type": "bytes",
                                "id": 2,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "receiver": {
                                "type": "bytes",
                                "id": 3,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "token": {
                                "type": "bytes",
                                "id": 4,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "amount": {
                                "type": "uint64",
                                "id": 5,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "expiration": {
                                "type": "uint64",
                                "id": 6,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "createdAt": {
                                "type": "uint64",
                                "id": 7,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "finalized": {
                                "type": "bool",
                                "id": 8
                            },
                            "id": {
                                "type": "uint64",
                                "id": 9,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "secret": {
                                "type": "string",
                                "id": 10
                            }
                        }
                    },
                    "create_event": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "complete_event": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            },
                            "secret": {
                                "type": "string",
                                "id": 2
                            }
                        }
                    },
                    "cancel_event": {
                        "fields": {
                            "id": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
