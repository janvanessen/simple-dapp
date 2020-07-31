
const App = {
    web3: null,
    account: null,
    meta: null,

    start: async function () {
        const { web3 } = this;

        try {
            // get artefact
            const contract = await fetch("./contracts/Message.json")
            const artefact = await contract.json();

            // get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = artefact.networks[networkId];
            this.meta = new web3.eth.Contract(
                artefact.abi,
                deployedNetwork.address,
            );

            // get accounts
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
            await this.refresh();

        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },
    refresh: async function() {
        let balance = await this.getBalance();
        let message = await this.getMessage();
        document.getElementById("balance").innerHTML = balance;
        document.getElementById("message").innerHTML = message;

    },
    getBalance: async function () {
        const { web3 } = this;
        let balance = await web3.eth.getBalance(this.account);
        return web3.utils.fromWei(balance, 'ether');
    },
    getMessage: async function () {
        const { getMessage } = this.meta.methods;
        return await getMessage().call();        
    },    
    setMessage: async function () {
        const { setMessage } = this.meta.methods;
        const newMessage = document.getElementById("input").value;
        await setMessage(newMessage).send({ from: this.account });
        await this.refresh();
    },
};

window.App = App;

window.addEventListener("load", function () {

    App.web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );

    App.start();
});