import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#main");

export default function MainComponent() {
  const router = useRouter();
  const [consoleText, setConsoleText] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleChange = (event) => {
    setToAddress(event.target.value);

    console.log("value is:", event.target.value);
  };

  return (
    <div>
      <div className="container mx-auto">
        <section className="text-gray-800 text-center">
          <div className="flex justify-center pt-10 pb-5">
            <div className="">
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 text-blue-600">
                ENCODE CLUB <br />
                <span className="text-black text-4xl">
                  Week 4 Homework - Group 6
                </span>
              </h2>
              <p className="text-gray-500 text-lg">ozza#3211</p>
              <p className="text-gray-500 text-lg">reh#1909</p>
              <p className="text-gray-500 text-lg">CheckTheKing#8812</p>
              <p className="text-gray-500 text-lg">Ahmad_Ara#6226</p>
              <p className="text-gray-500 text-lg">PowersOfTau#0879</p>
              <p className="text-gray-500 text-lg">Arofahdev#0716</p>
            </div>
          </div>
        </section>
      </div>

      <DisplayMessage consoleText={consoleText}></DisplayMessage>

      <div className="container mx-auto">
        <div className="flex justify-center pt-2 pb-2">
          <div className="w-96">
            <label className="block text-gray-700 text-sm font-bold">
              "TO" Wallet Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="wallet_address"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              value={toAddress}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex justify-center pt-8 pb-10">
          <div className="grid grid-cols-5 gap-10">
            <div>
              <RequestTokens
                setConsoleText={setConsoleText}
                signature={""}
              ></RequestTokens>
            </div>
            <div>
              <SelfDelegation setConsoleText={setConsoleText}></SelfDelegation>
            </div>
            <div>
              <Delegate
                setConsoleText={setConsoleText}
                toAddress={toAddress}
              ></Delegate>
            </div>
            <div>
              <Vote setConsoleText={setConsoleText}></Vote>
            </div>
            <div>
              <ShowResults setConsoleText={setConsoleText}></ShowResults>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletInfo() {
  const { data: signer, isError, isLoading } = useSigner();
  const { chain, chains } = useNetwork();
  if (signer)
    return (
      <>
        <h3>Your account address is {signer._address}</h3>
        <h2>Connected to the {chain.name} network</h2>
        <br />
        <WalletBalance></WalletBalance>
        <br />
        <br />
      </>
    );
  else if (isLoading)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  else
    return (
      <>
        <p>Connect account to continue</p>
      </>
    );
}

function WalletBalance() {
  const { data: signer } = useSigner();
  const { data, isError, isLoading } = useBalance({
    address: signer._address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}

function DisplayMessage({ consoleText }) {
  return (
    <div className="container mx-auto p-10" id="display__texts">
      <div className="bg-white block justify-center pt-8 pb-8 overflow-auto">
        <div className="text-left pl-3" name="board">
          <WalletInfo></WalletInfo>
          {consoleText}
        </div>
      </div>
    </div>
  );
}

function RequestTokens({ setConsoleText, signature }) {
  const { data: signer } = useSigner();
  let requestOptions;

  if (signer) {
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: signer._address, signature: signature }),
    };
  }
  const fetchData = () => {
    fetch("http://localhost:3001/request-tokens", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setConsoleText(
          <div>
            <p>Request Tokens Operation Complete!</p>
            <p>Transaction Link:</p>
            <a
              href={"https://mumbai.polygonscan.com/tx/" + data["hash"]}
              target="_blank"
              className="text-fuchsia-400"
            >
              {data["hash"]}
            </a>
          </div>
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold w-40 h-40 py-8 px-8 rounded"
      onClick={fetchData}
    >
      Request Tokens
    </button>
  );
}

function SelfDelegation({ setConsoleText }) {
  const { data: signer } = useSigner();
  let requestOptions;

  if (signer) {
    requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
  }

  const fetchData = () => {
    fetch("http://localhost:3001/self-delegate")
      .then((response) => response.json())
      .then((data) => {
        setConsoleText(
          <div>
            <p>Self Delegation Complete!</p>
            <p>Transaction Link:</p>
            <a
              href={"https://mumbai.polygonscan.com/tx/" + data["hash"]}
              target="_blank"
              className="text-fuchsia-400"
            >
              {data["hash"]}
            </a>
          </div>
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-40 py-8 px-8 rounded"
      onClick={fetchData}
    >
      Self Delegation
    </button>
  );
}

function Delegate({ setConsoleText, toAddress }) {
  const { data: signer } = useSigner();
  let requestOptions;

  if (signer) {
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: signer._address, to: toAddress }),
    };
  }
  const fetchData = () => {
    fetch("http://localhost:3001/delegate-tokens", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setConsoleText(
          <div>
            <p>Delegate Tokens Operation Complete!</p>
            <p className="text-blue-400">From: {signer._address}</p>
            <p className="text-red-600">To: {toAddress}</p>
            <p>Transaction Link:</p>
            <a
              href={"https://mumbai.polygonscan.com/tx/" + data["hash"]}
              target="_blank"
              className="text-fuchsia-400"
            >
              {data["hash"]}
            </a>
          </div>
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-40 py-8 px-8 rounded"
      onClick={fetchData}
    >
      Delegate
    </button>
  );
}

function Vote({ setConsoleText }) {
  const [isActive, setIsActive] = useState(false);
  const [voteNumber, setVoteNumber] = useState();
  const [voteAmount, setVoteAmount] = useState();
  const { data: signer } = useSigner();
  let requestOptions;

  const handleVoteNumberChange = (event) => {
    setVoteNumber(event.target.value);
  };

  const handleVoteAmountChange = (event) => {
    setVoteAmount(event.target.value);
  };

  if (signer) {
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposal: voteNumber, amount: voteAmount }),
    };
  }
  const fetchData = () => {
    fetch("http://localhost:3001/cast-vote", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setConsoleText(
          <div>
            <p>Delegate Tokens Operation Complete!</p>
            <p className="text-blue-400">From: {signer._address}</p>
            <p className="text-red-600">Voted to: {voteNumber}</p>
            <p className="text-amber-950">Amount of: {voteAmount}</p>

            <p>Transaction Link:</p>
            <a
              href={"https://mumbai.polygonscan.com/tx/" + data["hash"]}
              target="_blank"
              className="text-fuchsia-400"
            >
              {data["hash"]}
            </a>
          </div>
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-40 py-8 px-8 rounded"
        onClick={() => setIsActive(true)}
      >
        Vote
      </button>
      <Modal
        isOpen={isActive}
        onRequestClose={() => setIsActive(false)}
        style={customStyles}
      >
        <div className="flex justify-end ml-32 mt-1 w-96">
          <button
            className="hover:text-red-600 hover:font-bold"
            onClick={() => setIsActive(false)}
          >
            Close
          </button>
        </div>
        <div className="flex justify-center">
          <h3 className="flex justify-center pb-5">Cast Votes</h3>
        </div>

        <div className="flex justify-center pb-5">
          <ul className="">
            <li>0 for Choco</li>
            <li>1 for Vanilla</li>
            <li>2 for Cherry</li>
          </ul>
        </div>
        <input
          type="number"
          placeholder="Proposal"
          className="mb-3 w-full border py-2 px-3"
          onChange={handleVoteNumberChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="mb-3 w-full border py-2 px-3"
          onChange={handleVoteAmountChange}
        />
        <button
          className="mx-1 bg-blue-900 p-2 rounded text-white px-4"
          onClick={fetchData}
        >
          Vote
        </button>
      </Modal>
    </>
  );
}

function ShowResults({ setConsoleText }) {
  const fetchData = () => {
    fetch("http://localhost:3001/results")
      .then((response) => response.json())
      .then((data) => {
        setConsoleText(
          <div>
            <p>The Winning Proposal:</p>
            <p className="text-red-600">{data}</p>
          </div>
        );
      })
      .catch((error) => console.log(error));
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-40 py-8 px-8 rounded"
      onClick={fetchData}
    >
      Show Results
    </button>
  );
}
