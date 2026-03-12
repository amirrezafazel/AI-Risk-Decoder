# AI-Risk-Decoder

People are increasingly using AI services to enhance their day-to-day lives. 
The main problem is that people have almost no idea about the risks posed to them by such services. 
This is partly because ToS documents and model cards are extremely long and cumbersome to read, and partly because service providers have incentives to hide non-obvious or implicit risks from their users (e.g. environmental risks from building large datacentres). 
In order to communicate these risks clearly to the average person, we aim to create a website that displays the risks from a collection of AI services.

## Dependencies
- Python 3.8+
- Node.js 14+

## Installation
Go inside the Risk-Decoder directory and install the dependencies using npm:
```bash
cd Code/Risk-Decoder
npm install
```

## Usage
To run the website, run the following command from the project root directory:
```bash
cd Code/Risk-Decoder
npm run dev
```
To run the Database CLI, run the following command from the project root directory:
```bash
python Code/Database/interactive_cli.py
```
