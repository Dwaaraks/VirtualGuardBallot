import React, { useContext, useEffect, useState } from "react";
import Voting from "../contracts/Voting.json";
// import "../App.css";
import { getWeb3 } from "../utils.js";
import LoginContext from "../Contexts/LoginContext.js";
import Verification from "../Verification.js";
import Header from "../components/Header.js";

function VotingPage() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [ballots, setBallots] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const contract = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address
      );
      const admin = await contract.methods.admin().call();

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setAdmin(admin);
    };
    init();
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== "undefined" &&
      typeof web3 !== "undefined" &&
      typeof accounts !== "undefined" &&
      typeof admin !== "undefined"
    );
  };

  useEffect(() => {
    if (isReady()) {
      updateBallots();
    }
  }, [accounts, contract, web3, admin]);

  async function updateBallots() {
    const nextBallotId = parseInt(await contract.methods.nextBallotId().call());

    const ballots = [];
    for (let i = 0; i < nextBallotId; i++) {
      const [ballot, hasVoted] = await Promise.all([
        contract.methods.getBallot(i).call(),
        contract.methods.votes(accounts[0], i).call(),
      ]);
      ballots.push({ ...ballot, hasVoted });
    }
    setBallots(ballots);
  }

  async function createBallot(e) {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const choices = e.target.elements[1].value.split(",");
    const duration = e.target.elements[2].value;
    await contract.methods
      .createBallot(name, choices, duration)
      .send({ from: accounts[0] });
    await updateBallots();
  }

  async function addVoters(e) {
    e.preventDefault();
    const voters = e.target.elements[0].value.split(",");
    await contract.methods.addVoters(voters).send({ from: accounts[0] });
  }

  async function vote(e, ballotId) {
    e.preventDefault();
    const select = e.target.elements[0];
    const choiceId = select.options[select.selectedIndex].value;
    await contract.methods.vote(ballotId, choiceId).send({ from: accounts[0] });
    await updateBallots();
  }

  function isFinished(ballot) {
    const now = new Date().getTime();
    const ballotEnd = new Date(parseInt(ballot.end) * 1000).getTime();
    return ballotEnd - now > 0 ? false : true;
  }

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  function Voting_Cards(isVoter) {
    let fragment = (
      <div className={isVoter ? "container" : null}>
        <div
          className={
            isVoter
              ? "app_cards vote_container row"
              : "app_cards admin_vote_container row"
          }
        >
          <div className="col-sm-12">
            <div className="votes_heading">
              <h2>Votes</h2>
              {isVoter ? null : <div id="blink_dot"></div>}
            </div>

            <table id="table1" className="table">
              <thead>
                <tr>
                  <th>Election ID</th>
                  <th>Election Name</th>
                  <th>Polling Status</th>
                  {isVoter ? <th>Cast Vote</th> : null}
                  <th>Ends on</th>
                </tr>
              </thead>
              <tbody>
                {ballots.map((ballot) => (
                  <tr key={ballot.id}>
                    <td>{parseInt(ballot.id) + 1}</td>
                    <td>{ballot.name}</td>
                    <td className="td_view">
                      <table id="table2">
                        <th>Party ID</th>
                        <th>Party Name</th>
                        <th>Live Results</th>
                        <>
                          {ballot.choices.map((choice) => (
                            <tr key={choice.id}>
                              <td>{parseInt(choice.id) + 1}</td>
                              <td>{choice.name}</td>
                              <td> {choice.votes}</td>
                            </tr>
                          ))}
                        </>
                      </table>
                    </td>
                    {isVoter ? (
                      <td>
                        {isFinished(ballot) ? (
                          "Vote finished"
                        ) : ballot.hasVoted ? (
                          "You already voted"
                        ) : (
                          <form onSubmit={(e) => vote(e, ballot.id)}>
                            <div className="form-group">
                              <label htmlFor="choice">Choice</label>
                              <select className="form-control" id="choice">
                                {ballot.choices.map((choice) => (
                                  <option key={choice.id} value={choice.id}>
                                    {choice.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        )}
                      </td>
                    ) : null}

                    <td>
                      {new Date(parseInt(ballot.end) * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return fragment;
  }

  return (
    <>
      <Header />
      <div className="app_body bg-blue-100 min-h-screen py-8 px-4">
        <h1 className="app_title font-bold text-6xl text-center mb-8">
          <span> Transparent Voting System</span>
        </h1>

        {accounts[0].toLowerCase() === admin.toLowerCase() ? (
          <div className="container mx-auto ">
            <div className="row app_cards flex justify-center items-center ">
              <div className="col-sm-12 bg-blue-300 rounded-xl p-8 flex flex-col">
                <h2 className="text-3xl font-semibold mb-4 place-self-center">
                  Create Ballot
                </h2>
                <form onSubmit={(e) => createBallot(e)}>
                  <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded px-4 py-2 w-[400px]"
                      id="name"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="choices" className="block text-gray-700">
                      Choices
                    </label>
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded px-4 py-2 w-[400px]"
                      id="choices"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="duration" className="block text-gray-700">
                      Duration (s)
                    </label>
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded px-4 py-2 w-[400px]"
                      id="duration"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded place-self-center"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <hr className="my-8" />

            <div className="app_cards row flex justify-center items-center">
              <div className="col-sm-12 bg-blue-300 rounded-xl p-8 w-fit">
                <h2 className="text-2xl font-semibold mb-4">Add Voters</h2>
                <form onSubmit={(e) => addVoters(e)}>
                  <div className="form-group mb-4">
                    <label htmlFor="voters" className="block text-gray-700">
                      Voters
                    </label>
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded px-4 py-2 w-[400px]"
                      id="voters"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <hr className="my-8" />
            {Voting_Cards(false)}
          </div>
        ) : (
          <div>
            {isLoggedIn ? (
              <div className="min-h-screen">{Voting_Cards(true)}</div>
            ) : (
              <Verification />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default VotingPage;
